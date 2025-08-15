import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Settings, Share, Edit3, Users, Calendar, Bell, MoreHorizontal, ChevronDown, Bookmark, Flag, ExternalLink } from 'lucide-react';

// Top Nav Bar - Contextual Navigation Component
// Adapts to show page-specific actions, breadcrumbs, and contextual controls
// Works in conjunction with Nav Shell to provide complete navigation architecture

interface TopNavBarProps {
  context?: 'feed' | 'spaces' | 'profile' | 'hivelab' | 'space-detail' | 'tool-detail';
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: Array<{
    id: string;
    label: string;
    icon: any;
    variant?: 'primary' | 'secondary' | 'ghost';
    badge?: string | number;
  }>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  onAction?: (actionId: string) => void;
  onSearch?: (query: string) => void;
  onBack?: () => void;
  className?: string;
}

const TopNavBar = ({
  context = 'feed',
  title,
  subtitle,
  breadcrumbs,
  actions = [],
  showSearch = false,
  searchPlaceholder = 'Search...',
  user,
  onAction = () => {},
  onSearch = () => {},
  onBack = () => {},
  ...props
}: TopNavBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const renderContextualContent = () => {
    switch (context) {
      case 'feed':
        return (
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-hive-text-primary">{title || 'Campus Feed'}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      case 'spaces':
        return (
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-hive-text-primary">{title || 'Campus Spaces'}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-hive-text-primary">{title || 'Your Profile'}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      case 'hivelab':
        return (
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-hive-text-primary">{title || 'HiveLAB'}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      case 'space-detail':
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              {breadcrumbs && (
                <div className="flex items-center gap-2 text-sm text-hive-text-tertiary mb-1">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={index} className="flex items-center gap-2">
                      {crumb.href ? (
                        <button className="hover:text-hive-text-secondary transition-colors">
                          {crumb.label}
                        </button>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                      {index < breadcrumbs.length - 1 && <span>/</span>}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-xl font-bold text-hive-text-primary">{title}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      case 'tool-detail':
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              {breadcrumbs && (
                <div className="flex items-center gap-2 text-sm text-hive-text-tertiary mb-1">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={index} className="flex items-center gap-2">
                      {crumb.href ? (
                        <button className="hover:text-hive-text-secondary transition-colors">
                          {crumb.label}
                        </button>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                      {index < breadcrumbs.length - 1 && <span>/</span>}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-xl font-bold text-hive-text-primary">{title}</h1>
              {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-xl font-bold text-hive-text-primary">{title || 'HIVE'}</h1>
            {subtitle && <p className="text-sm text-hive-text-tertiary">{subtitle}</p>}
          </div>
        );
    }
  };

  return (
    <div className="bg-hive-surface-elevated border-b border-hive-border-subtle px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Left: Contextual Content */}
        <div className="flex-1 min-w-0">
          {renderContextualContent()}
        </div>

        {/* Center: Search (if enabled) */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hive-text-tertiary" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-hive-surface-primary border border-hive-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-hive-gold/50 focus:border-hive-gold text-hive-text-primary placeholder-hive-text-tertiary"
              />
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            const variant = action.variant || 'ghost';
            
            return (
              <button
                key={action.id}
                onClick={() => onAction(action.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative
                  ${variant === 'primary' 
                    ? 'bg-hive-gold text-hive-text-primary hover:bg-hive-gold/90' 
                    : variant === 'secondary'
                    ? 'bg-hive-surface-primary border border-hive-border-subtle text-hive-text-primary hover:bg-hive-surface-hover'
                    : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover'
                  }
                `}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{action.label}</span>
                {action.badge && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-error text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {action.badge}
                  </div>
                )}
              </button>
            );
          })}

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-hive-surface-hover transition-colors"
              >
                <img 
                  src={user.avatar || '/api/placeholder/32/32'} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown size={16} className="text-hive-text-tertiary" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg shadow-lg py-2 z-50">
                  <div className="px-3 py-2 border-b border-hive-border-subtle">
                    <div className="font-medium text-hive-text-primary">{user.name}</div>
                    <div className="text-sm text-hive-text-tertiary">@{user.name.toLowerCase().replace(' ', '')}</div>
                  </div>
                  <button className="w-full text-left px-3 py-2 hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                    Help
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof TopNavBar> = {
  title: '03-organisms/Top Nav Bar',
  component: TopNavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Top Nav Bar - Contextual Navigation

The Top Nav Bar provides contextual navigation that adapts to each page's specific needs while maintaining consistency across the HIVE platform.

## Architecture Principles

**Contextual Adaptation:**
- Feed: Global search and discovery actions
- Spaces: Community management and filtering
- Profile: Customization and privacy controls
- HiveLAB: Creation and sharing tools
- Detail Views: Back navigation with breadcrumbs

**Progressive Disclosure:**
- Essential actions always visible
- Secondary actions grouped in overflow menus
- Responsive behavior prioritizes core functionality

**Integration with Nav Shell:**
- Complements global navigation structure
- Provides page-specific context and actions
- Maintains design system consistency

## Content Strategy

- **Utility over Vanity**: Every action serves a functional purpose
- **Campus Context**: Actions reflect student workflow needs
- **Social Utility**: Balances individual and community functionality
        `
      }
    }
  },
  argTypes: {
    context: {
      control: 'select',
      options: ['feed', 'spaces', 'profile', 'hivelab', 'space-detail', 'tool-detail'],
      description: 'Navigation context that determines layout and available actions'
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show the search input in the center'
    }
  }
};

export default meta;
type Story = StoryObj<typeof TopNavBar>;

// Primary Context Stories
export const FeedContext: Story = {
  args: {
    context: 'feed',
    title: 'Campus Feed',
    subtitle: 'Stanford University',
    showSearch: true,
    searchPlaceholder: 'Search campus activity...',
    actions: [
      { id: 'filter', label: 'Filter', icon: Filter, variant: 'ghost' },
      { id: 'notifications', label: 'Notifications', icon: Bell, variant: 'ghost', badge: 3 }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Feed context with global search and activity filtering options.'
      }
    }
  }
};

export const SpacesContext: Story = {
  args: {
    context: 'spaces',
    title: 'Campus Spaces',
    subtitle: '12 active communities',
    showSearch: true,
    searchPlaceholder: 'Search spaces and communities...',
    actions: [
      { id: 'filter', label: 'Filter', icon: Filter, variant: 'ghost' },
      { id: 'create-space', label: 'Create Space', icon: Plus, variant: 'primary' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Spaces context with community creation and discovery tools.'
      }
    }
  }
};

export const ProfileContext: Story = {
  args: {
    context: 'profile',
    title: 'Your Profile',
    subtitle: 'Campus command center',
    actions: [
      { id: 'customize', label: 'Customize', icon: Edit3, variant: 'primary' },
      { id: 'settings', label: 'Settings', icon: Settings, variant: 'ghost' },
      { id: 'share', label: 'Share', icon: Share, variant: 'ghost' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile context with customization and privacy controls.'
      }
    }
  }
};

export const HiveLABContext: Story = {
  args: {
    context: 'hivelab',
    title: 'HiveLAB',
    subtitle: 'Build campus tools',
    showSearch: true,
    searchPlaceholder: 'Search tools and templates...',
    actions: [
      { id: 'create-tool', label: 'Create Tool', icon: Plus, variant: 'primary' },
      { id: 'my-tools', label: 'My Tools', icon: Settings, variant: 'ghost' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'HiveLAB context with tool creation and discovery functionality.'
      }
    }
  }
};

// Detail View Stories
export const SpaceDetailContext: Story = {
  args: {
    context: 'space-detail',
    title: 'CS 106A Study Group',
    subtitle: '24 members • Active now',
    breadcrumbs: [
      { label: 'Spaces' },
      { label: 'Academic' },
      { label: 'CS 106A Study Group' }
    ],
    actions: [
      { id: 'join', label: 'Join Space', icon: Users, variant: 'primary' },
      { id: 'bookmark', label: 'Bookmark', icon: Bookmark, variant: 'ghost' },
      { id: 'share', label: 'Share', icon: Share, variant: 'ghost' },
      { id: 'more', label: 'More', icon: MoreHorizontal, variant: 'ghost' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Space detail view with breadcrumb navigation and community actions.'
      }
    }
  }
};

export const ToolDetailContext: Story = {
  args: {
    context: 'tool-detail',
    title: 'Dorm Laundry Tracker',
    subtitle: 'Track washing machine availability',
    breadcrumbs: [
      { label: 'HiveLAB' },
      { label: 'Dorm Tools' },
      { label: 'Laundry Tracker' }
    ],
    actions: [
      { id: 'install', label: 'Install Tool', icon: Plus, variant: 'primary' },
      { id: 'share', label: 'Share', icon: ExternalLink, variant: 'ghost' },
      { id: 'report', label: 'Report', icon: Flag, variant: 'ghost' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool detail view with installation and sharing capabilities.'
      }
    }
  }
};

// Interactive Scenarios
export const InteractiveDemo: Story = {
  render: () => {
    const [context, setContext] = useState<'feed' | 'spaces' | 'profile' | 'hivelab' | 'space-detail' | 'tool-detail'>('feed');
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState(3);
    
    const contextConfigs = {
      feed: {
        title: 'Campus Feed',
        subtitle: 'Stanford University',
        showSearch: true,
        searchPlaceholder: 'Search campus activity...',
        actions: [
          { id: 'filter', label: 'Filter', icon: Filter, variant: 'ghost' as const },
          { id: 'notifications', label: 'Notifications', icon: Bell, variant: 'ghost' as const, badge: notifications }
        ]
      },
      spaces: {
        title: 'Campus Spaces',
        subtitle: '12 active communities',
        showSearch: true,
        searchPlaceholder: 'Search spaces and communities...',
        actions: [
          { id: 'filter', label: 'Filter', icon: Filter, variant: 'ghost' as const },
          { id: 'create-space', label: 'Create Space', icon: Plus, variant: 'primary' as const }
        ]
      },
      profile: {
        title: 'Your Profile',
        subtitle: 'Campus command center',
        showSearch: false,
        actions: [
          { id: 'customize', label: 'Customize', icon: Edit3, variant: 'primary' as const },
          { id: 'settings', label: 'Settings', icon: Settings, variant: 'ghost' as const },
          { id: 'share', label: 'Share', icon: Share, variant: 'ghost' as const }
        ]
      },
      hivelab: {
        title: 'HiveLAB',
        subtitle: 'Build campus tools',
        showSearch: true,
        searchPlaceholder: 'Search tools and templates...',
        actions: [
          { id: 'create-tool', label: 'Create Tool', icon: Plus, variant: 'primary' as const },
          { id: 'my-tools', label: 'My Tools', icon: Settings, variant: 'ghost' as const }
        ]
      },
      'space-detail': {
        title: 'CS 106A Study Group',
        subtitle: '24 members • Active now',
        showSearch: false,
        breadcrumbs: [
          { label: 'Spaces' },
          { label: 'Academic' },
          { label: 'CS 106A Study Group' }
        ],
        actions: [
          { id: 'join', label: 'Join Space', icon: Users, variant: 'primary' as const },
          { id: 'bookmark', label: 'Bookmark', icon: Bookmark, variant: 'ghost' as const },
          { id: 'share', label: 'Share', icon: Share, variant: 'ghost' as const }
        ]
      },
      'tool-detail': {
        title: 'Dorm Laundry Tracker',
        subtitle: 'Track washing machine availability',
        showSearch: false,
        breadcrumbs: [
          { label: 'HiveLAB' },
          { label: 'Dorm Tools' },
          { label: 'Laundry Tracker' }
        ],
        actions: [
          { id: 'install', label: 'Install Tool', icon: Plus, variant: 'primary' as const },
          { id: 'share', label: 'Share', icon: ExternalLink, variant: 'ghost' as const },
          { id: 'report', label: 'Report', icon: Flag, variant: 'ghost' as const }
        ]
      }
    };
    
    const currentConfig = contextConfigs[context];
    
    const handleAction = (actionId: string) => {
      if (actionId === 'notifications') {
        setNotifications(0);
      }
      console.log('Action triggered:', actionId);
    };
    
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      console.log('Search query:', query);
    };
    
    return (
      <div className="h-screen bg-hive-surface-primary">
        {/* Context Switcher */}
        <div className="p-4 border-b border-hive-border-subtle bg-hive-surface-elevated">
          <div className="flex flex-wrap gap-2">
            {Object.keys(contextConfigs).map((contextKey) => (
              <button
                key={contextKey}
                onClick={() => setContext(contextKey as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  context === contextKey
                    ? 'bg-hive-gold text-hive-text-primary'
                    : 'bg-hive-surface-primary text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover'
                }`}
              >
                {contextKey.charAt(0).toUpperCase() + contextKey.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        <TopNavBar
          context={context}
          {...currentConfig}
          onAction={handleAction}
          onSearch={handleSearch}
          onBack={() => {
            if (context === 'space-detail') setContext('spaces');
            if (context === 'tool-detail') setContext('hivelab');
          }}
          user={{
            id: '1',
            name: 'Alex Chen',
            avatar: '/api/placeholder/32/32'
          }}
        />
        
        {/* Content Area */}
        <div className="p-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-4">
              Interactive Top Nav Demo
            </h2>
            <p className="text-hive-text-secondary mb-6">
              Switch between different contexts to see how the navigation adapts. 
              Notice how actions, search, and breadcrumbs change based on the current page.
            </p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
                <h4 className="font-medium text-hive-text-primary mb-2">Current Context: {context}</h4>
                <p className="text-sm text-hive-text-secondary">
                  {context === 'feed' && 'Global campus activity with search and filtering'}
                  {context === 'spaces' && 'Community discovery and management tools'}
                  {context === 'profile' && 'Personal dashboard customization controls'}
                  {context === 'hivelab' && 'Tool creation and discovery workspace'}
                  {context === 'space-detail' && 'Community-specific actions with breadcrumb navigation'}
                  {context === 'tool-detail' && 'Tool installation and sharing options'}
                </p>
              </div>
              
              {searchQuery && (
                <div className="p-4 bg-hive-gold/10 border border-hive-gold/20 rounded-lg">
                  <h4 className="font-medium text-hive-text-primary mb-1">Active Search</h4>
                  <p className="text-sm text-hive-text-secondary">Query: "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing contextual navigation adaptation across different page types.'
      }
    }
  }
};

// Responsive and State Stories
export const MobileResponsive: Story = {
  args: {
    context: 'spaces',
    title: 'Campus Spaces',
    subtitle: '12 communities',
    showSearch: true,
    actions: [
      { id: 'filter', label: 'Filter', icon: Filter, variant: 'ghost' },
      { id: 'create', label: 'Create', icon: Plus, variant: 'primary' }
    ],
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32'
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile responsive behavior with condensed actions and optimized layout.'
      }
    }
  }
};