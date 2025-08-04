import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../atomic/atoms/checkbox';
import { useState } from 'react';
import { Users, BookOpen, Calendar, Bell, Shield, Eye, Clock, Star } from 'lucide-react';

const meta: Meta<typeof Checkbox> = {
  title: '01-Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base checkbox component with semantic tokens, variants, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Checkbox visual variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    label: {
      control: 'text',
      description: 'Checkbox label',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Send me notifications',
    description: 'Get updates about new study groups and course materials',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required field',
    description: 'This field must be checked to continue',
    error: 'You must accept the terms to proceed',
  },
};

export const Checked: Story = {
  args: {
    label: 'This is checked',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Partially selected',
    description: 'Some options are selected',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    description: 'This option is not available',
    disabled: true,
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    label: 'Card variant',
    description: 'This checkbox has a card-style container',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <Checkbox
        size="sm"
        label="Small checkbox"
        description="Compact size for tight layouts"
      />
      
      <Checkbox
        size="md"
        label="Medium checkbox (default)"
        description="Standard size for most use cases"
      />
      
      <Checkbox
        size="lg"
        label="Large checkbox"
        description="Larger size for prominent options"
      />
    </div>
  ),
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 p-4 max-w-md">
      <Checkbox
        label="Unchecked"
        description="Default unchecked state"
      />
      
      <Checkbox
        label="Checked"
        description="Selected option"
        checked
      />
      
      <Checkbox
        label="Indeterminate"
        description="Partially selected state"
        indeterminate
      />
      
      <Checkbox
        label="Disabled unchecked"
        description="Cannot be interacted with"
        disabled
      />
      
      <Checkbox
        label="Disabled checked"
        description="Disabled in checked state"
        disabled
        checked
      />
      
      <Checkbox
        label="Error state"
        description="Something went wrong"
        error="This field is required"
      />
    </div>
  ),
};

// Campus checkbox scenarios
export const CampusCheckboxScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Registration Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-4">
            <h4 className="font-semibold text-hive-text-primary mb-4">Select your preferences:</h4>
            
            <Checkbox
              variant="card"
              label="Morning Classes (8:00 AM - 12:00 PM)"
              description="Prefer classes scheduled in the morning hours"
            />
            
            <Checkbox
              variant="card"
              label="Evening Classes (6:00 PM - 10:00 PM)"
              description="Prefer classes scheduled in the evening hours"
              checked
            />
            
            <Checkbox
              variant="card"
              label="Online Components"
              description="Comfortable with hybrid or fully online courses"
              checked
            />
            
            <Checkbox
              variant="card"
              label="Lab Requirements"
              description="Willing to enroll in courses with lab components"
            />
            
            <Checkbox
              variant="card"
              label="Weekend Sessions"
              description="Available for weekend study sessions or makeup classes"
              disabled
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Notification Settings</h4>
              <div className="space-y-3">
                <Checkbox
                  label="New member notifications"
                  description="Get notified when someone joins your group"
                  checked
                />
                
                <Checkbox
                  label="Session reminders"
                  description="Receive reminders 1 hour before sessions"
                  checked
                />
                
                <Checkbox
                  label="Assignment deadlines"
                  description="Get alerts about upcoming assignment due dates"
                />
                
                <Checkbox
                  label="Group chat messages"
                  description="Push notifications for new chat messages"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Privacy Settings</h4>
              <div className="space-y-3">
                <Checkbox
                  label="Public profile"
                  description="Allow other students to find your profile"
                  checked
                />
                
                <Checkbox
                  label="Show study schedule"
                  description="Display your study schedule to group members"
                />
                
                <Checkbox
                  label="Email visibility"
                  description="Allow group members to see your email"
                />
                
                <Checkbox
                  label="Performance stats"
                  description="Share your academic performance with the group"
                  error="This setting requires admin approval"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Update Settings
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Creation Checklist</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">GPA Calculator Pro - Pre-launch</h4>
            <p className="text-hive-text-secondary">Complete these steps before publishing your tool</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Development</h5>
              <div className="space-y-2 ml-4">
                <Checkbox
                  size="sm"
                  label="Core functionality implemented"
                  description="All primary features are working correctly"
                  checked
                />
                
                <Checkbox
                  size="sm"
                  label="Error handling added"
                  description="Proper error messages and validation"
                  checked
                />
                
                <Checkbox
                  size="sm"
                  label="Mobile responsiveness"
                  description="Tool works well on mobile devices"
                  indeterminate
                />
                
                <Checkbox
                  size="sm"
                  label="Accessibility features"
                  description="Screen reader support and keyboard navigation"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Testing</h5>
              <div className="space-y-2 ml-4">
                <Checkbox
                  size="sm"
                  label="Unit tests written"
                  description="Core functions have test coverage"
                  checked
                />
                
                <Checkbox
                  size="sm"
                  label="User testing completed"
                  description="At least 5 students have tested the tool"
                />
                
                <Checkbox
                  size="sm"
                  label="Performance testing"
                  description="Tool loads quickly and handles large datasets"
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Documentation</h5>
              <div className="space-y-2 ml-4">
                <Checkbox
                  size="sm"
                  label="User guide created"
                  description="Step-by-step instructions for students"
                  checked
                />
                
                <Checkbox
                  size="sm"
                  label="FAQ section"
                  description="Common questions and answers"
                />
                
                <Checkbox
                  size="sm"
                  label="Video tutorial"
                  description="Optional: Screen recording of tool usage"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-hive-text-secondary">Progress: 5/10 items completed</span>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Progress
              </button>
              <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Publish Tool
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Selection Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Fall 2024 Course Registration</h4>
            <p className="text-hive-text-secondary">Select courses for your upcoming semester</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Required Courses</h5>
              <div className="space-y-3">
                <Checkbox
                  variant="card"
                  label="CS 201 - Data Structures and Algorithms"
                  description="MWF 10:00-11:00 AM • Dr. Johnson • 3 credits"
                  checked
                  disabled
                />
                
                <Checkbox
                  variant="card"
                  label="MATH 220 - Discrete Mathematics"
                  description="TTh 2:00-3:30 PM • Prof. Smith • 4 credits"
                  checked
                  disabled
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Elective Courses</h5>
              <div className="space-y-3">
                <Checkbox
                  variant="card"
                  label="CS 330 - Machine Learning Fundamentals"
                  description="MWF 2:00-3:00 PM • Dr. Chen • 3 credits • Prerequisite: CS 201"
                  checked
                />
                
                <Checkbox
                  variant="card"
                  label="CS 350 - Web Development"
                  description="TTh 10:00-11:30 AM • Prof. Rodriguez • 3 credits"
                />
                
                <Checkbox
                  variant="card"
                  label="CS 380 - Database Systems"
                  description="MWF 1:00-2:00 PM • Dr. Park • 3 credits • Limited seats available"
                />
                
                <Checkbox
                  variant="card"
                  label="PHIL 280 - Ethics in Technology"
                  description="TTh 3:30-5:00 PM • Prof. Williams • 3 credits • General Education"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-hive-text-secondary">
              <p>Selected: 12 credits</p>
              <p>Maximum: 18 credits per semester</p>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Profile Privacy Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-hive-sapphire" />
                Visibility Settings
              </h4>
              <div className="space-y-3">
                <Checkbox
                  label="Show profile to all students"
                  description="Anyone on campus can view your profile"
                  checked
                />
                
                <Checkbox
                  label="Display study schedule"
                  description="Let others see when you're available to study"
                />
                
                <Checkbox
                  label="Show completed courses"
                  description="Display your academic progress"
                  checked
                />
                
                <Checkbox
                  label="List created tools"
                  description="Showcase tools you've built for the community"
                  checked
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-hive-gold" />
                Communication Preferences
              </h4>
              <div className="space-y-3">
                <Checkbox
                  label="Allow direct messages"
                  description="Other students can message you directly"
                  checked
                />
                
                <Checkbox
                  label="Study group invitations"
                  description="Receive invitations to join study groups"
                  checked
                />
                
                <Checkbox
                  label="Tool collaboration requests"
                  description="Get requests to collaborate on tool projects"
                />
                
                <Checkbox
                  label="Academic event notifications"
                  description="Receive updates about campus academic events"
                  indeterminate
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-hive-border-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-hive-text-secondary">
                <Shield className="w-4 h-4" />
                <span>Your privacy settings are secure and can be changed anytime</span>
              </div>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive checkbox groups
export const InteractiveCheckboxGroups: Story = {
  render: () => {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['cs', 'math']);
    const [selectedDays, setSelectedDays] = useState<string[]>(['monday', 'wednesday']);
    const [allSubjects, setAllSubjects] = useState(false);

    const subjects = [
      { id: 'cs', label: 'Computer Science', courses: 45 },
      { id: 'math', label: 'Mathematics', courses: 32 },
      { id: 'physics', label: 'Physics', courses: 28 },
      { id: 'chem', label: 'Chemistry', courses: 24 },
      { id: 'bio', label: 'Biology', courses: 19 },
    ];

    const days = [
      { id: 'monday', label: 'Monday' },
      { id: 'tuesday', label: 'Tuesday' },
      { id: 'wednesday', label: 'Wednesday' },
      { id: 'thursday', label: 'Thursday' },
      { id: 'friday', label: 'Friday' },
    ];

    const handleSubjectChange = (subjectId: string, checked: boolean) => {
      if (checked) {
        setSelectedSubjects(prev => [...prev, subjectId]);
      } else {
        setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
      }
    };

    const handleSelectAll = (checked: boolean) => {
      setAllSubjects(checked);
      if (checked) {
        setSelectedSubjects(subjects.map(s => s.id));
      } else {
        setSelectedSubjects([]);
      }
    };

    const handleDayChange = (dayId: string, checked: boolean) => {
      if (checked) {
        setSelectedDays(prev => [...prev, dayId]);
      } else {
        setSelectedDays(prev => prev.filter(id => id !== dayId));
      }
    };

    const isIndeterminate = selectedSubjects.length > 0 && selectedSubjects.length < subjects.length;

    return (
      <div className="space-y-8 p-6 max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Course Filter</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="space-y-4">
              <Checkbox
                label="Select All Subjects"
                description={`Select all ${subjects.length} subject areas`}
                checked={allSubjects || selectedSubjects.length === subjects.length}
                indeterminate={isIndeterminate}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              
              <div className="ml-6 space-y-2">
                {subjects.map((subject) => (
                  <Checkbox
                    key={subject.id}
                    size="sm"
                    label={subject.label}
                    description={`${subject.courses} courses available`}
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                Selected: {selectedSubjects.length} of {subjects.length} subjects
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Schedule Preferences</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Available Days</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {days.map((day) => (
                <Checkbox
                  key={day.id}
                  variant="card"
                  size="sm"
                  label={day.label}
                  checked={selectedDays.includes(day.id)}
                  onChange={(e) => handleDayChange(day.id, e.target.checked)}
                />
              ))}
            </div>
            
            <div className="mt-4 text-sm text-hive-text-secondary">
              Available {selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''} per week
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
            Apply Filters ({selectedSubjects.length + selectedDays.length} selected)
          </button>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Checkbox - Use controls to customize →',
    description: 'Use the controls panel to test different configurations',
    size: 'md',
    variant: 'default',
    disabled: false,
    checked: false,
    indeterminate: false,
  },
};