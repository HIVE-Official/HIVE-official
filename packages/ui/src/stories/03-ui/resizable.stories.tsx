import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: '03-UI/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Resizable panel system for flexible layouts**

Advanced resizable panel components for creating flexible, user-customizable layouts. Perfect for Builder interfaces, Space layouts, and content organization.

## When to Use
- HiveLAB tool builder interface (canvas, library, properties)
- Space multi-surface layouts
- Dashboard with customizable sections
- Content viewing with adjustable sidebars

## Design Principles
- **Intuitive Interaction**: Clear resize handles with hover feedback
- **Smooth Motion**: Liquid metal physics for panel transitions
- **Visual Consistency**: HIVE's matte obsidian glass aesthetic
- **Productive Layouts**: Optimized for campus work and creation flows

## Panel Features
- **Flexible Sizing**: Percentage-based or fixed dimensions
- **Minimum/Maximum Constraints**: Prevent panels from becoming unusable
- **Nested Panels**: Complex layouts with multiple levels
- **Persistence**: Save user's preferred layout configurations

## Accessibility
- WCAG 2.1 AA compliant resize interactions
- Keyboard navigation for panel resizing
- Screen reader friendly panel labeling
- Clear visual feedback for resize operations
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Panel group orientation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalPanels: Story = {
  render: () => (
    <div className="h-96 w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full border border-hive-border rounded-lg">
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <div className="p-6 h-full bg-hive-background-card">
            <h3 className="font-semibold mb-2">Left Panel</h3>
            <p className="text-sm text-hive-foreground-muted">
              This panel can be resized horizontally. It has a minimum size of 15% and maximum of 40%.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="p-6 h-full">
            <h3 className="font-semibold mb-2">Main Content</h3>
            <p className="text-sm text-hive-foreground-muted">
              This is the main content area that takes up the remaining space. 
              Drag the handle to the left to resize both panels.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export const VerticalPanels: Story = {
  render: () => (
    <div className="h-96 w-full">
      <ResizablePanelGroup direction="vertical" className="h-full border border-hive-border rounded-lg">
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="p-6 h-full bg-hive-background-card">
            <h3 className="font-semibold mb-2">Top Panel</h3>
            <p className="text-sm text-hive-foreground-muted">
              Resize vertically by dragging the handle below.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <div className="p-6 h-full">
            <h3 className="font-semibold mb-2">Bottom Panel</h3>
            <p className="text-sm text-hive-foreground-muted">
              This panel takes up the remaining vertical space.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export const NestedPanels: Story = {
  render: () => (
    <div className="h-96 w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full border border-hive-border rounded-lg">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="p-4 h-full bg-hive-background-card">
            <h4 className="font-semibold mb-2">Sidebar</h4>
            <div className="space-y-2">
              <div className="p-2 bg-hive-background-muted rounded text-sm">Navigation</div>
              <div className="p-2 bg-hive-background-muted rounded text-sm">Tools</div>
              <div className="p-2 bg-hive-background-muted rounded text-sm">Settings</div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="p-4 h-full">
                <h4 className="font-semibold mb-2">Main Content</h4>
                <p className="text-sm text-hive-foreground-muted">
                  This is the main content area with nested vertical panels.
                </p>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="p-4 h-full bg-hive-background-card">
                <h4 className="font-semibold mb-2">Bottom Panel</h4>
                <p className="text-sm text-hive-foreground-muted">
                  Console, logs, or additional tools can go here.
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export const HiveLabLayout: Story = {
  render: () => (
    <div className="h-96 w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full border border-hive-border rounded-lg">
        {/* Element Library */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="p-4 h-full bg-hive-background-card border-r border-hive-border">
            <h4 className="font-semibold mb-3 text-sm">Element Library</h4>
            <div className="space-y-2">
              {['Timer ⏰', 'Chart 📊', 'Form 📋', 'Note 📝'].map((element, i) => (
                <div key={i} className="p-2 bg-hive-background-muted rounded text-xs cursor-grab hover:bg-hive-background-subtle transition-colors">
                  {element}
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        
        {/* Main Canvas Area */}
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            {/* Canvas */}
            <ResizablePanel defaultSize={75}>
              <div className="p-4 h-full relative">
                <div className="absolute top-2 left-4 right-4 flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Tool Canvas</h4>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-hive-background-card border border-hive-border rounded">
                      Preview
                    </button>
                    <button className="px-2 py-1 text-xs bg-hive-accent text-black rounded">
                      Save
                    </button>
                  </div>
                </div>
                <div className="mt-8 h-full border-2 border-dashed border-hive-border rounded-lg flex items-center justify-center">
                  <div className="text-center text-hive-foreground-muted">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm">Drag elements here to build your tool</div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            
            {/* Preview Area */}
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="p-4 h-full bg-hive-background-card border-t border-hive-border">
                <h4 className="font-semibold mb-2 text-sm">Live Preview</h4>
                <div className="h-full bg-white rounded border text-black text-xs p-2">
                  Tool preview would appear here...
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        
        {/* Properties Panel */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="p-4 h-full bg-hive-background-card border-l border-hive-border">
            <h4 className="font-semibold mb-3 text-sm">Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-hive-foreground-muted">Tool Name</label>
                <input className="w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded" 
                       placeholder="My Tool" />
              </div>
              <div>
                <label className="text-xs text-hive-foreground-muted">Description</label>
                <textarea className="w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded h-16" 
                          placeholder="Tool description..." />
              </div>
              <div>
                <label className="text-xs text-hive-foreground-muted">Category</label>
                <select className="w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded">
                  <option>Productivity</option>
                  <option>Academic</option>
                  <option>Social</option>
                </select>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export const SpaceLayout: Story = {
  render: () => (
    <div className="h-96 w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full border border-hive-border rounded-lg">
        {/* Space Navigation */}
        <ResizablePanel defaultSize={15} minSize={12} maxSize={25}>
          <div className="p-3 h-full bg-hive-background-card border-r border-hive-border">
            <h4 className="font-semibold mb-3 text-sm">Surfaces</h4>
            <div className="space-y-1">
              {['Pinned 📌', 'Posts 📝', 'Events 📅', 'Tools 🔧', 'Chat 💬', 'Members 👥'].map((surface, i) => (
                <div key={i} className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                  i === 1 ? 'bg-hive-accent text-black' : 'hover:bg-hive-background-muted'
                }`}>
                  {surface}
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        
        {/* Main Content */}
        <ResizablePanel defaultSize={65}>
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Posts Surface</h4>
              <button className="px-3 py-1 text-xs bg-hive-accent text-black rounded">
                New Post
              </button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 bg-hive-background-card border border-hive-border rounded">
                  <div className="text-sm font-medium mb-1">Post Title {i}</div>
                  <div className="text-xs text-hive-foreground-muted">
                    Posted 2 hours ago by Student Name
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        
        {/* Chat Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="p-3 h-full bg-hive-background-card border-l border-hive-border">
            <h4 className="font-semibold mb-3 text-sm">Live Chat</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-hive-background-muted rounded">
                <div className="font-medium">Alice:</div>
                <div>Anyone working on the algorithms assignment?</div>
              </div>
              <div className="p-2 bg-hive-background-muted rounded">
                <div className="font-medium">Bob:</div>
                <div>Yes! Check out my study timer tool</div>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 left-3">
              <input className="w-full p-2 text-xs bg-hive-background border border-hive-border rounded" 
                     placeholder="Type a message..." />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
};

export const ResponsiveLayout: Story = {
  render: () => {
    const [isMobile, setIsMobile] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobile(false)}
            className={`px-3 py-1 text-sm rounded ${!isMobile ? 'bg-hive-accent text-black' : 'bg-hive-background-card border border-hive-border'}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setIsMobile(true)}
            className={`px-3 py-1 text-sm rounded ${isMobile ? 'bg-hive-accent text-black' : 'bg-hive-background-card border border-hive-border'}`}
          >
            Mobile
          </button>
        </div>
        
        <div className={`h-96 ${isMobile ? 'max-w-sm' : 'w-full'}`}>
          {isMobile ? (
            <div className="h-full border border-hive-border rounded-lg">
              <div className="p-4 h-full">
                <h4 className="font-semibold mb-2">Mobile Layout</h4>
                <p className="text-sm text-hive-foreground-muted">
                  On mobile, panels stack vertically instead of being resizable horizontally.
                </p>
              </div>
            </div>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="h-full border border-hive-border rounded-lg">
              <ResizablePanel defaultSize={30}>
                <div className="p-4 h-full bg-hive-background-card">
                  <h4 className="font-semibold mb-2">Sidebar</h4>
                  <p className="text-sm text-hive-foreground-muted">
                    Desktop layout with resizable panels.
                  </p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold mb-2">Main Content</h4>
                  <p className="text-sm text-hive-foreground-muted">
                    Switch to mobile to see the responsive behavior.
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </div>
    );
  }
};