import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GridBackground } from './grid-background';
import type { Viewport } from '@/types/hivelab.types';

/**
 * # Grid Background
 *
 * Infinite grid background for HiveLab canvas. Supports both dot and line patterns,
 * scales with zoom, and pans with viewport.
 *
 * ## Features
 * - Two patterns: dots or lines
 * - Major grid lines every N cells
 * - Scales smoothly with zoom (0.1x - 4x)
 * - Pans with viewport offset
 * - Configurable colors and grid size
 *
 * ## Usage
 * ```tsx
 * <GridBackground
 *   viewport={{ x: 0, y: 0, zoom: 1 }}
 *   pattern="dots"
 *   gridSize={20}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/GridBackground',
  component: GridBackground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dot pattern at 1x zoom
 */
export const Default: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Line pattern grid
 */
export const LinePattern: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'lines',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Zoomed in (2x) - grid appears larger
 */
export const ZoomedIn: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 2 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Zoom: 2x (zoomed in)</p>
      </div>
    </div>
  ),
};

/**
 * Zoomed out (0.5x) - grid appears smaller
 */
export const ZoomedOut: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 0.5 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Zoom: 0.5x (zoomed out)</p>
      </div>
    </div>
  ),
};

/**
 * Panned viewport - grid moves with pan
 */
export const Panned: Story = {
  args: {
    viewport: { x: 100, y: 50, zoom: 1 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Pan: x=100, y=50</p>
      </div>
    </div>
  ),
};

/**
 * Large grid cells (40px)
 */
export const LargeGrid: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'dots',
    gridSize: 40,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Small grid cells (10px)
 */
export const SmallGrid: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'dots',
    gridSize: 10,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Custom colors
 */
export const CustomColors: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'dots',
    gridSize: 20,
    color: 'hsl(var(--primary) / 0.2)',
    majorColor: 'hsl(var(--primary) / 0.4)',
    backgroundColor: 'hsl(var(--muted) / 0.1)',
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Major grid every 10 cells
 */
export const MajorGridDense: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 1 },
    pattern: 'lines',
    gridSize: 20,
    majorGridEvery: 10,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
    </div>
  ),
};

/**
 * Interactive: Pan and zoom with mouse
 */
export const Interactive: Story = {
  render: () => {
    const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;

      setViewport(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY / 1000;

      setViewport(prev => ({
        ...prev,
        zoom: Math.max(0.1, Math.min(4, prev.zoom + delta)),
      }));
    };

    return (
      <div
        className="h-screen w-full relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <GridBackground viewport={viewport} pattern="dots" />
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border space-y-1">
          <p className="text-sm font-semibold">Interactive Grid</p>
          <p className="text-xs text-muted-foreground">Drag to pan</p>
          <p className="text-xs text-muted-foreground">Scroll to zoom</p>
          <div className="pt-2 mt-2 border-t text-xs space-y-0.5">
            <p>Pan: x={Math.round(viewport.x)}, y={Math.round(viewport.y)}</p>
            <p>Zoom: {viewport.zoom.toFixed(2)}x</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Extreme zoom levels
 */
export const ExtremeZoomIn: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 4 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Zoom: 4x (max zoom)</p>
      </div>
    </div>
  ),
};

export const ExtremeZoomOut: Story = {
  args: {
    viewport: { x: 0, y: 0, zoom: 0.1 },
    pattern: 'dots',
    gridSize: 20,
  },
  render: (args) => (
    <div className="h-screen w-full relative">
      <GridBackground {...args} />
      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm">Zoom: 0.1x (min zoom)</p>
      </div>
    </div>
  ),
};

/**
 * Both patterns side by side
 */
export const PatternComparison: Story = {
  render: () => (
    <div className="h-screen w-full flex">
      <div className="flex-1 relative border-r">
        <GridBackground viewport={{ x: 0, y: 0, zoom: 1 }} pattern="dots" />
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
          <p className="text-sm font-semibold">Dot Pattern</p>
        </div>
      </div>
      <div className="flex-1 relative">
        <GridBackground viewport={{ x: 0, y: 0, zoom: 1 }} pattern="lines" />
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
          <p className="text-sm font-semibold">Line Pattern</p>
        </div>
      </div>
    </div>
  ),
};
