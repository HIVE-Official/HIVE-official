import type { Meta, StoryObj } from '@storybook/react';
import { SpaceMembersPanel } from './space-members-panel';

const meta = {
  title: '03-Spaces/SpaceMembersPanel',
  component: SpaceMembersPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Members panel for space. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceMembersPanel>;

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
        <SpaceMembersPanel />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceMembersPanel isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceMembersPanel error="Error message" />
      </div>
    </div>
  ),
};
