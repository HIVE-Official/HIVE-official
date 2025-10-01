import type { Meta, StoryObj } from '@storybook/react';
import { RitualRewardDisplay } from './ritual-reward-display';

const meta = {
  title: '06-Rituals/RitualRewardDisplay',
  component: RitualRewardDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Display ritual reward. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualRewardDisplay>;

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
        <RitualRewardDisplay />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualRewardDisplay isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualRewardDisplay error="Error message" />
      </div>
    </div>
  ),
};
