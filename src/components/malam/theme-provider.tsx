import * as React from "react"

export type ThemeDefinition = {
  /** Value written to `data-theme`. Must match a `[data-theme="…"]` block in malam.css. */
  name: string
  label: string
  /** Swatches shown in <ThemeSwitcher>: [primary, accent, surface] */
  swatches: [string, string, string]
}

export const DEFAULT_THEMES: ThemeDefinition[] = [
  { name: "crimson", label: "Crimson", swatches: ["#1a9fff", "#e5343d", "#121214"] },
  { name: "classic", label: "Classic", swatches: ["#1a9fff", "#75b022", "#121214"] },
  { name: "ember", label: "Ember", swatches: ["#1a9fff", "#f48c25", "#121214"] },
  { name: "amethyst", label: "Amethyst", swatches: ["#9b6bff", "#e0479e", "#121214"] },
  { name: "emerald", label: "Emerald", swatches: ["#2fbf71", "#e8b730", "#121214"] },
  { name: "ocean", label: "Ocean", swatches: ["#12b8c9", "#ff7358", "#121214"] },
  { name: "rose", label: "Rose", swatches: ["#f0507a", "#ffb938", "#121214"] },
  { name: "solar", label: "Solar", swatches: ["#f5a524", "#4db6ff", "#121214"] },
]

type ThemeContextValue = {
  theme: string
  setTheme: (name: string) => void
  themes: ThemeDefinition[]
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function readStored(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Applies `data-theme` to <html> (or `target`) and remembers the choice.
 * Wrap your app once; read/change the theme anywhere with `useTheme()`.
 */
function ThemeProvider({
  children,
  defaultTheme = "crimson",
  themes = DEFAULT_THEMES,
  storageKey = "malam-theme",
  onThemeChange,
}: {
  children: React.ReactNode
  defaultTheme?: string
  themes?: ThemeDefinition[]
  /** localStorage key. Pass `null` to disable persistence. */
  storageKey?: string | null
  /** Fires after the theme changes (not on first mount). */
  onThemeChange?: (theme: string) => void
}) {
  const [theme, setThemeState] = React.useState(() => {
    const stored = storageKey ? readStored(storageKey) : null
    return stored && themes.some((t) => t.name === stored) ? stored : defaultTheme
  })

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = React.useCallback(
    (name: string) => {
      if (!themes.some((t) => t.name === name)) {
        console.warn(`[malam] Unknown theme "${name}". Register it via <ThemeProvider themes>.`)
        return
      }
      setThemeState(name)
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, name)
        } catch {
          /* storage unavailable: theme still applies for this session */
        }
      }
      onThemeChange?.(name)
    },
    [themes, storageKey, onThemeChange]
  )

  const value = React.useMemo(() => ({ theme, setTheme, themes }), [theme, setTheme, themes])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme() must be used inside <ThemeProvider>")
  return ctx
}

export { ThemeProvider, useTheme }
