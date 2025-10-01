import type { Meta, StoryObj } from '@storybook/react';
import { SpaceSettingsModal } from './space-settings-modal';

const meta = {
  title: '03-Spaces/SpaceSettingsModal',
  component: SpaceSettingsModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Space settings modal with tabs. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceSettingsModal>;

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
        <SpaceSettingsModal />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceSettingsModal isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceSettingsModal error="Error message" />
      </div>
    </div>
  ),
};
