import type { Meta, StoryObj } from '@storybook/react';
import { SpaceEventCard } from './space-event-card';

const meta = {
  title: '03-Spaces/SpaceEventCard',
  component: SpaceEventCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Event card in space events. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceEventCard>;

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
        <SpaceEventCard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceEventCard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceEventCard error="Error message" />
      </div>
    </div>
  ),
};
