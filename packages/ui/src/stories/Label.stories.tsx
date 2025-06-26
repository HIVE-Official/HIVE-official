import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../components/label'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1A1A1A' },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Label>) => (
    <Label {...args}>Label Text</Label>
  ),
}
