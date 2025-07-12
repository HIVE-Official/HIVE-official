/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SchoolCreationDialog } from '../../components/auth/school-creation-dialog'
import { Button } from '../../components/button'

const meta = {
  title: 'Auth/SchoolCreationDialog',
  component: SchoolCreationDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dialog for submitting new schools to be added to the HIVE platform.',
      },
    },
  },
} satisfies Meta<typeof SchoolCreationDialog>

export default meta
type Story = StoryObj<typeof meta>

// Interactive demo with a trigger button
const SchoolCreationDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: { name: string; domain: string }) => {
    console.warn('Submitted:', data)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setIsOpen(true)}>Add Your School</Button>
      <SchoolCreationDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

// Default story with interactive demo
export const Default: Story = {
  render: () => <SchoolCreationDemo />,
}

// Always open story for visual testing
export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: (data: { name: string; domain: string }) => console.warn('Submitted:', data),
  },
} 