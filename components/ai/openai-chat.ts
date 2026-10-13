import type { AssistantMessage } from "./assistant-responses"

/**
 * Free OpenAI chat via Puter.js (https://docs.puter.com/AI/chat/).
 * Puter gives browser apps access to OpenAI models without an API key 
 * server — usage is covered by Puter, not by this site.
 */
const PUTER_SRC = "https://js.puter.com/v2/"
const MODEL = "gpt-4o-mini"
const TIMEOUT_MS = 25_000

const SYSTEM_PROMPT = `You are Nexus AI Support, the friendly assistant on a concept redesign of the Nexus website (Tyne and Wear, North East England).
Help with: Tyne and Wear Metro (Green line Airport–South Hylton, Yellow line St James–South Shields via the coast), buses, the Shields Ferry, local rail, Pop smartcards (Pop Pay As You Go, Pop blue for 21 and under, Under 16 Pop & School Pass, Pop Junior Blue, Season Tickets & Network One, Concessionary Travel Pass / Gold Card, Class & Youth Group Pass), tickets and fares, and accessibility.
Point people to pages on this site: Pop Cards, Tickets & Fares, Travel Info (live departures and alerts), About, Contact, and Settings (text size, high contrast, simplified view).
Keep answers short (under 120 words), plain English, no markdown tables. If unsure about exact prices or times, say so and suggest nexus.org.uk or calling 0191 20 20 747. Politely decline questions unrelated to travel.`

type PuterChatResponse = string | { message?: { content?: string | { text?: string }[] }; text?: string; toString(): string }

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (messages: { role: string; content: string }[], options?: { model?: string }) => Promise<PuterChatResponse>
      }
    }
  }
}

let loader: Promise<void> | null = null

function loadPuter(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"))
  if (window.puter) return Promise.resolve()
  loader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = PUTER_SRC
    script.async = true
    script.onload = () => (window.puter ? resolve() : reject(new Error("Puter failed to load")))
    script.onerror = () => {
      loader = null
      reject(new Error("Puter failed to load"))
    }
    document.head.appendChild(script)
  })
  return loader
}

function toText(res: PuterChatResponse): string {
  if (typeof res === "string") return res
  const content = res?.message?.content
  if (typeof content === "string") return content
  if (Array.isArray(content)) return content.map((c) => c.text ?? "").join("")
  return res?.text ?? String(res)
}

export async function askOpenAI(history: AssistantMessage[]): Promise<string> {
  await loadPuter()
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-12).map((m) => ({ role: m.role, content: m.content })),
  ]
  const reply = await Promise.race([
    window.puter!.ai.chat(messages, { model: MODEL }),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timed out")), TIMEOUT_MS)),
  ])
  const text = toText(reply).trim()
  if (!text) throw new Error("Empty reply")
  return text
}
