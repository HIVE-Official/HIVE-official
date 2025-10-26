// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/atoms/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarHive } from "@/components/app-sidebar-hive";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const meta: Meta = {
  title: "Layouts/Sidebar/Hive",
  parameters: { layout: "fullscreen" }
};

export default meta;

type Story = StoryObj<{ isLeader: boolean; activeId: "feed" | "spaces" | "profile" | "hivelab" | "settings" }>;

export const Default: Story = {
  args: { isLeader: false, activeId: "feed" },
  argTypes: { isLeader: { control: "boolean" }, activeId: { control: { type: "radio" }, options: ["feed","spaces","profile","hivelab","settings"] } },
  render: (args) => (
    <SidebarProvider>
      <AppSidebarHive isLeader={args.isLeader} activeId={args.activeId} />
      <SidebarInset>
        <header className="flex h-[var(--header-h,3.5rem)] shrink-0 items-center gap-2 bg-background border-b border-border">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" aria-current={args.activeId === "feed" ? "page" : undefined}>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{args.activeId === "feed" ? "Feed" : "Overview"}</BreadcrumbPage>
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
  )
};
