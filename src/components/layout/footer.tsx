import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { primaryNav } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-foreground/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-foreground/60">
              CTRL AZ delivers IT and digital marketing services that help
              businesses run smoothly and grow predictably.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-3 space-y-2">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-foreground/60 hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Contact</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/60">
                <li>hello@ctrlaz.com</li>
                <li>+1 (000) 000-0000</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-foreground/60 hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-xs text-foreground/50">
          © {year} CTRL AZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
