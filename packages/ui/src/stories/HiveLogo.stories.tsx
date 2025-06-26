// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HiveLogo } from '../components/HiveLogo'

const meta: Meta<typeof HiveLogo> = {
  title: 'UI/HiveLogo',
  component: HiveLogo,
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

type Story = StoryObj<typeof HiveLogo>

export const Default: Story = {}
