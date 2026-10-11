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
