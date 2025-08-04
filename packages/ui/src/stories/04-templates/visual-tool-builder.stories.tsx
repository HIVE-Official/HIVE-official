import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { VisualToolBuilder } from '../../components/creators/visual-tool-builder';

/**
 * # VisualToolBuilder - Drag & Drop Tool Creation
 * 
 * The VisualToolBuilder is a comprehensive drag-and-drop interface for creating
 * campus tools without coding. It provides a visual canvas with element library.
 * 
 * ## Social Media Features
 * - Tool sharing and collaboration
 * - Community templates and elements
 * - Creator showcases and portfolios
 * - Real-time collaboration
 * 
 * ## Utility Features  
 * - Visual drag & drop interface
 * - Element library and components
 * - Live preview and testing
 * - Export and deployment
 * 
 * ## Campus Integration
 * Designed for students to create and share useful campus tools
 * without technical barriers, fostering innovation and community building.
 */

const mockElements = [
  {
    id: 'text-input',
    type: 'input',
    name: 'Text Input',
    category: 'form',
    properties: {
      placeholder: 'Enter text...',
      required: false,
      label: 'Text Input'
    }
  },
  {
    id: 'button',
    type: 'button', 
    name: 'Button',
    category: 'action',
    properties: {
      text: 'Click Me',
      variant: 'primary',
      size: 'default'
    }
  },
  {
    id: 'calculator',
    type: 'widget',
    name: 'Calculator',
    category: 'utility',
    properties: {
      operations: ['add', 'subtract', 'multiply', 'divide'],
      precision: 2
    }
  },
  {
    id: 'text-display',
    type: 'display',
    name: 'Text Display',
    category: 'output',
    properties: {
      text: 'Result will appear here',
      size: 'large',
      color: 'primary'
    }
  }
];

const mockTool = {
  id: 'new-tool',
  name: 'My Campus Tool',
  description: 'A tool I\'m building for campus',
  elements: [],
  canvas: {
    width: 800,
    height: 600,
    zoom: 1,
    gridSize: 10
  }
};

const meta: Meta<typeof VisualToolBuilder> = {
  title: '04-Templates/VisualToolBuilder',
  component: VisualToolBuilder,
  parameters: {
    docs: {
      description: {
        component: `
# VisualToolBuilder - Campus Tool Creation

This template component provides comprehensive visual tool building:

## Builder Features
- Drag & drop element placement
- Visual canvas with grid system
- Element library and categories
- Property configuration panels
- Live preview and testing

## Social Integration
- Tool sharing and collaboration
- Community element library
- Creator portfolios
- Template marketplace

## Technical Features
- Real-time canvas updates
- Element property binding
- Export and deployment
- Version control integration
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    tool: {
      description: 'Tool configuration object'
    },
    elements: {
      description: 'Available element library'
    },
    onSave: { action: 'tool-saved' },
    onPreview: { action: 'tool-previewed' },
    onElementAdd: { action: 'element-added' },
    onElementUpdate: { action: 'element-updated' }
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-[var(--hive-background-primary)]">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Full builder interface
export const Default: Story = {
  args: {
    tool: mockTool,
    elements: mockElements
  }
};

// 2. PLAYGROUND STORY - Interactive building
export const Playground: Story = {
  args: {
    tool: {
      ...mockTool,
      name: 'GPA Calculator',
      description: 'Calculate your semester GPA'
    },
    elements: mockElements
  }
};

// 3. ELEMENT LIBRARY STORY - Available building blocks
export const ElementLibrary: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Element Library
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Drag these elements onto your canvas to build tools
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockElements.map((element) => (
          <div
            key={element.id}
            className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-lg cursor-move hover:border-[var(--hive-brand-primary)] hover:shadow-lg transition-all group"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-[var(--hive-brand-primary)]/10 rounded-lg flex items-center justify-center group-hover:bg-[var(--hive-brand-primary)]/20 transition-colors">
                <span className="text-xl">
                  {element.type === 'input' && '📝'}
                  {element.type === 'button' && '🔘'}
                  {element.type === 'widget' && '🔧'}
                  {element.type === 'display' && '📄'}
                </span>
              </div>
              <h3 className="font-medium text-[var(--hive-text-primary)] text-sm">
                {element.name}
              </h3>
              <p className="text-xs text-[var(--hive-text-secondary)] capitalize">
                {element.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

// 4. CANVAS WORKSPACE STORY - Building area
export const CanvasWorkspace: Story = {
  render: () => (
    <div className="h-96 bg-[var(--hive-background-secondary)] border-2 border-dashed border-[var(--hive-border-subtle)] rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />
      
      <div className="text-center space-y-4 z-10">
        <div className="w-16 h-16 mx-auto bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">🎨</span>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--hive-text-primary)]">
            Canvas Workspace
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Drag elements here to build your tool
          </p>
        </div>
        
        {/* Sample placed elements */}
        <div className="absolute top-8 left-8 p-3 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg shadow-sm">
          <input 
            type="text" 
            placeholder="Course Name"
            className="px-2 py-1 text-sm bg-transparent border-none outline-none text-[var(--hive-text-primary)]"
            readOnly
          />
        </div>
        
        <div className="absolute top-20 left-8">
          <button className="px-3 py-1.5 bg-[var(--hive-brand-primary)] text-white text-sm rounded-md">
            Calculate
          </button>
        </div>
        
        <div className="absolute top-8 right-8 p-3 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg shadow-sm">
          <div className="text-sm text-[var(--hive-text-primary)]">
            Your GPA: <span className="font-semibold">3.85</span>
          </div>
        </div>
      </div>
    </div>
  )
};

// 5. PROPERTY PANEL STORY - Element configuration
export const PropertyPanel: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2">
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">
          Canvas Preview
        </h3>
        <div className="h-64 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-lg flex items-center justify-center">
          <div className="p-4 bg-[var(--hive-background-primary)] border-2 border-[var(--hive-brand-primary)] rounded-lg">
            <input 
              type="text" 
              placeholder="Enter your course name"
              className="px-3 py-2 border border-[var(--hive-border-subtle)] rounded-md text-[var(--hive-text-primary)] bg-transparent"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">
          Properties Panel
        </h3>
        <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-lg p-4 space-y-4">
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
              Text Input Properties
            </h4>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
              Label
            </label>
            <input 
              type="text" 
              value="Course Name"
              className="w-full px-2 py-1 text-sm bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded text-[var(--hive-text-primary)]"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
              Placeholder
            </label>
            <input 
              type="text" 
              value="Enter your course name"
              className="w-full px-2 py-1 text-sm bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded text-[var(--hive-text-primary)]"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="required" className="rounded" />
            <label htmlFor="required" className="text-sm text-[var(--hive-text-primary)]">
              Required field
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
              Width
            </label>
            <select className="w-full px-2 py-1 text-sm bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded text-[var(--hive-text-primary)]">
              <option>Auto</option>
              <option>Full Width</option>
              <option>Fixed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. BUILDER TOOLBAR STORY - Tool creation controls
export const BuilderToolbar: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Builder Toolbar
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Controls for creating and managing your tools
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
                <span className="text-lg">↶</span>
              </button>
              <button className="p-2 hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
                <span className="text-lg">↷</span>
              </button>
            </div>
            
            <div className="h-6 w-px bg-[var(--hive-border-subtle)]" />
            
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm bg-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-primary)] hover:text-white rounded-md transition-colors">
                Select
              </button>
              <button className="px-3 py-1.5 text-sm hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
                Pan
              </button>
            </div>
            
            <div className="h-6 w-px bg-[var(--hive-border-subtle)]" />
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
                <span className="text-sm">−</span>
              </button>
              <span className="text-sm text-[var(--hive-text-secondary)]">100%</span>
              <button className="p-2 hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
                <span className="text-sm">+</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-[var(--hive-border-subtle)] hover:bg-[var(--hive-background-primary)] rounded-md transition-colors">
              Preview
            </button>
            <button className="px-3 py-1.5 text-sm bg-[var(--hive-brand-primary)] text-white hover:bg-[var(--hive-brand-hover)] rounded-md transition-colors">
              Save Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};