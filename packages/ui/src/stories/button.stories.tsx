import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, RitualBadge, CTAButton } from "../components/ui/button";
import {
  ArrowRight,
  Download,
  Heart,
  Star,
  Plus,
  Settings,
  Trophy,
  Zap,
} from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "HIVE/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [
        { name: "hive-dark", value: "#0A0A0A" }, // Brand background
        { name: "surface", value: "#111111" }, // Surface for contrast
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default", // Primary variant (CORRECTED name)
        "ghost",
        "outline",
        "link",
        "destructive",
        "ritual-badge", // NEW: Only allowed gold fill
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "icon"],
    },
    loading: {
      control: { type: "boolean" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    shake: {
      control: { type: "boolean" },
      description: "Motion-based error feedback",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY VARIANTS - CORRECTED TO MATCH BRAND SYSTEM
// ============================================================================

export const Default: Story = {
  args: {
    children: "Continue",
    variant: "default", // Surface bg + gold text/border (NO gold fill)
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Cancel",
    variant: "ghost",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Learn More",
    variant: "outline",
    size: "md",
  },
};

export const Link: Story = {
  args: {
    children: "Terms & Conditions",
    variant: "link",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete Account",
    variant: "destructive",
    size: "md",
  },
};

// NEW: Ritual Badge - ONLY allowed gold fill
export const RitualBadgeStory: Story = {
  name: "Ritual Badge (Only Gold Fill)",
  args: {
    children: "Achievement",
    variant: "ritual-badge",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The ONLY button variant allowed to use gold background. Reserved for special moments, achievements, and ritual theatrics.",
      },
    },
  },
};

// ============================================================================
// BRAND COMPLIANCE SHOWCASE
// ============================================================================

export const BrandCompliance: Story = {
  name: "Brand System Compliance",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <div className="space-y-4">
        <h2 className="text-h2 font-display text-foreground">
          HIVE Button System
        </h2>
        <p className="text-body text-muted">
          Demonstrating brand-compliant button patterns with corrected colors
          and timing.
        </p>
      </div>

      {/* Primary Buttons: NO GOLD FILLS */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Primary Actions (NO Gold Fills)
        </h3>
        <div className="flex items-center space-x-4">
          <Button variant="default" size="lg">
            Primary CTA
          </Button>
          <Button
            variant="default"
            leftIcon={<ArrowRight className="h-4 w-4" />}
          >
            Continue
          </Button>
          <Button variant="default" loading>
            Processing...
          </Button>
        </div>
        <p className="text-caption text-muted">
          ✅ Surface background (#111111) + Gold text/border (#FFD700)
        </p>
      </div>

      {/* Secondary Actions */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Secondary Actions
        </h3>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Cancel</Button>
          <Button variant="outline">Learn More</Button>
          <Button variant="link">Terms & Conditions</Button>
        </div>
        <p className="text-caption text-muted">
          ✅ Minimal styling with brand-compliant hover states
        </p>
      </div>

      {/* Ritual Badges: ONLY Gold Fill Allowed */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Ritual Badges (ONLY Gold Fill)
        </h3>
        <div className="flex items-center space-x-4">
          <RitualBadge leftIcon={<Trophy className="h-3 w-3" />}>
            Achievement
          </RitualBadge>
          <RitualBadge leftIcon={<Star className="h-3 w-3" />}>
            Milestone
          </RitualBadge>
          <RitualBadge leftIcon={<Zap className="h-3 w-3" />}>
            Special
          </RitualBadge>
        </div>
        <p className="text-caption text-muted">
          ⚠️ ONLY place for gold background. Reserved for special moments.
        </p>
      </div>

      {/* Motion-Based Feedback */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Motion-Based Feedback
        </h3>
        <div className="flex items-center space-x-4">
          <Button variant="destructive" shake>
            Error State (Shake)
          </Button>
          <Button variant="default">Success (No Color Change)</Button>
        </div>
        <p className="text-caption text-muted">
          ✅ Motion feedback instead of red/green status colors
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// CORRECTED COLOR DEMONSTRATIONS
// ============================================================================

export const ColorSystem: Story = {
  name: "Corrected Brand Colors",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <h2 className="text-h2 font-display text-foreground">
        CORRECTED Color Values
      </h2>

      {/* Gold Accent Progression */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Gold Accent States
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <Button variant="default">Default</Button>
            <code className="text-caption text-muted">#FFD700</code>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="default"
              className="hover:text-[#EAC200] hover:border-[#EAC200]"
            >
              Hover
            </Button>
            <code className="text-caption text-muted">#EAC200</code>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="default"
              className="active:text-[#C4A500] active:border-[#C4A500]"
            >
              Active
            </Button>
            <code className="text-caption text-muted">#C4A500</code>
          </div>
        </div>
        <p className="text-caption text-muted">
          ✅ CORRECTED values: #EAC200 hover, #C4A500 active (not #E6C200)
        </p>
      </div>

      {/* Border Color Correction */}
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">Border Color</h3>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Correct Border</Button>
          <code className="text-caption text-muted">#2A2A2A</code>
        </div>
        <p className="text-caption text-muted">
          ✅ CORRECTED: #2A2A2A (not #374151 or #262626)
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// MOTION SYSTEM DEMONSTRATION
// ============================================================================

export const MotionSystem: Story = {
  name: "Brand Motion Timing",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <h2 className="text-h2 font-display text-foreground">
        CORRECTED Motion Timing
      </h2>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          90ms Micro-interactions
        </h3>
        <div className="flex items-center space-x-4">
          <Button variant="default">Hover Me (90ms)</Button>
          <Button variant="ghost">Focus Me (90ms)</Button>
        </div>
        <p className="text-caption text-muted">
          ✅ All button interactions use 90ms timing (not 150ms or 200ms)
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Single Easing Curve
        </h3>
        <code className="text-caption bg-surface px-2 py-1 rounded text-accent">
          cubic-bezier(0.22, 0.61, 0.36, 1)
        </code>
        <p className="text-caption text-muted">
          ✅ CORRECTED: Single easing for ALL animations (not multiple curves)
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-6 p-8 bg-background">
      <h3 className="text-h3 font-display text-foreground">Button Sizes</h3>
      <div className="flex items-center space-x-4">
        <Button variant="default" size="sm">
          Small
        </Button>
        <Button variant="default" size="md">
          Medium
        </Button>
        <Button variant="default" size="lg">
          Large
        </Button>
        <Button variant="default" size="xl">
          Extra Large
        </Button>
        <Button variant="default" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};

// ============================================================================
// SPECIALIZED COMPONENTS
// ============================================================================

export const SpecializedButtons: Story = {
  name: "Specialized Components",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">CTA Button</h3>
        <CTAButton leftIcon={<ArrowRight className="h-4 w-4" />}>
          Get Started Now
        </CTAButton>
        <p className="text-caption text-muted">
          Pre-configured large button for calls-to-action
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">Ritual Badges</h3>
        <div className="flex items-center space-x-4">
          <RitualBadge leftIcon={<Trophy className="h-3 w-3" />}>
            Level Up!
          </RitualBadge>
          <RitualBadge leftIcon={<Star className="h-3 w-3" />}>
            Featured
          </RitualBadge>
        </div>
        <p className="text-caption text-muted">
          Gold-filled badges for achievements and special moments
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// LOADING AND INTERACTION STATES
// ============================================================================

export const InteractionStates: Story = {
  name: "Loading & Error States",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">Loading States</h3>
        <div className="flex space-x-4">
          <Button variant="default" loading>
            Saving...
          </Button>
          <RitualBadge loading>Processing...</RitualBadge>
          <Button variant="outline" loading size="lg">
            Loading
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Error Feedback (Motion-Based)
        </h3>
        <div className="flex space-x-4">
          <Button variant="destructive" shake>
            Invalid Input (Shake)
          </Button>
          <Button variant="default" shake>
            Failed Action (Shake)
          </Button>
        </div>
        <p className="text-caption text-muted">
          ✅ Motion-based error feedback instead of red colors
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY DEMONSTRATION
// ============================================================================

export const Accessibility: Story = {
  name: "Accessibility Features",
  render: () => (
    <div className="flex flex-col space-y-8 p-8 bg-background">
      <h2 className="text-h2 font-display text-foreground">
        Accessibility Features
      </h2>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">Focus States</h3>
        <div className="flex space-x-4">
          <Button variant="default">Tab to Focus</Button>
          <Button variant="ghost">Keyboard Navigation</Button>
          <RitualBadge>Accessible Badge</RitualBadge>
        </div>
        <p className="text-caption text-muted">
          ✅ Gold focus rings (#FFD700) visible for keyboard navigation
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-h3 font-display text-foreground">
          Screen Reader Support
        </h3>
        <div className="flex space-x-4">
          <Button variant="default" aria-label="Save document to cloud storage">
            Save
          </Button>
          <Button variant="destructive" aria-describedby="delete-warning">
            Delete
          </Button>
        </div>
        <p id="delete-warning" className="text-caption text-muted">
          ✅ Proper ARIA labels and descriptions
        </p>
      </div>
    </div>
  ),
};
