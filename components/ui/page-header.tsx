// this is a reusable hero banner layout used at the top of major pages across the site

import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
  sideImage,
  sideImageAlt = "",
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  /** Full-bleed photo shown behind the header text. */
  image?: StaticImageData
  imagePosition?: string
  /** Smaller photo shown beside the header text on larger screens. */
  sideImage?: StaticImageData
  sideImageAlt?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-nexus-ink text-white">
      {image && (
        <div aria-hidden="true" data-decorative="true" className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nexus-ink via-nexus-ink/90 to-nexus-ink/40" />
        </div>
      )}

      {/* Nexus colour stripe */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-1.5">
        <span className="flex-1 bg-nexus-green" />
        <span className="flex-1 bg-nexus-red" />
        <span className="flex-1 bg-nexus-blue" />
        <span className="flex-1 bg-nexus-yellow" />
      </div>

      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:px-6 md:py-16 ${
          sideImage ? "md:grid-cols-[1.4fr_1fr]" : ""
        }`}
      >
        <div>
          {eyebrow && (
            <span className="mb-3 inline-flex items-center rounded-full bg-nexus-yellow px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#14211f]">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-pretty text-lg text-white/90">{description}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>

        {sideImage && (
          <div className="hidden md:block" data-decorative="true">
            <Image
              src={sideImage}
              alt={sideImageAlt}
              sizes="(min-width: 768px) 40vw, 0px"
              priority
              className="max-h-64 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/20"
            />
          </div>
        )}
      </div>
    </section>
  )
}
