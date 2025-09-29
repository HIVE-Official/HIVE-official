import type { Meta, StoryObj } from '@storybook/react';
import { HiveButton } from './hive-button';
import { Users, Settings, Database } from 'lucide-react';

const meta: Meta<typeof HiveButton> = {
  title: 'HIVE/Atoms/HiveButton',
  component: HiveButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and states for the HIVE admin system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'HIVE Admin Button',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete User',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Secondary Action',
    variant: 'outline',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Users className="mr-2 h-4 w-4" />
        View Users
      </>
    ),
  },
};

export const AdminActions: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <HiveButton>
        <Database className="mr-2 h-4 w-4" />
        Database Status
      </HiveButton>
      <HiveButton variant="outline">
        <Settings className="mr-2 h-4 w-4" />
        System Config
      </HiveButton>
      <HiveButton variant="destructive">
        Emergency Stop
      </HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common admin action buttons used throughout the HIVE dashboard.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <HiveButton disabled>
        Loading...
      </HiveButton>
      <HiveButton variant="outline" disabled>
        Processing
      </HiveButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HiveButton size="sm">Small</HiveButton>
      <HiveButton size="default">Default</HiveButton>
      <HiveButton size="lg">Large</HiveButton>
      <HiveButton size="icon">
        <Settings className="h-4 w-4" />
      </HiveButton>
    </div>
  ),
};