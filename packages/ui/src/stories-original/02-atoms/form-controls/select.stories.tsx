import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectSeparator
} from '../../../components/ui/select';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';

// Create a wrapper component for better Storybook integration
const SelectDemo = ({ placeholder, items, defaultValue, disabled }: {
  placeholder?: string;
  items: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string;
  disabled?: boolean;
}) => (
  <Select defaultValue={defaultValue} disabled={disabled}>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder={placeholder || "Select an option"} />
    </SelectTrigger>
    <SelectContent>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const meta: Meta<typeof SelectDemo> = {
  title: '02-atoms/Form Controls/Select',
  component: SelectDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Select Component** - A dropdown selection control built on Radix UI

Part of the HIVE Atomic Design System with enhanced accessibility and consistent styling.

## Features
- **Radix UI Foundation**: Built on robust, accessible primitives
- **Keyboard Navigation**: Arrow keys, Enter, Escape, type-ahead search
- **Accessibility**: Full ARIA support with proper focus management
- **Portal Rendering**: Dropdown content rendered in portal for z-index management
- **Scroll Support**: Built-in scroll buttons for long option lists
- **Grouping**: Support for grouped options with labels and separators
- **Flexible Content**: Supports icons, descriptions, and custom content
- **Consistent**: Follows HIVE design token system

## Components
- **Select**: Root container component
- **SelectTrigger**: The clickable trigger button
- **SelectValue**: Displays selected value or placeholder
- **SelectContent**: The dropdown content container
- **SelectItem**: Individual option items
- **SelectLabel**: Group labels
- **SelectGroup**: Groups related options
- **SelectSeparator**: Visual dividers between groups
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected'
    },
    items: {
      description: 'Array of option items with value and label'
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' }
];

const planItems = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan - $9/month' },
  { value: 'team', label: 'Team Plan - $29/month' },
  { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
];

// Default Select
export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    items: basicItems
  }
};

// With Default Value
export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Select a fruit',
    items: basicItems,
    defaultValue: 'banana'
  }
};

// Disabled Select
export const Disabled: Story = {
  args: {
    placeholder: 'Select a fruit',
    items: basicItems,
    disabled: true
  }
};

// Disabled Options
export const DisabledOptions: Story = {
  args: {
    placeholder: 'Choose your plan',
    items: planItems
  }
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="fruit-select">Favorite Fruit</Label>
      <Select>
        <SelectTrigger id="fruit-select" className="w-[280px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {basicItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
};

// Grouped Options
export const GroupedOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="go">Go</SelectItem>
          <SelectItem value="rust">Rust</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Database</SelectLabel>
          <SelectItem value="postgres">PostgreSQL</SelectItem>
          <SelectItem value="mysql">MySQL</SelectItem>
          <SelectItem value="mongodb">MongoDB</SelectItem>
          <SelectItem value="redis">Redis</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

// Long List with Scroll
export const LongList: Story = {
  render: () => {
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
      'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland',
      'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland',
      'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore'
    ];

    return (
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.toLowerCase().replace(' ', '-')} value={country.toLowerCase()}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Account Settings</h3>
      
      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select>
          <SelectTrigger id="timezone">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Time (EST)</SelectItem>
              <SelectItem value="cst">Central Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Time (PST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select defaultValue="en">
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select defaultValue="dark">
          <SelectTrigger id="theme">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </HiveCard>
  )
};

// Size Variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Small Select</h4>
        <Select>
          <SelectTrigger className="w-50 h-8 text-sm">
            <SelectValue placeholder="Small select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Default Select</h4>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Default size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Large Select</h4>
        <Select>
          <SelectTrigger className="w-75 h-12 text-lg">
            <SelectValue placeholder="Large select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Accessibility Features</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Arrow keys, Enter, Escape)</p>
        <p className="text-sm text-gray-300">✅ Type-ahead search functionality</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with ARIA labels</p>
        <p className="text-sm text-gray-300">✅ Focus management and indicators</p>
        <p className="text-sm text-gray-300">✅ Portal rendering for proper layering</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Try keyboard navigation:</h4>
        <div className="space-y-2">
          <Label htmlFor="accessible-select">Accessible Select</Label>
          <Select>
            <SelectTrigger id="accessible-select" aria-describedby="select-help">
              <SelectValue placeholder="Use Tab to focus, Enter to open" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alpha">Alpha - Type 'a' to jump here</SelectItem>
              <SelectItem value="beta">Beta - Arrow keys navigate</SelectItem>
              <SelectItem value="gamma">Gamma - Enter to select</SelectItem>
              <SelectItem value="delta">Delta - Escape to close</SelectItem>
            </SelectContent>
          </Select>
          <p id="select-help" className="text-xs text-gray-400">
            Tab to focus, Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close
          </p>
        </div>
      </div>
    </div>
  )
};