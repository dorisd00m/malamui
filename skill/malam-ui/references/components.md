# Malam components

Import store components from `@/components/malam`, primitives from `@/components/ui/<name>`.
Primitives are shadcn (Base UI flavour, `render` prop instead of `asChild`).

## Store components

### PriceTag
```tsx
<PriceTag price={13.49} originalPrice={24.99} />          // [-46%][~~$24.99~~ $13.49]
<PriceTag price={19.99} />                                 // [$19.99]
<PriceTag price={0} />                                     // [Free to Play]
<PriceTag price={132839} originalPrice={245999} currency="IDR" locale="id-ID" size="lg" />
```
Props: `price`, `originalPrice?`, `currency="USD"`, `locale?`, `size="sm"|"default"|"lg"`.
Discount % is computed. Never hand-build a price; use this.

### ProductCapsule
```tsx
<ProductCapsule title="Moss & Marrow" image="/art.jpg" price={13.49} originalPrice={24.99} label="Today's Deal" />
<ProductCapsule title="Nightline Racer" price={19.99} live ratio="capsule" href="/app/42" />
```
Props: `title`, `image?`, `price`, `originalPrice?`, `currency?`, `label?` (overlay top-left), `live?`,
`ratio="header"|"capsule"|"portrait"`, plus all `<a>` props. Place inside a `bg-card bg-panel p-4` grid.

### FeaturedHero
```tsx
const items: FeaturedItem[] = [{
  id: "1", title: "Ironveil Tactics", image, screenshots: [s1, s2, s3, s4],
  rating: "very-positive", reviewCount: 48210,
  reason: { title: "Top Seller", detail: "Ranked #8 globally" },
  price: 59.99, originalPrice?: 79.99, href: "/app/1",
}]
<FeaturedHero items={items} currency="USD" />
```
Looping carousel, arrows outside the track at `xl`, dots below. Stacks vertically under `md`.

### ReviewSummary
```tsx
<ReviewSummary rating="mostly-positive" count={6533} />
<ReviewSummary rating={ratingFromPercent(87, 4120)} count={4120} />
```
Ratings: `overwhelmingly-positive | very-positive | positive | mostly-positive | mixed | mostly-negative | negative | overwhelmingly-negative`.

### SectionHeader
```tsx
<SectionHeader title="Survival Games" subtitle="Featured tag" action={<Button variant="secondary" size="sm">See all</Button>} />
```

### CoverArt
```tsx
<CoverArt title="Deep Orbit" src={url} ratio="portrait" className="w-40">
  <Badge variant="label" className="absolute top-2 left-0">New</Badge>
</CoverArt>
```
No `src` → seeded gradient with the title. Children are overlaid (it is `relative`).

### PromoBanner
```tsx
<PromoBanner
  title="Explore Your Discovery Queue"
  description="Sign in to discover top-selling, new and recommended titles."
  action={<Button>Sign In</Button>}
  art={<img src={collage} className="size-full object-cover" />}
/>
```

### StoreHeader / StoreNav
```tsx
<StoreHeader
  logo={<Logo />}
  links={[{ label: "Store", active: true }, { label: "Community" }, { label: "Support" }]}
  utility={<><Button variant="cta" size="xs"><DownloadIcon /> Install</Button><a href="/login">sign in</a></>}
/>
<div className="mx-auto max-w-[1200px] px-4 pt-4">
  <StoreNav menus={[{ label: "Browse", items: [{ label: "Top Sellers", href: "/top" }] }]} onSearch={(q) => go(q)} />
</div>
```

## Restyled shadcn primitives

### Button
Variants: `default` (blue gradient CTA) · `cta` (themed second accent, buy/install only) · `success` / `warning` / `info` (status) · `secondary` (quiet
blue; hover sweeps to a blue gradient) · `outline` · `ghost` · `destructive` · `link`.
Sizes: `xs` 24 · `sm` 28 · `default` 32 · `lg` 40 · `icon` / `icon-xs` / `icon-sm` / `icon-lg`.
```tsx
<Button>Sign In</Button>
<Button variant="cta"><ShoppingCartIcon /> Add to Cart</Button>
<Button variant="secondary" size="icon" aria-label="Wishlist"><HeartIcon /></Button>
<DialogTrigger render={<Button variant="cta" />}>Buy</DialogTrigger>   // Base UI composition
```

### Badge
`default` · `secondary` · `sale` (discount chip) · `label` (uppercase overlay on art) · `live` (red dot) ·
`tag` (genre/feature pill, link-colored) · `outline` · `ghost` · `destructive` · `link`.

### Card
Panel gradient, 4px radius, drop shadow, no ring. `CardFooter` is a darker strip (`bg-black/20`).
`CardTitle` is white/semibold. Use for forms and settings; for product grids prefer a plain `bg-card bg-panel` div.

### Input
Sunken well: `bg-surface`, inner shadow, white text, italic placeholder, blue focus border.

### Tabs
Tabs sit flush on top of their panel; the active tab is `bg-accent` + white text. Give `TabsContent`
`className="bg-accent/40 p-2 space-y-1.5"` for the store list look. `variant="line"` gives a blue underline.

### Carousel
`Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` (big bare chevrons
placed `-left/right-14`, hide below `xl` or reposition), `CarouselDots` (new: page indicator).

### Others (theme-only changes)
`Dialog`, `DropdownMenu`, `Select`, `Tooltip` (needs `TooltipProvider` at root), `Progress` (blue bar),
`Skeleton` (`bg-muted`), `ScrollArea`, `Avatar`, `Separator`.

## Writing a new component

1. Start from an existing Malam component as the template; same file shape (`data-slot`, `cn`, props spread).
2. Tokens only. Corners `rounded-sm`/`rounded-none`. Transition `duration-200 ease-out`.
3. Put it in `src/components/malam/` and export it from `index.ts`.
4. Add it to the demo page (`src/App.tsx`) and to this file.

## Extended components (need extra npm libraries)

Not part of shadcn/ui. Each installs its own library; only add them when the feature is needed.

| Component | Library | Use |
|---|---|---|
| `Icon` | @iconify/react | Any of 200,000+ Iconify icons: `<Icon icon="lucide:house" />`. Uses currentColor; `addIcon` / `addCollection` for offline use |
| `FileUpload` | react-dropzone | Drag-and-drop uploads with previews, progress, validation (`accept`, `maxSize`, `upload`) |
| `DynamicSelect`, `AsyncDynamicSelect`, `CreatableDynamicSelect` | react-select | Searchable, multi, async and creatable selects |
| `ImageSlider` | swiper | Slider, gallery with thumbs, carousel, fade |
| `RichTextEditor` | @editorjs/editorjs | Block WYSIWYG with a formatting top bar; `value` / `onChange` use Editor.js JSON |
| `FadeIn`, `Stagger`, `Pressable`, `Presence`, `Collapse` | framer-motion | Entrance, hover/press and enter/exit animation; respects reduced motion |

Charts: all chart types (area, line, bar, pie/donut, radar, radial, scatter, composed, sparkline) use `ChartContainer` from `ui/chart` with `--chart-1…5` colors.

## Also available

| Component | Use |
|---|---|
| `Rating` | Star input / display. `value`, `onValueChange`, `allowHalf`, `readOnly`. Keyboard accessible (acts as a slider) |
| `DatePicker`, `DateRangePicker` | Popover + Calendar. `fromDate` / `toDate`, `captionLayout="dropdown"`, `presets` for ranges. Formats with `Intl`, no date library |
| `H1`–`H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `Blockquote`, `List`, `InlineCode`, `Prose` | Typography. Wrap raw HTML/Markdown output in `Prose` |

Each component page in the docs lists several examples (variants, forms, controlled usage). Check them before inventing a new pattern.

## Chat and AI

| Component | Use |
|---|---|
| `Message`, `MessageContent`, `MessageHeader`, `MessageFooter`, `MessageAvatar`, `MessageGroup` | One row of a conversation. `align="end"` for the sender |
| `Bubble`, `BubbleContent`, `BubbleReactions`, `BubbleGroup` | The text bubble. Variants: default (yours), muted (theirs), ghost (long AI answers), destructive (errors) |
| `MessageScroller…` | Scrolling list that keeps new messages in view, with jump-to-latest and `useMessageScroller()` |
| `Attachment…` | File or image chip with state (uploading, error, done) and actions |
| `Marker` | Date break or "New messages" divider (`variant="separator"`) |
| `Trace…` | What an agent is doing: thinking, searching, tool calls, expandable details |
| `Questionnaire…` | Multi-step questions with choices, shortcuts, validation and progress; it is a real `<form>` |
| `Sidebar…` | App sidebar: groups, menus, collapsible to icons, mobile sheet, `SidebarTrigger` (Ctrl+B) |
