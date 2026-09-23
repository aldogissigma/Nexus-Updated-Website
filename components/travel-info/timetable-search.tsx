"use client"

import { useState } from "react"
import { Bus, Search, TrainFront } from "lucide-react"

type Departure = {
  service: string
  mode: "bus" | "metro"
  destination: string
  due: string
}

const SAMPLE_DEPARTURES: Departure[] = [
  { service: "Green", mode: "metro", destination: "Airport", due: "2 min" },
  { service: "21", mode: "bus", destination: "Blaydon", due: "6 min" },
  { service: "Yellow", mode: "metro", destination: "South Shields", due: "9 min" },
  { service: "Q3", mode: "bus", destination: "Gateshead", due: "12 min" },
]

export function TimetableSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Departure[] | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    // Conceptual: a real app would fetch live departures for the stop.
    setResults(SAMPLE_DEPARTURES)
  }

  return (
    <section aria-labelledby="timetable-heading">
      <h2 id="timetable-heading" className="text-2xl font-bold tracking-tight">
        Live departures
      </h2>
      <p className="mt-2 text-muted-foreground">
        Search a stop or station to see the next services.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="stop" className="sr-only">
            Stop or station name
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="stop"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Monument, Haymarket, route 21"
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Search
        </button>
      </form>

      {results && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border" role="status" aria-live="polite">
          <p className="bg-secondary px-4 py-2.5 text-sm font-semibold">
            Next departures from &ldquo;{query}&rdquo;
          </p>
          <ul className="divide-y divide-border">
            {results.map((dep) => {
              const Icon = dep.mode === "metro" ? TrainFront : Bus
              return (
                <li key={`${dep.service}-${dep.destination}`} className="flex items-center gap-3 bg-card px-4 py-3">
                  <span
                    className={
                      dep.mode === "metro"
                        ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                        : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"
                    }
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {dep.service} <span className="font-normal text-muted-foreground">to {dep.destination}</span>
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">{dep.mode}</p>
                  </div>
                  <span className="font-semibold tabular-nums text-primary">{dep.due}</span>
                </li>
              )
            })}
          </ul>
          <p className="bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
            Conceptual live data shown for demonstration.
          </p>
        </div>
      )}
    </section>
  )
}
