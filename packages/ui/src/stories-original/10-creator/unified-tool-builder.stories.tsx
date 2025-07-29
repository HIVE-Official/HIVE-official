import type { Meta, StoryObj } from '@storybook/react';
import { ToolBuilder } from '../../components/creator/ToolBuilder';

const meta: Meta<typeof ToolBuilder> = {
  title: '10-creator/ToolBuilder',
  component: ToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Unified tool builder with visual, template, and wizard modes for creating HIVE tools.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['visual', 'template', 'wizard'],
      description: 'Builder mode - visual for drag-and-drop, template for pre-built options, wizard for guided creation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolBuilder>;

// Mock data
const mockTool = {
  id: 'demo-tool',
  name: 'Demo GPA Calculator',
  description: 'A sample tool for calculating student GPA',
  category: 'calculator',
  elements: [],
  config: {},
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  version: '1.0.0',
  userId: 'demo-user'
};

const mockElements = []; // Would be populated from element registry

const mockHandlers = {
  onSave: async (tool: any) => {
    console.log('Saving tool:', tool);
  },
  onPreview: (tool: any) => {
    console.log('Previewing tool:', tool);
  },
  onPublish: async (tool: any) => {
    console.log('Publishing tool:', tool);
  },
  onShare: (tool: any) => {
    console.log('Sharing tool:', tool);
  },
  onModeChange: (mode: "visual" | "template" | "wizard") => {
    console.log('Mode changed to:', mode);
  },
};

export const VisualMode: Story = {
  args: {
    tool: mockTool,
    elements: mockElements,
    mode: 'visual',
    ...mockHandlers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual mode provides a drag-and-drop interface for building tools with elements from the library.',
      },
    },
  },
};

export const TemplateMode: Story = {
  args: {
    tool: mockTool,
    elements: mockElements,
    mode: 'template',
    ...mockHandlers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template mode offers pre-built tool templates that users can customize and deploy quickly.',
      },
    },
  },
};

export const WizardMode: Story = {
  args: {
    tool: mockTool,
    elements: mockElements,
    mode: 'wizard',
    ...mockHandlers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Wizard mode provides a step-by-step guided experience for creating tools with minimal technical knowledge.',
      },
    },
  },
};