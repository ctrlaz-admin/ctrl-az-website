import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CTRL AZ is an IT and digital marketing services company helping businesses run reliably and grow predictably. Learn about our story and values.",
};

const values = [
  {
    title: "Accountability",
    desc: "We measure what we do. If a campaign or a system isn't performing, you'll hear it from us before you have to ask.",
  },
  {
    title: "Straightforward Communication",
    desc: "No jargon dumps, no vanishing after the contract is signed. You always know what's happening and why.",
  },
  {
    title: "Built to Last",
    desc: "We design systems and strategies for the long run, not quick wins that create more work six months later.",
  },
  {
    title: "One Team, Two Disciplines",
    desc: "Your IT and marketing shouldn't be fighting each other. We make sure they're pulling in the same direction.",
  },
];

const milestones = [
  { year: "Feb 2026", desc: "CTRL AZ founded to bring IT and digital marketing under one accountable team." },
  { year: "Apr 2026", desc: "Onboarded our first clients across managed IT and SEO." },
  { year: "Jul 2026", desc: "Expanded into paid media and full-funnel digital marketing." },
  { year: "Today", desc: "4 clients served and growing, one relationship at a time." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            About CTRL AZ
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Technology and marketing, run by people who actually answer the phone
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            We started CTRL AZ because businesses kept telling us the same
            thing: their IT vendor didn&apos;t understand their marketing
            goals, and their marketing agency didn&apos;t understand their
            technical constraints. We built a team that handles both.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-foreground/70">
              CTRL AZ was founded in February 2026 to solve a problem we
              kept seeing: businesses stuck juggling an IT vendor and a
              marketing agency that never talked to each other, leaving the
              business owner stuck translating between the two. We built
              CTRL AZ to close that gap from day one, with a single team
              accountable for both.
            </p>
            <p className="mt-4 text-foreground/70">
              We&apos;re a new company, and we treat that as an advantage:
              no legacy processes to unwind, no bloated account structures —
              just a small, senior team that stays close to every client we
              take on.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-foreground/70">
              To give businesses a single, reliable partner for the
              technology and marketing decisions that actually move the
              needle — so they can spend less time managing vendors and
              more time running their business.
            </p>

            <div className="mt-8 rounded-2xl border border-foreground/10 bg-surface p-6">
              <dl className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <dt className="text-3xl font-bold text-accent">Feb 2026</dt>
                  <dd className="mt-1 text-sm text-foreground/60">Founded</dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-accent">4</dt>
                  <dd className="mt-1 text-sm text-foreground/60">Clients Served</dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-accent">24/7</dt>
                  <dd className="mt-1 text-sm text-foreground/60">Support Availability</dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-accent">15+</dt>
                  <dd className="mt-1 text-sm text-foreground/60">Years Combined Team Experience</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What we value</h2>
            <p className="mt-4 text-foreground/60">
              The principles that shape how we work with every client, every time.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-foreground/10 bg-background p-6">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our journey so far</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.year} className="border-l-2 border-accent pl-4">
              <div className="text-xl font-bold text-accent">{m.year}</div>
              <p className="mt-2 text-sm text-foreground/60">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-accent px-8 py-14 text-center text-accent-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Want to work with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-accent-foreground/90">
            Tell us about your business and we&apos;ll put together a plan —
            no obligation.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              variant="secondary"
              className="!border-accent-foreground/30 !text-accent-foreground"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
