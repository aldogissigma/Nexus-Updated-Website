"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react"
import {
  ASSISTANT_GREETING,
  QUICK_PROMPTS,
  getConceptualResponse,
  type AssistantMessage,
} from "./assistant-responses"

function createId() {
  return Math.random().toString(36).slice(2)
}

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { id: "greeting", role: "assistant", content: ASSISTANT_GREETING },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelId = "nexus-ai-panel"

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, thinking])

  // Move focus into the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Allow closing the panel with the Escape key.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const send = (raw: string) => {
    const content = raw.trim()
    if (!content || thinking) return

    const userMessage: AssistantMessage = { id: createId(), role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setThinking(true)

    // Simulate the latency of a real LLM request. Replace this timeout with a
    // fetch to a server route backed by the AI SDK (see assistant-responses.ts).
    window.setTimeout(() => {
      const reply: AssistantMessage = {
        id: createId(),
        role: "assistant",
        content: getConceptualResponse(content),
      }
      setMessages((prev) => [...prev, reply])
      setThinking(false)
    }, 650)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Nexus AI Support chat"
          className="flex h-[min(32rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Nexus AI Support</p>
                <p className="flex items-center gap-1 text-xs text-primary-foreground/80">
                  <span className="size-1.5 rounded-full bg-green-400" aria-hidden="true" />
                  Online now
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close chat</span>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-muted/40 px-4 py-4"
            role="log"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-2.5 text-sm text-card-foreground"
                  }
                >
                  {m.content}
                </p>
              </div>
            ))}

            {thinking && (
              <div className="flex justify-start">
                <p className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-3 text-sm text-muted-foreground">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="sr-only">Assistant is typing</span>
                </p>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2.5">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => send(q.prompt)}
                disabled={thinking}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <label htmlFor="ai-input" className="sr-only">
              Type your question
            </label>
            <input
              id="ai-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about travel, tickets, Pop cards…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
            >
              <Send className="size-4" aria-hidden="true" />
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5" aria-hidden="true" />
        )}
        <span>{open ? "Close" : "Nexus AI Support"}</span>
        {!open && (
          <Sparkles className="size-4 text-accent" aria-hidden="true" data-decorative="true" />
        )}
      </button>
    </div>
  )
}
