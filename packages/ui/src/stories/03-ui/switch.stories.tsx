import type { Meta, StoryObj } from '@storybook/react';
import { Switch, Label } from '../../components';

const meta: Meta<typeof Switch> = {
  title: '03-UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and not checked.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications" className="text-sm font-medium">
          Push Notifications
        </Label>
        <Switch id="notifications" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="analytics" className="text-sm font-medium">
          Analytics
        </Label>
        <Switch id="analytics" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="marketing" className="text-sm font-medium">
          Marketing Emails
        </Label>
        <Switch id="marketing" disabled />
      </div>
    </div>
  ),
};