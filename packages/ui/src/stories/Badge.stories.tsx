import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Star, Award, CheckCircle, User, Calendar, BookOpen, Users, Trophy, Shield, Heart } from 'lucide-react'

import { Badge } from '../components/badge'

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: "dark", 
          value: "#0A0A0A", // HIVE background
        },
      ],
    },
    docs: {
      description: {
        component: `
# HIVE Badge Component

The Badge component follows HIVE's monochrome + gold brand guidelines for clean status indicators.

## Key Design Principles:
- **Pill-shaped**: Full rounded corners for premium feel
- **Gold sparingly**: Only for ritual moments and achievements  
- **Monochrome first**: Surface variations for hierarchy
- **Motion feedback**: Subtle hover states, no color states

## Brand Compliance:
- ✅ Pure monochrome + gold system
- ✅ HIVE motion timing (duration-fast, ease-smooth)
- ✅ No traditional status colors (red/green/blue)
- ✅ Proper typography tokens
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['chip', 'pill', 'accent', 'ritual', 'outline', 'interactive', 'removable', 'selectable', 'online', 'busy', 'away', 'mention', 'hashtag', 'floating'],
      description: 'Badge style variant following HIVE brand guidelines'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
      description: 'Badge size'
    }
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof Badge>

// === HIVE BRAND SHOWCASE ===
export const BrandShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-background rounded-lg border border-border">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">HIVE Badge System</h3>
        <p className="text-body-sm text-muted">Monochrome + Gold ritual moments. Clean status indicators.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Primary Badges</h4>
          <div className="flex gap-3 flex-wrap">
            <Badge variant="chip">Active</Badge>
            <Badge variant="pill">Member</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Ritual Badges (Gold Only)</h4>
          <div className="flex gap-3 flex-wrap">
            <Badge variant="ritual">
              <Star className="mr-1 h-3 w-3" />
              Verified
            </Badge>
            <Badge variant="ritual">
              <Award className="mr-1 h-3 w-3" />
              Top Contributor
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Subtle Variants</h4>
          <div className="flex gap-3 flex-wrap">
            <Badge variant="outline">Student</Badge>
            <Badge variant="outline">Observer</Badge>
            <Badge variant="away">Inactive</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

// === BASIC VARIANTS ===
export const Default: Story = {
  args: {
    children: 'Active',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'pill',
    children: 'Member',
  },
}

export const Ritual: Story = {
  args: {
    variant: 'ritual',
    children: 'Verified',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline', 
    children: 'Student',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'outline',
    children: 'Observer',
  },
}

export const Muted: Story = {
  args: {
    variant: 'away',
    children: 'Inactive',
  },
}

// === SIZE VARIANTS ===
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6 rounded-lg border border-border">
      <h4 className="text-h4 font-display text-foreground mb-2">Size Variants</h4>
      <div className="flex items-center gap-3">
        <Badge size="sm" variant="outline">Small</Badge>
        <Badge size="default" variant="outline">Default</Badge>
        <Badge size="lg" variant="outline">Large</Badge>
      </div>
    </div>
  ),
}

// === WITH ICONS ===
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6 rounded-lg border border-border">
      <h4 className="text-h4 font-display text-foreground mb-2">With Icons</h4>
      <div className="flex flex-wrap gap-3">
        <Badge variant="chip">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
        <Badge variant="ritual">
          <Award className="mr-1 h-3 w-3" />
          Top Contributor
        </Badge>
        <Badge variant="outline">
          <Users className="mr-1 h-3 w-3" />
          123 Members
        </Badge>
        <Badge variant="away">
          <Calendar className="mr-1 h-3 w-3" />
          This Week
        </Badge>
      </div>
    </div>
  ),
}

// === REAL-WORLD EXAMPLES ===
export const UserProfile: Story = {
  render: () => (
    <div className="space-y-4 bg-background p-6 rounded-lg border border-border max-w-md">
      <div className="flex items-center gap-3">
        <User className="h-5 w-5 text-accent" />
        <h4 className="text-h4 font-display text-foreground">User Profile</h4>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-body text-foreground">Sarah Chen</span>
          <Badge variant="ritual" size="sm">
            <Award className="mr-1 h-2.5 w-2.5" />
            Verified
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="pill" size="sm">Computer Science</Badge>
          <Badge variant="outline" size="sm">Sophomore</Badge>
          <Badge variant="outline" size="sm">Stanford</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="ritual" size="sm">
            <Trophy className="mr-1 h-2.5 w-2.5" />
            Top 10% Contributor
          </Badge>
          <Badge variant="away" size="sm">
            <Calendar className="mr-1 h-2.5 w-2.5" />
            Joined Oct 2024
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const SpaceInfo: Story = {
  render: () => (
    <div className="space-y-4 bg-background p-6 rounded-lg border border-border max-w-sm">
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-accent" />
        <h4 className="text-h4 font-display text-foreground">Academic Space</h4>
      </div>
      <div className="space-y-3">
        <div>
          <h5 className="text-body font-medium text-foreground mb-2">CS 161: Algorithms</h5>
          <div className="flex flex-wrap gap-2">
            <Badge variant="pill">247 Members</Badge>
            <Badge variant="outline">Fall 2024</Badge>
            <Badge variant="outline">Stanford</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="ritual" size="sm">
            <Shield className="mr-1 h-2.5 w-2.5" />
            Official Course
          </Badge>
          <Badge variant="chip" size="sm">Active</Badge>
          <Badge variant="away" size="sm">Moderated</Badge>
        </div>
      </div>
    </div>
  ),
}

export const AchievementDisplay: Story = {
  render: () => (
    <div className="space-y-4 bg-background p-6 rounded-lg border border-border max-w-md">
      <div className="flex items-center gap-3">
        <Trophy className="h-5 w-5 text-accent" />
        <h4 className="text-h4 font-display text-foreground">Achievement Badges</h4>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h5 className="text-body-sm font-medium text-muted">Ritual Moments</h5>
          <div className="flex flex-wrap gap-2">
            <Badge variant="ritual" size="lg">
              <Star className="mr-1 h-3 w-3" />
              Setup Complete
            </Badge>
            <Badge variant="ritual">
              <Heart className="mr-1 h-3 w-3" />
              First Post
            </Badge>
            <Badge variant="ritual" size="sm">
              <Users className="mr-1 h-2.5 w-2.5" />
              Space Creator
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-body-sm font-medium text-muted">Progress Indicators</h5>
          <div className="flex flex-wrap gap-2">
            <Badge variant="chip">Level 3</Badge>
            <Badge variant="pill">15 Posts</Badge>
            <Badge variant="outline">42 Likes</Badge>
            <Badge variant="outline">Week 1</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};

// === GROCERY STORE SHOWCASE ===
export const GroceryShowcase: Story = {
  name: "🛒 Badge Grocery Store",
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">HIVE Badge Grocery Store</h2>
        <p className="text-muted-foreground">Pick your perfect badge variant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Default</h3>
          <div className="space-y-2">
            <Badge size="sm">Small Default</Badge>
            <Badge>Default Badge</Badge>
            <Badge size="lg">Large Default</Badge>
          </div>
        </div>

        {/* Secondary Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Secondary</h3>
          <div className="space-y-2">
            <Badge variant="pill" size="sm">Small Secondary</Badge>
            <Badge variant="pill">Secondary Badge</Badge>
            <Badge variant="pill" size="lg">Large Secondary</Badge>
          </div>
        </div>

        {/* Ritual Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Ritual (Gold)</h3>
          <div className="space-y-2">
            <Badge variant="ritual" size="sm">
              <Star className="mr-1 h-2.5 w-2.5" />
              Small Ritual
            </Badge>
            <Badge variant="ritual">
              <Award className="mr-1 h-3 w-3" />
              Ritual Badge
            </Badge>
            <Badge variant="ritual" size="lg">
              <Trophy className="mr-1 h-3 w-3" />
              Large Ritual
            </Badge>
          </div>
        </div>

        {/* Outline Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Outline</h3>
          <div className="space-y-2">
            <Badge variant="outline" size="sm">Small Outline</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="outline" size="lg">Large Outline</Badge>
          </div>
        </div>

        {/* Ghost Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Ghost</h3>
          <div className="space-y-2">
            <Badge variant="outline" size="sm">Small Ghost</Badge>
            <Badge variant="outline">Ghost Badge</Badge>
            <Badge variant="outline" size="lg">Large Ghost</Badge>
          </div>
        </div>

        {/* Muted Section */}
        <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Muted</h3>
          <div className="space-y-2">
            <Badge variant="away" size="sm">Small Muted</Badge>
            <Badge variant="away">Muted Badge</Badge>
            <Badge variant="away" size="lg">Large Muted</Badge>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-border">
        <p className="text-muted-foreground text-sm">
          🏅 Following HIVE Design System - Gold only for ritual achievements and special moments
        </p>
      </div>
    </div>
  ),
}; 