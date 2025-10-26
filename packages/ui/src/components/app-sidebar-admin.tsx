"use client";

import * as React from "react";
import { getAdminNav, type AdminNavId } from "@/organisms/admin-nav-config";
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
  SidebarRail
} from "@/components/ui/sidebar";

type AdminSidebarProps = React.ComponentProps<typeof Sidebar> & { activeId?: AdminNavId };

export function AppSidebarAdmin({ activeId, ...props }: AdminSidebarProps) {
  const items = getAdminNav();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
          <HiveLogo size={24} variant="gold" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">Hive Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={item.id === activeId} asChild>
                  <a href={item.href} aria-current={item.id === activeId ? "page" : undefined}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
