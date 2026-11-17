import { TrendingUpIcon } from "lucide-react"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { CoverArt } from "./cover-art"
import { PriceTag } from "./price-tag"
import { ReviewSummary, type ReviewRating } from "./review-summary"

export type FeaturedItem = {
  id: string
  title: string
  image?: string
  screenshots?: string[]
  rating: ReviewRating
  reviewCount: number
  /** Why it's featured: "Top Seller", "Now Available", "Recommended because…" */
  reason?: { title: string; detail?: string }
  price: number
  originalPrice?: number
  href?: string
}

export type FeaturedHeroProps = {
  items: FeaturedItem[]
  currency?: string
  /** Auto-advance interval in ms. Pauses on hover and focus. `0` disables. */
  autoPlay?: number
  /** Fires when a slide is clicked. Call `e.preventDefault()` for client-side routing. */
  onSelect?: (item: FeaturedItem, e: React.MouseEvent<HTMLAnchorElement>) => void
  /** Fires whenever the visible slide changes (arrows, dots, swipe, autoplay). */
  onSlideChange?: (index: number, item: FeaturedItem) => void
  className?: string
}

/**
 * The homepage hero: wide art (~70%) + info panel (~30%) with title, reviews,
 * a 2×2 screenshot grid, the "reason" line, and price pinned bottom-right.
 */
function FeaturedHero({ items, currency, autoPlay = 0, onSelect, onSlideChange, className }: FeaturedHeroProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [paused, setPaused] = React.useState(false)
  const latest = React.useRef({ items, onSlideChange })
  latest.current = { items, onSlideChange }

  React.useEffect(() => {
    if (!api) return
    const handle = () => {
      const i = api.selectedScrollSnap()
      const item = latest.current.items[i]
      if (item) latest.current.onSlideChange?.(i, item)
    }
    api.on("select", handle)
    return () => {
      api.off("select", handle)
    }
  }, [api])

  React.useEffect(() => {
    if (!api || !autoPlay || paused) return
    const id = window.setInterval(() => api.scrollNext(), autoPlay)
    return () => window.clearInterval(id)
  }, [api, autoPlay, paused])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className={cn("mx-auto w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <a
              href={item.href ?? "#"}
              onClick={(e) => onSelect?.(item, e)}
              className="grid shadow-[0_0_8px_rgb(0_0_0/0.5)] transition-[filter] duration-200 ease-out outline-none hover:brightness-105 focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[7fr_3fr]"
            >
              <CoverArt title={item.title} src={item.image} ratio="hero" className="md:aspect-auto md:h-full" />
              <div className="flex flex-col gap-3 bg-hero-info p-4 md:min-h-[353px]">
                <h3 className="text-xl leading-tight font-medium">{item.title}</h3>
                <ReviewSummary rating={item.rating} count={item.reviewCount} />
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <CoverArt
                      key={i}
                      ratio="screenshot"
                      title={`${item.title} ${i + 1}`}
                      src={item.screenshots?.[i]}
                      className="opacity-80 transition-opacity duration-200 hover:opacity-100 [&_span]:hidden"
                    />
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between gap-3">
                  {item.reason ? (
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className="size-8 text-sale-foreground" />
                      <div className="leading-tight">
                        <div className="text-[0.8125rem] font-medium text-sale-foreground">{item.reason.title}</div>
                        {item.reason.detail && <div className="text-[0.8125rem] text-heading">{item.reason.detail}</div>}
                      </div>
                    </div>
                  ) : (
                    <span />
                  )}
                  <PriceTag price={item.price} originalPrice={item.originalPrice} currency={currency} />
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:inline-flex" />
      <CarouselNext className="hidden xl:inline-flex" />
      <CarouselDots />
    </Carousel>
  )
}

export { FeaturedHero }
