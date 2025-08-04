import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, RadioCard, RadioPresets } from '../../atomic/atoms/radio-enhanced';
import { useState } from 'react';
import { CreditCard, Smartphone, Laptop, Monitor, GraduationCap, Users, BookOpen, Code, Palette, Zap } from 'lucide-react';

const meta: Meta<typeof Radio> = {
  title: '01-Atoms/Radio Enhanced',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced radio component with labels, descriptions, validation states, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Radio size',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Radio variant',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Default radio',
    value: 'default',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive updates about new tools and campus events',
    value: 'notifications',
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio size="sm" label="Small radio" value="small" name="size-demo" />
      <Radio size="default" label="Default radio" value="default" name="size-demo" />
      <Radio size="lg" label="Large radio" value="large" name="size-demo" />
      <Radio size="xl" label="Extra large radio" value="xl" name="size-demo" />
    </div>
  ),
};

// Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio variant="default" label="Default variant" value="default" name="variant-demo" checked />
      <Radio variant="success" label="Success variant" value="success" name="variant-demo" />
      <Radio variant="error" label="Error variant" value="error" name="variant-demo" />
      <Radio variant="warning" label="Warning variant" value="warning" name="variant-demo" />
      <Radio variant="info" label="Info variant" value="info" name="variant-demo" />
    </div>
  ),
};

// States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Unchecked" value="unchecked" name="state-demo" />
      <Radio label="Checked" value="checked" name="state-demo" checked />
      <Radio label="Disabled" value="disabled" name="state-demo" disabled />
      <Radio label="Disabled checked" value="disabled-checked" name="state-demo" disabled checked />
      <Radio label="With error" value="error" name="state-demo" error="This field is required" />
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => {
    const [userType, setUserType] = useState('student');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [privacy, setPrivacy] = useState('public');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">User Type Selection</h3>
          <RadioGroup
            name="userType"
            value={userType}
            onChange={setUserType}
            label="What describes you best?"
            description="This helps us customize your HIVE experience"
          >
            <Radio 
              value="student" 
              label="Student" 
              description="I'm currently enrolled as a student"
            />
            <Radio 
              value="faculty" 
              label="Faculty/Staff" 
              description="I work at the university as faculty or staff"
            />
            <Radio 
              value="alumni" 
              label="Alumni" 
              description="I graduated from this university"
            />
            <Radio 
              value="visitor" 
              label="Visitor" 
              description="I'm visiting or exploring the platform"
            />
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Academic Information</h3>
          <div className="space-y-6">
            <RadioGroup
              name="major"
              value={major}
              onChange={setMajor}
              label="Select your major"
              orientation="vertical"
              spacing="sm"
            >
              <Radio value="cs" label="Computer Science" />
              <Radio value="math" label="Mathematics" />
              <Radio value="engineering" label="Engineering" />
              <Radio value="business" label="Business" />
              <Radio value="liberal-arts" label="Liberal Arts" />
              <Radio value="other" label="Other" />
            </RadioGroup>

            <RadioGroup
              name="year"
              value={year}
              onChange={setYear}
              label="Academic year"
              orientation="horizontal"
              spacing="md"
            >
              <Radio value="freshman" label="Freshman" size="sm" />
              <Radio value="sophomore" label="Sophomore" size="sm" />
              <Radio value="junior" label="Junior" size="sm" />
              <Radio value="senior" label="Senior" size="sm" />
              <Radio value="graduate" label="Graduate" size="sm" />
            </RadioGroup>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Privacy Settings</h3>
          <RadioGroup
            name="privacy"
            value={privacy}
            onChange={setPrivacy}
            label="Who can see your profile?"
            description="You can change this later in your settings"
          >
            <Radio 
              value="public" 
              label="Everyone" 
              description="Your profile is visible to all users"
              variant="success"
            />
            <Radio 
              value="university" 
              label="University only" 
              description="Only people from your university can see your profile"
            />
            <Radio 
              value="connections" 
              label="Connections only" 
              description="Only people you've connected with can see your profile"
            />
            <Radio 
              value="private" 
              label="Private" 
              description="Your profile is hidden from others"
              variant="warning"
            />
          </RadioGroup>
        </div>
      </div>
    );
  },
};

// Radio groups
export const RadioGroups: Story = {
  render: () => {
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState('all');
    const [frequency, setFrequency] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <RadioGroup
          name="theme"
          value={theme}
          onChange={setTheme}
          label="Choose your theme"
          description="Select how you want HIVE to look"
          orientation="vertical"
          spacing="md"
        >
          <Radio 
            value="light" 
            label="Light Theme" 
            description="Clean and bright interface, perfect for daytime use"
          />
          <Radio 
            value="dark" 
            label="Dark Theme" 
            description="Easy on the eyes, great for late-night study sessions"
          />
          <Radio 
            value="auto" 
            label="System Default" 
            description="Automatically matches your device settings"
          />
        </RadioGroup>

        <RadioGroup
          name="notifications"
          value={notifications}
          onChange={setNotifications}
          label="Notification preferences"
          description="How do you want to be notified?"
          required
        >
          <Radio value="all" label="All notifications" />
          <Radio value="important" label="Important only" />
          <Radio value="mentions" label="Mentions and direct messages" />
          <Radio value="none" label="No notifications" />
        </RadioGroup>

        <RadioGroup
          name="frequency"
          value={frequency}
          onChange={setFrequency}
          label="Email frequency"
          description="How often should we send you email updates?"
          orientation="horizontal"
          spacing="lg"
          error={!frequency ? "Please select an email frequency" : ""}
        >
          <Radio value="daily" label="Daily" size="sm" />
          <Radio value="weekly" label="Weekly" size="sm" />
          <Radio value="monthly" label="Monthly" size="sm" />
          <Radio value="never" label="Never" size="sm" />
        </RadioGroup>
      </div>
    );
  },
};

// Radio cards
export const RadioCards: Story = {
  render: () => {
    const [plan, setPlan] = useState('');
    const [device, setDevice] = useState('');
    const [interests, setInterests] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Choose Your Plan</h3>
          <RadioGroup name="plan" value={plan} onChange={setPlan}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioCard
                icon={<GraduationCap className="w-5 h-5" />}
                value="student"
                label="Student"
                description="Free access to all campus tools and spaces"
                badge={<span className="text-xs bg-hive-emerald text-white px-2 py-1 rounded">Free</span>}
              />
              <RadioCard
                icon={<Users className="w-5 h-5" />}
                value="builder"
                label="Builder"
                description="Create and publish tools, advanced analytics"
                badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded">Premium</span>}
              />
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Primary Device</h3>
          <RadioGroup name="device" value={device} onChange={setDevice}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <RadioCard
                icon={<Smartphone className="w-4 h-4" />}
                value="mobile"
                label="Mobile"
                size="sm"
              />
              <RadioCard
                icon={<Laptop className="w-4 h-4" />}
                value="laptop"
                label="Laptop"
                size="sm"
              />
              <RadioCard
                icon={<Monitor className="w-4 h-4" />}
                value="desktop"
                label="Desktop"
                size="sm"
              />
              <RadioCard
                icon={<Smartphone className="w-4 h-4" />}
                value="tablet"
                label="Tablet"
                size="sm"
              />
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Primary Interest</h3>
          <RadioGroup name="interests" value={interests} onChange={setInterests}>
            <div className="space-y-3">
              <RadioCard
                icon={<Code className="w-5 h-5" />}
                value="programming"
                label="Programming & Software Development"
                description="Build tools, learn coding, join hackathons"
                badge={<span className="text-xs bg-hive-sapphire text-white px-2 py-1 rounded">Tech</span>}
              />
              <RadioCard
                icon={<BookOpen className="w-5 h-5" />}
                value="academics"
                label="Academic Success"
                description="Study groups, tutoring, grade tracking"
                badge={<span className="text-xs bg-hive-emerald text-white px-2 py-1 rounded">Study</span>}
              />
              <RadioCard
                icon={<Users className="w-5 h-5" />}
                value="social"
                label="Campus Community"
                description="Events, clubs, making connections"
                badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded">Social</span>}
              />
              <RadioCard
                icon={<Palette className="w-5 h-5" />}
                value="creative"
                label="Creative Projects"
                description="Art, design, music, creative collaboration"
                badge={<span className="text-xs bg-hive-ruby text-white px-2 py-1 rounded">Creative</span>}
              />
            </div>
          </RadioGroup>
        </div>
      </div>
    );
  },
};

// Preset components
export const PresetComponents: Story = {
  render: () => {
    const [priority, setPriority] = useState('');
    const [theme, setTheme] = useState('');
    const [size, setSize] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Priority Selection</h3>
          <RadioPresets.Priority
            name="priority"
            value={priority}
            onChange={setPriority}
            label="Task Priority"
            description="Select the priority level for this task"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Theme Selection</h3>
          <RadioPresets.Theme
            name="theme"
            value={theme}
            onChange={setTheme}
            label="Interface Theme"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Size Selection</h3>
          <RadioPresets.Size
            name="size"
            value={size}
            onChange={setSize}
            label="Choose Size"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Payment Method</h3>
          <RadioPresets.PaymentMethod
            name="payment"
            value=""
            onChange={() => {}}
            label="Payment Options"
            options={[
              { value: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
              { value: 'paypal', label: 'PayPal', icon: <Zap className="w-4 h-4" /> },
            ]}
          />
        </div>
      </div>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      userType: '',
      major: '',
      year: '',
      notifications: '',
      privacy: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.userType) newErrors.userType = 'Please select your user type';
      if (!formData.major) newErrors.major = 'Please select your major';
      if (!formData.year) newErrors.year = 'Please select your academic year';
      if (!formData.notifications) newErrors.notifications = 'Please select notification preferences';
      if (!formData.privacy) newErrors.privacy = 'Please select privacy settings';
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Profile setup completed!');
        console.log('Form data:', formData);
      }
    };

    return (
      <div className="p-6 bg-hive-background-primary max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-2">Complete Your HIVE Profile</h2>
            <p className="text-hive-text-secondary">Help us customize your campus experience</p>
          </div>

          <RadioGroup
            name="userType"
            value={formData.userType}
            onChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
            label="I am a..."
            required
            error={errors.userType}
          >
            <RadioCard
              icon={<GraduationCap className="w-5 h-5" />}
              value="student"
              label="Student"
              description="Currently enrolled at the university"
            />
            <RadioCard
              icon={<Users className="w-5 h-5" />}
              value="faculty"
              label="Faculty/Staff"
              description="Work at the university"
            />
          </RadioGroup>

          <RadioGroup
            name="major"
            value={formData.major}
            onChange={(value) => setFormData(prev => ({ ...prev, major: value }))}
            label="Academic Focus"
            required
            error={errors.major}
            orientation="vertical"
            spacing="sm"
          >
            <Radio value="cs" label="Computer Science & Technology" />
            <Radio value="engineering" label="Engineering" />
            <Radio value="business" label="Business & Economics" />
            <Radio value="liberal-arts" label="Liberal Arts & Humanities" />
            <Radio value="sciences" label="Natural Sciences" />
            <Radio value="other" label="Other" />
          </RadioGroup>

          <RadioGroup
            name="year"
            value={formData.year}
            onChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
            label="Academic Year"
            required
            error={errors.year}
            orientation="horizontal"
            spacing="md"
          >
            <Radio value="1" label="1st Year" size="sm" />
            <Radio value="2" label="2nd Year" size="sm" />
            <Radio value="3" label="3rd Year" size="sm" />
            <Radio value="4" label="4th Year" size="sm" />
            <Radio value="grad" label="Graduate" size="sm" />
          </RadioGroup>

          <RadioGroup
            name="notifications"
            value={formData.notifications}
            onChange={(value) => setFormData(prev => ({ ...prev, notifications: value }))}
            label="Notification Preferences"
            description="How do you want to stay updated?"
            required
            error={errors.notifications}
          >
            <Radio value="all" label="All updates" description="Get notified about everything" />
            <Radio value="important" label="Important only" description="Just the essential updates" />
            <Radio value="minimal" label="Minimal" description="Only critical notifications" />
          </RadioGroup>

          <RadioGroup
            name="privacy"
            value={formData.privacy}
            onChange={(value) => setFormData(prev => ({ ...prev, privacy: value }))}
            label="Privacy Level"
            description="Who can see your profile and activity?"
            required
            error={errors.privacy}
          >
            <Radio 
              value="open" 
              label="Open" 
              description="Visible to all university members"
              variant="success"
            />
            <Radio 
              value="connections" 
              label="Connections only" 
              description="Only visible to people you connect with"
            />
            <Radio 
              value="private" 
              label="Private" 
              description="Hidden from others"
              variant="warning"
            />
          </RadioGroup>

          <div className="flex justify-between items-center pt-6 border-t border-hive-border-subtle">
            <div className="text-sm text-hive-text-mutedLight">
              {Object.values(formData).filter(Boolean).length} of 5 sections completed
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors disabled:opacity-50"
              disabled={Object.values(formData).some(value => !value)}
            >
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Radio - Use controls to customize →',
    description: 'This radio responds to the controls panel',
    value: 'interactive',
    name: 'interactive-demo',
  },
};