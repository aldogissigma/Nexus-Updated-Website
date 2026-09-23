import { HeroJourneyPlanner } from "./hero-journey-planner"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      {/* Decorative route lines */}
      <div
        aria-hidden="true"
        data-decorative="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-accent) 0, transparent 40%), radial-gradient(circle at 90% 80%, var(--color-accent) 0, transparent 45%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-sm font-medium">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Simple, accessible travel
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Getting around the region, made simple.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg text-primary-foreground/85">
            Plan a journey, top up your Pop card and buy tickets in a few taps.
            Every screen is built to be clear, high-contrast and easy to use for
            everyone.
          </p>
        </div>

        <HeroJourneyPlanner />
      </div>
    </section>
  )
}
