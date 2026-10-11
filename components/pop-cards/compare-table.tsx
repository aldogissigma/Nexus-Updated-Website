import Link from "next/link"
import { POP_CARDS } from "@/lib/pop-cards"

export function CompareTable() {
  return (
    <section aria-labelledby="compare-heading">
      <h2 id="compare-heading" className="text-2xl font-bold tracking-tight">
        Compare cards at a glance
      </h2>
      <p className="mt-2 text-muted-foreground">
        Who each card is for, what it costs and where you can use it.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Comparison of Pop card types</caption>
          <thead>
            <tr className="bg-secondary text-secondary-foreground">
              <th scope="col" className="px-4 py-3 font-semibold">Card</th>
              <th scope="col" className="px-4 py-3 font-semibold">Who it&apos;s for</th>
              <th scope="col" className="px-4 py-3 font-semibold">Cost</th>
              <th scope="col" className="px-4 py-3 font-semibold">Valid on</th>
            </tr>
          </thead>
          <tbody>
            {POP_CARDS.map((card, i) => (
              <tr key={card.slug} className={i % 2 === 0 ? "bg-card" : "bg-muted/60"}>
                <th scope="row" className="px-4 py-3 font-semibold">
                  <Link
                    href={`/pop-cards/${card.slug}`}
                    className="text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {card.shortName}
                  </Link>
                </th>
                <td className="px-4 py-3">{card.audience}</td>
                <td className="px-4 py-3 text-muted-foreground">{card.cost}</td>
                <td className="px-4 py-3 text-muted-foreground">{card.validOn.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
