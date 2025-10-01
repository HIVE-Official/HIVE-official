import type { Meta, StoryObj } from '@storybook/react';
import { ToolRuntimeExecutor } from './tool-runtime-executor';

const meta = {
  title: '05-HiveLab/ToolRuntimeExecutor',
  component: ToolRuntimeExecutor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Tool runtime execution interface. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolRuntimeExecutor>;

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
        <ToolRuntimeExecutor />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ToolRuntimeExecutor isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ToolRuntimeExecutor error="Error message" />
      </div>
    </div>
  ),
};
