import { Check } from "lucide-react"

type CardType = {
  name: string
  audience: string
  price: string
  accent: string
  features: string[]
}

const CARD_TYPES: CardType[] = [
  {
    name: "Standard Pop",
    audience: "Adults 19+",
    price: "Free card",
    accent: "bg-primary text-primary-foreground",
    features: ["Pay as you go", "Daily price capping", "Top up online or in stations"],
  },
  {
    name: "Pop 16–18",
    audience: "Ages 16 to 18",
    price: "Free card",
    accent: "bg-accent text-accent-foreground",
    features: ["Up to 30% off adult fares", "Works on bus, Metro & ferry", "Photo ID included"],
  },
  {
    name: "Pop Discount",
    audience: "Concessions & disabled travel",
    price: "Free card",
    accent: "bg-secondary text-secondary-foreground border border-border",
    features: ["Reduced or free travel", "Companion option available", "Eligibility support in-app"],
  },
]

export function CardTypeGrid() {
  return (
    <section aria-labelledby="card-types-heading">
      <h2 id="card-types-heading" className="text-2xl font-bold tracking-tight">
        Choose your card
      </h2>
      <p className="mt-2 text-muted-foreground">
        There&apos;s a Pop card for every traveller. All cards are free to order.
      </p>

      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {CARD_TYPES.map((card) => (
          <li
            key={card.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            {/* Card visual */}
            <div
              className={`flex h-28 flex-col justify-between rounded-xl p-4 ${card.accent}`}
              data-decorative="true"
            >
              <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                Pop
              </span>
              <span className="text-lg font-bold">{card.name}</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold">{card.name}</h3>
            <p className="text-sm text-muted-foreground">{card.audience}</p>
            <p className="mt-1 font-medium text-primary">{card.price}</p>

            <ul className="mt-4 flex-1 space-y-2">
              {card.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
