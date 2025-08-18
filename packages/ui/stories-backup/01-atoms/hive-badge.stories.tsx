import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveBadge } from '../../components/hive-badge';
import { Star, Shield, Zap, Award, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * # HiveBadge - Campus Status & Recognition
 * 
 * The HiveBadge atom is the foundational status and recognition component in the HIVE Design System.
 * It provides consistent, accessible status indicators for all campus interactions with
 * premium aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium glass morphism with backdrop blur
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants for different contexts
 * - Size variations from xs to xl
 * - Icon support for enhanced meaning
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized recognition patterns
 * 
 * ## Usage
 * Perfect for campus status indicators - from student achievements and course tags
 * to tool categories, space types, and academic progress markers.
 */

const meta: Meta<typeof HiveBadge> = {
  title: '01-Atoms/HiveBadge',
  component: HiveBadge,
  parameters: {
    docs: {
      description: {
        component: `
# HiveBadge Component

The foundational status and recognition component for all HIVE campus indicators, featuring premium glass morphism aesthetics.

## Design Philosophy
- **Recognition First**: Built for campus achievements and status
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic contexts
- **Accessible**: WCAG 2.1 AA compliant
- **Versatile**: Multiple variants and sizes

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Icon integration system
- Semantic color mapping
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['freshman', 'sophomore', 'junior', 'senior', 'grad', 'phd', 'tool-newbie', 'tool-builder', 'tool-expert', 'tool-legend', 'deans-list', 'honors', 'course-tag', 'skill-tag', 'active-tag'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      description: 'Size of the badge'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus badge
export const Default: Story = {
  args: {
    children: 'Computer Science'
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'course-tag',
    size: 'default',
    children: 'Interactive Badge'
  }
};

// 3. ALL VARIANTS STORY - Complete variant showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Badge Variants
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different styles for various campus contexts
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Freshman</h3>
          <HiveBadge variant="freshman">Freshman</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Sophomore</h3>
          <HiveBadge variant="sophomore">Sophomore</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Senior</h3>
          <HiveBadge variant="senior">Senior</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Tool Builder</h3>
          <HiveBadge variant="tool-builder">Tool Builder</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Tool Legend</h3>
          <HiveBadge variant="tool-legend">Tool Legend</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Dean's List</h3>
          <HiveBadge variant="deans-list">Dean's List</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Skill Tag</h3>
          <HiveBadge variant="skill-tag">React</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Active Tag</h3>
          <HiveBadge variant="active-tag">Online</HiveBadge>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Course Tag</h3>
          <HiveBadge variant="course-tag">CS 101</HiveBadge>
        </div>
      </div>
    </div>
  )
};

// 4. ALL SIZES STORY - Size variations
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Badge Sizes
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different sizes for various interface needs
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="text-center space-y-2">
          <p className="text-xs text-[var(--hive-text-secondary)]">Extra Small</p>
          <HiveBadge size="xs">XS</HiveBadge>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-[var(--hive-text-secondary)]">Small</p>
          <HiveBadge size="sm">Small</HiveBadge>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-[var(--hive-text-secondary)]">Default</p>
          <HiveBadge size="default">Default</HiveBadge>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-[var(--hive-text-secondary)]">Large</p>
          <HiveBadge size="lg">Large</HiveBadge>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-[var(--hive-text-secondary)]">Extra Large</p>
          <HiveBadge size="xl">Extra Large</HiveBadge>
        </div>
      </div>
    </div>
  )
};

// 5. WITH ICONS STORY - Icon combinations
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Icon Integration
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Common campus badge patterns with icons
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <HiveBadge variant="deans-list" className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          Dean's List
        </HiveBadge>
        
        <HiveBadge variant="tool-legend" className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Tool Legend
        </HiveBadge>
        
        <HiveBadge variant="honors" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Honors
        </HiveBadge>
        
        <HiveBadge variant="finals-week" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Finals Week
        </HiveBadge>
        
        <HiveBadge variant="active-tag" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Active
        </HiveBadge>
        
        <HiveBadge variant="campus-legend" className="flex items-center gap-1">
          <Award className="h-3 w-3" />
          Campus Legend
        </HiveBadge>
        
        <HiveBadge variant="study-group-mvp" className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          Study MVP
        </HiveBadge>
        
        <HiveBadge variant="skill-tag" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          React
        </HiveBadge>
      </div>
    </div>
  )
};

// 6. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus situations where badges are used
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Student Achievements</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge variant="deans-list" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                Dean's List
              </HiveBadge>
              <HiveBadge variant="tool-legend" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Tool Legend
              </HiveBadge>
              <HiveBadge variant="perfect-gpa" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                Perfect GPA
              </HiveBadge>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Course Tags</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge variant="course-tag">CS 101</HiveBadge>
              <HiveBadge variant="course-tag">MATH 250</HiveBadge>
              <HiveBadge variant="course-tag">PHYS 201</HiveBadge>
              <HiveBadge variant="course-tag">ENG 105</HiveBadge>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Skills & Interests</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge variant="skill-tag">React</HiveBadge>
              <HiveBadge variant="skill-tag">Python</HiveBadge>
              <HiveBadge variant="skill-tag">Machine Learning</HiveBadge>
              <HiveBadge variant="skill-tag">Web Design</HiveBadge>
              <HiveBadge variant="skill-tag">Data Science</HiveBadge>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Assignment Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                <span className="text-sm">Calculus Homework</span>
                <HiveBadge variant="honors" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Submitted
                </HiveBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                <span className="text-sm">Physics Lab Report</span>
                <HiveBadge variant="project-due" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due Tomorrow
                </HiveBadge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                <span className="text-sm">Programming Project</span>
                <HiveBadge variant="finals-week" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Overdue
                </HiveBadge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Space Types</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge variant="study-buddy" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Study Group
              </HiveBadge>
              <HiveBadge variant="active-tag">Course Space</HiveBadge>
              <HiveBadge variant="campus-legend">Dorm Floor</HiveBadge>
              <HiveBadge variant="skill-tag">Club</HiveBadge>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">User Roles</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge variant="active-tag" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Moderator
              </HiveBadge>
              <HiveBadge variant="ta-approved">TA</HiveBadge>
              <HiveBadge variant="group-leader">Team Lead</HiveBadge>
              <HiveBadge variant="skill-tag">Member</HiveBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. RESPONSIVE STORY - Mobile-first behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Mobile-first badge design for campus devices
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile (current on small screens) */}
        <div className="md:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (Compact badges)</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge size="sm">CS</HiveBadge>
              <HiveBadge size="sm" variant="honors">✓</HiveBadge>
              <HiveBadge size="sm" variant="project-due">!</HiveBadge>
            </div>
          </div>
        </div>
        
        {/* Desktop (current on larger screens) */}
        <div className="hidden md:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Full badges)</h3>
            <div className="flex flex-wrap gap-2">
              <HiveBadge>Computer Science</HiveBadge>
              <HiveBadge variant="honors">Completed</HiveBadge>
              <HiveBadge variant="project-due">Due Soon</HiveBadge>
            </div>
          </div>
        </div>
        
        {/* All sizes demonstration */}
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Responsive Size Adaptation</h3>
          <div className="flex flex-wrap gap-2">
            <HiveBadge className="sm:text-sm">Adaptive Text</HiveBadge>
            <HiveBadge variant="deans-list" className="sm:px-3 sm:py-1">Enhanced Desktop</HiveBadge>
          </div>
        </div>
      </div>
    </div>
  )
};