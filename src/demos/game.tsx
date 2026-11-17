import * as React from "react"
import {
  AxeIcon,
  CoinsIcon,
  CompassIcon,
  FlaskConicalIcon,
  GemIcon,
  MapIcon,
  PauseIcon,
  ShieldIcon,
  SwordIcon,
  SwordsIcon,
  WandSparklesIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/malam"
import { cn } from "@/lib/utils"

const track = "[&_[data-slot=progress-track]]:h-2.5 [&_[data-slot=progress-track]]:rounded-xs"
const barColor = {
  "bg-destructive": track + " [&_[data-slot=progress-indicator]]:bg-destructive",
  "bg-primary": track + " [&_[data-slot=progress-indicator]]:bg-primary",
  "bg-cta": track + " [&_[data-slot=progress-indicator]]:bg-cta",
} as const
const bar = (c: keyof typeof barColor) => barColor[c]

/* HUD ---------------------------------------------------------------------- */

const hotbar = [
  { icon: SwordIcon, name: "Iron Blade", key: "1" },
  { icon: AxeIcon, name: "Woodcutter", key: "2" },
  { icon: WandSparklesIcon, name: "Spark", key: "3" },
  { icon: ShieldIcon, name: "Guard", key: "4" },
  { icon: FlaskConicalIcon, name: "Health Potion ×3", key: "5" },
]

function Hud() {
  const [slot, setSlot] = React.useState(0)
  const { theme } = useTheme()
  return (
    <div data-theme={theme} className="dark relative aspect-video min-h-[480px] w-full overflow-hidden rounded-md border border-border bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_60%),linear-gradient(180deg,#09090b,#16161a_60%,#0a0a0c)]">
      {/* ground grid for atmosphere */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(transparent,rgb(255_255_255/0.04)),repeating-linear-gradient(90deg,rgb(255_255_255/0.05)_0_1px,transparent_1px_60px)] [mask-image:linear-gradient(transparent,black)]" />

      {/* Player card */}
      <div className="absolute top-4 left-4 w-64 space-y-2 rounded-sm border border-border bg-black/60 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-heading">Kaelen</p>
            <p className="text-xs text-muted-foreground">Level 24 · Wayfarer</p>
          </div>
        </div>
        <div className="space-y-1.5 text-[0.6875rem] text-muted-foreground">
          <div>
            <div className="flex justify-between"><span>HP</span><span>742 / 900</span></div>
            <Progress value={82} className={bar("bg-destructive")} aria-label="Health" />
          </div>
          <div>
            <div className="flex justify-between"><span>MP</span><span>180 / 260</span></div>
            <Progress value={69} className={bar("bg-primary")} aria-label="Mana" />
          </div>
          <div>
            <div className="flex justify-between"><span>XP</span><span>4,210 / 6,000</span></div>
            <Progress value={70} className={bar("bg-cta")} aria-label="Experience" />
          </div>
        </div>
      </div>

      {/* Minimap + currency */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <div className="relative size-36 overflow-hidden rounded-full border-2 border-border bg-black/60" aria-label="Minimap">
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.06)_0_1px,transparent_1px_18px),repeating-linear-gradient(90deg,rgb(255_255_255/0.06)_0_1px,transparent_1px_18px)]" />
          <CompassIcon className="absolute top-2 left-1/2 size-4 -translate-x-1/2 text-muted-foreground" />
          <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow-sm" />
          <span className="absolute top-8 left-24 size-2 rounded-full bg-destructive" />
          <span className="absolute top-20 left-7 size-2 rounded-full bg-cta" />
        </div>
        <div className="flex items-center gap-3 rounded-sm bg-black/60 px-3 py-1.5 text-sm text-heading backdrop-blur">
          <span className="flex items-center gap-1.5"><CoinsIcon className="size-4 text-sale-foreground" /> 12,480</span>
          <span className="flex items-center gap-1.5"><GemIcon className="size-4 text-link" /> 36</span>
        </div>
      </div>

      {/* Quest tracker */}
      <div className="absolute top-44 right-4 w-60 space-y-1.5 rounded-sm border border-border bg-black/60 p-3 text-sm backdrop-blur">
        <p className="text-xs font-semibold tracking-wider text-link uppercase">Active quest</p>
        <p className="font-medium text-heading">The Lantern Road</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li className="line-through opacity-60">Speak with the Keeper</li>
          <li>Light 3 beacons <span className="text-heading">(2/3)</span></li>
          <li>Return to Harrow Gate</li>
        </ul>
      </div>

      {/* Boss bar */}
      <div className="absolute top-4 left-1/2 w-72 -translate-x-1/2 space-y-1 text-center">
        <p className="text-sm font-semibold tracking-widest text-heading uppercase">Hollow Warden</p>
        <Progress value={46} className={bar("bg-destructive")} aria-label="Boss health" />
      </div>

      {/* Hotbar */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-2">
        {hotbar.map((h, i) => (
          <Tooltip key={h.key}>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={() => setSlot(i)}
                  aria-label={h.name}
                  aria-pressed={slot === i}
                  className={cn(
                    "relative grid size-14 place-items-center rounded-sm border border-border bg-black/70 text-muted-foreground backdrop-blur transition-colors hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    slot === i && "border-primary text-heading shadow-glow-sm"
                  )}
                />
              }
            >
              <h.icon className="size-6" />
              <Kbd className="absolute -top-2 -left-2">{h.key}</Kbd>
            </TooltipTrigger>
            <TooltipContent>{h.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Kbd>Esc</Kbd> Pause <Kbd>M</Kbd> Map
      </div>
      <Button variant="secondary" size="icon" aria-label="Pause" className="absolute right-4 bottom-4">
        <PauseIcon />
      </Button>
    </div>
  )
}

/* Main menu ------------------------------------------------------------------ */

function MainMenu() {
  const [panel, setPanel] = React.useState<"main" | "settings">("main")
  const { theme } = useTheme()
  return (
    <div data-theme={theme} className="dark relative grid min-h-[480px] place-items-center overflow-hidden rounded-md border border-border bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--primary)_30%,transparent),transparent_65%),linear-gradient(180deg,#09090b,#101013)] p-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs tracking-[0.5em] text-link uppercase">A tale of lanterns</p>
        <h2 className="mt-2 mb-8 text-5xl font-bold tracking-[0.2em] text-heading uppercase">Hollow</h2>

        {panel === "main" ? (
          <div className="space-y-2">
            <Button size="lg" className="h-12 w-full text-base">Continue</Button>
            {["New game", "Load game"].map((l) => (
              <Button key={l} variant="secondary" size="lg" className="h-12 w-full text-base">{l}</Button>
            ))}
            <Button variant="outline" size="lg" className="h-12 w-full text-base" onClick={() => setPanel("settings")}>
              Settings
            </Button>
            <Button variant="ghost" size="lg" className="h-12 w-full text-base">Quit</Button>
          </div>
        ) : (
          <div className="space-y-5 rounded-sm border border-border bg-black/50 p-5 text-left backdrop-blur">
            <h3 className="text-lg font-semibold">Settings</h3>
            {[["Master volume", 80], ["Music", 55], ["Effects", 70]].map(([l, v]) => (
              <div key={l as string} className="space-y-2">
                <p className="text-sm text-muted-foreground">{l}</p>
                <Slider defaultValue={[v as number]} max={100} aria-label={l as string} />
              </div>
            ))}
            <div className="flex items-center justify-between text-sm">
              <span>Screen shake</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Difficulty</span>
              <ToggleGroup defaultValue={["normal"]}>
                {["easy", "normal", "hard"].map((d) => (
                  <ToggleGroupItem key={d} value={d} className="capitalize">{d}</ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Button className="w-full" onClick={() => setPanel("main")}>Back</Button>
          </div>
        )}
        <p className="mt-8 text-xs text-muted-foreground">v0.9.2 · Placeholder game for demo purposes</p>
      </div>
    </div>
  )
}

/* Inventory ------------------------------------------------------------------ */

type Rarity = "common" | "rare" | "epic" | "legendary"
const rarityStyle: Record<Rarity, string> = {
  common: "border-border text-muted-foreground",
  rare: "border-chart-1 text-chart-1",
  epic: "border-chart-4 text-chart-4",
  legendary: "border-sale-foreground text-sale-foreground",
}
const items: { name: string; icon: typeof SwordIcon; rarity: Rarity; stat: string; kind: string }[] = [
  { name: "Iron Blade", icon: SwordIcon, rarity: "common", stat: "+12 Attack", kind: "weapon" },
  { name: "Ember Axe", icon: AxeIcon, rarity: "rare", stat: "+28 Attack, burns", kind: "weapon" },
  { name: "Warden's Shield", icon: ShieldIcon, rarity: "epic", stat: "+40 Defense", kind: "armor" },
  { name: "Twin Fangs", icon: SwordsIcon, rarity: "legendary", stat: "+64 Attack, +8% crit", kind: "weapon" },
  { name: "Health Potion", icon: FlaskConicalIcon, rarity: "common", stat: "Restore 200 HP", kind: "consumable" },
  { name: "Old Map", icon: MapIcon, rarity: "rare", stat: "Reveals a region", kind: "consumable" },
  { name: "Lantern Shard", icon: GemIcon, rarity: "epic", stat: "Quest item", kind: "consumable" },
  { name: "Spark Tome", icon: WandSparklesIcon, rarity: "rare", stat: "+18 Magic", kind: "weapon" },
]

function Inventory() {
  const [filter, setFilter] = React.useState("all")
  const shown = items.filter((i) => filter === "all" || i.kind === filter)
  return (
    <div className="space-y-4 rounded-md border border-border bg-card bg-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Inventory</h3>
        <ToggleGroup value={[filter]} onValueChange={(v) => v[0] && setFilter(v[0])}>
          {["all", "weapon", "armor", "consumable"].map((f) => (
            <ToggleGroupItem key={f} value={f} className="capitalize">{f}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
        {Array.from({ length: 24 }, (_, i) => {
          const it = shown[i]
          if (!it) return <div key={i} className="aspect-square rounded-sm border border-dashed border-border/60" aria-hidden />
          return (
            <HoverCard key={i}>
              <HoverCardTrigger
                render={
                  <button
                    type="button"
                    aria-label={it.name}
                    className={cn("grid aspect-square place-items-center rounded-sm border-2 bg-surface transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", rarityStyle[it.rarity])}
                  />
                }
              >
                <it.icon className="size-7" />
              </HoverCardTrigger>
              <HoverCardContent className="w-56">
                <p className="font-semibold text-heading">{it.name}</p>
                <Badge variant="outline" className={cn("my-1 capitalize", rarityStyle[it.rarity])}>{it.rarity}</Badge>
                <p className="text-sm text-muted-foreground">{it.stat}</p>
              </HoverCardContent>
            </HoverCard>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">Hover an item to inspect it. {shown.length} of {items.length} shown.</p>
    </div>
  )
}

export function GameDemo() {
  return (
    <Tabs defaultValue="hud">
      <TabsList>
        <TabsTrigger value="hud">In-game HUD</TabsTrigger>
        <TabsTrigger value="menu">Main menu</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>
      <TabsContent value="hud" className="pt-3"><Hud /></TabsContent>
      <TabsContent value="menu" className="pt-3"><MainMenu /></TabsContent>
      <TabsContent value="inventory" className="pt-3"><Inventory /></TabsContent>
    </Tabs>
  )
}
