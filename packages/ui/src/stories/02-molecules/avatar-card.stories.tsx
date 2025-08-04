import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { User, MapPin, Calendar, Users, ExternalLink, MessageCircle, UserPlus, UserCheck, Star, Award, Zap, Clock } from 'lucide-react';

// Avatar Card - Identity-focused user representation
// Combines profile avatar with key identity information and quick actions
// Used for user discovery, member lists, and social interactions

interface AvatarCardProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: 'student' | 'builder' | 'leader' | 'faculty';
    major?: string;
    year?: string;
    school?: string;
    location?: string;
    bio?: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
    lastSeen?: string;
    stats?: {
      connections?: number;
      spaces?: number;
      tools?: number;
      contributions?: number;
    };
    badges?: Array<{
      type: 'academic' | 'social' | 'builder' | 'leader';
      label: string;
      icon?: any;
    }>;
    mutualConnections?: number;
    isConnected?: boolean;
    isPending?: boolean;
  };
  variant?: 'default' | 'compact' | 'detailed' | 'connection-card';
  showActions?: boolean;
  showStats?: boolean;
  showBio?: boolean;
  onConnect?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onView?: (userId: string) => void;
  className?: string;
}

const AvatarCard = ({
  user,
  variant = 'default',
  showActions = true,
  showStats = false,
  showBio = false,
  onConnect = () => {},
  onMessage = () => {},
  onView = () => {},
  className = ''
}: AvatarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-hive-text-quaternary';
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'builder': return 'bg-hive-gold/20 text-hive-gold';
      case 'leader': return 'bg-blue-500/20 text-blue-400';
      case 'faculty': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-hive-surface-hover text-hive-text-secondary';
    }
  };

  const renderCompactVariant = () => (
    <div className={`
      flex items-center gap-3 p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle
      hover:border-hive-border-primary transition-all duration-200 cursor-pointer
      ${className}
    `}
    onClick={() => onView(user.id)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={user.avatar || '/api/placeholder/40/40'} 
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-hive-text-primary truncate">{user.name}</span>
          {user.role && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
              {user.role}
            </span>
          )}
        </div>
        <div className="text-sm text-hive-text-tertiary truncate">{user.handle}</div>
      </div>
      
      {showActions && isHovered && (
        <div className="flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMessage(user.id); }}
            className="p-2 rounded-lg hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
          >
            <MessageCircle size={16} />
          </button>
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              onConnect(user.id); 
            }}
            className="p-2 rounded-lg hover:bg-hive-surface-hover text-hive-text-secondary hover:text-hive-text-primary transition-colors"
          >
            {user.isConnected ? <UserCheck size={16} /> : <UserPlus size={16} />}
          </button>
        </div>
      )}
    </div>
  );

  const renderConnectionCardVariant = () => (
    <div className={`
      p-4 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle
      hover:border-hive-border-primary hover:shadow-sm transition-all duration-200
      ${className}
    `}>
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img 
            src={user.avatar || '/api/placeholder/48/48'} 
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-hive-text-primary truncate">{user.name}</h3>
            {user.role && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            )}
          </div>
          
          <p className="text-sm text-hive-text-secondary mb-1">{user.handle}</p>
          
          {user.major && (
            <p className="text-sm text-hive-text-tertiary mb-2">{user.major} • {user.year}</p>
          )}
          
          {user.mutualConnections && user.mutualConnections > 0 && (
            <div className="flex items-center gap-1 text-xs text-hive-text-tertiary mb-3">
              <Users size={12} />
              <span>{user.mutualConnections} mutual connections</span>
            </div>
          )}
          
          {showBio && user.bio && (
            <p className="text-sm text-hive-text-secondary mb-3 line-clamp-2">{user.bio}</p>
          )}
          
          {showActions && (
            <div className="flex gap-2">
              {user.isConnected ? (
                <button
                  onClick={() => onMessage(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hive-surface-primary border border-hive-border-subtle rounded-lg text-sm font-medium text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
                >
                  <MessageCircle size={14} />
                  Message
                </button>
              ) : user.isPending ? (
                <button
                  disabled
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hive-surface-hover border border-hive-border-subtle rounded-lg text-sm font-medium text-hive-text-tertiary cursor-not-allowed"
                >
                  <Clock size={14} />
                  Pending
                </button>
              ) : (
                <button
                  onClick={() => onConnect(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hive-gold text-hive-text-primary rounded-lg text-sm font-medium hover:bg-hive-gold/90 transition-colors"
                >
                  <UserPlus size={14} />
                  Connect
                </button>
              )}
              
              <button
                onClick={() => onView(user.id)}
                className="p-2 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDetailedVariant = () => (
    <div className={`
      p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle
      hover:border-hive-border-primary hover:shadow-sm transition-all duration-200
      ${className}
    `}>
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img 
            src={user.avatar || '/api/placeholder/64/64'} 
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-hive-text-primary truncate">{user.name}</h3>
            {user.role && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            )}
          </div>
          
          <p className="text-hive-text-secondary mb-1">{user.handle}</p>
          
          {user.major && (
            <p className="text-sm text-hive-text-tertiary mb-2">{user.major} • {user.year}</p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-hive-text-tertiary">
            {user.school && (
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{user.school}</span>
              </div>
            )}
            {user.lastSeen && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>Active {user.lastSeen}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {user.badges && user.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {user.badges.map((badge, index) => {
            const Icon = badge.icon || Award;
            return (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-hive-surface-primary rounded-full border border-hive-border-subtle">
                <Icon size={12} className="text-hive-text-tertiary" />
                <span className="text-xs text-hive-text-secondary">{badge.label}</span>
              </div>
            );
          })}
        </div>
      )}
      
      {showBio && user.bio && (
        <p className="text-sm text-hive-text-secondary mb-4 leading-relaxed">{user.bio}</p>
      )}
      
      {showStats && user.stats && (
        <div className="grid grid-cols-4 gap-4 py-3 mb-4 border-t border-b border-hive-border-subtle">
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-text-primary">{user.stats.connections || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-text-primary">{user.stats.spaces || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-text-primary">{user.stats.tools || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Tools</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-text-primary">{user.stats.contributions || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Contributions</div>
          </div>
        </div>
      )}
      
      {user.mutualConnections && user.mutualConnections > 0 && (
        <div className="flex items-center gap-2 text-sm text-hive-text-tertiary mb-4">
          <Users size={14} />
          <span>{user.mutualConnections} mutual connections</span>
        </div>
      )}
      
      {showActions && (
        <div className="flex gap-3">
          {user.isConnected ? (
            <>
              <button
                onClick={() => onMessage(user.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
              >
                <MessageCircle size={16} />
                Message
              </button>
              <button
                onClick={() => onView(user.id)}
                className="px-4 py-2 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <ExternalLink size={16} />
              </button>
            </>
          ) : user.isPending ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-hive-surface-hover border border-hive-border-subtle rounded-lg font-medium text-hive-text-tertiary cursor-not-allowed"
            >
              <Clock size={16} />
              Connection Pending
            </button>
          ) : (
            <>
              <button
                onClick={() => onConnect(user.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
              >
                <UserPlus size={16} />
                Connect
              </button>
              <button
                onClick={() => onMessage(user.id)}
                className="px-4 py-2 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <MessageCircle size={16} />
              </button>
              <button
                onClick={() => onView(user.id)}
                className="px-4 py-2 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <ExternalLink size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'compact') return renderCompactVariant();
  if (variant === 'connection-card') return renderConnectionCardVariant();
  if (variant === 'detailed') return renderDetailedVariant();

  // Default variant
  return (
    <div className={`
      p-4 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle
      hover:border-hive-border-primary hover:shadow-sm transition-all duration-200
      ${className}
    `}>
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <img 
            src={user.avatar || '/api/placeholder/48/48'} 
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-hive-text-primary truncate">{user.name}</h3>
            {user.role && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            )}
          </div>
          <p className="text-sm text-hive-text-secondary">{user.handle}</p>
          {user.major && (
            <p className="text-xs text-hive-text-tertiary">{user.major} • {user.year}</p>
          )}
        </div>
      </div>
      
      {showBio && user.bio && (
        <p className="text-sm text-hive-text-secondary mb-3 line-clamp-2">{user.bio}</p>
      )}
      
      {showActions && (
        <div className="flex gap-2">
          <button
            onClick={() => onConnect(user.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hive-gold text-hive-text-primary rounded-lg text-sm font-medium hover:bg-hive-gold/90 transition-colors"
          >
            {user.isConnected ? <UserCheck size={14} /> : <UserPlus size={14} />}
            {user.isConnected ? 'Connected' : 'Connect'}
          </button>
          <button
            onClick={() => onMessage(user.id)}
            className="p-2 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
          >
            <MessageCircle size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof AvatarCard> = {
  title: '02-molecules/Avatar Card',
  component: AvatarCard,
  parameters: {
    docs: {
      description: {
        component: `
# Avatar Card - User Identity Component

The Avatar Card provides a flexible way to display user information with varying levels of detail and interaction options. Essential for social discovery and community building within HIVE.

## Design Principles

**Identity First:**
- Avatar prominence with status indicators
- Clear name and role hierarchy
- Campus context (major, year, school)

**Social Utility:**
- Quick connection and messaging actions
- Mutual connection indicators
- Achievement badges and stats

**Progressive Disclosure:**
- Compact variant for lists and minimal contexts
- Default variant for general use
- Detailed variant for discovery and profiles
- Connection card for relationship building

## Campus Context

Each variant is optimized for specific campus social scenarios:
- **Compact**: Class rosters, member lists, search results
- **Default**: Community directories, recommended connections
- **Connection Card**: People discovery, networking suggestions
- **Detailed**: Profile exploration, social proof building
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'connection-card'],
      description: 'Visual variant determining layout and information density'
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show connect/message action buttons'
    },
    showStats: {
      control: 'boolean',
      description: 'Whether to display user statistics (detailed variant only)'
    },
    showBio: {
      control: 'boolean',
      description: 'Whether to show user bio/description'
    }
  }
};

export default meta;
type Story = StoryObj<typeof AvatarCard>;

// Basic Variants
export const Default: Story = {
  args: {
    user: {
      id: '1',
      name: 'Alex Chen',
      handle: '@alexc',
      avatar: '/api/placeholder/48/48',
      role: 'builder',
      major: 'Computer Science',
      year: 'Junior',
      school: 'Stanford University',
      status: 'online',
      isConnected: false
    },
    variant: 'default',
    showActions: true
  }
};

export const Compact: Story = {
  args: {
    user: {
      id: '2',
      name: 'Sarah Kim',
      handle: '@sarahk',
      avatar: '/api/placeholder/40/40',
      role: 'student',
      status: 'online',
      isConnected: true
    },
    variant: 'compact',
    showActions: true
  }
};

export const ConnectionCard: Story = {
  args: {
    user: {
      id: '3',
      name: 'Marcus Johnson',
      handle: '@marcusj',
      avatar: '/api/placeholder/48/48',
      role: 'leader',
      major: 'Electrical Engineering',
      year: 'Senior',
      school: 'MIT',
      bio: 'Building the future of campus collaboration. Always looking for new projects and partnerships.',
      status: 'online',
      mutualConnections: 7,
      isConnected: false
    },
    variant: 'connection-card',
    showActions: true,
    showBio: true
  }
};

export const Detailed: Story = {
  args: {
    user: {
      id: '4',
      name: 'Emma Rodriguez',
      handle: '@emmar',
      avatar: '/api/placeholder/64/64',
      role: 'builder',
      major: 'Product Design',
      year: 'Sophomore',
      school: 'University of Texas',
      bio: 'Passionate about creating tools that solve real campus problems. Currently working on sustainability initiatives and student wellness platforms.',
      status: 'online',
      lastSeen: '2 minutes ago',
      mutualConnections: 12,
      isConnected: false,
      stats: {
        connections: 156,
        spaces: 8,
        tools: 12,
        contributions: 47
      },
      badges: [
        { type: 'builder', label: 'Tool Creator', icon: Zap },
        { type: 'social', label: 'Community Builder', icon: Users },
        { type: 'academic', label: 'Dean\'s List', icon: Award }
      ]
    },
    variant: 'detailed',
    showActions: true,
    showStats: true,
    showBio: true
  }
};

// Campus Role Stories
export const StudentBuilder: Story = {
  args: {
    user: {
      id: '5',
      name: 'Jordan Park',
      handle: '@jordanp',
      avatar: '/api/placeholder/48/48',
      role: 'builder',
      major: 'Computer Science',
      year: 'Junior',
      school: 'UC Berkeley',
      status: 'online',
      isConnected: false,
      stats: {
        connections: 89,
        spaces: 5,
        tools: 8,
        contributions: 23
      }
    },
    variant: 'default',
    showActions: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Student builder with development focus and tool creation activity.'
      }
    }
  }
};

export const CommunityLeader: Story = {
  args: {
    user: {
      id: '6',
      name: 'Taylor Swift',
      handle: '@tswift',
      avatar: '/api/placeholder/48/48',
      role: 'leader',
      major: 'Communications',
      year: 'Senior',
      school: 'UCLA',
      bio: 'Leading multiple student organizations and building inclusive campus communities.',
      status: 'busy',
      isConnected: false,
      mutualConnections: 15,
      badges: [
        { type: 'leader', label: 'Space Leader', icon: Users },
        { type: 'social', label: 'Event Organizer', icon: Calendar }
      ]
    },
    variant: 'connection-card',
    showActions: true,
    showBio: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Community leader with multiple leadership roles and social proof.'
      }
    }
  }
};

export const Faculty: Story = {
  args: {
    user: {
      id: '7',
      name: 'Dr. Rachel Martinez',
      handle: '@dr.martinez',
      avatar: '/api/placeholder/48/48',
      role: 'faculty',
      major: 'Psychology Department',
      school: 'University of Michigan',
      bio: 'Associate Professor researching student wellness and campus community dynamics.',
      status: 'online',
      lastSeen: '5 minutes ago',
      isConnected: false,
      badges: [
        { type: 'academic', label: 'Professor', icon: Award },
        { type: 'leader', label: 'Researcher', icon: Star }
      ]
    },
    variant: 'detailed',
    showActions: true,
    showBio: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Faculty member with academic credentials and research focus.'
      }
    }
  }
};

// Connection States
export const ConnectedUser: Story = {
  args: {
    user: {
      id: '8',
      name: 'Ashley Wong',
      handle: '@ashleyw',
      avatar: '/api/placeholder/48/48',
      role: 'student',
      major: 'Biology',
      year: 'Freshman',
      school: 'Stanford University',
      status: 'online',
      isConnected: true,
      mutualConnections: 3
    },
    variant: 'connection-card',
    showActions: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Already connected user showing message-first interaction pattern.'
      }
    }
  }
};

export const PendingConnection: Story = {
  args: {
    user: {
      id: '9',
      name: 'David Kim',
      handle: '@davidk',
      avatar: '/api/placeholder/48/48',
      role: 'builder',
      major: 'Mechanical Engineering',
      year: 'Senior',
      school: 'MIT',
      status: 'away',
      isPending: true,
      mutualConnections: 5
    },
    variant: 'connection-card',
    showActions: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Pending connection request showing disabled interaction state.'
      }
    }
  }
};

// Campus Discovery Lists
export const CampusDirectory: Story = {
  render: () => {
    const users = [
      {
        id: '10', name: 'Alex Chen', handle: '@alexc', avatar: '/api/placeholder/40/40',
        role: 'builder', status: 'online', isConnected: false
      },
      {
        id: '11', name: 'Sarah Kim', handle: '@sarahk', avatar: '/api/placeholder/40/40',
        role: 'student', status: 'online', isConnected: true
      },
      {
        id: '12', name: 'Marcus Johnson', handle: '@marcusj', avatar: '/api/placeholder/40/40',
        role: 'leader', status: 'busy', isConnected: false
      },
      {
        id: '13', name: 'Emma Rodriguez', handle: '@emmar', avatar: '/api/placeholder/40/40',
        role: 'builder', status: 'away', isConnected: false
      },
      {
        id: '14', name: 'Jordan Park', handle: '@jordanp', avatar: '/api/placeholder/40/40',
        role: 'student', status: 'offline', isConnected: true
      }
    ];

    return (
      <div className="space-y-2 max-w-md">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">CS 106A Study Group Members</h3>
        {users.map((user) => (
          <AvatarCard
            key={user.id}
            user={user}
            variant="compact"
            showActions={true}
            onConnect={(id) => console.log('Connect:', id)}
            onMessage={(id) => console.log('Message:', id)}
            onView={(id) => console.log('View:', id)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact avatar cards in a directory or member list context.'
      }
    }
  }
};

export const RecommendedConnections: Story = {
  render: () => {
    const recommendations = [
      {
        id: '15',
        name: 'Lisa Zhang',
        handle: '@lisaz',
        avatar: '/api/placeholder/48/48',
        role: 'builder',
        major: 'Computer Science',
        year: 'Junior',
        school: 'Stanford University',
        bio: 'Building AI tools for student success. Love hackathons and collaborative projects.',
        status: 'online',
        mutualConnections: 8,
        isConnected: false
      },
      {
        id: '16',
        name: 'Carlos Mendoza',
        handle: '@carlosm',
        avatar: '/api/placeholder/48/48',
        role: 'leader',
        major: 'Business Administration',
        year: 'Senior',
        school: 'Stanford University',
        bio: 'Student body president working on campus sustainability initiatives.',
        status: 'online',
        mutualConnections: 12,
        isConnected: false
      }
    ];

    return (
      <div className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Recommended Connections</h3>
        {recommendations.map((user) => (
          <AvatarCard
            key={user.id}
            user={user}
            variant="connection-card"
            showActions={true}
            showBio={true}
            onConnect={(id) => console.log('Connect:', id)}
            onMessage={(id) => console.log('Message:', id)}
            onView={(id) => console.log('View:', id)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Connection card variants for discovery and networking scenarios.'
      }
    }
  }
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [connections, setConnections] = useState<Set<string>>(new Set(['2', '5']));
    const [pending, setPending] = useState<Set<string>>(new Set());
    
    const users = [
      {
        id: '1', name: 'Alex Chen', handle: '@alexc', avatar: '/api/placeholder/48/48',
        role: 'builder', major: 'Computer Science', year: 'Junior', status: 'online',
        bio: 'Passionate about building tools that solve real campus problems.'
      },
      {
        id: '2', name: 'Sarah Kim', handle: '@sarahk', avatar: '/api/placeholder/48/48',
        role: 'student', major: 'Psychology', year: 'Sophomore', status: 'online',
        bio: 'Studying human behavior and community dynamics.'
      },
      {
        id: '3', name: 'Marcus Johnson', handle: '@marcusj', avatar: '/api/placeholder/48/48',
        role: 'leader', major: 'Political Science', year: 'Senior', status: 'busy',
        bio: 'Leading student government and policy initiatives.'
      }
    ];
    
    const handleConnect = (userId: string) => {
      if (connections.has(userId)) return;
      
      setPending(prev => new Set([...prev, userId]));
      
      // Simulate connection approval after 2 seconds
      setTimeout(() => {
        setPending(prev => {
          const newPending = new Set(prev);
          newPending.delete(userId);
          return newPending;
        });
        setConnections(prev => new Set([...prev, userId]));
      }, 2000);
    };
    
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Connection Demo</h3>
          <p className="text-sm text-hive-text-secondary mb-6">
            Click "Connect" to see the connection flow from pending to connected state.
          </p>
        </div>
        
        {users.map((user) => (
          <AvatarCard
            key={user.id}
            user={{
              ...user,
              isConnected: connections.has(user.id),
              isPending: pending.has(user.id),
              mutualConnections: Math.floor(Math.random() * 10) + 1
            }}
            variant="connection-card"
            showActions={true}
            showBio={true}
            onConnect={handleConnect}
            onMessage={(id) => console.log('Message:', id)}
            onView={(id) => console.log('View profile:', id)}
          />
        ))}
        
        <div className="p-4 bg-hive-gold/10 border border-hive-gold/20 rounded-lg">
          <h4 className="font-medium text-hive-text-primary mb-2">Demo Status</h4>
          <p className="text-sm text-hive-text-secondary">
            Connected: {connections.size} users • Pending: {pending.size} requests
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing connection state management and user interactions.'
      }
    }
  }
};