import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Users, User, Hexagon, Search, Bell, MessageCircle, Calendar, Settings, PlusCircle, Menu, X } from 'lucide-react';

// Nav Shell - The Global Navigation Architecture
// Desktop: Left Sidebar with primary destinations
// Mobile: Bottom Tab Bar with primary destinations
// This is the foundational navigation structure for the entire HIVE platform

interface NavShellProps {
  currentDestination?: 'feed' | 'spaces' | 'profile' | 'hivelab';
  className?: string;
  variant?: 'desktop' | 'mobile';
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role: 'student' | 'builder' | 'leader';
    school: string;
  };
  onNavigate?: (destination: string) => void;
  onAction?: (action: string) => void;
}

const NavShell = ({ 
  currentDestination = 'feed', 
  variant = 'desktop',
  user = {
    id: '1',
    name: 'Alex Chen',
    handle: '@alexc',
    avatar: '/api/placeholder/40/40',
    role: 'builder',
    school: 'Stanford University'
  },
  onNavigate = () => {},
  onAction = () => {}
}: NavShellProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [notifications, setNotifications] = useState(3);

  const primaryDestinations = [
    {
      id: 'feed',
      label: 'Feed',
      icon: Home,
      description: 'Your personalized campus feed',
      badge: null
    },
    {
      id: 'spaces',
      label: 'Spaces',
      icon: Users,
      description: 'Communities & groups',
      badge: '2' // New activity
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Your profile & dashboard',
      badge: null
    },
    {
      id: 'hivelab',
      label: 'HiveLAB',
      icon: Hexagon,
      description: 'Build & discover tools',
      badge: 'new' // New feature
    }
  ];

  const quickActions = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: notifications },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: '5' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' }
  ];

  if (variant === 'mobile') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-hive-surface-elevated border-t border-hive-border-subtle">
        {/* Mobile Bottom Tab Bar */}
        <div className="flex items-center justify-around px-2 py-2 safe-bottom">
          {primaryDestinations.map((destination) => {
            const Icon = destination.icon;
            const isActive = currentDestination === destination.id;
            
            return (
              <button
                key={destination.id}
                onClick={() => onNavigate(destination.id)}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 relative
                  ${isActive 
                    ? 'text-hive-gold bg-hive-gold/10' 
                    : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover'
                  }
                `}
              >
                <div className="relative">
                  <Icon size={20} />
                  {destination.badge && (
                    <div className={`
                      absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium
                      ${destination.badge === 'new' 
                        ? 'bg-hive-gold text-hive-text-primary' 
                        : 'bg-hive-error text-white'
                      }
                      ${destination.badge.length === 1 ? 'w-4 h-4 flex items-center justify-center p-0' : ''}
                    `}>
                      {destination.badge === 'new' ? '●' : destination.badge}
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{destination.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-hive-gold rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`
      fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-64' : 'w-16'}
      bg-hive-surface-elevated border-r border-hive-border-subtle
    `}>
      {/* Desktop Left Sidebar */}
      <div className="flex flex-col h-full">
        
        {/* Header with HIVE Brand & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-hive-border-subtle">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-hive-gold rounded-lg flex items-center justify-center">
                <Hexagon size={20} className="text-hive-text-primary" />
              </div>
              <span className="text-lg font-bold text-hive-text-primary">HIVE</span>
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
          >
            {isExpanded ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* User Profile Section */}
        {isExpanded && (
          <div className="p-4 border-b border-hive-border-subtle">
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-hive-text-primary truncate">{user.name}</div>
                <div className="text-sm text-hive-text-tertiary truncate">{user.handle}</div>
              </div>
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${user.role === 'builder' ? 'bg-hive-gold/20 text-hive-gold' : 
                  user.role === 'leader' ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-hive-surface-hover text-hive-text-secondary'}
              `}>
                {user.role}
              </div>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <div className="flex-1 p-2">
          <div className="space-y-1">
            {primaryDestinations.map((destination) => {
              const Icon = destination.icon;
              const isActive = currentDestination === destination.id;
              
              return (
                <button
                  key={destination.id}
                  onClick={() => onNavigate(destination.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative group
                    ${isActive 
                      ? 'bg-hive-gold/10 text-hive-gold border-l-2 border-hive-gold' 
                      : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover'
                    }
                  `}
                >
                  <div className="relative flex-shrink-0">
                    <Icon size={20} />
                    {destination.badge && (
                      <div className={`
                        absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium
                        ${destination.badge === 'new' 
                          ? 'bg-hive-gold text-hive-text-primary' 
                          : 'bg-hive-error text-white'
                        }
                        ${destination.badge.length === 1 ? 'w-4 h-4 flex items-center justify-center p-0' : ''}
                      `}>
                        {destination.badge === 'new' ? '●' : destination.badge}
                      </div>
                    )}
                  </div>
                  
                  {isExpanded && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{destination.label}</div>
                        <div className="text-xs text-hive-text-tertiary mt-0.5">
                          {destination.description}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="text-sm font-medium text-hive-text-primary">{destination.label}</div>
                      <div className="text-xs text-hive-text-tertiary">{destination.description}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            {isExpanded && (
              <div className="text-xs font-medium text-hive-text-tertiary uppercase tracking-wider mb-2 px-3">
                Quick Actions
              </div>
            )}
            <div className="space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                
                return (
                  <button
                    key={action.id}
                    onClick={() => onAction(action.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover relative group"
                  >
                    <div className="relative flex-shrink-0">
                      <Icon size={18} />
                      {action.badge && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-error text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {action.badge}
                        </div>
                      )}
                    </div>
                    
                    {isExpanded && (
                      <span className="font-medium">{action.label}</span>
                    )}
                    
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="text-sm font-medium text-hive-text-primary whitespace-nowrap">{action.label}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-2 border-t border-hive-border-subtle">
          <button
            onClick={() => onAction('create')}
            className={`
              w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200
              bg-hive-gold hover:bg-hive-gold/90 text-hive-text-primary font-medium
            `}
          >
            <PlusCircle size={18} />
            {isExpanded && <span>Create</span>}
          </button>
          
          {isExpanded && (
            <button
              onClick={() => onAction('settings')}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover mt-1"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof NavShell> = {
  title: '03-organisms/Nav Shell',
  component: NavShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Nav Shell - Global Navigation Architecture

The Nav Shell is the foundational navigation structure for the entire HIVE platform, providing consistent access to primary destinations and quick actions across all pages.

## Architecture

**Desktop Experience:**
- Left sidebar navigation with expandable/collapsible states
- Primary destinations: Feed, Spaces, Profile, HiveLAB
- Quick actions: Search, Notifications, Messages, Calendar
- User profile integration
- Context-aware Create button

**Mobile Experience:**
- Bottom tab bar with primary destinations
- Optimized touch targets and safe area support
- Badge notifications for activity indicators
- Consistent iconography with desktop

## Navigation Principles

- **Utility over Vanity**: Every navigation item serves a functional purpose
- **Progressive Disclosure**: Collapsed state shows essentials, expanded shows context
- **Social Utility Integration**: Navigation reflects HIVE's social utility philosophy
- **Campus Context**: Badges and notifications reflect campus-specific activity

## Interaction Patterns

- Hover states reveal tooltips in collapsed mode
- Active states use HIVE gold with subtle background
- Badge notifications indicate new activity or features
- Smooth transitions between expanded/collapsed states
        `
      }
    }
  },
  argTypes: {
    currentDestination: {
      control: 'select',
      options: ['feed', 'spaces', 'profile', 'hivelab'],
      description: 'Currently active navigation destination'
    },
    variant: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Navigation variant for different screen sizes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof NavShell>;

// Primary Stories
export const DesktopExpanded: Story = {
  args: {
    variant: 'desktop',
    currentDestination: 'feed',
    user: {
      id: '1',
      name: 'Alex Chen',
      handle: '@alexc',
      avatar: '/api/placeholder/40/40',
      role: 'builder',
      school: 'Stanford University'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop navigation in expanded state showing full labels and descriptions.'
      }
    }
  }
};

export const DesktopCollapsed: Story = {
  args: {
    ...DesktopExpanded.args
  },
  render: (args) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="h-screen bg-hive-surface-primary">
        <NavShell 
          {...args} 
          onAction={(action) => {
            if (action === 'toggle') setIsExpanded(!isExpanded);
            console.log('Action:', action);
          }}
        />
        <div className="ml-16 p-8">
          <h1 className="text-2xl font-bold text-hive-text-primary mb-4">Collapsed Navigation</h1>
          <p className="text-hive-text-secondary">Hover over navigation items to see tooltips with full context.</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop navigation in collapsed state with tooltip hover states.'
      }
    }
  }
};

export const MobileBottomTabs: Story = {
  args: {
    variant: 'mobile',
    currentDestination: 'spaces',
    user: {
      id: '2',
      name: 'Sarah Kim',
      handle: '@sarahk',
      avatar: '/api/placeholder/40/40',
      role: 'student',
      school: 'UC Berkeley'
    }
  },
  render: (args) => (
    <div className="h-screen bg-hive-surface-primary relative">
      <div className="p-6 pb-20">
        <h1 className="text-2xl font-bold text-hive-text-primary mb-4">Mobile Navigation</h1>
        <p className="text-hive-text-secondary mb-6">Bottom tab bar provides quick access to primary destinations.</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
            <h3 className="font-medium text-hive-text-primary mb-2">Current: Spaces</h3>
            <p className="text-sm text-hive-text-secondary">Active destination highlighted with gold accent and top indicator bar.</p>
          </div>
          
          <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
            <h3 className="font-medium text-hive-text-primary mb-2">Activity Badges</h3>
            <p className="text-sm text-hive-text-secondary">Notifications show new activity in Spaces (2) and new HiveLAB feature indicator.</p>
          </div>
        </div>
      </div>
      <NavShell {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile bottom tab navigation optimized for touch interaction.'
      }
    }
  }
};

// Campus Role Stories
export const StudentBuilder: Story = {
  args: {
    variant: 'desktop',
    currentDestination: 'hivelab',
    user: {
      id: '3',
      name: 'Marcus Johnson',
      handle: '@marcusj',
      avatar: '/api/placeholder/40/40',
      role: 'builder',
      school: 'MIT'
    }
  },
  render: (args) => (
    <div className="h-screen bg-hive-surface-primary">
      <NavShell {...args} />
      <div className="ml-64 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-hive-text-primary mb-6">Student Builder Navigation</h1>
          <div className="grid gap-6">
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2 flex items-center gap-2">
                <Hexagon size={16} className="text-hive-gold" />
                HiveLAB Active
              </h3>
              <p className="text-hive-text-secondary">Currently browsing the tool creation workspace. Builder role highlighted with gold badge.</p>
            </div>
            
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2">Builder Context</h3>
              <p className="text-hive-text-secondary">Navigation emphasizes creation tools and collaboration features. Create button prominently displayed for quick tool development.</p>
            </div>
            
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2">Activity Indicators</h3>
              <p className="text-hive-text-secondary">Badge on Spaces (2) indicates new collaboration requests. Notifications (3) show tool feedback and community engagement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation for a student builder actively working in HiveLAB.'
      }
    }
  }
};

export const CommunityLeader: Story = {
  args: {
    variant: 'desktop',
    currentDestination: 'spaces',
    user: {
      id: '4',
      name: 'Emma Rodriguez',
      handle: '@emmar',
      avatar: '/api/placeholder/40/40',
      role: 'leader',
      school: 'University of Texas'
    }
  },
  render: (args) => (
    <div className="h-screen bg-hive-surface-primary">
      <NavShell {...args} />
      <div className="ml-64 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-hive-text-primary mb-6">Community Leader Navigation</h1>
          <div className="grid gap-6">
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2 flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                Spaces Management
              </h3>
              <p className="text-hive-text-secondary">Managing multiple student communities. Leader role indicated with blue badge and elevated permissions.</p>
            </div>
            
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2">High Activity Context</h3>
              <p className="text-hive-text-secondary">Multiple notifications (3) and messages (5) reflect active community management responsibilities.</p>
            </div>
            
            <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
              <h3 className="font-medium text-hive-text-primary mb-2">Leadership Tools</h3>
              <p className="text-hive-text-secondary">Quick access to community creation tools and administrative functions through prominent Create button.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation optimized for community leaders managing multiple spaces.'
      }
    }
  }
};

// Interactive Navigation Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [currentDestination, setCurrentDestination] = useState<'feed' | 'spaces' | 'profile' | 'hivelab'>('feed');
    const [variant, setVariant] = useState<'desktop' | 'mobile'>('desktop');
    const [notifications, setNotifications] = useState(3);
    
    const handleNavigate = (destination: string) => {
      setCurrentDestination(destination as any);
      console.log('Navigating to:', destination);
    };
    
    const handleAction = (action: string) => {
      if (action === 'notifications') {
        setNotifications(0);
      }
      console.log('Action triggered:', action);
    };
    
    const destinationContent = {
      feed: {
        title: 'Campus Feed',
        description: 'Your personalized view of campus activity, coordinated study sessions, and community updates.',
        features: ['Algorithmic feed prioritizing utility', 'Study session coordination', 'Community announcements', 'Tool sharing and collaboration']
      },
      spaces: {
        title: 'Campus Spaces',
        description: 'Functional communities where students coordinate, collaborate, and solve problems together.',
        features: ['Academic study groups', 'Dorm coordination spaces', 'Club project management', 'Peer collaboration tools']
      },
      profile: {
        title: 'Your Profile Board',
        description: 'Your campus command center with customizable widgets for managing your student life.',
        features: ['4-column Bento Grid layout', 'Customizable widgets', 'Calendar integration', 'Social status controls']
      },
      hivelab: {
        title: 'HiveLAB Workshop',
        description: 'Build, share, and discover campus tools that solve real problems for your community.',
        features: ['Visual tool builder', 'Community tool sharing', 'Campus-specific solutions', 'Collaborative development']
      }
    };
    
    const currentContent = destinationContent[currentDestination];
    
    return (
      <div className="h-screen bg-hive-surface-primary relative">
        {/* Variant Toggle */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setVariant('desktop')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              variant === 'desktop' 
                ? 'bg-hive-gold text-hive-text-primary' 
                : 'bg-hive-surface-elevated text-hive-text-secondary hover:text-hive-text-primary'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setVariant('mobile')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              variant === 'mobile' 
                ? 'bg-hive-gold text-hive-text-primary' 
                : 'bg-hive-surface-elevated text-hive-text-secondary hover:text-hive-text-primary'
            }`}
          >
            Mobile
          </button>
        </div>
        
        <NavShell 
          variant={variant}
          currentDestination={currentDestination}
          onNavigate={handleNavigate}
          onAction={handleAction}
          user={{
            id: '1',
            name: 'Alex Chen',
            handle: '@alexc',
            avatar: '/api/placeholder/40/40',
            role: 'builder',
            school: 'Stanford University'
          }}
        />
        
        {/* Main Content Area */}
        <div className={`${variant === 'desktop' ? 'ml-64' : 'mb-16'} p-8`}>
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-hive-text-primary mb-4">{currentContent.title}</h1>
            <p className="text-lg text-hive-text-secondary mb-8">{currentContent.description}</p>
            
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Key Features:</h3>
              {currentContent.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
                  <div className="w-2 h-2 bg-hive-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-hive-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-hive-gold/10 border border-hive-gold/20 rounded-xl">
              <h4 className="font-semibold text-hive-text-primary mb-2">Interactive Demo</h4>
              <p className="text-hive-text-secondary">
                Click navigation items to explore different destinations. Try toggling between desktop and mobile variants 
                to see responsive behavior. Notice how badges and notifications update with user interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showcasing responsive navigation behavior and destination content.'
      }
    }
  }
};

// Edge Cases and States
export const HighActivityState: Story = {
  args: {
    variant: 'desktop',
    currentDestination: 'feed',
    user: {
      id: '5',
      name: 'Jordan Park',
      handle: '@jordanp',
      avatar: '/api/placeholder/40/40',
      role: 'leader',
      school: 'UCLA'
    }
  },
  render: (args) => {
    const [mockNotifications] = useState(12);
    const [mockMessages] = useState(8);
    
    return (
      <div className="h-screen bg-hive-surface-primary">
        <NavShell 
          {...args}
          onAction={(action) => {
            console.log('High activity action:', action);
          }}
        />
        <div className="ml-64 p-8">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-hive-text-primary mb-6">High Activity Navigation State</h1>
            
            <div className="grid gap-6">
              <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
                <h3 className="font-medium text-hive-text-primary mb-2 flex items-center gap-2">
                  <Bell size={16} className="text-hive-error" />
                  Multiple Activity Sources
                </h3>
                <p className="text-hive-text-secondary">Demonstrating navigation behavior with high notification volume (12) and active messaging (8).</p>
              </div>
              
              <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
                <h3 className="font-medium text-hive-text-primary mb-2">Badge Hierarchy</h3>
                <p className="text-hive-text-secondary">Numbers for countable items, "new" indicator for feature announcements, color coding for urgency levels.</p>
              </div>
              
              <div className="p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle">
                <h3 className="font-medium text-hive-text-primary mb-2">Scalable Design</h3>
                <p className="text-hive-text-secondary">Navigation maintains clarity and usability even with multiple active notification sources.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation behavior under high activity conditions with multiple notification sources.'
      }
    }
  }
};