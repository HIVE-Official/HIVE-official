import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConnectionWire } from './connection-wire';
import { Port } from './port';
import { DATA_TYPE_COLORS, type DataType } from '@/types/hivelab.types';

/**
 * # Connection Wire
 *
 * Bézier curve wire connecting two ports. Shows data flow direction with arrow,
 * supports hover/selection states, and optional animated data flow visualization.
 *
 * ## Features
 * - Smooth Bézier curves
 * - Color-coded by data type
 * - Arrow shows data flow direction
 * - Invisible hit area for easy clicking
 * - Hover glow effect
 * - Selection glow
 * - Optional animated data flow (dashed line)
 * - Configurable stroke width
 *
 * ## Usage
 * ```tsx
 * <ConnectionWire
 *   path="M 100,100 C 200,100 200,200 300,200"
 *   color="hsl(210, 100%, 60%)"
 *   animated={true}
 *   onClick={() => selectWire()}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Elements/ConnectionWire',
  component: ConnectionWire,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectionWire>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Bézier paths
const simplePath = 'M 100,100 C 200,100 200,200 300,200';
const complexPath = 'M 100,300 C 250,300 150,100 300,100';
const longPath = 'M 100,200 C 400,200 200,400 500,400';

/**
 * Default wire (text type, blue)
 */
export const Default: Story = {
  args: {
    path: simplePath,
    color: DATA_TYPE_COLORS.text,
  },
  render: (args) => (
    <svg width="400" height="300" className="bg-background border">
      <ConnectionWire {...args} />
    </svg>
  ),
};

/**
 * Hovered wire (thicker, highlighted)
 */
export const Hovered: Story = {
  args: {
    path: simplePath,
    color: DATA_TYPE_COLORS.text,
    isHovered: true,
  },
  render: (args) => (
    <svg width="400" height="300" className="bg-background border">
      <ConnectionWire {...args} />
    </svg>
  ),
};

/**
 * Selected wire (glowing)
 */
export const Selected: Story = {
  args: {
    path: simplePath,
    color: DATA_TYPE_COLORS.text,
    isSelected: true,
  },
  render: (args) => (
    <svg width="400" height="300" className="bg-background border">
      <ConnectionWire {...args} />
    </svg>
  ),
};

/**
 * Animated data flow
 */
export const Animated: Story = {
  args: {
    path: simplePath,
    color: DATA_TYPE_COLORS.text,
    animated: true,
  },
  render: (args) => (
    <svg width="400" height="300" className="bg-background border">
      <ConnectionWire {...args} />
    </svg>
  ),
};

/**
 * All data type colors
 */
export const AllDataTypes: Story = {
  render: () => {
    const types: Array<{ type: DataType; y: number }> = [
      { type: 'text', y: 50 },
      { type: 'number', y: 100 },
      { type: 'boolean', y: 150 },
      { type: 'date', y: 200 },
      { type: 'user', y: 250 },
      { type: 'list', y: 300 },
      { type: 'object', y: 350 },
      { type: 'event', y: 400 },
      { type: 'file', y: 450 },
      { type: 'validation', y: 500 },
      { type: 'any', y: 550 },
    ];

    return (
      <div className="p-8 space-y-2">
        <h3 className="text-sm font-semibold mb-4">All Data Type Colors</h3>
        <svg width="500" height="600" className="border bg-background">
          {types.map(({ type, y }) => (
            <g key={type}>
              <ConnectionWire
                path={`M 100,${y} C 250,${y} 150,${y + 30} 400,${y + 30}`}
                color={DATA_TYPE_COLORS[type]}
              />
              <text x="10" y={y + 5} className="fill-foreground text-xs">
                {type}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  },
};

/**
 * Complex curves
 */
export const ComplexCurves: Story = {
  render: () => (
    <svg width="600" height="500" className="bg-background border">
      {/* Simple curve */}
      <ConnectionWire
        path="M 50,50 C 150,50 150,150 250,150"
        color={DATA_TYPE_COLORS.text}
      />

      {/* S-curve */}
      <ConnectionWire
        path="M 50,200 C 200,200 100,350 250,350"
        color={DATA_TYPE_COLORS.number}
      />

      {/* Long distance */}
      <ConnectionWire
        path="M 50,450 C 300,450 200,100 550,100"
        color={DATA_TYPE_COLORS.event}
      />

      {/* Steep */}
      <ConnectionWire
        path="M 300,50 C 350,50 350,450 400,450"
        color={DATA_TYPE_COLORS.boolean}
      />

      {/* Horizontal */}
      <ConnectionWire
        path="M 300,250 C 400,250 400,250 500,250"
        color={DATA_TYPE_COLORS.user}
      />
    </svg>
  ),
};

/**
 * Different stroke widths
 */
export const StrokeWidths: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <h3 className="text-sm font-semibold mb-4">Stroke Width Variations</h3>
      <svg width="400" height="300" className="border bg-background">
        <ConnectionWire
          path="M 50,50 C 150,50 150,100 250,100"
          color={DATA_TYPE_COLORS.text}
          strokeWidth={1}
        />
        <text x="260" y="105" className="fill-foreground text-xs">1px</text>

        <ConnectionWire
          path="M 50,120 C 150,120 150,170 250,170"
          color={DATA_TYPE_COLORS.number}
          strokeWidth={2}
        />
        <text x="260" y="175" className="fill-foreground text-xs">2px (default)</text>

        <ConnectionWire
          path="M 50,190 C 150,190 150,240 250,240"
          color={DATA_TYPE_COLORS.event}
          strokeWidth={4}
        />
        <text x="260" y="245" className="fill-foreground text-xs">4px</text>
      </svg>
    </div>
  ),
};

/**
 * Interactive hover and selection
 */
export const Interactive: Story = {
  render: () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    const wires = [
      { id: 0, path: 'M 50,50 C 150,50 150,100 250,100', color: DATA_TYPE_COLORS.text },
      { id: 1, path: 'M 50,120 C 150,120 150,170 250,170', color: DATA_TYPE_COLORS.number },
      { id: 2, path: 'M 50,190 C 150,190 150,240 250,240', color: DATA_TYPE_COLORS.event },
    ];

    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground mb-4">
          Hover and click wires to see states
        </p>
        <svg width="400" height="300" className="border bg-background">
          {wires.map(wire => (
            <ConnectionWire
              key={wire.id}
              path={wire.path}
              color={wire.color}
              isHovered={hovered === wire.id}
              isSelected={selected === wire.id}
              onMouseEnter={() => setHovered(wire.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === wire.id ? null : wire.id)}
            />
          ))}
        </svg>
        <p className="text-xs text-muted-foreground mt-2">
          Selected: {selected !== null ? `Wire ${selected + 1}` : 'None'}
        </p>
      </div>
    );
  },
};

/**
 * With ports (complete connection)
 */
export const WithPorts: Story = {
  render: () => (
    <div className="p-8">
      <svg width="600" height="400" className="border bg-background">
        {/* Source element */}
        <rect x="50" y="150" width="100" height="100" fill="hsl(var(--muted))" rx="8" />
        <text x="100" y="205" className="fill-foreground text-xs text-center" textAnchor="middle">
          Source
        </text>

        {/* Target element */}
        <rect x="450" y="150" width="100" height="100" fill="hsl(var(--muted))" rx="8" />
        <text x="500" y="205" className="fill-foreground text-xs text-center" textAnchor="middle">
          Target
        </text>

        {/* Connection wire */}
        <ConnectionWire
          path="M 150,200 C 300,200 300,200 450,200"
          color={DATA_TYPE_COLORS.text}
          animated
        />

        {/* Ports */}
        <g transform="translate(150, 200)">
          <Port
            port={{
              id: 'out',
              name: 'Output',
              type: 'text',
              side: 'output',
              required: false,
              description: '',
            }}
            isConnected
          />
        </g>
        <g transform="translate(450, 200)">
          <Port
            port={{
              id: 'in',
              name: 'Input',
              type: 'text',
              side: 'input',
              required: false,
              description: '',
            }}
            isConnected
          />
        </g>
      </svg>
    </div>
  ),
};

/**
 * Multiple connections
 */
export const MultipleConnections: Story = {
  render: () => (
    <div className="p-8">
      <svg width="600" height="400" className="border bg-background">
        {/* Source */}
        <rect x="50" y="100" width="120" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="110" y="125" className="fill-foreground text-sm font-semibold" textAnchor="middle">
          Transform
        </text>

        {/* Targets */}
        <rect x="430" y="50" width="120" height="80" fill="hsl(var(--muted))" rx="8" />
        <text x="490" y="95" className="fill-foreground text-xs" textAnchor="middle">
          Display 1
        </text>

        <rect x="430" y="160" width="120" height="80" fill="hsl(var(--muted))" rx="8" />
        <text x="490" y="205" className="fill-foreground text-xs" textAnchor="middle">
          Display 2
        </text>

        <rect x="430" y="270" width="120" height="80" fill="hsl(var(--muted))" rx="8" />
        <text x="490" y="315" className="fill-foreground text-xs" textAnchor="middle">
          Storage
        </text>

        {/* Wires */}
        <ConnectionWire
          path="M 170,150 C 300,150 300,90 430,90"
          color={DATA_TYPE_COLORS.text}
        />
        <ConnectionWire
          path="M 170,200 C 300,200 300,200 430,200"
          color={DATA_TYPE_COLORS.number}
        />
        <ConnectionWire
          path="M 170,250 C 300,250 300,310 430,310"
          color={DATA_TYPE_COLORS.object}
        />
      </svg>
    </div>
  ),
};

/**
 * Animated flow showcase
 */
export const AnimatedFlow: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-sm font-semibold mb-4">Animated Data Flow</h3>
      <svg width="600" height="400" className="border bg-background">
        <ConnectionWire
          path="M 50,100 C 300,100 200,300 550,300"
          color={DATA_TYPE_COLORS.event}
          animated
          strokeWidth={3}
        />
      </svg>
    </div>
  ),
};

/**
 * State comparison
 */
export const StateComparison: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <h3 className="text-sm font-semibold mb-4">Wire States</h3>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs mb-2">Default</p>
          <svg width="250" height="80" className="border bg-background">
            <ConnectionWire path="M 20,40 C 100,40 150,40 230,40" color={DATA_TYPE_COLORS.text} />
          </svg>
        </div>

        <div>
          <p className="text-xs mb-2">Hovered</p>
          <svg width="250" height="80" className="border bg-background">
            <ConnectionWire path="M 20,40 C 100,40 150,40 230,40" color={DATA_TYPE_COLORS.text} isHovered />
          </svg>
        </div>

        <div>
          <p className="text-xs mb-2">Selected</p>
          <svg width="250" height="80" className="border bg-background">
            <ConnectionWire path="M 20,40 C 100,40 150,40 230,40" color={DATA_TYPE_COLORS.text} isSelected />
          </svg>
        </div>

        <div>
          <p className="text-xs mb-2">Animated</p>
          <svg width="250" height="80" className="border bg-background">
            <ConnectionWire path="M 20,40 C 100,40 150,40 230,40" color={DATA_TYPE_COLORS.event} animated />
          </svg>
        </div>
      </div>
    </div>
  ),
};
