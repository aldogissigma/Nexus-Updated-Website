import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission to connect the region with reliable, affordable and accessible public transport across bus, Metro and ferry.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Keeping the region moving"
        description="We&apos;re the team behind the region&apos;s bus, Metro and ferry network — working every day to make public transport simpler, greener and open to all."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <AboutContent />
      </div>
    </>
  )
}
