import * as React from "react"
import { cn } from "@/lib/utils"

/** Uppercase section title with optional subtitle and right-aligned action. */
function SectionHeader({
  title,
  subtitle,
  action,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div
      data-slot="section-header"
      className={cn("mb-3 flex items-end justify-between gap-4", className)}
      {...props}
    >
      <div>
        <h2 className="text-eyebrow">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[0.9375rem] text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export { SectionHeader }
