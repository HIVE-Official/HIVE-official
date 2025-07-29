import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button';
import { Icon, Plus, Heart, Settings, Download } from '../../atomic/atoms';

const meta: Meta<typeof Button> = {
  title: '02-Atoms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Button Atom

Core button component using 100% semantic tokens (var(--hive-*)).

## Variants
- **Primary**: Main actions using brand-primary (#0070F3)
- **Secondary**: Subtle actions with borders
- **Ghost**: Minimal hover states
- **Accent**: Gold emphasis for special actions (#FFD700)
- **Destructive**: Error actions
- **Outline**: Bordered variant

## Design Principles
- Uses only semantic tokens (no hardcoded colors)
- Mobile-first responsive design
- Subtle hover/focus states
- Apple-inspired generous border radius (16px)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'accent', 'destructive', 'outline'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg', 'icon'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Gold Accent</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Icon icon={Plus} />
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<Icon icon={Plus} />}>Add Space</Button>
          <Button variant="secondary" icon={<Icon icon={Heart} />}>Like</Button>
          <Button variant="ghost" icon={<Icon icon={Settings} />} iconPosition="right">Settings</Button>
          <Button variant="accent" icon={<Icon icon={Download} />}>Download</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      </div>
    </div>
  ),
};

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Join Space',
    variant: 'primary',
  },
};

export const Accent: StoryObj<typeof Button> = {
  args: {
    children: 'Create Tool',
    variant: 'accent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Gold accent button using semantic token var(--hive-brand-secondary) = #FFD700. Use sparingly for special emphasis.',
      },
    },
  },
};

export const Interactive: StoryObj<typeof Button> = {
  render: () => (
    <div className="space-y-4">
      <p className="text-[var(--hive-text-secondary)]">Hover and click these buttons to see interactions:</p>
      <div className="flex gap-4">
        <Button variant="primary">Hover Me</Button>
        <Button variant="accent">Click Me</Button>
        <Button variant="secondary">Press Me</Button>
      </div>
    </div>
  ),
};