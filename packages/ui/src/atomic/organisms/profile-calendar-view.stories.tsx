import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCalendarView } from './profile-calendar-view';

const meta = {
  title: '02-Profile/ProfileCalendarView',
  component: ProfileCalendarView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Calendar with events and check-ins. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCalendarView>;

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
        <ProfileCalendarView />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileCalendarView isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileCalendarView error="Error message" />
      </div>
    </div>
  ),
};
