import * as React from "react"
import { cn } from "@/lib/utils"

const RATIOS = {
  capsule: "aspect-[231/87]",
  header: "aspect-[460/215]",
  hero: "aspect-[616/353]",
  screenshot: "aspect-video",
  portrait: "aspect-[2/3]",
} as const

/**
 * Artwork slot. Renders `src` if given, otherwise a deterministic gradient
 * placeholder seeded from `title`, so layouts look right before real art exists.
 */
function CoverArt({
  src,
  title,
  ratio = "capsule",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  src?: string
  title: string
  /** capsule 231:87 · header 460:215 · hero 616:353 · screenshot 16:9 · portrait 2:3 */
  ratio?: keyof typeof RATIOS
}) {
  const hue = React.useMemo(() => {
    let h = 0
    for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) % 360
    return h
  }, [title])

  return (
    <div
      data-slot="cover-art"
      className={cn("relative overflow-hidden bg-surface", RATIOS[ratio], className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={title} loading="lazy" className="size-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={title}
          className="flex size-full items-center justify-center p-3 text-center"
          style={{
            background: `radial-gradient(circle at 30% 20%, hsl(${hue} 70% 55% / .9), transparent 60%),
              radial-gradient(circle at 80% 90%, hsl(${(hue + 60) % 360} 70% 35%), transparent 65%),
              linear-gradient(135deg, hsl(${hue} 45% 18%), hsl(${(hue + 200) % 360} 40% 10%))`,
          }}
        >
          <span className="font-heading text-lg leading-tight font-black tracking-tight text-white/90 uppercase drop-shadow-[0_2px_4px_rgb(0_0_0/0.6)]">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

export { CoverArt }
