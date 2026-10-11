import Image from "next/image"
import Link from "next/link"
import { NexusLogo } from "@/assets"

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className ?? ""}`}
      aria-label="Nexus home"
    >
      <Image src={NexusLogo} alt="" className="h-11 w-auto" priority />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Tyne and Wear
        </span>
        <span className="text-sm font-semibold text-foreground">Travel made simple</span>
      </span>
    </Link>
  )
}
