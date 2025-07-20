import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components';

const meta: Meta<typeof Badge> = {
  title: '03-UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Accent: Story = {
  args: {
    ...Default.args,
    variant: 'accent',
    children: 'Accent',
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
