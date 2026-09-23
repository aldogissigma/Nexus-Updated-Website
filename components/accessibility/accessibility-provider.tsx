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

type AccessibilitySettings = {
  fontScale: number
  highContrast: boolean
  simplified: boolean
}

type AccessibilityContextValue = AccessibilitySettings & {
  increaseFont: () => void
  decreaseFont: () => void
  resetFont: () => void
  toggleContrast: () => void
  toggleSimplified: () => void
}

const DEFAULTS: AccessibilitySettings = {
  fontScale: 1,
  highContrast: false,
  simplified: false,
}

const MIN_SCALE = 0.9
const MAX_SCALE = 1.4
const STEP = 0.1
const STORAGE_KEY = "nexus-a11y"

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULTS)

  // Restore saved preferences on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) })
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  // Reflect settings onto the document and persist them.
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--font-scale", String(settings.fontScale))
    root.classList.toggle("hc", settings.highContrast)
    root.classList.toggle("simplified", settings.simplified)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* storage may be unavailable */
    }
  }, [settings])

  const increaseFont = useCallback(
    () =>
      setSettings((s) => ({
        ...s,
        fontScale: Math.min(MAX_SCALE, Number((s.fontScale + STEP).toFixed(2))),
      })),
    [],
  )
  const decreaseFont = useCallback(
    () =>
      setSettings((s) => ({
        ...s,
        fontScale: Math.max(MIN_SCALE, Number((s.fontScale - STEP).toFixed(2))),
      })),
    [],
  )
  const resetFont = useCallback(() => setSettings((s) => ({ ...s, fontScale: 1 })), [])
  const toggleContrast = useCallback(
    () => setSettings((s) => ({ ...s, highContrast: !s.highContrast })),
    [],
  )
  const toggleSimplified = useCallback(
    () => setSettings((s) => ({ ...s, simplified: !s.simplified })),
    [],
  )

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...settings,
      increaseFont,
      decreaseFont,
      resetFont,
      toggleContrast,
      toggleSimplified,
    }),
    [settings, increaseFont, decreaseFont, resetFont, toggleContrast, toggleSimplified],
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
