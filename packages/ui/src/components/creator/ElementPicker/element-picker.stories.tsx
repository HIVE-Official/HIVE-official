import type { Meta, StoryObj } from '@storybook/react';
import { ElementPicker } from './element-picker';

const meta = {
  title: 'Creator/ElementPicker',
  component: ElementPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElementPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-yellow-400',
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
  },
};

export const Interactive: Story = {
  args: {
    onElementSelect: (elementId: string) => {
      alert(`You selected: ${elementId}`);
    },
  },
}; 
