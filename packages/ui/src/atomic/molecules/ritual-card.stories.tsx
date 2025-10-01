import type { Meta, StoryObj } from '@storybook/react';
import { RitualCard } from './ritual-card';

const meta = {
  title: '06-Rituals/RitualCard',
  component: RitualCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Ritual card for browse view. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualCard>;

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
        <RitualCard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <RitualCard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <RitualCard error="Error message" />
      </div>
    </div>
  ),
};
