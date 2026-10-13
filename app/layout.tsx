import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AccessibilityProvider, THEME_INIT_SCRIPT } from "@/components/accessibility/accessibility-provider"
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
    default: "Nexus — Metro, bus, ferry, tickets & Pop cards in Tyne and Wear",
    template: "%s | Nexus",
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
//  making mobile better, default browser titles, page descriptions aswell as icons for light and dark modes

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#12705f" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1816" },
  ],
}
// makes the dark mode match the green at the top

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <AccessibilityProvider>
          <SkipLink />
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
// preloads before the body renders, react build in accessibility, use of the tab button, 
// site headers + footers, the container handling the current page, the ai assistant on the website
