import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL, CONTACT_EMAIL_BCC } from "@/lib/contact-info";
import { insertSubmission, markEmailSent } from "@/lib/db";

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

  // Step 2 — best-effort email notification. If Resend isn't
  // configured or the send fails, we log it but still tell the visitor
  // their message was received, since it's already safely stored.
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromAddress) {
    console.warn(
      `[contact] Submission #${submissionId} saved, but RESEND_API_KEY/CONTACT_FROM_EMAIL ` +
        "isn't set so no email notification was sent. View it at /admin/submissions."
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `CTRL AZ Website <${fromAddress}>`,
      to: CONTACT_EMAIL,
      bcc: CONTACT_EMAIL_BCC,
      replyTo: email,
      subject: `New inquiry from ${name} — ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service interested in: ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error(`[contact] Submission #${submissionId} saved, but Resend error:`, error);
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
