import type { Meta, StoryObj } from '@storybook/react';

/**
 * HIVE Typography System
 *
 * Font families, sizes, weights, and text styles for consistent typography.
 */

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'HIVE typography system with Geist Sans for UI and Space Grotesk for display.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Font Families</h3>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-sm text-[var(--hive-text-muted)] mb-2">UI Font</p>
          <p className="text-4xl font-sans text-[var(--hive-text-primary)]">Geist Sans</p>
          <p className="text-sm text-[var(--hive-text-secondary)] mt-2">
            Used for body text, UI elements, forms. className="font-sans"
          </p>
        </div>

        <div className="p-6 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <p className="text-sm text-[var(--hive-text-muted)] mb-2">Display Font</p>
          <p className="text-4xl font-display text-[var(--hive-text-primary)]">Space Grotesk</p>
          <p className="text-sm text-[var(--hive-text-secondary)] mt-2">
            Used for headings, emphasis. className="font-display"
          </p>
        </div>
      </div>
    </div>
  ),
};

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Type Scale</h3>
      <div className="space-y-4">
        <div><span className="text-xs text-[var(--hive-text-primary)]">text-xs: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(12px)</span></div>
        <div><span className="text-sm text-[var(--hive-text-primary)]">text-sm: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(14px)</span></div>
        <div><span className="text-base text-[var(--hive-text-primary)]">text-base: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(16px)</span></div>
        <div><span className="text-lg text-[var(--hive-text-primary)]">text-lg: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(18px)</span></div>
        <div><span className="text-xl text-[var(--hive-text-primary)]">text-xl: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(20px)</span></div>
        <div><span className="text-2xl text-[var(--hive-text-primary)]">text-2xl: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(24px)</span></div>
        <div><span className="text-3xl text-[var(--hive-text-primary)]">text-3xl: The quick brown fox</span> <span className="text-xs text-[var(--hive-text-muted)]">(30px)</span></div>
        <div><span className="text-4xl text-[var(--hive-text-primary)]">text-4xl: Quick brown</span> <span className="text-xs text-[var(--hive-text-muted)]">(36px)</span></div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Font Weights</h3>
      <div className="space-y-3">
        <p className="text-base font-light text-[var(--hive-text-primary)]">font-light (300): The quick brown fox</p>
        <p className="text-base font-normal text-[var(--hive-text-primary)]">font-normal (400): The quick brown fox</p>
        <p className="text-base font-medium text-[var(--hive-text-primary)]">font-medium (500): The quick brown fox</p>
        <p className="text-base font-semibold text-[var(--hive-text-primary)]">font-semibold (600): The quick brown fox</p>
        <p className="text-base font-bold text-[var(--hive-text-primary)]">font-bold (700): The quick brown fox</p>
      </div>
    </div>
  ),
};
