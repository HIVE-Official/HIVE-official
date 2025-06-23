import type { Meta, StoryObj } from '@storybook/react'
import { HiveLogo } from '@/components/brand/HiveLogo'

const meta: Meta<typeof HiveLogo> = {
	component: HiveLogo,
	title: 'Brand/HiveLogo',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'hive-dark',
			values: [{ name: 'hive-dark', value: '#0A0A0A' }],
		},
	},
	argTypes: {
		showText: {
			control: 'boolean',
			description: 'Whether to show the "HIVE" text next to the logo.',
		},
		size: {
			control: { type: 'range', min: 16, max: 128, step: 4 },
			description: 'The size of the logo icon in pixels.',
		},
	},
}

export default meta

type Story = StoryObj<typeof HiveLogo>

export const Default: Story = {
	args: {
		showText: true,
		size: 32,
	},
}

export const IconOnly: Story = {
	args: {
		showText: false,
		size: 48,
	},
}

export const LargeWithText: Story = {
	args: {
		showText: true,
		size: 64,
	},
}

export const Small: Story = {
	args: {
		showText: true,
		size: 24,
	},
} 