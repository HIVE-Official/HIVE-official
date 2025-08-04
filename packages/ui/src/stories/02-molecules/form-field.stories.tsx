import type { Meta, StoryObj } from '@storybook/react';
import { 
  FormField, 
  TextFormField, 
  EmailFormField, 
  PasswordFormField 
} from '../../atomic/molecules/form-field';
import { InputEnhanced } from '../../atomic/atoms/input-enhanced';
import { TextareaEnhanced } from '../../atomic/atoms/textarea-enhanced';
import { SelectEnhanced } from '../../atomic/atoms/select-enhanced';
import { CheckboxEnhanced } from '../../atomic/atoms/checkbox-enhanced';
import { SwitchEnhanced } from '../../atomic/atoms/switch-enhanced';
import { useState } from 'react';

const meta: Meta<typeof FormField> = {
  title: '02-Molecules/Form Field',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE form field molecule component for creating accessible form inputs with labels, descriptions, and error messaging.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text',
    },
    description: {
      control: 'text',
      description: 'Helper text for the field',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Full Name',
    description: 'Enter your first and last name',
    required: false,
    children: <InputEnhanced placeholder="John Doe" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    description: 'We\'ll use this to send you important updates',
    required: true,
    children: <InputEnhanced type="email" placeholder="you@university.edu" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    description: 'Must be at least 8 characters long',
    error: 'Password must contain at least one uppercase letter and one number',
    required: true,
    children: <InputEnhanced type="password" placeholder="Enter password" />,
  },
};

export const WithoutLabel: Story = {
  args: {
    description: 'Optional: Add any additional information about yourself',
    children: <TextareaEnhanced placeholder="Tell us about yourself..." />,
  },
};

// Form field types
export const FormFieldTypes: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-width-lg">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Text Input Field</h4>
        <FormField
          label="Student Name"
          description="Enter your full legal name as it appears on official documents"
          required
        >
          <InputEnhanced placeholder="Alex Rodriguez" />
        </FormField>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Email Input Field</h4>
        <FormField
          label="University Email"
          description="Use your .edu email address for verification"
          required
        >
          <InputEnhanced type="email" placeholder="alex.rodriguez@university.edu" />
        </FormField>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Textarea Field</h4>
        <FormField
          label="Academic Bio"
          description="Tell the community about your academic interests and goals (optional)"
        >
          <TextareaEnhanced 
            placeholder="I'm a Computer Science major passionate about AI and machine learning..."
            rows={4}
          />
        </FormField>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Select Field</h4>
        <FormField
          label="Graduation Year"
          description="Select your expected graduation year"
          required
        >
          <SelectEnhanced>
            <option value="">Select year...</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </SelectEnhanced>
        </FormField>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Checkbox Field</h4>
        <FormField
          label="Privacy Settings"
          description="Control who can see your profile and activity"
        >
          <div className="space-y-3">
            <CheckboxEnhanced label="Allow other students to find me by name" defaultChecked />
            <CheckboxEnhanced label="Show my activity in the campus feed" defaultChecked />
            <CheckboxEnhanced label="Enable direct messages from other students" />
          </div>
        </FormField>
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Switch Field</h4>
        <FormField
          label="Notification Preferences"
          description="Choose how you want to receive notifications"
        >
          <div className="space-y-4">
            <SwitchEnhanced label="Email notifications" />
            <SwitchEnhanced label="Push notifications" defaultChecked />
            <SwitchEnhanced label="SMS notifications" />
          </div>
        </FormField>
      </div>
    </div>
  ),
};

// Preset form fields
export const PresetFormFields: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-lg">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Text Form Field</h4>
        <TextFormField
          label="Student Handle"
          description="Choose a unique handle for your HIVE profile"
          placeholder="alexr2025"
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Email Form Field</h4>
        <EmailFormField
          description="We'll send verification to this address"
          placeholder="you@university.edu"
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Password Form Field</h4>
        <PasswordFormField
          description="Must be at least 8 characters with numbers and letters"
          placeholder="Create secure password"
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Custom Email Field</h4>
        <EmailFormField
          label="Alternative Email"
          description="Optional backup email for account recovery"
          placeholder="backup@email.com"
        />
      </div>
    </div>
  ),
};

// Campus form scenarios
export const CampusFormScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Onboarding Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextFormField
                label="First Name"
                description="Your legal first name"
                placeholder="Alex"
                required
              />
              <TextFormField
                label="Last Name"
                description="Your legal last name"
                placeholder="Rodriguez"
                required
              />
            </div>
            
            <EmailFormField
              label="University Email"
              description="Use your official .edu email address"
              placeholder="alex.rodriguez@university.edu"
              required
            />
            
            <FormField
              label="Major"
              description="Your primary field of study"
              required
            >
              <SelectEnhanced>
                <option value="">Select your major...</option>
                <option value="computer-science">Computer Science</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="psychology">Psychology</option>
                <option value="other">Other</option>
              </SelectEnhanced>
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Graduation Year"
                description="Expected graduation year"
                required
              >
                <SelectEnhanced>
                  <option value="">Select year...</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </SelectEnhanced>
              </FormField>
              
              <TextFormField
                label="HIVE Handle"
                description="Your unique username (@handle)"
                placeholder="alexr2025"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Space Creation Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <TextFormField
              label="Space Name"
              description="Give your study space a descriptive name"
              placeholder="CS 101 Study Group"
              required
            />
            
            <FormField
              label="Space Description"
              description="Describe what this space is for and who should join"
              required
            >
              <TextareaEnhanced 
                placeholder="Weekly study sessions for Computer Science 101. We review lectures, work on assignments together, and prepare for exams. All skill levels welcome!"
                rows={4}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Subject Area"
                description="Primary academic subject"
                required
              >
                <SelectEnhanced>
                  <option value="">Select subject...</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </SelectEnhanced>
              </FormField>
              
              <FormField
                label="Meeting Schedule"
                description="When does your group typically meet?"
              >
                <SelectEnhanced>
                  <option value="">Select schedule...</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="as-needed">As needed</option>
                  <option value="before-exams">Before exams</option>
                </SelectEnhanced>
              </FormField>
            </div>
            
            <FormField
              label="Space Settings"
              description="Configure privacy and membership settings"
            >
              <div className="space-y-4">
                <CheckboxEnhanced 
                  label="Allow anyone to join (public space)" 
                  defaultChecked 
                />
                <CheckboxEnhanced 
                  label="Require approval for new members" 
                />
                <CheckboxEnhanced 
                  label="Allow members to invite others" 
                  defaultChecked 
                />
                <CheckboxEnhanced 
                  label="Enable file sharing in this space" 
                  defaultChecked 
                />
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Submission Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <TextFormField
              label="Tool Name"
              description="What's the name of your campus tool?"
              placeholder="GPA Calculator Pro"
              required
            />
            
            <FormField
              label="Tool Description"
              description="Describe what your tool does and how it helps students"
              required
            >
              <TextareaEnhanced 
                placeholder="A comprehensive GPA calculator that helps students track their academic progress across semesters and plan their course load to achieve target GPAs."
                rows={4}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Category"
                description="What type of tool is this?"
                required
              >
                <SelectEnhanced>
                  <option value="">Select category...</option>
                  <option value="academic">Academic Planning</option>
                  <option value="productivity">Productivity</option>
                  <option value="social">social Coordination</option>
                  <option value="utility">Campus Utility</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health & Wellness</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </SelectEnhanced>
              </FormField>
              
              <TextFormField
                label="Tool URL"
                description="Link to your live tool (optional)"
                placeholder="https://your-tool.com"
                type="url"
              />
            </div>
            
            <FormField
              label="Tool Features"
              description="What makes your tool special? List key features."
            >
              <TextareaEnhanced 
                placeholder="• Calculate semester and cumulative GPA&#10;• Import transcripts automatically&#10;• Plan future courses and see projected GPA&#10;• Set GPA goals and track progress&#10;• Export reports for advising meetings"
                rows={4}
              />
            </FormField>
            
            <FormField
              label="Publishing Options"
              description="How would you like to share your tool?"
            >
              <div className="space-y-4">
                <CheckboxEnhanced 
                  label="Make tool publicly available to all students" 
                  defaultChecked 
                />
                <CheckboxEnhanced 
                  label="Allow other students to suggest improvements" 
                  defaultChecked 
                />
                <CheckboxEnhanced 
                  label="Include my name as the creator" 
                  defaultChecked 
                />
                <CheckboxEnhanced 
                  label="Send me analytics about tool usage" 
                />
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Form validation states
export const FormValidationStates: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-lg">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Valid State</h4>
        <TextFormField
          label="Email Address"
          description="Enter your university email"
          placeholder="student@university.edu"
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Error State</h4>
        <TextFormField
          label="Password"
          description="Must be at least 8 characters"
          error="Password is too short. Please enter at least 8 characters."
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Email Error</h4>
        <EmailFormField
          description="We'll send a verification email to this address"
          error="Please enter a valid .edu email address"
          required
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-4">Multiple Errors Context</h4>
        <div className="space-y-4">
          <TextFormField
            label="First Name"
            error="First name is required"
            required
          />
          <TextFormField
            label="Last Name"
            error="Last name is required"
            required
          />
          <EmailFormField
            error="Please enter a valid email address"
            required
          />
          <PasswordFormField
            error="Password must contain at least one uppercase letter, one lowercase letter, and one number"
            required
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive form field examples
export const InteractiveFormFieldExamples: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      bio: '',
      major: '',
      year: '',
      notifications: false,
      publicProfile: true,
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const validateField = (name: string, value: string | boolean) => {
      const newErrors = { ...errors };
      
      switch (name) {
        case 'name':
          if (!value || (typeof value === 'string' && value.trim().length < 2)) {
            newErrors.name = 'Name must be at least 2 characters long';
          } else {
            delete newErrors.name;
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value || (typeof value === 'string' && !emailRegex.test(value))) {
            newErrors.email = 'Please enter a valid email address';
          } else {
            delete newErrors.email;
          }
          break;
        case 'major':
          if (!value) {
            newErrors.major = 'Please select your major';
          } else {
            delete newErrors.major;
          }
          break;
      }
      
      setErrors(newErrors);
    };
    
    const handleChange = (name: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
    };
    
    return (
      <div className="space-y-6 p-6 max-w-2xl bg-hive-background-primary">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Form Demo</h3>
          <p className="text-hive-text-secondary mb-6">Fill out the form to see real-time validation and state management</p>
        </div>
        
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <TextFormField
              label="Full Name"
              description="Enter your first and last name"
              placeholder="Alex Rodriguez"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
            />
            
            <EmailFormField
              description="We'll use this to send you updates"
              placeholder="you@university.edu"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
            />
            
            <FormField
              label="Academic Bio"
              description="Tell us about your academic interests and goals"
            >
              <TextareaEnhanced
                placeholder="I'm a Computer Science major interested in AI and machine learning..."
                rows={4}
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Major"
                description="Your primary field of study"
                error={errors.major}
                required
              >
                <SelectEnhanced
                  value={formData.major}
                  onChange={(e) => handleChange('major', e.target.value)}
                >
                  <option value="">Select your major...</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </SelectEnhanced>
              </FormField>
              
              <FormField
                label="Graduation Year"
                description="Expected graduation year"
              >
                <SelectEnhanced
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                >
                  <option value="">Select year...</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </SelectEnhanced>
              </FormField>
            </div>
            
            <FormField
              label="Profile Settings"
              description="Configure your profile visibility and notifications"
            >
              <div className="space-y-4">
                <SwitchEnhanced
                  label="Enable email notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleChange('notifications', checked)}
                />
                <SwitchEnhanced
                  label="Make profile publicly visible"
                  checked={formData.publicProfile}
                  onCheckedChange={(checked) => handleChange('publicProfile', checked)}
                />
              </div>
            </FormField>
          </div>
          
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary mb-3">Form State</h4>
            <div className="p-4 bg-hive-background-tertiary rounded-lg">
              <pre className="text-sm text-hive-text-secondary overflow-x-auto">
                {JSON.stringify({ formData, errors }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Student Name',
    description: 'Enter your full name as it appears on your student ID',
    required: true,
    children: <InputEnhanced placeholder="Alex Rodriguez" />,
  },
};