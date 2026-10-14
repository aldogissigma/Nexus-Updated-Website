// this is a reusable ui component used on pages like Tickets & fares to do the faqs

import { ChevronDown } from "lucide-react"

export type Faq = { question: string; answer: string }

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      {items.map((item) => (
        <li key={item.question}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-5 pb-5 text-muted-foreground">{item.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  )
}
