// the hero banner at the top of the home page with the dark green gradient train image and hero planner widget

import Image from "next/image"
import { NorthShieldsFerryLanding } from "@/assets"
import { HeroJourneyPlanner } from "./hero-journey-planner"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-nexus-ink text-white">
      <div aria-hidden="true" data-decorative="true" className="absolute inset-0">
        <Image
          src={NorthShieldsFerryLanding}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-ink via-nexus-ink/85 to-nexus-ink/50" />
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-1.5">
        <span className="flex-1 bg-nexus-green" />
        <span className="flex-1 bg-nexus-red" />
        <span className="flex-1 bg-nexus-blue" />
        <span className="flex-1 bg-nexus-yellow" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <span className="size-2 rounded-full bg-nexus-yellow" aria-hidden="true" />
            Metro · Bus · Ferry · Rail
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Getting around Tyne and Wear, made simple.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg text-white/90">
            Plan a journey, top up your Pop card and find the best-value ticket in a few
            taps. Every screen is built to be clear, readable and easy to use for everyone.
          </p>
        </div>

        <HeroJourneyPlanner />
      </div>
    </section>
  )
}
