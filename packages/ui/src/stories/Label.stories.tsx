/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
 
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/components/input'
import { Label } from '@/components/label'

const meta: Meta<typeof Label> = {
	title: 'UI/Label',
	component: Label,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark',
		},
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
		},
	},
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
	args: {
		children: 'Your Email Address',
	},
}

export const WithInput: Story = {
	render: (args) => (
		<div className="grid w-full max-w-sm items-center gap-2.5">
			<Label htmlFor="email" {...args}>
				Email
			</Label>
			<Input type="email" id="email" placeholder="m@example.com" />
		</div>
	),
	args: {
		...Default.args,
	},
}
