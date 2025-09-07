/**
 * HIVE SPACES SYSTEM - COMPLETE INTERACTIVE DOCUMENTATION
 * 
 * This is the master story showcasing the entire HIVE Spaces System
 * with full UX flows, Information Architecture, and interactive components
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { 
  UBSpaceTemplateCard,
  UBSpacesDirectory,
  SpaceActivationModal,
  UB_SPACE_TEMPLATES
} from '../../../components/spaces/ub-space-templates';
import { 
  UBMobileBottomNav,
  UBMobileHeader,
  UBMobileTouchButton,
  UBMobileSwipeCard
} from '../../../components/mobile/ub-mobile-touch-optimization';
import { CampusSpacesCard } from '../../atomic/molecules/campus-spaces-card';
import { 
  UBAdminMetricsOverview,
  UBModerationQueue,
  UBAdminQuickActions
} from '../../../components/admin/ub-admin-dashboard';
import { action } from '@storybook/addon-actions';
import { 
  Users, 
  Home, 
  Search, 
  Plus,
  Zap,
  Calendar,
  Settings,
  Shield,
  TrendingUp,
  Activity,
  Bell,
  MessageSquare,
  Heart,
  Share,
  Eye,
  CheckCircle,
  Building2,
  GraduationCap
} from 'lucide-react';
import '../../../hive-tokens.css';

// =============================================================================
// META CONFIGURATION
// =============================================================================

const meta: Meta<typeof React.Fragment> = {
  title: '🏛️ SPACES SYSTEM/Complete Interactive System',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🏛️ HIVE SPACES SYSTEM - COMPLETE INTERACTIVE DOCUMENTATION

The complete HIVE Spaces System with full UX flows, Information Architecture, and interactive components for University at Buffalo campus communities.

## 🎯 SYSTEM OVERVIEW

The Spaces System is the heart of HIVE's campus community building platform, enabling UB students to discover, join, and actively participate in campus communities that matter to them.

## 🏗️ INFORMATION ARCHITECTURE

### **Level 1: Discovery & Navigation**
- **Campus Spaces Dashboard** - Main discovery interface with search, filters, and recommendations
- **Category Navigation** - Academic, Residential, Social, Athletic, Cultural spaces
- **Personal Spaces Hub** - User's joined communities and activity feed

### **Level 2: Community Interaction**
- **Space Management** - Individual space views with posts, events, members, resources
- **Real-time Feeds** - Live activity streams and community engagement
- **Member Directory** - Community member profiles and connections

### **Level 3: Campus Integration**
- **UB Templates** - Pre-seeded campus communities (dorms, departments, clubs)
- **Mobile Optimization** - Touch-optimized navigation for on-campus use
- **Admin Dashboard** - Campus oversight and platform management

## 🎨 UX INTERACTION PATTERNS

### **Primary User Flows**
1. **Space Discovery** → Search & filter → Preview → Join/Request activation
2. **Community Engagement** → Browse feed → Comment/React → Create content
3. **Campus Integration** → Find relevant spaces → Connect with peers → Build networks
4. **Mobile Campus Use** → Quick check between classes → Engage during breaks → Stay connected

### **Interactive Components**
- **Hover States & Animations** - Sophisticated visual feedback throughout
- **Touch Optimization** - 44px+ targets, haptic feedback, gesture support
- **Real-time Updates** - Live activity feeds and engagement metrics
- **Progressive Disclosure** - Context-aware content and actions

## 📱 COMPLETE MOBILE EXPERIENCE

The entire Spaces System is optimized for mobile-first campus use:
- **Between Classes** - Quick space checking while walking
- **Study Breaks** - Efficient content consumption during short breaks
- **Event Coordination** - Real-time campus event discovery and RSVP
- **Social Connection** - Seamless peer discovery and communication

## 🛡️ CAMPUS ADMINISTRATION

Comprehensive admin tools for UB campus management:
- **Student Demographics** - Real-time UB enrollment and engagement data
- **Content Moderation** - Campus-appropriate content review workflows
- **System Health** - Platform performance and cost monitoring
- **Quick Actions** - Campus notifications, reports, maintenance tools

## 🎯 USER PERSONAS SUPPORTED

- **New Students** - Onboarding and campus community discovery
- **Active Students** - Daily engagement and community participation  
- **Student Leaders** - Space management and community building
- **Campus Admins** - Platform oversight and policy enforcement
- **Transfer Students** - Quick integration into existing communities

The system provides seamless experiences across all user types with contextual interfaces and progressive feature disclosure.
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
// MOCK DATA FOR COMPREHENSIVE DEMO
// =============================================================================

const mockUBNavItems = [
  { id: 'feed', label: 'Feed', icon: Home, href: '/feed', isActive: false },
  { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', isActive: true, badge: { count: 3, color: 'primary' as const } },
  { id: 'tools', label: 'Tools', icon: Zap, href: '/tools', badge: { count: 12, color: 'secondary' as const } },
  { id: 'rituals', label: 'Rituals', icon: Calendar, href: '/rituals' },
  { id: 'profile', label: 'Profile', icon: Users, href: '/profile' }
];

const mockUserSpaces = [
  {
    id: '1',
    name: 'CS 331: Data Structures',
    type: 'course' as const,
    memberCount: 234,
    unreadCount: 5,
    lastActivity: '2024-08-14T10:30:00Z',
    isPinned: true,
    recentActivity: {
      type: 'announcement' as const,
      preview: 'Assignment 3 due Friday - Linked Lists',
      timestamp: '2024-08-14T10:30:00Z'
    }
  },
  {
    id: '2',
    name: 'Ellicott East 3rd Floor',
    type: 'housing' as const,
    memberCount: 18,
    unreadCount: 12,
    lastActivity: '2024-08-14T09:15:00Z',
    isFavorite: true,
    recentActivity: {
      type: 'message' as const,
      preview: 'Movie night tonight in the lounge!',
      timestamp: '2024-08-14T09:15:00Z'
    }
  },
  {
    id: '3',
    name: 'UB Robotics Club',
    type: 'club' as const,
    memberCount: 67,
    unreadCount: 2,
    lastActivity: '2024-08-14T08:45:00Z',
    recentActivity: {
      type: 'event' as const,
      preview: 'Weekly meeting moved to Thursday 7pm',
      timestamp: '2024-08-14T08:45:00Z'
    }
  }
];

const mockCampusMetrics = {
  platform: {
    name: 'HIVE Campus',
    version: '1.2.4',
    environment: 'production' as const,
    university: 'University at Buffalo' as const,
    campus: 'All Campuses' as const
  },
  students: {
    total: 8947,
    active: 6234,
    newThisWeek: 127,
    byYear: { 'Freshman': 2345, 'Sophomore': 2156, 'Junior': 1987, 'Senior': 1689, 'Graduate': 770 },
    byMajor: { 'Computer Science': 1456, 'Engineering': 1234, 'Business': 987, 'Medicine': 654, 'Liberal Arts': 543, 'Other': 4073 },
    byDorm: { 'Ellicott Complex': 1247, 'Governors Complex': 892, 'Creekside Village': 567, 'South Campus': 445, 'Off-Campus': 5796 },
    verified: 8234,
    pendingVerification: 713
  },
  spaces: {
    total: 156,
    active: 134,
    dormant: 18,
    needsModeration: 4,
    byCategory: {
      'Academic': { count: 45, members: 2345 },
      'Residential': { count: 38, members: 1876 },
      'Social': { count: 29, members: 1543 },
      'Athletic': { count: 22, members: 987 },
      'Cultural': { count: 22, members: 765 }
    },
    totalMembers: 7516,
    averageEngagement: 67
  },
  tools: {
    total: 234,
    active: 189,
    pendingReview: 12,
    deployments: 156,
    byCategory: { 'Study Tools': 67, 'Campus Life': 45, 'Social': 38, 'Academic': 34, 'Coordination': 29, 'Other': 21 },
    usage: { dailyActive: 1234, weeklyActive: 3456, monthlyActive: 5678 }
  },
  rituals: {
    total: 12,
    active: 3,
    completed: 7,
    participation: { current: 2847, total: 8947, rate: 32 },
    campusImpact: 78
  },
  content: {
    posts: 12456,
    comments: 34567,
    reported: 23,
    moderated: 156,
    flagged: 45,
    approved: 12234
  },
  system: {
    status: 'healthy' as const,
    uptime: 2678400,
    performance: { responseTime: 245, errorRate: 0.02, throughput: 1234 },
    storage: { used: 234, total: 500, percentage: 47 },
    costs: { monthly: 1245, daily: 42, trend: 'stable' as const }
  }
};

// =============================================================================
// INTERACTIVE SPACES SYSTEM COMPONENT
// =============================================================================

const CompleteSpacesSystem = () => {
  const [activeView, setActiveView] = useState<'discovery' | 'personal' | 'mobile' | 'admin'>('discovery');
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSpaceActivation = (spaceId: string) => {
    const space = UB_SPACE_TEMPLATES.find(s => s.id === spaceId);
    setSelectedSpace(space?.name || '');
    setModalOpen(true);
    action('space-activation-requested')(spaceId);
  };

  const ViewSelector = () => (
    <div className="flex flex-wrap gap-2 mb-8 p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
      {[
        { id: 'discovery', label: '🔍 Campus Discovery', icon: Search },
        { id: 'personal', label: '👤 Personal Dashboard', icon: Users },
        { id: 'mobile', label: '📱 Mobile Experience', icon: Activity },
        { id: 'admin', label: '🛡️ Admin Dashboard', icon: Shield }
      ].map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeView === id ? 'primary' : 'secondary'}
          onClick={() => setActiveView(id as any)}
          className="flex items-center gap-2"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* System Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent">
            🏛️ HIVE Spaces System
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] mb-6">
            Complete Interactive Campus Community Platform for University at Buffalo
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">156</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Active Spaces</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">8,947</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">UB Students</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">7,516</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Community Members</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">67%</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Avg Engagement</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ViewSelector />

        {/* Dynamic Content Based on Selected View */}
        {activeView === 'discovery' && (
          <div className="space-y-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                  <Search className="w-5 h-5" />
                  UB Campus Space Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--hive-text-secondary)] mb-6">
                  Discover and join University at Buffalo campus communities. From academic departments 
                  to residence halls, find your tribe and build lasting connections.
                </p>
                <UBSpacesDirectory
                  spaces={UB_SPACE_TEMPLATES}
                  onRequestActivation={handleSpaceActivation}
                  onViewDetails={action('view-space-details')}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'personal' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                  <Users className="w-5 h-5" />
                  My Campus Spaces
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CampusSpacesCard
                  spaces={mockUserSpaces}
                  showQuickActions={true}
                  onSpaceClick={action('open-space')}
                  onJoinSpace={action('join-space')}
                  onViewAll={action('view-all-spaces')}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUserSpaces.map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--hive-background-primary)]">
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">{space.name}</div>
                        <div className="text-sm text-[var(--hive-text-secondary)]">{space.recentActivity.preview}</div>
                      </div>
                      {space.unreadCount > 0 && (
                        <Badge className="bg-[var(--hive-brand-primary)] text-white">{space.unreadCount}</Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                    <TrendingUp className="w-5 h-5" />
                    Recommended Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {UB_SPACE_TEMPLATES.filter(space => !space.isActive).slice(0, 3).map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--hive-background-primary)]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[var(--hive-brand-primary)]/10">
                          <space.icon className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                        </div>
                        <div>
                          <div className="font-medium text-[var(--hive-text-primary)]">{space.name}</div>
                          <div className="text-sm text-[var(--hive-text-secondary)]">{space.expectedMembers} expected members</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleSpaceActivation(space.id)}
                      >
                        Request to Lead
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'mobile' && (
          <div className="max-w-md mx-auto space-y-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                  <Activity className="w-5 h-5" />
                  Mobile Campus Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--hive-text-secondary)] mb-6">
                  Optimized for on-campus use between classes with touch interactions, 
                  haptic feedback, and quick engagement patterns.
                </p>
                
                {/* Mobile Header */}
                <UBMobileHeader
                  title="Campus Spaces"
                  subtitle="University at Buffalo"
                  leftAction={{
                    icon: Search,
                    label: 'Search',
                    onPress: action('mobile-search')
                  }}
                  rightActions={[
                    {
                      icon: Bell,
                      label: 'Notifications',
                      onPress: action('mobile-notifications'),
                      badge: { count: 3, pulse: true }
                    },
                    {
                      icon: Plus,
                      label: 'Create',
                      onPress: action('mobile-create')
                    }
                  ]}
                />

                {/* Mobile Space Cards */}
                <div className="mt-6 space-y-4">
                  {UB_SPACE_TEMPLATES.slice(0, 3).map((space) => (
                    <UBMobileSwipeCard
                      key={space.id}
                      onSwipeRight={() => action('mobile-join-space')(space.id)}
                      onSwipeLeft={() => action('mobile-dismiss-space')(space.id)}
                      onPress={() => action('mobile-view-space')(space.id)}
                    >
                      <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-default)]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-[var(--hive-brand-primary)]/10">
                            <space.icon className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                          </div>
                          <div>
                            <div className="font-medium text-[var(--hive-text-primary)]">{space.name}</div>
                            <div className="text-sm text-[var(--hive-text-secondary)] capitalize">{space.category}</div>
                          </div>
                        </div>
                        <p className="text-sm text-[var(--hive-text-secondary)] mb-3">{space.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-[var(--hive-text-secondary)]">
                            {space.expectedMembers} expected members
                          </div>
                          <Badge variant={space.isActive ? 'primary' : 'secondary'}>
                            {space.isActive ? 'Active' : 'Preview'}
                          </Badge>
                        </div>
                      </div>
                    </UBMobileSwipeCard>
                  ))}
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="mt-8">
                  <UBMobileBottomNav
                    items={mockUBNavItems}
                    onNavigate={action('mobile-navigate')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'admin' && (
          <div className="space-y-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                  <Shield className="w-5 h-5" />
                  UB Campus Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--hive-text-secondary)] mb-6">
                  Comprehensive oversight and management tools for University at Buffalo 
                  campus administrators to monitor platform health and student engagement.
                </p>
                <UBAdminMetricsOverview metrics={mockCampusMetrics} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Space Activation Modal */}
        <SpaceActivationModal
          spaceId="demo-space"
          spaceName={selectedSpace}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            action('activation-submitted')(data);
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const CompleteInteractiveSystem: Story = {
  render: () => <CompleteSpacesSystem />,
  parameters: {
    docs: {
      description: {
        story: 'The complete HIVE Spaces System with all interactive components, UX flows, and Information Architecture patterns. Switch between views to explore different aspects of the system.'
      }
    }
  }
};

export const SpaceDiscoveryFlow: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--hive-brand-primary)] mb-4">
          🔍 Campus Space Discovery
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Complete UX flow for discovering and joining UB campus communities
        </p>
      </div>
      
      <UBSpacesDirectory
        spaces={UB_SPACE_TEMPLATES}
        onRequestActivation={action('request-activation')}
        onViewDetails={action('view-details')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive space discovery flow with filtering, preview, and activation request workflows for UB students.'
      }
    }
  }
};

export const PersonalSpacesDashboard: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--hive-brand-primary)] mb-4">
          👤 Personal Spaces Dashboard
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Student's personal view of joined communities and activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CampusSpacesCard
          spaces={mockUserSpaces}
          showQuickActions={true}
          onSpaceClick={action('open-space')}
          onJoinSpace={action('join-space')}
          onViewAll={action('view-all-spaces')}
        />
        
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardHeader>
            <CardTitle className="text-[var(--hive-brand-primary)]">Space Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUserSpaces.map((space) => (
              <div key={space.id} className="p-4 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-[var(--hive-text-primary)]">{space.name}</div>
                  <Badge className="bg-[var(--hive-brand-primary)] text-white">{space.unreadCount}</Badge>
                </div>
                <p className="text-sm text-[var(--hive-text-secondary)]">{space.recentActivity.preview}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Button size="sm" variant="ghost">
                    <Heart className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Personal dashboard showing user\'s joined spaces with activity feeds and engagement options.'
      }
    }
  }
};

export const MobileCampusExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto bg-[var(--hive-background-primary)] min-h-screen">
      <div className="text-center p-6">
        <h2 className="text-xl font-bold text-[var(--hive-brand-primary)] mb-2">
          📱 Mobile Campus
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Optimized for between-class use
        </p>
      </div>
      
      <UBMobileHeader
        title="Campus Spaces"
        subtitle="Walking to Norton Hall"
        leftAction={{
          icon: Search,
          label: 'Search',
          onPress: action('mobile-search')
        }}
        rightActions={[
          {
            icon: Bell,
            label: 'Notifications',
            onPress: action('mobile-notifications'),
            badge: { count: 2, pulse: true }
          }
        ]}
      />
      
      <div className="p-4 space-y-4">
        {UB_SPACE_TEMPLATES.slice(0, 2).map((space) => (
          <UBMobileSwipeCard
            key={space.id}
            onSwipeRight={() => action('mobile-join')(space.id)}
            onSwipeLeft={() => action('mobile-dismiss')(space.id)}
          >
            <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
              <div className="flex items-center gap-3">
                <space.icon className="w-6 h-6 text-[var(--hive-brand-primary)]" />
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)]">{space.name}</div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">{space.expectedMembers} members</div>
                </div>
              </div>
            </div>
          </UBMobileSwipeCard>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0">
        <UBMobileBottomNav
          items={mockUBNavItems}
          onNavigate={action('mobile-navigate')}
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized campus experience with touch interactions, haptic feedback, and quick engagement patterns for students moving between classes.'
      }
    }
  }
};

export const AdminCampusOverview: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--hive-brand-primary)] mb-4">
          🛡️ Campus Administration
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Comprehensive oversight tools for UB campus management
        </p>
      </div>
      
      <UBAdminMetricsOverview metrics={mockCampusMetrics} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Administrative dashboard for UB campus oversight with student demographics, system health, and platform metrics.'
      }
    }
  }
};