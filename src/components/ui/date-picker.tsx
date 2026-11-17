import * as React from "react"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type { DateRange }

const fmt = (d: Date, locale?: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, options ?? { dateStyle: "medium" }).format(d)

type PickerBase = {
  placeholder?: string
  disabled?: boolean
  /** Earliest selectable date. */
  fromDate?: Date
  /** Latest selectable date. */
  toDate?: Date
  /** Intl locale, e.g. "id-ID". Defaults to the browser locale. */
  locale?: string
  /** Intl format options for the button label. Default: { dateStyle: "medium" }. */
  format?: Intl.DateTimeFormatOptions
  /** "dropdown" adds month and year selects, handy for birthdays. */
  captionLayout?: "label" | "dropdown"
  className?: string
}

export type DatePickerProps = PickerBase & {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  /** Show a clear (x) button when a date is chosen. */
  clearable?: boolean
}

/** A button that opens a calendar popover and shows the chosen date. */
function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  fromDate,
  toDate,
  locale,
  format,
  captionLayout = "label",
  clearable,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={cn("relative inline-flex w-full max-w-64", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              disabled={disabled}
              className={cn("w-full justify-start font-normal", !value && "text-muted-foreground", clearable && value && "pr-8")}
            />
          }
        >
          <CalendarIcon />
          {value ? fmt(value, locale, format) : placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => {
              onValueChange?.(d)
              setOpen(false)
            }}
            captionLayout={captionLayout}
            disabled={[...(fromDate ? [{ before: fromDate }] : []), ...(toDate ? [{ after: toDate }] : [])]}
            startMonth={fromDate}
            endMonth={toDate}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {clearable && value && (
        <button
          type="button"
          aria-label="Clear date"
          onClick={() => onValueChange?.(undefined)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xs p-0.5 text-muted-foreground hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  )
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

export type DateRangePreset = { label: string; range: () => DateRange }

/** Common ranges relative to today. Pass your own list via the `presets` prop. */
export const defaultRangePresets: DateRangePreset[] = [
  { label: "Today", range: () => ({ from: startOfDay(new Date()), to: startOfDay(new Date()) }) },
  { label: "Last 7 days", range: () => ({ from: addDays(startOfDay(new Date()), -6), to: startOfDay(new Date()) }) },
  { label: "Last 30 days", range: () => ({ from: addDays(startOfDay(new Date()), -29), to: startOfDay(new Date()) }) },
  {
    label: "This month",
    range: () => {
      const n = new Date()
      return { from: new Date(n.getFullYear(), n.getMonth(), 1), to: new Date(n.getFullYear(), n.getMonth() + 1, 0) }
    },
  },
]

export type DateRangePickerProps = PickerBase & {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  /** Months shown side by side. */
  numberOfMonths?: 1 | 2
  /** Quick-select list. `true` uses defaultRangePresets. */
  presets?: boolean | DateRangePreset[]
}

/** Like DatePicker, but selects a start and end date, with optional presets. */
function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Pick a date range",
  disabled,
  fromDate,
  toDate,
  locale,
  format,
  captionLayout = "label",
  numberOfMonths = 2,
  presets,
  className,
}: DateRangePickerProps) {
  const list = presets === true ? defaultRangePresets : presets || []
  const label = value?.from ? (value.to ? `${fmt(value.from, locale, format)} – ${fmt(value.to, locale, format)}` : fmt(value.from, locale, format)) : placeholder

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" disabled={disabled} className={cn("w-full max-w-80 justify-start font-normal", !value?.from && "text-muted-foreground", className)} />}
      >
        <CalendarIcon />
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {list.length > 0 && (
            <ul className="hidden w-36 shrink-0 space-y-0.5 border-r border-border p-2 sm:block" aria-label="Presets">
              {list.map((p) => (
                <li key={p.label}>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => onValueChange?.(p.range())}>
                    {p.label}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Calendar
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={value}
            onSelect={(r) => onValueChange?.(r)}
            defaultMonth={value?.from}
            captionLayout={captionLayout}
            disabled={[...(fromDate ? [{ before: fromDate }] : []), ...(toDate ? [{ after: toDate }] : [])]}
            startMonth={fromDate}
            endMonth={toDate}
            autoFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
