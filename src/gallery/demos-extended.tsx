import * as React from "react"
import { Reorder } from "framer-motion"
import { GripVerticalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AsyncDynamicSelect, CreatableDynamicSelect, DynamicSelect, type SelectOption } from "@/components/ui/dynamic-select"
import { FileUpload } from "@/components/ui/file-upload"
import { ImageSlider, type SliderImage } from "@/components/ui/image-slider"
import { Label } from "@/components/ui/label"
import { AnimatePresence, Collapse, FadeIn, motion, Presence, Pressable, Stagger, StaggerItem } from "@/components/ui/motion"
import { RichTextEditor, type OutputData } from "@/components/ui/rich-text-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/* File upload (react-dropzone) ------------------------------------------------ */

export function FileUploadDemo() {
  // Fake upload: ramps progress over ~1.5s. File names containing "fail" are rejected to show the error state.
  const upload = React.useCallback(
    (file: File, onProgress: (p: number) => void) =>
      new Promise<void>((resolve, reject) => {
        let p = 0
        const t = setInterval(() => {
          p += 12 + Math.random() * 14
          if (p >= 100) {
            clearInterval(t)
            if (file.name.toLowerCase().includes("fail")) reject(new Error("Server rejected the file"))
            else {
              onProgress(100)
              resolve()
            }
          } else onProgress(p)
        }, 180)
      }),
    []
  )
  return (
    <FileUpload
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"], "application/pdf": [".pdf"] }}
      maxSize={2 * 1024 * 1024}
      maxFiles={5}
      upload={upload}
      className="max-w-xl"
    />
  )
}

/* Dynamic select (react-select) ------------------------------------------------- */

const cities: SelectOption[] = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Denpasar", "Makassar", "Semarang"].map((c) => ({
  value: c.toLowerCase(),
  label: c,
}))
const tags: SelectOption[] = ["Action", "Strategy", "Puzzle", "Racing", "Cozy", "Horror", "Co-op"].map((c) => ({ value: c.toLowerCase(), label: c }))
const grouped = [
  { label: "Frontend", options: [{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, { value: "svelte", label: "Svelte" }] },
  { label: "Backend", options: [{ value: "node", label: "Node.js" }, { value: "go", label: "Go" }, { value: "rust", label: "Rust" }] },
]
const users = ["Olivia Martin", "Jackson Lee", "Isabella Nguyen", "William Kim", "Sofia Davis", "Liam Chen", "Emma Wilson"]

export function DynamicSelectDemo() {
  const [created, setCreated] = React.useState<SelectOption[]>([{ value: "cozy", label: "Cozy" }])
  const loadUsers = (input: string) =>
    new Promise<SelectOption[]>((resolve) =>
      setTimeout(
        () => resolve(users.filter((u) => u.toLowerCase().includes(input.toLowerCase())).map((u) => ({ value: u, label: u }))),
        500
      )
    )
  const field = "space-y-1.5"
  return (
    <div className="grid w-full gap-5 sm:grid-cols-2">
      <div className={field}>
        <Label>Single, searchable</Label>
        <DynamicSelect options={cities} defaultValue={cities[0]} isClearable placeholder="Pick a city…" aria-label="City" />
      </div>
      <div className={field}>
        <Label>Multi select</Label>
        <DynamicSelect isMulti options={tags} defaultValue={[tags[0], tags[1]]} placeholder="Choose genres…" aria-label="Genres" />
      </div>
      <div className={field}>
        <Label>Async (type to search a server)</Label>
        <AsyncDynamicSelect cacheOptions defaultOptions loadOptions={loadUsers} isClearable placeholder="Search people…" aria-label="Person" />
      </div>
      <div className={field}>
        <Label>Creatable (type to add)</Label>
        <CreatableDynamicSelect
          isMulti
          options={[...tags, ...created.filter((c) => !tags.some((t) => t.value === c.value))]}
          onCreateOption={(label) => setCreated((c) => [...c, { value: label.toLowerCase(), label }])}
          placeholder="Add your own tags…"
          aria-label="Tags"
        />
      </div>
      <div className={field}>
        <Label>Grouped options</Label>
        <DynamicSelect options={grouped} placeholder="Pick a stack…" aria-label="Stack" />
      </div>
      <div className={field}>
        <Label>Disabled</Label>
        <DynamicSelect options={cities} isDisabled defaultValue={cities[2]} aria-label="Disabled" />
      </div>
    </div>
  )
}

/* Image slider (Swiper) ----------------------------------------------------------- */

const palette: [string, string][] = [
  ["#1a9fff", "#7346e8"],
  ["#2fbf71", "#12b8c9"],
  ["#f5a524", "#e0583f"],
  ["#f0507a", "#9b6bff"],
  ["#12b8c9", "#2a9df4"],
  ["#7346e8", "#e0479e"],
]
/** Generates a gradient "photo" as an SVG data URI so the demo needs no network. */
const placeholder = (i: number): SliderImage => {
  const [a, b] = palette[i % palette.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='1280' height='720' fill='url(#g)'/><circle cx='${280 + i * 120}' cy='220' r='${110 + (i % 3) * 30}' fill='white' fill-opacity='.18'/><circle cx='${900 - i * 60}' cy='480' r='${170 - (i % 2) * 40}' fill='black' fill-opacity='.16'/><path d='M0 640 Q320 ${520 - i * 10} 640 620 T1280 ${600 + i * 8} V720 H0Z' fill='black' fill-opacity='.28'/></svg>`
  return {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    alt: `Scene ${i + 1}`,
    title: ["Aurora ridge", "Emerald bay", "Amber dunes", "Rose canyon", "Glacier lake", "Violet dusk"][i % 6],
    description: "Placeholder artwork generated in the browser",
  }
}
const slides = Array.from({ length: 6 }, (_, i) => placeholder(i))

export function ImageSliderDemo() {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="basic">Autoplay</TabsTrigger>
        <TabsTrigger value="gallery">Gallery + thumbs</TabsTrigger>
        <TabsTrigger value="carousel">Carousel</TabsTrigger>
        <TabsTrigger value="fade">Fade</TabsTrigger>
      </TabsList>
      <TabsContent value="basic" className="pt-3">
        <ImageSlider images={slides} loop autoplay={3500} className="max-w-2xl" />
      </TabsContent>
      <TabsContent value="gallery" className="pt-3">
        <ImageSlider images={slides} thumbs pagination={false} className="max-w-2xl" />
      </TabsContent>
      <TabsContent value="carousel" className="pt-3">
        <ImageSlider images={slides} slidesPerView={3} spaceBetween={12} aspect="4 / 3" pagination={false} />
      </TabsContent>
      <TabsContent value="fade" className="pt-3">
        <ImageSlider images={slides} fade loop autoplay={3000} navigation={false} className="max-w-2xl" />
      </TabsContent>
    </Tabs>
  )
}

/* Rich text editor (Editor.js) -------------------------------------------------------- */

const initialDoc: OutputData = {
  blocks: [
    { type: "header", data: { text: "Release notes", level: 2 } },
    { type: "paragraph", data: { text: "Select some text and use the top bar to change the <b>font</b>, size, color or alignment. Press <code class=\"inline-code\">/</code> on an empty line to add blocks." } },
    { type: "list", data: { style: "unordered", items: [{ content: "Faster startup", items: [] }, { content: "New theme engine", items: [] }, { content: "Light mode", items: [] }] } },
    { type: "quote", data: { text: "Good design is as little design as possible.", caption: "Dieter Rams", alignment: "left" } },
  ],
}

export function RichTextEditorDemo() {
  const [doc, setDoc] = React.useState<OutputData>(initialDoc)
  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="json">Saved JSON</TabsTrigger>
      </TabsList>
      <TabsContent value="editor" className="pt-3">
        <RichTextEditor value={initialDoc} onChange={setDoc} />
      </TabsContent>
      <TabsContent value="json" className="pt-3">
        <pre className="max-h-80 overflow-auto rounded-sm border border-border bg-surface p-3 font-mono text-xs text-foreground">
          {JSON.stringify(doc, null, 2)}
        </pre>
      </TabsContent>
    </Tabs>
  )
}

/* Motion (Framer Motion) ----------------------------------------------------------------- */

const features = ["Fast", "Accessible", "Themeable", "Composable"]

function MotionReveal() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="space-y-4">
      <Button size="sm" variant="secondary" onClick={() => setRun((r) => r + 1)}>
        Replay
      </Button>
      <div key={run} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">FadeIn from four directions</p>
          <div className="grid grid-cols-2 gap-2">
            {(["up", "down", "left", "right"] as const).map((d, i) => (
              <FadeIn key={d} direction={d} inView={false} delay={i * 0.1} className="rounded-sm border border-border bg-card p-3 text-center text-sm capitalize">
                {d}
              </FadeIn>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Stagger</p>
          <Stagger inView={false} className="space-y-2">
            {features.map((f) => (
              <StaggerItem key={f} className="rounded-sm border border-border bg-card px-3 py-2 text-sm">
                {f}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  )
}

function MotionGestures() {
  const constraints = React.useRef<HTMLDivElement>(null)
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Hover lift &amp; press</p>
        <div className="grid grid-cols-2 gap-3">
          {["Alpha", "Beta"].map((n) => (
            <Pressable key={n}>
              <Card size="sm" className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{n}</CardTitle>
                  <CardDescription>Hover and click me</CardDescription>
                </CardHeader>
              </Card>
            </Pressable>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Drag inside the box</p>
        <div ref={constraints} className="grid h-40 place-items-center overflow-hidden rounded-sm border border-dashed border-border bg-surface">
          <motion.div
            drag
            dragConstraints={constraints}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, rotate: 4 }}
            className="grid size-16 cursor-grab place-items-center rounded-md bg-primary-gradient text-sm font-semibold text-white shadow-glow active:cursor-grabbing"
          >
            Drag
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function MotionPresence() {
  const [show, setShow] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [toasts, setToasts] = React.useState<number[]>([])
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Presence</p>
        <Button size="sm" variant="outline" onClick={() => setShow((s) => !s)}>
          {show ? "Hide" : "Show"}
        </Button>
        <Presence show={show} className="rounded-sm border border-border bg-card p-3 text-sm">
          I animate in and out.
        </Presence>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Collapse</p>
        <Button size="sm" variant="outline" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <Collapse open={open}>
          <p className="rounded-sm border border-border bg-card p-3 text-sm text-muted-foreground">
            Height animates from 0 to auto without any manual measuring. Great for accordions, FAQs and filters.
          </p>
        </Collapse>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Toast stack</p>
        <Button size="sm" variant="outline" onClick={() => setToasts((t) => [...t, Date.now()].slice(-3))}>
          Add toast
        </Button>
        <ul className="space-y-1.5">
          <AnimatePresence initial={false}>
            {toasts.map((id) => (
              <motion.li
                key={id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                className="flex items-center justify-between rounded-sm border border-border bg-card px-3 py-1.5 text-sm"
              >
                Saved
                <button type="button" aria-label="Dismiss" className="text-muted-foreground hover:text-heading" onClick={() => setToasts((t) => t.filter((x) => x !== id))}>
                  ×
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

function MotionLayout() {
  const [tab, setTab] = React.useState("overview")
  const [items, setItems] = React.useState(["Design", "Build", "Ship", "Learn"])
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Shared layout (tabs)</p>
        <div role="tablist" className="flex w-fit gap-1 rounded-sm bg-muted p-1">
          {["overview", "usage", "api"].map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn("relative rounded-xs px-3 py-1.5 text-sm capitalize outline-none focus-visible:ring-2 focus-visible:ring-ring", tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-heading")}
            >
              {tab === t && <motion.span layoutId="motion-tab-pill" className="absolute inset-0 rounded-xs bg-primary" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Drag to reorder</p>
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-1.5">
          {items.map((i) => (
            <Reorder.Item key={i} value={i} className="flex cursor-grab items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-sm active:cursor-grabbing" whileDrag={{ scale: 1.03, boxShadow: "0 6px 20px rgb(0 0 0 / 0.3)" }}>
              <GripVerticalIcon className="size-4 text-muted-foreground" /> {i}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  )
}

export function MotionDemo() {
  return (
    <Tabs defaultValue="reveal" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="reveal">Reveal</TabsTrigger>
        <TabsTrigger value="gestures">Gestures</TabsTrigger>
        <TabsTrigger value="presence">Presence</TabsTrigger>
        <TabsTrigger value="layout">Layout &amp; reorder</TabsTrigger>
      </TabsList>
      <TabsContent value="reveal" className="pt-4"><MotionReveal /></TabsContent>
      <TabsContent value="gestures" className="pt-4"><MotionGestures /></TabsContent>
      <TabsContent value="presence" className="pt-4"><MotionPresence /></TabsContent>
      <TabsContent value="layout" className="pt-4"><MotionLayout /></TabsContent>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline">a11y</Badge> Respects the system “reduce motion” setting.
      </p>
    </Tabs>
  )
}


/** Sample "photos" (generated SVG) reused by the landing page. */
export const sampleSlides = slides
