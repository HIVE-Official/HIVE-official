import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CategoryGridOrganism, SPACE_CATEGORIES } from '../../components/spaces/category-grid-organism';

/**
 * # CategoryGridOrganism - Browse Campus Communities
 * 
 * Find the right type of campus community for what you need.
 * From study groups that help you pass classes to dorm floors
 * that coordinate everything from laundry to late-night food runs.
 * 
 * ## What You'll Find
 * - Study groups for every class and major
 * - Dorm floors and residential communities
 * - Project teams and research groups
 * - Clubs that actually build useful things
 * 
 * ## How Students Use It
 * Quick way to browse different types of campus spaces when you're
 * looking for specific kinds of help or community.
 */

const meta: Meta<typeof CategoryGridOrganism> = {
  title: '03-Organisms/CategoryGridOrganism',
  component: CategoryGridOrganism,
  parameters: {
    docs: {
      description: {
        component: `
# CategoryGridOrganism - Browse Campus Communities

Find the right type of campus community for what you need:

## Types of Communities
- **Study Groups**: Get help with specific classes and exams
- **Dorm Floors**: Connect with people who live near you
- **Project Teams**: Build tools and work on projects together
- **Clubs**: Find people with shared interests and skills

## How Students Use It
- Browse by the type of help or community you need
- See how active each category is on campus
- Quick way to find the right kind of space
- Mobile-friendly for discovering communities on the go

## Built for Real Campus Life
- Shows actual member counts and activity
- Categories based on what students actually do
- Clean, easy navigation between different space types
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    onCategorySelect: { action: 'category-selected' },
    selectedCategory: {
      control: { type: 'select' },
      options: [null, 'student', 'university', 'greek', 'residential'],
      description: 'Currently selected category'
    },
    showCounts: {
      control: 'boolean',
      description: 'Show member counts for categories'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-[var(--hive-background-primary)] min-h-[600px]">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - All categories
export const Default: Story = {
  args: {
    showCounts: true
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    showCounts: true,
    selectedCategory: null
  }
};

// 3. CAMPUS SCENARIOS STORY - Real usage scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          When Students Use Category Browse
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real situations where category browsing helps find the right community
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">"I need help with calculus"</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Student clicks on Study Groups category to find math help
          </p>
          <div className="border border-[var(--hive-border-subtle)] rounded-lg p-3">
            <CategoryGridOrganism showCounts={true} selectedCategory="student" />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">"Want to meet people on my floor"</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Student browses Residential Life to find their dorm floor community
          </p>
          <div className="border border-[var(--hive-border-subtle)] rounded-lg p-3">
            <CategoryGridOrganism showCounts={true} selectedCategory="residential" />
          </div>
        </div>
      </div>
    </div>
  )
};

// 4. CATEGORY ACTIVITY STORY - Live campus activity
export const CategoryActivity: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Live Campus Activity
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          See what's happening in different types of campus communities
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium text-[var(--hive-text-primary)] mb-3">
          Active Right Now
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">Study Groups</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">3 groups meeting right now • 12 study sessions today</p>
            </div>
            <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">Dorm Floors</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">5 floors coordinating dinner plans • 2 movie nights</p>
            </div>
            <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">Project Teams</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">2 teams building tools • CS club hackathon prep</p>
            </div>
            <div className="w-2 h-2 bg-[var(--hive-text-primary)]/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 5. CAMPUS DISCOVERY STORY - Finding new communities
export const CampusDiscovery: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Discover New Communities
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          See what types of communities are active on your campus
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium text-[var(--hive-text-primary)] mb-3">
          Browse by What You Need
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Academic Help</h4>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded mb-2">
              Study Groups • 156 students across 23 groups
            </div>
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Get help with classes, exams, and assignments
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Campus Living</h4>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded mb-2">
              Dorm Floors • 89 students across 8 floors
            </div>
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Connect with people who live near you
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Building Things</h4>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded mb-2">
              Project Teams • 45 students in 6 teams
            </div>
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Work on projects, build tools, create things
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Shared Interests</h4>
            <div className="text-sm p-2 bg-[var(--hive-background-primary)] rounded mb-2">
              Clubs & Groups • 78 students in 12 clubs
            </div>
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Find people with similar hobbies and interests
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. MOBILE CAMPUS DISCOVERY STORY - On-the-go browsing
export const MobileCampusDiscovery: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile Campus Discovery
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Browse communities while walking between classes
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium text-[var(--hive-text-primary)] mb-3">
          Quick Browse on Mobile
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">📚 Study Groups</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">23 groups • Tap to see all</p>
            </div>
            <div className="text-xs text-[var(--hive-brand-secondary)]">Active</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">🏠 Dorm Floors</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">8 floors • Find your floor</p>
            </div>
            <div className="text-xs text-[var(--hive-brand-secondary)]">Active</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
            <div>
              <span className="font-medium text-sm">🛠️ Project Teams</span>
              <p className="text-xs text-[var(--hive-text-secondary)]">6 teams • Building cool stuff</p>
            </div>
            <div className="text-xs text-[var(--hive-text-secondary)]">Some activity</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[var(--hive-border-subtle)]">
          <p className="text-xs text-[var(--hive-text-secondary)] text-center">
            Large touch targets for easy browsing while walking
          </p>
        </div>
      </div>
    </div>
  )
};