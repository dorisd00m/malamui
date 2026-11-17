import * as React from "react"
import {
  CircleIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  HandIcon,
  LockIcon,
  MinusIcon,
  MousePointer2Icon,
  PlusIcon,
  SquareIcon,
  Trash2Icon,
  TypeIcon,
  UnlockIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Kind = "rect" | "ellipse" | "text"
type Shape = {
  id: number
  name: string
  kind: Kind
  x: number
  y: number
  w: number
  h: number
  fill: string
  opacity: number
  radius: number
  visible: boolean
  locked: boolean
}
type Tool = "select" | "rect" | "ellipse" | "text" | "hand"

const ART_W = 800
const ART_H = 520

const swatches = ["#f4f4f5", "#16161a", "var(--primary)", "var(--cta)", "var(--chart-4)", "var(--link)", "#8e8e96", "#ff5d5d"]

const initial: Shape[] = [
  { id: 1, name: "Sky", kind: "rect", x: 0, y: 0, w: ART_W, h: ART_H, fill: "#16161a", opacity: 100, radius: 0, visible: true, locked: true },
  { id: 2, name: "Moon", kind: "ellipse", x: 470, y: 70, w: 180, h: 180, fill: "#f4f4f5", opacity: 100, radius: 0, visible: true, locked: false },
  { id: 3, name: "Moon shade", kind: "ellipse", x: 520, y: 50, w: 170, h: 170, fill: "#16161a", opacity: 100, radius: 0, visible: true, locked: false },
  { id: 4, name: "Hill back", kind: "ellipse", x: -120, y: 360, w: 700, h: 360, fill: "var(--primary)", opacity: 45, radius: 0, visible: true, locked: false },
  { id: 5, name: "Hill front", kind: "ellipse", x: 260, y: 400, w: 700, h: 320, fill: "var(--cta)", opacity: 70, radius: 0, visible: true, locked: false },
  { id: 6, name: "Star", kind: "ellipse", x: 120, y: 90, w: 10, h: 10, fill: "#f4f4f5", opacity: 90, radius: 0, visible: true, locked: false },
  { id: 7, name: "Star 2", kind: "ellipse", x: 300, y: 150, w: 6, h: 6, fill: "#f4f4f5", opacity: 70, radius: 0, visible: true, locked: false },
  { id: 8, name: "Title", kind: "text", x: 70, y: 260, w: 330, h: 80, fill: "#f4f4f5", opacity: 100, radius: 0, visible: true, locked: false },
]

const menus: [string, [string, string?][]][] = [
  ["File", [["New artboard", "Ctrl N"], ["Open…", "Ctrl O"], ["Export PNG", "Ctrl E"]]],
  ["Edit", [["Undo", "Ctrl Z"], ["Redo", "Ctrl Y"], ["Duplicate", "Ctrl D"]]],
  ["View", [["Zoom in", "Ctrl +"], ["Zoom out", "Ctrl -"], ["Fit to screen", "Ctrl 0"]]],
  ["Help", [["Shortcuts"], ["About Malam Canvas"]]],
]

const tools: { id: Tool; label: string; key: string; icon: typeof SquareIcon }[] = [
  { id: "select", label: "Select", key: "V", icon: MousePointer2Icon },
  { id: "rect", label: "Rectangle", key: "R", icon: SquareIcon },
  { id: "ellipse", label: "Ellipse", key: "O", icon: CircleIcon },
  { id: "text", label: "Text", key: "T", icon: TypeIcon },
  { id: "hand", label: "Hand", key: "H", icon: HandIcon },
]

const num = (v: string, fallback: number) => (Number.isFinite(Number(v)) && v.trim() !== "" ? Number(v) : fallback)

export function DesktopDemo() {
  const [shapes, setShapes] = React.useState<Shape[]>(initial)
  const [selected, setSelected] = React.useState<number | null>(8)
  const [tool, setTool] = React.useState<Tool>("select")
  const [zoom, setZoom] = React.useState(100)
  const nextId = React.useRef(100)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const drag = React.useRef<{ id: number; dx: number; dy: number } | null>(null)

  const sel = shapes.find((s) => s.id === selected) ?? null
  const update = (id: number, patch: Partial<Shape>) => setShapes((all) => all.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const toArt = (e: React.PointerEvent) => {
    const svg = svgRef.current!
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    return { x: p.x, y: p.y }
  }

  const add = (kind: Kind, at?: { x: number; y: number }) => {
    const id = nextId.current++
    const w = kind === "text" ? 220 : 140
    const h = kind === "text" ? 56 : 140
    const shape: Shape = {
      id,
      name: kind === "rect" ? "Rectangle" : kind === "ellipse" ? "Ellipse" : "Text",
      kind,
      x: Math.round((at?.x ?? ART_W / 2) - w / 2),
      y: Math.round((at?.y ?? ART_H / 2) - h / 2),
      w,
      h,
      fill: kind === "text" ? "#f4f4f5" : "var(--chart-4)",
      opacity: 100,
      radius: kind === "rect" ? 12 : 0,
      visible: true,
      locked: false,
    }
    setShapes((all) => [...all, shape])
    setSelected(id)
    setTool("select")
  }

  const duplicate = () => {
    if (!sel) return
    const id = nextId.current++
    setShapes((all) => [...all, { ...sel, id, name: `${sel.name} copy`, x: sel.x + 20, y: sel.y + 20, locked: false }])
    setSelected(id)
  }
  const remove = () => {
    if (!sel || sel.locked) return
    setShapes((all) => all.filter((s) => s.id !== sel.id))
    setSelected(null)
  }

  const onShapeDown = (e: React.PointerEvent, s: Shape) => {
    if (tool !== "select") return
    e.stopPropagation()
    setSelected(s.id)
    if (s.locked) return
    const p = toArt(e)
    drag.current = { id: s.id, dx: p.x - s.x, dy: p.y - s.y }
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const p = toArt(e)
    update(drag.current.id, { x: Math.round(p.x - drag.current.dx), y: Math.round(p.y - drag.current.dy) })
  }
  const onCanvasDown = (e: React.PointerEvent) => {
    if (tool === "rect" || tool === "ellipse" || tool === "text") add(tool, toArt(e))
    else if (tool === "select") setSelected(null)
  }

  const cursor = tool === "select" ? "default" : tool === "hand" ? "grab" : "crosshair"

  return (
    <div className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-md border border-border bg-background shadow-panel">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-header pl-2">
        <Menubar className="h-9 border-0 bg-transparent p-0 shadow-none">
          {menus.map(([label, items]) => (
            <MenubarMenu key={label}>
              <MenubarTrigger className="px-2 text-[0.8125rem]">{label}</MenubarTrigger>
              <MenubarContent>
                {items.map(([name, shortcut], i) => (
                  <React.Fragment key={name}>
                    {i === items.length - 1 && i > 0 && <MenubarSeparator />}
                    <MenubarItem onClick={name === "Duplicate" ? duplicate : undefined}>
                      {name}
                      {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
                    </MenubarItem>
                  </React.Fragment>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
        <span className="mx-auto text-xs text-muted-foreground">night-poster.mlm · Malam Canvas</span>
        <div className="flex">
          {[MinusIcon, SquareIcon, XIcon].map((I, i) => (
            <span key={i} className={cn("grid h-9 w-11 place-items-center text-muted-foreground hover:bg-accent hover:text-heading", i === 2 && "hover:bg-destructive")} aria-hidden>
              <I className="size-3.5" />
            </span>
          ))}
        </div>
      </div>

      {/* Options bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
        <span>Tool: <span className="text-heading capitalize">{tool}</span></span>
        {sel && (
          <>
            <span className="h-4 w-px bg-border" />
            <span>
              {sel.name} · {Math.round(sel.w)}×{Math.round(sel.h)} at {Math.round(sel.x)}, {Math.round(sel.y)}
            </span>
          </>
        )}
        <span className="ml-auto hidden items-center gap-1 sm:flex">
          Drag to move <Kbd>V</Kbd> select <Kbd>R</Kbd> rectangle
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Toolbox */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border bg-header py-2">
          {tools.map((t) => (
            <Tooltip key={t.id}>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={t.label}
                    aria-pressed={tool === t.id}
                    onClick={() => setTool(t.id)}
                    className={cn(
                      "grid size-9 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      tool === t.id && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                  />
                }
              >
                <t.icon className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                {t.label} <Kbd className="ml-1">{t.key}</Kbd>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Canvas */}
        <div className="relative min-w-0 flex-1 overflow-auto bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:16px_16px] bg-surface p-6">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${ART_W} ${ART_H}`}
            width={(ART_W * zoom) / 100}
            height={(ART_H * zoom) / 100}
            className="mx-auto block max-w-none overflow-hidden rounded-xs shadow-[0_8px_30px_rgb(0_0_0/0.5)]"
            style={{ cursor }}
            onPointerDown={onCanvasDown}
            onPointerMove={onMove}
            onPointerUp={() => (drag.current = null)}
            role="img"
            aria-label="Artboard"
          >
            {shapes.map((s) =>
              !s.visible ? null : s.kind === "text" ? (
                <text
                  key={s.id}
                  x={s.x}
                  y={s.y + s.h * 0.75}
                  fontSize={s.h}
                  fontWeight={800}
                  letterSpacing="0.08em"
                  fill={s.fill}
                  opacity={s.opacity / 100}
                  style={{ fontFamily: "var(--font-sans)", userSelect: "none" }}
                  onPointerDown={(e) => onShapeDown(e, s)}
                >
                  {s.name === "Title" ? "MALAM" : "Text"}
                </text>
              ) : s.kind === "rect" ? (
                <rect key={s.id} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.radius} fill={s.fill} opacity={s.opacity / 100} onPointerDown={(e) => onShapeDown(e, s)} />
              ) : (
                <ellipse key={s.id} cx={s.x + s.w / 2} cy={s.y + s.h / 2} rx={s.w / 2} ry={s.h / 2} fill={s.fill} opacity={s.opacity / 100} onPointerDown={(e) => onShapeDown(e, s)} />
              )
            )}
            {sel && sel.visible && (
              <g pointerEvents="none">
                <rect x={sel.x} y={sel.y} width={sel.w} height={sel.h} fill="none" stroke="var(--primary)" strokeWidth={2 / (zoom / 100)} strokeDasharray={sel.locked ? "6 4" : undefined} />
                {!sel.locked &&
                  [
                    [sel.x, sel.y],
                    [sel.x + sel.w, sel.y],
                    [sel.x, sel.y + sel.h],
                    [sel.x + sel.w, sel.y + sel.h],
                  ].map(([cx, cy], i) => (
                    <rect key={i} x={cx - 4 / (zoom / 100)} y={cy - 4 / (zoom / 100)} width={8 / (zoom / 100)} height={8 / (zoom / 100)} fill="#fff" stroke="var(--primary)" strokeWidth={1.5 / (zoom / 100)} />
                  ))}
              </g>
            )}
          </svg>
        </div>

        {/* Right panel */}
        <aside className="hidden w-64 shrink-0 border-l border-border bg-header md:block">
          <Tabs defaultValue="properties" className="h-full">
            <TabsList variant="line" className="px-2">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <ScrollArea className="h-[calc(100%-2rem)]">
                {sel ? (
                  <div className="space-y-4 p-3 text-xs">
                    <label className="block space-y-1">
                      <span className="text-muted-foreground">Name</span>
                      <Input value={sel.name} onChange={(e) => update(sel.id, { name: e.target.value })} className="h-7" />
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["x", "y", "w", "h"] as const).map((k) => (
                        <label key={k} className="space-y-1">
                          <span className="text-muted-foreground uppercase">{k}</span>
                          <Input
                            type="number"
                            value={Math.round(sel[k])}
                            disabled={sel.locked}
                            onChange={(e) => update(sel.id, { [k]: num(e.target.value, sel[k]) })}
                            className="h-7"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <span className="text-muted-foreground">Fill</span>
                      <div className="flex flex-wrap gap-1.5">
                        {swatches.map((c) => (
                          <button
                            key={c}
                            type="button"
                            aria-label={`Fill ${c}`}
                            aria-pressed={sel.fill === c}
                            onClick={() => update(sel.id, { fill: c })}
                            style={{ background: c }}
                            className={cn("size-6 rounded-xs border border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", sel.fill === c && "ring-2 ring-heading")}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Opacity</span>
                        <span>{sel.opacity}%</span>
                      </div>
                      <Slider value={[sel.opacity]} onValueChange={(v) => update(sel.id, { opacity: Array.isArray(v) ? v[0] : v })} max={100} aria-label="Opacity" />
                    </div>
                    {sel.kind === "rect" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Corner radius</span>
                          <span>{sel.radius}</span>
                        </div>
                        <Slider value={[sel.radius]} onValueChange={(v) => update(sel.id, { radius: Array.isArray(v) ? v[0] : v })} max={100} aria-label="Corner radius" />
                      </div>
                    )}
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="secondary" onClick={duplicate} className="flex-1">
                        <CopyIcon /> Duplicate
                      </Button>
                      <Button size="sm" variant="destructive" onClick={remove} disabled={sel.locked} aria-label="Delete layer">
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="p-4 text-xs text-muted-foreground">Select a layer on the canvas to edit its properties.</p>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="layers">
              <ScrollArea className="h-[calc(100%-2rem)]">
                <ul className="p-1.5">
                  {[...shapes].reverse().map((s) => (
                    <li key={s.id}>
                      <div
                        className={cn(
                          "flex items-center gap-1 rounded-xs pr-1 text-[0.8125rem] text-muted-foreground hover:bg-accent",
                          selected === s.id && "bg-accent text-heading"
                        )}
                      >
                        <button type="button" onClick={() => setSelected(s.id)} className="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                          <span className="size-3.5 shrink-0 rounded-xs border border-border" style={{ background: s.fill }} aria-hidden />
                          <span className="truncate">{s.name}</span>
                        </button>
                        <button type="button" aria-label={s.visible ? `Hide ${s.name}` : `Show ${s.name}`} onClick={() => update(s.id, { visible: !s.visible })} className="rounded-xs p-1 hover:text-heading">
                          {s.visible ? <EyeIcon className="size-3.5" /> : <EyeOffIcon className="size-3.5" />}
                        </button>
                        <button type="button" aria-label={s.locked ? `Unlock ${s.name}` : `Lock ${s.name}`} onClick={() => update(s.id, { locked: !s.locked })} className="rounded-xs p-1 hover:text-heading">
                          {s.locked ? <LockIcon className="size-3.5" /> : <UnlockIcon className="size-3.5" />}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </aside>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 border-t border-border bg-header px-3 py-1.5 text-xs text-muted-foreground">
        <span>{ART_W} × {ART_H} px</span>
        <span>{shapes.length} layers</span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon-xs" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(25, z - 25))}>
            <MinusIcon />
          </Button>
          <Slider value={[zoom]} onValueChange={(v) => setZoom(Array.isArray(v) ? v[0] : v)} min={25} max={200} step={5} className="w-28" aria-label="Zoom" />
          <Button variant="ghost" size="icon-xs" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(200, z + 25))}>
            <PlusIcon />
          </Button>
          <span className="w-10 text-right tabular-nums">{zoom}%</span>
        </div>
      </div>
    </div>
  )
}
