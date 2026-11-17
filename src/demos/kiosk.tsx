import * as React from "react"
import {
  BeefIcon,
  CheckCircle2Icon,
  CoffeeIcon,
  CookieIcon,
  GlobeIcon,
  IceCreamConeIcon,
  MinusIcon,
  PizzaIcon,
  PlusIcon,
  SaladIcon,
  ShoppingBagIcon,
  Trash2Icon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type Category = "popular" | "mains" | "sides" | "drinks" | "desserts"

const categories: { id: Category; label: string; icon: typeof PizzaIcon }[] = [
  { id: "popular", label: "Popular", icon: PizzaIcon },
  { id: "mains", label: "Mains", icon: BeefIcon },
  { id: "sides", label: "Sides", icon: SaladIcon },
  { id: "drinks", label: "Drinks", icon: CoffeeIcon },
  { id: "desserts", label: "Desserts", icon: IceCreamConeIcon },
]

type Item = { id: string; name: string; price: number; cat: Category[]; icon: typeof PizzaIcon; tag?: string }

const menu: Item[] = [
  { id: "m1", name: "Smoky Burger", price: 8.5, cat: ["popular", "mains"], icon: BeefIcon, tag: "Best seller" },
  { id: "m2", name: "Margherita", price: 9.0, cat: ["popular", "mains"], icon: PizzaIcon },
  { id: "m3", name: "Garden Salad", price: 6.0, cat: ["sides"], icon: SaladIcon, tag: "Vegan" },
  { id: "m4", name: "Cold Brew", price: 3.5, cat: ["popular", "drinks"], icon: CoffeeIcon },
  { id: "m5", name: "Oat Latte", price: 4.0, cat: ["drinks"], icon: CoffeeIcon },
  { id: "m6", name: "Choc Cookie", price: 2.5, cat: ["desserts", "sides"], icon: CookieIcon },
  { id: "m7", name: "Vanilla Cone", price: 2.0, cat: ["popular", "desserts"], icon: IceCreamConeIcon },
  { id: "m8", name: "Spicy Chicken", price: 9.5, cat: ["mains"], icon: BeefIcon, tag: "Spicy" },
]

const money = (n: number) => `$${n.toFixed(2)}`

export function KioskDemo() {
  const [cat, setCat] = React.useState<Category>("popular")
  const [cart, setCart] = React.useState<Record<string, number>>({ m1: 1, m4: 2 })
  const [dineIn, setDineIn] = React.useState("dine-in")
  const [paid, setPaid] = React.useState(false)

  const lines = menu.filter((m) => cart[m.id])
  const total = lines.reduce((s, m) => s + m.price * cart[m.id], 0)
  const count = lines.reduce((s, m) => s + cart[m.id], 0)

  const change = (id: string, d: number) =>
    setCart((c) => {
      const q = (c[id] ?? 0) + d
      const next = { ...c }
      if (q <= 0) delete next[id]
      else next[id] = q
      return next
    })

  return (
    <div className="mx-auto max-w-[1100px] rounded-[1.25rem] border-8 border-header bg-background shadow-panel">
      {/* Kiosk header */}
      <div className="flex items-center gap-4 border-b border-border px-6 py-4">
        <span className="text-2xl font-bold tracking-wide text-heading">Warung Malam</span>
        <Badge variant="secondary" className="h-7 px-3 text-sm">Self-order</Badge>
        <Button variant="outline" size="lg" className="ml-auto h-12 px-5 text-base">
          <GlobeIcon /> English
        </Button>
      </div>

      {/* Step indicator */}
      <ol className="flex items-center gap-3 border-b border-border px-6 py-3 text-sm">
        {["Choose", "Review", "Pay"].map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold", i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{i + 1}</span>
            <span className={i === 0 ? "text-heading" : "text-muted-foreground"}>{s}</span>
            {i < 2 && <Separator className="w-10 shrink-0" />}
          </li>
        ))}
      </ol>

      <div className="grid min-h-[620px] md:grid-cols-[140px_1fr_320px]">
        {/* Categories */}
        <nav aria-label="Categories" className="flex gap-2 overflow-x-auto border-b border-border p-3 md:flex-col md:border-r md:border-b-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={cn(
                "flex min-h-20 min-w-24 flex-col items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-muted-foreground transition-colors hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                cat === c.id && "border-primary bg-accent text-heading"
              )}
            >
              <c.icon className="size-7" />
              {c.label}
            </button>
          ))}
        </nav>

        {/* Menu */}
        <section className="p-5">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {menu
              .filter((m) => m.cat.includes(cat))
              .map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => change(m.id, 1)}
                  className="group relative flex flex-col items-center gap-3 rounded-md border border-border bg-card bg-panel p-5 text-center transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px"
                >
                  {m.tag && <Badge className="absolute top-2 left-2">{m.tag}</Badge>}
                  {cart[m.id] ? (
                    <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {cart[m.id]}
                    </span>
                  ) : null}
                  <span className="grid size-24 place-items-center rounded-full bg-surface text-link">
                    <m.icon className="size-12" />
                  </span>
                  <span className="text-lg font-semibold text-heading">{m.name}</span>
                  <span className="text-xl font-bold text-link">{money(m.price)}</span>
                </button>
              ))}
          </div>
        </section>

        {/* Cart */}
        <aside className="flex flex-col border-t border-border bg-header md:border-t-0 md:border-l">
          <div className="space-y-3 p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBagIcon className="size-5 text-link" /> Your order
              <Badge variant="secondary" className="ml-auto">{count} items</Badge>
            </h2>
            <ToggleGroup value={[dineIn]} onValueChange={(v) => v[0] && setDineIn(v[0])} className="w-full">
              <ToggleGroupItem value="dine-in" className="h-11 flex-1 text-sm">Dine in</ToggleGroupItem>
              <ToggleGroupItem value="takeaway" className="h-11 flex-1 text-sm">Take away</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Separator />
          <ul className="flex-1 space-y-3 overflow-y-auto p-4">
            {lines.length === 0 && <li className="py-10 text-center text-muted-foreground">Tap an item to add it.</li>}
            {lines.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-heading">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{money(m.price * cart[m.id])}</p>
                </div>
                <Button variant="outline" size="icon-lg" aria-label={`Remove one ${m.name}`} onClick={() => change(m.id, -1)}>
                  {cart[m.id] === 1 ? <Trash2Icon /> : <MinusIcon />}
                </Button>
                <span className="w-5 text-center text-lg font-semibold text-heading">{cart[m.id]}</span>
                <Button variant="outline" size="icon-lg" aria-label={`Add one ${m.name}`} onClick={() => change(m.id, 1)}>
                  <PlusIcon />
                </Button>
              </li>
            ))}
          </ul>
          <div className="space-y-3 border-t border-border p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{money(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Tax (10%)</span>
              <span>{money(total * 0.1)}</span>
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-heading">
              <span>Total</span>
              <span>{money(total * 1.1)}</span>
            </div>
            <Button variant="cta" disabled={count === 0} onClick={() => setPaid(true)} className="h-14 w-full text-lg">
              Pay now
            </Button>
            <Button variant="ghost" disabled={count === 0} onClick={() => setCart({})} className="h-10 w-full">
              Cancel order
            </Button>
          </div>
        </aside>
      </div>

      <Dialog open={paid} onOpenChange={setPaid}>
        <DialogContent>
          <DialogHeader className="items-center text-center">
            <CheckCircle2Icon className="size-14 text-link" />
            <DialogTitle className="text-2xl">Order #A-128 confirmed</DialogTitle>
            <DialogDescription>
              Total {money(total * 1.1)} · {dineIn === "dine-in" ? "Dine in" : "Take away"}. Please take your receipt and wait for your number.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="lg"
              onClick={() => {
                setPaid(false)
                setCart({})
              }}
            >
              Start a new order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
