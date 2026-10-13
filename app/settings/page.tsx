import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { SettingsPanel } from "@/components/settings/settings-panel"

export const metadata: Metadata = {
  title: "Accessibility settings",
  description:
    "Change text size, contrast, motion and spacing across the Nexus website. Your choices are saved on this device.",
}
// changes tab title
export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Accessibility settings"
        description="Make the website work the way you need it to. Changes apply straight away to every page and are saved on this device."
      />
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-16">
        <SettingsPanel />
      </div>
    </>
  )
}
// header at the top
