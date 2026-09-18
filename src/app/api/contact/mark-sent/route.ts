import { NextResponse } from "next/server";
import { markEmailSent } from "@/lib/db";

export const runtime = "nodejs";

// Called by the client after it confirms a direct, client-side
// Web3Forms submission succeeded (see contact-form.tsx) — flips the
// "email sent" flag on that row for the /admin/submissions view.
// Low-stakes by design: worst case someone flips this boolean on a
// submission id they don't own, which reveals nothing and changes
// nothing sensitive, so no auth is required here.
export async function POST(request: Request) {
  let body: { id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  try {
    markEmailSent(id);
  } catch (err) {
    console.error("[contact/mark-sent] Failed to update submission:", err);
    // Non-critical — the submission itself is already saved.
  }

  return NextResponse.json({ ok: true });
}
