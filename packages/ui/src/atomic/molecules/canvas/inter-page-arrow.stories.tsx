import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InterPageArrow } from './inter-page-arrow';
import { PageFrame } from './page-frame';
import type { Page } from '../../../types/hivelab.types';

/**
 * # Inter-Page Arrow
 *
 * Visual indicator for navigation connections between pages in multi-page tools.
 * Shows connections from router elements (if/else, navigation buttons) to target pages.
 *
 * ## Features
 * - Dashed arrow connecting page edges
 * - Automatically calculates optimal edge connection (left/right/top/bottom)
 * - Label showing target page name
 * - Optional router element indicator at start
 * - Selection and hover states
 * - Click to select arrow
 * - Color-coded by flow type
 *
 * ## Usage
 * ```tsx
 * <InterPageArrow
 *   sourcePage={{ x: 100, y: 100, width: 1200, height: 800 }}
 *   targetPage={{ x: 1400, y: 100, width: 600, height: 400 }}
 *   sourceName="Main Page"
 *   targetName="Confirmation Modal"
 *   routerElement={{ id: 'r1', name: 'Submit Button' }}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/InterPageArrow',
  component: InterPageArrow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InterPageArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample pages
const mainPage = {
  x: 100,
  y: 200,
  width: 1200,
  height: 800,
};

const modalPage = {
  x: 1400,
  y: 300,
  width: 600,
  height: 400,
};

/**
 * Default horizontal arrow (left to right)
 */
export const Default: Story = {
  args: {
    sourcePage: mainPage,
    targetPage: modalPage,
    sourceName: 'Main Page',
    targetName: 'Confirmation Modal',
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <InterPageArrow {...args} />
      </svg>
    </div>
  ),
};

/**
 * With router element indicator
 */
export const WithRouterElement: Story = {
  args: {
    sourcePage: mainPage,
    targetPage: modalPage,
    sourceName: 'Main Page',
    targetName: 'Confirmation Modal',
    routerElement: {
      id: 'router-1',
      name: 'Submit Button',
    },
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <InterPageArrow {...args} />
      </svg>
    </div>
  ),
};

/**
 * Selected state
 */
export const Selected: Story = {
  args: {
    sourcePage: mainPage,
    targetPage: modalPage,
    sourceName: 'Main Page',
    targetName: 'Confirmation Modal',
    isSelected: true,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <InterPageArrow {...args} />
      </svg>
    </div>
  ),
};

/**
 * Hovered state
 */
export const Hovered: Story = {
  args: {
    sourcePage: mainPage,
    targetPage: modalPage,
    sourceName: 'Main Page',
    targetName: 'Confirmation Modal',
    isHovered: true,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <InterPageArrow {...args} />
      </svg>
    </div>
  ),
};

/**
 * Different directions
 */
export const AllDirections: Story = {
  render: () => {
    const centerPage = { x: 600, y: 400, width: 400, height: 300 };

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Right */}
          <InterPageArrow
            sourcePage={centerPage}
            targetPage={{ x: 1100, y: 450, width: 300, height: 200 }}
            sourceName="Center"
            targetName="Right Page"
            color="hsl(210, 70%, 50%)"
          />

          {/* Left */}
          <InterPageArrow
            sourcePage={centerPage}
            targetPage={{ x: 100, y: 450, width: 300, height: 200 }}
            sourceName="Center"
            targetName="Left Page"
            color="hsl(280, 70%, 50%)"
          />

          {/* Bottom */}
          <InterPageArrow
            sourcePage={centerPage}
            targetPage={{ x: 650, y: 800, width: 300, height: 200 }}
            sourceName="Center"
            targetName="Bottom Page"
            color="hsl(120, 70%, 40%)"
          />

          {/* Top */}
          <InterPageArrow
            sourcePage={centerPage}
            targetPage={{ x: 650, y: 50, width: 300, height: 200 }}
            sourceName="Center"
            targetName="Top Page"
            color="hsl(40, 70%, 50%)"
          />
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">All 4 Directions</p>
          <p className="text-xs text-muted-foreground">Auto-calculates optimal edge</p>
        </div>
      </div>
    );
  },
};

/**
 * With page frames
 */
export const WithPageFrames: Story = {
  render: () => {
    const pages: Page[] = [
      {
        id: 'p1',
        name: 'Welcome',
        description: '',
        x: 100,
        y: 100,
        width: 1200,
        height: 800,
        type: 'default',
        elements: [],
        connections: [],
      },
      {
        id: 'p2',
        name: 'Confirmation',
        description: '',
        x: 1400,
        y: 200,
        width: 600,
        height: 400,
        type: 'modal',
        elements: [],
        connections: [],
      },
      {
        id: 'p3',
        name: 'Error',
        description: '',
        x: 1400,
        y: 700,
        width: 600,
        height: 400,
        type: 'modal',
        elements: [],
        connections: [],
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        {/* Pages */}
        {pages.map(page => (
          <PageFrame key={page.id} page={page} isCurrent={page.id === 'p1'} />
        ))}

        {/* Arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <g className="pointer-events-auto">
            <InterPageArrow
              sourcePage={pages[0]}
              targetPage={pages[1]}
              sourceName="Welcome"
              targetName="Confirmation"
              routerElement={{ id: 'r1', name: 'Submit' }}
              color="hsl(120, 70%, 40%)"
            />
            <InterPageArrow
              sourcePage={pages[0]}
              targetPage={pages[2]}
              sourceName="Welcome"
              targetName="Error"
              routerElement={{ id: 'r2', name: 'Cancel' }}
              color="hsl(0, 70%, 50%)"
            />
          </g>
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">Multi-Page Flow</p>
          <p className="text-xs text-muted-foreground">Navigation arrows between pages</p>
        </div>
      </div>
    );
  },
};

/**
 * Interactive selection
 */
export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const arrows = [
      {
        id: 'arrow-1',
        sourcePage: { x: 100, y: 200, width: 400, height: 300 },
        targetPage: { x: 600, y: 250, width: 400, height: 300 },
        sourceName: 'Page 1',
        targetName: 'Page 2',
        color: 'hsl(210, 70%, 50%)',
      },
      {
        id: 'arrow-2',
        sourcePage: { x: 100, y: 200, width: 400, height: 300 },
        targetPage: { x: 600, y: 600, width: 400, height: 300 },
        sourceName: 'Page 1',
        targetName: 'Page 3',
        color: 'hsl(280, 70%, 50%)',
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {arrows.map(arrow => (
            <InterPageArrow
              key={arrow.id}
              {...arrow}
              isSelected={selectedId === arrow.id}
              isHovered={hoveredId === arrow.id}
              onClick={() => setSelectedId(selectedId === arrow.id ? null : arrow.id)}
            />
          ))}
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">Interactive Arrows</p>
          <p className="text-xs text-muted-foreground">Click to select</p>
          <p className="text-xs mt-2">Selected: {selectedId || 'None'}</p>
        </div>
      </div>
    );
  },
};

/**
 * Color-coded flows
 */
export const ColorCodedFlows: Story = {
  render: () => {
    const centerPage = { x: 500, y: 300, width: 400, height: 300 };

    const flows = [
      {
        target: { x: 1000, y: 100, width: 300, height: 200 },
        name: 'Success',
        color: 'hsl(120, 70%, 40%)',
        router: 'If Valid',
      },
      {
        target: { x: 1000, y: 350, width: 300, height: 200 },
        name: 'Warning',
        color: 'hsl(40, 70%, 50%)',
        router: 'If Empty',
      },
      {
        target: { x: 1000, y: 600, width: 300, height: 200 },
        name: 'Error',
        color: 'hsl(0, 70%, 50%)',
        router: 'If Invalid',
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {flows.map((flow, i) => (
            <InterPageArrow
              key={i}
              sourcePage={centerPage}
              targetPage={flow.target}
              sourceName="Form"
              targetName={flow.name}
              routerElement={{ id: `r${i}`, name: flow.router }}
              color={flow.color}
            />
          ))}
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">Color-Coded Flows</p>
          <p className="text-xs text-muted-foreground">Success, warning, error</p>
        </div>
      </div>
    );
  },
};

/**
 * Complex multi-page flow
 */
export const ComplexFlow: Story = {
  render: () => {
    const pages = [
      { id: 'start', x: 100, y: 300, width: 300, height: 200, name: 'Start' },
      { id: 'input', x: 500, y: 300, width: 300, height: 200, name: 'Input Form' },
      { id: 'validate', x: 900, y: 100, width: 300, height: 200, name: 'Validation' },
      { id: 'success', x: 1300, y: 100, width: 300, height: 200, name: 'Success' },
      { id: 'error', x: 1300, y: 400, width: 300, height: 200, name: 'Error' },
      { id: 'retry', x: 900, y: 500, width: 300, height: 200, name: 'Retry' },
    ];

    const arrows = [
      { from: 0, to: 1, label: 'Start', color: 'hsl(210, 70%, 50%)' },
      { from: 1, to: 2, label: 'Submit', color: 'hsl(210, 70%, 50%)' },
      { from: 2, to: 3, label: 'Valid', color: 'hsl(120, 70%, 40%)' },
      { from: 2, to: 4, label: 'Invalid', color: 'hsl(0, 70%, 50%)' },
      { from: 4, to: 5, label: 'Try Again', color: 'hsl(40, 70%, 50%)' },
      { from: 5, to: 1, label: 'Reset', color: 'hsl(280, 70%, 50%)' },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {arrows.map((arrow, i) => (
            <InterPageArrow
              key={i}
              sourcePage={pages[arrow.from]}
              targetPage={pages[arrow.to]}
              sourceName={pages[arrow.from].name}
              targetName={pages[arrow.to].name}
              routerElement={{ id: `r${i}`, name: arrow.label }}
              color={arrow.color}
            />
          ))}
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">Complex Multi-Page Flow</p>
          <p className="text-xs text-muted-foreground">6 pages, 6 navigation paths</p>
        </div>
      </div>
    );
  },
};

/**
 * Bidirectional arrows
 */
export const Bidirectional: Story = {
  render: () => {
    const page1 = { x: 200, y: 300, width: 400, height: 300 };
    const page2 = { x: 800, y: 300, width: 400, height: 300 };

    return (
      <div className="h-screen w-full relative bg-background border">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Forward arrow (offset up) */}
          <InterPageArrow
            sourcePage={{ ...page1, y: page1.y - 30 }}
            targetPage={{ ...page2, y: page2.y - 30 }}
            sourceName="Page 1"
            targetName="Page 2"
            routerElement={{ id: 'r1', name: 'Next' }}
            color="hsl(210, 70%, 50%)"
          />

          {/* Backward arrow (offset down) */}
          <InterPageArrow
            sourcePage={{ ...page2, y: page2.y + 30 }}
            targetPage={{ ...page1, y: page1.y + 30 }}
            sourceName="Page 2"
            targetName="Page 1"
            routerElement={{ id: 'r2', name: 'Back' }}
            color="hsl(280, 70%, 50%)"
          />
        </svg>

        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
          <p className="text-sm font-semibold mb-2">Bidirectional Navigation</p>
          <p className="text-xs text-muted-foreground">Forward and back arrows</p>
        </div>
      </div>
    );
  },
};

/**
 * Long distance arrow
 */
export const LongDistance: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border overflow-auto">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <InterPageArrow
          sourcePage={{ x: 100, y: 100, width: 300, height: 200 }}
          targetPage={{ x: 1500, y: 600, width: 300, height: 200 }}
          sourceName="Start"
          targetName="Finish"
          routerElement={{ id: 'r1', name: 'Complete Flow' }}
        />
      </svg>

      <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border" style={{ zIndex: 2 }}>
        <p className="text-sm font-semibold mb-2">Long Distance Arrow</p>
        <p className="text-xs text-muted-foreground">Across large canvas areas</p>
      </div>
    </div>
  ),
};
