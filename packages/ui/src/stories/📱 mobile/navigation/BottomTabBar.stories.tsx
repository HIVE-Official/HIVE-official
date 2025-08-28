import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Mock BottomTabBar for Storybook demonstration
const BottomTabBar = ({ activeTab, notifications }: { 
  activeTab: string; 
  notifications?: Record<string, number> 
}) => {
  const tabs = [
    { id: 'feed', label: 'Feed', icon: '📱', href: '/feed' },
    { id: 'spaces', label: 'Spaces', icon: '🏢', href: '/spaces' },
    { id: 'tools', label: 'Tools', icon: '🛠️', href: '/tools' },
    { id: 'profile', label: 'Profile', icon: '👤', href: '/profile' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'text-yellow-600 bg-yellow-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <span className="text-xl">{tab.icon}</span>
              {notifications?.[tab.id] && notifications[tab.id] > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications[tab.id]}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof BottomTabBar> = {
  title: '📱 Mobile/Navigation/BottomTabBar',
  component: BottomTabBar,
  parameters: {
    docs: {
      description: {
        component: 'Mobile bottom navigation for HIVE platform navigation.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomTabBar>;

export const Default: Story = {
  args: {
    activeTab: 'feed',
  },
};

export const ProfileActive: Story = {
  args: {
    activeTab: 'profile',
  },
};

export const SpacesActive: Story = {
  args: {
    activeTab: 'spaces',
  },
};

export const HiveMobileNavigation: Story = {
  name: 'HIVE Mobile Navigation',
  render: () => (
    <div className="max-w-sm mx-auto">
      {/* Simulated mobile screen */}
      <div className="bg-white border-2 border-gray-300 rounded-[2rem] p-1 shadow-xl">
        <div className="bg-gray-50 rounded-[1.75rem] h-[600px] relative overflow-hidden">
          {/* Status bar */}
          <div className="bg-black text-white px-4 py-2 flex justify-between text-xs rounded-t-[1.75rem]">
            <span>9:41</span>
            <span>🔋 100%</span>
          </div>
          
          {/* Content area */}
          <div className="flex-1 p-4 pb-20">
            <div className="text-center mt-8">
              <h1 className="text-2xl font-bold mb-2">Campus Feed</h1>
              <p className="text-gray-600">Real-time updates from your UB communities</p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-xs text-gray-600">CS Study Group</p>
                  </div>
                </div>
                <p className="text-sm">New study session scheduled for tomorrow!</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Alex Rodriguez</p>
                    <p className="text-xs text-gray-600">Robotics Club</p>
                  </div>
                </div>
                <p className="text-sm">Check out our new robot prototype! 🤖</p>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="absolute bottom-0 left-0 right-0">
            <BottomTabBar activeTab="feed" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithNotifications: Story = {
  name: 'With Notification Badges',
  render: () => (
    <div className="max-w-sm mx-auto">
      <BottomTabBar
        activeTab="profile"
        notifications={{
          feed: 3,
          spaces: 1,
          tools: 0,
          profile: 2,
        }}
      />
    </div>
  ),
};