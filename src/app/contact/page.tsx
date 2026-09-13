import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  contactLinks,
} from "@/lib/contact-info";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CTRL AZ for IT services and digital marketing services. Email, call, or WhatsApp us — we typically reply within one business day.",
};

const contactMethods = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: contactLinks.email,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Call",
    value: CONTACT_PHONE_DISPLAY,
    href: contactLinks.phone,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: CONTACT_PHONE_DISPLAY,
    href: contactLinks.whatsapp,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.17c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.2.72-.84.92-1.13.2-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Get in touch
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk about your business
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Whether it&apos;s IT support or digital marketing, tell us what
            you&apos;re working with and we&apos;ll get back to you within
            one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "WhatsApp" ? "_blank" : undefined}
                  rel={method.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {method.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
                      {method.label}
                    </span>
                    <span className="block text-base font-medium">{method.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-foreground/10 bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
                Business Hours
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-foreground/60">Monday – Friday</dt>
                  <dd className="font-medium">9:00 AM – 7:00 PM IST</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground/60">Saturday</dt>
                  <dd className="font-medium">10:00 AM – 2:00 PM IST</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground/60">Sunday</dt>
                  <dd className="font-medium">Closed</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-foreground/10 bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <p className="mt-2 text-sm text-foreground/60">
                Fill out the form and our team will reach out shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
