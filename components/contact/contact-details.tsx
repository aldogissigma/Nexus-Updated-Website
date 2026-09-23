import { Clock, Mail, MapPin, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Detail = {
  icon: LucideIcon
  title: string
  lines: { text: string; href?: string }[]
}

const DETAILS: Detail[] = [
  {
    icon: Phone,
    title: "Call us",
    lines: [
      { text: "0191 000 0000", href: "tel:01910000000" },
      { text: "Mon–Fri, 7am–8pm" },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [{ text: "help@regiontransit.example", href: "mailto:help@regiontransit.example" }],
  },
  {
    icon: MapPin,
    title: "Visit a Travelshop",
    lines: [{ text: "Central Station Concourse" }, { text: "Open 7 days a week" }],
  },
  {
    icon: Clock,
    title: "Response times",
    lines: [{ text: "Phone: immediate" }, { text: "Email & form: within 2 working days" }],
  },
]

export function ContactDetails() {
  return (
    <section aria-labelledby="details-heading">
      <h2 id="details-heading" className="text-xl font-bold">
        Other ways to reach us
      </h2>
      <ul className="mt-5 space-y-4">
        {DETAILS.map((detail) => {
          const Icon = detail.icon
          return (
            <li key={detail.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{detail.title}</h3>
                {detail.lines.map((line) => (
                  <p key={line.text} className="text-sm text-muted-foreground">
                    {line.href ? (
                      <a
                        href={line.href}
                        className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </p>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
