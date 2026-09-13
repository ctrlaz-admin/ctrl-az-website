import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on IT services and digital marketing from the CTRL AZ team.",
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Insights on IT & digital marketing
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Practical, no-fluff writing from our team on running reliable
            systems and growing your business online.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-foreground/10 bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {post.category}
              </span>
              <h2 className="mt-3 text-lg font-semibold leading-snug group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-foreground/60">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-foreground/50">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
