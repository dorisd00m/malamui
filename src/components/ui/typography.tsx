import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Typography primitives. They only set size, weight and spacing, so color comes from the tokens
 * (headings use text-heading, body copy inherits text-foreground) and the font from --malam-font-sans.
 */

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 data-slot="h1" className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl", className)} {...props} />
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="h2"
      className={cn("scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  )
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="h3" className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 data-slot="h4" className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
}

function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="p" className={cn("leading-7 not-first:mt-6", className)} {...props} />
}

/** Intro paragraph under a page title. */
function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="lead" className={cn("text-xl text-muted-foreground", className)} {...props} />
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="large" className={cn("text-lg font-semibold text-heading", className)} {...props} />
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return <small data-slot="small" className={cn("text-sm leading-none font-medium", className)} {...props} />
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="muted" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return <blockquote data-slot="blockquote" className={cn("mt-6 border-l-2 border-primary pl-6 text-muted-foreground italic", className)} {...props} />
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="inline-code"
      className={cn("relative rounded-xs bg-(--tint) px-[0.35rem] py-[0.15rem] font-mono text-[0.875em] font-semibold text-link", className)}
      {...props}
    />
  )
}

/** Bulleted (default) or numbered list with sensible spacing. */
function List({ className, ordered, ...props }: React.ComponentProps<"ul"> & { ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul"
  return (
    <Tag
      data-slot="list"
      className={cn("my-6 ml-6 [&>li]:mt-2", ordered ? "list-decimal" : "list-disc marker:text-muted-foreground", className)}
      {...(props as React.ComponentProps<"ol">)}
    />
  )
}

/**
 * Styles raw HTML children (headings, paragraphs, lists, quotes, code, tables, images, links).
 * Use it for Markdown or CMS output you do not control the markup of.
 */
function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "max-w-none text-foreground",
        "[&_h1]:scroll-m-20 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:scroll-m-20 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight",
        "[&_h4]:mt-6 [&_h4]:text-xl [&_h4]:font-semibold",
        "[&_p]:mt-6 [&_p]:leading-7 [&_p:first-child]:mt-0",
        "[&_a]:font-medium [&_a]:text-link [&_a]:underline [&_a]:underline-offset-4",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:text-muted-foreground [&_blockquote]:italic",
        "[&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:my-6 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mt-2",
        "[&_:not(pre)>code]:rounded-xs [&_:not(pre)>code]:bg-(--tint) [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.875em] [&_:not(pre)>code]:text-link",
        "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm",
        "[&_hr]:my-8 [&_hr]:border-border",
        "[&_img]:mt-6 [&_img]:rounded-md [&_img]:border [&_img]:border-border",
        "[&_table]:mt-6 [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-heading [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2",
        className
      )}
      {...props}
    />
  )
}

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode, List, Prose }
