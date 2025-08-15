import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../components';

const meta: Meta<typeof Alert> = {
  title: '03-UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A callout component for displaying important information to users.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'This is a destructive alert message.',
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <>
        <h4 className="mb-1 font-medium leading-none tracking-tight">Alert Title</h4>
        <p className="text-sm [&:not(:first-child)]:mt-6">
          This alert has both a title and description.
        </p>
      </>
    ),
  },
};