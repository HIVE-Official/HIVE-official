import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Home,
  Users,
  Calendar,
  Search,
  Bell,
  User,
  Settings,
  Zap,
  MessageSquare,
  Hash,
  TrendingUp,
} from "lucide-react";
import {
  Navbar,
  DEFAULT_NAV_ITEMS,
  DEFAULT_ACTION_ITEMS,
} from "../components/navigation/navbar";
import type { NavItem } from "../components/navigation/navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# HIVE Navbar Component

A sophisticated, brand-perfect navigation bar that embodies HIVE's design philosophy.

## Features
- **Brand Perfect**: #0A0A0A background with #FFD700 accent colors
- **Responsive Design**: Mobile-first with sophisticated mobile menu
- **Smooth Animations**: 200ms ease-out transitions with Framer Motion
- **Full Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

## Usage
\`\`\`tsx
import { Navbar } from "@hive/ui";

<Navbar 
  activeRoute="/feed"
  onCreateClick={() => console.log("Create clicked")}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "transparent"],
      description: "Visual variant for different page contexts",
    },
    activeRoute: {
      control: "text",
      description: "Current active route for highlighting navigation items",
    },
    showCreateButton: {
      control: "boolean",
      description: "Show/hide the primary Create action button",
    },
    showMobileMenu: {
      control: "boolean",
      description: "Enable/disable mobile hamburger menu",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Story />
        <div className="p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold text-white font-display">
              Demo Content
            </h1>
            <p className="text-[#A1A1AA] text-lg leading-relaxed">
              This content demonstrates the navbar's sticky behavior in a real
              application context.
            </p>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  Content Block {i + 1}
                </h3>
                <p className="text-[#A1A1AA] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Navbar
export const Default: Story = {
  args: {
    activeRoute: "/feed",
    variant: "default",
    showCreateButton: true,
    showMobileMenu: true,
  },
};

// Different Variants
export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: "minimal",
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: "transparent",
  },
};

// Active States
export const SpacesActive: Story = {
  args: {
    ...Default.args,
    activeRoute: "/spaces",
  },
};

export const HiveLabActive: Story = {
  args: {
    ...Default.args,
    activeRoute: "/lab",
  },
};

// Custom Navigation Items
const customNavItems: NavItem[] = [
  {
    id: "discover",
    label: "Discover",
    href: "/discover",
    icon: TrendingUp,
  },
  {
    id: "chat",
    label: "Chat",
    href: "/chat",
    icon: MessageSquare,
    badge: 5,
  },
  {
    id: "channels",
    label: "Channels",
    href: "/channels",
    icon: Hash,
  },
];

export const CustomNavigation: Story = {
  args: {
    ...Default.args,
    navItems: customNavItems,
    activeRoute: "/chat",
  },
};

// High Badge Count
const actionItemsWithHighBadges: NavItem[] = [
  {
    id: "search",
    label: "Search",
    icon: Search,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    badge: 127, // Will display as "99+"
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export const HighBadgeCount: Story = {
  args: {
    ...Default.args,
    actionItems: actionItemsWithHighBadges,
  },
};

// Without Create Button
export const NoCreateButton: Story = {
  args: {
    ...Default.args,
    showCreateButton: false,
  },
};

// Mobile-Focused
export const MobileFocused: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  args: {
    ...Default.args,
    onCreateClick: () =>
      alert("Create button clicked! This would open a creation flow."),
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Story />
        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white font-display">
                Interactive Demo
              </h1>
              <p className="text-[#A1A1AA] text-lg">
                Try clicking the Create button, navigation items, and mobile
                menu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  🎯 Interactive Elements
                </h3>
                <ul className="space-y-2 text-[#A1A1AA]">
                  <li>• Navigation items with active states</li>
                  <li>• Hover effects with subtle animations</li>
                  <li>• Mobile hamburger menu</li>
                  <li>• Create button functionality</li>
                  <li>• Badge indicators</li>
                </ul>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  🎨 Brand Elements
                </h3>
                <ul className="space-y-2 text-[#A1A1AA]">
                  <li>• HIVE logo with hover effects</li>
                  <li>• Gold accent color (#FFD700)</li>
                  <li>• Space Grotesk typography</li>
                  <li>• 200ms ease-out animations</li>
                  <li>• Backdrop blur transparency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};
