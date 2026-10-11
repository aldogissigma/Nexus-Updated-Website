import { HeroSection } from "@/components/home/hero-section"
import { ModeStrip } from "@/components/home/mode-strip"
import { ServiceCards } from "@/components/home/service-cards"
import { AiCallout } from "@/components/home/ai-callout"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ModeStrip />
      <ServiceCards />
      <AiCallout />
    </>
  )
}
