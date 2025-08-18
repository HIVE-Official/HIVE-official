/**
 * CHECKBOX ENHANCED - CAMPUS SELECTION COMPONENT
 * 
 * The primary selection input element for HIVE platform with multi-state support,
 * accessibility features, and campus-specific selection patterns for University at Buffalo.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { 
  Check,
  Minus,
  Square,
  CheckSquare,
  Calendar,
  Users,
  GraduationCap,
  Building,
  Clock,
  MapPin,
  Bell,
  Shield,
  Heart,
  BookOpen,
  Settings,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
  Keyboard,
  MousePointer,
  AlertCircle
} from 'lucide-react';
import '../../../hive-tokens.css';

const meta: Meta<typeof Checkbox> = {
  title: '02-Atoms/Interactive Elements/Checkbox Enhanced',
  component: Checkbox,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Checkbox Enhanced - Campus Selection Component

**The foundational selection element that powers every University at Buffalo student choice on HIVE**

The Checkbox Enhanced component provides consistent, accessible, and intelligent selection patterns across the entire HIVE platform. With multi-state support, campus-specific selection scenarios, and real-time feedback, it creates seamless choice experiences that respect student preferences and provide clear visual confirmation.

## 🎯 CHECKBOX DESIGN PHILOSOPHY

### **Campus-First Selection Patterns**
Every checkbox pattern is designed for University at Buffalo student scenarios:
- **Academic Preferences** - Course selections, study group options, notification preferences
- **Social Coordination** - Event attendance, community participation, activity preferences
- **Privacy Controls** - Information sharing, visibility settings, communication preferences
- **Campus Services** - Accessibility options, notification settings, integration preferences

### **Multi-State Selection Intelligence**
- **Clear State Indication** - Checked, unchecked, and indeterminate states
- **Campus Context** - Smart grouping for related campus selections
- **Accessibility First** - Full screen reader support with semantic labeling
- **Mobile Optimization** - Touch-friendly with appropriate sizing and spacing

## 🎨 CHECKBOX VARIANTS & STATES

### **Selection States**
- **Unchecked** - Default state, ready for user selection
- **Checked** - Selected state with clear visual confirmation
- **Indeterminate** - Partial selection for grouped options
- **Disabled** - Unavailable options with clear visual indication

### **Campus-Specific Patterns**
- **Course Selection** - Academic course and study group preferences
- **Event Participation** - RSVP options and attendance confirmation
- **Privacy Settings** - Granular control over information sharing
- **Notification Preferences** - Academic, social, and administrative alerts
- **Accessibility Options** - Campus accommodation and assistance preferences

## 📏 SIZE SYSTEM

### **Campus Usage Sizes**
- **sm (16px)** - Compact forms, mobile optimization, inline selections
- **md (20px)** - Standard forms, desktop primary, balanced usability
- **lg (24px)** - Important selections, accessibility enhancement, large forms

## 🎓 SELECTION PATTERNS

### **Academic Selection Groups**
- Course enrollment preferences and waitlist options
- Study group availability and commitment levels
- Academic calendar event participation
- Grade sharing and academic privacy settings

### **Social Coordination Groups**
- Event attendance with dietary/accessibility needs
- Community participation levels and involvement preferences
- Social media integration and sharing permissions
- Friend connection and visibility settings

### **Campus Services Groups**
- Notification preferences by category (academic, social, administrative)
- Accessibility services and accommodation requests
- Campus technology integration permissions
- Emergency contact and communication preferences

## ♿ ACCESSIBILITY FEATURES

### **Screen Reader Support**
- **Semantic Labels** - Clear, descriptive labeling for all checkboxes
- **State Announcements** - Live region updates for selection changes
- **Group Descriptions** - Contextual assistance for checkbox groups
- **Fieldset Integration** - Proper grouping with legend descriptions

### **Keyboard Navigation**
- **Complete Keyboard Access** - All functionality available via keyboard
- **Logical Tab Order** - Intuitive progression through checkbox groups
- **Spacebar Activation** - Standard checkbox interaction pattern
- **Focus Management** - Clear visual focus indicators throughout

### **Motor Accessibility**
- **44px+ Touch Targets** - Accessible touch areas for mobile campus usage
- **Clear Selection Feedback** - Immediate visual confirmation of choices
- **Error Prevention** - Helpful guidance for required selections
- **One-Handed Support** - Full functionality with single-hand operation

## 📱 MOBILE CAMPUS OPTIMIZATION

### **Between-Class Usage**
- **Quick Selection Patterns** - Fast checkbox interaction for time-constrained scenarios
- **Clear Visual Feedback** - Immediate confirmation of selection state
- **Touch Optimization** - Appropriate sizing for thumb-friendly interaction
- **State Preservation** - Maintained selections across navigation

### **Study Session Usage**
- **Group Selection Support** - Bulk selection and management features
- **Progress Indication** - Clear completion status for multi-step forms
- **Draft Saving** - Automatic saving for complex selection forms
- **Collaborative Selection** - Group coordination and preference sharing

## 🔧 TECHNICAL IMPLEMENTATION

### **Selection Enhancement Features**
- **Multi-State Support** - Checked, unchecked, indeterminate handling
- **Controlled Components** - Full React state management integration
- **Validation Integration** - Real-time validation for required selections
- **Group Management** - Parent-child checkbox relationships

### **Performance Optimization**
- **Efficient Rendering** - Minimal re-renders for large checkbox lists
- **Memory Management** - Optimized state handling for complex forms
- **Accessibility Integration** - Full compatibility with assistive technologies
- **Touch Response** - Immediate feedback for mobile interactions

### **Campus Integration**
- **Academic Calendar** - Integration with semester schedules and deadlines
- **Privacy Compliance** - FERPA-aware selection options and descriptions
- **Campus Services** - Integration with UB accessibility and support services
- **Mobile Optimization** - Campus WiFi and connectivity considerations

## 🎓 CAMPUS CHECKBOX SCENARIOS

### **Academic Workflow Selections**
- Course enrollment preferences with waitlist and notification options
- Study group participation with availability and commitment levels
- Academic privacy settings with granular information sharing control
- Calendar integration with event types and notification preferences

### **Social Coordination Selections**
- Event RSVP with dietary restrictions and accessibility needs
- Community participation with involvement level preferences
- Social media integration with platform-specific permissions
- Friend visibility settings with academic and social context separation

### **Administrative Selections**
- Notification preferences with category-specific controls
- Privacy settings with academic and social information separation
- Accessibility options with campus service integration
- Emergency contact preferences with communication method options

### **Mobile Campus Patterns**
- Quick preference updates optimized for between-class usage
- One-handed checkbox interaction for walking between classes
- Offline selection support with sync when connectivity returns
- Touch-optimized spacing for various campus usage scenarios
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
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// CAMPUS CHECKBOX PATTERNS
// =============================================================================

const campusCheckboxPatterns = [
  {
    category: 'Academic Preferences',
    description: 'Course and study coordination selections',
    groups: [
      {
        title: 'Course Notifications',
        icon: GraduationCap,
        options: [
          { id: 'grade-updates', label: 'Grade Updates', description: 'Notify when grades are posted' },
          { id: 'assignment-reminders', label: 'Assignment Reminders', description: '24-hour deadline reminders' },
          { id: 'course-announcements', label: 'Course Announcements', description: 'Professor announcements and updates' },
          { id: 'study-group-invites', label: 'Study Group Invites', description: 'Invitations to course study groups' }
        ]
      },
      {
        title: 'Study Preferences',
        icon: BookOpen,
        options: [
          { id: 'public-study-sessions', label: 'Public Study Sessions', description: 'Join open study groups' },
          { id: 'peer-tutoring', label: 'Peer Tutoring', description: 'Available for peer tutoring' },
          { id: 'group-projects', label: 'Group Projects', description: 'Open to group project collaboration' },
          { id: 'study-reminders', label: 'Study Reminders', description: 'Personal study schedule reminders' }
        ]
      }
    ]
  },
  {
    category: 'Social Coordination',
    description: 'Community and event participation',
    groups: [
      {
        title: 'Event Participation',
        icon: Calendar,
        options: [
          { id: 'social-events', label: 'Social Events', description: 'Floor and residence hall events' },
          { id: 'academic-events', label: 'Academic Events', description: 'Study sessions and academic gatherings' },
          { id: 'campus-events', label: 'Campus Events', description: 'University-wide events and activities' },
          { id: 'club-events', label: 'Club Events', description: 'Student organization events' }
        ]
      },
      {
        title: 'Community Features',
        icon: Users,
        options: [
          { id: 'friend-requests', label: 'Friend Requests', description: 'Receive friend connection requests' },
          { id: 'space-invites', label: 'Space Invites', description: 'Invitations to join campus spaces' },
          { id: 'activity-sharing', label: 'Activity Sharing', description: 'Share activity with friends' },
          { id: 'location-sharing', label: 'Location Sharing', description: 'Share general campus location' }
        ]
      }
    ]
  },
  {
    category: 'Privacy & Security',
    description: 'Information sharing and privacy controls',
    groups: [
      {
        title: 'Profile Visibility',
        icon: Eye,
        options: [
          { id: 'public-profile', label: 'Public Profile', description: 'Visible to all UB students' },
          { id: 'academic-info', label: 'Academic Information', description: 'Share major and academic year' },
          { id: 'contact-info', label: 'Contact Information', description: 'Share email and social media' },
          { id: 'activity-status', label: 'Activity Status', description: 'Show online/offline status' }
        ]
      },
      {
        title: 'Data Sharing',
        icon: Shield,
        options: [
          { id: 'analytics-participation', label: 'Analytics Participation', description: 'Help improve HIVE with usage data' },
          { id: 'research-participation', label: 'Research Participation', description: 'Participate in UB research studies' },
          { id: 'feedback-surveys', label: 'Feedback Surveys', description: 'Receive platform improvement surveys' },
          { id: 'beta-features', label: 'Beta Features', description: 'Access new features before general release' }
        ]
      }
    ]
  },
  {
    category: 'Accessibility & Support',
    description: 'Campus accommodation and assistance',
    groups: [
      {
        title: 'Accessibility Options',
        icon: Settings,
        options: [
          { id: 'reduced-motion', label: 'Reduced Motion', description: 'Minimize animations and transitions' },
          { id: 'high-contrast', label: 'High Contrast', description: 'Enhanced visual contrast' },
          { id: 'screen-reader', label: 'Screen Reader Optimization', description: 'Enhanced screen reader support' },
          { id: 'keyboard-navigation', label: 'Keyboard Navigation', description: 'Optimize for keyboard-only usage' }
        ]
      },
      {
        title: 'Support Services',
        icon: Heart,
        options: [
          { id: 'disability-services', label: 'Disability Services Integration', description: 'Connect with campus disability services' },
          { id: 'academic-support', label: 'Academic Support', description: 'Access to tutoring and academic resources' },
          { id: 'mental-health', label: 'Mental Health Resources', description: 'Connect with campus mental health services' },
          { id: 'emergency-contact', label: 'Emergency Contact', description: 'Enable emergency notification features' }
        ]
      }
    ]
  }
];

const checkboxSizes = [
  { name: 'sm', label: 'Small', usage: 'Compact forms, mobile optimization', size: '16px' },
  { name: 'md', label: 'Medium', usage: 'Standard forms, balanced usability', size: '20px' },
  { name: 'lg', label: 'Large', usage: 'Important selections, accessibility focus', size: '24px' }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const CheckboxPatternsShowcase = () => {
  const [selections, setSelections] = useState<Record<string, boolean>>({});

  const handleSelectionChange = (id: string, checked: boolean) => {
    setSelections(prev => ({ ...prev, [id]: checked }));
  };

  const getGroupProgress = (options: any[]) => {
    const selected = options.filter(option => selections[option.id]).length;
    return `${selected}/${options.length} selected`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Checkbox Patterns
      </h3>
      
      <div className="space-y-8">
        {campusCheckboxPatterns.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="text-[var(--hive-text-primary)]">
                {category.category}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {category.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {category.groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <group.icon className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                        <span className="font-medium text-[var(--hive-text-primary)]">{group.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getGroupProgress(group.options)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {group.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
                          <Checkbox
                            id={option.id}
                            checked={selections[option.id] || false}
                            onCheckedChange={(checked) => handleSelectionChange(option.id, checked as boolean)}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={option.id}
                              className="text-[var(--hive-text-primary)] cursor-pointer"
                            >
                              {option.label}
                            </Label>
                            <div className="text-xs text-[var(--hive-text-muted)]">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      ))}
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

const CheckboxSizesShowcase = () => {
  const [sizeSelections, setSizeSelections] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Checkbox Sizes for Campus Context
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-6">
            {checkboxSizes.map((size) => (
              <div key={size.name} className="flex items-center gap-6">
                <div className="w-32">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {size.label}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {size.size}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-[var(--hive-text-muted)] mb-3">
                    {size.usage}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${size.name}-unchecked`}
                        size={size.name as any}
                        checked={false}
                      />
                      <Label htmlFor={`${size.name}-unchecked`} className="text-sm text-[var(--hive-text-secondary)]">
                        Unchecked
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${size.name}-checked`}
                        size={size.name as any}
                        checked={true}
                      />
                      <Label htmlFor={`${size.name}-checked`} className="text-sm text-[var(--hive-text-secondary)]">
                        Checked
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${size.name}-disabled`}
                        size={size.name as any}
                        checked={false}
                        disabled={true}
                      />
                      <Label htmlFor={`${size.name}-disabled`} className="text-sm text-[var(--hive-text-secondary)]">
                        Disabled
                      </Label>
                    </div>
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

const CheckboxStatesShowcase = () => {
  const [stateDemo, setStateDemo] = useState({
    parentChecked: false,
    child1: false,
    child2: false,
    child3: false
  });

  const childStates = [stateDemo.child1, stateDemo.child2, stateDemo.child3];
  const checkedCount = childStates.filter(Boolean).length;
  const isIndeterminate = checkedCount > 0 && checkedCount < childStates.length;
  const isAllChecked = checkedCount === childStates.length;

  const handleParentChange = (checked: boolean) => {
    setStateDemo({
      parentChecked: checked,
      child1: checked,
      child2: checked,
      child3: checked
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Checkbox States & Multi-Selection
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* States Demo */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
              <CheckSquare className="w-5 h-5" />
              Individual States
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="state-unchecked" checked={false} />
                <Label htmlFor="state-unchecked" className="text-[var(--hive-text-primary)]">
                  Unchecked State
                </Label>
              </div>
              
              <div className="flex items-center gap-3">
                <Checkbox id="state-checked" checked={true} />
                <Label htmlFor="state-checked" className="text-[var(--hive-text-primary)]">
                  Checked State
                </Label>
              </div>
              
              <div className="flex items-center gap-3">
                <Checkbox id="state-indeterminate" checked="indeterminate" />
                <Label htmlFor="state-indeterminate" className="text-[var(--hive-text-primary)]">
                  Indeterminate State
                </Label>
              </div>
              
              <div className="flex items-center gap-3">
                <Checkbox id="state-disabled" checked={false} disabled={true} />
                <Label htmlFor="state-disabled" className="text-[var(--hive-text-secondary)]">
                  Disabled State
                </Label>
              </div>
              
              <div className="flex items-center gap-3">
                <Checkbox id="state-disabled-checked" checked={true} disabled={true} />
                <Label htmlFor="state-disabled-checked" className="text-[var(--hive-text-secondary)]">
                  Disabled Checked
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Selection Demo */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
              <Users className="w-5 h-5" />
              Group Selection Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-[var(--hive-border-default)]">
                <Checkbox
                  id="parent-checkbox"
                  checked={isAllChecked ? true : isIndeterminate ? "indeterminate" : false}
                  onCheckedChange={handleParentChange}
                />
                <Label htmlFor="parent-checkbox" className="font-medium text-[var(--hive-text-primary)]">
                  Notification Preferences
                </Label>
              </div>
              
              <div className="ml-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="child1"
                    checked={stateDemo.child1}
                    onCheckedChange={(checked) => setStateDemo(prev => ({ ...prev, child1: checked as boolean }))}
                  />
                  <Label htmlFor="child1" className="text-[var(--hive-text-primary)]">
                    Academic Updates
                  </Label>
                </div>
                
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="child2"
                    checked={stateDemo.child2}
                    onCheckedChange={(checked) => setStateDemo(prev => ({ ...prev, child2: checked as boolean }))}
                  />
                  <Label htmlFor="child2" className="text-[var(--hive-text-primary)]">
                    Social Events
                  </Label>
                </div>
                
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="child3"
                    checked={stateDemo.child3}
                    onCheckedChange={(checked) => setStateDemo(prev => ({ ...prev, child3: checked as boolean }))}
                  />
                  <Label htmlFor="child3" className="text-[var(--hive-text-primary)]">
                    Administrative
                  </Label>
                </div>
              </div>
              
              <div className="text-xs text-[var(--hive-text-muted)] pt-2">
                Parent state: {isAllChecked ? 'All selected' : isIndeterminate ? 'Partially selected' : 'None selected'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AccessibilityShowcase = () => {
  const [focusedCheckbox, setFocusedCheckbox] = useState<string | null>(null);
  const [accessibilitySelections, setAccessibilitySelections] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Checkbox Accessibility Features
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Keyboard className="w-5 h-5" />
            Campus Accessibility Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keyboard Navigation */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Keyboard Navigation & Focus Management
            </h4>
            <div className="text-sm text-[var(--hive-text-muted)] mb-3">
              Currently focused: {focusedCheckbox || 'None'} • Use Tab to navigate, Space to toggle
            </div>
            <fieldset className="border border-[var(--hive-border-default)] rounded-lg p-4">
              <legend className="text-sm font-medium text-[var(--hive-text-primary)] px-2">
                Accessibility Preferences
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {[
                  { id: 'focus-reduced-motion', label: 'Reduced Motion', description: 'Minimize animations' },
                  { id: 'focus-high-contrast', label: 'High Contrast', description: 'Enhanced visual contrast' },
                  { id: 'focus-screen-reader', label: 'Screen Reader Mode', description: 'Optimized for assistive technology' },
                  { id: 'focus-keyboard-nav', label: 'Keyboard Navigation', description: 'Keyboard-only operation' }
                ].map((option) => (
                  <div key={option.id} className="flex items-start gap-3">
                    <Checkbox
                      id={option.id}
                      checked={accessibilitySelections[option.id] || false}
                      onCheckedChange={(checked) => setAccessibilitySelections(prev => ({ ...prev, [option.id]: checked as boolean }))}
                      onFocus={() => setFocusedCheckbox(option.id)}
                      onBlur={() => setFocusedCheckbox(null)}
                      className={`mt-0.5 ${focusedCheckbox === option.id ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''}`}
                    />
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="text-[var(--hive-text-primary)] cursor-pointer">
                        {option.label}
                      </Label>
                      <div className="text-xs text-[var(--hive-text-muted)]">
                        {option.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Screen Reader Support */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Screen Reader & Assistive Technology Support
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Semantic fieldset and legend grouping for related options
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Clear state announcements for checked/unchecked changes
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Descriptive labels with additional context information
                </span>
              </div>
            </div>
          </div>

          {/* Touch Accessibility */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Touch Accessibility for Campus Mobile Usage
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  44px+ touch targets for easy mobile interaction
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Clear visual feedback for touch interactions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Optimized spacing for thumb accessibility while walking
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// CHECKBOX ENHANCED MAIN COMPONENT
// =============================================================================

const CheckboxEnhancedShowcase = () => {
  const [activeSection, setActiveSection] = useState('patterns');

  const sections = [
    { id: 'patterns', label: 'Campus Patterns', icon: CheckSquare },
    { id: 'sizes', label: 'Sizes', icon: Square },
    { id: 'states', label: 'States', icon: Minus },
    { id: 'accessibility', label: 'Accessibility', icon: Keyboard }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <CheckSquare className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Checkbox Enhanced
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Selection Component
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The foundational selection element that powers every University at Buffalo student choice on HIVE. 
            Multi-state support, campus-specific patterns, and accessibility-first design.
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
          {activeSection === 'patterns' && <CheckboxPatternsShowcase />}
          {activeSection === 'sizes' && <CheckboxSizesShowcase />}
          {activeSection === 'states' && <CheckboxStatesShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Campus Usage Examples */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              University at Buffalo Usage Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Quick Selections (2-5 minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Event RSVP with dietary preferences
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Notification preference updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Quick privacy setting adjustments
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Detailed Configuration (10+ minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Comprehensive profile setup
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Accessibility accommodation setup
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Academic integration preferences
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

export const CheckboxEnhancedShowcaseStory: Story = {
  render: () => <CheckboxEnhancedShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Checkbox Enhanced showcase with campus patterns, sizes, states, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const CampusCheckboxPatterns: Story = {
  render: () => <CheckboxPatternsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific checkbox patterns for academic, social, privacy, and accessibility selections.'
      }
    }
  }
};

export const CheckboxSizes: Story = {
  render: () => <CheckboxSizesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Checkbox size system optimized for campus usage scenarios from mobile to desktop environments.'
      }
    }
  }
};

export const CheckboxStates: Story = {
  render: () => <CheckboxStatesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'All checkbox states including unchecked, checked, indeterminate, and disabled with group selection patterns.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete accessibility features including keyboard navigation, screen reader support, and touch accessibility.'
      }
    }
  }
};

// Individual component stories for testing
export const Standard: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="with-label" />
      <Label htmlFor="with-label" className="text-[var(--hive-text-primary)]">
        Receive study group notifications
      </Label>
    </div>
  ),
};

export const GroupedCheckboxes: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-[var(--hive-text-primary)]">
        Notification Preferences
      </legend>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="group-academic" />
          <Label htmlFor="group-academic" className="text-[var(--hive-text-primary)]">
            Academic Updates
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="group-social" />
          <Label htmlFor="group-social" className="text-[var(--hive-text-primary)]">
            Social Events
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="group-admin" />
          <Label htmlFor="group-admin" className="text-[var(--hive-text-primary)]">
            Administrative
          </Label>
        </div>
      </div>
    </fieldset>
  ),
};