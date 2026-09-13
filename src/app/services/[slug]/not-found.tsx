import { Button } from "@/components/ui/button";

export default function ServiceNotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        We couldn&apos;t find that service
      </h1>
      <p className="mt-4 text-foreground/60">
        It may have moved or the link might be out of date. Take a look at
        everything we offer instead.
      </p>
      <Button href="/services" className="mt-8">
        View All Services
      </Button>
    </section>
  );
}
