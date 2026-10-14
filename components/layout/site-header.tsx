"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, Moon, Settings, Sun, X } from "lucide-react"
import { useAccessibility } from "@/components/accessibility/accessibility-provider"
import { NAV_ITEMS } from "@/lib/navigation"
import { BrandLogo } from "./brand-logo"

export function SiteHeader() {
  const { isDark, setTheme } = useAccessibility()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200 supports-[backdrop-filter]:bg-background/70">
      {/* Nexus Brand Identity Line */}
      <div className="grid h-1 w-full grid-cols-4" aria-hidden="true">
        <div className="bg-nexus-green" />
        <div className="bg-nexus-blue" />
        <div className="bg-nexus-yellow" />
        <div className="bg-nexus-red" />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        {/* Brand / Logo Section */}
        <div className="flex items-center gap-6 transition-transform duration-200 hover:scale-[1.01]">
          <BrandLogo />
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 p-1 shadow-2xs backdrop-blur-xs">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 ${
                      active
                        ? "bg-card text-foreground font-semibold shadow-xs border border-border/50"
                        : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-nexus-green animate-pulse"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Action Controls Section */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="group relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all duration-200 hover:border-nexus-green/60 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-90"
          >
            <Sun
              className={`size-4 text-nexus-yellow transition-all duration-300 group-hover:rotate-45 ${
                isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
              }`}
              aria-hidden="true"
            />
            <Moon
              className={`absolute size-4 text-nexus-blue transition-all duration-300 group-hover:-rotate-12 ${
                isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Settings Link */}
          <Link
            href="/settings"
            aria-current={isActive("/settings") ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 ${
              isActive("/settings")
                ? "border-primary bg-primary/10 text-primary shadow-2xs font-semibold"
                : "border-border bg-card text-foreground hover:bg-muted hover:border-primary/50"
            }`}
          >
            <Settings
              className="size-4 transition-transform duration-500 ease-out group-hover:rotate-90"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Settings</span>
            <span className="sr-only sm:hidden">Accessibility settings</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-90 lg:hidden"
          >
            <div className="relative size-4 items-center justify-center">
              <X
                className={`absolute inset-0 size-4 transition-all duration-200 ${
                  open ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                }`}
                aria-hidden="true"
              />
              <Menu
                className={`absolute inset-0 size-4 transition-all duration-200 ${
                  open ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="animate-in slide-in-from-top-2 fade-in-20 border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-4">
            {NAV_ITEMS.map((item, index) => {
              const active = isActive(item.href)
              return (
                <li
                  key={item.href}
                  className="transition-all duration-200"
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.99] ${
                      active
                        ? "border border-primary/30 bg-primary/10 text-primary font-semibold"
                        : "hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {active && (
                        <span className="size-2 rounded-full bg-nexus-green" />
                      )}
                      <span className="text-base">{item.label}</span>
                    </div>
                    {item.description && (
                      <span className="text-xs text-muted-foreground font-normal">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
