/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast, type ToastProps } from '../components/toast'
import { ToastProvider, useToast } from '../components/toast-provider'
import { Button } from '../components/button'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toast notification component with support for different intents, positions, and auto-dismiss.',
      },
    },
  },
  argTypes: {
    intent: {
      control: 'select',
      options: ['success', 'error', 'info'],
      description: 'The visual style of the toast',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Where the toast appears on screen',
    },
    duration: {
      control: 'number',
      description: 'How long the toast stays visible (in ms). Set to Infinity to disable auto-dismiss.',
    },
    message: {
      control: 'text',
      description: 'The message to display in the toast',
    },
  },
}

export default meta
type Story = StoryObj<ToastProps>

// Individual Toast Stories
export const Success: Story = {
  args: {
    intent: 'success',
    message: 'Operation completed successfully!',
    isVisible: true,
    onClose: () => {},
  },
}

export const Error: Story = {
  args: {
    intent: 'error',
    message: 'Something went wrong. Please try again.',
    isVisible: true,
    onClose: () => {},
  },
}

export const Info: Story = {
  args: {
    intent: 'info',
    message: 'New update available.',
    isVisible: true,
    onClose: () => {},
  },
}

export const CustomDuration: Story = {
  args: {
    ...Success.args,
    duration: 10000,
  },
}

export const BottomPosition: Story = {
  args: {
    ...Info.args,
    position: 'bottom-right',
  },
}

// Interactive Demo with ToastProvider
const ToastDemo = () => {
  const { showToast } = useToast()

  return (
    <div className="space-y-4">
      <Button
        onClick={() =>
          showToast('Operation completed successfully!', {
            intent: 'success',
          })
        }
      >
        Show Success Toast
      </Button>
      
      <Button
        onClick={() =>
          showToast('Something went wrong. Please try again.', {
            intent: 'error',
          })
        }
      >
        Show Error Toast
      </Button>
      
      <Button
        onClick={() =>
          showToast('New update available.', {
            intent: 'info',
            position: 'bottom-right',
            duration: 10000,
          })
        }
      >
        Show Custom Toast
      </Button>
    </div>
  )
}

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using ToastProvider to show toasts programmatically.',
      },
    },
  },
} 