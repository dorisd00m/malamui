import { Icon as IconifyIcon, addCollection, addIcon, loadIcons, type IconProps as IconifyIconProps } from "@iconify/react"
import { cn } from "@/lib/utils"

export type IconProps = Omit<IconifyIconProps, "icon" | "width" | "height"> & {
  /** Iconify name: "<set>:<icon>", e.g. "lucide:house", "mdi:github", "logos:react". Browse sets at icon-sets.iconify.design. */
  icon: string
  /** Width and height (number = px, or any CSS size). Defaults to 1em so it follows the text size. */
  size?: number | string
  /** Accessible name. Without it the icon is decorative and hidden from screen readers. */
  label?: string
}

/**
 * Any icon from Iconify (200,000+ icons in 150+ sets) with one component.
 * Icons are fetched on demand from the Iconify API and cached; use addIcon / addCollection (re-exported below)
 * to bundle the ones you need and work fully offline.
 */
function Icon({ icon, size = "1em", label, className, ...props }: IconProps) {
  return (
    <IconifyIcon
      data-slot="icon"
      icon={icon}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...props}
    />
  )
}

export { Icon, addIcon, addCollection, loadIcons }
