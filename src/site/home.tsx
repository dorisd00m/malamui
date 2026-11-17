import { ArrowRightIcon, BotIcon, BookOpenIcon, LayersIcon, PaletteIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SectionHeader } from "@/components/malam"
import { DEFAULT_THEMES, useTheme } from "@/components/malam"
import { Code, Page } from "./shell"
import { INSTALL_CMD } from "./config"

const features = [
  { icon: LayersIcon, title: "Full shadcn/ui set", body: "Every shadcn component restyled for Malam on Base UI primitives, plus extra blocks like PriceTag and ProductCapsule." },
  { icon: PaletteIcon, title: "Live theming", body: "Eight accent themes selected with one data-theme attribute. Re-theme the whole page or just a subtree." },
  { icon: BotIcon, title: "Agent-ready", body: "Ships a skill so Claude Code and other agents build in Malam correctly: tokens, rules and recipes included." },
  { icon: ShieldCheckIcon, title: "Token-first", body: "Colors, type and motion are CSS variables. No raw hex in components, so themes never break." },
]

function ThemeStrip() {
  const { theme, setTheme, themes } = useTheme()
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preview theme">
      {themes.map((t) => (
        <button
          key={t.name}
          type="button"
          role="radio"
          aria-checked={t.name === theme}
          onClick={() => setTheme(t.name)}
          className={
            "flex items-center gap-2 rounded-sm border border-border bg-black/20 px-3 py-1.5 text-[0.8125rem] transition-colors hover:border-link hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none " +
            (t.name === theme ? "border-link bg-accent text-heading" : "")
          }
        >
          <span className="flex overflow-hidden rounded-xs" aria-hidden>
            {t.swatches.map((c, i) => (
              <span key={i} className="h-3.5 w-2.5" style={{ background: c }} />
            ))}
          </span>
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function Home() {
  return (
    <Page route="home">
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-16 pb-12 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
            <div>
              <Badge className="mb-4">
                <SparklesIcon /> Tailwind v4 · shadcn/ui · Base UI
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                A dark, neutral UI library, built for humans <span className="text-link">and agents</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Malam UI is a complete shadcn/ui component set with a moody near-black look, live color themes, and an AI
                skill that teaches coding agents to use it properly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="success" size="lg" render={<a href="#/docs" />}>
                  Get started <ArrowRightIcon />
                </Button>
                <Button variant="secondary" size="lg" render={<a href="#/components/button" />}>
                  Browse components
                </Button>
                <Button variant="ghost" size="lg" render={<a href="#/skill" />}>
                  <BotIcon /> Use with AI
                </Button>
              </div>
              <Code className="mt-8 max-w-xl" title="Install">{INSTALL_CMD}</Code>
            </div>

            <div className="rounded-sm border border-border bg-card bg-panel p-5">
              <SectionHeader title="Try a theme" />
              <ThemeStrip />
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Revenue", "$45,231", "+20.1%"],
                  ["Subscriptions", "+2,350", "+180%"],
                ].map(([l, v, d]) => (
                  <Card key={l} size="sm">
                    <CardHeader>
                      <CardDescription>{l}</CardDescription>
                      <CardTitle className="text-xl group-data-[size=sm]/card:text-xl">{v}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">{d}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <Progress value={68} />
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="success">Success</Button>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-12">
          <SectionHeader title="Why Malam" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <f.icon className="mb-2 size-6 text-link" />
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "#/docs", icon: BookOpenIcon, title: "Documentation", body: "Install, theme, and customize in five minutes." },
              { href: "#/components/button", icon: LayersIcon, title: "Components", body: `Live previews of every component, themeable on the spot.` },
              { href: "#/skill", icon: BotIcon, title: "AI Skill", body: "Teach Claude Code and other agents to build in Malam." },
            ].map((l) => (
              <a key={l.href} href={l.href} className="group rounded-sm border border-border bg-card bg-panel p-5 transition-colors hover:border-link">
                <l.icon className="mb-3 size-6 text-link" />
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  {l.title} <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-1 text-muted-foreground">{l.body}</p>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {DEFAULT_THEMES.length} themes included. See everything together in the sample dashboard:{" "}
            <a className="text-link hover:underline" href="#/demo">live demo</a>.
          </p>
        </section>
      </main>
    </Page>
  )
}
