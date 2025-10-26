// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { cn } from "../utils/cn";
import {
  AppHeader,
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
} from "../index";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Bell, Settings } from "lucide-react";
import { getHiveNav, type HiveNavId } from "../organisms/nav-config";

type Variant = "sidebar" | "floating" | "inset";

const meta: Meta = {
  title: "Full App/Global Shell — Sidebar07",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Canonical global app shell composed with Sidebar‑07 primitives, tokenized header, optional Dock, and mobile bottom navigation."
      }
    }
  },
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
    showDock: false,
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

    return (
      <SidebarProvider defaultOpen={!args.collapsed}>
        <AppSidebar
          activeId={activeId}
          isLeader={args.isLeader}
          menuSize={args.menuSize}
          variant={args.variant}
        />
        {/* Skip link */}
        <a href="#content" className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 z-50 rounded bg-background px-3 py-1 text-foreground">
          Skip to content
        </a>
        <SidebarInset id="content">
          <AppHeader>
            <div className="flex h-[var(--header-h,3.5rem)] items-center justify-between px-4">
              <div className="flex items-center gap-2 min-w-0">
                <SidebarTrigger className="-ml-1" aria-label="Toggle navigation" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeId.charAt(0).toUpperCase() + activeId.slice(1)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Settings" className="hidden sm:inline-flex">
                  <Settings className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button aria-label="Account" className="inline-flex items-center justify-center">
                      <Avatar fallback="U" className="h-8 w-8" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem className="sm:hidden">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </AppHeader>
          <div className={cn("flex flex-1 flex-col gap-0 p-4", "md:pb-0 pb-[calc(env(safe-area-inset-bottom)+56px)]")}>
            <div className="container-page max-w-[var(--shell-max-w)] space-y-4">
              <h2 className="text-lg font-semibold">{activeId.charAt(0).toUpperCase() + activeId.slice(1)}</h2>
              <p className="text-muted-foreground">This is the canonical global shell demo. Toggle controls in Storybook to test variants, leader gating, and collapsed state.</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">Card A</div>
                <div className="rounded-xl border bg-card p-4">Card B</div>
              </div>
            </div>
          </div>
        </SidebarInset>
        {args.showDock && <AppDock defaultOpen={false} />}
      </SidebarProvider>
    );
  }
};
