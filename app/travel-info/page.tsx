import type { Metadata } from "next"
import { NorthShieldsFerryLanding } from "@/assets"
import { PageHeader } from "@/components/ui/page-header"
import { LiveAlerts } from "@/components/travel-info/live-alerts"
import { TimetableSearch } from "@/components/travel-info/timetable-search"
import { NetworkInfo } from "@/components/travel-info/network-info"
import { PlannedWorks } from "@/components/travel-info/planned-works"

export const metadata: Metadata = {
  title: "Travel Information",
  description:
    "Live departures, service alerts, planned works and practical guides for Metro, bus, ferry and local rail across Tyne and Wear.",
}

export default function TravelInfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel information"
        title="Live updates and how to get around"
        description="Check live departures, see today's service alerts and find out how to use every part of the network — all in one place."
        image={NorthShieldsFerryLanding}
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <LiveAlerts />
        <TimetableSearch />
        <PlannedWorks />
        <NetworkInfo />
      </div>
    </>
  )
}
