import * as React from "react"
import {
  AlertCircleIcon,
  ArrowUpIcon,
  BrainIcon,
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  HeartIcon,
  PaperclipIcon,
  RotateCcwIcon,
  SearchIcon,
  SparklesIcon,
  ThumbsUpIcon,
  XIcon,
} from "lucide-react"
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/components/ui/message-scroller"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Spinner } from "@/components/ui/spinner"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

/* ======================= Message ======================= */

export function MessageDemo() {
  return (
    <MessageGroup className="max-w-lg">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src="https://picsum.photos/seed/assistant/96/96" alt="" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Malam Assistant</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Hi! I can help you pick a theme, wire up a form or debug a layout. What are you working on?</BubbleContent>
          </Bubble>
          <MessageFooter>10:24</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>I need a pricing page with three plans.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

export function MessageVariantsExample() {
  const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const
  return (
    <BubbleGroup className="max-w-md">
      {variants.map((v) => (
        <Bubble key={v} variant={v}>
          <BubbleContent className="capitalize">{v} bubble</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  )
}

export function MessageGroupedExample() {
  return (
    <MessageGroup className="max-w-lg gap-1">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src="https://picsum.photos/seed/olivia/96/96" alt="" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent className="gap-1">
          <MessageHeader>Olivia Martin</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Did you see the new release?</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>The light mode looks great.</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>Also the Iconify support 🎉</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent className="gap-1">
          <Bubble>
            <BubbleContent>Yes! Shipping it today.</BubbleContent>
          </Bubble>
          <MessageFooter>Seen 10:31</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

export function MessageReactionsExample() {
  return (
    <MessageGroup className="max-w-md pb-3">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>We hit 10,000 installs this week.</BubbleContent>
            <BubbleReactions>
              <span>🎉</span>
              <span>12</span>
            </BubbleReactions>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Incredible work, team.</BubbleContent>
            <BubbleReactions side="top" align="start">
              <HeartIcon className="size-3.5 fill-current text-destructive" />
              <span className="text-xs">3</span>
            </BubbleReactions>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

export function MessageAttachmentsExample() {
  return (
    <MessageGroup className="max-w-md">
      <Message align="end">
        <MessageContent>
          <AttachmentGroup>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <img src="https://picsum.photos/seed/attach-1/200/200" alt="Mockup" />
              </AttachmentMedia>
            </Attachment>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <img src="https://picsum.photos/seed/attach-2/200/200" alt="Moodboard" />
              </AttachmentMedia>
            </Attachment>
          </AttachmentGroup>
          <Bubble>
            <BubbleContent>Here are the two directions I like.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

export function MessageTypingExample() {
  return (
    <Message className="max-w-md">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent className="flex items-center gap-1.5 py-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
            <span className="sr-only">Assistant is typing</span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

export function MessageErrorExample() {
  return (
    <Message align="end" className="max-w-md">
      <MessageContent>
        <Bubble variant="destructive">
          <BubbleContent>Could not send. Check your connection.</BubbleContent>
        </Bubble>
        <MessageFooter className="gap-2 text-destructive">
          <AlertCircleIcon className="size-3.5" /> Not delivered
          <Button size="xs" variant="outline">
            <RotateCcwIcon /> Retry
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  )
}

export function MessageAiResponseExample() {
  return (
    <Message className="max-w-xl">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>
            <SparklesIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="ghost">
          <BubbleContent className="space-y-3">
            <p>Here is a quick plan for the pricing page:</p>
            <ol className="ml-5 list-decimal space-y-1">
              <li>Three cards: Hobby, Pro and Scale.</li>
              <li>Highlight Pro with a primary border.</li>
              <li>Add an FAQ accordion below.</li>
            </ol>
          </BubbleContent>
        </Bubble>
        <div className="flex gap-1">
          <Button size="icon-xs" variant="ghost" aria-label="Good response">
            <ThumbsUpIcon />
          </Button>
          <Button size="icon-xs" variant="ghost" aria-label="Copy">
            <FileTextIcon />
          </Button>
        </div>
      </MessageContent>
    </Message>
  )
}

/* ======================= Bubble ======================= */

export function BubbleSuggestionsExample() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="grid max-w-md gap-3">
      <BubbleGroup>
        {["Show me pricing examples", "Explain the theme tokens", "Build a dashboard"].map((s) => (
          <Bubble key={s} variant="outline">
            <BubbleContent render={<button type="button" onClick={() => setPicked(s)} />} className="cursor-pointer">
              {s}
            </BubbleContent>
          </Bubble>
        ))}
      </BubbleGroup>
      {picked && <p className="text-sm text-muted-foreground">You picked: {picked}</p>}
    </div>
  )
}

/* ======================= Message scroller ======================= */

const seed = [
  ["them", "Morning! Is the staging build up?"],
  ["me", "Yes, deployed a few minutes ago."],
  ["them", "Great. Any breaking changes?"],
  ["me", "Only the success → cta rename for buttons."],
  ["them", "Got it. I'll update the checkout page."],
  ["me", "Thanks. Ping me if the gradients look off."],
  ["them", "Will do. Also, can we add a rating widget?"],
  ["me", "Already in the registry: @malam/rating."],
  ["them", "You are fast."],
  ["me", "Coffee helps ☕"],
] as const

export function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState<{ id: string; who: "me" | "them"; text: string }[]>(() =>
    seed.map(([who, text], i) => ({ id: `m${i}`, who, text }))
  )
  const [draft, setDraft] = React.useState("")

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((m) => [...m, { id: `m${Date.now()}`, who: "me" as const, text }])
    setDraft("")
    setTimeout(() => setMessages((m) => [...m, { id: `r${Date.now()}`, who: "them" as const, text: "Nice, noted!" }]), 700)
  }

  return (
    <div className="flex h-96 w-full max-w-lg flex-col overflow-hidden rounded-md border border-border bg-card">
      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
        <MessageScroller className="flex-1">
          <MessageScrollerViewport aria-label="Conversation">
            <MessageScrollerContent className="gap-3 p-4">
              {messages.map((m) => (
                <MessageScrollerItem key={m.id} messageId={m.id}>
                  <Message align={m.who === "me" ? "end" : "start"}>
                    <MessageContent>
                      <Bubble variant={m.who === "me" ? "default" : "muted"}>
                        <BubbleContent>{m.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton className="bottom-3" />
        </MessageScroller>
      </MessageScrollerProvider>
      <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" aria-label="Message" />
        <Button type="submit" size="icon" aria-label="Send">
          <ArrowUpIcon />
        </Button>
      </form>
    </div>
  )
}

function ScrollerJumpControls() {
  const { scrollToStart, scrollToEnd, scrollToMessage } = useMessageScroller()
  return (
    <div className="flex flex-wrap gap-2 border-b border-border p-2">
      <Button size="xs" variant="outline" onClick={() => scrollToStart()}>
        Top
      </Button>
      <Button size="xs" variant="outline" onClick={() => scrollToMessage("msg-20", { align: "center" })}>
        Message 20
      </Button>
      <Button size="xs" variant="outline" onClick={() => scrollToEnd()}>
        Bottom
      </Button>
    </div>
  )
}

export function MessageScrollerJumpExample() {
  return (
    <div className="flex h-80 w-full max-w-md flex-col overflow-hidden rounded-md border border-border bg-card">
      <MessageScrollerProvider defaultScrollPosition="start">
        <ScrollerJumpControls />
        <MessageScroller className="flex-1">
          <MessageScrollerViewport aria-label="Long conversation">
            <MessageScrollerContent className="gap-2 p-3">
              {Array.from({ length: 40 }, (_, i) => (
                <MessageScrollerItem key={i} messageId={`msg-${i + 1}`}>
                  <Bubble variant="muted">
                    <BubbleContent>Message {i + 1}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton className="bottom-3" />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}

export function MessageScrollerPrependExample() {
  const [older, setOlder] = React.useState(0)
  const [items, setItems] = React.useState(() => Array.from({ length: 12 }, (_, i) => `Recent message ${i + 1}`))
  return (
    <div className="flex h-80 w-full max-w-md flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-2 text-xs text-muted-foreground">
        Loaded {older} older batches
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setOlder((n) => n + 1)
            setItems((cur) => [...Array.from({ length: 5 }, (_, i) => `Older message ${older * 5 + i + 1}`), ...cur])
          }}
        >
          Load earlier
        </Button>
      </div>
      <MessageScrollerProvider defaultScrollPosition="end">
        <MessageScroller className="flex-1">
          <MessageScrollerViewport aria-label="History" preserveScrollOnPrepend>
            <MessageScrollerContent className="gap-2 p-3">
              {items.map((t) => (
                <MessageScrollerItem key={t} messageId={t}>
                  <Bubble variant="muted">
                    <BubbleContent>{t}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}

/* ======================= Attachment ======================= */

export function AttachmentDemo() {
  return (
    <AttachmentGroup>
      <Attachment>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-brief.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia variant="image">
          <img src="https://picsum.photos/seed/attachment-demo/120/120" alt="Cover" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>cover.jpg</AttachmentTitle>
          <AttachmentDescription>JPG · 540 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  )
}

export function AttachmentStatesExample() {
  const states = ["idle", "uploading", "processing", "error", "done"] as const
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {states.map((s) => (
        <Attachment key={s} state={s} className="w-full">
          <AttachmentMedia>{s === "error" ? <AlertCircleIcon /> : s === "uploading" || s === "processing" ? <Spinner /> : <FileTextIcon />}</AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>report-{s}.pdf</AttachmentTitle>
            <AttachmentDescription>{s === "error" ? "Upload failed" : s === "uploading" ? "Uploading…" : s === "processing" ? "Processing…" : s === "idle" ? "Ready to send" : "Uploaded"}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}

export function AttachmentActionsExample() {
  const [files, setFiles] = React.useState(["notes.md", "budget.xlsx", "logo.svg"])
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((f) => (
        <Attachment key={f}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{f}</AttachmentTitle>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${f}`} onClick={() => setFiles((all) => all.filter((x) => x !== f))}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
      {files.length === 0 && (
        <Button size="sm" variant="outline" onClick={() => setFiles(["notes.md", "budget.xlsx", "logo.svg"])}>
          <PaperclipIcon /> Restore
        </Button>
      )}
    </div>
  )
}

export function AttachmentSizesExample() {
  return (
    <div className="grid gap-3">
      {(["default", "sm", "xs"] as const).map((s) => (
        <Attachment key={s} size={s}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>size-{s}.pdf</AttachmentTitle>
            <AttachmentDescription>1.2 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}

export function AttachmentVerticalExample() {
  return (
    <AttachmentGroup>
      {[1, 2, 3, 4].map((n) => (
        <Attachment key={n} orientation="vertical">
          <AttachmentMedia variant="image">
            <img src={`https://picsum.photos/seed/vertical-attach-${n}/200/200`} alt={`Photo ${n}`} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>photo-{n}.jpg</AttachmentTitle>
            <AttachmentDescription>1.{n} MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}

/* ======================= Marker ======================= */

export function MarkerDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Marker>
        <MarkerIcon>
          <CheckIcon />
        </MarkerIcon>
        <MarkerContent>Conversation started</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>New messages</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Earlier this week</MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerInChatExample() {
  return (
    <div className="grid max-w-md gap-3">
      <Marker variant="separator">
        <MarkerContent>Yesterday</MarkerContent>
      </Marker>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>See you tomorrow!</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Morning ☀️</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}

/* ======================= Trace ======================= */

export function TraceDemo() {
  return (
    <Trace className="max-w-md">
      <TraceLine>
        <TraceIcon>
          <BrainIcon />
        </TraceIcon>
        <TraceTitle>Thought for 6 seconds</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Spinner />
        </TraceIcon>
        <TraceTitle>Searching the web</TraceTitle>
        <TraceDescription>malam ui themes</TraceDescription>
      </TraceLine>
    </Trace>
  )
}

export function TraceCollapsibleExample() {
  return (
    <Trace className="max-w-md">
      <TraceCollapsible>
        <TraceCollapsibleTrigger render={<button type="button" />}>
          <TraceIcon>
            <GlobeIcon />
          </TraceIcon>
          <TraceTitle>Searched 3 sources</TraceTitle>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <ul className="space-y-1 pt-1 text-sm text-muted-foreground">
            <li>ui.shadcn.com: Radio group</li>
            <li>base-ui.com: Components overview</li>
            <li>iconify.design: Icon sets</li>
          </ul>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}

export function TraceStatusExample() {
  return (
    <Trace className="max-w-md">
      <TraceLine>
        <TraceIcon>
          <CheckIcon />
        </TraceIcon>
        <TraceTitle>Read 4 files</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Waiting to search</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <AlertCircleIcon />
        </TraceIcon>
        <TraceTitle>Tool call failed</TraceTitle>
        <TraceDescription>timeout after 30s</TraceDescription>
      </TraceLine>
    </Trace>
  )
}

/* ======================= Questionnaire ======================= */

export function QuestionnaireDemo() {
  const [result, setResult] = React.useState<Record<string, FormDataEntryValue | FormDataEntryValue[]> | null>(null)
  const items = [
    { name: "role", required: true, choices: [{ value: "design" }, { value: "engineering" }, { value: "product" }] },
    { name: "tools", choices: [{ value: "figma" }, { value: "vscode" }, { value: "notion" }] },
    { name: "feedback" },
  ]
  if (result) {
    return (
      <div className="grid max-w-md gap-3">
        <p className="text-sm font-medium text-heading">Thanks! Here is what you told us:</p>
        <pre className="overflow-auto rounded-sm border border-border bg-surface p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
        <Button size="sm" variant="outline" className="w-fit" onClick={() => setResult(null)}>
          Start over
        </Button>
      </div>
    )
  }
  return (
    <Questionnaire
      items={items}
      shortcuts="numbers"
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const out: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {}
        for (const k of new Set(fd.keys())) out[k] = fd.getAll(k).length > 1 ? fd.getAll(k) : (fd.get(k) as FormDataEntryValue)
        setResult(out)
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick one. Press 1, 2 or 3 as a shortcut.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
          <QuestionnaireChoice value="engineering">Engineering</QuestionnaireChoice>
          <QuestionnaireChoice value="product">
            Product <QuestionnaireChoiceDescription>Roadmaps and strategy</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError>Please choose a role.</QuestionnaireError>
      </QuestionnaireItem>
      <QuestionnaireItem name="tools" multiple>
        <QuestionnaireTitle>Which tools do you use every day?</QuestionnaireTitle>
        <QuestionnaireDescription>Select all that apply, or skip.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="figma">Figma</QuestionnaireChoice>
          <QuestionnaireChoice value="vscode">VS Code</QuestionnaireChoice>
          <QuestionnaireChoice value="notion">Notion</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="feedback">
        <QuestionnaireTitle>Anything else you would like to tell us?</QuestionnaireTitle>
        <QuestionnaireInput type="text" placeholder="Your feedback" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export function QuestionnaireRequiredExample() {
  const [done, setDone] = React.useState(false)
  return done ? (
    <div className="flex items-center gap-3 text-sm">
      <CheckIcon className="size-4 text-success" /> Saved.
      <Button size="sm" variant="outline" onClick={() => setDone(false)}>
        Again
      </Button>
    </div>
  ) : (
    <Questionnaire
      className="max-w-md"
      items={[{ name: "email", required: true }]}
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <QuestionnaireItem name="email" required>
        <QuestionnaireTitle>What is your email?</QuestionnaireTitle>
        <QuestionnaireDescription>This question is required, so Next and Submit validate it.</QuestionnaireDescription>
        <QuestionnaireInput type="email" placeholder="you@example.com" />
        <QuestionnaireError>Enter an email address to continue.</QuestionnaireError>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
