import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioDescriptionExample() {
  return (
    <RadioGroup defaultValue="comfortable" className="max-w-sm">
      {[
        ["default", "Default", "Standard spacing for most screens."],
        ["comfortable", "Comfortable", "More breathing room between elements."],
        ["compact", "Compact", "Fit more content on screen."],
      ].map(([v, t, d]) => (
        <Field key={v} orientation="horizontal">
          <RadioGroupItem value={v} id={`rd-${v}`} />
          <FieldContent>
            <FieldLabel htmlFor={`rd-${v}`}>{t}</FieldLabel>
            <FieldDescription>{d}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  )
}

export function RadioChoiceCardExample() {
  return (
    <FieldGroup className="max-w-md">
      <FieldSet>
        <FieldLegend variant="label">Compute environment</FieldLegend>
        <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
        <RadioGroup defaultValue="kubernetes">
          {[
            ["kubernetes", "Kubernetes", "Run GPU workloads on a K8s configured cluster."],
            ["vm", "Virtual Machine", "Access a VM configured cluster to run GPU workloads."],
          ].map(([v, t, d]) => (
            <FieldLabel key={v} htmlFor={`cc-${v}`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{t}</FieldTitle>
                  <FieldDescription>{d}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={v} id={`cc-${v}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  )
}

export function RadioFieldsetExample() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Subscription plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
      <RadioGroup defaultValue="monthly">
        {[
          ["monthly", "Monthly ($9.99/month)"],
          ["yearly", "Yearly ($99.99/year)"],
          ["lifetime", "Lifetime ($299.99)"],
        ].map(([v, l]) => (
          <Field key={v} orientation="horizontal">
            <RadioGroupItem value={v} id={`rf-${v}`} />
            <FieldLabel htmlFor={`rf-${v}`} className="font-normal">
              {l}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}

export function RadioDisabledExample() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <RadioGroup defaultValue="b" aria-label="One disabled option">
        {[
          ["a", "Available"],
          ["b", "Selected"],
          ["c", "Sold out"],
        ].map(([v, l]) => (
          <Field key={v} orientation="horizontal" data-disabled={v === "c" || undefined}>
            <RadioGroupItem value={v} id={`rx-${v}`} disabled={v === "c"} />
            <FieldLabel htmlFor={`rx-${v}`} className="font-normal">
              {l}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <RadioGroup defaultValue="x" disabled aria-label="Whole group disabled">
        {[
          ["x", "Whole group"],
          ["y", "is disabled"],
        ].map(([v, l]) => (
          <Field key={v} orientation="horizontal" data-disabled>
            <RadioGroupItem value={v} id={`ry-${v}`} />
            <FieldLabel htmlFor={`ry-${v}`} className="font-normal">
              {l}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </div>
  )
}

export function RadioInvalidExample() {
  const [value, setValue] = React.useState<string>("")
  const invalid = value === ""
  return (
    <FieldSet className="max-w-sm" data-invalid={invalid}>
      <FieldLegend variant="label">Notification preference</FieldLegend>
      <RadioGroup value={value} onValueChange={(v) => setValue(v as string)}>
        {[
          ["all", "All new messages"],
          ["mentions", "Direct messages and mentions"],
          ["none", "Nothing"],
        ].map(([v, l]) => (
          <Field key={v} orientation="horizontal" data-invalid={invalid}>
            <RadioGroupItem value={v} id={`ri-${v}`} aria-invalid={invalid} />
            <FieldLabel htmlFor={`ri-${v}`} className="font-normal">
              {l}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      {invalid && <FieldError>Please choose how you want to be notified.</FieldError>}
    </FieldSet>
  )
}

export function RadioControlledExample() {
  const [value, setValue] = React.useState("card")
  return (
    <div className="grid max-w-sm gap-4">
      <RadioGroup value={value} onValueChange={(v) => setValue(v as string)} aria-label="Payment method">
        {["card", "paypal", "bank"].map((v) => (
          <Field key={v} orientation="horizontal">
            <RadioGroupItem value={v} id={`rc-${v}`} />
            <FieldLabel htmlFor={`rc-${v}`} className="font-normal capitalize">
              {v}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-heading">{value}</span>
        </p>
        <Button size="sm" variant="outline" onClick={() => setValue("card")}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export function RadioPlanExample() {
  const plans = [
    { id: "hobby", name: "Hobby", price: "$0", perks: "1 project" },
    { id: "pro", name: "Pro", price: "$24", perks: "Unlimited projects" },
    { id: "scale", name: "Scale", price: "$99", perks: "SLA and SSO" },
  ]
  return (
    <RadioGroup defaultValue="pro" className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Plan">
      {plans.map((p) => (
        <Label
          key={p.id}
          className="relative flex cursor-pointer flex-col items-start gap-1 rounded-sm border border-border bg-card p-4 transition-colors hover:border-link has-[[data-checked]]:border-primary has-[[data-checked]]:bg-accent/40"
        >
          <RadioGroupItem value={p.id} className="absolute top-3 right-3" />
          <span className="font-semibold text-heading">{p.name}</span>
          <span className="text-2xl font-bold text-heading">
            {p.price}
            <span className="text-sm font-normal text-muted-foreground"> /mo</span>
          </span>
          <span className="text-sm font-normal text-muted-foreground">{p.perks}</span>
        </Label>
      ))}
    </RadioGroup>
  )
}

export function RadioIconCardsExample() {
  const methods = [
    ["card", "Credit card", "lucide:credit-card"],
    ["paypal", "PayPal", "logos:paypal"],
    ["apple", "Apple Pay", "logos:apple-pay"],
  ] as const
  return (
    <RadioGroup defaultValue="card" className="grid max-w-lg grid-cols-3 gap-3" aria-label="Payment method">
      {methods.map(([v, l, icon]) => (
        <Label
          key={v}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-sm border border-border p-4 text-center transition-colors hover:border-link has-[[data-checked]]:border-primary has-[[data-checked]]:bg-accent/40"
        >
          <RadioGroupItem value={v} className="sr-only" />
          <Icon icon={icon} size={32} className="text-heading" />
          <span className="text-sm">{l}</span>
        </Label>
      ))}
    </RadioGroup>
  )
}
