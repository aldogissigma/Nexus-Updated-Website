"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpDown, Clock, MapPin, Search } from "lucide-react"

type Plan = {
  from: string
  to: string
  when: string
}

export function HeroJourneyPlanner() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [when, setWhen] = useState("now")
  const [plan, setPlan] = useState<Plan | null>(null)

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!from.trim() || !to.trim()) return
    // Conceptual result — a real planner would query a routing API here.
    setPlan({ from: from.trim(), to: to.trim(), when })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg md:p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Search className="size-5 text-primary" aria-hidden="true" />
        Plan your journey
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Bus, Metro and ferry — enter your stops to see the simplest route.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label htmlFor="from" className="mb-1.5 block text-sm font-medium">
              From
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Newcastle Central"
                autoComplete="off"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={swap}
            className="mb-0.5 hidden size-10 items-center justify-center self-end rounded-lg border border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
          >
            <ArrowUpDown className="size-4" aria-hidden="true" />
            <span className="sr-only">Swap start and destination</span>
          </button>

          <div>
            <label htmlFor="to" className="mb-1.5 block text-sm font-medium">
              To
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Gateshead Quays"
                autoComplete="off"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:w-48">
            <label htmlFor="when" className="mb-1.5 block text-sm font-medium">
              Leave
            </label>
            <div className="relative">
              <Clock
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <select
                id="when"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <option value="now">Now</option>
                <option value="15min">In 15 minutes</option>
                <option value="30min">In 30 minutes</option>
                <option value="1hr">In 1 hour</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-1"
          >
            Find routes
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </form>

      {plan && (
        <div
          className="mt-4 rounded-xl border border-border bg-secondary p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-foreground">
            Suggested routes from {plan.from} to {plan.to}
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2.5 text-sm">
              <span className="flex items-center gap-2">
                <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  Metro
                </span>
                Green line, direct
              </span>
              <span className="font-medium tabular-nums">18 min</span>
            </li>
            <li className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2.5 text-sm">
              <span className="flex items-center gap-2">
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  Bus 21
                </span>
                1 change at the Quayside
              </span>
              <span className="font-medium tabular-nums">27 min</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Conceptual results shown. Ask Nexus AI Support for step-by-step directions.
          </p>
        </div>
      )}
    </div>
  )
}
