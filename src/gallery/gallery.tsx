import * as React from "react"
import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code, Page } from "../site/shell"
import { INSTALL_CMD } from "../site/config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { docs } from "./docs-data"
import { exampleFor, importStatement } from "./source"
import * as D from "./demos-display"
import * as F from "./demos-forms"
import * as O from "./demos-overlay"
import * as C from "./demos-charts"
import * as X from "./demos-extended"
import * as ED from "./examples-display"
import * as EI from "./examples-icon"
import * as EC from "./examples-chat"
import * as ES from "./examples-sidebar"
import * as EM from "./examples-more"
import { examples } from "./examples"

/** Group whose components depend on extra npm libraries beyond shadcn/ui + Recharts. */
export const EXTENDED_GROUP = "Extended"
export const EXTENDED_LIBS = "react-dropzone, react-select, Swiper, Editor.js, Iconify and Framer Motion"

/** Divider shown in lists before the Extended group. */
export function ExtendedDivider({ compact }: { compact?: boolean }) {
  return compact ? (
    <div className="mt-2 mb-3 border-t border-border pt-3">
      <p className="text-eyebrow text-xs! text-muted-foreground!">Extended</p>
      <p className="mt-0.5 text-[0.6875rem] leading-snug text-muted-foreground">Needs extra libraries</p>
    </div>
  ) : (
    <div className="border-t-2 border-dashed border-border pt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold">Extended components</h2>
        <span className="rounded-xs bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">Extra libraries</span>
      </div>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        These components are not part of shadcn/ui and each one pulls in a third-party library ({EXTENDED_LIBS}). Installing one adds only that
        library to your project.
      </p>
    </div>
  )
}

export type Entry = { id: string; title: string; group: string; demo: React.ComponentType; wide?: boolean }

export const entries: Entry[] = [
  { group: "Typography", id: "typography", title: "Typography", demo: ED.TypographyDemo, wide: true },
  { group: "Actions", id: "button", title: "Button", demo: F.ButtonDemo, wide: true },
  { group: "Actions", id: "button-group", title: "Button Group", demo: F.ButtonGroupDemo },
  { group: "Actions", id: "toggle", title: "Toggle", demo: F.ToggleDemo },
  { group: "Actions", id: "toggle-group", title: "Toggle Group", demo: EM.ToggleGroupDemo },
  { group: "Actions", id: "kbd", title: "Kbd", demo: F.KbdDemo },

  { group: "Forms", id: "input", title: "Input", demo: F.InputDemo },
  { group: "Forms", id: "input-group", title: "Input Group", demo: F.InputGroupDemo },
  { group: "Forms", id: "textarea", title: "Textarea", demo: F.TextareaDemo },
  { group: "Forms", id: "label", title: "Label", demo: F.LabelDemo },
  { group: "Forms", id: "field", title: "Field", demo: F.FieldDemo, wide: true },
  { group: "Forms", id: "checkbox", title: "Checkbox", demo: F.CheckboxDemo },
  { group: "Forms", id: "radio-group", title: "Radio Group", demo: F.RadioGroupDemo },
  { group: "Forms", id: "switch", title: "Switch", demo: F.SwitchDemo },
  { group: "Forms", id: "slider", title: "Slider", demo: F.SliderDemo },
  { group: "Forms", id: "select", title: "Select", demo: F.SelectDemo },
  { group: "Forms", id: "native-select", title: "Native Select", demo: F.NativeSelectDemo },
  { group: "Forms", id: "combobox", title: "Combobox", demo: F.ComboboxDemo },
  { group: "Forms", id: "input-otp", title: "Input OTP", demo: F.InputOTPDemo },
  { group: "Forms", id: "calendar", title: "Calendar", demo: F.CalendarDemo },
  { group: "Forms", id: "date-picker", title: "Date picker", demo: ED.DatePickerDemo },
  { group: "Forms", id: "date-range-picker", title: "Date range picker", demo: ED.DateRangePickerDemo },
  { group: "Forms", id: "rating", title: "Rating", demo: ED.RatingDemo },

  { group: "Overlays", id: "dialog", title: "Dialog", demo: O.DialogDemo },
  { group: "Overlays", id: "alert-dialog", title: "Alert Dialog", demo: O.AlertDialogDemo },
  { group: "Overlays", id: "sheet", title: "Sheet", demo: O.SheetDemo },
  { group: "Overlays", id: "drawer", title: "Drawer", demo: O.DrawerDemo },
  { group: "Overlays", id: "popover", title: "Popover", demo: O.PopoverDemo },
  { group: "Overlays", id: "tooltip", title: "Tooltip", demo: O.TooltipDemo },
  { group: "Overlays", id: "hover-card", title: "Hover Card", demo: O.HoverCardDemo },
  { group: "Overlays", id: "toast", title: "Toast", demo: O.ToastDemo },

  { group: "Menus & Navigation", id: "dropdown-menu", title: "Dropdown Menu", demo: O.DropdownMenuDemo },
  { group: "Menus & Navigation", id: "context-menu", title: "Context Menu", demo: O.ContextMenuDemo },
  { group: "Menus & Navigation", id: "menubar", title: "Menubar", demo: O.MenubarDemo },
  { group: "Menus & Navigation", id: "navigation-menu", title: "Navigation Menu", demo: O.NavigationMenuDemo },
  { group: "Menus & Navigation", id: "command", title: "Command", demo: O.CommandDemo },
  { group: "Menus & Navigation", id: "breadcrumb", title: "Breadcrumb", demo: O.BreadcrumbDemo },
  { group: "Menus & Navigation", id: "pagination", title: "Pagination", demo: O.PaginationDemo },
  { group: "Menus & Navigation", id: "tabs", title: "Tabs", demo: D.TabsDemo },
  { group: "Menus & Navigation", id: "sidebar", title: "Sidebar", demo: ES.SidebarDemo, wide: true },

  { group: "Display", id: "card", title: "Card", demo: D.CardDemo },
  { group: "Display", id: "badge", title: "Badge", demo: D.BadgeDemo },
  { group: "Display", id: "avatar", title: "Avatar", demo: O.AvatarDemo },
  { group: "Display", id: "alert", title: "Alert", demo: D.AlertDemo },
  { group: "Display", id: "accordion", title: "Accordion", demo: D.AccordionDemo },
  { group: "Display", id: "collapsible", title: "Collapsible", demo: D.CollapsibleDemo },
  { group: "Display", id: "table", title: "Table", demo: D.TableDemo },
  { group: "Display", id: "item", title: "Item", demo: D.ItemDemo },
  { group: "Display", id: "empty", title: "Empty", demo: D.EmptyDemo },
  { group: "Display", id: "code-block", title: "Code Block", demo: D.CodeBlockDemo },
  { group: "Display", id: "carousel", title: "Carousel", demo: D.CarouselDemo },

  { group: "Feedback & Layout", id: "progress", title: "Progress", demo: D.ProgressDemo },
  { group: "Feedback & Layout", id: "skeleton", title: "Skeleton", demo: D.SkeletonDemo },
  { group: "Feedback & Layout", id: "spinner", title: "Spinner", demo: D.SpinnerDemo },
  { group: "Feedback & Layout", id: "separator", title: "Separator", demo: D.SeparatorDemo },
  { group: "Feedback & Layout", id: "scroll-area", title: "Scroll Area", demo: D.ScrollAreaDemo },
  { group: "Feedback & Layout", id: "aspect-ratio", title: "Aspect Ratio", demo: D.AspectRatioDemo },
  { group: "Feedback & Layout", id: "resizable", title: "Resizable", demo: D.ResizableDemo },
  { group: "Feedback & Layout", id: "direction", title: "Direction (RTL)", demo: EM.DirectionDemo },

  // Chat & AI building blocks
  { group: "Chat & AI", id: "message", title: "Message", demo: EC.MessageDemo, wide: true },
  { group: "Chat & AI", id: "bubble", title: "Bubble", demo: EC.MessageVariantsExample },
  { group: "Chat & AI", id: "message-scroller", title: "Message Scroller", demo: EC.MessageScrollerDemo, wide: true },
  { group: "Chat & AI", id: "attachment", title: "Attachment", demo: EC.AttachmentDemo },
  { group: "Chat & AI", id: "marker", title: "Marker", demo: EC.MarkerDemo },
  { group: "Chat & AI", id: "trace", title: "Trace", demo: EC.TraceDemo },
  { group: "Chat & AI", id: "questionnaire", title: "Questionnaire", demo: EC.QuestionnaireDemo, wide: true },

  // Charts: all built on the same ChartContainer (Recharts), themed by the --chart-* tokens
  { group: "Charts", id: "chart", title: "Chart basics", demo: D.ChartDemo },
  { group: "Charts", id: "chart-area", title: "Area chart", demo: C.AreaChartDemo },
  { group: "Charts", id: "chart-line", title: "Line chart", demo: C.LineChartDemo },
  { group: "Charts", id: "chart-bar", title: "Bar chart: grouped & stacked", demo: C.BarChartDemo, wide: true },
  { group: "Charts", id: "chart-horizontal", title: "Horizontal bar chart", demo: C.HorizontalBarChartDemo },
  { group: "Charts", id: "chart-pie", title: "Pie & donut chart", demo: C.PieChartDemo, wide: true },
  { group: "Charts", id: "chart-radar", title: "Radar chart", demo: C.RadarChartDemo },
  { group: "Charts", id: "chart-radial", title: "Radial & gauge chart", demo: C.RadialChartDemo, wide: true },
  { group: "Charts", id: "chart-scatter", title: "Scatter chart", demo: C.ScatterChartDemo },
  { group: "Charts", id: "chart-composed", title: "Composed chart (bar + line)", demo: C.ComposedChartDemo },
  { group: "Charts", id: "chart-sparkline", title: "Sparklines in stat cards", demo: C.SparklineDemo, wide: true },
  { group: "Charts", id: "chart-interactive", title: "Interactive area chart", demo: C.InteractiveAreaChartDemo, wide: true },

  // Extended: these need extra npm libraries, so they are separated from the shadcn-based set above
  { group: EXTENDED_GROUP, id: "file-upload", title: "File upload", demo: X.FileUploadDemo, wide: true },
  { group: EXTENDED_GROUP, id: "dynamic-select", title: "Dynamic select", demo: X.DynamicSelectDemo, wide: true },
  { group: EXTENDED_GROUP, id: "image-slider", title: "Image slider", demo: X.ImageSliderDemo, wide: true },
  { group: EXTENDED_GROUP, id: "rich-text-editor", title: "Rich text editor", demo: X.RichTextEditorDemo, wide: true },
  { group: EXTENDED_GROUP, id: "icon", title: "Icon", demo: EI.IconDemo, wide: true },
  { group: EXTENDED_GROUP, id: "motion", title: "Motion", demo: X.MotionDemo, wide: true },
]

/* ---------------------------------------------------------------------- */


export const demoNames = new Map<React.ComponentType, string>(
  Object.entries({ ...F, ...O, ...D, ...C, ...X, ...ED, ...EI, ...EC, ...ES, ...EM }).map(([k, v]) => [v as React.ComponentType, k])
)

function DemoCard({ entry }: { entry: Entry }) {
  const Demo = entry.demo
  const info = docs[entry.id]
  const file = info?.file ?? entry.id
  const example = React.useMemo(() => exampleFor(demoNames.get(entry.demo) ?? ""), [entry.demo])
  const imports = React.useMemo(() => importStatement(file), [file])

  return (
    <section id={entry.id} className={"scroll-mt-24 " + (entry.wide ? "xl:col-span-2" : "")}>
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <h3 className="text-sm font-semibold text-heading">{entry.title}</h3>
          <a
            href={`#/components/${entry.id}`}
            className="flex items-center gap-1 text-xs text-link hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`${entry.title} documentation`}
          >
            {examples[entry.id]?.length ? `Docs · +${examples[entry.id].length} examples` : "Docs"} <ArrowRightIcon className="size-3" />
          </a>
        </header>
        {info && <p className="border-b border-border px-4 py-2.5 text-[0.8125rem] text-muted-foreground">{info.desc}</p>}
        <Tabs defaultValue="preview">
          <TabsList variant="line" className="px-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="flex min-h-28 items-center p-5">
              <div className="w-full">
                <Demo />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="usage">
            <div className="space-y-4 p-4">
              {imports && <Code title="Import">{imports}</Code>}
              {example && <Code title="Example">{example}</Code>}
              {info?.notes && (
                <div>
                  <h4 className="mb-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Notes</h4>
                  <ul className="list-disc space-y-1 pl-5 text-[0.8125rem]">
                    {info.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Install: <code>npx shadcn@latest add @malam/{file}</code>. Full guide in the{" "}
                <a className="text-link hover:underline" href={`#/components/${entry.id}`}>documentation</a>.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export function Gallery() {
  const [q, setQ] = React.useState("")
  const filtered = entries.filter((e) => e.title.toLowerCase().includes(q.trim().toLowerCase()))
  const groups = [...new Set(filtered.map((e) => e.group))]

  return (
    <Page route="components">
      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-6">
        <aside className="sticky top-[4.5rem] hidden h-[calc(100dvh-6rem)] w-56 shrink-0 lg:block">
          <div className="relative mb-3">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components" className="pl-8" />
          </div>
          <ScrollArea className="h-[calc(100%-3rem)] pr-3">
            {groups.map((g) => (
              <div key={g} className="mb-4">
                {g === EXTENDED_GROUP ? <ExtendedDivider compact /> : <p className="mb-1 text-eyebrow text-xs! text-muted-foreground!">{g}</p>}
                {filtered
                  .filter((e) => e.group === g)
                  .map((e) => (
                    <a
                      key={e.id}
                      href={`#${e.id}`}
                      onClick={(ev) => {
                        ev.preventDefault()
                        document.getElementById(e.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }}
                      className="block rounded-xs px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-heading"
                    >
                      {e.title}
                    </a>
                  ))}
              </div>
            ))}
          </ScrollArea>
        </aside>

        <main className="min-w-0 flex-1 space-y-10">
          <div>
            <h1 className="text-3xl font-bold">All components</h1>
            <p className="mt-1 text-muted-foreground">
              {entries.length} shadcn/ui components restyled for Malam. Change the theme or pick custom colors in the
              toolbar and every preview updates live.
            </p>
          </div>
          <Code title="Install a single component, or everything with @malam/malam-ui (one-time registry setup: see Documentation)">{`npx shadcn@latest add @malam/button\n${INSTALL_CMD}`}</Code>
          <div className="lg:hidden">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components" />
          </div>
          {groups.map((g) => (
            <div key={g}>
              {g === EXTENDED_GROUP ? <ExtendedDivider /> : <h2 className="mb-4 text-eyebrow">{g}</h2>}
              {g === EXTENDED_GROUP && <div className="mb-4" />}
              <div className="grid gap-4 xl:grid-cols-2">
                {filtered
                  .filter((e) => e.group === g)
                  .map((e) => (
                    <DemoCard key={e.id} entry={e} />
                  ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground">No components match “{q}”.</p>}
        </main>
      </div>
    </Page>
  )
}
