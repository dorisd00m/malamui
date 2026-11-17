import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon, addIcon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* Main demo ---------------------------------------------------------------- */

const sampleIcons = [
  ["lucide:house", "Lucide"],
  ["mdi:github", "Material Design"],
  ["tabler:brand-react", "Tabler"],
  ["ph:rocket-launch-fill", "Phosphor"],
  ["solar:bolt-bold-duotone", "Solar"],
  ["logos:tailwindcss-icon", "Logos (color)"],
  ["flat-color-icons:google", "Flat Color"],
  ["twemoji:night-with-stars", "Twemoji"],
] as const

export function IconDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      {sampleIcons.map(([name, set]) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-sm border border-border bg-card p-4 text-center">
          <Icon icon={name} size={32} className="text-link" label={name} />
          <code className="text-xs text-muted-foreground">{name}</code>
          <span className="text-[0.6875rem] text-muted-foreground/70">{set}</span>
        </div>
      ))}
    </div>
  )
}

/* Examples ----------------------------------------------------------------- */

export function IconSizesColorsExample() {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-end gap-5">
        {[16, 24, 32, 48].map((s) => (
          <Icon key={s} icon="lucide:heart" size={s} className="text-destructive" label={`${s}px heart`} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Icon icon="mdi:weather-night" size={28} className="text-link" />
        <Icon icon="mdi:weather-night" size={28} className="text-warning" />
        <Icon icon="mdi:weather-night" size={28} color="#2fbf71" />
        <Icon icon="mdi:arrow-right-bold" size={28} rotate={1} />
        <Icon icon="mdi:arrow-right-bold" size={28} flip="horizontal" />
      </div>
      <p className="text-sm">
        Without a size the icon is <Icon icon="lucide:sparkles" className="text-link" /> 1em, so it scales with{" "}
        <span className="text-xl">the text around it <Icon icon="lucide:sparkles" className="text-link" /></span>.
      </p>
    </div>
  )
}

export function IconInUiExample() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Icon icon="lucide:rocket" /> Deploy
        </Button>
        <Button variant="outline">
          <Icon icon="mdi:github" /> Sign in with GitHub
        </Button>
        <Button variant="secondary" size="icon" aria-label="Settings">
          <Icon icon="lucide:settings" />
        </Button>
        <Badge variant="success">
          <Icon icon="lucide:badge-check" /> Verified
        </Badge>
      </div>
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <Icon icon="lucide:search" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search icons…" />
      </InputGroup>
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">
            <Icon icon="lucide:layout-dashboard" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="b">
            <Icon icon="lucide:chart-column" /> Reports
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export function IconSetsExample() {
  const sets: [string, string[]][] = [
    ["Lucide", ["lucide:home", "lucide:user", "lucide:bell", "lucide:mail", "lucide:camera", "lucide:music"]],
    ["Material Design", ["mdi:home", "mdi:account", "mdi:bell", "mdi:email", "mdi:camera", "mdi:music"]],
    ["Phosphor", ["ph:house", "ph:user", "ph:bell", "ph:envelope", "ph:camera", "ph:music-note"]],
    ["Brand logos", ["logos:react", "logos:tailwindcss-icon", "logos:typescript-icon", "logos:vitejs", "logos:figma", "logos:github-icon"]],
  ]
  return (
    <div className="grid gap-4">
      {sets.map(([name, icons]) => (
        <div key={name} className="flex flex-wrap items-center gap-4">
          <span className="w-32 text-sm text-muted-foreground">{name}</span>
          {icons.map((i) => (
            <Icon key={i} icon={i} size={24} className="text-heading" label={i} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function IconAnimatedExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Icon icon="svg-spinners:ring-resize" size={32} className="text-link" label="Loading" />
      <Icon icon="svg-spinners:3-dots-bounce" size={32} className="text-link" label="Loading" />
      <Icon icon="line-md:loading-twotone-loop" size={32} className="text-warning" label="Loading" />
      <Icon icon="line-md:confirm-circle" size={32} className="text-success" label="Done" />
      <Icon icon="line-md:alert-circle" size={32} className="text-destructive" label="Error" />
    </div>
  )
}

export function IconOfflineExample() {
  // Register your own icons (or whole sets with addCollection) once; they then render with no network request.
  addIcon("malam:moon", {
    body: '<path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    width: 24,
    height: 24,
  })
  return (
    <div className="flex items-center gap-4">
      <Icon icon="malam:moon" size={36} className="text-link" label="Moon" />
      <p className="text-sm text-muted-foreground">
        <code>malam:moon</code> is registered with <code>addIcon</code>, so it works offline.
      </p>
    </div>
  )
}

export function IconSearchExample() {
  const [query, setQuery] = React.useState("moon")
  const [results, setResults] = React.useState<string[]>([])
  const [state, setState] = React.useState<"idle" | "loading" | "error">("idle")
  const [copied, setCopied] = React.useState<string | null>(null)

  React.useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      return
    }
    const ctrl = new AbortController()
    const t = setTimeout(() => {
      setState("loading")
      fetch(`https://api.iconify.design/search?query=${encodeURIComponent(q)}&limit=48&prefixes=lucide,mdi,tabler,ph,solar`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d: { icons?: string[] }) => {
          setResults(d.icons ?? [])
          setState("idle")
        })
        .catch((e) => {
          if (e.name !== "AbortError") setState("error")
        })
    }, 350)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [query])

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(`<Icon icon="${name}" />`)
      setCopied(name)
      setTimeout(() => setCopied(null), 1200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="grid w-full gap-3">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search 200,000+ icons (try: home, arrow, cloud)" aria-label="Search icons" className="max-w-sm" />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {state === "loading" ? "Searching…" : state === "error" ? "Could not reach the Iconify API." : `${results.length} results. Click an icon to copy its JSX.`}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
        {results.map((name) => (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => void copy(name)}
            className="group relative grid aspect-square place-items-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-link hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {copied === name ? <CheckIcon className="size-5 text-success" /> : <Icon icon={name} size={24} />}
            <span className="sr-only">{name}</span>
            <CopyIcon className="absolute top-1 right-1 size-3 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  )
}
