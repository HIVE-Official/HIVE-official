import type { Meta, StoryObj } from '@storybook/react';
import { RitualParticipationUi } from './ritual-participation-ui';

const meta = {
  title: '06-Rituals/RitualParticipationUi',
  component: RitualParticipationUi,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Complete participation interface. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualParticipationUi>;

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
        <RitualParticipationUi />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualParticipationUi isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualParticipationUi error="Error message" />
      </div>
    </div>
  ),
};
