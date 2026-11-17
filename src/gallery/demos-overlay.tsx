import { CalendarIcon, CopyIcon, SettingsIcon, UserIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update how you appear in the community.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="dlg-name">Name</Label>
          <Input id="dlg-name" defaultValue="Malam Player" />
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Remove game</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove from library?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Items you are about to purchase.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Wishlist</DrawerTitle>
          <DrawerDescription>Games you are waiting to go on sale.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
      <TooltipContent>Add to wishlist</TooltipContent>
    </Tooltip>
  )
}

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>@malam</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/malam-profile/96/96" alt="" />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold text-heading">Malam</p>
            <p className="text-muted-foreground">Dark, near-black design system.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Account</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon /> Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-28 w-full max-w-sm items-center justify-center rounded-sm border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Big Picture</MenubarItem>
          <MenubarItem>Small mode</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1 p-1">
              {["Top Sellers", "New Releases", "Specials"].map((l) => (
                <li key={l}>
                  <NavigationMenuLink href="#">{l}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Community</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-sm border">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon /> Calendar
          </CommandItem>
          <CommandItem>
            <CopyIcon /> Copy link <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon /> Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Store</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Strategy</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Ironveil Tactics</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[1, 2, 3].map((n) => (
          <PaginationItem key={n}>
            <PaginationLink href="#" isActive={n === 2}>
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast.add({ title: "Added to cart", description: "Ironveil Tactics" })}>
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Purchase complete", type: "success" })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Low storage", type: "warning" })}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Update available", type: "info" })}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.add({ title: "Upload failed", type: "error" })}>
        Error
      </Button>
    </div>
  )
}

export function AvatarDemo() {
  return (
    <AvatarGroup>
      {["AB", "CD", "EF"].map((i) => (
        <Avatar key={i}>
          <AvatarImage src={`https://picsum.photos/seed/${i}/96/96`} alt="" />
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
