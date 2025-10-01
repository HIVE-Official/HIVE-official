import type { Meta, StoryObj } from '@storybook/react';
import { RitualStreakCounter } from './ritual-streak-counter';

const meta = {
  title: '06-Rituals/RitualStreakCounter',
  component: RitualStreakCounter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Streak counter with calendar. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualStreakCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load component',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Default</h3>
        <RitualStreakCounter />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualStreakCounter isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualStreakCounter error="Error message" />
      </div>
    </div>
  ),
};
