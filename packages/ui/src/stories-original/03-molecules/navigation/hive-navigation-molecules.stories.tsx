import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { Search, Bell, MessageSquare, Users, Calendar, BookOpen, Settings, Plus, Menu, X, Home, ChevronDown, ChevronRight, User, LogOut, Bookmark, Star, Filter } from 'lucide-react';

// HIVE Navigation Molecules - Dense Mobile-First Design
const meta: Meta = {
  title: 'Molecules/🧭 Navigation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**HIVE Navigation Molecules** - Mobile-first social navigation with dense responsive layouts

Brand-compliant navigation patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that pack content intelligently across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for active states and primary actions
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for text
- **Zero Non-Brand Colors**: No blues, greens, reds, or other colors

## Dense Navigation Patterns
- **Mobile-First**: Touch-friendly navigation that scales up
- **Compact Spacing**: Minimal gaps with intelligent content packing
- **Quick Access**: Frequently used actions prominently placed
- **Campus Context**: Navigation tailored for university social needs

## Campus Social Features
- Spaces navigation (courses, housing, clubs)
- Real-time notifications and messages
- Quick actions for campus life
- Tool creation and management access
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Mobile Navigation Bar - Primary Campus Navigation
const MobileNavigationBar: React.FC<{
  activeTab?: string;
  notificationCount?: number;
  messageCount?: number;
  onTabChange?: (tab: string) => void;
}> = ({ 
  activeTab = 'spaces',
  notificationCount = 3,
  messageCount = 7,
  onTabChange = () => {}
}) => {
  const tabs = [
    { id: 'spaces', label: 'Spaces', icon: Users },
    { id: 'calendar', label: 'Schedule', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messageCount },
    { id: 'tools', label: 'Tools', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="bg-obsidian border-t border-steel">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-gold' 
                  : 'text-silver hover:text-platinum'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-gold' : ''}`} />
                {tab.badge && (
                  <div className="absolute -top-2 -right-2 bg-gold text-obsidian text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-gold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Campus Navigation Header - Quick Actions & Search
const CampusNavigationHeader: React.FC<{
  currentSpace?: string;
  hasNotifications?: boolean;
  notificationCount?: number;
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}> = ({ 
  currentSpace = 'CS 106B: Programming Abstractions',
  hasNotifications = true,
  notificationCount = 5,
  onSearch = () => {},
  onNotifications = () => {},
  onProfile = () => {}
}) => {
  return (
    <div className="bg-obsidian border-b border-steel">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Current Context */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-gold flex-shrink-0" />
            <span className="text-platinum font-medium truncate text-sm">
              {currentSpace}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSearch}
            className="p-2 rounded-lg hover:bg-charcoal transition-colors"
          >
            <Search className="h-5 w-5 text-silver hover:text-platinum" />
          </button>
          
          <button
            onClick={onNotifications}
            className="relative p-2 rounded-lg hover:bg-charcoal transition-colors"
          >
            <Bell className="h-5 w-5 text-silver hover:text-platinum" />
            {hasNotifications && (
              <div className="absolute -top-1 -right-1 bg-gold text-obsidian text-xs font-bold rounded-full min-w-4 h-4 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </div>
            )}
          </button>

          <button
            onClick={onProfile}
            className="w-8 h-8 bg-charcoal rounded-full border-2 border-steel hover:border-gold transition-colors flex items-center justify-center"
          >
            <User className="h-4 w-4 text-silver" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Spaces Quick Access Navigation - Dense Campus Communities
const SpacesQuickAccess: React.FC<{
  spaces?: Array<{
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club';
    unreadCount?: number;
    isPinned?: boolean;
  }>;
  onSpaceClick?: (spaceId: string) => void;
}> = ({ 
  spaces = [
    { id: 'cs106b', name: 'CS 106B', type: 'course', unreadCount: 8, isPinned: true },
    { id: 'wilbur-3rd', name: 'Wilbur 3rd', type: 'housing', unreadCount: 3, isPinned: true },
    { id: 'hci-club', name: 'HCI Club', type: 'club', unreadCount: 2 },
    { id: 'cs161', name: 'CS 161', type: 'course', unreadCount: 12 },
    { id: 'dorm-study', name: 'Study Group', type: 'club', unreadCount: 1 }
  ],
  onSpaceClick = () => {}
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'housing': return Home;
      case 'club': return Users;
      default: return Users;
    }
  };

  return (
    <div className="bg-charcoal border-b border-steel">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-platinum">Quick Access</h3>
          <button className="text-xs text-silver hover:text-gold transition-colors">
            See All
          </button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {spaces.map((space) => {
            const Icon = getTypeIcon(space.type);
            
            return (
              <button
                key={space.id}
                onClick={() => onSpaceClick(space.id)}
                className="relative flex-shrink-0 flex items-center space-x-2 bg-graphite hover:bg-slate border border-steel hover:border-gold/50 rounded-lg py-2 px-3 transition-all duration-200"
              >
                {space.isPinned && (
                  <Star className="h-3 w-3 text-gold absolute -top-1 -right-1" fill="currentColor" />
                )}
                
                <Icon className="h-4 w-4 text-silver" />
                <span className="text-sm font-medium text-platinum whitespace-nowrap">
                  {space.name}
                </span>
                
                {space.unreadCount && space.unreadCount > 0 && (
                  <div className="bg-gold text-obsidian text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center">
                    {space.unreadCount > 99 ? '99+' : space.unreadCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Navigation Breadcrumb - Campus Context Trail
const CampusNavigationBreadcrumb: React.FC<{
  breadcrumbs?: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  onBreadcrumbClick?: (path: string) => void;
}> = ({ 
  breadcrumbs = [
    { id: 'spaces', label: 'Spaces', path: '/spaces' },
    { id: 'cs106b', label: 'CS 106B', path: '/spaces/cs106b' },
    { id: 'discussion', label: 'Assignment 4 Discussion', path: '/spaces/cs106b/discussion/123' }
  ],
  onBreadcrumbClick = () => {}
}) => {
  return (
    <div className="bg-charcoal border-b border-steel px-4 py-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.id} className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => onBreadcrumbClick(crumb.path)}
              className={`text-sm transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-platinum font-medium cursor-default'
                  : 'text-silver hover:text-gold'
              }`}
            >
              {crumb.label}
            </button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-3 w-3 text-pewter" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Campus Tools Navigation - HIVE Lab Quick Access
const CampusToolsNavigation: React.FC<{
  tools?: Array<{
    id: string;
    name: string;
    icon: string;
    isNew?: boolean;
    category: 'created' | 'favorite' | 'recent';
  }>;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: () => void;
}> = ({ 
  tools = [
    { id: 'grade-tracker', name: 'Grade Tracker', icon: '📊', category: 'created' },
    { id: 'study-timer', name: 'Study Timer', icon: '⏱️', category: 'favorite' },
    { id: 'room-finder', name: 'Room Finder', icon: '🏛️', category: 'recent', isNew: true },
    { id: 'schedule-optimizer', name: 'Schedule Helper', icon: '📅', category: 'favorite' }
  ],
  onToolClick = () => {},
  onCreateTool = () => {}
}) => {
  return (
    <div className="bg-charcoal border-b border-steel">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-platinum flex items-center">
            <BookOpen className="h-4 w-4 text-gold mr-2" />
            HIVE Tools
          </h3>
          <button
            onClick={onCreateTool}
            className="flex items-center space-x-1 bg-gold text-obsidian px-3 py-1 rounded-md text-xs font-semibold hover:bg-champagne transition-colors"
          >
            <Plus className="h-3 w-3" />
            <span>Create</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolClick(tool.id)}
              className="relative flex items-center space-x-2 bg-graphite hover:bg-slate border border-steel hover:border-gold/50 rounded-lg p-3 transition-all duration-200 text-left"
            >
              {tool.isNew && (
                <div className="absolute -top-1 -right-1 bg-gold text-obsidian text-xs font-bold px-1 rounded">
                  NEW
                </div>
              )}
              
              <span className="text-lg">{tool.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-platinum truncate">
                  {tool.name}
                </div>
                <div className="text-xs text-silver capitalize">
                  {tool.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dense Sidebar Navigation - Desktop Campus Navigation
const DenseCampusSidebar: React.FC<{
  isCollapsed?: boolean;
  activeSection?: string;
  onToggleCollapse?: () => void;
  onSectionChange?: (section: string) => void;
}> = ({ 
  isCollapsed = false,
  activeSection = 'spaces',
  onToggleCollapse = () => {},
  onSectionChange = () => {}
}) => {
  const navigationSections = [
    { id: 'spaces', label: 'My Spaces', icon: Users, badge: 12 },
    { id: 'calendar', label: 'Schedule', icon: Calendar, badge: 3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 7 },
    { id: 'tools', label: 'HIVE Tools', icon: BookOpen, badge: 2 },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`bg-obsidian border-r border-steel transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-steel">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-bold text-gold">HIVE</h2>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-charcoal transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-silver" />
              ) : (
                <Menu className="h-4 w-4 text-silver" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {navigationSections.map((section) => {
              const isActive = activeSection === section.id;
              const Icon = section.icon;
              
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold/10 border border-gold/30 text-gold'
                      : 'hover:bg-charcoal text-silver hover:text-platinum'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-gold' : ''}`} />
                    {!isCollapsed && (
                      <span className={`font-medium ${isActive ? 'text-gold' : ''}`}>
                        {section.label}
                      </span>
                    )}
                  </div>
                  
                  {!isCollapsed && section.badge && (
                    <div className={`text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center ${
                      isActive
                        ? 'bg-gold text-obsidian'
                        : 'bg-steel text-silver'
                    }`}>
                      {section.badge > 99 ? '99+' : section.badge}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-steel">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-charcoal rounded-full border-2 border-steel flex items-center justify-center">
              <User className="h-4 w-4 text-silver" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-platinum truncate">
                  Maya Patel
                </div>
                <div className="text-xs text-silver">
                  Stanford CS
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stories

export const MobileCampusNavigation: Story = {
  name: '📱 Mobile Campus Navigation',
  render: () => (
    <div className="h-screen bg-obsidian flex flex-col">
      <CampusNavigationHeader />
      <SpacesQuickAccess />
      <div className="flex-1 bg-charcoal p-4">
        <div className="text-center text-silver mt-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-gold" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Campus Navigation</h3>
          <p className="text-sm">Navigate your university community with ease</p>
        </div>
      </div>
      <MobileNavigationBar />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile2' }
  }
};

export const DenseSpacesQuickAccess: Story = {
  name: '🏛️ Dense Spaces Navigation',
  render: () => (
    <div className="bg-obsidian min-h-screen">
      <SpacesQuickAccess />
      <div className="p-4">
        <div className="bg-charcoal rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-gold mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Quick Space Access</h3>
          <p className="text-sm text-silver">
            Pinned and recent campus communities for fast navigation
          </p>
        </div>
      </div>
    </div>
  )
};

export const HIVEToolsNavigation: Story = {
  name: '🛠️ HIVE Tools Navigation',
  render: () => (
    <div className="bg-obsidian min-h-screen">
      <CampusToolsNavigation />
      <div className="p-4">
        <div className="bg-charcoal rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-gold mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Campus Tools</h3>
          <p className="text-sm text-silver">
            Quick access to your created and favorite HIVE tools
          </p>
        </div>
      </div>
    </div>
  )
};

export const CampusBreadcrumbNavigation: Story = {
  name: '🧭 Campus Breadcrumb Trail',
  render: () => (
    <div className="bg-obsidian min-h-screen">
      <CampusNavigationBreadcrumb />
      <div className="p-4">
        <div className="bg-charcoal rounded-lg p-6">
          <h3 className="text-lg font-semibold text-platinum mb-4">Context Navigation</h3>
          <div className="space-y-3 text-sm text-silver">
            <div>• Track your location within campus communities</div>
            <div>• Navigate back to parent spaces easily</div>
            <div>• Maintain context across deep discussions</div>
            <div>• Mobile-optimized horizontal scrolling</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const DesktopCampusSidebar: Story = {
  name: '💻 Desktop Campus Sidebar',
  render: () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    
    return (
      <div className="h-screen bg-obsidian flex">
        <DenseCampusSidebar 
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <div className="flex-1 bg-charcoal p-8">
          <div className="text-center">
            <Users className="h-16 w-16 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-platinum mb-4">Campus Navigation</h2>
            <p className="text-silver">
              Dense sidebar navigation with collapsible design for desktop campus experience
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export const ResponsiveCampusNavigation: Story = {
  name: '📐 Responsive Campus Navigation',
  render: () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    
    React.useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
      <div className="h-screen bg-obsidian">
        {isMobile ? (
          <div className="flex flex-col h-full">
            <CampusNavigationHeader />
            <SpacesQuickAccess />
            <div className="flex-1 bg-charcoal p-4">
              <div className="text-center text-silver mt-8">
                <h3 className="text-lg font-semibold text-platinum mb-2">Mobile View</h3>
                <p className="text-sm">Optimized for touch navigation</p>
              </div>
            </div>
            <MobileNavigationBar />
          </div>
        ) : (
          <div className="flex h-full">
            <DenseCampusSidebar />
            <div className="flex-1 bg-charcoal p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-platinum mb-4">Desktop View</h2>
                <p className="text-silver">Sidebar navigation for larger screens</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};