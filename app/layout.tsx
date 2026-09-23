import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AccessibilityProvider } from "@/components/accessibility/accessibility-provider"
import { AccessibilityBar } from "@/components/accessibility/accessibility-bar"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkipLink } from "@/components/layout/skip-link"
import { AiAssistant } from "@/components/ai/ai-assistant"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Nexus Travel — Accessible journeys, tickets & Pop cards",
    template: "%s | Nexus Travel",
  },
  description:
    "A clean, accessibility-first travel service redesign. Plan journeys, manage Pop cards, buy tickets and get instant help from Nexus AI Support.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#26324d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <AccessibilityProvider>
          <SkipLink />
          <AccessibilityBar />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <AiAssistant />
        </AccessibilityProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
