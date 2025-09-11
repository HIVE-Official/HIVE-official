import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Tag, 
  PrimaryTag, 
  SuccessTag, 
  WarningTag, 
  ErrorTag, 
  RemovableTag, 
  InteractiveTag, 
  OutlineTag, 
  GhostTag, 
  GradientTag 
} from './tag';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Hash, User, Calendar, MapPin, Book, GraduationCap, Star, Bookmark, Clock } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof Tag> = {
  title: '01-Atoms/Tag - COMPLETE DEFINITION',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Tag - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated tag system for University at Buffalo campus categorization and labeling.

### 🏆 **COMPONENT EXCELLENCE**
- **9 Color Variants** - Default, primary (gold), success, warning, error, gold, ruby, emerald, sapphire
- **5 Visual Variants** - Default (filled), outline, ghost, gradient
- **3 Size Options** - Small, medium, large with perfect mobile touch targets
- **Advanced Features** - Removable tags, interactive tags, icons, accessibility
- **Perfect Semantic Tokens** - 100% semantic token usage with sophisticated color-mix gradients
- **Gold Brand Tags** - Primary variant uses UB gold for campus branding
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Ready** - Optimized for UB categorization and content labeling

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo content categorization and labeling:
- **Course Tags** - Subject areas, difficulty levels, credit hours, prerequisites
- **Space Categories** - Study groups, social events, academic clubs, residence halls
- **Student Interests** - Hobbies, skills, academic focus areas, career goals
- **Event Classification** - Workshop types, social events, academic seminars
- **Content Organization** - Resource tags, documentation categories, tool types

### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch requirements
- **Thumb Interaction** - Optimized for mobile tag selection and removal
- **Visual Clarity** - Clear tag identification and state indication
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'ghost', 'gradient'],
      description: 'Tag visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'gold', 'ruby', 'emerald', 'sapphire'],
      description: 'Tag color variant',
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
      description: 'Interactive/clickable tag',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// Default tag showcase
export const Default: Story = {
  args: {
    children: 'Computer Science',
    variant: 'default',
    size: 'md',
    color: 'primary',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Color Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ COLORS</Badge>
            Tag Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            9 semantic color variants using 100% semantic tokens with sophisticated color-mix styling
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Tag color="default">Default - Campus General</Tag>
              <Tag color="primary">Primary - UB Gold Brand</Tag>
              <Tag color="success">Success - Completed</Tag>
              <Tag color="warning">Warning - Attention</Tag>
              <Tag color="error">Error - Critical</Tag>
            </div>
            <div className="flex flex-wrap gap-3">
              <Tag color="gold">Gold - Premium</Tag>
              <Tag color="ruby">Ruby - Important</Tag>
              <Tag color="emerald">Emerald - Natural</Tag>
              <Tag color="sapphire">Sapphire - Information</Tag>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Tag Variants - Visual Style Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 visual variants for different campus interface contexts and design needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Color Variants:</h4>
              <div className="flex flex-wrap gap-3">
                <Tag variant="primary" color="primary">Default (Filled)</Tag>
                <Tag variant="filled" color="primary">Explicit Filled</Tag>
                <Tag variant="secondary" color="primary">Outline Style</Tag>
                <Tag variant="ghost" color="primary">Ghost Style</Tag>
                <Tag variant="gradient" color="primary">Gradient Style</Tag>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Success Color Variants:</h4>
              <div className="flex flex-wrap gap-3">
                <Tag variant="filled" color="success">Success Filled</Tag>
                <Tag variant="secondary" color="success">Success Outline</Tag>
                <Tag variant="ghost" color="success">Success Ghost</Tag>
                <Tag variant="gradient" color="success">Success Gradient</Tag>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Warning Color Variants:</h4>
              <div className="flex flex-wrap gap-3">
                <Tag variant="filled" color="warning">Warning Filled</Tag>
                <Tag variant="secondary" color="warning">Warning Outline</Tag>
                <Tag variant="ghost" color="warning">Warning Ghost</Tag>
                <Tag variant="gradient" color="warning">Warning Gradient</Tag>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES</Badge>
            Tag Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes optimized for different campus interface contexts and mobile touch targets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Tag size="sm" color="primary">Small Tag</Tag>
              <Tag size="md" color="primary">Medium Tag</Tag>
              <Tag size="lg" color="primary">Large Tag</Tag>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Usage Examples:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Small - Inline Content:</p>
                  <div className="flex flex-wrap gap-2">
                    <Tag size="sm" color="success">CS</Tag>
                    <Tag size="sm" color="info">Math</Tag>
                    <Tag size="sm" color="warning">Physics</Tag>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Medium - Standard UI:</p>
                  <div className="flex flex-wrap gap-2">
                    <Tag size="md" color="primary">Computer Science</Tag>
                    <Tag size="md" color="success">Mathematics</Tag>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Large - Featured Content:</p>
                  <div className="flex flex-wrap gap-2">
                    <Tag size="lg" color="gold">Featured Course</Tag>
                    <Tag size="lg" color="emerald">Top Rated</Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ FEATURES</Badge>
            Advanced Features - Icons, Removable, Interactive
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced tag features for enhanced campus content organization and user interaction
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Tags with Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Tags with Icons:</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Left Icons:</p>
                  <div className="flex flex-wrap gap-3">
                    <Tag color="primary" leftIcon={<Hash className="w-4 h-4" />}>Course CSE331</Tag>
                    <Tag color="success" leftIcon={<User className="w-4 h-4" />}>Study Group</Tag>
                    <Tag color="warning" leftIcon={<Calendar className="w-4 h-4" />}>Due Tomorrow</Tag>
                    <Tag color="info" leftIcon={<MapPin className="w-4 h-4" />}>Davis Hall</Tag>
                    <Tag color="emerald" leftIcon={<Book className="w-4 h-4" />}>Textbook Required</Tag>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Right Icons:</p>
                  <div className="flex flex-wrap gap-3">
                    <Tag color="gold" rightIcon={<Star className="w-4 h-4" />}>Premium Content</Tag>
                    <Tag color="sapphire" rightIcon={<GraduationCap className="w-4 h-4" />}>Academic Resource</Tag>
                    <Tag color="primary" rightIcon={<Bookmark className="w-4 h-4" />}>Saved for Later</Tag>
                    <Tag color="warning" rightIcon={<Clock className="w-4 h-4" />}>Time Sensitive</Tag>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Both Icons:</p>
                  <div className="flex flex-wrap gap-3">
                    <Tag 
                      color="primary" 
                      leftIcon={<Hash className="w-4 h-4" />}
                      rightIcon={<Star className="w-4 h-4" />}
                    >
                      Featured Course
                    </Tag>
                    <Tag 
                      color="success" 
                      leftIcon={<User className="w-4 h-4" />}
                      rightIcon={<Bookmark className="w-4 h-4" />}
                    >
                      Saved Group
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* Removable Tags */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Removable Tags:</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Filter Tags (Click X to remove):</p>
                  <div className="flex flex-wrap gap-3">
                    <RemovableTag color="primary" onRemove={() => console.log('Removed Computer Science')}>
                      Computer Science
                    </RemovableTag>
                    <RemovableTag color="success" onRemove={() => console.log('Removed Mathematics')}>
                      Mathematics
                    </RemovableTag>
                    <RemovableTag color="warning" onRemove={() => console.log('Removed Physics')}>
                      Physics
                    </RemovableTag>
                    <RemovableTag color="info" onRemove={() => console.log('Removed Engineering')}>
                      Engineering
                    </RemovableTag>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Selected Interests (with icons):</p>
                  <div className="flex flex-wrap gap-3">
                    <RemovableTag 
                      color="emerald" 
                      leftIcon={<Book className="w-4 h-4" />}
                      onRemove={() => console.log('Removed Research')}
                    >
                      Research
                    </RemovableTag>
                    <RemovableTag 
                      color="sapphire" 
                      leftIcon={<GraduationCap className="w-4 h-4" />}
                      onRemove={() => console.log('Removed Teaching')}
                    >
                      Teaching
                    </RemovableTag>
                    <RemovableTag 
                      color="gold" 
                      leftIcon={<Star className="w-4 h-4" />}
                      onRemove={() => console.log('Removed Leadership')}
                    >
                      Leadership
                    </RemovableTag>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Tags */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Tags:</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Clickable Tags (hover and click):</p>
                  <div className="flex flex-wrap gap-3">
                    <InteractiveTag 
                      color="primary" 
                      onClick={() => console.log('Clicked Computer Science')}
                    >
                      Computer Science
                    </InteractiveTag>
                    <InteractiveTag 
                      color="success" 
                      leftIcon={<User className="w-4 h-4" />}
                      onClick={() => console.log('Clicked Study Groups')}
                    >
                      Study Groups
                    </InteractiveTag>
                    <InteractiveTag 
                      color="warning" 
                      leftIcon={<Calendar className="w-4 h-4" />}
                      onClick={() => console.log('Clicked Events')}
                    >
                      Events
                    </InteractiveTag>
                    <InteractiveTag 
                      color="info" 
                      leftIcon={<MapPin className="w-4 h-4" />}
                      onClick={() => console.log('Clicked Campus Locations')}
                    >
                      Campus Locations
                    </InteractiveTag>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[var(--hive-text-secondary)]">Interactive + Removable:</p>
                  <div className="flex flex-wrap gap-3">
                    <Tag 
                      color="emerald" 
                      interactive
                      removable
                      leftIcon={<Book className="w-4 h-4" />}
                      onClick={() => console.log('Clicked Academic Resources')}
                      onRemove={() => console.log('Removed Academic Resources')}
                    >
                      Academic Resources
                    </Tag>
                    <Tag 
                      color="sapphire" 
                      interactive
                      removable
                      leftIcon={<GraduationCap className="w-4 h-4" />}
                      onClick={() => console.log('Clicked Course Materials')}
                      onRemove={() => console.log('Removed Course Materials')}
                    >
                      Course Materials
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Disabled State:</h4>
              <div className="flex flex-wrap gap-3">
                <Tag color="primary" disabled>Disabled Tag</Tag>
                <Tag color="success" disabled removable>Disabled Removable</Tag>
                <Tag color="warning" disabled interactive>Disabled Interactive</Tag>
                <Tag color="error" disabled leftIcon={<Hash className="w-4 h-4" />}>Disabled with Icon</Tag>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Tag Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built tag components for common campus categorization scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Color Presets:</h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <PrimaryTag>Primary Tag</PrimaryTag>
                    <SuccessTag>Success Tag</SuccessTag>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <WarningTag>Warning Tag</WarningTag>
                    <ErrorTag>Error Tag</ErrorTag>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Style Presets:</h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <OutlineTag color="primary">Outline Tag</OutlineTag>
                    <GhostTag color="success">Ghost Tag</GhostTag>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <GradientTag color="gold">Gradient Tag</GradientTag>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Tag Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Tag usage in actual University at Buffalo academic and campus contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course and Academic Tags */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course and Academic Classification:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Course Subject Areas:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="primary" leftIcon={<Hash className="w-4 h-4" />}>CSE - Computer Science</Tag>
                  <Tag color="emerald" leftIcon={<Hash className="w-4 h-4" />}>MTH - Mathematics</Tag>
                  <Tag color="sapphire" leftIcon={<Hash className="w-4 h-4" />}>PHY - Physics</Tag>
                  <Tag color="warning" leftIcon={<Hash className="w-4 h-4" />}>CHE - Chemistry</Tag>
                  <Tag color="success" leftIcon={<Hash className="w-4 h-4" />}>BIO - Biology</Tag>
                  <Tag color="ruby" leftIcon={<Hash className="w-4 h-4" />}>ENG - English</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Course Difficulty Levels:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="ghost" color="success" size="sm">Introductory</Tag>
                  <Tag variant="secondary" color="primary" size="sm">Intermediate</Tag>
                  <Tag variant="filled" color="warning" size="sm">Advanced</Tag>
                  <Tag variant="gradient" color="error" size="sm">Graduate Level</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Credit Hours and Requirements:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="info" size="sm">3 Credits</Tag>
                  <Tag color="info" size="sm">4 Credits</Tag>
                  <Tag color="warning" size="sm">Prerequisites Required</Tag>
                  <Tag color="success" size="sm">No Prerequisites</Tag>
                  <Tag color="gold" size="sm">Core Requirement</Tag>
                  <Tag color="emerald" size="sm">Elective</Tag>
                </div>
              </div>
              
            </div>
          </div>

          {/* Student Spaces and Communities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Spaces and Community Tags:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Study Group Categories:</h5>
                <div className="flex flex-wrap gap-2">
                  <InteractiveTag 
                    color="primary" 
                    leftIcon={<User className="w-4 h-4" />}
                    onClick={() => console.log('Joined Exam Prep')}
                  >
                    Exam Prep
                  </InteractiveTag>
                  <InteractiveTag 
                    color="success" 
                    leftIcon={<Book className="w-4 h-4" />}
                    onClick={() => console.log('Joined Homework Help')}
                  >
                    Homework Help
                  </InteractiveTag>
                  <InteractiveTag 
                    color="emerald" 
                    leftIcon={<GraduationCap className="w-4 h-4" />}
                    onClick={() => console.log('Joined Project Collaboration')}
                  >
                    Project Collaboration
                  </InteractiveTag>
                  <InteractiveTag 
                    color="sapphire" 
                    leftIcon={<Calendar className="w-4 h-4" />}
                    onClick={() => console.log('Joined Regular Study Sessions')}
                  >
                    Regular Study Sessions
                  </InteractiveTag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Residence Hall Communities:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="gold" variant="gradient">Ellicott Complex</Tag>
                  <Tag color="primary" variant="gradient">Governors Complex</Tag>
                  <Tag color="emerald" variant="gradient">Hadley Village</Tag>
                  <Tag color="sapphire" variant="gradient">Creekside Village</Tag>
                  <Tag color="warning" variant="gradient">Flint Loop</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Activity Types:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag 
                    color="primary" 
                    interactive
                    leftIcon={<Star className="w-4 h-4" />}
                    onClick={() => console.log('Joined Social Events')}
                  >
                    Social Events
                  </Tag>
                  <Tag 
                    color="success" 
                    interactive
                    leftIcon={<GraduationCap className="w-4 h-4" />}
                    onClick={() => console.log('Joined Academic Workshops')}
                  >
                    Academic Workshops
                  </Tag>
                  <Tag 
                    color="warning" 
                    interactive
                    leftIcon={<MapPin className="w-4 h-4" />}
                    onClick={() => console.log('Joined Campus Tours')}
                  >
                    Campus Tours
                  </Tag>
                  <Tag 
                    color="emerald" 
                    interactive
                    leftIcon={<Calendar className="w-4 h-4" />}
                    onClick={() => console.log('Joined Regular Meetups')}
                  >
                    Regular Meetups
                  </Tag>
                </div>
              </div>
              
            </div>
          </div>

          {/* Student Profile and Interests */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile and Interest Tags:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Interests (Removable):</h5>
                <div className="flex flex-wrap gap-2">
                  <RemovableTag 
                    color="primary" 
                    onRemove={() => console.log('Removed Artificial Intelligence')}
                  >
                    Artificial Intelligence
                  </RemovableTag>
                  <RemovableTag 
                    color="emerald" 
                    onRemove={() => console.log('Removed Data Science')}
                  >
                    Data Science
                  </RemovableTag>
                  <RemovableTag 
                    color="sapphire" 
                    onRemove={() => console.log('Removed Cybersecurity')}
                  >
                    Cybersecurity
                  </RemovableTag>
                  <RemovableTag 
                    color="warning" 
                    onRemove={() => console.log('Removed Software Engineering')}
                  >
                    Software Engineering
                  </RemovableTag>
                  <RemovableTag 
                    color="success" 
                    onRemove={() => console.log('Removed Machine Learning')}
                  >
                    Machine Learning
                  </RemovableTag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Skills and Proficiencies:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="gold" variant="ghost" size="sm">Python</Tag>
                  <Tag color="emerald" variant="ghost" size="sm">Java</Tag>
                  <Tag color="sapphire" variant="ghost" size="sm">JavaScript</Tag>
                  <Tag color="primary" variant="ghost" size="sm">React</Tag>
                  <Tag color="warning" variant="ghost" size="sm">Node.js</Tag>
                  <Tag color="success" variant="ghost" size="sm">SQL</Tag>
                  <Tag color="ruby" variant="ghost" size="sm">Git</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Career Goals and Aspirations:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag 
                    color="gold" 
                    variant="secondary"
                    leftIcon={<Star className="w-4 h-4" />}
                  >
                    Tech Industry
                  </Tag>
                  <Tag 
                    color="emerald" 
                    variant="secondary"
                    leftIcon={<Book className="w-4 h-4" />}
                  >
                    Graduate School
                  </Tag>
                  <Tag 
                    color="sapphire" 
                    variant="secondary"
                    leftIcon={<GraduationCap className="w-4 h-4" />}
                  >
                    Research
                  </Tag>
                  <Tag 
                    color="primary" 
                    variant="secondary"
                    leftIcon={<User className="w-4 h-4" />}
                  >
                    Entrepreneurship
                  </Tag>
                </div>
              </div>
              
            </div>
          </div>

          {/* Event and Resource Classification */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Event and Resource Classification:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Event Types and Categories:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="gold" leftIcon={<Calendar className="w-4 h-4" />}>Career Fair</Tag>
                  <Tag color="primary" leftIcon={<GraduationCap className="w-4 h-4" />}>Academic Seminar</Tag>
                  <Tag color="emerald" leftIcon={<User className="w-4 h-4" />}>Networking Event</Tag>
                  <Tag color="sapphire" leftIcon={<Book className="w-4 h-4" />}>Workshop</Tag>
                  <Tag color="warning" leftIcon={<Star className="w-4 h-4" />}>Guest Speaker</Tag>
                  <Tag color="success" leftIcon={<MapPin className="w-4 h-4" />}>Campus Tour</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Resource Types:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="primary" variant="secondary" size="sm">Lecture Notes</Tag>
                  <Tag color="success" variant="secondary" size="sm">Past Exams</Tag>
                  <Tag color="emerald" variant="secondary" size="sm">Study Guides</Tag>
                  <Tag color="sapphire" variant="secondary" size="sm">Lab Materials</Tag>
                  <Tag color="warning" variant="secondary" size="sm">Project Examples</Tag>
                  <Tag color="gold" variant="secondary" size="sm">Extra Credit</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Status and Priority Tags:</h5>
                <div className="flex flex-wrap gap-2">
                  <Tag color="error" leftIcon={<Clock className="w-4 h-4" />}>Due Today</Tag>
                  <Tag color="warning" leftIcon={<Clock className="w-4 h-4" />}>Due This Week</Tag>
                  <Tag color="success" leftIcon={<Star className="w-4 h-4" />}>Completed</Tag>
                  <Tag color="primary" leftIcon={<Bookmark className="w-4 h-4" />}>Saved</Tag>
                  <Tag color="gold" leftIcon={<Star className="w-4 h-4" />}>High Priority</Tag>
                  <Tag color="sapphire" leftIcon={<Calendar className="w-4 h-4" />}>Scheduled</Tag>
                </div>
              </div>
              
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: 'University at Buffalo',
    variant: 'default',
    size: 'md',
    color: 'primary',
    removable: false,
    disabled: false,
    interactive: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Tag Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different tag configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Tag {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};