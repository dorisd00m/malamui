import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  BoldIcon,
  ItalicIcon,
  LayoutGridIcon,
  ListIcon,
  MoreHorizontalIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UnderlineIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DirectionProvider } from "@/components/ui/direction"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/* ======================= Switch ======================= */

export function SwitchDescriptionExample() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="sw-2fa">Two-factor authentication</FieldLabel>
        <FieldDescription>Require a code from your authenticator app when signing in.</FieldDescription>
      </FieldContent>
      <Switch id="sw-2fa" />
    </Field>
  )
}

export function SwitchChoiceCardExample() {
  return (
    <div className="grid max-w-md gap-3">
      {[
        ["share", "Share across devices", "Focus is shared across devices and turns off when you leave.", true],
        ["notify", "Notifications", "Receive notifications when focus mode is enabled or disabled.", false],
      ].map(([id, title, desc, on]) => (
        <FieldLabel key={id as string} htmlFor={`swc-${id}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{title as string}</FieldTitle>
              <FieldDescription>{desc as string}</FieldDescription>
            </FieldContent>
            <Switch id={`swc-${id}`} defaultChecked={on as boolean} />
          </Field>
        </FieldLabel>
      ))}
    </div>
  )
}

export function SwitchInvalidExample() {
  const [on, setOn] = React.useState(false)
  return (
    <Field orientation="horizontal" data-invalid={!on} className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="sw-terms">Accept the terms</FieldLabel>
        {!on && <FieldError>You must accept the terms to continue.</FieldError>}
      </FieldContent>
      <Switch id="sw-terms" checked={on} onCheckedChange={setOn} aria-invalid={!on} />
    </Field>
  )
}

export function SwitchCardFormExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>Choose what lands in your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[
          ["Communication emails", "Receive emails about your account activity.", true],
          ["Marketing emails", "Receive emails about new products and features.", false],
          ["Security emails", "Receive emails about your account security.", true],
        ].map(([t, d, on]) => (
          <div key={t as string} className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor={`swf-${t}`}>{t as string}</Label>
              <p className="text-sm text-muted-foreground">{d as string}</p>
            </div>
            <Switch id={`swf-${t}`} defaultChecked={on as boolean} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save preferences</Button>
      </CardFooter>
    </Card>
  )
}

export function SwitchControlledExample() {
  const [airplane, setAirplane] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Switch id="sw-air" checked={airplane} onCheckedChange={setAirplane} />
      <Label htmlFor="sw-air">Airplane mode is {airplane ? "on" : "off"}</Label>
    </div>
  )
}

export function SwitchThemeExample() {
  const [dark, setDark] = React.useState(true)
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <SunIcon className="size-4" />
      <Switch checked={dark} onCheckedChange={setDark} aria-label="Dark mode" />
      <MoonIcon className="size-4" />
      <span className="ml-1 text-sm">{dark ? "Dark" : "Light"}</span>
    </div>
  )
}

/* ======================= Table ======================= */

type Invoice = { id: string; customer: string; status: "Paid" | "Pending" | "Failed"; amount: number }
const invoices: Invoice[] = [
  { id: "INV-1001", customer: "Olivia Martin", status: "Paid", amount: 250 },
  { id: "INV-1002", customer: "Jackson Lee", status: "Pending", amount: 150 },
  { id: "INV-1003", customer: "Isabella Nguyen", status: "Paid", amount: 350 },
  { id: "INV-1004", customer: "William Kim", status: "Failed", amount: 450 },
  { id: "INV-1005", customer: "Sofia Davis", status: "Paid", amount: 550 },
  { id: "INV-1006", customer: "Liam Chen", status: "Pending", amount: 200 },
  { id: "INV-1007", customer: "Emma Wilson", status: "Paid", amount: 300 },
  { id: "INV-1008", customer: "Noah Brown", status: "Paid", amount: 125 },
]
const statusVariant = { Paid: "success", Pending: "warning", Failed: "destructive" } as const

export function TableActionsExample() {
  return (
    <Table className="max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 4).map((i) => (
          <TableRow key={i.id}>
            <TableCell className="font-medium text-heading">{i.id}</TableCell>
            <TableCell>{i.customer}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[i.status]}>{i.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${i.amount.toFixed(2)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${i.id}`} />}>
                  <MoreHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy invoice ID</DropdownMenuItem>
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Refund</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TableSortableExample() {
  const [key, setKey] = React.useState<"customer" | "amount">("amount")
  const [dir, setDir] = React.useState<"asc" | "desc">("desc")
  const rows = [...invoices].sort((a, b) => {
    const r = key === "amount" ? a.amount - b.amount : a.customer.localeCompare(b.customer)
    return dir === "asc" ? r : -r
  })
  const toggle = (k: typeof key) => {
    if (k === key) setDir((d) => (d === "asc" ? "desc" : "asc"))
    else {
      setKey(k)
      setDir("asc")
    }
  }
  const Sort = ({ k, children }: { k: typeof key; children: React.ReactNode }) => (
    <Button variant="ghost" size="sm" className="-ml-2.5" onClick={() => toggle(k)} aria-label={`Sort by ${k}`}>
      {children}
      {key === k ? dir === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon /> : <ArrowUpDownIcon className="opacity-50" />}
    </Button>
  )
  return (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead aria-sort={key === "customer" ? (dir === "asc" ? "ascending" : "descending") : "none"}>
            <Sort k="customer">Customer</Sort>
          </TableHead>
          <TableHead className="text-right" aria-sort={key === "amount" ? (dir === "asc" ? "ascending" : "descending") : "none"}>
            <Sort k="amount">Amount</Sort>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.slice(0, 5).map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.customer}</TableCell>
            <TableCell className="text-right">${r.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TableSearchPaginationExample() {
  const [q, setQ] = React.useState("")
  const [page, setPage] = React.useState(1)
  const perPage = 3
  const filtered = invoices.filter((i) => i.customer.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase()))
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const rows = filtered.slice((current - 1) * perPage, current * perPage)
  return (
    <div className="grid max-w-lg gap-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          placeholder="Filter invoices…"
          aria-label="Filter invoices"
          className="pl-8"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium text-heading">{r.id}</TableCell>
              <TableCell>{r.customer}</TableCell>
              <TableCell className="text-right">${r.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="py-6 text-center text-muted-foreground">
                No invoices match “{q}”.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, current - 1)) }} />
          </PaginationItem>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink href="#" isActive={n === current} onClick={(e) => { e.preventDefault(); setPage(n) }}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(pages, current + 1)) }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export function TableStickyHeaderExample() {
  return (
    <div className="max-h-56 max-w-md overflow-auto rounded-sm border border-border">
      <Table>
        <TableHeader className="sticky top-0 bg-card">
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...invoices, ...invoices].map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.customer}</TableCell>
              <TableCell className="text-right">${r.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TableUsersExample() {
  const users = [
    ["Olivia Martin", "olivia@example.com", "Admin", "Active"],
    ["Jackson Lee", "jackson@example.com", "Editor", "Active"],
    ["Isabella Nguyen", "isabella@example.com", "Viewer", "Invited"],
  ]
  return (
    <Table className="max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(([name, email, role, status]) => (
          <TableRow key={email}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarImage src={`https://picsum.photos/seed/${name}/64/64`} alt="" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-heading">{name}</div>
                  <div className="text-xs text-muted-foreground">{email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>
              <Badge variant={status === "Active" ? "success" : "outline"}>{status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/* ======================= Toggle ======================= */

export function ToggleSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle size="sm" variant="outline" aria-label="Small">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Default">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Large">
        <BoldIcon />
      </Toggle>
    </div>
  )
}

export function ToggleWithTextExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Toggle italic">
        <ItalicIcon /> Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <UnderlineIcon /> Underline
      </Toggle>
    </div>
  )
}

export function ToggleControlledExample() {
  const [bold, setBold] = React.useState(false)
  const [italic, setItalic] = React.useState(false)
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <Toggle variant="outline" pressed={bold} onPressedChange={setBold} aria-label="Bold">
          <BoldIcon />
        </Toggle>
        <Toggle variant="outline" pressed={italic} onPressedChange={setItalic} aria-label="Italic">
          <ItalicIcon />
        </Toggle>
      </div>
      <p className="rounded-sm border border-border p-3 text-sm text-muted-foreground" style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal" }}>
        This sample text reflects the toggles above.
      </p>
    </div>
  )
}

export function ToggleDisabledExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle disabled aria-label="Disabled">
        <BoldIcon />
      </Toggle>
      <Toggle disabled defaultPressed variant="outline" aria-label="Disabled pressed">
        <BoldIcon /> Pressed
      </Toggle>
    </div>
  )
}

/* ======================= Toggle group ======================= */

export function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupOutlineExample() {
  return (
    <ToggleGroup variant="outline" multiple aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupSizesExample() {
  return (
    <div className="grid gap-3">
      {(["sm", "default", "lg"] as const).map((s) => (
        <ToggleGroup key={s} size={s} variant="outline" defaultValue={["a"]} aria-label={`Size ${s}`}>
          <ToggleGroupItem value="a">Day</ToggleGroupItem>
          <ToggleGroupItem value="b">Week</ToggleGroupItem>
          <ToggleGroupItem value="c">Month</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  )
}

export function ToggleGroupSpacedExample() {
  return (
    <ToggleGroup variant="outline" spacing={2} defaultValue={["list"]} aria-label="View">
      <ToggleGroupItem value="list">
        <ListIcon /> List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <LayoutGridIcon /> Grid
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupVerticalExample() {
  return (
    <ToggleGroup orientation="vertical" variant="outline" defaultValue={["b"]} aria-label="Vertical">
      <ToggleGroupItem value="a">Top</ToggleGroupItem>
      <ToggleGroupItem value="b">Middle</ToggleGroupItem>
      <ToggleGroupItem value="c">Bottom</ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupDisabledExample() {
  const [view, setView] = React.useState<string[]>(["grid"])
  return (
    <div className="grid gap-3">
      <ToggleGroup variant="outline" value={view} onValueChange={(v) => v.length && setView(v)} aria-label="Layout">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="board" disabled>
          Board
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">Selected: {view[0]}</p>
    </div>
  )
}

/* ======================= Scroll area ======================= */

export function ScrollAreaTagsExample() {
  const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0-beta.${i + 1}`)
  return (
    <ScrollArea className="h-56 w-56 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-semibold text-heading">Releases</h4>
        {tags.map((t) => (
          <React.Fragment key={t}>
            <div className="text-sm">{t}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

export function ScrollAreaGalleryExample() {
  return (
    <ScrollArea className="w-full max-w-md rounded-md border border-border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 8 }, (_, i) => (
          <figure key={i} className="shrink-0">
            <img
              src={`https://picsum.photos/seed/scroll-${i}/300/400`}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              className="aspect-[3/4] h-40 rounded-sm object-cover"
            />
            <figcaption className="pt-2 text-xs text-muted-foreground">Photo {i + 1}</figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export function ScrollAreaBothExample() {
  return (
    <ScrollArea className="h-48 w-full max-w-md rounded-md border border-border">
      <div className="w-[640px] p-4">
        <table className="w-full text-sm">
          <tbody>
            {Array.from({ length: 16 }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: 6 }, (_, c) => (
                  <td key={c} className="border border-border px-3 py-1.5">
                    R{r + 1} C{c + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export function ScrollAreaTabsExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <ScrollArea className="w-full">
        <Tabs defaultValue="t1">
          <TabsList>
            {Array.from({ length: 10 }, (_, i) => (
              <TabsTrigger key={i} value={`t${i + 1}`}>
                Tab {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

/* ======================= Direction ======================= */

export function DirectionDemo() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {(["ltr", "rtl"] as const).map((dir) => (
        <DirectionProvider key={dir} direction={dir}>
          <div dir={dir} className="rounded-md border border-border bg-card p-4">
            <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{dir}</p>
            <h4 className="font-semibold text-heading">{dir === "rtl" ? "مرحبا بك" : "Welcome"}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{dir === "rtl" ? "هذا مثال على التخطيط من اليمين إلى اليسار." : "This is an example of a left-to-right layout."}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm">{dir === "rtl" ? "ابدأ" : "Start"}</Button>
              <Button size="sm" variant="outline">{dir === "rtl" ? "إلغاء" : "Cancel"}</Button>
            </div>
          </div>
        </DirectionProvider>
      ))}
    </div>
  )
}
