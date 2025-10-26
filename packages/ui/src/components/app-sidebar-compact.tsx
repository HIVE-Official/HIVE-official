"use client";

import * as React from "react";
import { HiveLogo } from "@/atoms/hive-logo";
import { Avatar } from "@/atoms/avatar";
import { cn } from "@/utils/cn";
import { getHiveNav, type HiveNavId } from "@/organisms/nav-config";
import { Plus, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppSidebarCompactProps = React.ComponentProps<typeof Sidebar> & {
  isLeader?: boolean;
  activeId?: HiveNavId;
  onNavSelect?: (id: HiveNavId) => void;
  linkComponent?: React.ElementType<any>;
  /**
   * Show the quick actions (Create, Search) at the top of the compact sidebar.
   */
  showQuickActions?: boolean;
};

export function AppSidebarCompact({
  isLeader = true,
  activeId,
  onNavSelect,
  linkComponent: LinkComp,
  showQuickActions = true,
  className,
  ...props
}: AppSidebarCompactProps) {
  const items = getHiveNav(isLeader);

  return (
    <Sidebar collapsible="icon" className={cn(className)} {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center py-2">
          <div className="inline-flex items-center justify-center">
            {LinkComp ? (
              <LinkComp href="/" aria-label="Home">
                <div className="grid place-items-center h-9 w-9 rounded-xl bg-foreground text-background shadow-level1 focus-ring">
                  <HiveLogo size={18} variant="white" />
                </div>
              </LinkComp>
            ) : (
              <a href="/" aria-label="Home">
                <div className="grid place-items-center h-9 w-9 rounded-xl bg-foreground text-background shadow-level1 focus-ring">
                  <HiveLogo size={18} variant="white" />
                </div>
              </a>
            )}
          </div>
        </div>
        {showQuickActions && (
          <div className="flex items-center justify-center py-1">
            <button
              aria-label="Create"
              className={cn(
                "grid place-items-center h-9 w-9 rounded-lg border border-border bg-card text-foreground shadow-subtle",
                "hover:bg-accent hover:text-accent-foreground focus-ring"
              )}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {/* Primary icons: Search, Home, Spaces (Folder), Recents (Clock) */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Search"
              isActive={false}
            >
              <a href="/search" aria-label="Search">
                <Search />
                <span className="sr-only">Search</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Main navigation items - filtered to show only visible items (excluding settings which goes in footer) */}
          {items
            .filter((it) => it.id !== "settings")
            .map((it) => (
              <SidebarMenuItem key={it.id}>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  isActive={activeId === it.id}
                  tooltip={it.label}
                >
                  {LinkComp ? (
                    <LinkComp
                      href={it.href}
                      aria-current={activeId === it.id ? "page" : undefined}
                      onClick={() => onNavSelect?.(it.id)}
                    >
                      <it.icon />
                      <span className="sr-only">{it.label}</span>
                    </LinkComp>
                  ) : (
                    <a
                      href={it.href}
                      aria-current={activeId === it.id ? "page" : undefined}
                      onClick={() => onNavSelect?.(it.id)}
                    >
                      <it.icon />
                      <span className="sr-only">{it.label}</span>
                    </a>
                  )}
                </SidebarMenuButton>
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-foreground opacity-0",
                    "peer-data-[active=true]/menu-button:opacity-100"
                  )}
                />
              </SidebarMenuItem>
            ))}

          {/* Dotted divider */}
          <SidebarMenuItem>
            <div
              className="mx-auto my-2 h-px w-6 border-t border-dotted border-sidebar-border/70"
              aria-hidden
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Settings"
              isActive={activeId === "settings"}
            >
              {LinkComp ? (
                <LinkComp
                  href="/settings"
                  aria-current={activeId === "settings" ? "page" : undefined}
                >
                  <Settings />
                  <span className="sr-only">Settings</span>
                </LinkComp>
              ) : (
                <a
                  href="/settings"
                  aria-current={activeId === "settings" ? "page" : undefined}
                >
                  <Settings />
                  <span className="sr-only">Settings</span>
                </a>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {LinkComp ? (
              <LinkComp
                href="/profile"
                aria-label="Profile"
                className="grid place-items-center"
              >
                <Avatar fallback="U" className="h-9 w-9" />
              </LinkComp>
            ) : (
              <a
                href="/profile"
                aria-label="Profile"
                className="grid place-items-center"
              >
                <Avatar fallback="U" className="h-9 w-9" />
              </a>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebarCompact;
