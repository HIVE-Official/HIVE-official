import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { VisualToolBuilder } from '../../components/builders/visual-tool-builder';

const meta: Meta<typeof VisualToolBuilder> = {
  title: '10-Creator/Visual Tool Builder',
  component: VisualToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Visual tool creation interface for HiveLAB**

The primary visual tool building interface where students drag and drop Elements to create tools. Features magnetic interactions, real-time preview, and sophisticated tool assembly workflows.

## When to Use
- Primary tool creation interface in HiveLAB
- Visual tool composition and assembly
- Element-based tool building
- Interactive tool prototyping

## Design Principles
- **Magnetic Assembly**: Elements snap together with liquid metal physics
- **Visual Feedback**: Real-time preview and validation
- **Builder Empowerment**: Interface makes students feel like powerful creators
- **Tool-First UX**: Everything optimized for tool creation workflow

## Key Features
- **Element Library**: Drag-and-drop component palette
- **Visual Canvas**: Interactive tool assembly area
- **Property Panel**: Dynamic configuration for selected elements
- **Preview Mode**: Real-time tool testing and validation
- **Save/Fork System**: Tool versioning and sharing

## Builder Workflow
1. **Element Selection**: Choose from weekly-updated Element library
2. **Visual Assembly**: Drag elements to canvas with magnetic snapping
3. **Configuration**: Customize element properties and connections
4. **Preview**: Test tool functionality in real-time
5. **Publish**: Share with Space or make public

## Accessibility
- WCAG 2.1 AA compliant drag-and-drop interface
- Keyboard navigation for element selection and placement
- Screen reader friendly tool assembly descriptions
- Clear focus management throughout builder workflow
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['create', 'edit', 'fork', 'preview'],
      description: 'Builder mode for different tool creation contexts'
    },
    showElementLibrary: {
      control: 'boolean',
      description: 'Display the element library panel'
    },
    showPropertyPanel: {
      control: 'boolean',
      description: 'Display the property configuration panel'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const elementLibrary = [
  {
    id: 'timer',
    name: 'Timer Element',
    category: 'Interactive',
    icon: '⏰',
    description: 'Countdown timer with customizable duration and alerts',
    version: '2.1',
    popularity: 'High',
    properties: ['duration', 'alertSound', 'autoStart', 'showProgress']
  },
  {
    id: 'calculator',
    name: 'Calculator Element',
    category: 'Utilities',
    icon: '🧮',
    description: 'Mathematical calculator with custom functions',
    version: '3.0',
    popularity: 'High',
    properties: ['operations', 'memory', 'history', 'precision']
  },
  {
    id: 'chart',
    name: 'Chart Element',
    category: 'Data',
    icon: '📊',
    description: 'Data visualization with multiple chart types',
    version: '1.8',
    popularity: 'Medium',
    properties: ['chartType', 'dataSource', 'colors', 'animations']
  },
  {
    id: 'form',
    name: 'Form Element',
    category: 'Input',
    icon: '📋',
    description: 'Custom form builder with validation',
    version: '2.5',
    popularity: 'High',
    properties: ['fields', 'validation', 'submission', 'styling']
  },
  {
    id: 'note',
    name: 'Note Element',
    category: 'Content',
    icon: '📝',
    description: 'Rich text editor with markdown support',
    version: '1.9',
    popularity: 'Medium',
    properties: ['formatting', 'autosave', 'collaboration', 'export']
  },
  {
    id: 'media',
    name: 'Media Element',
    category: 'Content',
    icon: '🎬',
    description: 'Video and audio player with controls',
    version: '1.4',
    popularity: 'Low',
    properties: ['controls', 'playlist', 'captions', 'quality']
  }
];

const sampleTool = {
  id: 'study-timer-pro',
  name: 'Study Timer Pro',
  description: 'Advanced pomodoro timer with analytics and progress tracking',
  elements: [
    {
      id: 'main-timer',
      type: 'timer',
      position: { x: 100, y: 100 },
      properties: {
        duration: 1500000, // 25 minutes
        alertSound: 'chime',
        autoStart: false,
        showProgress: true
      }
    },
    {
      id: 'progress-chart',
      type: 'chart',
      position: { x: 300, y: 100 },
      properties: {
        chartType: 'line',
        dataSource: 'timer-sessions',
        colors: ['#FFD700', '#FFA500'],
        animations: true
      }
    },
    {
      id: 'session-notes',
      type: 'note',
      position: { x: 100, y: 300 },
      properties: {
        formatting: 'markdown',
        autosave: true,
        collaboration: false,
        export: 'pdf'
      }
    }
  ]
};

export const CreateMode: Story = {
  args: {
    mode: 'create',
    elementLibrary,
    showElementLibrary: true,
    showPropertyPanel: true
  }
};

export const EditMode: Story = {
  args: {
    mode: 'edit',
    tool: sampleTool,
    elementLibrary,
    showElementLibrary: true,
    showPropertyPanel: true
  }
};

export const PreviewMode: Story = {
  args: {
    mode: 'preview',
    tool: sampleTool,
    elementLibrary,
    showElementLibrary: false,
    showPropertyPanel: false,
    readonly: true
  }
};

export const ForkMode: Story = {
  args: {
    mode: 'fork',
    tool: {
      ...sampleTool,
      originalAuthor: 'Sarah Chen',
      originalTool: 'Study Timer Basic'
    },
    elementLibrary,
    showElementLibrary: true,
    showPropertyPanel: true,
    showForkInfo: true
  }
};

export const ElementLibraryFocus: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Interactive', 'Utilities', 'Data', 'Input', 'Content'];
    
    const filteredElements = elementLibrary.filter(element => {
      const matchesCategory = selectedCategory === 'All' || element.category === selectedCategory;
      const matchesSearch = element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           element.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div className="h-96 border border-hive-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-hive-border bg-hive-background-muted">
          <h3 className="font-semibold mb-3">Element Library</h3>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Search elements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-hive-background-card border border-hive-border rounded text-sm"
            />
            
            <div className="flex flex-wrap gap-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-hive-accent text-black'
                      : 'bg-hive-background-card border border-hive-border text-hive-foreground-muted hover:text-hive-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3 overflow-y-auto h-full">
          {filteredElements.map(element => (
            <div
              key={element.id}
              className="p-3 bg-hive-background-card border border-hive-border rounded-lg cursor-grab hover:border-hive-accent transition-colors"
              draggable
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{element.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium text-sm">{element.name}</div>
                    <div className="text-xs bg-hive-background-muted px-2 py-0.5 rounded">
                      v{element.version}
                    </div>
                  </div>
                  <div className="text-xs text-hive-foreground-muted mb-2">
                    {element.description}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-hive-foreground-muted">
                      {element.category}
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded ${
                      element.popularity === 'High' ? 'bg-green-100 text-green-800' :
                      element.popularity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {element.popularity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export const CanvasInterface: Story = {
  render: () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [canvasElements, setCanvasElements] = useState(sampleTool.elements);

    return (
      <div className="grid grid-cols-4 h-96 border border-hive-border rounded-lg overflow-hidden">
        {/* Element Library - Narrow */}
        <div className="border-r border-hive-border bg-hive-background-muted p-3">
          <h4 className="font-semibold text-sm mb-3">Elements</h4>
          <div className="space-y-2">
            {elementLibrary.slice(0, 4).map(element => (
              <div
                key={element.id}
                className="p-2 bg-hive-background-card border border-hive-border rounded cursor-grab text-center"
                draggable
              >
                <div className="text-lg mb-1">{element.icon}</div>
                <div className="text-xs">{element.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Canvas - Main Area */}
        <div className="col-span-2 relative bg-hive-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="border border-hive-border"></div>
              ))}
            </div>
          </div>
          
          <div className="relative h-full p-4">
            <div className="text-center text-hive-foreground-muted mb-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm">Drag elements here to build your tool</div>
            </div>
            
            {canvasElements.map(element => (
              <div
                key={element.id}
                className={`absolute p-3 bg-hive-background-card border-2 rounded-lg cursor-move ${
                  selectedElement?.id === element.id ? 'border-hive-accent' : 'border-hive-border'
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: '120px'
                }}
                onClick={() => setSelectedElement(element)}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">
                    {elementLibrary.find(e => e.id === element.type)?.icon}
                  </div>
                  <div className="text-xs font-medium">
                    {elementLibrary.find(e => e.id === element.type)?.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Panel */}
        <div className="border-l border-hive-border bg-hive-background-muted p-3">
          <h4 className="font-semibold text-sm mb-3">Properties</h4>
          {selectedElement ? (
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium mb-1">Element Type</div>
                <div className="text-xs text-hive-foreground-muted">
                  {elementLibrary.find(e => e.id === selectedElement.type)?.name}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium mb-2">Configuration</div>
                <div className="space-y-2">
                  {Object.entries(selectedElement.properties).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-hive-foreground-muted capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={typeof value === 'boolean' ? value.toString() : value}
                        className="w-full mt-1 p-1 text-xs bg-hive-background-card border border-hive-border rounded"
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-hive-foreground-muted">
              Select an element to configure properties
            </div>
          )}
        </div>
      </div>
    );
  }
};

export const ToolPreview: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{sampleTool.name}</h3>
          <p className="text-sm text-hive-foreground-muted">{sampleTool.description}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-hive-background-card border border-hive-border rounded hover:border-hive-accent transition-colors">
            Edit Tool
          </button>
          <button className="px-3 py-1 text-sm bg-hive-accent text-black rounded hover:bg-hive-accent-muted transition-colors">
            Publish
          </button>
        </div>
      </div>
      
      <div className="border border-hive-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-hive-border bg-hive-background-muted flex items-center justify-between">
          <div className="text-sm font-medium">Tool Preview</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="text-xs text-hive-foreground-muted">Live Preview</div>
          </div>
        </div>
        
        <div className="p-6 min-h-64 bg-white text-black">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Pomodoro Timer</h4>
              <div className="text-center">
                <div className="text-4xl font-mono mb-2">25:00</div>
                <div className="flex justify-center gap-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">Start</button>
                  <button className="px-4 py-2 bg-gray-200 rounded">Reset</button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Progress Chart</h4>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-gray-500">📊 Chart Visualization</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Session Notes</h4>
            <div className="h-20 bg-gray-50 border rounded p-2">
              <div className="text-sm text-gray-500">Notes from this study session...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const InteractiveBuilder: Story = {
  args: {
    mode: 'create',
    elementLibrary,
    showElementLibrary: true,
    showPropertyPanel: true,
    interactive: true,
    onElementDrop: (element: any, position: any) => {
      console.log('Element dropped:', element.name, 'at', position);
    },
    onElementSelect: (element: any) => {
      console.log('Element selected:', element);
    },
    onPropertyChange: (elementId: string, property: string, value: any) => {
      console.log('Property changed:', elementId, property, value);
    },
    onToolSave: (tool: any) => {
      console.log('Tool saved:', tool);
    },
    onToolPreview: (tool: any) => {
      console.log('Tool preview:', tool);
    }
  }
};