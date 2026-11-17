import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { ArrowRightIcon, DownloadIcon, LinkIcon, MailIcon, PlusIcon, SearchIcon, SendIcon, StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker, DateRangePicker, type DateRange } from "@/components/ui/date-picker"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Rating } from "@/components/ui/rating"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/* ======================= Button ======================= */

export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function ButtonIconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <MailIcon /> Login with email
      </Button>
      <Button variant="secondary">
        Next <ArrowRightIcon />
      </Button>
      <Button variant="outline">
        <DownloadIcon /> Download
      </Button>
    </div>
  )
}

export function ButtonIconOnlyExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" size="icon-sm" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  )
}

export function ButtonLoadingExample() {
  const [loading, setLoading] = React.useState(false)
  return (
    <Button
      disabled={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1800)
      }}
    >
      {loading && <Spinner />}
      {loading ? "Please wait…" : "Save changes"}
    </Button>
  )
}

export function ButtonAsLinkExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button render={<a href="#/docs" />}>Documentation</Button>
      <Button variant="outline" render={<a href="#/components/all" />}>
        All components <ArrowRightIcon />
      </Button>
      <Button variant="link" render={<a href="#/skill" />}>
        <LinkIcon /> AI skill
      </Button>
    </div>
  )
}

export function ButtonGroupSplitExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGroup>
        <ButtonGroupText>Views</ButtonGroupText>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </div>
  )
}

/* ======================= Toggle ======================= */

export function ToggleOutlineExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle variant="outline" aria-label="Favorite">
        <StarIcon /> Favorite
      </Toggle>
      <Toggle aria-label="Disabled" disabled>
        Disabled
      </Toggle>
    </div>
  )
}

export function ToggleGroupMultipleExample() {
  return (
    <div className="space-y-3">
      <ToggleGroup defaultValue={["left"]} aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup multiple defaultValue={["bold", "italic"]} aria-label="Text style">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

/* ======================= Input ======================= */

export function InputWithLabelExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-email">Email</Label>
      <Input id="ex-email" type="email" placeholder="you@example.com" />
    </div>
  )
}

export function InputWithButtonExample() {
  return (
    <div className="flex w-full max-w-sm gap-2">
      <Input type="email" placeholder="Email" aria-label="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  )
}

export function InputFileExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-file">Picture</Label>
      <Input id="ex-file" type="file" />
    </div>
  )
}

export function InputStatesExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input disabled placeholder="Disabled" />
      <Input defaultValue="not-an-email" aria-invalid />
      <Input readOnly defaultValue="Read only value" />
      <Input type="password" defaultValue="secret" />
    </div>
  )
}

export function InputGroupIconExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupButtonExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <InputGroup>
        <InputGroupInput defaultValue="https://malam.dev/invite/x7k2" readOnly aria-label="Invite link" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Write a message…" aria-label="Message" />
        <InputGroupAddon align="block-end">
          <InputGroupText>0 / 280</InputGroupText>
          <InputGroupButton className="ml-auto" variant="default">
            <SendIcon /> Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

/* ======================= Textarea ======================= */

export function TextareaWithLabelExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-msg">Your message</Label>
      <Textarea id="ex-msg" placeholder="Type your message here." />
      <p className="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
    </div>
  )
}

export function TextareaWithButtonExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Textarea placeholder="Type your message here." aria-label="Message" />
      <Button>Send message</Button>
    </div>
  )
}

export function TextareaCounterExample() {
  const [text, setText] = React.useState("")
  const max = 120
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="ex-bio">Bio</Label>
      <Textarea id="ex-bio" value={text} maxLength={max} onChange={(e) => setText(e.target.value)} placeholder="Tell us about yourself" />
      <p className="text-right text-xs text-muted-foreground">
        {text.length} / {max}
      </p>
    </div>
  )
}

/* ======================= Field ======================= */

export function FieldFieldsetsExample() {
  return (
    <FieldGroup className="max-w-md">
      <FieldSet>
        <FieldLegend variant="label">Plan</FieldLegend>
        <FieldDescription>Select the billing plan that fits your team.</FieldDescription>
        <RadioGroup defaultValue="pro">
          {[
            ["starter", "Starter", "Up to 3 projects"],
            ["pro", "Pro", "Unlimited projects and priority support"],
          ].map(([v, t, d]) => (
            <Field key={v} orientation="horizontal">
              <RadioGroupItem value={v} id={`f-plan-${v}`} />
              <FieldContent>
                <FieldLabel htmlFor={`f-plan-${v}`}>{t}</FieldLabel>
                <FieldDescription>{d}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </RadioGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">Notifications</FieldLegend>
        <Field orientation="horizontal">
          <Checkbox id="f-n1" defaultChecked />
          <FieldLabel htmlFor="f-n1">Product updates</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="f-n2" />
          <FieldLabel htmlFor="f-n2">Security alerts</FieldLabel>
        </Field>
      </FieldSet>
    </FieldGroup>
  )
}

/* ======================= Checkbox ======================= */

export function CheckboxWithDescriptionExample() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="ex-terms" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="ex-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You agree to our Terms of Service and Privacy Policy.</FieldDescription>
      </FieldContent>
    </Field>
  )
}

export function CheckboxSelectAllExample() {
  const items = ["Recents", "Home", "Applications", "Desktop"]
  const [checked, setChecked] = React.useState<string[]>(["Home"])
  const all = checked.length === items.length
  const some = checked.length > 0 && !all
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="ex-all"
          checked={all}
          indeterminate={some}
          onCheckedChange={(v) => setChecked(v ? items : [])}
        />
        <Label htmlFor="ex-all" className="font-medium">
          Select all
        </Label>
      </div>
      {items.map((i) => (
        <div key={i} className="ml-6 flex items-center gap-2">
          <Checkbox
            id={`ex-${i}`}
            checked={checked.includes(i)}
            onCheckedChange={(v) => setChecked((c) => (v ? [...c, i] : c.filter((x) => x !== i)))}
          />
          <Label htmlFor={`ex-${i}`}>{i}</Label>
        </div>
      ))}
    </div>
  )
}

export function CheckboxCardExample() {
  return (
    <div className="grid max-w-md gap-3">
      {[
        ["Email", "Weekly summary of activity"],
        ["Push", "Instant alerts on your phone"],
      ].map(([t, d], i) => (
        <Label key={t} className="flex cursor-pointer items-start gap-3 rounded-sm border border-border p-3 hover:bg-accent/40 has-[[data-checked]]:border-primary has-[[data-checked]]:bg-accent/40">
          <Checkbox defaultChecked={i === 0} />
          <span className="grid gap-1">
            <span className="font-medium text-heading">{t}</span>
            <span className="text-sm font-normal text-muted-foreground">{d}</span>
          </span>
        </Label>
      ))}
    </div>
  )
}

/* ======================= Radio group ======================= */

export function RadioCardsExample() {
  return (
    <RadioGroup defaultValue="card" className="grid max-w-lg grid-cols-3 gap-3">
      {["Card", "PayPal", "Apple"].map((p) => (
        <Label key={p} className="flex cursor-pointer flex-col items-center gap-2 rounded-sm border border-border p-4 hover:bg-accent/40 has-[[data-checked]]:border-primary has-[[data-checked]]:bg-accent/40">
          <RadioGroupItem value={p.toLowerCase()} />
          {p}
        </Label>
      ))}
    </RadioGroup>
  )
}

export function RadioHorizontalExample() {
  return (
    <RadioGroup defaultValue="m" className="flex flex-wrap gap-6" aria-label="Size">
      {[
        ["s", "Small"],
        ["m", "Medium"],
        ["l", "Large"],
      ].map(([v, l]) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={`ex-size-${v}`} />
          <Label htmlFor={`ex-size-${v}`}>{l}</Label>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <RadioGroupItem value="xl" id="ex-size-xl" disabled />
        <Label htmlFor="ex-size-xl" className="opacity-50">
          XL (sold out)
        </Label>
      </div>
    </RadioGroup>
  )
}

/* ======================= Switch ======================= */

export function SwitchSettingsExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      {[
        ["Marketing emails", "Receive news and offers.", true],
        ["Security alerts", "Always on for your protection.", true],
        ["Beta features", "Try new things before everyone else.", false],
      ].map(([t, d, on]) => (
        <div key={t as string} className="flex items-center justify-between gap-4 rounded-sm border border-border p-3">
          <div>
            <Label htmlFor={`ex-sw-${t}`}>{t as string}</Label>
            <p className="text-sm text-muted-foreground">{d as string}</p>
          </div>
          <Switch id={`ex-sw-${t}`} defaultChecked={on as boolean} />
        </div>
      ))}
    </div>
  )
}

export function SwitchStatesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="ex-sw-sm" size="sm" defaultChecked />
        <Label htmlFor="ex-sw-sm">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="ex-sw-dis" disabled />
        <Label htmlFor="ex-sw-dis">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="ex-sw-dis2" disabled defaultChecked />
        <Label htmlFor="ex-sw-dis2">Disabled on</Label>
      </div>
    </div>
  )
}

/* ======================= Slider ======================= */

export function SliderRangeExample() {
  const [v, setV] = React.useState<number[]>([25, 75])
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <Label>Price range</Label>
        <span className="text-muted-foreground">
          ${v[0]} – ${v[1]}
        </span>
      </div>
      <Slider value={v} onValueChange={(x) => setV(Array.isArray(x) ? x : [x])} min={0} max={100} aria-label="Price range" />
    </div>
  )
}

export function SliderStepsExample() {
  const [v, setV] = React.useState<number[]>([50])
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <Label>Volume</Label>
        <span className="text-muted-foreground">{v[0]}%</span>
      </div>
      <Slider value={v} onValueChange={(x) => setV(Array.isArray(x) ? x : [x])} step={10} max={100} aria-label="Volume" />
    </div>
  )
}

export function SliderVerticalExample() {
  return (
    <div className="flex h-40 items-center gap-8">
      <Slider orientation="vertical" defaultValue={[60]} aria-label="Vertical" />
      <Slider orientation="vertical" defaultValue={[30]} disabled aria-label="Disabled vertical" />
    </div>
  )
}

/* ======================= Select ======================= */

export function SelectScrollableExample() {
  const zones = ["UTC−08:00 Pacific", "UTC−05:00 Eastern", "UTC+00:00 London", "UTC+01:00 Berlin", "UTC+05:30 India", "UTC+07:00 Jakarta", "UTC+08:00 Singapore", "UTC+09:00 Tokyo", "UTC+10:00 Sydney", "UTC+12:00 Auckland"]
  return (
    <Select defaultValue="UTC+07:00 Jakarta">
      <SelectTrigger className="w-64" aria-label="Time zone">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time zones</SelectLabel>
          {zones.map((z) => (
            <SelectItem key={z} value={z}>
              {z}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function SelectFieldExample() {
  const items = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "team", label: "Team" },
  ]
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="ex-plan">Plan</FieldLabel>
      <Select items={items} defaultValue="pro">
        <SelectTrigger id="ex-plan" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldDescription>You can change this later in billing.</FieldDescription>
    </Field>
  )
}

export function SelectSizesExample() {
  const items = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ]
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select items={items} defaultValue="a">
        <SelectTrigger size="sm" className="w-36" aria-label="Small">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={items} defaultValue="b" disabled>
        <SelectTrigger className="w-36" aria-label="Disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function NativeSelectGroupsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <NativeSelect className="w-56" aria-label="Framework">
        <NativeSelectOptGroup label="Frontend">
          <NativeSelectOption>React</NativeSelectOption>
          <NativeSelectOption>Vue</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Backend">
          <NativeSelectOption>Node.js</NativeSelectOption>
          <NativeSelectOption>Go</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <NativeSelect className="w-40" disabled aria-label="Disabled">
        <NativeSelectOption>Disabled</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}

/* ======================= Input OTP ======================= */

export function OTPFourDigitsExample() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="PIN">
      <InputOTPGroup>
        {[0, 1, 2, 3].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export function OTPControlledExample() {
  const [value, setValue] = React.useState("")
  return (
    <div className="grid gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue} pattern={REGEXP_ONLY_DIGITS} aria-label="Verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">{value.length === 6 ? `Code entered: ${value}` : "Enter your 6-digit code."}</p>
    </div>
  )
}

/* ======================= Calendar ======================= */

export function CalendarRangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(), to: new Date(Date.now() + 5 * 864e5) })
  return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} className="rounded-sm border" />
}

export function CalendarMultipleExample() {
  const [days, setDays] = React.useState<Date[] | undefined>([new Date()])
  return <Calendar mode="multiple" selected={days} onSelect={setDays} className="rounded-sm border" />
}

export function CalendarDropdownExample() {
  const [d, setD] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={d} onSelect={setD} captionLayout="dropdown" startMonth={new Date(1990, 0)} endMonth={new Date(2035, 11)} className="rounded-sm border" />
}

export function CalendarDisabledExample() {
  const [d, setD] = React.useState<Date | undefined>()
  return <Calendar mode="single" selected={d} onSelect={setD} disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]} className="rounded-sm border" />
}

/* ======================= Date picker ======================= */

export function DatePickerFieldExample() {
  const [d, setD] = React.useState<Date | undefined>()
  return (
    <Field className="max-w-64">
      <FieldLabel>Appointment date</FieldLabel>
      <DatePicker value={d} onValueChange={setD} fromDate={new Date()} placeholder="Choose a day" />
      <FieldDescription>Weekdays and future dates only in a real app.</FieldDescription>
    </Field>
  )
}

export function DatePickerBirthdayExample() {
  const [d, setD] = React.useState<Date | undefined>()
  return <DatePicker value={d} onValueChange={setD} captionLayout="dropdown" toDate={new Date()} fromDate={new Date(1940, 0)} placeholder="Date of birth" />
}

export function DatePickerClearableExample() {
  const [d, setD] = React.useState<Date | undefined>(new Date())
  return <DatePicker value={d} onValueChange={setD} clearable />
}

export function DatePickerLocaleExample() {
  const [d, setD] = React.useState<Date | undefined>(new Date())
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DatePicker value={d} onValueChange={setD} locale="id-ID" format={{ dateStyle: "full" }} className="max-w-80" />
      <DatePicker value={d} onValueChange={setD} locale="ja-JP" format={{ dateStyle: "long" }} className="max-w-56" />
    </div>
  )
}

export function DateRangeSingleMonthExample() {
  const [r, setR] = React.useState<DateRange | undefined>()
  return <DateRangePicker value={r} onValueChange={setR} numberOfMonths={1} />
}

export function DateRangeLimitedExample() {
  const [r, setR] = React.useState<DateRange | undefined>()
  const today = new Date()
  const in60 = new Date(Date.now() + 60 * 864e5)
  return <DateRangePicker value={r} onValueChange={setR} fromDate={today} toDate={in60} placeholder="Check-in – Check-out" />
}

/* ======================= Rating ======================= */

export function RatingHalfExample() {
  const [v, setV] = React.useState(3.5)
  return (
    <div className="flex items-center gap-3">
      <Rating value={v} onValueChange={setV} allowHalf aria-label="Rate this product" />
      <span className="text-sm text-muted-foreground tabular-nums">{v.toFixed(1)} / 5</span>
    </div>
  )
}

export function RatingReadOnlyExample() {
  return (
    <div className="grid gap-2">
      {[
        [4.5, 1280],
        [3, 342],
        [4.8, 9021],
      ].map(([score, count]) => (
        <div key={score} className="flex items-center gap-2">
          <Rating value={score} readOnly size="sm" allowHalf aria-label="Average rating" />
          <span className="text-sm text-heading tabular-nums">{score.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({count.toLocaleString()} reviews)</span>
        </div>
      ))}
    </div>
  )
}

export function RatingSizesExample() {
  return (
    <div className="grid gap-3">
      <Rating defaultValue={2} size="sm" aria-label="Small" />
      <Rating defaultValue={3} aria-label="Default" />
      <Rating defaultValue={4} size="lg" aria-label="Large" />
      <Rating defaultValue={7} max={10} aria-label="Out of ten" />
    </div>
  )
}

export function RatingFormExample() {
  const [rating, setRating] = React.useState(0)
  const [sent, setSent] = React.useState(false)
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel>How was your experience?</FieldLabel>
        <Rating value={rating} onValueChange={setRating} size="lg" aria-label="Your rating" />
        <FieldDescription>{rating ? `You rated ${rating} out of 5.` : "Select a rating."}</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="ex-review">Review</FieldLabel>
        <Textarea id="ex-review" placeholder="What did you like or dislike?" />
      </Field>
      <Button disabled={!rating || sent} onClick={() => setSent(true)} className="w-fit">
        {sent ? "Thanks for your feedback" : "Submit review"}
      </Button>
    </FieldGroup>
  )
}
