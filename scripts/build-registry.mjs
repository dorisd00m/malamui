/**
 * Generates registry.json: one installable item per UI component, plus
 *   malam-theme   tokens, themes, utils (every component depends on it)
 *   malam-blocks  store blocks + ThemeProvider/ThemeSwitcher
 *   malam-ui      bundle of everything
 *
 * Dependencies are derived from each file's real imports, so they never drift.
 * Run: npm run registry   (= this script + `shadcn build`)
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => fs.readFileSync(path.join(root, p), "utf8")
const pkg = JSON.parse(read("package.json"))
const versions = { ...pkg.dependencies, ...pkg.devDependencies }

const NS = "@malam"
/** Components that depend on third-party libraries beyond shadcn/ui + Recharts. Kept out of the core bundle. */
const EXTENDED = ["file-upload", "dynamic-select", "image-slider", "rich-text-editor", "motion"]
const importsOf = (src) => [...src.matchAll(/(?:import|export)\s[^;]*?from\s+"([^"]+)"/g)].map((m) => m[1])

function npmName(spec) {
  if (spec.startsWith(".") || spec.startsWith("@/")) return null
  const parts = spec.split("/")
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}
const withVersion = (name) => (versions[name] ? `${name}@${versions[name]}` : name)
const SKIP = new Set(["react", "react-dom"])

function analyse(file) {
  const npm = new Set()
  const reg = new Set()
  for (const spec of importsOf(read(file))) {
    const ui = spec.match(/^@\/components\/ui\/(.+)$/)
    const hook = spec.match(/^@\/hooks\/(.+)$/)
    if (ui) reg.add(`${NS}/${ui[1]}`)
    else if (hook) reg.add(`${NS}/${hook[1]}`)
    else if (spec === "@/lib/utils") reg.add(`${NS}/malam-theme`)
    else {
      const n = npmName(spec)
      if (n && !SKIP.has(n)) npm.add(withVersion(n))
    }
  }
  return { dependencies: [...npm].sort(), registryDependencies: [...reg].sort() }
}

const titleCase = (s) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")

const uiFiles = fs.readdirSync(path.join(root, "src/components/ui")).filter((f) => f.endsWith(".tsx")).sort()
const hookFiles = fs.readdirSync(path.join(root, "src/hooks")).filter((f) => f === "use-mobile.ts")
const blockFiles = fs.readdirSync(path.join(root, "src/components/malam")).sort()

const items = []

items.push({
  name: "malam-theme",
  type: "registry:item",
  title: "Malam theme",
  description: "Design tokens, 8 color themes, gradients and the cn() helper. Every Malam component depends on this.",
  dependencies: ["cn", "class-variance-authority", "tw-animate-css", "shadcn", "@fontsource-variable/figtree"].map(withVersion),
  files: [
    { path: "src/index.css", type: "registry:file", target: "src/styles/malam.css" },
    { path: "src/lib/utils.ts", type: "registry:lib" },
  ],
})

for (const h of hookFiles) {
  const name = h.replace(/\.ts$/, "")
  items.push({
    name,
    type: "registry:hook",
    title: titleCase(name),
    ...analyse(`src/hooks/${h}`),
    files: [{ path: `src/hooks/${h}`, type: "registry:hook" }],
  })
}

for (const f of uiFiles) {
  const name = f.replace(/\.tsx$/, "")
  const a = analyse(`src/components/ui/${f}`)
  a.registryDependencies = [...new Set([`${NS}/malam-theme`, ...a.registryDependencies])].filter((d) => d !== `${NS}/${name}`).sort()
  items.push({
    name,
    type: "registry:ui",
    title: titleCase(name),
    ...a,
    files: [{ path: `src/components/ui/${f}`, type: "registry:ui" }],
  })
}

{
  const deps = new Set()
  const reg = new Set([`${NS}/malam-theme`])
  for (const f of blockFiles) {
    const a = analyse(`src/components/malam/${f}`)
    a.dependencies.forEach((d) => deps.add(d))
    a.registryDependencies.forEach((d) => reg.add(d))
  }
  items.push({
    name: "malam-blocks",
    type: "registry:item",
    title: "Malam blocks",
    description: "PriceTag, ProductCapsule, FeaturedHero, SectionHeader, StoreHeader, PromoBanner, ThemeProvider and ThemeSwitcher.",
    dependencies: [...deps].sort(),
    registryDependencies: [...reg].sort(),
    files: blockFiles.map((f) => ({ path: `src/components/malam/${f}`, type: "registry:component", target: `src/components/malam/${f}` })),
  })
}

items.push({
  name: "malam-ui",
  type: "registry:item",
  title: "Malam UI (everything)",
  description: "The core library: theme, every shadcn-based component and the Malam blocks. Components that need extra libraries are in malam-extended.",
  registryDependencies: [
    `${NS}/malam-theme`,
    `${NS}/malam-blocks`,
    ...uiFiles
      .map((f) => f.replace(/\.tsx$/, ""))
      .filter((n) => !EXTENDED.includes(n))
      .map((n) => `${NS}/${n}`),
  ],
})

items.push({
  name: "malam-extended",
  type: "registry:item",
  title: "Malam extended components",
  description:
    "File upload, dynamic select, image slider, rich text editor and motion. Adds react-dropzone, react-select, Swiper, Editor.js and Framer Motion to your project.",
  registryDependencies: [`${NS}/malam-theme`, ...EXTENDED.map((n) => `${NS}/${n}`)],
})

const out = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "malam-ui",
  homepage: "https://github.com/dorisd00m/malamui",
  items,
}
fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(out, null, 2) + "\n")
console.log(`registry.json: ${items.length} items (${uiFiles.length} components)`)
