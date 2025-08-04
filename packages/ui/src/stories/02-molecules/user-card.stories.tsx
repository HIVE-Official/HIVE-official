import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { User, MapPin, Calendar, Users, ExternalLink, MessageCircle, UserPlus, UserCheck, Star, Award, Zap, Clock, BookOpen, Target, TrendingUp, Heart } from 'lucide-react';

// User Card - Comprehensive user profile display
// More detailed than Avatar Card, focused on profile exploration and social proof
// Used for user profiles, discovery feeds, and detailed member information

interface UserCardProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    coverImage?: string;
    role?: 'student' | 'builder' | 'leader' | 'faculty';
    major?: string;
    year?: string;
    school?: string;
    location?: string;
    bio?: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
    lastSeen?: string;
    joinDate?: string;
    stats?: {
      connections?: number;
      spaces?: number;
      tools?: number;
      contributions?: number;
      posts?: number;
      likes?: number;
    };
    badges?: Array<{
      type: 'academic' | 'social' | 'builder' | 'leader' | 'achievement';
      label: string;
      icon?: any;
      color?: string;
    }>;
    interests?: string[];
    skills?: string[];
    recentActivity?: Array<{
      type: 'tool' | 'space' | 'post' | 'achievement';
      title: string;
      subtitle?: string;
      timestamp: string;
    }>;
    mutualConnections?: number;
    isConnected?: boolean;
    isPending?: boolean;
    isFollowing?: boolean;
  };
  variant?: 'profile' | 'discovery' | 'compact-profile';
  showFullProfile?: boolean;
  showActivity?: boolean;
  showMutualConnections?: boolean;
  onConnect?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onFollow?: (userId: string) => void;
  onView?: (userId: string) => void;
  className?: string;
}

const UserCard = ({
  user,
  variant = 'profile',
  showFullProfile = true,
  showActivity = false,
  showMutualConnections = true,
  onConnect = () => {},
  onMessage = () => {},
  onFollow = () => {},
  onView = () => {},
  className = ''
}: UserCardProps) => {
  const [showFullBio, setShowFullBio] = useState(false);

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
      case 'builder': return 'bg-hive-gold/20 text-hive-gold border-hive-gold/30';
      case 'leader': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'faculty': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-hive-surface-hover text-hive-text-secondary border-hive-border-subtle';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'tool': return Zap;
      case 'space': return Users;
      case 'post': return MessageCircle;
      case 'achievement': return Award;
      default: return Star;
    }
  };

  const renderCompactProfileVariant = () => (
    <div className={`
      p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle
      hover:border-hive-border-primary hover:shadow-lg transition-all duration-200
      ${className}
    `}>
      {/* Cover and Avatar */}
      <div className="relative mb-4">
        {user.coverImage && (
          <div 
            className="h-24 w-full rounded-lg bg-cover bg-center mb-4"
            style={{ backgroundImage: `url(${user.coverImage})` }}
          />
        )}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img 
              src={user.avatar || '/api/placeholder/64/64'} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-hive-surface-elevated"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-hive-text-primary truncate">{user.name}</h3>
              {user.role && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              )}
            </div>
            
            <p className="text-hive-text-secondary mb-1">{user.handle}</p>
            
            {user.major && (
              <p className="text-sm text-hive-text-tertiary">{user.major} • {user.year}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="mb-4">
          <p className={`text-sm text-hive-text-secondary leading-relaxed ${!showFullBio ? 'line-clamp-3' : ''}`}>
            {user.bio}
          </p>
          {user.bio.length > 150 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-xs text-hive-gold hover:text-hive-gold/80 mt-1 transition-colors"
            >
              {showFullBio ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      {user.stats && (
        <div className="grid grid-cols-3 gap-4 py-4 mb-4 border-t border-b border-hive-border-subtle">
          <div className="text-center">
            <div className="text-lg font-bold text-hive-text-primary">{user.stats.connections || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-hive-text-primary">{user.stats.spaces || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-hive-text-primary">{user.stats.tools || 0}</div>
            <div className="text-xs text-hive-text-tertiary">Tools</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {user.isConnected ? (
          <>
            <button
              onClick={() => onMessage(user.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
            >
              <MessageCircle size={16} />
              Message
            </button>
            <button
              onClick={() => onView(user.id)}
              className="px-4 py-3 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
            >
              <ExternalLink size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onConnect(user.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
            >
              <UserPlus size={16} />
              Connect
            </button>
            <button
              onClick={() => onFollow(user.id)}
              className="px-4 py-3 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
            >
              <Heart size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderDiscoveryVariant = () => (
    <div className={`
      p-6 bg-hive-surface-elevated rounded-xl border border-hive-border-subtle
      hover:border-hive-border-primary hover:shadow-lg transition-all duration-200 cursor-pointer
      ${className}
    `}
    onClick={() => onView(user.id)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img 
            src={user.avatar || '/api/placeholder/56/56'} 
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
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
            <p className="text-xs text-hive-text-tertiary">{user.major} • {user.year}</p>
          )}
        </div>
      </div>

      {/* Bio Preview */}
      {user.bio && (
        <p className="text-sm text-hive-text-secondary mb-4 line-clamp-2">{user.bio}</p>
      )}

      {/* Interests/Skills */}
      {user.interests && (user.interests?.length || 0) > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {(user.interests || []).slice(0, 3).map((interest, index) => (
              <span key={index} className="px-2 py-1 bg-hive-surface-primary rounded-full text-xs text-hive-text-secondary border border-hive-border-subtle">
                {interest}
              </span>
            ))}
            {user.interests.length > 3 && (
              <span className="px-2 py-1 text-xs text-hive-text-tertiary">
                +{user.interests.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mutual Connections */}
      {showMutualConnections && user.mutualConnections && user.mutualConnections > 0 && (
        <div className="flex items-center gap-2 text-sm text-hive-text-tertiary mb-4">
          <Users size={14} />
          <span>{user.mutualConnections} mutual connections</span>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );

  const renderFullProfileVariant = () => (
    <div className={`
      bg-hive-surface-elevated rounded-xl border border-hive-border-subtle overflow-hidden
      ${className}
    `}>
      {/* Cover Image */}
      {user.coverImage && (
        <div 
          className="h-32 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        />
      )}
      
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative flex-shrink-0 -mt-8">
            <img 
              src={user.avatar || '/api/placeholder/80/80'} 
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-hive-surface-elevated shadow-lg"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-hive-surface-elevated ${getStatusColor(user.status)}`} />
          </div>
          
          <div className="flex-1 min-w-0 mt-2">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-hive-text-primary">{user.name}</h1>
              {user.role && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              )}
            </div>
            
            <p className="text-hive-text-secondary mb-2">{user.handle}</p>
            
            <div className="flex items-center gap-4 text-sm text-hive-text-tertiary">
              {user.major && (
                <span>{user.major} • {user.year}</span>
              )}
              {user.school && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{user.school}</span>
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Joined {user.joinDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-6">
            <p className="text-hive-text-secondary leading-relaxed">{user.bio}</p>
          </div>
        )}

        {/* Badges */}
        {user.badges && user.badges.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-hive-text-primary mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => {
                const Icon = badge.icon || Award;
                return (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-hive-surface-primary rounded-lg border border-hive-border-subtle">
                    <Icon size={14} className="text-hive-text-tertiary" />
                    <span className="text-sm text-hive-text-secondary">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {user.stats && (
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-6 py-4 border-t border-b border-hive-border-subtle">
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-text-primary mb-1">{user.stats.connections || 0}</div>
                <div className="text-sm text-hive-text-tertiary">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-text-primary mb-1">{user.stats.spaces || 0}</div>
                <div className="text-sm text-hive-text-tertiary">Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hive-text-primary mb-1">{user.stats.tools || 0}</div>
                <div className="text-sm text-hive-text-tertiary">Tools Built</div>
              </div>
            </div>
          </div>
        )}

        {/* Skills & Interests */}
        {user.skills && user.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-hive-text-primary mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-hive-gold/10 text-hive-gold rounded-full text-sm font-medium border border-hive-gold/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.interests && (user.interests?.length || 0) > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-hive-text-primary mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {(user.interests || []).map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-hive-surface-primary rounded-full text-sm text-hive-text-secondary border border-hive-border-subtle">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {showActivity && user.recentActivity && user.recentActivity.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-hive-text-primary mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {user.recentActivity.slice(0, 3).map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-hive-surface-primary rounded-lg">
                    <Icon size={16} className="text-hive-text-tertiary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-hive-text-primary">{activity.title}</p>
                      {activity.subtitle && (
                        <p className="text-xs text-hive-text-tertiary">{activity.subtitle}</p>
                      )}
                      <p className="text-xs text-hive-text-quaternary mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mutual Connections */}
        {showMutualConnections && user.mutualConnections && user.mutualConnections > 0 && (
          <div className="mb-6 p-3 bg-hive-surface-primary rounded-lg border border-hive-border-subtle">
            <div className="flex items-center gap-2 text-sm text-hive-text-secondary">
              <Users size={14} />
              <span>{user.mutualConnections} mutual connections</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {user.isConnected ? (
            <>
              <button
                onClick={() => onMessage(user.id)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
              >
                <MessageCircle size={18} />
                Send Message
              </button>
              <button
                onClick={() => onFollow(user.id)}
                className="px-6 py-3 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <Heart size={18} />
              </button>
            </>
          ) : user.isPending ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-hive-surface-hover border border-hive-border-subtle rounded-lg font-medium text-hive-text-tertiary cursor-not-allowed"
            >
              <Clock size={18} />
              Connection Pending
            </button>
          ) : (
            <>
              <button
                onClick={() => onConnect(user.id)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-hive-gold text-hive-text-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
              >
                <UserPlus size={18} />
                Connect
              </button>
              <button
                onClick={() => onMessage(user.id)}
                className="px-6 py-3 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <MessageCircle size={18} />
              </button>
              <button
                onClick={() => onFollow(user.id)}
                className="px-6 py-3 border border-hive-border-subtle rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-hover transition-colors"
              >
                <Heart size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === 'compact-profile') return renderCompactProfileVariant();
  if (variant === 'discovery') return renderDiscoveryVariant();
  return renderFullProfileVariant();
};

const meta: Meta<typeof UserCard> = {
  title: '02-molecules/User Card',
  component: UserCard,
  parameters: {
    docs: {
      description: {
        component: `
# User Card - Comprehensive User Profile Display

The User Card provides detailed user information optimized for profile exploration, social discovery, and community building within HIVE's social utility platform.

## Design Philosophy

**Social Utility Focus:**
- Emphasizes skills, contributions, and campus involvement over vanity metrics
- Shows practical connection potential and collaboration opportunities
- Integrates academic context with social proof

**Progressive Information Architecture:**
- Discovery variant for browse scenarios with quick connection actions
- Compact profile for space-efficient detailed viewing
- Full profile for comprehensive user exploration

**Campus Context Integration:**
- Academic information (major, year, school) prominently displayed
- Achievement badges reflect campus involvement and contributions
- Mutual connections and activity feed show community integration

## Interaction Patterns

- **Connect**: Primary action for building campus networks
- **Message**: Direct communication for collaboration and coordination
- **Follow**: Lightweight engagement for staying updated
- **View**: Deep profile exploration and social proof review
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['profile', 'discovery', 'compact-profile'],
      description: 'Display variant optimized for different use cases'
    },
    showFullProfile: {
      control: 'boolean',
      description: 'Whether to show complete profile information'
    },
    showActivity: {
      control: 'boolean',
      description: 'Whether to display recent activity feed'
    },
    showMutualConnections: {
      control: 'boolean',
      description: 'Whether to show mutual connection information'
    }
  }
};

export default meta;
type Story = StoryObj<typeof UserCard>;

// Primary Variants
export const FullProfile: Story = {
  args: {
    user: {
      id: '1',
      name: 'Alexandra Chen',
      handle: '@alexc',
      avatar: '/api/placeholder/80/80',
      coverImage: '/api/placeholder/400/128',
      role: 'builder',
      major: 'Computer Science',
      year: 'Junior',
      school: 'Stanford University',
      bio: 'Passionate about building tools that solve real campus problems. Currently working on sustainability initiatives and improving student wellness through technology. Always looking for collaboration opportunities and interesting projects to contribute to.',
      status: 'online',
      joinDate: 'September 2022',
      isConnected: false,
      stats: {
        connections: 156,
        spaces: 12,
        tools: 8,
        contributions: 47,
        posts: 23,
        likes: 189
      },
      badges: [
        { type: 'builder', label: 'Tool Creator', icon: Zap },
        { type: 'social', label: 'Community Builder', icon: Users },
        { type: 'academic', label: 'Dean\'s List', icon: Award },
        { type: 'achievement', label: 'Sustainability Champion', icon: Target }
      ],
      skills: ['React', 'Python', 'UI/UX Design', 'Product Management', 'Data Analysis'],
      interests: ['Sustainability', 'Mental Health', 'Campus Events', 'Hackathons', 'Photography'],
      recentActivity: [
        {
          type: 'tool',
          title: 'Created "Dorm Energy Tracker"',
          subtitle: 'A tool to help students monitor and reduce energy consumption',
          timestamp: '2 hours ago'
        },
        {
          type: 'space',
          title: 'Joined "Sustainability Club"',
          subtitle: 'Stanford\'s environmental action community',
          timestamp: '1 day ago'
        },
        {
          type: 'achievement',
          title: 'Earned "Community Builder" badge',
          subtitle: 'For helping 50+ students connect',
          timestamp: '3 days ago'
        }
      ],
      mutualConnections: 8
    },
    variant: 'profile',
    showFullProfile: true,
    showActivity: true,
    showMutualConnections: true
  }
};

export const DiscoveryCard: Story = {
  args: {
    user: {
      id: '2',
      name: 'Marcus Johnson',
      handle: '@marcusj',
      avatar: '/api/placeholder/56/56',
      role: 'leader',
      major: 'Political Science',
      year: 'Senior',
      school: 'UC Berkeley',
      bio: 'Student government president working on policy reform and campus inclusion initiatives. Leading multiple student organizations.',
      status: 'online',
      interests: ['Policy', 'Leadership', 'Community Organizing', 'Public Speaking'],
      mutualConnections: 12,
      isConnected: false
    },
    variant: 'discovery',
    showMutualConnections: true
  }
};

export const CompactProfile: Story = {
  args: {
    user: {
      id: '3',
      name: 'Sarah Kim',
      handle: '@sarahk',
      avatar: '/api/placeholder/64/64',
      coverImage: '/api/placeholder/400/96',
      role: 'student',
      major: 'Psychology',
      year: 'Sophomore',
      school: 'MIT',
      bio: 'Studying human behavior and community dynamics. Interested in how technology can improve mental health support systems on campus.',
      status: 'away',
      isConnected: true,
      stats: {
        connections: 89,
        spaces: 6,
        tools: 3,
        contributions: 21
      }
    },
    variant: 'compact-profile'
  }
};

// Campus Role Examples
export const StudentBuilder: Story = {
  args: {
    user: {
      id: '4',
      name: 'Jordan Park',
      handle: '@jordanp',
      avatar: '/api/placeholder/80/80',
      coverImage: '/api/placeholder/400/128',
      role: 'builder',
      major: 'Electrical Engineering',
      year: 'Junior',
      school: 'MIT',
      bio: 'Hardware and software creator focused on IoT solutions for campus life. Currently building smart dorm room automation systems.',
      status: 'online',
      joinDate: 'August 2022',
      isConnected: false,
      stats: {
        connections: 134,
        spaces: 8,
        tools: 15,
        contributions: 62
      },
      badges: [
        { type: 'builder', label: 'Hardware Hacker', icon: Zap },
        { type: 'builder', label: 'IoT Specialist', icon: Target },
        { type: 'academic', label: 'Research Assistant', icon: Award }
      ],
      skills: ['Arduino', 'Python', 'Circuit Design', 'CAD', '3D Printing'],
      interests: ['IoT', 'Smart Home', 'Sustainability', 'Maker Spaces'],
      recentActivity: [
        {
          type: 'tool',
          title: 'Released "Smart Laundry Monitor"',
          subtitle: 'IoT device to track washing machine availability',
          timestamp: '4 hours ago'
        }
      ],
      mutualConnections: 5
    },
    variant: 'profile',
    showFullProfile: true,
    showActivity: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Student builder profile showcasing technical skills and hardware projects.'
      }
    }
  }
};

export const CommunityLeader: Story = {
  args: {
    user: {
      id: '5',
      name: 'Emma Rodriguez',
      handle: '@emmar',
      avatar: '/api/placeholder/80/80',
      coverImage: '/api/placeholder/400/128',
      role: 'leader',
      major: 'Communications',
      year: 'Senior',
      school: 'UCLA',
      bio: 'Passionate about building inclusive communities and organizing impactful campus events. Currently serving as president of three student organizations.',
      status: 'online',
      joinDate: 'September 2021',
      isConnected: false,
      stats: {
        connections: 298,
        spaces: 15,
        tools: 4,
        contributions: 156
      },
      badges: [
        { type: 'leader', label: 'Space Leader', icon: Users },
        { type: 'social', label: 'Event Organizer', icon: Calendar },
        { type: 'achievement', label: 'Inclusion Champion', icon: Heart },
        { type: 'academic', label: 'Honor Society', icon: Award }
      ],
      skills: ['Event Planning', 'Public Speaking', 'Community Building', 'Marketing', 'Leadership'],
      interests: ['Social Justice', 'Event Planning', 'Photography', 'Diversity & Inclusion'],
      recentActivity: [
        {
          type: 'space',
          title: 'Organized "Campus Inclusion Summit"',
          subtitle: 'Brought together 200+ students for diversity discussions',
          timestamp: '1 day ago'
        },
        {
          type: 'achievement',
          title: 'Reached 300 connections milestone',
          subtitle: 'Building bridges across campus communities',
          timestamp: '2 days ago'
        }
      ],
      mutualConnections: 23
    },
    variant: 'profile',
    showFullProfile: true,
    showActivity: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Community leader profile highlighting leadership roles and social impact.'
      }
    }
  }
};

export const Faculty: Story = {
  args: {
    user: {
      id: '6',
      name: 'Dr. Rachel Martinez',
      handle: '@dr.martinez',
      avatar: '/api/placeholder/80/80',
      role: 'faculty',
      major: 'Psychology Department',
      school: 'University of Michigan',
      bio: 'Associate Professor researching student wellness and campus community dynamics. Passionate about supporting student success through evidence-based approaches.',
      status: 'online',
      joinDate: 'January 2020',
      isConnected: false,
      stats: {
        connections: 67,
        spaces: 4,
        tools: 2,
        contributions: 34
      },
      badges: [
        { type: 'academic', label: 'Professor', icon: Award },
        { type: 'academic', label: 'Researcher', icon: BookOpen },
        { type: 'leader', label: 'Mentor', icon: Users }
      ],
      skills: ['Research Methods', 'Student Counseling', 'Data Analysis', 'Academic Writing'],
      interests: ['Student Wellness', 'Campus Mental Health', 'Research', 'Mentoring'],
      recentActivity: [
        {
          type: 'post',
          title: 'Published research on campus wellness',
          subtitle: 'Study on community factors affecting student mental health',
          timestamp: '3 days ago'
        }
      ],
      mutualConnections: 4
    },
    variant: 'profile',
    showFullProfile: true,
    showActivity: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Faculty profile showing academic credentials and student mentorship focus.'
      }
    }
  }
};

// Connection States
export const ConnectedUser: Story = {
  args: {
    user: {
      id: '7',
      name: 'David Wilson',
      handle: '@davidw',
      avatar: '/api/placeholder/56/56',
      role: 'student',
      major: 'Biology',
      year: 'Freshman',
      school: 'Stanford University',
      bio: 'Pre-med student interested in research and community health initiatives.',
      status: 'online',
      interests: ['Medicine', 'Research', 'Volunteer Work', 'Tennis'],
      mutualConnections: 3,
      isConnected: true
    },
    variant: 'discovery'
  },
  parameters: {
    docs: {
      description: {
        story: 'Discovery card for already connected user showing message-first interactions.'
      }
    }
  }
};

export const PendingConnection: Story = {
  args: {
    user: {
      id: '8',
      name: 'Lisa Zhang',
      handle: '@lisaz',
      avatar: '/api/placeholder/80/80',
      role: 'builder',
      major: 'Computer Science',
      year: 'Senior',
      school: 'Carnegie Mellon',
      bio: 'AI/ML enthusiast building tools for student academic success. Currently working on a study optimization platform.',
      status: 'busy',
      isPending: true,
      stats: {
        connections: 178,
        spaces: 9,
        tools: 11,
        contributions: 89
      },
      mutualConnections: 7
    },
    variant: 'compact-profile'
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile showing pending connection state with disabled interaction.'
      }
    }
  }
};

// Interactive Demo
export const InteractiveUserDiscovery: Story = {
  render: () => {
    const [connections, setConnections] = useState<Set<string>>(new Set(['2']));
    const [following, setFollowing] = useState<Set<string>>(new Set(['3']));
    const [pending, setPending] = useState<Set<string>>(new Set());
    
    const users = [
      {
        id: '1',
        name: 'Alex Thompson',
        handle: '@alext',
        avatar: '/api/placeholder/56/56',
        role: 'builder',
        major: 'Computer Science',
        year: 'Junior',
        bio: 'Full-stack developer building campus productivity tools.',
        interests: ['Web Development', 'Startups', 'Design'],
        mutualConnections: 5
      },
      {
        id: '2',
        name: 'Maya Patel',
        handle: '@mayap',
        avatar: '/api/placeholder/56/56',
        role: 'leader',
        major: 'Business',
        year: 'Senior',
        bio: 'Entrepreneur and community organizer focused on student success.',
        interests: ['Entrepreneurship', 'Leadership', 'Events'],
        mutualConnections: 8
      },
      {
        id: '3',
        name: 'Carlos Silva',
        handle: '@carloss',
        avatar: '/api/placeholder/56/56',
        role: 'student',
        major: 'Environmental Science',
        year: 'Sophomore',
        bio: 'Environmental advocate working on campus sustainability.',
        interests: ['Sustainability', 'Climate Action', 'Research'],
        mutualConnections: 2
      }
    ];
    
    const handleConnect = (userId: string) => {
      if (connections.has(userId)) return;
      
      setPending(prev => new Set([...prev, userId]));
      
      setTimeout(() => {
        setPending(prev => {
          const newPending = new Set(prev);
          newPending.delete(userId);
          return newPending;
        });
        setConnections(prev => new Set([...prev, userId]));
      }, 2000);
    };
    
    const handleFollow = (userId: string) => {
      setFollowing(prev => {
        const newFollowing = new Set(prev);
        if (newFollowing.has(userId)) {
          newFollowing.delete(userId);
        } else {
          newFollowing.add(userId);
        }
        return newFollowing;
      });
    };
    
    return (
      <div className="space-y-6 max-w-lg">
        <div>
          <h3 className="text-xl font-bold text-hive-text-primary mb-2">Campus Discovery</h3>
          <p className="text-hive-text-secondary mb-6">
            Discover and connect with fellow students. Try connecting and following users to see state changes.
          </p>
        </div>
        
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={{
              ...user,
              status: 'online',
              isConnected: connections.has(user.id),
              isPending: pending.has(user.id),
              isFollowing: following.has(user.id)
            }}
            variant="discovery"
            showMutualConnections={true}
            onConnect={handleConnect}
            onMessage={(id) => console.log('Message:', id)}
            onFollow={handleFollow}
            onView={(id) => console.log('View profile:', id)}
          />
        ))}
        
        <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
          <h4 className="font-medium text-hive-text-primary mb-2">Discovery Stats</h4>
          <div className="text-sm text-hive-text-secondary space-y-1">
            <p>Connected: {connections.size} users</p>
            <p>Following: {following.size} users</p>
            <p>Pending requests: {pending.size}</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive campus discovery experience with connection and follow state management.'
      }
    }
  }
};