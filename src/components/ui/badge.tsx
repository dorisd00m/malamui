import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-accent [a]:hover:text-white",
        /** Discount chip: lime on olive. Pair with <PriceTag>. */
        sale: "rounded-none bg-sale px-1.5 font-semibold text-sale-foreground",
        /** Overlay labels on artwork ("TODAY'S DEAL", "NEW"). */
        label: "rounded-none bg-primary px-2 font-semibold tracking-wide text-white uppercase shadow-[0_2px_6px_rgb(0_0_0/0.4)]",
        live: "rounded-sm bg-black/70 font-semibold tracking-wide text-white uppercase before:size-2 before:rounded-full before:bg-live before:content-['']",
        /** Tag pills (genre, feature). */
        tag: "bg-white/10 font-normal text-link [a]:hover:bg-link [a]:hover:text-white",
        destructive: "bg-destructive/20 text-[color-mix(in_srgb,var(--destructive),white_45%)]",
        outline: "border-border text-foreground [a]:hover:border-link",
        ghost: "hover:bg-accent hover:text-heading",
        link: "text-link underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
