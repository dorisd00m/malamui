import { HeartIcon, ShoppingCartIcon } from "lucide-react"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CoverArt } from "./cover-art"
import { PriceTag } from "./price-tag"

export type ProductCapsuleProps = Omit<React.ComponentProps<"div">, "title" | "onSelect"> & {
  title: string
  image?: string
  price: number
  originalPrice?: number
  currency?: string
  /** Overlay label top-left, e.g. "Today's Deal" */
  label?: string
  live?: boolean
  ratio?: "capsule" | "header" | "portrait"
  href?: string
  /** Fires when the tile is activated (click / Enter). Call `e.preventDefault()` for client-side routing. */
  onSelect?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  /** Shows a cart quick-action on hover/focus. */
  onAddToCart?: () => void
  /** Shows a wishlist toggle on hover/focus. */
  onWishlistChange?: (wishlisted: boolean) => void
  /** Controlled wishlist state. */
  wishlisted?: boolean
}

/**
 * The grid tile: art on top, price anchored bottom-right.
 * Hover = slight brighten + primary glow. Never scale up.
 */
function ProductCapsule({
  title,
  image,
  price,
  originalPrice,
  currency,
  label,
  live,
  ratio = "header",
  href = "#",
  onSelect,
  onAddToCart,
  onWishlistChange,
  wishlisted = false,
  className,
  ...props
}: ProductCapsuleProps) {
  const hasActions = onAddToCart || onWishlistChange

  return (
    <div
      data-slot="product-capsule"
      className={cn(
        "group/capsule relative animate-capsule-in transition-[filter,box-shadow] duration-200 ease-out",
        "hover:shadow-glow hover:brightness-110 has-focus-visible:shadow-glow",
        className
      )}
      {...props}
    >
      <a href={href} onClick={onSelect} className="block outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <CoverArt title={title} src={image} ratio={ratio}>
          {label && (
            <Badge variant="label" className="absolute top-2 left-0">
              {label}
            </Badge>
          )}
          {live && (
            <Badge variant="live" className="absolute top-2 left-2">
              Live
            </Badge>
          )}
        </CoverArt>
        <div className="flex justify-end bg-black/20">
          <PriceTag price={price} originalPrice={originalPrice} currency={currency} />
        </div>
      </a>

      {hasActions && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 ease-out group-hover/capsule:opacity-100 group-has-focus-visible/capsule:opacity-100">
          {onWishlistChange && (
            <Button
              size="icon-sm"
              variant="secondary"
              aria-label={wishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
              aria-pressed={wishlisted}
              onClick={() => onWishlistChange(!wishlisted)}
              className="bg-black/60 backdrop-blur-sm"
            >
              <HeartIcon className={cn(wishlisted && "fill-current")} />
            </Button>
          )}
          {onAddToCart && (
            <Button size="icon-sm" variant="success" aria-label={`Add ${title} to cart`} onClick={onAddToCart}>
              <ShoppingCartIcon />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { ProductCapsule }
