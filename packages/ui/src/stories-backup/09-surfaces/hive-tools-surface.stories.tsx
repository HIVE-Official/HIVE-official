import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveToolsSurface } from '../../components/surfaces/hive-tools-surface';

/**
 * # HiveToolsSurface - Campus Tool Hub
 * 
 * The HiveToolsSurface is a specialized surface component that showcases and manages
 * campus tools within HIVE Spaces. It provides both social discovery and utility
 * functionality for student-created tools.
 * 
 * ## Social Media Features
 * - Tool discovery and recommendations
 * - Community ratings and reviews
 * - Tool sharing and collaboration
 * - Usage analytics and popularity
 * 
 * ## Utility Features  
 * - Tool launching and management
 * - Category filtering and search
 * - Installation and deployment
 * - Tool creation workflows
 * 
 * ## Campus Integration
 * Designed for surface-level interactions that combine social tool discovery
 * with practical utility deployment, making campus tools more accessible and social.
 */

const meta: Meta<typeof HiveToolsSurface> = {
  title: '09-Surfaces/HiveToolsSurface',
  component: HiveToolsSurface,
  parameters: {
    docs: {
      description: {
        component: `
# HiveToolsSurface - Campus Tool Management

This surface component exemplifies HIVE's social media + utility platform approach for tool management:

## Social Media Integration
- Tool discovery and recommendations
- Community ratings and reviews
- Social sharing and collaboration
- Usage analytics and trends

## Campus Utility Features
- Tool launching and management
- Category filtering and search  
- Installation workflows
- Creation and deployment tools

## Student Engagement Patterns
- Peer tool recommendations
- Collaborative tool development
- Campus-specific tool creation
- Academic productivity enhancement

The HiveToolsSurface ensures every tool interaction serves both social discovery and academic utility.
        `
      }
    },
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tools data for stories
const sampleTools = [
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Track your academic progress with advanced GPA calculations',
    category: 'academic' as const,
    status: 'active' as const,
    createdBy: 'Sarah Chen',
    usageCount: 1247,
    rating: 4.8,
    lastUsed: '2 hours ago',
    tags: ['academics', 'grades', 'tracking'],
    isInstalled: true,
    isFavorite: true
  },
  {
    id: 'study-scheduler',
    name: 'Study Session Scheduler',
    description: 'Coordinate study groups and manage your study schedule',
    category: 'productivity' as const,
    status: 'active' as const,
    createdBy: 'Alex Rodriguez',
    usageCount: 892,
    rating: 4.6,
    lastUsed: '1 day ago',
    tags: ['scheduling', 'study-groups', 'productivity'],
    isInstalled: true,
    isFavorite: false
  },
  {
    id: 'campus-navigator',
    name: 'Campus Navigator',
    description: 'Find your way around campus with interactive maps',
    category: 'utility' as const,
    status: 'active' as const,
    createdBy: 'Jordan Kim',
    usageCount: 2156,
    rating: 4.9,
    lastUsed: '30 minutes ago',
    tags: ['navigation', 'maps', 'campus'],
    isInstalled: false,
    isFavorite: true
  },
  {
    id: 'grade-tracker',
    name: 'Grade Tracker Pro',
    description: 'Advanced grade tracking with predictive analytics',
    category: 'academic' as const,
    status: 'beta' as const,
    createdBy: 'Maya Patel',
    usageCount: 445,
    rating: 4.3,
    lastUsed: 'Never',
    tags: ['grades', 'analytics', 'prediction'],
    isInstalled: false,
    isFavorite: false
  },
  {
    id: 'dorm-laundry',
    name: 'Dorm Laundry Tracker',
    description: 'Track laundry machine availability in real-time',
    category: 'utility' as const,
    status: 'active' as const,
    createdBy: 'Casey Johnson',
    usageCount: 634,
    rating: 4.4,
    lastUsed: '3 hours ago',
    tags: ['dorm', 'laundry', 'tracking'],
    isInstalled: true,
    isFavorite: false
  },
  {
    id: 'meal-planner',
    name: 'Campus Meal Planner',
    description: 'Plan your meals and track dining hall hours',
    category: 'lifestyle' as const,
    status: 'active' as const,
    createdBy: 'Riley Torres',
    usageCount: 789,
    rating: 4.2,
    lastUsed: '5 hours ago',
    tags: ['dining', 'nutrition', 'planning'],
    isInstalled: false,
    isFavorite: false
  }
];

// 1. DEFAULT STORY - Active tools surface
export const Default: Story = {
  args: {
    tools: sampleTools,
    isLoading: false,
    spaceId: 'cs-tools-space',
    canCreateTools: true
  }
};

// 2. PLAYGROUND STORY - Interactive controls  
export const Playground: Story = {
  args: {
    tools: sampleTools,
    isLoading: false,
    spaceId: 'interactive-space',
    canCreateTools: true,
    onToolClick: (toolId) => console.log('Tool clicked:', toolId),
    onInstallTool: (toolId) => console.log('Install tool:', toolId),
    onFavoriteTool: (toolId) => console.log('Favorite tool:', toolId),
    onCreateTool: () => console.log('Create new tool'),
    onViewAllTools: () => console.log('View all tools')
  }
};

// 3. LOADING STATE STORY
export const Loading: Story = {
  args: {
    tools: [],
    isLoading: true,
    spaceId: 'loading-space',
    canCreateTools: true
  }
};

// 4. EMPTY STATE STORY - No tools available
export const Empty: Story = {
  args: {
    tools: [],
    isLoading: false,
    spaceId: 'empty-space',
    canCreateTools: true
  }
};

// 5. READ ONLY STORY - Cannot create tools
export const ReadOnly: Story = {
  args: {
    tools: sampleTools.slice(0, 3),
    isLoading: false,
    spaceId: 'readonly-space',
    canCreateTools: false
  }
};

// 6. FILTERED CATEGORIES STORY - Different tool categories
export const FilteredCategories: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Tools by Category
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different categories of campus tools
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-[var(--hive-brand-primary)] mb-4">Academic Tools</h3>
          <HiveToolsSurface 
            tools={sampleTools.filter(tool => tool.category === 'academic')}
            isLoading={false}
            spaceId="academic-space" 
            canCreateTools={true}
          />
        </div>
        
        <div>
          <h3 className="font-semibold text-[var(--hive-brand-primary)] mb-4">Utility Tools</h3>
          <HiveToolsSurface 
            tools={sampleTools.filter(tool => tool.category === 'utility')}
            isLoading={false}
            spaceId="utility-space"
            canCreateTools={true}
          />
        </div>
        
        <div>
          <h3 className="font-semibold text-[var(--hive-brand-primary)] mb-4">Productivity Tools</h3>
          <HiveToolsSurface 
            tools={sampleTools.filter(tool => tool.category === 'productivity')}
            isLoading={false}
            spaceId="productivity-space"
            canCreateTools={true}
          />
        </div>
      </div>
    </div>
  )
};

// 7. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How different campus groups use the tools surface
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Computer Science Study Group</h3>
          <HiveToolsSurface 
            tools={[
              sampleTools[0], // GPA Calculator
              sampleTools[1], // Study Scheduler  
              sampleTools[3], // Grade Tracker
              {
                id: 'code-reviewer',
                name: 'Code Review Helper',
                description: 'Peer code review and feedback system',
                category: 'academic' as const,
                status: 'active' as const,
                createdBy: 'CS Study Group',
                usageCount: 156,
                rating: 4.7,
                lastUsed: '1 hour ago',
                tags: ['coding', 'review', 'collaboration'],
                isInstalled: true,
                isFavorite: true
              }
            ]}
            isLoading={false}
            spaceId="cs-study-group"
            canCreateTools={true}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Dorm Floor Community</h3>
          <HiveToolsSurface 
            tools={[
              sampleTools[2], // Campus Navigator
              sampleTools[4], // Dorm Laundry
              sampleTools[5], // Meal Planner
              {
                id: 'event-planner',
                name: 'Floor Event Planner',
                description: 'Plan and coordinate dorm floor events',
                category: 'social' as const,
                status: 'active' as const,
                createdBy: 'Floor 3B',
                usageCount: 89,
                rating: 4.5,
                lastUsed: '2 days ago',
                tags: ['events', 'social', 'coordination'],
                isInstalled: true,
                isFavorite: false
              }
            ]}
            isLoading={false}
            spaceId="dorm-floor-3b"
            canCreateTools={true}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Engineering Club</h3>
          <HiveToolsSurface 
            tools={[
              {
                id: 'circuit-simulator',
                name: 'Circuit Simulator',
                description: 'Simulate and design electronic circuits',
                category: 'academic' as const,
                status: 'active' as const,
                createdBy: 'Engineering Club',
                usageCount: 234,
                rating: 4.8,
                lastUsed: '4 hours ago',
                tags: ['circuits', 'simulation', 'engineering'],
                isInstalled: true,
                isFavorite: true
              },
              {
                id: 'project-tracker',
                name: 'Project Tracker',
                description: 'Track engineering project progress',
                category: 'productivity' as const,
                status: 'active' as const,
                createdBy: 'Engineering Club',
                usageCount: 167,
                rating: 4.4,
                lastUsed: '1 day ago',
                tags: ['projects', 'tracking', 'collaboration'],
                isInstalled: false,
                isFavorite: false
              }
            ]}
            isLoading={false}
            spaceId="engineering-club"
            canCreateTools={false} // Read-only for non-members
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">New Student Space</h3>
          <HiveToolsSurface 
            tools={[]}
            isLoading={false}
            spaceId="new-student-orientation"
            canCreateTools={false}
          />
        </div>
      </div>
    </div>
  )
};

// 8. TOOL STATES STORY - Different tool statuses
export const ToolStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Tool States and Status
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different states tools can be in
        </p>
      </div>
      
      <HiveToolsSurface 
        tools={[
          {
            ...sampleTools[0],
            status: 'active' as const,
            name: 'Active Tool'
          },
          {
            ...sampleTools[1], 
            status: 'beta' as const,
            name: 'Beta Tool'
          },
          {
            ...sampleTools[2],
            status: 'deprecated' as const, 
            name: 'Deprecated Tool'
          },
          {
            ...sampleTools[3],
            status: 'maintenance' as const,
            name: 'Under Maintenance'
          }
        ]}
        isLoading={false}
        spaceId="tool-states-demo"
        canCreateTools={true}
      />
    </div>
  )
};

// 9. RESPONSIVE STORY - Mobile-first behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Mobile-first tools surface design
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile simulation */}
        <div className="lg:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (Compact cards)</h3>
            <HiveToolsSurface 
              tools={sampleTools.slice(0, 3)}
              isLoading={false}
              spaceId="mobile-demo"
              canCreateTools={true}
            />
          </div>
        </div>
        
        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Full layout)</h3>
            <HiveToolsSurface 
              tools={sampleTools}
              isLoading={false}
              spaceId="desktop-demo"
              canCreateTools={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
};