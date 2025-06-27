/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner, PageLoader, InlineLoader, CardLoader } from '@/components/loading-spinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/Loading Spinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile loading spinner component with multiple variants and sizes, using HIVE design tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'foreground', 'surface'],
      description: 'Visual style of the spinner',
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    message: {
      control: 'text',
      description: 'Optional loading message',
    },
    centered: {
      control: 'boolean',
      description: 'Center the spinner in its container',
    },
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

// === BASIC VARIANTS ===
export const Default: Story = {
  args: {},
}

export const WithMessage: Story = {
  args: {
    message: "Loading content...",
  },
}

export const Centered: Story = {
  args: {
    centered: true,
    message: "Please wait...",
  },
  parameters: {
    layout: 'fullscreen',
  },
}

// === SIZE VARIANTS ===
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="xs" />
        <p className="text-caption font-sans text-muted mt-2">Extra Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-caption font-sans text-muted mt-2">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="default" />
        <p className="text-caption font-sans text-muted mt-2">Default</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-caption font-sans text-muted mt-2">Large</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="text-caption font-sans text-muted mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

// === COLOR VARIANTS ===
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8 bg-surface-01 p-6 rounded-lg">
      <div className="text-center">
        <LoadingSpinner variant="default" />
        <p className="text-caption font-sans text-muted mt-2">Default (Accent)</p>
      </div>
      <div className="text-center">
        <LoadingSpinner variant="muted" />
        <p className="text-caption font-sans text-muted mt-2">Muted</p>
      </div>
      <div className="text-center">
        <LoadingSpinner variant="foreground" />
        <p className="text-caption font-sans text-muted mt-2">Foreground</p>
      </div>
      <div className="text-center">
        <LoadingSpinner variant="surface" />
        <p className="text-caption font-sans text-muted mt-2">Surface</p>
      </div>
    </div>
  ),
}

// === CONVENIENCE COMPONENTS ===
export const PageLoaderExample: Story = {
  render: () => <PageLoader message="Loading your dashboard..." />,
  parameters: {
    layout: 'fullscreen',
  },
}

export const InlineLoaderExample: Story = {
  render: () => (
    <div className="bg-surface-01 p-6 rounded-lg">
      <h3 className="text-h4 font-display font-semibold mb-4">Your Recent Activity</h3>
      <div className="flex items-center">
        <InlineLoader message="Loading activities..." />
      </div>
    </div>
  ),
}

export const CardLoaderExample: Story = {
  render: () => <CardLoader message="Loading user profile..." />,
}

// === REAL-WORLD USAGE ===
export const InContext: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      {/* Form with inline loading */}
      <div className="bg-surface-01 border border-border rounded-lg p-4">
        <h3 className="text-h4 font-display font-semibold mb-3">Update Profile</h3>
        <div className="space-y-3">
          <input 
            className="w-full px-3 py-2 bg-surface-02 border border-border rounded-md text-body font-sans"
            placeholder="Full name"
            disabled
          />
          <div className="flex items-center justify-between">
            <InlineLoader size="sm" />
            <span className="text-body-sm font-sans text-muted">Saving changes...</span>
          </div>
        </div>
      </div>

      {/* Button with loading state */}
      <button 
        className="w-full bg-foreground text-background font-semibold py-3 px-4 rounded-lg opacity-75 cursor-not-allowed flex items-center justify-center"
        disabled
      >
        <LoadingSpinner size="sm" variant="foreground" className="mr-2" />
        Processing...
      </button>
    </div>
  ),
} 