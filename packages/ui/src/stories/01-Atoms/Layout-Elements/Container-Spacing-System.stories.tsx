import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Layout, Grid, Maximize2, Minimize2, Smartphone, Tablet, Monitor, Users, BookOpen, Calendar, Home } from 'lucide-react';
import { Container } from '../../../components/ui/container';
import { Spacer } from '../../../components/ui/spacer';

const meta: Meta = {
  title: '02-Atoms/Layout-Elements/Container & Spacing System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Container & Spacing System

A comprehensive layout foundation system designed for consistent spacing, containment, and responsive behavior across the HIVE platform. This system ensures University at Buffalo students have a consistent and predictable experience regardless of device or screen size.

## Campus Integration Features
- **Mobile-First Design** - Optimized for on-campus mobile usage patterns
- **Content Hierarchy** - Consistent spacing that supports academic and social content organization
- **Responsive Breakpoints** - Adapts seamlessly from phone to desktop usage scenarios
- **Touch-Friendly Spacing** - Adequate spacing for thumb navigation and touch interactions

## Container Types
- **Page Containers** - Full-width page layouts with proper margins
- **Content Containers** - Constrained width for optimal reading and interaction
- **Card Containers** - Contained spaces for individual content pieces
- **Section Containers** - Logical content groupings with appropriate spacing

## Spacing Scale
- **Micro Spacing** - Element-level spacing for tight component layouts
- **Component Spacing** - Between related UI elements and form fields
- **Section Spacing** - Between logical content groupings and page sections
- **Layout Spacing** - Major layout regions and page-level organization

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Adequate spacing for users with motor disabilities
- **Touch Target Sizing** - Minimum 44px touch targets with appropriate spacing
- **Responsive Design** - Consistent experience across all device sizes
- **Focus Management** - Clear focus indicators with proper spacing
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Spacing Scale Data
const spacingScale = [
  { token: 'space-1', value: '0.25rem', pixels: '4px', usage: 'Tight spacing, small gaps', example: 'Icon to text' },
  { token: 'space-2', value: '0.5rem', pixels: '8px', usage: 'Close elements, form spacing', example: 'Button padding' },
  { token: 'space-3', value: '0.75rem', pixels: '12px', usage: 'Related content spacing', example: 'List items' },
  { token: 'space-4', value: '1rem', pixels: '16px', usage: 'Standard component spacing', example: 'Card padding' },
  { token: 'space-5', value: '1.25rem', pixels: '20px', usage: 'Comfortable spacing', example: 'Section gaps' },
  { token: 'space-6', value: '1.5rem', pixels: '24px', usage: 'Generous spacing', example: 'Content blocks' },
  { token: 'space-8', value: '2rem', pixels: '32px', usage: 'Section separation', example: 'Page sections' },
  { token: 'space-10', value: '2.5rem', pixels: '40px', usage: 'Major layout spacing', example: 'Page margins' },
  { token: 'space-12', value: '3rem', pixels: '48px', usage: 'Page-level spacing', example: 'Header spacing' },
  { token: 'space-16', value: '4rem', pixels: '64px', usage: 'Major visual breaks', example: 'Page hero areas' }
];

// Container Variants
const containerVariants = [
  {
    variant: 'full',
    maxWidth: '100%',
    description: 'Full viewport width',
    usage: 'Hero sections, full-bleed backgrounds',
    example: 'Campus event banners'
  },
  {
    variant: 'screen-2xl',
    maxWidth: '1536px',
    description: 'Extra large screens',
    usage: 'Dashboard layouts, admin interfaces',
    example: 'Admin panels'
  },
  {
    variant: 'screen-xl',
    maxWidth: '1280px',
    description: 'Large desktop screens',
    usage: 'Main content areas, feed layouts',
    example: 'Campus feed, space directories'
  },
  {
    variant: 'screen-lg',
    maxWidth: '1024px',
    description: 'Desktop and laptop screens',
    usage: 'Standard page content, forms',
    example: 'Profile pages, settings'
  },
  {
    variant: 'screen-md',
    maxWidth: '768px',
    description: 'Tablet and small laptop',
    usage: 'Reading content, article layout',
    example: 'Space descriptions, help articles'
  },
  {
    variant: 'screen-sm',
    maxWidth: '640px',
    description: 'Mobile landscape, small tablets',
    usage: 'Mobile-optimized content',
    example: 'Mobile space cards, event details'
  }
];

// Campus Layout Examples
const campusLayoutExamples = [
  {
    context: 'Campus Feed',
    description: 'Social feed layout with posts and interactions',
    components: ['Header (space-4)', 'Feed Container (space-6)', 'Post Cards (space-4)', 'Action Bar (space-2)']
  },
  {
    context: 'Study Group Space',
    description: 'Academic space with member list and resources',
    components: ['Space Header (space-6)', 'Member Grid (space-4)', 'Resource List (space-3)', 'Tools Section (space-8)']
  },
  {
    context: 'Profile Dashboard',
    description: 'Personal dashboard with widgets and stats',
    components: ['Profile Header (space-8)', 'Stats Cards (space-4)', 'Activity Feed (space-6)', 'Quick Actions (space-3)']
  },
  {
    context: 'Event Details',
    description: 'Campus event information and registration',
    components: ['Event Banner (space-0)', 'Event Info (space-6)', 'Registration Form (space-4)', 'Related Events (space-8)']
  }
];

// Spacing Scale Showcase Story
export const SpacingScaleShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">HIVE Spacing Scale</h2>
        <p className="text-lg text-gray-600">Consistent spacing system for University at Buffalo campus platform</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {spacingScale.map((space, index) => (
            <div key={space.token} className="flex items-center gap-6 pb-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4 min-w-[200px]">
                <div 
                  className="bg-blue-500 rounded"
                  style={{ width: space.value, height: space.value, minWidth: '4px', minHeight: '4px' }}
                ></div>
                <div>
                  <div className="font-mono text-sm font-medium text-gray-900">{space.token}</div>
                  <div className="text-xs text-gray-600">{space.pixels} • {space.value}</div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">{space.usage}</div>
                <div className="text-sm text-gray-600">{space.example}</div>
              </div>

              {/* Visual spacing example */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div style={{ width: space.value }}></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

// Container Variants Story
export const ContainerVariants: Story = {
  render: () => (
    <div className="w-full bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Container System</h2>
        <p className="text-lg text-gray-600">Responsive containers for different screen sizes and content types</p>
      </div>

      <div className="space-y-8">
        {containerVariants.map((container, index) => (
          <div key={container.variant} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{container.variant}</h3>
                <div className="text-sm text-gray-600">Max Width: {container.maxWidth}</div>
              </div>
              <p className="text-gray-600 mb-2">{container.description}</p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Usage:</span> {container.usage}
                <span className="ml-4 font-medium">Example:</span> {container.example}
              </div>
            </div>
            
            <div className="p-8 bg-gray-50">
              <Container className={`bg-blue-100 border-2 border-dashed border-blue-300 p-4 mx-auto`} style={{ maxWidth: container.maxWidth }}>
                <div className="text-center text-blue-800">
                  <Layout className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">{container.variant} Container</div>
                  <div className="text-sm opacity-75">Content area with {container.maxWidth} max width</div>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

// Campus Layout Examples Story
export const CampusLayoutExamples: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Layout Patterns</h2>
        <p className="text-lg text-gray-600">Real-world spacing patterns for University at Buffalo platform layouts</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {campusLayoutExamples.map((layout, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {layout.context === 'Campus Feed' && <Home className="h-5 w-5 text-blue-600" />}
                {layout.context === 'Study Group Space' && <BookOpen className="h-5 w-5 text-green-600" />}
                {layout.context === 'Profile Dashboard' && <Users className="h-5 w-5 text-purple-600" />}
                {layout.context === 'Event Details' && <Calendar className="h-5 w-5 text-orange-600" />}
                <h3 className="text-lg font-semibold text-gray-800">{layout.context}</h3>
              </div>
              <p className="text-sm text-gray-600">{layout.description}</p>
            </div>

            <div className="space-y-3">
              {layout.components.map((component, componentIndex) => {
                const [name, spacing] = component.split(' (');
                const spacingValue = spacing?.replace(')', '') || 'space-4';
                
                return (
                  <div key={componentIndex} className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded p-3 text-sm text-gray-700">
                      {name}
                    </div>
                    <div className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {spacingValue}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Visual spacing representation */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-2">Layout Preview:</div>
              <div className="space-y-2">
                {layout.components.map((component, componentIndex) => {
                  const [name, spacing] = component.split(' (');
                  const spacingValue = spacing?.replace(')', '') || 'space-4';
                  const spacingMap = {
                    'space-0': '0',
                    'space-2': '8px',
                    'space-3': '12px', 
                    'space-4': '16px',
                    'space-6': '24px',
                    'space-8': '32px'
                  };
                  
                  return (
                    <div key={componentIndex}>
                      <div className="h-4 bg-gray-300 rounded text-xs flex items-center px-2 text-gray-600">
                        {name}
                      </div>
                      {componentIndex < layout.components.length - 1 && (
                        <div style={{ height: spacingMap[spacingValue as keyof typeof spacingMap] || '16px' }}></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

// Responsive Container Demo Story
export const ResponsiveContainerDemo: Story = {
  render: () => {
    const [selectedBreakpoint, setSelectedBreakpoint] = React.useState('screen-lg');
    
    const breakpoints = [
      { name: 'Mobile', value: 'screen-sm', width: '640px', icon: Smartphone },
      { name: 'Tablet', value: 'screen-md', width: '768px', icon: Tablet },
      { name: 'Desktop', value: 'screen-lg', width: '1024px', icon: Monitor },
      { name: 'Large', value: 'screen-xl', width: '1280px', icon: Maximize2 }
    ];

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Responsive Container Demo</h2>
          <p className="text-lg text-gray-600">Experience how HIVE containers adapt to different screen sizes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Breakpoint Selector */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Breakpoint</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {breakpoints.map((breakpoint) => {
                const IconComponent = breakpoint.icon;
                return (
                  <button
                    key={breakpoint.value}
                    onClick={() => setSelectedBreakpoint(breakpoint.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                      selectedBreakpoint === breakpoint.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{breakpoint.name}</div>
                      <div className="text-xs opacity-75">{breakpoint.width}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Container Preview */}
          <div className="p-8 bg-gray-50">
            <div className="text-center mb-6">
              <h4 className="font-semibold text-gray-800">Campus Feed Layout</h4>
              <p className="text-sm text-gray-600">Container: {selectedBreakpoint}</p>
            </div>

            <Container 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-auto transition-all duration-300"
              style={{ 
                maxWidth: containerVariants.find(c => c.variant === selectedBreakpoint)?.maxWidth || '1024px' 
              }}
            >
              {/* Mock Campus Feed Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Campus Feed</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Your feed</span>
                  </div>
                </div>

                {/* Feed Posts */}
                {[1, 2].map((post) => (
                  <div key={post} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {post === 1 ? 'SG' : 'EC'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {post === 1 ? 'CSE 115 Study Group' : 'Ellicott Complex Floor 3'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {post === 1 ? 'Study session tomorrow at 3pm in Lockwood Library' : 'Pizza order for tonight - reply if interested!'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="hover:text-blue-600">Like</button>
                      <button className="hover:text-blue-600">Comment</button>
                      <button className="hover:text-blue-600">Share</button>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Responsive Design Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Fluid container widths that adapt to screen size</li>
            <li>• Consistent spacing scale across all breakpoints</li>
            <li>• Touch-friendly layouts optimized for mobile campus usage</li>
            <li>• Content hierarchy maintained across device sizes</li>
          </ul>
        </div>
      </div>
    )
  }
};