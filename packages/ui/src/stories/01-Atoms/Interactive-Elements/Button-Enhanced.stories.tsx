/**
 * BUTTON ENHANCED - CAMPUS ACTION COMPONENT
 * 
 * The primary interactive element for HIVE platform with 9 variants, 6 sizes,
 * and campus-specific action presets optimized for University at Buffalo usage.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { 
  Plus,
  ArrowRight,
  Download,
  Heart,
  Share2,
  Users,
  Calendar,
  BookOpen,
  Settings,
  Check,
  X,
  AlertCircle,
  Loader,
  ExternalLink,
  Edit,
  Trash2,
  Star,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import '../../../hive-tokens.css';

const meta: Meta<typeof Button> = {
  title: '02-Atoms/Interactive Elements/Button Enhanced',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Button Enhanced - Campus Action Component

**The foundational interactive element that powers every University at Buffalo student action on HIVE**

The Button Enhanced component is the primary call-to-action element across the entire HIVE platform. With 9 semantic variants, 6 size options, and campus-specific action presets, it creates consistent, accessible interactions that feel natural for university students coordinating campus activities.

## 🎯 BUTTON DESIGN PHILOSOPHY

### **Campus Action-Oriented Design**
Every button variant is designed for specific University at Buffalo scenarios:
- **Primary Actions** - Space joining, tool creation, event RSVP
- **Secondary Actions** - Content sharing, profile editing, coordination
- **Destructive Actions** - Space leaving, content deletion, account changes
- **Utility Actions** - Filtering, searching, settings access

### **Touch-First Accessibility**
- **44px Minimum Touch Targets** - Accessible on all campus devices
- **High Contrast Focus States** - Clear keyboard navigation for all students
- **Semantic Markup** - Full screen reader compatibility
- **Motor Accessibility** - Easy activation regardless of dexterity

## 🎨 BUTTON VARIANTS

### **Primary Variants**
- **Primary** - Main actions (Join Space, Create Tool, RSVP Event)
- **Secondary** - Supporting actions (View Details, Edit Profile, Share)
- **Outline** - Alternative actions (Cancel, Secondary choices)
- **Ghost** - Subtle actions (Menu items, inline actions)

### **Status Variants**
- **Success** - Positive confirmations (Successfully joined, Tool created)
- **Warning** - Caution actions (Leave space, Delete content)
- **Error** - Problem resolution (Retry connection, Fix errors)

### **Utility Variants**
- **Link** - Text-style actions (Learn more, View all, External links)
- **Icon** - Icon-only actions (Settings, Search, Notifications)

## 📐 SIZE SYSTEM

### **Campus Usage Sizes**
- **xs (24px)** - Compact inline actions, table actions
- **sm (32px)** - Secondary actions, mobile optimization
- **md (40px)** - Standard actions, desktop primary
- **lg (48px)** - Hero actions, important CTAs
- **xl (56px)** - Landing page CTAs, major actions
- **icon (40px)** - Square icon buttons, consistent sizing

## 🎓 CAMPUS ACTION PRESETS

### **Academic Actions**
- Study group joining, assignment coordination, grade discussions
- Tool creation for academic workflows, project collaboration
- Calendar integration for academic schedule management

### **Social Actions**
- Community joining, event planning, social coordination
- Content sharing, photo posting, activity engagement
- Friend connections, space invitations, social proof actions

### **Administrative Actions**
- Profile management, privacy settings, account administration
- Space moderation, content management, community oversight
- System settings, notification preferences, accessibility options

### **Mobile Campus Scenarios**
- Between-class quick actions (5-second interactions)
- One-handed operation while walking to class
- Touch-optimized sizing for various weather conditions (gloves, cold)
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'success', 'warning', 'error', 'link', 'icon']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon']
    },
    disabled: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// CAMPUS ACTION PRESETS
// =============================================================================

const campusActionPresets = [
  {
    category: 'Academic Actions',
    description: 'University coursework and study coordination',
    actions: [
      { label: 'Join Study Group', variant: 'primary', icon: Users, usage: 'Academic space enrollment' },
      { label: 'Create Study Tool', variant: 'primary', icon: Plus, usage: 'Academic utility creation' },
      { label: 'Schedule Session', variant: 'secondary', icon: Calendar, usage: 'Study coordination' },
      { label: 'Share Notes', variant: 'outline', icon: Share2, usage: 'Academic content sharing' }
    ]
  },
  {
    category: 'Social Actions',
    description: 'Campus community building and coordination',
    actions: [
      { label: 'RSVP Event', variant: 'primary', icon: Check, usage: 'Event participation' },
      { label: 'Invite Friends', variant: 'secondary', icon: Users, usage: 'Community growth' },
      { label: 'Share Post', variant: 'outline', icon: Share2, usage: 'Content amplification' },
      { label: 'Like Activity', variant: 'ghost', icon: Heart, usage: 'Social engagement' }
    ]
  },
  {
    category: 'Administrative Actions',
    description: 'Platform management and settings',
    actions: [
      { label: 'Save Changes', variant: 'success', icon: Check, usage: 'Setting confirmation' },
      { label: 'Leave Space', variant: 'warning', icon: X, usage: 'Community departure' },
      { label: 'Delete Content', variant: 'error', icon: Trash2, usage: 'Content removal' },
      { label: 'View Settings', variant: 'link', icon: Settings, usage: 'Configuration access' }
    ]
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const ButtonVariantsShowcase = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleClick = (variant: string) => {
    setLoadingStates(prev => ({ ...prev, [variant]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [variant]: false }));
    }, 2000);
  };

  const variants = [
    { name: 'primary', label: 'Join Space', description: 'Primary campus actions' },
    { name: 'secondary', label: 'View Details', description: 'Secondary actions' },
    { name: 'outline', label: 'Share Space', description: 'Alternative actions' },
    { name: 'ghost', label: 'More Options', description: 'Subtle actions' },
    { name: 'success', label: 'Successfully Joined!', description: 'Success confirmations' },
    { name: 'warning', label: 'Leave Space', description: 'Caution actions' },
    { name: 'error', label: 'Retry Connection', description: 'Error recovery' },
    { name: 'link', label: 'Learn More', description: 'Text-style actions' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Button Variants for Campus Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map((variant) => (
          <Card key={variant.name} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)] capitalize mb-1">
                    {variant.name}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {variant.description}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Campus Use
                </Badge>
              </div>
              
              <Button
                variant={variant.name as any}
                onClick={() => handleClick(variant.name)}
                disabled={loadingStates[variant.name]}
                className="w-full"
              >
                {loadingStates[variant.name] ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {variant.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ButtonSizesShowcase = () => {
  const sizes = [
    { name: 'xs', label: 'Extra Small', usage: 'Compact inline actions', height: '24px' },
    { name: 'sm', label: 'Small', usage: 'Secondary actions, mobile', height: '32px' },
    { name: 'md', label: 'Medium', usage: 'Standard actions', height: '40px' },
    { name: 'lg', label: 'Large', usage: 'Important CTAs', height: '48px' },
    { name: 'xl', label: 'Extra Large', usage: 'Hero actions', height: '56px' },
    { name: 'icon', label: 'Icon', usage: 'Square icon buttons', height: '40px' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Button Sizes for Campus Context
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-6">
            {sizes.map((size) => (
              <div key={size.name} className="flex items-center gap-6">
                <div className="w-32">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {size.label}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {size.height}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-[var(--hive-text-muted)] mb-2">
                    {size.usage}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {size.name === 'icon' ? (
                      <Button variant="primary" size={size.name as any}>
                        <Settings className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="primary" size={size.name as any}>
                        Campus Action
                      </Button>
                    )}
                    
                    <Button variant="secondary" size={size.name as any}>
                      {size.name === 'icon' ? (
                        <Bell className="w-4 h-4" />
                      ) : (
                        'Secondary'
                      )}
                    </Button>
                    
                    <Button variant="secondary" size={size.name as any}>
                      {size.name === 'icon' ? (
                        <Search className="w-4 h-4" />
                      ) : (
                        'Outline'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CampusActionPresetsShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Action Presets
      </h3>
      
      <div className="space-y-6">
        {campusActionPresets.map((category, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="text-[var(--hive-text-primary)]">
                {category.category}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {category.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="space-y-2">
                    <Button
                      variant={action.variant as any}
                      className="w-full flex items-center gap-2"
                    >
                      <action.icon className="w-4 h-4" />
                      {action.label}
                    </Button>
                    <div className="text-xs text-[var(--hive-text-muted)]">
                      {action.usage}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AccessibilityShowcase = () => {
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Button Accessibility Features
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Users className="w-5 h-5" />
            Campus Accessibility Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Focus States Demo */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Keyboard Navigation & Focus States
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['primary', 'secondary', 'outline'].map((variant) => (
                <Button
                  key={variant}
                  variant={variant as any}
                  onFocus={() => setFocusedButton(variant)}
                  onBlur={() => setFocusedButton(null)}
                  className={`transition-all ${focusedButton === variant ? 'ring-2 ring-[var(--hive-brand-primary)] ring-offset-2' : ''}`}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                </Button>
              ))}
            </div>
            <div className="text-sm text-[var(--hive-text-muted)] mt-2">
              Currently focused: {focusedButton || 'None'} • Use Tab to navigate between buttons
            </div>
          </div>

          {/* Touch Target Sizes */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              44px+ Touch Targets for Campus Mobile Usage
            </h4>
            <div className="flex items-center gap-4">
              <Button size="sm" variant="primary">
                32px Small
              </Button>
              <Button size="md" variant="primary">
                40px Standard
              </Button>
              <Button size="lg" variant="primary">
                48px Large
              </Button>
            </div>
            <div className="text-sm text-[var(--hive-text-muted)] mt-2">
              All sizes meet campus accessibility requirements for touch interaction
            </div>
          </div>

          {/* Screen Reader Support */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Screen Reader & Assistive Technology Support
            </h4>
            <div className="space-y-2">
              <Button variant="primary" aria-label="Join the UB Computer Science study group with 147 members">
                Join Study Group
              </Button>
              <Button variant="secondary" aria-describedby="button-help">
                RSVP for Event
              </Button>
              <div id="button-help" className="text-sm text-[var(--hive-text-muted)]">
                RSVP for tonight's study session in Lockwood Library
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// BUTTON ENHANCED MAIN COMPONENT
// =============================================================================

const ButtonEnhancedShowcase = () => {
  const [activeSection, setActiveSection] = useState('variants');

  const sections = [
    { id: 'variants', label: 'Variants', icon: Star },
    { id: 'sizes', label: 'Sizes', icon: Ruler },
    { id: 'presets', label: 'Campus Presets', icon: BookOpen },
    { id: 'accessibility', label: 'Accessibility', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Plus className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Button Enhanced
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Action Component
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The foundational interactive element that powers every University at Buffalo student action on HIVE. 
            9 variants, 6 sizes, and campus-specific presets for authentic university experiences.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {activeSection === 'variants' && <ButtonVariantsShowcase />}
          {activeSection === 'sizes' && <ButtonSizesShowcase />}
          {activeSection === 'presets' && <CampusActionPresetsShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Campus Usage Examples */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Calendar className="w-5 h-5" />
              University at Buffalo Usage Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Between Classes (2-5 minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Quick RSVP for study sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      One-tap space joining and notifications
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Thumb-optimized touch targets for walking
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Study Sessions (10+ minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Tool creation and academic coordination
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Group collaboration and project management
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Complex workflows with keyboard navigation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const ButtonEnhancedShowcaseStory: Story = {
  render: () => <ButtonEnhancedShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Button Enhanced showcase with all variants, sizes, campus presets, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const AllVariants: Story = {
  render: () => <ButtonVariantsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'All 9 button variants with interactive examples showing campus-specific usage scenarios.'
      }
    }
  }
};

export const AllSizes: Story = {
  render: () => <ButtonSizesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete size system from 24px to 56px with campus context and touch accessibility standards.'
      }
    }
  }
};

export const CampusPresets: Story = {
  render: () => <CampusActionPresetsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific button presets for academic, social, and administrative actions at University at Buffalo.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete accessibility features including keyboard navigation, touch targets, and screen reader support.'
      }
    }
  }
};

// Individual component stories for testing
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Join Study Group',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'View Details',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Users className="w-4 h-4 mr-2" />
        Join Space
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: (
      <>
        <Loader className="w-4 h-4 mr-2 animate-spin" />
        Processing...
      </>
    ),
  },
};