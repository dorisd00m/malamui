import { ChevronDownIcon, SearchIcon } from "lucide-react"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type NavLink = { label: string; href?: string; active?: boolean }
type NavMenu = { label: string; items: NavLink[] }

/**
 * Global header: near-black bar, logo slot, big uppercase primary links with
 * an underline on the active one, and a utility row (top-right) for account actions.
 */
function StoreHeader({
  logo,
  links,
  utility,
  className,
}: {
  logo: React.ReactNode
  links: NavLink[]
  utility?: React.ReactNode
  className?: string
}) {
  return (
    <header data-slot="store-header" className={cn("bg-header", className)}>
      <div className="mx-auto flex max-w-[1200px] flex-col px-4 pt-2 pb-5">
        {utility && <div className="flex justify-end gap-3 text-xs text-muted-foreground">{utility}</div>}
        <div className="flex flex-wrap items-center gap-x-12 gap-y-3 pt-3">
          {logo}
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href ?? "#"}
                aria-current={l.active ? "page" : undefined}
                className={cn(
                  "border-b-3 border-transparent pb-0.5 text-base font-medium tracking-wide text-popover-foreground uppercase hover:text-heading",
                  l.active && "border-link text-link hover:text-link"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

/**
 * Secondary nav: translucent blue gradient bar with dropdown menus on the
 * left and a search field with a blue square button on the right.
 */
function StoreNav({
  menus,
  onSearch,
  searchPlaceholder = "Search the store",
  className,
}: {
  menus: NavMenu[]
  onSearch?: (q: string) => void
  searchPlaceholder?: string
  className?: string
}) {
  const [q, setQ] = React.useState("")
  return (
    <div
      data-slot="store-nav"
      className={cn(
        "flex flex-wrap items-center gap-2 bg-nav px-1 py-1 shadow-[0_0_3px_rgb(0_0_0/0.4)]",
        className
      )}
    >
      <nav className="flex flex-1 flex-wrap">
        {menus.map((m) => (
          <DropdownMenu key={m.label}>
            <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1.5 rounded-sm px-3 text-[0.8125rem] font-medium text-heading outline-none transition-colors duration-200 ease-out hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring aria-expanded:bg-white/10">
              {m.label}
              <ChevronDownIcon className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              {m.items.map((it) => (
                <DropdownMenuItem key={it.label} render={<a href={it.href ?? "#"} />}>
                  {it.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>
      <form
        role="search"
        className="flex w-full sm:w-auto sm:min-w-80"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch?.(q)
        }}
      >
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="h-9 rounded-r-none border-r-0 bg-input/60 placeholder:text-(--input-placeholder)"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid size-9 shrink-0 place-items-center rounded-r-sm bg-primary text-white transition-[filter] duration-200 ease-out hover:brightness-115 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <SearchIcon className="size-4.5" />
        </button>
      </form>
    </div>
  )
}

export { StoreHeader, StoreNav, type NavLink, type NavMenu }
