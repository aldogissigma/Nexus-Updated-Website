import Image, { type StaticImageData } from "next/image"
import { Accessibility, Bike, Clock, Dog, Info, Luggage, PhoneCall, Search } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BusesLogo, FerryLogo, MetroLogo, RailLogo } from "@/assets"
import { METRO_LINES } from "@/lib/stops"

type ModeGuide = {
  id: string
  title: string
  logo: StaticImageData
  frequency: string
  hours: string
  pay: string
  access: string
  tip: string
}

const GUIDES: ModeGuide[] = [
  {
    id: "metro",
    title: "Metro",
    logo: MetroLogo,
    frequency: "Every 10–12 minutes on each line, more often in the city centre where lines share track.",
    hours: "Around 5:30am to midnight, with later trains on some weekend nights.",
    pay: "Tap Pop or contactless on the yellow readers at the station entrance — and tap off when you leave.",
    access: "Every station is step-free by lift or ramp. New trains have a sliding step at every door.",
    tip: "Change between Green and Yellow lines anywhere from South Gosforth to Pelaw.",
  },
  {
    id: "bus",
    title: "Bus",
    logo: BusesLogo,
    frequency: "Main routes every 10–15 minutes in the daytime; quieter routes hourly.",
    hours: "Most routes run 6am to 11pm. Some night buses run at weekends.",
    pay: "Tap Pop or contactless on board. Network One tickets work with every operator.",
    access: "All buses are low-floor with a wheelchair space and audio-visual next-stop announcements.",
    tip: "Look for the stop letter on the departures board at interchanges — it tells you where to wait.",
  },
  {
    id: "ferry",
    title: "Shields Ferry",
    logo: FerryLogo,
    frequency: "Every 30 minutes. The crossing takes about 7 minutes.",
    hours: "From around 7am until early evening, later in summer.",
    pay: "Buy at the landing ticket machine or use Pop, a DaySaver or a season ticket.",
    access: "Both landings and the ferry are step-free. Cycles travel free.",
    tip: "North Shields Metro is a short walk from the North Shields landing via the Fish Quay.",
  },
  {
    id: "rail",
    title: "Local rail",
    logo: RailLogo,
    frequency: "Northern services link Newcastle with Sunderland, the MetroCentre and the Northumberland Line.",
    hours: "Typically from 6am to 11pm.",
    pay: "Network One and Gold Card are valid between Newcastle and Sunderland. Otherwise buy a rail ticket.",
    access: "Book assisted travel at least 2 hours before you travel through Passenger Assist.",
    tip: "Rail can be the quickest way between Newcastle and Sunderland city centres.",
  },
]

const TRAVEL_WITH: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Accessibility, title: "Wheelchairs & mobility scooters", text: "Wheelchairs travel on all services. Small, approved scooters can use Metro and the ferry." },
  { icon: Bike, title: "Bikes", text: "Folding bikes are welcome everywhere. Full-size bikes go free on the ferry; secure parking at major stations." },
  { icon: Dog, title: "Dogs", text: "Well-behaved dogs on a lead travel free. Assistance dogs are welcome at all times." },
  { icon: Luggage, title: "Pushchairs & luggage", text: "Use the wide gates at Metro stations and the dedicated spaces on trains and buses." },
  { icon: PhoneCall, title: "Help points", text: "Every Metro platform has a help point linked to the control centre, 24 hours a day." },
  { icon: Search, title: "Lost property", text: "Report lost items online. Metro items are kept for 30 days at the Haymarket TravelShop." },
]

function LineDiagram({ name, color, stations }: { name: string; color: string; stations: readonly string[] }) {
  const interchanges = new Set(["South Gosforth", "Haymarket", "Monument", "Central Station", "Gateshead", "Heworth", "Pelaw", "Sunderland", "St James"])
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
      <h3 className="flex items-center gap-2 font-semibold">
        <span className="h-2 w-8 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
        {name} line
        <span className="text-sm font-normal text-muted-foreground">· {stations.length} stations</span>
      </h3>
      <ol className="mt-4 columns-2 gap-6 text-sm sm:columns-3">
        {stations.map((s) => (
          <li key={s} className="relative mb-1.5 flex break-inside-avoid items-center gap-2">
            <span
              className={`shrink-0 rounded-full border-2 ${interchanges.has(s) ? "size-3 bg-white" : "size-2.5"}`}
              style={{ borderColor: color, backgroundColor: interchanges.has(s) ? "white" : color }}
              aria-hidden="true"
            />
            <span className={interchanges.has(s) ? "font-semibold" : ""}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function NetworkInfo() {
  return (
    <section aria-labelledby="network-heading" className="space-y-10">
      <div>
        <h2 id="network-heading" className="text-2xl font-bold tracking-tight">
          Getting around the network
        </h2>
        <p className="mt-2 text-muted-foreground">
          How often each service runs, when it runs, how to pay and how to get on board.
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {GUIDES.map((g) => (
          <li key={g.id} id={g.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 text-card-foreground">
            <div className="flex items-center gap-3">
              <Image src={g.logo} alt="" className="h-12 w-auto" />
              <h3 className="text-xl font-semibold">{g.title}</h3>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="flex items-center gap-1.5 font-semibold"><Clock className="size-4 text-primary" aria-hidden="true" />How often</dt>
                <dd className="mt-0.5 text-muted-foreground">{g.frequency} {g.hours}</dd>
              </div>
              <div>
                <dt className="font-semibold">How to pay</dt>
                <dd className="mt-0.5 text-muted-foreground">{g.pay}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 font-semibold"><Accessibility className="size-4 text-primary" aria-hidden="true" />Accessibility</dt>
                <dd className="mt-0.5 text-muted-foreground">{g.access}</dd>
              </div>
            </dl>
            <p className="mt-4 flex gap-2 rounded-lg bg-secondary p-3 text-sm text-secondary-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {g.tip}
            </p>
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-xl font-bold">Metro lines and stations</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Stations in bold are where you can change lines or connect to buses and rail.
        </p>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <LineDiagram name="Green" color="#2d9b4a" stations={METRO_LINES.Green.stations} />
          <LineDiagram name="Yellow" color="#e0a100" stations={METRO_LINES.Yellow.stations} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold">Travelling with…</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_WITH.map((t) => {
            const Icon = t.icon
            return (
              <li key={t.title} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-card-foreground">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
