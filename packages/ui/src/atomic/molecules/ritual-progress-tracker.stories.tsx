import type { Meta, StoryObj } from '@storybook/react';
import { RitualProgressTracker } from './ritual-progress-tracker';

const meta = {
  title: '06-Rituals/RitualProgressTracker',
  component: RitualProgressTracker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Visual progress tracker for ritual. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualProgressTracker>;

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
        <RitualProgressTracker />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualProgressTracker isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualProgressTracker error="Error message" />
      </div>
    </div>
  ),
};
