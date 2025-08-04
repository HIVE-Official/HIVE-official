import type { Meta, StoryObj } from '@storybook/react';
import { Select, MultiSelect, SelectGroup, SelectPresets } from '../../atomic/atoms/select-enhanced';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: '01-Atoms/Select Enhanced',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced select component with validation states, helper text, and campus-specific options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning', 'brand'],
      description: 'Select variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Select size',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'Border radius',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    allowClear: {
      control: 'boolean',
      description: 'Show clear button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose your major',
    options: [
      { value: 'cs', label: 'Computer Science' },
      { value: 'math', label: 'Mathematics' },
      { value: 'eng', label: 'Engineering' },
      { value: 'bus', label: 'Business' },
    ],
    placeholder: 'Select your major',
    required: true,
    helperText: 'This helps us recommend relevant tools and spaces',
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        size="sm"
        label="Small"
        options={[
          { value: 'sm1', label: 'Small Option 1' },
          { value: 'sm2', label: 'Small Option 2' },
        ]}
        placeholder="Small select"
      />
      <Select
        size="default"
        label="Default"
        options={[
          { value: 'def1', label: 'Default Option 1' },
          { value: 'def2', label: 'Default Option 2' },
        ]}
        placeholder="Default select"
      />
      <Select
        size="lg"
        label="Large"
        options={[
          { value: 'lg1', label: 'Large Option 1' },
          { value: 'lg2', label: 'Large Option 2' },
        ]}
        placeholder="Large select"
      />
      <Select
        size="xl"
        label="Extra Large"
        options={[
          { value: 'xl1', label: 'Extra Large Option 1' },
          { value: 'xl2', label: 'Extra Large Option 2' },
        ]}
        placeholder="Extra large select"
      />
    </div>
  ),
};

// Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        variant="default"
        label="Default"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        placeholder="Default variant"
      />
      <Select
        variant="success"
        label="Success"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        value="opt1"
        success="Great choice!"
      />
      <Select
        variant="error"
        label="Error"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        error="This field is required"
      />
      <Select
        variant="warning"
        label="Warning"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        helperText="This selection will affect your preferences"
      />
      <Select
        variant="brand"
        label="Brand"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        placeholder="Brand variant"
      />
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => {
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [dormType, setDormType] = useState('');
    const [mealPlan, setMealPlan] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Major"
              options={[
                { value: 'cs', label: 'Computer Science', description: 'Programming and software development' },
                { value: 'math', label: 'Mathematics', description: 'Pure and applied mathematics' },
                { value: 'engineering', label: 'Engineering', description: 'Various engineering disciplines' },
                { value: 'business', label: 'Business Administration', description: 'Management and entrepreneurship' },
                { value: 'biology', label: 'Biology', description: 'Life sciences and research' },
                { value: 'psychology', label: 'Psychology', description: 'Human behavior and mental processes' },
                { value: 'english', label: 'English Literature', description: 'Language and literary studies' },
                { value: 'chemistry', label: 'Chemistry', description: 'Chemical sciences and research' },
                { value: 'physics', label: 'Physics', description: 'Physical sciences and theory' },
                { value: 'other', label: 'Other', description: 'Not listed above' },
              ]}
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Choose your major"
              required
              helperText="This helps us recommend relevant study groups and tools"
            />
            
            <Select
              label="Academic Year"
              options={[
                { value: 'freshman', label: 'Freshman (1st Year)' },
                { value: 'sophomore', label: 'Sophomore (2nd Year)' },
                { value: 'junior', label: 'Junior (3rd Year)' },
                { value: 'senior', label: 'Senior (4th Year)' },
                { value: 'graduate', label: 'Graduate Student' },
                { value: 'phd', label: 'PhD Candidate' },
                { value: 'postdoc', label: 'Postdoctoral Researcher' },
              ]}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Select your year"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Life</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Housing Preference"
              options={[
                { value: 'traditional', label: 'Traditional Dorm', description: 'Shared rooms with communal bathrooms' },
                { value: 'suite', label: 'Suite Style', description: 'Private rooms with shared common area' },
                { value: 'apartment', label: 'Apartment Style', description: 'Kitchen and living space included' },
                { value: 'single', label: 'Single Room', description: 'Private room, shared facilities' },
                { value: 'off-campus', label: 'Off-Campus', description: 'Living off university grounds' },
                { value: 'commuter', label: 'Commuter', description: 'Living at home' },
              ]}
              value={dormType}
              onChange={(e) => setDormType(e.target.value)}
              placeholder="Select housing type"
              helperText="Helps us connect you with floor and building communities"
            />
            
            <Select
              label="Meal Plan"
              options={[
                { value: 'unlimited', label: 'Unlimited Dining', description: '$2,800/semester' },
                { value: 'premium', label: 'Premium Plan (19/week)', description: '$2,400/semester' },
                { value: 'standard', label: 'Standard Plan (14/week)', description: '$2,000/semester' },
                { value: 'basic', label: 'Basic Plan (10/week)', description: '$1,600/semester' },
                { value: 'commuter', label: 'Commuter Plan (50 meals)', description: '$500/semester' },
                { value: 'none', label: 'No Meal Plan', description: 'Cook your own meals' },
              ]}
              value={mealPlan}
              onChange={(e) => setMealPlan(e.target.value)}
              placeholder="Choose meal plan"
              helperText="Required for on-campus residents"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Preferences</h3>
          <div className="space-y-4">
            <Select
              label="Primary Development Environment"
              options={[
                { value: 'vscode', label: 'Visual Studio Code' },
                { value: 'intellij', label: 'IntelliJ IDEA' },
                { value: 'eclipse', label: 'Eclipse' },
                { value: 'atom', label: 'Atom (deprecated)' },
                { value: 'sublime', label: 'Sublime Text' },
                { value: 'vim', label: 'Vim/Neovim' },
                { value: 'emacs', label: 'Emacs' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select your preferred IDE"
              helperText="Helps us recommend relevant coding tools and extensions"
              variant="brand"
            />
            
            <Select
              label="Notification Frequency"
              options={[
                { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
                { value: 'hourly', label: 'Hourly Digest', description: 'Summary every hour' },
                { value: 'daily', label: 'Daily Digest', description: 'Summary once per day' },
                { value: 'weekly', label: 'Weekly Digest', description: 'Summary once per week' },
                { value: 'never', label: 'Never', description: 'No email notifications' },
              ]}
              placeholder="Choose notification frequency"
              helperText="How often do you want to receive email updates?"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Multi-select examples
export const MultiSelectExamples: Story = {
  render: () => {
    const [interests, setInterests] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [courses, setCourses] = useState<string[]>([]);

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Multi-Select Examples</h3>
          
          <div className="space-y-6">
            <MultiSelect
              label="Areas of Interest"
              options={[
                { value: 'web-dev', label: 'Web Development' },
                { value: 'mobile-dev', label: 'Mobile Development' },
                { value: 'data-science', label: 'Data Science' },
                { value: 'machine-learning', label: 'Machine Learning' },
                { value: 'cybersecurity', label: 'Cybersecurity' },
                { value: 'game-dev', label: 'Game Development' },
                { value: 'ui-ux', label: 'UI/UX Design' },
                { value: 'devops', label: 'DevOps' },
                { value: 'blockchain', label: 'Blockchain' },
                { value: 'ar-vr', label: 'AR/VR' },
              ]}
              value={interests}
              onChange={setInterests}
              placeholder="Select your interests (hold Ctrl/Cmd to select multiple)"
              helperText={`Selected: ${interests.length} interests`}
              maxSelected={5}
            />
            
            <MultiSelect
              label="Programming Languages"
              options={[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
                { value: 'cpp', label: 'C++' },
                { value: 'csharp', label: 'C#' },
                { value: 'go', label: 'Go' },
                { value: 'rust', label: 'Rust' },
                { value: 'swift', label: 'Swift' },
                { value: 'kotlin', label: 'Kotlin' },
                { value: 'typescript', label: 'TypeScript' },
              ]}
              value={skills}
              onChange={setSkills}
              placeholder="Select languages you know"
              helperText="This helps us match you with relevant projects"
              variant="brand"
            />
            
            <MultiSelect
              label="Current Courses"
              options={[
                { value: 'cs101', label: 'CS 101 - Intro to Programming' },
                { value: 'cs201', label: 'CS 201 - Data Structures' },
                { value: 'cs301', label: 'CS 301 - Algorithms' },
                { value: 'math151', label: 'MATH 151 - Calculus I' },
                { value: 'math152', label: 'MATH 152 - Calculus II' },
                { value: 'phys201', label: 'PHYS 201 - Physics I' },
                { value: 'eng101', label: 'ENG 101 - Writing' },
                { value: 'hist101', label: 'HIST 101 - World History' },
              ]}
              value={courses}
              onChange={setCourses}
              placeholder="Select your current courses"
              helperText="Helps us recommend study groups and academic tools"
              maxSelected={8}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Select groups
export const SelectGroups: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Schedule a Study Session</h3>
          
          <div className="space-y-6">
            <Select
              label="Date"
              options={[
                { value: '2024-03-20', label: 'Today (March 20)' },
                { value: '2024-03-21', label: 'Tomorrow (March 21)' },
                { value: '2024-03-22', label: 'Friday (March 22)' },
                { value: '2024-03-23', label: 'Saturday (March 23)' },
                { value: '2024-03-24', label: 'Sunday (March 24)' },
                { value: '2024-03-25', label: 'Monday (March 25)' },
              ]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select date"
              required
            />

            <SelectGroup orientation="horizontal" spacing="md">
              <Select
                label="Start Time"
                options={[
                  { value: '08:00', label: '8:00 AM' },
                  { value: '09:00', label: '9:00 AM' },
                  { value: '10:00', label: '10:00 AM' },
                  { value: '11:00', label: '11:00 AM' },
                  { value: '12:00', label: '12:00 PM' },
                  { value: '13:00', label: '1:00 PM' },
                  { value: '14:00', label: '2:00 PM' },
                  { value: '15:00', label: '3:00 PM' },
                  { value: '16:00', label: '4:00 PM' },
                  { value: '17:00', label: '5:00 PM' },
                  { value: '18:00', label: '6:00 PM' },
                  { value: '19:00', label: '7:00 PM' },
                  { value: '20:00', label: '8:00 PM' },
                ]}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start time"
                required
              />
              
              <Select
                label="End Time"
                options={[
                  { value: '09:00', label: '9:00 AM' },
                  { value: '10:00', label: '10:00 AM' },
                  { value: '11:00', label: '11:00 AM' },
                  { value: '12:00', label: '12:00 PM' },
                  { value: '13:00', label: '1:00 PM' },
                  { value: '14:00', label: '2:00 PM' },
                  { value: '15:00', label: '3:00 PM' },
                  { value: '16:00', label: '4:00 PM' },
                  { value: '17:00', label: '5:00 PM' },
                  { value: '18:00', label: '6:00 PM' },
                  { value: '19:00', label: '7:00 PM' },
                  { value: '20:00', label: '8:00 PM' },
                  { value: '21:00', label: '9:00 PM' },
                  { value: '22:00', label: '10:00 PM' },
                ]}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End time"
                required
              />
            </SelectGroup>
          </div>
        </div>
      </div>
    );
  },
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Common Patterns</h3>
        <div className="space-y-4">
          <SelectPresets.Priority
            label="Task Priority"
            helperText="Set the urgency level"
          />
          
          <SelectPresets.Status
            label="Project Status"
            helperText="Current state of the project"
          />
          
          <SelectPresets.Size
            label="T-Shirt Size"
            helperText="Choose your size"
          />
          
          <SelectPresets.Country
            label="Country"
            helperText="Select your country"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      major: '',
      year: '',
      interests: [] as string[],
      skills: [] as string[],
      availability: '',
      location: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.major) newErrors.major = 'Please select your major';
      if (!formData.year) newErrors.year = 'Please select your academic year';
      if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
      if (!formData.availability) newErrors.availability = 'Please select your availability';
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Profile completed successfully!');
        console.log('Form data:', formData);
      }
    };

    const clearMajor = () => {
      setFormData(prev => ({ ...prev, major: '' }));
    };

    return (
      <div className="p-6 bg-hive-background-primary max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-2">Build Your Academic Profile</h2>
            <p className="text-hive-text-secondary">Help us connect you with the right study groups and tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Major"
              options={[
                { value: 'cs', label: 'Computer Science' },
                { value: 'math', label: 'Mathematics' },
                { value: 'engineering', label: 'Engineering' },
                { value: 'business', label: 'Business' },
                { value: 'biology', label: 'Biology' },
                { value: 'psychology', label: 'Psychology' },
                { value: 'english', label: 'English' },
                { value: 'other', label: 'Other' },
              ]}
              value={formData.major}
              onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
              placeholder="Choose your major"
              required
              error={errors.major}
              allowClear
              onClear={clearMajor}
            />
            
            <Select
              label="Academic Year"
              options={[
                { value: 'freshman', label: 'Freshman' },
                { value: 'sophomore', label: 'Sophomore' },
                { value: 'junior', label: 'Junior' },
                { value: 'senior', label: 'Senior' },
                { value: 'graduate', label: 'Graduate' },
              ]}
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="Select your year"
              required
              error={errors.year}
            />
          </div>

          <MultiSelect
            label="Areas of Interest"
            options={[
              { value: 'programming', label: 'Programming' },
              { value: 'data-science', label: 'Data Science' },
              { value: 'web-dev', label: 'Web Development' },
              { value: 'mobile-dev', label: 'Mobile Development' },
              { value: 'ai-ml', label: 'AI/Machine Learning' },
              { value: 'cybersecurity', label: 'Cybersecurity' },
              { value: 'game-dev', label: 'Game Development' },
              { value: 'ui-ux', label: 'UI/UX Design' },
            ]}
            value={formData.interests}
            onChange={(interests) => setFormData(prev => ({ ...prev, interests }))}
            placeholder="Select your interests"
            error={errors.interests}
            helperText={`Selected ${formData.interests.length} interests`}
            maxSelected={5}
          />

          <MultiSelect
            label="Technical Skills"
            options={[
              { value: 'javascript', label: 'JavaScript' },
              { value: 'python', label: 'Python' },
              { value: 'java', label: 'Java' },
              { value: 'cpp', label: 'C++' },
              { value: 'react', label: 'React' },
              { value: 'node', label: 'Node.js' },
              { value: 'sql', label: 'SQL' },
              { value: 'git', label: 'Git' },
            ]}
            value={formData.skills}
            onChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
            placeholder="Select your technical skills"
            helperText="Optional: helps match you with relevant projects"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Study Availability"
              options={[
                { value: 'morning', label: 'Morning (8AM - 12PM)' },
                { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
                { value: 'evening', label: 'Evening (6PM - 10PM)' },
                { value: 'night', label: 'Night (10PM - 12AM)' },
                { value: 'flexible', label: 'Flexible' },
              ]}
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              placeholder="When do you prefer to study?"
              required
              error={errors.availability}
            />
            
            <Select
              label="Preferred Study Location"
              options={[
                { value: 'library', label: 'Library' },
                { value: 'dorm', label: 'Dorm Room' },
                { value: 'study-rooms', label: 'Study Rooms' },
                { value: 'cafes', label: 'Campus Cafes' },
                { value: 'outdoors', label: 'Outdoor Spaces' },
                { value: 'online', label: 'Online/Remote' },
              ]}
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Where do you like to study?"
              helperText="Helps us suggest study groups near you"
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-hive-border-subtle">
            <div className="text-sm text-hive-text-mutedLight">
              Profile completion: {Object.values(formData).filter(v => Array.isArray(v) ? v.length > 0 : Boolean(v)).length} of 6 sections
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors disabled:opacity-50"
            >
              Complete Profile
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
    label: 'Interactive Select - Use controls to customize →',
    options: [
      { value: 'option1', label: 'Option 1', description: 'First choice' },
      { value: 'option2', label: 'Option 2', description: 'Second choice' },
      { value: 'option3', label: 'Option 3', description: 'Third choice' },
    ],
    placeholder: 'Choose an option',
    helperText: 'Select any option to see it in action',
    allowClear: true,
  },
};