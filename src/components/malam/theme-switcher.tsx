import { CheckIcon, PaletteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme, type ThemeDefinition } from "./theme-provider"

function Swatches({ theme, className }: { theme: ThemeDefinition; className?: string }) {
  return (
    <span className={cn("flex overflow-hidden rounded-xs ring-1 ring-border", className)} aria-hidden>
      {theme.swatches.map((c, i) => (
        <span key={i} className="h-3.5 w-2.5" style={{ background: c }} />
      ))}
    </span>
  )
}

/**
 * Dropdown that lists every registered theme with color swatches.
 * `variant="inline"` renders a row of swatch buttons instead (for settings pages).
 */
function ThemeSwitcher({
  variant = "dropdown",
  className,
  onChange,
}: {
  variant?: "dropdown" | "inline"
  className?: string
  /** Fires with the newly selected theme name. */
  onChange?: (theme: string) => void
}) {
  const { theme, setTheme, themes } = useTheme()
  const current = themes.find((t) => t.name === theme) ?? themes[0]
  const select = (name: string) => {
    setTheme(name)
    onChange?.(name)
  }

  if (variant === "inline") {
    return (
      <div role="radiogroup" aria-label="Theme" className={cn("flex flex-wrap gap-2", className)}>
        {themes.map((t) => (
          <button
            key={t.name}
            type="button"
            role="radio"
            aria-checked={t.name === theme}
            onClick={() => select(t.name)}
            className={cn(
              "flex items-center gap-2 rounded-sm border border-border bg-(--tint) px-3 py-2 text-[0.8125rem] transition-colors duration-200 ease-out hover:border-link hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              t.name === theme && "border-link bg-accent text-heading"
            )}
          >
            <Swatches theme={t} />
            {t.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" className={className} aria-label="Change theme" />}
      >
        <PaletteIcon />
        <Swatches theme={current} />
        <span className="hidden sm:inline">{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          {themes.map((t) => (
            <DropdownMenuItem key={t.name} onClick={() => select(t.name)}>
              <Swatches theme={t} />
              <span className="flex-1">{t.label}</span>
              {t.name === theme && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeSwitcher }
