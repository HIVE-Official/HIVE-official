import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Checkbox } from './checkbox';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Switch } from './switch';
import { Label } from './label';
import { Button } from './button';
import React from 'react';

const AllFormsTest = () => (
    <div>All Forms Test</div>
);

const meta: Meta = {
    title: 'UI/All Forms Test',
    component: AllFormsTest,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'hive-dark',
            values: [{ name: 'hive-dark', value: '#0A0A0A' }],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllFormElements: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-8 space-y-8 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Complete Form Elements Test
        </h1>
        <p className="text-muted text-sm">
          All form elements should display WHITE text (#FFFFFF)
        </p>
      </div>

      {/* Text Inputs */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Text Inputs
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              defaultValue="test@university.edu"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter password" 
              defaultValue="secretpassword"
            />
          </div>

          <div>
            <Label htmlFor="search">Search Field</Label>
            <Input 
              id="search" 
              type="search" 
              placeholder="Search for spaces..." 
              defaultValue="Computer Science"
            />
          </div>

          <div>
            <Label htmlFor="number">Number Input</Label>
            <Input 
              id="number" 
              type="number" 
              placeholder="Enter a number" 
              defaultValue="42"
            />
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Textarea
        </h2>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us about yourself..." 
            defaultValue="I'm a computer science student passionate about building innovative solutions."
          />
        </div>
      </div>

      {/* Select Dropdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Select Dropdown
        </h2>
        
        <div>
          <Label htmlFor="university">University</Label>
          <Select defaultValue="mit">
            <SelectTrigger>
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mit">MIT</SelectItem>
              <SelectItem value="stanford">Stanford University</SelectItem>
              <SelectItem value="berkeley">UC Berkeley</SelectItem>
              <SelectItem value="caltech">Caltech</SelectItem>
              <SelectItem value="harvard">Harvard University</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Checkbox */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Checkboxes
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms" className="text-white">
              I agree to the terms and conditions
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="text-white">
              Subscribe to newsletter
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="updates" defaultChecked />
            <Label htmlFor="updates" className="text-white">
              Receive product updates
            </Label>
          </div>
        </div>
      </div>

      {/* Radio Group */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Radio Group
        </h2>
        
        <div>
          <Label className="text-white">Year in School</Label>
          <RadioGroup defaultValue="sophomore" className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freshman" id="freshman" />
              <Label htmlFor="freshman" className="text-white">Freshman</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sophomore" id="sophomore" />
              <Label htmlFor="sophomore" className="text-white">Sophomore</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="junior" id="junior" />
              <Label htmlFor="junior" className="text-white">Junior</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="senior" id="senior" />
              <Label htmlFor="senior" className="text-white">Senior</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Switch */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Switches
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-white">
              Email Notifications
            </Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-white">
              Dark Mode
            </Label>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="analytics" className="text-white">
              Analytics Tracking
            </Label>
            <Switch id="analytics" />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white border-b border-[#2A2A2A] pb-2">
          Form Actions
        </h2>
        
        <div className="flex space-x-4">
          <Button variant="primary">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Reset Form</Button>
        </div>
      </div>

      {/* Visual Verification */}
      <div className="mt-8 p-4 bg-[#1A1A1A] rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">
          ✅ Verification Checklist
        </h3>
        <ul className="text-sm text-white space-y-1">
          <li>• Input fields show WHITE text when typing</li>
          <li>• Textarea shows WHITE text when typing</li>
          <li>• Select dropdown options show WHITE text</li>
          <li>• Checkbox labels are WHITE</li>
          <li>• Radio button labels are WHITE</li>
          <li>• Switch labels are WHITE</li>
          <li>• All placeholder text is visible (gray)</li>
        </ul>
      </div>
    </div>
  ),
}; 