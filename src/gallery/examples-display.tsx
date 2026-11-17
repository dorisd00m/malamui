import * as React from "react"
import {
  BellIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  FolderIcon,
  InboxIcon,
  InfoIcon,
  MailIcon,
  PackageIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DatePicker, DateRangePicker, type DateRange } from "@/components/ui/date-picker"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item"
import { Kbd } from "@/components/ui/kbd"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Rating } from "@/components/ui/rating"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Blockquote, H1, H2, H3, H4, InlineCode, Large, Lead, List, Muted, P, Prose, Small } from "@/components/ui/typography"

/* ======================= New components: main demos ======================= */

export function RatingDemo() {
  const [v, setV] = React.useState(4)
  return (
    <div className="flex items-center gap-3">
      <Rating value={v} onValueChange={setV} aria-label="Rate this product" />
      <span className="text-sm text-muted-foreground">{v ? `${v} out of 5` : "Not rated"}</span>
    </div>
  )
}

export function DatePickerDemo() {
  const [d, setD] = React.useState<Date | undefined>()
  return <DatePicker value={d} onValueChange={setD} />
}

export function DateRangePickerDemo() {
  const [r, setR] = React.useState<DateRange | undefined>()
  return <DateRangePicker value={r} onValueChange={setR} presets />
}

/* ======================= Typography ======================= */

export function TypographyDemo() {
  return (
    <article className="max-w-2xl">
      <H1>Taxing laughter: the joke tax chronicles</H1>
      <Lead className="mt-4">Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.</Lead>
      <H2 className="mt-10">The king&apos;s plan</H2>
      <P>
        The king thought long and hard, and finally came up with <InlineCode>a brilliant plan</InlineCode>: he would tax the jokes in the kingdom.
      </P>
      <Blockquote>&ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so it&apos;s only fair that they should pay for the privilege.&rdquo;</Blockquote>
      <H3 className="mt-8">The joke tax</H3>
      <P>The king&apos;s subjects were not amused. They grumbled and complained, but the king was firm.</P>
      <List>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners: 20 gold coins</li>
      </List>
    </article>
  )
}

export function TypographyHeadingsExample() {
  return (
    <div className="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
    </div>
  )
}

export function TypographyTextExample() {
  return (
    <div className="space-y-4">
      <Lead>Lead: an introductory paragraph, a little larger and softer.</Lead>
      <P>Paragraph: body copy at a comfortable 7-unit line height for long reading.</P>
      <Large>Large: emphasis for short phrases</Large>
      <Small>Small: fine print and labels</Small>
      <Muted>Muted: secondary information and helper text</Muted>
    </div>
  )
}

export function TypographyBlockquoteListExample() {
  return (
    <div className="max-w-xl">
      <Blockquote>Design is not just what it looks like and feels like. Design is how it works.</Blockquote>
      <List>
        <li>Unordered item one</li>
        <li>Unordered item two</li>
      </List>
      <List ordered>
        <li>Ordered first</li>
        <li>Ordered second</li>
        <li>Ordered third</li>
      </List>
    </div>
  )
}

export function TypographyInlineExample() {
  return (
    <P className="max-w-xl">
      Install with <InlineCode>npx shadcn@latest add @malam/button</InlineCode>, then press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to open the command
      palette. Press <Kbd>Esc</Kbd> to close it.
    </P>
  )
}

export function TypographyProseExample() {
  const html = `
    <h2>Article from a CMS</h2>
    <p>This content is <strong>raw HTML</strong>, so there are no components to style each element. <code>Prose</code> does it for you.</p>
    <blockquote>Good defaults beat endless configuration.</blockquote>
    <ul><li>Headings, lists and quotes</li><li>Inline <code>code</code> and <a href="#">links</a></li></ul>
    <table><thead><tr><th>Plan</th><th>Price</th></tr></thead><tbody><tr><td>Hobby</td><td>$0</td></tr><tr><td>Pro</td><td>$24</td></tr></tbody></table>
  `
  return <Prose className="max-w-xl" dangerouslySetInnerHTML={{ __html: html }} />
}

/* ======================= Tabs ======================= */

export function TabsLineExample() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
        Change your password here.
      </TabsContent>
      <TabsContent value="billing" className="pt-3 text-sm text-muted-foreground">
        Manage invoices and payment methods.
      </TabsContent>
    </Tabs>
  )
}

export function TabsIconsExample() {
  return (
    <Tabs defaultValue="inbox">
      <TabsList>
        <TabsTrigger value="inbox">
          <InboxIcon /> Inbox
        </TabsTrigger>
        <TabsTrigger value="people">
          <UsersIcon /> People
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon /> Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsVerticalExample() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="flex gap-6">
      <TabsList variant="line" className="h-fit flex-col items-stretch">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="text-sm text-muted-foreground">
        <TabsContent value="general">General preferences for your workspace.</TabsContent>
        <TabsContent value="security">Two-factor authentication and sessions.</TabsContent>
        <TabsContent value="notifications">Choose what you hear about.</TabsContent>
      </div>
    </Tabs>
  )
}

export function TabsCardsExample() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel htmlFor="tc-name">Name</FieldLabel>
              <Input id="tc-name" defaultValue="Malam Player" />
            </Field>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel htmlFor="tc-pw">New password</FieldLabel>
              <Input id="tc-pw" type="password" />
            </Field>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

/* ======================= Card ======================= */

export function CardFormExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Field>
          <FieldLabel htmlFor="cf-name">Name</FieldLabel>
          <Input id="cf-name" placeholder="Name of your project" />
        </Field>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}

export function CardActionExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        {["Your call has been confirmed.", "You have a new message.", "Your subscription is expiring soon."].map((t) => (
          <div key={t} className="flex items-center gap-3 text-sm">
            <span className="size-2 rounded-full bg-primary" /> {t}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function CardMediaExample() {
  return (
    <Card className="w-full max-w-sm pt-0">
      <img src="https://picsum.photos/seed/night-city/640/360" alt="City at night" loading="lazy" className="aspect-video w-full object-cover" />
      <CardHeader>
        <CardTitle>Night in the city</CardTitle>
        <CardDescription>A short photo essay on after-dark light.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Badge variant="outline">12 min read</Badge>
      </CardFooter>
    </Card>
  )
}

/* ======================= Badge, avatar, alert ======================= */

export function BadgeIconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">
        <CheckIcon /> Verified
      </Badge>
      <Badge variant="info">
        <InfoIcon /> Beta
      </Badge>
      <Badge variant="secondary">
        <BellIcon /> 8 alerts
      </Badge>
    </div>
  )
}

export function BadgeCountExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="relative inline-flex">
        <Button variant="outline" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Badge className="absolute -top-2 -right-2 h-5 min-w-5 justify-center rounded-full px-1">3</Badge>
      </span>
      <Button variant="outline">
        Inbox <Badge variant="secondary">128</Badge>
      </Button>
    </div>
  )
}

export function BadgeLinkExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge render={<a href="#/components/badge" />}>Open the Badge docs</Badge>
      <Badge variant="outline" render={<a href="#/components/all" />}>
        All components
      </Badge>
    </div>
  )
}

export function AvatarSizesExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarImage src="https://picsum.photos/seed/avatar-sm/128/128" alt="" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://picsum.photos/seed/avatar-md/128/128" alt="" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://picsum.photos/seed/avatar-lg/128/128" alt="" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function AvatarBadgeExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://picsum.photos/seed/olivia-martin/128/128" alt="" />
        <AvatarFallback>OM</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://picsum.photos/seed/jackson-lee/128/128" alt="" />
        <AvatarFallback>JL</AvatarFallback>
        <AvatarBadge className="bg-warning" />
      </Avatar>
    </div>
  )
}

export function AvatarGroupCountExample() {
  return (
    <AvatarGroup>
      {["AB", "CD", "EF", "GH"].map((i) => (
        <Avatar key={i}>
          <AvatarImage src={`https://picsum.photos/seed/${i}/96/96`} alt="" />
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+12</AvatarGroupCount>
    </AvatarGroup>
  )
}

export function AlertActionExample() {
  return (
    <div className="grid max-w-lg gap-3">
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>A new version is ready to install.</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            Update
          </Button>
        </AlertAction>
      </Alert>
      <Alert>
        <AlertTitle>Plain alert without an icon</AlertTitle>
        <AlertDescription>Icons are optional; the layout adapts.</AlertDescription>
      </Alert>
    </div>
  )
}

/* ======================= Accordion, collapsible ======================= */

export function AccordionMultipleExample() {
  return (
    <Accordion multiple defaultValue={["a", "b"]} className="max-w-md">
      {[
        ["a", "Can several be open?", "Yes. Use the multiple prop and pass an array to defaultValue."],
        ["b", "Is it keyboard friendly?", "Arrow keys move between triggers, Enter toggles."],
        ["c", "Can I style it?", "Everything is Tailwind classes on tokens."],
      ].map(([v, t, d]) => (
        <AccordionItem key={v} value={v}>
          <AccordionTrigger>{t}</AccordionTrigger>
          <AccordionContent>{d}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionControlledExample() {
  const [value, setValue] = React.useState<string[]>(["one"])
  return (
    <div className="max-w-md space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue(["one"])}>
          Open first
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue([])}>
          Close all
        </Button>
      </div>
      <Accordion value={value} onValueChange={setValue}>
        <AccordionItem value="one">
          <AccordionTrigger>First section</AccordionTrigger>
          <AccordionContent>Controlled from the buttons above.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Second section</AccordionTrigger>
          <AccordionContent>Only one is open at a time by default.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export function CollapsibleListExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-heading">3 repositories starred</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Toggle" />}>
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-sm border border-border px-3 py-2 text-sm">malam-ui/core</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-sm border border-border px-3 py-2 text-sm">malam-ui/charts</div>
        <div className="rounded-sm border border-border px-3 py-2 text-sm">malam-ui/skill</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ======================= Table ======================= */

export function TableFooterExample() {
  const rows = [
    ["INV-001", "Paid", 250],
    ["INV-002", "Pending", 150],
    ["INV-003", "Paid", 350],
  ] as const
  return (
    <Table className="max-w-lg">
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([id, s, a]) => (
          <TableRow key={id}>
            <TableCell className="font-medium text-heading">{id}</TableCell>
            <TableCell>
              <Badge variant={s === "Paid" ? "success" : "warning"}>{s}</Badge>
            </TableCell>
            <TableCell className="text-right">${a.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${rows.reduce((s, r) => s + r[2], 0).toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export function TableSelectableExample() {
  const people = ["Olivia Martin", "Jackson Lee", "Isabella Nguyen"]
  const [sel, setSel] = React.useState<string[]>(["Jackson Lee"])
  return (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              aria-label="Select all"
              checked={sel.length === people.length}
              indeterminate={sel.length > 0 && sel.length < people.length}
              onCheckedChange={(v) => setSel(v ? people : [])}
            />
          </TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((p) => (
          <TableRow key={p} data-state={sel.includes(p) ? "selected" : undefined}>
            <TableCell>
              <Checkbox aria-label={`Select ${p}`} checked={sel.includes(p)} onCheckedChange={(v) => setSel((s) => (v ? [...s, p] : s.filter((x) => x !== p)))} />
            </TableCell>
            <TableCell>{p}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/* ======================= Progress, skeleton, spinner ======================= */

export function ProgressLabelExample() {
  return (
    <div className="grid max-w-sm gap-5">
      <Progress value={62}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Complete</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}

export function ProgressAnimatedExample() {
  const [v, setV] = React.useState(12)
  React.useEffect(() => {
    const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 8)), 600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="max-w-sm">
      <Progress value={v} aria-label="Loading" />
    </div>
  )
}

export function SkeletonCardExample() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function SkeletonListExample() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SpinnerSizesExample() {
  return (
    <div className="flex items-center gap-5 text-muted-foreground">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8 text-link" />
      <span className="flex items-center gap-2 text-sm">
        <Spinner /> Syncing…
      </span>
    </div>
  )
}

/* ======================= Layout ======================= */

export function ScrollAreaHorizontalExample() {
  return (
    <ScrollArea className="w-full max-w-md rounded-sm border border-border">
      <div className="flex w-max gap-3 p-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="grid h-24 w-32 shrink-0 place-items-center rounded-sm bg-muted text-sm">
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export function SeparatorInlineExample() {
  return (
    <div className="max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-heading">Malam UI</h4>
        <p className="text-sm text-muted-foreground">An open-source UI library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  )
}

export function CarouselMultipleExample() {
  return (
    <Carousel className="mx-auto w-full max-w-md" opts={{ align: "start" }}>
      <CarouselContent>
        {Array.from({ length: 7 }, (_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <img src={`https://picsum.photos/seed/multi-${i}/400/400`} alt={`Photo ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-sm object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function CarouselVerticalExample() {
  return (
    <div className="px-12 py-10">
      <Carousel orientation="vertical" className="mx-auto w-full max-w-xs" opts={{ align: "start" }}>
        <CarouselContent className="h-48">
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i} className="basis-1/2">
              <img src={`https://picsum.photos/seed/vertical-${i}/480/240`} alt={`Photo ${i + 1}`} loading="lazy" className="size-full rounded-sm object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export function CarouselDotsExample() {
  return (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 4 }, (_, i) => (
          <CarouselItem key={i}>
            <img src={`https://picsum.photos/seed/dots-${i}/640/360`} alt={`Photo ${i + 1}`} loading="lazy" className="aspect-video w-full rounded-sm object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}

export function ResizableVerticalExample() {
  return (
    <ResizablePanelGroup orientation="vertical" className="h-64 max-w-md rounded-sm border border-border">
      <ResizablePanel defaultSize={30}>
        <div className="grid h-full place-items-center text-sm">Header</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className="grid h-full place-items-center text-sm">Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function ResizableNestedExample() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-64 max-w-lg rounded-sm border border-border">
      <ResizablePanel defaultSize={30}>
        <div className="grid h-full place-items-center text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="grid h-full place-items-center text-sm">Editor</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="grid h-full place-items-center text-sm">Terminal</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

/* ======================= Empty, item ======================= */

export function EmptyActionExample() {
  return (
    <Empty className="max-w-sm border border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Get started by creating your first project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <PlusIcon /> Create project
          </Button>
          <Button variant="outline">Import</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export function ItemVariantsExample() {
  return (
    <ItemGroup className="max-w-md">
      {[
        ["Inbox zero", "You are all caught up.", MailIcon],
        ["Order shipped", "Arrives Thursday.", PackageIcon],
        ["Team invite", "Join the Design workspace.", UserIcon],
      ].map(([t, d, I], i, all) => {
        const Icon = I as typeof MailIcon
        return (
          <React.Fragment key={t as string}>
            <Item>
              <ItemMedia variant="icon">
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{t as string}</ItemTitle>
                <ItemDescription>{d as string}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </ItemActions>
            </Item>
            {i < all.length - 1 && <ItemSeparator />}
          </React.Fragment>
        )
      })}
    </ItemGroup>
  )
}
