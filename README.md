# Malam UI

A dark design system for **Tailwind CSS v4 + shadcn/ui**, derived from a skillui extraction
(`../store-design/`). Ships as a shadcn registry item plus an agent skill.

```
src/index.css               → theme (tokens, gradients, utilities) published as styles/malam.css
src/components/ui/          → shadcn primitives restyled for Malam
src/components/malam/        → store components: PriceTag, ProductCapsule, FeaturedHero, ReviewSummary,
                              SectionHeader, CoverArt, PromoBanner, StoreHeader, StoreNav
src/App.tsx                 → demo storefront + component sheet
registry.json → public/r/   → shadcn registry (npx shadcn build)
skill/malam-ui/              → agent skill source (SKILL.md + references/)
.claude/skills/malam-ui/     → same skill, auto-loaded by Claude Code in this repo
malam-ui.skill               → zipped skill for installing elsewhere
```

## Run the demo

```bash
npm install
npm run dev
```

## Use in another project

1. The project needs Tailwind v4 and shadcn initialised (`npx shadcn@latest init`).
2. Register the public registry in `components.json`:
   ```json
   { "registries": { "@malam": "https://raw.githubusercontent.com/dorisd00m/malamui/main/public/r/{name}.json" } }
   ```
   then run `npx shadcn@latest add @malam/malam-ui -y -o` (everything) or `npx shadcn@latest add @malam/button` (a single component). `-o` overwrites the default shadcn primitives with the Malam versions.
3. Replace the contents of your main CSS file with `@import "./styles/malam.css";` (adjust the path).
4. Add `class="dark"` to `<html>` and wrap the app in `<TooltipProvider>`.

On Windows, pass an `http(s)://` URL; shadcn rejects `C:\...` paths.

## Install the agent skill

- **Claude Code, this repo:** already in `.claude/skills/malam-ui/`.
- **Claude Code, all projects:** copy `skill/malam-ui/` to `~/.claude/skills/malam-ui/`.
- **Claude.ai / Claude Desktop:** upload `malam-ui.skill` under Settings → Capabilities → Skills.


## Rebuilding

```bash
npx shadcn@latest build   # after changing components or theme → public/r/malam-ui.json
```

## Notes

- Fonts: uses **Figtree** (OFL). The extracted `../store-design/fonts/MotivaSans-*.ttf` are a commercial
  typeface; don't ship them unless you hold a license.
- Branding: Malam is its own brand. Don't add another store's name, logo, or product artwork.
