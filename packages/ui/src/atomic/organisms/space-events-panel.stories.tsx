import type { Meta, StoryObj } from '@storybook/react';
import { SpaceEventsPanel } from './space-events-panel';

const meta = {
  title: '03-Spaces/SpaceEventsPanel',
  component: SpaceEventsPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Events panel for space. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceEventsPanel>;

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
        <SpaceEventsPanel />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceEventsPanel isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceEventsPanel error="Error message" />
      </div>
    </div>
  ),
};
