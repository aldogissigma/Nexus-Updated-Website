import Image from "next/image"
import { Bus, CreditCard, HeartHandshake, Leaf, Ship, TicketCheck, TrainFront, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { NexusHQ, NorthShieldsFerryLanding, TrainBox } from "@/assets"

const STATS: { value: string; label: string }[] = [
  { value: "60", label: "Metro stations" },
  { value: "1980", label: "Year Metro opened" },
  { value: "46", label: "New Metro trains" },
  { value: "7 min", label: "Shields Ferry crossing" },
]

const ROLES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: TrainFront,
    title: "Tyne and Wear Metro",
    description:
      "Nexus owns and runs the Metro — two lines linking Newcastle Airport, the coast, South Shields and Sunderland.",
  },
  {
    icon: Ship,
    title: "Shields Ferry",
    description:
      "We run the ferry across the mouth of the Tyne between North Shields and South Shields, every 30 minutes.",
  },
  {
    icon: Bus,
    title: "Bus services",
    description:
      "We fund socially necessary bus routes, run bus stations and interchanges, and provide stops, shelters and timetable information.",
  },
  {
    icon: TicketCheck,
    title: "Concessionary travel",
    description:
      "We issue Concessionary Travel Passes for older and disabled people, and School Passes for young people across Tyne and Wear.",
  },
  {
    icon: CreditCard,
    title: "Pop smartcards",
    description:
      "We manage the Pop smartcard, used for pay-as-you-go travel and season tickets on Metro, bus, ferry and local rail.",
  },
  {
    icon: Users,
    title: "Customer information",
    description:
      "Our TravelShops, Traveline and real-time information help people plan journeys and get support when things go wrong.",
  },
]

const TIMELINE: { year: string; text: string }[] = [
  { year: "1969", text: "Tyneside Passenger Transport Executive is created — the organisation that became Nexus." },
  { year: "1980", text: "The Tyne and Wear Metro opens, the UK's first modern light rail system." },
  { year: "1991", text: "Metro extends to Newcastle Airport." },
  { year: "2002", text: "Metro reaches Sunderland and South Hylton, sharing track with mainline rail." },
  { year: "2022", text: "Metro Flow upgrade doubles the track in South Tyneside so trains can run more often." },
  { year: "2024", text: "Nexus starts working for the new North East Combined Authority, and the first new Stadler trains carry passengers." },
]

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Built for everyone",
    description: "Step-free Metro stations, help points and clear information so everyone can travel with confidence.",
  },
  {
    icon: Leaf,
    title: "Greener journeys",
    description: "Electric Metro trains and a growing zero-emission bus fleet help cut congestion and improve air quality.",
  },
  {
    icon: HeartHandshake,
    title: "Fair value fares",
    description: "Daily capping, Pop discounts and concessionary travel help keep public transport affordable.",
  },
]

export function AboutContent() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="mission-heading" className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 id="mission-heading" className="text-2xl font-bold tracking-tight">
            Who we are
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Nexus is the public body responsible for delivering transport services in Tyne and
            Wear on behalf of the North East Combined Authority. We own and run the Tyne and Wear
            Metro and the Shields Ferry, support the local bus network and help over a million
            people get around Newcastle, Gateshead, North Tyneside, South Tyneside and Sunderland.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            From the first Metro of the morning to the last ferry home, our job is to keep the
            region moving — and to make every journey simpler than the last.
          </p>
        </div>
        <figure>
          <Image
            src={NexusHQ}
            alt="Nexus House, the Nexus head office on St James Boulevard in Newcastle"
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <figcaption className="mt-2 text-sm text-muted-foreground">
            Nexus House, our head office in Newcastle.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Nexus by numbers
        </h2>
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border-t-4 border-nexus-green bg-secondary p-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-bold text-primary md:text-4xl">{stat.value}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="text-2xl font-bold tracking-tight">
          What Nexus does
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => {
            const Icon = role.icon
            return (
              <li key={role.title} className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{role.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="trains-heading" className="grid items-center gap-8 overflow-hidden rounded-2xl bg-nexus-ink text-white lg:grid-cols-2">
        <div className="relative h-64 lg:h-full" data-decorative="true">
          <Image src={TrainBox} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="p-6 md:p-8">
          <h2 id="trains-heading" className="text-2xl font-bold tracking-tight text-white">
            A new fleet for Metro
          </h2>
          <p className="mt-3 text-white/90">
            Our new Stadler trains are replacing the original 1980s fleet. They bring
            air conditioning, charging points, real-time information screens and a sliding
            step at every door for level boarding — making Metro easier to use for wheelchair
            users, people with pushchairs and anyone with heavy luggage.
          </p>
        </div>
      </section>

      <section aria-labelledby="ferry-heading" className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 id="ferry-heading" className="text-2xl font-bold tracking-tight">
            The Shields Ferry
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            A ferry has crossed the Tyne between North and South Shields for centuries. Today
            Nexus runs it every 30 minutes, with a crossing of around seven minutes. The North
            Shields landing sits right by the Fish Quay, a short walk from North Shields Metro.
          </p>
        </div>
        <Image
          src={NorthShieldsFerryLanding}
          alt="Aerial view of the North Shields ferry landing on the River Tyne"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </section>

      <section aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="text-2xl font-bold tracking-tight">
          Our history
        </h2>
        <ol className="mt-6 space-y-0 border-l-2 border-nexus-green pl-6">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative pb-6 last:pb-0">
              <span className="absolute -left-[33px] top-1 size-4 rounded-full border-4 border-background bg-nexus-green" aria-hidden="true" />
              <p className="font-bold text-primary">{item.year}</p>
              <p className="text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-bold tracking-tight">
          What we stand for
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <li key={value.title} className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
                <span className="flex size-11 items-center justify-center rounded-xl bg-nexus-yellow text-[#14211f]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="rounded-2xl bg-secondary p-5 text-sm text-secondary-foreground">
        This website is a conceptual redesign created for demonstration. For official
        information, visit nexus.org.uk.
      </p>
    </div>
  )
}
