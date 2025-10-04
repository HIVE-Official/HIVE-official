import type { Meta, StoryObj } from '@storybook/react';

/**
 * HIVE Spacing System
 *
 * 4px grid system for consistent spacing throughout the application.
 */

const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'HIVE spacing system based on 4px grid. All spacing uses multiples of 4.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SpacingDemo = ({ size, pixels }: { size: string; pixels: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 text-sm text-[var(--hive-text-primary)] font-mono">{size}</div>
    <div className="w-32 text-sm text-[var(--hive-text-muted)]">{pixels}</div>
    <div
      className="bg-[var(--hive-brand-primary)] h-8"
      style={{ width: pixels }}
    />
  </div>
);

export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Spacing Scale</h3>
      <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
        4px grid system - all spacing uses multiples of 4
      </p>
      <div className="space-y-3">
        <SpacingDemo size="space-1" pixels="4px" />
        <SpacingDemo size="space-2" pixels="8px" />
        <SpacingDemo size="space-3" pixels="12px" />
        <SpacingDemo size="space-4" pixels="16px" />
        <SpacingDemo size="space-6" pixels="24px" />
        <SpacingDemo size="space-8" pixels="32px" />
        <SpacingDemo size="space-12" pixels="48px" />
        <SpacingDemo size="space-16" pixels="64px" />
      </div>
    </div>
  ),
};

export const TouchTargets: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Touch Targets</h3>
      <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
        Mobile-first: All interactive elements are 44px+ minimum
      </p>
      <div className="flex gap-4 items-end">
        <div className="text-center">
          <div className="w-11 h-11 min-h-[44px] min-w-[44px] bg-[var(--hive-brand-primary)] rounded flex items-center justify-center text-[var(--hive-background-primary)] font-semibold">
            ✓
          </div>
          <p className="text-xs text-[var(--hive-text-muted)] mt-2">44px × 44px</p>
          <p className="text-xs text-[var(--hive-status-success)]">✓ Correct</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-[var(--hive-status-error)] rounded flex items-center justify-center text-white font-semibold opacity-50">
            ✗
          </div>
          <p className="text-xs text-[var(--hive-text-muted)] mt-2">32px × 32px</p>
          <p className="text-xs text-[var(--hive-status-error)]">✗ Too small</p>
        </div>
      </div>
    </div>
  ),
};
