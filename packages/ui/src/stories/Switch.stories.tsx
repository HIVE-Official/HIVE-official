import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '../components/label'
import { Switch } from '../components/switch'

const meta: Meta<typeof Switch> = {
	title: 'Design System/Switch',
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
};

// === GROCERY STORE SHOWCASE ===
export const GroceryShowcase: Story = {
	name: "🛒 Switch Grocery Store",
	render: () => (
		<div className="space-y-8 p-8">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-white">HIVE Switch Grocery Store</h2>
				<p className="text-gray-400">Pick your perfect switch variant</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Default States */}
				<div className="space-y-4 p-4 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white">Default States</h3>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Switch id="switch-off" />
							<Label htmlFor="switch-off">Off State</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch id="switch-on" defaultChecked />
							<Label htmlFor="switch-on">On State</Label>
						</div>
					</div>
				</div>

				{/* Disabled States */}
				<div className="space-y-4 p-4 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white">Disabled States</h3>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Switch id="switch-disabled-off" disabled />
							<Label htmlFor="switch-disabled-off">Disabled Off</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch id="switch-disabled-on" disabled defaultChecked />
							<Label htmlFor="switch-disabled-on">Disabled On</Label>
						</div>
					</div>
				</div>

				{/* Campus Examples */}
				<div className="space-y-4 p-4 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white">Campus Settings</h3>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Switch id="notifications" defaultChecked />
							<Label htmlFor="notifications">Push Notifications</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch id="location" />
							<Label htmlFor="location">Share Location</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch id="dark-mode" defaultChecked />
							<Label htmlFor="dark-mode">Dark Mode</Label>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center pt-8 border-t border-gray-800">
				<p className="text-gray-400 text-sm">
					🎛️ Following HIVE Design System - Gold accent for active state
				</p>
			</div>
		</div>
	),
};
