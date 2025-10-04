import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PageFrame } from './page-frame';
import type { Page } from '../../../types/hivelab.types';

/**
 * # Page Frame
 *
 * Visual frame showing page boundaries on the infinite canvas. Displays page name,
 * type (default/modal/drawer), and element count.
 *
 * ## Features
 * - Visual page boundary with colored border
 * - Page name and element count in header
 * - Page type badge (bottom-right)
 * - Dimensions label at high zoom
 * - Current page highlighting
 * - Hover state
 * - Click to switch, double-click to rename
 *
 * ## Usage
 * ```tsx
 * <PageFrame
 *   page={page}
 *   isCurrent={true}
 *   onClick={() => setCurrentPage(page.id)}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Canvas/PageFrame',
  component: PageFrame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample page
const defaultPage: Page = {
  id: 'page-1',
  name: 'Main Page',
  description: 'Primary page',
  x: 100,
  y: 100,
  width: 1200,
  height: 800,
  type: 'default',
  elements: [],
  connections: [],
};

/**
 * Default page frame
 */
export const Default: Story = {
  args: {
    page: defaultPage,
    isCurrent: false,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * Current page (highlighted)
 */
export const CurrentPage: Story = {
  args: {
    page: defaultPage,
    isCurrent: true,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * Hovered page
 */
export const Hovered: Story = {
  args: {
    page: defaultPage,
    isHovered: true,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * Modal page type
 */
export const ModalPage: Story = {
  args: {
    page: {
      ...defaultPage,
      type: 'modal',
      name: 'Confirmation Modal',
      width: 600,
      height: 400,
    },
    isCurrent: true,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * Drawer page type
 */
export const DrawerPage: Story = {
  args: {
    page: {
      ...defaultPage,
      type: 'drawer',
      name: 'Settings Drawer',
      width: 400,
      height: 800,
    },
    isCurrent: true,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * With elements
 */
export const WithElements: Story = {
  args: {
    page: {
      ...defaultPage,
      elements: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ] as any,
    },
    isCurrent: true,
    zoom: 1,
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame {...args} />
    </div>
  ),
};

/**
 * Different zoom levels
 */
export const ZoomLevels: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 0.25x (minimal details)</p>
        <div className="h-64 w-full relative bg-background border">
          <PageFrame page={defaultPage} isCurrent zoom={0.25} />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 0.75x (with header)</p>
        <div className="h-96 w-full relative bg-background border">
          <PageFrame page={defaultPage} isCurrent zoom={0.75} />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Zoom: 1.5x (with dimensions)</p>
        <div className="h-screen w-full relative bg-background border">
          <PageFrame page={defaultPage} isCurrent zoom={1.5} />
        </div>
      </div>
    </div>
  ),
};

/**
 * All page types
 */
export const AllPageTypes: Story = {
  render: () => {
    const pages: Page[] = [
      {
        ...defaultPage,
        id: 'p1',
        name: 'Main Page',
        type: 'default',
        x: 100,
        y: 100,
      },
      {
        ...defaultPage,
        id: 'p2',
        name: 'Confirmation Modal',
        type: 'modal',
        x: 100,
        y: 1000,
        width: 600,
        height: 400,
      },
      {
        ...defaultPage,
        id: 'p3',
        name: 'Settings Drawer',
        type: 'drawer',
        x: 100,
        y: 1500,
        width: 400,
        height: 800,
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        {pages.map(page => (
          <PageFrame key={page.id} page={page} isCurrent={page.id === 'p1'} />
        ))}
      </div>
    );
  },
};

/**
 * Interactive selection
 */
export const Interactive: Story = {
  render: () => {
    const [currentId, setCurrentId] = useState('p1');

    const pages: Page[] = [
      {
        ...defaultPage,
        id: 'p1',
        name: 'Page 1',
        x: 100,
        y: 100,
      },
      {
        ...defaultPage,
        id: 'p2',
        name: 'Page 2',
        x: 1400,
        y: 100,
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border">
        {pages.map(page => (
          <PageFrame
            key={page.id}
            page={page}
            isCurrent={currentId === page.id}
            onClick={() => setCurrentId(page.id)}
          />
        ))}
        <div className="absolute top-4 left-4 bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold mb-2">Interactive Pages</p>
          <p className="text-xs text-muted-foreground">Click to switch pages</p>
          <p className="text-xs mt-2">Current: {currentId}</p>
        </div>
      </div>
    );
  },
};

/**
 * Multiple pages (multi-page tool)
 */
export const MultiPageTool: Story = {
  render: () => {
    const pages: Page[] = [
      {
        ...defaultPage,
        id: 'p1',
        name: 'Welcome',
        x: 100,
        y: 100,
        elements: [{ id: '1' }, { id: '2' }] as any,
      },
      {
        ...defaultPage,
        id: 'p2',
        name: 'Form',
        x: 1400,
        y: 100,
        elements: [{ id: '3' }, { id: '4' }, { id: '5' }] as any,
      },
      {
        ...defaultPage,
        id: 'p3',
        name: 'Results',
        x: 2700,
        y: 100,
        elements: [{ id: '6' }] as any,
      },
      {
        ...defaultPage,
        id: 'p4',
        name: 'Error Modal',
        type: 'modal',
        x: 1400,
        y: 1000,
        width: 600,
        height: 400,
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        {pages.map(page => (
          <PageFrame
            key={page.id}
            page={page}
            isCurrent={page.id === 'p1'}
          />
        ))}
      </div>
    );
  },
};

/**
 * Different sizes
 */
export const PageSizes: Story = {
  render: () => {
    const pages: Page[] = [
      {
        ...defaultPage,
        id: 'small',
        name: 'Small (400×300)',
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      },
      {
        ...defaultPage,
        id: 'medium',
        name: 'Medium (800×600)',
        x: 600,
        y: 100,
        width: 800,
        height: 600,
      },
      {
        ...defaultPage,
        id: 'large',
        name: 'Large (1200×900)',
        x: 100,
        y: 800,
        width: 1200,
        height: 900,
      },
    ];

    return (
      <div className="h-screen w-full relative bg-background border overflow-auto">
        {pages.map(page => (
          <PageFrame key={page.id} page={page} isCurrent />
        ))}
      </div>
    );
  },
};

/**
 * Empty page vs full page
 */
export const EmptyVsFull: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      <PageFrame
        page={{
          ...defaultPage,
          name: 'Empty Page',
          x: 100,
          y: 100,
          elements: [],
        }}
        isCurrent
      />
      <PageFrame
        page={{
          ...defaultPage,
          name: 'Full Page',
          x: 1400,
          y: 100,
          elements: Array(12).fill(null).map((_, i) => ({ id: `el-${i}` })) as any,
        }}
      />
    </div>
  ),
};
