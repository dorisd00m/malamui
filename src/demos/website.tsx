import { ArrowRightIcon, CheckIcon, GlobeIcon, LockIcon, RocketIcon, ShieldCheckIcon, StarIcon, ZapIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

const features = [
  { icon: ZapIcon, title: "Instant deploys", body: "Push to main and your site is live in seconds, with automatic previews for every branch." },
  { icon: GlobeIcon, title: "Global edge network", body: "Content is served from 40+ regions so every visitor gets a fast first byte." },
  { icon: ShieldCheckIcon, title: "Secure by default", body: "Managed certificates, DDoS protection and audit logs are on from day one." },
  { icon: RocketIcon, title: "Built to scale", body: "From a side project to millions of requests a day without changing your setup." },
]

const plans = [
  { name: "Hobby", price: "$0", note: "For side projects", perks: ["1 project", "100 GB bandwidth", "Community support"], cta: "Start free" },
  { name: "Pro", price: "$24", note: "For growing teams", perks: ["Unlimited projects", "1 TB bandwidth", "Priority support", "Team roles"], cta: "Start trial", featured: true },
  { name: "Scale", price: "$99", note: "For critical workloads", perks: ["Dedicated edge", "SLA 99.99%", "SSO & audit logs", "Account manager"], cta: "Contact sales" },
]

const quotes = [
  { name: "Rina Kusuma", role: "CTO, Lumen", text: "We cut our deploy time from 12 minutes to 20 seconds. The team stopped dreading release day." },
  { name: "Daniel Okafor", role: "Founder, Pixelcraft", text: "Setup took an afternoon and it has not gone down once in a year. Easily our best infra decision." },
]

export function WebsiteDemo() {
  return (
    <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-md border border-border bg-background shadow-panel">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-header px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-sm bg-surface px-3 py-1 text-xs text-muted-foreground">
          <LockIcon className="size-3" /> orbit.example.com
        </div>
        <span className="w-12" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Nav */}
        <header className="sticky top-0 z-10 flex items-center gap-6 border-b border-border bg-background/90 px-6 py-3 backdrop-blur">
          <span className="flex items-center gap-2 text-lg font-bold text-heading">
            <span className="grid size-7 place-items-center rounded-sm bg-primary-gradient text-white">
              <RocketIcon className="size-4" />
            </span>
            Orbit
          </span>
          <nav className="hidden gap-5 text-sm text-muted-foreground md:flex">
            {["Product", "Pricing", "Docs", "Customers"].map((l) => (
              <a key={l} href="#/demo/website" className="hover:text-heading">{l}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm">Get started</Button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-5">New: edge functions are generally available</Badge>
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Ship your product <span className="text-link">at the speed of night</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Orbit is the platform for deploying fast, secure web apps. Focus on code. We handle the rest.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <InputGroup>
              <InputGroupAddon>@</InputGroupAddon>
              <InputGroupInput placeholder="you@company.com" aria-label="Email" />
            </InputGroup>
            <Button size="lg" className="h-8">
              Join waitlist <ArrowRightIcon />
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Free for 14 days. No credit card required.</p>
        </section>

        {/* Logos */}
        <section className="border-y border-border px-6 py-8">
          <p className="mb-4 text-center text-xs tracking-wider text-muted-foreground uppercase">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-lg font-semibold text-muted-foreground/70">
            {["Lumen", "Pixelcraft", "Northwind", "Halcyon", "Quanta"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h3 className="text-center text-3xl font-bold">Everything you need to go live</h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <f.icon className="mb-2 size-6 text-link" />
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h3 className="text-center text-3xl font-bold">Simple, honest pricing</h3>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <Card key={p.name} className={p.featured ? "ring-1 ring-primary" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    {p.name}
                    {p.featured && <Badge>Popular</Badge>}
                  </CardTitle>
                  <CardDescription>{p.note}</CardDescription>
                  <p className="pt-2 text-4xl font-bold text-heading">
                    {p.price}
                    <span className="text-sm font-normal text-muted-foreground"> /mo</span>
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <CheckIcon className="size-4 text-link" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.featured ? "default" : "outline"} className="w-full">
                    {p.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            {quotes.map((q) => (
              <Card key={q.name}>
                <CardContent className="space-y-4">
                  <div className="flex gap-0.5 text-link" aria-label="5 stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground">“{q.text}”</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{q.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-heading">{q.name}</p>
                      <p className="text-xs text-muted-foreground">{q.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-2xl px-6 pb-16">
          <h3 className="mb-6 text-center text-3xl font-bold">Questions</h3>
          <Accordion>
            {[
              ["Can I cancel anytime?", "Yes. Plans are monthly and you can cancel from your dashboard with one click."],
              ["Do you offer a free trial?", "Every paid plan includes a 14-day trial, no card needed."],
              ["Where is my data stored?", "In the region you choose. We never move it without your permission."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-6 mb-10 rounded-md bg-promo px-6 py-12 text-center">
          <h3 className="text-3xl font-bold">Ready when you are</h3>
          <p className="mt-2 text-muted-foreground">Deploy your first project in under five minutes.</p>
          <Button size="lg" className="mt-6">Get started free</Button>
        </section>

        <footer className="border-t border-border bg-header px-6 py-8 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-semibold text-heading">Orbit</span>
            <div className="flex gap-5">
              {["Privacy", "Terms", "Status", "Contact"].map((l) => (
                <a key={l} href="#/demo/website" className="hover:text-heading">{l}</a>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>© 2026 Orbit Labs. Placeholder brand for demo purposes.</span>
            <Input className="max-w-56" placeholder="Subscribe to updates" aria-label="Subscribe" />
          </div>
        </footer>
      </div>
    </div>
  )
}
