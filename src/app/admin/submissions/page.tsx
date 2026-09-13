import type { Metadata } from "next";
import { listSubmissions } from "@/lib/db";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const metadata: Metadata = {
  title: "Contact Submissions",
  robots: { index: false, follow: false },
};

// Not linked from anywhere in the site nav. Access requires
// ?token=<ADMIN_ACCESS_TOKEN> matching the server env var — set
// ADMIN_ACCESS_TOKEN in .env.local to enable this page at all.
// This is a lightweight gate for internal use, not a real auth
// system — don't rely on it if this data becomes sensitive at scale.
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function SubmissionsPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;

  if (!adminToken || token !== adminToken) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="mt-3 text-foreground/60">
          This page requires a valid access token.
        </p>
      </section>
    );
  }

  const submissions = listSubmissions();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Contact Submissions</h1>
      <p className="mt-2 text-sm text-foreground/60">
        {submissions.length} total, newest first. Stored locally in{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">data/contact-submissions.db</code>.
      </p>

      <div className="mt-8 space-y-4">
        {submissions.length === 0 && (
          <p className="text-foreground/60">No submissions yet.</p>
        )}
        {submissions.map((s) => (
          <div key={s.id} className="rounded-2xl border border-foreground/10 bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-semibold">{s.name}</div>
              <div className="flex items-center gap-3 text-xs text-foreground/50">
                <span>{formatDateTime(s.created_at)}</span>
                <span
                  className={
                    s.email_sent
                      ? "rounded-full bg-accent/10 px-2 py-0.5 text-accent"
                      : "rounded-full bg-foreground/10 px-2 py-0.5"
                  }
                >
                  {s.email_sent ? "Email sent" : "Not emailed"}
                </span>
              </div>
            </div>
            <div className="mt-2 text-sm text-foreground/70">
              <a href={`mailto:${s.email}`} className="text-accent hover:underline">
                {s.email}
              </a>
              {s.phone && <span> · {s.phone}</span>}
              {s.service && <span> · {s.service}</span>}
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/80">{s.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
