import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '../components/radio-group'
import { Label } from '../components/label'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
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
  subcomponents: { RadioGroupItem },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1" className="flex gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="1" id="r1" />
        <Label htmlFor="r1">One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="2" id="r2" />
        <Label htmlFor="r2">Two</Label>
      </div>
    </RadioGroup>
  ),
}
