import type { Meta, StoryObj } from '@storybook/react';
import { ToolBuilderProperties } from './tool-builder-properties';

const meta = {
  title: '05-HiveLab/ToolBuilderProperties',
  component: ToolBuilderProperties,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Properties panel for selected element. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolBuilderProperties>;

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
        <ToolBuilderProperties />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ToolBuilderProperties isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ToolBuilderProperties error="Error message" />
      </div>
    </div>
  ),
};
