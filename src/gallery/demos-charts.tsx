import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const months = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 40 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 70 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 55 },
  { month: "Apr", desktop: 273, mobile: 190, tablet: 90 },
  { month: "May", desktop: 209, mobile: 130, tablet: 60 },
  { month: "Jun", desktop: 314, mobile: 240, tablet: 110 },
]

const deviceConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-4)" },
} satisfies ChartConfig

/* Area ------------------------------------------------------------------ */

export function AreaChartDemo() {
  return (
    <ChartContainer config={deviceConfig} className="h-60 w-full">
      <AreaChart data={months} margin={{ left: 4, right: 4 }}>
        <defs>
          {(["desktop", "mobile"] as const).map((k) => (
            <linearGradient key={k} id={`fill-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.55} />
              <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.03} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="mobile" type="natural" fill="url(#fill-mobile)" stroke="var(--color-mobile)" strokeWidth={2} stackId="a" />
        <Area dataKey="desktop" type="natural" fill="url(#fill-desktop)" stroke="var(--color-desktop)" strokeWidth={2} stackId="a" />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}

/* Line ------------------------------------------------------------------ */

export function LineChartDemo() {
  return (
    <ChartContainer config={deviceConfig} className="h-60 w-full">
      <LineChart data={months} margin={{ left: 4, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-desktop)" }} activeDot={{ r: 5 }} />
        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} strokeDasharray="5 4" />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

/* Bar: grouped, stacked, horizontal ---------------------------------------- */

export function BarChartDemo() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Grouped</p>
        <ChartContainer config={deviceConfig} className="h-52 w-full">
          <BarChart data={months}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={3} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={3} />
          </BarChart>
        </ChartContainer>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Stacked</p>
        <ChartContainer config={deviceConfig} className="h-52 w-full">
          <BarChart data={months}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 3, 3]} />
            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" />
            <Bar dataKey="tablet" stackId="a" fill="var(--color-tablet)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

const browsers = [
  { browser: "Chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "Safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "Firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "Edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "Other", visitors: 90, fill: "var(--color-other)" },
]
const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-4)" },
  edge: { label: "Edge", color: "var(--chart-5)" },
  other: { label: "Other", color: "var(--chart-3)" },
} satisfies ChartConfig

export function HorizontalBarChartDemo() {
  return (
    <ChartContainer config={browserConfig} className="h-56 w-full">
      <BarChart data={browsers} layout="vertical" margin={{ left: 8, right: 36 }}>
        <CartesianGrid horizontal={false} />
        <YAxis dataKey="browser" type="category" tickLine={false} axisLine={false} width={64} />
        <XAxis type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="visitors" radius={3}>
          <LabelList dataKey="visitors" position="right" className="fill-foreground" fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

/* Pie & donut ------------------------------------------------------------- */

export function PieChartDemo() {
  const total = React.useMemo(() => browsers.reduce((s, b) => s + b.visitors, 0), [])
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-1 text-center text-xs font-medium text-muted-foreground">Pie</p>
        <ChartContainer config={browserConfig} className="mx-auto aspect-square h-52">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={browsers} dataKey="visitors" nameKey="browser" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
          </PieChart>
        </ChartContainer>
      </div>
      <div>
        <p className="mb-1 text-center text-xs font-medium text-muted-foreground">Donut with total</p>
        <ChartContainer config={browserConfig} className="mx-auto aspect-square h-52">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={browsers} dataKey="visitors" nameKey="browser" innerRadius={58} strokeWidth={3}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-heading text-2xl font-bold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 22} className="fill-muted-foreground text-xs">
                        Visitors
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  )
}

/* Radar ------------------------------------------------------------------- */

const skills = [
  { skill: "Speed", a: 86, b: 62 },
  { skill: "Power", a: 72, b: 88 },
  { skill: "Defense", a: 64, b: 70 },
  { skill: "Magic", a: 90, b: 45 },
  { skill: "Stamina", a: 58, b: 80 },
  { skill: "Luck", a: 70, b: 55 },
]
const radarConfig = {
  a: { label: "Hero", color: "var(--chart-1)" },
  b: { label: "Rival", color: "var(--chart-4)" },
} satisfies ChartConfig

export function RadarChartDemo() {
  return (
    <ChartContainer config={radarConfig} className="mx-auto aspect-square h-64">
      <RadarChart data={skills}>
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <Radar dataKey="a" fill="var(--color-a)" fillOpacity={0.35} stroke="var(--color-a)" strokeWidth={2} />
        <Radar dataKey="b" fill="var(--color-b)" fillOpacity={0.25} stroke="var(--color-b)" strokeWidth={2} />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

/* Radial ------------------------------------------------------------------ */

const goals = [
  { name: "Revenue", value: 78, fill: "var(--color-revenue)" },
  { name: "Signups", value: 54, fill: "var(--color-signups)" },
  { name: "Retention", value: 91, fill: "var(--color-retention)" },
]
const goalConfig = {
  value: { label: "Progress" },
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  signups: { label: "Signups", color: "var(--chart-2)" },
  retention: { label: "Retention", color: "var(--chart-4)" },
} satisfies ChartConfig

export function RadialChartDemo() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-1 text-center text-xs font-medium text-muted-foreground">Radial bars</p>
        <ChartContainer config={goalConfig} className="mx-auto aspect-square h-56">
          <RadialBarChart data={goals} innerRadius={30} outerRadius={105} startAngle={90} endAngle={-270}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" background cornerRadius={6} />
          </RadialBarChart>
        </ChartContainer>
      </div>
      <div>
        <p className="mb-1 text-center text-xs font-medium text-muted-foreground">Gauge</p>
        <ChartContainer config={goalConfig} className="mx-auto aspect-square h-56">
          <RadialBarChart data={[{ name: "Retention", value: 72, fill: "var(--color-retention)" }]} startAngle={210} endAngle={-30} innerRadius={70} outerRadius={105}>
            <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[78, 62]} className="first:fill-muted last:fill-card" />
            <RadialBar dataKey="value" background cornerRadius={8} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-heading text-3xl font-bold">
                        72%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 22} className="fill-muted-foreground text-xs">
                        Retention
                      </tspan>
                    </text>
                  )
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

/* Scatter ----------------------------------------------------------------- */

const points = Array.from({ length: 28 }, (_, i) => ({
  hours: Math.round(2 + ((i * 37) % 48)),
  score: Math.round(38 + ((i * 53) % 58)),
  size: 40 + ((i * 29) % 160),
}))
const scatterConfig = { score: { label: "Score", color: "var(--chart-1)" } } satisfies ChartConfig

export function ScatterChartDemo() {
  return (
    <ChartContainer config={scatterConfig} className="h-60 w-full">
      <ScatterChart margin={{ left: 0, right: 12, top: 8 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="hours" name="Hours played" unit="h" tickLine={false} axisLine={false} />
        <YAxis type="number" dataKey="score" name="Score" tickLine={false} axisLine={false} width={32} />
        <ZAxis type="number" dataKey="size" range={[40, 200]} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
        <Scatter data={points} fill="var(--color-score)" fillOpacity={0.7} />
      </ScatterChart>
    </ChartContainer>
  )
}

/* Composed ---------------------------------------------------------------- */

const revenue = [
  { month: "Jan", revenue: 4200, growth: 4 },
  { month: "Feb", revenue: 5100, growth: 21 },
  { month: "Mar", revenue: 4800, growth: -6 },
  { month: "Apr", revenue: 6200, growth: 29 },
  { month: "May", revenue: 7000, growth: 13 },
  { month: "Jun", revenue: 8300, growth: 19 },
]
const composedConfig = {
  revenue: { label: "Revenue ($)", color: "var(--chart-1)" },
  growth: { label: "Growth (%)", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ComposedChartDemo() {
  return (
    <ChartContainer config={composedConfig} className="h-60 w-full">
      <ComposedChart data={revenue}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} width={40} />
        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" radius={3} />
        <Line yAxisId="right" dataKey="growth" type="monotone" stroke="var(--color-growth)" strokeWidth={2} dot={{ r: 3 }} />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}

/* Sparklines in stat cards ---------------------------------------------------- */

const spark = (seed: number) => Array.from({ length: 14 }, (_, i) => ({ i, v: 20 + Math.round(18 * Math.sin((i + seed) / 2) + i * seed * 0.6) }))
const sparkStats = [
  { label: "Active users", value: "12,480", delta: "+8.2%", seed: 2, color: "var(--chart-1)" },
  { label: "Conversion", value: "3.9%", delta: "+0.4%", seed: 3, color: "var(--chart-2)" },
  { label: "Avg. session", value: "4m 12s", delta: "-2.1%", seed: 1, color: "var(--chart-4)" },
]

export function SparklineDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {sparkStats.map((s) => (
        <Card key={s.label} size="sm">
          <CardHeader>
            <CardDescription>{s.label}</CardDescription>
            <CardTitle className="text-2xl group-data-[size=sm]/card:text-2xl">{s.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ v: { label: s.label, color: s.color } }} className="h-12 w-full">
              <AreaChart data={spark(s.seed)} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <Area dataKey="v" type="monotone" stroke="var(--color-v)" fill="var(--color-v)" fillOpacity={0.18} strokeWidth={2} dot={false} />
              </AreaChart>
            </ChartContainer>
            <p className="mt-2 text-xs text-muted-foreground">{s.delta} vs last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* Interactive area with a range filter -------------------------------------- */

const daily = Array.from({ length: 90 }, (_, i) => ({
  day: i + 1,
  desktop: Math.round(220 + 80 * Math.sin(i / 6) + i * 1.4),
  mobile: Math.round(160 + 60 * Math.cos(i / 8) + i * 0.9),
}))

const RANGE_ITEMS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
]

export function InteractiveAreaChartDemo() {
  const [range, setRange] = React.useState("30")
  const data = daily.slice(-Number(range))
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Showing the last {range} days</CardDescription>
        </div>
        <Select items={RANGE_ITEMS} value={range} onValueChange={(v) => v && setRange(v)}>
          <SelectTrigger size="sm" className="w-36" aria-label="Time range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={deviceConfig} className="h-56 w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fill-i-desktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.03} />
              </linearGradient>
              <linearGradient id="fill-i-mobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} tickFormatter={(v) => `Day ${v}`} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" labelFormatter={(v) => `Day ${v}`} />} />
            <Area dataKey="mobile" type="natural" fill="url(#fill-i-mobile)" stroke="var(--color-mobile)" strokeWidth={2} />
            <Area dataKey="desktop" type="natural" fill="url(#fill-i-desktop)" stroke="var(--color-desktop)" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
