import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactDetails } from "@/components/contact/contact-details"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our customer support team by phone, email or message. We&apos;re here to help with fares, lost property, refunds and accessibility.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="We&apos;re here to help"
        description="Have a question about fares, a lost item or need accessibility support? Choose the way that works best for you."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <ContactDetails />
        </div>
      </div>
    </>
  )
}
