import Image from "next/image";

/**
 * Swaps automatically between the light-mode and dark-mode logo files
 * based on Tailwind's `dark:` variant, driven by next-themes' class
 * strategy (see ThemeProvider in layout.tsx).
 *
 * Replace /public/logos/logo-light.svg and /public/logos/logo-dark.svg
 * with the real brand assets when available — same file names, same spot.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block h-9 w-[118px] ${className}`}>
      <Image
        src="/logos/logo-light.svg"
        alt="CTRL AZ"
        fill
        priority
        className="object-contain object-left dark:hidden"
      />
      <Image
        src="/logos/logo-dark.svg"
        alt="CTRL AZ"
        fill
        priority
        className="hidden object-contain object-left dark:block"
      />
    </span>
  );
}
