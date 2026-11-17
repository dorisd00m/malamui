import { AppWindowIcon, GamepadIcon, GlobeIcon, LayoutDashboardIcon, MonitorSmartphoneIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Page } from "../site/shell"
import { DashboardDemo } from "./dashboard"
import { DesktopDemo } from "./desktop"
import { GameDemo } from "./game"
import { KioskDemo } from "./kiosk"
import { WebsiteDemo } from "./website"

const demos = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon, desc: "Admin analytics with stats, chart, table and goals.", view: DashboardDemo },
  { id: "website", label: "Website", icon: GlobeIcon, desc: "Marketing site: hero, features, pricing, FAQ and footer.", view: WebsiteDemo },
  { id: "desktop", label: "Desktop app", icon: AppWindowIcon, desc: "Code-editor style window with menubar, explorer, tabs and terminal.", view: DesktopDemo },
  { id: "kiosk", label: "Kiosk", icon: MonitorSmartphoneIcon, desc: "Touch-first self-order kiosk with large targets and a live cart.", view: KioskDemo },
  { id: "game", label: "Game", icon: GamepadIcon, desc: "In-game HUD, main menu with settings, and an inventory grid.", view: GameDemo },
] as const

export type DemoId = (typeof demos)[number]["id"]

export function DemoPage({ hash }: { hash: string }) {
  const id = (hash.split("/")[2] || "dashboard") as DemoId
  const current = demos.find((d) => d.id === id) ?? demos[0]
  const View = current.view

  return (
    <Page route="demo">
      <div className="mx-auto max-w-[1400px] px-4 pt-6">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Demos</h1>
          <p className="mt-1 text-muted-foreground">Five complete interfaces built only from Malam UI components. Switch the theme in the toolbar to restyle each one.</p>
        </div>
        <nav aria-label="Demos" className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {demos.map((d) => (
            <a
              key={d.id}
              href={`#/demo/${d.id}`}
              aria-current={d.id === current.id ? "page" : undefined}
              className={cn(
                "rounded-sm border border-border bg-card p-3 transition-colors hover:border-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                d.id === current.id && "border-primary bg-accent"
              )}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-heading">
                <d.icon className="size-4 text-link" /> {d.label}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">{d.desc}</span>
            </a>
          ))}
        </nav>
        <View />
      </div>
    </Page>
  )
}
