"use client"

import { useMemo, useState } from "react"
import { Lightbulb } from "lucide-react"

type Frequency = "occasional" | "regular" | "daily"

const RECOMMENDATIONS: Record<Frequency, { ticket: string; reason: string }> = {
  occasional: {
    ticket: "Pay as you go on Pop",
    reason: "For a few trips a week, tap in and out and let daily capping protect you from overpaying.",
  },
  regular: {
    ticket: "Weekly pass",
    reason: "Travelling most days? A weekly pass costs less than five DaySavers and covers all zones.",
  },
  daily: {
    ticket: "Monthly or annual pass",
    reason: "Commuting daily? A season pass gives the lowest cost per journey and locks in your price.",
  },
}

export function FareFinder() {
  const [frequency, setFrequency] = useState<Frequency>("regular")
  const recommendation = useMemo(() => RECOMMENDATIONS[frequency], [frequency])

  return (
    <section aria-labelledby="finder-heading" className="rounded-2xl border border-border bg-secondary p-6 md:p-8">
      <h2 id="finder-heading" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Lightbulb className="size-6 text-primary" aria-hidden="true" />
        Find your best-value ticket
      </h2>
      <p className="mt-2 text-muted-foreground">
        Tell us how often you travel and we&apos;ll suggest the cheapest option.
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">How often do you travel?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(
            [
              { value: "occasional", label: "A few times a week" },
              { value: "regular", label: "Most days" },
              { value: "daily", label: "Every day" },
            ] as { value: Frequency; label: string }[]
          ).map((option) => {
            const isActive = frequency === option.value
            return (
              <label
                key={option.value}
                className={
                  isActive
                    ? "flex cursor-pointer items-center gap-2 rounded-lg border-2 border-primary bg-card px-4 py-3 text-sm font-medium"
                    : "flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:bg-muted"
                }
              >
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={isActive}
                  onChange={() => setFrequency(option.value)}
                  className="size-4 accent-primary"
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-6 rounded-xl bg-card p-5" role="status" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Recommended
        </p>
        <p className="mt-1 text-lg font-bold">{recommendation.ticket}</p>
        <p className="mt-1 text-muted-foreground">{recommendation.reason}</p>
      </div>
    </section>
  )
}
