import * as React from "react"
import { CircleCheckIcon, InboxIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CodeBlock, CodeBlockContent, CodeBlockHeader, CodeBlockTitle } from "@/components/ui/code-block"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccordionDemo() {
  return (
    <Accordion className="max-w-md" defaultValue={["a"]}>
      {[
        ["a", "Is it themeable?", "Yes. Switch themes from the toolbar; every token is a CSS variable."],
        ["b", "Is it accessible?", "Built on Base UI primitives with keyboard support."],
        ["c", "Can I copy it?", "Components live in your repo via the shadcn registry."],
      ].map(([v, t, d]) => (
        <AccordionItem key={v} value={v}>
          <AccordionTrigger>{t}</AccordionTrigger>
          <AccordionContent>{d}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AlertDemo() {
  return (
    <div className="grid max-w-md gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Your wallet balance is running low.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Your receipt is on its way.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Card expires soon</AlertTitle>
        <AlertDescription>Update it before the next billing date.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check your card details and retry.</AlertDescription>
      </Alert>
    </div>
  )
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Ironveil Tactics</CardTitle>
        <CardDescription>Turn-based strategy · Very Positive</CardDescription>
      </CardHeader>
      <CardContent>Command a mercenary company across a shattered continent.</CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Add to cart</Button>
        <Button size="sm" variant="secondary">
          Wishlist
        </Button>
      </CardFooter>
    </Card>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="new" className="max-w-md">
      <TabsList>
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="top">Top Sellers</TabsTrigger>
        <TabsTrigger value="specials">Specials</TabsTrigger>
      </TabsList>
      <TabsContent value="new">Fresh releases from this week.</TabsContent>
      <TabsContent value="top">What everyone is playing.</TabsContent>
      <TabsContent value="specials">Limited-time discounts.</TabsContent>
    </Tabs>
  )
}

export function TableDemo() {
  return (
    <Table className="max-w-lg">
      <TableCaption>Recent purchases</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["Lantern Hollow", "Installed", "$14.99"],
          ["Starward Drift", "Owned", "Free"],
          ["Deep Orbit", "Wishlist", "$16.74"],
        ].map(([g, s, p]) => (
          <TableRow key={g}>
            <TableCell>{g}</TableCell>
            <TableCell>{s}</TableCell>
            <TableCell className="text-right">{p}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function ProgressDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <Progress value={30} />
      <Progress value={72} />
    </div>
  )
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  )
}

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Spinner /> Loading…
    </div>
  )
}

export function SeparatorDemo() {
  return (
    <div className="max-w-xs">
      <p className="text-sm font-medium text-heading">Malam UI</p>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  )
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-40 w-56 rounded-sm border p-3">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="py-1 text-sm">
          Library item {i + 1}
        </div>
      ))}
    </ScrollArea>
  )
}

export function CollapsibleDemo() {
  return (
    <Collapsible className="max-w-sm">
      <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>Toggle details</CollapsibleTrigger>
      <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
        Hidden details revealed on demand.
      </CollapsibleContent>
    </Collapsible>
  )
}

export function AspectRatioDemo() {
  return (
    <div className="w-64">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-sm bg-panel text-sm text-muted-foreground">
        16 : 9
      </AspectRatio>
    </div>
  )
}

export function CarouselDemo() {
  return (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4].map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center rounded-sm bg-panel text-3xl font-semibold text-heading">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}

export function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-sm border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-28 items-center justify-center text-sm">One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-28 items-center justify-center text-sm">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function EmptyDemo() {
  return (
    <Empty className="max-w-sm border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>Nothing here yet</EmptyTitle>
        <EmptyDescription>Games you add to your wishlist will show up here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export function ItemDemo() {
  return (
    <Item variant="outline" className="max-w-sm">
      <ItemMedia>
        <Avatar>
          <AvatarFallback>LH</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Lantern Hollow</ItemTitle>
        <ItemDescription>Cozy adventure · 120k reviews</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export function CodeBlockDemo() {
  return (
    <CodeBlock className="max-w-md">
      <CodeBlockHeader>
        <CodeBlockTitle>theme.tsx</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>
        <pre className="p-3 text-xs">{`<ThemeProvider defaultTheme="ocean">\n  <App />\n</ThemeProvider>`}</pre>
      </CodeBlockContent>
    </CodeBlock>
  )
}

const chartData = [
  { month: "Jan", sales: 186, refunds: 80 },
  { month: "Feb", sales: 305, refunds: 200 },
  { month: "Mar", sales: 237, refunds: 120 },
  { month: "Apr", sales: 273, refunds: 190 },
  { month: "May", sales: 209, refunds: 130 },
]
const chartConfig = {
  sales: { label: "Sales", color: "var(--chart-1)" },
  refunds: { label: "Refunds", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-52 w-full max-w-lg">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={3} />
        <Bar dataKey="refunds" fill="var(--color-refunds)" radius={3} />
      </BarChart>
    </ChartContainer>
  )
}

export const _react = React
