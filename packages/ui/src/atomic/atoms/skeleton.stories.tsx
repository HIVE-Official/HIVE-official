import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#000000' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export const ProfileCardLoading: Story = {
  render: () => (
    <div className="w-[320px] rounded-lg border border-white/8 bg-[#0c0c0c] p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
      </div>
    </div>
  ),
};

export const SpaceCardLoading: Story = {
  render: () => (
    <div className="w-[280px] rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden">
      <Skeleton className="h-[160px] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-[80%]" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
    </div>
  ),
};

export const FeedPostLoading: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border border-white/8 bg-[#0c0c0c] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-2 w-[60px]" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[85%]" />
      </div>
      <Skeleton className="h-[200px] w-full rounded-md" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </div>
  ),
};

export const ListLoading: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 rounded-md border border-white/8 bg-[#0c0c0c]">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-[60%]" />
            <Skeleton className="h-2 w-[40%]" />
          </div>
          <Skeleton className="h-6 w-[60px] rounded-full" />
        </div>
      ))}
    </div>
  ),
};

export const TextLoading: Story = {
  render: () => (
    <div className="w-[600px] space-y-3">
      <Skeleton className="h-8 w-[300px]" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[98%]" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[92%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </div>
  ),
};