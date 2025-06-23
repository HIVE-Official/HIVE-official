import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Timer } from '../timer'

const meta: Meta<typeof Timer> = {
	title: 'UI/Timer',
	component: Timer,
	tags: ['autodocs'],
	argTypes: {
		duration: { control: 'number' },
		autoStart: { control: 'boolean' },
		onComplete: { action: 'completed' },
	},
	parameters: {
		layout: 'centered',
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		duration: 60,
		onComplete: action('completed'),
	},
}

export const FiveSeconds: Story = {
	name: '5 Second Timer (Auto-starts)',
	args: {
		duration: 5,
		autoStart: true,
		onComplete: action('completed'),
	},
}

export const LongDuration: Story = {
	name: '1.5 Hour Timer',
	args: {
		duration: 5400, // 1.5 hours in seconds
		onComplete: action('completed'),
	},
} 