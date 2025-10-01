import type { Meta, StoryObj } from '@storybook/react';
import { ToolBuilderCanvas } from './tool-builder-canvas';

const meta = {
  title: '05-HiveLab/ToolBuilderCanvas',
  component: ToolBuilderCanvas,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Drag-drop canvas for tool builder. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolBuilderCanvas>;

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
        <ToolBuilderCanvas />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ToolBuilderCanvas isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ToolBuilderCanvas error="Error message" />
      </div>
    </div>
  ),
};
