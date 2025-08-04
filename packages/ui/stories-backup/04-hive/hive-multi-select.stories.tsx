import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveMultiSelect } from '../../components/hive-multi-select';

const meta: Meta<typeof HiveMultiSelect> = {
  title: '04-Hive/Multi-Select System',
  component: HiveMultiSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE Multi-Select System - Campus Selection Interface**

Advanced multi-selection components built with HIVE's foundation systems for accessibility, mobile optimization, and semantic design tokens.

## When to Use
- Course selection and academic planning
- Study group member management
- Tool tag and category selection
- Campus space and building navigation
- Event scheduling and availability selection

## Foundation Features
- **Mobile-First Design**: Touch-optimized selection with comfortable tap targets
- **Accessibility Built-In**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support
- **HIVE Motion System**: Smooth selection animations with liquid metal transitions
- **Semantic Design Tokens**: Consistent with HIVE brand system and campus themes

## Selection Types
- **Dropdown**: Space-efficient selection for large option sets
- **Chip**: Visual selection display with easy removal
- **Card**: Rich selection interface with descriptions and metadata
- **Tree**: Hierarchical selection for complex campus structures

## Campus Context
All multi-select components are optimized for university workflows, academic structures, and student/faculty interaction patterns.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dropdown', 'chips', 'cards'],
      description: 'Multi-select interface variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Component size for different contexts'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for empty state'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search filtering of options'
    },
    clearable: {
      control: 'boolean',
      description: 'Allow clearing all selections'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component'
    },
    maxSelections: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of allowed selections'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Campus-specific sample data
const courseOptions = [
  { id: 'cs101', label: 'CS 101: Intro to Programming', value: 'cs101', credits: 3, prereqs: [] },
  { id: 'cs201', label: 'CS 201: Data Structures', value: 'cs201', credits: 4, prereqs: ['cs101'] },
  { id: 'cs301', label: 'CS 301: Algorithms', value: 'cs301', credits: 4, prereqs: ['cs201'] },
  { id: 'math141', label: 'MATH 141: Calculus I', value: 'math141', credits: 4, prereqs: [] },
  { id: 'math241', label: 'MATH 241: Calculus II', value: 'math241', credits: 4, prereqs: ['math141'] },
  { id: 'phys151', label: 'PHYS 151: Physics I', value: 'phys151', credits: 4, prereqs: ['math141'] }
];

const studyGroupMembers = [
  { id: '1', label: 'Alex Chen', value: 'alex', major: 'Computer Science', year: 'Junior', avatar: '/avatars/alex.jpg' },
  { id: '2', label: 'Maya Patel', value: 'maya', major: 'Computer Science', year: 'Senior', avatar: '/avatars/maya.jpg' },
  { id: '3', label: 'Jordan Smith', value: 'jordan', major: 'Mathematics', year: 'Sophomore', avatar: '/avatars/jordan.jpg' },
  { id: '4', label: 'Sam Kim', value: 'sam', major: 'Computer Science', year: 'Junior', avatar: '/avatars/sam.jpg' },
  { id: '5', label: 'Riley Johnson', value: 'riley', major: 'Physics', year: 'Senior', avatar: '/avatars/riley.jpg' }
];

const toolTags = [
  { id: 'productivity', label: 'Productivity', value: 'productivity', count: 45 },
  { id: 'study', label: 'Study Tools', value: 'study', count: 32 },
  { id: 'collaboration', label: 'Collaboration', value: 'collaboration', count: 28 },
  { id: 'academic', label: 'Academic', value: 'academic', count: 41 },
  { id: 'organization', label: 'Organization', value: 'organization', count: 23 },
  { id: 'communication', label: 'Communication', value: 'communication', count: 19 },
  { id: 'scheduling', label: 'Scheduling', value: 'scheduling', count: 15 },
  { id: 'research', label: 'Research', value: 'research', count: 12 }
];

const campusBuildings = [
  { id: 'library', label: 'Main Library', value: 'library', type: 'Academic', capacity: 500 },
  { id: 'engineering', label: 'Engineering Building', value: 'engineering', type: 'Academic', capacity: 300 },
  { id: 'student-center', label: 'Student Center', value: 'student-center', type: 'Social', capacity: 800 },
  { id: 'science-hall', label: 'Science Hall', value: 'science-hall', type: 'Academic', capacity: 250 },
  { id: 'business-school', label: 'Business School', value: 'business-school', type: 'Academic', capacity: 400 }
];

export const Default: Story = {
  args: {
    options: toolTags,
    placeholder: 'Select tool categories...',
    variant: 'default',
    size: 'default'
  }
};

export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    
    return (
      <div className="space-y-4">
        <HiveMultiSelect
          {...args}
          options={courseOptions}
          value={selected}
          onChange={setSelected}
          placeholder="Select courses for next semester..."
        />
        <div className="text-sm text-[var(--hive-text-secondary)]">
          Selected: {selected.length} courses
        </div>
      </div>
    );
  },
  args: {
    variant: 'dropdown',
    size: 'default',
    searchable: true,
    clearable: true
  }
};

export const CourseSelection: Story = {
  render: () => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>(['cs101']);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Spring 2024 Course Registration
          </label>
          <HiveMultiSelect
            options={courseOptions}
            value={selectedCourses}
            onChange={setSelectedCourses}
            placeholder="Search and select courses..."
            variant="cards"
            size="default"
            searchable
            clearable
            maxSelections={6}
            renderOption={(option) => (
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {option.label}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    {option.credits} credits
                    {option.prereqs.length > 0 && ` • Prereqs: ${option.prereqs.join(', ')}`}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Registration Summary
          </div>
          <div className="text-sm text-[var(--hive-text-secondary)]">
            Total Credits: {selectedCourses.reduce((total, courseId) => {
              const course = courseOptions.find(c => c.id === courseId);
              return total + (course?.credits || 0);
            }, 0)}
          </div>
          <div className="text-sm text-[var(--hive-text-secondary)]">
            Courses Selected: {selectedCourses.length} of 6
          </div>
        </div>
      </div>
    );
  }
};

export const StudyGroupManager: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<string[]>(['alex', 'maya']);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            CS 301 Study Group Members
          </label>
          <HiveMultiSelect
            options={studyGroupMembers}
            value={selectedMembers}
            onChange={setSelectedMembers}
            placeholder="Add members to study group..."
            variant="chips"
            size="default"
            searchable
            maxSelections={8}
            renderChip={(member) => (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center text-xs text-[var(--hive-brand-primary)]">
                  {member.label.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{member.label}</span>
              </div>
            )}
            renderOption={(member) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center text-sm text-[var(--hive-brand-primary)]">
                  {member.label.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {member.label}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    {member.major} • {member.year}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <div className="text-sm text-[var(--hive-text-secondary)]">
          Study group size: {selectedMembers.length} members
        </div>
      </div>
    );
  }
};

export const ToolTagging: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['productivity', 'study']);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Tool Categories
          </label>
          <HiveMultiSelect
            options={toolTags}
            value={selectedTags}
            onChange={setSelectedTags}
            placeholder="Select relevant categories..."
            variant="chips"
            size="default"
            searchable
            clearable
            renderChip={(tag) => (
              <div className="flex items-center gap-2">
                <span>{tag.label}</span>
                <span className="text-xs text-[var(--hive-text-secondary)]">
                  ({tag.count})
                </span>
              </div>
            )}
          />
        </div>
        <div className="text-sm text-[var(--hive-text-secondary)]">
          This will help students find your tool in the marketplace
        </div>
      </div>
    );
  }
};

export const CampusLocationSelector: Story = {
  render: () => {
    const [selectedBuildings, setSelectedBuildings] = useState<string[]>(['library']);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Event Locations
          </label>
          <HiveMultiSelect
            options={campusBuildings}
            value={selectedBuildings}
            onChange={setSelectedBuildings}
            placeholder="Select campus buildings..."
            variant="cards"
            size="default"
            searchable
            renderOption={(building) => (
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {building.label}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    {building.type} • Capacity: {building.capacity}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <div className="text-sm text-[var(--hive-text-secondary)]">
          Selected venues: {selectedBuildings.length}
        </div>
      </div>
    );
  }
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(['cs101', 'math141']);
    
    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="text-base font-medium text-[var(--hive-text-primary)] mb-4">
            Mobile Course Selection
          </h3>
          <HiveMultiSelect
            options={courseOptions}
            value={selected}
            onChange={setSelected}
            placeholder="Tap to select courses..."
            variant="chips"
            size="lg"
            searchable
            clearable
          />
        </div>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 rounded-lg text-[var(--hive-brand-primary)] text-sm">
              Add to Schedule
            </button>
            <button className="p-3 bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] text-sm">
              Check Prereqs
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export const LoadingState: Story = {
  args: {
    options: [],
    placeholder: 'Loading options...',
    loading: true,
    variant: 'default',
    size: 'default'
  }
};

export const ErrorState: Story = {
  args: {
    options: [],
    placeholder: 'Unable to load options',
    error: 'Failed to connect to campus directory',
    variant: 'default',
    size: 'default'
  }
};

export const DisabledState: Story = {
  args: {
    options: courseOptions,
    placeholder: 'Registration closed',
    disabled: true,
    variant: 'default',
    size: 'default'
  }
};

export const MaxSelectionLimit: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['productivity', 'study', 'academic']);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Tool Categories (Max 3)
          </label>
          <HiveMultiSelect
            options={toolTags}
            value={selected}
            onChange={setSelected}
            placeholder="Select up to 3 categories..."
            variant="chips"
            size="default"
            maxSelections={3}
            searchable
          />
        </div>
        <div className="text-sm text-[var(--hive-text-secondary)]">
          {selected.length} of 3 categories selected
          {selected.length >= 3 && ' (limit reached)'}
        </div>
      </div>
    );
  }
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['cs101']);
    
    return (
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="accessible-multiselect"
            className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2"
          >
            Accessible Course Selection
          </label>
          <HiveMultiSelect
            id="accessible-multiselect"
            options={courseOptions}
            value={selected}
            onChange={setSelected}
            placeholder="Use arrow keys and Enter to select..."
            variant="dropdown"
            size="default"
            searchable
            clearable
            aria-label="Select courses for registration"
            aria-describedby="selection-help"
          />
          <div id="selection-help" className="text-xs text-[var(--hive-text-secondary)] mt-1">
            Use keyboard navigation: Tab to focus, Arrow keys to navigate, Enter to select, Escape to close
          </div>
        </div>
        <div className="text-sm text-[var(--hive-text-secondary)]">
          Screen reader will announce selections and provide full keyboard navigation
        </div>
      </div>
    );
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
          Multi-Select Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Dropdown Variant
            </h4>
            <HiveMultiSelect
              options={courseOptions.slice(0, 4)}
              placeholder="Select courses..."
              variant="dropdown"
              size="default"
              searchable
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Chips Variant
            </h4>
            <HiveMultiSelect
              options={toolTags.slice(0, 4)}
              placeholder="Select tags..."
              variant="chips"
              size="default"
              defaultValue={['productivity', 'study']}
            />
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Cards Variant
            </h4>
            <HiveMultiSelect
              options={studyGroupMembers.slice(0, 3)}
              placeholder="Select members..."
              variant="cards"
              size="default"
              defaultValue={['alex']}
              renderOption={(member) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center text-sm text-[var(--hive-brand-primary)]">
                    {member.label.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--hive-text-primary)]">
                      {member.label}
                    </div>
                    <div className="text-xs text-[var(--hive-text-secondary)]">
                      {member.major}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
};