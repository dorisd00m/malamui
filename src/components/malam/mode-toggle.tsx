import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme, type Mode } from "./theme-provider"

const options: { value: Mode; label: string; icon: typeof SunIcon }[] = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
]

/** Dropdown to choose Light, Dark or System. Pair it with <ThemeSwitcher> for accent colors. */
function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode, resolvedMode } = useTheme()
  const Icon = resolvedMode === "light" ? SunIcon : MoonIcon
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className={className} aria-label="Change color mode" />}>
        <Icon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Mode</DropdownMenuLabel>
          {options.map((o) => (
            <DropdownMenuItem key={o.value} onClick={() => setMode(o.value)}>
              <o.icon />
              <span className="flex-1">{o.label}</span>
              {mode === o.value && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ModeToggle }
