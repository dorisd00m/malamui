import * as React from "react"
import {
  AppWindowIcon,
  ArrowRightIcon,
  BotIcon,
  CircleCheckIcon,
  FileUpIcon,
  GamepadIcon,
  GlobeIcon,
  InfoIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  OctagonXIcon,
  PaletteIcon,
  PenLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
  TriangleAlertIcon,
  WandSparklesIcon,
  ImagesIcon,
  ListFilterIcon,
} from "lucide-react"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicSelect, type SelectOption } from "@/components/ui/dynamic-select"
import { FileUpload } from "@/components/ui/file-upload"
import { ImageSlider } from "@/components/ui/image-slider"
import { FadeIn, motion, Pressable, Stagger, StaggerItem } from "@/components/ui/motion"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DEFAULT_THEMES, useTheme, type Mode } from "@/components/malam"
import { entries } from "../gallery/gallery"
import { InteractiveAreaChartDemo, SparklineDemo } from "../gallery/demos-charts"
import { sampleSlides } from "../gallery/demos-extended"
import { Code, Page } from "./shell"
import { INSTALL_CMD } from "./config"

/* ---------------------------------------------------------------------------
   Small building blocks
--------------------------------------------------------------------------- */

const componentFiles = Object.keys(import.meta.glob("../components/ui/*.tsx")).length

/** Counts up to `to` when scrolled into view (instant when the user prefers reduced motion). */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(reduce ? to : 0)
  React.useEffect(() => {
    if (!inView) return
    if (reduce) return setN(to)
    const controls = animate(0, to, { duration: 1.1, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, reduce])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function Section({ id, eyebrow, title, intro, children, className }: { id?: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={"mx-auto max-w-[1200px] px-4 py-14 " + (className ?? "")}>
      <FadeIn className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-link uppercase">{eyebrow}</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
      </FadeIn>
      {children}
    </section>
  )
}

/** Soft animated glow behind the hero. Static when reduced motion is on. */
function AmbientGlow() {
  const reduce = useReducedMotion()
  const blob = "pointer-events-none absolute rounded-full blur-3xl"
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className={blob + " -top-24 left-[10%] size-[28rem] bg-primary/25"}
        animate={reduce ? undefined : { x: [0, 60, -20, 0], y: [0, 30, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={blob + " top-10 right-[5%] size-[24rem] bg-cta/20"}
        animate={reduce ? undefined : { x: [0, -50, 20, 0], y: [0, 40, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Interactive: theme + mode picker
--------------------------------------------------------------------------- */

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
            "flex items-center gap-2 rounded-sm border border-border bg-(--tint) px-3 py-1.5 text-[0.8125rem] transition-colors hover:border-link hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none " +
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

function ModePicker() {
  const { mode, setMode } = useTheme()
  const opts: { v: Mode; label: string; icon: typeof SunIcon }[] = [
    { v: "light", label: "Light", icon: SunIcon },
    { v: "dark", label: "Dark", icon: MoonIcon },
    { v: "system", label: "System", icon: MonitorIcon },
  ]
  return (
    <ToggleGroup value={[mode]} onValueChange={(v) => v[0] && setMode(v[0] as Mode)} aria-label="Color mode">
      {opts.map((o) => (
        <ToggleGroupItem key={o.v} value={o.v} aria-label={o.label}>
          <o.icon /> {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/* ---------------------------------------------------------------------------
   Content
--------------------------------------------------------------------------- */

const features = [
  { icon: LayersIcon, title: "The full shadcn/ui set", body: "Every component restyled on Base UI primitives, each installable on its own with one command." },
  { icon: PaletteIcon, title: "Themes and light mode", body: "Eight accent themes plus light, dark and system mode. Re-theme a page or just one subtree." },
  { icon: WandSparklesIcon, title: "Motion built in", body: "FadeIn, Stagger, Presence and more on Framer Motion, all respecting reduced-motion." },
  { icon: ShieldCheckIcon, title: "Status colors that stay put", body: "Success is always green, warning amber, info blue. Never recolored by a theme." },
  { icon: FileUpIcon, title: "Beyond shadcn", body: "File upload, async selects, image sliders and a rich text editor, kept in a clearly separate set." },
  { icon: BotIcon, title: "Agent-ready", body: "A skill teaches Claude Code and other agents the tokens, rules and recipes." },
]

const extended = [
  { icon: FileUpIcon, name: "File upload", lib: "react-dropzone", id: "file-upload" },
  { icon: ListFilterIcon, name: "Dynamic select", lib: "react-select", id: "dynamic-select" },
  { icon: ImagesIcon, name: "Image slider", lib: "Swiper", id: "image-slider" },
  { icon: PenLineIcon, name: "Rich text editor", lib: "Editor.js", id: "rich-text-editor" },
  { icon: WandSparklesIcon, name: "Motion", lib: "Framer Motion", id: "motion" },
]

const demoCards = [
  { href: "#/demo/dashboard", icon: LayoutDashboardIcon, title: "Dashboard", body: "Stats, charts, tables and goals." },
  { href: "#/demo/website", icon: GlobeIcon, title: "Website", body: "Landing page, pricing and FAQ." },
  { href: "#/demo/desktop", icon: AppWindowIcon, title: "Desktop app", body: "A graphic editor with layers." },
  { href: "#/demo/kiosk", icon: MonitorSmartphoneIcon, title: "Kiosk", body: "Touch-first self-order flow." },
  { href: "#/demo/game", icon: GamepadIcon, title: "Game", body: "HUD, main menu and inventory." },
]

const tagOptions: SelectOption[] = ["Action", "Strategy", "Puzzle", "Racing", "Cozy", "Co-op"].map((c) => ({ value: c.toLowerCase(), label: c }))

export function Home() {
  const chartCount = entries.filter((e) => e.group === "Charts").length
  const stats = [
    { n: componentFiles, suffix: "", label: "components" },
    { n: DEFAULT_THEMES.length, suffix: "", label: "color themes" },
    { n: chartCount, suffix: "", label: "chart samples" },
    { n: 5, suffix: "", label: "extended components" },
  ]

  return (
    <Page route="home">
      <main>
        {/* ----------------------------- Hero ----------------------------- */}
        <section className="relative">
          <AmbientGlow />
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-16 pb-12 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
            <Stagger inView={false} stagger={0.09}>
              <StaggerItem>
                <Badge className="mb-4">
                  <SparklesIcon /> Tailwind v4 · shadcn/ui · Base UI · Framer Motion
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  A neutral, themeable UI library, built for humans <span className="text-link">and agents</span>.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                  The complete shadcn/ui set with a near-black default look, light mode, eight live themes, animated primitives, charts and
                  extended components like file upload and a rich text editor.
                </p>
              </StaggerItem>
              <StaggerItem className="mt-8 flex flex-wrap gap-3">
                <Button variant="cta" size="lg" render={<a href="#/docs" />}>
                  Get started <ArrowRightIcon />
                </Button>
                <Button variant="secondary" size="lg" render={<a href="#/components/button" />}>
                  Browse components
                </Button>
                <Button variant="ghost" size="lg" render={<a href="#/demo/dashboard" />}>
                  See the demos
                </Button>
              </StaggerItem>
              <StaggerItem>
                <Code className="mt-8 max-w-xl" title="Install">{INSTALL_CMD}</Code>
              </StaggerItem>
            </Stagger>

            <FadeIn inView={false} direction="left" delay={0.25} distance={28}>
              <div className="rounded-md border border-border bg-card/90 bg-panel p-5 shadow-panel backdrop-blur">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-eyebrow text-xs!">Try it live</p>
                  <ModePicker />
                </div>
                <ThemeStrip />
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["Revenue", "$45,231", "+20.1%", "success"],
                    ["Refund rate", "1.8%", "-0.4%", "destructive"],
                  ].map(([l, v, d, variant]) => (
                    <Pressable key={l} hoverScale={1.03}>
                      <Card size="sm">
                        <CardHeader>
                          <CardDescription>{l}</CardDescription>
                          <CardTitle className="text-xl group-data-[size=sm]/card:text-xl">{v}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge variant={variant as "success" | "destructive"}>{d}</Badge>
                        </CardContent>
                      </Card>
                    </Pressable>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <Progress value={68} aria-label="Progress" />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="secondary">Secondary</Button>
                    <Button size="sm" variant="cta">CTA</Button>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ----------------------------- Stats ----------------------------- */}
        <section className="border-y border-border bg-card/50">
          <Stagger className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-4 py-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <p className="text-4xl font-bold text-heading tabular-nums">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* --------------------------- Features --------------------------- */}
        <Section eyebrow="Why Malam" title="Everything a product UI needs" intro="Start with solid primitives, then reach for animation, charts and richer inputs when you need them.">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <Pressable className="h-full" hoverScale={1.015} lift={3}>
                  <Card className="h-full">
                    <CardHeader>
                      <f.icon className="mb-2 size-6 text-link" />
                      <CardTitle>{f.title}</CardTitle>
                      <CardDescription>{f.body}</CardDescription>
                    </CardHeader>
                  </Card>
                </Pressable>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ------------------------ Themes and status ------------------------ */}
        <Section
          eyebrow="Make it yours"
          title="Themes, light mode and honest status colors"
          intro="Pick an accent, flip to light, or build your own with two color pickers. Status colors stay semantic in every theme."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <FadeIn direction="right">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Eight themes, three modes</CardTitle>
                  <CardDescription>Everything on this page re-themes instantly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ThemeStrip />
                  <ModePicker />
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Default</Button>
                    <Button size="sm" variant="cta">CTA</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                    <Button size="sm" variant="ghost">Ghost</Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn direction="left">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Status colors</CardTitle>
                  <CardDescription>The same in every theme and both modes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  <Alert variant="success">
                    <CircleCheckIcon />
                    <AlertTitle>Deployment succeeded</AlertTitle>
                    <AlertDescription>Live in 14 seconds.</AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <TriangleAlertIcon />
                    <AlertTitle>Approaching your limit</AlertTitle>
                    <AlertDescription>82% of monthly bandwidth used.</AlertDescription>
                  </Alert>
                  <Alert variant="info">
                    <InfoIcon />
                    <AlertTitle>New version available</AlertTitle>
                    <AlertDescription>Refresh to update.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <OctagonXIcon />
                    <AlertTitle>Build failed</AlertTitle>
                    <AlertDescription>Check the logs for details.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </Section>

        {/* ------------------------------ Charts ------------------------------ */}
        <Section eyebrow="Charts" title="Twelve chart samples, one theme" intro="Area, line, bar, pie, radar, radial, scatter and more, all colored by your theme.">
          <div className="space-y-4">
            <FadeIn>
              <SparklineDemo />
            </FadeIn>
            <FadeIn>
              <InteractiveAreaChartDemo />
            </FadeIn>
            <p className="text-sm text-muted-foreground">
              <a className="text-link hover:underline" href="#/components/chart-area">See all chart types</a>
            </p>
          </div>
        </Section>

        {/* ------------------------------ Extended ------------------------------ */}
        <Section
          eyebrow="Extended"
          title="Beyond shadcn"
          intro="Upload, search, browse and write. Each one adds only its own library to your project."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <FadeIn direction="right">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Image slider <Badge variant="outline">Swiper</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageSlider images={sampleSlides} fade loop autoplay={3200} />
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn direction="left" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Dynamic select <Badge variant="outline">react-select</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DynamicSelect isMulti options={tagOptions} defaultValue={tagOptions.slice(0, 2)} placeholder="Choose genres…" aria-label="Genres" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    File upload <Badge variant="outline">react-dropzone</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload accept={{ "image/*": [] }} maxFiles={3} title="Drop images here" />
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          <Stagger className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {extended.map((e) => (
              <StaggerItem key={e.id}>
                <Pressable>
                  <a
                    href={`#/components/${e.id}`}
                    className="flex items-center gap-3 rounded-sm border border-border bg-card p-3 transition-colors hover:border-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <e.icon className="size-5 shrink-0 text-link" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-heading">{e.name}</span>
                      <span className="block text-xs text-muted-foreground">{e.lib}</span>
                    </span>
                  </a>
                </Pressable>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ------------------------------- Demos ------------------------------- */}
        <Section eyebrow="Demos" title="Five complete interfaces" intro="See Malam used end to end, from a dashboard to a game HUD.">
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {demoCards.map((d) => (
              <StaggerItem key={d.href}>
                <Pressable className="h-full">
                  <a
                    href={d.href}
                    className="group flex h-full flex-col rounded-sm border border-border bg-card bg-panel p-4 transition-colors hover:border-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <d.icon className="mb-3 size-6 text-link" />
                    <span className="flex items-center gap-1.5 font-semibold text-heading">
                      {d.title} <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="mt-1 text-sm text-muted-foreground">{d.body}</span>
                  </a>
                </Pressable>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* -------------------------------- AI -------------------------------- */}
        <Section eyebrow="Agentic AI" title="Teach your coding agent Malam" intro="Install the skill once and agents build on-brand UI with the right tokens, components and checks.">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <FadeIn direction="right" className="space-y-3">
              {[
                "Build a settings page with a Field form and a status Alert.",
                "Add a revenue area chart to the dashboard using the chart tokens.",
                "Swap the product gallery for an ImageSlider with thumbnails.",
              ].map((p) => (
                <div key={p} className="flex items-start gap-3 rounded-sm border border-border bg-card p-3 text-sm">
                  <BotIcon className="mt-0.5 size-4 shrink-0 text-link" />
                  {p}
                </div>
              ))}
              <Button variant="secondary" render={<a href="#/skill" />}>
                Use with AI <ArrowRightIcon />
              </Button>
            </FadeIn>
            <FadeIn direction="left">
              <Code title=".claude/skills/malam-ui/SKILL.md">{`---
name: malam-ui
description: Build UI in the Malam design system…
---

1. Use tokens, never raw hex.
2. One primary CTA per region.
3. Status colors are semantic: success, warning, info.
4. Before you finish: check 390px, focus rings, light mode.`}</Code>
            </FadeIn>
          </div>
        </Section>

        {/* ------------------------------ Install ------------------------------ */}
        <Section eyebrow="Get started" title="Three steps">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {[
              ["1. Register", "Add the registry to components.json once.", `"registries": {\n  "@malam": "https://raw.githubusercontent.com/\n    dorisd00m/malamui/main/public/r/{name}.json"\n}`],
              ["2. Install", "Everything, or just what you need.", `${INSTALL_CMD}\n\nnpx shadcn@latest add @malam/button`],
              ["3. Wrap and build", "Add the provider once.", `<ThemeProvider>\n  <App />\n</ThemeProvider>`],
            ].map(([t, d, c]) => (
              <StaggerItem key={t}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t}</CardTitle>
                    <CardDescription>{d}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code>{c}</Code>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* -------------------------------- CTA -------------------------------- */}
        <FadeIn className="mx-auto mb-4 max-w-[1200px] px-4">
          <div className="rounded-md bg-promo px-6 py-14 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Build something that looks good at night</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Read the docs, try the components, or explore the demos.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button variant="cta" size="lg" render={<a href="#/docs" />}>
                Read the docs <ArrowRightIcon />
              </Button>
              <Button variant="secondary" size="lg" render={<a href="#/components/all" />}>
                All components
              </Button>
            </div>
          </div>
        </FadeIn>
      </main>
    </Page>
  )
}
