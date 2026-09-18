"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL_BCC } from "@/lib/contact-info";

type Status = "idle" | "submitting" | "success" | "error";

const services = [
  "IT Services",
  "Digital Marketing",
  "Both / Not sure yet",
  "Something else",
];

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Web3Forms' free tier only accepts submissions made directly from
// the browser (server-to-server calls need a paid plan), which is
// why this call lives here instead of in the /api/contact route —
// see that route's comment for details. NEXT_PUBLIC_ vars are bundled
// into client JS by design; Web3Forms access keys are meant to be
// public (they can be domain-restricted in the web3forms.com
// dashboard), unlike a real secret API key.
async function sendEmailNotification(payload: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New inquiry from ${payload.name} — ${payload.service}`,
        from_name: "CTRL AZ Website",
        cc: CONTACT_EMAIL_BCC,
        replyto: payload.email,
        ...payload,
      }),
    });
    const result = await res.json();
    return res.ok && result.success === true;
  } catch {
    return false;
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      // The submission is safely saved at this point — that's what
      // determines success for the visitor. Email notification is a
      // best-effort bonus on top, so its outcome never blocks the
      // success state below.
      setStatus("success");
      form.reset();

      const emailed = await sendEmailNotification({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "Not provided",
        service: payload.service,
        message: payload.message,
      });

      if (emailed && result.id) {
        fetch("/api/contact/mark-sent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: result.id }),
        }).catch(() => {
          // Non-critical bookkeeping — the submission itself is already saved.
        });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-foreground/10 bg-surface p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Message sent</h3>
        <p className="mt-2 text-sm text-foreground/60">
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — hidden from real users via CSS, bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium">
            What do you need help with?
          </label>
          <select
            id="service"
            name="service"
            defaultValue={services[0]}
            className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          placeholder="Tell us a bit about your business and what you're looking for..."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
