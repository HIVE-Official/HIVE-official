import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Label } from '../../components';

const meta: Meta<typeof Checkbox> = {
  title: '03-UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component for binary choices with labels and states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled checkbox</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled and checked</Label>
      </div>
    </div>
  ),
};

export const WithLongLabels: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-start space-x-2">
        <Checkbox id="long1" className="mt-1" />
        <Label htmlFor="long1" className="text-sm">
          I agree to the terms of service and privacy policy. By checking this box, 
          I acknowledge that I have read and understood all the terms and conditions.
        </Label>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="long2" className="mt-1" />
        <Label htmlFor="long2" className="text-sm">
          Send me promotional emails and marketing communications about new features, 
          updates, and special offers.
        </Label>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 p-6 border rounded-lg bg-muted/50 max-w-md">
      <h3 className="text-lg font-medium">Account Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="notifications" defaultChecked />
          <Label htmlFor="notifications">Email notifications</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter">Subscribe to newsletter</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <Label htmlFor="marketing">Marketing communications</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="security" defaultChecked disabled />
          <Label htmlFor="security">Security alerts (required)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="beta" />
          <Label htmlFor="beta">Beta features access</Label>
        </div>
      </div>
    </div>
  ),
};

export const KitchenSink: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-6">
      {/* Basic States */}
      <div className="space-y-4">
        <h4 className="font-medium">Basic States</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="unchecked" />
            <Label htmlFor="unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="checked-demo" defaultChecked />
            <Label htmlFor="checked-demo">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="indeterminate" />
            <Label htmlFor="indeterminate">Indeterminate (manual)</Label>
          </div>
        </div>
      </div>

      {/* Disabled States */}
      <div className="space-y-4">
        <h4 className="font-medium">Disabled States</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-unchecked" disabled />
            <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked-demo" disabled defaultChecked />
            <Label htmlFor="disabled-checked-demo">Disabled checked</Label>
          </div>
        </div>
      </div>

      {/* Grouped Checkboxes */}
      <div className="col-span-2 space-y-4">
        <h4 className="font-medium">Grouped Options</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Features</h5>
            <div className="space-y-2">
              {['Dark mode', 'Auto-save', 'Spell check', 'Smart suggestions'].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox id={`feature-${i}`} defaultChecked={i % 2 === 0} />
                  <Label htmlFor={`feature-${i}`} className="text-sm">{feature}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Notifications</h5>
            <div className="space-y-2">
              {['Push notifications', 'Email updates', 'SMS alerts', 'In-app messages'].map((notif, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox id={`notif-${i}`} defaultChecked={i === 0} />
                  <Label htmlFor={`notif-${i}`} className="text-sm">{notif}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};