import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataMappingRow } from './data-mapping-row';
import type { Port } from '@/types/hivelab.types';

/**
 * # Data Mapping Row
 *
 * Shows a single data mapping/connection between element ports in the properties panel.
 * Visualizes how data flows from one element to another.
 *
 * ## Features
 * - Source port with element name
 * - Target port with type badge
 * - Arrow indicating flow direction
 * - Color-coded by data type
 * - Selection state
 * - Removable (with X button on hover)
 * - Click to select/edit
 * - Truncates long names
 *
 * ## Usage
 * ```tsx
 * <DataMappingRow
 *   sourcePort={sourcePort}
 *   targetPort={targetPort}
 *   sourceElementName="Button Click"
 *   onRemove={() => handleRemove()}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Panels/DataMappingRow',
  component: DataMappingRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataMappingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample ports
const eventPort: Port = {
  id: 'trigger-out',
  name: 'Clicked',
  type: 'event',
  side: 'output',
  required: false,
  description: 'Fires when clicked',
};

const textPort: Port = {
  id: 'value-out',
  name: 'Value',
  type: 'text',
  side: 'output',
  required: false,
  description: 'User input',
};

const numberPort: Port = {
  id: 'count-out',
  name: 'Count',
  type: 'number',
  side: 'output',
  required: false,
  description: 'Number value',
};

const targetEventPort: Port = {
  id: 'trigger-in',
  name: 'Trigger',
  type: 'event',
  side: 'input',
  required: false,
  description: 'When to execute',
};

const targetTextPort: Port = {
  id: 'data-in',
  name: 'Data',
  type: 'text',
  side: 'input',
  required: true,
  description: 'Data to send',
};

/**
 * Default event mapping
 */
export const Default: Story = {
  args: {
    sourcePort: eventPort,
    targetPort: targetEventPort,
    sourceElementName: 'Button Click',
  },
  render: (args) => (
    <div className="w-[500px]">
      <DataMappingRow {...args} />
    </div>
  ),
};

/**
 * Text data mapping
 */
export const TextMapping: Story = {
  args: {
    sourcePort: textPort,
    targetPort: targetTextPort,
    sourceElementName: 'Text Input',
  },
  render: (args) => (
    <div className="w-[500px]">
      <DataMappingRow {...args} />
    </div>
  ),
};

/**
 * Selected state
 */
export const Selected: Story = {
  args: {
    sourcePort: eventPort,
    targetPort: targetEventPort,
    sourceElementName: 'Button Click',
    isSelected: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <DataMappingRow {...args} />
    </div>
  ),
};

/**
 * Non-removable
 */
export const NonRemovable: Story = {
  args: {
    sourcePort: eventPort,
    targetPort: targetEventPort,
    sourceElementName: 'Form Load',
    removable: false,
  },
  render: (args) => (
    <div className="w-[500px]">
      <DataMappingRow {...args} />
    </div>
  ),
};

/**
 * All data types
 */
export const AllDataTypes: Story = {
  render: () => {
    const mappings = [
      {
        source: { ...eventPort, type: 'event', name: 'Trigger' },
        target: { ...targetEventPort, type: 'event', name: 'Execute' },
        element: 'Button Click',
      },
      {
        source: { ...textPort, type: 'text', name: 'Input Text' },
        target: { ...targetTextPort, type: 'text', name: 'Message' },
        element: 'Text Field',
      },
      {
        source: { ...numberPort, type: 'number', name: 'Amount' },
        target: { ...targetTextPort, type: 'number', name: 'Quantity' },
        element: 'Number Input',
      },
      {
        source: { ...textPort, type: 'boolean', name: 'Is Valid' },
        target: { ...targetTextPort, type: 'boolean', name: 'Condition' },
        element: 'Validator',
      },
      {
        source: { ...textPort, type: 'date', name: 'Selected Date' },
        target: { ...targetTextPort, type: 'date', name: 'Start Date' },
        element: 'Date Picker',
      },
      {
        source: { ...textPort, type: 'list', name: 'Items' },
        target: { ...targetTextPort, type: 'list', name: 'Data' },
        element: 'List Source',
      },
      {
        source: { ...textPort, type: 'object', name: 'User Info' },
        target: { ...targetTextPort, type: 'object', name: 'Profile' },
        element: 'Data Transform',
      },
    ];

    return (
      <div className="w-[500px] space-y-2">
        {mappings.map((mapping, i) => (
          <DataMappingRow
            key={i}
            sourcePort={mapping.source as Port}
            targetPort={mapping.target as Port}
            sourceElementName={mapping.element}
          />
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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const mappings = [
      {
        source: eventPort,
        target: targetEventPort,
        element: 'Button Click',
      },
      {
        source: textPort,
        target: targetTextPort,
        element: 'Text Input',
      },
      {
        source: numberPort,
        target: { ...targetTextPort, type: 'number', name: 'Count' },
        element: 'Counter',
      },
    ];

    return (
      <div className="w-[500px] space-y-2">
        <p className="text-sm font-semibold mb-3">
          Click to select • Selected: {selectedIndex !== null ? selectedIndex + 1 : 'None'}
        </p>
        {mappings.map((mapping, i) => (
          <DataMappingRow
            key={i}
            sourcePort={mapping.source}
            targetPort={mapping.target as Port}
            sourceElementName={mapping.element}
            isSelected={selectedIndex === i}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>
    );
  },
};

/**
 * With remove handler
 */
export const WithRemove: Story = {
  render: () => {
    const [mappings, setMappings] = useState([
      {
        id: 1,
        source: eventPort,
        target: targetEventPort,
        element: 'Button Click',
      },
      {
        id: 2,
        source: textPort,
        target: targetTextPort,
        element: 'Text Input',
      },
      {
        id: 3,
        source: numberPort,
        target: { ...targetTextPort, type: 'number', name: 'Value' },
        element: 'Number Input',
      },
    ]);

    return (
      <div className="w-[500px] space-y-2">
        <p className="text-sm font-semibold mb-3">
          Hover and click X to remove • Remaining: {mappings.length}
        </p>
        {mappings.map((mapping) => (
          <DataMappingRow
            key={mapping.id}
            sourcePort={mapping.source}
            targetPort={mapping.target as Port}
            sourceElementName={mapping.element}
            onRemove={() => setMappings(mappings.filter((m) => m.id !== mapping.id))}
          />
        ))}
        {mappings.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            All mappings removed
          </div>
        )}
      </div>
    );
  },
};

/**
 * Long element names
 */
export const LongNames: Story = {
  render: () => {
    const mappings = [
      {
        source: { ...eventPort, name: 'When User Clicks Submit After Validation' },
        target: { ...targetEventPort, name: 'Execute' },
        element: 'Very Long Button Name That Gets Truncated',
      },
      {
        source: { ...textPort, name: 'User Input Text Value From Form Field' },
        target: { ...targetTextPort, name: 'Email Address For Notification System' },
        element: 'Multi-Step Form Input Collection Component',
      },
    ];

    return (
      <div className="w-[500px] space-y-2">
        {mappings.map((mapping, i) => (
          <DataMappingRow
            key={i}
            sourcePort={mapping.source as Port}
            targetPort={mapping.target as Port}
            sourceElementName={mapping.element}
          />
        ))}
      </div>
    );
  },
};

/**
 * In properties panel
 */
export const InPropertiesPanel: Story = {
  render: () => {
    const [mappings, setMappings] = useState([
      {
        id: 1,
        source: { ...eventPort, name: 'Submit' },
        target: { ...targetEventPort, name: 'Trigger' },
        element: 'Submit Button',
      },
      {
        id: 2,
        source: { ...textPort, name: 'Email' },
        target: { ...targetTextPort, name: 'To' },
        element: 'Email Input',
      },
      {
        id: 3,
        source: { ...textPort, name: 'Message', type: 'text' },
        target: { ...targetTextPort, name: 'Body', type: 'text' },
        element: 'Message Input',
      },
    ]);

    const [selected, setSelected] = useState<number | null>(null);

    return (
      <div className="w-[500px] bg-background border rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-semibold">Data Mappings</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Send Email Element
          </p>
        </div>

        {/* Mappings */}
        <div className="p-3 space-y-2">
          {mappings.map((mapping, i) => (
            <DataMappingRow
              key={mapping.id}
              sourcePort={mapping.source as Port}
              targetPort={mapping.target as Port}
              sourceElementName={mapping.element}
              isSelected={selected === i}
              onClick={() => setSelected(i)}
              onRemove={() => {
                setMappings(mappings.filter((m) => m.id !== mapping.id));
                if (selected === i) setSelected(null);
              }}
            />
          ))}

          {mappings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No data mappings</p>
              <p className="text-xs text-muted-foreground mt-1">
                Connect ports to map data
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t">
          <button className="w-full px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded transition-colors">
            + Add Mapping
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Multiple mappings list
 */
export const MappingsList: Story = {
  render: () => {
    const mappings = [
      {
        source: { ...eventPort, name: 'Load', type: 'event' },
        target: { ...targetEventPort, name: 'Fetch', type: 'event' },
        element: 'Page Load',
      },
      {
        source: { ...textPort, name: 'API URL', type: 'text' },
        target: { ...targetTextPort, name: 'Endpoint', type: 'text' },
        element: 'Config',
      },
      {
        source: { ...textPort, name: 'Response', type: 'object' },
        target: { ...targetTextPort, name: 'Data', type: 'object' },
        element: 'API Call',
      },
      {
        source: { ...textPort, name: 'Items', type: 'list' },
        target: { ...targetTextPort, name: 'Display', type: 'list' },
        element: 'Transform',
      },
      {
        source: { ...eventPort, name: 'Success', type: 'event' },
        target: { ...targetEventPort, name: 'Show', type: 'event' },
        element: 'API Call',
      },
      {
        source: { ...eventPort, name: 'Error', type: 'event' },
        target: { ...targetEventPort, name: 'Display', type: 'event' },
        element: 'API Call',
      },
    ];

    return (
      <div className="w-[500px] space-y-1">
        {mappings.map((mapping, i) => (
          <DataMappingRow
            key={i}
            sourcePort={mapping.source as Port}
            targetPort={mapping.target as Port}
            sourceElementName={mapping.element}
          />
        ))}
      </div>
    );
  },
};

/**
 * Empty state
 */
export const EmptyState: Story = {
  render: () => (
    <div className="w-[500px] border rounded-lg p-8 text-center">
      <p className="text-sm font-medium mb-2">No Data Mappings</p>
      <p className="text-xs text-muted-foreground mb-4">
        Connect element ports to create data flow
      </p>
      <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
        Add Mapping
      </button>
    </div>
  ),
};
