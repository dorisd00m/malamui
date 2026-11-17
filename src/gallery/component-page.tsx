import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, LayoutGridIcon, SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Page, Prose } from "../site/shell"
import { REPO_URL } from "../site/config"
import { demoNames, entries, EXTENDED_GROUP, EXTENDED_LIBS, ExtendedDivider } from "./gallery"
import { docs } from "./docs-data"
import { depsOf, exampleFor, exportsOf, importStatement } from "./source"
import { examples, exampleNames, type ExampleDef } from "./examples"

function DepLink({ id }: { id: string }) {
  return entries.some((e) => e.id === id) ? (
    <a className="text-link hover:underline" href={`#/components/${id}`}>{id}</a>
  ) : (
    <span>{id}</span>
  )
}

function ComponentSidebar({ activeId }: { activeId?: string }) {
  const [q, setQ] = React.useState("")
  const filtered = entries.filter((e) => e.title.toLowerCase().includes(q.trim().toLowerCase()))
  const groups = [...new Set(filtered.map((e) => e.group))]
  return (
    <aside className="sticky top-[4.5rem] hidden h-[calc(100dvh-6rem)] w-56 shrink-0 lg:block">
      <div className="relative mb-3">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components" className="pl-8" aria-label="Search components" />
      </div>
      <ScrollArea className="h-[calc(100%-3rem)] pr-3">
        <a
          href="#/components/all"
          className="mb-4 flex items-center gap-2 rounded-xs px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-heading"
        >
          <LayoutGridIcon className="size-4" /> All components
        </a>
        {groups.map((g) => (
          <div key={g} className="mb-4">
            {g === EXTENDED_GROUP ? <ExtendedDivider compact /> : <p className="mb-1 text-eyebrow text-xs! text-muted-foreground!">{g}</p>}
            {filtered
              .filter((e) => e.group === g)
              .map((e) => (
                <a
                  key={e.id}
                  href={`#/components/${e.id}`}
                  aria-current={e.id === activeId ? "page" : undefined}
                  className={cn(
                    "block rounded-xs px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-heading",
                    e.id === activeId && "bg-accent text-heading"
                  )}
                >
                  {e.title}
                </a>
              ))}
          </div>
        ))}
      </ScrollArea>
    </aside>
  )
}

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

/** One example: a live preview and the exact source, side by side as tabs. */
function ExampleBlock({ ex }: { ex: ExampleDef }) {
  const Demo = ex.demo
  const code = React.useMemo(() => exampleFor(exampleNames.get(ex.demo) ?? ""), [ex.demo])
  return (
    <div id={`example-${slug(ex.title)}`} className="scroll-mt-24 space-y-2">
      <h3 className="text-base font-semibold text-heading">{ex.title}</h3>
      {ex.description && <p className="text-sm text-muted-foreground">{ex.description}</p>}
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <Tabs defaultValue="preview">
          <TabsList variant="line" className="px-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="flex min-h-32 items-center p-6">
              <div className="w-full">
                <Demo />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <Code className="rounded-none border-0">{code}</Code>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b border-border pb-2 text-xl font-semibold">
      {children}
    </h2>
  )
}

export function ComponentPage({ id }: { id: string }) {
  const index = entries.findIndex((e) => e.id === id)
  const entry = entries[index]

  if (!entry) {
    return (
      <Page route="components">
        <main className="mx-auto max-w-[900px] px-4 py-16">
          <h1 className="text-3xl font-bold">Component not found</h1>
          <p className="mt-2 text-muted-foreground">
            There is no component called “{id}”. <a className="text-link hover:underline" href="#/components/all">Browse all components</a>.
          </p>
        </main>
      </Page>
    )
  }

  const info = docs[id]
  const file = info?.file ?? id
  const Demo = entry.demo
  const prev = entries[index - 1]
  const next = entries[index + 1]
  const example = exampleFor(demoNames.get(entry.demo) ?? "")
  const imports = importStatement(file)
  const more = examples[id] ?? []
  const exports = exportsOf(file)
  const deps = depsOf(file)
  const installCmd = `npx shadcn@latest add @malam/${file}`

  return (
    <Page route="components">
      <div className="mx-auto flex max-w-[1400px] gap-8 px-4">
      <ComponentSidebar activeId={id} />
      <main className="min-w-0 max-w-[860px] flex-1 space-y-10 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="#/components/all" className="hover:text-heading">Components</a>
          <ChevronRightIcon className="size-3.5" />
          <span>{entry.group}</span>
          <ChevronRightIcon className="size-3.5" />
          <span className="text-heading">{entry.title}</span>
        </nav>

        <header>
          <h1 className="text-4xl font-bold">{entry.title}</h1>
          {info && <p className="mt-2 text-lg text-muted-foreground">{info.desc}</p>}
          {entry.group === EXTENDED_GROUP && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              <span className="rounded-xs bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground">Extra library</span>
              Not part of shadcn/ui. Installing it adds {deps.npm.join(", ") || EXTENDED_LIBS} to your project.
            </p>
          )}
        </header>

        <section className="space-y-3">
          <H2 id="preview">Preview</H2>
          <div className="overflow-hidden rounded-sm border border-border bg-card">
            <div className="flex min-h-40 items-center p-6">
              <div className="w-full">
                <Demo />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Change the theme in the toolbar to see this component in every palette.</p>
        </section>

        {more.length > 0 && (
          <section className="space-y-5">
            <H2 id="examples">Examples</H2>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {more.map((ex) => (
                <li key={ex.title}>
                  <a className="text-link hover:underline" href={`#example-${slug(ex.title)}`} onClick={(e) => { e.preventDefault(); document.getElementById(`example-${slug(ex.title)}`)?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>
                    {ex.title}
                  </a>
                </li>
              ))}
            </ul>
            {more.map((ex) => (
              <ExampleBlock key={ex.title} ex={ex} />
            ))}
          </section>
        )}

        <section className="space-y-3">
          <H2 id="installation">Installation</H2>
          <Tabs defaultValue="cli">
            <TabsList variant="line">
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli" className="space-y-3 pt-3">
              <Code title="Terminal">{installCmd}</Code>
              <Prose>
                <p>
                  This installs <code>{file}.tsx</code>, its npm packages
                  {deps.malam.length > 0 ? " and the other Malam components it needs" : ""}, plus the Malam theme. You need the registry
                  registered once: see{" "}
                  <a className="text-link hover:underline" href="#/docs">Documentation → Installation</a>.
                </p>
              </Prose>
            </TabsContent>
            <TabsContent value="manual" className="space-y-3 pt-3">
              <Prose>
                <ol className="list-decimal space-y-3 pl-5">
                  <li>Set up the Malam theme once: <code>npx shadcn@latest add @malam/malam-theme</code>.</li>
                  {deps.npm.length > 0 && (
                    <li>
                      Install the packages:
                      <Code className="mt-2" title="Terminal">{`npm install ${deps.npm.join(" ")}`}</Code>
                    </li>
                  )}
                  {deps.malam.length > 0 && (
                    <li>
                      Add the Malam components it imports:{" "}
                      {deps.malam.map((d, i) => (
                        <React.Fragment key={d}>
                          {i > 0 && ", "}
                          <DepLink id={d} />
                        </React.Fragment>
                      ))}
                      .
                    </li>
                  )}
                  <li>
                    Copy{" "}
                    <a className="text-link hover:underline" href={`${REPO_URL}/blob/main/src/components/ui/${file}.tsx`} target="_blank" rel="noreferrer">
                      <code>src/components/ui/{file}.tsx</code>
                    </a>{" "}
                    into your project and adjust the import paths if your aliases differ.
                  </li>
                </ol>
              </Prose>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-3">
          <H2 id="usage">Usage</H2>
          {imports && <Code title="Import">{imports}</Code>}
          {example && <Code title="Example">{example}</Code>}
        </section>

        {info?.notes && info.notes.length > 0 && (
          <section className="space-y-3">
            <H2 id="notes">Notes</H2>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground">
              {info.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-3">
          <H2 id="api">Exports</H2>
          <div className="flex flex-wrap gap-2">
            {exports.map((n) => (
              <Badge key={n} variant="outline" className="font-mono">{n}</Badge>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <H2 id="dependencies">Dependencies</H2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">npm packages</h3>
              {deps.npm.length ? (
                <ul className="space-y-1 font-mono text-[0.8125rem]">{deps.npm.map((d) => <li key={d}>{d}</li>)}</ul>
              ) : (
                <p className="text-sm text-muted-foreground">None beyond React.</p>
              )}
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Malam components</h3>
              {deps.malam.length ? (
                <ul className="space-y-1 text-[0.8125rem]">
                  {deps.malam.map((d) => (
                    <li key={d}><DepLink id={d} /></li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Standalone.</p>
              )}
            </div>
          </div>
        </section>

        <nav aria-label="Pagination" className="flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <a href={`#/components/${prev.id}`} className="group flex items-center gap-2 text-muted-foreground hover:text-heading">
              <ArrowLeftIcon className="size-4" />
              <span><span className="block text-xs">Previous</span>{prev.title}</span>
            </a>
          ) : <span />}
          {next ? (
            <a href={`#/components/${next.id}`} className="group flex items-center gap-2 text-right text-muted-foreground hover:text-heading">
              <span><span className="block text-xs">Next</span>{next.title}</span>
              <ArrowRightIcon className="size-4" />
            </a>
          ) : <span />}
        </nav>
      </main>
      </div>
    </Page>
  )
}
