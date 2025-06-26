import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1A1A1A' },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
    args: {
      ...Default.args,
      variant: 'secondary',
      children: 'Secondary',
    },
  };

export const Destructive: Story = {
    args: {
      ...Default.args,
      variant: 'destructive',
      children: 'Destructive',
    },
  };

export const Outline: Story = {
    args: {
      ...Default.args,
      variant: 'outline',
      children: 'Outline',
    },
  }; 