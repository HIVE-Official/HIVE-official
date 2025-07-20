/**
 * Social-First Navigation Demo
 * 
 * Demonstrates HIVE's feed-centric navigation structure optimized for:
 * - Social consumption (feed as gravity well)
 * - Short URLs for GroupMe sharing (/s/cs-majors, /u/sarah)
 * - Mobile-first with bottom tabs
 * - Space discovery with social proof
 */

import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveNavigationShell, 
  createHiveNavigationSections,
  mobileBottomTabs,
  quickActions,
  hiveRoutes
} from '../../components/navigation';
import { useState } from 'react';
import { Users, MessageCircle, Star, TrendingUp } from 'lucide-react';

const meta: Meta<typeof HiveNavigationShell> = {
  title: '11-Shell/Navigation Social-First',
  component: HiveNavigationShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Social-First Navigation System

HIVE's navigation system is designed for **social consumption first** with utility depth when needed.

## Key Principles
- **Feed as gravity well** - users always return to the social stream
- **Short URLs for sharing** - optimized for GroupMe/Discord (/s/cs-majors)
- **Social proof everywhere** - member counts, friend activity, FOMO
- **Mobile bottom tabs** - Feed | Spaces | Profile | Lab

## URL Structure
- \`/feed\` - Social consumption home base
- \`/s/[space-id]\` - Short space URLs (/s/cs-majors)
- \`/u/[handle]\` - User profiles (/u/sarah)
- \`/lab\` - Builder empowerment console

## Navigation Mental Model
**Feed-based with space depth** - Like Instagram but with meaningful utility.
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['sidebar', 'topbar', 'minimal'],
      description: 'Navigation layout variant'
    },
    size: {
      control: 'radio', 
      options: ['compact', 'standard', 'expanded'],
      description: 'Navigation size'
    }
  }
};

export default meta;
type Story = StoryObj<typeof HiveNavigationShell>;

// Mock user data
const mockUser = {
  id: 'user-sarah-chen',
  name: 'Sarah Chen',
  handle: 'sarah.chen',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1e5640a?w=400&h=400&fit=crop&crop=face',
  role: 'CS Senior',
  status: 'online' as const
};

// Feed-centric navigation sections with social proof
const socialNavigationSections = createHiveNavigationSections(mockUser);

// Demo content component
function NavigationDemoContent({ currentRoute }: { currentRoute: string }) {
  const getRouteDescription = (route: string) => {
    if (route === '/feed') return 'Social consumption home base - campus pulse and activity';
    if (route.startsWith('/s/')) return `Space: ${route.split('/')[2]} - community hub with tools and members`;
    if (route.startsWith('/u/')) return `Profile: ${route.split('/')[2]} - personal command center`;
    if (route === '/lab') return 'HiveLAB - builder empowerment console';
    if (route === '/spaces') return 'Space discovery with social proof and FOMO';
    return `Route: ${route}`;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          HIVE Navigation Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Social-first campus platform with feed-centric navigation
        </p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Current Route: <code className="bg-blue-100 px-2 py-1 rounded text-sm">{currentRoute}</code>
        </h2>
        <p className="text-blue-800">
          {getRouteDescription(currentRoute)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">URL Strategy</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Feed:</strong> <code>/feed</code> - Social gravity well</div>
            <div><strong>Spaces:</strong> <code>/s/cs-majors</code> - Short for sharing</div>
            <div><strong>Users:</strong> <code>/u/sarah</code> - Clean profiles</div>
            <div><strong>Tools:</strong> <code>/t/gpa-calc</code> - Shareable tools</div>
            <div><strong>Lab:</strong> <code>/lab</code> - Builder console</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Social Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span>Member counts for social proof</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span>Activity indicators and badges</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span>Friend connections visible</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Trending spaces and content</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          Mobile Bottom Tabs
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {mobileBottomTabs.map((tab) => (
            <div key={tab.id} className="text-center space-y-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto">
                <tab.icon className="w-5 h-5 text-yellow-700" />
              </div>
              <div className="text-sm font-medium text-yellow-800">{tab.label}</div>
              {tab.badge && (
                <div className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto">
                  {tab.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SocialFirstDesktop: Story = {
  args: {
    variant: 'sidebar',
    size: 'standard',
    user: mockUser,
    sections: socialNavigationSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true
  },
  render: (args) => {
    const [currentRoute, setCurrentRoute] = useState('/feed');
    
    return (
      <HiveNavigationShell
        {...args}
        onNavigate={(item) => {
          if (item.href) {
            setCurrentRoute(item.href);
          }
        }}
      >
        <NavigationDemoContent currentRoute={currentRoute} />
      </HiveNavigationShell>
    );
  }
};

export const MobileFeedFirst: Story = {
  args: {
    variant: 'topbar',
    size: 'compact', 
    user: mockUser,
    sections: socialNavigationSections,
    showSearch: false,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    mobileBreakpoint: 768
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: (args) => {
    const [currentRoute, setCurrentRoute] = useState('/feed');
    
    return (
      <HiveNavigationShell
        {...args}
        onNavigate={(item) => {
          if (item.href) {
            setCurrentRoute(item.href);
          }
        }}
      >
        <NavigationDemoContent currentRoute={currentRoute} />
      </HiveNavigationShell>
    );
  }
};

export const SpaceDiscoveryWithSocialProof: Story = {
  args: {
    variant: 'sidebar',
    size: 'expanded',
    user: mockUser,
    sections: socialNavigationSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: false
  },
  render: (args) => {
    const [currentRoute, setCurrentRoute] = useState('/spaces');
    
    return (
      <HiveNavigationShell
        {...args}
        onNavigate={(item) => {
          if (item.href) {
            setCurrentRoute(item.href);
          }
        }}
      >
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Space Discovery
            </h1>
            <p className="text-lg text-gray-600">
              Social proof drives engagement and FOMO
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900">CS Majors</h3>
              <p className="text-green-800 text-sm">127 members • Your friends: Mike, Alex, Emma</p>
              <div className="text-xs text-green-700 mt-1">🔥 Most active space this week</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900">West Campus</h3>
              <p className="text-blue-800 text-sm">234 residents • 12 new members this week</p>
              <div className="text-xs text-blue-700 mt-1">📍 Your dorm community</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-900">Events Board</h3>
              <p className="text-purple-800 text-sm">1,247 members • 15 events this week</p>
              <div className="text-xs text-purple-700 mt-1">🎉 Campus-wide announcements</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Social Proof Strategy</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Member counts</strong> visible on all spaces</li>
              <li>• <strong>Friend connections</strong> shown prominently</li>
              <li>• <strong>Activity indicators</strong> (most active, trending)</li>
              <li>• <strong>FOMO messaging</strong> ("127 CS majors are already here")</li>
              <li>• <strong>Growth signals</strong> ("12 new members this week")</li>
            </ul>
          </div>
        </div>
      </HiveNavigationShell>
    );
  }
};

export const ProfileCommandCenter: Story = {
  args: {
    variant: 'minimal',
    size: 'compact',
    user: mockUser,
    sections: socialNavigationSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true
  },
  render: (args) => {
    const [currentRoute, setCurrentRoute] = useState('/profile');
    
    return (
      <HiveNavigationShell
        {...args}
        onNavigate={(item) => {
          if (item.href) {
            setCurrentRoute(item.href);
          }
        }}
      >
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Command Center
            </h1>
            <p className="text-lg text-gray-600">
              Personal utilities with privacy controls
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Privacy Strategy</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>Profile visibility</span>
                <span className="text-yellow-600 font-medium">Private (vBETA)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>Tool sharing</span>
                <span className="text-green-600 font-medium">Selective</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>Ghost mode</span>
                <span className="text-red-600 font-medium">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>Social features</span>
                <span className="text-blue-600 font-medium">Unlock in V1</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">Personal Tools</h4>
              <p className="text-sm text-blue-700">GPA Calculator, Schedule Builder, Citation Manager</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-medium text-green-900 mb-2">Activity Tracking</h4>
              <p className="text-sm text-green-700">Private by default, selective sharing</p>
            </div>
          </div>
        </div>
      </HiveNavigationShell>
    );
  }
};