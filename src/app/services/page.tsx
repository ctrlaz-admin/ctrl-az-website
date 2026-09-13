import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { serviceGroups } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CTRL AZ offers IT services and digital marketing services — managed IT, cloud, cybersecurity, SEO, paid media, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            What we do
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            IT and digital marketing, under one roof
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Two disciplines that are usually handled by separate vendors —
            we bring them together so your technology and your growth
            strategy are never working against each other.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div
              key={group.slug}
              className="flex flex-col rounded-2xl border border-foreground/10 bg-surface p-8"
            >
              <h2 className="text-2xl font-semibold">{group.title}</h2>
              <p className="mt-2 text-sm font-medium text-accent">{group.tagline}</p>
              <p className="mt-4 text-sm text-foreground/60">{group.blurb}</p>

              <ul className="mt-6 space-y-3">
                {group.services.map((service) => (
                  <li key={service.title} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {service.title}
                  </li>
                ))}
              </ul>

              <Button href={`/services/${group.slug}`} className="mt-8 self-start">
                Explore {group.title}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Not sure which you need?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/60">
            Tell us what you&apos;re trying to solve and we&apos;ll point you
            in the right direction — no pressure, no obligation.
          </p>
          <Button href="/contact" className="mt-8">
            Talk to Us
          </Button>
        </div>
      </section>
    </>
  );
}
