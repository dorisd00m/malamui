/**
 * Builds the "Usage" code shown for each component by reading the real demo
 * source files (so the docs can never drift from what the preview renders).
 */
import formsSrc from "./demos-forms.tsx?raw"
import overlaySrc from "./demos-overlay.tsx?raw"
import displaySrc from "./demos-display.tsx?raw"

const uiFiles = import.meta.glob("../components/ui/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<
  string,
  string
>

const demoSources = [formsSrc, overlaySrc, displaySrc]

type ImportStmt = { names: string[]; from: string; namespace?: string }

function parseImports(src: string): ImportStmt[] {
  const out: ImportStmt[] = []
  const re = /import\s+(?:type\s+)?([\s\S]*?)\s+from\s+"([^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    const clause = m[1].trim()
    const from = m[2]
    if (clause.startsWith("* as ")) {
      out.push({ names: [], from, namespace: clause.slice(5).trim() })
    } else {
      const inner = clause.replace(/^\{|\}$/g, "")
      out.push({
        names: inner
          .split(",")
          .map((s) => s.trim().replace(/^type\s+/, ""))
          .filter(Boolean),
        from,
      })
    }
  }
  return out
}

function formatImport(names: string[], from: string): string {
  const one = `import { ${names.join(", ")} } from "${from}"`
  if (one.length <= 80) return one
  return `import {\n${names.map((n) => `  ${n},`).join("\n")}\n} from "${from}"`
}

/** Source of `export function <name>() {...}` plus only the imports it uses. */
export function exampleFor(fn: string): string {
  for (const src of demoSources) {
    const start = src.indexOf(`export function ${fn}(`)
    if (start < 0) continue
    const rest = src.slice(start)
    const next = rest.indexOf("\nexport ", 10)
    const body = (next < 0 ? rest : rest.slice(0, next)).trim().replace(/^export /, "")

    const uses = (name: string) => new RegExp(`\\b${name}\\b`).test(body.replace(/^function \w+/, ""))
    const lines: string[] = []
    for (const imp of parseImports(src)) {
      if (imp.namespace) {
        if (uses(imp.namespace)) lines.push(`import * as ${imp.namespace} from "${imp.from}"`)
        continue
      }
      const used = imp.names.filter(uses)
      if (used.length) lines.push(formatImport(used, imp.from))
    }
    return `${lines.join("\n")}\n\n${body.replace(/function \w+\(/, "export function Example(")}`
  }
  return ""
}

/** Exported component names of src/components/ui/<file>.tsx. */
export function exportsOf(file: string): string[] {
  const src = uiFiles[`../components/ui/${file}.tsx`]
  if (!src) return []
  const names = new Set<string>()
  const block = /export\s*\{([^}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = block.exec(src))) {
    for (const raw of m[1].split(",")) {
      const n = raw.trim()
      if (n && !n.startsWith("type ") && /^[A-Z]/.test(n)) names.add(n)
    }
  }
  const direct = /export\s+(?:function|const)\s+([A-Z]\w*)/g
  while ((m = direct.exec(src))) names.add(m[1])
  return [...names]
}

export function importStatement(file: string): string {
  const names = exportsOf(file)
  return names.length ? formatImport(names, `@/components/ui/${file}`) : ""
}

/** npm packages and other Malam components imported by src/components/ui/<file>.tsx. */
export function depsOf(file: string): { npm: string[]; malam: string[] } {
  const src = uiFiles[`../components/ui/${file}.tsx`] ?? ""
  const npm = new Set<string>()
  const malam = new Set<string>()
  for (const imp of parseImports(src)) {
    const ui = imp.from.match(/^@\/components\/ui\/(.+)$/)
    if (ui) {
      if (ui[1] !== file) malam.add(ui[1])
    } else if (!imp.from.startsWith("@/") && !imp.from.startsWith(".")) {
      const parts = imp.from.split("/")
      const name = imp.from.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
      if (name !== "react" && name !== "react-dom") npm.add(name)
    }
  }
  return { npm: [...npm].sort(), malam: [...malam].sort() }
}
