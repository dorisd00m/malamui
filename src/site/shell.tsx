import * as React from "react"
import { CheckIcon, CopyIcon, MoonStarIcon, RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle, ThemeSwitcher, useTheme } from "@/components/malam"
import { cn } from "@/lib/utils"
import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import { REPO_URL } from "./config"

export type Route = "home" | "docs" | "components" | "skill" | "demo"

const NAV: { route: Route; label: string; href: string }[] = [
  { route: "docs", label: "Documentation", href: "#/docs" },
  { route: "components", label: "Components", href: "#/components/button" },
  { route: "skill", label: "AI Skill", href: "#/skill" },
  { route: "demo", label: "Demo", href: "#/demo" },
]

/* Custom theme: derive the accent palette from two colors ---------------- */

const CUSTOM_VARS = [
  "--primary", "--primary-from", "--primary-to", "--link", "--ring", "--secondary",
  "--secondary-foreground", "--secondary-from", "--secondary-to", "--cta",
  "--cta-from", "--cta-to", "--cta-foreground", "--sale", "--sale-foreground",
  "--review-positive", "--chart-1", "--chart-2", "--chart-4",
]

function applyCustom(primary: string, accent: string, light = false) {
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
    "--cta": mix(accent, "black", 85),
    "--cta-from": accent,
    "--cta-to": mix(accent, "black", 70),
    "--cta-foreground": mix(accent, "white", 15),
    "--sale": mix(accent, "black", 35),
    "--sale-foreground": mix(accent, "white", 60),
    "--review-positive": mix(primary, "white", 60),
    "--chart-1": primary,
    "--chart-2": mix(primary, "white", 60),
    "--chart-4": mix(accent, "white", 60),
  }
  if (light) {
    // The light-mode stylesheet derives these from --primary so they stay readable on white.
    for (const k of ["--link", "--ring", "--secondary", "--secondary-foreground", "--review-positive", "--sale", "--sale-foreground"]) delete v[k]
  }
  for (const k in v) document.documentElement.style.setProperty(k, v[k])
}

function clearCustom() {
  for (const k of CUSTOM_VARS) document.documentElement.style.removeProperty(k)
}

export function CustomColors() {
  const { theme, resolvedMode } = useTheme()
  const [primary, setPrimary] = React.useState("#1a9fff")
  const [accent, setAccent] = React.useState("#e5343d")
  const [active, setActive] = React.useState(false)

  // Picking a preset theme drops any custom override.
  React.useEffect(() => {
    clearCustom()
    setActive(false)
  }, [theme])

  // Re-derive the custom palette when switching between light and dark.
  React.useEffect(() => {
    clearCustom()
    if (active) applyCustom(primary, accent, resolvedMode === "light")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedMode])

  const update = (p: string, a: string) => {
    setPrimary(p)
    setAccent(a)
    clearCustom()
    applyCustom(p, a, resolvedMode === "light")
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
        <a href="#/" className="order-1 flex items-center gap-2 text-heading">
          <MoonStarIcon className="size-6 text-link" />
          <span className="text-lg font-bold tracking-[0.12em] uppercase">Malam</span>
          <span className="hidden text-sm font-normal text-muted-foreground sm:inline">UI</span>
        </a>
        <nav className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-2 md:mx-0 md:w-auto" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.route}
              href={n.href}
              aria-current={n.route === route ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-xs px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-heading",
                n.route === route && "bg-accent text-heading"
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="order-2 ml-auto flex items-center gap-3 sm:gap-4 md:order-3">
          <span className="hidden sm:contents">
            <CustomColors />
          </span>
          <ThemeSwitcher />
          <ModeToggle />
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
          <a href="#/components/button" className="hover:text-heading">Components</a>
          <a href="#/skill" className="hover:text-heading">AI Skill</a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-heading">GitHub</a>
        </span>
      </div>
    </footer>
  )
}

export function Page({ route, children, footer = true }: { route: Route; children: React.ReactNode; footer?: boolean }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader route={route} />
      {children}
      {footer && <SiteFooter />}
    </div>
  )
}

/* Small shared pieces ----------------------------------------------------- */

const LANG_LABEL: Record<string, string> = {
  tsx: "TSX",
  jsx: "JSX",
  ts: "TS",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  bash: "Shell",
  markdown: "Markdown",
  text: "Text",
}

/** Best-effort language from a title ("src/index.css") or from the code itself. */
function inferLang(title: string | undefined, code: string): string {
  const t = (title ?? "").toLowerCase()
  if (/\.(tsx|jsx)\b/.test(t)) return "tsx"
  if (/\.(ts|js|mjs|cjs)\b/.test(t)) return "ts"
  if (/\.css\b/.test(t)) return "css"
  if (/\.html?\b/.test(t) || t === "html") return "html"
  if (/\.json\b/.test(t) || t === "json") return "json"
  if (/\.md\b/.test(t)) return "markdown"
  if (/(terminal|shell|install|bash|powershell|command)/.test(t)) return "bash"
  const c = code.trimStart()
  if (/^(npx|npm|yarn|pnpm|git|node|cd|mkdir|cp|curl|\$)\s/.test(c)) return "bash"
  if (c.startsWith("---")) return "markdown"
  if (/^[{[]\s*["\n]/.test(c) && /"[^"]+"\s*:/.test(c)) return "json"
  if (/^<(!doctype|html|link|script|meta)/i.test(c)) return "html"
  if (/@import|^\s*(:root|\[data-)[^{]*\{|--[\w-]+\s*:/m.test(c) && !/\bimport\b[^;]*from/.test(c)) return "css"
  if (/\b(import|export|const|function|return)\b|<\/?[A-Z][\w.]*|=>/.test(c)) return "tsx"
  return "text"
}

/**
 * Syntax-highlighted code panel (Shiki, colors from the --code-* tokens). It stays dark in light mode,
 * like most code editors, and gets line numbers for anything longer than a few lines.
 */
export function Code({
  children,
  title,
  className,
  lang,
  lineNumbers,
}: {
  children: string
  title?: string
  className?: string
  lang?: string
  lineNumbers?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const language = lang ?? inferLang(title, children)
  const lines = useHighlightedCode(children, language)
  const shell = language === "bash"
  const numbers = lineNumbers ?? (!shell && lines.length > 4)
  const raw = children.replace(/\n$/, "").split("\n")

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
    <div className={cn("group/code relative overflow-hidden rounded-md border border-(--code-border) bg-(--code-background) text-(--code-foreground) shadow-panel", className)}>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/70 via-cta/40 to-transparent" />
      <div className="flex items-center gap-2 border-b border-(--code-border) bg-(--code-header) py-1.5 pr-2 pl-3 text-xs text-(--code-muted)">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="truncate pl-1.5 font-medium text-(--code-foreground)/80">{title ?? ""}</span>
        <span className="ml-auto rounded-xs bg-white/8 px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase">
          {LANG_LABEL[language] ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1 rounded-xs px-1.5 py-0.5 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {copied ? <CheckIcon className="size-3.5 text-(--code-token-string)" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto py-3 font-mono text-[0.8125rem] leading-6">
        <code className="block min-w-max">
          {lines.map((line, i) => (
            <span key={i} className="flex px-1 hover:bg-white/[0.035]">
              {numbers && <span aria-hidden className="w-9 shrink-0 pr-3 text-right text-(--code-muted)/55 select-none">{i + 1}</span>}
              <span className={cn("whitespace-pre", numbers ? "pr-4" : "px-3")}>
                {shell && raw[i]?.trim() && !raw[i].trim().startsWith("#") && !/^\s/.test(raw[i]) && (
                  <span aria-hidden className="mr-2 text-(--code-muted) select-none">$</span>
                )}
                {line}
                {"\n"}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-4 leading-relaxed text-foreground [&_:not(pre)>code]:rounded-xs [&_:not(pre)>code]:bg-(--tint) [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.8125rem] [&_:not(pre)>code]:text-link", className)}>{children}</div>
}
