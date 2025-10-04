import type { Meta, StoryObj } from '@storybook/react';

/**
 * HIVE Color System
 *
 * Complete color palette with brand colors, semantic colors, and status indicators.
 * All colors use CSS variables for consistency and theming.
 */

// Color swatch component
const ColorSwatch = ({ name, variable, hex, description }: {
  name: string;
  variable: string;
  hex: string;
  description?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-24 w-full rounded-lg border border-[var(--hive-border-default)] shadow-hive-level1"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className="space-y-1">
      <p className="text-sm font-semibold text-[var(--hive-text-primary)]">{name}</p>
      <p className="text-xs font-mono text-[var(--hive-text-muted)]">{variable}</p>
      <p className="text-xs font-mono text-[var(--hive-text-muted)]">{hex}</p>
      {description && (
        <p className="text-xs text-[var(--hive-text-secondary)]">{description}</p>
      )}
    </div>
  </div>
);

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'HIVE color system with brand colors, semantic colors, and status indicators. All components use CSS variables for consistency.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Brand Colors
export const BrandColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Brand Colors</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Primary brand colors for HIVE - Gold accent on dark backgrounds
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorSwatch
          name="Brand Primary"
          variable="--hive-brand-primary"
          hex="#FFD700"
          description="Primary actions, highlights, CTAs"
        />
        <ColorSwatch
          name="Brand Hover"
          variable="--hive-brand-hover"
          hex="#FFC700"
          description="Hover state for primary elements"
        />
        <ColorSwatch
          name="Brand Accent"
          variable="--hive-brand-accent"
          hex="#FFE44D"
          description="Secondary highlights"
        />
      </div>
    </div>
  ),
};

// Background Colors
export const BackgroundColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Background Colors</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Dark theme backgrounds with subtle hierarchy
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorSwatch
          name="Background Primary"
          variable="--hive-background-primary"
          hex="#0A0A0B"
          description="App background, main surface"
        />
        <ColorSwatch
          name="Background Secondary"
          variable="--hive-background-secondary"
          hex="#111113"
          description="Cards, elevated surfaces"
        />
        <ColorSwatch
          name="Background Tertiary"
          variable="--hive-background-tertiary"
          hex="#1A1A1C"
          description="Hover states, subtle elevation"
        />
      </div>
    </div>
  ),
};

// Text Colors
export const TextColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Text Colors</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Text hierarchy for readability and emphasis
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorSwatch
          name="Text Primary"
          variable="--hive-text-primary"
          hex="#E5E5E7"
          description="Main content text"
        />
        <ColorSwatch
          name="Text Secondary"
          variable="--hive-text-secondary"
          hex="#B4B4B6"
          description="Supporting text"
        />
        <ColorSwatch
          name="Text Muted"
          variable="--hive-text-muted"
          hex="#9CA3AF"
          description="Subtle, de-emphasized text"
        />
      </div>
    </div>
  ),
};

// Status Colors
export const StatusColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Status Colors</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Semantic colors for feedback and states
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ColorSwatch
          name="Success"
          variable="--hive-status-success"
          hex="#10B981"
          description="Positive actions, confirmations"
        />
        <ColorSwatch
          name="Warning"
          variable="--hive-status-warning"
          hex="#F59E0B"
          description="Caution, attention needed"
        />
        <ColorSwatch
          name="Error"
          variable="--hive-status-error"
          hex="#EF4444"
          description="Errors, destructive actions"
        />
        <ColorSwatch
          name="Info"
          variable="--hive-status-info"
          hex="#3B82F6"
          description="Information, neutral feedback"
        />
      </div>
    </div>
  ),
};

// Interactive Colors
export const InteractiveColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Interactive States</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Colors for hover, active, and focus states
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorSwatch
          name="Interactive Hover"
          variable="--hive-interactive-hover"
          hex="#2A2A2C"
          description="Hover state for interactive elements"
        />
        <ColorSwatch
          name="Interactive Active"
          variable="--hive-interactive-active"
          hex="#3A3A3C"
          description="Active/pressed state"
        />
        <ColorSwatch
          name="Border Default"
          variable="--hive-border-default"
          hex="#2A2A2C"
          description="Default border color"
        />
      </div>
    </div>
  ),
};

// All Colors Overview
export const AllColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">Complete Color Palette</h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          All HIVE colors in one view. Use CSS variables in your components.
        </p>
      </div>

      {/* Brand */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Brand</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" variable="--hive-brand-primary" hex="#FFD700" />
          <ColorSwatch name="Hover" variable="--hive-brand-hover" hex="#FFC700" />
          <ColorSwatch name="Accent" variable="--hive-brand-accent" hex="#FFE44D" />
        </div>
      </div>

      {/* Backgrounds */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Backgrounds</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" variable="--hive-background-primary" hex="#0A0A0B" />
          <ColorSwatch name="Secondary" variable="--hive-background-secondary" hex="#111113" />
          <ColorSwatch name="Tertiary" variable="--hive-background-tertiary" hex="#1A1A1C" />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Text</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" variable="--hive-text-primary" hex="#E5E5E7" />
          <ColorSwatch name="Secondary" variable="--hive-text-secondary" hex="#B4B4B6" />
          <ColorSwatch name="Muted" variable="--hive-text-muted" hex="#9CA3AF" />
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Success" variable="--hive-status-success" hex="#10B981" />
          <ColorSwatch name="Warning" variable="--hive-status-warning" hex="#F59E0B" />
          <ColorSwatch name="Error" variable="--hive-status-error" hex="#EF4444" />
          <ColorSwatch name="Info" variable="--hive-status-info" hex="#3B82F6" />
        </div>
      </div>
    </div>
  ),
};

// Usage Examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Color Usage</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Examples of how to use HIVE colors in components
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg">
          <h4 className="text-[var(--hive-text-primary)] font-semibold mb-2">Card with border</h4>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Secondary background with default border
          </p>
        </div>

        <button className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg font-medium hover:bg-[var(--hive-brand-hover)] transition-colors">
          Primary Button
        </button>

        <div className="flex gap-2">
          <div className="px-3 py-1 bg-[var(--hive-status-success)] text-white rounded-full text-sm">Success</div>
          <div className="px-3 py-1 bg-[var(--hive-status-warning)] text-white rounded-full text-sm">Warning</div>
          <div className="px-3 py-1 bg-[var(--hive-status-error)] text-white rounded-full text-sm">Error</div>
          <div className="px-3 py-1 bg-[var(--hive-status-info)] text-white rounded-full text-sm">Info</div>
        </div>
      </div>

      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg border border-[var(--hive-border-default)]">
        <h4 className="text-[var(--hive-text-primary)] font-semibold mb-2">Code Example</h4>
        <pre className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-primary)] p-4 rounded overflow-x-auto">
{`// Always use CSS variables
className="bg-[var(--hive-brand-primary)]"
className="text-[var(--hive-text-primary)]"
className="border-[var(--hive-border-default)]"

// ❌ Never hardcode colors
className="bg-yellow-400"  // WRONG
className="text-white"     // WRONG`}
        </pre>
      </div>
    </div>
  ),
};
