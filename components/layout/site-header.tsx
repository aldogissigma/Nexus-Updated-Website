"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS } from "@/lib/navigation"
import { BrandLogo } from "./brand-logo"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <BrandLogo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative inline-flex items-center rounded-lg px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:text-foreground"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-base font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span>Menu</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex flex-col gap-0.5 rounded-lg px-3 py-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:bg-secondary"
                >
                  <span className="text-base font-semibold">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
