import type { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#002B49] py-12 text-white md:py-16">
      {/* Subtle brand gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.15),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {eyebrow && (
          <span className="mb-3 inline-flex items-center rounded-full bg-[#FFC72C]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFC72C]">
            {eyebrow}
          </span>
        )}
        <h1 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-300">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
