import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveLabCanvas } from './hivelab-canvas';
import type { Page, Element, Connection, Viewport } from '../../../types/hivelab.types';

/**
 * # HiveLab Canvas
 *
 * Main infinite canvas for the HiveLab builder. Combines grid background,
 * pages, elements, connections, zoom controls, and mini-map into a complete
 * visual building environment.
 *
 * ## Features
 * - Infinite canvas with pan/zoom
 * - Grid background (dots or lines)
 * - Multiple pages with visual frames
 * - Elements with ports and connections
 * - Connection layer with Bézier curves
 * - Selection box for multi-select
 * - Zoom controls overlay
 * - Mini-map for navigation
 * - Element and connection click handlers
 * - Viewport transformation
 *
 * ## Usage
 * ```tsx
 * <HiveLabCanvas
 *   pages={pages}
 *   currentPageId={currentPage.id}
 *   elements={elements}
 *   connections={connections}
 *   viewport={viewport}
 *   selectedElementIds={selected}
 *   onElementClick={handleElementClick}
 *   onViewportChange={setViewport}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Organisms/HiveLabCanvas',
  component: HiveLabCanvas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HiveLabCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const samplePage: Page = {
  id: 'page-1',
  name: 'Main Flow',
  description: 'Primary user flow',
  x: 100,
  y: 100,
  width: 1200,
  height: 800,
  type: 'default',
  elements: [],
  connections: [],
};

const sampleElements: Element[] = [
  {
    id: 'el-1',
    type: 'trigger',
    name: 'Button Click',
    icon: '▶️',
    description: 'Triggers when button is clicked',
    x: 200,
    y: 200,
    width: 180,
    height: 120,
    inputs: [],
    outputs: [{
      id: 'el-1-out',
      name: 'Clicked',
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
    name: 'Text Input',
    icon: '📝',
    description: 'Collect text input',
    x: 500,
    y: 200,
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
    name: 'Send Email',
    icon: '📧',
    description: 'Send email notification',
    x: 800,
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

const sampleConnections: Connection[] = [
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

const defaultViewport: Viewport = {
  x: 0,
  y: 0,
  zoom: 1,
};

/**
 * Default canvas with simple flow
 */
export const Default: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: defaultViewport,
    showGrid: true,
    showMiniMap: true,
    showZoomControls: true,
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * With selected elements
 */
export const WithSelection: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: defaultViewport,
    selectedElementIds: ['el-1', 'el-2'],
    selectedConnectionId: 'conn-2',
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * Zoomed in
 */
export const ZoomedIn: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: { x: -200, y: -150, zoom: 1.5 },
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * Zoomed out
 */
export const ZoomedOut: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: { x: 100, y: 100, zoom: 0.5 },
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * Without grid
 */
export const NoGrid: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: defaultViewport,
    showGrid: false,
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * Without controls
 */
export const MinimalCanvas: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: sampleElements,
    connections: sampleConnections,
    viewport: defaultViewport,
    showGrid: true,
    showMiniMap: false,
    showZoomControls: false,
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};

/**
 * Multi-page tool
 */
export const MultiPage: Story = {
  render: () => {
    const pages: Page[] = [
      {
        ...samplePage,
        id: 'p1',
        name: 'Welcome',
        x: 100,
        y: 100,
      },
      {
        ...samplePage,
        id: 'p2',
        name: 'Form',
        type: 'default',
        x: 1400,
        y: 100,
      },
      {
        ...samplePage,
        id: 'p3',
        name: 'Success',
        type: 'modal',
        x: 1400,
        y: 1000,
        width: 600,
        height: 400,
      },
    ];

    const elements: Element[] = sampleElements.map((el) => ({
      ...el,
      pageId: 'p1',
    }));

    return (
      <div className="h-screen w-full">
        <HiveLabCanvas
          pages={pages}
          currentPageId="p1"
          elements={elements}
          connections={sampleConnections}
          viewport={defaultViewport}
        />
      </div>
    );
  },
};

/**
 * Interactive canvas
 */
export const Interactive: Story = {
  render: () => {
    const [viewport, setViewport] = useState<Viewport>(defaultViewport);
    const [selectedElements, setSelectedElements] = useState<string[]>([]);
    const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

    const handleZoomIn = () => {
      setViewport({ ...viewport, zoom: Math.min(viewport.zoom + 0.25, 4) });
    };

    const handleZoomOut = () => {
      setViewport({ ...viewport, zoom: Math.max(viewport.zoom - 0.25, 0.1) });
    };

    const handleZoomToFit = () => {
      setViewport({ x: 0, y: 0, zoom: 1 });
    };

    const handleElementClick = (elementId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.metaKey || e.ctrlKey) {
        // Multi-select
        setSelectedElements((prev) =>
          prev.includes(elementId)
            ? prev.filter((id) => id !== elementId)
            : [...prev, elementId]
        );
      } else {
        setSelectedElements([elementId]);
      }
      setSelectedConnection(null);
    };

    const handleConnectionClick = (connectionId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedConnection(connectionId);
      setSelectedElements([]);
    };

    const handleCanvasClick = () => {
      setSelectedElements([]);
      setSelectedConnection(null);
    };

    return (
      <div className="h-screen w-full flex flex-col">
        <div className="px-4 py-3 border-b bg-background">
          <div className="flex items-center gap-4 text-sm">
            <span>
              Selected elements: {selectedElements.length > 0 ? selectedElements.join(', ') : 'None'}
            </span>
            <span>
              Selected connection: {selectedConnection || 'None'}
            </span>
            <span>Zoom: {Math.round(viewport.zoom * 100)}%</span>
          </div>
        </div>

        <div className="flex-1">
          <HiveLabCanvas
            pages={[samplePage]}
            currentPageId="page-1"
            elements={sampleElements}
            connections={sampleConnections}
            viewport={viewport}
            selectedElementIds={selectedElements}
            selectedConnectionId={selectedConnection}
            onViewportChange={setViewport}
            onElementClick={handleElementClick}
            onConnectionClick={handleConnectionClick}
            onCanvasClick={handleCanvasClick}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomToFit={handleZoomToFit}
          />
        </div>
      </div>
    );
  },
};

/**
 * Complex flow
 */
export const ComplexFlow: Story = {
  render: () => {
    const complexElements: Element[] = [
      {
        ...sampleElements[0],
        x: 150,
        y: 300,
      },
      {
        ...sampleElements[1],
        x: 450,
        y: 250,
      },
      {
        ...sampleElements[2],
        x: 750,
        y: 300,
      },
      {
        id: 'el-4',
        type: 'transformer',
        name: 'Validate',
        icon: '✓',
        description: '',
        x: 450,
        y: 450,
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
      {
        id: 'el-5',
        type: 'router',
        name: 'If Valid',
        icon: '⚡',
        description: '',
        x: 750,
        y: 500,
        width: 180,
        height: 140,
        inputs: [{
          id: 'el-5-in',
          name: 'Condition',
          type: 'boolean',
          side: 'input',
          required: true,
          description: '',
        }],
        outputs: [
          {
            id: 'el-5-out-true',
            name: 'True',
            type: 'event',
            side: 'output',
            required: false,
            description: '',
          },
          {
            id: 'el-5-out-false',
            name: 'False',
            type: 'event',
            side: 'output',
            required: false,
            description: '',
          },
        ],
        config: {},
        pageId: 'page-1',
      },
    ];

    const complexConnections: Connection[] = [
      ...sampleConnections,
      {
        id: 'conn-3',
        sourceElementId: 'el-2',
        sourcePortId: 'el-2-out',
        targetElementId: 'el-4',
        targetPortId: 'el-4-in',
        pageId: 'page-1',
      },
      {
        id: 'conn-4',
        sourceElementId: 'el-4',
        sourcePortId: 'el-4-out',
        targetElementId: 'el-5',
        targetPortId: 'el-5-in',
        pageId: 'page-1',
      },
    ];

    return (
      <div className="h-screen w-full">
        <HiveLabCanvas
          pages={[samplePage]}
          currentPageId="page-1"
          elements={complexElements}
          connections={complexConnections}
          viewport={defaultViewport}
        />
      </div>
    );
  },
};

/**
 * Empty canvas
 */
export const Empty: Story = {
  args: {
    pages: [samplePage],
    currentPageId: 'page-1',
    elements: [],
    connections: [],
    viewport: defaultViewport,
  },
  render: (args) => (
    <div className="h-screen w-full">
      <HiveLabCanvas {...args} />
    </div>
  ),
};
