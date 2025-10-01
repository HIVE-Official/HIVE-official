import type { Meta, StoryObj } from '@storybook/react';
import { SpaceHeader } from './space-header';

const meta = {
  title: '03-Spaces/SpaceHeader',
  component: SpaceHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Space header with cover, name, join button, etc. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceHeader>;

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
        <SpaceHeader />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <SpaceHeader isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <SpaceHeader error="Error message" />
      </div>
    </div>
  ),
};
