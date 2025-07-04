import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../components/checkbox'
import { Label } from '../components/label'

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Checkbox',
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
};

// === GROCERY STORE SHOWCASE ===
export const GroceryShowcase: Story = {
  name: "🛒 Checkbox Grocery Store",
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">HIVE Checkbox Grocery Store</h2>
        <p className="text-gray-400">Pick your perfect checkbox variant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default States */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Default States</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="unchecked" />
              <Label htmlFor="unchecked">Unchecked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checked" defaultChecked />
              <Label htmlFor="checked">Checked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="indeterminate" />
              <Label htmlFor="indeterminate">Indeterminate</Label>
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Disabled States</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-unchecked" disabled />
              <Label htmlFor="disabled-unchecked">Disabled Unchecked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <Label htmlFor="disabled-checked">Disabled Checked</Label>
            </div>
          </div>
        </div>

        {/* Campus Examples */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Campus Use Cases</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="agree-terms" />
              <Label htmlFor="agree-terms">Agree to Terms</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="join-study-group" defaultChecked />
              <Label htmlFor="join-study-group">Join Study Group</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="email-updates" />
              <Label htmlFor="email-updates">Email Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="public-profile" defaultChecked />
              <Label htmlFor="public-profile">Public Profile</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          ✅ Following HIVE Design System - Gold accent for checked states
        </p>
      </div>
    </div>
  ),
};
