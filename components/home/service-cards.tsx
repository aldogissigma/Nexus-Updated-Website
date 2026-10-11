import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Coach, MayorFare, TrainBox } from "@/assets"

type Service = {
  title: string
  href: string
  description: string
  image: StaticImageData
}

const SERVICES: Service[] = [
  {
    title: "Pop Cards",
    href: "/pop-cards",
    description: "Find the right Pop card, see how to apply and manage your balance.",
    image: MayorFare,
  },
  {
    title: "Tickets & Fares",
    href: "/tickets",
    description: "Clear, upfront pricing and a quick tool to find your best-value ticket.",
    image: Coach,
  },
  {
    title: "Travel Information",
    href: "/travel-info",
    description: "Live departures, service alerts and how to get around the network.",
    image: TrainBox,
  },
]

export function ServiceCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Core services</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need for day-to-day travel, and nothing you don&apos;t.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative h-44 overflow-hidden bg-muted" data-decorative="true">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-primary">
                  Explore
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
