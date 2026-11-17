import * as React from "react"
import { cn } from "@/lib/utils"

/** Full-width promotional strip: copy on the left, art fading in from the right. */
function PromoBanner({
  title,
  description,
  action,
  art,
  className,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  art?: React.ReactNode
}) {
  return (
    <section
      data-slot="promo-banner"
      className={cn("relative flex min-h-36 items-center overflow-hidden rounded-sm bg-promo", className)}
      {...props}
    >
      <div className="relative z-10 max-w-xl space-y-2 px-6 py-6 sm:px-10">
        <h3 className="text-xl font-bold">{title}</h3>
        {description && <p className="text-base text-heading/85">{description}</p>}
        {action && <div className="pt-1">{action}</div>}
      </div>
      {art && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(90deg,transparent,black_35%)] md:block">
          {art}
        </div>
      )}
    </section>
  )
}

export { PromoBanner }
