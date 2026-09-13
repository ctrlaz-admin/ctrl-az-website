import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-foreground"
      : "border border-foreground/15 text-foreground";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
