import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Search, Bell, MessageSquare, Plus, Menu, Home, Users, Calendar, BookOpen, Settings, User, LogOut, ChevronDown, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';

const meta: Meta = {
  title: '03-Molecules/Navigation-Components/Header Navigation System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Header Navigation System

A comprehensive navigation header system designed for University at Buffalo campus platform. These molecular components provide consistent navigation, search, notifications, and user controls across all HIVE platform pages.

## Campus Integration Features
- **Campus Search** - Find students, spaces, events, and campus resources with intelligent filtering
- **Activity Notifications** - Real-time alerts for space updates, friend requests, and campus events
- **Quick Actions** - Rapid access to create content, join spaces, and start conversations
- **Context Awareness** - Navigation adapts based on current page and user activity

## Navigation Types
- **Desktop Header** - Full-featured navigation with search, notifications, and user controls
- **Mobile Header** - Compact navigation optimized for touch interaction and small screens
- **Search-Focused** - Expanded search functionality with filters and recent searches
- **Notification-Heavy** - Emphasis on real-time campus activity and social updates

## Interactive Elements
- **Global Search** - Intelligent search across people, spaces, events, and campus resources
- **Notification Center** - Grouped notifications with quick actions and read/unread states
- **User Menu** - Profile access, settings, and account management
- **Quick Create** - Fast access to create posts, spaces, events, and study sessions

## Responsive Design
- **Mobile-First** - Touch-optimized navigation for on-campus mobile usage
- **Progressive Enhancement** - Feature-rich desktop experience with mobile fallbacks
- **Accessibility Focus** - Keyboard navigation and screen reader optimization
- **Campus Context** - University at Buffalo branding and campus-specific features
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Navigation Data
const campusNavigationData = {
  user: {
    name: 'Sarah Chen',
    handle: '@sarahc.cs',
    avatar: '/api/placeholder/40/40',
    year: 'Junior',
    major: 'Computer Science'
  },
  notifications: [
    {
      id: '1',
      type: 'space_update',
      title: 'New post in CSE 115 Study Group',
      message: 'Mike shared study notes for tomorrow\'s exam',
      time: '5 minutes ago',
      isRead: false,
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '2',
      type: 'friend_request',
      title: 'Connection request',
      message: 'Emily Rodriguez wants to connect',
      time: '1 hour ago',
      isRead: false,
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '3',
      type: 'event_reminder',
      title: 'Study session starting soon',
      message: 'Your CSE 474 study group starts in 30 minutes',
      time: '30 minutes ago',
      isRead: true,
      avatar: null
    },
    {
      id: '4',
      type: 'space_invite',
      title: 'Space invitation',
      message: 'You\'ve been invited to Buffalo Robotics Club',
      time: '2 hours ago',
      isRead: true,
      avatar: '/api/placeholder/32/32'
    }
  ],
  recentSearches: [
    'CSE 474 study group',
    'Lockwood Library hours',
    'Emily Rodriguez',
    'Pre-med spaces'
  ],
  quickActions: [
    { label: 'Create Post', icon: Plus, action: 'create_post' },
    { label: 'New Space', icon: Users, action: 'create_space' },
    { label: 'Plan Event', icon: Calendar, action: 'create_event' },
    { label: 'Study Session', icon: BookOpen, action: 'create_study' }
  ]
};

// Desktop Header Navigation Story
export const DesktopHeaderNavigation: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);

    const unreadCount = campusNavigationData.notifications.filter(n => !n.isRead).length;

    return (
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Brand */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">HIVE</div>
                  <div className="text-xs text-gray-500">University at Buffalo</div>
                </div>
              </div>

              {/* Main Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
                  <Home className="h-4 w-4" />
                  <span className="font-medium">Feed</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Spaces</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>Tools</span>
                </button>
              </nav>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search students, spaces, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  className="pl-10 pr-4 bg-gray-50 border-gray-200 focus:bg-white"
                />
                
                {/* Search Dropdown */}
                {(showSearch || searchQuery) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {searchQuery ? (
                      <div className="p-4">
                        <div className="text-sm text-gray-600 mb-2">Searching for "{searchQuery}"</div>
                        <div className="space-y-2">
                          <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <div className="font-medium">CSE 474 Study Group</div>
                            <div className="text-sm text-gray-600">Academic Space • 12 members</div>
                          </div>
                          <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <div className="font-medium">Sarah Chen</div>
                            <div className="text-sm text-gray-600">Computer Science • Junior</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Recent Searches</div>
                        <div className="space-y-1">
                          {campusNavigationData.recentSearches.map((search, index) => (
                            <button 
                              key={index}
                              className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                              onClick={() => setSearchQuery(search)}
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Actions & User */}
            <div className="flex items-center gap-3">
              {/* Quick Create */}
              <Button size="sm" className="hidden lg:flex">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>

              {/* Messages */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </div>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button className="text-sm text-blue-600 hover:underline">
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {campusNavigationData.notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                <Bell className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm">
                                {notification.title}
                              </div>
                              <div className="text-sm text-gray-600 truncate">
                                {notification.message}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </div>
                            </div>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-blue-600 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={campusNavigationData.user.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={campusNavigationData.user.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                            SC
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {campusNavigationData.user.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {campusNavigationData.user.handle}
                          </div>
                          <div className="text-xs text-gray-500">
                            {campusNavigationData.user.major} • {campusNavigationData.user.year}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="h-4 w-4" />
                        View Profile
                      </button>
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Click-away handlers */}
        {(showSearch || showNotifications || showUserMenu) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              setShowSearch(false);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
          />
        )}
      </div>
    );
  }
};

// Mobile Header Navigation Story
export const MobileHeaderNavigation: Story = {
  render: () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const unreadCount = campusNavigationData.notifications.filter(n => !n.isRead).length;

    return (
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        {/* Main Header */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left - Menu & Brand */}
            <div className="flex items-center gap-3">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">H</span>
                </div>
                <span className="font-bold text-gray-900">HIVE</span>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </button>

              <Avatar className="h-8 w-8">
                <AvatarImage src={campusNavigationData.user.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm">
                  SC
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Search Bar (when expanded) */}
        {showSearch && (
          <div className="px-4 pb-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search campus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                  autoFocus
                />
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShowSearch(false)}
              >
                Cancel
              </Button>
            </div>
            
            {/* Quick Search Results */}
            {searchQuery && (
              <div className="mt-3 space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">CSE 474 Study Group</div>
                  <div className="text-sm text-gray-600">Academic Space • 12 members</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Psychology • Sophomore</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Sidebar */}
        {showMobileMenu && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMobileMenu(false)}
            />
            
            {/* Menu Content */}
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-xl">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={campusNavigationData.user.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {campusNavigationData.user.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {campusNavigationData.user.major}
                      </div>
                    </div>
                  </div>
                  <button 
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="py-4">
                <div className="px-4 mb-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Navigation
                  </div>
                  <div className="space-y-1">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Campus Feed</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Users className="h-5 w-5" />
                      <span>My Spaces</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Calendar className="h-5 w-5" />
                      <span>Calendar</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <BookOpen className="h-5 w-5" />
                      <span>Campus Tools</span>
                    </button>
                  </div>
                </div>

                <div className="px-4 mb-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Quick Actions
                  </div>
                  <div className="space-y-1">
                    {campusNavigationData.quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <button 
                          key={index}
                          className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 px-4">
                  <div className="space-y-1">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
};

// Interactive Header Demo Story
export const InteractiveHeaderDemo: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('feed');
    const [notifications, setNotifications] = React.useState(campusNavigationData.notifications);
    const [searchQuery, setSearchQuery] = React.useState('');

    const markAsRead = (notificationId: string) => {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const navigationTabs = [
      { id: 'feed', label: 'Feed', icon: Home },
      { id: 'spaces', label: 'Spaces', icon: Users },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'tools', label: 'Tools', icon: BookOpen }
    ];

    return (
      <div className="w-full bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">HIVE</div>
                  <div className="text-xs text-gray-500">University at Buffalo</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1">
                {navigationTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button size="sm" variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
                
                <div className="relative">
                  <Button size="sm" variant="secondary" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </div>
                    )}
                  </Button>
                </div>

                <Avatar className="h-8 w-8">
                  <AvatarImage src={campusNavigationData.user.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Header Demo</h2>
            <p className="text-lg text-gray-600 mb-8">
              Current tab: <span className="font-semibold capitalize">{activeTab}</span>
            </p>

            {/* Demo Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div 
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      notification.isRead ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        <Bell className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 text-sm">
                        {notification.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {notification.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};