import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup, CheckboxCard, CheckboxPresets } from '../../atomic/atoms/checkbox-enhanced';
import { useState } from 'react';
import { Users, BookOpen, Calendar, Settings, Bell, Shield, Heart, Star } from 'lucide-react';

const meta: Meta<typeof Checkbox> = {
  title: '01-Atoms/Checkbox Enhanced',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced checkbox component with labels, descriptions, validation states, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Checkbox size',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Checkbox variant',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'Border radius',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Subscribe to updates',
    description: 'Get notified about new tools and campus events',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    required: true,
    description: 'You must accept the terms to continue',
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
      <Checkbox size="xl" label="Extra large checkbox" />
    </div>
  ),
};

// Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox variant="default" label="Default variant" checked />
      <Checkbox variant="success" label="Success variant" checked />
      <Checkbox variant="error" label="Error variant" checked />
      <Checkbox variant="warning" label="Warning variant" checked />
      <Checkbox variant="info" label="Info variant" checked />
    </div>
  ),
};

// States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked />
      <Checkbox label="With error" error="This field is required" />
    </div>
  ),
};

// Border radius variants
export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox radius="none" label="No radius" checked />
      <Checkbox radius="sm" label="Small radius" checked />
      <Checkbox radius="default" label="Default radius" checked />
      <Checkbox radius="lg" label="Large radius" checked />
      <Checkbox radius="full" label="Full radius (circular)" checked />
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Student Registration</h3>
        <div className="space-y-4">
          <Checkbox
            label="I am a current student at this university"
            description="Required for access to campus-specific features"
            required
          />
          <Checkbox
            label="Enable academic calendar integration"
            description="Sync your class schedule with HIVE tools"
          />
          <Checkbox
            label="Join my residence hall space automatically"
            description="Connect with your floor community"
          />
          <Checkbox
            label="Subscribe to campus notifications"
            description="Get updates about events, tools, and important announcements"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Show my profile to other students"
            description="Other students can find and connect with you"
            checked
          />
          <Checkbox
            label="Allow study group invitations"
            description="Students can invite you to join study groups"
            checked
          />
          <Checkbox
            label="Share my course schedule"
            description="Help others find study partners for shared classes"
          />
          <Checkbox
            label="Enable ghost mode"
            description="Hide your online status and activity from others"
            variant="warning"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tool Preferences</h3>
        <div className="space-y-4">
          <Checkbox
            label="Auto-install recommended tools"
            description="Install tools that are popular in your major"
          />
          <Checkbox
            label="Beta testing program"
            description="Get early access to new tools and features"
            variant="info"
          />
          <Checkbox
            label="Anonymous usage analytics"
            description="Help improve HIVE by sharing anonymous usage data"
          />
        </div>
      </div>
    </div>
  ),
};

// Checkbox groups
export const CheckboxGroups: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <CheckboxGroup
        label="Select your interests"
        description="We'll recommend relevant spaces and tools based on your selections"
        orientation="vertical"
        spacing="md"
      >
        <Checkbox label="Computer Science & Programming" />
        <Checkbox label="Mathematics & Statistics" />
        <Checkbox label="Engineering" />
        <Checkbox label="Business & Entrepreneurship" />
        <Checkbox label="Arts & Design" />
        <Checkbox label="Life Sciences" />
      </CheckboxGroup>

      <CheckboxGroup
        label="Notification preferences"
        description="Choose how you want to be notified"
        orientation="horizontal"
        spacing="lg"
      >
        <Checkbox label="Email" size="sm" />
        <Checkbox label="Push" size="sm" />
        <Checkbox label="SMS" size="sm" />
      </CheckboxGroup>

      <CheckboxGroup
        label="Required permissions"
        description="These permissions are needed for full functionality"
        required
        error="Please accept all required permissions"
      >
        <Checkbox label="Access to university email" required variant="error" />
        <Checkbox label="Calendar integration" required variant="error" />
        <Checkbox label="Location for campus features" required variant="error" />
      </CheckboxGroup>
    </div>
  ),
};

// Checkbox cards
export const CheckboxCards: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Choose Your Campus Spaces</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            icon={<Users className="w-5 h-5" />}
            label="Computer Science Major"
            description="Connect with CS students, share resources, and collaborate on projects"
            badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded">1.2k members</span>}
          />
          <CheckboxCard
            icon={<BookOpen className="w-5 h-5" />}
            label="Study Groups"
            description="Find and join study sessions for your courses"
            badge={<span className="text-xs bg-hive-emerald text-white px-2 py-1 rounded">42 active</span>}
          />
          <CheckboxCard
            icon={<Calendar className="w-5 h-5" />}
            label="Campus Events"
            description="Stay updated on campus activities and social events"
            badge={<span className="text-xs bg-hive-sapphire text-white px-2 py-1 rounded">Weekly</span>}
          />
          <CheckboxCard
            icon={<Settings className="w-5 h-5" />}
            label="Tool Builders"
            description="Create and share productivity tools with the community"
            badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded">Exclusive</span>}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Notification Types</h3>
        <div className="space-y-3">
          <CheckboxCard
            icon={<Bell className="w-4 h-4" />}
            label="New tool releases"
            description="Get notified when tools relevant to your interests are published"
            checked
          />
          <CheckboxCard
            icon={<Heart className="w-4 h-4" />}
            label="Space activity"
            description="Updates from your joined spaces and communities"
            checked
          />
          <CheckboxCard
            icon={<Star className="w-4 h-4" />}
            label="Featured content"
            description="Highlights and recommendations from the HIVE team"
          />
          <CheckboxCard
            icon={<Shield className="w-4 h-4" />}
            label="Security alerts"
            description="Important security updates and account notifications"
            variant="warning"
            checked
          />
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Common Patterns</h3>
        <div className="space-y-4">
          <CheckboxPresets.Terms />
          <CheckboxPresets.Newsletter />
          <CheckboxPresets.RememberMe />
          <CheckboxPresets.SelectAll />
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: false,
      newsletter: false,
      terms: false,
      privacy: false,
    });

    const handleChange = (key: keyof typeof preferences) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPreferences(prev => ({
        ...prev,
        [key]: e.target.checked
      }));
    };

    const allSelected = Object.values(preferences).every(Boolean);
    const someSelected = Object.values(preferences).some(Boolean);
    const isIndeterminate = someSelected && !allSelected;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setPreferences({
        notifications: checked,
        newsletter: checked,
        terms: checked,
        privacy: checked,
      });
    };

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Preferences</h3>
          
          <div className="space-y-4">
            <Checkbox
              label="Select all preferences"
              checked={allSelected}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
              variant={isIndeterminate ? "warning" : "default"}
            />
            
            <div className="border-l-2 border-hive-border-subtle pl-4 space-y-3">
              <Checkbox
                label="Push notifications"
                description="Receive notifications on your device"
                checked={preferences.notifications}
                onChange={handleChange('notifications')}
              />
              <Checkbox
                label="Email newsletter"
                description="Weekly updates and campus highlights"
                checked={preferences.newsletter}
                onChange={handleChange('newsletter')}
              />
              <Checkbox
                label="Accept terms of service"
                description="Required to use HIVE platform"
                checked={preferences.terms}
                onChange={handleChange('terms')}
                required
                variant={preferences.terms ? "success" : "error"}
              />
              <Checkbox
                label="Privacy policy agreement"
                description="How we handle your data"
                checked={preferences.privacy}
                onChange={handleChange('privacy')}
                required
                variant={preferences.privacy ? "success" : "error"}
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-hive-surface-elevated rounded-lg">
            <p className="text-sm text-hive-text-secondary">
              Selected: {Object.values(preferences).filter(Boolean).length} of {Object.keys(preferences).length}
            </p>
            <p className="text-xs text-hive-text-mutedLight mt-1">
              Status: {allSelected ? 'All selected' : isIndeterminate ? 'Partially selected' : 'None selected'}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      major: '',
      year: '',
      notifications: false,
      privacy: false,
      terms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms to continue';
      }
      if (!formData.privacy) {
        newErrors.privacy = 'Privacy policy acceptance is required';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
        console.log('Form data:', formData);
      }
    };

    return (
      <div className="p-6 bg-hive-background-primary max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Complete Your Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">
                  Major *
                </label>
                <select
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full px-3 py-2 border border-hive-border-subtle rounded-lg bg-hive-background-secondary"
                  required
                >
                  <option value="">Select your major</option>
                  <option value="cs">Computer Science</option>
                  <option value="math">Mathematics</option>
                  <option value="eng">Engineering</option>
                  <option value="bus">Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">
                  Academic Year *
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-hive-border-subtle rounded-lg bg-hive-background-secondary"
                  required
                >
                  <option value="">Select your year</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>

              <div className="space-y-3">
                <Checkbox
                  label="Enable campus notifications"
                  description="Get updates about events and tools"
                  checked={formData.notifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                />
                
                <Checkbox
                  label="I agree to the Privacy Policy"
                  description="How we collect and use your information"
                  checked={formData.privacy}
                  onChange={(e) => setFormData(prev => ({ ...prev, privacy: e.target.checked }))}
                  required
                  variant={errors.privacy ? "error" : "default"}
                  error={errors.privacy}
                />
                
                <Checkbox
                  label="I accept the Terms of Service"
                  description="Rules and guidelines for using HIVE"
                  checked={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                  required
                  variant={errors.terms ? "error" : "default"}
                  error={errors.terms}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
          >
            Complete Registration
          </button>
        </form>
      </div>
    );
  },
};