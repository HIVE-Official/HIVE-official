// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebarCompact } from "../components/app-sidebar-compact";
import type { HiveNavId } from "../organisms/nav-config";

const meta: Meta = {
  title: "Layouts/Shell/Global Sidebar Compact",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "**Global Shell Navigation** - Icon-only compact sidebar following the HIVE navigation pattern.\n\n" +
          "## Navigation Structure\n" +
          "- **Header**: HIVE logo + Create button\n" +
          "- **Main Nav**: Search → Home → Spaces (Folder) → Recents (Clock)\n" +
          "- **Footer**: Settings → User Avatar\n\n" +
          "## Interaction\n" +
          "- Click icons to navigate\n" +
          "- Active state shown with indicator dot\n" +
          "- Hover reveals tooltips\n" +
          "- Always collapsed (icon-only mode)\n\n" +
          "## Usage\n" +
          "```tsx\n" +
          "<SidebarProvider defaultOpen={false}>\n" +
          '  <AppSidebarCompact activeId="spaces" isLeader={true} />\n' +
          "  <SidebarInset>{children}</SidebarInset>\n" +
          "</SidebarProvider>\n" +
          "```",
      },
    },
  },
  args: {
    collapsed: true,
    isLeader: true,
    activeId: "spaces" as HiveNavId,
    showQuickActions: true,
  },
  argTypes: {
    collapsed: {
      control: "boolean",
      description:
        "Sidebar is always collapsed (icon-only). This control is for demo purposes.",
      table: { defaultValue: { summary: true } },
    },
    isLeader: {
      control: "boolean",
      description: "Show HiveLab option (leaders only)",
      table: { defaultValue: { summary: true } },
    },
    activeId: {
      control: { type: "select" },
      options: ["feed", "spaces", "recents", "profile", "hivelab", "settings"],
      description: "Currently active navigation item",
    },
    showQuickActions: {
      control: "boolean",
      description: "Show Create (+) button in header",
      table: { defaultValue: { summary: true } },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<{
  collapsed: boolean;
  isLeader: boolean;
  activeId: HiveNavId;
  showQuickActions: boolean;
}>;

/**
 * Default state with Spaces active. This matches the design in the mockup.
 */
export const Default: Story = {
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Global Shell Navigation</h1>
            <p className="text-muted-foreground">
              Active:{" "}
              <span className="font-medium text-foreground">{activeId}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Try clicking the navigation icons on the left
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * Home screen active - the default landing page.
 */
export const HomeActive: Story = {
  args: {
    activeId: "feed",
  },
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">🏠 Home Feed</h1>
            <p className="text-muted-foreground">
              Your personalized feed from joined spaces
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * Spaces browser - exploring and managing spaces.
 */
export const SpacesActive: Story = {
  args: {
    activeId: "spaces",
  },
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">📁 Spaces</h1>
            <p className="text-muted-foreground">
              Browse and join campus communities
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * Recents view - recently accessed content and history.
 */
export const RecentsActive: Story = {
  args: {
    activeId: "recents",
  },
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">🕐 Recents</h1>
            <p className="text-muted-foreground">
              Your recently viewed spaces and posts
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * Non-leader view - HiveLab is hidden.
 */
export const NonLeaderView: Story = {
  args: {
    isLeader: false,
    activeId: "profile",
  },
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Non-Leader View</h1>
            <p className="text-muted-foreground">
              HiveLab option is hidden for regular members
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * No quick actions - minimal header with just the logo.
 */
export const WithoutQuickActions: Story = {
  args: {
    showQuickActions: false,
    activeId: "spaces",
  },
  render: ({ collapsed, isLeader, activeId, showQuickActions }) => (
    <SidebarProvider defaultOpen={!collapsed}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
        showQuickActions={showQuickActions}
      />
      <SidebarInset>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Minimal Header</h1>
            <p className="text-muted-foreground">No Create button shown</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
