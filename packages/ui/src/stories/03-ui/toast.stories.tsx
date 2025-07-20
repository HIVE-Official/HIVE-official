import type { Meta, StoryObj } from '@storybook/react';
import { 
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Button
} from '../../components';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const meta: Meta<typeof Toast> = {
  title: '03-UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toast notification components for user feedback.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Scheduled: Catch up</ToastTitle>
          <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
          <ToastDescription>There was a problem with your request.</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast variant="destructive">
        <div className="grid gap-1">
          <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
          <ToastDescription>There was a problem with your request.</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4">
        <Toast>
          <div className="grid gap-1">
            <ToastTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Success
            </ToastTitle>
            <ToastDescription>Your changes have been saved successfully.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        
        <Toast variant="destructive">
          <div className="grid gap-1">
            <ToastTitle className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Error
            </ToastTitle>
            <ToastDescription>Failed to save changes. Please try again.</ToastDescription>
          </div>
          <ToastAction altText="Retry">Retry</ToastAction>
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};