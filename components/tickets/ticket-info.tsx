// this covers the last 3 headers aswell as questions at the bottom

import Image from "next/image"
import Link from "next/link"
import { Banknote, CreditCard, Smartphone, Store } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BusesLogo, FerryLogo, MayorFare, MetroLogo, RailLogo } from "@/assets"
import { FaqList, type Faq } from "@/components/ui/faq-list"

const MODES = [
  {
    id: "metro",
    title: "Metro",
    logo: MetroLogo,
    points: [
      "Single, return and DaySaver tickets priced by zone (A, B, C)",
      "Contactless and Pop PAYG are capped daily",
      "Season tickets for 1 week, 4 weeks or a year",
    ],
  },
  {
    id: "bus",
    title: "Bus",
    logo: BusesLogo,
    points: [
      "Each operator sells its own singles and day tickets",
      "Network One tickets work on every operator",
      "Pay by contactless or Pop on board",
    ],
  },
  {
    id: "ferry",
    title: "Shields Ferry",
    logo: FerryLogo,
    points: [
      "Single and return tickets from the landing machines",
      "Metro DaySavers and season tickets include the ferry",
      "Cycles travel free",
    ],
  },
  {
    id: "rail",
    title: "Local rail",
    logo: RailLogo,
    points: [
      "Network One is valid between Newcastle and Sunderland",
      "Metro Gold Card holders travel on this section too",
      "Buy Northern tickets at stations or on board",
    ],
  },
]

const PAY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CreditCard, title: "Pop card", text: "PAYG credit or a season ticket — the cheapest way to travel regularly." },
  { icon: Smartphone, title: "Contactless", text: "Tap your bank card, phone or watch. The same card must tap on and off." },
  { icon: Store, title: "Ticket machines", text: "At every Metro station and ferry landing. All machines take card payments." },
  { icon: Banknote, title: "Cash", text: "Accepted on most buses and at Metro machines — exact change helps." },
]

const ZONES = [
  { zone: "A", color: "bg-nexus-yellow text-[#14211f]", text: "Central Newcastle and Gateshead, out to Regent Centre and Heworth." },
  { zone: "B", color: "bg-nexus-green text-white", text: "Outer Newcastle, North Tyneside and the Airport side of the Green line." },
  { zone: "C", color: "bg-nexus-red text-white", text: "The coast, South Shields and Sunderland." },
]

const FAQS: Faq[] = [
  {
    question: "Do children travel free?",
    answer: "Children under 5 travel free with a fare-paying adult. Ages 5–15 pay child fares with an Under 16 Pop card.",
  },
  {
    question: "What happens if I forget to tap off?",
    answer: "You may be charged the maximum fare. You can request an adjustment from your Pop or contactless journey history.",
  },
  {
    question: "Can I get a refund on a season ticket?",
    answer: "Yes — you can claim a refund for the unused part of a season ticket. An admin fee may apply.",
  },
  {
    question: "Is there a fine for travelling without a ticket?",
    answer: "Yes. Revenue officers check tickets and can issue a Penalty Fare if you don't have a valid ticket or Pop card.",
  },
  {
    question: "Which ticket covers bus and Metro?",
    answer: "Network One tickets are valid on all buses, Metro, the Shields Ferry and local rail in Tyne and Wear.",
  },
]

export function MayorsFare() {
  return (
    <section className="grid items-center gap-6 overflow-hidden rounded-2xl bg-nexus-ink text-white md:grid-cols-2">
      <div className="p-6 md:p-8">
        <span className="inline-flex rounded-full bg-nexus-yellow px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#14211f]">
          Lower fares
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Mayor&apos;s fares</h2>
        <p className="mt-2 text-white/90">
          Capped single and day fares backed by the North East Mayor mean young people and
          everyday travellers pay less on buses across the region. Just tap your Pop card or
          contactless — the lower fare is applied automatically.
        </p>
        <Link
          href="/pop-cards/pop-blue"
          className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#14211f] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get a Pop blue card
        </Link>
      </div>
      <div className="relative h-56 md:h-full" data-decorative="true">
        <Image src={MayorFare} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  )
}

export function TicketsByMode() {
  return (
    <section aria-labelledby="by-mode-heading">
      <h2 id="by-mode-heading" className="text-2xl font-bold tracking-tight">
        Tickets by type of transport
      </h2>
      <p className="mt-2 text-muted-foreground">What you can buy, and where it&apos;s valid.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODES.map((mode) => (
          <li key={mode.id} className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <Image src={mode.logo} alt="" className="h-12 w-auto" />
            <h3 className="mt-3 font-semibold">{mode.title}</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {mode.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function MetroZones() {
  return (
    <section aria-labelledby="zones-heading" className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 id="zones-heading" className="text-2xl font-bold tracking-tight">
          How Metro zones work
        </h2>
        <p className="mt-2 text-muted-foreground">
          Metro fares depend on how many zones you travel through — not how far. A 1-zone
          ticket covers any trip inside one zone; an all-zones ticket covers the whole network.
        </p>
        <ul className="mt-5 space-y-3">
          {ZONES.map((z) => (
            <li key={z.zone} className="flex items-center gap-4">
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${z.color}`}>
                {z.zone}
              </span>
              <span>{z.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ways to pay</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {PAY.map((p) => {
            const Icon = p.icon
            return (
              <li key={p.title} className="rounded-2xl border border-border bg-card p-4 text-card-foreground">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function TicketFaqs() {
  return (
    <section aria-labelledby="ticket-faq-heading">
      <h2 id="ticket-faq-heading" className="text-2xl font-bold tracking-tight">
        Tickets & fares questions
      </h2>
      <div className="mt-6">
        <FaqList items={FAQS} />
      </div>
    </section>
  )
}

// MayorsFare: A hero callout banner highlighting regional fare caps backed by the North East Mayor, featuring promotional imagery and a direct link to apply for a Pop Blue card.
// TicketsByMode: A four-column grid detailing ticket rules and validity across all four transit modes (Metro, Bus, Shields Ferry, and Local Rail).
// MetroZones: A two-column informational section explaining Metro tariff zones (Zone A, Zone B, Zone C) with color-coded badges on the left, alongside payment methods (Pop card, contactless, ticket machines, and cash) on the right.
// TicketFaqs: A ticket-specific FAQ section using <FaqList/> to answer common passenger questions regarding child fares, missed tap-offs, refunds, penalty fares, and multi-modal passes.
