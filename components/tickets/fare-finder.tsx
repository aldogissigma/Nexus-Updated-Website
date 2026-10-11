"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Lightbulb } from "lucide-react"

type Frequency = "occasional" | "regular" | "daily"
type Traveller = "adult" | "young" | "child" | "concession"
type Modes = "metro" | "mixed"

type Recommendation = { ticket: string; reason: string; href?: string }

const BASE: Record<Frequency, Recommendation> = {
  occasional: {
    ticket: "Pay as you go on Pop",
    reason: "For a few trips a week, tap in and out and let daily capping protect you from overpaying.",
    href: "/pop-cards/pay-as-you-go",
  },
  regular: {
    ticket: "Weekly pass",
    reason: "Travelling most days? A weekly pass costs less than five DaySavers and covers all zones.",
    href: "/pop-cards/season-tickets-network-one",
  },
  daily: {
    ticket: "Monthly or annual pass",
    reason: "Commuting daily? A season pass gives the lowest cost per journey and locks in your price.",
    href: "/pop-cards/season-tickets-network-one",
  },
}

function recommend(traveller: Traveller, frequency: Frequency, modes: Modes): Recommendation {
  if (traveller === "concession") {
    return {
      ticket: "CT Pass + Metro Gold Card",
      reason: "Free off-peak bus travel with a CT Pass, and a low-cost Gold Card for unlimited Metro, ferry and local rail.",
      href: "/pop-cards/concessionary-travel-pass",
    }
  }
  if (traveller === "child") {
    return frequency === "occasional"
      ? {
          ticket: "Under 16 Pop (child fares)",
          reason: "Child fares on every journey, all day, every day — topped up as you go.",
          href: "/pop-cards/under-16-and-school-pass",
        }
      : {
          ticket: "Under 16 Pop + School Pass",
          reason: "A termly or annual School Pass covers every home-to-school journey before 7pm.",
          href: "/pop-cards/under-16-and-school-pass",
        }
  }
  const base = BASE[frequency]
  const network = modes === "mixed" && frequency !== "occasional"
  if (traveller === "young") {
    return frequency === "occasional"
      ? {
          ticket: "Pop blue (youth fares)",
          reason: "Lower youth fares on every journey, with daily capping, if you're 21 or under.",
          href: "/pop-cards/pop-blue",
        }
      : {
          ticket: network ? "Network One for Young People" : "18 & Under / Student Metro Season",
          reason: network
            ? "Unlimited travel on every bus, Metro, ferry and local rail at a discounted youth price."
            : "Big discounts on Metro season tickets for young people and students.",
          href: "/pop-cards/season-tickets-network-one",
        }
  }
  return network
    ? {
        ticket: frequency === "daily" ? "Network One — monthly or annual" : "Network One — weekly",
        reason: "You change between bus and Metro, so a Network One ticket covers every operator in one go.",
        href: "/pop-cards/season-tickets-network-one",
      }
    : base
}

function Options<T extends string>({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string
  legend: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{legend}</legend>
      <div className={`mt-3 grid gap-2 ${options.length === 4 ? "sm:grid-cols-4" : options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((option) => {
          const isActive = value === option.value
          return (
            <label
              key={option.value}
              className={
                isActive
                  ? "flex cursor-pointer items-center gap-2 rounded-lg border-2 border-primary bg-card px-4 py-3 text-sm font-medium text-card-foreground"
                  : "flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground hover:bg-muted"
              }
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isActive}
                onChange={() => onChange(option.value)}
                className="size-4 accent-primary"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function FareFinder() {
  const [traveller, setTraveller] = useState<Traveller>("adult")
  const [frequency, setFrequency] = useState<Frequency>("regular")
  const [modes, setModes] = useState<Modes>("metro")
  const recommendation = useMemo(
    () => recommend(traveller, frequency, modes),
    [traveller, frequency, modes],
  )

  return (
    <section aria-labelledby="finder-heading" className="rounded-2xl border border-border bg-secondary p-6 text-secondary-foreground md:p-8">
      <h2 id="finder-heading" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Lightbulb className="size-6 text-primary" aria-hidden="true" />
        Find your best-value ticket
      </h2>
      <p className="mt-2 text-muted-foreground">
        Answer three quick questions and we&apos;ll suggest the cheapest option.
      </p>

      <div className="mt-6 space-y-6">
        <Options
          name="traveller"
          legend="Who is travelling?"
          value={traveller}
          onChange={setTraveller}
          options={[
            { value: "adult", label: "Adult" },
            { value: "young", label: "Aged 16–21 or student" },
            { value: "child", label: "Under 16" },
            { value: "concession", label: "Pension age / disabled" },
          ]}
        />
        <Options
          name="frequency"
          legend="How often do you travel?"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "occasional", label: "A few times a week" },
            { value: "regular", label: "Most days" },
            { value: "daily", label: "Every day" },
          ]}
        />
        <Options
          name="modes"
          legend="How do you usually travel?"
          value={modes}
          onChange={setModes}
          options={[
            { value: "metro", label: "Mostly Metro" },
            { value: "mixed", label: "Bus and Metro" },
          ]}
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 text-card-foreground" role="status" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Recommended</p>
        <p className="mt-1 text-lg font-bold">{recommendation.ticket}</p>
        <p className="mt-1 text-muted-foreground">{recommendation.reason}</p>
        {recommendation.href && (
          <Link
            href={recommendation.href}
            className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            See the card this goes on
          </Link>
        )}
      </div>
    </section>
  )
}
