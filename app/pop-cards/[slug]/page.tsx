import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, CircleAlert, MapPin, Wallet } from "lucide-react"
import { FaqList } from "@/components/ui/faq-list"
import { POP_CARDS, getPopCard } from "@/lib/pop-cards"

export const dynamicParams = false
// goes 404 if url doesnt match right 
export function generateStaticParams() {
  return POP_CARDS.map((card) => ({ slug: card.slug }))
}
// automatically renders all the pop card things when u open the website
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const card = getPopCard((await params).slug)
  return card ? { title: card.name, description: card.summary } : {}
}
// makes it so when you click on each of the specific pages for each of the pop cards e.g pop pay as you go leads to pop pay as you go with the summary for pop pay as you go
export default async function PopCardDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const card = getPopCard((await params).slug)
  if (!card) notFound()

  const others = POP_CARDS.filter((c) => c.slug !== card.slug)
// js detect if the url matches the ones provided for pop cards
  return (
    <>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <Link
            href="/pop-cards"
            className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All Pop cards
          </Link>
          <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_320px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{card.audience}</p>
              <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-secondary-foreground md:text-4xl">
                {card.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{card.summary}</p>
            </div>
            <div className="relative">
              <Image
                src={card.image}
                alt={`${card.name} card`}
                priority
                sizes="320px"
                className="aspect-[1.586] w-full rounded-2xl object-cover shadow-xl"
              />
              {card.badge && (
                <span className="absolute right-3 top-3 rounded-full bg-nexus-yellow px-3 py-1 text-sm font-bold text-[#14211f]">
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section aria-labelledby="about-card">
            <h2 id="about-card" className="text-2xl font-bold tracking-tight">About this card</h2>
            <div className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
              {card.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="apply-card">
            <h2 id="apply-card" className="text-2xl font-bold tracking-tight">How to get one</h2>
            <ol className="mt-5 space-y-3">
              {card.apply.map((step, i) => (
                <li key={step} className="flex gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="manage-card">
            <h2 id="manage-card" className="text-2xl font-bold tracking-tight">Top up, renew & manage</h2>
            <ul className="mt-5 space-y-2">
              {card.manage.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {card.extraImages && (
            <section aria-label="Example cards" className="grid gap-4 sm:grid-cols-2">
              {card.extraImages.map((extra) => (
                <figure key={extra.alt} className="rounded-2xl border border-border bg-card p-3">
                  <Image src={extra.image} alt={extra.alt} sizes="(min-width: 640px) 360px, 100vw" className="w-full rounded-xl" />
                  <figcaption className="mt-2 text-sm text-muted-foreground">{extra.alt}</figcaption>
                </figure>
              ))}
            </section>
          )}

          <section aria-labelledby="card-faqs">
            <h2 id="card-faqs" className="text-2xl font-bold tracking-tight">Questions</h2>
            <div className="mt-5">
              <FaqList items={card.faqs} />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <h2 className="flex items-center gap-2 font-semibold">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              Where you can use it
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {card.validOn.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <h2 className="flex items-center gap-2 font-semibold">
              <Wallet className="size-4 text-primary" aria-hidden="true" />
              Cost
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{card.cost}</p>
          </div>
          <div className="rounded-2xl border-l-4 border-nexus-yellow bg-secondary p-5 text-secondary-foreground">
            <h2 className="flex items-center gap-2 font-semibold">
              <CircleAlert className="size-4" aria-hidden="true" />
              Good to know
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
              {card.goodToKnow.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="Other Pop cards" className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <h2 className="font-semibold">Other cards</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/pop-cards/${o.slug}`}
                    className="text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  )
}
// js formatting to make it look like an actual website
