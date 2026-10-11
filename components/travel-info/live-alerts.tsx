"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, CheckCircle2, ChevronDown, Info, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Severity = "good" | "minor" | "major"
type Mode = "Metro" | "Bus" | "Ferry" | "Rail"

type Alert = {
  id: string
  mode: Mode
  line: string
  severity: Severity
  message: string
  detail: string
}

// Mock alerts for demonstration only — they don't describe real services.
const POOL: Alert[] = [
  { id: "m1", mode: "Metro", line: "Green line", severity: "good", message: "Good service.", detail: "Trains are running every 12 minutes across the line." },
  { id: "m2", mode: "Metro", line: "Yellow line", severity: "minor", message: "Delays of up to 10 minutes.", detail: "A signalling fault earlier this morning has now been fixed. Some trains are still out of position." },
  { id: "m3", mode: "Metro", line: "Yellow line", severity: "good", message: "Good service.", detail: "Trains are running every 10 minutes." },
  { id: "m4", mode: "Metro", line: "Lifts at Station X", severity: "minor", message: "One lift out of service.", detail: "Step-free access is available from the other entrance. Staff can help if you need assistance." },
  { id: "b1", mode: "Bus", line: "Route 99", severity: "major", message: "Diverted due to a road closure.", detail: "Buses are diverted via the high street and are not serving three stops on Example Road. Use the temporary stops outside the library." },
  { id: "b2", mode: "Bus", line: "Route 12", severity: "minor", message: "Running up to 15 minutes late.", detail: "Heavy traffic in the town centre is causing delays." },
  { id: "b3", mode: "Bus", line: "All other routes", severity: "good", message: "No reported problems.", detail: "Services are running normally." },
  { id: "f1", mode: "Ferry", line: "Shields Ferry", severity: "good", message: "Running to timetable.", detail: "Sailings every 30 minutes." },
  { id: "f2", mode: "Ferry", line: "Shields Ferry", severity: "major", message: "Suspended due to high winds.", detail: "A replacement bus is running between the two landings. Tickets are accepted on the replacement bus." },
  { id: "r1", mode: "Rail", line: "Local rail", severity: "minor", message: "Some services shortened.", detail: "Two morning services are running with fewer carriages. Allow extra time." },
  { id: "r2", mode: "Rail", line: "Local rail", severity: "good", message: "Good service.", detail: "Trains are running normally." },
]

const SEVERITY: Record<Severity, { icon: LucideIcon; label: string; classes: string }> = {
  good: { icon: CheckCircle2, label: "Good service", classes: "border-l-green-600 bg-green-50 text-green-950 dark:bg-green-950/40 dark:text-green-50" },
  minor: { icon: Info, label: "Minor delays", classes: "border-l-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50" },
  major: { icon: AlertTriangle, label: "Major disruption", classes: "border-l-red-600 bg-red-50 text-red-950 dark:bg-red-950/40 dark:text-red-50" },
}

const MODES: (Mode | "All")[] = ["All", "Metro", "Bus", "Ferry", "Rail"]

function pickAlerts(seed: number) {
  // One alert per mode/line group, rotating which version is shown.
  const groups = new Map<string, Alert[]>()
  for (const a of POOL) {
    const key = `${a.mode}-${a.line}`
    groups.set(key, [...(groups.get(key) ?? []), a])
  }
  const byMode = new Map<Mode, Alert[]>()
  for (const a of POOL) byMode.set(a.mode, [...(byMode.get(a.mode) ?? []), a])
  const result: Alert[] = []
  for (const [mode, alerts] of byMode) {
    const lines = Array.from(new Set(alerts.map((a) => a.line)))
    lines.forEach((line, i) => {
      const options = groups.get(`${mode}-${line}`)!
      result.push(options[(seed + i) % options.length])
    })
  }
  const order: Record<Severity, number> = { major: 0, minor: 1, good: 2 }
  return result.sort((a, b) => order[a.severity] - order[b.severity])
}

export function LiveAlerts() {
  const [seed, setSeed] = useState(0)
  const [mode, setMode] = useState<Mode | "All">("All")
  const [updated, setUpdated] = useState<Date | null>(null)
  const [, tick] = useState(0)

  useEffect(() => {
    setUpdated(new Date())
    const id = window.setInterval(() => tick((t) => t + 1), 15_000)
    return () => window.clearInterval(id)
  }, [])

  const refresh = () => {
    setSeed((s) => s + 1)
    setUpdated(new Date())
  }

  const alerts = pickAlerts(seed).filter((a) => mode === "All" || a.mode === mode)
  const mins = updated ? Math.floor((Date.now() - updated.getTime()) / 60000) : 0

  return (
    <section aria-labelledby="alerts-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="alerts-heading" className="text-2xl font-bold tracking-tight">
          Live service alerts
        </h2>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            <span className="size-2 animate-pulse rounded-full bg-green-600" aria-hidden="true" />
            Updated {mins === 0 ? "just now" : `${mins} min ago`}
          </span>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter alerts by transport type">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              mode === m ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:bg-muted"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <ul className="mt-5 space-y-3" aria-live="polite">
        {alerts.map((alert) => {
          const config = SEVERITY[alert.severity]
          const Icon = config.icon
          return (
            <li key={alert.id} className={`rounded-r-lg border border-l-4 border-border ${config.classes}`}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {alert.mode} — {alert.line}
                      <span className="sr-only">: {config.label}</span>
                    </p>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <ChevronDown className="mt-0.5 size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-12 pb-4 text-sm">{alert.detail}</p>
              </details>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Mock alerts for demonstration — they don&apos;t describe real services.
      </p>
    </section>
  )
}
