// The SettingsPanel component provides a centralized UI for managing site-wide visual and accessibility preferences using user accessibility

"use client"

import { AArrowDown, AArrowUp, Contrast, Eye, Link2, Monitor, Moon, Pause, RotateCcw, Sun, Type } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  MAX_SCALE,
  MIN_SCALE,
  useAccessibility,
  type Theme,
  type ToggleSetting,
} from "@/components/accessibility/accessibility-provider"

const TOGGLES: { key: ToggleSetting; icon: LucideIcon; title: string; description: string }[] = [
  {
    key: "highContrast",
    icon: Contrast,
    title: "High contrast",
    description: "Maximum-contrast text, stronger borders and bolder colours throughout. Works in light and dark mode.",
  },
  {
    key: "simplified",
    icon: Eye,
    title: "Simplified view",
    description: "Hides decorative images and shadows so you can focus on the content.",
  },
  {
    key: "readableSpacing",
    icon: Type,
    title: "Readable spacing",
    description: "Adds extra space between letters, words and lines. Helpful for dyslexia.",
  },
  {
    key: "underlineLinks",
    icon: Link2,
    title: "Underline links",
    description: "Underlines every link so they don't rely on colour alone.",
  },
  {
    key: "reduceMotion",
    icon: Pause,
    title: "Reduce motion",
    description: "Turns off animations, smooth scrolling and pulsing indicators.",
  },
]

const THEMES: { value: Theme; icon: LucideIcon; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "Match device" },
]

export function SettingsPanel() {
  const settings = useAccessibility()
  const { theme, setTheme, fontScale, setFontScale, toggle, reset } = settings

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="appearance-heading"
        className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
      >
        <h2 id="appearance-heading" className="text-xl font-bold">
          Appearance
        </h2>
        <p className="mt-1 text-muted-foreground">
          Choose light or dark mode, or follow your device setting.
        </p>
        <div role="radiogroup" aria-labelledby="appearance-heading" className="mt-5 grid grid-cols-3 gap-3">
          {THEMES.map((t) => {
            const Icon = t.icon
            const selected = theme === t.value
            return (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTheme(t.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  selected ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-background hover:bg-muted"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {t.label}
              </button>
            )
          })}
        </div>
      </section>

      <section
        aria-labelledby="text-size-heading"
        className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
      >
        <h2 id="text-size-heading" className="text-xl font-bold">
          Text size
        </h2>
        <p className="mt-1 text-muted-foreground">
          Make all text on the website larger or smaller.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFontScale(fontScale - 0.1)}
            disabled={fontScale <= MIN_SCALE}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
          >
            <AArrowDown className="size-5" aria-hidden="true" />
            <span className="sr-only">Decrease text size</span>
          </button>
          <label htmlFor="font-scale" className="sr-only">
            Text size
          </label>
          <input
            id="font-scale"
            type="range"
            min={MIN_SCALE * 100}
            max={MAX_SCALE * 100}
            step={10}
            value={Math.round(fontScale * 100)}
            onChange={(e) => setFontScale(Number(e.target.value) / 100)}
            className="h-2 flex-1 cursor-pointer accent-primary"
          />
          <button
            type="button"
            onClick={() => setFontScale(fontScale + 0.1)}
            disabled={fontScale >= MAX_SCALE}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
          >
            <AArrowUp className="size-5" aria-hidden="true" />
            <span className="sr-only">Increase text size</span>
          </button>
          <span className="w-14 text-right font-semibold tabular-nums" aria-live="polite">
            {Math.round(fontScale * 100)}%
          </span>
        </div>
      </section>

      <section aria-labelledby="display-heading">
        <h2 id="display-heading" className="text-xl font-bold">
          Display options
        </h2>
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
          {TOGGLES.map((item) => {
            const Icon = item.icon
            const on = settings[item.key]
            const id = `setting-${item.key}`
            return (
              <li key={item.key} className="flex items-center gap-4 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p id={`${id}-label`} className="font-semibold">
                    {item.title}
                  </p>
                  <p id={`${id}-desc`} className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-labelledby={`${id}-label`}
                  aria-describedby={`${id}-desc`}
                  onClick={() => toggle(item.key)}
                  className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    on ? "border-primary bg-primary" : "border-input bg-muted"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block size-6 rounded-full bg-white shadow transition-transform ${
                      on ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                  <span className="sr-only">{on ? "On" : "Off"}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="flex flex-col items-start gap-3 rounded-2xl bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secondary-foreground">
          Settings are saved in this browser only. Nothing is sent to Nexus.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset to default
        </button>
      </div>
    </div>
  )
}

// Theme Selection: Switch between Light, Dark, or System mode via ARIA radio buttons.
// Font Scaling: Increase or decrease text scale using buttons or a range slider with a live percentage indicator.
// Display Toggles: Accessible switches for High Contrast, Simplified View, Readable Spacing, Underlined Links, and Reduced Motion.
// Persistence & Reset: Displays a notice that options store locally in localStorage and includes a single-click reset button.
