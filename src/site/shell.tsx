import * as React from "react"
import { CheckIcon, CopyIcon, MoonStarIcon, RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher, useTheme } from "@/components/malam"
import { cn } from "@/lib/utils"

export type Route = "home" | "docs" | "components" | "skill" | "demo"

const NAV: { route: Route; label: string; href: string }[] = [
  { route: "docs", label: "Documentation", href: "#/docs" },
  { route: "components", label: "Components", href: "#/components" },
  { route: "skill", label: "AI Skill", href: "#/skill" },
  { route: "demo", label: "Demo", href: "#/demo" },
]

/* Custom theme: derive the accent palette from two colors ---------------- */

const CUSTOM_VARS = [
  "--primary", "--primary-from", "--primary-to", "--link", "--ring", "--secondary",
  "--secondary-foreground", "--secondary-from", "--secondary-to", "--success",
  "--success-from", "--success-to", "--success-foreground", "--sale", "--sale-foreground",
  "--review-positive", "--chart-1", "--chart-2", "--chart-4",
]

function applyCustom(primary: string, accent: string) {
  const mix = (c: string, w: string, p: number) => `color-mix(in srgb, ${c} ${p}%, ${w})`
  const v: Record<string, string> = {
    "--primary": primary,
    "--primary-from": mix(primary, "white", 75),
    "--primary-to": mix(primary, "black", 75),
    "--link": mix(primary, "white", 60),
    "--ring": mix(primary, "white", 60),
    "--secondary": `color-mix(in srgb, ${primary} 20%, transparent)`,
    "--secondary-foreground": mix(primary, "white", 60),
    "--secondary-from": mix(primary, "#121214", 55),
    "--secondary-to": mix(primary, "white", 60),
    "--success": mix(accent, "black", 85),
    "--success-from": accent,
    "--success-to": mix(accent, "black", 70),
    "--success-foreground": mix(accent, "white", 15),
    "--sale": mix(accent, "black", 35),
    "--sale-foreground": mix(accent, "white", 60),
    "--review-positive": mix(primary, "white", 60),
    "--chart-1": primary,
    "--chart-2": mix(primary, "white", 60),
    "--chart-4": mix(accent, "white", 60),
  }
  for (const k in v) document.documentElement.style.setProperty(k, v[k])
}

function clearCustom() {
  for (const k of CUSTOM_VARS) document.documentElement.style.removeProperty(k)
}

export function CustomColors() {
  const { theme } = useTheme()
  const [primary, setPrimary] = React.useState("#1a9fff")
  const [accent, setAccent] = React.useState("#e5343d")
  const [active, setActive] = React.useState(false)

  // Picking a preset theme drops any custom override.
  React.useEffect(() => {
    clearCustom()
    setActive(false)
  }, [theme])

  const update = (p: string, a: string) => {
    setPrimary(p)
    setAccent(a)
    applyCustom(p, a)
    setActive(true)
  }
  const swatch = "h-7 w-9 cursor-pointer rounded-xs border border-border bg-transparent p-0.5"

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <label className="flex items-center gap-2">
        <span className="hidden xl:inline">Primary</span>
        <input type="color" aria-label="Primary color" value={primary} onChange={(e) => update(e.target.value, accent)} className={swatch} />
      </label>
      <label className="flex items-center gap-2">
        <span className="hidden xl:inline">Accent</span>
        <input type="color" aria-label="Accent color" value={accent} onChange={(e) => update(primary, e.target.value)} className={swatch} />
      </label>
      {active && (
        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            clearCustom()
            setActive(false)
          }}
        >
          <RotateCcwIcon /> Reset
        </Button>
      )}
    </div>
  )
}

/* Layout ------------------------------------------------------------------ */

export function SiteHeader({ route }: { route: Route }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <a href="#/" className="flex items-center gap-2 text-heading">
          <MoonStarIcon className="size-6 text-link" />
          <span className="text-lg font-bold tracking-[0.12em] uppercase">Malam</span>
          <span className="hidden text-sm font-normal text-muted-foreground sm:inline">UI</span>
        </a>
        <nav className="flex items-center gap-1" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.route}
              href={n.href}
              aria-current={n.route === route ? "page" : undefined}
              className={cn(
                "rounded-xs px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-heading",
                n.route === route && "bg-accent text-heading"
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <CustomColors />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-header py-10 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4">
        <span>Malam UI: Tailwind v4 · shadcn/ui · Base UI. Titles and artwork in demos are placeholders.</span>
        <span className="flex gap-4">
          <a href="#/docs" className="hover:text-heading">Docs</a>
          <a href="#/components" className="hover:text-heading">Components</a>
          <a href="#/skill" className="hover:text-heading">AI Skill</a>
        </span>
      </div>
    </footer>
  )
}

export function Page({ route, children }: { route: Route; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader route={route} />
      {children}
      <SiteFooter />
    </div>
  )
}

/* Small shared pieces ----------------------------------------------------- */

export function Code({ children, title, className }: { children: string; title?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className={cn("overflow-hidden rounded-sm border border-border bg-surface", className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted-foreground">
        <span>{title ?? " "}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1 rounded-xs px-1.5 py-0.5 hover:bg-accent hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-4 leading-relaxed text-foreground [&_:not(pre)>code]:rounded-xs [&_:not(pre)>code]:bg-black/30 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.8125rem] [&_:not(pre)>code]:text-link", className)}>{children}</div>
}
