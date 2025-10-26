"use client"

import * as React from "react"
import { getHiveNav, type HiveNavId } from "@/organisms/nav-config";
import { HiveLogo } from "@/atoms/hive-logo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar"

type HiveSidebarProps = React.ComponentProps<typeof Sidebar> & {
  isLeader?: boolean;
  activeId?: HiveNavId;
  onNavSelect?: (id: HiveNavId) => void;
  /**
   * Control the vertical size of nav items for accessibility.
   * Defaults to the sidebar's default size; set to "lg" for 44px+ touch targets.
   */
  menuSize?: "default" | "sm" | "lg";
  /**
   * Optional Link component (e.g., Next.js Link). If provided,
   * it will be used as the child of SidebarMenuButton via `asChild`.
   */
  linkComponent?: React.ElementType<any>;
};

export function AppSidebarHive({ isLeader = false, activeId, onNavSelect, menuSize, linkComponent: LinkComp, ...props }: HiveSidebarProps) {
  const items = getHiveNav(isLeader);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <HiveLogo size={24} variant="gold" />
          <span className="font-semibold">Hive</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={item.id === activeId} asChild size={menuSize} tooltip={item.label}>
                  {LinkComp ? (
                    <LinkComp href={item.href} aria-current={item.id === activeId ? "page" : undefined} onClick={() => onNavSelect?.(item.id)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </LinkComp>
                  ) : (
                    <a href={item.href} aria-current={item.id === activeId ? "page" : undefined} onClick={() => onNavSelect?.(item.id)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
