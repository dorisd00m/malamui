import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Malam button. Square-ish (2px radius), compact, 0.2s ease-out color/shadow
 * transitions. Hover = brighten, never scale.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent text-sm font-medium whitespace-nowrap transition-[color,background,box-shadow,filter] duration-200 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primary CTA — blue gradient, white text (e.g. "Sign In", "Play Now"). */
        default:
          "bg-primary-gradient text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.3)] hover:brightness-115 hover:shadow-glow-sm",
        /** Purchase / install — green. Reserve for money or install actions. */
        success:
          "bg-success-gradient text-success-foreground shadow-[0_1px_2px_rgb(0_0_0/0.3)] hover:brightness-120 hover:text-white",
        /** Quiet blue — the workhorse for nav and secondary actions. */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-gradient hover:text-white aria-expanded:bg-accent aria-expanded:text-white",
        outline:
          "border-input/80 bg-transparent text-foreground hover:border-link hover:text-heading aria-expanded:border-link",
        ghost:
          "text-foreground hover:bg-accent hover:text-heading aria-expanded:bg-accent aria-expanded:text-heading",
        destructive:
          "bg-destructive/20 text-[color-mix(in_srgb,var(--destructive),white_45%)] hover:bg-destructive hover:text-white",
        link: "h-auto px-0 text-link hover:text-heading",
      },
      size: {
        default: "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5 text-[0.9375rem]",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
