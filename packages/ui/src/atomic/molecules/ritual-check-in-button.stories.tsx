import type { Meta, StoryObj } from '@storybook/react';
import { RitualCheckInButton } from './ritual-check-in-button';

const meta = {
  title: '06-Rituals/RitualCheckInButton',
  component: RitualCheckInButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Check-in button with states. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualCheckInButton>;

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
        <RitualCheckInButton />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualCheckInButton isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualCheckInButton error="Error message" />
      </div>
    </div>
  ),
};
