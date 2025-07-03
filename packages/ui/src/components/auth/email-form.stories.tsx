import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EmailForm } from './email-form';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof EmailForm> = {
  title: 'Auth/EmailForm',
  component: EmailForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof EmailForm>;

export const Default: Story = {
  args: {
    onSubmit: action('onSubmit'),
    isLoading: false,
    apiError: null,
  },
};

export const WithInput: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com');
  },
};

export const InvalidInput: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/email/i), 'not-an-email');
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com');
  },
};

export const ApiError: Story = {
  args: {
    ...Default.args,
    apiError: 'This email is not eligible. Check back soon!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com');
  },
}; 