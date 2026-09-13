import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Local SQLite file — the durable source of truth for every contact
// form submission, independent of whether email sending is configured.
//
// This works great for local dev and any traditional Node host with a
// persistent filesystem. It will NOT persist on serverless platforms
// with ephemeral disks (e.g. Vercel functions) — before deploying
// there, swap this out for a hosted database (Turso/libSQL, Supabase,
// or Postgres via Neon are all easy drop-in replacements since the
// query surface here is small and isolated to this file).
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "contact-submissions.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Reuse a single connection across Next.js dev hot-reloads instead of
// opening a new file handle on every module reload.
const globalForDb = globalThis as unknown as { __contactDb?: DatabaseSync };

function getDb(): DatabaseSync {
  if (!globalForDb.__contactDb) {
    const db = new DatabaseSync(DB_PATH);
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service TEXT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL,
        email_sent INTEGER NOT NULL DEFAULT 0
      )
    `);
    globalForDb.__contactDb = db;
  }
  return globalForDb.__contactDb;
}

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  created_at: string;
  email_sent: number;
};

export function insertSubmission(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): number {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO contact_submissions (name, email, phone, service, message, created_at) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    data.name,
    data.email,
    data.phone || null,
    data.service || null,
    data.message,
    new Date().toISOString()
  );
  return Number(result.lastInsertRowid);
}

export function markEmailSent(id: number) {
  const db = getDb();
  db.prepare(`UPDATE contact_submissions SET email_sent = 1 WHERE id = ?`).run(id);
}

export function listSubmissions(limit = 200): ContactSubmission[] {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM contact_submissions ORDER BY id DESC LIMIT ?`)
    .all(limit) as unknown as ContactSubmission[];
}
