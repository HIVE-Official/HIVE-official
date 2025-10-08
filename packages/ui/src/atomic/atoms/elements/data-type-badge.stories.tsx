import type { Meta, StoryObj } from '@storybook/react';
import { DataTypeBadge } from './data-type-badge';
import type { DataType } from '@/types/hivelab.types';

/**
 * # Data Type Badge
 *
 * Color-coded badge showing data type with icon and label.
 * Used throughout HiveLab for type indication in ports, properties, and documentation.
 *
 * ## Features
 * - 11 data types with unique colors
 * - Icon for each type
 * - 3 sizes: sm, md, lg
 * - 3 variants: default (filled), outline, subtle
 * - Supports multiple types (union types)
 * - Customizable (show/hide icon and label)
 *
 * ## Usage
 * ```tsx
 * <DataTypeBadge type="text" />
 * <DataTypeBadge type={['text', 'number']} variant="outline" />
 * ```
 */
const meta = {
  title: '05-HiveLab/Elements/DataTypeBadge',
  component: DataTypeBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTypeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge (text type)
 */
export const Default: Story = {
  args: {
    type: 'text',
  },
};

/**
 * All 11 data types
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
      <div className="p-8 space-y-3">
        <h3 className="text-sm font-semibold mb-4">All Data Types</h3>
        {types.map(type => (
          <div key={type} className="flex items-center gap-4">
            <DataTypeBadge type={type} />
            <span className="text-xs text-muted-foreground">
              {type === 'any' && '→ Accepts anything'}
              {type === 'text' && '→ String data'}
              {type === 'number' && '→ Numeric values'}
              {type === 'boolean' && '→ True/false'}
              {type === 'date' && '→ DateTime values'}
              {type === 'user' && '→ User objects'}
              {type === 'list' && '→ Array of items'}
              {type === 'object' && '→ Complex objects'}
              {type === 'event' && '→ Trigger signals'}
              {type === 'file' && '→ File uploads'}
              {type === 'validation' && '→ Validation results'}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Size variations
 */
export const Sizes: Story = {
  render: () => (
    <div className="p-8 flex items-center gap-4">
      <DataTypeBadge type="text" size="sm" />
      <DataTypeBadge type="text" size="md" />
      <DataTypeBadge type="text" size="lg" />
    </div>
  ),
};

/**
 * Variant: Default (filled)
 */
export const VariantDefault: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" variant="default" />
      <DataTypeBadge type="number" variant="default" />
      <DataTypeBadge type="boolean" variant="default" />
      <DataTypeBadge type="event" variant="default" />
    </div>
  ),
};

/**
 * Variant: Outline
 */
export const VariantOutline: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" variant="outline" />
      <DataTypeBadge type="number" variant="outline" />
      <DataTypeBadge type="boolean" variant="outline" />
      <DataTypeBadge type="event" variant="outline" />
    </div>
  ),
};

/**
 * Variant: Subtle
 */
export const VariantSubtle: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" variant="subtle" />
      <DataTypeBadge type="number" variant="subtle" />
      <DataTypeBadge type="boolean" variant="subtle" />
      <DataTypeBadge type="event" variant="subtle" />
    </div>
  ),
};

/**
 * Icon only (no label)
 */
export const IconOnly: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" showLabel={false} />
      <DataTypeBadge type="number" showLabel={false} />
      <DataTypeBadge type="boolean" showLabel={false} />
      <DataTypeBadge type="event" showLabel={false} />
      <DataTypeBadge type="user" showLabel={false} />
    </div>
  ),
};

/**
 * Label only (no icon)
 */
export const LabelOnly: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" showIcon={false} />
      <DataTypeBadge type="number" showIcon={false} />
      <DataTypeBadge type="boolean" showIcon={false} />
      <DataTypeBadge type="event" showIcon={false} />
    </div>
  ),
};

/**
 * Multiple types (union)
 */
export const MultipleTypes: Story = {
  render: () => (
    <div className="p-8 space-y-3">
      <h3 className="text-sm font-semibold mb-4">Union Types</h3>
      <DataTypeBadge type={['text', 'number']} />
      <DataTypeBadge type={['text', 'number', 'boolean']} />
      <DataTypeBadge type={['user', 'list']} variant="outline" />
    </div>
  ),
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default (Filled)</h3>
        <div className="flex flex-wrap gap-2">
          {(['text', 'number', 'boolean', 'event', 'user'] as DataType[]).map(type => (
            <DataTypeBadge key={type} type={type} variant="default" />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Outline</h3>
        <div className="flex flex-wrap gap-2">
          {(['text', 'number', 'boolean', 'event', 'user'] as DataType[]).map(type => (
            <DataTypeBadge key={type} type={type} variant="outline" />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Subtle</h3>
        <div className="flex flex-wrap gap-2">
          {(['text', 'number', 'boolean', 'event', 'user'] as DataType[]).map(type => (
            <DataTypeBadge key={type} type={type} variant="subtle" />
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * In context (properties panel)
 */
export const InPropertiesPanel: Story = {
  render: () => (
    <div className="p-8 max-w-sm">
      <div className="border rounded-lg p-4 space-y-3 bg-background">
        <h3 className="text-sm font-semibold mb-2">Port Configuration</h3>

        <div className="space-y-2">
          <label className="text-xs font-medium">Port Name</label>
          <input
            type="text"
            value="User Input"
            className="w-full px-2 py-1 text-sm border rounded"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Data Type</label>
          <div className="flex gap-2">
            <DataTypeBadge type="text" variant="subtle" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium flex items-center gap-2">
            <input type="checkbox" checked readOnly />
            <span>Required</span>
          </label>
        </div>
      </div>
    </div>
  ),
};

/**
 * Grid of all combinations
 */
export const BadgeGrid: Story = {
  render: () => {
    const types: DataType[] = ['text', 'number', 'boolean', 'event'];
    const variants: Array<'default' | 'outline' | 'subtle'> = ['default', 'outline', 'subtle'];
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    return (
      <div className="p-8 space-y-8">
        {variants.map(variant => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-3 capitalize">{variant}</h3>
            <div className="space-y-3">
              {sizes.map(size => (
                <div key={size} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">{size}</span>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <DataTypeBadge
                        key={`${variant}-${size}-${type}`}
                        type={type}
                        variant={variant}
                        size={size}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * With custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      <DataTypeBadge type="text" className="shadow-md" />
      <DataTypeBadge type="number" className="border-2 border-primary" />
      <DataTypeBadge type="event" className="font-bold" />
    </div>
  ),
};

/**
 * Compact display (icon only, small)
 */
export const CompactDisplay: Story = {
  render: () => (
    <div className="p-8">
      <div className="flex gap-1">
        {(['text', 'number', 'boolean', 'event', 'user', 'list', 'object', 'file'] as DataType[]).map(type => (
          <DataTypeBadge
            key={type}
            type={type}
            size="sm"
            showLabel={false}
            variant="subtle"
          />
        ))}
      </div>
    </div>
  ),
};

/**
 * In element card header
 */
export const InElementCard: Story = {
  render: () => (
    <div className="p-8">
      <div className="border rounded-lg bg-background shadow-sm max-w-xs">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="text-sm font-semibold">Text Input</span>
          </div>
          <DataTypeBadge type="text" size="sm" variant="subtle" />
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground">
            Collect text input from users
          </p>
        </div>
      </div>
    </div>
  ),
};
