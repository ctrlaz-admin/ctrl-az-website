import { Button } from "@/components/ui/button";
import { serviceGroups } from "@/lib/services";

const stats = [
  { label: "Years in Business", value: "10+" },
  { label: "Clients Served", value: "150+" },
  { label: "Support Availability", value: "24/7" },
  { label: "Client Retention", value: "95%" },
];

const process = [
  { step: "01", title: "Discover", desc: "We audit your current IT and marketing setup to find gaps and opportunities." },
  { step: "02", title: "Plan", desc: "We build a roadmap tailored to your goals, budget, and timeline." },
  { step: "03", title: "Execute", desc: "Our team implements, monitors, and optimizes — with clear reporting." },
  { step: "04", title: "Grow", desc: "We scale what works and keep your systems and campaigns future-ready." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            IT Services &amp; Digital Marketing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Technology and marketing, working as one team for your business.
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            CTRL AZ helps companies run reliable IT infrastructure and grow
            through data-driven digital marketing — all under one roof, so
            nothing falls through the cracks.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Get a Free Consultation</Button>
            <Button href="/services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-foreground/10 bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
          <p className="mt-4 text-foreground/70">
            Two disciplines, one accountable partner. We keep your technology
            running and your pipeline growing.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div
              key={group.slug}
              className="rounded-2xl border border-foreground/10 bg-surface p-8"
            >
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <p className="mt-3 text-sm text-foreground/60">{group.blurb}</p>
              <ul className="mt-6 space-y-3">
                {group.services.map((service) => (
                  <li key={service.title} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {service.title}
                  </li>
                ))}
              </ul>
              <Button href={`/services/${group.slug}`} variant="secondary" className="mt-8">
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we work</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step}>
                <div className="text-sm font-semibold text-accent">{p.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-accent px-8 py-14 text-center text-accent-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to fix your IT and grow your pipeline?
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
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
