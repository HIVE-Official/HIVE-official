import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveMultiSelect, MultiSelectOption } from '../../components';
import { 
  Users, 
  BookOpen, 
  Code, 
  Palette, 
  Music, 
  Camera, 
  Gamepad2, 
  Coffee,
  GraduationCap,
  Building,
  Heart,
  Star,
  Award,
  Zap,
  Globe,
  Briefcase,
  Target,
  Lightbulb,
  Rocket,
  Shield
} from 'lucide-react';

const meta: Meta<typeof HiveMultiSelect> = {
  title: '04-HIVE/Multi-Select',
  component: HiveMultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced multi-select component with search, tagging, and creation capabilities. Perfect for campus space management, skill selection, and tool building.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'elevated', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    maxTags: {
      control: { type: 'number', min: 1, max: 10 },
    },
    tagLimit: {
      control: { type: 'number', min: 1, max: 20 },
    },
    creatable: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different contexts
const campusSpaces: MultiSelectOption[] = [
  { value: 'cs-lounge', label: 'CS Lounge', description: 'Computer Science student lounge', icon: <Code size={16} />, variant: 'elevated', group: 'Academic' },
  { value: 'engineering-lab', label: 'Engineering Lab', description: 'Hands-on engineering workspace', icon: <Zap size={16} />, variant: 'elevated', group: 'Academic' },
  { value: 'library-study', label: 'Library Study Room', description: 'Quiet study space', icon: <BookOpen size={16} />, variant: 'elevated', group: 'Academic' },
  { value: 'student-union', label: 'Student Union', description: 'Main campus gathering space', icon: <Users size={16} />, variant: 'default', group: 'Social' },
  { value: 'coffee-shop', label: 'Campus Coffee Shop', description: 'Casual meeting spot', icon: <Coffee size={16} />, variant: 'default', group: 'Social' },
  { value: 'gym', label: 'Recreation Center', description: 'Campus fitness facility', icon: <Target size={16} />, variant: 'default', group: 'Recreation' },
  { value: 'art-studio', label: 'Art Studio', description: 'Creative workspace', icon: <Palette size={16} />, variant: 'default', group: 'Creative' },
  { value: 'music-room', label: 'Music Practice Room', description: 'Soundproof practice space', icon: <Music size={16} />, variant: 'default', group: 'Creative' },
];

const studentSkills: MultiSelectOption[] = [
  { value: 'javascript', label: 'JavaScript', description: 'Frontend & backend programming', icon: <Code size={16} />, variant: 'default', group: 'Programming' },
  { value: 'python', label: 'Python', description: 'Data science & automation', icon: <Code size={16} />, variant: 'default', group: 'Programming' },
  { value: 'react', label: 'React', description: 'Frontend framework', icon: <Code size={16} />, variant: 'default', group: 'Programming' },
  { value: 'design', label: 'UI/UX Design', description: 'User interface design', icon: <Palette size={16} />, variant: 'default', group: 'Design' },
  { value: 'photography', label: 'Photography', description: 'Visual storytelling', icon: <Camera size={16} />, variant: 'default', group: 'Creative' },
  { value: 'leadership', label: 'Leadership', description: 'Team management & vision', icon: <Users size={16} />, variant: 'premium', group: 'Soft Skills' },
  { value: 'marketing', label: 'Digital Marketing', description: 'Brand & growth strategy', icon: <Globe size={16} />, variant: 'default', group: 'Business' },
  { value: 'project-management', label: 'Project Management', description: 'Planning & execution', icon: <Briefcase size={16} />, variant: 'default', group: 'Business' },
];

const academicMajors: MultiSelectOption[] = [
  { value: 'computer-science', label: 'Computer Science', description: 'Software development & algorithms', icon: <Code size={16} />, variant: 'elevated', group: 'STEM' },
  { value: 'business', label: 'Business Administration', description: 'Management & entrepreneurship', icon: <Briefcase size={16} />, variant: 'elevated', group: 'Business' },
  { value: 'psychology', label: 'Psychology', description: 'Human behavior & mental health', icon: <Heart size={16} />, variant: 'elevated', group: 'Social Sciences' },
  { value: 'engineering', label: 'Engineering', description: 'Problem solving & innovation', icon: <Zap size={16} />, variant: 'elevated', group: 'STEM' },
  { value: 'art', label: 'Fine Arts', description: 'Creative expression & design', icon: <Palette size={16} />, variant: 'elevated', group: 'Arts' },
  { value: 'education', label: 'Education', description: 'Teaching & learning', icon: <GraduationCap size={16} />, variant: 'elevated', group: 'Education' },
];

const projectTags: MultiSelectOption[] = [
  { value: 'web-dev', label: 'Web Development', icon: <Globe size={16} />, variant: 'default' },
  { value: 'mobile-app', label: 'Mobile App', icon: <Gamepad2 size={16} />, variant: 'default' },
  { value: 'ai-ml', label: 'AI/ML', icon: <Lightbulb size={16} />, variant: 'premium' },
  { value: 'blockchain', label: 'Blockchain', icon: <Shield size={16} />, variant: 'premium' },
  { value: 'startup', label: 'Startup Idea', icon: <Rocket size={16} />, variant: 'premium' },
  { value: 'research', label: 'Research Project', icon: <BookOpen size={16} />, variant: 'campus' },
];

// Basic Multi-Select
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    
    return (
      <div className="w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Select Your Skills</h3>
        <HiveMultiSelect
          options={studentSkills}
          value={value}
          onValueChange={setValue}
          placeholder="Choose your skills..."
          maxTags={3}
          tagLimit={5}
        />
        <div className="mt-4 text-sm text-gray-400">
          Selected: {value.join(', ') || 'None'}
        </div>
      </div>
    );
  },
};

// Campus Spaces Selection
export const CampusSpaces: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['cs-lounge', 'library-study']);
    
    return (
      <div className="w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Your Active Spaces</h3>
        <HiveMultiSelect
          variant="elevated"
          options={campusSpaces}
          value={value}
          onValueChange={setValue}
          placeholder="Select campus spaces..."
          searchPlaceholder="Search spaces..."
          maxTags={4}
          tagLimit={8}
          groupBy="group"
          showCount
        />
        <div className="mt-4 text-xs text-gray-500">
          Spaces help you connect with students in similar areas
        </div>
      </div>
    );
  },
};

// Academic Major Selection
export const AcademicMajors: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['computer-science']);
    
    return (
      <div className="w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Academic Interests</h3>
        <HiveMultiSelect
          variant="premium"
          size="lg"
          options={academicMajors}
          value={value}
          onValueChange={setValue}
          placeholder="Select your majors..."
          maxTags={2}
          tagLimit={3}
          groupBy="group"
          creatable={false}
          showCount
        />
        <div className="mt-4 text-xs text-gray-500">
          Primary and secondary areas of study
        </div>
      </div>
    );
  },
};

// Project Tags with Creation
export const ProjectTags: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['web-dev', 'ai-ml']);
    const [options, setOptions] = useState<MultiSelectOption[]>(projectTags);
    
    const handleCreateOption = (query: string): MultiSelectOption => {
      const newOption: MultiSelectOption = {
        value: query.toLowerCase().replace(/\s+/g, '-'),
        label: query,
        icon: <Star size={16} />,
        variant: 'default',
        metadata: { created: true, timestamp: Date.now() }
      };
      
      setOptions(prev => [...prev, newOption]);
      return newOption;
    };
    
    return (
      <div className="w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Project Categories</h3>
        <HiveMultiSelect
          variant="default"
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Tag your project..."
          searchPlaceholder="Search or create new tag..."
          maxTags={5}
          tagLimit={10}
          creatable
          onCreateOption={handleCreateOption}
          createOptionMessage="Add as new tag"
        />
        <div className="mt-4 text-xs text-gray-500">
          Create custom tags to organize your projects
        </div>
      </div>
    );
  },
};

// Large Display with All Features
export const ComprehensiveExample: Story = {
  render: () => {
    const [spaceValue, setSpaceValue] = useState<string[]>(['cs-lounge', 'student-union']);
    const [skillValue, setSkillValue] = useState<string[]>(['javascript', 'react', 'design']);
    const [majorValue, setMajorValue] = useState<string[]>(['computer-science']);
    
    return (
      <div className="max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">Student Builder Profile</h2>
          <p className="text-gray-400">Configure your campus presence and skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campus Spaces */}
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <Building className="inline w-4 h-4 mr-2" />
              Active Spaces
            </label>
            <HiveMultiSelect
              variant="elevated"
              options={campusSpaces}
              value={spaceValue}
              onValueChange={setSpaceValue}
              placeholder="Select your spaces..."
              maxTags={3}
              tagLimit={6}
              groupBy="group"
              showCount
            />
          </div>
          
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <Award className="inline w-4 h-4 mr-2" />
              Your Skills
            </label>
            <HiveMultiSelect
              variant="default"
              options={studentSkills}
              value={skillValue}
              onValueChange={setSkillValue}
              placeholder="Add your skills..."
              maxTags={4}
              tagLimit={8}
              groupBy="group"
              creatable
              showCount
            />
          </div>
          
          {/* Academic Focus */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              Academic Focus
            </label>
            <HiveMultiSelect
              variant="premium"
              size="lg"
              options={academicMajors}
              value={majorValue}
              onValueChange={setMajorValue}
              placeholder="Select your academic interests..."
              maxTags={2}
              tagLimit={3}
              groupBy="group"
              creatable={false}
              showCount
            />
          </div>
        </div>
        
        {/* Profile Summary */}
        <div className="bg-[var(--hive-background-primary)]/20 rounded-lg p-4 border border-white/10">
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">Profile Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-400 mb-1">Spaces ({spaceValue.length})</div>
              <div className="text-[var(--hive-text-primary)]">{spaceValue.join(', ') || 'None selected'}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Skills ({skillValue.length})</div>
              <div className="text-[var(--hive-text-primary)]">{skillValue.join(', ') || 'None selected'}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Majors ({majorValue.length})</div>
              <div className="text-[var(--hive-text-primary)]">{majorValue.join(', ') || 'None selected'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Size Variations
export const SizeVariations: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string[]>>({
      sm: ['javascript'],
      default: ['javascript', 'python'],
      lg: ['javascript', 'python', 'react'],
      xl: ['javascript', 'python', 'react', 'design']
    });
    
    return (
      <div className="w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Size Variations</h3>
        
        {(['sm', 'default', 'lg', 'xl'] as const).map(size => (
          <div key={size}>
            <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
              {size} Size
            </label>
            <HiveMultiSelect
              size={size}
              options={studentSkills.slice(0, 6)}
              value={values[size] || []}
              onValueChange={(value) => setValues(prev => ({ ...prev, [size]: value }))}
              placeholder={`Select skills (${size})...`}
              maxTags={3}
              tagLimit={5}
            />
          </div>
        ))}
      </div>
    );
  },
};

// Variant Showcase
export const VariantShowcase: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string[]>>({
      default: ['javascript'],
      premium: ['ai-ml'],
      elevated: ['cs-lounge'],
      minimal: ['student-union']
    });
    
    return (
      <div className="w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Variant Showcase</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Default</label>
          <HiveMultiSelect
            variant="default"
            options={studentSkills.slice(0, 4)}
            value={values.default || []}
            onValueChange={(value) => setValues(prev => ({ ...prev, default: value }))}
            placeholder="Standard selection..."
            maxTags={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Premium</label>
          <HiveMultiSelect
            variant="premium"
            options={projectTags.slice(0, 4)}
            value={values.premium || []}
            onValueChange={(value) => setValues(prev => ({ ...prev, premium: value }))}
            placeholder="Premium features..."
            maxTags={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Elevated</label>
          <HiveMultiSelect
            variant="elevated"
            options={campusSpaces.slice(0, 4)}
            value={values.elevated || []}
            onValueChange={(value) => setValues(prev => ({ ...prev, elevated: value }))}
            placeholder="Elevated styling..."
            maxTags={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Minimal</label>
          <HiveMultiSelect
            variant="minimal"
            options={campusSpaces.slice(0, 4)}
            value={values.minimal || []}
            onValueChange={(value) => setValues(prev => ({ ...prev, minimal: value }))}
            placeholder="Minimal styling..."
            maxTags={3}
          />
        </div>
      </div>
    );
  },
};

// States and Edge Cases
export const StatesAndEdgeCases: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState<string[]>(['javascript']);
    const [errorValue, setErrorValue] = useState<string[]>([]);
    const [loadingValue, setLoadingValue] = useState<string[]>([]);
    
    return (
      <div className="w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">States & Edge Cases</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Normal State</label>
          <HiveMultiSelect
            options={studentSkills}
            value={normalValue}
            onValueChange={setNormalValue}
            placeholder="Select skills..."
            maxTags={3}
            clearable
            showCount
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Error State</label>
          <HiveMultiSelect
            options={studentSkills}
            value={errorValue}
            onValueChange={setErrorValue}
            placeholder="Required field..."
            error
            maxTags={3}
          />
          <div className="text-red-400 text-xs mt-1">Please select at least one skill</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Loading State</label>
          <HiveMultiSelect
            options={[]}
            value={loadingValue}
            onValueChange={setLoadingValue}
            placeholder="Loading options..."
            loading
            maxTags={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Disabled State</label>
          <HiveMultiSelect
            options={studentSkills}
            value={['javascript', 'react']}
            placeholder="Cannot edit..."
            disabled
            maxTags={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tag Limit Reached</label>
          <HiveMultiSelect
            options={studentSkills}
            value={['javascript', 'python', 'react']}
            placeholder="Max tags reached..."
            maxTags={2}
            tagLimit={3}
            showCount
          />
          <div className="text-yellow-400 text-xs mt-1">Maximum 3 tags allowed</div>
        </div>
      </div>
    );
  },
};