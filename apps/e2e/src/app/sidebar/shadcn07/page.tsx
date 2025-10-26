"use client";

import * as React from "react";
import { Separator } from "@hive/ui";
import { AppSidebar } from "@hive/ui";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@hive/ui";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@hive/ui";

export default function SidebarShadcn07Page(props: any): JSX.Element {
  const searchParams = (props?.searchParams ?? {}) as Record<string, string | string[]>;
  const collapsed = searchParams?.collapsed === '1' || searchParams?.collapsed === 'true';
  const variantParam = (Array.isArray(searchParams?.variant) ? searchParams?.variant[0] : searchParams?.variant) as "sidebar" | "floating" | "inset" | undefined;
  const variant = variantParam ?? "sidebar";
  const leaderParam = (Array.isArray(searchParams?.leader) ? searchParams?.leader[0] : searchParams?.leader) as string | undefined;
  const isLeader = leaderParam === '1' || leaderParam === 'true';

  return (
    <SidebarProvider defaultOpen={!collapsed}>
      {/**
       * Use the Shadcn07 demo composition (AppSidebar) as the canonical
       * reference for this e2e route.
       *
       * Controls:
       *   ?variant=sidebar|floating|inset
       *   &collapsed=1
       *   &leader=1 (influences nav items via gating)
       */}
      <AppSidebar variant={variant} isLeader={isLeader} />
      <SidebarInset>
        <header className="flex h-[var(--header-h,3.5rem)] shrink-0 items-center gap-2 bg-background border-b border-border">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-card border bg-card p-4 shadow-level1" />
            <div className="rounded-card border bg-card p-4 shadow-level1" />
            <div className="rounded-card border bg-card p-4 shadow-level1" />
          </div>
          <div className="min-h-[50vh] rounded-card border bg-card p-4 shadow-level1" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
