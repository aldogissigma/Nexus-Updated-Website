export type NavItem = {
  label: string
  href: string
  description: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Pop Cards",
    href: "/pop-cards",
    description: "Smart travel cards for buses, Metro and ferry.",
  },
  {
    label: "Tickets & Fares",
    href: "/tickets",
    description: "Fares, passes and where to buy them.",
  },
  {
    label: "Travel Info",
    href: "/travel-info",
    description: "Timetables, routes, live alerts and network maps.",
  },
  {
    label: "About",
    href: "/about",
    description: "Who Nexus are and what we do.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch and find help.",
  },
]

export const FOOTER_EXTRA_ITEMS: NavItem[] = [
  {
    label: "Accessibility settings",
    href: "/settings",
    description: "Text size, contrast and other display options.",
  },
]


// NavItem Type: Defines the TypeScript shape for navigation entries, requiring a visible button/link text, target path, and a brief summary.

// NAV_ITEMS Array is the primary navigation menu items used by <SiteHeader/> and header dropdowns to render links to the main pages
// FOOTER_EXTRA_ITEMS Array is the secondary navigation entries—specifically targeting the Accessibility Settings page (/settings)—intended for the site footer or mobile drawer menus.

// Centralizing navigation links in a data array rather than hardcoding them inside UI components allows the header, footer, and mobile drawer
// to dynamically map over the exact same source of truth, keeping site links synchronized.


