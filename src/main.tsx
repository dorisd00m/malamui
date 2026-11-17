import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/malam"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"
import { DemoPage } from "./demos/index.tsx"
import { Gallery } from "./gallery/gallery.tsx"
import { Docs } from "./site/docs.tsx"
import { Home } from "./site/home.tsx"
import { SkillPage } from "./site/skill.tsx"

function Root() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  if (hash.startsWith("#/components")) return <Gallery />
  if (hash.startsWith("#/docs")) return <Docs />
  if (hash.startsWith("#/skill")) return <SkillPage />
  if (hash.startsWith("#/demo")) return <DemoPage hash={hash} />
  return <Home />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Root />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
