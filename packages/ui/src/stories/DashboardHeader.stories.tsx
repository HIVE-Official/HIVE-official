/**
 * DashboardHeader - Storybook Stories
 *
 * Showcases the campus-focused header with Shadcn Sidebar-07 integration
 * Demonstrates chromium aesthetic and UX psychology principles
 */

import type { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader } from "../organisms/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Bell, Settings, User, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/atoms/avatar";

const meta = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Campus-focused header component integrated with Shadcn Sidebar-07 pattern.

**Design Principles** (from UI_DESIGN_PSYCHOLOGY_FOUNDATION.md):
- **Chromium aesthetic**: Neutral surface, hairline borders, subtle glass effect
- **Cognitive load management**: Max 2-3 action buttons
- **One-tap actions**: No nested menus or confirmation dialogs
- **Mobile-first**: Responsive search, sidebar trigger in thumb zone
- **Accessibility**: WCAG 2.1 AA, keyboard navigation, proper ARIA labels

**Usage**:
\`\`\`tsx
<SidebarProvider>
  <DashboardHeader
    title="Computer Science Club"
    subtitle="342 members • 23 online"
    actions={[
      { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
      { id: "settings", label: "Settings", icon: Settings }
    ]}
  />
</SidebarProvider>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          <Story />
          <div className="p-6">
            <p className="text-muted-foreground text-sm">
              Content below header (scroll to see sticky behavior)
            </p>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default configuration - Minimal header with title only
 */
export const Default: Story = {
  args: {
    title: "Dashboard",
  },
};

/**
 * Campus Space Header - Typical use case for a student organization
 * Shows title, subtitle with member count, and common actions
 */
export const SpaceHeader: Story = {
  args: {
    title: "Computer Science Club",
    subtitle: "342 members • 23 online",
    actions: [
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        badge: 3,
        variant: "primary", // Gold accent (sparingly)
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Typical header for a campus space with social proof indicators (member count, notifications).",
      },
    },
  },
};

/**
 * With Search - Desktop-optimized layout with search bar
 */
export const WithSearch: Story = {
  args: {
    title: "Explore Spaces",
    searchPlaceholder: "Find events, spaces, people...",
    showSearch: true,
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: "dot", variant: "primary" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header with search input (hidden on mobile, visible on desktop). Note the action-oriented placeholder.",
      },
    },
  },
};

/**
 * With Profile Avatar - Custom right slot
 */
export const WithProfileAvatar: Story = {
  args: {
    title: "My Feed",
    subtitle: "University at Buffalo",
    showSearch: true,
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: 12, variant: "primary" },
    ],
    rightSlot: (
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header with custom right slot (e.g., user profile avatar). Separator automatically added between rightSlot and actions.",
      },
    },
  },
};

/**
 * Gold Primary Action - Use sparingly for important CTAs
 *
 * Per Foundation doc: Gold should only be used for primary CTAs,
 * verification badges, and pinned content (not decoration)
 */
export const WithPrimaryAction: Story = {
  args: {
    title: "Events",
    subtitle: "5 happening this week",
    actions: [
      {
        id: "create",
        label: "Create Event",
        icon: Sparkles,
        variant: "primary", // ⭐ Gold accent - use sparingly!
        onClick: () => console.log("Create event clicked"),
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        badge: 2,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary action with gold accent (variant='primary'). Use sparingly per Foundation doc - only for the most important action.",
      },
    },
  },
};

/**
 * Minimal Actions - Cognitive load management
 *
 * Per Foundation doc: Max 2-3 actions to avoid overwhelming users
 */
export const MinimalActions: Story = {
  args: {
    title: "Settings",
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: "dot" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal action set (1 action). Recommended for focused pages where you don't want to distract users.",
      },
    },
  },
};

/**
 * No Glass Effect - Solid background variant
 */
export const NoGlass: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Welcome back!",
    glass: false,
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: "dot", variant: "primary" },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header with solid background (glass=false). Use when you want a more opaque header.",
      },
    },
  },
};

/**
 * Long Title - Truncation behavior
 */
export const LongTitle: Story = {
  args: {
    title:
      "University at Buffalo Computer Science and Engineering Student Association",
    subtitle:
      "The largest CS student organization on campus with over 500 active members",
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: 99, variant: "primary" },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates text truncation for long titles and subtitles. Uses CSS ellipsis for graceful overflow handling.",
      },
    },
  },
};

/**
 * Mobile Preview - How it looks on small screens
 *
 * Note: Search is hidden, sidebar trigger appears, subtitle hidden on very small screens
 */
export const MobilePreview: Story = {
  args: {
    title: "CS Club",
    subtitle: "342 members",
    showSearch: true,
    actions: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: 3, variant: "primary" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Mobile viewport preview. Note: search is hidden, subtitle may be hidden on very small screens, sidebar trigger is visible.",
      },
    },
  },
};

/**
 * States Reference - All visual states in one view
 */
export const StatesReference: Story = {
  args: {
    title: "Component States",
    actions: [
      { id: "no-badge", label: "No Badge", icon: Settings },
      { id: "count-badge", label: "Count Badge", icon: Bell, badge: 5 },
      {
        id: "dot-badge",
        label: "Presence Indicator",
        icon: User,
        badge: "dot",
      },
      {
        id: "primary",
        label: "Primary Action",
        icon: Settings,
        variant: "primary",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "All action button states in one header for reference: no badge, count badge, dot badge (presence), primary variant (gold).",
      },
    },
  },
};
