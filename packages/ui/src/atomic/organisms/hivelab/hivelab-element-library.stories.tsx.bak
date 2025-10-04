import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveLabElementLibrary } from './hivelab-element-library';
import type { ElementDefinition } from '@/types/hivelab.types';

/**
 * # HiveLab Element Library
 *
 * Floating panel containing all available elements organized by category.
 * Users can search, filter by category, toggle between grid/list views,
 * and drag elements onto the canvas.
 *
 * ## Features
 * - Search across element names, descriptions, and categories
 * - Filter by 8 element categories
 * - Grid or list view modes
 * - Show new elements filter
 * - Drag-and-drop support
 * - Favorite/toggle support
 * - Grouped view (all categories) or flat view (single category)
 * - Element count badges
 * - Collapsible panel
 * - Left or right positioning
 *
 * ## Usage
 * ```tsx
 * <HiveLabElementLibrary
 *   elements={elementDefinitions}
 *   onElementSelect={handleAddToCanvas}
 *   onToggleFavorite={handleToggleFavorite}
 *   position="left"
 *   width={280}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Organisms/HiveLabElementLibrary',
  component: HiveLabElementLibrary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HiveLabElementLibrary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample element definitions
const sampleElements: ElementDefinition[] = [
  // Triggers
  {
    id: 'trigger-button-click',
    name: 'Button Click',
    icon: '🖱️',
    category: 'trigger',
    description: 'Triggers when a button is clicked',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [],
    defaultOutputs: [
      { name: 'Clicked', type: 'event', side: 'output', required: false, description: 'Fires when clicked' },
    ],
    defaultConfig: {},
    isNew: true,
  },
  {
    id: 'trigger-form-load',
    name: 'Form Load',
    icon: '🚀',
    category: 'trigger',
    description: 'Triggers when the form first loads',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [],
    defaultOutputs: [
      { name: 'Loaded', type: 'event', side: 'output', required: false, description: 'Fires on load' },
    ],
    defaultConfig: {},
  },
  {
    id: 'trigger-schedule',
    name: 'Schedule',
    icon: '⏰',
    category: 'trigger',
    description: 'Triggers on a schedule',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [],
    defaultOutputs: [
      { name: 'Tick', type: 'event', side: 'output', required: false, description: 'Fires on schedule' },
    ],
    defaultConfig: { interval: '1h' },
  },

  // Collectors
  {
    id: 'collector-text-input',
    name: 'Text Input',
    icon: '📝',
    category: 'collector',
    description: 'Collect text from user',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: false, description: '' },
    ],
    defaultOutputs: [
      { name: 'Value', type: 'text', side: 'output', required: false, description: 'The entered text' },
    ],
    defaultConfig: { placeholder: 'Enter text...' },
    isNew: true,
  },
  {
    id: 'collector-choice',
    name: 'Multiple Choice',
    icon: '☑️',
    category: 'collector',
    description: 'Let user choose from options',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: false, description: '' },
    ],
    defaultOutputs: [
      { name: 'Selection', type: 'text', side: 'output', required: false, description: 'Selected option' },
    ],
    defaultConfig: { options: ['Option 1', 'Option 2'] },
  },
  {
    id: 'collector-file-upload',
    name: 'File Upload',
    icon: '📎',
    category: 'collector',
    description: 'Upload files from user',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: false, description: '' },
    ],
    defaultOutputs: [
      { name: 'File', type: 'file', side: 'output', required: false, description: 'Uploaded file' },
    ],
    defaultConfig: { maxSize: 10, accept: '*' },
  },

  // Transformers
  {
    id: 'transformer-format',
    name: 'Format Text',
    icon: '🔤',
    category: 'transformer',
    description: 'Format and transform text',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Input', type: 'text', side: 'input', required: true, description: 'Text to format' },
    ],
    defaultOutputs: [
      { name: 'Output', type: 'text', side: 'output', required: false, description: 'Formatted text' },
    ],
    defaultConfig: { format: 'uppercase' },
  },
  {
    id: 'transformer-validate',
    name: 'Validate',
    icon: '✓',
    category: 'transformer',
    description: 'Validate input data',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Value', type: ['text', 'number'], side: 'input', required: true, description: 'Value to validate' },
    ],
    defaultOutputs: [
      { name: 'Valid', type: 'boolean', side: 'output', required: false, description: 'Is valid?' },
      { name: 'Errors', type: 'list', side: 'output', required: false, description: 'Validation errors' },
    ],
    defaultConfig: { rules: [] },
    isNew: true,
  },

  // Routers
  {
    id: 'router-if-else',
    name: 'If / Else',
    icon: '🔀',
    category: 'router',
    description: 'Conditional branching',
    complexity: 'medium',
    defaultWidth: 200,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Condition', type: 'boolean', side: 'input', required: true, description: 'Condition to check' },
    ],
    defaultOutputs: [
      { name: 'True', type: 'event', side: 'output', required: false, description: 'If true' },
      { name: 'False', type: 'event', side: 'output', required: false, description: 'If false' },
    ],
    defaultConfig: {},
  },
  {
    id: 'router-for-each',
    name: 'For Each',
    icon: '🔁',
    category: 'router',
    description: 'Loop through items',
    complexity: 'advanced',
    defaultWidth: 200,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'List', type: 'list', side: 'input', required: true, description: 'Items to loop' },
    ],
    defaultOutputs: [
      { name: 'Item', type: 'any', side: 'output', required: false, description: 'Current item' },
      { name: 'Done', type: 'event', side: 'output', required: false, description: 'Loop complete' },
    ],
    defaultConfig: {},
  },

  // Storage
  {
    id: 'storage-variable',
    name: 'Variable',
    icon: '📦',
    category: 'storage',
    description: 'Store a value temporarily',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Set', type: 'any', side: 'input', required: false, description: 'Value to store' },
    ],
    defaultOutputs: [
      { name: 'Get', type: 'any', side: 'output', required: false, description: 'Stored value' },
    ],
    defaultConfig: { initialValue: null },
  },
  {
    id: 'storage-database',
    name: 'Database',
    icon: '🗄️',
    category: 'storage',
    description: 'Save to database',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Data', type: 'object', side: 'input', required: true, description: 'Data to save' },
    ],
    defaultOutputs: [
      { name: 'Success', type: 'event', side: 'output', required: false, description: 'Save succeeded' },
      { name: 'ID', type: 'text', side: 'output', required: false, description: 'Saved item ID' },
    ],
    defaultConfig: { collection: 'items' },
    isNew: true,
  },

  // Display
  {
    id: 'display-text',
    name: 'Show Text',
    icon: '📄',
    category: 'display',
    description: 'Display text to user',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      { name: 'Text', type: 'text', side: 'input', required: true, description: 'Text to display' },
    ],
    defaultOutputs: [],
    defaultConfig: { style: 'paragraph' },
  },
  {
    id: 'display-chart',
    name: 'Chart',
    icon: '📊',
    category: 'display',
    description: 'Visualize data as chart',
    complexity: 'medium',
    defaultWidth: 200,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Data', type: 'list', side: 'input', required: true, description: 'Chart data' },
    ],
    defaultOutputs: [],
    defaultConfig: { type: 'bar' },
  },

  // Actions
  {
    id: 'action-notify',
    name: 'Send Notification',
    icon: '🔔',
    category: 'action',
    description: 'Send push notification',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: true, description: 'When to send' },
      { name: 'Message', type: 'text', side: 'input', required: true, description: 'Notification text' },
    ],
    defaultOutputs: [
      { name: 'Sent', type: 'event', side: 'output', required: false, description: 'Notification sent' },
    ],
    defaultConfig: {},
    isNew: true,
  },
  {
    id: 'action-email',
    name: 'Send Email',
    icon: '📧',
    category: 'action',
    description: 'Send email to user',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: true, description: 'When to send' },
      { name: 'To', type: 'user', side: 'input', required: true, description: 'Recipient' },
      { name: 'Subject', type: 'text', side: 'input', required: true, description: 'Email subject' },
      { name: 'Body', type: 'text', side: 'input', required: true, description: 'Email body' },
    ],
    defaultOutputs: [
      { name: 'Sent', type: 'event', side: 'output', required: false, description: 'Email sent' },
    ],
    defaultConfig: {},
  },

  // Connectors
  {
    id: 'connector-merge',
    name: 'Merge',
    icon: '🔗',
    category: 'connector',
    description: 'Combine multiple inputs',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      { name: 'Input 1', type: 'any', side: 'input', required: false, description: '' },
      { name: 'Input 2', type: 'any', side: 'input', required: false, description: '' },
    ],
    defaultOutputs: [
      { name: 'Merged', type: 'object', side: 'output', required: false, description: 'Combined output' },
    ],
    defaultConfig: {},
  },
  {
    id: 'connector-delay',
    name: 'Delay',
    icon: '⏱️',
    category: 'connector',
    description: 'Wait before continuing',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      { name: 'Trigger', type: 'event', side: 'input', required: true, description: 'Start delay' },
    ],
    defaultOutputs: [
      { name: 'Done', type: 'event', side: 'output', required: false, description: 'Delay finished' },
    ],
    defaultConfig: { duration: 1000 },
  },
];

/**
 * Default element library
 */
export const Default: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 280,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Canvas Area</p>
          <p className="text-xs text-muted-foreground mt-1">
            Drag elements from the library
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Right-side position
 */
export const RightPosition: Story = {
  args: {
    elements: sampleElements,
    position: 'right',
    width: 280,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Canvas Area</p>
        </div>
      </div>
      <HiveLabElementLibrary {...args} />
    </div>
  ),
};

/**
 * Collapsed panel
 */
export const Collapsed: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 280,
    isCollapsed: true,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * With search filter
 */
export const WithSearch: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 280,
    searchQuery: 'text',
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * Showing new elements only
 */
export const NewElementsOnly: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 280,
    showFavoritesOnly: true,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * Empty state (no elements)
 */
export const EmptyState: Story = {
  args: {
    elements: [],
    position: 'left',
    width: 280,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * No results (search)
 */
export const NoResults: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 280,
    searchQuery: 'xyz123',
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};

/**
 * Interactive with state management
 */
export const Interactive: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedElement, setSelectedElement] = useState<ElementDefinition | null>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const handleElementSelect = (element: ElementDefinition) => {
      setSelectedElement(element);
    };

    const handleToggleFavorite = (elementId: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(elementId)) {
          next.delete(elementId);
        } else {
          next.add(elementId);
        }
        return next;
      });
    };

    return (
      <div className="h-screen w-full bg-background flex flex-col">
        {/* Status Bar */}
        <div className="px-4 py-3 border-b bg-background">
          <div className="flex items-center gap-4 text-sm">
            <span>Search: {searchQuery || 'None'}</span>
            <span>Collapsed: {isCollapsed ? 'Yes' : 'No'}</span>
            <span>Selected: {selectedElement?.name || 'None'}</span>
            <span>Favorites: {favorites.size}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <HiveLabElementLibrary
            elements={sampleElements}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onElementSelect={handleElementSelect}
            onToggleFavorite={handleToggleFavorite}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            position="left"
            width={280}
          />

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <p className="text-sm font-semibold mb-2">Interactive Element Library</p>
              <p className="text-xs text-muted-foreground mb-4">
                Search, filter, select elements, and toggle favorites
              </p>

              {selectedElement && (
                <div className="bg-muted rounded-lg p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{selectedElement.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{selectedElement.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedElement.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {selectedElement.description}
                  </p>
                  <div className="flex gap-4 text-xs">
                    <span>Inputs: {selectedElement.defaultInputs.length}</span>
                    <span>Outputs: {selectedElement.defaultOutputs.length}</span>
                    <span>Complexity: {selectedElement.complexity}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * All categories showcase
 */
export const AllCategories: Story = {
  render: () => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary
        elements={sampleElements}
        position="left"
        width={300}
      />
      <div className="flex-1 p-8">
        <h3 className="text-sm font-semibold mb-4">Element Categories</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span className="font-medium">Triggers:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'trigger').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>📝</span>
            <span className="font-medium">Collectors:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'collector').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔄</span>
            <span className="font-medium">Transformers:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'transformer').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔀</span>
            <span className="font-medium">Routers:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'router').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>💾</span>
            <span className="font-medium">Storage:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'storage').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>👁️</span>
            <span className="font-medium">Display:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'display').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚀</span>
            <span className="font-medium">Actions:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'action').length} elements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔌</span>
            <span className="font-medium">Connectors:</span>
            <span className="text-muted-foreground">
              {sampleElements.filter((e) => e.category === 'connector').length} elements
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Wide panel (more space)
 */
export const WidePanel: Story = {
  args: {
    elements: sampleElements,
    position: 'left',
    width: 360,
  },
  render: (args) => (
    <div className="h-screen w-full bg-background flex">
      <HiveLabElementLibrary {...args} />
      <div className="flex-1" />
    </div>
  ),
};
