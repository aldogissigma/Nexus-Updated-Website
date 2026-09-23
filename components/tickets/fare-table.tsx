type Fare = {
  name: string
  detail: string
  price: string
}

const FARES: Fare[] = [
  { name: "Single (adult)", detail: "One journey, one zone", price: "£2.10" },
  { name: "Single (child)", detail: "Ages 5–15", price: "£1.05" },
  { name: "DaySaver", detail: "Unlimited travel for one day", price: "£5.40" },
  { name: "Weekly pass", detail: "7 days, all zones", price: "£24.50" },
  { name: "Monthly pass", detail: "Best value for commuters", price: "£89.00" },
  { name: "Annual pass", detail: "Two months free vs. monthly", price: "£890.00" },
]

export function FareTable() {
  return (
    <section aria-labelledby="fares-heading">
      <h2 id="fares-heading" className="text-2xl font-bold tracking-tight">
        Clear, upfront prices
      </h2>
      <p className="mt-2 text-muted-foreground">
        No hidden fees. Daily capping means you never pay more than a DaySaver.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Ticket prices by type</caption>
          <thead>
            <tr className="bg-secondary text-secondary-foreground">
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                Ticket
              </th>
              <th scope="col" className="hidden px-4 py-3 text-sm font-semibold sm:table-cell">
                Details
              </th>
              <th scope="col" className="px-4 py-3 text-right text-sm font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {FARES.map((fare, index) => (
              <tr
                key={fare.name}
                className={index % 2 === 0 ? "bg-card" : "bg-muted/40"}
              >
                <th scope="row" className="px-4 py-3 font-medium">
                  {fare.name}
                  <span className="block text-sm font-normal text-muted-foreground sm:hidden">
                    {fare.detail}
                  </span>
                </th>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {fare.detail}
                </td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">
                  {fare.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
