import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Simple badge component for testing
const SimpleBadge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30 ${className}`}>
    {children}
  </div>
);

const meta: Meta<typeof SimpleBadge> = {
  title: 'Content/Badge Simple',
  component: SimpleBadge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SimpleBadge>;

export const Default: Story = {
  args: {
    children: 'Simple Badge',
  },
};

export const Verified: Story = {
  render: () => (
    <div className="flex gap-2 p-4 bg-black rounded-lg">
      <SimpleBadge>Verified</SimpleBadge>
      <SimpleBadge>Live</SimpleBadge>
      <SimpleBadge>Trending</SimpleBadge>
    </div>
  ),
}; 