import type { Meta, StoryObj } from '@storybook/react';
import { SpaceDiscoveryHub } from './space-discovery-hub';

const meta = {
  title: '03-Spaces/SpaceDiscoveryHub',
  component: SpaceDiscoveryHub,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Space discovery with featured, trending, recommendations. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceDiscoveryHub>;

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
        <SpaceDiscoveryHub />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceDiscoveryHub isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceDiscoveryHub error="Error message" />
      </div>
    </div>
  ),
};
