import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ZoomControls } from './zoom-controls';
import { GridBackground } from './grid-background';

/**
 * # Zoom Controls
 *
 * Floating zoom controls for canvas navigation with zoom in, out, reset, and fit buttons.
 *
 * ## Features
 * - Zoom in/out with +/- buttons
 * - Click percentage to reset to 100%
 * - Zoom to fit all content
 * - Keyboard shortcuts (Cmd+0, Cmd+-, Cmd+=)
 * - Disable buttons at min/max zoom
 * - Configurable position (4 corners)
 *
 * ## Usage
 * ```tsx
 * <ZoomControls
 *   zoom={1.5}
 *   onZoomIn={() => setZoom(z => z + 0.1)}
 *   onZoomOut={() => setZoom(z => z - 0.1)}
 *   onZoomReset={() => setZoom(1)}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/ZoomControls',
  component: ZoomControls,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ZoomControls>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default zoom controls at bottom-right
 */
export const Default: Story = {
  args: {
    zoom: 1,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
    position: 'bottom-right',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Zoomed in (buttons update state)
 */
export const ZoomedIn: Story = {
  args: {
    zoom: 2.5,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Zoomed out
 */
export const ZoomedOut: Story = {
  args: {
    zoom: 0.25,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * At minimum zoom (zoom out disabled)
 */
export const MinZoom: Story = {
  args: {
    zoom: 0.1,
    minZoom: 0.1,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * At maximum zoom (zoom in disabled)
 */
export const MaxZoom: Story = {
  args: {
    zoom: 4,
    maxZoom: 4,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Top-left position
 */
export const TopLeft: Story = {
  args: {
    zoom: 1,
    position: 'top-left',
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Top-right position
 */
export const TopRight: Story = {
  args: {
    zoom: 1,
    position: 'top-right',
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Bottom-left position
 */
export const BottomLeft: Story = {
  args: {
    zoom: 1,
    position: 'bottom-left',
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * With zoom to fit button
 */
export const WithZoomToFit: Story = {
  args: {
    zoom: 1,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
    onZoomToFit: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Without percentage display
 */
export const WithoutPercentage: Story = {
  args: {
    zoom: 1.5,
    showPercentage: false,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};

/**
 * Interactive: Fully functional zoom controls
 */
export const Interactive: Story = {
  render: () => {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
      setZoom(z => Math.min(4, z + 0.1));
    };

    const handleZoomOut = () => {
      setZoom(z => Math.max(0.1, z - 0.1));
    };

    const handleZoomReset = () => {
      setZoom(1);
    };

    const handleZoomToFit = () => {
      setZoom(0.8);
    };

    return (
      <div className="h-screen w-full relative">
        <GridBackground viewport={{ x: 0, y: 0, zoom }} pattern="dots" />
        <ZoomControls
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
          onZoomToFit={handleZoomToFit}
          position="bottom-right"
        />
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold mb-2">Interactive Zoom</p>
          <p className="text-xs text-muted-foreground">Use controls to zoom</p>
          <p className="text-xs text-muted-foreground">Grid scales with zoom</p>
        </div>
      </div>
    );
  },
};

/**
 * All four positions at once
 */
export const AllPositions: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls
        zoom={1}
        position="top-left"
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onZoomReset={() => {}}
      />
      <ZoomControls
        zoom={1.5}
        position="top-right"
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onZoomReset={() => {}}
      />
      <ZoomControls
        zoom={0.5}
        position="bottom-left"
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onZoomReset={() => {}}
      />
      <ZoomControls
        zoom={2}
        position="bottom-right"
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onZoomReset={() => {}}
        onZoomToFit={() => {}}
      />
    </div>
  ),
};

/**
 * Compact variant (smaller buttons)
 */
export const Compact: Story = {
  args: {
    zoom: 1,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onZoomReset: () => {},
    className: 'scale-90',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background">
      <ZoomControls {...args} />
    </div>
  ),
};
