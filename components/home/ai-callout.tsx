"use client"

import { Bot, Clock, MessageSquare, Sparkles } from "lucide-react"

const POINTS = [
  {
    icon: MessageSquare,
    text: "Ask in plain language about journeys, tickets, and Pop cards.",
    color: "bg-nexus-green/10 text-nexus-green border-nexus-green/20",
  },
  {
    icon: Clock,
    text: "Available 24/7 with instant answers — no waiting on hold.",
    color: "bg-nexus-blue/10 text-nexus-blue border-nexus-blue/20",
  },
  {
    icon: Sparkles,
    text: "Suggests the simplest route and the best-value ticket for you.",
    color: "bg-nexus-yellow/15 text-accent-foreground border-nexus-yellow/30",
  },
]

export function AiCallout() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/50 backdrop-blur-xs transition-colors duration-200">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-nexus-blue/10 blur-3xl"
        data-decorative="true"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-nexus-green/10 blur-3xl"
        data-decorative="true"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
        {/* Left Column: Callout Content */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-sm font-semibold text-primary shadow-xs">
            <Bot className="size-4 animate-pulse" aria-hidden="true" />
            Nexus AI Support
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Instant help, whenever you need it
          </h2>

          <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg">
            Our AI support assistant is your first stop for immediate help. It lives
            in the bottom-right corner of every page — open it any time to get
            answers in seconds.
          </p>

          <ul className="mt-6 space-y-3.5 w-full">
            {POINTS.map((point) => {
              const Icon = point.icon
              return (
                <li
                  key={point.text}
                  className="flex items-start gap-3.5 rounded-xl border border-transparent p-2 transition-all duration-200 hover:border-border hover:bg-card/60"
                >
                  <span
                    className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs ${point.color}`}
                  >
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm md:text-base text-foreground font-medium self-center">
                    {point.text}
                  </span>
                </li>
              )
            })}
          </ul>

          <p className="mt-6 text-xs md:text-sm text-muted-foreground">
            Look for the{" "}
            <strong className="font-semibold text-foreground underline decoration-nexus-green decoration-2 underline-offset-4">
              Nexus AI Support
            </strong>{" "}
            button in the bottom-right corner to start a chat.
          </p>
        </div>

        {/* Right Column: Interactive Decorative Chat Preview */}
        <div
          className="relative rounded-2xl border border-border bg-card/90 p-5 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-[1.01]"
          data-decorative="true"
          aria-hidden="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                <Bot className="size-5" />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-nexus-green" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">
                  Nexus AI Support
                </p>
                <p className="text-xs text-nexus-green font-medium flex items-center gap-1">
                  <span className="inline-block size-1.5 rounded-full bg-nexus-green animate-ping" />
                  Online now
                </p>
              </div>
            </div>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Demo
            </span>
          </div>

          {/* Chat Bubble Thread */}
          <div className="space-y-3.5 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-bl-xs border border-border bg-muted/60 px-4 py-3 text-sm text-foreground shadow-2xs">
              Hi! How can I help with your travel today?
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-xs bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-2xs">
              How do I get a Pop blue card?
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-bl-xs border border-border bg-muted/60 px-4 py-3 text-sm text-foreground shadow-2xs">
              You can order one from the Pop Cards page in about 3 minutes — I&apos;ll
              walk you through it.
            </div>
          </div>

          {/* Subtle Input Bar Placeholder */}
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3.5 py-2 text-xs text-muted-foreground">
            <span>Type a message...</span>
          </div>
        </div>
      </div>
    </section>
  )
}
