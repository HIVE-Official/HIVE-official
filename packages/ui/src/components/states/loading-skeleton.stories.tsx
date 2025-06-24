import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSkeleton } from './loading-skeleton';

const meta: Meta<typeof LoadingSkeleton> = {
  title: 'Global/States/LoadingSkeleton',
  component: LoadingSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <LoadingSkeleton />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="w-[450px] space-y-4">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  ),
}; 