import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
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
      options: ['default', 'primary', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
    children: 'Primary',
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

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    variant: 'link',
    children: 'Link',
  },
};
