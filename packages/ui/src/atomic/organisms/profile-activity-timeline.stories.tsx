import type { Meta, StoryObj } from '@storybook/react';
import { ProfileActivityTimeline } from './profile-activity-timeline';

const meta = {
  title: '02-Profile/ProfileActivityTimeline',
  component: ProfileActivityTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Activity timeline. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileActivityTimeline>;

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
        <ProfileActivityTimeline />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileActivityTimeline isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileActivityTimeline error="Error message" />
      </div>
    </div>
  ),
};
