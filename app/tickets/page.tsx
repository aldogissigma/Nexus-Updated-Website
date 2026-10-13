import type { Metadata } from "next"
import { Coach } from "@/assets"
import { PageHeader } from "@/components/ui/page-header"
import { FareTable } from "@/components/tickets/fare-table"
import { FareFinder } from "@/components/tickets/fare-finder"
import { MayorsFare, MetroZones, TicketFaqs, TicketsByMode } from "@/components/tickets/ticket-info"

export const metadata: Metadata = {
  title: "Tickets & Fares",
  description:
    "Clear, upfront ticket prices for Metro, bus, ferry and local rail. Use the fare finder to choose the best-value ticket for how you travel.",
}
// tab title
export default function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tickets & fares"
        title="Simple pricing, best value guaranteed"
        description="Every fare is shown upfront with no hidden charges. Daily and weekly capping means you always pay the lowest price for your travel."
        sideImage={Coach}
        sideImageAlt="A local bus on route 37"
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <FareTable />
        <FareFinder />
        <MayorsFare />
        <TicketsByMode />
        <MetroZones />
        <TicketFaqs />
      </div>
    </>
  )
}
// header at the top
// all the different sustems on the tickets and fares app e.f the fare table shows the table of fares
