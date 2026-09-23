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
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
