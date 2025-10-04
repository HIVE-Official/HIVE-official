import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MiniMap } from './mini-map';
import { GridBackground } from './grid-background';
import { ZoomControls } from './zoom-controls';
import type { Page, Viewport } from '@/types/hivelab.types';

/**
 * # Mini-Map
 *
 * Overview map showing entire canvas with viewport indicator.
 * Allows quick navigation by clicking or dragging viewport rectangle.
 *
 * ## Features
 * - Shows all pages on canvas
 * - Highlights current page
 * - Visualizes elements as dots
 * - Viewport indicator (dashed rectangle)
 * - Click to navigate
 * - Drag to pan viewport
 * - Scales to fit all content
 *
 * ## Usage
 * ```tsx
 * <MiniMap
 *   viewport={{ x: 0, y: 0, zoom: 1 }}
 *   pages={pages}
 *   containerWidth={1920}
 *   containerHeight={1080}
 *   onViewportChange={(vp) => setViewport(vp)}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/MiniMap',
  component: MiniMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MiniMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample pages for testing
const samplePages: Page[] = [
  {
    id: 'page-1',
    name: 'Main Page',
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    type: 'default',
    elements: [
      {
        id: 'el-1',
        type: 'trigger',
        name: 'Start',
        icon: '▶️',
        description: '',
        x: 100,
        y: 100,
        width: 180,
        height: 120,
        inputs: [],
        outputs: [],
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
        y: 100,
        width: 180,
        height: 120,
        inputs: [],
        outputs: [],
        config: {},
        pageId: 'page-1',
      },
    ],
    connections: [],
  },
  {
    id: 'page-2',
    name: 'Results Page',
    x: 1500,
    y: 0,
    width: 1200,
    height: 800,
    type: 'default',
    elements: [
      {
        id: 'el-3',
        type: 'display',
        name: 'Chart',
        icon: '📊',
        description: '',
        x: 1600,
        y: 100,
        width: 180,
        height: 120,
        inputs: [],
        outputs: [],
        config: {},
        pageId: 'page-2',
      },
    ],
    connections: [],
  },
];

/**
 * Default mini-map with two pages
 */
export const Default: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    position: 'bottom-left',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Single page
 */
export const SinglePage: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: [samplePages[0]],
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Many pages
 */
export const ManyPages: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: [
      ...samplePages,
      {
        ...samplePages[0],
        id: 'page-3',
        name: 'Modal',
        x: 0,
        y: 1000,
        type: 'modal' as const,
      },
      {
        ...samplePages[0],
        id: 'page-4',
        name: 'Settings',
        x: 1500,
        y: 1000,
      },
    ],
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Zoomed in viewport
 */
export const ZoomedIn: Story = {
  args: {
    viewport: { x: -200, y: -100, zoom: 2 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Viewport zoomed to 2x</p>
        <p className="text-xs text-muted-foreground">Mini viewport rect is smaller</p>
      </div>
    </div>
  ),
};

/**
 * Zoomed out viewport
 */
export const ZoomedOut: Story = {
  args: {
    viewport: { x: 100, y: 50, zoom: 0.5 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Viewport zoomed to 0.5x</p>
        <p className="text-xs text-muted-foreground">Mini viewport rect is larger</p>
      </div>
    </div>
  ),
};

/**
 * Different positions
 */
export const TopRight: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    position: 'top-right',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

export const BottomRight: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    position: 'bottom-right',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Without element count
 */
export const WithoutElementCount: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    showElementCount: false,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Interactive: Click to navigate, drag to pan
 */
export const Interactive: Story = {
  render: () => {
    const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });

    const handleViewportChange = (vp: Partial<Viewport>) => {
      setViewport(prev => ({ ...prev, ...vp }));
    };

    const handleZoomIn = () => {
      setViewport(prev => ({ ...prev, zoom: Math.min(4, prev.zoom + 0.1) }));
    };

    const handleZoomOut = () => {
      setViewport(prev => ({ ...prev, zoom: Math.max(0.1, prev.zoom - 0.1) }));
    };

    const handleZoomReset = () => {
      setViewport(prev => ({ ...prev, zoom: 1 }));
    };

    return (
      <div className="h-screen w-full relative">
        <GridBackground viewport={viewport} pattern="dots" />
        <MiniMap
          viewport={viewport}
          pages={samplePages}
          currentPageId="page-1"
          containerWidth={1920}
          containerHeight={1080}
          onViewportChange={handleViewportChange}
        />
        <ZoomControls
          zoom={viewport.zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold mb-2">Interactive Mini-Map</p>
          <p className="text-xs text-muted-foreground">Click mini-map to navigate</p>
          <p className="text-xs text-muted-foreground">Drag viewport rect to pan</p>
          <p className="text-xs text-muted-foreground">Use zoom controls</p>
        </div>
      </div>
    );
  },
};

/**
 * Large mini-map
 */
export const Large: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    width: 300,
    height: 225,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Small mini-map
 */
export const Small: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pages: samplePages,
    currentPageId: 'page-1',
    containerWidth: 1920,
    containerHeight: 1080,
    width: 150,
    height: 100,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <MiniMap {...args} />
    </div>
  ),
};

/**
 * Complete canvas with all components
 */
export const CompleteCanvas: Story = {
  render: () => {
    const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });

    return (
      <div className="h-screen w-full relative">
        <GridBackground viewport={viewport} pattern="dots" />
        <MiniMap
          viewport={viewport}
          pages={samplePages}
          currentPageId="page-1"
          containerWidth={1920}
          containerHeight={1080}
          position="bottom-left"
          onViewportChange={(vp) => setViewport(prev => ({ ...prev, ...vp }))}
        />
        <ZoomControls
          zoom={viewport.zoom}
          position="bottom-right"
          onZoomIn={() => setViewport(prev => ({ ...prev, zoom: Math.min(4, prev.zoom + 0.1) }))}
          onZoomOut={() => setViewport(prev => ({ ...prev, zoom: Math.max(0.1, prev.zoom - 0.1) }))}
          onZoomReset={() => setViewport(prev => ({ ...prev, zoom: 1 }))}
          onZoomToFit={() => setViewport({ x: 0, y: 0, zoom: 0.6 })}
        />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold text-center">Complete Canvas System</p>
          <p className="text-xs text-muted-foreground text-center">Grid + Mini-Map + Zoom Controls</p>
        </div>
      </div>
    );
  },
};
