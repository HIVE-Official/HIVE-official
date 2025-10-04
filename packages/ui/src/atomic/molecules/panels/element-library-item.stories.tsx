import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElementLibraryItem } from './element-library-item';
import type { ElementDefinition } from '../../../types/hivelab.types';
import { ELEMENT_LIBRARY } from '../../../lib/hivelab-element-library';

/**
 * # Element Library Item
 *
 * Draggable element card in the library panel. Represents an element type
 * that can be dragged onto the canvas to create a new element instance.
 *
 * ## Features
 * - Drag handle with grip icon
 * - Element icon with category-colored border
 * - Element name and description
 * - Port count indicators (inputs/outputs)
 * - Hover effects (shadow, scale)
 * - Drag state visualization
 * - Category color coding (8 categories)
 * - Click to select (optional)
 *
 * ## Usage
 * ```tsx
 * <ElementLibraryItem
 *   element={elementDefinition}
 *   onDragStart={(e, el) => handleDragStart(e, el)}
 *   onClick={(el) => handleClick(el)}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Panels/ElementLibraryItem',
  component: ElementLibraryItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElementLibraryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample element
const sampleElement: ElementDefinition = {
  id: 'button-click',
  category: 'trigger',
  name: 'Button Click',
  icon: '▶️',
  description: 'Triggers when button is clicked',
  color: 'hsl(0, 70%, 50%)',
  defaultWidth: 180,
  defaultHeight: 120,
  inputs: [],
  outputs: [
    {
      id: 'trigger-out',
      name: 'Clicked',
      type: 'event',
      side: 'output',
      required: false,
      description: 'Fires when clicked',
    },
  ],
  config: {
    label: { type: 'text', label: 'Button Label', default: 'Click Me', required: true },
  },
};

/**
 * Default trigger element
 */
export const Default: Story = {
  args: {
    element: sampleElement,
  },
};

/**
 * All element categories
 */
export const AllCategories: Story = {
  render: () => {
    const categories = [
      'trigger',
      'collector',
      'transformer',
      'router',
      'storage',
      'display',
      'action',
      'connector',
    ];

    // Get first element from each category
    const elements = categories.map(cat =>
      ELEMENT_LIBRARY.find(el => el.category === cat)!
    );

    return (
      <div className="space-y-2 w-[400px]">
        {elements.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * Being dragged
 */
export const Dragging: Story = {
  args: {
    element: sampleElement,
    isDragging: true,
  },
};

/**
 * Different port configurations
 */
export const PortConfigurations: Story = {
  render: () => {
    const configs: ElementDefinition[] = [
      {
        ...sampleElement,
        id: '1',
        name: 'No Inputs, 1 Output',
        inputs: [],
        outputs: [sampleElement.outputs[0]],
      },
      {
        ...sampleElement,
        id: '2',
        category: 'collector',
        name: '1 Input, 1 Output',
        inputs: [
          {
            id: 'in',
            name: 'Trigger',
            type: 'event',
            side: 'input',
            required: false,
            description: '',
          },
        ],
        outputs: [sampleElement.outputs[0]],
      },
      {
        ...sampleElement,
        id: '3',
        category: 'transformer',
        name: '2 Inputs, 3 Outputs',
        inputs: [
          { id: 'in1', name: 'Input 1', type: 'text', side: 'input', required: true, description: '' },
          { id: 'in2', name: 'Input 2', type: 'number', side: 'input', required: false, description: '' },
        ],
        outputs: [
          { id: 'out1', name: 'Output 1', type: 'text', side: 'output', required: false, description: '' },
          { id: 'out2', name: 'Output 2', type: 'number', side: 'output', required: false, description: '' },
          { id: 'out3', name: 'Output 3', type: 'boolean', side: 'output', required: false, description: '' },
        ],
      },
      {
        ...sampleElement,
        id: '4',
        category: 'action',
        name: '3 Inputs, No Outputs',
        inputs: [
          { id: 'in1', name: 'Data', type: 'text', side: 'input', required: true, description: '' },
          { id: 'in2', name: 'Config', type: 'object', side: 'input', required: false, description: '' },
          { id: 'in3', name: 'Trigger', type: 'event', side: 'input', required: false, description: '' },
        ],
        outputs: [],
      },
    ];

    return (
      <div className="space-y-2 w-[400px]">
        {configs.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * Interactive drag
 */
export const InteractiveDrag: Story = {
  render: () => {
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dropZoneActive, setDropZoneActive] = useState(false);

    const elements = ELEMENT_LIBRARY.slice(0, 6);

    return (
      <div className="flex gap-8 p-8">
        {/* Library */}
        <div className="w-[400px] space-y-2">
          <h3 className="text-sm font-semibold mb-3">Element Library</h3>
          {elements.map(el => (
            <ElementLibraryItem
              key={el.id}
              element={el}
              isDragging={draggingId === el.id}
              onDragStart={(e, element) => {
                setDraggingId(element.id);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              onDragEnd={() => setDraggingId(null)}
            />
          ))}
        </div>

        {/* Drop zone */}
        <div
          className={cn(
            'flex-1 min-h-[400px] border-2 border-dashed rounded-lg p-8',
            'flex items-center justify-center transition-all',
            dropZoneActive
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/20'
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDropZoneActive(true);
          }}
          onDragLeave={() => setDropZoneActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDropZoneActive(false);
            setDraggingId(null);
          }}
        >
          <div className="text-center">
            <p className="text-sm font-medium mb-2">
              {dropZoneActive ? 'Drop here!' : 'Drag elements here'}
            </p>
            <p className="text-xs text-muted-foreground">
              {draggingId ? 'Dragging: ' + elements.find(el => el.id === draggingId)?.name : 'Try dragging an element'}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * With click handler
 */
export const WithClick: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    const elements = ELEMENT_LIBRARY.slice(0, 8);

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-sm font-semibold mb-3">
          Click to select • Selected: {selected || 'None'}
        </h3>
        {elements.map(el => (
          <ElementLibraryItem
            key={el.id}
            element={el}
            onClick={(element) => setSelected(element.id)}
            className={selected === el.id ? 'ring-2 ring-primary' : ''}
          />
        ))}
      </div>
    );
  },
};

/**
 * Compact list
 */
export const CompactList: Story = {
  render: () => {
    const elements = ELEMENT_LIBRARY.slice(0, 12);

    return (
      <div className="w-[360px] space-y-1">
        {elements.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * All triggers
 */
export const AllTriggers: Story = {
  render: () => {
    const triggers = ELEMENT_LIBRARY.filter(el => el.category === 'trigger');

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          Triggers ({triggers.length})
        </h3>
        {triggers.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * All collectors
 */
export const AllCollectors: Story = {
  render: () => {
    const collectors = ELEMENT_LIBRARY.filter(el => el.category === 'collector');

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          Collectors ({collectors.length})
        </h3>
        {collectors.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * All transformers
 */
export const AllTransformers: Story = {
  render: () => {
    const transformers = ELEMENT_LIBRARY.filter(el => el.category === 'transformer');

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          Transformers ({transformers.length})
        </h3>
        {transformers.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * All actions
 */
export const AllActions: Story = {
  render: () => {
    const actions = ELEMENT_LIBRARY.filter(el => el.category === 'action');

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          Actions ({actions.length})
        </h3>
        {actions.map(el => (
          <ElementLibraryItem key={el.id} element={el} />
        ))}
      </div>
    );
  },
};

/**
 * In library panel
 */
export const InLibraryPanel: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', 'trigger', 'collector', 'transformer', 'action'];

    const filteredElements = ELEMENT_LIBRARY.filter(el => {
      const matchesSearch = el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || el.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="w-[400px] bg-background border rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-semibold">Element Library</h3>
        </div>

        {/* Search */}
        <div className="p-4 pb-0">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-background border rounded-md text-sm"
          />
        </div>

        {/* Category filters */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              )}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Elements */}
        <div className="p-3 space-y-1 max-h-[500px] overflow-y-auto">
          {filteredElements.length > 0 ? (
            filteredElements.map(el => (
              <ElementLibraryItem key={el.id} element={el} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No elements found</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
