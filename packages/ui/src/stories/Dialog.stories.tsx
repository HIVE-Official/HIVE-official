import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from '../components/dialog'
import { Button } from '../components/button'

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible dialog component with focus management and keyboard interactions.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the dialog',
    },
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// Interactive demo with a trigger button
const DialogDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Space"
        description="Enter the details for your new space. You can always edit these later."
      >
        <div className="flex flex-col gap-4">
          <p>This is an example of a dialog with some content.</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Create Space</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

// Basic example
export const Default: Story = {
  render: () => <DialogDemo />,
}

// Different sizes
export const Small: Story = {
  args: {
    isOpen: true,
    title: 'Small Dialog',
    size: 'sm',
    children: (
      <div className="flex flex-col gap-4">
        <p>This is a small dialog.</p>
        <Button>Action</Button>
      </div>
    ),
  },
}

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Large Dialog',
    size: 'lg',
    description: 'This is a larger dialog with a description.',
    children: (
      <div className="flex flex-col gap-4">
        <p>
          This dialog has more content and uses the large size variant. It's
          useful for more complex forms or content that needs more space.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
}

// Example with a form
export const WithForm: Story = {
  args: {
    isOpen: true,
    title: 'Edit Profile',
    size: 'md',
    children: (
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            className="rounded-md border border-border bg-surface-02 px-3 py-2"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            className="rounded-md border border-border bg-surface-02 px-3 py-2"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    ),
  },
}

// Example with long content
export const WithLongContent: Story = {
  args: {
    isOpen: true,
    title: 'Terms of Service',
    size: 'xl',
    children: (
      <div className="flex flex-col gap-4">
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Section {i + 1}</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </div>
      </div>
    ),
  },
} 