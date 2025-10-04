import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElementCard } from './element-card';
import type { Element } from '@/types/hivelab.types';

/**
 * # Element Card
 *
 * Visual representation of an element on the canvas with input/output ports.
 * Supports drag, selection, hover states, and port interactions.
 *
 * ## Features
 * - Draggable with grip handle
 * - Color-coded by category (8 categories)
 * - Input ports on left, output ports on right
 * - Shows element icon and name
 * - Configuration count indicator
 * - Selection state with corner dots
 * - Hover glow effect
 * - Port labels (hidden at low zoom)
 * - "New" badge for new elements
 * - Double-click to edit
 *
 * ## Usage
 * ```tsx
 * <ElementCard
 *   element={element}
 *   isSelected={true}
 *   onDragStart={handleDragStart}
 *   onPortMouseDown={handlePortClick}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/ElementCard',
  component: ElementCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample elements
const triggerElement: Element = {
  id: 'trigger-1',
  type: 'trigger',
  name: 'Button Click',
  icon: '▶️',
  description: 'Triggers when button is clicked',
  x: 0,
  y: 0,
  width: 180,
  height: 120,
  inputs: [],
  outputs: [
    {
      id: 'out-1',
      name: 'Clicked',
      type: 'event',
      side: 'output',
      required: false,
      description: 'Fires when clicked',
    },
  ],
  config: { label: 'Click Me' },
  pageId: 'page-1',
};

const collectorElement: Element = {
  id: 'collector-1',
  type: 'collector',
  name: 'Text Input',
  icon: '📝',
  description: 'Collect text from user',
  x: 0,
  y: 0,
  width: 180,
  height: 140,
  inputs: [
    {
      id: 'in-1',
      name: 'Trigger',
      type: 'event',
      side: 'input',
      required: false,
      description: 'When to show',
    },
  ],
  outputs: [
    {
      id: 'out-1',
      name: 'Value',
      type: 'text',
      side: 'output',
      required: false,
      description: 'User input',
    },
  ],
  config: { label: 'Name', placeholder: 'Enter your name', required: true },
  pageId: 'page-1',
};

const transformerElement: Element = {
  id: 'transformer-1',
  type: 'transformer',
  name: 'Validate',
  icon: '✓',
  description: 'Validate input data',
  x: 0,
  y: 0,
  width: 180,
  height: 160,
  inputs: [
    {
      id: 'in-1',
      name: 'Input',
      type: ['text', 'number'],
      side: 'input',
      required: true,
      description: 'Data to validate',
    },
  ],
  outputs: [
    {
      id: 'out-1',
      name: 'Valid',
      type: 'boolean',
      side: 'output',
      required: false,
      description: 'Is valid',
    },
    {
      id: 'out-2',
      name: 'Error',
      type: 'text',
      side: 'output',
      required: false,
      description: 'Error message',
    },
  ],
  config: { rules: ['required', 'minLength: 3'] },
  pageId: 'page-1',
};

/**
 * Default trigger element
 */
export const Default: Story = {
  args: {
    element: triggerElement,
  },
};

/**
 * Collector element (with inputs and outputs)
 */
export const CollectorElement: Story = {
  args: {
    element: collectorElement,
  },
};

/**
 * Transformer element (multiple outputs)
 */
export const TransformerElement: Story = {
  args: {
    element: transformerElement,
  },
};

/**
 * Selected element (with corner dots and ring)
 */
export const Selected: Story = {
  args: {
    element: collectorElement,
    isSelected: true,
  },
};

/**
 * Hovered element (with glow)
 */
export const Hovered: Story = {
  args: {
    element: collectorElement,
    isHovered: true,
  },
};

/**
 * Being dragged (semi-transparent)
 */
export const Dragging: Story = {
  args: {
    element: collectorElement,
    isDragging: true,
  },
};

/**
 * New element (with "New" badge)
 */
export const NewElement: Story = {
  args: {
    element: { ...collectorElement, isNew: true },
  },
};

/**
 * At different zoom levels
 */
export const ZoomLevels: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 0.5x (no labels)</p>
        <ElementCard element={collectorElement} zoom={0.5} />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 1x (with labels)</p>
        <ElementCard element={collectorElement} zoom={1} />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 1.5x (with description)</p>
        <ElementCard element={collectorElement} zoom={1.5} />
      </div>
    </div>
  ),
};

/**
 * All 8 element categories
 */
export const AllCategories: Story = {
  render: () => {
    const categories: Array<{ type: Element['type']; name: string; icon: string }> = [
      { type: 'trigger', name: 'Button Click', icon: '▶️' },
      { type: 'collector', name: 'Text Input', icon: '📝' },
      { type: 'transformer', name: 'Validate', icon: '✓' },
      { type: 'router', name: 'If/Else', icon: '⚡' },
      { type: 'storage', name: 'Variable', icon: '💾' },
      { type: 'display', name: 'Chart', icon: '📊' },
      { type: 'action', name: 'Send Email', icon: '📧' },
      { type: 'connector', name: 'Merge', icon: '🔗' },
    ];

    return (
      <div className="grid grid-cols-2 gap-8 p-8">
        {categories.map((cat, i) => (
          <ElementCard
            key={cat.type}
            element={{
              id: `el-${i}`,
              type: cat.type,
              name: cat.name,
              icon: cat.icon,
              description: `${cat.name} element`,
              x: 0,
              y: 0,
              width: 180,
              height: 120,
              inputs: cat.type !== 'trigger' ? [{
                id: 'in',
                name: 'Input',
                type: 'any',
                side: 'input',
                required: false,
                description: '',
              }] : [],
              outputs: [{
                id: 'out',
                name: 'Output',
                type: 'any',
                side: 'output',
                required: false,
                description: '',
              }],
              config: {},
              pageId: 'page-1',
            }}
          />
        ))}
      </div>
    );
  },
};

/**
 * Interactive selection and hover
 */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hoveredPort, setHoveredPort] = useState<string | null>(null);

    return (
      <div className="p-8">
        <div className="mb-4 space-y-2">
          <p className="text-sm">Click to select, hover to see glow</p>
          <p className="text-xs text-muted-foreground">
            Selected: {selected ? 'Yes' : 'No'}
          </p>
          <p className="text-xs text-muted-foreground">
            Hovered Port: {hoveredPort || 'None'}
          </p>
        </div>
        <ElementCard
          element={collectorElement}
          isSelected={selected}
          isHovered={hovered}
          hoveredPort={hoveredPort}
          onClick={() => setSelected(!selected)}
          onPortHover={setHoveredPort}
          zoom={1}
        />
      </div>
    );
  },
};

/**
 * With configuration
 */
export const WithConfiguration: Story = {
  args: {
    element: {
      ...collectorElement,
      config: {
        label: 'Email Address',
        placeholder: 'you@example.com',
        required: true,
        validation: 'email',
        maxLength: 100,
      },
    },
  },
};

/**
 * Complex element (many ports)
 */
export const ComplexElement: Story = {
  args: {
    element: {
      id: 'complex-1',
      type: 'transformer',
      name: 'Data Processor',
      icon: '⚙️',
      description: 'Process and transform data',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      inputs: [
        { id: 'in-1', name: 'Data', type: 'object', side: 'input', required: true, description: '' },
        { id: 'in-2', name: 'Config', type: 'object', side: 'input', required: false, description: '' },
        { id: 'in-3', name: 'Trigger', type: 'event', side: 'input', required: false, description: '' },
      ],
      outputs: [
        { id: 'out-1', name: 'Result', type: 'object', side: 'output', required: false, description: '' },
        { id: 'out-2', name: 'Error', type: 'text', side: 'output', required: false, description: '' },
        { id: 'out-3', name: 'Count', type: 'number', side: 'output', required: false, description: '' },
      ],
      config: { mode: 'transform', cache: true },
      pageId: 'page-1',
    },
  },
};

/**
 * Connection states
 */
export const ConnectionStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div>
        <p className="text-sm font-semibold mb-2">Normal</p>
        <ElementCard element={collectorElement} />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Connecting (compatible ports glow)</p>
        <ElementCard
          element={collectorElement}
          connectionState={{
            isConnecting: true,
            compatiblePorts: ['in-1'],
          }}
        />
      </div>
    </div>
  ),
};

/**
 * Minimal element (no inputs, one output)
 */
export const MinimalElement: Story = {
  args: {
    element: {
      id: 'minimal-1',
      type: 'trigger',
      name: 'Start',
      icon: '🚀',
      description: 'Start the flow',
      x: 0,
      y: 0,
      width: 160,
      height: 100,
      inputs: [],
      outputs: [{
        id: 'out',
        name: 'Start',
        type: 'event',
        side: 'output',
        required: false,
        description: '',
      }],
      config: {},
      pageId: 'page-1',
    },
  },
};

/**
 * Element sizes
 */
export const ElementSizes: Story = {
  render: () => (
    <div className="flex items-start gap-8 p-8">
      <ElementCard
        element={{ ...triggerElement, width: 140, height: 80 }}
      />
      <ElementCard
        element={{ ...collectorElement, width: 180, height: 120 }}
      />
      <ElementCard
        element={{ ...transformerElement, width: 220, height: 160 }}
      />
    </div>
  ),
};
