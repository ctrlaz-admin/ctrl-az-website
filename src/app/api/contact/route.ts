import { NextResponse } from "next/server";
import { insertSubmission } from "@/lib/db";

export const runtime = "nodejs";

// Note: Web3Forms' free tier only accepts submissions made directly
// from the browser (their API 403s server-to-server calls unless
// you're on a paid plan) — so that call lives client-side in
// src/components/contact-form.tsx, not here. This route's only job is
// validating and durably saving the submission; see markSubmissionEmailed()
// in @/lib/db for how the "email sent" flag gets set afterward.

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

  // Save to the database — this is the durable source of truth and
  // does not depend on any external service, so a visitor's
  // submission is never lost even if the client-side Web3Forms email
  // step (see contact-form.tsx) fails or is unconfigured. We return
  // the row id so the client can mark it "emailed" after Web3Forms
  // confirms delivery.
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

  return NextResponse.json({ ok: true, id: submissionId });
}
