import Image from "next/image";

/**
 * Swaps automatically between the light-mode and dark-mode logo files
 * based on Tailwind's `dark:` variant, driven by next-themes' class
 * strategy (see ThemeProvider in layout.tsx).
 *
 * Uses the wordmark-only crop (no tagline) for compact placements like
 * the header/footer — see logo-light-mark.png / logo-dark-mark.png.
 * The full lockup with the "UNDO ORDINARY. REDO BRILLIANT." tagline
 * lives at logo-light.png / logo-dark.png for larger placements.
 */
const ASPECT_RATIO = 1077 / 166;

export function Logo({
  className = "",
  height = 36,
}: {
  className?: string;
  height?: number;
}) {
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ height, width }}
    >
      <Image
        src="/logos/logo-light-mark.png"
        alt="CTRL AZ"
        fill
        priority
        sizes={`${width}px`}
        className="object-contain object-left dark:hidden"
      />
      <Image
        src="/logos/logo-dark-mark.png"
        alt="CTRL AZ"
        fill
        priority
        sizes={`${width}px`}
        className="hidden object-contain object-left dark:block"
      />
    </span>
  );
}
