import type { Metadata } from "next"
import { MayorFare } from "@/assets"
import { PageHeader } from "@/components/ui/page-header"
import { CardPicker } from "@/components/pop-cards/card-picker"
import { CompareTable } from "@/components/pop-cards/compare-table"
import { OrderSteps } from "@/components/pop-cards/order-steps"
import { ManagePanel } from "@/components/pop-cards/manage-panel"
import { CardHelp, PopFaqs, TapGuide, TopUpOptions } from "@/components/pop-cards/pop-info"

export const metadata: Metadata = {
  title: "Pop Cards",
  description:
    "Find the right Pop smartcard — Pay As You Go, Pop blue, Under 16, season tickets, CT Pass and group passes — and see how to apply, top up and manage it.",
}

export default function PopCardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Smart travel"
        title="Pop cards"
        description="Your reusable smartcard for Metro, bus, ferry and rail. Tap on, tap off, and always pay the best-value fare with daily capping."
        sideImage={MayorFare}
        sideImageAlt="A Pop card being tapped on a yellow Metro card reader"
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <CardPicker />
        <OrderSteps />
        <TapGuide />
        <ManagePanel />
        <CompareTable />
        <TopUpOptions />
        <CardHelp />
        <PopFaqs />
      </div>
    </>
  )
}
