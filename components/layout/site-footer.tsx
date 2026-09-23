import Link from "next/link"
import { Phone } from "lucide-react"
import { NAV_ITEMS } from "@/lib/navigation"
import { BrandLogo } from "./brand-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-sm text-sm text-muted-foreground">
            A conceptual, accessibility-first redesign of the regional travel service.
            Plan journeys, manage Pop cards and buy tickets with less clutter.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Services</h2>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Help</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              <a
                href="tel:01912020747"
                className="rounded underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                0191 20 20 747
              </a>
            </li>
            <li>Travel line open 7am–8pm daily.</li>
            <li>Use the Nexus AI Support widget for instant answers.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground md:px-6">
          Conceptual redesign for demonstration only. Not affiliated with any live
          transit operator. &copy; {new Date().getFullYear()} Nexus Travel (concept).
        </p>
      </div>
    </footer>
  )
}
