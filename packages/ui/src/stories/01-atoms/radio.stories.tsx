import type { Meta, StoryObj } from '@storybook/react';
import { Radio, SingleRadio } from '../../atomic/atoms/radio';
import { useState } from 'react';
import { GraduationCap, Clock, Users, MapPin, CreditCard, Smartphone, Laptop, Tablet } from 'lucide-react';

const meta: Meta<typeof Radio> = {
  title: '01-Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base radio component with semantic tokens, variants, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio button size',
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Radio visual variant',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic radio group
export const Default: Story = {
  args: {
    name: 'default',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
  },
};

export const WithDescriptions: Story = {
  args: {
    name: 'descriptions',
    options: [
      { 
        value: 'basic', 
        label: 'Basic Plan', 
        description: 'Essential features for individual students' 
      },
      { 
        value: 'premium', 
        label: 'Premium Plan', 
        description: 'Advanced features and priority support' 
      },
      { 
        value: 'team', 
        label: 'Team Plan', 
        description: 'Collaboration tools for study groups' 
      },
    ],
    value: 'basic',
  },
};

export const WithError: Story = {
  args: {
    name: 'error',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    error: 'Please select an option to continue',
  },
};

export const Horizontal: Story = {
  args: {
    name: 'horizontal',
    orientation: 'horizontal',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' },
    ],
    value: 'yes',
  },
};

export const Card: Story = {
  args: {
    name: 'card',
    variant: 'card',
    options: [
      { 
        value: 'morning', 
        label: 'Morning Session', 
        description: '8:00 AM - 12:00 PM' 
      },
      { 
        value: 'afternoon', 
        label: 'Afternoon Session', 
        description: '1:00 PM - 5:00 PM' 
      },
      { 
        value: 'evening', 
        label: 'Evening Session', 
        description: '6:00 PM - 10:00 PM' 
      },
    ],
    value: 'morning',
  },
};

// Single radio examples
export const SingleRadioExamples: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Single Radio Buttons</h3>
        <div className="space-y-3">
          <SingleRadio
            name="single1"
            label="Single radio button"
            description="This is a standalone radio button"
          />
          
          <SingleRadio
            name="single2"
            label="Checked radio button"
            description="This radio is checked by default"
            checked
          />
          
          <SingleRadio
            name="single3"
            label="Disabled radio button"
            description="This radio is disabled"
            disabled
          />
          
          <SingleRadio
            name="single4"
            label="Card variant"
            description="Radio with card styling"
            variant="card"
          />
        </div>
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <Radio
        name="small"
        size="sm"
        options={[
          { value: 'sm1', label: 'Small Option 1', description: 'Compact size for tight layouts' },
          { value: 'sm2', label: 'Small Option 2', description: 'Another small option' },
        ]}
        value="sm1"
      />
      
      <Radio
        name="medium"
        size="md"
        options={[
          { value: 'md1', label: 'Medium Option 1 (Default)', description: 'Standard size for most use cases' },
          { value: 'md2', label: 'Medium Option 2', description: 'Another medium option' },
        ]}
        value="md1"
      />
      
      <Radio
        name="large"
        size="lg"
        options={[
          { value: 'lg1', label: 'Large Option 1', description: 'Larger size for prominent selections' },
          { value: 'lg2', label: 'Large Option 2', description: 'Another large option' },
        ]}
        value="lg1"
      />
    </div>
  ),
};

// Campus radio scenarios
export const CampusRadioScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Enrollment Options</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">CS 201 - Data Structures</h4>
            <p className="text-hive-text-secondary">Choose your preferred class format</p>
          </div>
          
          <Radio
            name="class-format"
            variant="card"
            size="md"
            options={[
              {
                value: 'in-person',
                label: 'In-Person Classes',
                description: 'Traditional classroom experience with face-to-face interaction'
              },
              {
                value: 'hybrid',
                label: 'Hybrid Format',
                description: 'Combination of in-person and online sessions for flexibility'
              },
              {
                value: 'online',
                label: 'Fully Online',
                description: 'Remote learning with live virtual sessions and recordings'
              },
              {
                value: 'self-paced',
                label: 'Self-Paced Online',
                description: 'Complete coursework on your own schedule with deadlines',
                disabled: true
              }
            ]}
            value="hybrid"
          />
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Confirm Selection
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-hive-sapphire" />
                Preferred Meeting Time
              </h4>
              <Radio
                name="meeting-time"
                size="sm"
                options={[
                  { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)', description: 'Early start, fresh mind' },
                  { value: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)', description: 'Post-lunch productivity' },
                  { value: 'evening', label: 'Evening (6:00 PM - 10:00 PM)', description: 'After classes end' },
                  { value: 'late', label: 'Late Night (10:00 PM - 2:00 AM)', description: 'Night owl schedule' }
                ]}
                value="evening"
              />
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-hive-emerald" />
                Group Size Preference
              </h4>
              <Radio
                name="group-size"
                size="sm"
                options={[
                  { value: 'small', label: '2-4 people', description: 'Intimate, focused discussions' },
                  { value: 'medium', label: '5-8 people', description: 'Balanced group dynamics' },
                  { value: 'large', label: '9-15 people', description: 'Diverse perspectives, social' },
                  { value: 'any', label: 'No preference', description: 'Flexible with any size' }
                ]}
                value="medium"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-hive-gold" />
              Meeting Location
            </h4>
            <Radio
              name="location"
              orientation="horizontal"
              options={[
                { value: 'library', label: 'Library' },
                { value: 'student-center', label: 'Student Center' },
                { value: 'online', label: 'Online' },
                { value: 'outdoor', label: 'Outdoor Space' }
              ]}
              value="library"
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Academic Year Selection</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Classification Update</h4>
            <p className="text-hive-text-secondary">Select your current academic standing</p>
          </div>
          
          <Radio
            name="academic-year"
            variant="card"
            options={[
              {
                value: 'freshman',
                label: 'Freshman',
                description: '0-29 credit hours completed • First year of college'
              },
              {
                value: 'sophomore',
                label: 'Sophomore',
                description: '30-59 credit hours completed • Second year of college'
              },
              {
                value: 'junior',
                label: 'Junior',
                description: '60-89 credit hours completed • Third year of college'
              },
              {
                value: 'senior',
                label: 'Senior',
                description: '90+ credit hours completed • Final year of undergraduate'
              },
              {
                value: 'graduate',
                label: 'Graduate Student',
                description: 'Pursuing Master\'s, PhD, or other advanced degree'
              }
            ]}
            value="junior"
          />
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-hive-text-secondary">
              This information helps us provide relevant content and opportunities
            </p>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Update Classification
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Development Platform</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Target Platform</h4>
            <p className="text-hive-text-secondary">Choose the primary platform for your study tool</p>
          </div>
          
          <Radio
            name="platform"
            variant="card"
            size="lg"
            options={[
              {
                value: 'web',
                label: 'Web Application',
                description: 'Browser-based tool accessible on any device with internet connection'
              },
              {
                value: 'mobile',
                label: 'Mobile App',
                description: 'Native iOS/Android app for on-the-go studying and notifications'
              },
              {
                value: 'desktop',
                label: 'Desktop Application',
                description: 'Standalone desktop app for Windows, Mac, and Linux systems'
              },
              {
                value: 'cross-platform',
                label: 'Cross-Platform',
                description: 'Universal solution that works seamlessly across all devices'
              }
            ]}
            value="web"
          />
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
              Continue Development
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Payment Method Selection</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Premium Subscription</h4>
            <p className="text-hive-text-secondary">Choose your preferred payment method</p>
          </div>
          
          <Radio
            name="payment"
            variant="card"
            options={[
              {
                value: 'credit-card',
                label: 'Credit/Debit Card',
                description: 'Visa, MasterCard, American Express, or Discover'
              },
              {
                value: 'student-account',
                label: 'Student Account',
                description: 'Charge to your university student account balance'
              },
              {
                value: 'financial-aid',
                label: 'Financial Aid',
                description: 'Use eligible financial aid funds (requires verification)'
              },
              {
                value: 'parent-billing',
                label: 'Parent/Guardian Billing',
                description: 'Send invoice to parent or guardian email address'
              }
            ]}
            value="student-account"
          />
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-hive-text-secondary">
              <p>Monthly subscription: $9.99/month</p>
              <p>Annual subscription: $99.99/year (Save 17%)</p>
            </div>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Device Access Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Primary Study Device</h4>
            <p className="text-hive-text-secondary">Select your main device for studying and tool usage</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Radio
              name="device"
              variant="card"
              size="sm"
              options={[
                {
                  value: 'laptop',
                  label: 'Laptop Computer',
                  description: 'MacBook, Windows laptop, or Chromebook'
                },
                {
                  value: 'desktop',
                  label: 'Desktop Computer',
                  description: 'Home or library desktop setup'
                },
                {
                  value: 'tablet',
                  label: 'Tablet',
                  description: 'iPad, Android tablet, or Surface'
                },
                {
                  value: 'smartphone',
                  label: 'Smartphone',
                  description: 'iPhone or Android phone'
                }
              ]}
              value="laptop"
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Save Device Preference
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive radio groups
export const InteractiveRadioGroups: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');

    const plans = [
      {
        value: 'free',
        label: 'Free Plan',
        description: 'Basic features for individual use • Limited to 3 tools per month'
      },
      {
        value: 'basic',
        label: 'Basic Plan - $4.99/month',
        description: 'Unlimited tool access • Priority support • No ads'
      },
      {
        value: 'premium',
        label: 'Premium Plan - $9.99/month',
        description: 'Everything in Basic • Advanced analytics • Custom themes • Early access'
      },
      {
        value: 'student',
        label: 'Student Discount - $2.99/month',
        description: 'Premium features at student price • Requires .edu email verification'
      }
    ];

    const schedules = [
      { value: 'morning', label: 'Morning Person', description: '6:00 AM - 12:00 PM optimal study time' },
      { value: 'afternoon', label: 'Afternoon Focused', description: '12:00 PM - 6:00 PM peak productivity' },
      { value: 'evening', label: 'Evening Studier', description: '6:00 PM - 12:00 AM preferred study hours' },
      { value: 'night', label: 'Night Owl', description: '12:00 AM - 6:00 AM most alert and focused' }
    ];

    const majors = [
      { value: 'cs', label: 'Computer Science', description: 'Programming, algorithms, software development' },
      { value: 'engineering', label: 'Engineering', description: 'Various engineering disciplines' },
      { value: 'business', label: 'Business', description: 'Management, finance, marketing, entrepreneurship' },
      { value: 'biology', label: 'Biology', description: 'Life sciences, pre-med, research' },
      { value: 'psychology', label: 'Psychology', description: 'Human behavior, mental health, research' },
      { value: 'other', label: 'Other', description: 'Not listed above' }
    ];

    return (
      <div className="space-y-8 p-6 max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Subscription Plan Selection</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Radio
              name="plan"
              variant="card"
              options={plans}
              value={selectedPlan}
              onChange={setSelectedPlan}
            />
            
            <div className="mt-4 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                Selected: {plans.find(p => p.value === selectedPlan)?.label}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Study Schedule</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Radio
              name="schedule"
              variant="default"
              options={schedules}
              value={selectedSchedule}
              onChange={setSelectedSchedule}
              error={!selectedSchedule ? 'Please select your preferred study schedule' : undefined}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Academic Major</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <Radio
              name="major"
              variant="card"
              size="sm"
              options={majors}
              value={selectedMajor}
              onChange={setSelectedMajor}
            />
            
            {selectedMajor && (
              <div className="mt-4 pt-4 border-t border-hive-border-subtle">
                <p className="text-sm text-hive-text-secondary">
                  We'll customize your experience for {majors.find(m => m.value === selectedMajor)?.label} students
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSchedule || !selectedMajor}
          >
            Complete Setup ({[selectedPlan, selectedSchedule, selectedMajor].filter(Boolean).length}/3)
          </button>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    name: 'interactive',
    options: [
      { value: 'option1', label: 'Option 1', description: 'First choice' },
      { value: 'option2', label: 'Option 2', description: 'Second choice' },
      { value: 'option3', label: 'Option 3', description: 'Third choice' },
    ],
    value: 'option1',
    size: 'md',
    variant: 'default',
    orientation: 'vertical',
    disabled: false,
  },
};