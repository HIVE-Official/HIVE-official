import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCreationModal } from './space-creation-modal';

const meta = {
  title: '03-Spaces/SpaceCreationModal',
  component: SpaceCreationModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Multi-step modal for creating a space. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceCreationModal>;

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
        <SpaceCreationModal />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceCreationModal isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceCreationModal error="Error message" />
      </div>
    </div>
  ),
};
