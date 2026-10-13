// the line of images with the logos of the metros, buses, ferries and rail just above services 

import Image from "next/image"
import Link from "next/link"
import { BusesLogo, FerryLogo, MetroLogo, RailLogo } from "@/assets"

const MODES = [
  { label: "Metro", logo: MetroLogo, hash: "metro", detail: "60 stations, 2 lines" },
  { label: "Bus", logo: BusesLogo, hash: "bus", detail: "Hundreds of routes" },
  { label: "Ferry", logo: FerryLogo, hash: "ferry", detail: "Every 30 minutes" },
  { label: "Rail", logo: RailLogo, hash: "rail", detail: "Local Northern trains" },
]

export function ModeStrip() {
  return (
    <section aria-labelledby="modes-heading" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 id="modes-heading" className="sr-only">
          Ways to travel
        </h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {MODES.map((mode) => (
            <li key={mode.label}>
              <Link
                href={`/travel-info#${mode.hash}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-card-foreground transition-colors hover:border-primary/50 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Image src={mode.logo} alt="" className="h-11 w-auto shrink-0" />
                <span className="leading-tight">
                  <span className="block font-semibold">{mode.label}</span>
                  <span className="block text-sm text-muted-foreground">{mode.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
