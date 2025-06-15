import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeCard } from './welcome-card';

const meta: Meta<typeof WelcomeCard> = {
  title: 'Components/Welcome/WelcomeCard',
  component: WelcomeCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'hive-dark',
      values: [
        { name: 'hive-dark', value: '#0A0A0A' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeCard>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '448px' }}>
      <WelcomeCard {...args} />
    </div>
  ),
}; 
