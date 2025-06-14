import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/test';

import { SchoolSearchInput } from './school-search-input';

const meta: Meta<typeof SchoolSearchInput> = {
  title: 'Components/Welcome/SchoolSearchInput',
  component: SchoolSearchInput,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'hive-dark',
      values: [{ name: 'hive-dark', value: '#0A0A0A' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSchoolSelect: {
      action: 'selected',
      description: 'Callback function when a school is selected from the list.',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SchoolSearchInput>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '384px' }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  render: (args) => (
    <div style={{ width: '384px' }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText('Search for your university...');
    await userEvent.type(input, 'NonExistent University', { delay: 50 });
  },
}; 