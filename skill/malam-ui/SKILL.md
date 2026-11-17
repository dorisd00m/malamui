---
name: malam-ui
description: Build UI in the Malam design system, a dark, near-black neutral look (near-square corners, lime-on-olive discounts, blue gradient CTAs) built on Tailwind CSS v4 and shadcn/ui. Use whenever creating or editing pages, components, or styles in a project that uses Malam UI (look for src/styles/malam.css or src/components/malam/), or when the user asks for a "dark store", "game store", "digital storefront", "library/launcher" style UI, or names Malam UI.
---

# Malam UI

A dark storefront design system: Tailwind v4 tokens + restyled shadcn/ui primitives + store components.
The look: near-black graphite page, near-black header, translucent blue nav bar, square-ish panels with a soft
vertical gradient, big artwork, compact text, and prices as the loudest color on screen.

Read this file fully before writing UI. Open `references/` only when you need the detail:

- `references/tokens.md`: every color, type, spacing, radius, and motion token, and when to use each
- `references/components.md`: props and examples for every Malam and restyled shadcn component
- `references/patterns.md`: page recipes (storefront, product page, library, checkout, dashboard) and responsive rules

## 1. Setup (only if the project doesn't have Malam yet)

Check first: if `src/styles/malam.css` and `src/components/malam/index.ts` exist, skip this section.

```bash
# Tailwind v4 + shadcn must already be initialised (npx shadcn@latest init).
# Register the public registry once in components.json:
#   "registries": { "@malam": "https://raw.githubusercontent.com/dorisd00m/malamui/main/public/r/{name}.json" }
npx shadcn@latest add @malam/malam-ui -y -o
```

Then make the main stylesheet (`src/index.css`, `app/globals.css`, …) contain only:

```css
@import "./styles/malam.css";
```

Add `class="dark"` to `<html>` and wrap the app in `<TooltipProvider>`.
Malam is dark-only: `:root` *is* the dark theme. Do not build a light mode unless asked.

## 2. Non-negotiable rules

1. **Use tokens, never raw hex.** `bg-background`, `bg-card`, `text-heading`, `text-link`, `bg-sale`…
   The only allowed literal colors are the ones already inside Malam components.
2. **Text has three levels.** `text-heading` (white) for titles and product names, `text-foreground`
   (#d4d4d8, the default) for body, `text-muted-foreground` for metadata. Links/info use `text-link`.
3. **Color has meaning. Don't spend it on decoration.**
   - Blue gradient (`Button` default): the one primary action in a region.
   - Green (`Button variant="success"`): only money or install actions (Buy, Add to Cart, Install).
   - Lime on olive (`bg-sale text-sale-foreground`): only discounts. Never use lime for anything else.
   - Review colors: blue = positive, tan = mixed, rust = negative. Only for sentiment.
4. **Corners are nearly square.** `rounded-sm` (2px) for controls, `rounded-md`/`rounded-lg` (3-4px)
   for panels. Never `rounded-xl`+ or pills, except `rounded-full` for avatars and status dots.
5. **Panels, not floating cards.** Group content inside a `bg-card bg-panel` panel with `p-4` and
   tiles spaced `gap-3`. No borders between tiles; let the panel background separate them.
6. **Section titles are small uppercase eyebrows** (`text-eyebrow` or `<SectionHeader>`), not huge
   headings. Page headings max out at `text-2xl font-bold`.
7. **Compact type.** Body 13-14px (`text-sm`, `text-[0.8125rem]`), metadata `text-xs`. Product titles
   in lists `text-base`. Hero product title `text-xl`. Don't go bigger than `text-3xl` anywhere.
8. **Spacing is a 4px grid.** Within component `gap-1`/`gap-1.5`/`gap-2`; between siblings `gap-3`;
   between sections `space-y-12`. Content width `max-w-[1200px] mx-auto px-4`.
9. **Motion is quiet.** 200ms `ease-out` on color/shadow/filter. Hover = `brightness-110` and/or a
   blue glow `shadow-[0_0_12px_rgb(26_159_255/0.35)]`. **Never scale on hover.** No bouncy springs.
   Lists may enter with `animate-capsule-in`.
10. **Artwork carries the page.** Use `<CoverArt>` with the right `ratio` for every image slot; it
    renders a seeded gradient placeholder when `src` is missing, so never leave empty boxes.
11. **Always import from the project**: `@/components/ui/*` (primitives) and `@/components/malam`
    (store components). Don't re-implement a component that exists.
12. **Accessibility**: icon-only buttons need `aria-label`; keep visible focus rings (`ring-ring`);
    prices and discounts must be text, not images.

## 3. Component map: reach for these first

| Need | Use |
|---|---|
| Any price | `<PriceTag price originalPrice? currency? size?>`, which computes the -% chip itself |
| Product tile in a grid | `<ProductCapsule title price originalPrice? label? live? ratio?>` |
| Big rotating feature | `<FeaturedHero items={FeaturedItem[]}>` |
| Section title | `<SectionHeader title subtitle? action?>` |
| Review verdict | `<ReviewSummary rating count?>`; get `rating` from `ratingFromPercent(pct, total)` |
| Image / placeholder | `<CoverArt title src? ratio="capsule|header|hero|screenshot|portrait">` |
| Promo strip | `<PromoBanner title description? action? art?>` |
| Site header / sub-nav | `<StoreHeader logo links utility?>` + `<StoreNav menus onSearch?>` |
| Buttons | `Button` variants: `default` (CTA) · `success` (buy) · `secondary` (quiet blue) · `outline` · `ghost` · `destructive` · `link` |
| Badges | `Badge` variants: `sale` · `label` (overlay on art) · `live` · `tag` (genre) · `default` · `secondary` · `outline` |
| Tabs | `Tabs` (active tab = raised blue-grey block, content panel `bg-accent/40 p-2`) |
| Carousel | `Carousel` + `CarouselDots`; arrows are big bare chevrons outside the track |
| Everything else | Standard shadcn (`Dialog`, `DropdownMenu`, `Select`, `Tooltip`, `Progress`, `Skeleton`, `ScrollArea`, `Avatar`, `Separator`, `Card`, `Input`), already themed |

Need a shadcn component that isn't installed? `npx shadcn@latest add <name>`, then restyle it to the
rules above (square corners, tokens, 200ms ease-out) before using it.

## 4. Canonical snippets

```tsx
// A section of deals
<section>
  <SectionHeader title="Special Offers" action={<Button variant="secondary" size="sm">Browse more</Button>} />
  <div className="grid grid-cols-2 gap-3 rounded-sm bg-card bg-panel p-4 md:grid-cols-3">
    {deals.map((d) => <ProductCapsule key={d.id} {...d} />)}
  </div>
</section>

// A list row (tabs, search results, library)
<a href={href} className="flex items-center gap-3 bg-black/20 transition-colors duration-200 ease-out hover:bg-accent">
  <CoverArt title={title} src={img} ratio="capsule" className="w-46 shrink-0" />
  <div className="min-w-0 flex-1 py-2">
    <div className="truncate text-base text-heading">{title}</div>
    <div className="truncate text-xs text-muted-foreground">{tags}</div>
  </div>
  <PriceTag className="mr-3" price={price} originalPrice={originalPrice} />
</a>

// Purchase block on a product page
<div className="flex items-center justify-between gap-4 bg-panel p-4">
  <h3 className="text-base">Buy {title}</h3>
  <div className="flex items-stretch bg-black/40 p-0.5">
    <PriceTag price={price} originalPrice={originalPrice} />
    <Button variant="success" className="ml-0.5 rounded-none">Add to Cart</Button>
  </div>
</div>
```

## 5. Before you finish, check

- [ ] No raw hex/rgb except inside existing Malam components; no `rounded-xl` or larger
- [ ] Exactly one blue-gradient CTA per region; green only on buy/install; lime only on discounts
- [ ] Section titles use `SectionHeader`/`text-eyebrow`; body text is `text-sm` or smaller
- [ ] Every image slot uses `CoverArt` with a sensible `ratio`
- [ ] Hover states: 200ms ease-out, brightness or glow, no scale
- [ ] Works at 390px wide with no horizontal scroll (grids drop to 2 cols / 1 col, nav wraps)
- [ ] Icon-only buttons have `aria-label`; focus rings visible
- [ ] Never use a real store's name, logo, or product art; Malam is its own brand
