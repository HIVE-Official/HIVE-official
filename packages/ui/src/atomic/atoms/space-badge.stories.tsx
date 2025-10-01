import type { Meta, StoryObj } from '@storybook/react';
import { SpaceBadge } from './space-badge';

const meta = {
  title: '03-Spaces/SpaceBadge',
  component: SpaceBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Badge for space category, privacy, etc. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceBadge>;

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
        <SpaceBadge />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceBadge isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceBadge error="Error message" />
      </div>
    </div>
  ),
};
