import { AppWindowIcon, GamepadIcon, GlobeIcon, LayoutDashboardIcon, MonitorSmartphoneIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Page } from "../site/shell"
import { DashboardDemo } from "./dashboard"
import { DesktopDemo } from "./desktop"
import { GameDemo } from "./game"
import { KioskDemo } from "./kiosk"
import { WebsiteDemo } from "./website"

const demos = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon, desc: "Analytics, chart, orders", view: DashboardDemo },
  { id: "website", label: "Website", icon: GlobeIcon, desc: "Landing page, pricing, FAQ", view: WebsiteDemo },
  { id: "desktop", label: "Desktop app", icon: AppWindowIcon, desc: "Graphic editor, canvas, layers", view: DesktopDemo },
  { id: "kiosk", label: "Kiosk", icon: MonitorSmartphoneIcon, desc: "Touch self-order with cart", view: KioskDemo },
  { id: "game", label: "Game", icon: GamepadIcon, desc: "HUD, main menu, inventory", view: GameDemo },
] as const

export type DemoId = (typeof demos)[number]["id"]

export function DemoPage({ hash }: { hash: string }) {
  const id = (hash.split("/")[2] || "dashboard") as DemoId
  const current = demos.find((d) => d.id === id) ?? demos[0]
  const View = current.view

  return (
    <Page route="demo" footer={false}>
      {/* The demo area fills the viewport under the header; each demo scrolls inside it. */}
      <div className="flex h-[calc(100dvh-3.6rem)] flex-col md:flex-row">
        <nav
          aria-label="Demos"
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-border bg-header p-2 md:w-60 md:flex-col md:overflow-y-auto md:border-r md:border-b-0 md:p-3"
        >
          <p className="hidden px-2 pt-1 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase md:block">Demos</p>
          {demos.map((d) => (
            <a
              key={d.id}
              href={`#/demo/${d.id}`}
              aria-current={d.id === current.id ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                d.id === current.id && "bg-accent text-heading"
              )}
            >
              <d.icon className={cn("size-5 shrink-0", d.id === current.id && "text-link")} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold whitespace-nowrap">{d.label}</span>
                <span className="hidden text-xs text-muted-foreground md:block">{d.desc}</span>
              </span>
            </a>
          ))}
        </nav>
        <section className="min-h-0 min-w-0 flex-1 overflow-auto p-3 md:p-4">
          <div className="h-full">
            <View />
          </div>
        </section>
      </div>
    </Page>
  )
}
