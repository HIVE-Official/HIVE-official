import type { Meta, StoryObj } from '@storybook/react'
import { Counter } from '../counter'

const meta: Meta<typeof Counter> = {
	title: 'UI/Counter',
	component: Counter,
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'number' },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
	},
	parameters: {
		layout: 'centered',
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: 50,
		min: 0,
		max: 100,
		step: 1,
	},
}

export const CustomStep: Story = {
	args: {
		value: 10,
		min: 0,
		max: 100,
		step: 5,
	},
}

export const NegativeRange: Story = {
	args: {
		value: -5,
		min: -10,
		max: 10,
		step: 1,
	},
} 