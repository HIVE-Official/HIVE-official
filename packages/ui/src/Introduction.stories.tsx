import type { Meta, StoryObj } from '@storybook/react';
import { Introduction } from './Introduction';

const meta = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to the HIVE Design System - your comprehensive UI component library built with atomic design principles.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
