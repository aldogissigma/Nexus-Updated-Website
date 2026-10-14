// the choose your card feature. depending on what option you choose, if greys out everything that doesnt fit that

"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { POP_CARDS, type AgeGroup } from "@/lib/pop-cards"

const FILTERS: { value: AgeGroup | "all"; label: string }[] = [
  { value: "all", label: "Show all" },
  { value: "under16", label: "Under 16" },
  { value: "16to21", label: "16 to 21" },
  { value: "adult", label: "Adult" },
  { value: "60plus", label: "Pension age / disabled" },
  { value: "group", label: "School or group" },
]

export function CardPicker() {
  const [filter, setFilter] = useState<AgeGroup | "all">("all")

  return (
    <section aria-labelledby="card-types-heading">
      <h2 id="card-types-heading" className="text-2xl font-bold tracking-tight">
        Choose your card
      </h2>
      <p className="mt-2 text-muted-foreground">
        Select a card to see who it&apos;s for, where it works and how to get one. Not sure?
        Pick who&apos;s travelling to highlight the best matches.
      </p>

      <fieldset className="mt-5">
        <legend className="sr-only">Who is travelling?</legend>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {POP_CARDS.map((card) => {
          const match = filter === "all" || card.bestFor.includes(filter)
          return (
            <li key={card.slug} className={match ? "" : "opacity-40"}>
              <Link
                href={`/pop-cards/${card.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-3 text-card-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="relative">
                  <Image
                    src={card.image}
                    alt=""
                    sizes="(min-width: 1024px) 240px, (min-width: 768px) 30vw, 45vw"
                    className="aspect-[1.586] w-full rounded-xl object-cover shadow-sm"
                  />
                  {card.badge && (
                    <span className="absolute right-2 top-2 rounded-full bg-nexus-yellow px-2 py-0.5 text-xs font-bold text-[#14211f]">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{card.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{card.audience}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View card
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                {match && filter !== "all" && <span className="sr-only">(recommended)</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
