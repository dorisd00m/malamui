import * as React from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BarChart3Icon,
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  DownloadIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", icon: LayoutDashboardIcon },
  { label: "Analytics", icon: BarChart3Icon },
  { label: "Orders", icon: PackageIcon },
  { label: "Customers", icon: UsersIcon },
  { label: "Billing", icon: CreditCardIcon },
  { label: "Settings", icon: SettingsIcon },
]

const stats = [
  { label: "Total revenue", value: "$45,231.89", delta: "+20.1%", up: true, hint: "vs last month", icon: DollarSignIcon },
  { label: "Subscriptions", value: "+2,350", delta: "+180.1%", up: true, hint: "vs last month", icon: UsersIcon },
  { label: "Sales", value: "+12,234", delta: "+19%", up: true, hint: "vs last month", icon: CreditCardIcon },
  { label: "Refund rate", value: "1.8%", delta: "-0.4%", up: false, hint: "vs last month", icon: PackageIcon },
]

const monthly = [
  { month: "Jan", revenue: 18600, orders: 8000 },
  { month: "Feb", revenue: 30500, orders: 12000 },
  { month: "Mar", revenue: 23700, orders: 9000 },
  { month: "Apr", revenue: 27300, orders: 14000 },
  { month: "May", revenue: 20900, orders: 11000 },
  { month: "Jun", revenue: 31400, orders: 16000 },
  { month: "Jul", revenue: 36200, orders: 17500 },
  { month: "Aug", revenue: 34100, orders: 18400 },
  { month: "Sep", revenue: 41800, orders: 21000 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-4)" },
} satisfies ChartConfig

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", initials: "OM" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", initials: "JL" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", initials: "IN" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", initials: "WK" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", initials: "SD" },
]

const orders = [
  { id: "#MLM-3210", customer: "Olivia Martin", status: "Paid", total: "$250.00", date: "Nov 14" },
  { id: "#MLM-3209", customer: "Ken Yamada", status: "Pending", total: "$150.00", date: "Nov 14" },
  { id: "#MLM-3208", customer: "Abe Nakamura", status: "Paid", total: "$350.00", date: "Nov 13" },
  { id: "#MLM-3207", customer: "Monserrat Ruiz", status: "Refunded", total: "$450.00", date: "Nov 12" },
  { id: "#MLM-3206", customer: "Silas Reed", status: "Paid", total: "$550.00", date: "Nov 11" },
]

const statusVariant = { Paid: "secondary", Pending: "outline", Refunded: "destructive" } as const

const goals = [
  { label: "Monthly revenue", value: 72, note: "$45.2k of $62k" },
  { label: "New customers", value: 54, note: "540 of 1,000" },
  { label: "Support SLA", value: 91, note: "91% within 4h" },
]

function Sidebar() {
  const [active, setActive] = React.useState("Overview")
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-header p-3 md:block">
      <p className="px-2 pt-1 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Workspace</p>
      <nav className="space-y-0.5" aria-label="Dashboard">
        {navItems.map((n) => (
          <button
            key={n.label}
            type="button"
            onClick={() => setActive(n.label)}
            aria-current={active === n.label ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              active === n.label && "bg-accent text-heading"
            )}
          >
            <n.icon className="size-4" />
            {n.label}
          </button>
        ))}
      </nav>
      <Card size="sm" className="mt-6">
        <CardHeader>
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>8 of 10 seats used</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={80} />
        </CardContent>
      </Card>
    </aside>
  )
}

export function DashboardDemo() {
  return (
    <>
      <div className="mx-auto flex overflow-hidden rounded-md border border-border bg-background shadow-panel">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-3">
            <InputGroup className="max-w-xs">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search…" />
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <BellIcon />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="sm" aria-label="Account menu" />}>
                  <Avatar size="sm">
                    <AvatarFallback>AX</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Axel</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-6 p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">Overview</h1>
                <p className="text-muted-foreground">Here is what is happening with your store today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Tabs defaultValue="30d">
                  <TabsList>
                    <TabsTrigger value="7d">7d</TabsTrigger>
                    <TabsTrigger value="30d">30d</TabsTrigger>
                    <TabsTrigger value="90d">90d</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button onClick={() => toast.add({ title: "Report exported", description: "overview-nov.csv is ready." })}>
                  <DownloadIcon /> Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <Card key={s.label} size="sm">
                  <CardHeader>
                    <CardDescription className="flex items-center justify-between">
                      {s.label}
                      <s.icon className="size-4" />
                    </CardDescription>
                    <CardTitle className="text-2xl group-data-[size=sm]/card:text-2xl">{s.value}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant={s.up ? "secondary" : "destructive"}>
                      {s.up ? <ArrowUpRightIcon /> : <ArrowDownRightIcon />}
                      {s.delta}
                    </Badge>
                    {s.hint}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Revenue and orders for the last 9 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart data={monthly} margin={{ left: 4, right: 4 }}>
                      <defs>
                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Area dataKey="orders" type="monotone" stroke="var(--color-orders)" fill="transparent" strokeWidth={2} />
                      <Area dataKey="revenue" type="monotone" stroke="var(--color-revenue)" fill="url(#fillRevenue)" strokeWidth={2} />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sales.map((s) => (
                    <div key={s.email} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{s.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-heading">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                      </div>
                      <span className="text-sm font-medium text-heading">{s.amount}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>Recent orders</CardTitle>
                  <CardDescription>Latest transactions from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow key={o.id}>
                          <TableCell className="font-medium text-heading">{o.id}</TableCell>
                          <TableCell>
                            {o.customer}
                            <span className="block text-xs text-muted-foreground">{o.date}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[o.status as keyof typeof statusVariant]}>{o.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{o.total}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${o.id}`} />}>
                                <MoreHorizontalIcon />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View order</DropdownMenuItem>
                                <DropdownMenuItem>Download invoice</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Refund</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                  <CardDescription>Progress toward this month's targets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {goals.map((g) => (
                    <div key={g.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-heading">{g.label}</span>
                        <span className="text-xs text-muted-foreground">{g.note}</span>
                      </div>
                      <Progress value={g.value} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
