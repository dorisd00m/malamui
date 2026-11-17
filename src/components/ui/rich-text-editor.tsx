import * as React from "react"
import EditorJS, { type BlockAPI, type OutputData } from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Quote from "@editorjs/quote"
import Delimiter from "@editorjs/delimiter"
import InlineCode from "@editorjs/inline-code"
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  EraserIcon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type { OutputData }

type Align = "left" | "center" | "right" | "justify"

/* ---------------------------------------------------------------------------
   Alignment block tune: stores `align` per block so it survives save() and reload.
   Reachable from the block "⋮" menu and from the toolbar via setBlockAlign().
--------------------------------------------------------------------------- */
const alignTunes = new Map<string, AlignTune>()

class AlignTune {
  static isTune = true
  private data: { align: Align }
  private block: BlockAPI
  private wrapper?: HTMLElement

  constructor({ data, block }: { data?: { align?: Align }; block: BlockAPI }) {
    this.data = { align: data?.align ?? "left" }
    this.block = block
    alignTunes.set(block.id, this)
  }

  render() {
    const el = document.createElement("div")
    el.style.cssText = "display:flex;gap:4px;padding:4px"
    ;(["left", "center", "right", "justify"] as Align[]).forEach((a) => {
      const b = document.createElement("button")
      b.type = "button"
      b.textContent = a[0].toUpperCase() + a.slice(1)
      b.style.cssText = "flex:1;padding:4px 6px;border-radius:4px;font-size:12px;cursor:pointer;background:transparent;color:inherit;border:1px solid var(--border)"
      b.onclick = () => this.set(a)
      el.appendChild(b)
    })
    return el
  }

  wrap(content: HTMLElement) {
    this.wrapper = content
    this.apply()
    return content
  }

  get align() {
    return this.data.align
  }

  set(a: Align) {
    this.data.align = a
    this.apply()
    this.block.dispatchChange()
  }

  private apply() {
    if (this.wrapper) this.wrapper.style.textAlign = this.data.align
  }

  save() {
    return this.data
  }
}

const FONT_FAMILIES = {
  sans: { label: "Sans", css: "var(--font-sans)" },
  serif: { label: "Serif", css: "Georgia, 'Times New Roman', serif" },
  mono: { label: "Mono", css: "var(--font-mono)" },
} as const

const FAMILY_ITEMS = [
  { value: "sans", label: "Sans" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
]

const FONT_SIZES = ["14", "16", "18", "20", "24"] as const

const SIZE_ITEMS = ["14", "16", "18", "20", "24"].map((v) => ({ value: v, label: `${v}px` }))

const BLOCK_TYPES = [
  { value: "paragraph", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "h4", label: "Heading 4" },
  { value: "quote", label: "Quote" },
] as const

const TEXT_COLORS = ["#f4f4f5", "#8e8e96", "#ff5d5d", "#f5a524", "#2fbf71", "#12b8c9", "#9b6bff"]
const HIGHLIGHTS = ["#fde68a", "#bbf7d0", "#bfdbfe", "#fbcfe8"]

export type RichTextEditorProps = {
  /** Initial content (Editor.js output). */
  value?: OutputData
  /** Fires with the saved Editor.js data whenever content changes. */
  onChange?: (data: OutputData) => void
  placeholder?: string
  readOnly?: boolean
  /** Min height of the writing area in px. */
  minHeight?: number
  className?: string
}

/**
 * Block-style WYSIWYG editor built on Editor.js with a formatting top bar:
 * block style, font family & size, bold / italic / underline / strike, text color,
 * highlight, alignment and clear formatting.
 */
function RichTextEditor({ value, onChange, placeholder = "Type '/' for commands, or just start writing…", readOnly, minHeight = 260, className }: RichTextEditorProps) {
  const holderRef = React.useRef<HTMLDivElement>(null)
  const editorRef = React.useRef<EditorJS | null>(null)
  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange
  const initialRef = React.useRef(value)

  const [family, setFamily] = React.useState<keyof typeof FONT_FAMILIES>("sans")
  const [size, setSize] = React.useState<(typeof FONT_SIZES)[number]>("16")
  const [blockType, setBlockType] = React.useState<(typeof BLOCK_TYPES)[number]["value"]>("paragraph")
  const [formats, setFormats] = React.useState({ bold: false, italic: false, underline: false, strike: false })

  React.useEffect(() => {
    const holder = holderRef.current
    if (!holder) return
    let cancelled = false
    const mount = document.createElement("div")
    holder.appendChild(mount)
    const editor = new EditorJS({
      holder: mount,
      data: initialRef.current,
      placeholder,
      readOnly,
      minHeight: 0,
      tunes: ["align"],
      tools: {
        header: { class: Header as never, inlineToolbar: true, config: { levels: [1, 2, 3, 4], defaultLevel: 2 } },
        list: { class: List as never, inlineToolbar: true },
        quote: { class: Quote as never, inlineToolbar: true },
        delimiter: Delimiter as never,
        inlineCode: InlineCode as never,
        align: AlignTune as never,
      },
      // allow the inline formatting the top bar produces
      sanitizer: {
        b: true,
        strong: true,
        i: true,
        em: true,
        u: true,
        s: true,
        strike: true,
        mark: { class: true },
        code: { class: true },
        a: { href: true, target: true, rel: true },
        font: { color: true },
        span: { style: true },
        br: true,
      },
      onChange: async () => {
        const data = await editor.save()
        if (!cancelled) onChangeRef.current?.(data)
      },
    })
    editorRef.current = editor
    return () => {
      cancelled = true
      editorRef.current = null
      editor
        .isReady.then(() => editor.destroy())
        .catch(() => undefined)
        .finally(() => mount.remove())
    }
    // The editor is created once; value is only the initial content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder, readOnly])

  /* keep toolbar state in sync with the caret */
  React.useEffect(() => {
    const sync = () => {
      const holder = holderRef.current
      const sel = window.getSelection()
      if (!holder || !sel?.anchorNode || !holder.contains(sel.anchorNode)) return
      setFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strike: document.queryCommandState("strikeThrough"),
      })
      const ed = editorRef.current
      if (!ed) return
      try {
        const block = ed.blocks.getBlockByIndex(ed.blocks.getCurrentBlockIndex())
        if (!block) return
        const h = block.holder.querySelector("h1,h2,h3,h4")
        setBlockType(block.name === "header" && h ? (h.tagName.toLowerCase() as "h1") : block.name === "quote" ? "quote" : "paragraph")
      } catch {
        /* editor not ready */
      }
    }
    document.addEventListener("selectionchange", sync)
    return () => document.removeEventListener("selectionchange", sync)
  }, [])

  const exec = (command: string, arg?: string) => {
    const holder = holderRef.current
    const sel = window.getSelection()
    if (!holder || !sel?.anchorNode || !holder.contains(sel.anchorNode)) return
    document.execCommand("styleWithCSS", false, "false")
    document.execCommand(command, false, arg)
    // execCommand does not fire Editor.js' own input detection reliably
    holder.dispatchEvent(new InputEvent("input", { bubbles: true }))
  }

  const setBlockAlign = (a: Align) => {
    const ed = editorRef.current
    if (!ed) return
    const block = ed.blocks.getBlockByIndex(ed.blocks.getCurrentBlockIndex())
    if (block) alignTunes.get(block.id)?.set(a)
  }

  const convert = async (type: string) => {
    const ed = editorRef.current
    if (!ed) return
    const block = ed.blocks.getBlockByIndex(ed.blocks.getCurrentBlockIndex())
    if (!block) return
    try {
      if (type === "paragraph") await ed.blocks.convert(block.id, "paragraph")
      else if (type === "quote") await ed.blocks.convert(block.id, "quote")
      else await ed.blocks.convert(block.id, "header", { level: Number(type.slice(1)) })
      setBlockType(type as typeof blockType)
    } catch {
      /* block cannot be converted (e.g. empty) */
    }
  }

  // Keep the editor selection when pressing toolbar buttons.
  const keepFocus = (e: React.MouseEvent) => e.preventDefault()

  const FormatToggle = ({ label, icon: Icon, pressed, onClick }: { label: string; icon: typeof BoldIcon; pressed?: boolean; onClick: () => void }) => (
    <Tooltip>
      <TooltipTrigger
        render={
          <Toggle size="sm" aria-label={label} pressed={pressed ?? false} onMouseDown={keepFocus} onPressedChange={onClick} disabled={readOnly} />
        }
      >
        <Icon />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )

  return (
    <div data-slot="rich-text-editor" className={cn("overflow-hidden rounded-md border border-border bg-card", className)}>
      {/* Top bar */}
      <div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 border-b border-border bg-surface p-1.5">
        <Select items={BLOCK_TYPES} value={blockType} onValueChange={(v) => v && void convert(v)} disabled={readOnly}>
          <SelectTrigger size="sm" className="w-32" aria-label="Block style">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BLOCK_TYPES.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={FAMILY_ITEMS} value={family} onValueChange={(v) => v && setFamily(v as keyof typeof FONT_FAMILIES)} disabled={readOnly}>
          <SelectTrigger size="sm" className="w-24" aria-label="Font family">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(FONT_FAMILIES) as (keyof typeof FONT_FAMILIES)[]).map((k) => (
              <SelectItem key={k} value={k}>
                {FONT_FAMILIES[k].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={SIZE_ITEMS} value={size} onValueChange={(v) => v && setSize(v as (typeof FONT_SIZES)[number])} disabled={readOnly}>
          <SelectTrigger size="sm" className="w-[4.5rem]" aria-label="Font size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="mx-1 h-5" />
        <FormatToggle label="Bold" icon={BoldIcon} pressed={formats.bold} onClick={() => exec("bold")} />
        <FormatToggle label="Italic" icon={ItalicIcon} pressed={formats.italic} onClick={() => exec("italic")} />
        <FormatToggle label="Underline" icon={UnderlineIcon} pressed={formats.underline} onClick={() => exec("underline")} />
        <FormatToggle label="Strikethrough" icon={StrikethroughIcon} pressed={formats.strike} onClick={() => exec("strikeThrough")} />

        <Separator orientation="vertical" className="mx-1 h-5" />
        <div className="flex items-center gap-1" role="group" aria-label="Text color">
          {TEXT_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Text color ${c}`}
              onMouseDown={keepFocus}
              onClick={() => exec("foreColor", c)}
              disabled={readOnly}
              style={{ background: c }}
              className="size-4 rounded-full border border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          ))}
        </div>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <div className="flex items-center gap-1" role="group" aria-label="Highlight">
          <HighlighterIcon className="size-4 text-muted-foreground" aria-hidden />
          {HIGHLIGHTS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Highlight ${c}`}
              onMouseDown={keepFocus}
              onClick={() => exec("hiliteColor", c)}
              disabled={readOnly}
              style={{ background: c }}
              className="size-4 rounded-xs border border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          ))}
        </div>

        <Separator orientation="vertical" className="mx-1 h-5" />
        <FormatToggle label="Align left" icon={AlignLeftIcon} onClick={() => setBlockAlign("left")} />
        <FormatToggle label="Align center" icon={AlignCenterIcon} onClick={() => setBlockAlign("center")} />
        <FormatToggle label="Align right" icon={AlignRightIcon} onClick={() => setBlockAlign("right")} />
        <FormatToggle label="Justify" icon={AlignJustifyIcon} onClick={() => setBlockAlign("justify")} />

        <Separator orientation="vertical" className="mx-1 h-5" />
        <FormatToggle label="Clear formatting" icon={EraserIcon} onClick={() => exec("removeFormat")} />
      </div>

      {/* Writing area */}
      <div
        className="malam-editor px-6 py-4 text-foreground"
        style={{ fontFamily: FONT_FAMILIES[family].css, fontSize: `${size}px`, minHeight }}
      >
        <div ref={holderRef} />
      </div>
    </div>
  )
}

export { RichTextEditor }
