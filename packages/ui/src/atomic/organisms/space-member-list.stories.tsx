import type { Meta, StoryObj } from '@storybook/react';
import { SpaceMemberList } from './space-member-list';

const meta = {
  title: '03-Spaces/SpaceMemberList',
  component: SpaceMemberList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - List of space members with filters. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceMemberList>;

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
        <SpaceMemberList />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceMemberList isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceMemberList error="Error message" />
      </div>
    </div>
  ),
};
