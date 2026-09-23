export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
    >
      Skip to main content
    </a>
  )
}
