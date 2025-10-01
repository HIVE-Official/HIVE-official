import type { Meta, StoryObj } from '@storybook/react';
import { RitualCreationModal } from './ritual-creation-modal';

const meta = {
  title: '06-Rituals/RitualCreationModal',
  component: RitualCreationModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Create ritual modal. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualCreationModal>;

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
        <RitualCreationModal />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualCreationModal isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualCreationModal error="Error message" />
      </div>
    </div>
  ),
};
