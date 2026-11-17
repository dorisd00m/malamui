import * as React from "react"
import { RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FontOption = {
  id: string
  name: string
  /** CSS family name registered by @fontsource-variable/<id> */
  family: string
  vibe: string
  load: () => Promise<unknown>
}

export const FONT_OPTIONS: FontOption[] = [
  { id: "figtree", name: "Figtree", family: "Figtree Variable", vibe: "Friendly, geometric (default)", load: () => import("@fontsource-variable/figtree") },
  { id: "albert-sans", name: "Albert Sans", family: "Albert Sans Variable", vibe: "Warm, slightly condensed", load: () => import("@fontsource-variable/albert-sans") },
  { id: "plus-jakarta-sans", name: "Plus Jakarta Sans", family: "Plus Jakarta Sans Variable", vibe: "Modern, rounder curves", load: () => import("@fontsource-variable/plus-jakarta-sans") },
  { id: "instrument-sans", name: "Instrument Sans", family: "Instrument Sans Variable", vibe: "Crisp, editorial", load: () => import("@fontsource-variable/instrument-sans") },
  { id: "dm-sans", name: "DM Sans", family: "DM Sans Variable", vibe: "Low-contrast geometric", load: () => import("@fontsource-variable/dm-sans") },
  { id: "inter", name: "Inter", family: "Inter Variable", vibe: "Neutral, very legible", load: () => import("@fontsource-variable/inter") },
]

const stackFor = (family: string) => `"${family}", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`

/**
 * Live font preview for the docs. Setting --malam-font-sans on <html> re-fonts the whole site,
 * which is exactly what you do in your own project (in CSS instead of JS).
 */
export function FontPicker({ onChange }: { onChange?: (font: FontOption) => void }) {
  const [id, setId] = React.useState("figtree")
  const [loading, setLoading] = React.useState(false)
  const current = FONT_OPTIONS.find((f) => f.id === id)!

  const choose = async (f: FontOption) => {
    setLoading(true)
    try {
      await f.load()
    } finally {
      setLoading(false)
    }
    document.documentElement.style.setProperty("--malam-font-sans", stackFor(f.family))
    setId(f.id)
    onChange?.(f)
  }

  const reset = () => {
    document.documentElement.style.removeProperty("--malam-font-sans")
    setId("figtree")
    onChange?.(FONT_OPTIONS[0])
  }

  // Do not leave the override behind when leaving the docs page.
  React.useEffect(
    () => () => {
      document.documentElement.style.removeProperty("--malam-font-sans")
    },
    []
  )

  return (
    <div className="space-y-4 rounded-sm border border-border bg-card p-4">
      <div role="radiogroup" aria-label="Font" className="flex flex-wrap gap-2">
        {FONT_OPTIONS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={f.id === id}
            onClick={() => void choose(f)}
            style={{ fontFamily: `"${f.family}", ui-sans-serif, system-ui, sans-serif` }}
            className={cn(
              "rounded-sm border border-border bg-(--tint) px-3 py-1.5 text-sm transition-colors hover:border-link hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              f.id === id && "border-link bg-accent text-heading"
            )}
          >
            {f.name}
          </button>
        ))}
        {id !== "figtree" && (
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcwIcon /> Reset
          </Button>
        )}
      </div>
      <div aria-live="polite">
        <p className="text-3xl font-bold text-heading">The quick brown fox jumps</p>
        <p className="mt-1 text-muted-foreground">
          {current.name}: {current.vibe}. {loading ? "Loading…" : "Everything on this page now uses it."}
        </p>
        <p className="mt-2 text-sm">0123456789 · Aa Bb Cc · $45,231.89 · ⌘K</p>
      </div>
    </div>
  )
}
