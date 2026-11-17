import * as React from "react"
import {
  BugIcon,
  ChevronRightIcon,
  FileCodeIcon,
  FolderIcon,
  FolderOpenIcon,
  GitBranchIcon,
  MinusIcon,
  SearchIcon,
  SquareIcon,
  TerminalIcon,
  XIcon,
} from "lucide-react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type FileNode = { name: string; children?: FileNode[]; code?: string }

const tree: FileNode[] = [
  {
    name: "src",
    children: [
      {
        name: "App.tsx",
        code: `import { ThemeProvider } from "@/components/malam"
import { Dashboard } from "./Dashboard"

export default function App() {
  return (
    <ThemeProvider defaultTheme="ocean">
      <Dashboard />
    </ThemeProvider>
  )
}`,
      },
      {
        name: "Dashboard.tsx",
        code: `import { Card, CardTitle } from "@/components/ui/card"

export function Dashboard() {
  return (
    <Card>
      <CardTitle>Revenue</CardTitle>
      {/* charts go here */}
    </Card>
  )
}`,
      },
      { name: "index.css", code: `@import "./styles/malam.css";\n\nbody {\n  min-height: 100dvh;\n}` },
    ],
  },
  { name: "public", children: [{ name: "favicon.svg", code: `<svg viewBox="0 0 24 24">…</svg>` }] },
  { name: "package.json", code: `{\n  "name": "my-app",\n  "private": true,\n  "scripts": { "dev": "vite" }\n}` },
]

function flatten(nodes: FileNode[]): FileNode[] {
  return nodes.flatMap((n) => (n.children ? flatten(n.children) : [n]))
}

function Tree({ nodes, depth = 0, active, onOpen }: { nodes: FileNode[]; depth?: number; active: string; onOpen: (n: FileNode) => void }) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({ src: true })
  return (
    <ul>
      {nodes.map((n) => (
        <li key={n.name}>
          <button
            type="button"
            onClick={() => (n.children ? setOpen((o) => ({ ...o, [n.name]: !o[n.name] })) : onOpen(n))}
            style={{ paddingLeft: 8 + depth * 14 }}
            className={cn(
              "flex w-full items-center gap-1.5 py-1 pr-2 text-left text-[0.8125rem] text-muted-foreground hover:bg-accent hover:text-heading focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
              active === n.name && "bg-accent text-heading"
            )}
          >
            {n.children ? (
              <>
                <ChevronRightIcon className={cn("size-3.5 transition-transform", open[n.name] && "rotate-90")} />
                {open[n.name] ? <FolderOpenIcon className="size-4 text-link" /> : <FolderIcon className="size-4 text-link" />}
              </>
            ) : (
              <FileCodeIcon className="ml-3.5 size-4" />
            )}
            {n.name}
          </button>
          {n.children && open[n.name] && <Tree nodes={n.children} depth={depth + 1} active={active} onOpen={onOpen} />}
        </li>
      ))}
    </ul>
  )
}

export function DesktopDemo() {
  const files = flatten(tree)
  const [tabs, setTabs] = React.useState<FileNode[]>([files[0], files[1]])
  const [current, setCurrent] = React.useState(files[0].name)
  const [showTerminal, setShowTerminal] = React.useState(true)
  const file = tabs.find((t) => t.name === current) ?? tabs[0]

  const open = (n: FileNode) => {
    setTabs((t) => (t.some((x) => x.name === n.name) ? t : [...t, n]))
    setCurrent(n.name)
  }
  const close = (name: string) => {
    setTabs((t) => {
      const next = t.filter((x) => x.name !== name)
      if (name === current && next.length) setCurrent(next[next.length - 1].name)
      return next
    })
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background shadow-panel">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-header pl-2">
        <Menubar className="h-9 border-0 bg-transparent p-0 shadow-none">
          {[
            ["File", ["New File", "Open Folder…", "Save"]],
            ["Edit", ["Undo", "Redo", "Find"]],
            ["View", ["Explorer", "Terminal", "Command Palette"]],
            ["Help", ["Documentation", "About"]],
          ].map(([label, items]) => (
            <MenubarMenu key={label as string}>
              <MenubarTrigger className="px-2 text-[0.8125rem]">{label as string}</MenubarTrigger>
              <MenubarContent>
                {(items as string[]).map((i, idx) => (
                  <React.Fragment key={i}>
                    {idx === 2 && <MenubarSeparator />}
                    <MenubarItem>
                      {i}
                      {label === "File" && i === "Save" && <MenubarShortcut>Ctrl S</MenubarShortcut>}
                    </MenubarItem>
                  </React.Fragment>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
        <span className="mx-auto text-xs text-muted-foreground">{file?.name ?? "Welcome"} · Malam Studio</span>
        <div className="flex">
          {[MinusIcon, SquareIcon, XIcon].map((I, i) => (
            <span key={i} className={cn("grid h-9 w-11 place-items-center text-muted-foreground hover:bg-accent hover:text-heading", i === 2 && "hover:bg-destructive")} aria-hidden>
              <I className="size-3.5" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Activity bar */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border bg-header py-2">
          {[
            [FileCodeIcon, "Explorer", true],
            [SearchIcon, "Search", false],
            [GitBranchIcon, "Source control", false],
            [BugIcon, "Run and debug", false],
          ].map(([I, label, on]) => {
            const Icon = I as typeof FileCodeIcon
            return (
              <Tooltip key={label as string}>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label={label as string}
                      className={cn("grid size-10 place-items-center rounded-sm text-muted-foreground hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", on && "border-l-2 border-primary text-heading")}
                    />
                  }
                >
                  <Icon className="size-5" />
                </TooltipTrigger>
                <TooltipContent side="right">{label as string}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={22} minSize={14}>
            <div className="h-full bg-surface">
              <p className="px-3 py-2 text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">Explorer</p>
              <ScrollArea className="h-[calc(100%-2rem)]">
                <Tree nodes={tree} active={current} onOpen={open} />
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={78}>
            <div className="flex h-full flex-col">
              <div role="tablist" className="flex border-b border-border bg-surface">
                {tabs.map((t) => (
                  <div
                    key={t.name}
                    className={cn(
                      "group flex items-center gap-2 border-r border-border px-3 py-2 text-[0.8125rem] text-muted-foreground",
                      t.name === current && "border-t-2 border-t-primary bg-background text-heading"
                    )}
                  >
                    <button type="button" role="tab" aria-selected={t.name === current} onClick={() => setCurrent(t.name)} className="focus-visible:underline focus-visible:outline-none">
                      {t.name}
                    </button>
                    <button type="button" aria-label={`Close ${t.name}`} onClick={() => close(t.name)} className="rounded-xs p-0.5 opacity-60 hover:bg-accent hover:opacity-100">
                      <XIcon className="size-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-auto bg-background p-0 font-mono text-[0.8125rem] leading-6">
                {file ? (
                  file.code!.split("\n").map((line, i) => (
                    <div key={i} className="flex hover:bg-white/[0.03]">
                      <span className="w-12 shrink-0 pr-4 text-right text-muted-foreground/60 select-none">{i + 1}</span>
                      <code className="whitespace-pre text-foreground">{line || " "}</code>
                    </div>
                  ))
                ) : (
                  <p className="p-6 text-muted-foreground">Open a file from the explorer.</p>
                )}
              </div>

              {showTerminal && (
                <div className="h-36 border-t border-border bg-surface font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-border px-3 py-1.5 font-sans text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">
                    <span className="flex items-center gap-1.5"><TerminalIcon className="size-3.5" /> Terminal</span>
                    <button type="button" aria-label="Hide terminal" onClick={() => setShowTerminal(false)} className="rounded-xs p-0.5 hover:bg-accent hover:text-heading">
                      <XIcon className="size-3.5" />
                    </button>
                  </div>
                  <div className="space-y-0.5 p-3 text-foreground">
                    <p><span className="text-link">~/my-app</span> $ npm run dev</p>
                    <p className="text-muted-foreground">VITE ready in 359 ms</p>
                    <p>➜ Local: <span className="text-link underline">http://localhost:5173/</span></p>
                    <p className="animate-pulse">▍</p>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 bg-primary px-3 py-1 text-xs text-primary-foreground">
        <span className="flex items-center gap-1"><GitBranchIcon className="size-3" /> main</span>
        <span>0 errors, 0 warnings</span>
        <button type="button" onClick={() => setShowTerminal((s) => !s)} className="hover:underline">
          Terminal: {showTerminal ? "on" : "off"}
        </button>
        <span className="ml-auto">TypeScript React</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}
