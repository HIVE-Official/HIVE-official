import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConnectionLayer } from './connection-layer';
import { ElementCard } from './element-card';
import type { Element, Connection } from '@/types/hivelab.types';

/**
 * # Connection Layer
 *
 * SVG layer that renders all connections (wires) between elements on a page.
 * Handles connection selection, hover states, and draft connections during creation.
 *
 * ## Features
 * - Renders all connections as Bézier curves
 * - Auto-calculates paths between ports
 * - Selection and hover states
 * - Draft connection preview (while dragging)
 * - Click to select connections
 * - Color-coded by data type
 * - Optional animated data flow
 *
 * ## Usage
 * ```tsx
 * <ConnectionLayer
 *   elements={elements}
 *   connections={connections}
 *   selectedConnectionId={selectedId}
 *   onConnectionClick={handleClick}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/ConnectionLayer',
  component: ConnectionLayer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectionLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample elements
const elements: Element[] = [
  {
    id: 'el-1',
    type: 'trigger',
    name: 'Start',
    icon: '▶️',
    description: '',
    x: 100,
    y: 200,
    width: 180,
    height: 120,
    inputs: [],
    outputs: [{
      id: 'el-1-out',
      name: 'Trigger',
      type: 'event',
      side: 'output',
      required: false,
      description: '',
    }],
    config: {},
    pageId: 'page-1',
  },
  {
    id: 'el-2',
    type: 'collector',
    name: 'Input',
    icon: '📝',
    description: '',
    x: 400,
    y: 150,
    width: 180,
    height: 140,
    inputs: [{
      id: 'el-2-in',
      name: 'Trigger',
      type: 'event',
      side: 'input',
      required: false,
      description: '',
    }],
    outputs: [{
      id: 'el-2-out',
      name: 'Value',
      type: 'text',
      side: 'output',
      required: false,
      description: '',
    }],
    config: {},
    pageId: 'page-1',
  },
  {
    id: 'el-3',
    type: 'action',
    name: 'Send',
    icon: '📧',
    description: '',
    x: 700,
    y: 200,
    width: 180,
    height: 120,
    inputs: [{
      id: 'el-3-in',
      name: 'Data',
      type: 'text',
      side: 'input',
      required: true,
      description: '',
    }],
    outputs: [],
    config: {},
    pageId: 'page-1',
  },
];

// Sample connections
const connections: Connection[] = [
  {
    id: 'conn-1',
    sourceElementId: 'el-1',
    sourcePortId: 'el-1-out',
    targetElementId: 'el-2',
    targetPortId: 'el-2-in',
    pageId: 'page-1',
  },
  {
    id: 'conn-2',
    sourceElementId: 'el-2',
    sourcePortId: 'el-2-out',
    targetElementId: 'el-3',
    targetPortId: 'el-3-in',
    pageId: 'page-1',
  },
];

/**
 * Default connection layer with 2 connections
 */
export const Default: Story = {
  args: {
    elements,
    connections,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Single connection
 */
export const SingleConnection: Story = {
  args: {
    elements: elements.slice(0, 2),
    connections: connections.slice(0, 1),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Selected connection
 */
export const SelectedConnection: Story = {
  args: {
    elements,
    connections,
    selectedConnectionId: 'conn-1',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Hovered connection
 */
export const HoveredConnection: Story = {
  args: {
    elements,
    connections,
    hoveredConnectionId: 'conn-2',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Animated data flow
 */
export const AnimatedFlow: Story = {
  args: {
    elements,
    connections,
    animated: true,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Draft connection (being created)
 */
export const DraftConnection: Story = {
  args: {
    elements,
    connections,
    draftConnection: {
      sourceElementId: 'el-1',
      sourcePortId: 'el-1-out',
      mousePosition: { x: 350, y: 250 },
    },
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * Interactive hover and selection
 */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    return (
      <div className="h-screen w-full relative bg-background border">
        <ConnectionLayer
          elements={elements}
          connections={connections}
          selectedConnectionId={selected}
          hoveredConnectionId={hovered}
          onConnectionClick={(id) => setSelected(id === selected ? null : id)}
          onConnectionHover={setHovered}
        />
        {elements.map(el => (
          <ElementCard key={el.id} element={el} />
        ))}
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold mb-2">Interactive Connections</p>
          <p className="text-xs text-muted-foreground">Hover and click wires</p>
          <p className="text-xs mt-2">Selected: {selected || 'None'}</p>
        </div>
      </div>
    );
  },
};

/**
 * Complex flow (multiple connections)
 */
export const ComplexFlow: Story = {
  render: () => {
    const complexElements: Element[] = [
      ...elements,
      {
        id: 'el-4',
        type: 'transformer',
        name: 'Validate',
        icon: '✓',
        description: '',
        x: 400,
        y: 350,
        width: 180,
        height: 140,
        inputs: [{
          id: 'el-4-in',
          name: 'Input',
          type: 'text',
          side: 'input',
          required: true,
          description: '',
        }],
        outputs: [{
          id: 'el-4-out',
          name: 'Valid',
          type: 'boolean',
          side: 'output',
          required: false,
          description: '',
        }],
        config: {},
        pageId: 'page-1',
      },
    ];

    const complexConnections: Connection[] = [
      ...connections,
      {
        id: 'conn-3',
        sourceElementId: 'el-2',
        sourcePortId: 'el-2-out',
        targetElementId: 'el-4',
        targetPortId: 'el-4-in',
        pageId: 'page-1',
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border">
        <ConnectionLayer
          elements={complexElements}
          connections={complexConnections}
        />
        {complexElements.map(el => (
          <ElementCard key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * Empty (no connections)
 */
export const EmptyState: Story = {
  args: {
    elements,
    connections: [],
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <ConnectionLayer {...args} />
      {args.elements.map(el => (
        <ElementCard key={el.id} element={el} />
      ))}
    </div>
  ),
};

/**
 * With grid background
 */
export const WithGrid: Story = {
  render: () => {
    const GridBackground = () => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="hsl(var(--muted-foreground) / 0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );

    return (
      <div className="h-screen w-full relative bg-background border">
        <GridBackground />
        <ConnectionLayer
          elements={elements}
          connections={connections}
          animated
        />
        {elements.map(el => (
          <ElementCard key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * Different connection patterns
 */
export const ConnectionPatterns: Story = {
  render: () => {
    const patternElements: Element[] = [
      // Top row
      { ...elements[0], x: 100, y: 100 },
      { ...elements[1], x: 500, y: 100 },

      // Middle row
      { ...elements[0], x: 100, y: 300, id: 'el-m1' },
      { ...elements[1], x: 500, y: 400, id: 'el-m2' },

      // Bottom row
      { ...elements[0], x: 100, y: 550, id: 'el-b1' },
      { ...elements[1], x: 500, y: 450, id: 'el-b2' },
    ];

    const patternConnections: Connection[] = [
      // Horizontal
      {
        id: 'c1',
        sourceElementId: patternElements[0].id,
        sourcePortId: 'el-1-out',
        targetElementId: patternElements[1].id,
        targetPortId: 'el-2-in',
        pageId: 'page-1',
      },
      // Down slope
      {
        id: 'c2',
        sourceElementId: 'el-m1',
        sourcePortId: 'el-1-out',
        targetElementId: 'el-m2',
        targetPortId: 'el-2-in',
        pageId: 'page-1',
      },
      // Up slope
      {
        id: 'c3',
        sourceElementId: 'el-b1',
        sourcePortId: 'el-1-out',
        targetElementId: 'el-b2',
        targetPortId: 'el-2-in',
        pageId: 'page-1',
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border">
        <ConnectionLayer
          elements={patternElements}
          connections={patternConnections}
        />
        {patternElements.map(el => (
          <ElementCard key={el.id} element={el} />
        ))}
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
          <p className="text-sm font-semibold">Connection Patterns</p>
          <p className="text-xs text-muted-foreground">Horizontal, down slope, up slope</p>
        </div>
      </div>
    );
  },
};
