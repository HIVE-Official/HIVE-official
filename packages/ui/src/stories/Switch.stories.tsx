// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '@/components/label'
import { Switch } from '@/components/switch'

const meta: Meta<typeof Switch> = {
	title: 'UI/Switch',
	component: Switch,
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

type Story = StoryObj<typeof Switch>

export const Default: Story = {
	render: (args) => (
		<div className="flex items-center space-x-2">
			<Switch id="airplane-mode" {...args} />
			<Label htmlFor="airplane-mode">Airplane Mode</Label>
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
		checked: true,
		disabled: true,
	},
}
