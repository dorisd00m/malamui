# Malam page patterns

Every page: `StoreHeader` → `StoreNav` (inside the 1200px container) → `<main className="mx-auto max-w-[1200px] space-y-12 px-4 py-6">` → footer on `bg-header`.

## Storefront home
1. `SectionHeader` (title normal-case `text-xl`) + `FeaturedHero`
2. "Special Offers": panel grid of `ProductCapsule` (2 / 3 cols), one or two with `label`
3. `PromoBanner` (sign-in / discovery / event)
4. Two-up tag sections: `md:grid-cols-2`, each `SectionHeader title subtitle="Featured tag"` + 2×2 capsules
5. `Tabs` list: New & Trending / Top Sellers / Upcoming / Specials, rows = capsule art + title/tags + `PriceTag`

## Product page
- Title row: `h1 text-2xl font-bold` + breadcrumbs `text-xs text-muted-foreground` above.
- Media + summary: `grid md:grid-cols-[2fr_1fr] gap-4`. Left: big `CoverArt ratio="screenshot"` + thumb strip
  (`grid grid-cols-5 gap-1`, active thumb `ring-2 ring-link`). Right: `CoverArt ratio="header"`, short description
  (`text-[0.8125rem]`), `ReviewSummary` rows (Recent / All), release date, developer as `text-link`, tag `Badge variant="tag"` row.
- Purchase blocks: one per edition, `bg-panel p-4`, title left, `[PriceTag][Button cta]` joined on the right.
- Long-form "About" text: `text-sm leading-relaxed max-w-prose`, section headings `text-eyebrow` with a
  `border-b border-link/30 pb-1` underline.
- Sidebar (right, `md:w-80`): small panels, each `bg-black/20 p-3` with an eyebrow header.

## Library / launcher
- Left sidebar list (`w-72 bg-header`): search `Input`, then rows `h-8 px-3 text-[0.8125rem] hover:bg-accent`, active `bg-accent text-heading`.
- Main: hero art (`CoverArt ratio="hero"`, darkened bottom with `bg-gradient-to-t from-background`), then a
  bar with big `Button variant="cta" size="lg"` (Play/Install) + stats in `text-xs text-muted-foreground`.
- Grid view: `grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3` of `CoverArt ratio="portrait"`;
  hover = glow, show `Progress` overlay for downloads.

## Cart / checkout
- Line items: list rows (capsule art, title, `PriceTag` right, `Button variant="link" size="xs"` "Remove").
- Totals panel `bg-panel p-4`: estimated total `text-lg text-heading`, then full-width `Button variant="cta" size="lg"`.
- Confirmations use `Dialog`; destructive actions use `variant="destructive"`.

## Account / settings / admin
- `Card`s in a `grid gap-6 md:grid-cols-2`, forms with `Input`, `Select`, `Button` (Save = default, Cancel = ghost).
- Tables: `bg-card bg-panel`, header row `text-eyebrow text-xs`, rows `border-t border-border hover:bg-accent/50`.
- Charts: series colors `chart-1…5` in order; gridlines `border` token; tooltips `bg-popover`.

## Empty, loading, error
- Loading: `Skeleton` with the exact footprint of the final content (capsule ratio boxes, text bars).
- Empty: centered in the panel, `text-muted-foreground`, one `Button variant="secondary"`.
- Error: `bg-destructive/20 text-[#ff9a98] p-3 rounded-sm` inline, never a full-page red.

## Responsive
- Breakpoints: below `md` hero stacks (art then info), grids drop to 2 cols (or 1 for list rows), nav menus wrap,
  search goes full width. Carousel arrows hidden below `xl` (dots remain).
- Tab lists scroll horizontally (`overflow-x-auto`, already in `TabsList`).
- Test at 390px: no horizontal scroll, tap targets ≥ 32px.

## Placeholder images

For avatars, cards, carousels and sliders in previews and mockups, use https://picsum.photos with a seed so the same image
always returns: `https://picsum.photos/seed/<seed>/<width>/<height>` (e.g. `/seed/olivia/96/96` for an avatar, `/seed/hero/1280/720`
for a slide). Always set `alt` (empty for decorative images), `loading="lazy"` and keep `AvatarFallback` as the offline fallback.
Replace them with real assets before shipping.
