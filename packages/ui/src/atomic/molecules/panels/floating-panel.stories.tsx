import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FloatingPanel } from './floating-panel';
import { Button } from '../../atoms/button';

/**
 * # Floating Panel
 *
 * Draggable, collapsible, dockable panel for HiveLab builder interface.
 * Used for element library, properties panel, layers panel, and other tools.
 *
 * ## Features
 * - Collapse/expand with chevron button
 * - Maximize/minimize (fullscreen toggle)
 * - Close button (optional)
 * - Drag to reposition (optional)
 * - Resize handle (optional)
 * - Dockable to left/right/top/bottom
 * - Backdrop blur for glassmorphism
 * - Keyboard shortcuts support
 *
 * ## Usage
 * ```tsx
 * <FloatingPanel
 *   title="Element Library"
 *   initialPosition="left"
 *   initialWidth={320}
 *   collapsible
 *   resizable
 * >
 *   <div className="p-4">Panel content...</div>
 * </FloatingPanel>
 * ```
 */
const meta = {
  title: '05-HiveLab/Panels/FloatingPanel',
  component: FloatingPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default panel (left side)
 */
export const Default: Story = {
  args: {
    title: 'Panel',
    children: (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Panel content goes here</p>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * Element Library panel (left, wide)
 */
export const ElementLibrary: Story = {
  args: {
    title: 'Element Library',
    initialPosition: 'left',
    initialWidth: 320,
    collapsible: true,
    resizable: true,
    children: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase">Triggers</h4>
          <div className="space-y-1">
            <div className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80">
              ▶️ Button Click
            </div>
            <div className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80">
              📅 Schedule
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase">Collectors</h4>
          <div className="space-y-1">
            <div className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80">
              📝 Text Input
            </div>
            <div className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80">
              🔘 Choice
            </div>
          </div>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * Properties panel (right side)
 */
export const PropertiesPanel: Story = {
  args: {
    title: 'Properties',
    initialPosition: 'right',
    initialWidth: 360,
    collapsible: true,
    resizable: true,
    children: (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Element Name</label>
          <input
            type="text"
            defaultValue="Button Click"
            className="w-full px-3 py-2 bg-background border rounded-md text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium">Label</label>
          <input
            type="text"
            defaultValue="Click Me"
            className="w-full px-3 py-2 bg-background border rounded-md text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium">Description</label>
          <textarea
            defaultValue="Triggers when button is clicked"
            className="w-full px-3 py-2 bg-background border rounded-md text-sm resize-none"
            rows={3}
          />
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <div className="absolute right-0 top-0 bottom-0">
        <FloatingPanel {...args} />
      </div>
    </div>
  ),
};

/**
 * Collapsed state
 */
export const Collapsed: Story = {
  args: {
    title: 'Element Library',
    defaultCollapsed: true,
    collapsible: true,
    children: (
      <div className="p-4">
        <p className="text-sm">Hidden content</p>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * Maximized state
 */
export const Maximized: Story = {
  render: () => {
    const [isMaximized, setIsMaximized] = useState(true);

    return (
      <div className="h-screen w-full relative bg-background border">
        {isMaximized && (
          <FloatingPanel
            title="Maximized Panel"
            initialPosition="left"
            resizable
            className="fixed inset-4 z-50"
            onClose={() => setIsMaximized(false)}
          >
            <div className="p-4">
              <p className="text-sm mb-4">This panel is maximized to fullscreen</p>
              <Button onClick={() => setIsMaximized(false)}>Close</Button>
            </div>
          </FloatingPanel>
        )}
      </div>
    );
  },
};

/**
 * All positions
 */
export const AllPositions: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border">
      {/* Left */}
      <FloatingPanel
        title="Left Panel"
        initialPosition="left"
        initialWidth={280}
        className="absolute left-4 top-4 bottom-4"
      >
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Left-docked panel</p>
        </div>
      </FloatingPanel>

      {/* Right */}
      <FloatingPanel
        title="Right Panel"
        initialPosition="right"
        initialWidth={280}
        className="absolute right-4 top-4 bottom-4"
      >
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Right-docked panel</p>
        </div>
      </FloatingPanel>

      {/* Top */}
      <FloatingPanel
        title="Top Panel"
        initialPosition="top"
        initialHeight={200}
        className="absolute left-[300px] right-[300px] top-4"
      >
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Top-docked panel</p>
        </div>
      </FloatingPanel>

      {/* Bottom */}
      <FloatingPanel
        title="Bottom Panel"
        initialPosition="bottom"
        initialHeight={200}
        className="absolute left-[300px] right-[300px] bottom-4"
      >
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Bottom-docked panel</p>
        </div>
      </FloatingPanel>
    </div>
  ),
};

/**
 * Interactive collapse/expand
 */
export const Interactive: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <div className="h-screen w-full relative bg-background border">
        <FloatingPanel
          title="Interactive Panel"
          initialWidth={320}
          collapsible
          onCollapseChange={setCollapsed}
        >
          <div className="p-4 space-y-4">
            <p className="text-sm">Click the chevron to collapse this panel.</p>
            <p className="text-xs text-muted-foreground">
              Current state: {collapsed ? 'Collapsed' : 'Expanded'}
            </p>
          </div>
        </FloatingPanel>

        <div className="absolute top-4 left-[360px] bg-background/90 px-4 py-3 rounded-md border">
          <p className="text-sm font-semibold mb-2">Panel State</p>
          <p className="text-xs">{collapsed ? 'Collapsed ⬆️' : 'Expanded ⬇️'}</p>
        </div>
      </div>
    );
  },
};

/**
 * With close button
 */
export const WithClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-screen w-full relative bg-background border">
        {isOpen && (
          <FloatingPanel
            title="Closable Panel"
            initialWidth={320}
            closable
            onClose={() => setIsOpen(false)}
          >
            <div className="p-4">
              <p className="text-sm">Click the X to close this panel</p>
            </div>
          </FloatingPanel>
        )}

        {!isOpen && (
          <div className="absolute top-4 left-4">
            <Button onClick={() => setIsOpen(true)}>Reopen Panel</Button>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Non-collapsible
 */
export const NonCollapsible: Story = {
  args: {
    title: 'Fixed Panel',
    collapsible: false,
    closable: false,
    children: (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          This panel cannot be collapsed or closed
        </p>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * Draggable panel
 */
export const Draggable: Story = {
  args: {
    title: 'Draggable Panel',
    draggable: true,
    initialWidth: 320,
    children: (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Drag the header to reposition this panel
        </p>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <div className="absolute left-20 top-20">
        <FloatingPanel {...args} />
      </div>
    </div>
  ),
};

/**
 * Different widths
 */
export const DifferentWidths: Story = {
  render: () => (
    <div className="h-screen w-full relative bg-background border flex gap-4 p-4">
      <FloatingPanel title="Narrow (240px)" initialWidth={240}>
        <div className="p-4">
          <p className="text-sm">Narrow panel</p>
        </div>
      </FloatingPanel>

      <FloatingPanel title="Medium (320px)" initialWidth={320}>
        <div className="p-4">
          <p className="text-sm">Medium panel</p>
        </div>
      </FloatingPanel>

      <FloatingPanel title="Wide (400px)" initialWidth={400}>
        <div className="p-4">
          <p className="text-sm">Wide panel</p>
        </div>
      </FloatingPanel>
    </div>
  ),
};

/**
 * Scrollable content
 */
export const ScrollableContent: Story = {
  args: {
    title: 'Long Content',
    initialWidth: 320,
    children: (
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-3 bg-muted rounded">
            <p className="text-sm font-medium">Item {i + 1}</p>
            <p className="text-xs text-muted-foreground">
              This is item number {i + 1} in the list
            </p>
          </div>
        ))}
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * With search and filters
 */
export const WithFilters: Story = {
  args: {
    title: 'Element Library',
    initialWidth: 360,
    collapsible: true,
    resizable: true,
    children: (
      <div className="space-y-4">
        <div className="p-4 pb-0">
          <input
            type="text"
            placeholder="Search elements..."
            className="w-full px-3 py-2 bg-background border rounded-md text-sm"
          />
        </div>
        <div className="px-4">
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
              All
            </button>
            <button className="px-2 py-1 bg-muted rounded text-xs">Triggers</button>
            <button className="px-2 py-1 bg-muted rounded text-xs">Actions</button>
          </div>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {['Button Click', 'Schedule', 'Text Input', 'Send Email'].map(item => (
            <div key={item} className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80">
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <FloatingPanel {...args} />
    </div>
  ),
};

/**
 * Layers panel example
 */
export const LayersPanel: Story = {
  args: {
    title: 'Layers',
    initialPosition: 'right',
    initialWidth: 280,
    collapsible: true,
    children: (
      <div className="p-3 space-y-1">
        <div className="px-2 py-1.5 bg-primary/10 border border-primary/20 rounded text-sm flex items-center gap-2">
          <span>👁️</span>
          <span>Button Click</span>
        </div>
        <div className="px-2 py-1.5 hover:bg-muted rounded text-sm flex items-center gap-2 cursor-pointer">
          <span>👁️</span>
          <span>Text Input</span>
        </div>
        <div className="px-2 py-1.5 hover:bg-muted rounded text-sm flex items-center gap-2 cursor-pointer">
          <span>👁️</span>
          <span>Send Email</span>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-screen w-full relative bg-background border">
      <div className="absolute right-4 top-4 bottom-4">
        <FloatingPanel {...args} />
      </div>
    </div>
  ),
};
