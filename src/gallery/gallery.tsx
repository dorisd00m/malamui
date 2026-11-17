import * as React from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Page } from "../site/shell"
import * as D from "./demos-display"
import * as F from "./demos-forms"
import * as O from "./demos-overlay"

type Entry = { id: string; title: string; group: string; demo: React.ComponentType; wide?: boolean }

const entries: Entry[] = [
  { group: "Actions", id: "button", title: "Button", demo: F.ButtonDemo, wide: true },
  { group: "Actions", id: "button-group", title: "Button Group", demo: F.ButtonGroupDemo },
  { group: "Actions", id: "toggle", title: "Toggle & Toggle Group", demo: F.ToggleDemo },
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
  { group: "Display", id: "chart", title: "Chart", demo: D.ChartDemo },

  { group: "Feedback & Layout", id: "progress", title: "Progress", demo: D.ProgressDemo },
  { group: "Feedback & Layout", id: "skeleton", title: "Skeleton", demo: D.SkeletonDemo },
  { group: "Feedback & Layout", id: "spinner", title: "Spinner", demo: D.SpinnerDemo },
  { group: "Feedback & Layout", id: "separator", title: "Separator", demo: D.SeparatorDemo },
  { group: "Feedback & Layout", id: "scroll-area", title: "Scroll Area", demo: D.ScrollAreaDemo },
  { group: "Feedback & Layout", id: "aspect-ratio", title: "Aspect Ratio", demo: D.AspectRatioDemo },
  { group: "Feedback & Layout", id: "resizable", title: "Resizable", demo: D.ResizableDemo },
]

/* ---------------------------------------------------------------------- */


function DemoCard({ entry }: { entry: Entry }) {
  const Demo = entry.demo
  return (
    <section id={entry.id} className={"scroll-mt-24 " + (entry.wide ? "xl:col-span-2" : "")}>
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <h3 className="text-sm font-semibold text-heading">{entry.title}</h3>
          <code className="text-xs text-muted-foreground">ui/{entry.id}</code>
        </header>
        <div className="flex min-h-28 items-center p-5">
          <div className="w-full">
            <Demo />
          </div>
        </div>
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
                <p className="mb-1 text-eyebrow text-xs! text-muted-foreground!">{g}</p>
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
            <h1 className="text-3xl font-bold">Components</h1>
            <p className="mt-1 text-muted-foreground">
              {entries.length} shadcn/ui components restyled for Malam. Change the theme or pick custom colors in the
              toolbar and every preview updates live.
            </p>
          </div>
          <div className="lg:hidden">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components" />
          </div>
          {groups.map((g) => (
            <div key={g}>
              <h2 className="mb-4 text-eyebrow">{g}</h2>
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
