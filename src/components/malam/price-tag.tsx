import * as React from "react"
import { cn, formatPrice } from "@/lib/utils"

const TEXT = { sm: "text-xs", default: "text-[0.8125rem]", lg: "text-base" } as const
const PCT = { sm: "px-1", default: "px-1.5", lg: "px-2.5 text-[1.375rem]" } as const
const BODY = { sm: "px-1.5 py-1", default: "px-2 py-1.5", lg: "px-3 py-2" } as const

/**
 * Price block. With a discount: [-46%][~~old~~ new], lime on olive.
 * Without: plain price on a dark chip. `price === 0` renders "Free to Play".
 */
function PriceTag({
  price,
  originalPrice,
  currency = "USD",
  locale,
  size = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  price: number
  originalPrice?: number
  currency?: string
  locale?: string
  size?: keyof typeof TEXT
}) {
  const discounted = originalPrice != null && originalPrice > price
  const pct = discounted ? Math.round((1 - price / originalPrice) * 100) : 0
  const fmt = (v: number) => formatPrice(v, currency, locale)

  return (
    <div
      data-slot="price-tag"
      className={cn(
        "inline-flex items-stretch overflow-hidden leading-none whitespace-nowrap",
        TEXT[size],
        className
      )}
      {...props}
    >
      {discounted && (
        <span className={cn("flex items-center bg-sale font-semibold text-sale-foreground", PCT[size])}>
          -{pct}%
        </span>
      )}
      <span
        className={cn(
          "flex items-center gap-1.5",
          BODY[size],
          discounted ? "bg-price-surface" : "bg-black/30"
        )}
      >
        {discounted && (
          <s className="text-[0.75em] text-strike decoration-strike">{fmt(originalPrice)}</s>
        )}
        <span className={cn("font-medium", discounted ? "text-sale-foreground" : "text-heading")}>
          {price === 0 ? "Free to Play" : fmt(price)}
        </span>
      </span>
    </div>
  )
}

export { PriceTag }
