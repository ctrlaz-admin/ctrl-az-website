import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPost, type ContentBlock } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-bold tracking-tight">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 text-xl font-semibold">{block.text}</h3>;
    case "p":
      return <p className="mt-4 leading-7 text-foreground/80">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-7 text-foreground/80">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-foreground/70">
          {block.text}
          {block.attribution && (
            <footer className="mt-2 text-sm not-italic text-foreground/50">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24">
      <Link href="/blog" className="text-sm font-medium text-accent hover:opacity-80">
        ← Back to Blog
      </Link>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent">
        {post.category}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-foreground/50">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTimeMinutes} min read</span>
      </div>

      <div className="mt-10 border-t border-foreground/10 pt-2">
        {post.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-foreground/10 bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold">Want help with this?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
          We do exactly this kind of work for clients every day. Let&apos;s
          talk about your digital presence.
        </p>
        <Button href="/contact" className="mt-6">
          Get in Touch
        </Button>
      </div>
    </article>
  );
}
