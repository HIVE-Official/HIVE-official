import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../atomic/atoms/label';
import { Input } from '../../atomic/atoms/input';
import { Textarea } from '../../atomic/atoms/textarea';
import { Checkbox } from '../../atomic/atoms/checkbox';
import { Radio } from '../../atomic/atoms/radio';
import { Select } from '../../atomic/atoms/select';

const meta: Meta<typeof Label> = {
  title: '01-Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE label component for form field labels with support for required indicators, sizing, and floating variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Label size',
    },
    variant: {
      control: 'select',
      options: ['default', 'inline', 'floating'],
      description: 'Label variant style',
    },
    required: {
      control: 'boolean',
      description: 'Show required indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    htmlFor: {
      control: 'text',
      description: 'Associated form element ID',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Student Name',
    htmlFor: 'student-name',
  },
};

export const Required: Story = {
  args: {
    children: 'Student Email',
    htmlFor: 'student-email',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Field',
    htmlFor: 'disabled-field',
    disabled: true,
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <Label size="sm" htmlFor="small-input">Small Label</Label>
        <Input id="small-input" className="mt-1" placeholder="Small input field" />
      </div>
      <div>
        <Label size="md" htmlFor="medium-input">Medium Label</Label>
        <Input id="medium-input" className="mt-1" placeholder="Medium input field" />
      </div>
      <div>
        <Label size="lg" htmlFor="large-input">Large Label</Label>
        <Input id="large-input" className="mt-1" placeholder="Large input field" />
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Default Variant</h3>
        <div className="space-y-2">
          <Label variant="default" htmlFor="default-input">Default Block Label</Label>
          <Input id="default-input" placeholder="Enter your information" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Inline Variant</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="accept-terms" />
            <Label variant="inline" htmlFor="accept-terms">I accept the terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio id="student-yes" name="student" />
            <Label variant="inline" htmlFor="student-yes">Yes, I'm a student</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Floating Variant</h3>
        <div className="space-y-4">
          <div className="relative">
            <Input
              id="floating-input"
              className="peer"
              placeholder=" "
            />
            <Label 
              variant="floating" 
              htmlFor="floating-input"
            >
              Floating Label
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Campus form scenarios
export const CampusFormScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Registration Form</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div>
            <Label htmlFor="full-name" required>Full Name</Label>
            <Input id="full-name" className="mt-1" placeholder="Enter your full name" />
          </div>
          
          <div>
            <Label htmlFor="student-id" required>Student ID</Label>
            <Input 
              id="student-id" 
              className="mt-1" 
              placeholder="e.g., 12345678"
              pattern="[0-9]{8}"
            />
          </div>
          
          <div>
            <Label htmlFor="university-email" required>University Email</Label>
            <Input 
              id="university-email" 
              type="email" 
              className="mt-1" 
              placeholder="your.name@university.edu"
            />
          </div>
          
          <div>
            <Label htmlFor="major">Academic Major</Label>
            <Select id="major" className="mt-1">
              <option value="">Select your major</option>
              <option value="cs">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="liberal-arts">Liberal Arts</option>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="graduation-year">Expected Graduation</Label>
            <Select id="graduation-year" className="mt-1">
              <option value="">Select year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Profile</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div>
            <Label htmlFor="builder-name" required>Builder Display Name</Label>
            <Input 
              id="builder-name" 
              className="mt-1" 
              placeholder="How others will see you in the builder community"
            />
          </div>
          
          <div>
            <Label htmlFor="tool-description" required>Tool Description</Label>
            <Textarea 
              id="tool-description" 
              className="mt-1" 
              placeholder="Describe what your tool does and how it helps students..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="programming-languages">Programming Languages</Label>
            <Input 
              id="programming-languages" 
              className="mt-1" 
              placeholder="e.g., JavaScript, Python, Java"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Tool Visibility</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Radio id="public-tool" name="visibility" defaultChecked />
                <Label variant="inline" htmlFor="public-tool">Public - Anyone can discover and use</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio id="university-tool" name="visibility" />
                <Label variant="inline" htmlFor="university-tool">University Only - Limited to your campus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio id="private-tool" name="visibility" />
                <Label variant="inline" htmlFor="private-tool">Private - Invitation only</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Creation</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div>
            <Label htmlFor="group-name" required>Study Group Name</Label>
            <Input 
              id="group-name" 
              className="mt-1" 
              placeholder="e.g., CS 101 Final Prep"
            />
          </div>
          
          <div>
            <Label htmlFor="course-code" required>Course Code</Label>
            <Input 
              id="course-code" 
              className="mt-1" 
              placeholder="e.g., CS 101, MATH 200"
            />
          </div>
          
          <div>
            <Label htmlFor="meeting-time">Preferred Meeting Time</Label>
            <Input 
              id="meeting-time" 
              type="time" 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="group-size">Maximum Group Size</Label>
            <Select id="group-size" className="mt-1">
              <option value="">No limit</option>
              <option value="5">5 people</option>
              <option value="10">10 people</option>
              <option value="15">15 people</option>
              <option value="20">20 people</option>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>Group Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="allow-join-requests" defaultChecked />
                <Label variant="inline" htmlFor="allow-join-requests">Allow join requests</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-approve" />
                <Label variant="inline" htmlFor="auto-approve">Auto-approve students from same course</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notifications" defaultChecked />
                <Label variant="inline" htmlFor="notifications">Send session reminders</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Accessibility and validation states
export const AccessibilityAndValidation: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Required Field Indicators</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div>
            <Label htmlFor="required-field" required size="sm">
              Small Required Label
            </Label>
            <Input id="required-field" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="required-field-md" required size="md">
              Medium Required Label
            </Label>
            <Input id="required-field-md" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="required-field-lg" required size="lg">
              Large Required Label
            </Label>
            <Input id="required-field-lg" className="mt-1" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Disabled States</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div>
            <Label htmlFor="disabled-input" disabled>
              Disabled Input Label
            </Label>
            <Input id="disabled-input" className="mt-1" disabled placeholder="This field is disabled" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checkbox" disabled />
            <Label variant="inline" htmlFor="disabled-checkbox" disabled>
              Disabled checkbox option
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Radio id="disabled-radio" disabled />
            <Label variant="inline" htmlFor="disabled-radio" disabled>
              Disabled radio option
            </Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Form Field Groups</h3>
        <div className="space-y-6 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-hive-text-primary">Contact Information</legend>
            <div>
              <Label htmlFor="contact-email" required size="sm">Email Address</Label>
              <Input id="contact-email" type="email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact-phone" size="sm">Phone Number</Label>
              <Input id="contact-phone" type="tel" className="mt-1" />
            </div>
          </fieldset>
          
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-hive-text-primary">Academic Information</legend>
            <div>
              <Label htmlFor="academic-year" required size="sm">Current Year</Label>
              <Select id="academic-year" className="mt-1">
                <option value="">Select year</option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="graduate">Graduate</option>
              </Select>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  ),
};

// Floating label examples
export const FloatingLabelExamples: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Modern Login Form</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="relative">
            <Input
              id="login-email"
              type="email"
              className="peer"
              placeholder=" "
            />
            <Label 
              variant="floating" 
              htmlFor="login-email"
              required
            >
              University Email
            </Label>
          </div>
          
          <div className="relative">
            <Input
              id="login-password"
              type="password"
              className="peer"
              placeholder=" "
            />
            <Label 
              variant="floating" 
              htmlFor="login-password"
              required
            >
              Password
            </Label>
          </div>
          
          <div className="relative">
            <Input
              id="student-id-floating"
              className="peer"
              placeholder=" "
            />
            <Label 
              variant="floating" 
              htmlFor="student-id-floating"
            >
              Student ID (Optional)
            </Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tool Settings</h3>
        <div className="space-y-4 border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="relative">
            <Input
              id="tool-name-floating"
              className="peer"
              placeholder=" "
            />
            <Label 
              variant="floating" 
              htmlFor="tool-name-floating"
              required
            >
              Tool Name
            </Label>
          </div>
          
          <div className="relative">
            <Textarea
              id="tool-desc-floating"
              className="peer resize-none"
              placeholder=" "
              rows={3}
            />
            <Label 
              variant="floating" 
              htmlFor="tool-desc-floating"
              required
            >
              Description
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    children: 'Interactive Label - Use controls to customize →',
    htmlFor: 'interactive-field',
    required: false,
    size: 'md',
    variant: 'default',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input id="interactive-field" placeholder="Associated input field" />
    </div>
  ),
};