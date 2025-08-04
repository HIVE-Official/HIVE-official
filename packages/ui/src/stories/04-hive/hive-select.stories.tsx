import type { Meta, StoryObj } from '@storybook/react';
import { HiveSelect } from '../../components/hive-select';

const meta: Meta<typeof HiveSelect> = {
  title: '04-Hive/HiveSelect',
  component: HiveSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Select component for campus-first dropdown selections with academic and social contexts.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Academic course selection
export const CourseSelection: Story = {
  args: {
    placeholder: 'Select your course',
    options: [
      { value: 'cs101', label: 'CS 101 - Intro to Programming' },
      { value: 'cs201', label: 'CS 201 - Data Structures' },
      { value: 'cs301', label: 'CS 301 - Algorithms' },
      { value: 'cs401', label: 'CS 401 - Software Engineering' },
    ],
  },
};

// Major/Department selection
export const MajorSelection: Story = {
  args: {
    placeholder: 'Choose your major',
    size: 'lg',
    options: [
      { value: 'cs', label: 'Computer Science' },
      { value: 'ee', label: 'Electrical Engineering' },
      { value: 'me', label: 'Mechanical Engineering' },
      { value: 'bio', label: 'Biology' },
      { value: 'chem', label: 'Chemistry' },
      { value: 'phys', label: 'Physics' },
    ],
  },
};

// Class year selection
export const ClassYearSelection: Story = {
  args: {
    placeholder: 'Select class year',
    variant: 'outline',
    options: [
      { value: 'freshman', label: 'Freshman' },
      { value: 'sophomore', label: 'Sophomore' },
      { value: 'junior', label: 'Junior' },
      { value: 'senior', label: 'Senior' },
      { value: 'graduate', label: 'Graduate Student' },
    ],
  },
};

// Campus building selection
export const BuildingSelection: Story = {
  args: {
    placeholder: 'Select building',
    options: [
      { value: 'library', label: '📚 Main Library' },
      { value: 'union', label: '🏢 Student Union' },
      { value: 'gym', label: '🏋️ Recreation Center' },
      { value: 'dining', label: '🍽️ Dining Hall' },
      { value: 'labs', label: '🧪 Science Labs' },
    ],
  },
};

// Study group preferences
export const StudyPreferences: Story = {
  args: {
    placeholder: 'Study preferences',
    size: 'sm',
    options: [
      { value: 'quiet', label: 'Quiet study' },
      { value: 'group', label: 'Group study' },
      { value: 'music', label: 'Background music OK' },
      { value: 'collaborative', label: 'Collaborative projects' },
    ],
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Unavailable selection',
    disabled: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <HiveSelect
        placeholder="Small select"
        size="sm"
        options={[
          { value: 'opt1', label: 'Small option' },
          { value: 'opt2', label: 'Another small option' },
        ]}
      />
      <HiveSelect
        placeholder="Medium select (default)"
        size="md"
        options={[
          { value: 'opt1', label: 'Medium option' },
          { value: 'opt2', label: 'Another medium option' },
        ]}
      />
      <HiveSelect
        placeholder="Large select"
        size="lg"
        options={[
          { value: 'opt1', label: 'Large option' },
          { value: 'opt2', label: 'Another large option' },
        ]}
      />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <HiveSelect
        placeholder="Default variant"
        variant="default"
        options={[
          { value: 'opt1', label: 'Default option' },
          { value: 'opt2', label: 'Another option' },
        ]}
      />
      <HiveSelect
        placeholder="Outline variant"
        variant="outline"
        options={[
          { value: 'opt1', label: 'Outline option' },
          { value: 'opt2', label: 'Another option' },
        ]}
      />
      <HiveSelect
        placeholder="Ghost variant"
        variant="ghost"
        options={[
          { value: 'opt1', label: 'Ghost option' },
          { value: 'opt2', label: 'Another option' },
        ]}
      />
    </div>
  ),
};

// Campus-specific use cases
export const CampusUseCases: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="space-y-3">
        <h3 className="font-semibold text-hive-neutral-800">Academic Selections</h3>
        <HiveSelect
          placeholder="Select semester"
          options={[
            { value: 'fall2024', label: 'Fall 2024' },
            { value: 'spring2025', label: 'Spring 2025' },
            { value: 'summer2025', label: 'Summer 2025' },
          ]}
        />
        <HiveSelect
          placeholder="Credit hours"
          size="sm"
          options={[
            { value: '12', label: '12 credits (Part-time)' },
            { value: '15', label: '15 credits (Full-time)' },
            { value: '18', label: '18 credits (Overload)' },
          ]}
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-hive-neutral-800">Social Selections</h3>
        <HiveSelect
          placeholder="Event type"
          variant="outline"
          options={[
            { value: 'study', label: '📖 Study group' },
            { value: 'social', label: '🎉 Social event' },
            { value: 'sports', label: '⚽ Sports activity' },
            { value: 'club', label: '🏛️ Club meeting' },
          ]}
        />
        <HiveSelect
          placeholder="Availability"
          size="sm"
          variant="outline"
          options={[
            { value: 'morning', label: 'Morning (8-12 PM)' },
            { value: 'afternoon', label: 'Afternoon (12-5 PM)' },
            { value: 'evening', label: 'Evening (5-9 PM)' },
          ]}
        />
      </div>
    </div>
  ),
};