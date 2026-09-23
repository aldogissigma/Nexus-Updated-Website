import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { CardTypeGrid } from "@/components/pop-cards/card-type-grid"
import { OrderSteps } from "@/components/pop-cards/order-steps"
import { ManagePanel } from "@/components/pop-cards/manage-panel"

export const metadata: Metadata = {
  title: "Pop Cards",
  description:
    "Order, top up and manage your Pop smart travel card. Standard, 16–18 and discount cards available — all free to order.",
}

export default function PopCardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Smart travel"
        title="Pop cards"
        description="Your reusable smart card for bus, Metro and ferry. Tap on, tap off, and always pay the best-value fare with daily capping."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <CardTypeGrid />
        <OrderSteps />
        <ManagePanel />
      </div>
    </>
  )
}
