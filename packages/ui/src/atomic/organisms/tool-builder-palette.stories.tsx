import type { Meta, StoryObj } from '@storybook/react';
import { ToolBuilderPalette } from './tool-builder-palette';

const meta = {
  title: '05-HiveLab/ToolBuilderPalette',
  component: ToolBuilderPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Element palette sidebar. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolBuilderPalette>;

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
        <ToolBuilderPalette />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ToolBuilderPalette isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ToolBuilderPalette error="Error message" />
      </div>
    </div>
  ),
};
