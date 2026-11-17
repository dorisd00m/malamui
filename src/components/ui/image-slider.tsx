import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Autoplay, EffectFade, FreeMode, Keyboard, Pagination, Thumbs } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import "swiper/css"
import "swiper/css/a11y"
import "swiper/css/effect-fade"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import { cn } from "@/lib/utils"

export type SliderImage = {
  src: string
  alt: string
  /** Optional caption shown over the bottom of the slide */
  title?: string
  description?: string
}

export type ImageSliderProps = {
  images: SliderImage[]
  /** Slides visible at once (use a number > 1 for a carousel). */
  slidesPerView?: number
  spaceBetween?: number
  loop?: boolean
  /** Autoplay delay in ms. Omit to disable. Pauses on hover. */
  autoplay?: number
  /** Cross-fade instead of sliding (only with slidesPerView = 1). */
  fade?: boolean
  navigation?: boolean
  pagination?: boolean
  /** Show a synced thumbnail strip underneath. */
  thumbs?: boolean
  /** CSS aspect-ratio of each slide, e.g. "16 / 9". */
  aspect?: string
  className?: string
}

/**
 * Responsive image slider / gallery built on Swiper. Touch, keyboard and screen-reader friendly.
 */
function ImageSlider({
  images,
  slidesPerView = 1,
  spaceBetween = 12,
  loop,
  autoplay,
  fade,
  navigation = true,
  pagination = true,
  thumbs,
  aspect = "16 / 9",
  className,
}: ImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null)
  // Arrow buttons drive the Swiper instance directly. (Passing prevEl/nextEl refs does not work here:
  // the buttons render after <Swiper>, so the refs are still null when Swiper initialises.)
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null)
  const [edges, setEdges] = React.useState({ begin: true, end: false })
  const syncEdges = (s: SwiperType) => setEdges({ begin: s.isBeginning, end: s.isEnd })

  const btn =
    "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-30 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30"

  return (
    <div
      data-slot="image-slider"
      className={cn("w-full space-y-2", className)}
      style={
        {
          "--swiper-theme-color": "var(--primary)",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "8px",
        } as React.CSSProperties
      }
    >
      <div className="group relative">
        <Swiper
          modules={[A11y, Autoplay, EffectFade, Keyboard, Pagination, Thumbs]}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          loop={loop}
          effect={fade && slidesPerView === 1 ? "fade" : "slide"}
          fadeEffect={{ crossFade: true }}
          keyboard={{ enabled: true }}
          autoplay={autoplay ? { delay: autoplay, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          pagination={pagination ? { clickable: true } : false}
          onSwiper={(s) => {
            setSwiper(s)
            syncEdges(s)
          }}
          onSlideChange={syncEdges}
          thumbs={thumbs ? { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null } : undefined}
          className="overflow-hidden rounded-md"
        >
          {images.map((img) => (
            <SwiperSlide key={img.src + img.alt}>
              <figure className="relative m-0 overflow-hidden bg-muted" style={{ aspectRatio: aspect }}>
                <img src={img.src} alt={img.alt} className="size-full object-cover" draggable={false} />
                {(img.title || img.description) && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-white">
                    {img.title && <p className="font-semibold">{img.title}</p>}
                    {img.description && <p className="text-sm text-white/80">{img.description}</p>}
                  </figcaption>
                )}
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        {navigation && (
          <>
            <button type="button" aria-label="Previous slide" onClick={() => swiper?.slidePrev()} disabled={!loop && edges.begin} className={cn(btn, "left-3")}>
              <ChevronLeftIcon className="size-5" />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => swiper?.slideNext()} disabled={!loop && edges.end} className={cn(btn, "right-3")}>
              <ChevronRightIcon className="size-5" />
            </button>
          </>
        )}
      </div>

      {thumbs && (
        <Swiper
          modules={[FreeMode, Thumbs, A11y]}
          onSwiper={setThumbsSwiper}
          slidesPerView={Math.min(images.length, 5)}
          spaceBetween={8}
          freeMode
          watchSlidesProgress
        >
          {images.map((img) => (
            <SwiperSlide key={"t" + img.src + img.alt} className="cursor-pointer opacity-50 transition-opacity [&.swiper-slide-thumb-active]:opacity-100">
              <div className="overflow-hidden rounded-sm bg-muted" style={{ aspectRatio: aspect }}>
                <img src={img.src} alt="" className="size-full object-cover" draggable={false} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export { ImageSlider }
