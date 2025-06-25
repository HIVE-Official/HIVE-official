import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup } from "./button";
import {
  Heart,
  Download,
  ArrowRight,
  Plus,
  Settings,
  Check,
  Edit,
  Trash2,
} from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "HIVE-branded button component following the brand aesthetic guidelines. Features the signature gold primary variant with HIVE custom motion timing and dark-first design.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "ghost",
        "outline",
        "link",
        "destructive",
        "success",
      ],
      description: "Button style variant. Default uses HIVE signature gold.",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "default", "lg", "xl", "icon"],
      description: "Button size preset",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes button take full width of container",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    asChild: {
      control: "boolean",
      description: "Renders as a child component (e.g., for Next.js Link)",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Stories
export const Default: Story = {
  args: {
    children: "Send magic link →",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Cancel",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Skip for now",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Learn more",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Read privacy policy",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete space",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Space created!",
    leftIcon: <Check className="h-4 w-4" />,
  },
};

// Size Variants
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "XS Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large button",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large button",
  },
};

export const IconButton: Story = {
  args: {
    size: "icon",
    children: <Plus className="h-4 w-4" />,
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full width button",
  },
  parameters: {
    layout: "padded",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Creating space...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled button",
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Download className="h-4 w-4" />,
    children: "Download app",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRight className="h-4 w-4" />,
    children: "Continue",
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Heart className="h-4 w-4" />,
    rightIcon: <Settings className="h-4 w-4" />,
    children: "Customize",
  },
};

// Button Groups
export const ButtonGroupHorizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Horizontal Button Group</h3>
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With Icons</h3>
        <ButtonGroup variant="outline">
          <Button leftIcon={<Edit className="h-4 w-4" />}>Edit</Button>
          <Button leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const ButtonGroupVertical: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Vertical Button Group</h3>
        <ButtonGroup orientation="vertical">
          <Button>Top</Button>
          <Button>Middle</Button>
          <Button>Bottom</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Brand Showcase - All variants side by side
export const BrandShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-6">
        HIVE Button System - Complete component system with HIVE custom motion
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            Primary (Signature Gold)
          </h3>
          <div className="flex gap-2">
            <Button>Join space</Button>
            <Button loading>Creating...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            All Variants
          </h3>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            Size Range
          </h3>
          <div className="flex gap-2 items-end">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            With Icons
          </h3>
          <div className="flex gap-2">
            <Button leftIcon={<Download className="h-4 w-4" />}>
              Download
            </Button>
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
            <Button variant="success" leftIcon={<Check className="h-4 w-4" />}>
              Completed
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            Button Groups
          </h3>
          <div className="space-y-3">
            <ButtonGroup>
              <Button>Left</Button>
              <Button>Center</Button>
              <Button>Right</Button>
            </ButtonGroup>
            <ButtonGroup variant="outline" size="sm">
              <Button leftIcon={<Edit className="h-4 w-4" />}>Edit</Button>
              <Button leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
            </ButtonGroup>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">
            Full Width
          </h3>
          <Button fullWidth>Full width action</Button>
        </div>
      </div>
    </div>
  ),
};

// Motion Demo - Shows the 90ms timing and scale effects
export const MotionDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-6">
        Hover each button to see 90ms spring motion with scale transforms
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <Button>Hover me (1.02x)</Button>
        <Button variant="secondary">Scale feedback</Button>
        <Button variant="outline">iOS-like spring</Button>
        <Button variant="destructive">Shake on hover</Button>
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        <strong>Motion specs:</strong> 90ms duration,
        cubic-bezier(0.33,0.65,0,1)
      </div>
    </div>
  ),
};

// Real-world Usage Examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Realistic HIVE usage examples with proper microcopy
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-3 text-foreground">
            Onboarding Flow
          </h3>
          <div className="flex gap-3">
            <Button>Send magic link →</Button>
            <Button variant="ghost">Skip for now</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-foreground">
            Space Management
          </h3>
          <div className="flex gap-3">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Create tool</Button>
            <Button variant="outline">Manage members</Button>
            <Button variant="destructive">Archive space</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-foreground">
            Content Actions
          </h3>
          <div className="flex gap-3">
            <Button size="sm" rightIcon={<Heart className="h-4 w-4" />}>
              Like
            </Button>
            <Button size="sm" variant="ghost">
              Reply
            </Button>
            <Button size="sm" variant="ghost">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Alternative Design Explorations
export const AlternativeDesigns: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="text-sm text-muted-foreground mb-6">
        Alternative approaches to the HIVE button system - exploring different
        takes on the gold accent
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Current: Solid Gold Fill
          </h3>
          <div className="flex gap-3">
            <Button>Join space</Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>Create tool</Button>
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 1: Gold Border + Transparent
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-background transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-background transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-background transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 2: Gold Gradient
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-accent to-accent/80 text-background hover:from-accent/90 hover:to-accent/70 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-accent to-accent/80 text-background hover:from-accent/90 hover:to-accent/70 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-accent to-accent/80 text-background hover:from-accent/90 hover:to-accent/70 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 3: Subtle Gold Glow
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 4: Minimal Gold Accent
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface text-foreground border-l-2 border-accent hover:bg-surface/80 hover:border-l-4 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface text-foreground border-l-2 border-accent hover:bg-surface/80 hover:border-l-4 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-surface text-foreground border-l-2 border-accent hover:bg-surface/80 hover:border-l-4 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 5: Gold Text + Dark Surface
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-background/50 text-accent border border-border hover:bg-background hover:text-accent/90 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-background/50 text-accent border border-border hover:bg-background hover:text-accent/90 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-background/50 text-accent border border-border hover:bg-background hover:text-accent/90 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-accent">
            Alternative 6: Inverted Hover
          </h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-transparent border border-accent text-accent hover:bg-background hover:text-accent hover:border-accent/50 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Join space
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-transparent border border-accent text-accent hover:bg-background hover:text-accent hover:border-accent/50 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4 mr-2" />
              Create tool
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-transparent border border-accent text-accent hover:bg-background hover:text-accent hover:border-accent/50 transition-all duration-[90ms] cubic-bezier(0.33, 0.65, 0, 1) hover:scale-[1.02] active:scale-[0.98]">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 border border-border rounded-lg bg-surface/20">
        <h4 className="font-medium mb-2">Design Philosophy Notes</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Current:</strong> Bold, confident, maximizes gold impact
          </p>
          <p>
            <strong>Alt 1:</strong> More subtle, respects &quot;one bright
            note&quot; principle
          </p>
          <p>
            <strong>Alt 2:</strong> Adds depth and richness to the gold
          </p>
          <p>
            <strong>Alt 3:</strong> Creates ambient glow, feels more magical
          </p>
          <p>
            <strong>Alt 4:</strong> Minimal accent, focuses on content over
            chrome
          </p>
          <p>
            <strong>Alt 5:</strong> Reverses relationship, gold becomes text
            color
          </p>
          <p>
            <strong>Alt 6:</strong> Maintains outline but inverts hover behavior
          </p>
        </div>
      </div>
    </div>
  ),
};
