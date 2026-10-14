"use client"

import { useEffect, useMemo, useState } from "react"
import { Bus, Search, Ship, TrainFront } from "lucide-react"
import { getDepartures, searchStops, type Stop, type StopKind } from "@/lib/stops"

const ICONS: Record<StopKind, typeof Bus> = { metro: TrainFront, bus: Bus, ferry: Ship }

const BADGE: Record<string, string> = {
  Green: "bg-[#2d9b4a] text-white",
  Yellow: "bg-nexus-yellow text-[#14211f]",
  "Shields Ferry": "bg-nexus-blue text-[#14211f]",
}

export function TimetableSearch() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(0)
  const [stop, setStop] = useState<Stop | null>(null)
  const [notFound, setNotFound] = useState<string | null>(null)
  const [now, setNow] = useState(() => new Date())

  const matches = useMemo(() => searchStops(query), [query])
  const showList = focused && query.trim().length > 0 && matches.length > 0

  useEffect(() => {
    if (!stop) return
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [stop])

  const choose = (s: Stop) => {
    setStop(s)
    setQuery(s.name)
    setNotFound(null)
    setFocused(false)
    setNow(new Date())
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    if (matches[0]) choose((matches[active] ?? matches[0]).stop)
    else {
      setStop(null)
      setNotFound(query.trim())
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showList) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(matches.length - 1, a + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === "Escape") {
      setFocused(false)
    }
  }

  const departures = stop ? getDepartures(stop, now) : []
  const typed = stop && query.trim().toLowerCase() !== stop.name.toLowerCase()

  return (
    <section aria-labelledby="timetable-heading">
      <h2 id="timetable-heading" className="text-2xl font-bold tracking-tight">
        Live departures
      </h2>
      <p className="mt-2 text-muted-foreground">
        Type any Metro station, bus station or ferry landing. Don&apos;t worry about
        spelling — we&apos;ll find the closest match.
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
            role="combobox"
            aria-expanded={showList}
            aria-controls="stop-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={showList ? `stop-opt-${active}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
              setFocused(true)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 150)}
            onKeyDown={onKeyDown}
            placeholder="e.g. Monument, Haymrket, Whitly Bay"
            autoComplete="off"
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
          {showList && (
            <ul
              id="stop-suggestions"
              role="listbox"
              className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
            >
              {matches.map((m, i) => {
                const Icon = ICONS[m.stop.kind]
                return (
                  <li
                    key={m.stop.name}
                    id={`stop-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      choose(m.stop)
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 ${i === active ? "bg-secondary" : ""}`}
                  >
                    <Icon className="size-4 text-primary" aria-hidden="true" />
                    <span className="flex-1">{m.stop.name}</span>
                    <span className="text-xs capitalize text-muted-foreground">{m.stop.kind}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Show departures
        </button>
      </form>

      {notFound && (
        <p className="mt-4 rounded-lg border border-border bg-secondary px-4 py-3 text-secondary-foreground" role="status">
          We couldn&apos;t find anywhere called &ldquo;{notFound}&rdquo;. Try the first few letters of the
          station name.
        </p>
      )}

      {stop && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border" role="status" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-nexus-ink px-4 py-3 text-white">
            <p className="font-semibold">
              Departures from {stop.name}
              {typed && <span className="ml-2 text-sm font-normal text-white/80">(closest match)</span>}
            </p>
            <p className="text-sm tabular-nums text-white/80">
              Updated {now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <ul className="divide-y divide-border">
            {departures.map((dep, i) => {
              const Icon = ICONS[dep.kind]
              return (
                <li key={`${dep.service}-${dep.destination}-${i}`} className="flex items-center gap-3 bg-card px-4 py-3 text-card-foreground">
                  <span
                    className={`flex h-10 min-w-10 shrink-0 items-center justify-center gap-1 rounded-lg px-2 text-sm font-bold ${
                      BADGE[dep.service] ?? "bg-nexus-red text-white"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {dep.kind === "bus" && dep.service}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {dep.destination}
                      {dep.kind === "metro" && (
                        <span className="font-normal text-muted-foreground"> · {dep.service} line</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dep.platform && (dep.kind === "metro" ? `Platform ${dep.platform} · ` : `Stand ${dep.platform} · `)}
                      <span className={dep.status === "Delayed" ? "font-semibold text-destructive" : ""}>{dep.status}</span>
                    </p>
                  </div>
                  <span className="text-right font-bold tabular-nums text-primary">
                    {dep.dueMins === 0 ? "Due" : `${dep.dueMins} min`}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="bg-muted px-4 py-2.5 text-xs text-muted-foreground">
            Mock departure data for demonstration — refreshes every 30 seconds.
          </p>
        </div>
      )}
    </section>
  )
}

// Filters stops dynamically as the user types using searchStops(query)
// Implements WAI-ARIA combobox attributes (role="combobox", role="listbox", role="option", aria-activedescendant) for screen reader support
// Supports keyboard navigation using ArrowUp and ArrowDown to highlight options, Escape to dismiss the list, and Enter to select

// When a stop is selected, a 30-second setInterval updates the now state to keep countdown times current
// Generates a sorted departure list displaying destination, line name, platform/stand number, delay status, and remaining minutes (rendering "Due" when dueMins === 0)

// Maps transport types to icons (TrainFront for Metro, Bus for buses, Ship for ferries)
// Applies line-specific color badges using the BADGE map (Green line, Yellow line, Shields Ferry, and red fallback for buses)

// Displays a fallback status alert (notFound) if a search yields no matching stops
// Shows a top banner displaying the selected station name and a localized update timestamp (now.toLocaleTimeString)



