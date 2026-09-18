import { NextResponse } from "next/server";
import { CONTACT_EMAIL_BCC } from "@/lib/contact-info";
import { insertSubmission, markEmailSent } from "@/lib/db";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  company?: string; // honeypot field — real users never fill this in
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic in-memory rate limit per server instance: max 5 submissions
// per IP per 10 minutes. Not durable across serverless cold starts,
// but stops naive bot floods without needing external infra.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots tend to fill every field, humans never see this one.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const phone = body.phone?.trim() ?? "";
  const service = body.service?.trim() ?? "Not specified";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Please add a few more details about what you need." },
      { status: 400 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  // Step 1 — save to the database. This is the durable source of truth
  // and does not depend on any external service being configured, so a
  // visitor's submission is never lost even if email sending below
  // fails or isn't set up yet.
  let submissionId: number;
  try {
    submissionId = insertSubmission({ name, email, phone, service, message });
  } catch (err) {
    console.error("[contact] Failed to save submission to database:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }

  // Step 2 — best-effort email notification via Web3Forms. If it isn't
  // configured or the send fails, we log it but still tell the visitor
  // their message was received, since it's already safely stored.
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn(
      `[contact] Submission #${submissionId} saved, but WEB3FORMS_ACCESS_KEY ` +
        "isn't set so no email notification was sent. View it at /admin/submissions."
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New inquiry from ${name} — ${service}`,
        from_name: "CTRL AZ Website",
        // Web3Forms sends to whatever address the access key is bound
        // to on web3forms.com (should be set to CONTACT_EMAIL there);
        // cc adds the internal BCC recipient, and replyto lets a reply
        // go straight to the visitor.
        cc: CONTACT_EMAIL_BCC,
        replyto: email,
        name,
        email,
        phone: phone || "Not provided",
        service,
        message,
      }),
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      console.error(`[contact] Submission #${submissionId} saved, but Web3Forms error:`, result);
    } else {
      markEmailSent(submissionId);
    }
  } catch (err) {
    console.error(`[contact] Submission #${submissionId} saved, but email send threw:`, err);
  }

  // Always report success to the visitor once the submission is saved —
  // email delivery is a bonus notification, not something they should
  // see fail for.
  return NextResponse.json({ ok: true });
}
