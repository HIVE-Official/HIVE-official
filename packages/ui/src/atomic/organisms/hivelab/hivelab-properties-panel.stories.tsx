import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveLabPropertiesPanel } from './hivelab-properties-panel';
import type { Element } from '../../../types/hivelab.types';

/**
 * # HiveLab Properties Panel
 *
 * Floating panel for configuring selected element properties.
 * Shows element info, configuration fields, input/output ports,
 * and advanced settings.
 *
 * ## Features
 * - Element metadata display (name, type, description, complexity)
 * - Basic properties (name, description)
 * - Input/output connection mapping
 * - Element-specific configuration fields
 * - Advanced settings (ID, position, size)
 * - Action buttons (duplicate, delete)
 * - Collapsible panel
 * - Left or right positioning
 * - Empty state when no selection
 *
 * ## Usage
 * ```tsx
 * <HiveLabPropertiesPanel
 *   selectedElement={selectedElement}
 *   onPropertyChange={handlePropertyChange}
 *   onDeleteElement={handleDelete}
 *   onDuplicateElement={handleDuplicate}
 *   position="right"
 *   width={320}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Organisms/HiveLabPropertiesPanel',
  component: HiveLabPropertiesPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HiveLabPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample elements for different categories
const sampleElements: Record<string, Element> = {
  trigger: {
    id: 'trigger-1',
    type: 'trigger',
    name: 'Button Click',
    icon: '🖱️',
    description: 'Triggers when a button is clicked',
    x: 100,
    y: 100,
    width: 180,
    height: 120,
    inputs: [],
    outputs: [
      {
        id: 'trigger-1-out-1',
        name: 'Clicked',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Fires when button is clicked',
      },
    ],
    config: {
      buttonText: 'Click Me',
      variant: 'primary',
    },
    complexity: 'simple',
    isNew: true,
    pageId: 'page-1',
  },
  collector: {
    id: 'collector-1',
    type: 'collector',
    name: 'Text Input',
    icon: '📝',
    description: 'Collect text input from the user',
    x: 300,
    y: 100,
    width: 180,
    height: 140,
    inputs: [
      {
        id: 'collector-1-in-1',
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'Show input when triggered',
      },
    ],
    outputs: [
      {
        id: 'collector-1-out-1',
        name: 'Value',
        type: 'text',
        side: 'output',
        required: false,
        description: 'The entered text value',
      },
      {
        id: 'collector-1-out-2',
        name: 'Valid',
        type: 'boolean',
        side: 'output',
        required: false,
        description: 'Whether input is valid',
      },
    ],
    config: {
      placeholder: 'Enter your text...',
      required: true,
      maxLength: 200,
      validation: 'none',
    },
    complexity: 'simple',
    pageId: 'page-1',
  },
  transformer: {
    id: 'transformer-1',
    type: 'transformer',
    name: 'Validate Email',
    icon: '✓',
    description: 'Validate email address format',
    x: 500,
    y: 100,
    width: 180,
    height: 160,
    inputs: [
      {
        id: 'transformer-1-in-1',
        name: 'Email',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Email to validate',
      },
    ],
    outputs: [
      {
        id: 'transformer-1-out-1',
        name: 'Valid',
        type: 'boolean',
        side: 'output',
        required: false,
        description: 'Is email valid?',
      },
      {
        id: 'transformer-1-out-2',
        name: 'Error',
        type: 'text',
        side: 'output',
        required: false,
        description: 'Error message if invalid',
      },
    ],
    config: {
      allowSubdomains: true,
      requireDomain: false,
    },
    complexity: 'medium',
    isNew: true,
    pageId: 'page-1',
  },
  router: {
    id: 'router-1',
    type: 'router',
    name: 'If / Else',
    icon: '🔀',
    description: 'Route flow based on condition',
    x: 700,
    y: 100,
    width: 200,
    height: 160,
    inputs: [
      {
        id: 'router-1-in-1',
        name: 'Condition',
        type: 'boolean',
        side: 'input',
        required: true,
        description: 'Condition to evaluate',
      },
    ],
    outputs: [
      {
        id: 'router-1-out-1',
        name: 'True',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Execute if true',
      },
      {
        id: 'router-1-out-2',
        name: 'False',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Execute if false',
      },
    ],
    config: {},
    complexity: 'medium',
    pageId: 'page-1',
  },
  action: {
    id: 'action-1',
    type: 'action',
    name: 'Send Notification',
    icon: '🔔',
    description: 'Send push notification to user',
    x: 900,
    y: 100,
    width: 180,
    height: 140,
    inputs: [
      {
        id: 'action-1-in-1',
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to send',
      },
      {
        id: 'action-1-in-2',
        name: 'Message',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Notification text',
      },
      {
        id: 'action-1-in-3',
        name: 'User',
        type: 'user',
        side: 'input',
        required: true,
        description: 'Who to notify',
      },
    ],
    outputs: [
      {
        id: 'action-1-out-1',
        name: 'Sent',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Notification sent successfully',
      },
    ],
    config: {
      title: 'New Notification',
      priority: 'normal',
      sound: true,
    },
    complexity: 'medium',
    isNew: true,
    pageId: 'page-1',
  },
};

/**
 * No element selected (empty state)
 */
export const EmptyState: Story = {
  args: {
    selectedElement: null,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Canvas Area</p>
      </div>
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Trigger element selected
 */
export const TriggerElement: Story = {
  args: {
    selectedElement: sampleElements.trigger,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Collector element with inputs/outputs
 */
export const CollectorElement: Story = {
  args: {
    selectedElement: sampleElements.collector,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Transformer element
 */
export const TransformerElement: Story = {
  args: {
    selectedElement: sampleElements.transformer,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Router element
 */
export const RouterElement: Story = {
  args: {
    selectedElement: sampleElements.router,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Action element with many inputs
 */
export const ActionElement: Story = {
  args: {
    selectedElement: sampleElements.action,
    position: 'right',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Left-side position
 */
export const LeftPosition: Story = {
  args: {
    selectedElement: sampleElements.collector,
    position: 'left',
    width: 320,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabPropertiesPanel {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * Collapsed panel
 */
export const Collapsed: Story = {
  args: {
    selectedElement: sampleElements.trigger,
    position: 'right',
    width: 320,
    isCollapsed: true,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Wide panel (more space)
 */
export const WidePanel: Story = {
  args: {
    selectedElement: sampleElements.action,
    position: 'right',
    width: 400,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1" />
      <HiveLabPropertiesPanel {...args} />
    </div>
  ),
};

/**
 * Interactive with state management
 */
export const Interactive: Story = {
  render: () => {
    const [selectedElement, setSelectedElement] = useState<Element | null>(
      sampleElements.collector
    );
    const [elementConfig, setElementConfig] = useState(sampleElements.collector.config);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handlePropertyChange = (property: string, value: any) => {
      if (!selectedElement) return;

      if (property === 'config') {
        setElementConfig(value);
      }

      console.log(`Property changed: ${property} =`, value);
    };

    const handleDelete = () => {
      console.log('Delete element:', selectedElement?.id);
      setSelectedElement(null);
    };

    const handleDuplicate = () => {
      console.log('Duplicate element:', selectedElement?.id);
    };

    return (
      <div className="h-screen w-full bg-background flex flex-col">
        {/* Element Selector */}
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold mr-2">Select Element:</span>
            {Object.entries(sampleElements).map(([key, element]) => (
              <button
                key={key}
                onClick={() => setSelectedElement(element)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  selectedElement?.id === element.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                {element.icon} {key}
              </button>
            ))}
            <button
              onClick={() => setSelectedElement(null)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                !selectedElement
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              None
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center p-8">
            {selectedElement ? (
              <div className="bg-muted rounded-lg p-6 max-w-md">
                <h3 className="text-sm font-semibold mb-4">Current Selection</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Element:</span>
                    <span className="font-medium">
                      {selectedElement.icon} {selectedElement.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{selectedElement.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inputs:</span>
                    <span className="font-medium">{selectedElement.inputs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outputs:</span>
                    <span className="font-medium">{selectedElement.outputs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collapsed:</span>
                    <span className="font-medium">{isCollapsed ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                {Object.keys(elementConfig).length > 0 && (
                  <>
                    <h4 className="text-sm font-semibold mt-4 mb-2">Configuration</h4>
                    <div className="space-y-1 text-xs">
                      {Object.entries(elementConfig).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No element selected</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Select an element type above
                </p>
              </div>
            )}
          </div>

          <HiveLabPropertiesPanel
            selectedElement={
              selectedElement ? { ...selectedElement, config: elementConfig } : null
            }
            onPropertyChange={handlePropertyChange}
            onDeleteElement={handleDelete}
            onDuplicateElement={handleDuplicate}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            position="right"
            width={320}
          />
        </div>
      </div>
    );
  },
};

/**
 * All element types showcase
 */
export const AllElementTypes: Story = {
  render: () => (
    <div className="h-screen w-full bg-background overflow-y-auto">
      <div className="p-8 space-y-8">
        <h2 className="text-lg font-semibold">Properties Panel - All Element Types</h2>

        {Object.entries(sampleElements).map(([key, element]) => (
          <div key={key} className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 capitalize">{key} Element</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <HiveLabPropertiesPanel
                  selectedElement={element}
                  position="right"
                  width={320}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
