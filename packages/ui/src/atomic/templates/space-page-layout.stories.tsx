import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '03-Spaces/SpacePageLayout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**SKELETON TEMPLATE** - Complete space page layout. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SpacePageLayoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Space Header */}
      <div className="bg-[var(--hive-surface-primary)] border-b border-[var(--hive-border-default)]">
        <div className="h-48 bg-gradient-to-r from-blue-900 to-purple-900" />
        <div className="max-w-6xl mx-auto px-4 -mt-12">
          <div className="flex gap-4 items-end pb-4">
            <div className="w-24 h-24 bg-[var(--hive-surface-secondary)] rounded-lg border-4 border-[var(--hive-background-primary)]" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Space Name</h1>
              <p className="text-[var(--hive-text-secondary)]">234 members · 🌍 Public</p>
            </div>
            <button className="px-6 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--hive-border-default)] sticky top-0 bg-[var(--hive-background-primary)] z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-6">
          <button className="py-3 border-b-2 border-[var(--hive-brand-primary)] font-semibold">Posts</button>
          <button className="py-3 text-[var(--hive-text-secondary)]">Events</button>
          <button className="py-3 text-[var(--hive-text-secondary)]">Members</button>
          <button className="py-3 text-[var(--hive-text-secondary)]">About</button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1 max-w-2xl space-y-4">
          <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
            <p className="mb-2">Composer placeholder</p>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
              <p>Post {i} placeholder</p>
            </div>
          ))}
        </div>

        <div className="w-80 space-y-4">
          <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4 sticky top-20">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">Space description...</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs">
        ⚠️ SKELETON TEMPLATE
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <SpacePageLayoutSkeleton />,
};
