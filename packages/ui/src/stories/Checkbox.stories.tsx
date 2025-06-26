// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/checkbox'
import { Label } from '@/components/label'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  ...Default,
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  ...Default,
  args: {
    disabled: true,
    checked: true,
  },
}

export const WithText: Story = {
  render: (args) => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" {...args} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms1">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
}
