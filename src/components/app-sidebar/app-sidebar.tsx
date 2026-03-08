"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowLeftRight,
  PiggyBank,
  Landmark,
  RefreshCw,
  Tag,
  FolderTree,
  Settings,
  LogOut,
  User,
  ChevronsUpDown,
  Sun,
  Moon,
  Monitor,
  Check,
  Search,
  Bell,
  PanelLeftClose,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "@/components/workspace-switcher/workspace-switcher";
import { PersonalSettingsModal } from "@/components/personal-settings-modal/personal-settings-modal";
import { useUser } from "@/components/providers/user-provider";

const navItems = [
  { title: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { title: "Budgets", href: "/budgets", icon: PiggyBank },
  { title: "Accounts", href: "/accounts", icon: Landmark },
  { title: "Recurring", href: "/recurring", icon: RefreshCw },
  { title: "Tags", href: "/tags", icon: Tag },
  { title: "Categories", href: "/categories", icon: FolderTree },
];

function NavItem({
  item,
  isActive,
}: {
  item: { title: string; href: string; icon: React.ElementType };
  isActive: boolean;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        size="default"
        tooltip={item.title}
        className={`h-10 gap-3 ${isActive
          ? "bg-sidebar-accent text-foreground"
          : ""
          }`}
      >
        <Link
          href={item.href}
          onClick={(e) => {
            e.stopPropagation();
            if (isMobile) setOpenMobile(false);
          }}
        >
          <item.icon
            className={`size-5 shrink-0 ${isActive ? "text-foreground" : "text-muted-foreground"
              }`}
          />
          <span className="text-sm transition-[opacity,width] duration-150 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { user, signOutAction } = useUser();
  const pathname = usePathname();
  const { toggleSidebar, state, isMobile, setOpenMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [personalSettingsOpen, setPersonalSettingsOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const currentTheme = mounted ? theme : undefined;
  const isCollapsed = state === "collapsed";

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="backdrop-blur-xl"
        onClick={isCollapsed ? toggleSidebar : undefined}
        style={isCollapsed ? { cursor: "e-resize" } : undefined}
      >
        <SidebarHeader className="p-0 border-b border-sidebar-border group-data-[collapsible=icon]:border-transparent">
          <WorkspaceSwitcher />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname.startsWith(item.href)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="border-t border-sidebar-border group-data-[collapsible=icon]:border-transparent">
          <div
            className={`flex p-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isCollapsed && !isMobile
              ? "flex-col items-center gap-1"
              : "flex-row items-center gap-1"
              }`}
          >
            <button
              type="button"
              title="Search"
              aria-label="Search"
              onClick={(e) => e.stopPropagation()}
              className="flex aspect-square h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sidebar-accent hover:text-foreground"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              onClick={(e) => e.stopPropagation()}
              className="flex aspect-square h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sidebar-accent hover:text-foreground"
            >
              <Bell className="size-5" />
            </button>
            <Link
              href="/settings/workspace"
              title="Workspace settings"
              aria-label="Workspace settings"
              onClick={(e) => {
                e.stopPropagation();
                if (isMobile) setOpenMobile(false);
              }}
              className={`flex aspect-square h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sidebar-accent hover:text-foreground ${pathname === "/settings/workspace" ? "bg-sidebar-accent text-foreground" : ""}`}
            >
              <Settings className="size-5" />
            </Link>
            <button
              type="button"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
              className={`flex aspect-square h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sidebar-accent hover:text-foreground ${isCollapsed && !isMobile ? "" : "ml-auto"
                }`}
              style={{ cursor: isCollapsed ? "e-resize" : "w-resize" }}
            >
              <PanelLeftClose
                className={`size-5 ${isCollapsed && !isMobile ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <SidebarFooter className="p-0 border-t border-sidebar-border group-data-[collapsible=icon]:border-transparent">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-full cursor-pointer items-center gap-3 overflow-hidden pt-3 pr-2 pb-3 pl-3 text-left transition-colors hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent group-data-[collapsible=icon]:hover:bg-transparent group-data-[collapsible=icon]:data-[state=open]:bg-transparent"
                  >
                    <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-gradient-from to-gradient-to text-white text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 min-w-0 items-center transition-[width,opacity] duration-150 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 overflow-hidden">
                      <span className="truncate text-sm font-medium whitespace-nowrap">{user.name}</span>
                    </div>
                    <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground transition-[width,opacity] duration-150 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[235px] rounded-lg backdrop-blur-xl ml-[10px] [&_[data-slot=dropdown-menu-item]]:py-2 [&_[data-slot=dropdown-menu-item]]:text-[14px]"
                  side="top"
                  align="start"
                  sideOffset={12}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setPersonalSettingsOpen(true)}>
                    <User className="mr-2 h-[18px] w-[18px] text-muted-foreground" />
                    Personal settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-[18px] w-[18px] text-muted-foreground" />
                    Light
                    {currentTheme === "light" && (
                      <Check className="ml-auto h-[18px] w-[18px] text-muted-foreground" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-[18px] w-[18px] text-muted-foreground" />
                    Dark
                    {currentTheme === "dark" && (
                      <Check className="ml-auto h-[18px] w-[18px] text-muted-foreground" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-[18px] w-[18px] text-muted-foreground" />
                    System
                    {currentTheme === "system" && (
                      <Check className="ml-auto h-[18px] w-[18px] text-muted-foreground" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={signOutAction} className="w-full">
                      <button type="submit" className="flex w-full items-center" onClick={() => isMobile && setOpenMobile(false)}>
                        <LogOut className="mr-2 h-[18px] w-[18px] text-muted-foreground" />
                        Sign out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <PersonalSettingsModal
        open={personalSettingsOpen}
        onOpenChange={setPersonalSettingsOpen}
      />
    </>
  );
}
