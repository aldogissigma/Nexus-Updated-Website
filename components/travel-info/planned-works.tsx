import { CalendarDays } from "lucide-react"

// Mock planned works for demonstration only.
const WORKS = [
  { when: "This weekend", where: "Metro: Station A – Station B", what: "No trains. Replacement buses every 10 minutes, tickets accepted." },
  { when: "Next Sunday", where: "Bus: Route 99", what: "Starts 1 hour later than normal while the depot is resurfaced." },
  { when: "In 2 weeks", where: "Shields Ferry", what: "Reduced timetable for 3 days while the ferry has its annual safety check." },
]

export function PlannedWorks() {
  return (
    <section aria-labelledby="works-heading">
      <h2 id="works-heading" className="text-2xl font-bold tracking-tight">
        Planned engineering works
      </h2>
      <p className="mt-2 text-muted-foreground">Know before you go — changes coming up in the next few weeks.</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {WORKS.map((w) => (
          <li key={w.where} className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CalendarDays className="size-4" aria-hidden="true" />
              {w.when}
            </p>
            <h3 className="mt-2 font-semibold">{w.where}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{w.what}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">Mock data for demonstration.</p>
    </section>
  )
}
