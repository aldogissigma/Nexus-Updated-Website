import Link from "next/link"
import { ArrowRight, CreditCard, Info, Ticket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Service = {
  title: string
  href: string
  description: string
  icon: LucideIcon
}

const SERVICES: Service[] = [
  {
    title: "Pop Cards",
    href: "/pop-cards",
    description: "Order, top up and manage your smart travel card.",
    icon: CreditCard,
  },
  {
    title: "Tickets & Fares",
    href: "/tickets",
    description: "Find the right ticket and see clear, upfront pricing.",
    icon: Ticket,
  },
  {
    title: "Travel Information",
    href: "/travel-info",
    description: "Timetables, network maps and live service alerts.",
    icon: Info,
  },
]

export function ServiceCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Core services
        </h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need for day-to-day travel, and nothing you don&apos;t.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-primary">
                  Explore
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
