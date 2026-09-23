import { HeroSection } from "@/components/home/hero-section"
import { ServiceCards } from "@/components/home/service-cards"
import { AiCallout } from "@/components/home/ai-callout"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <AiCallout />
    </>
  )
}
