import * as React from "react"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const SIZES = { sm: "size-4", default: "size-6", lg: "size-8" } as const

export type RatingProps = {
  /** Controlled value (0 to max). */
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Number of stars. */
  max?: number
  /** Allow half stars (0.5 steps). */
  allowHalf?: boolean
  /** Clicking the current value again resets to 0. */
  allowClear?: boolean
  /** Display only: not focusable, announced as an image. */
  readOnly?: boolean
  disabled?: boolean
  size?: keyof typeof SIZES
  /** Accessible name, e.g. "Rate this product". */
  "aria-label"?: string
  className?: string
}

/**
 * Star rating input. Works as a slider for keyboards and screen readers
 * (arrow keys, Home and End), and with full or half stars on pointer devices.
 */
function Rating({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = false,
  allowClear = true,
  readOnly,
  disabled,
  size = "default",
  className,
  "aria-label": ariaLabel = "Rating",
}: RatingProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : inner
  const shown = hover ?? value
  const step = allowHalf ? 0.5 : 1
  const interactive = !readOnly && !disabled

  const commit = (next: number) => {
    const clamped = Math.max(0, Math.min(max, next))
    if (!controlled) setInner(clamped)
    onValueChange?.(clamped)
  }

  const valueFromPointer = (e: React.PointerEvent<HTMLSpanElement>, index: number) => {
    if (!allowHalf) return index + 1
    const rect = e.currentTarget.getBoundingClientRect()
    return e.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return
    const keys: Record<string, number> = { ArrowRight: value + step, ArrowUp: value + step, ArrowLeft: value - step, ArrowDown: value - step, Home: 0, End: max }
    if (e.key in keys) {
      e.preventDefault()
      commit(keys[e.key])
    }
  }

  const stars = Array.from({ length: max }, (_, i) => {
    const fill = Math.max(0, Math.min(1, shown - i)) // 0, 0.5 or 1 (or any fraction in read-only mode)
    return (
      <span
        key={i}
        className={cn("relative inline-block", interactive && "cursor-pointer")}
        onPointerMove={interactive ? (e) => setHover(valueFromPointer(e, i)) : undefined}
        onClick={
          interactive
            ? (e) => {
                const next = valueFromPointer(e as unknown as React.PointerEvent<HTMLSpanElement>, i)
                commit(allowClear && next === value ? 0 : next)
              }
            : undefined
        }
      >
        <StarIcon className={cn(SIZES[size], "text-muted-foreground/50")} />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
          <StarIcon className={cn(SIZES[size], "fill-current text-warning")} />
        </span>
      </span>
    )
  })

  const text = `${value} out of ${max}`

  if (!interactive) {
    return (
      <span
        data-slot="rating"
        role="img"
        aria-label={`${ariaLabel}: ${text}`}
        className={cn("inline-flex items-center gap-0.5", disabled && "opacity-50", className)}
      >
        {stars}
      </span>
    )
  }

  return (
    <span
      data-slot="rating"
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={text}
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      className={cn("inline-flex items-center gap-0.5 rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    >
      {stars}
    </span>
  )
}

export { Rating }
