import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoIcon } from "lucide-react"
import { DEFAULT_THEMES } from "@/components/malam"
import { Code, Page, Prose } from "./shell"
import { FONT_OPTIONS, FontPicker } from "./font-picker"
import { COMPONENTS_JSON_SNIPPET, INSTALL_CMD, REPO_URL } from "./config"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Basic usage" },
  { id: "theming", title: "Theming" },
  { id: "color-mode", title: "Light and dark mode" },
  { id: "custom-theme", title: "Create a theme" },
  { id: "fonts", title: "Fonts" },
  { id: "tokens", title: "Design tokens" },
  { id: "store-components", title: "Store components" },
  { id: "registry", title: "Publishing updates" },
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="border-b border-border pb-2 text-2xl font-semibold">{title}</h2>
      <Prose>{children}</Prose>
    </section>
  )
}

export function Docs() {
  const [active, setActive] = React.useState(sections[0].id)

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -65% 0px" }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <Page route="docs">
      <div className="mx-auto flex max-w-[1200px] gap-10 px-4 py-8">
        <aside className="sticky top-[4.5rem] hidden h-fit w-52 shrink-0 lg:block">
          <p className="mb-2 text-eyebrow text-xs! text-muted-foreground!">On this page</p>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={
                "block border-l-2 py-1 pl-3 text-sm hover:text-heading " +
                (active === s.id ? "border-link text-heading" : "border-transparent text-muted-foreground")
              }
            >
              {s.title}
            </a>
          ))}
        </aside>

        <main className="min-w-0 flex-1 space-y-12">
          <div>
            <h1 className="text-4xl font-bold">Documentation</h1>
            <p className="mt-2 text-lg text-muted-foreground">Everything you need to install, theme and extend Malam UI.</p>
          </div>

          <Section id="introduction" title="Introduction">
            <p>
              Malam UI is a dark design system for <strong>Tailwind CSS v4</strong> and <strong>shadcn/ui</strong> (the
              Base UI flavour, style <code>base-nova</code>). It is distributed as a shadcn registry item, so components are
              copied into your project and you own the code.
            </p>
            <p>It contains three layers:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><code>styles/malam.css</code>: tokens, themes, gradients and utilities.</li>
              <li><code>components/ui</code>: the full shadcn component set, restyled.</li>
              <li><code>components/malam</code>: store components (PriceTag, ProductCapsule, FeaturedHero, …) and the theme provider.</li>
            </ul>
          </Section>

          <Section id="installation" title="Installation">
            <p>Your project needs Tailwind v4 and an initialised shadcn setup.</p>
            <Code title="1. Initialise shadcn (skip if done)">{`npx shadcn@latest init`}</Code>
            <p>
              Malam is published from a public GitHub repository (<a className="text-link hover:underline" href={REPO_URL} target="_blank" rel="noreferrer">dorisd00m/malamui</a>).
              Register it once in <code>components.json</code>, then install anything by name.
            </p>
            <Code title="2a. Register the registry in components.json">{COMPONENTS_JSON_SNIPPET}</Code>
            <Code title="2b. Install everything">{INSTALL_CMD}</Code>
            <Code title="…or just the components you need">{`npx shadcn@latest add @malam/button @malam/card @malam/dialog`}</Code>
            <Code title="Extended components (each adds a third-party library)">{`npx shadcn@latest add @malam/file-upload      # react-dropzone
npx shadcn@latest add @malam/dynamic-select   # react-select
npx shadcn@latest add @malam/image-slider     # swiper
npx shadcn@latest add @malam/rich-text-editor # editor.js
npx shadcn@latest add @malam/icon             # iconify
npx shadcn@latest add @malam/motion           # framer-motion
npx shadcn@latest add @malam/malam-extended   # all six`}</Code>
            <p>
              <code>-o</code> overwrites the default shadcn primitives with the Malam versions. Every component pulls in the Malam theme
              and its npm packages automatically.
            </p>
            <Alert>
              <InfoIcon />
              <AlertTitle>Prefer a single URL?</AlertTitle>
              <AlertDescription>
                You can also install the whole bundle without registering anything:{" "}
                <code className="break-all">npx shadcn@latest add https://raw.githubusercontent.com/dorisd00m/malamui/main/public/r/malam-ui.json</code>. The{" "}
                <code>@malam/…</code> form is needed for installing individual components.
              </AlertDescription>
            </Alert>
            <Code title="3. src/index.css">{`@import "./styles/malam.css";`}</Code>
            <Code title="4. index.html">{`<html lang="en" class="dark">`}</Code>
            <Alert>
              <InfoIcon />
              <AlertTitle>Dark by default, light on demand</AlertTitle>
              <AlertDescription>
                <code>:root</code> is the dark theme, and <code>ThemeProvider</code> adds light mode (see Light and dark mode below).
                The <code>.dark</code> class is kept in sync so shadcn <code>dark:</code> variants still resolve.
              </AlertDescription>
            </Alert>
          </Section>

          <Section id="usage" title="Basic usage">
            <p>Wrap your app once with the providers, then import components as usual.</p>
            <Code title="main.tsx">{`import { ThemeProvider } from "@/components/malam"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="crimson">
    <TooltipProvider>
      <App />
      <Toaster />
    </TooltipProvider>
  </ThemeProvider>
)`}</Code>
            <Code title="Anywhere">{`import { Button } from "@/components/ui/button"
import { PriceTag, ProductCapsule } from "@/components/malam"

<ProductCapsule title="Lantern Hollow" price={14.99} originalPrice={24.99} />
<Button variant="cta">Add to cart</Button>`}</Code>
          </Section>

          <Section id="theming" title="Theming">
            <p>
              A theme is an accent palette selected by <code>data-theme</code> on any element. Put it on <code>&lt;html&gt;</code> to
              theme the whole app, or on a wrapper to theme only a subtree. Surfaces and text stay identical across themes.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Theme</TableHead>
                  <TableHead>data-theme</TableHead>
                  <TableHead>Palette</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEFAULT_THEMES.map((t) => (
                  <TableRow key={t.name}>
                    <TableCell>{t.label}</TableCell>
                    <TableCell><code>{t.name}</code></TableCell>
                    <TableCell>
                      <span className="flex w-fit overflow-hidden rounded-xs">
                        {t.swatches.map((c, i) => (
                          <span key={i} className="h-4 w-6" style={{ background: c }} />
                        ))}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Code title="Switching at runtime">{`import { ThemeSwitcher, useTheme } from "@/components/malam"

<ThemeSwitcher />                    // dropdown
<ThemeSwitcher variant="inline" />   // swatch buttons for settings pages

const { theme, setTheme, themes } = useTheme()
setTheme("ocean")`}</Code>
            <p>The choice is stored in <code>localStorage</code> under <code>malam-theme</code>. Pass <code>storageKey=&#123;null&#125;</code> to disable that.</p>
          </Section>

          <Section id="color-mode" title="Light and dark mode">
            <p>
              Color mode is separate from the accent theme, so every theme works in both. <code>ThemeProvider</code> writes{" "}
              <code>data-mode="light" | "dark"</code> and the <code>dark</code> class on <code>&lt;html&gt;</code>, and remembers the choice.
            </p>
            <Code title="Switching">{`import { ModeToggle, useTheme } from "@/components/malam"

<ModeToggle />   // dropdown: Light, Dark, System

const { mode, setMode, resolvedMode } = useTheme()
setMode("light")            // "light" | "dark" | "system"`}</Code>
            <Code title="Default mode and no-flash script">{`<ThemeProvider defaultMode="system">…</ThemeProvider>

<!-- index.html, before your app script: apply the saved mode before first paint -->
<script>
  try {
    var m = localStorage.getItem("malam-theme-mode") || "dark";
    if (m === "system") m = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.mode = m;
    document.documentElement.classList.toggle("dark", m === "dark");
  } catch (e) {}
</script>`}</Code>
            <p>
              Need a region that stays dark in light mode (a game scene, a video player)? Give it <code>className="dark"</code> and the
              current <code>data-theme</code>.
            </p>
          </Section>

          <Section id="custom-theme" title="Create a theme">
            <p>Add a block to your CSS that sets the accent variables, then register it with the provider.</p>
            <Code title="malam.css">{`[data-theme="mint"] {
  --primary: #3ddc97;
  --primary-from: #6ff0b6;
  --primary-to: #1fa86f;
  --link: #9af2cc;
  --ring: #9af2cc;
  --secondary: rgb(61 220 151 / 0.2);
  --secondary-foreground: #9af2cc;
  --secondary-from: #2a7a58;
  --secondary-to: #9af2cc;
  --nav-tint: 40 110 85;

  --cta: #d9731a;           /* second accent: buy / install */
  --cta-from: #f48c25;
  --cta-to: #c25a0c;
  --cta-foreground: #fff0dd;
  --sale: #6e3a0c;              /* discounts only */
  --sale-foreground: #ffb347;
  --review-positive: #9af2cc;
  --live: #ff3b42;
  --chart-1: #3ddc97;
  --chart-2: #9af2cc;
  --chart-4: #ffb347;
}`}</Code>
            <Code title="Register">{`import { DEFAULT_THEMES, ThemeProvider } from "@/components/malam"

const themes = [
  ...DEFAULT_THEMES,
  { name: "mint", label: "Mint", swatches: ["#3ddc97", "#d9731a", "#121214"] },
]

<ThemeProvider themes={themes} defaultTheme="mint">…</ThemeProvider>`}</Code>
            <p>
              Gradients and glows are derived from these variables on every themed element, so nested{" "}
              <code>data-theme</code> wrappers work without extra CSS. The toolbar color pickers on this site apply the same variables inline.
            </p>
          </Section>

          <Section id="fonts" title="Fonts">
            <p>
              Malam uses <strong>Figtree</strong>, a Google Font released under the SIL Open Font License, so it is free for personal and
              commercial projects. It is self-hosted through <code>@fontsource-variable/figtree</code> (no request to Google at runtime). No
              commercial typeface is bundled, and you should not add one unless you hold a license that covers web use.
            </p>
            <p>
              The font lives in a single variable, <code>--malam-font-sans</code>, which every component reads through Tailwind's{" "}
              <code>font-sans</code>. Change that one variable and the whole UI follows. Try it here (it re-fonts this very page):
            </p>
            <FontPicker />

            <h3 className="pt-2 text-lg font-semibold">Switch the font with Fontsource (recommended)</h3>
            <Code title="1. Install a variable font">{`npm install @fontsource-variable/albert-sans`}</Code>
            <Code title="2. src/index.css: import it and override the variable">{`@import "./styles/malam.css";
@import "@fontsource-variable/albert-sans";

:root {
  --malam-font-sans: "Albert Sans Variable", ui-sans-serif, system-ui, sans-serif;
}`}</Code>
            <p>
              Fontsource names variable fonts <code>"&lt;Name&gt; Variable"</code>. You can remove the <code>@import</code> of Figtree from your
              stylesheet once you no longer use it, and uninstall <code>@fontsource-variable/figtree</code>.
            </p>

            <h3 className="pt-2 text-lg font-semibold">Or load it from Google Fonts</h3>
            <Code title="index.html">{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400..700&display=swap" rel="stylesheet" />`}</Code>
            <Code title="CSS">{`:root {
  --malam-font-sans: "Albert Sans", ui-sans-serif, system-ui, sans-serif;
}`}</Code>
            <p>
              The CDN is quicker to set up, but visitors' browsers contact Google. Self-hosting with Fontsource avoids that and works offline.
            </p>

            <h3 className="pt-2 text-lg font-semibold">Your own font files</h3>
            <Code title="CSS">{`@font-face {
  font-family: "My Sans";
  src: url("/fonts/my-sans.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}

:root {
  --malam-font-sans: "My Sans", ui-sans-serif, system-ui, sans-serif;
}`}</Code>

            <h3 className="pt-2 text-lg font-semibold">More ways to use it</h3>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>
                <strong>One area only:</strong> variables inherit, so set it on a wrapper:{" "}
                <code>{`<div style={{ "--malam-font-sans": '"Inter Variable", sans-serif' }}>…</div>`}</code>.
              </li>
              <li>
                <strong>Monospace:</strong> override <code>--malam-font-mono</code> the same way (used by code blocks, kbd and the editor).
              </li>
              <li>
                <strong>Headings:</strong> <code>--font-heading</code> follows the sans font by default. Point it at another family if you
                want a display face.
              </li>
              <li>
                <strong>Performance:</strong> variable fonts need one file for every weight. Only the language subsets your pages use are
                downloaded.
              </li>
            </ul>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Font</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>License</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FONT_OPTIONS.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.name}</TableCell>
                    <TableCell><code>@fontsource-variable/{f.id}</code></TableCell>
                    <TableCell>SIL OFL 1.1</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          <Section id="tokens" title="Design tokens">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Tailwind</TableHead>
                  <TableHead>Use for</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Page", "bg-background", "App background"],
                  ["Panel", "bg-card bg-panel", "Section containers"],
                  ["Title text", "text-heading", "Titles, product names"],
                  ["Body text", "text-foreground", "Default copy"],
                  ["Meta text", "text-muted-foreground", "Captions, tags"],
                  ["Link / info", "text-link", "Links, active nav"],
                  ["Primary CTA", "bg-primary-gradient", "One per region"],
                  ["Buy / install", "variant=\"cta\"", "Purchase actions only (themed)"],
                  ["Discount", "bg-sale text-sale-foreground", "Discounts only"],
                ].map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell>{a}</TableCell>
                    <TableCell><code>{b}</code></TableCell>
                    <TableCell>{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p>Use tokens instead of raw hex. That is what keeps every theme consistent.</p>
            <h3 className="pt-2 text-lg font-semibold">Status colors</h3>
            <p>
              Status colors do not change with the accent theme: success is always green, warning amber, info blue and destructive red. They
              are separate from <code>cta</code>, the theme's second accent used for buy and install actions.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  [
                    ["Success", "bg-success · text-success-text", "success"],
                    ["Warning", "bg-warning · text-warning-text", "warning"],
                    ["Info", "bg-info · text-info-text", "info"],
                    ["Destructive", "bg-destructive · text-destructive-text", "destructive"],
                  ] as const
                ).map(([name, tokens, v]) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell><code>{tokens}</code></TableCell>
                    <TableCell>
                      <Badge variant={v}>{name}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          <Section id="store-components" title="Store components">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["PriceTag", "Price with optional discount chip; price 0 renders “Free to Play”"],
                  ["ProductCapsule", "Grid tile with art, price, cart and wishlist actions"],
                  ["FeaturedHero", "Carousel hero with thumbnails and a reason strip"],
                  ["ReviewSummary", "Sentiment label with review count"],
                  ["SectionHeader", "Uppercase section title with optional action"],
                  ["CoverArt", "Placeholder or real artwork at a fixed ratio"],
                  ["PromoBanner", "Wide promotional strip"],
                  ["StoreHeader / StoreNav", "Global header and gradient nav bar"],
                  ["ThemeProvider / ThemeSwitcher", "Runtime theming"],
                ].map(([a, b]) => (
                  <TableRow key={a}>
                    <TableCell><code>{a}</code></TableCell>
                    <TableCell>{b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p>See the <a className="text-link hover:underline" href="#/demo">sample dashboard</a> for them in context.</p>
          </Section>

          <Section id="registry" title="Publishing updates">
            <p>After changing components or the theme, rebuild the registry.</p>
            <Code title="Terminal">{`npx shadcn@latest build     # → public/r/malam-ui.json
git add public/r && git commit -m "Update registry" && git push`}</Code>
            <p>Commit the generated <code>public/r/malam-ui.json</code> and push to <code>main</code>. Collaborators pick up the new version the next time they run the install command.</p>
          </Section>
        </main>
      </div>
    </Page>
  )
}
