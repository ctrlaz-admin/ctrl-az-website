import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from CTRL AZ's IT services and digital marketing engagements — cloud migrations, SEO recoveries, and paid media results.",
};

const categoryStyles: Record<string, string> = {
  "IT Services": "bg-accent/10 text-accent",
  "Digital Marketing": "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Our Work
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Results, not just deliverables
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            A few examples of the kind of work we do. Client names and
            figures below are illustrative placeholders while we prepare
            real case studies for publication.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="grid gap-8 rounded-2xl border border-foreground/10 bg-surface p-8 lg:grid-cols-3"
            >
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[study.category]}`}
                  >
                    {study.category}
                  </span>
                  <span className="text-sm text-foreground/50">{study.client}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">{study.title}</h2>
                <p className="mt-3 text-foreground/70">{study.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 border-foreground/10 lg:border-l lg:pl-8">
                {study.results.map((result) => (
                  <div key={result.label}>
                    <div className="text-2xl font-bold text-accent">{result.value}</div>
                    <div className="text-sm text-foreground/60">{result.label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Want results like these?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/60">
            Tell us about your business and we&apos;ll show you what a
            plan for your goals could look like.
          </p>
          <Button href="/contact" className="mt-8">
            Start a Conversation
          </Button>
        </div>
      </section>
    </>
  );
}
