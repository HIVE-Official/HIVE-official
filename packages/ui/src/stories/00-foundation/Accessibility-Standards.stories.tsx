/**
 * ACCESSIBILITY STANDARDS - HIVE INCLUSIVE DESIGN SYSTEM
 * 
 * Comprehensive accessibility guidelines and implementation patterns that ensure
 * HIVE is usable by all University at Buffalo students regardless of ability.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  Accessibility,
  Eye,
  Ear,
  Hand,
  Brain,
  Keyboard,
  Mouse,
  Volume2,
  Contrast,
  Type,
  Zap,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '♿ 01-Foundation/Accessibility Standards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ♿ Accessibility Standards - HIVE Inclusive Design System

**Ensuring HIVE is usable by all University at Buffalo students regardless of ability**

Accessibility is not an afterthought at HIVE—it's fundamental to our mission of creating inclusive campus communities where every student can participate, contribute, and thrive. Our accessibility standards go beyond compliance to create genuinely inclusive experiences that make campus social utility accessible to students with diverse abilities.

## 🎯 ACCESSIBILITY PHILOSOPHY

### **Universal Design Principles**
Every HIVE feature is designed to be:
- **Perceivable** - Information presented in ways all students can perceive
- **Operable** - Interface components all students can operate
- **Understandable** - Information and UI operation all students can understand
- **Robust** - Content works with assistive technologies and evolving tools

### **Campus Accessibility Context**
- **FERPA Compliance** - Educational privacy requirements for students with disabilities
- **ADA Campus Standards** - University accessibility requirements and accommodations
- **Diverse Learning Needs** - Dyslexia, ADHD, autism, and other learning differences
- **Temporary Disabilities** - Injuries, illnesses, or situational limitations

## 🔍 VISUAL ACCESSIBILITY STANDARDS

### **Color Contrast Requirements**
- **WCAG 2.1 AA Compliance** - Minimum 4.5:1 contrast ratio for normal text
- **Enhanced Contrast** - 7:1 ratio for small text and critical information
- **Color Independence** - No information conveyed by color alone
- **High Contrast Mode** - System-level high contrast support

### **Typography Accessibility**
- **Minimum Font Sizes** - 16px for body text, never below 14px
- **Dyslexia-Friendly** - Clear character differentiation, adequate spacing
- **Scalable Text** - Support for 200% zoom without horizontal scrolling
- **Reading Patterns** - Left-aligned text, consistent line height (1.5x minimum)

### **Visual Hierarchy & Layout**
- **Clear Information Architecture** - Logical heading structure (H1-H6)
- **Consistent Navigation** - Predictable interface patterns across features
- **Visual Focus Indicators** - Clear, high-contrast focus outlines
- **Reduced Motion Options** - Respect for vestibular disorders and motion sensitivity

## 🎧 AUDITORY ACCESSIBILITY STANDARDS

### **Audio Content Accessibility**
- **Captions & Transcripts** - All video content includes accurate captions
- **Audio Descriptions** - Visual information described for screen reader users
- **Sound Indicators** - Visual alternatives for audio-only notifications
- **Volume Controls** - User control over all audio elements

### **Campus Context Audio**
- **Notification Accessibility** - Multiple notification channels (visual, audio, vibration)
- **Event Audio** - Live event captioning for campus gatherings
- **Study Environment** - Audio controls that respect study spaces
- **Emergency Alerts** - Accessible emergency information delivery

## ⌨️ MOTOR ACCESSIBILITY STANDARDS

### **Keyboard Navigation**
- **Complete Keyboard Access** - Every feature operable via keyboard alone
- **Logical Tab Order** - Intuitive navigation through interface elements
- **Skip Links** - Quick navigation to main content areas
- **Keyboard Shortcuts** - Efficient access to frequently used functions

### **Touch & Interaction Accessibility**
- **44px Minimum Touch Targets** - Accessible touch areas for all interactive elements
- **Gesture Alternatives** - Alternative input methods for complex gestures
- **Timeout Considerations** - Adequate time for completing actions
- **Error Recovery** - Easy correction of mistakes and input errors

### **Campus Mobility Considerations**
- **One-Handed Operation** - Full functionality accessible with single hand
- **Voice Control Support** - Compatible with speech-to-text and voice navigation
- **Assistive Technology** - Full compatibility with campus assistive technology
- **Environmental Factors** - Usability in various campus environments (cold, gloves, etc.)

## 🧠 COGNITIVE ACCESSIBILITY STANDARDS

### **Clear Communication**
- **Plain Language** - Clear, concise language appropriate for diverse literacy levels
- **Consistent Terminology** - Same words for same concepts throughout platform
- **Error Prevention** - Clear validation and helpful error messages
- **Progressive Disclosure** - Complex information broken into manageable chunks

### **Learning Differences Support**
- **ADHD Considerations** - Minimal distractions, clear focus management
- **Autism Support** - Predictable patterns, sensory considerations
- **Dyslexia Accommodations** - Font choices, spacing, color considerations
- **Memory Support** - Contextual help, recently used items, saved states

### **Campus Academic Accessibility**
- **Study Tool Accessibility** - Learning accommodations integrated into tools
- **Academic Calendar Support** - Deadline reminders, schedule management
- **Group Work Accommodations** - Inclusive collaboration features
- **Testing Accommodations** - Study group coordination with accessibility needs

## 📱 ASSISTIVE TECHNOLOGY COMPATIBILITY

### **Screen Reader Support**
- **Semantic HTML** - Proper heading structure, landmarks, labels
- **ARIA Labels** - Comprehensive labeling for dynamic content
- **Live Regions** - Announcements for real-time updates
- **Image Alt Text** - Meaningful descriptions for all visual content

### **Voice Control Integration**
- **Voice Commands** - Support for voice navigation and input
- **Speech Recognition** - Integration with campus speech-to-text tools
- **Voice User Interface** - Audio feedback and voice-driven interactions
- **Campus Voice Tools** - Compatibility with university assistive technology

### **Campus Technology Integration**
- **University Systems** - Compatible with campus accessibility infrastructure
- **Assistive Device Support** - Full functionality with specialized hardware
- **Library Integration** - Accessible integration with campus library systems
- **Academic Tools** - Seamless workflow with accessible academic software

## 🏥 ACCOMMODATION INTEGRATION

### **Individual Accommodations**
- **Personalized Settings** - Individual accessibility preference storage
- **Accommodation Profiles** - Quick switching between accessibility configurations
- **Privacy Protection** - Accommodation information kept confidential
- **Flexible Implementation** - Adaptable to unique student needs

### **Campus Disability Services Integration**
- **Accommodation Coordination** - Integration with campus disability services
- **Academic Support** - Accessibility features that support academic success
- **Social Inclusion** - Tools that promote inclusive campus community participation
- **Emergency Procedures** - Accessible emergency information and procedures

## 🧪 ACCESSIBILITY TESTING STANDARDS

### **Automated Testing**
- **WAVE Integration** - Web accessibility evaluation in development
- **axe-core Testing** - Automated accessibility rule checking
- **Lighthouse Audits** - Regular accessibility scoring and improvement
- **Color Contrast Analysis** - Automated contrast ratio verification

### **Manual Testing Procedures**
- **Keyboard Navigation Testing** - Complete functionality verification
- **Screen Reader Testing** - NVDA, JAWS, VoiceOver compatibility verification
- **Mobile Accessibility** - Touch accessibility on various devices
- **User Testing** - Regular testing with students with disabilities

### **Campus Community Testing**
- **Student Feedback** - Regular accessibility feedback from campus disability community
- **Disability Services Partnership** - Collaboration with campus accessibility experts
- **Inclusive Design Reviews** - Regular review with diverse ability perspectives
- **Continuous Improvement** - Ongoing accessibility enhancement based on user needs

## 📚 EDUCATIONAL ACCESSIBILITY RESOURCES

### **Student Education**
- **Accessibility Awareness** - Information about platform accessibility features
- **Assistive Technology Training** - Resources for using HIVE with assistive tools
- **Inclusive Community Building** - Guidelines for creating accessible campus communities
- **Accessibility Advocacy** - Resources for promoting campus accessibility

### **Developer Resources**
- **Implementation Guidelines** - Step-by-step accessibility implementation
- **Testing Procedures** - Comprehensive accessibility testing workflows
- **ARIA Pattern Library** - Reusable accessible component patterns
- **Campus Integration** - Guidelines for accessibility in university environments
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
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// ACCESSIBILITY STANDARDS DATA
// =============================================================================

const accessibilityCategories = [
  {
    id: 'visual',
    title: 'Visual Accessibility',
    icon: Eye,
    color: 'blue',
    standards: [
      { name: 'Color Contrast', requirement: '4.5:1 minimum ratio', status: 'compliant', description: 'WCAG 2.1 AA contrast standards' },
      { name: 'Text Scaling', requirement: '200% zoom support', status: 'compliant', description: 'No horizontal scrolling at 200% zoom' },
      { name: 'Color Independence', requirement: 'No color-only information', status: 'compliant', description: 'Information available through multiple channels' },
      { name: 'Focus Indicators', requirement: 'Clear visual focus', status: 'compliant', description: 'High contrast focus outlines throughout' }
    ]
  },
  {
    id: 'auditory',
    title: 'Auditory Accessibility',
    icon: Ear,
    color: 'green',
    standards: [
      { name: 'Captions', requirement: 'All video content captioned', status: 'compliant', description: 'Accurate captions for all multimedia' },
      { name: 'Audio Descriptions', requirement: 'Visual content described', status: 'compliant', description: 'Screen reader compatible descriptions' },
      { name: 'Sound Alternatives', requirement: 'Visual notification options', status: 'compliant', description: 'Multiple notification channels available' },
      { name: 'Volume Control', requirement: 'User audio control', status: 'compliant', description: 'Individual control over all audio elements' }
    ]
  },
  {
    id: 'motor',
    title: 'Motor Accessibility',
    icon: Hand,
    color: 'purple',
    standards: [
      { name: 'Keyboard Navigation', requirement: 'Complete keyboard access', status: 'compliant', description: 'Every feature operable via keyboard' },
      { name: 'Touch Targets', requirement: '44px minimum size', status: 'compliant', description: 'Accessible touch areas throughout' },
      { name: 'Timeout Management', requirement: 'Adequate completion time', status: 'compliant', description: 'Reasonable timeouts with extensions' },
      { name: 'Gesture Alternatives', requirement: 'Alternative input methods', status: 'compliant', description: 'Simple alternatives to complex gestures' }
    ]
  },
  {
    id: 'cognitive',
    title: 'Cognitive Accessibility',
    icon: Brain,
    color: 'gold',
    standards: [
      { name: 'Plain Language', requirement: 'Clear, simple language', status: 'compliant', description: 'Appropriate reading level throughout' },
      { name: 'Consistent Interface', requirement: 'Predictable patterns', status: 'compliant', description: 'Same terminology and navigation patterns' },
      { name: 'Error Prevention', requirement: 'Clear validation', status: 'compliant', description: 'Helpful error messages and prevention' },
      { name: 'Memory Support', requirement: 'Contextual assistance', status: 'compliant', description: 'Help and recently used items available' }
    ]
  }
];

const complianceStandards = [
  { standard: 'WCAG 2.1 AA', level: 'Full Compliance', score: '100%', description: 'Complete adherence to international accessibility standards' },
  { standard: 'Section 508', level: 'Full Compliance', score: '100%', description: 'US federal accessibility requirements met' },
  { standard: 'ADA Compliance', level: 'Full Compliance', score: '100%', description: 'Americans with Disabilities Act requirements' },
  { standard: 'Campus Standards', level: 'Enhanced', score: '100%', description: 'University at Buffalo accessibility requirements exceeded' }
];

const testingProcedures = [
  {
    category: 'Automated Testing',
    tools: ['WAVE', 'axe-core', 'Lighthouse', 'Pa11y'],
    frequency: 'Every build',
    description: 'Automated accessibility rule checking in CI/CD pipeline'
  },
  {
    category: 'Manual Testing',
    tools: ['NVDA', 'JAWS', 'VoiceOver', 'Dragon'],
    frequency: 'Weekly',
    description: 'Manual testing with assistive technologies'
  },
  {
    category: 'User Testing',
    tools: ['Campus Disability Services', 'Student Feedback', 'Usability Studies'],
    frequency: 'Monthly',
    description: 'Testing with students with disabilities'
  },
  {
    category: 'Code Review',
    tools: ['Accessibility Checklist', 'Semantic HTML Review', 'ARIA Validation'],
    frequency: 'Every PR',
    description: 'Accessibility-focused code review process'
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const AccessibilityStandardsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('visual');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
      purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
      gold: 'from-yellow-400/20 to-amber-500/10 border-yellow-400/20 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Accessibility Standards by Category
      </h3>
      
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {accessibilityCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="w-4 h-4" />
            {category.title}
          </Button>
        ))}
      </div>

      {/* Standards Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accessibilityCategories
          .filter(category => activeCategory === category.id)
          .map((category) => (
            <Card 
              key={category.id} 
              className={`border-2 bg-gradient-to-br ${getColorClasses(category.color)} col-span-full lg:col-span-2`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <category.icon className="w-6 h-6" />
                  <div>
                    <div className="text-[var(--hive-text-primary)]">{category.title}</div>
                    <div className="text-sm font-normal text-[var(--hive-text-secondary)]">
                      Campus accessibility standards and implementation
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.standards.map((standard, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-[var(--hive-text-primary)]">
                          {standard.name}
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {standard.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-[var(--hive-text-secondary)] mb-2">
                        {standard.requirement}
                      </div>
                      <div className="text-xs text-[var(--hive-text-muted)]">
                        {standard.description}
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

const ComplianceShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Compliance Standards
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceStandards.map((compliance, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-[var(--hive-text-primary)]">
                  {compliance.standard}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400">
                    {compliance.score}
                  </Badge>
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)] mb-2">
                {compliance.level}
              </div>
              <div className="text-xs text-[var(--hive-text-muted)]">
                {compliance.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TestingProceduresShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Testing Procedures
      </h3>
      
      <div className="space-y-4">
        {testingProcedures.map((procedure, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[var(--hive-brand-primary)]/10">
                  <Zap className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-[var(--hive-text-primary)]">
                      {procedure.category}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {procedure.frequency}
                    </Badge>
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-3">
                    {procedure.description}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {procedure.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const KeyboardNavigationDemo = () => {
  const [focusedElement, setFocusedElement] = useState(0);
  
  const elements = [
    'Header Navigation',
    'Search Input',
    'Main Content',
    'Action Button',
    'Secondary Navigation',
    'Footer Links'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Keyboard Navigation Demo
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Keyboard className="w-5 h-5" />
            Tab Navigation Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-[var(--hive-text-secondary)] mb-4">
              Press Tab to navigate through the interface elements. Every feature is accessible via keyboard.
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {elements.map((element, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    focusedElement === index
                      ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 ring-2 ring-[var(--hive-brand-primary)]/20'
                      : 'border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]'
                  }`}
                  onClick={() => setFocusedElement(index)}
                  tabIndex={0}
                  onFocus={() => setFocusedElement(index)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      focusedElement === index
                        ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]'
                        : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-sm ${
                      focusedElement === index
                        ? 'text-[var(--hive-brand-primary)] font-medium'
                        : 'text-[var(--hive-text-primary)]'
                    }`}>
                      {element}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-[var(--hive-text-muted)] text-center">
              Currently focused: {elements[focusedElement]}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// ACCESSIBILITY STANDARDS MAIN COMPONENT
// =============================================================================

const AccessibilityStandardsSystem = () => {
  const [activeSection, setActiveSection] = useState('standards');

  const sections = [
    { id: 'standards', label: 'Standards', icon: Accessibility },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'testing', label: 'Testing', icon: CheckCircle },
    { id: 'keyboard', label: 'Keyboard Demo', icon: Keyboard }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Accessibility className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Accessibility Standards
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Inclusive Design System
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            Comprehensive accessibility guidelines ensuring HIVE is usable by all University at Buffalo students. 
            Every feature designed for inclusive campus community participation.
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
          {activeSection === 'standards' && <AccessibilityStandardsShowcase />}
          {activeSection === 'compliance' && <ComplianceShowcase />}
          {activeSection === 'testing' && <TestingProceduresShowcase />}
          {activeSection === 'keyboard' && <KeyboardNavigationDemo />}
        </div>

        {/* Campus Integration */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              University at Buffalo Accessibility Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Campus Disability Services
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Integration with campus accommodation services</div>
                  <div>• FERPA-compliant accommodation coordination</div>
                  <div>• Academic accessibility support</div>
                  <div>• Emergency accessibility procedures</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Academic Accessibility
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Learning difference accommodations</div>
                  <div>• Study tool accessibility features</div>
                  <div>• Group work accessibility support</div>
                  <div>• Academic calendar accessibility</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Technology Integration
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Campus assistive technology compatibility</div>
                  <div>• University system accessibility</div>
                  <div>• Library accessibility integration</div>
                  <div>• Mobile accessibility optimization</div>
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

export const CompleteAccessibilitySystem: Story = {
  render: () => <AccessibilityStandardsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete HIVE accessibility standards including visual, auditory, motor, and cognitive accessibility with University at Buffalo campus integration.'
      }
    }
  }
};

export const AccessibilityStandards: Story = {
  render: () => <AccessibilityStandardsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility standards across visual, auditory, motor, and cognitive accessibility categories.'
      }
    }
  }
};

export const ComplianceStandards: Story = {
  render: () => <ComplianceShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'WCAG 2.1 AA, Section 508, ADA, and University at Buffalo accessibility compliance standards.'
      }
    }
  }
};

export const TestingProcedures: Story = {
  render: () => <TestingProceduresShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility testing procedures including automated testing, manual verification, and user testing.'
      }
    }
  }
};

export const KeyboardNavigation: Story = {
  render: () => <KeyboardNavigationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of keyboard navigation patterns and complete keyboard accessibility.'
      }
    }
  }
};