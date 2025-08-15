import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../components/Stack';
import { Box } from '../../components/Box';

const meta: Meta<typeof Stack> = {
  title: '02-Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

const content = (
  <>
    <Box className="p-4 bg-bg-card rounded-lg">Item 1</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 2</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 3</Box>
  </>
);

export const Vertical: Story = {
  args: {
    direction: 'col',
    gap: 4,
    children: content,
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'row',
    gap: 4,
    children: content,
  },
}; 
