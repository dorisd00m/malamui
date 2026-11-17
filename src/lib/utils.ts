export { cn } from "cn"

/** Format a price in minor-unit-free numbers, e.g. formatPrice(132839, "IDR"). */
export function formatPrice(value: number, currency = "USD", locale = "en-US") {
  if (value === 0) return "Free"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" || currency === "JPY" ? 0 : 2,
  }).format(value)
}
