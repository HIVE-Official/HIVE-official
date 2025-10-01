import type { Meta, StoryObj } from '@storybook/react';
import { ProfileToolsWidget } from './profile-tools-widget';

const meta = {
  title: '02-Profile/ProfileToolsWidget',
  component: ProfileToolsWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - User tools widget. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileToolsWidget>;

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
        <ProfileToolsWidget />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileToolsWidget isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileToolsWidget error="Error message" />
      </div>
    </div>
  ),
};
