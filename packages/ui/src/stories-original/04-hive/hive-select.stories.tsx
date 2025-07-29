import type { Meta, StoryObj } from '@storybook/react';
import { HiveSelect, HiveSelectTags, SelectOption } from '../../components/hive-select';
import { 
  Search, 
  Code, 
  BookOpen, 
  GraduationCap, 
  Building, 
  Users, 
  Coffee, 
  Clock,
  Zap,
  Camera,
  Music,
  Palette,
  Trophy,
  Star,
  Crown,
  Shield,
  Heart,
  Globe,
  Briefcase,
  Target,
  Lightbulb,
  Wrench
} from 'lucide-react';
import React, { useState } from 'react';

const meta: Meta<typeof HiveSelect> = {
  title: '04-HIVE/Select',
  component: HiveSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Select system with magnetic dropdowns, search functionality, and liquid metal motion. Advanced select component optimized for campus-specific selections and tool building workflows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'minimal'],
      description: 'Visual variant of the select component'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the select component'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter functionality'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple option selection'
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected'
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options from search'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component'
    },
    error: {
      control: 'boolean',
      description: 'Show error state styling'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data sets
const campusSpaces: SelectOption[] = [
  { 
    value: 'cs-lounge', 
    label: 'CS Student Lounge', 
    description: 'Computer Science student collaborative space',
    icon: <Code size={16} />,
    group: 'Academic Buildings'
  },
  { 
    value: 'engineering-lab', 
    label: 'Engineering Lab', 
    description: 'Hands-on engineering workshop space',
    icon: <Wrench size={16} />,
    group: 'Academic Buildings'
  },
  { 
    value: 'library-study', 
    label: 'Library Study Rooms', 
    description: 'Quiet individual and group study spaces',
    icon: <BookOpen size={16} />,
    group: 'Academic Buildings'
  },
  { 
    value: 'student-union', 
    label: 'Student Union Building', 
    description: 'Main campus social and dining hub',
    icon: <Users size={16} />,
    group: 'Social Spaces'
  },
  { 
    value: 'campus-coffee', 
    label: 'Campus Coffee Shop', 
    description: 'Casual study and meeting spot',
    icon: <Coffee size={16} />,
    group: 'Social Spaces'
  },
  { 
    value: 'rec-center', 
    label: 'Recreation Center', 
    description: 'Fitness and wellness facilities',
    icon: <Target size={16} />,
    group: 'Recreation'
  },
  { 
    value: 'art-studios', 
    label: 'Art Studios', 
    description: 'Creative workspace for visual arts',
    icon: <Palette size={16} />,
    group: 'Creative Spaces'
  },
  { 
    value: 'music-rooms', 
    label: 'Music Practice Rooms', 
    description: 'Soundproof individual practice spaces',
    icon: <Music size={16} />,
    group: 'Creative Spaces'
  }
];

const academicMajors: SelectOption[] = [
  { 
    value: 'computer-science', 
    label: 'Computer Science', 
    description: 'Software development, algorithms, and systems',
    icon: <Code size={16} />,
    group: 'Engineering & Technology'
  },
  { 
    value: 'electrical-engineering', 
    label: 'Electrical Engineering', 
    description: 'Electronics, circuits, and power systems',
    icon: <Zap size={16} />,
    group: 'Engineering & Technology'
  },
  { 
    value: 'mechanical-engineering', 
    label: 'Mechanical Engineering', 
    description: 'Design and manufacturing of mechanical systems',
    icon: <Wrench size={16} />,
    group: 'Engineering & Technology'
  },
  { 
    value: 'business-admin', 
    label: 'Business Administration', 
    description: 'Management, strategy, and entrepreneurship',
    icon: <Briefcase size={16} />,
    group: 'Business & Economics'
  },
  { 
    value: 'finance', 
    label: 'Finance', 
    description: 'Investment, banking, and financial analysis',
    icon: <Trophy size={16} />,
    group: 'Business & Economics'
  },
  { 
    value: 'psychology', 
    label: 'Psychology', 
    description: 'Human behavior and mental processes',
    icon: <Heart size={16} />,
    group: 'Social Sciences'
  },
  { 
    value: 'international-relations', 
    label: 'International Relations', 
    description: 'Global politics and diplomacy',
    icon: <Globe size={16} />,
    group: 'Social Sciences'
  },
  { 
    value: 'biology', 
    label: 'Biology', 
    description: 'Life sciences and biological research',
    icon: <Star size={16} />,
    group: 'Natural Sciences'
  },
  { 
    value: 'chemistry', 
    label: 'Chemistry', 
    description: 'Chemical processes and molecular science',
    icon: <Lightbulb size={16} />,
    group: 'Natural Sciences'
  }
];

const toolElements: SelectOption[] = [
  { 
    value: 'timer', 
    label: 'Timer Element', 
    description: 'Countdown and time tracking functionality',
    icon: <Clock size={16} />
  },
  { 
    value: 'calculator', 
    label: 'Calculator Element', 
    description: 'Mathematical computation component',
    icon: <Trophy size={16} />
  },
  { 
    value: 'note-editor', 
    label: 'Note Editor', 
    description: 'Rich text editing and note-taking',
    icon: <BookOpen size={16} />
  },
  { 
    value: 'chart-display', 
    label: 'Chart Display', 
    description: 'Data visualization and graphs',
    icon: <Target size={16} />
  },
  { 
    value: 'form-builder', 
    label: 'Form Builder', 
    description: 'Input collection and validation',
    icon: <Building size={16} />
  },
  { 
    value: 'media-player', 
    label: 'Media Player', 
    description: 'Video and audio playback controls',
    icon: <Camera size={16} />
  }
];

const yearLevels: SelectOption[] = [
  { value: 'freshman', label: 'Freshman', description: 'First-year undergraduate student', icon: <GraduationCap size={16} /> },
  { value: 'sophomore', label: 'Sophomore', description: 'Second-year undergraduate student', icon: <GraduationCap size={16} /> },
  { value: 'junior', label: 'Junior', description: 'Third-year undergraduate student', icon: <GraduationCap size={16} /> },
  { value: 'senior', label: 'Senior', description: 'Fourth-year undergraduate student', icon: <Crown size={16} /> },
  { value: 'graduate', label: 'Graduate Student', description: 'Master\'s or PhD student', icon: <Star size={16} /> },
  { value: 'postdoc', label: 'Postdoctoral', description: 'Postdoctoral researcher', icon: <Shield size={16} /> }
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
    options: campusSpaces.slice(0, 4)
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Default Variant</h4>
        <HiveSelect
          placeholder="Select a campus space..."
          options={campusSpaces.slice(0, 4)}
          variant="default"
        />
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Premium Variant</h4>
        <HiveSelect
          placeholder="Select your major..."
          options={academicMajors.slice(0, 4)}
          variant="premium"
        />
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Minimal Variant</h4>
        <HiveSelect
          placeholder="Quick selection..."
          options={yearLevels.slice(0, 4)}
          variant="minimal"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants for various UI contexts and importance levels'
      }
    }
  }
};

export const SelectSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Small Size</h4>
        <HiveSelect
          placeholder="Small select..."
          options={yearLevels.slice(0, 3)}
          size="sm"
        />
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Default Size</h4>
        <HiveSelect
          placeholder="Default select..."
          options={yearLevels.slice(0, 3)}
          size="default"
        />
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Large Size</h4>
        <HiveSelect
          placeholder="Large select..."
          options={yearLevels.slice(0, 3)}
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants for different UI contexts and layouts'
      }
    }
  }
};

export const SearchableSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-[var(--hive-text-primary)] mb-4">Searchable Major Selection</h4>
        <HiveSelect
          placeholder="Search for your major..."
          searchPlaceholder="Type to search majors..."
          options={academicMajors}
          value={value}
          onValueChange={(val) => setValue(val as string)}
          searchable={true}
          variant="premium"
          emptySearchMessage="No majors found matching your search"
        />
        {value && (
          <div className="mt-4 text-sm text-[var(--hive-text-primary)]/70">
            Selected: {academicMajors.find(m => m.value === value)?.label}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Searchable select with real-time filtering for large option sets'
      }
    }
  }
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['cs-lounge', 'library-study']);
    
    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-[var(--hive-text-primary)] mb-4">Your Active Spaces</h4>
        <HiveSelect
          placeholder="Select campus spaces..."
          options={campusSpaces}
          value={value}
          onValueChange={(val) => setValue(val as string[])}
          multiple={true}
          searchable={true}
          clearable={true}
          variant="premium"
        />
        
        <div className="mt-4">
          <h5 className="text-sm text-[var(--hive-text-primary)]/70 mb-2">Selected Spaces:</h5>
          <HiveSelectTags
            options={campusSpaces}
            value={value}
            onRemove={(removedValue) => 
              setValue(prev => prev.filter(v => v !== removedValue))
            }
            maxDisplay={3}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection with tag display and individual item removal'
      }
    }
  }
};

export const GroupedOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-[var(--hive-text-primary)] mb-4">Academic Major Selection</h4>
        <HiveSelect
          placeholder="Choose your field of study..."
          options={academicMajors}
          value={value}
          onValueChange={(val) => setValue(val as string)}
          searchable={true}
          variant="premium"
        />
        {value && (
          <div className="mt-4 p-3 bg-[var(--hive-background-primary)]/20 rounded-xl">
            <div className="text-sm text-[var(--hive-text-primary)]/70">Selected Major:</div>
            <div className="text-[var(--hive-text-primary)] font-medium">
              {academicMajors.find(m => m.value === value)?.label}
            </div>
            <div className="text-xs text-[var(--hive-text-primary)]/50 mt-1">
              {academicMajors.find(m => m.value === value)?.description}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Grouped options with category headers for better organization'
      }
    }
  }
};

export const CreatableSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [options, setOptions] = useState<SelectOption[]>(toolElements);
    
    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-[var(--hive-text-primary)] mb-4">Tool Elements</h4>
        <HiveSelect
          placeholder="Select or create elements..."
          options={options}
          value={value}
          onValueChange={(val) => setValue(val as string[])}
          multiple={true}
          searchable={true}
          creatable={true}
          clearable={true}
          variant="premium"
          searchPlaceholder="Search or type to create..."
        />
        
        <div className="mt-4 text-xs text-[var(--hive-text-primary)]/50">
          Type a new element name and press Enter to create it
        </div>
        
        {value.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm text-[var(--hive-text-primary)]/70 mb-2">Selected Elements:</h5>
            <HiveSelectTags
              options={options}
              value={value}
              onRemove={(removedValue) => 
                setValue(prev => prev.filter(v => v !== removedValue))
              }
            />
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Creatable select allowing users to add custom options on the fly'
      }
    }
  }
};

export const LoadingAndStates: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Loading State</h4>
        <HiveSelect
          placeholder="Loading options..."
          options={[]}
          loading={true}
        />
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Error State</h4>
        <HiveSelect
          placeholder="Select required field..."
          options={yearLevels.slice(0, 3)}
          error={true}
        />
        <div className="text-red-400 text-xs mt-1">This field is required</div>
      </div>
      
      <div>
        <h4 className="text-[var(--hive-text-primary)] mb-2">Disabled State</h4>
        <HiveSelect
          placeholder="Not available"
          options={yearLevels.slice(0, 3)}
          disabled={true}
          value="senior"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various component states including loading, error, and disabled'
      }
    }
  }
};

export const AdvancedFeatures: Story = {
  render: () => {
    const [campusValue, setCampusValue] = useState<string[]>(['cs-lounge']);
    const [majorValue, setMajorValue] = useState<string>('computer-science');
    const [elementValue, setElementValue] = useState<string[]>(['timer', 'calculator']);
    
    return (
      <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">Student Profile Builder</h3>
          <p className="text-[var(--hive-text-secondary)]">Configure your campus presence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <Building className="inline w-4 h-4 mr-2" />
              Active Campus Spaces
            </label>
            <HiveSelect
              placeholder="Select your spaces..."
              options={campusSpaces}
              value={campusValue}
              onValueChange={(val) => setCampusValue(val as string[])}
              multiple={true}
              searchable={true}
              clearable={true}
              variant="premium"
              maxHeight="50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              Primary Major
            </label>
            <HiveSelect
              placeholder="Choose your major..."
              options={academicMajors}
              value={majorValue}
              onValueChange={(val) => setMajorValue(val as string)}
              searchable={true}
              variant="premium"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
              <Code className="inline w-4 h-4 mr-2" />
              Tool Elements (Multi-select with Creation)
            </label>
            <HiveSelect
              placeholder="Select or create elements..."
              options={toolElements}
              value={elementValue}
              onValueChange={(val) => setElementValue(val as string[])}
              multiple={true}
              searchable={true}
              creatable={true}
              clearable={true}
              variant="premium"
              searchPlaceholder="Search or create new elements..."
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-[var(--hive-border-subtle)]">
          <h4 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Profile Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-[var(--hive-text-primary)]/60 mb-1">Campus Spaces ({campusValue.length})</div>
              <HiveSelectTags
                options={campusSpaces}
                value={campusValue}
                onRemove={(val) => setCampusValue(prev => prev.filter(v => v !== val))}
                maxDisplay={2}
              />
            </div>
            <div>
              <div className="text-sm text-[var(--hive-text-primary)]/60 mb-1">Major</div>
              <div className="text-[var(--hive-text-primary)]">
                {academicMajors.find(m => m.value === majorValue)?.label || 'Not selected'}
              </div>
            </div>
            <div>
              <div className="text-sm text-[var(--hive-text-primary)]/60 mb-1">Tool Elements ({elementValue.length})</div>
              <HiveSelectTags
                options={toolElements}
                value={elementValue}
                onRemove={(val) => setElementValue(prev => prev.filter(v => v !== val))}
                maxDisplay={2}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive example showcasing all advanced features in a realistic campus profile form'
      }
    }
  }
};

export const CustomRendering: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    const customRenderOption = (option: SelectOption) => (
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex items-center space-x-3">
          {option.icon && (
            <div className="text-yellow-400">
              {option.icon}
            </div>
          )}
          <div>
            <div className="font-medium text-[var(--hive-text-primary)]">{option.label}</div>
            {option.description && (
              <div className="text-xs text-[var(--hive-text-primary)]/50">{option.description}</div>
            )}
          </div>
        </div>
        <div className="text-xs text-[var(--hive-text-primary)]/30 px-2 py-1 bg-[var(--hive-text-primary)]/5 rounded">
          {option.group}
        </div>
      </div>
    );
    
    const customRenderValue = (value: string | string[], options: SelectOption[]) => {
      if (typeof value === 'string' && value) {
        const option = options.find(opt => opt.value === value);
        if (option) {
          return (
            <div className="flex items-center space-x-2">
              {option.icon}
              <span>{option.label}</span>
            </div>
          );
        }
      }
      return 'Select a major...';
    };
    
    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-[var(--hive-text-primary)] mb-4">Custom Rendering</h4>
        <HiveSelect
          placeholder="Select your major..."
          options={academicMajors}
          value={value}
          onValueChange={(val) => setValue(val as string)}
          searchable={true}
          variant="premium"
          renderOption={customRenderOption}
          renderValue={customRenderValue}
        />
        
        <div className="mt-4 text-xs text-[var(--hive-text-primary)]/50">
          This example shows custom option and value rendering
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom rendering functions for both options and selected values'
      }
    }
  }
};