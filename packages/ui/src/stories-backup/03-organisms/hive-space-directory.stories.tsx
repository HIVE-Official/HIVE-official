import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveSpaceDirectory } from '../../components/hive-space-directory';
import { HiveButton as Button } from '../../components/hive-button';
import { Users, BookOpen, Home, GraduationCap, Building } from 'lucide-react';

/**
 * # HiveSpaceDirectory - Find Your Campus Communities
 * 
 * Browse all the spaces where stuff actually gets done on campus.
 * From study groups that help you pass calc to dorm floors that coordinate
 * everything from laundry schedules to late-night food runs.
 * 
 * ## What You Can Find
 * - Study groups for every class
 * - Dorm floors and residential communities  
 * - Clubs that actually do things
 * - Greek life chapters
 * - Project teams and research groups
 * 
 * ## How It Works
 * Real campus spaces where students coordinate, collaborate, and get things done.
 * Not just discussion forums - actual functional communities.
 */

const mockSpaces = [
  {
    id: '1',
    name: 'CS 101 Study Group',
    description: 'Help each other pass intro computer science',
    category: 'academic',
    memberCount: 12,
    isJoined: true,
    avatar: '/api/placeholder/40/40',
    type: 'study_group' as const
  },
  {
    id: '2', 
    name: 'Floor 3A - Anderson Hall',
    description: 'Third floor crew - laundry schedule, late night snacks, floor events',
    category: 'residential',
    memberCount: 28,
    isJoined: false,
    avatar: '/api/placeholder/40/40',
    type: 'residential' as const
  },
  {
    id: '3',
    name: 'Chemistry Lab Partners',
    description: 'Chem 201 lab group - study sessions and exam prep',
    category: 'academic',
    memberCount: 8,
    isJoined: true,
    avatar: '/api/placeholder/40/40',
    type: 'study_group' as const
  },
  {
    id: '4',
    name: 'Calc 2 Survivors',
    description: 'Making it through Math 152 together',
    category: 'academic',
    memberCount: 15,
    isJoined: false,
    avatar: '/api/placeholder/40/40',
    type: 'study_group' as const
  },
  {
    id: '5',
    name: 'CS Club Tool Builders',
    description: 'Build tools that help other students succeed',
    category: 'clubs',
    memberCount: 23,
    isJoined: false,
    avatar: '/api/placeholder/40/40',
    type: 'club' as const
  }
];

const meta: Meta<typeof HiveSpaceDirectory> = {
  title: '03-Organisms/HiveSpaceDirectory',
  component: HiveSpaceDirectory,
  parameters: {
    docs: {
      description: {
        component: `
# HiveSpaceDirectory - Find Your Campus Communities

Discover spaces where students actually get things done together:

## Real Campus Spaces
- Study groups for every class
- Dorm floors that coordinate everything
- Project teams and research groups
- Clubs that build useful tools

## How Students Use It
- Join study groups for classes you're taking
- Connect with your dorm floor community
- Find project partners and research teams
- Discover clubs that match your interests

## Built for Campus Life
- Mobile-first for walking between classes
- Quick search when you need help fast
- Real member counts and activity
- Authentic student interactions
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list', 'masonry'],
      description: 'Display layout for spaces'
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search interface'
    },
    showFilters: {
      control: 'boolean', 
      description: 'Show filtering options'
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--hive-background-primary)]">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Full directory with all features
export const Default: Story = {
  args: {
    spaces: mockSpaces,
    layout: 'grid',
    showSearch: true,
    showFilters: true
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    spaces: mockSpaces,
    layout: 'grid',
    showSearch: true,
    showFilters: true
  }
};

// 3. CAMPUS SCENARIOS STORY - Real campus usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real situations where students find and join campus spaces
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Finding Study Help</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            "I'm struggling with Calc 2 and need study partners"
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
              <div>
                <span className="font-medium text-sm">Calc 2 Survivors</span>
                <p className="text-xs text-[var(--hive-text-secondary)]">15 members • Study sessions Tues/Thurs</p>
              </div>
              <Button size="sm">Join Group</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
              <div>
                <span className="font-medium text-sm">Math 152 Study Hall</span>
                <p className="text-xs text-[var(--hive-text-secondary)]">8 members • Library study room B</p>
              </div>
              <Button variant="secondary" size="sm">Request to Join</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Dorm Floor Community</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            "Want to connect with people on my floor"
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
              <div>
                <span className="font-medium text-sm">Floor 3A - Anderson Hall</span>
                <p className="text-xs text-[var(--hive-text-secondary)]">28 members • Laundry schedule, events, food runs</p>
              </div>
              <Button size="sm">Join Floor</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
              <div>
                <span className="font-medium text-sm">Floor 2B - Anderson Hall</span>
                <p className="text-xs text-[var(--hive-text-secondary)]">22 members • Movie nights, study groups</p>
              </div>
              <Button variant="ghost" size="sm">Browse Other Floors</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 4. SPACE TYPES STORY - Different types of campus spaces
export const SpaceTypes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Types of Campus Spaces
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different spaces for different needs
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study Groups
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Get help with specific classes and exams
          </p>
          <div className="space-y-2">
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded">
              CS 101 Study Group • 12 members
            </div>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded">
              Chemistry Lab Partners • 8 members
            </div>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded">
              Calc 2 Survivors • 15 members
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Dorm Floors
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Connect with people who live near you
          </p>
          <div className="space-y-2">
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded">
              Floor 3A - Anderson Hall • 28 members
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Project Teams
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Build tools and work on projects together
          </p>
          <div className="space-y-2">
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded">
              CS Club Tool Builders • 23 members
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 5. SEARCH FUNCTIONALITY STORY - Finding the right space
export const SearchFunctionality: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Find Your People
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Search for study groups, dorm floors, and project teams
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium text-[var(--hive-text-primary)] mb-3">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="chip" size="sm">calculus study group</Button>
          <Button variant="chip" size="sm">cs 101 help</Button>
          <Button variant="chip" size="sm">chemistry lab</Button>
          <Button variant="chip" size="sm">dorm floor 3a</Button>
        </div>
        
        <HiveSpaceDirectory 
          spaces={mockSpaces} 
          layout="list"
          showSearch={true}
          showFilters={false}
          placeholder="Search: calc, chemistry, floor 3a..."
        />
      </div>
    </div>
  )
};

// 6. MOBILE RESPONSIVE STORY - On-the-go campus discovery
export const MobileResponsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile Campus Discovery
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Find spaces while walking between classes
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium text-[var(--hive-text-primary)] mb-3">
          Quick Actions for Busy Students
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">CS 101 Study Group</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">Meeting now in Library Room 205</p>
            </div>
            <Button size="sm" className="min-h-[44px]">Join Now</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">Calc 2 Survivors</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">Emergency study session tonight</p>
            </div>
            <Button variant="secondary" size="sm" className="min-h-[44px]">Maybe</Button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[var(--hive-border-subtle)]">
          <p className="text-xs text-[var(--hive-text-secondary)] text-center">
            44px minimum touch targets for easy tapping while walking
          </p>
        </div>
      </div>
    </div>
  )
};
