import type { Meta, StoryObj } from '@storybook/react';
import { Tag, PrimaryTag, SuccessTag, WarningTag, ErrorTag, RemovableTag, InteractiveTag, OutlineTag, GhostTag, GradientTag } from '../../atomic/atoms/tag';
import { User, Star, Code, Calendar, MapPin, BookOpen, Users, Zap, Shield, Award, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Tag> = {
  title: '01-Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE tag component for labeling, categorizing, and organizing content with support for icons, removal, and interaction.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'ghost', 'gradient'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'gold', 'ruby', 'emerald', 'sapphire'],
      description: 'Color theme',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable click interaction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Computer Science',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Study Group',
    leftIcon: <Users className="w-4 h-4" />,
    color: 'primary',
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable Tag',
    removable: true,
    onRemove: () => alert('Tag removed!'),
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click me',
    interactive: true,
    onClick: () => alert('Tag clicked!'),
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Tag variant="default">Default</Tag>
      <Tag variant="filled">Filled</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="ghost">Ghost</Tag>
      <Tag variant="gradient">Gradient</Tag>
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-2">Filled Variant</h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default" variant="filled">Default</Tag>
          <Tag color="primary" variant="filled">Primary</Tag>
          <Tag color="success" variant="filled">Success</Tag>
          <Tag color="warning" variant="filled">Warning</Tag>
          <Tag color="error" variant="filled">Error</Tag>
          <Tag color="gold" variant="filled">Gold</Tag>
          <Tag color="ruby" variant="filled">Ruby</Tag>
          <Tag color="emerald" variant="filled">Emerald</Tag>
          <Tag color="sapphire" variant="filled">Sapphire</Tag>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-2">Outline Variant</h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default" variant="outline">Default</Tag>
          <Tag color="primary" variant="outline">Primary</Tag>
          <Tag color="success" variant="outline">Success</Tag>
          <Tag color="warning" variant="outline">Warning</Tag>
          <Tag color="error" variant="outline">Error</Tag>
          <Tag color="gold" variant="outline">Gold</Tag>
          <Tag color="ruby" variant="outline">Ruby</Tag>
          <Tag color="emerald" variant="outline">Emerald</Tag>
          <Tag color="sapphire" variant="outline">Sapphire</Tag>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-2">Ghost Variant</h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default" variant="ghost">Default</Tag>
          <Tag color="primary" variant="ghost">Primary</Tag>
          <Tag color="success" variant="ghost">Success</Tag>
          <Tag color="warning" variant="ghost">Warning</Tag>
          <Tag color="error" variant="ghost">Error</Tag>
          <Tag color="gold" variant="ghost">Gold</Tag>
          <Tag color="ruby" variant="ghost">Ruby</Tag>
          <Tag color="emerald" variant="ghost">Emerald</Tag>
          <Tag color="sapphire" variant="ghost">Sapphire</Tag>
        </div>
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Tag size="sm" color="primary">Small</Tag>
      <Tag size="md" color="primary">Medium</Tag>
      <Tag size="lg" color="primary">Large</Tag>
    </div>
  ),
};

// Campus tagging scenarios
export const CampusTaggingScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Tags</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-hive-background-primary font-bold text-lg">AR</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-hive-text-primary">Alex Rodriguez</h3>
              <p className="text-hive-text-secondary">Computer Science Junior</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-hive-text-secondary mb-2">Academic</h4>
              <div className="flex flex-wrap gap-2">
                <Tag color="sapphire" leftIcon={<BookOpen className="w-3 h-3" />} size="sm">CS Major</Tag>
                <Tag color="emerald" leftIcon={<Award className="w-3 h-3" />} size="sm">Dean's List</Tag>
                <Tag color="gold" leftIcon={<Star className="w-3 h-3" />} size="sm">3.8 GPA</Tag>
                <Tag variant="outline" color="primary" size="sm">Junior</Tag>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-hive-text-secondary mb-2">Skills & Interests</h4>
              <div className="flex flex-wrap gap-2">
                <Tag color="primary" leftIcon={<Code className="w-3 h-3" />} size="sm">JavaScript</Tag>
                <Tag color="primary" leftIcon={<Code className="w-3 h-3" />} size="sm">Python</Tag>
                <Tag color="primary" leftIcon={<Code className="w-3 h-3" />} size="sm">React</Tag>
                <Tag variant="ghost" color="warning" size="sm">Machine Learning</Tag>
                <Tag variant="ghost" color="success" size="sm">Web Development</Tag>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-hive-text-secondary mb-2">Community</h4>
              <div className="flex flex-wrap gap-2">
                <Tag color="gold" leftIcon={<Zap className="w-3 h-3" />} size="sm">Tool Builder</Tag>
                <Tag color="emerald" leftIcon={<Shield className="w-3 h-3" />} size="sm">Verified Student</Tag>
                <Tag variant="outline" color="ruby" leftIcon={<Users className="w-3 h-3" />} size="sm">Study Group Leader</Tag>
                <Tag variant="ghost" color="sapphire" size="sm">Mentor</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Discovery & Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-hive-emerald rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h4>
                <p className="text-sm text-hive-text-secondary">Calculate weighted GPA</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag color="success" size="sm">Academic</Tag>
              <Tag color="primary" size="sm">Calculator</Tag>
              <Tag variant="outline" color="gold" size="sm">Popular</Tag>
              <Tag variant="ghost" color="emerald" leftIcon={<Star className="w-3 h-3" />} size="sm">4.8★</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag variant="outline" size="sm" removable>JavaScript</Tag>
              <Tag variant="outline" size="sm" removable>React</Tag>
              <Tag variant="outline" size="sm" removable>Student Tools</Tag>
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-hive-sapphire rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Study Session Planner</h4>
                <p className="text-sm text-hive-text-secondary">Coordinate group study</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag color="sapphire" size="sm">Productivity</Tag>
              <Tag color="warning" size="sm">Scheduling</Tag>
              <Tag variant="outline" color="ruby" size="sm">New</Tag>
              <Tag variant="ghost" color="emerald" leftIcon={<Users className="w-3 h-3" />} size="sm">124 users</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag variant="outline" size="sm" removable>Calendar</Tag>
              <Tag variant="outline" size="sm" removable>Group Study</Tag>
              <Tag variant="outline" size="sm" removable>Coordination</Tag>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Spaces & Communities</h3>
        <div className="space-y-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-hive-text-primary">CS 101 Study Group</h4>
              <div className="flex space-x-2">
                <Tag size="sm" color="ruby" leftIcon={<MapPin className="w-3 h-3" />}>Library Room 201</Tag>
                <Tag size="sm" variant="outline" color="warning" leftIcon={<Clock className="w-3 h-3" />}>Today 3 PM</Tag>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag color="primary" size="sm">Computer Science</Tag>
              <Tag color="success" size="sm">Active</Tag>
              <Tag variant="ghost" color="emerald" leftIcon={<Users className="w-3 h-3" />} size="sm">15 members</Tag>
              <Tag variant="outline" color="gold" size="sm">Public</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag variant="ghost" size="sm" interactive>Algorithms</Tag>
              <Tag variant="ghost" size="sm" interactive>Data Structures</Tag>
              <Tag variant="ghost" size="sm" interactive>Final Exam Prep</Tag>
              <Tag variant="ghost" size="sm" interactive>Homework Help</Tag>
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-hive-text-primary">Floor 3B Community</h4>
              <div className="flex space-x-2">
                <Tag size="sm" color="emerald">Residence Hall</Tag>
                <Tag size="sm" variant="outline" color="sapphire" leftIcon={<Heart className="w-3 h-3" />}>42 residents</Tag>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag color="warning" size="sm" interactive>Events</Tag>
              <Tag color="sapphire" size="sm" interactive>Floor Activities</Tag>
              <Tag color="emerald" size="sm" interactive>Community</Tag>
              <Tag variant="ghost" color="ruby" size="sm" interactive>Pizza Night</Tag>
              <Tag variant="ghost" color="gold" size="sm" interactive>Game Night</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive tag management
export const InteractiveTagManagement: Story = {
  render: () => {
    const [skills, setSkills] = useState([
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript'
    ]);
    
    const [interests, setInterests] = useState([
      'Web Development', 'Machine Learning', 'Data Science', 'UI/UX Design'
    ]);

    const removeSkill = (skillToRemove: string) => {
      setSkills(prev => prev.filter(skill => skill !== skillToRemove));
    };

    const removeInterest = (interestToRemove: string) => {
      setInterests(prev => prev.filter(interest => interest !== interestToRemove));
    };

    const addSkill = () => {
      const newSkills = ['Java', 'C++', 'Swift', 'Kotlin', 'Go', 'Rust'];
      const availableSkills = newSkills.filter(skill => !skills.includes(skill));
      if (availableSkills.length > 0) {
        const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        setSkills(prev => [...prev, randomSkill]);
      } else {
        alert('No more skills to add!');
      }
    };

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Skills Editor</h3>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-hive-text-primary">Programming Skills</h4>
              <button 
                onClick={addSkill}
                className="px-3 py-1 text-sm bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Tag
                  key={skill}
                  color="primary"
                  size="sm"
                  removable
                  onRemove={() => removeSkill(skill)}
                  leftIcon={<Code className="w-3 h-3" />}
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-medium text-hive-text-primary mb-3">Academic Interests</h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Tag
                  key={interest}
                  color="success"
                  size="sm"
                  removable
                  onRemove={() => removeInterest(interest)}
                  leftIcon={<BookOpen className="w-3 h-3" />}
                >
                  {interest}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Course Filter Tags</h3>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Department</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="outline" interactive color="primary" size="sm">Computer Science</Tag>
                  <Tag variant="ghost" interactive color="primary" size="sm">Mathematics</Tag>
                  <Tag variant="ghost" interactive color="primary" size="sm">Engineering</Tag>
                  <Tag variant="ghost" interactive color="primary" size="sm">Physics</Tag>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Level</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="outline" interactive color="success" size="sm">100 Level</Tag>
                  <Tag variant="ghost" interactive color="success" size="sm">200 Level</Tag>
                  <Tag variant="ghost" interactive color="success" size="sm">300 Level</Tag>
                  <Tag variant="ghost" interactive color="success" size="sm">400 Level</Tag>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Schedule</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="ghost" interactive color="warning" size="sm">Morning</Tag>
                  <Tag variant="outline" interactive color="warning" size="sm">Afternoon</Tag>
                  <Tag variant="ghost" interactive color="warning" size="sm">Evening</Tag>
                  <Tag variant="ghost" interactive color="warning" size="sm">Online</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Status and notification tags
export const StatusAndNotificationTags: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">System Status Tags</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-medium text-hive-text-primary mb-3">Tool Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">GPA Calculator</span>
                <Tag color="success" size="sm" leftIcon={<Shield className="w-3 h-3" />}>Online</Tag>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">Study Planner</span>
                <Tag color="warning" size="sm" leftIcon={<Clock className="w-3 h-3" />}>Maintenance</Tag>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">Grade Tracker</span>
                <Tag color="error" size="sm">Offline</Tag>
              </div>
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-medium text-hive-text-primary mb-3">Notification Tags</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">Assignment Due</span>
                <Tag color="ruby" size="sm" leftIcon={<Clock className="w-3 h-3" />}>Urgent</Tag>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">Study Session</span>
                <Tag color="sapphire" size="sm">Reminder</Tag>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-secondary">New Message</span>
                <Tag color="gold" size="sm" leftIcon={<User className="w-3 h-3" />}>Unread</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Achievement & Progress Tags</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Academic</h5>
              <div className="flex flex-wrap gap-2">
                <Tag color="gold" variant="gradient" size="sm" leftIcon={<Award className="w-3 h-3" />}>Dean's List</Tag>
                <Tag color="emerald" size="sm" leftIcon={<Star className="w-3 h-3" />}>Honor Roll</Tag>
                <Tag variant="outline" color="sapphire" size="sm">Scholarship</Tag>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Community</h5>
              <div className="flex flex-wrap gap-2">
                <Tag color="ruby" variant="gradient" size="sm" leftIcon={<Heart className="w-3 h-3" />}>Top Contributor</Tag>
                <Tag color="gold" size="sm" leftIcon={<Zap className="w-3 h-3" />}>Tool Builder</Tag>
                <Tag variant="outline" color="emerald" size="sm">Mentor</Tag>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-hive-text-secondary mb-2">Progress</h5>
              <div className="flex flex-wrap gap-2">
                <Tag variant="ghost" color="warning" size="sm">In Progress</Tag>
                <Tag color="success" size="sm">Completed</Tag>
                <Tag variant="outline" color="primary" size="sm">Milestone</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Color Presets</h3>
        <div className="flex flex-wrap gap-3">
          <PrimaryTag>Primary Tag</PrimaryTag>
          <SuccessTag>Success Tag</SuccessTag>
          <WarningTag>Warning Tag</WarningTag>
          <ErrorTag>Error Tag</ErrorTag>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Behavior Presets</h3>
        <div className="flex flex-wrap gap-3">
          <RemovableTag onRemove={() => alert('Removed!')}>Removable Tag</RemovableTag>
          <InteractiveTag onClick={() => alert('Clicked!')}>Interactive Tag</InteractiveTag>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Style Presets</h3>
        <div className="flex flex-wrap gap-3">
          <OutlineTag color="primary">Outline Tag</OutlineTag>
          <GhostTag color="success">Ghost Tag</GhostTag>
          <GradientTag color="gold">Gradient Tag</GradientTag>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    children: 'Interactive Tag - Use controls to customize →',
    color: 'primary',
    size: 'md',
    variant: 'filled',
    interactive: false,
    removable: false,
  },
};