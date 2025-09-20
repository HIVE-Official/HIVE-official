import type { Meta, StoryObj } from '@storybook/react';
import { PlantedToolWidget, PlantedTool } from './planted-tool-widget';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof PlantedToolWidget> = {
  title: 'HIVE/Tools/Molecules/PlantedToolWidget',
  component: PlantedToolWidget,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Displays planted tools in the Space Tool Grid with status indicators, configuration options, and usage statistics. Shows different states based on tool configuration and health.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    showStats: { control: { type: 'boolean' } },
    showActions: { control: { type: 'boolean' } },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlantedToolWidget>;

const baseTool: Omit<PlantedTool, 'status'> = {
  id: 'event-management',
  name: 'Event Management',
  description: 'Create, manage, and track events with RSVP functionality and calendar integration',
  icon: '📅',
  category: 'coordination',
  version: '2.1.0',
  isConfigured: true,
  canConfigure: true,
  canRemove: true,
  canView: true,
  hasRequiredSettings: true,
  lastUsed: '2024-01-20T14:30:00Z',
  usageCount: 15,
  outputs: 3,
  interactions: 47,
};

export const Active: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'active',
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs'),
  },
};

export const NeedsSetup: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'needs_setup',
      isConfigured: false,
      hasRequiredSettings: false,
      name: 'Assignment Tracker',
      description: 'Track assignments, due dates, and submission status',
      icon: '📝',
      category: 'academic',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined,
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been planted but needs initial configuration before it can be used.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'error',
      errorMessage: 'Failed to connect to calendar API. Check your integration settings.',
      name: 'Calendar Sync',
      description: 'Sync events with external calendar services',
      icon: '🔄',
      category: 'productivity',
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool in error state showing error message and fix action.',
      },
    },
  },
};

export const Configured: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'configured',
      name: 'Poll Creator',
      description: 'Create polls and surveys for community decision making',
      icon: '📊',
      category: 'social',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined,
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that is configured but not yet activated.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'disabled',
      name: 'Study Timer',
      description: 'Pomodoro-style timer for focused study sessions',
      icon: '⏰',
      category: 'productivity',
      usageCount: 28,
      outputs: 12,
      interactions: 95,
      lastUsed: '2024-01-18T10:15:00Z',
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been temporarily disabled but retains its configuration and history.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'active',
    },
    variant: 'compact',
    onConfigure: action('configure'),
    onViewDetails: action('view-details'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for dense layouts or mobile views.',
      },
    },
  },
};

export const HighUsage: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      name: 'Group Chat',
      description: 'Real-time messaging and coordination for space members',
      icon: '💬',
      category: 'social',
      usageCount: 247,
      outputs: 156,
      interactions: 1893,
      lastUsed: '2024-01-20T16:45:00Z',
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Highly used tool showing significant engagement statistics.',
      },
    },
  },
};

export const LimitedPermissions: Story = {
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      canConfigure: false,
      canRemove: false,
      canView: true,
    },
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool viewed by a regular member with limited permissions (no configure/remove actions).',
      },
    },
  },
};

export const AllCategories: Story = {
  render: () => {
    const tools: PlantedTool[] = [
      {
        ...baseTool,
        id: 'productivity-tool',
        name: 'Task Manager',
        icon: '✅',
        category: 'productivity',
        status: 'active',
      },
      {
        ...baseTool,
        id: 'social-tool',
        name: 'Icebreaker',
        icon: '🎉',
        category: 'social',
        status: 'configured',
      },
      {
        ...baseTool,
        id: 'academic-tool',
        name: 'Grade Tracker',
        icon: '📈',
        category: 'academic',
        status: 'needs_setup',
      },
      {
        ...baseTool,
        id: 'coordination-tool',
        name: 'Meeting Scheduler',
        icon: '🗓️',
        category: 'coordination',
        status: 'active',
      },
    ];

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <PlantedToolWidget
                key={tool.id}
                tool={tool}
                onConfigure={action('configure')}
                onRemove={action('remove')}
                onToggleStatus={action('toggle-status')}
                onViewDetails={action('view-details')}
                onViewOutputs={action('view-outputs')}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all tool categories with different statuses.',
      },
    },
  },
};

export const ToolGrid: Story = {
  render: () => {
    const tools: PlantedTool[] = [
      {
        ...baseTool,
        status: 'active',
      },
      {
        ...baseTool,
        id: 'assignment-tracker',
        name: 'Assignment Tracker',
        icon: '📝',
        category: 'academic',
        status: 'needs_setup',
        isConfigured: false,
        usageCount: 0,
        outputs: 0,
        interactions: 0,
        lastUsed: undefined,
      },
      {
        ...baseTool,
        id: 'poll-creator',
        name: 'Poll Creator',
        icon: '📊',
        category: 'social',
        status: 'configured',
        usageCount: 0,
        outputs: 0,
        interactions: 0,
        lastUsed: undefined,
      },
      {
        ...baseTool,
        id: 'laundry-tracker',
        name: 'Laundry Tracker',
        icon: '👕',
        category: 'coordination',
        status: 'active',
        usageCount: 67,
        outputs: 23,
        interactions: 156,
        lastUsed: '2024-01-20T12:30:00Z',
      },
    ];

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
              Space Tools
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Manage your planted tools and their configurations
            </p>
          </div>
          
          <div className="space-y-4">
            {tools.map((tool) => (
              <PlantedToolWidget
                key={tool.id}
                tool={tool}
                onConfigure={action('configure')}
                onRemove={action('remove')}
                onToggleStatus={action('toggle-status')}
                onViewDetails={action('view-details')}
                onViewOutputs={action('view-outputs')}
              />
            ))}
          </div>
          
          {/* Add New Tool Button */}
          <div className="mt-6 p-4 border-2 border-dashed border-[var(--hive-border-primary)]/30 rounded-2xl text-center hover:border-[var(--hive-brand-primary)]/50 hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-medium text-[var(--hive-text-primary)] mb-1">
              Plant New Tool
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Add functionality to your space
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete tool grid layout as it would appear in a space dashboard.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [tools, setTools] = React.useState<PlantedTool[]>([
      {
        ...baseTool,
        status: 'active',
      },
      {
        ...baseTool,
        id: 'poll-creator',
        name: 'Poll Creator',
        icon: '📊',
        category: 'social',
        status: 'configured',
        usageCount: 0,
        outputs: 0,
        interactions: 0,
        lastUsed: undefined,
      },
    ]);

    const handleToggleStatus = async (toolId: string, activate: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setTools(prevTools =>
        prevTools.map(tool => {
          if (tool.id === toolId) {
            return {
              ...tool,
              status: activate ? 'active' : 'disabled',
            };
          }
          return tool;
        })
      );
      
      action('toggle-status')(toolId, activate);
    };

    const handleRemoveTool = (toolId: string) => {
      setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
      action('remove')(toolId);
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Interactive Tool Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <PlantedToolWidget
                key={tool.id}
                tool={tool}
                onConfigure={action('configure')}
                onRemove={handleRemoveTool}
                onToggleStatus={handleToggleStatus}
                onViewDetails={action('view-details')}
                onViewOutputs={action('view-outputs')}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state updates for tool management actions.',
      },
    },
  },
};