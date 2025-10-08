import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SelectionBox } from './selection-box';
import { ElementCard } from './element-card';
import type { Position, Element } from '../../../types/hivelab.types';

/**
 * # Selection Box
 *
 * Visual rectangle shown during multi-select drag operation. Updates in real-time
 * as the user drags to select multiple elements on the canvas.
 *
 * ## Features
 * - Calculates rectangle from start and current drag positions
 * - Blue border with semi-transparent fill
 * - Corner dots for visual feedback
 * - Shows dimensions badge when large enough
 * - Auto-adjusts for any drag direction (top-left, bottom-right, etc.)
 *
 * ## Usage
 * ```tsx
 * <SelectionBox
 *   start={{ x: 100, y: 100 }}
 *   current={{ x: 400, y: 300 }}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/SelectionBox',
  component: SelectionBox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default selection box (small)
 */
export const Default: Story = {
  args: {
    start: { x: 100, y: 100 },
    current: { x: 250, y: 200 },
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <SelectionBox {...args} />
    </div>
  ),
};

/**
 * Large selection box (shows dimensions badge)
 */
export const LargeSelection: Story = {
  args: {
    start: { x: 100, y: 100 },
    current: { x: 500, y: 400 },
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <SelectionBox {...args} />
    </div>
  ),
};

/**
 * Drag directions (all 4 quadrants)
 */
export const DragDirections: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      {/* Top-left to bottom-right */}
      <SelectionBox start={{ x: 100, y: 100 }} current={{ x: 300, y: 250 }} />

      {/* Bottom-right to top-left */}
      <SelectionBox start={{ x: 500, y: 350 }} current={{ x: 350, y: 200 }} />

      {/* Top-right to bottom-left */}
      <SelectionBox start={{ x: 700, y: 100 }} current={{ x: 550, y: 250 }} />

      {/* Bottom-left to top-right */}
      <SelectionBox start={{ x: 100, y: 500 }} current={{ x: 250, y: 350 }} />

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
        <p className="text-sm font-semibold mb-2">4 Drag Directions</p>
        <p className="text-xs text-muted-foreground">Works from any corner</p>
      </div>
    </div>
  ),
};

/**
 * Interactive selection
 */
export const Interactive: Story = {
  render: () => {
    const [start, setStart] = useState<Position | null>(null);
    const [current, setCurrent] = useState<Position | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setStart(pos);
      setCurrent(pos);
      setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !start) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCurrent({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setStart(null);
      setCurrent(null);
    };

    return (
      <div
        className="h-screen w-full relative bg-background border cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {start && current && <SelectionBox start={start} current={current} />}

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border pointer-events-none">
          <p className="text-sm font-semibold mb-2">Interactive Selection</p>
          <p className="text-xs text-muted-foreground">Click and drag to create selection box</p>
          {isDragging && start && current && (
            <p className="text-xs mt-2">
              Size: {Math.round(Math.abs(current.x - start.x))} × {Math.round(Math.abs(current.y - start.y))}
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Selecting elements
 */
export const SelectingElements: Story = {
  render: () => {
    const [start, setStart] = useState<Position | null>(null);
    const [current, setCurrent] = useState<Position | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const elements: Element[] = [
      {
        id: 'el-1',
        type: 'trigger',
        name: 'Button',
        icon: '▶️',
        description: '',
        x: 150,
        y: 150,
        width: 180,
        height: 120,
        inputs: [],
        outputs: [{ id: 'out', name: 'Clicked', type: 'event', side: 'output', required: false, description: '' }],
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
        y: 200,
        width: 180,
        height: 120,
        inputs: [{ id: 'in', name: 'Trigger', type: 'event', side: 'input', required: false, description: '' }],
        outputs: [{ id: 'out', name: 'Value', type: 'text', side: 'output', required: false, description: '' }],
        config: {},
        pageId: 'page-1',
      },
      {
        id: 'el-3',
        type: 'action',
        name: 'Send',
        icon: '📧',
        description: '',
        x: 150,
        y: 350,
        width: 180,
        height: 120,
        inputs: [{ id: 'in', name: 'Data', type: 'text', side: 'input', required: true, description: '' }],
        outputs: [],
        config: {},
        pageId: 'page-1',
      },
    ];

    const handleMouseDown = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-element-card]')) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setStart(pos);
      setCurrent(pos);
      setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !start) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const newCurrent = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setCurrent(newCurrent);

      // Check which elements are in selection
      const selectionBox = {
        left: Math.min(start.x, newCurrent.x),
        top: Math.min(start.y, newCurrent.y),
        right: Math.max(start.x, newCurrent.x),
        bottom: Math.max(start.y, newCurrent.y),
      };

      const selected = new Set<string>();
      elements.forEach(el => {
        const elementBox = {
          left: el.x,
          top: el.y,
          right: el.x + el.width,
          bottom: el.y + el.height,
        };

        // Check for intersection
        if (
          selectionBox.left < elementBox.right &&
          selectionBox.right > elementBox.left &&
          selectionBox.top < elementBox.bottom &&
          selectionBox.bottom > elementBox.top
        ) {
          selected.add(el.id);
        }
      });

      setSelectedIds(selected);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setStart(null);
      setCurrent(null);
    };

    return (
      <div
        className="h-screen w-full relative bg-background border cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {start && current && <SelectionBox start={start} current={current} />}

        {elements.map(el => (
          <div key={el.id} data-element-card>
            <ElementCard
              element={el}
              isSelected={selectedIds.has(el.id)}
            />
          </div>
        ))}

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border pointer-events-none">
          <p className="text-sm font-semibold mb-2">Multi-Select Elements</p>
          <p className="text-xs text-muted-foreground">Drag to select</p>
          <p className="text-xs mt-2">Selected: {selectedIds.size} element{selectedIds.size === 1 ? '' : 's'}</p>
        </div>
      </div>
    );
  },
};

/**
 * Minimum selection size
 */
export const MinimumSize: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm font-semibold mb-2">Very small (no badge)</p>
        <div className="h-48 w-full relative bg-background border">
          <SelectionBox start={{ x: 100, y: 50 }} current={{ x: 120, y: 70 }} />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Medium (no badge)</p>
        <div className="h-48 w-full relative bg-background border">
          <SelectionBox start={{ x: 100, y: 50 }} current={{ x: 140, y: 90 }} />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Large enough (shows badge)</p>
        <div className="h-48 w-full relative bg-background border">
          <SelectionBox start={{ x: 100, y: 50 }} current={{ x: 200, y: 120 }} />
        </div>
      </div>
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
            id="grid-selection"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="hsl(var(--muted-foreground) / 0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-selection)" />
      </svg>
    );

    return (
      <div className="h-screen w-full relative bg-background border">
        <GridBackground />
        <SelectionBox start={{ x: 150, y: 150 }} current={{ x: 450, y: 350 }} />
      </div>
    );
  },
};

/**
 * Multiple simultaneous (different tools)
 */
export const MultipleSelections: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      <SelectionBox start={{ x: 100, y: 100 }} current={{ x: 300, y: 250 }} />
      <SelectionBox start={{ x: 400, y: 150 }} current={{ x: 600, y: 300 }} className="border-green-500 bg-green-500/10" />
      <SelectionBox start={{ x: 100, y: 350 }} current={{ x: 250, y: 500 }} className="border-purple-500 bg-purple-500/10" />

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
        <p className="text-sm font-semibold mb-2">Multiple Selection Boxes</p>
        <p className="text-xs text-muted-foreground">Different tools or states</p>
      </div>
    </div>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      {/* Tiny */}
      <SelectionBox start={{ x: 50, y: 50 }} current={{ x: 80, y: 80 }} />

      {/* Small */}
      <SelectionBox start={{ x: 150, y: 50 }} current={{ x: 250, y: 120 }} />

      {/* Medium */}
      <SelectionBox start={{ x: 350, y: 50 }} current={{ x: 550, y: 200 }} />

      {/* Large */}
      <SelectionBox start={{ x: 650, y: 50 }} current={{ x: 950, y: 300 }} />

      {/* Very large */}
      <SelectionBox start={{ x: 50, y: 250 }} current={{ x: 550, y: 550 }} />

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm font-semibold">Different Sizes</p>
      </div>
    </div>
  ),
};

/**
 * Aspect ratios
 */
export const AspectRatios: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      {/* Wide */}
      <SelectionBox start={{ x: 100, y: 100 }} current={{ x: 500, y: 150 }} />

      {/* Tall */}
      <SelectionBox start={{ x: 600, y: 100 }} current={{ x: 700, y: 500 }} />

      {/* Square */}
      <SelectionBox start={{ x: 200, y: 250 }} current={{ x: 450, y: 500 }} />

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm font-semibold">Different Aspect Ratios</p>
        <p className="text-xs text-muted-foreground">Wide, tall, square</p>
      </div>
    </div>
  ),
};

/**
 * Edge cases
 */
export const EdgeCases: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      {/* Zero width (vertical line) */}
      <SelectionBox start={{ x: 100, y: 100 }} current={{ x: 100, y: 300 }} />

      {/* Zero height (horizontal line) */}
      <SelectionBox start={{ x: 200, y: 100 }} current={{ x: 400, y: 100 }} />

      {/* Single pixel */}
      <SelectionBox start={{ x: 500, y: 100 }} current={{ x: 501, y: 101 }} />

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-2 rounded-md border">
        <p className="text-sm font-semibold">Edge Cases</p>
        <p className="text-xs text-muted-foreground">Zero width, height, single pixel</p>
      </div>
    </div>
  ),
};
