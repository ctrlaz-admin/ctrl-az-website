import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getServiceGroup, serviceGroups } from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceGroups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = getServiceGroup(slug);
  if (!group) return {};

  return {
    title: group.title,
    description: group.blurb,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const group = getServiceGroup(slug);

  if (!group) {
    notFound();
  }

  const otherGroup = serviceGroups.find((g) => g.slug !== group.slug);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {group.tagline}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {group.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            {group.heroDescription}
          </p>
          <div className="mt-10">
            <Button href="/contact">Get a Free Consultation</Button>
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {group.services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-foreground/10 bg-surface p-6"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {group.process.map((p) => (
              <div key={p.step}>
                <div className="text-sm font-semibold text-accent">{p.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-accent px-8 py-14 text-center text-accent-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-accent-foreground/90">
            Tell us about your business and we&apos;ll put together a plan —
            no obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              variant="secondary"
              className="!border-accent-foreground/30 !text-accent-foreground"
            >
              Talk to Us
            </Button>
            {otherGroup && (
              <Button
                href={`/services/${otherGroup.slug}`}
                variant="secondary"
                className="!border-accent-foreground/30 !text-accent-foreground"
              >
                Explore {otherGroup.title}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
