"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type AccessibilitySettings = {
  fontScale: number
  highContrast: boolean
  simplified: boolean
  reduceMotion: boolean
  underlineLinks: boolean
  readableSpacing: boolean
}

export type ToggleSetting = Exclude<keyof AccessibilitySettings, "fontScale">

type AccessibilityContextValue = AccessibilitySettings & {
  setFontScale: (scale: number) => void
  toggle: (key: ToggleSetting) => void
  reset: () => void
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontScale: 1,
  highContrast: false,
  simplified: false,
  reduceMotion: false,
  underlineLinks: false,
  readableSpacing: false,
}

export const MIN_SCALE = 0.9
export const MAX_SCALE = 1.4
const STORAGE_KEY = "nexus-a11y"

const CLASS_NAMES: Record<ToggleSetting, string> = {
  highContrast: "hc",
  simplified: "simplified",
  reduceMotion: "reduce-motion",
  underlineLinks: "underline-links",
  readableSpacing: "readable-spacing",
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)

  // Restore saved preferences on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) })
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  // Reflect settings onto the document and persist them.
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--font-scale", String(settings.fontScale))
    for (const [key, className] of Object.entries(CLASS_NAMES)) {
      root.classList.toggle(className, settings[key as ToggleSetting])
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* storage may be unavailable */
    }
  }, [settings])

  const setFontScale = useCallback(
    (scale: number) =>
      setSettings((s) => ({
        ...s,
        fontScale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(scale.toFixed(2)))),
      })),
    [],
  )
  const toggle = useCallback(
    (key: ToggleSetting) => setSettings((s) => ({ ...s, [key]: !s[key] })),
    [],
  )
  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  const value = useMemo<AccessibilityContextValue>(
    () => ({ ...settings, setFontScale, toggle, reset }),
    [settings, setFontScale, toggle, reset],
  )

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider")
  return ctx
}
