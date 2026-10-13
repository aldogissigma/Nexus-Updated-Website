//This file is a React Context provider and hook that controls site wide accessibility settings and visual themes.
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

export type Theme = "light" | "dark" | "system"
// theme

export type AccessibilitySettings = {
  theme: Theme
  fontScale: number
  highContrast: boolean
  simplified: boolean
  reduceMotion: boolean
  underlineLinks: boolean
  readableSpacing: boolean
}

export type ToggleSetting = Exclude<keyof AccessibilitySettings, "fontScale" | "theme">

type AccessibilityContextValue = AccessibilitySettings & {
  isDark: boolean
  setTheme: (theme: Theme) => void
  setFontScale: (scale: number) => void
  toggle: (key: ToggleSetting) => void
  reset: () => void
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  theme: "system",
  fontScale: 1,
  highContrast: false,
  simplified: false,
  reduceMotion: false,
  underlineLinks: false,
  readableSpacing: false,
}

export const MIN_SCALE = 0.9
export const MAX_SCALE = 1.4
export const STORAGE_KEY = "nexus-a11y"

/** Runs before hydration so the saved theme is applied without a flash. */
export const THEME_INIT_SCRIPT = `try{var s=JSON.parse(localStorage.getItem("${STORAGE_KEY}")||"{}"),t=s.theme||"system";if(t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

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
  const [loaded, setLoaded] = useState(false)
  const [systemDark, setSystemDark] = useState(false)

  // Restore saved preferences on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) })
    } catch {
      /* ignore malformed storage */
    }
    setLoaded(true)

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemDark(media.matches)
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const isDark = settings.theme === "dark" || (settings.theme === "system" && systemDark)

  useEffect(() => {
    if (!loaded) return
    const root = document.documentElement
    root.classList.toggle("dark", isDark)
    root.style.setProperty("--font-scale", String(settings.fontScale))
    for (const [key, className] of Object.entries(CLASS_NAMES)) {
      root.classList.toggle(className, settings[key as ToggleSetting])
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* storage may be unavailable */
    }
  }, [settings, loaded, isDark])

  const setFontScale = useCallback(
    (scale: number) =>
      setSettings((s) => ({
        ...s,
        fontScale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(scale.toFixed(2)))),
      })),
    [],
  )
  const setTheme = useCallback((theme: Theme) => setSettings((s) => ({ ...s, theme })), [])
  const toggle = useCallback(
    (key: ToggleSetting) => setSettings((s) => ({ ...s, [key]: !s[key] })),
    [],
  )
  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  const value = useMemo<AccessibilityContextValue>(
    () => ({ ...settings, isDark, setTheme, setFontScale, toggle, reset }),
    [settings, isDark, setTheme, setFontScale, toggle, reset],
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

// State & Persistence: Manages preferences like dark mode, high contrast, font scaling, reduced motion, link underlines, and line spacing, saving them to localStorage.
// DOM Integration: Dynamically updates CSS classes and CSS variables on the root <html> element as settings change.
// Flicker Prevention: Provides an inline script (THEME_INIT_SCRIPT) injected before page hydration to load saved dark mode without a visual flash.
// Developer Access: Exports the useAccessibility() custom hook so any component can read or update these accessibility controls.
