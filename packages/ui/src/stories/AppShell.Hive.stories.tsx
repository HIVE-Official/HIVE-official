// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { cn } from "../utils/cn";
import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  AppDock,
  MobileTabBar,
  DashboardHeader,
  CommandK
} from "../index";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebarHive } from "../components/app-sidebar-hive";
import { Bell, Settings } from "lucide-react";
import { getHiveNav, type HiveNavId } from "../organisms/nav-config";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

type Variant = "sidebar" | "floating" | "inset";

const meta: Meta = {
  title: "Full App/Hive Global Shell",
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: { type: "select" }, options: ["sidebar", "floating", "inset"] },
    collapsed: { control: "boolean" },
    isLeader: { control: "boolean" },
    showDock: { control: "boolean" },
    menuSize: { control: { type: "select" }, options: ["default", "lg"] },
    activeId: { control: { type: "select" }, options: ["feed", "spaces", "profile", "hivelab", "settings"] }
  },
  args: {
    variant: "sidebar" as Variant,
    collapsed: false,
    isLeader: true,
    showDock: true,
    menuSize: "lg" as const,
    activeId: "spaces" as HiveNavId
  }
};

export default meta;
type Story = StoryObj<{
  variant: Variant;
  collapsed: boolean;
  isLeader: boolean;
  showDock: boolean;
  menuSize: "default" | "lg";
  activeId: HiveNavId;
}>;

export const Default: Story = {
  render: (args) => {
    const [activeId, setActiveId] = React.useState<HiveNavId>(args.activeId);
    const items = getHiveNav(args.isLeader);

    return (
      <SidebarProvider defaultOpen={!args.collapsed}>
        <AppSidebarHive
          activeId={activeId}
          isLeader={args.isLeader}
          menuSize={args.menuSize}
          variant={args.variant}
          onNavSelect={(id) => setActiveId(id)}
        />
        <CommandK />
        <a href="#content" className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 z-50 rounded bg-background px-3 py-1 text-foreground">
          Skip to content
        </a>
        <SidebarInset id="content">
          <DashboardHeader
            title={activeId.charAt(0).toUpperCase() + activeId.slice(1)}
            subtitle="Global shell demo with search and actions"
            showSearch
            actions={[
              { id: "notif", label: "Notifications", icon: Bell, variant: "default", badge: 3 },
              { id: "settings", label: "Settings", icon: Settings, variant: "primary" }
            ]}
            rightSlot={(
              <>
                <Separator orientation="vertical" className="mr-2 hidden sm:block h-4" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button aria-label="Account" className="inline-flex items-center justify-center h-9 w-9">
                      <Avatar fallback="U" className="h-9 w-9" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem className="sm:hidden">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          />
          <div className={cn("flex flex-1 flex-col gap-0 p-4", "md:pb-0 pb-[calc(env(safe-area-inset-bottom)+56px)]")}>
            <div className="container-page max-w-[var(--shell-max-w)] space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbPage>Home</BreadcrumbPage></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="hidden md:block"><a href="#">{activeId}</a></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">Card A</div>
                <div className="rounded-xl border bg-card p-4">Card B</div>
              </div>
            </div>
          </div>
        </SidebarInset>
        {args.showDock && <AppDock defaultOpen={false} />}
        <MobileTabBar
          activeId={activeId}
          items={items.map((it) => ({ id: it.id, label: it.label, href: "#", icon: it.icon }))}
          onSelect={(id) => setActiveId(id as HiveNavId)}
        />
      </SidebarProvider>
    );
  }
};
