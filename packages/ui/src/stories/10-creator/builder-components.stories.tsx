import type { Meta, StoryObj } from '@storybook/react';
import { 
  TemplateToolBuilder,
  VisualToolBuilder,
  WizardToolBuilder
} from '../../components/builders';
import { 
  ElementPicker,
  ToolBuilder,
  DesignCanvas,
  ElementLibrary 
} from '../../components/creator';
import { Square, Circle, Type, Image, Layout, Palette, Code, Wand2 } from 'lucide-react';

const meta: Meta = {
  title: '10-Creator/Builder Components',
  parameters: {
    docs: {
      description: {
        component: 'HIVE tool builder components for creating and designing interactive tools',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data for builders
const mockElements = [
  {
    id: 'button',
    name: 'Button',
    category: 'Interactive',
    icon: <Square className="w-4 h-4" />,
    description: 'Interactive button element',
    properties: {
      text: 'Click me',
      variant: 'primary',
      size: 'medium',
    },
    preview: '/element-button.svg',
  },
  {
    id: 'input',
    name: 'Input Field',
    category: 'Forms',
    icon: <Type className="w-4 h-4" />,
    description: 'Text input field',
    properties: {
      placeholder: 'Enter text...',
      type: 'text',
      required: false,
    },
    preview: '/element-input.svg',
  },
  {
    id: 'image',
    name: 'Image',
    category: 'Media',
    icon: <Image className="w-4 h-4" />,
    description: 'Image display element',
    properties: {
      src: '/placeholder.jpg',
      alt: 'Image description',
      width: 300,
      height: 200,
    },
    preview: '/element-image.svg',
  },
  {
    id: 'container',
    name: 'Container',
    category: 'Layout',
    icon: <Layout className="w-4 h-4" />,
    description: 'Layout container',
    properties: {
      direction: 'vertical',
      spacing: 'medium',
      padding: 'medium',
    },
    preview: '/element-container.svg',
  },
];

const mockTemplates = [
  {
    id: 'survey-tool',
    name: 'Survey Tool',
    description: 'Create interactive surveys and collect responses',
    category: 'Data Collection',
    difficulty: 'beginner',
    estimatedTime: '15 min',
    thumbnail: '/template-survey.jpg',
    elements: ['input', 'button', 'container', 'text'],
    features: ['form-validation', 'data-export', 'analytics'],
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Advanced color selection and palette generator',
    category: 'Design',
    difficulty: 'intermediate',
    estimatedTime: '30 min',
    thumbnail: '/template-color.jpg',
    elements: ['color-wheel', 'slider', 'preview', 'export'],
    features: ['color-harmony', 'accessibility-check', 'export-formats'],
  },
  {
    id: 'chart-builder',
    name: 'Chart Builder',
    description: 'Data visualization and chart creation tool',
    category: 'Analytics',
    difficulty: 'advanced',
    estimatedTime: '45 min',
    thumbnail: '/template-chart.jpg',
    elements: ['chart', 'data-input', 'config-panel', 'export'],
    features: ['multiple-chart-types', 'real-time-data', 'interactive-legends'],
  },
];

const mockCanvasState = {
  elements: [
    {
      id: 'element-1',
      type: 'button',
      x: 100,
      y: 50,
      width: 120,
      height: 40,
      properties: { text: 'Get Started', variant: 'primary' },
    },
    {
      id: 'element-2',
      type: 'input',
      x: 100,
      y: 120,
      width: 200,
      height: 40,
      properties: { placeholder: 'Enter your email...', type: 'email' },
    },
    {
      id: 'element-3',
      type: 'container',
      x: 50,
      y: 200,
      width: 300,
      height: 150,
      properties: { direction: 'vertical', padding: 'large' },
      children: ['element-4', 'element-5'],
    },
  ],
  selectedElement: 'element-1',
  canvas: {
    width: 800,
    height: 600,
    zoom: 1,
    background: '#0A0A0B',
  },
};

// Template Tool Builder
export const TemplateBuilder: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Template Tool Builder</h1>
      
      <div className="max-w-6xl">
        <TemplateToolBuilder 
          templates={mockTemplates}
          onSelectTemplate={(template) => console.log('Selected template:', template)}
          onCustomizeTemplate={(templateId, config) => console.log('Customize:', templateId, config)}
          onPreviewTemplate={(templateId) => console.log('Preview:', templateId)}
          categories={['Data Collection', 'Design', 'Analytics', 'Communication']}
          filters={{
            category: 'all',
            difficulty: 'all',
            features: [],
          }}
        />
      </div>
      
      <div className="mt-12 bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
        <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Template Features</h3>
        <ul className="text-[#C1C1C4] space-y-2">
          <li>• Pre-built tool templates for common use cases</li>
          <li>• Drag-and-drop customization interface</li>
          <li>• Template preview with live interaction</li>
          <li>• Category filtering and difficulty levels</li>
          <li>• Estimated completion time and required elements</li>
          <li>• One-click deployment and sharing</li>
        </ul>
      </div>
    </div>
  ),
};

// Visual Tool Builder
export const VisualBuilder: Story = {
  render: () => (
    <div className="h-screen bg-[#0A0A0B] flex flex-col">
      <div className="p-4 border-b border-[#2A2A2D]">
        <h1 className="text-2xl font-bold text-[#E5E5E7]">Visual Tool Builder</h1>
        <p className="text-[#C1C1C4] text-sm">Drag and drop elements to build your tool</p>
      </div>
      
      <div className="flex-1 flex">
        <VisualToolBuilder 
          elements={mockElements}
          canvasState={mockCanvasState}
          onElementAdd={(element, position) => console.log('Add element:', element, position)}
          onElementUpdate={(elementId, properties) => console.log('Update element:', elementId, properties)}
          onElementDelete={(elementId) => console.log('Delete element:', elementId)}
          onElementSelect={(elementId) => console.log('Select element:', elementId)}
          onCanvasUpdate={(canvasState) => console.log('Canvas update:', canvasState)}
          tools={{
            grid: true,
            snap: true,
            zoom: true,
            undo: true,
            redo: true,
            preview: true,
          }}
        />
      </div>
    </div>
  ),
};

// Wizard Tool Builder
export const WizardBuilder: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Wizard Tool Builder</h1>
      
      <div className="max-w-4xl">
        <WizardToolBuilder 
          currentStep={2}
          totalSteps={5}
          steps={[
            { id: 1, title: 'Tool Type', description: 'Choose what kind of tool to create' },
            { id: 2, title: 'Configuration', description: 'Set up basic properties and settings' },
            { id: 3, title: 'Design', description: 'Customize the appearance and layout' },
            { id: 4, title: 'Logic', description: 'Add interactions and behavior' },
            { id: 5, title: 'Publish', description: 'Review and deploy your tool' },
          ]}
          onStepChange={(step) => console.log('Step change:', step)}
          onNext={() => console.log('Next step')}
          onPrevious={() => console.log('Previous step')}
          onSave={() => console.log('Save progress')}
          onPublish={() => console.log('Publish tool')}
          allowSkip={false}
          showProgress={true}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-4">Tool Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#C1C1C4] text-sm font-medium mb-2">
                    Tool Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-[#111113] border border-[#2A2A2D] rounded-lg text-[#E5E5E7] focus:border-[#FFD700] focus:outline-none"
                    placeholder="Enter tool name..."
                  />
                </div>
                <div>
                  <label className="block text-[#C1C1C4] text-sm font-medium mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 bg-[#111113] border border-[#2A2A2D] rounded-lg text-[#E5E5E7] focus:border-[#FFD700] focus:outline-none">
                    <option>Design</option>
                    <option>Development</option>
                    <option>Analytics</option>
                    <option>Communication</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#C1C1C4] text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full px-3 py-2 bg-[#111113] border border-[#2A2A2D] rounded-lg text-[#E5E5E7] focus:border-[#FFD700] focus:outline-none"
                    placeholder="Describe what your tool does..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Tool Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Real-time Preview', 'Export Options', 'Collaboration', 'Version History', 'Analytics', 'API Access'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-[#2A2A2D] bg-[#111113] text-[#FFD700] focus:ring-[#FFD700]" />
                    <span className="text-[#C1C1C4] text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </WizardToolBuilder>
      </div>
    </div>
  ),
};

// Advanced Tool Builder
export const AdvancedBuilder: Story = {
  render: () => (
    <div className="h-screen bg-[#0A0A0B] flex flex-col">
      <div className="p-4 border-b border-[#2A2A2D]">
        <h1 className="text-2xl font-bold text-[#E5E5E7]">Advanced Tool Builder</h1>
        <p className="text-[#C1C1C4] text-sm">Professional tool creation with full customization</p>
      </div>
      
      <div className="flex-1">
        <ToolBuilder 
          mode="advanced"
          elements={mockElements}
          canvasState={mockCanvasState}
          onSave={(toolData) => console.log('Save tool:', toolData)}
          onPublish={(toolData) => console.log('Publish tool:', toolData)}
          onPreview={() => console.log('Preview tool')}
          onExport={(format) => console.log('Export:', format)}
          features={{
            codeEditor: true,
            scriptingAPI: true,
            customCSS: true,
            advancedLogic: true,
            dataConnectors: true,
            collaborativeEditing: true,
          }}
          panels={{
            elementLibrary: true,
            propertyPanel: true,
            codePanel: true,
            previewPanel: true,
            layersPanel: true,
          }}
        />
      </div>
    </div>
  ),
};

// Design Canvas
export const CanvasComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Design Canvas</h1>
      
      <div className="bg-[#111113] rounded-lg border border-[#2A2A2D] p-6">
        <div className="h-96">
          <DesignCanvas 
            elements={mockCanvasState.elements}
            selectedElement={mockCanvasState.selectedElement}
            canvas={mockCanvasState.canvas}
            onElementMove={(elementId, position) => console.log('Move element:', elementId, position)}
            onElementResize={(elementId, size) => console.log('Resize element:', elementId, size)}
            onElementSelect={(elementId) => console.log('Select element:', elementId)}
            onCanvasClick={(position) => console.log('Canvas click:', position)}
            tools={{
              grid: true,
              snap: true,
              rulers: true,
              guidelines: true,
            }}
            zoom={1}
            readonly={false}
          />
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Canvas Features</h3>
          <ul className="text-[#C1C1C4] space-y-2">
            <li>• Drag and drop element positioning</li>
            <li>• Multi-select and group operations</li>
            <li>• Snap to grid and guidelines</li>
            <li>• Zoom and pan navigation</li>
            <li>• Undo/redo history</li>
            <li>• Real-time collaboration cursors</li>
          </ul>
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">Select All</span>
              <span className="text-[#9B9B9F] font-mono">Cmd+A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">Copy</span>
              <span className="text-[#9B9B9F] font-mono">Cmd+C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">Paste</span>
              <span className="text-[#9B9B9F] font-mono">Cmd+V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">Undo</span>
              <span className="text-[#9B9B9F] font-mono">Cmd+Z</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">Delete</span>
              <span className="text-[#9B9B9F] font-mono">Del</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Element Library
export const ElementLibraryComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Element Library</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ElementLibrary 
            elements={mockElements}
            categories={['Interactive', 'Forms', 'Media', 'Layout', 'Text', 'Data']}
            onElementSelect={(element) => console.log('Select element:', element)}
            onElementDrag={(element) => console.log('Drag element:', element)}
            searchEnabled={true}
            favoriteElements={['button', 'input']}
            onToggleFavorite={(elementId) => console.log('Toggle favorite:', elementId)}
            customElements={[
              {
                id: 'custom-header',
                name: 'Custom Header',
                category: 'Custom',
                icon: <Type className="w-4 h-4" />,
                description: 'Your custom header component',
                custom: true,
              }
            ]}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-4">Element Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Interactive', icon: <Square className="w-6 h-6" />, count: 12, color: '#3B82F6' },
                  { name: 'Forms', icon: <Type className="w-6 h-6" />, count: 8, color: '#10B981' },
                  { name: 'Media', icon: <Image className="w-6 h-6" />, count: 6, color: '#F59E0B' },
                  { name: 'Layout', icon: <Layout className="w-6 h-6" />, count: 10, color: '#8B5CF6' },
                  { name: 'Data', icon: <Code className="w-6 h-6" />, count: 7, color: '#EF4444' },
                  { name: 'Custom', icon: <Wand2 className="w-6 h-6" />, count: 3, color: '#FFD700' },
                ].map((category) => (
                  <div key={category.name} className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                        <div style={{ color: category.color }}>
                          {category.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#E5E5E7] font-medium">{category.name}</div>
                        <div className="text-[#9B9B9F] text-sm">{category.count} elements</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Element Features</h3>
              <ul className="text-[#C1C1C4] space-y-2">
                <li>• Drag and drop from library to canvas</li>
                <li>• Search and filter elements by category</li>
                <li>• Favorite frequently used elements</li>
                <li>• Create and save custom elements</li>
                <li>• Live preview with hover states</li>
                <li>• Element documentation and examples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Element Picker
export const ElementPickerComponent: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Element Picker</h1>
      
      <div className="max-w-4xl">
        <ElementPicker 
          elements={mockElements}
          onElementSelect={(element) => console.log('Selected element:', element)}
          onElementPreview={(element) => console.log('Preview element:', element)}
          layout="grid"
          showCategories={true}
          showPreview={true}
          searchPlaceholder="Search elements..."
          emptyState={{
            title: 'No elements found',
            description: 'Try adjusting your search or category filter',
            action: 'Browse all elements',
          }}
        />
      </div>
      
      <div className="mt-12 bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
        <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Picker Modes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-[#C1C1C4] font-medium mb-2">Grid Layout</h4>
            <p className="text-[#9B9B9F] text-sm">Visual grid with element previews and quick selection</p>
          </div>
          <div>
            <h4 className="text-[#C1C1C4] font-medium mb-2">List Layout</h4>
            <p className="text-[#9B9B9F] text-sm">Compact list view with detailed element information</p>
          </div>
          <div>
            <h4 className="text-[#C1C1C4] font-medium mb-2">Tree Layout</h4>
            <p className="text-[#9B9B9F] text-sm">Hierarchical tree view organized by categories</p>
          </div>
        </div>
      </div>
    </div>
  ),
};