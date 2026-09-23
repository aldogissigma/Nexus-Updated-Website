"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

const TOPICS = ["General enquiry", "Lost property", "Refund request", "Accessibility support", "Feedback"]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Conceptual: a real app would send this to a support inbox or ticketing system.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-bold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for getting in touch. Our team aims to reply within two working days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="text-xl font-bold">Send us a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Fields marked with an asterisk (<span aria-hidden="true">*</span>) are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Full name <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email address <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="topic" className="block text-sm font-medium">
            What&apos;s it about?
          </label>
          <select
            id="topic"
            name="topic"
            defaultValue={TOPICS[0]}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Send message
      </button>
    </form>
  )
}
