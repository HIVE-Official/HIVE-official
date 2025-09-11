import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  RefinedButton, 
  RefinedCard, 
  RefinedTypography, 
  RefinedInput, 
  RefinedBadge 
} from '../../components/visual-improvements/refined-components';
import { 
  Search, 
  Settings, 
  Bell, 
  Users, 
  Calendar, 
  BookOpen, 
  Coffee,
  Zap,
  Star,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const meta = {
  title: 'Visual Improvements/🎯 Refined HIVE Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Refined HIVE Design System

Inspired by Vercel's technical confidence and Apple's precision, but uniquely HIVE.

## Design Principles:
- **Technical Confidence**: Clean, precise, functional
- **Sophisticated Simplicity**: Not minimal, but purposeful
- **Campus Energy**: Subtle gold accents that feel earned, not flashy
- **Platform Quality**: Interface that feels professional yet approachable

## What Makes This Different:
- Vercel-inspired border treatments and hover states
- Apple-level attention to spacing and hierarchy
- HIVE's gold accent used strategically for focus and energy
- Campus context without being juvenile
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RefinedShowcase: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchValue, setSearchValue] = useState('');
    const [notifications, _setNotifications] = useState(3);

    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <RefinedTypography variant="title" as="h1" className="text-2xl font-bold">
                  HIVE
                </RefinedTypography>
                
                <nav className="hidden md:flex items-center gap-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard' },
                    { id: 'spaces', label: 'Spaces' },
                    { id: 'feed', label: 'Feed' },
                    { id: 'tools', label: 'Tools' }
                  ].map((item: any) => (
                    <RefinedButton
                      key={item.id}
                      variant={activeTab === item.id ? 'accent' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.label}
                    </RefinedButton>
                  ))}
                </nav>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <RefinedInput
                    placeholder="Search campus..."
                    value={searchValue}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    className="w-64 pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
                
                <RefinedButton variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <RefinedBadge variant="secondary" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center">
                      {notifications}
                    </RefinedBadge>
                  )}
                </RefinedButton>
                
                <RefinedButton variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </RefinedButton>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <RefinedTypography variant="hero" as="h1" className="mb-4">
              Welcome back, Jacob
            </RefinedTypography>
            <RefinedTypography variant="subtitle" className="mb-8">
              Your campus is buzzing with 247 active students across 12 spaces
            </RefinedTypography>
            
            <div className="flex flex-wrap gap-3">
              <RefinedButton variant="secondary" size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Join Study Session
              </RefinedButton>
              <RefinedButton variant="secondary">
                <Users className="w-4 h-4 mr-2" />
                Browse Spaces
              </RefinedButton>
              <RefinedButton variant="ghost">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </RefinedButton>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <RefinedCard variant="elevated" padding="md">
              <div className="flex items-center justify-between mb-4">
                <RefinedTypography variant="subtitle" as="h3">
                  Campus Energy
                </RefinedTypography>
                <RefinedBadge variant="secondary">High</RefinedBadge>
              </div>
              <RefinedTypography variant="hero" as="div" className="text-3xl mb-2">
                87%
              </RefinedTypography>
              <RefinedTypography variant="caption">
                Peak activity in CS Building and Library
              </RefinedTypography>
            </RefinedCard>
            
            <RefinedCard variant="feature" padding="md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <RefinedTypography variant="subtitle" as="h3">
                    Your Impact
                  </RefinedTypography>
                  <RefinedTypography variant="caption">
                    This week
                  </RefinedTypography>
                </div>
              </div>
              <RefinedTypography variant="body">
                You've helped organize 3 study groups and connected 12 students
              </RefinedTypography>
            </RefinedCard>
            
            <RefinedCard variant="interactive" padding="md">
              <div className="flex items-center justify-between mb-4">
                <RefinedTypography variant="subtitle" as="h3">
                  Quick Actions
                </RefinedTypography>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4 text-accent" />
                  <RefinedTypography variant="body" className="text-sm">
                    Coffee chat in 20 mins
                  </RefinedTypography>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <RefinedTypography variant="body" className="text-sm">
                    CS 301 study group forming
                  </RefinedTypography>
                </div>
              </div>
            </RefinedCard>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <RefinedTypography variant="title" as="h2">
                  Campus Feed
                </RefinedTypography>
                <div className="flex gap-2">
                  <RefinedBadge variant="secondary">Live</RefinedBadge>
                  <RefinedButton variant="ghost" size="sm">
                    Filter
                  </RefinedButton>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    type: 'study',
                    title: 'Late Night Coding Session',
                    space: 'CS Study Hub',
                    time: '2 min ago',
                    participants: 8,
                    status: 'active'
                  },
                  {
                    type: 'event',
                    title: 'Pizza & Algorithms Workshop',
                    space: 'Computer Science',
                    time: '15 min ago',
                    participants: 23,
                    status: 'starting'
                  },
                  {
                    type: 'social',
                    title: 'Movie Night Planning',
                    space: 'Dorm 3A',
                    time: '1 hour ago',
                    participants: 12,
                    status: 'planning'
                  }
                ].map((item, i) => (
                  <RefinedCard key={`event-${item.title}-${i}`} variant="minimal" padding="md" className="hover:border-accent/20 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <RefinedTypography variant="body" className="font-medium">
                            {item.title}
                          </RefinedTypography>
                          <RefinedBadge variant={item.status === 'active' ? 'accent' : 'default'} className="text-xs">
                            {item.status}
                          </RefinedBadge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <RefinedTypography variant="caption">
                            {item.space} • {item.time}
                          </RefinedTypography>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <RefinedTypography variant="caption">
                              {item.participants}
                            </RefinedTypography>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <RefinedButton variant="ghost" size="icon-sm">
                          <Heart className="w-3 h-3" />
                        </RefinedButton>
                        <RefinedButton variant="ghost" size="icon-sm">
                          <MessageCircle className="w-3 h-3" />
                        </RefinedButton>
                        <RefinedButton variant="ghost" size="icon-sm">
                          <Share className="w-3 h-3" />
                        </RefinedButton>
                      </div>
                    </div>
                  </RefinedCard>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="space-y-6">
                <div>
                  <RefinedTypography variant="title" as="h3" className="mb-4">
                    Active Spaces
                  </RefinedTypography>
                  <div className="space-y-3">
                    {[
                      { name: 'CS Study Hub', members: 47, status: 'High Energy' },
                      { name: 'Dorm 3A', members: 23, status: 'Active' },
                      { name: 'Library Group', members: 15, status: 'Quiet Focus' }
                    ].map((space, i) => (
                      <RefinedCard key={`space-${space.name}-${i}`} variant="minimal" padding="sm" className="hover:border-accent/20 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <RefinedTypography variant="body" className="font-medium text-sm">
                              {space.name}
                            </RefinedTypography>
                            <RefinedTypography variant="caption">
                              {space.members} members • {space.status}
                            </RefinedTypography>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                      </RefinedCard>
                    ))}
                  </div>
                </div>
                
                <div>
                  <RefinedTypography variant="title" as="h3" className="mb-4">
                    Quick Tools
                  </RefinedTypography>
                  <div className="space-y-2">
                    {[
                      { name: 'Study Timer', icon: Clock },
                      { name: 'Quick Poll', icon: CheckCircle },
                      { name: 'Find Study Buddy', icon: Users }
                    ].map((tool, i) => (
                      <RefinedButton key={`tool-${tool.name}-${i}`} variant="ghost" className="w-full justify-start">
                        <tool.icon className="w-4 h-4 mr-3" />
                        {tool.name}
                      </RefinedButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// Helper component for the story (Clock icon)
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export const ComponentShowcase: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <RefinedTypography variant="hero" as="h1">
            HIVE Design System
          </RefinedTypography>
          <RefinedTypography variant="subtitle">
            Technical confidence meets campus energy
          </RefinedTypography>
        </div>

        {/* Buttons */}
        <div className="space-y-6">
          <RefinedTypography variant="title" as="h2">
            Buttons
          </RefinedTypography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <RefinedTypography variant="subtitle" as="h3">
                Primary Actions
              </RefinedTypography>
              <div className="space-y-3">
                <RefinedButton variant="primary" size="lg" className="w-full">
                  Join Campus Community
                </RefinedButton>
                <RefinedButton variant="secondary" className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Create Study Group
                </RefinedButton>
                <RefinedButton variant="secondary" className="w-full">
                  Browse Spaces
                </RefinedButton>
              </div>
            </div>
            
            <div className="space-y-4">
              <RefinedTypography variant="subtitle" as="h3">
                Secondary Actions
              </RefinedTypography>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <RefinedButton variant="ghost">
                    Cancel
                  </RefinedButton>
                  <RefinedButton variant="destructive">
                    Delete Space
                  </RefinedButton>
                </div>
                <div className="flex gap-2">
                  <RefinedButton variant="ghost" size="icon">
                    <Heart className="w-4 h-4" />
                  </RefinedButton>
                  <RefinedButton variant="ghost" size="icon">
                    <Share className="w-4 h-4" />
                  </RefinedButton>
                  <RefinedButton variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </RefinedButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <RefinedTypography variant="title" as="h2">
            Cards & Containers
          </RefinedTypography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RefinedCard variant="primary" padding="md">
              <RefinedTypography variant="subtitle" as="h3" className="mb-3">
                Default Card
              </RefinedTypography>
              <RefinedTypography variant="body">
                Clean, functional container for standard content.
              </RefinedTypography>
            </RefinedCard>
            
            <RefinedCard variant="elevated" padding="md">
              <RefinedTypography variant="subtitle" as="h3" className="mb-3">
                Elevated Card
              </RefinedTypography>
              <RefinedTypography variant="body">
                Enhanced prominence for important content.
              </RefinedTypography>
            </RefinedCard>
            
            <RefinedCard variant="feature" padding="md">
              <RefinedTypography variant="subtitle" as="h3" className="mb-3">
                Feature Card
              </RefinedTypography>
              <RefinedTypography variant="body">
                Gold accent highlights for key campus features.
              </RefinedTypography>
            </RefinedCard>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-6">
          <RefinedTypography variant="title" as="h2">
            Typography
          </RefinedTypography>
          <div className="space-y-6">
            <div>
              <RefinedTypography variant="hero" as="h1">
                Hero Headlines
              </RefinedTypography>
              <RefinedTypography variant="caption">
                Large, impactful text for primary messaging
              </RefinedTypography>
            </div>
            
            <div>
              <RefinedTypography variant="title" as="h2">
                Section Titles
              </RefinedTypography>
              <RefinedTypography variant="caption">
                Clear hierarchy for content organization
              </RefinedTypography>
            </div>
            
            <div>
              <RefinedTypography variant="subtitle" as="h3">
                Subtitles and Supporting Headlines
              </RefinedTypography>
              <RefinedTypography variant="body">
                Body text for readable content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </RefinedTypography>
              <RefinedTypography variant="caption">
                Caption text for supporting information and metadata
              </RefinedTypography>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <RefinedTypography variant="secondary">
                Accent text for highlights
              </RefinedTypography>
              <RefinedTypography variant="code">
                Code snippets
              </RefinedTypography>
            </div>
          </div>
        </div>

        {/* Form Elements */}
        <div className="space-y-6">
          <RefinedTypography variant="title" as="h2">
            Form Elements
          </RefinedTypography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <RefinedTypography variant="subtitle" as="h3">
                Inputs
              </RefinedTypography>
              <div className="space-y-3">
                <RefinedInput placeholder="Default input" />
                <RefinedInput variant="filled" placeholder="Filled input" />
                <div className="relative">
                  <RefinedInput placeholder="Search..." className="pl-10" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <RefinedTypography variant="subtitle" as="h3">
                Badges
              </RefinedTypography>
              <div className="flex flex-wrap gap-2">
                <RefinedBadge variant="primary">Default</RefinedBadge>
                <RefinedBadge variant="secondary">Campus Energy</RefinedBadge>
                <RefinedBadge variant="success">Active</RefinedBadge>
                <RefinedBadge variant="warning">Planning</RefinedBadge>
                <RefinedBadge variant="destructive">Ended</RefinedBadge>
                <RefinedBadge variant="secondary">Live</RefinedBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <RefinedTypography variant="hero" as="h1">
            Before vs After
          </RefinedTypography>
          <RefinedTypography variant="subtitle">
            From generic to distinctly HIVE
          </RefinedTypography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BEFORE - Generic */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-surface rounded-full" />
              <RefinedTypography variant="title" as="h2" className="text-muted-foreground">
                Before: Generic
              </RefinedTypography>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">CS Study Group</h3>
              <p className="text-muted-foreground text-sm">Join us for algorithm review tonight</p>
              <div className="flex gap-2">
                <button className="bg-surface hover:bg-surface-01 text-foreground px-4 py-2 rounded text-sm transition-colors">
                  Join Group
                </button>
                <button className="border border-border text-foreground px-4 py-2 rounded text-sm hover:bg-surface transition-colors">
                  Maybe Later
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="bg-surface text-foreground text-xs px-2 py-1 rounded">Active</span>
                <span className="bg-surface text-foreground text-xs px-2 py-1 rounded">12 members</span>
              </div>
            </div>
          </div>

          {/* AFTER - HIVE Refined */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <RefinedTypography variant="title" as="h2" className="text-accent">
                After: HIVE Refined
              </RefinedTypography>
            </div>
            
            <RefinedCard variant="feature" padding="md" className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <RefinedTypography variant="subtitle" as="h3">
                    CS Study Group
                  </RefinedTypography>
                  <RefinedTypography variant="body" className="mt-2">
                    Algorithm deep-dive session • Library 3rd floor
                  </RefinedTypography>
                </div>
                <RefinedBadge variant="success">Live</RefinedBadge>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-accent" />
                  <RefinedTypography variant="caption">
                    12 joined
                  </RefinedTypography>
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-accent" />
                  <RefinedTypography variant="caption">
                    Snacks provided
                  </RefinedTypography>
                </div>
              </div>
              
              <div className="flex gap-3">
                <RefinedButton variant="secondary" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Join Now
                </RefinedButton>
                <RefinedButton variant="ghost" size="sm">
                  Save for Later
                </RefinedButton>
              </div>
            </RefinedCard>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/10">
          <RefinedTypography variant="subtitle">
            Technical precision meets campus energy
          </RefinedTypography>
          <RefinedTypography variant="body" className="mt-2 max-w-2xl mx-auto">
            Every interaction feels intentional, professional, and distinctly HIVE.
          </RefinedTypography>
        </div>
      </div>
    </div>
  ),
};