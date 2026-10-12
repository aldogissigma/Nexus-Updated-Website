import type { Metadata } from "next"
import { NexusHQ } from "@/assets"
import { PageHeader } from "@/components/ui/page-header"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About Nexus",
  description:
    "Nexus owns and runs the Tyne and Wear Metro and Shields Ferry, supports local buses and manages Pop cards and concessionary travel.",
}
// creates title page like thing at the top aswell as letting ppl specifically search for it if u do /about i think
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Nexus"
        title="Keeping Tyne and Wear moving"
        description="We run the Metro and the Shields Ferry, support the bus network and help over a million people get around every week."
        image={NexusHQ}
        imagePosition="center 40%"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <AboutContent />
      </div>
    </>
  )
}
// creates a banner with the specific title, description and then uses the image from assets
