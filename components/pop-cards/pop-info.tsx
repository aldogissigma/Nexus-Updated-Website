import {
  CreditCard,
  History,
  MapPin,
  ShieldAlert,
  Smartphone,
  Store,
  TrainFront,
  Wifi,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { FaqList, type Faq } from "@/components/ui/faq-list"

const TAP_STEPS = [
  { title: "Tap on", text: "Touch your card flat on the yellow reader before you board or enter the platform." },
  { title: "Wait for the green light", text: "A beep and green light means you're good to go. Red means try again or check your balance." },
  { title: "Tap off (Metro)", text: "Tap again when you leave the station so you're charged the correct fare." },
  { title: "Capping does the rest", text: "We add up your journeys and never charge more than the day ticket price." },
]

const TOP_UP: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Smartphone, title: "Pop app", text: "Top up in seconds and tap your phone-linked card at any reader to collect." },
  { icon: Wifi, title: "Online", text: "Log in to your Pop account. Credit is collected next time you tap on Metro." },
  { icon: TrainFront, title: "Metro ticket machines", text: "Every Metro station. Pay by card, phone or cash and credit is added instantly." },
  { icon: Store, title: "TravelShops & PayPoint", text: "Nexus TravelShops and selected local shops can top up over the counter." },
]

const HELP: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldAlert,
    title: "Lost, stolen or damaged card",
    text: "Report it in your Pop account or call 0191 20 20 747. Registered cards are blocked straight away and your balance or season ticket is moved to a replacement.",
  },
  {
    icon: History,
    title: "Check balance & journey history",
    text: "See every tap, top-up and cap in your Pop account — useful for expenses and spotting missed tap-offs.",
  },
  {
    icon: CreditCard,
    title: "Charged the wrong fare?",
    text: "Forgot to tap off or the reader didn't work? Request a fare adjustment from your journey history within 28 days.",
  },
  {
    icon: MapPin,
    title: "Find a TravelShop",
    text: "Help in person at Haymarket, Monument, Central Station, Gateshead, Four Lane Ends, Heworth and Park Lane.",
  },
]

const FAQS: Faq[] = [
  {
    question: "How long does a new card take to arrive?",
    answer: "Most cards are posted within 5 working days. Cards without a photo can be bought instantly at TravelShops.",
  },
  {
    question: "Can I have more than one ticket on a card?",
    answer: "Yes. A Pop card can hold PAYG credit and a season ticket at the same time — the season ticket is used first.",
  },
  {
    question: "What is daily capping?",
    answer: "Once your journeys in a day add up to the price of a day ticket, the rest of your travel that day is free.",
  },
  {
    question: "Do I need to register my card?",
    answer: "It's optional but recommended — registered cards can be blocked and replaced with the balance protected.",
  },
  {
    question: "Can I use contactless instead?",
    answer: "Yes, on Metro and most buses. Pop is better if you're entitled to a discount, want auto top-up or need a season ticket.",
  },
]

export function TapGuide() {
  return (
    <section aria-labelledby="tap-heading">
      <h2 id="tap-heading" className="text-2xl font-bold tracking-tight">
        How to use your Pop card
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TAP_STEPS.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <span className="flex size-9 items-center justify-center rounded-full bg-nexus-yellow font-bold text-[#14211f]">
              {i + 1}
            </span>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function IconList({ items }: { items: { icon: LucideIcon; title: string; text: string }[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function TopUpOptions() {
  return (
    <section aria-labelledby="topup-heading">
      <h2 id="topup-heading" className="text-2xl font-bold tracking-tight">
        Where to top up
      </h2>
      <p className="mt-2 text-muted-foreground">Four ways to add credit or renew a ticket.</p>
      <IconList items={TOP_UP} />
    </section>
  )
}

export function CardHelp() {
  return (
    <section aria-labelledby="card-help-heading">
      <h2 id="card-help-heading" className="text-2xl font-bold tracking-tight">
        Help with your card
      </h2>
      <IconList items={HELP} />
    </section>
  )
}

export function PopFaqs() {
  return (
    <section aria-labelledby="pop-faq-heading">
      <h2 id="pop-faq-heading" className="text-2xl font-bold tracking-tight">
        Pop card questions
      </h2>
      <div className="mt-6">
        <FaqList items={FAQS} />
      </div>
    </section>
  )
}
