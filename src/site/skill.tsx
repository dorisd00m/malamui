import { BotIcon, DownloadIcon, FileTextIcon, TerminalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/malam"
import { Code, Page, Prose } from "./shell"

const rules = [
  ["Tokens, never raw hex", "Agents use bg-card, text-heading, bg-sale… so every theme keeps working."],
  ["Three text levels", "Headings white, body blue-grey, metadata grey. No fourth shade."],
  ["One primary CTA per region", "Blue gradient for the main action, green only for buy/install, lime only for discounts."],
  ["Component map first", "Reach for PriceTag, ProductCapsule, SectionHeader before hand-rolling markup."],
  ["Near-square geometry", "No rounded-xl or larger; hover = brightness or glow, never scale."],
  ["Verified before done", "A built-in checklist: 390px layout, aria-labels, focus rings, no raw colors."],
]

const prompts = [
  "Build a game library page with a left filter rail, a ProductCapsule grid and a sticky search header.",
  "Create a checkout dialog using Malam components with a PriceTag total and a green Purchase button.",
  "Add a new “mint” theme to the Malam theme list and register it in ThemeProvider.",
  "Audit src/ for raw hex colors and replace them with Malam tokens.",
]

export function SkillPage() {
  return (
    <Page route="skill">
      <main className="mx-auto max-w-[1000px] space-y-14 px-4 py-10">
        <div>
          <Badge className="mb-3">
            <BotIcon /> Agentic AI
          </Badge>
          <h1 className="text-4xl font-bold">Use Malam UI with AI agents</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Malam ships a <strong>skill</strong>: a short instruction file plus reference docs that coding agents load on demand.
            With it, an agent builds Malam-correct UI on the first try instead of guessing at colors and components.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="success" render={<a href="/malam-ui.skill" download />}>
              <DownloadIcon /> Download malam-ui.skill
            </Button>
            <Button variant="secondary" render={<a href="/SKILL.md" target="_blank" rel="noreferrer" />}>
              <FileTextIcon /> View SKILL.md
            </Button>
          </div>
        </div>

        <section>
          <SectionHeader title="How it works" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1. Install the skill", "Drop it into your agent's skills folder or upload the .skill file."],
              ["2. Describe the UI", "Ask for a page or component. The agent sees “Malam” and loads the skill automatically."],
              ["3. Get on-brand output", "Tokens, components and the finish checklist keep results consistent across sessions."],
            ].map(([t, b]) => (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>{t}</CardTitle>
                  <CardDescription>{b}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Install" />
          <Tabs defaultValue="claude-code">
            <TabsList>
              <TabsTrigger value="claude-code">Claude Code</TabsTrigger>
              <TabsTrigger value="claude-ai">Claude.ai / Desktop</TabsTrigger>
              <TabsTrigger value="other">Other agents</TabsTrigger>
            </TabsList>
            <TabsContent value="claude-code" className="space-y-4 pt-4">
              <Prose>
                <p>Project-only: keep the skill in the repo so everyone on the team gets it.</p>
              </Prose>
              <Code title="macOS / Linux">{`mkdir -p .claude/skills && cp -r skill/malam-ui .claude/skills/malam-ui`}</Code>
              <Code title="Windows PowerShell">{`New-Item -ItemType Directory -Force .claude\\skills | Out-Null
Copy-Item -Recurse skill\\malam-ui .claude\\skills\\malam-ui`}</Code>
              <Prose>
                <p>All projects: copy it to <code>~/.claude/skills/malam-ui/</code> instead. Claude Code picks it up on the next session.</p>
              </Prose>
            </TabsContent>
            <TabsContent value="claude-ai" className="space-y-3 pt-4">
              <Prose>
                <p>
                  Download <code>malam-ui.skill</code>, then open <strong>Settings → Capabilities → Skills</strong> and upload it.
                  The skill is available in every chat once enabled.
                </p>
              </Prose>
            </TabsContent>
            <TabsContent value="other" className="space-y-4 pt-4">
              <Prose>
                <p>
                  Agents without a skills system (Cursor, Codex, Copilot, Gemini CLI…) can read the same file as project
                  instructions. Copy <code>SKILL.md</code> and the <code>references/</code> folder into your repo and point to it
                  from the agent's rules file.
                </p>
              </Prose>
              <Code title="AGENTS.md (or .cursor/rules, CLAUDE.md…)">{`## UI
This project uses Malam UI. Before writing or editing any UI, read docs/malam-ui/SKILL.md.
Open docs/malam-ui/references/*.md only when you need token or component details.
Use design tokens, never raw hex colors.`}</Code>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <SectionHeader title="Add the shadcn MCP server" />
          <Prose>
            <p>
              The skill tells the agent <em>how to design</em>. The shadcn MCP server lets it <em>find and install</em> components
              (and the Malam registry) by itself. Add it to your project's <code>.mcp.json</code>:
            </p>
          </Prose>
          <Code className="mt-4" title=".mcp.json">{`{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`}</Code>
          <Prose className="mt-4">
            <p>To let the agent install Malam through MCP, register the registry in <code>components.json</code>:</p>
          </Prose>
          <Code className="mt-4" title="components.json">{`{
  "registries": {
    "@malam": "https://<your-host>/r/{name}.json"
  }
}`}</Code>
          <Prose className="mt-4">
            <p>The agent can then run <code>npx shadcn@latest add @malam/malam-ui</code> without you pasting URLs.</p>
          </Prose>
        </section>

        <section>
          <SectionHeader title="What the skill enforces" />
          <div className="grid gap-3 sm:grid-cols-2">
            {rules.map(([t, b]) => (
              <div key={t} className="rounded-sm border border-border bg-card bg-panel p-4">
                <h3 className="text-sm font-semibold">{t}</h3>
                <p className="mt-1 text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Prompts to try" />
          <div className="space-y-2">
            {prompts.map((p) => (
              <Card key={p} size="sm">
                <CardContent className="flex items-start gap-3">
                  <TerminalIcon className="mt-0.5 size-4 shrink-0 text-link" />
                  <span>{p}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="What's in the skill" />
          <Code title="skill/malam-ui/">{`SKILL.md                 setup, rules, component map, snippets, finish checklist
references/
  tokens.md              every color, type, spacing, radius and motion token
  components.md          props and examples for each component
  patterns.md            page recipes: storefront, product, library, checkout, dashboard`}</Code>
        </section>

        <section>
          <SectionHeader title="FAQ" />
          <Accordion>
            {[
              ["Does the skill load every time?", "No. Only its short description is always visible. The agent reads SKILL.md when your task involves Malam, and opens references only when needed, so it costs little context."],
              ["Can I use it with another theme?", "Yes. The rules reference tokens, not colors, so any data-theme works. Register new themes as described in the docs."],
              ["How do I keep it current?", "Edit skill/malam-ui/SKILL.md when you change components, then re-zip it into malam-ui.skill."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </Page>
  )
}
