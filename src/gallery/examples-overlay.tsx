import * as React from "react"
import {
  BellIcon,
  CopyIcon,
  CreditCardIcon,
  InfoIcon,
  LogOutIcon,
  MinusIcon,
  PlusIcon,
  SettingsIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/* ======================= Dialog ======================= */

export function DialogCustomCloseExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone with this link will be able to view the file.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input readOnly defaultValue="https://malam.dev/s/8f3k2" aria-label="Share link" />
          <Button size="icon" variant="secondary" aria-label="Copy link">
            <CopyIcon />
          </Button>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogNoCloseButtonExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>No close button</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Session expiring</DialogTitle>
          <DialogDescription>You must choose an option to continue. Press Escape or pick a button.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Sign out</DialogClose>
          <DialogClose render={<Button />}>Stay signed in</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogScrollableExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Scrollable content</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Scroll to read the full agreement.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-64 rounded-sm border border-border p-3">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="mb-3 text-sm text-muted-foreground">
              {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.
            </p>
          ))}
        </ScrollArea>
        <DialogFooter>
          <DialogClose render={<Button />}>I agree</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogFormExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
      <DialogContent>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
            toast.add({ title: "Profile saved", type: "success" })
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="dlg-n">Name</Label>
            <Input id="dlg-n" defaultValue="Malam Player" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dlg-u">Username</Label>
            <Input id="dlg-u" defaultValue="@malam" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function DialogStickyFooterExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Sticky footer</DialogTrigger>
      <DialogContent className="flex max-h-[80dvh] flex-col gap-0 p-0">
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle>Release notes</DialogTitle>
          <DialogDescription>The header and footer stay while the body scrolls.</DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {Array.from({ length: 14 }, (_, i) => (
            <p key={i} className="mb-3 text-sm text-muted-foreground">
              Version 1.{14 - i}: improvements to performance, fixes for edge cases and a refreshed look across components.
            </p>
          ))}
        </div>
        <DialogFooter className="border-t border-border p-4">
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ======================= Alert dialog ======================= */

export function AlertDialogMediaExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2Icon /> Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>All files, deployments and environment variables will be permanently removed.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ======================= Sheet & drawer ======================= */

export function SheetSidesExample() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" className="capitalize" />}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">{side} sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the {side} edge.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

export function SheetFormExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Edit profile</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes and save when you are done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="sh-n">Name</Label>
            <Input id="sh-n" defaultValue="Malam Player" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sh-u">Username</Label>
            <Input id="sh-u" defaultValue="@malam" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export function DrawerGoalExample() {
  const [goal, setGoal] = React.useState(350)
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Set goal</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-4 p-4">
            <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => setGoal((g) => Math.max(100, g - 10))}>
              <MinusIcon />
            </Button>
            <div className="text-center">
              <div className="text-6xl font-bold tracking-tighter text-heading tabular-nums">{goal}</div>
              <div className="text-xs text-muted-foreground uppercase">Calories/day</div>
            </div>
            <Button variant="outline" size="icon" aria-label="Increase" onClick={() => setGoal((g) => g + 10)}>
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

/* ======================= Popover, tooltip, hover card ======================= */

export function PopoverFormExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Dimensions</PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="mt-3 grid gap-2">
          {["Width", "Height"].map((l) => (
            <div key={l} className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor={`pf-${l}`}>{l}</Label>
              <Input id={`pf-${l}`} defaultValue="100%" className="col-span-2 h-8" />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverSidesExample() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" size="sm" className="capitalize" />}>{side}</PopoverTrigger>
          <PopoverContent side={side} className="w-48 text-sm">
            Opens on the {side}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}

export function TooltipSidesExample() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" size="sm" className="capitalize" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function TooltipShortcutExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Save" />}>
          <CopyIcon />
        </TooltipTrigger>
        <TooltipContent>
          Copy <Kbd>Ctrl</Kbd>
          <Kbd>C</Kbd>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<span tabIndex={0} className="inline-flex rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </TooltipTrigger>
        <TooltipContent>Disabled buttons need a wrapper to show a tooltip</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function HoverCardProfileExample() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>@malam-ui</HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/malam-ui/96/96" alt="" />
            <AvatarFallback>MU</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-sm">
            <h4 className="font-semibold text-heading">@malam-ui</h4>
            <p className="text-muted-foreground">Near-black UI library for Tailwind and shadcn/ui.</p>
            <p className="text-xs text-muted-foreground">Joined November 2026</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

/* ======================= Toast ======================= */

export function ToastActionExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Message archived",
            description: "It was moved to your archive.",
            actionProps: { children: "Undo", onClick: () => toast.add({ title: "Restored" }) },
          })
        }
      >
        With action
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Stays until dismissed", description: "No automatic timeout.", timeout: 0 })}>
        Persistent
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Quick note", timeout: 1500 })}>
        1.5 second
      </Button>
    </div>
  )
}

/* ======================= Menus ======================= */

export function DropdownCheckboxesExample() {
  const [status, setStatus] = React.useState(true)
  const [bar, setBar] = React.useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>View</DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={status} onCheckedChange={setStatus}>
            Status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={bar} onCheckedChange={setBar}>
            Activity bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownRadioExample() {
  const [pos, setPos] = React.useState("bottom")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Panel: {pos}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={pos} onValueChange={setPos}>
            {["top", "bottom", "right"].map((p) => (
              <DropdownMenuRadioItem key={p} value={p} className="capitalize">
                {p}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownSubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Account</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon /> Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon /> Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SettingsIcon /> Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Keyboard</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuItem>Theme</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ContextMenuFullExample() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [person, setPerson] = React.useState("pedro")
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-sm border border-dashed border-border text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
          Show bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function MenubarCheckRadioExample() {
  const [grid, setGrid] = React.useState(true)
  const [zoom, setZoom] = React.useState("100")
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
            Show grid
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
            {["75", "100", "150"].map((z) => (
              <MenubarRadioItem key={z} value={z}>
                {z}%
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

/* ======================= Command ======================= */

export function CommandDialogExample() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> or{" "}
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          open the palette
        </Button>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <BellIcon /> Notifications
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <InfoIcon /> Help
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <UserIcon /> Profile <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <SettingsIcon /> Settings <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

/* ======================= Breadcrumb & pagination ======================= */

export function BreadcrumbEllipsisExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger render={<button type="button" className="flex items-center gap-1 rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Show more" />}>
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function BreadcrumbSeparatorExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Favorites</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PaginationControlledExample() {
  const [page, setPage] = React.useState(3)
  const total = 8
  const go = (p: number) => setPage(Math.max(1, Math.min(total, p)))
  return (
    <div className="grid gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                go(page - 1)
              }}
            />
          </PaginationItem>
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={n === page}
                onClick={(e) => {
                  e.preventDefault()
                  go(n)
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                go(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-center text-sm text-muted-foreground">
        Page {page} of {total}
      </p>
    </div>
  )
}
