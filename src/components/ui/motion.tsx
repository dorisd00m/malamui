import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Small animation primitives on top of Framer Motion. Every one of them honours the user's
 * "reduce motion" setting by dropping movement and keeping only a quick fade.
 */

type Direction = "up" | "down" | "left" | "right" | "none"

const offset = (d: Direction, distance: number) => ({
  x: d === "left" ? distance : d === "right" ? -distance : 0,
  y: d === "up" ? distance : d === "down" ? -distance : 0,
})

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Direction the element travels from. */
  direction?: Direction
  distance?: number
  delay?: number
  duration?: number
  /** Animate when scrolled into view (default) instead of on mount. */
  inView?: boolean
  /** Only animate the first time it enters the viewport. */
  once?: boolean
}

/** Fades (and slides) its children in. */
function FadeIn({ direction = "up", distance = 16, delay = 0, duration = 0.45, inView = true, once = true, className, ...props }: FadeInProps) {
  const reduce = useReducedMotion()
  const from = reduce ? { x: 0, y: 0 } : offset(direction, distance)
  const target = { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const } }
  return (
    <motion.div
      data-slot="fade-in"
      className={className}
      initial={{ opacity: 0, ...from }}
      {...(inView ? { whileInView: target, viewport: { once, amount: 0.3 } } : { animate: target })}
      {...props}
    />
  )
}

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

const itemVariants = (reduce: boolean, direction: Direction, distance: number): Variants => ({
  hidden: { opacity: 0, ...(reduce ? {} : offset(direction, distance)) },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
})

const StaggerContext = React.createContext<{ reduce: boolean; direction: Direction; distance: number }>({
  reduce: false,
  direction: "up",
  distance: 12,
})

type StaggerProps = HTMLMotionProps<"div"> & {
  /** Seconds between children. */
  stagger?: number
  delayChildren?: number
  direction?: Direction
  distance?: number
  inView?: boolean
}

/** Reveals its <StaggerItem> children one after another. */
function Stagger({ stagger = 0.08, delayChildren = 0, direction = "up", distance = 12, inView = true, className, ...props }: StaggerProps) {
  const reduce = !!useReducedMotion()
  return (
    <StaggerContext.Provider value={{ reduce, direction, distance }}>
      <motion.div
        data-slot="stagger"
        className={className}
        variants={containerVariants(stagger, delayChildren)}
        initial="hidden"
        {...(inView ? { whileInView: "show", viewport: { once: true, amount: 0.2 } } : { animate: "show" })}
        {...props}
      />
    </StaggerContext.Provider>
  )
}

function StaggerItem({ className, ...props }: HTMLMotionProps<"div">) {
  const { reduce, direction, distance } = React.useContext(StaggerContext)
  return <motion.div data-slot="stagger-item" className={className} variants={itemVariants(reduce, direction, distance)} {...props} />
}

type PressableProps = HTMLMotionProps<"div"> & {
  /** Scale while hovered. */
  hoverScale?: number
  /** Scale while pressed. */
  tapScale?: number
  /** Lift (negative px translateY) while hovered. */
  lift?: number
}

/** Adds a subtle hover lift and press-down feel to any card or tile. */
function Pressable({ hoverScale = 1.02, tapScale = 0.97, lift = 4, className, ...props }: PressableProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-slot="pressable"
      className={className}
      whileHover={reduce ? undefined : { scale: hoverScale, y: -lift }}
      whileTap={reduce ? undefined : { scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      {...props}
    />
  )
}

type PresenceProps = {
  show: boolean
  children: React.ReactNode
  className?: string
  /** Where it enters from / exits to. */
  direction?: Direction
}

/** Mounts and unmounts children with an enter/exit animation. */
function Presence({ show, children, className, direction = "up" }: PresenceProps) {
  const reduce = useReducedMotion()
  const o = reduce ? { x: 0, y: 0 } : offset(direction, 12)
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          data-slot="presence"
          className={className}
          initial={{ opacity: 0, ...o }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...o }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Animates height auto <-> 0 (accordion-like) without measuring by hand. */
function Collapse({ open, children, className }: { open: boolean; children: React.ReactNode; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          data-slot="collapse"
          className={cn("overflow-hidden", className)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { FadeIn, Stagger, StaggerItem, Pressable, Presence, Collapse, motion, AnimatePresence, useReducedMotion }
