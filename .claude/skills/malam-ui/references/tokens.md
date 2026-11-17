# Malam tokens

All tokens live in `src/styles/malam.css` (`:root`, mirrored on `.dark`) and are exposed to Tailwind
through `@theme inline`, so `bg-<token>`, `text-<token>`, `border-<token>` all work.

## Surfaces (darkest → lightest)

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--header` | `#0a0a0b` | `bg-header` | Global header and footer only |
| `--surface` | `#0d0d0f` | `bg-surface` | Sunken wells: inputs, image backdrops |
| `--background` | `#121214` | `bg-background` | Page. `body` also gets a soft top glow (`--page-glow`) |
| `--muted` | `#1f1f23` | `bg-muted` | Skeletons, disabled fills |
| `--card` | `#19191c` | `bg-card` (+ `bg-panel`) | Section panels. Always pair with `bg-panel` gradient |
| `--accent` | `#2a2a30` | `bg-accent` | Hover rows, active tab, selected menu item |
| `--popover` | `#232327` | `bg-popover` | Menus, dialogs, tooltips |
| `bg-black/20` – `/40` | — | — | Price strips, list rows, darkening over art |

## Text

| Token | Value | Use |
|---|---|---|
| `--heading` | `#ffffff` | `text-heading`: titles, product names, prices without discount |
| `--foreground` | `#d4d4d8` | Default body text |
| `--muted-foreground` | `#8e8e96` | Metadata, tags, captions, placeholders |
| `--link` | `#66c0f4` | `text-link`: links, info, active nav, positive reviews |
| `--popover-foreground` | `#e4e4e7` | Text inside menus/dialogs |

## Action & status

| Token | Value | Use |
|---|---|---|
| `--primary` | `#1a9fff` | Solid blue (badges, search button). CTA buttons use `bg-primary-gradient` (`#06bfff → #2d73ff`) |
| `--secondary` | `rgb(103 193 245 / .2)` | Quiet blue button bg; fg `--secondary-foreground` `#66c0f4` |
| `--cta` | per theme | Second accent for buy/install (`Button variant="cta"`, `bg-cta-gradient`). Green in Classic, red in Crimson… |
| `--success` / `--warning` / `--info` | `#2fbf71` / `#f5a524` / `#3b9eff` (darker in light mode) | Status only. Same in every theme. Use `text-success-text` etc. on tinted backgrounds |
| `--sale` / `--sale-foreground` | `#4c6b22` / `#beee11` | Discount chip + discounted price. **Only for discounts.** |
| `--strike` | `#7b7b83` | Struck-through original price |
| `--review-positive` | `#66c0f4` | Positive sentiment |
| `--review-mixed` | `#b9a074` | Mixed sentiment |
| `--review-negative` | `#a34c25` | Negative sentiment |
| `--live` | `#e0393e` | Live/broadcast dot |
| `--destructive` | `#c15755` | Destructive actions (shown as tinted bg + `#ff9a98` text) |
| `--ring` | `#66c0f4` | Focus rings |
| `--border` | `rgb(255 255 255 / .08)` | Hairlines. Use sparingly |
| `--input` | `#3a3a42` | Search field tint |
| `--chart-1…5` | `#1a9fff #66c0f4 #417a9b #beee11 #b9a074` | Data viz, in that order |

## Gradients (utilities)

| Utility | Use |
|---|---|
| `bg-nav` | Secondary nav bar (translucent blue sweep) |
| `bg-panel` | Section panels and cards (subtle top-lit vertical gradient) |
| `bg-hero-info` | Info column of the featured hero |
| `bg-primary-gradient` | Primary CTA buttons |
| `bg-promo` | Promo banners (graphite gradient) |

## Typography

- Family: `Figtree Variable` (free stand-in for the commercial "Motiva Sans"), then Arial/Helvetica. Mono: Consolas.
- `text-eyebrow`: 14px / 600 / uppercase / 0.04em tracking / white. Section titles.
- Scale in use: `text-xs` 12 (meta) · `text-[0.8125rem]` 13 (prices, reviews, nav) · `text-sm` 14 (body) ·
  `text-base` 16 (list titles, top nav) · `text-xl` 20 (hero title, promo title) · `text-2xl` 24 (page title).
- Weights: 400 body, 500 nav/titles, 600 eyebrows/chips, 700 page headings, 900 only for art placeholders.
- Line height: body 1.5, headings `leading-tight`.

## Spacing & layout

- 4px grid. Common: `gap-1.5` (inside chips), `gap-2`/`gap-3` (siblings/tiles), `p-4` (panels), `space-y-12` (sections).
- Container: `mx-auto max-w-[1200px] px-4`. Header and nav align to the same container.
- Hero split: `md:grid-cols-[7fr_3fr]`. Deal grids: `grid-cols-2 md:grid-cols-3`. Tag sections: `md:grid-cols-2`.

## Radius

`--radius: 4px`. `rounded-xs` 1 · `rounded-sm` 2 (controls, chips) · `rounded-md` 3 · `rounded-lg`… `rounded-3xl` all clamp to 4.
`rounded-4xl`/`rounded-full` = pill/circle (avatars, dots only). Price chips and overlay labels use `rounded-none`.

## Motion

- Transitions: `duration-200 ease-out` on `color, background, box-shadow, filter`. (Extracted: `box-shadow .2s ease-out, color .2s ease-out`.)
- Hover: `hover:brightness-110` (tiles) / `hover:brightness-115` (CTAs) / glow `shadow-[0_0_12px_rgb(26_159_255/0.35)]`.
- Press: `active:translate-y-px`. Never scale.
- Entry: `animate-capsule-in` (fade + 4px rise, 350ms). Dialog/menus use tw-animate-css defaults (fade + zoom-95, 100ms).
- Respect `prefers-reduced-motion` for anything beyond these.

## Artwork ratios (`CoverArt ratio`)

`capsule` 231:87 (list rows) · `header` 460:215 (grid tiles, default) · `hero` 616:353 (feature) ·
`screenshot` 16:9 · `portrait` 2:3 (library grid, box-art).
