import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { LiveAlerts } from "@/components/travel-info/live-alerts"
import { TimetableSearch } from "@/components/travel-info/timetable-search"
import { NetworkInfo } from "@/components/travel-info/network-info"

export const metadata: Metadata = {
  title: "Travel Information",
  description:
    "Live departures, real-time service alerts and network accessibility information for bus, Metro and ferry travel across the region.",
}

export default function TravelInfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel information"
        title="Timetables, maps and live updates"
        description="Check live departures, see today's service alerts and explore accessibility features across the network — all in one place."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-16">
        <LiveAlerts />
        <TimetableSearch />
        <NetworkInfo />
      </div>
    </>
  )
}
