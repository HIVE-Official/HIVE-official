import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../components/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
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
  subcomponents: { AvatarImage, AvatarFallback },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
    render: (args: React.ComponentProps<typeof Avatar>) => (
      <Avatar {...args}>
        <AvatarImage src="https://broken-link.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  }; 