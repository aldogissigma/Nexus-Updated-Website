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
  "Hi! I'm the Nexus AI Support assistant. I can help with journey planning, timetables, Pop cards, and tickets. What do you need help with today?"

interface IntentDefinition {
  id: string
  // RegExp or strings mapped to exact/boundary matches
  keywords: (string | RegExp)[]
  response: string
}

const INTENTS: IntentDefinition[] = [
  {
    id: "journey",
    keywords: [
      /\bjourney\b/i,
      /\bplan\b/i,
      /\broute\b/i,
      /\btravel to\b/i,
      /\bget to\b/i,
      /\bdirections\b/i,
      /\bmetro map\b/i,
    ],
    response:
      "To plan a journey, use the planner on the homepage: enter your origin and destination, then choose your preferred time. I'll display bus, Metro, and Shields Ferry options with step-by-step directions. Need help planning a specific route?",
  },
  {
    id: "pop_card",
    keywords: [
      /\bpop card\b/i,
      /\bpop blue\b/i,
      /\bpop payg\b/i,
      /\bsmartcard\b/i,
      /\btop ?up\b/i,
      /\bpop\b/i,
    ],
    response:
      "Pop cards are reusable smartcards for travel across Tyne and Wear. Options include Pop PAYG (Adults), Pop Blue (under-21s), Under-16, and Metro Season Passes. Cards take about 3 minutes to order online and arrive within 5 working days. You can top up online or at any Metro station ticket machine.",
  },
  {
    id: "tickets_fares",
    keywords: [
      /\bticket\b/i,
      /\bfare\b/i,
      /\bprice\b/i,
      /\bcost\b/i,
      /\bhow much\b/i,
      /\bpass\b/i,
      /\bdaysaver\b/i,
      /\bsingle\b/i,
    ],
    response:
      "Ticket prices depend on how many zones you travel through (Zones A, B, and C). Single adult Metro fares start at £2.10, and a DaySaver starts at £5.40. Pop PAYG offers cheaper single and daily capped fares. Visit our Tickets & Fares page for the full price table.",
  },
  {
    id: "timetables",
    keywords: [
      /\btimetable\b/i,
      /\btime ?table\b/i,
      /\bschedule\b/i,
      /\bdeparture\b/i,
      /\bnext train\b/i,
      /\bnext bus\b/i,
      /\bwhen\b/i,
    ],
    response:
      "You can find live timetables on our Travel Info page. Search by station, bus stop, or line number to view real-time departures and scheduled arrival times.",
  },
  {
    id: "disruptions",
    keywords: [
      /\bdisruption\b/i,
      /\bdelay\b/i,
      /\balert\b/i,
      /\bcancel\b/i,
      /\bproblem\b/i,
      /\bstrike\b/i,
      /\bworks\b/i,
      /\bsuspension\b/i,
    ],
    response:
      "Check the Live Alerts banner on our Travel Info page for real-time Metro, bus, and ferry service status updates. If a service line is affected, tell me where you're heading and I can suggest an alternative route.",
  },
  {
    id: "refunds_lost",
    keywords: [
      /\brefund\b/i,
      /\blost\b/i,
      /\bstolen\b/i,
      /\breplace\b/i,
      /\breplacement\b/i,
      /\bbalance\b/i,
    ],
    response:
      "If your Pop card is lost or stolen, report it on our Contact page or call 0191 20 20 747. We can block your old card, transfer your remaining balance, and dispatch a replacement. Season ticket refund requests can also be initiated there.",
  },
  {
    id: "accessibility",
    keywords: [
      /\baccessib\w*\b/i,
      /\bwheelchair\b/i,
      /\bstep ?free\b/i,
      /\bdisabled\b/i,
      /\blift\b/i,
      /\bramp\b/i,
      /\brailramps\b/i,
    ],
    response:
      "All Metro stations feature step-free access via ramps or lifts. You can check individual station accessibility features on our Travel Info page. You can also customize font size, high contrast, or simplified views in the Settings panel (top-right header).",
  },
  {
    id: "contact",
    keywords: [
      /\bcontact\b/i,
      /\bphone\b/i,
      /\bcall\b/i,
      /\bemail\b/i,
      /\bhelp line\b/i,
      /\bcustomer service\b/i,
      /\bsupport\b/i,
    ],
    response:
      "You can reach the Nexus Customer Services team at 0191 20 20 747 (7am–8pm daily) or send us an online enquiry via the Contact page. I am also available 24/7 right here for instant questions!",
  },
  {
    id: "greetings",
    keywords: [
      /\bhello\b/i,
      /\bhi\b/i,
      /\bhey\b/i,
      /\bgood morning\b/i,
      /\bgood afternoon\b/i,
      /\bgood evening\b/i,
    ],
    response:
      "Hello! I'm your Nexus AI travel assistant. How can I assist you with Metro, bus, ferry journeys, Pop cards, or timetables today?",
  },
]

const DEFAULT_FALLBACK_RESPONSE =
  'I can help with journey planning, timetables, Pop cards, and ticket prices. Try asking something like "How do I order a Pop card?" or "How much is a day ticket?" — or pick one of the quick prompts below!'

/**
 * Enhanced Offline fallback matcher.
 * Calculates keyword density scores to pick the best matching response.
 */
export function getConceptualResponse(message: string): string {
  const cleanInput = message.trim().toLowerCase()
  if (!cleanInput) return DEFAULT_FALLBACK_RESPONSE

  let bestIntent: IntentDefinition | null = null
  let highestScore = 0

  for (const intent of INTENTS) {
    let score = 0
    for (const pattern of intent.keywords) {
      if (typeof pattern === "string") {
        if (cleanInput.includes(pattern.toLowerCase())) {
          score += 1
        }
      } else if (pattern.test(cleanInput)) {
        score += 1.5 // regex boundary match gets higher weight
      }
    }

    if (score > highestScore) {
      highestScore = score
      bestIntent = intent
    }
  }

  return bestIntent && highestScore > 0
    ? bestIntent.response
    : DEFAULT_FALLBACK_RESPONSE
}
