import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCard } from './space-card';

const meta = {
  title: '03-Spaces/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Space card for browse/discovery views. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceCard>;

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
        <SpaceCard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceCard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceCard error="Error message" />
      </div>
    </div>
  ),
};
