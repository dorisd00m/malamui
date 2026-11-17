import * as React from "react"
import {
  BellIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  LayersIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

/*
 * The previews wrap each sidebar in a relative, overflow-hidden box and pass
 * className="absolute h-full" to <Sidebar>. In an app you drop that and let the sidebar be fixed to the viewport.
 */

const nav = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Search", icon: SearchIcon },
  { title: "Settings", icon: SettingsIcon },
]

export function SidebarDemo() {
  const [active, setActive] = React.useState("Home")
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="absolute h-full">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-heading">
              <span className="grid size-6 place-items-center rounded-sm bg-primary text-primary-foreground">M</span>
              Malam
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={active === item.title} onClick={() => setActive(item.title)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
              <Avatar size="sm">
                <AvatarImage src="https://picsum.photos/seed/sidebar-user/64/64" alt="" />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
              <span className="truncate">Malam Player</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="flex h-12 items-center gap-2 border-b border-border px-3">
            <SidebarTrigger />
            <span className="text-sm font-medium text-heading">{active}</span>
          </header>
          <div className="p-4 text-sm text-muted-foreground">Toggle the sidebar with the button or Ctrl+B. Content for {active} goes here.</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarCollapsibleIconExample() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0" defaultOpen={false}>
        <Sidebar collapsible="icon" className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="flex h-12 items-center gap-2 border-b border-border px-3">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">Collapses to icons. Hover an icon for its tooltip.</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarSubmenuExample() {
  const sections = [
    { title: "Projects", icon: FolderIcon, items: ["Website redesign", "Mobile app", "Design system"] },
    { title: "Team", icon: UsersIcon, items: ["Members", "Roles", "Invitations"] },
  ]
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarMenu>
                {sections.map((s) => (
                  <Collapsible key={s.title} defaultOpen={s.title === "Projects"} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger render={<SidebarMenuButton />}>
                        <s.icon />
                        <span>{s.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform group-data-[panel-open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {s.items.map((i) => (
                            <SidebarMenuSubItem key={i}>
                              <SidebarMenuSubButton render={<a href="#" onClick={(e) => e.preventDefault()} />}>
                                <span>{i}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-w-0 p-4 text-sm text-muted-foreground">Nested menus with Collapsible.</SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarSearchGroupsExample() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="absolute h-full">
          <SidebarHeader>
            <SidebarInput placeholder="Search…" aria-label="Search" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Favorites</SidebarGroupLabel>
              <SidebarMenu>
                {["Roadmap", "Launch checklist"].map((t) => (
                  <SidebarMenuItem key={t}>
                    <SidebarMenuButton>
                      <LayersIcon />
                      <span>{t}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Channels</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add channel">
                <PlusIcon />
              </SidebarGroupAction>
              <SidebarMenu>
                {["general", "design", "random"].map((t) => (
                  <SidebarMenuItem key={t}>
                    <SidebarMenuButton>
                      <span className="text-muted-foreground">#</span>
                      <span>{t}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-w-0 p-4 text-sm text-muted-foreground">Groups with labels and an action button.</SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarVariantsExample() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {(["floating", "inset"] as const).map((variant) => (
        <div key={variant} className="relative h-[300px] overflow-hidden rounded-md border border-border">
          <SidebarProvider className="h-full min-h-0">
            <Sidebar variant={variant} className="absolute h-full">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel className="capitalize">{variant}</SidebarGroupLabel>
                  <SidebarMenu>
                    {nav.slice(0, 3).map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.title === "Home"}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="min-w-0 p-3 text-sm text-muted-foreground">Content</SidebarInset>
          </SidebarProvider>
        </div>
      ))}
    </div>
  )
}

export function SidebarRightExample() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0">
        <SidebarInset className="min-w-0 p-4 text-sm text-muted-foreground">The sidebar can sit on the right with side="right".</SidebarInset>
        <Sidebar side="right" className="absolute h-full">
          <SidebarHeader>
            <div className="flex items-center justify-between px-2 py-1.5 text-sm font-semibold text-heading">
              Details <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {[["Notifications", BellIcon], ["Settings", SettingsIcon]].map(([t, I]) => {
                  const Icon = I as typeof BellIcon
                  return (
                    <SidebarMenuItem key={t as string}>
                      <SidebarMenuButton>
                        <Icon />
                        <span>{t as string}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

export function SidebarLoadingExample() {
  return (
    <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-md border border-border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Loading</SidebarGroupLabel>
              <SidebarMenu>
                {Array.from({ length: 5 }, (_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset />
      </SidebarProvider>
    </div>
  )
}
