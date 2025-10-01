import type { Meta, StoryObj } from '@storybook/react';
import { SpaceResourcesPanel } from './space-resources-panel';

const meta = {
  title: '03-Spaces/SpaceResourcesPanel',
  component: SpaceResourcesPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Resources/links panel for space. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceResourcesPanel>;

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
        <SpaceResourcesPanel />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceResourcesPanel isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceResourcesPanel error="Error message" />
      </div>
    </div>
  ),
};
