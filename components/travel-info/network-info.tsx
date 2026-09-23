import { Accessibility, Bike, MapPin, ParkingCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Accessibility,
    title: "Step-free access",
    description: "Every Metro station has lift or ramp access, with tactile platform edges.",
  },
  {
    icon: ParkingCircle,
    title: "Park & Ride",
    description: "Over 20 car parks connect directly to the Metro at reduced daily rates.",
  },
  {
    icon: Bike,
    title: "Cycle friendly",
    description: "Secure cycle storage at major interchanges; bikes travel free off-peak.",
  },
  {
    icon: MapPin,
    title: "Network map",
    description: "Simple, colour-coded lines make planning across bus, Metro and ferry easy.",
  },
]

export function NetworkInfo() {
  return (
    <section aria-labelledby="network-heading">
      <h2 id="network-heading" className="text-2xl font-bold tracking-tight">
        Getting around the network
      </h2>
      <p className="mt-2 text-muted-foreground">
        Designed to be accessible and connected for every kind of journey.
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <li key={feature.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
