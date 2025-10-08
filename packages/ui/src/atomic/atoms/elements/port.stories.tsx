import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Port } from './port';
import type { Port as PortType, DataType } from '@/types/hivelab.types';

/**
 * # Port
 *
 * Connection point on an element where wires attach. Shows data type via color,
 * handles hover/click interactions, and indicates compatibility during connection creation.
 *
 * ## Features
 * - Color-coded by data type (11 types)
 * - Visual states: default, hovered, compatible, connected
 * - Input ports (left side) vs Output ports (right side)
 * - Required indicator (red asterisk)
 * - Tooltip shows port name and type
 * - Glow effect when compatible
 * - Scale animation on hover
 *
 * ## Usage
 * ```tsx
 * <Port
 *   port={{ id: '1', name: 'Input', type: 'text', side: 'input', required: true }}
 *   isConnected={false}
 *   onMouseDown={(e) => startConnection()}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Elements/Port',
  component: Port,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Port>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample ports for testing
const textInputPort: PortType = {
  id: 'port-1',
  name: 'Text Input',
  type: 'text',
  side: 'input',
  required: true,
  description: 'Text data input',
};

const numberOutputPort: PortType = {
  id: 'port-2',
  name: 'Count',
  type: 'number',
  side: 'output',
  required: false,
  description: 'Number output',
};

/**
 * Default input port (text type, not connected)
 */
export const Default: Story = {
  args: {
    port: textInputPort,
    isConnected: false,
  },
};

/**
 * Output port
 */
export const OutputPort: Story = {
  args: {
    port: numberOutputPort,
    isConnected: false,
  },
};

/**
 * Connected port (filled with color)
 */
export const Connected: Story = {
  args: {
    port: textInputPort,
    isConnected: true,
  },
};

/**
 * Hovered port (larger, highlighted)
 */
export const Hovered: Story = {
  args: {
    port: textInputPort,
    isHovered: true,
    isConnected: false,
  },
};

/**
 * Compatible port (glowing, pulsing)
 */
export const Compatible: Story = {
  args: {
    port: textInputPort,
    isCompatible: true,
    isConnecting: true,
  },
};

/**
 * Incompatible during connection (faded)
 */
export const Incompatible: Story = {
  args: {
    port: textInputPort,
    isCompatible: false,
    isConnecting: true,
  },
};

/**
 * With label shown
 */
export const WithLabel: Story = {
  args: {
    port: textInputPort,
    showLabel: true,
  },
};

/**
 * Required port with label
 */
export const RequiredWithLabel: Story = {
  args: {
    port: { ...textInputPort, required: true },
    showLabel: true,
  },
};

/**
 * All data types (11 types)
 */
export const AllDataTypes: Story = {
  render: () => {
    const types: DataType[] = [
      'any',
      'text',
      'number',
      'boolean',
      'date',
      'user',
      'list',
      'object',
      'event',
      'file',
      'validation',
    ];

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-sm font-semibold mb-4">All Data Types</h3>
        {types.map(type => (
          <Port
            key={type}
            port={{
              id: `port-${type}`,
              name: type.charAt(0).toUpperCase() + type.slice(1),
              type,
              side: 'input',
              required: false,
              description: `${type} data`,
            }}
            showLabel
          />
        ))}
      </div>
    );
  },
};

/**
 * Input vs Output comparison
 */
export const InputVsOutput: Story = {
  render: () => (
    <div className="flex gap-12 p-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Input Ports (Left)</h3>
        <Port
          port={{
            id: '1',
            name: 'Text',
            type: 'text',
            side: 'input',
            required: true,
            description: '',
          }}
          showLabel
        />
        <Port
          port={{
            id: '2',
            name: 'Number',
            type: 'number',
            side: 'input',
            required: false,
            description: '',
          }}
          showLabel
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Output Ports (Right)</h3>
        <Port
          port={{
            id: '3',
            name: 'Result',
            type: 'text',
            side: 'output',
            required: false,
            description: '',
          }}
          showLabel
        />
        <Port
          port={{
            id: '4',
            name: 'Count',
            type: 'number',
            side: 'output',
            required: false,
            description: '',
          }}
          showLabel
        />
      </div>
    </div>
  ),
};

/**
 * Connected vs Not Connected
 */
export const ConnectedVsDisconnected: Story = {
  render: () => (
    <div className="flex gap-12 p-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Disconnected</h3>
        <Port
          port={{
            id: '1',
            name: 'Input',
            type: 'text',
            side: 'input',
            required: false,
            description: '',
          }}
          isConnected={false}
          showLabel
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Connected</h3>
        <Port
          port={{
            id: '2',
            name: 'Input',
            type: 'text',
            side: 'input',
            required: false,
            description: '',
          }}
          isConnected={true}
          showLabel
        />
      </div>
    </div>
  ),
};

/**
 * Interactive hover state
 */
export const InteractiveHover: Story = {
  render: () => {
    const [hovered, setHovered] = useState(false);

    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground mb-4">Hover over the port</p>
        <Port
          port={textInputPort}
          isHovered={hovered}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          showLabel
        />
      </div>
    );
  },
};

/**
 * Interactive connection states
 */
export const InteractiveConnection: Story = {
  render: () => {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    return (
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <button
            onClick={() => setConnecting(!connecting)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
          >
            {connecting ? 'Cancel Connection' : 'Start Connection'}
          </button>
          <button
            onClick={() => setConnected(!connected)}
            className="ml-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm"
          >
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        <Port
          port={textInputPort}
          isConnecting={connecting}
          isCompatible={connecting}
          isConnected={connected}
          showLabel
        />
      </div>
    );
  },
};

/**
 * Multiple types on one port
 */
export const MultipleTypes: Story = {
  args: {
    port: {
      id: 'multi-1',
      name: 'Multi-type',
      type: ['text', 'number', 'list'] as DataType[],
      side: 'input',
      required: false,
      description: 'Accepts multiple types',
    },
    showLabel: true,
  },
};

/**
 * Port grid (all combinations)
 */
export const PortGrid: Story = {
  render: () => {
    const types: DataType[] = ['text', 'number', 'boolean', 'event'];
    const states = [
      { name: 'Default', props: {} },
      { name: 'Connected', props: { isConnected: true } },
      { name: 'Hovered', props: { isHovered: true } },
      { name: 'Compatible', props: { isCompatible: true, isConnecting: true } },
    ];

    return (
      <div className="p-8">
        <div className="grid grid-cols-5 gap-6">
          {/* Header */}
          <div />
          {states.map(state => (
            <div key={state.name} className="text-xs font-semibold text-center">
              {state.name}
            </div>
          ))}

          {/* Rows */}
          {types.map(type => (
            <React.Fragment key={type}>
              <div className="text-xs font-medium flex items-center">
                {type}
              </div>
              {states.map(state => (
                <div key={`${type}-${state.name}`} className="flex justify-center">
                  <Port
                    port={{
                      id: `${type}-${state.name}`,
                      name: type,
                      type,
                      side: 'input',
                      required: false,
                      description: '',
                    }}
                    {...state.props}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Required indicator
 */
export const RequiredPorts: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <h3 className="text-sm font-semibold mb-4">Required Ports (red asterisk)</h3>
      <Port
        port={{
          id: '1',
          name: 'Name',
          type: 'text',
          side: 'input',
          required: true,
          description: '',
        }}
        showLabel
      />
      <Port
        port={{
          id: '2',
          name: 'Email',
          type: 'text',
          side: 'input',
          required: true,
          description: '',
        }}
        showLabel
      />
      <Port
        port={{
          id: '3',
          name: 'Phone',
          type: 'text',
          side: 'input',
          required: false,
          description: '',
        }}
        showLabel
      />
    </div>
  ),
};

/**
 * Dark vs Light (uses current theme)
 */
export const ThemedPorts: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      {['text', 'number', 'boolean', 'event'].map(type => (
        <Port
          key={type}
          port={{
            id: type,
            name: type.charAt(0).toUpperCase() + type.slice(1),
            type: type as DataType,
            side: 'input',
            required: false,
            description: '',
          }}
          showLabel
        />
      ))}
    </div>
  ),
};
