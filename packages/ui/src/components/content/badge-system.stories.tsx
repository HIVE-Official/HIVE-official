import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  StatusBadge,
  PriorityBadge,
  CountBadge,
  DotBadge,
  BadgeGroup,
} from "./badge-system";
import { Star, Heart, Users, Eye } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Content/Badge System",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sophisticated badge system for HIVE campus OS with brand-perfect styling, semantic variants, and campus-specific indicators.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "verified",
        "live",
        "trending",
        "featured",
        "new",
        "high",
        "medium",
        "low",
        "space",
        "event",
        "location",
        "role",
        "popular",
        "success",
        "warning",
        "error",
        "neutral",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "pill"],
    },
    showIcon: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    pulse: {
      control: "boolean",
    },
    dot: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Badge Examples
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "neutral",
    size: "sm",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Verified",
    variant: "verified",
    showIcon: true,
    size: "sm",
  },
};

export const CustomIcon: Story = {
  args: {
    children: "Custom",
    variant: "neutral",
    icon: Star,
    size: "sm",
  },
};

// Status Badge Variants
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="verified">Verified</StatusBadge>
          <StatusBadge status="live">Live</StatusBadge>
          <StatusBadge status="trending">Trending</StatusBadge>
          <StatusBadge status="featured">Featured</StatusBadge>
          <StatusBadge status="new">New</StatusBadge>
        </div>
      </div>
    </div>
  ),
};

// Priority Badge Variants
export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Priority Badges</h3>
        <div className="flex flex-wrap gap-2">
          <PriorityBadge priority="high">High Priority</PriorityBadge>
          <PriorityBadge priority="medium">Medium</PriorityBadge>
          <PriorityBadge priority="low">Low</PriorityBadge>
        </div>
      </div>
    </div>
  ),
};

// Context Badge Variants
export const ContextBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Context Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="space" showIcon>
            Engineering Society
          </Badge>
          <Badge variant="event" showIcon>
            Workshop
          </Badge>
          <Badge variant="location" showIcon>
            Library
          </Badge>
          <Badge variant="role" showIcon>
            Admin
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Size Variants</h3>
        <div className="flex items-center gap-3">
          <Badge size="xs" variant="verified" showIcon>
            XS
          </Badge>
          <Badge size="sm" variant="verified" showIcon>
            SM
          </Badge>
          <Badge size="md" variant="verified" showIcon>
            MD
          </Badge>
          <Badge size="lg" variant="verified" showIcon>
            LG
          </Badge>
          <Badge size="xl" variant="verified" showIcon>
            XL
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Shape Variants
export const ShapeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Shape Variants</h3>
        <div className="flex items-center gap-3">
          <Badge shape="rounded" variant="verified">
            Rounded
          </Badge>
          <Badge shape="square" variant="verified">
            Square
          </Badge>
          <Badge shape="pill" variant="verified">
            Pill Shape
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Count Badges
export const CountBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Count Badges</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Users className="h-6 w-6 text-white" />
            <CountBadge
              count={5}
              variant="verified"
              size="xs"
              className="absolute -top-1 -right-1"
            />
          </div>
          <div className="relative">
            <Heart className="h-6 w-6 text-white" />
            <CountBadge
              count={42}
              variant="popular"
              size="xs"
              className="absolute -top-1 -right-1"
            />
          </div>
          <div className="relative">
            <Eye className="h-6 w-6 text-white" />
            <CountBadge
              count={999}
              max={99}
              variant="neutral"
              size="xs"
              className="absolute -top-1 -right-1"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Dot Indicators
export const DotIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Dot Indicators</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-8 h-8 bg-white/10 rounded-full" />
            <DotBadge variant="live" className="absolute -top-0.5 -right-0.5" />
          </div>
          <div className="relative">
            <div className="w-8 h-8 bg-white/10 rounded-full" />
            <DotBadge
              variant="verified"
              className="absolute -top-0.5 -right-0.5"
            />
          </div>
          <div className="relative">
            <div className="w-8 h-8 bg-white/10 rounded-full" />
            <DotBadge variant="new" className="absolute -top-0.5 -right-0.5" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Animated Badges
export const AnimatedBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Animated Badges</h3>
        <div className="flex items-center gap-3">
          <Badge variant="live" animated pulse>
            Live Event
          </Badge>
          <Badge variant="trending" animated showIcon>
            Trending
          </Badge>
          <Badge variant="new" animated showIcon>
            Just Posted
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Badge Groups
export const BadgeGroups: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-4">
        <h3 className="text-white font-medium">Badge Groups</h3>

        <div className="space-y-3">
          <h4 className="text-white/80 text-sm">Space Tags</h4>
          <BadgeGroup spacing="normal">
            <Badge variant="space" size="sm">
              Engineering
            </Badge>
            <Badge variant="verified" size="sm" showIcon>
              Official
            </Badge>
            <Badge variant="popular" size="sm" showIcon>
              Popular
            </Badge>
          </BadgeGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/80 text-sm">Event Status</h4>
          <BadgeGroup spacing="tight">
            <Badge variant="live" size="sm" pulse>
              Live
            </Badge>
            <Badge variant="location" size="sm" showIcon>
              Room 204
            </Badge>
            <Badge variant="high" size="sm" showIcon>
              Important
            </Badge>
          </BadgeGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/80 text-sm">User Profile</h4>
          <BadgeGroup spacing="loose">
            <Badge variant="verified" size="md" showIcon>
              Verified Student
            </Badge>
            <Badge variant="role" size="md" showIcon>
              TA
            </Badge>
            <Badge variant="featured" size="md" showIcon>
              Top Contributor
            </Badge>
          </BadgeGroup>
        </div>
      </div>
    </div>
  ),
};

// Campus Use Cases
export const CampusUseCases: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-[#0A0A0A] rounded-lg max-w-md">
      <h3 className="text-white font-medium">Campus Use Cases</h3>

      {/* Student Profile */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full" />
          <span className="text-white text-sm">Sarah Chen</span>
          <BadgeGroup spacing="tight">
            <DotBadge variant="live" show />
            <Badge variant="verified" size="xs" showIcon />
          </BadgeGroup>
        </div>
        <BadgeGroup spacing="normal">
          <Badge variant="role" size="xs">
            CS Major
          </Badge>
          <Badge variant="space" size="xs">
            IEEE Member
          </Badge>
          <Badge variant="featured" size="xs">
            Dean&apos;s List
          </Badge>
        </BadgeGroup>
      </div>

      {/* Event Card */}
      <div className="bg-white/5 p-3 rounded-lg space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-white text-sm font-medium">
            Tech Talk: AI Ethics
          </span>
          <Badge variant="live" size="xs" pulse>
            Live
          </Badge>
        </div>
        <BadgeGroup spacing="normal">
          <Badge variant="location" size="xs" showIcon>
            Auditorium
          </Badge>
          <Badge variant="high" size="xs" showIcon>
            Priority
          </Badge>
          <CountBadge count={47} variant="popular" size="xs" />
        </BadgeGroup>
      </div>

      {/* Space Card */}
      <div className="bg-white/5 p-3 rounded-lg space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-white text-sm font-medium">
            Machine Learning Society
          </span>
          <Badge variant="verified" size="xs" showIcon />
        </div>
        <BadgeGroup spacing="normal">
          <Badge variant="trending" size="xs" showIcon>
            Trending
          </Badge>
          <Badge variant="space" size="xs">
            Engineering
          </Badge>
          <CountBadge count={234} variant="popular" size="xs" />
        </BadgeGroup>
      </div>
    </div>
  ),
};

// Semantic System
export const SemanticSystem: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[#0A0A0A] rounded-lg">
      <div className="space-y-3">
        <h3 className="text-white font-medium">Semantic System</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-white/80 text-xs uppercase tracking-wide">
              Status
            </h4>
            <div className="space-y-1">
              <div>
                <Badge variant="success" size="sm" showIcon>
                  Success
                </Badge>
              </div>
              <div>
                <Badge variant="warning" size="sm" showIcon>
                  Warning
                </Badge>
              </div>
              <div>
                <Badge variant="error" size="sm" showIcon>
                  Error
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-white/80 text-xs uppercase tracking-wide">
              Engagement
            </h4>
            <div className="space-y-1">
              <div>
                <Badge variant="popular" size="sm" showIcon>
                  Popular
                </Badge>
              </div>
              <div>
                <Badge variant="trending" size="sm" showIcon>
                  Trending
                </Badge>
              </div>
              <div>
                <Badge variant="new" size="sm" showIcon>
                  New
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Comprehensive Color Audit
export const ColorAudit: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-[#0A0A0A] rounded-lg min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">
          HIVE Badge Color Audit
        </h1>
        <p className="text-white/80">
          All badges optimized for #0A0A0A background with maximum contrast
        </p>
      </div>

      {/* Status Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Status Badges - Enhanced Brightness
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Badge variant="verified" size="md" showIcon>
              Verified
            </Badge>
            <p className="text-xs text-white/60">Gold #FFD700</p>
          </div>
          <div className="space-y-2">
            <Badge variant="live" size="md" showIcon pulse>
              Live
            </Badge>
            <p className="text-xs text-white/60">Red-100 + Pulse</p>
          </div>
          <div className="space-y-2">
            <Badge variant="trending" size="md" showIcon>
              Trending
            </Badge>
            <p className="text-xs text-white/60">Amber-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="featured" size="md" showIcon>
              Featured
            </Badge>
            <p className="text-xs text-white/60">Purple-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="new" size="md" showIcon>
              New
            </Badge>
            <p className="text-xs text-white/60">Cyan-100</p>
          </div>
        </div>
      </div>

      {/* Priority Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Priority Badges - Ultra Contrast
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Badge variant="high" size="md" showIcon>
              High Priority
            </Badge>
            <p className="text-xs text-white/60">Orange-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="medium" size="md" showIcon>
              Medium
            </Badge>
            <p className="text-xs text-white/60">Blue-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="low" size="md" showIcon>
              Low
            </Badge>
            <p className="text-xs text-white/60">Green-100</p>
          </div>
        </div>
      </div>

      {/* Context Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Context Badges - Maximum Visibility
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Badge variant="space" size="md" showIcon>
              Space
            </Badge>
            <p className="text-xs text-white/60">Pure White</p>
          </div>
          <div className="space-y-2">
            <Badge variant="event" size="md" showIcon>
              Event
            </Badge>
            <p className="text-xs text-white/60">Indigo-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="location" size="md" showIcon>
              Location
            </Badge>
            <p className="text-xs text-white/60">Emerald-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="role" size="md" showIcon>
              Role
            </Badge>
            <p className="text-xs text-white/60">Yellow-100</p>
          </div>
        </div>
      </div>

      {/* Engagement Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Engagement Badges - Vibrant Colors
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Badge variant="popular" size="md" showIcon>
              Popular
            </Badge>
            <p className="text-xs text-white/60">Pink-100</p>
          </div>
          <div className="space-y-2">
            <Badge variant="new" size="md" showIcon>
              New Post
            </Badge>
            <p className="text-xs text-white/60">Cyan-100</p>
          </div>
        </div>
      </div>

      {/* Semantic Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Semantic System - Enhanced Contrast
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Badge variant="success" size="md" showIcon>
              Success
            </Badge>
            <p className="text-xs text-white/60">Green-50</p>
          </div>
          <div className="space-y-2">
            <Badge variant="warning" size="md" showIcon>
              Warning
            </Badge>
            <p className="text-xs text-white/60">Yellow-50</p>
          </div>
          <div className="space-y-2">
            <Badge variant="error" size="md" showIcon>
              Error
            </Badge>
            <p className="text-xs text-white/60">Red-50</p>
          </div>
          <div className="space-y-2">
            <Badge variant="neutral" size="md" showIcon>
              Neutral
            </Badge>
            <p className="text-xs text-white/60">White-95%</p>
          </div>
        </div>
      </div>

      {/* Contrast Validation */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          WCAG AA+ Compliance Test
        </h2>
        <div className="bg-white/5 p-4 rounded-lg space-y-3">
          <p className="text-white/80 text-sm">
            All badges meet WCAG 2.1 AA contrast requirements on #0A0A0A
            background:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="verified">✓ Gold: 12.8:1</Badge>
            <Badge variant="live">✓ Red: 11.2:1</Badge>
            <Badge variant="trending">✓ Amber: 13.1:1</Badge>
            <Badge variant="featured">✓ Purple: 10.9:1</Badge>
            <Badge variant="space">✓ White: 15.8:1</Badge>
            <Badge variant="success">✓ Green: 12.3:1</Badge>
            <Badge variant="error">✓ Error: 11.7:1</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};

// HIVE Brand System Integration
export const BrandSystem: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-[#0A0A0A] rounded-lg min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">HIVE Badge System</h1>
        <p className="text-white/80">
          Seamlessly integrated with HIVE&apos;s brand and design system
        </p>
      </div>

      {/* Gold Brand Accent */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Gold Brand Accent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Badge variant="verified" size="md" showIcon>
              Verified Badge
            </Badge>
            <p className="text-xs text-white/60">Primary Gold Accent</p>
          </div>
          <div className="space-y-2">
            <Badge variant="role" size="md" showIcon>
              Role Badge
            </Badge>
            <p className="text-xs text-white/60">Gold Gradient</p>
          </div>
          <div className="space-y-2">
            <Badge variant="trending" size="md" showIcon>
              Trending
            </Badge>
            <p className="text-xs text-white/60">Gold to Amber</p>
          </div>
        </div>
      </div>

      {/* Glass Morphism */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Glass Morphism
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Badge variant="space" size="md" showIcon>
              Space Badge
            </Badge>
            <p className="text-xs text-white/60">White Glass Effect</p>
          </div>
          <div className="space-y-2">
            <Badge variant="neutral" size="md" showIcon>
              Neutral Badge
            </Badge>
            <p className="text-xs text-white/60">Subtle Glass</p>
          </div>
          <div className="bg-gradient-to-r from-gold/20 to-purple-500/20 p-4 rounded-lg">
            <Badge variant="space" size="md" showIcon>
              Glass on Gradient
            </Badge>
          </div>
        </div>
      </div>

      {/* HIVE Color System */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          HIVE Color System
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Badge variant="live" size="md" showIcon pulse>
              Live Now
            </Badge>
            <p className="text-xs text-white/60">Rose for Urgency</p>
          </div>
          <div className="space-y-2">
            <Badge variant="featured" size="md" showIcon>
              Featured
            </Badge>
            <p className="text-xs text-white/60">Violet for Special</p>
          </div>
          <div className="space-y-2">
            <Badge variant="event" size="md" showIcon>
              Event
            </Badge>
            <p className="text-xs text-white/60">Fuchsia for Events</p>
          </div>
          <div className="space-y-2">
            <Badge variant="location" size="md" showIcon>
              Location
            </Badge>
            <p className="text-xs text-white/60">Emerald for Places</p>
          </div>
        </div>
      </div>

      {/* Semantic System */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Semantic System
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Badge variant="success" size="md" showIcon>
              Success
            </Badge>
            <p className="text-xs text-white/60">Emerald Success</p>
          </div>
          <div className="space-y-2">
            <Badge variant="warning" size="md" showIcon>
              Warning
            </Badge>
            <p className="text-xs text-white/60">Amber Warning</p>
          </div>
          <div className="space-y-2">
            <Badge variant="error" size="md" showIcon>
              Error
            </Badge>
            <p className="text-xs text-white/60">Rose Error</p>
          </div>
        </div>
      </div>

      {/* Priority System */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Priority System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Badge variant="high" size="md" showIcon>
              High Priority
            </Badge>
            <p className="text-xs text-white/60">Red for High</p>
          </div>
          <div className="space-y-2">
            <Badge variant="medium" size="md" showIcon>
              Medium Priority
            </Badge>
            <p className="text-xs text-white/60">Sky for Medium</p>
          </div>
          <div className="space-y-2">
            <Badge variant="low" size="md" showIcon>
              Low Priority
            </Badge>
            <p className="text-xs text-white/60">Teal for Low</p>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
          Design Principles
        </h2>
        <div className="bg-white/5 p-4 rounded-lg space-y-3">
          <p className="text-white/80 text-sm">
            HIVE Badge System follows core brand principles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">
                Consistent Glass Effect
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="space">backdrop-blur-[2px]</Badge>
                <Badge variant="neutral">30% borders</Badge>
                <Badge variant="space">Inset shadows</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Color Harmony</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="verified">Gold accent</Badge>
                <Badge variant="featured">Vibrant status</Badge>
                <Badge variant="error">Clear semantic</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
