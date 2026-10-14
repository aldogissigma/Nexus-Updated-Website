export type StopKind = "metro" | "bus" | "ferry"

export type Stop = {
  name: string
  kind: StopKind
  lines: string[]
  aliases?: string[]
}

const GREEN = [
  "Airport", "Callerton Parkway", "Bank Foot", "Kingston Park", "Fawdon", "Wansbeck Road",
  "Regent Centre", "South Gosforth", "Ilford Road", "West Jesmond", "Jesmond", "Haymarket",
  "Monument", "Central Station", "Gateshead", "Gateshead Stadium", "Felling", "Heworth", "Pelaw",
  "Brockley Whins", "East Boldon", "Seaburn", "Stadium of Light", "St Peter's", "Sunderland",
  "Park Lane", "University", "Millfield", "Pallion", "South Hylton",
]

const YELLOW = [
  "St James", "Monument", "Manors", "Byker", "Chillingham Road", "Walkergate", "Wallsend",
  "Hadrian Road", "Howdon", "Percy Main", "Meadow Well", "North Shields", "Tynemouth",
  "Cullercoats", "Whitley Bay", "Monkseaton", "West Monkseaton", "Shiremoor",
  "Northumberland Park", "Palmersville", "Benton", "Four Lane Ends", "Longbenton",
  "South Gosforth", "Ilford Road", "West Jesmond", "Jesmond", "Haymarket", "Monument",
  "Central Station", "Gateshead", "Gateshead Stadium", "Felling", "Heworth", "Pelaw", "Fellgate",
  "Hebburn", "Jarrow", "Bede", "Simonside", "Tyne Dock", "Chichester", "South Shields",
]

export const METRO_LINES = {
  Green: { stations: GREEN, ends: ["Airport", "South Hylton"] },
  Yellow: { stations: Array.from(new Set(YELLOW)), ends: ["St James", "South Shields"] },
} as const

const ALIASES: Record<string, string[]> = {
  "Central Station": ["Newcastle Central", "Central"],
  "Stadium of Light": ["SOL"],
  "St James": ["St James Park", "Saint James"],
  "St Peter's": ["Saint Peters", "St Peters"],
}

const metroStops: Stop[] = Array.from(new Set([...GREEN, ...YELLOW])).map((name) => ({
  name,
  kind: "metro",
  lines: [GREEN.includes(name) && "Green", YELLOW.includes(name) && "Yellow"].filter(Boolean) as string[],
  aliases: ALIASES[name],
}))

const busStops: Stop[] = [
  { name: "Haymarket Bus Station", kind: "bus", lines: ["X7", "306", "308", "43", "45"] },
  { name: "Eldon Square Bus Station", kind: "bus", lines: ["1", "10", "22", "X84", "684"], aliases: ["Eldon Square"] },
  { name: "Gateshead Interchange", kind: "bus", lines: ["Q3", "21", "53", "54", "93"] },
  { name: "Four Lane Ends Interchange", kind: "bus", lines: ["19", "22", "40", "62"] },
  { name: "Heworth Interchange", kind: "bus", lines: ["27", "56", "93", "94"] },
  { name: "Park Lane Interchange", kind: "bus", lines: ["2", "16", "20", "56", "X1"] },
  { name: "Newcastle Quayside", kind: "bus", lines: ["Q1", "Q2", "Q3"], aliases: ["Quayside"] },
  { name: "Metrocentre", kind: "bus", lines: ["10", "21", "100", "Q3"], aliases: ["Metro Centre"] },
  { name: "Royal Victoria Infirmary", kind: "bus", lines: ["1", "12", "39", "40"], aliases: ["RVI"] },
  { name: "Freeman Hospital", kind: "bus", lines: ["1", "12", "22"] },
  { name: "Silverlink", kind: "bus", lines: ["19", "53", "54", "355"] },
  { name: "Washington Galleries", kind: "bus", lines: ["X1", "56", "194"] },
]

const ferryStops: Stop[] = [
  { name: "North Shields Ferry Landing", kind: "ferry", lines: ["Shields Ferry"] },
  { name: "South Shields Ferry Landing", kind: "ferry", lines: ["Shields Ferry"] },
]

export const STOPS: Stop[] = [...metroStops, ...busStops, ...ferryStops]

function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/\b(metro|station|stop)\b/g, "")
    .replace(/saint/g, "st")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

/** Damerau–Levenshtein (optimal string alignment) distance. */
function distance(a: string, b: string) {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      }
    }
  }
  return d[a.length][b.length]
}

function scoreName(query: string, name: string) {
  const n = normalise(name)
  if (!n) return Infinity
  if (n === query) return 0
  if (n.startsWith(query)) return 0.1
  if (n.includes(query)) return 0.3
  // Compare against the whole name, each word and the same-length prefix so
  // that typos in partially typed names still match.
  const candidates = [n, ...n.split(" "), n.slice(0, query.length)]
  return Math.min(...candidates.map((c) => distance(query, c) + (c === n ? 0 : 0.5)))
}

export type StopMatch = { stop: Stop; score: number }

export function searchStops(raw: string, limit = 6): StopMatch[] {
  const query = normalise(raw)
  if (!query) return []
  const tolerance = Math.max(1, Math.floor(query.length / 3))
  return STOPS.map((stop) => ({
    stop,
    score: Math.min(scoreName(query, stop.name), ...(stop.aliases ?? []).map((a) => scoreName(query, a))),
  }))
    .filter((m) => m.score <= tolerance + 0.5)
    .sort((a, b) => a.score - b.score || a.stop.name.localeCompare(b.stop.name))
    .slice(0, limit)
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export type Departure = {
  service: string
  kind: StopKind
  destination: string
  dueMins: number
  platform?: string
  status: "On time" | "Delayed" 
}

const BUS_DESTINATIONS = [
  "Newcastle", "Gateshead", "Sunderland", "North Shields", "Whitley Bay", "Washington",
  "Blaydon", "Killingworth", "South Shields", "Cramlington", "Metrocentre", "Heaton",
]

/** Mock departures: deterministic for a stop and the current minute. */
export function getDepartures(stop: Stop, now = new Date()): Departure[] {
  const minute = now.getHours() * 60 + now.getMinutes()
  const seed = hash(stop.name)
  const out: Departure[] = []

  if (stop.kind === "metro") {
    for (const line of stop.lines as (keyof typeof METRO_LINES)[]) {
      const { ends } = METRO_LINES[line]
      ends.forEach((end, dir) => {
        if (end === stop.name) return
        const headway = line === "Green" ? 12 : 10
        const offset = (seed + dir * 5 + (line === "Green" ? 0 : 3)) % headway
        const first = (headway - ((minute + offset) % headway)) % headway
        for (let k = 0; k < 2; k++) {
          const late = (seed + minute + k + dir) % 9 === 0
          out.push({
            service: line,
            kind: "metro",
            destination: end,
            dueMins: first + k * headway + (late ? 3 : 0),
            platform: String(dir + 1),
            status: late ? "Delayed" : "On time",
          })
        }
      })
    }
  } else if (stop.kind === "ferry") {
    const other = stop.name.startsWith("North") ? "South Shields" : "North Shields"
    const first = (30 - ((minute + (seed % 15)) % 30)) % 30
    for (let k = 0; k < 3; k++) {
      out.push({ service: "Shields Ferry", kind: "ferry", destination: other, dueMins: first + k * 30, status: "On time" })
    }
  } else {
    stop.lines.forEach((route, i) => {
      const headway = 8 + ((seed >> i) % 4) * 4
      const first = (headway - ((minute + seed + i * 7) % headway)) % headway
      const destination = BUS_DESTINATIONS[(seed + i * 5) % BUS_DESTINATIONS.length]
      for (let k = 0; k < 2; k++) {
        const late = (seed + minute + i + k) % 7 === 0
        out.push({
          service: route,
          kind: "bus",
          destination,
          dueMins: first + k * headway + (late ? 4 : 0),
          platform: String.fromCharCode(65 + (i % 6)),
          status: late ? "Delayed" : "On time",
        })
      }
    })
  }

  return out.sort((a, b) => a.dueMins - b.dueMins).slice(0, 8)
}

// Data Structures & Station CatalogTypes: Enforces shapes for transport stops, line associations, aliases, and departure board entries.
// Network Data contains complete lists of stations for the Green and Yellow Metro lines, key regional bus interchanges, and Shields Ferry landings, complete with common search aliases.

// Fuzzy Search Engine Text Normalization: Cleans input queries by removing common filler words, standardizing variations, and stripping punctuation.
// Typo Tolerance : Implements the Damerau–Levenshtein distance algorithm to calculate string edit distances, allowing the search bar to handle typos, misspellings, and partial inputs.

// Deterministic Live Departure Engine Seed Hashing: Uses an FNV-1a hash function on the stop name to generate a consistent mathematical seed.
// Real-time Schedule Simulation: Calculates upcoming arrivals dynamically using the current time. Returns up to 8 sorted departures with realistic headways, platform numbers, delay flags, and minute countdowns that update every minute without requiring an external backend server.




