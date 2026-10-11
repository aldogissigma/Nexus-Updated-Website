export type AssistantMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export type QuickPrompt = {
  label: string
  prompt: string
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  { label: "Plan a journey", prompt: "How do I plan a journey?" },
  { label: "Get a Pop card", prompt: "How do I order a Pop card?" },
  { label: "Ticket prices", prompt: "How much are tickets?" },
  { label: "Live disruptions", prompt: "Are there any disruptions today?" },
]

export const ASSISTANT_GREETING =
  "Hi, I'm the Nexus AI Support assistant. I can help with journey planning, timetables, Pop cards and tickets. What do you need help with today?"

/**
 * Offline fallback used when the OpenAI chat (see openai-chat.ts) can't be
 * reached. It keyword-matches the message and returns a canned reply.
 */
export function getConceptualResponse(message: string): string {
  const text = message.toLowerCase()

  const match = (keywords: string[]) => keywords.some((k) => text.includes(k))

  if (match(["journey", "plan", "route", "get to", "travel to"])) {
    return "To plan a journey, use the planner on the home page: enter where you're starting from and your destination, then pick a time. I'll suggest bus, Metro and ferry options with step-by-step directions. Want me to walk you through a specific trip?"
  }
  if (match(["pop card", "pop", "smartcard", "top up", "topup"])) {
    return "Pop cards are reusable smart travel cards. There are cards for adults (Pop PAYG), under 21s (Pop blue), under 16s, season tickets, CT Pass holders and groups — see the Pop Cards page. Ordering takes about 3 minutes and the card arrives in 5 working days. You can top it up online or at any Metro station machine."
  }
  if (match(["ticket", "fare", "price", "cost", "how much", "pass"])) {
    return "Ticket prices depend on the zones you travel through and the pass type. A single adult Metro fare starts at £2.10, and a DaySaver is £5.40. Season passes (weekly, monthly, annual) offer the best value for regular travel. See the Tickets & Fares page for the full list."
  }
  if (match(["timetable", "time table", "schedule", "departure", "when"])) {
    return "You'll find timetables on the Travel Info page. Search by route number or stop name to see the next departures. Live times update in real time when the vehicle is running."
  }
  if (match(["disruption", "delay", "alert", "cancel", "problem", "strike"])) {
    return "Check the Live Alerts panel on the Travel Info page for today's disruptions. If your specific line is affected I can suggest an alternative route — just tell me where you're travelling."
  }
  if (match(["refund", "lost", "stolen", "replace"])) {
    return "If your Pop card is lost or stolen, report it from the Contact page or call 0191 20 20 747 and we'll freeze the balance and issue a replacement. Refunds on unused season tickets can also be requested there."
  }
  if (match(["accessible", "accessibility", "wheelchair", "step free", "disabled"])) {
    return "Every Metro station on the redesign has step-free access details on the Travel Info page. Open Settings (top-right of every page) to enlarge text, turn on high contrast, or switch to a simplified view."
  }
  if (match(["contact", "phone", "call", "email", "help", "support"])) {
    return "You can reach the travel line on 0191 20 20 747 (7am–8pm daily) or send a message from the Contact page. I'm also here 24/7 for quick questions."
  }
  if (match(["hello", "hi", "hey", "morning", "afternoon"])) {
    return "Hello! I can help with journeys, timetables, Pop cards and tickets. What would you like to do?"
  }

  return "I can help with journey planning, timetables, Pop cards and ticket prices. Try asking something like \"How do I order a Pop card?\" or \"How much is a day ticket?\" — or use one of the quick options below."
}
