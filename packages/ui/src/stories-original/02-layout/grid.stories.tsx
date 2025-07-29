import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../../components/Grid';
import { Box } from '../../components/Box';

const meta: Meta<typeof Grid> = {
  title: '02-Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const content = (
  <>
    <Box className="p-4 bg-bg-card rounded-lg">Item 1</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 2</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 3</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 4</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 5</Box>
    <Box className="p-4 bg-bg-card rounded-lg">Item 6</Box>
  </>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: 4,
    children: content,
  },
}; 
