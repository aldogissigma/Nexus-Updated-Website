import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { FareTable } from "@/components/tickets/fare-table"
import { FareFinder } from "@/components/tickets/fare-finder"

export const metadata: Metadata = {
  title: "Tickets & Fares",
  description:
    "Clear, upfront ticket prices for bus, Metro and ferry. Use the fare finder to choose the best-value ticket for how you travel.",
}

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tickets & fares"
        title="Simple pricing, best value guaranteed"
        description="Every fare is shown upfront with no hidden charges. Daily and weekly capping means you always pay the lowest price for your travel."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <FareTable />
        <FareFinder />
      </div>
    </>
  )
}
