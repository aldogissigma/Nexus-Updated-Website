import { Leaf, HeartHandshake, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const STATS: { value: string; label: string }[] = [
  { value: "1.2m", label: "Journeys every day" },
  { value: "340", label: "Bus & Metro routes" },
  { value: "99.4%", label: "Services on time" },
  { value: "60+", label: "Years connecting the region" },
]

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Built for everyone",
    description:
      "We design our services and this website to be usable by all, regardless of age, ability or how they travel.",
  },
  {
    icon: Leaf,
    title: "Greener journeys",
    description:
      "Our fleet is going zero-emission, helping cut congestion and improve air quality across the region.",
  },
  {
    icon: HeartHandshake,
    title: "Fair value fares",
    description:
      "Daily and weekly capping guarantees you always pay the lowest fare — no need to guess the best ticket.",
  },
]

export function AboutContent() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="mission-heading" className="max-w-3xl">
        <h2 id="mission-heading" className="text-2xl font-bold tracking-tight">
          Our mission
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          We connect communities across the region with reliable, affordable and accessible
          public transport. From the first morning bus to the last ferry home, we&apos;re here
          to keep the region moving — and to make every journey simpler than the last.
        </p>
      </section>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Network by numbers
        </h2>
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-secondary p-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-bold tracking-tight">
          What we stand for
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <li key={value.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
