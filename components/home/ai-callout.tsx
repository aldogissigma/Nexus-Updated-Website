import { Bot, Clock, MessageSquare, Sparkles } from "lucide-react"

const POINTS = [
  { icon: MessageSquare, text: "Ask in plain language about journeys, tickets and Pop cards." },
  { icon: Clock, text: "Available 24/7 with instant answers — no waiting on hold." },
  { icon: Sparkles, text: "Suggests the simplest route and the best-value ticket for you." },
]

export function AiCallout() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            <Bot className="size-4" aria-hidden="true" />
            Nexus AI Support
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            Instant help, whenever you need it
          </h2>
          <p className="mt-3 text-pretty text-lg text-muted-foreground">
            Our AI support assistant is your first stop for immediate help. It lives
            in the bottom-right corner of every page — open it any time to get
            answers in seconds.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => {
              const Icon = point.icon
              return (
                <li key={point.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-foreground">{point.text}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Look for the <strong className="text-foreground">Nexus AI Support</strong>{" "}
            button in the bottom-right corner to start a chat.
          </p>
        </div>

        {/* Illustrative chat preview */}
        <div
          className="rounded-2xl border border-border bg-card p-5 shadow-lg"
          data-decorative="true"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Nexus AI Support</p>
              <p className="text-xs text-muted-foreground">Online now</p>
            </div>
          </div>
          <div className="space-y-3 py-4">
            <p className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-secondary px-3.5 py-2.5 text-sm">
              Hi! How can I help with your travel today?
            </p>
            <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
              How do I order a 16–18 Pop card?
            </p>
            <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-secondary px-3.5 py-2.5 text-sm">
              You can order one from the Pop Cards page in about 3 minutes — I&apos;ll
              walk you through it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
