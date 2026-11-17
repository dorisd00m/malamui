import * as React from "react"
import { cn } from "@/lib/utils"

export type ReviewRating =
  | "overwhelmingly-positive"
  | "very-positive"
  | "positive"
  | "mostly-positive"
  | "mixed"
  | "mostly-negative"
  | "negative"
  | "overwhelmingly-negative"

const LABEL: Record<ReviewRating, string> = {
  "overwhelmingly-positive": "Overwhelmingly Positive",
  "very-positive": "Very Positive",
  positive: "Positive",
  "mostly-positive": "Mostly Positive",
  mixed: "Mixed",
  "mostly-negative": "Mostly Negative",
  negative: "Negative",
  "overwhelmingly-negative": "Overwhelmingly Negative",
}

/** Derive a rating from % positive (0–100) and total review count. */
export function ratingFromPercent(pct: number, total = 1000): ReviewRating {
  if (pct >= 95 && total >= 500) return "overwhelmingly-positive"
  if (pct >= 80) return total >= 50 ? "very-positive" : "positive"
  if (pct >= 70) return "mostly-positive"
  if (pct >= 40) return "mixed"
  if (pct >= 20) return "mostly-negative"
  return total >= 500 ? "overwhelmingly-negative" : "negative"
}

/** Colored verdict + count. Blue = positive, tan = mixed, rust = negative. */
function ReviewSummary({
  rating,
  count,
  className,
  ...props
}: React.ComponentProps<"div"> & { rating: ReviewRating; count?: number }) {
  const tone = rating.includes("positive")
    ? "text-review-positive"
    : rating === "mixed"
      ? "text-review-mixed"
      : "text-review-negative"

  return (
    <div data-slot="review-summary" className={cn("text-[0.8125rem]", className)} {...props}>
      <span className={tone}>{LABEL[rating]}</span>
      {count != null && <span className="text-foreground"> ({count.toLocaleString()} Reviews)</span>}
    </div>
  )
}

export { ReviewSummary }
