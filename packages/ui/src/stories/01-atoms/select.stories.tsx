import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../atomic/atoms/select';
import { useState } from 'react';
import { GraduationCap, BookOpen, Clock, MapPin, Users, Star } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: '01-Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base select component with semantic tokens, search, multi-select, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'ghost'],
      description: 'Select visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Allow clearing selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
];

const campusOptions = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'graduate', label: 'Graduate Student' },
];

// Basic variants
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Academic Year',
    options: campusOptions,
    placeholder: 'Choose your year...',
    helperText: 'This helps us provide relevant content',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required Field',
    options: basicOptions,
    placeholder: 'Please select...',
    error: 'This field is required',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Select Multiple',
    options: basicOptions,
    placeholder: 'Choose multiple options...',
    multiple: true,
    helperText: 'You can select multiple options',
  },
};

export const Searchable: Story = {
  args: {
    label: 'Searchable Select',
    options: [
      { value: 'cs', label: 'Computer Science' },
      { value: 'math', label: 'Mathematics' },
      { value: 'physics', label: 'Physics' },
      { value: 'chemistry', label: 'Chemistry' },
      { value: 'biology', label: 'Biology' },
      { value: 'psychology', label: 'Psychology' },
      { value: 'english', label: 'English Literature' },
      { value: 'history', label: 'History' },
    ],
    placeholder: 'Search for a major...',
    searchable: true,
    helperText: 'Type to search through options',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Select',
    options: basicOptions,
    placeholder: 'Select with clear option...',
    value: 'option1',
    clearable: true,
    helperText: 'Click X to clear selection',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <Select
        variant="default"
        label="Default Variant"
        options={basicOptions}
        placeholder="Default select"
        helperText="Standard styled select"
      />
      
      <Select
        variant="outline"
        label="Outline Variant"
        options={basicOptions}
        placeholder="Outline select"
        helperText="Transparent background with border"
      />
      
      <Select
        variant="filled"
        label="Filled Variant"
        options={basicOptions}
        placeholder="Filled select"
        helperText="Subtle background styling"
      />
      
      <Select
        variant="ghost"
        label="Ghost Variant"
        options={basicOptions}
        placeholder="Ghost select"
        helperText="Minimal styling until focused"
      />
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <Select
        size="sm"
        label="Small Size"
        options={basicOptions}
        placeholder="Compact select"
        helperText="Small size for tight layouts"
      />
      
      <Select
        size="md"
        label="Medium Size (Default)"
        options={basicOptions}
        placeholder="Standard select"
        helperText="Default size for most use cases"
      />
      
      <Select
        size="lg"
        label="Large Size"
        options={basicOptions}
        placeholder="Large select"
        helperText="Prominent size for key selections"
      />
    </div>
  ),
};

// Campus select scenarios
export const CampusSelectScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Registration Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Semester"
              options={[
                { value: 'fall-2024', label: 'Fall 2024' },
                { value: 'spring-2025', label: 'Spring 2025' },
                { value: 'summer-2025', label: 'Summer 2025' },
              ]}
              placeholder="Select semester..."
              value="fall-2024"
              helperText="Current registration period"
            />
            
            <Select
              label="Academic Standing"
              options={[
                { value: 'freshman', label: 'Freshman (0-29 credits)' },
                { value: 'sophomore', label: 'Sophomore (30-59 credits)' },
                { value: 'junior', label: 'Junior (60-89 credits)' },
                { value: 'senior', label: 'Senior (90+ credits)' },
                { value: 'graduate', label: 'Graduate Student' },
              ]}
              placeholder="Select your standing..."
              helperText="Based on completed credit hours"
            />
            
            <Select
              label="Department"
              searchable
              options={[
                { value: 'cs', label: 'Computer Science' },
                { value: 'math', label: 'Mathematics' },
                { value: 'physics', label: 'Physics' },
                { value: 'chemistry', label: 'Chemistry' },
                { value: 'biology', label: 'Biology' },
                { value: 'english', label: 'English' },
                { value: 'history', label: 'History' },
                { value: 'psychology', label: 'Psychology' },
                { value: 'business', label: 'Business Administration' },
                { value: 'engineering', label: 'Engineering' },
              ]}
              placeholder="Search departments..."
              helperText="Type to find your department"
            />
            
            <Select
              label="Course Level"
              options={[
                { value: '100', label: '100-199 (Introductory)' },
                { value: '200', label: '200-299 (Intermediate)' },
                { value: '300', label: '300-399 (Advanced)' },
                { value: '400', label: '400-499 (Senior Level)' },
                { value: '500', label: '500+ (Graduate)' },
              ]}
              placeholder="Select level..."
              helperText="Course difficulty level"
            />
          </div>
          
          <div className="mt-6">
            <Select
              label="Preferred Days"
              multiple
              options={[
                { value: 'monday', label: 'Monday' },
                { value: 'tuesday', label: 'Tuesday' },
                { value: 'wednesday', label: 'Wednesday' },
                { value: 'thursday', label: 'Thursday' },
                { value: 'friday', label: 'Friday' },
                { value: 'saturday', label: 'Saturday' },
              ]}
              placeholder="Select available days..."
              helperText="Choose days you're available for classes"
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Search Courses
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Creation</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Course Subject"
              searchable
              clearable
              options={[
                { value: 'cs101', label: 'CS 101 - Introduction to Programming' },
                { value: 'cs201', label: 'CS 201 - Data Structures' },
                { value: 'cs301', label: 'CS 301 - Algorithms' },
                { value: 'math220', label: 'MATH 220 - Calculus I' },
                { value: 'math221', label: 'MATH 221 - Calculus II' },
                { value: 'phys201', label: 'PHYS 201 - General Physics I' },
                { value: 'chem101', label: 'CHEM 101 - General Chemistry' },
              ]}
              placeholder="Search for course..."
              helperText="What course will you focus on?"
            />
            
            <Select
              label="Group Size"
              options={[
                { value: '2-4', label: '2-4 people (Small)' },
                { value: '5-8', label: '5-8 people (Medium)' },
                { value: '9-15', label: '9-15 people (Large)' },
                { value: 'open', label: 'Open group (No limit)' },
              ]}
              placeholder="Select group size..."
              helperText="Preferred number of members"
            />
            
            <Select
              label="Meeting Location"
              options={[
                { value: 'library-main', label: 'Main Library - Study Rooms' },
                { value: 'library-science', label: 'Science Library' },
                { value: 'student-center', label: 'Student Center' },
                { value: 'engineering', label: 'Engineering Building' },
                { value: 'online', label: 'Online (Zoom/Discord)' },
                { value: 'hybrid', label: 'Hybrid (In-person + Online)' },
                { value: 'outdoor', label: 'Outdoor Spaces' },
              ]}
              placeholder="Choose meeting location..."
              helperText="Where will you meet?"
            />
            
            <Select
              label="Meeting Time"
              options={[
                { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
                { value: 'afternoon', label: 'Afternoon (12:00 PM - 5:00 PM)' },
                { value: 'evening', label: 'Evening (5:00 PM - 9:00 PM)' },
                { value: 'night', label: 'Night (9:00 PM - 12:00 AM)' },
                { value: 'flexible', label: 'Flexible scheduling' },
              ]}
              placeholder="Select meeting time..."
              helperText="When do you prefer to meet?"
            />
          </div>
          
          <div className="mt-6">
            <Select
              label="Study Topics"
              multiple
              searchable
              options={[
                { value: 'homework', label: 'Homework Help' },
                { value: 'exam-prep', label: 'Exam Preparation' },
                { value: 'projects', label: 'Group Projects' },
                { value: 'concepts', label: 'Concept Review' },
                { value: 'practice', label: 'Practice Problems' },
                { value: 'discussion', label: 'Topic Discussions' },
                { value: 'peer-teach', label: 'Peer Teaching' },
                { value: 'research', label: 'Research Collaboration' },
              ]}
              placeholder="Select study focus areas..."
              helperText="What will your group work on?"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Create Study Group
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Configuration Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">GPA Calculator Pro - Settings</h4>
            <p className="text-hive-text-secondary">Configure your tool's behavior and appearance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Grade Scale"
              options={[
                { value: '4.0', label: '4.0 Scale (A=4.0)' },
                { value: '4.3', label: '4.3 Scale (A+=4.3)' },
                { value: '5.0', label: '5.0 Scale (A=5.0)' },
                { value: '100', label: '100 Point Scale' },
                { value: 'custom', label: 'Custom Scale' },
              ]}
              placeholder="Select grading scale..."
              value="4.0"
              helperText="Your university's grading system"
            />
            
            <Select
              label="Default Theme"
              options={[
                { value: 'light', label: 'Light Theme' },
                { value: 'dark', label: 'Dark Theme' },
                { value: 'auto', label: 'Auto (System)' },
                { value: 'hive', label: 'HIVE Brand Theme' },
              ]}
              placeholder="Choose theme..."
              value="hive"
              helperText="Visual appearance of your tool"
            />
            
            <Select
              label="Calculation Method"
              options={[
                { value: 'weighted', label: 'Weighted by Credit Hours' },
                { value: 'simple', label: 'Simple Average' },
                { value: 'semester', label: 'Semester-based' },
                { value: 'cumulative', label: 'Cumulative GPA' },
              ]}
              placeholder="Select calculation..."
              value="weighted"
              helperText="How GPA should be calculated"
            />
            
            <Select
              label="Data Export Format"
              multiple
              options={[
                { value: 'csv', label: 'CSV (Excel Compatible)' },
                { value: 'json', label: 'JSON (Web Friendly)' },
                { value: 'pdf', label: 'PDF (Printable)' },
                { value: 'txt', label: 'Plain Text' },
              ]}
              placeholder="Select export formats..."
              helperText="Available download formats"
            />
          </div>
          
          <div className="mt-6">
            <Select
              label="Semester System"
              options={[
                { value: 'semester', label: 'Semester System (Fall/Spring)' },
                { value: 'quarter', label: 'Quarter System (Fall/Winter/Spring/Summer)' },
                { value: 'trimester', label: 'Trimester System' },
                { value: 'custom', label: 'Custom Academic Calendar' },
              ]}
              placeholder="Select academic system..."
              helperText="Your university's academic calendar"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Profile Customization</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Primary Major"
              searchable
              clearable
              options={[
                { value: 'cs', label: 'Computer Science' },
                { value: 'ce', label: 'Computer Engineering' },
                { value: 'se', label: 'Software Engineering' },
                { value: 'math', label: 'Mathematics' },
                { value: 'physics', label: 'Physics' },
                { value: 'chemistry', label: 'Chemistry' },
                { value: 'biology', label: 'Biology' },
                { value: 'psychology', label: 'Psychology' },
                { value: 'business', label: 'Business Administration' },
                { value: 'economics', label: 'Economics' },
                { value: 'english', label: 'English Literature' },
                { value: 'history', label: 'History' },
              ]}
              placeholder="Search for your major..."
              helperText="Your main field of study"
            />
            
            <Select
              label="Minor/Concentration"
              searchable
              clearable
              options={[
                { value: 'data-science', label: 'Data Science' },
                { value: 'cybersecurity', label: 'Cybersecurity' },
                { value: 'ai-ml', label: 'AI/Machine Learning' },
                { value: 'web-dev', label: 'Web Development' },
                { value: 'business', label: 'Business' },
                { value: 'pre-med', label: 'Pre-Medical' },
                { value: 'pre-law', label: 'Pre-Law' },
                { value: 'education', label: 'Education' },
              ]}
              placeholder="Optional minor or focus..."
              helperText="Secondary area of study"
            />
            
            <Select
              label="Career Interests"
              multiple
              searchable
              options={[
                { value: 'software-dev', label: 'Software Development' },
                { value: 'data-analysis', label: 'Data Analysis' },
                { value: 'research', label: 'Academic Research' },
                { value: 'consulting', label: 'Consulting' },
                { value: 'startup', label: 'Startup/Entrepreneurship' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'education', label: 'Education/Teaching' },
                { value: 'finance', label: 'Finance/Banking' },
                { value: 'government', label: 'Government/Public Service' },
                { value: 'nonprofit', label: 'Non-profit Sector' },
              ]}
              placeholder="Select career interests..."
              helperText="Help others find you for relevant opportunities"
            />
            
            <Select
              label="Skills to Share"
              multiple
              searchable
              options={[
                { value: 'programming', label: 'Programming/Coding' },
                { value: 'math-tutoring', label: 'Math Tutoring' },
                { value: 'writing', label: 'Academic Writing' },
                { value: 'presentation', label: 'Public Speaking' },
                { value: 'research', label: 'Research Methods' },
                { value: 'languages', label: 'Foreign Languages' },
                { value: 'design', label: 'Graphic Design' },
                { value: 'music', label: 'Music/Arts' },
                { value: 'sports', label: 'Sports/Athletics' },
                { value: 'leadership', label: 'Leadership' },
              ]}
              placeholder="What can you help others with..."
              helperText="Skills you can share with the community"
            />
          </div>
          
          <div className="mt-6">
            <Select
              label="Availability for Help"
              options={[
                { value: 'always', label: 'Always Available' },
                { value: 'weekdays', label: 'Weekdays Only' },
                { value: 'weekends', label: 'Weekends Only' },
                { value: 'evenings', label: 'Evenings Only' },
                { value: 'limited', label: 'Limited Availability' },
                { value: 'none', label: 'Not Available for Help' },
              ]}
              placeholder="When can you help others..."
              helperText="Let others know when you're available"
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Advanced Course Filters</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Instructor Rating"
              variant="ghost"
              size="sm"
              options={[
                { value: '4.5+', label: '4.5+ Stars' },
                { value: '4.0+', label: '4.0+ Stars' },
                { value: '3.5+', label: '3.5+ Stars' },
                { value: '3.0+', label: '3.0+ Stars' },
                { value: 'any', label: 'Any Rating' },
              ]}
              placeholder="Min rating..."
              helperText="Minimum instructor rating"
            />
            
            <Select
              label="Workload"
              variant="ghost"
              size="sm"
              options={[
                { value: 'light', label: 'Light (< 5 hrs/week)' },
                { value: 'moderate', label: 'Moderate (5-10 hrs/week)' },
                { value: 'heavy', label: 'Heavy (10-15 hrs/week)' },
                { value: 'intensive', label: 'Intensive (15+ hrs/week)' },
              ]}
              placeholder="Expected workload..."
              helperText="Weekly time commitment"
            />
            
            <Select
              label="Class Format"
              variant="ghost"
              size="sm"
              multiple
              options={[
                { value: 'lecture', label: 'Lecture' },
                { value: 'seminar', label: 'Seminar' },
                { value: 'lab', label: 'Laboratory' },
                { value: 'workshop', label: 'Workshop' },
                { value: 'online', label: 'Online' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
              placeholder="Class formats..."
              helperText="Teaching methods"
            />
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-hive-text-secondary">142 courses match your criteria</span>
            <div className="space-x-2">
              <button className="px-3 py-1.5 text-sm border border-hive-border-default text-hive-text-primary rounded hover:bg-hive-interactive-hover transition-colors">
                Clear All
              </button>
              <button className="px-3 py-1.5 text-sm bg-hive-gold text-hive-background-primary rounded hover:bg-hive-gold/90 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive select features
export const InteractiveSelectFeatures: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('');
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const courseOptions = [
      { value: 'cs101', label: 'CS 101 - Introduction to Programming' },
      { value: 'cs201', label: 'CS 201 - Data Structures and Algorithms' },
      { value: 'cs301', label: 'CS 301 - Database Systems' },
      { value: 'cs401', label: 'CS 401 - Software Engineering' },
      { value: 'math220', label: 'MATH 220 - Calculus I' },
      { value: 'math221', label: 'MATH 221 - Calculus II' },
      { value: 'phys201', label: 'PHYS 201 - General Physics I' },
      { value: 'chem101', label: 'CHEM 101 - General Chemistry' },
    ];

    return (
      <div className="space-y-8 p-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Single Selection</h3>
          <Select
            label="Choose One Course"
            options={courseOptions}
            value={singleValue}
            onChange={(value) => setSingleValue(value as string)}
            placeholder="Select a course..."
            clearable
            searchable
            helperText="Search and select your preferred course"
          />
          {singleValue && (
            <p className="mt-2 text-sm text-hive-text-secondary">
              Selected: {courseOptions.find(c => c.value === singleValue)?.label}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Multiple Selection</h3>
          <Select
            label="Choose Multiple Courses"
            options={courseOptions}
            value={multiValue}
            onChange={(value) => setMultiValue(value as string[])}
            placeholder="Select multiple courses..."
            multiple
            searchable
            clearable
            helperText="You can select multiple courses for your schedule"
          />
          {multiValue.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-hive-text-secondary mb-1">
                Selected {multiValue.length} course{multiValue.length !== 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-1">
                {multiValue.map(value => {
                  const course = courseOptions.find(c => c.value === value);
                  return (
                    <span
                      key={value}
                      className="px-2 py-1 bg-hive-gold/20 text-hive-gold text-xs rounded-full"
                    >
                      {course?.label.split(' - ')[0]}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Advanced Search</h3>
          <Select
            label="Search with Custom Handler"
            options={courseOptions.filter(course =>
              course.label.toLowerCase().includes(searchValue.toLowerCase())
            )}
            placeholder="Type to search courses..."
            searchable
            onSearch={setSearchValue}
            helperText="Custom search functionality with external state"
          />
          {searchValue && (
            <p className="mt-2 text-sm text-hive-text-secondary">
              Searching for: "{searchValue}"
            </p>
          )}
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1', disabled: false },
      { value: 'option2', label: 'Option 2', disabled: false },
      { value: 'option3', label: 'Option 3', disabled: true },
      { value: 'option4', label: 'Option 4', disabled: false },
    ],
    label: 'Interactive Select - Use controls to customize →',
    placeholder: 'Choose an option to test...',
    helperText: 'Use the controls panel to test different configurations',
    variant: 'default',
    size: 'md',
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    fullWidth: true,
  },
};