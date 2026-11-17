import * as React from "react"
import {
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  CommandIcon,
  CopyIcon,
  FileTextIcon,
  KeyboardIcon,
  LayersIcon,
  PaletteIcon,
  RocketIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockFooter, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from "@/components/ui/code-block"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro", "Vite"]

/* ======================= Combobox ======================= */

export function ComboboxMultipleExample() {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple items={frameworks} defaultValue={["Next.js", "Astro"]}>
      <ComboboxChips ref={anchor} className="w-full max-w-sm">
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((v) => (
                <ComboboxChip key={v}>{v}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={values.length ? "" : "Select frameworks…"} aria-label="Frameworks" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxClearExample() {
  return (
    <Combobox items={frameworks} defaultValue="Remix">
      <ComboboxInput placeholder="Select a framework" showClear className="max-w-xs" aria-label="Framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxGroupsExample() {
  const groups = [
    { value: "Frontend", items: ["React", "Vue", "Svelte"] },
    { value: "Backend", items: ["Node.js", "Go", "Rust"] },
    { value: "Database", items: ["Postgres", "SQLite"] },
  ]
  return (
    <Combobox items={groups}>
      <ComboboxInput placeholder="Search technologies" className="max-w-xs" aria-label="Technology" />
      <ComboboxContent>
        <ComboboxEmpty>Nothing found.</ComboboxEmpty>
        <ComboboxList>
          {(group: { value: string; items: string[] }) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxPopupExample() {
  return (
    <Combobox items={frameworks} defaultValue="Astro">
      <ComboboxTrigger render={<Button variant="outline" className="w-52 justify-between font-normal" />}>
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxFieldExample() {
  const [value, setValue] = React.useState<string | null>(null)
  const invalid = value === null
  return (
    <Field className="max-w-xs" data-invalid={invalid}>
      <FieldLabel htmlFor="cb-field">Framework</FieldLabel>
      <Combobox items={frameworks} value={value} onValueChange={(v) => setValue(v as string | null)}>
        <ComboboxInput id="cb-field" placeholder="Select a framework" aria-invalid={invalid} />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {invalid ? <FieldError>Please choose a framework.</FieldError> : <FieldDescription>You picked {value}.</FieldDescription>}
    </Field>
  )
}

/* ======================= Navigation menu ======================= */

const guides = [
  ["Introduction", "Re-usable components built with Tailwind and Base UI.", BookOpenIcon],
  ["Installation", "How to install the registry and set up the theme.", RocketIcon],
  ["Theming", "Eight accent themes, light mode and your own colors.", PaletteIcon],
] as const

export function NavigationMenuRichExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-1">
              {guides.map(([t, d, Icon]) => (
                <li key={t}>
                  <NavigationMenuLink href="#" onClick={(e) => e.preventDefault()} className="flex-row items-start gap-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-link" />
                    <span>
                      <span className="block text-sm font-medium text-heading">{t}</span>
                      <span className="block text-xs text-muted-foreground">{d}</span>
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[26rem] grid-cols-2 gap-1 p-1">
              {[
                ["Alert Dialog", "A modal that interrupts for an important choice."],
                ["Hover Card", "A preview for sighted users."],
                ["Progress", "Shows completion of a task."],
                ["Tabs", "Layered sections of content."],
              ].map(([t, d]) => (
                <li key={t}>
                  <NavigationMenuLink href="#" onClick={(e) => e.preventDefault()}>
                    <span className="block text-sm font-medium text-heading">{t}</span>
                    <span className="block text-xs text-muted-foreground">{d}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" onClick={(e) => e.preventDefault()} className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function NavigationMenuLinksExample() {
  const [active, setActive] = React.useState("Overview")
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["Overview", "Analytics", "Reports", "Settings"].map((l) => (
          <NavigationMenuItem key={l}>
            <NavigationMenuLink
              href="#"
              active={active === l}
              onClick={(e) => {
                e.preventDefault()
                setActive(l)
              }}
              className={navigationMenuTriggerStyle()}
            >
              {l}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function NavigationMenuIconsExample() {
  const items = [
    ["Reports", "Charts and exports", BarChart3Icon],
    ["Security", "Sessions and keys", ShieldCheckIcon],
    ["Layers", "Environments", LayersIcon],
    ["Settings", "Workspace preferences", SettingsIcon],
  ] as const
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <SettingsIcon /> Workspace
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1 p-1">
              {items.map(([t, d, Icon]) => (
                <li key={t}>
                  <NavigationMenuLink href="#" onClick={(e) => e.preventDefault()} className="flex-row items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-sm bg-muted">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-heading">{t}</span>
                      <span className="block text-xs text-muted-foreground">{d}</span>
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ======================= Hover card ======================= */

export function HoverCardSidesExample() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline" size="sm" className="capitalize" />}>{side}</HoverCardTrigger>
          <HoverCardContent side={side} className="w-48 text-sm">
            Opens on the {side}.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

export function HoverCardLinkPreviewExample() {
  return (
    <p className="max-w-md text-sm leading-7">
      Read the{" "}
      <HoverCard>
        <HoverCardTrigger render={<a href="#/docs" className="font-medium text-link underline underline-offset-4" />}>documentation</HoverCardTrigger>
        <HoverCardContent className="w-72 p-0">
          <img src="https://picsum.photos/seed/docs-preview/480/240" alt="" loading="lazy" className="aspect-[2/1] w-full rounded-t-lg object-cover" />
          <div className="space-y-1 p-3">
            <h4 className="font-semibold text-heading">Malam UI documentation</h4>
            <p className="text-muted-foreground">Install, theme and extend the library.</p>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      before you start, and keep an eye on the changelog.
    </p>
  )
}

export function HoverCardDelayExample() {
  return (
    <HoverCard>
      <HoverCardTrigger delay={0} closeDelay={150} render={<Button variant="outline" />}>
        Opens instantly
      </HoverCardTrigger>
      <HoverCardContent className="w-60 text-sm">delay={"{0}"} removes the wait before opening.</HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardUserExample() {
  return (
    <div className="flex items-center gap-2 text-sm">
      Assigned to
      <HoverCard>
        <HoverCardTrigger render={<button type="button" className="flex items-center gap-1.5 rounded-xs font-medium text-heading outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
          <Avatar size="sm">
            <AvatarImage src="https://picsum.photos/seed/olivia-hc/64/64" alt="" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          Olivia Martin
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex items-start gap-3">
            <Avatar size="lg">
              <AvatarImage src="https://picsum.photos/seed/olivia-hc/96/96" alt="" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-semibold text-heading">Olivia Martin</h4>
              <p className="text-muted-foreground">Design lead. Maintains the theme tokens.</p>
              <Badge variant="success">Online</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

/* ======================= Kbd ======================= */

export function KbdGroupExample() {
  return (
    <div className="grid gap-3 text-sm">
      <div className="flex items-center gap-2">
        Save <KbdGroup><Kbd>Ctrl</Kbd><Kbd>S</Kbd></KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        Command palette <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        Close <Kbd>Esc</Kbd>
      </div>
    </div>
  )
}

export function KbdInButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline">
        <SaveIcon /> Save <Kbd>Ctrl S</Kbd>
      </Button>
      <Button variant="outline">
        <SearchIcon /> Search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </Button>
    </div>
  )
}

export function KbdTooltipExample() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Copy" />}>
        <CopyIcon />
      </TooltipTrigger>
      <TooltipContent>
        Copy <Kbd>Ctrl</Kbd> <Kbd>C</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

export function KbdShortcutListExample() {
  const rows = [
    ["Open command palette", ["⌘", "K"]],
    ["Toggle sidebar", ["Ctrl", "B"]],
    ["Search", ["/"]],
    ["Show shortcuts", ["Shift", "?"]],
  ] as const
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyboardIcon className="size-4 text-link" /> Keyboard shortcuts
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2.5">
        {rows.map(([label, keys]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span>{label}</span>
            <KbdGroup>
              {keys.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/* ======================= Label ======================= */

export function LabelCheckboxExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="lb-terms" />
      <Label htmlFor="lb-terms">Accept terms and conditions</Label>
    </div>
  )
}

export function LabelRequiredExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="lb-email">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="lb-email" type="email" required placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">Required fields are marked with an asterisk.</p>
    </div>
  )
}

export function LabelDisabledExample() {
  return (
    <div className="grid w-full max-w-sm gap-2 group" data-disabled>
      <Label htmlFor="lb-dis" className="opacity-50">
        Username (locked)
      </Label>
      <Input id="lb-dis" disabled defaultValue="malam" />
    </div>
  )
}

export function LabelWithIconExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="lb-notif" className="flex items-center gap-1.5">
        <BellIcon className="size-4 text-muted-foreground" /> Notification email
      </Label>
      <Input id="lb-notif" type="email" placeholder="alerts@example.com" />
    </div>
  )
}

/* ======================= Aspect ratio ======================= */

export function AspectRatioRatiosExample() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 items-end gap-3">
      {[
        ["1 / 1", 1],
        ["4 / 3", 4 / 3],
        ["16 / 9", 16 / 9],
      ].map(([label, ratio]) => (
        <figure key={label as string}>
          <AspectRatio ratio={ratio as number} className="overflow-hidden rounded-sm bg-muted">
            <img src={`https://picsum.photos/seed/ratio-${label}/480/480`} alt={`Photo cropped to ${label}`} loading="lazy" className="size-full object-cover" />
          </AspectRatio>
          <figcaption className="pt-1.5 text-center text-xs text-muted-foreground">{label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function AspectRatioPortraitExample() {
  return (
    <div className="w-40">
      <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-md bg-muted">
        <img src="https://picsum.photos/seed/portrait-3-4/300/400" alt="Portrait photo" loading="lazy" className="size-full object-cover" />
      </AspectRatio>
    </div>
  )
}

export function AspectRatioVideoExample() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-surface">
        <div className="grid size-full place-items-center bg-gradient-to-br from-primary/30 to-cta/20 text-muted-foreground">
          <span className="flex items-center gap-2 text-sm">
            <FileTextIcon className="size-5" /> Video or embed placeholder (16:9)
          </span>
        </div>
      </AspectRatio>
    </div>
  )
}

/* ======================= Code block ======================= */

const snippet = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="cta">Add to cart</Button>
}`

export function CodeBlockHeaderExample() {
  return (
    <CodeBlock className="max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>example.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={snippet} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{snippet}</CodeBlockContent>
    </CodeBlock>
  )
}

export function CodeBlockLineNumbersExample() {
  return (
    <CodeBlock className="max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>With line numbers</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={snippet} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{snippet}</CodeBlockContent>
    </CodeBlock>
  )
}

export function CodeBlockDiffExample() {
  return (
    <CodeBlock className="max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>components.json</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers={false}>
        <CodeBlockLine>{"{"}</CodeBlockLine>
        <CodeBlockLine variant="removed">{'  "registries": {}'}</CodeBlockLine>
        <CodeBlockLine variant="added">{'  "registries": { "@malam": "https://…/{name}.json" }'}</CodeBlockLine>
        <CodeBlockLine>{"}"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  )
}

export function CodeBlockFooterExample() {
  return (
    <CodeBlock className="max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>Terminal</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value="npx shadcn@latest add @malam/button" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap>{"npx shadcn@latest add @malam/button @malam/card @malam/dialog @malam/tabs @malam/table"}</CodeBlockContent>
      <CodeBlockFooter>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CommandIcon className="size-3.5" /> Run from your project root
          <ArrowRightIcon className="size-3.5" />
        </span>
      </CodeBlockFooter>
    </CodeBlock>
  )
}

export function CodeBlockHighlightedExample() {
  // useHighlightedCode tokenizes with Shiki (colors come from the --code-* tokens) and returns one node per line.
  const lines = useHighlightedCode(snippet, "tsx")
  return (
    <CodeBlock className="max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>Syntax highlighted</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={snippet} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, i) => (
          <CodeBlockLine key={i}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
