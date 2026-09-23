import { AlertTriangle, CheckCircle2, Info } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Severity = "good" | "minor" | "major"

type Alert = {
  line: string
  severity: Severity
  message: string
}

const ALERTS: Alert[] = [
  { line: "Metro — Green line", severity: "good", message: "Good service on all routes." },
  { line: "Metro — Yellow line", severity: "minor", message: "Minor delays of up to 5 minutes near St James." },
  { line: "Bus 21", severity: "major", message: "Diverted via the Quayside due to roadworks until Friday." },
  { line: "Ferry — Shields crossing", severity: "good", message: "Running to normal timetable." },
]

const SEVERITY: Record<Severity, { icon: LucideIcon; label: string; classes: string }> = {
  good: {
    icon: CheckCircle2,
    label: "Good service",
    classes: "border-l-green-600 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-100",
  },
  minor: {
    icon: Info,
    label: "Minor delays",
    classes: "border-l-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-100",
  },
  major: {
    icon: AlertTriangle,
    label: "Major disruption",
    classes: "border-l-red-600 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-100",
  },
}

export function LiveAlerts() {
  return (
    <section aria-labelledby="alerts-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="alerts-heading" className="text-2xl font-bold tracking-tight">
          Live service alerts
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
          <span className="size-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
          Updating live
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {ALERTS.map((alert) => {
          const config = SEVERITY[alert.severity]
          const Icon = config.icon
          return (
            <li
              key={alert.line}
              className={`flex items-start gap-3 rounded-r-lg border border-l-4 border-border px-4 py-3.5 ${config.classes}`}
            >
              <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">
                  {alert.line}
                  <span className="sr-only">: {config.label}</span>
                </p>
                <p className="text-sm">{alert.message}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
