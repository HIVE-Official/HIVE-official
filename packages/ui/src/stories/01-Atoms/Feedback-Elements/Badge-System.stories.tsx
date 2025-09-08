/**
 * BADGE SYSTEM - CAMPUS STATUS & CLASSIFICATION COMPONENT
 * 
 * The comprehensive status indicator system for HIVE platform with semantic meaning,
 * accessibility features, and campus-specific classification patterns for University at Buffalo.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar } from '../../../components/ui/avatar';
import { 
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  Clock,
  Star,
  Award,
  Shield,
  Zap,
  Heart,
  MessageCircle,
  BookOpen,
  Building,
  User,
  Crown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Trending,
  Fire,
  Target,
  Gamepad2,
  Coffee,
  Music,
  Camera,
  Code,
  Palette,
  Rocket,
  Globe,
  Lock,
  Eye
} from 'lucide-react';
import '../../../hive-tokens.css';

const meta: Meta<typeof Badge> = {
  title: '02-Atoms/Feedback Elements/Badge System',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Badge System - Campus Status & Classification Component

**The foundational status indicator system that provides clear, meaningful information across the HIVE platform**

The Badge System creates consistent, accessible, and semantically meaningful status indicators for University at Buffalo campus scenarios. Every badge serves a specific communicative purpose, helping students quickly understand status, classification, achievements, and important information at a glance.

## 🎯 BADGE DESIGN PHILOSOPHY

### **Campus-First Information Design**
Every badge pattern is designed for University at Buffalo student scenarios:
- **Academic Classification** - Course levels, academic status, grade indicators
- **Social Recognition** - Community roles, achievements, participation levels
- **Campus Services** - Building access, facility status, service availability
- **Platform Status** - Account verification, notification counts, system states

### **Semantic Information Architecture**
- **Clear Hierarchy** - Visual weight corresponds to information importance
- **Instant Recognition** - Color and iconography provide immediate understanding
- **Accessibility First** - High contrast, screen reader support, clear labeling
- **Context Awareness** - Badges adapt meaning based on their usage context

## 🎨 BADGE VARIANTS & TYPES

### **Core Badge Variants**
- **Default** - Standard information, neutral classification
- **Primary** - Important status, featured content, primary actions
- **Secondary** - Supporting information, alternative classification
- **Success** - Positive status, completed actions, achievements
- **Warning** - Caution states, pending actions, attention needed
- **Error** - Problem indicators, failed actions, critical issues
- **Info** - Helpful information, tips, additional context

### **Campus-Specific Badge Types**

#### **Academic Badges**
- **Course Level** - Freshman, Sophomore, Junior, Senior classifications
- **Academic Status** - Dean's List, Honor Roll, Academic Warning
- **Grade Indicators** - A, B, C, Pass/Fail status markers
- **Enrollment Status** - Enrolled, Waitlisted, Prerequisites Required

#### **Social Recognition Badges**
- **Community Roles** - Moderator, Founder, Veteran Member, New Member
- **Achievement Levels** - Rising Star, Community Builder, Study Champion
- **Participation Metrics** - Active Contributor, Event Organizer, Mentor
- **Social Proof** - Popular, Trending, Verified, Official

#### **Campus Service Badges**
- **Building Access** - Key Card Required, Public Access, Restricted Area
- **Facility Status** - Open, Closed, Maintenance, Reservation Required
- **Service Availability** - Available, Busy, Offline, Coming Soon
- **Event Status** - Live, Upcoming, Registration Open, Sold Out

### **Interactive Badge States**
- **Static** - Information display only
- **Clickable** - Action triggers, navigation elements
- **Removable** - Filter tags, temporary classifications
- **Expandable** - Additional information available on interaction

## 📏 BADGE SIZE SYSTEM

### **Campus Usage Sizes**
- **sm** - Compact information, dense layouts, mobile optimization
- **md** - Standard status indicators, balanced visibility
- **lg** - Prominent classification, important status display

### **Visual Hierarchy**
- **Subtle** - Supporting information that doesn't compete with content
- **Standard** - Balanced visibility for general information
- **Prominent** - Important status that requires user attention

## ♿ ACCESSIBILITY FEATURES

### **Screen Reader Support**
- **Semantic Labels** - Clear, descriptive labeling for all badge content
- **Context Descriptions** - Badge meaning explained within usage context
- **Status Announcements** - Dynamic badge changes announced to screen readers
- **Alternative Text** - Meaningful descriptions for icon-based badges

### **Visual Accessibility**
- **High Contrast** - 4.5:1 minimum contrast ratio for all badge text
- **Color Independence** - Badge meaning never depends solely on color
- **Scale Support** - Clear readability at 200%+ zoom levels
- **Focus Indicators** - Clear focus states for interactive badges

### **Motor Accessibility**
- **Touch Targets** - Interactive badges meet 44px minimum touch area
- **Spacing** - Adequate spacing between multiple badge elements
- **Error Prevention** - Clear visual hierarchy prevents accidental interaction
- **Alternative Actions** - Badge functionality accessible through multiple methods

## 🎓 CAMPUS BADGE CONTEXTS

### **Academic Dashboard Badges**
Course and study coordination status indicators:
- Course enrollment status and prerequisites
- Study group participation and leadership roles
- Academic calendar events and deadline urgency
- Grade tracking and academic performance indicators

### **Social Feed Badges**
Community engagement and social status:
- Community membership levels and roles
- Event participation and hosting status
- Content interaction metrics and popularity
- Friend connection status and mutual interests

### **Campus Navigation Badges**
Location and service status indicators:
- Building accessibility and entry requirements
- Facility hours and current availability status
- Event venue capacity and registration status
- Transportation options and real-time status

### **Profile & Identity Badges**
Personal achievement and verification indicators:
- Academic year and major classification
- Campus involvement and leadership recognition
- Platform verification and trust indicators
- Privacy settings and information sharing status

## 🔧 TECHNICAL IMPLEMENTATION

### **Badge Component Architecture**
- **Variant System** - Consistent styling across all badge types
- **Icon Integration** - Optional icon support with proper spacing
- **Size Scaling** - Responsive sizing with maintained proportions
- **State Management** - Interactive badge state handling

### **Performance Optimization**
- **Minimal Bundle Impact** - Lightweight component with no external dependencies
- **Efficient Rendering** - Optimized for multiple badge displays
- **Accessibility Integration** - Built-in screen reader and keyboard support
- **Memory Efficiency** - Minimal state management and prop handling

### **Campus Integration**
- **Brand Consistency** - Badges align with HIVE visual identity
- **Context Awareness** - Badge appearance adapts to surrounding content
- **Data Integration** - Real-time status updates from campus systems
- **Privacy Compliance** - Appropriate information display based on user privacy settings

## 🎯 BADGE USAGE GUIDELINES

### **Information Hierarchy**
- Use color to reinforce meaning, not as the sole indicator
- Maintain consistent badge placement within similar contexts
- Limit badge density to prevent cognitive overload
- Group related badges logically for better comprehension

### **Campus Appropriateness**
- Choose badge text that reflects university terminology
- Consider academic context when selecting badge colors
- Ensure badges work for diverse student populations
- Maintain professional appearance appropriate for academic settings

### **Interaction Design**
- Make interactive badges clearly distinguishable from static ones
- Provide appropriate hover and focus states for interactive elements
- Ensure badge actions are predictable and recoverable
- Consider badge functionality in mobile campus usage scenarios

## 📱 MOBILE CAMPUS OPTIMIZATION

### **Between-Class Usage (2-5 minutes)**
- **Quick Recognition** - Badges provide instant status understanding
- **Touch Optimization** - Interactive badges sized for thumb accessibility
- **Minimal Cognitive Load** - Simple, clear badge messaging
- **Fast Loading** - Efficient badge rendering for quick interactions

### **Study Session Usage (10+ minutes)**
- **Detailed Information** - Badges provide helpful context without disruption
- **Visual Hierarchy** - Badge importance scales with content relevance
- **Progress Indication** - Badges show completion and achievement status
- **Collaboration Support** - Badges facilitate group coordination and communication
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
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']
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
// BADGE SYSTEM DATA
// =============================================================================

const badgeVariants = [
  { variant: 'default', name: 'Default', usage: 'Standard information, neutral status', example: 'Student' },
  { variant: 'primary', name: 'Primary', usage: 'Important status, featured content', example: 'Featured' },
  { variant: 'secondary', name: 'Secondary', usage: 'Supporting information, alternative status', example: 'Optional' },
  { variant: 'success', name: 'Success', usage: 'Positive status, achievements', example: 'Completed' },
  { variant: 'warning', name: 'Warning', usage: 'Caution states, attention needed', example: 'Deadline Soon' },
  { variant: 'error', name: 'Error', usage: 'Problem indicators, critical issues', example: 'Overdue' },
  { variant: 'info', name: 'Info', usage: 'Helpful information, additional context', example: 'New' }
];

const campusBadgeCategories = [
  {
    category: 'Academic Classification',
    description: 'Course and academic status indicators',
    color: 'green',
    badges: [
      { variant: 'primary', text: 'Senior', icon: GraduationCap, context: 'Academic year classification' },
      { variant: 'success', text: 'Dean\'s List', icon: Award, context: 'Academic achievement recognition' },
      { variant: 'info', text: 'Computer Science', icon: Code, context: 'Major field of study' },
      { variant: 'warning', text: 'Prerequisites Required', icon: AlertCircle, context: 'Course enrollment status' },
      { variant: 'default', text: 'Enrolled', icon: CheckCircle, context: 'Current enrollment status' },
      { variant: 'secondary', text: 'Audit', icon: Eye, context: 'Course completion type' }
    ]
  },
  {
    category: 'Social Recognition',
    description: 'Community roles and achievement badges',
    color: 'purple',
    badges: [
      { variant: 'primary', text: 'Moderator', icon: Shield, context: 'Community leadership role' },
      { variant: 'success', text: 'Founder', icon: Crown, context: 'Community creator status' },
      { variant: 'info', text: 'Rising Star', icon: Star, context: 'Active contributor recognition' },
      { variant: 'secondary', text: 'Veteran Member', icon: Award, context: 'Long-term community participation' },
      { variant: 'default', text: 'Active Contributor', icon: Heart, context: 'Regular participation level' },
      { variant: 'warning', text: 'New Member', icon: User, context: 'Recent community join status' }
    ]
  },
  {
    category: 'Campus Services',
    description: 'Building access and facility status',
    color: 'blue',
    badges: [
      { variant: 'success', text: 'Open', icon: CheckCircle, context: 'Facility currently available' },
      { variant: 'error', text: 'Closed', icon: XCircle, context: 'Facility not accessible' },
      { variant: 'warning', text: 'Key Card Required', icon: Lock, context: 'Restricted building access' },
      { variant: 'info', text: 'Public Access', icon: Globe, context: 'Open to all students' },
      { variant: 'secondary', text: 'Reservation Required', icon: Calendar, context: 'Booking needed for access' },
      { variant: 'default', text: 'Study Space', icon: BookOpen, context: 'Academic facility type' }
    ]
  },
  {
    category: 'Event & Activity',
    description: 'Event status and participation indicators',
    color: 'gold',
    badges: [
      { variant: 'error', text: 'Live', icon: Zap, context: 'Event currently happening' },
      { variant: 'success', text: 'Registered', icon: CheckCircle, context: 'Event participation confirmed' },
      { variant: 'warning', text: 'Registration Closes Soon', icon: Clock, context: 'Deadline approaching' },
      { variant: 'info', text: 'Free Event', icon: Info, context: 'No cost for participation' },
      { variant: 'primary', text: 'Featured Event', icon: Star, context: 'Highlighted campus activity' },
      { variant: 'secondary', text: 'Study Group', icon: Users, context: 'Academic collaboration event' }
    ]
  },
  {
    category: 'Platform Status',
    description: 'Account verification and system status',
    color: 'indigo',
    badges: [
      { variant: 'success', text: 'Verified', icon: CheckCircle, context: 'Account verification status' },
      { variant: 'primary', text: 'Official', icon: Shield, context: 'Official university account' },
      { variant: 'info', text: 'Beta Tester', icon: Rocket, context: 'Early feature access' },
      { variant: 'warning', text: 'Profile Incomplete', icon: AlertCircle, context: 'Setup required' },
      { variant: 'secondary', text: 'Privacy Protected', icon: Lock, context: 'Enhanced privacy settings' },
      { variant: 'default', text: 'Active', icon: CheckCircle, context: 'Current platform status' }
    ]
  },
  {
    category: 'Interest & Skills',
    description: 'Personal interests and skill indicators',
    color: 'red',
    badges: [
      { variant: 'primary', text: 'Photography', icon: Camera, context: 'Creative interest area' },
      { variant: 'secondary', text: 'Music Production', icon: Music, context: 'Artistic skill or hobby' },
      { variant: 'info', text: 'Coffee Enthusiast', icon: Coffee, context: 'Personal interest' },
      { variant: 'default', text: 'Gaming', icon: Gamepad2, context: 'Recreational interest' },
      { variant: 'success', text: 'Fitness', icon: Target, context: 'Health and wellness focus' },
      { variant: 'warning', text: 'Beginner Friendly', icon: Info, context: 'Skill level indication' }
    ]
  }
];

const badgeSizes = [
  { size: 'sm', name: 'Small', usage: 'Compact layouts, mobile optimization', example: 'New' },
  { size: 'md', name: 'Medium', usage: 'Standard status indicators', example: 'Computer Science' },
  { size: 'lg', name: 'Large', usage: 'Prominent classification', example: 'Dean\'s List' }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const BadgeVariantsShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Badge Variant System
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badgeVariants.map((badge, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-4 text-center">
              <div className="mb-4">
                <Badge variant={badge.variant as any} className="text-sm">
                  {badge.example}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-[var(--hive-text-primary)] capitalize">
                  {badge.name} Badge
                </div>
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  {badge.usage}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CampusBadgeShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('Academic Classification');

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500/20 to-green-600/10 border-green-500/20',
      purple: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold-dark)]/10 border-[var(--hive-gold)]/20',
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
      gold: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/10 border-[var(--hive-gold)]/20',
      indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/20',
      red: 'from-red-500/20 to-red-600/10 border-red-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Badge Categories
      </h3>
      
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2">
        {campusBadgeCategories.map((category) => (
          <Button
            key={category.category}
            variant={activeCategory === category.category ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(category.category)}
            size="sm"
          >
            {category.category}
          </Button>
        ))}
      </div>

      {/* Badge Category Display */}
      <div className="space-y-6">
        {campusBadgeCategories
          .filter(category => activeCategory === category.category)
          .map((category, categoryIndex) => (
            <Card key={categoryIndex} className={`border-2 bg-gradient-to-br ${getColorClasses(category.color)}`}>
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)]">
                  {category.category}
                </CardTitle>
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  {category.description}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.badges.map((badge, badgeIndex) => (
                    <div 
                      key={badgeIndex}
                      className="p-4 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Badge variant={badge.variant as any} className="flex items-center gap-1">
                          <badge.icon className="w-3 h-3" />
                          {badge.text}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-[var(--hive-text-muted)]">
                          {badge.context}
                        </div>
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

const BadgeSizesShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Badge Size System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-8">
            {badgeSizes.map((size) => (
              <div key={size.size} className="flex items-center gap-8">
                <div className="w-32">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {size.name}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {size.usage}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="primary" size={size.size as any}>
                    {size.example}
                  </Badge>
                  <Badge variant="primary" size={size.size as any}>
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <Badge variant="success" size={size.size as any}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                  <Badge variant="warning" size={size.size as any}>
                    <Clock className="w-3 h-3 mr-1" />
                    Due Soon
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CampusUsageShowcase = () => {
  const usageScenarios = [
    {
      scenario: 'Student Profile Card',
      description: 'Personal identity and academic status',
      component: (
        <Card className="max-w-sm border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <div className="w-full h-full bg-[var(--hive-brand-primary)]/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-[var(--hive-brand-primary)]" />
                </div>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[var(--hive-text-primary)]">Alex Johnson</span>
                  <Badge variant="success" size="sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="primary" size="sm">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Senior
                  </Badge>
                  <Badge variant="info" size="sm">
                    <Code className="w-3 h-3 mr-1" />
                    CS Major
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="success" size="sm">Dean's List</Badge>
                  <Badge variant="secondary" size="sm">Study Leader</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      scenario: 'Event Listing Card',
      description: 'Event status and participation info',
      component: (
        <Card className="max-w-sm border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 115 Study Session</h4>
                <Badge variant="error" size="sm">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                <MapPin className="w-4 h-4" />
                <span>Davis Hall, Room 101</span>
                <Badge variant="success" size="sm">Open</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="info" size="sm">
                  <Info className="w-3 h-3 mr-1" />
                  Free Event
                </Badge>
                <Badge variant="warning" size="sm">
                  <Users className="w-3 h-3 mr-1" />
                  12/15 spots
                </Badge>
                <Badge variant="secondary" size="sm">Academic</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      scenario: 'Campus Building Status',
      description: 'Facility access and availability',
      component: (
        <Card className="max-w-sm border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                  <span className="font-semibold text-[var(--hive-text-primary)]">Lockwood Library</span>
                </div>
                <Badge variant="success" size="sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Open
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--hive-text-secondary)]">Study Rooms</span>
                  <Badge variant="warning" size="sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    Reservation Required
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--hive-text-secondary)]">Computer Lab</span>
                  <Badge variant="info" size="sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Public Access
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--hive-text-secondary)]">Group Study Area</span>
                  <Badge variant="error" size="sm">
                    <Users className="w-3 h-3 mr-1" />
                    At Capacity
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      scenario: 'Course Enrollment',
      description: 'Academic course status and requirements',
      component: (
        <Card className="max-w-sm border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 442 - Software Engineering</h4>
                <Badge variant="success" size="sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Enrolled
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="primary" size="sm">
                  <BookOpen className="w-3 h-3 mr-1" />
                  4 Credits
                </Badge>
                <Badge variant="info" size="sm">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Upper Level
                </Badge>
                <Badge variant="secondary" size="sm">MWF 2:00-2:50</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--hive-text-secondary)]">Prerequisites Met</span>
                <Badge variant="success" size="sm">✓ Complete</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Usage Scenarios
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {usageScenarios.map((scenario, index) => (
          <div key={index} className="space-y-3">
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">
                {scenario.scenario}
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {scenario.description}
              </div>
            </div>
            <div className="flex justify-center">
              {scenario.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccessibilityShowcase = () => {
  const [focusedBadge, setFocusedBadge] = useState<string | null>(null);

  const accessibilityFeatures = [
    {
      feature: 'Screen Reader Support',
      description: 'All badges include semantic labeling and context',
      badges: [
        { variant: 'success', text: 'Dean\'s List', ariaLabel: 'Academic achievement: Dean\'s List recognition' },
        { variant: 'warning', text: 'Due Soon', ariaLabel: 'Assignment deadline warning: Due within 24 hours' },
        { variant: 'info', text: '12 Members', ariaLabel: 'Study group size: 12 current members' }
      ]
    },
    {
      feature: 'High Contrast Mode',
      description: 'Badges maintain visibility in accessibility modes',
      badges: [
        { variant: 'primary', text: 'Featured', context: 'High contrast compatible' },
        { variant: 'error', text: 'Critical', context: 'Emergency information display' },
        { variant: 'success', text: 'Completed', context: 'Achievement confirmation' }
      ]
    },
    {
      feature: 'Interactive Badges',
      description: 'Clickable badges with proper focus management',
      badges: [
        { variant: 'secondary', text: 'Computer Science', interactive: true, action: 'View major information' },
        { variant: 'info', text: 'Study Group', interactive: true, action: 'Join study group' },
        { variant: 'primary', text: 'Event Details', interactive: true, action: 'View event information' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Badge Accessibility Features
      </h3>
      
      <div className="space-y-6">
        {accessibilityFeatures.map((feature, featureIndex) => (
          <Card key={featureIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <Shield className="w-5 h-5" />
                {feature.feature}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {feature.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {feature.badges.map((badge, badgeIndex) => (
                  <div key={badgeIndex} className="space-y-2">
                    {badge.interactive ? (
                      <button
                        className="focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)] rounded"
                        onFocus={() => setFocusedBadge(`${featureIndex}-${badgeIndex}`)}
                        onBlur={() => setFocusedBadge(null)}
                        aria-label={badge.action}
                      >
                        <Badge 
                          variant={badge.variant as any}
                          className={`cursor-pointer transition-all ${
                            focusedBadge === `${featureIndex}-${badgeIndex}` ? 'scale-105' : ''
                          }`}
                        >
                          {badge.text}
                        </Badge>
                      </button>
                    ) : (
                      <Badge 
                        variant={badge.variant as any}
                        aria-label={badge.ariaLabel}
                      >
                        {badge.text}
                      </Badge>
                    )}
                    <div className="text-xs text-[var(--hive-text-muted)]">
                      {badge.ariaLabel || badge.context || badge.action}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">
            Accessibility Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">Visual Standards</h4>
              <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                <div>• 4.5:1 minimum contrast ratio for all badge text</div>
                <div>• Clear focus indicators for interactive badges</div>
                <div>• Readable at 200% zoom without information loss</div>
                <div>• Color-independent meaning communication</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">Interaction Standards</h4>
              <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                <div>• Keyboard accessible interactive elements</div>
                <div>• Screen reader compatible semantic labels</div>
                <div>• Appropriate ARIA attributes and roles</div>
                <div>• Touch-friendly sizing for campus mobile usage</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// BADGE SYSTEM MAIN COMPONENT
// =============================================================================

const BadgeSystemShowcase = () => {
  const [activeSection, setActiveSection] = useState('variants');

  const sections = [
    { id: 'variants', label: 'Badge Variants', icon: Star },
    { id: 'campus', label: 'Campus Categories', icon: GraduationCap },
    { id: 'sizes', label: 'Size System', icon: Target },
    { id: 'usage', label: 'Campus Usage', icon: Users },
    { id: 'accessibility', label: 'Accessibility', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Award className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Badge System
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Status & Classification Component
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The foundational status indicator system that provides clear, meaningful information across the HIVE platform. 
            Every badge serves University at Buffalo campus scenarios with semantic consistency.
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
          {activeSection === 'variants' && <BadgeVariantsShowcase />}
          {activeSection === 'campus' && <CampusBadgeShowcase />}
          {activeSection === 'sizes' && <BadgeSizesShowcase />}
          {activeSection === 'usage' && <CampusUsageShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Technical Information */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Zap className="w-5 h-5" />
              Badge System Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Component Features
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• 7 semantic variants for different contexts</div>
                  <div>• 3 size options for various use cases</div>
                  <div>• Icon integration with proper spacing</div>
                  <div>• Interactive and static badge support</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Accessibility
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Screen reader semantic labeling</div>
                  <div>• High contrast mode compatibility</div>
                  <div>• Keyboard navigation support</div>
                  <div>• WCAG 2.1 AA compliance</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Campus Integration
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• University at Buffalo context awareness</div>
                  <div>• Academic and social scenario optimization</div>
                  <div>• Brand-consistent styling and colors</div>
                  <div>• Mobile campus usage optimization</div>
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

export const BadgeSystemShowcaseStory: Story = {
  render: () => <BadgeSystemShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Badge System showcase with variants, campus categories, sizes, usage scenarios, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const BadgeVariants: Story = {
  render: () => <BadgeVariantsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'All badge variants including default, primary, secondary, success, warning, error, and info with campus usage examples.'
      }
    }
  }
};

export const CampusBadgeCategories: Story = {
  render: () => <CampusBadgeShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific badge categories for academic, social, services, events, platform status, and personal interests.'
      }
    }
  }
};

export const BadgeSizes: Story = {
  render: () => <BadgeSizesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Badge size system with small, medium, and large options for different campus usage contexts.'
      }
    }
  }
};

export const CampusUsageScenarios: Story = {
  render: () => <CampusUsageShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world campus usage scenarios showing badges in student profiles, events, buildings, and course enrollment contexts.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Badge accessibility features including screen reader support, high contrast mode, and interactive badge patterns.'
      }
    }
  }
};

// Individual badge examples
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </Badge>
      <Badge variant="primary">
        <Star className="w-3 h-3 mr-1" />
        Featured
      </Badge>
      <Badge variant="warning">
        <Clock className="w-3 h-3 mr-1" />
        Due Soon
      </Badge>
      <Badge variant="info">
        <Users className="w-3 h-3 mr-1" />
        12 Members
      </Badge>
    </div>
  ),
};

export const AcademicBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">
        <GraduationCap className="w-3 h-3 mr-1" />
        Senior
      </Badge>
      <Badge variant="success">
        <Award className="w-3 h-3 mr-1" />
        Dean's List
      </Badge>
      <Badge variant="info">
        <Code className="w-3 h-3 mr-1" />
        Computer Science
      </Badge>
      <Badge variant="secondary">
        <BookOpen className="w-3 h-3 mr-1" />
        Study Leader
      </Badge>
    </div>
  ),
};