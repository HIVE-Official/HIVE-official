/**
 * GRID & LAYOUT SYSTEM - HIVE RESPONSIVE ARCHITECTURE
 * 
 * Comprehensive layout system that creates consistent, responsive interfaces
 * optimized for University at Buffalo campus usage across all device types.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Grid3X3,
  Smartphone,
  Tablet,
  Monitor,
  Layout,
  Maximize,
  Move,
  Layers,
  Ruler,
  AlignCenter,
  AlignLeft,
  AlignRight,
  LayoutGrid,
  Columns,
  Rows,
  Square
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '📐 01-Foundation/Grid & Layout System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 📐 Grid & Layout System - HIVE Responsive Architecture

**Consistent, responsive layout system designed for University at Buffalo campus device diversity**

HIVE's grid and layout system provides the structural foundation for all campus interfaces, ensuring consistent, accessible, and responsive experiences across the wide variety of devices students use—from smartphones during quick between-class interactions to desktop computers during intensive study sessions.

## 🎯 LAYOUT DESIGN PHILOSOPHY

### **Campus-First Responsive Design**
- **Mobile-First Approach** - Every interface starts with mobile optimization
- **Device Diversity Awareness** - Accommodation for older phones, various screen sizes
- **Context-Aware Layouts** - Different layouts for different campus usage scenarios
- **Performance Priority** - Efficient layouts that work on slower campus WiFi

### **University Usage Scenarios**
- **Between Classes (Mobile)** - Single-column, thumb-accessible layouts
- **Study Sessions (Desktop)** - Multi-column, information-dense layouts
- **Group Work (Tablet)** - Collaborative-friendly, shareable interfaces
- **Public Spaces (Various)** - Adaptable layouts for varying screen orientations

## 📱 RESPONSIVE BREAKPOINT SYSTEM

### **Breakpoint Architecture**
- **Mobile (320px - 767px)** - Primary campus usage, between-class scenarios
- **Tablet (768px - 1023px)** - Study groups, collaborative work, presentation mode
- **Desktop (1024px - 1439px)** - Personal study, tool creation, administrative tasks
- **Large Desktop (1440px+)** - Advanced workflows, multi-tasking, admin dashboards

### **Campus Context Breakpoints**
- **Pocket Mobile (320px - 479px)** - One-handed usage while walking
- **Standard Mobile (480px - 767px)** - Two-handed mobile interaction
- **Study Tablet (768px - 1023px)** - Library and residence hall study
- **Campus Desktop (1024px+)** - Computer labs, personal workstations

## 🏗️ GRID SYSTEM ARCHITECTURE

### **12-Column Flexible Grid**
- **Base Unit** - 12-column system with flexible gutters
- **Column Flexibility** - Supports 1, 2, 3, 4, 6, and 12 column layouts
- **Responsive Columns** - Automatic column adjustment across breakpoints
- **Nested Grids** - Support for complex, nested layout structures

### **Grid Variations by Usage**
- **Content Grid** - Standard 12-column for general content layouts
- **Form Grid** - Optimized column ratios for campus forms and data entry
- **Dashboard Grid** - Flexible card-based layouts for analytics and overviews
- **Gallery Grid** - Photo and media optimized with aspect ratio preservation

## 📏 SPACING & ALIGNMENT SYSTEM

### **Consistent Spacing Scale**
- **Base Unit** - 4px for precise, scalable spacing
- **Container Padding** - 16px mobile, 24px tablet, 32px desktop
- **Section Spacing** - 24px mobile, 32px tablet, 48px desktop
- **Component Spacing** - 8px, 16px, 24px for internal component structure

### **Campus Layout Patterns**
- **Header Zones** - Consistent navigation and branding areas
- **Content Zones** - Main content areas with appropriate max-widths
- **Sidebar Zones** - Secondary navigation and contextual information
- **Footer Zones** - Campus-appropriate links and information

## 🎨 LAYOUT COMPONENT PATTERNS

### **Container Systems**
- **Full Width** - Edge-to-edge layouts for immersive experiences
- **Constrained Width** - Readable content widths (max 1200px)
- **Fluid Width** - Responsive containers that grow with viewport
- **Fixed Width** - Specific width containers for precise control

### **Content Organization Patterns**
- **Single Column** - Mobile-optimized, linear content flow
- **Two Column** - Desktop content with sidebar for navigation/context
- **Three Column** - Advanced desktop layouts for complex information
- **Card Grid** - Flexible card layouts for campus content discovery

### **Campus-Specific Layouts**
- **Feed Layout** - Optimized for social content consumption
- **Dashboard Layout** - Personal command center with widget organization
- **Directory Layout** - Space and tool browsing with filtering
- **Profile Layout** - Personal identity and campus connection showcase

## 📱 MOBILE CAMPUS OPTIMIZATION

### **Touch-First Design Principles**
- **44px Minimum Touch Targets** - Accessible interaction areas
- **Thumb Zone Optimization** - Critical actions within easy thumb reach
- **Swipe Gesture Support** - Natural mobile navigation patterns
- **Orientation Flexibility** - Layouts work in portrait and landscape

### **Between-Class Mobile Patterns**
- **Quick Scan Layouts** - Information organized for rapid consumption
- **One-Handed Operations** - All features accessible with single hand
- **Minimal Cognitive Load** - Simple, focused information hierarchy
- **Fast Loading** - Efficient layouts that load quickly on campus WiFi

### **Study Session Mobile Patterns**
- **Extended Engagement** - Layouts suitable for longer mobile sessions
- **Multi-Task Support** - Ability to switch between multiple campus workflows
- **Content Creation** - Mobile-optimized layouts for posting and tool creation
- **Collaboration Features** - Mobile layouts for group coordination

## 🖥️ DESKTOP CAMPUS OPTIMIZATION

### **Multi-Tasking Support**
- **Side Panel Layouts** - Multiple information streams simultaneously
- **Modal Overlays** - Non-disruptive secondary workflows
- **Split Screen Support** - Coordinate multiple campus activities
- **Keyboard Navigation** - Complete keyboard accessibility for all layouts

### **Study Productivity Layouts**
- **Tool Creation Interfaces** - Multi-panel layouts for building campus tools
- **Research Layouts** - Information comparison and analysis interfaces
- **Administrative Dashboards** - Campus management and oversight interfaces
- **Collaboration Workspaces** - Group project and coordination interfaces

## ♿ ACCESSIBILITY IN LAYOUT DESIGN

### **Layout Accessibility Standards**
- **Semantic HTML Structure** - Proper heading hierarchy and landmarks
- **Skip Navigation Links** - Quick access to main content areas
- **Focus Management** - Logical focus order through layout elements
- **Screen Reader Optimization** - Layout structures that work with assistive technology

### **Campus Accessibility Considerations**
- **Learning Difference Support** - Layouts that reduce cognitive load
- **Visual Impairment Support** - High contrast, scalable layout elements
- **Motor Accessibility** - Layouts optimized for various input methods
- **Cognitive Load Management** - Information architecture that supports understanding

## 🔧 TECHNICAL IMPLEMENTATION

### **CSS Grid and Flexbox Integration**
- **CSS Grid** - For major page layout and complex grid structures
- **Flexbox** - For component-level alignment and flexible arrangements
- **CSS Custom Properties** - Dynamic spacing and responsive adjustments
- **Container Queries** - Component-responsive design where supported

### **Performance Optimizations**
- **Layout Shift Prevention** - Stable layouts that minimize CLS
- **Efficient Rendering** - Layouts optimized for paint and composite performance
- **Memory Efficiency** - Minimal DOM complexity for older campus devices
- **Network Awareness** - Layout adaptations for varying connection quality

### **Framework Integration**
- **Tailwind CSS** - Utility-first responsive design implementation
- **CSS Variables** - Dynamic theming and spacing adjustments
- **Component Libraries** - Reusable layout components for consistent implementation
- **Design Tokens** - Systematic spacing and layout value management

## 📊 LAYOUT TESTING STANDARDS

### **Responsive Testing**
- **Device Testing** - Real device testing across campus device diversity
- **Viewport Testing** - Comprehensive breakpoint testing and validation
- **Orientation Testing** - Portrait and landscape layout verification
- **Performance Testing** - Layout performance across device capabilities

### **Accessibility Testing**
- **Screen Reader Testing** - Layout navigation with assistive technology
- **Keyboard Navigation** - Complete layout accessibility via keyboard
- **Focus Management** - Testing focus order and focus visibility
- **Cognitive Load Testing** - Usability testing with diverse cognitive abilities

### **Campus Usage Testing**
- **Real Environment Testing** - Testing layouts in actual campus environments
- **Multi-Device Workflows** - Testing cross-device layout consistency
- **Network Condition Testing** - Layout behavior on varying campus WiFi
- **Battery Impact Testing** - Layout efficiency on mobile devices

## 🎓 CAMPUS LAYOUT CONSIDERATIONS

### **Academic Calendar Integration**
- **Semester Layouts** - Different layout priorities during academic periods
- **Finals Week Optimization** - Layouts optimized for high-stress periods
- **Break Period Adaptations** - Layouts for reduced campus activity
- **Event-Based Layouts** - Special layouts for campus events and activities

### **Campus Physical Environment**
- **Outdoor Usage** - High contrast layouts for outdoor screen visibility
- **Library Layouts** - Quiet, focused layouts for study environments
- **Common Area Layouts** - Social, collaborative layouts for shared spaces
- **Residence Hall Layouts** - Personal and community-focused layout patterns
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
// GRID SYSTEM DATA
// =============================================================================

const breakpoints = [
  { name: 'Mobile', range: '320px - 767px', usage: 'Between-class, one-handed usage', columns: '1-2', icon: Smartphone },
  { name: 'Tablet', range: '768px - 1023px', usage: 'Study groups, collaborative work', columns: '2-3', icon: Tablet },
  { name: 'Desktop', range: '1024px - 1439px', usage: 'Personal study, tool creation', columns: '3-4', icon: Monitor },
  { name: 'Large', range: '1440px+', usage: 'Advanced workflows, admin dashboards', columns: '4+', icon: Maximize }
];

const gridPatterns = [
  {
    name: 'Single Column',
    columns: 1,
    usage: 'Mobile-first, linear content',
    devices: ['Mobile'],
    description: 'Optimized for between-class mobile usage'
  },
  {
    name: 'Two Column',
    columns: 2,
    usage: 'Content + sidebar navigation',
    devices: ['Tablet', 'Desktop'],
    description: 'Study sessions with contextual information'
  },
  {
    name: 'Three Column',
    columns: 3,
    usage: 'Complex information layouts',
    devices: ['Desktop', 'Large'],
    description: 'Administrative and advanced tool interfaces'
  },
  {
    name: 'Card Grid',
    columns: 'flexible',
    usage: 'Content discovery, space browsing',
    devices: ['Mobile', 'Tablet', 'Desktop'],
    description: 'Responsive card layouts for campus content'
  }
];

const campusLayouts = [
  {
    name: 'Feed Layout',
    description: 'Social content consumption with engagement',
    mobile: '1 column, full width posts',
    tablet: '2 columns, main feed + sidebar',
    desktop: '3 columns, feed + navigation + contextual'
  },
  {
    name: 'Dashboard Layout',
    description: 'Personal command center with widgets',
    mobile: '1 column, stacked widgets',
    tablet: '2x4 grid, compact widgets',
    desktop: '4x2 grid, expanded widgets'
  },
  {
    name: 'Directory Layout',
    description: 'Space and tool browsing with filters',
    mobile: '1 column, stacked cards',
    tablet: '2 columns, cards + filters',
    desktop: '3 columns, filters + grid + details'
  },
  {
    name: 'Profile Layout',
    description: 'Personal identity and campus connections',
    mobile: '1 column, linear profile sections',
    tablet: '2 columns, profile + activity',
    desktop: '3 columns, profile + activity + connections'
  }
];

// =============================================================================
// INTERACTIVE LAYOUT COMPONENTS
// =============================================================================

const ResponsiveDemo = () => {
  const [activeBreakpoint, setActiveBreakpoint] = useState('Mobile');
  
  const getGridColumns = () => {
    switch (activeBreakpoint) {
      case 'Mobile':
        return 'grid-cols-1';
      case 'Tablet':
        return 'grid-cols-2';
      case 'Desktop':
        return 'grid-cols-3';
      case 'Large':
        return 'grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  const getContainerWidth = () => {
    switch (activeBreakpoint) {
      case 'Mobile':
        return 'max-w-sm';
      case 'Tablet':
        return 'max-w-2xl';
      case 'Desktop':
        return 'max-w-4xl';
      case 'Large':
        return 'max-w-6xl';
      default:
        return 'max-w-sm';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Responsive Breakpoint System
      </h3>
      
      {/* Breakpoint Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {breakpoints.map((breakpoint) => (
          <Button
            key={breakpoint.name}
            variant={activeBreakpoint === breakpoint.name ? 'primary' : 'secondary'}
            onClick={() => setActiveBreakpoint(breakpoint.name)}
            className="flex items-center gap-2"
          >
            <breakpoint.icon className="w-4 h-4" />
            {breakpoint.name}
          </Button>
        ))}
      </div>

      {/* Responsive Demo */}
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Layout className="w-5 h-5" />
            Campus Space Discovery Layout - {activeBreakpoint}
          </CardTitle>
          <div className="text-sm text-[var(--hive-text-secondary)]">
            {breakpoints.find(b => b.name === activeBreakpoint)?.usage}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`mx-auto ${getContainerWidth()}`}>
            <div className={`grid ${getGridColumns()} gap-4`}>
              {/* Main Content */}
              <div className={`${activeBreakpoint === 'Mobile' ? 'col-span-1' : 'col-span-1'} space-y-4`}>
                <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                  <div className="font-medium text-[var(--hive-text-primary)] mb-2">UB CSE Study Group</div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-3">
                    Computer Science students collaborating on projects
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Academic</Badge>
                    <Badge variant="outline" className="text-xs">147 members</Badge>
                  </div>
                </div>
                
                {activeBreakpoint === 'Mobile' && (
                  <>
                    <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                      <div className="font-medium text-[var(--hive-text-primary)] mb-2">Ellicott Floor 3</div>
                      <div className="text-sm text-[var(--hive-text-secondary)] mb-3">
                        Third floor community coordination
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Residential</Badge>
                        <Badge variant="outline" className="text-xs">28 members</Badge>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-3">
                      <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Quick Filters</div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Academic</Badge>
                        <Badge variant="outline" className="text-xs">Social</Badge>
                        <Badge variant="outline" className="text-xs">Housing</Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar (Tablet+) */}
              {activeBreakpoint !== 'Mobile' && (
                <div className="space-y-4">
                  <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                    <div className="font-medium text-[var(--hive-text-primary)] mb-3">Space Filters</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                        <input type="checkbox" className="rounded" />
                        Academic Spaces
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                        <input type="checkbox" className="rounded" />
                        Residential Communities
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                        <input type="checkbox" className="rounded" />
                        Social Groups
                      </div>
                    </div>
                  </div>
                  
                  {activeBreakpoint !== 'Tablet' && (
                    <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                      <div className="font-medium text-[var(--hive-text-primary)] mb-3">Recent Activity</div>
                      <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                        <div>Study session planned</div>
                        <div>3 new members joined</div>
                        <div>Event RSVP deadline</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Content (Desktop+) */}
              {activeBreakpoint === 'Desktop' && (
                <div className="space-y-4">
                  <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                    <div className="font-medium text-[var(--hive-text-primary)] mb-2">Economics Study Hub</div>
                    <div className="text-sm text-[var(--hive-text-secondary)] mb-3">
                      Economics majors sharing resources
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Academic</Badge>
                      <Badge variant="outline" className="text-xs">89 members</Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Extra Content (Large+) */}
              {activeBreakpoint === 'Large' && (
                <div className="space-y-4">
                  <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                    <div className="font-medium text-[var(--hive-text-primary)] mb-3">Quick Actions</div>
                    <div className="space-y-2">
                      <Button variant="secondary" size="sm" className="w-full text-xs">
                        Create Space
                      </Button>
                      <Button variant="secondary" size="sm" className="w-full text-xs">
                        Join Suggestions
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-[var(--hive-text-muted)]">
            Current Layout: {breakpoints.find(b => b.name === activeBreakpoint)?.columns} columns • {breakpoints.find(b => b.name === activeBreakpoint)?.range}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GridPatternShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Grid Pattern Library
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gridPatterns.map((pattern, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <Grid3X3 className="w-5 h-5" />
                {pattern.name}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {pattern.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Visual Grid Demo */}
                <div className={`grid gap-2 ${
                  pattern.columns === 1 ? 'grid-cols-1' :
                  pattern.columns === 2 ? 'grid-cols-2' :
                  pattern.columns === 3 ? 'grid-cols-3' :
                  'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {Array.from({ length: pattern.columns === 'flexible' ? 6 : pattern.columns }, (_, i) => (
                    <div key={i} className="bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/40 rounded h-12 flex items-center justify-center text-xs text-[var(--hive-brand-primary)]">
                      Col {i + 1}
                    </div>
                  ))}
                </div>
                
                {/* Pattern Details */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-[var(--hive-text-primary)]">Usage:</span>
                    <span className="text-[var(--hive-text-secondary)] ml-2">{pattern.usage}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pattern.devices.map((device, deviceIndex) => (
                      <Badge key={deviceIndex} variant="outline" className="text-xs">
                        {device}
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

const CampusLayoutsShowcase = () => {
  const [activeLayout, setActiveLayout] = useState('Feed Layout');
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus-Specific Layouts
      </h3>
      
      {/* Layout Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {campusLayouts.map((layout) => (
          <Button
            key={layout.name}
            variant={activeLayout === layout.name ? 'primary' : 'secondary'}
            onClick={() => setActiveLayout(layout.name)}
            size="sm"
          >
            {layout.name}
          </Button>
        ))}
      </div>

      {/* Layout Details */}
      {campusLayouts
        .filter(layout => activeLayout === layout.name)
        .map((layout, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <LayoutGrid className="w-5 h-5" />
                {layout.name}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {layout.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                    <span className="font-medium text-[var(--hive-text-primary)]">Mobile</span>
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {layout.mobile}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tablet className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                    <span className="font-medium text-[var(--hive-text-primary)]">Tablet</span>
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {layout.tablet}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Monitor className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                    <span className="font-medium text-[var(--hive-text-primary)]">Desktop</span>
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {layout.desktop}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

// =============================================================================
// GRID & LAYOUT SYSTEM MAIN COMPONENT
// =============================================================================

const GridLayoutSystem = () => {
  const [activeSection, setActiveSection] = useState('responsive');

  const sections = [
    { id: 'responsive', label: 'Responsive Demo', icon: Layout },
    { id: 'patterns', label: 'Grid Patterns', icon: Grid3X3 },
    { id: 'campus', label: 'Campus Layouts', icon: LayoutGrid }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Grid3X3 className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Grid & Layout System
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Responsive Architecture
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            Comprehensive layout system that creates consistent, responsive interfaces optimized for 
            University at Buffalo campus usage across all device types and usage scenarios.
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
          {activeSection === 'responsive' && <ResponsiveDemo />}
          {activeSection === 'patterns' && <GridPatternShowcase />}
          {activeSection === 'campus' && <CampusLayoutsShowcase />}
        </div>

        {/* Technical Implementation */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Ruler className="w-5 h-5" />
              Technical Implementation Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Columns className="w-4 h-4" />
                  Grid Technologies
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• CSS Grid for major page layouts</div>
                  <div>• Flexbox for component alignment</div>
                  <div>• CSS Custom Properties for spacing</div>
                  <div>• Container Queries for component responsiveness</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Optimization
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• 44px minimum touch targets</div>
                  <div>• Thumb zone optimization</div>
                  <div>• Efficient rendering for older devices</div>
                  <div>• Battery-aware layout choices</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Performance Standards
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Layout shift prevention (CLS)</div>
                  <div>• Efficient paint and composite</div>
                  <div>• Minimal DOM complexity</div>
                  <div>• Network-aware adaptations</div>
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

export const CompleteGridSystem: Story = {
  render: () => <GridLayoutSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete HIVE grid and layout system with responsive breakpoints, grid patterns, and campus-specific layouts optimized for University at Buffalo usage scenarios.'
      }
    }
  }
};

export const ResponsiveBreakpoints: Story = {
  render: () => <ResponsiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of responsive breakpoint system showing how layouts adapt across mobile, tablet, desktop, and large screen sizes.'
      }
    }
  }
};

export const GridPatterns: Story = {
  render: () => <GridPatternShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Grid pattern library showcasing single column, two column, three column, and flexible card grid layouts with campus usage contexts.'
      }
    }
  }
};

export const CampusLayouts: Story = {
  render: () => <CampusLayoutsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific layout patterns including feed, dashboard, directory, and profile layouts optimized for University at Buffalo student workflows.'
      }
    }
  }
};