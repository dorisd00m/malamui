import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import {
  AppWindowIcon,
  ArrowRightIcon,
  GamepadIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  MonitorSmartphoneIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DashboardDemo } from "../demos/dashboard"
import { DesktopDemo } from "../demos/desktop"
import { GameDemo } from "../demos/game"
import { KioskDemo } from "../demos/kiosk"
import { WebsiteDemo } from "../demos/website"

const STAGE_W = 1280
const STAGE_H = 800

const steps = [
  { id: "dashboard", icon: LayoutDashboardIcon, title: "Dashboard", body: "Stats, charts, tables and goals with status colors that mean something.", view: DashboardDemo },
  { id: "website", icon: GlobeIcon, title: "Website", body: "A full marketing page: hero, features, pricing, FAQ and footer.", view: WebsiteDemo },
  { id: "desktop", icon: AppWindowIcon, title: "Desktop app", body: "A graphic editor with a toolbox, layers and properties panel.", view: DesktopDemo },
  { id: "kiosk", icon: MonitorSmartphoneIcon, title: "Kiosk", body: "Touch-first ordering with big targets and a live cart.", view: KioskDemo },
  { id: "game", icon: GamepadIcon, title: "Game", body: "In-game HUD, main menu and an inventory grid.", view: GameDemo },
] as const

/** Scales a fixed-size stage down to whatever space it is given. */
function ScaledStage({ children }: { children: React.ReactNode }) {
  const box = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.6)

  React.useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (w && h) setScale(Math.min(w / STAGE_W, h / STAGE_H))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="relative flex size-full items-center justify-center">
      <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }} className="relative overflow-hidden rounded-md border border-border bg-background shadow-panel">
        <div style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
      </div>
    </div>
  )
}

/**
 * Scroll-driven showcase: the section is tall and its content is sticky. Scrolling through it moves from
 * one live demo to the next. The previews are inert (not interactive) so they never trap the page scroll.
 */
export function DemoShowcase() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(steps.length - 1, Math.floor(v * steps.length)))
    setIndex((cur) => (cur === next ? cur : next))
  })

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top
    const travel = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / steps.length) * travel, behavior: reduce ? "auto" : "smooth" })
  }

  const current = steps[index]
  const View = current.view

  return (
    <section ref={ref} aria-label="Demos" style={{ height: `${steps.length * 85 + 15}vh` }} className="relative">
      <div className="sticky top-[3.6rem] flex h-[calc(100dvh-3.6rem)] items-center">
        <div className="mx-auto grid size-full max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[320px_1fr] lg:py-8">
          {/* Left: copy + steps */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-link uppercase">Demos</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Five complete interfaces</h2>
            <p className="mt-3 hidden text-muted-foreground lg:block">Keep scrolling. Each one is built only from Malam components and follows your theme.</p>

            <div className="relative mt-6 hidden lg:block">
              <div className="absolute top-2 bottom-2 left-[1.05rem] w-px bg-border" aria-hidden />
              <motion.div className="absolute top-2 bottom-2 left-[1.05rem] w-px origin-top bg-primary" style={{ scaleY: scrollYProgress }} aria-hidden />
              <ol className="relative space-y-1">
                {steps.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === index ? "step" : undefined}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-sm p-2 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring",
                        i === index ? "text-heading" : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border bg-background transition-colors",
                          i === index ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        )}
                      >
                        <s.icon className="size-3.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{s.title}</span>
                        <AnimatePresence initial={false}>
                          {i === index && (
                            <motion.span
                              key="body"
                              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              className="block overflow-hidden text-[0.8125rem] text-muted-foreground"
                            >
                              {s.body}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile: just the current title */}
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-heading lg:hidden">
              <current.icon className="size-4 text-link" /> {current.title}
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                {index + 1} / {steps.length}
              </span>
            </div>

            <Button variant="secondary" className="mt-6 hidden w-fit lg:inline-flex" render={<a href={`#/demo/${current.id}`} />}>
              Open {current.title.toLowerCase()} demo <ArrowRightIcon />
            </Button>
          </div>

          {/* Right: stage */}
          <div className="relative min-h-0 min-w-0">
            <ScaledStage>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="size-full"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.985 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* inert: preview only, never focusable or scroll-trapping */}
                  <div className="size-full overflow-hidden" inert>
                    <View />
                  </div>
                </motion.div>
              </AnimatePresence>
            </ScaledStage>
            <a
              href={`#/demo/${current.id}`}
              aria-label={`Open the ${current.title} demo`}
              className="absolute inset-0 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
