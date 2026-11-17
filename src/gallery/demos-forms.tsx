import * as React from "react"
import { BoldIcon, ItalicIcon, MailIcon, SearchIcon, UnderlineIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const genres = ["Action", "Strategy", "Simulation", "Racing", "Puzzle", "Horror"]

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="cta">CTA</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">XSmall</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}

export function InputDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <Input placeholder="Search the store" />
      <Input type="email" placeholder="Email" />
      <Input disabled placeholder="Disabled" />
      <Input aria-invalid placeholder="Invalid" />
    </div>
  )
}

export function InputGroupDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    </div>
  )
}

export function TextareaDemo() {
  return <Textarea className="max-w-sm" placeholder="Write a review…" />
}

export function LabelDemo() {
  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="lbl-demo">Display name</Label>
      <Input id="lbl-demo" placeholder="Malam Player" />
    </div>
  )
}

export function FieldDemo() {
  const [invalid, setInvalid] = React.useState(true)
  return (
    <form className="w-full max-w-2xl" onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Account</FieldLegend>
          <FieldDescription>Manage how you appear and how we reach you.</FieldDescription>
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="f-name">Display name</FieldLabel>
                <Input id="f-name" placeholder="Malam Player" />
                <FieldDescription>Shown on your public profile.</FieldDescription>
              </Field>
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor="f-email">Email</FieldLabel>
                <Input
                  id="f-email"
                  type="email"
                  defaultValue="not-an-email"
                  aria-invalid={invalid}
                  onChange={(e) => setInvalid(!e.target.value.includes("@"))}
                />
                {invalid ? <FieldError>Enter a valid email address.</FieldError> : <FieldDescription>Looks good.</FieldDescription>}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="f-genre">Favorite genre</FieldLabel>
              <Select defaultValue="Strategy">
                <SelectTrigger id="f-genre" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-bio">Bio</FieldLabel>
              <Textarea id="f-bio" placeholder="Tell us about yourself" />
              <FieldDescription>Up to 160 characters.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend variant="label">Notifications</FieldLegend>
          <FieldGroup className="gap-4">
            <Field orientation="horizontal">
              <Checkbox id="f-sales" defaultChecked />
              <FieldContent>
                <FieldLabel htmlFor="f-sales">Sales and discounts</FieldLabel>
                <FieldDescription>Get notified when games on your wishlist drop in price.</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="f-digest">Weekly digest</FieldLabel>
                <FieldDescription>A summary of new releases every Monday.</FieldDescription>
              </FieldContent>
              <Switch id="f-digest" />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save changes</Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export function CheckboxDemo() {
  return (
    <div className="grid gap-3">
      {["Notify me about sales", "Show in library", "Auto-update"].map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <Checkbox id={`cb-${i}`} defaultChecked={i === 0} />
          <Label htmlFor={`cb-${i}`}>{l}</Label>
        </div>
      ))}
    </div>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="standard">
      {["standard", "express", "pickup"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={`rg-${v}`} />
          <Label htmlFor={`rg-${v}`} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="sw-demo" defaultChecked />
      <Label htmlFor="sw-demo">Enable overlay</Label>
    </div>
  )
}

export function SliderDemo() {
  return <Slider defaultValue={[40]} max={100} className="max-w-sm" />
}

export function SelectDemo() {
  return (
    <Select defaultValue="Strategy">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genres</SelectLabel>
          {genres.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function NativeSelectDemo() {
  return (
    <NativeSelect className="max-w-48">
      {genres.map((g) => (
        <NativeSelectOption key={g}>{g}</NativeSelectOption>
      ))}
    </NativeSelect>
  )
}

export function ComboboxDemo() {
  return (
    <Combobox items={genres}>
      <ComboboxInput placeholder="Pick a genre" className="max-w-56" />
      <ComboboxContent>
        <ComboboxEmpty>No genre found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <ToggleGroup defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
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
  )
}

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-sm border" />
}

export function KbdDemo() {
  return (
    <div className="flex items-center gap-3">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <Kbd>Esc</Kbd>
    </div>
  )
}
