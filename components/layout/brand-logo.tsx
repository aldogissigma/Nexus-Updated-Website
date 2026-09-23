import Link from "next/link"

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className ?? ""}`}
      aria-label="Nexus home"
    >
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
      >
        <span className="relative flex size-4 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-accent" />
          <span className="size-1.5 rounded-full bg-accent" />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">Nexus</span>
        <span className="text-[0.7rem] font-medium uppercase tracking-widest text-muted-foreground">
          Travel
        </span>
      </span>
    </Link>
  )
}
