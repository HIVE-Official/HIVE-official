import type { Meta, StoryObj } from "@storybook/react";
import { HiveLogo } from "../../atomic/atoms/hive-logo";

/**
 * # HiveLogo
 *
 * Atom component displaying the official HIVE hexagonal honeycomb logo.
 * Available in three color variants optimized for different backgrounds.
 *
 * ## HIVE Motion System
 * - Logo scales smoothly with `transition-smooth ease-liquid` on state changes
 * - Supports hover/active states for interactive use cases
 *
 * ## Color Variants
 * - **Gold (#FFD700)**: Primary brand color - use on dark backgrounds (default)
 * - **White (#FFFFFF)**: Light variant - use on dark/colored backgrounds
 * - **Black (#000000)**: Dark variant - use on light backgrounds
 * - **currentColor**: Inherits parent text color - useful for themed components
 *
 * ## Usage
 * ```tsx
 * // Default gold logo
 * <HiveLogo size={32} />
 *
 * // White logo for dark nav
 * <HiveLogo variant="white" size={40} />
 *
 * // Inherit parent color
 * <HiveLogo variant="currentColor" size={24} />
 * ```
 */
const meta = {
  title: "11-Shared/HiveLogo",
  component: HiveLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default gold logo (primary brand color)
 */
export const Default: Story = {
  args: {
    variant: "gold",
    size: 64,
  },
};

/**
 * White logo for dark backgrounds
 */
export const White: Story = {
  args: {
    variant: "white",
    size: 64,
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-gray-900 p-8">
        <Story />
      </div>
    ),
  ],
};

/**
 * Black logo for light backgrounds
 */
export const Black: Story = {
  args: {
    variant: "black",
    size: 64,
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
};

/**
 * currentColor variant - inherits parent text color
 */
export const CurrentColor: Story = {
  args: {
    variant: "currentColor",
    size: 64,
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-primary">
        <Story />
      </div>
    ),
  ],
};

/**
 * All color variants side by side
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      {/* Gold */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <HiveLogo variant="gold" size={80} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Gold</p>
          <p className="text-xs text-muted-foreground">#FFD700</p>
        </div>
      </div>

      {/* White */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-lg bg-gray-900 p-6">
          <HiveLogo variant="white" size={80} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">White</p>
          <p className="text-xs text-muted-foreground">#FFFFFF</p>
        </div>
      </div>

      {/* Black */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-lg border border-border bg-gray-100 p-6">
          <HiveLogo variant="black" size={80} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Black</p>
          <p className="text-xs text-muted-foreground">#000000</p>
        </div>
      </div>

      {/* currentColor */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-6 text-primary">
          <HiveLogo variant="currentColor" size={80} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Current</p>
          <p className="text-xs text-muted-foreground">Inherited</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={16} />
        <p className="text-xs text-muted-foreground">16px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={24} />
        <p className="text-xs text-muted-foreground">24px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={32} />
        <p className="text-xs text-muted-foreground">32px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={48} />
        <p className="text-xs text-muted-foreground">48px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={64} />
        <p className="text-xs text-muted-foreground">64px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={96} />
        <p className="text-xs text-muted-foreground">96px</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={128} />
        <p className="text-xs text-muted-foreground">128px</p>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Navigation header
 */
export const NavigationHeader: Story = {
  render: () => (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <HiveLogo variant="gold" size={32} />
          <span className="text-xl font-bold text-foreground">HIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-muted-foreground transition-smooth ease-liquid hover:text-foreground">
            Feed
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-smooth ease-liquid hover:text-foreground">
            Spaces
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-smooth ease-liquid hover:text-foreground">
            HiveLab
          </a>
        </div>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Login screen
 */
export const LoginScreen: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col items-center gap-6 rounded-lg border border-border bg-card p-8">
      <div className="flex flex-col items-center gap-3">
        <HiveLogo variant="gold" size={80} />
        <h1 className="text-2xl font-bold text-foreground">Welcome to HIVE</h1>
        <p className="text-sm text-muted-foreground text-center">
          Connect with your campus community
        </p>
      </div>
      <div className="w-full space-y-3">
        <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
          Sign in with @buffalo.edu
        </button>
        <button className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth ease-liquid hover:bg-accent">
          Create Account
        </button>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Loading state
 */
export const LoadingState: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-12">
      <HiveLogo
        variant="gold"
        size={64}
        className="animate-pulse"
      />
      <p className="text-sm text-muted-foreground">Loading HIVE...</p>
    </div>
  ),
};

/**
 * HIVE Pattern: Footer branding
 */
export const FooterBranding: Story = {
  render: () => (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="flex flex-col items-center gap-4 border-t border-border p-6">
        <div className="flex items-center gap-2">
          <HiveLogo variant="gold" size={24} />
          <span className="text-sm font-semibold text-foreground">HIVE</span>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="transition-smooth ease-liquid hover:text-foreground">About</a>
          <a href="#" className="transition-smooth ease-liquid hover:text-foreground">Help</a>
          <a href="#" className="transition-smooth ease-liquid hover:text-foreground">Privacy</a>
          <a href="#" className="transition-smooth ease-liquid hover:text-foreground">Terms</a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2025 HIVE. All rights reserved.
        </p>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Interactive hover state
 */
export const InteractiveButton: Story = {
  render: () => (
    <button className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-smooth ease-liquid hover:border-primary/50 hover:bg-primary/5">
      <HiveLogo
        variant="gold"
        size={40}
        className="transition-smooth ease-liquid group-hover:scale-110"
      />
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold text-foreground">Launch HIVE</span>
        <span className="text-xs text-muted-foreground">Connect with campus</span>
      </div>
    </button>
  ),
};
