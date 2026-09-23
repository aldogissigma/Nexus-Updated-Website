"use client"

import { AArrowDown, AArrowUp, Contrast, Eye, RotateCcw } from "lucide-react"
import { useAccessibility } from "./accessibility-provider"

export function AccessibilityBar() {
  const {
    fontScale,
    highContrast,
    simplified,
    increaseFont,
    decreaseFont,
    resetFont,
    toggleContrast,
    toggleSimplified,
  } = useAccessibility()

  return (
    <div className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 md:px-6">
        <p className="text-sm font-medium">
          <span aria-hidden="true">♿ </span>Accessibility tools
        </p>

        <div
          role="group"
          aria-label="Accessibility controls"
          className="flex flex-wrap items-center gap-2"
        >
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            <button
              type="button"
              onClick={decreaseFont}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
              disabled={fontScale <= 0.9}
            >
              <AArrowDown className="size-4" aria-hidden="true" />
              <span className="sr-only">Decrease text size</span>
            </button>
            <span className="min-w-12 text-center text-xs tabular-nums" aria-live="polite">
              {Math.round(fontScale * 100)}%
            </span>
            <button
              type="button"
              onClick={increaseFont}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
              disabled={fontScale >= 1.4}
            >
              <AArrowUp className="size-4" aria-hidden="true" />
              <span className="sr-only">Increase text size</span>
            </button>
            <button
              type="button"
              onClick={resetFont}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Reset text size</span>
            </button>
          </div>

          <button
            type="button"
            onClick={toggleContrast}
            aria-pressed={highContrast}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <Contrast className="size-4" aria-hidden="true" />
            High contrast
          </button>

          <button
            type="button"
            onClick={toggleSimplified}
            aria-pressed={simplified}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <Eye className="size-4" aria-hidden="true" />
            Simplified view
          </button>
        </div>
      </div>
    </div>
  )
}
