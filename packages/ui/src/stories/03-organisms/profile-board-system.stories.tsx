import type { Meta, StoryObj } from '@storybook/react';
import { 
  Calendar,
  Users,
  Zap,
  Settings,
  Edit3,
  Share2,
  Star,
  Crown,
  Hammer,
  ArrowRight,
  Plus,
  MoreHorizontal,
  Bell,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Grid3X3,
  Move
} from 'lucide-react';
import { useState } from 'react';

// Mock Board Template Profile System Component
const ProfileBoardSystem = ({ 
  user, 
  widgets, 
  isEditMode, 
  onToggleEditMode, 
  onWidgetResize,
  onWidgetMove,
  onWidgetConfigure,
  className 
}: any) => {
  const [editMode, setEditMode] = useState(isEditMode || false);

  return (
    <div className={`min-h-screen bg-hive-background-primary ${className}`}>
      {/* Top Nav Bar - Contextual */}
      <div className="sticky top-0 z-40 bg-hive-background-secondary/95 backdrop-blur-sm border-b border-hive-border-subtle">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-hive-text-primary">Profile</h1>
            <p className="text-sm text-hive-text-secondary">Your personal command center</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                editMode
                  ? 'bg-hive-gold text-hive-background-primary'
                  : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
              }`}
            >
              {editMode ? 'Done' : 'Customize'}
            </button>
            <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column Bento Grid */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-6 min-h-[600px]">
            {/* Column 1: Avatar Widget (1x2) */}
            <div className="row-span-2">
              <AvatarWidget 
                user={user} 
                editMode={editMode}
                onConfigure={() => onWidgetConfigure?.('avatar')}
              />
            </div>

            {/* Column 2-3: Calendar Widget (2x1) */}
            <div className="col-span-2">
              <CalendarWidget 
                user={user}
                editMode={editMode}
                onConfigure={() => onWidgetConfigure?.('calendar')}
              />
            </div>

            {/* Column 4: Ritual Widget (1x1) */}
            <div>
              <RitualWidget 
                user={user}
                editMode={editMode}
                onConfigure={() => onWidgetConfigure?.('ritual')}
              />
            </div>

            {/* Column 2: My Spaces Widget (1x1) */}
            <div>
              <MySpacesWidget 
                user={user}
                spaces={widgets?.spaces || []}
                editMode={editMode}
                onConfigure={() => onWidgetConfigure?.('spaces')}
              />
            </div>

            {/* Column 3: Connections Widget (1x1) */}
            <div>
              <ConnectionsWidget 
                user={user}
                connections={widgets?.connections || []}
                editMode={editMode}
                onConfigure={() => onWidgetConfigure?.('connections')}
              />
            </div>

            {/* Column 4: HiveLAB Widget (1x1) - Only for Builders */}
            <div>
              {user.isBuilder && (
                <HiveLabWidget 
                  user={user}
                  editMode={editMode}
                  onConfigure={() => onWidgetConfigure?.('hivelab')}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Mode Overlay */}
      {editMode && (
        <div className="fixed inset-0 bg-hive-background-primary/50 backdrop-blur-sm z-50 pointer-events-none">
          <div className="absolute top-20 right-6 bg-hive-background-secondary border border-hive-border-subtle rounded-lg p-4 pointer-events-auto">
            <h3 className="font-semibold text-hive-text-primary mb-2">Edit Mode</h3>
            <p className="text-sm text-hive-text-secondary mb-4">Drag widgets to rearrange, click settings to configure</p>
            <div className="flex items-center space-x-2 text-sm text-hive-text-secondary">
              <Move className="h-4 w-4" />
              <span>Drag to move</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Widget Components
const AvatarWidget = ({ user, editMode, onConfigure }: any) => (
  <div className={`h-full bg-hive-surface-elevated rounded-xl border border-hive-border-subtle relative overflow-hidden ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    {/* Tinder-like Vertical Format */}
    <div className="h-full flex flex-col">
      {/* Photo Carousel */}
      <div className="flex-1 relative bg-gradient-to-br from-hive-gold/20 to-hive-emerald/20 flex items-center justify-center">
        <div className="w-20 h-20 bg-hive-gold rounded-full flex items-center justify-center text-2xl font-bold text-hive-background-primary">
          {user.name[0]}
        </div>
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
      
      {/* User Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-hive-text-primary">{user.name}</h3>
          <p className="text-sm text-hive-text-secondary italic">"{user.customStatus || 'Living my best campus life'}"</p>
        </div>
        
        {/* Status Badges */}
        <div className="flex flex-wrap gap-1">
          {user.isBuilder && (
            <span className="px-2 py-1 bg-hive-gold/20 text-hive-gold text-xs rounded-full flex items-center space-x-1">
              <Hammer className="h-3 w-3" />
              <span>Builder</span>
            </span>
          )}
          {user.isLeader && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full flex items-center space-x-1">
              <Crown className="h-3 w-3" />
              <span>Leader</span>
            </span>
          )}
        </div>
        
        {/* Social Status Control */}
        <div className="w-full">
          <select className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-lg text-sm text-hive-text-primary">
            <option value="coordinating">🤝 Coordinating</option>
            <option value="studying">📚 Studying</option>
            <option value="social">🎉 Social</option>
            <option value="busy">⚡ Busy</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const CalendarWidget = ({ user, editMode, onConfigure }: any) => (
  <div className={`h-full bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-6 relative ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-hive-text-primary flex items-center space-x-2">
        <Calendar className="h-5 w-5" />
        <span>Today's Schedule</span>
      </h3>
    </div>
    
    {user.hasConnectedCalendar ? (
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
          <div className="w-3 h-8 bg-blue-500 rounded"></div>
          <div className="flex-1">
            <h4 className="font-medium text-hive-text-primary">CS 101 Lecture</h4>
            <p className="text-sm text-hive-text-secondary">10:00 AM - 11:30 AM • Engineering Hall</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
          <div className="w-3 h-8 bg-green-500 rounded"></div>
          <div className="flex-1">
            <h4 className="font-medium text-hive-text-primary">Study Group</h4>
            <p className="text-sm text-hive-text-secondary">2:00 PM - 4:00 PM • Library Room 201</p>
          </div>
        </div>
        {/* Conflict Alert */}
        <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-yellow-600">Conflict: Study/Gym overlaps at 3:30 PM</span>
        </div>
      </div>
    ) : (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-hive-background-tertiary rounded-full flex items-center justify-center mx-auto">
          <Calendar className="h-8 w-8 text-hive-text-secondary" />
        </div>
        <div>
          <h4 className="font-medium text-hive-text-primary mb-2">Connect Your Calendar</h4>
          <p className="text-sm text-hive-text-secondary mb-4">Sync your schedule to never miss important events</p>
        </div>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium">
            Connect Google Calendar
          </button>
          <button className="w-full px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
            Add Class Schedule Manually
          </button>
        </div>
      </div>
    )}
  </div>
);

const RitualWidget = ({ user, editMode, onConfigure }: any) => (
  <div className={`h-full bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-4 relative ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    <div className="text-center space-y-4">
      <div className="w-12 h-12 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto">
        <Star className="h-6 w-6 text-hive-gold" />
      </div>
      
      <div>
        <h3 className="font-semibold text-hive-text-primary mb-1">Week 2: Campus Connection</h3>
        <p className="text-sm text-hive-text-secondary">Build your social network</p>
      </div>
      
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-hive-text-secondary">Progress</span>
          <span className="text-hive-gold font-medium">Day 3/7 Complete</span>
        </div>
        <div className="w-full bg-hive-background-tertiary rounded-full h-2">
          <div className="bg-hive-gold h-2 rounded-full transition-all duration-300" style={{ width: '43%' }}></div>
        </div>
      </div>
      
      <button className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium flex items-center justify-center space-x-2">
        <span>Continue Ritual</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const MySpacesWidget = ({ user, spaces, editMode, onConfigure }: any) => (
  <div className={`h-full bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-4 relative ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-hive-text-primary flex items-center space-x-2">
        <Users className="h-5 w-5" />
        <span>My Spaces</span>
      </h3>
      <span className="text-sm text-hive-text-secondary">{spaces.length}</span>
    </div>
    
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {spaces.map((space: any, index: number) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-hive-background-tertiary transition-colors cursor-pointer">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-lg ${space.color} flex items-center justify-center text-sm`}>
              {space.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-hive-text-primary truncate text-sm">{space.name}</h4>
              {space.role === 'leader' && space.actionStatus && (
                <p className="text-xs text-hive-gold">{space.actionStatus}</p>
              )}
            </div>
          </div>
          {space.unreadCount > 0 && (
            <span className="bg-hive-gold text-hive-background-primary text-xs px-2 py-1 rounded-full font-medium">
              {space.unreadCount}
            </span>
          )}
        </div>
      ))}
    </div>
    
    <button className="w-full mt-4 px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors text-sm flex items-center justify-center space-x-2">
      <Plus className="h-4 w-4" />
      <span>Find Spaces</span>
    </button>
  </div>
);

const ConnectionsWidget = ({ user, connections, editMode, onConfigure }: any) => (
  <div className={`h-full bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-4 relative ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-hive-text-primary flex items-center space-x-2">
        <MessageCircle className="h-5 w-5" />
        <span>Connections</span>
      </h3>
    </div>
    
    <div className="space-y-3">
      <div className="text-center p-4 bg-hive-background-tertiary rounded-lg">
        <h4 className="font-medium text-hive-text-primary mb-2">Recommended</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              SC
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-hive-text-primary">Sarah Chen</p>
              <p className="text-xs text-hive-text-secondary">Same CS 101 class</p>
            </div>
            <button className="px-3 py-1 bg-hive-gold text-hive-background-primary rounded-full text-xs font-medium">
              Connect
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              MJ
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-hive-text-primary">Marcus Johnson</p>
              <p className="text-xs text-hive-text-secondary">West Hall resident</p>
            </div>
            <button className="px-3 py-1 bg-hive-gold text-hive-background-primary rounded-full text-xs font-medium">
              Connect
            </button>
          </div>
        </div>
      </div>
      
      {/* v1 Feature Teaser */}
      <div className="p-3 bg-gradient-to-r from-hive-gold/10 to-hive-emerald/10 border border-hive-gold/20 rounded-lg">
        <h4 className="font-medium text-hive-text-primary mb-1 text-sm">Coming in v1</h4>
        <p className="text-xs text-hive-text-secondary mb-2">"Who's Available?" - See classmates nearby</p>
        <div className="flex items-center space-x-1 text-xs text-hive-gold">
          <Clock className="h-3 w-3" />
          <span>Get notified</span>
        </div>
      </div>
    </div>
  </div>
);

const HiveLabWidget = ({ user, editMode, onConfigure }: any) => (
  <div className={`h-full bg-gradient-to-br from-hive-gold/20 to-hive-emerald/20 rounded-xl border border-hive-gold/30 p-4 relative ${
    editMode ? 'ring-2 ring-hive-gold/50' : ''
  }`}>
    {editMode && (
      <button 
        onClick={onConfigure}
        className="absolute top-2 right-2 z-10 p-1 bg-hive-background-primary rounded-full"
      >
        <Settings className="h-4 w-4 text-hive-text-secondary" />
      </button>
    )}
    
    <div className="text-center space-y-4 h-full flex flex-col justify-center">
      <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center mx-auto">
        <Zap className="h-6 w-6 text-hive-background-primary" />
      </div>
      
      <div>
        <h3 className="font-semibold text-hive-text-primary mb-2">HiveLAB</h3>
        <p className="text-sm text-hive-text-secondary mb-4">Your builder workspace for creating campus tools</p>
      </div>
      
      <button className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium flex items-center justify-center space-x-2">
        <span>Enter Workspace</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const meta: Meta<typeof ProfileBoardSystem> = {
  title: '03-Organisms/Profile Board System',
  component: ProfileBoardSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Profile Board System with 4-column Bento Grid layout, customizable widgets, and contextual top nav. Built on the Board Template for web-first agency and organization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isEditMode: {
      control: 'boolean',
      description: 'Enable widget customization mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUser = {
  name: 'Alex Rodriguez',
  handle: 'alexr',
  customStatus: 'Ready to tackle CS algorithms!',
  major: 'Computer Science',
  school: 'University of California',
  isBuilder: true,
  isLeader: true,
  isVerified: true,
  hasConnectedCalendar: true,
};

const sampleSpaces = [
  {
    id: '1',
    name: 'CS 101 Study Group',
    icon: '💻',
    color: 'bg-blue-500/20',
    role: 'leader',
    actionStatus: '👥 3 new join requests',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'West Hall Floor 3',
    icon: '🏠',
    color: 'bg-green-500/20',
    role: 'member',
    unreadCount: 1,
  },
  {
    id: '3',
    name: 'Robotics Club',
    icon: '🤖',
    color: 'bg-purple-500/20',
    role: 'leader',
    actionStatus: '📅 Meeting tonight',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Math Tutoring',
    icon: '📐',
    color: 'bg-orange-500/20',
    role: 'member',
    unreadCount: 5,
  },
];

// Basic examples
export const Default: Story = {
  args: {
    user: sampleUser,
    widgets: {
      spaces: sampleSpaces,
      connections: [],
    },
    isEditMode: false,
  },
};

export const EditMode: Story = {
  args: {
    user: sampleUser,
    widgets: {
      spaces: sampleSpaces,
      connections: [],
    },
    isEditMode: true,
  },
};

export const NonBuilderUser: Story = {
  args: {
    user: {
      ...sampleUser,
      isBuilder: false,
      isLeader: false,
      customStatus: 'Exploring campus opportunities',
    },
    widgets: {
      spaces: sampleSpaces.slice(0, 2),
      connections: [],
    },
    isEditMode: false,
  },
};

export const NewUserOnboarding: Story = {
  args: {
    user: {
      ...sampleUser,
      name: 'Jordan Kim',
      handle: 'jordank',
      customStatus: 'New to campus, excited to connect!',
      major: 'Biology',
      isBuilder: false,
      isLeader: false,
      hasConnectedCalendar: false,
    },
    widgets: {
      spaces: [
        {
          id: '1',
          name: 'Biology 101',
          icon: '🧬',
          color: 'bg-green-500/20',
          role: 'member',
          unreadCount: 0,
        }
      ],
      connections: [],
    },
    isEditMode: false,
  },
};

// Campus scenarios
export const CampusBoardScenarios: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState('experienced');
    
    const userProfiles = {
      experienced: {
        user: {
          name: 'Sarah Chen',
          handle: 'sarahc',
          customStatus: 'Building the future, one tool at a time',
          major: 'Computer Science',
          school: 'MIT',
          isBuilder: true,
          isLeader: true,
          hasConnectedCalendar: true,
        },
        spaces: [
          {
            id: '1',
            name: 'Advanced Algorithms',
            icon: '🔬',
            color: 'bg-blue-500/20',
            role: 'leader',
            actionStatus: '👥 5 new join requests',
            unreadCount: 8,
          },
          {
            id: '2',
            name: 'Tech Entrepreneurs',
            icon: '🚀',
            color: 'bg-purple-500/20',
            role: 'leader',
            actionStatus: '🎯 Pitch competition tomorrow',
            unreadCount: 12,
          },
          {
            id: '3',
            name: 'East Campus Community',
            icon: '🏘️',
            color: 'bg-green-500/20',
            role: 'member',
            unreadCount: 3,
          },
          {
            id: '4',
            name: 'Women in STEM',
            icon: '👩‍💻',
            color: 'bg-pink-500/20',
            role: 'moderator',
            unreadCount: 2,
          },
        ]
      },
      freshman: {
        user: {
          name: 'Marcus Thompson',
          handle: 'marcust',
          customStatus: 'Finding my way around campus!',
          major: 'Engineering',
          school: 'Stanford University',
          isBuilder: false,
          isLeader: false,
          hasConnectedCalendar: false,
        },
        spaces: [
          {
            id: '1',
            name: 'Engineering 101',
            icon: '⚙️',
            color: 'bg-orange-500/20',
            role: 'member',
            unreadCount: 2,
          },
          {
            id: '2',
            name: 'Freshman Orientation',
            icon: '🎓',
            color: 'bg-blue-500/20',
            role: 'member',
            unreadCount: 1,
          },
        ]
      },
      socialLeader: {
        user: {
          name: 'Emma Davis',
          handle: 'emmad',
          customStatus: 'Coordinating amazing campus events!',
          major: 'Communications',
          school: 'UCLA',
          isBuilder: false,
          isLeader: true,
          hasConnectedCalendar: true,
        },
        spaces: [
          {
            id: '1',
            name: 'Campus Events Committee',
            icon: '🎉',
            color: 'bg-purple-500/20',
            role: 'leader',
            actionStatus: '📋 15 event proposals to review',
            unreadCount: 24,
          },
          {
            id: '2',
            name: 'Student Government',
            icon: '🏛️',
            color: 'bg-blue-500/20',
            role: 'leader',
            actionStatus: '🗳️ Vote on new policy',
            unreadCount: 7,
          },
          {
            id: '3',
            name: 'Greek Life Council',
            icon: '🏛️',
            color: 'bg-gold-500/20',
            role: 'member',
            unreadCount: 4,
          },
        ]
      }
    };

    const currentProfile = userProfiles[selectedUser as keyof typeof userProfiles];

    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="p-6">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Campus Board Examples</h2>
            
            <div className="flex space-x-4 mb-8">
              {Object.entries(userProfiles).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => setSelectedUser(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedUser === key
                      ? 'bg-hive-gold text-hive-background-primary'
                      : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                  }`}
                >
                  {profile.user.name} ({key.replace(/([A-Z])/g, ' $1').toLowerCase()})
                </button>
              ))}
            </div>
          </div>
        </div>

        <ProfileBoardSystem
          user={currentProfile.user}
          widgets={{
            spaces: currentProfile.spaces,
            connections: [],
          }}
          isEditMode={false}
        />
      </div>
    );
  },
};

// Interactive board system
export const InteractiveBoardSystem: Story = {
  render: () => {
    const [editMode, setEditMode] = useState(false);
    const [userType, setUserType] = useState<'builder' | 'student' | 'leader'>('builder');

    const userVariants = {
      builder: {
        ...sampleUser,
        isBuilder: true,
        isLeader: false,
        customStatus: 'Building tools for campus success',
      },
      student: {
        ...sampleUser,
        name: 'Casey Johnson',
        handle: 'caseyj',
        isBuilder: false,
        isLeader: false,
        customStatus: 'Focused on academic excellence',
      },
      leader: {
        ...sampleUser,
        name: 'Riley Torres',
        handle: 'rileyt',
        isBuilder: false,
        isLeader: true,
        customStatus: 'Leading by example',
      },
    };

    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="p-6">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Interactive Board System</h2>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex space-x-2">
                {Object.keys(userVariants).map((type) => (
                  <button
                    key={type}
                    onClick={() => setUserType(type as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      userType === type
                        ? 'bg-hive-gold text-hive-background-primary'
                        : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  editMode
                    ? 'bg-hive-emerald text-white'
                    : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                }`}
              >
                {editMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
              </button>
            </div>
          </div>
        </div>

        <ProfileBoardSystem
          user={userVariants[userType]}
          widgets={{
            spaces: sampleSpaces,
            connections: [],
          }}
          isEditMode={editMode}
          onToggleEditMode={() => setEditMode(!editMode)}
          onWidgetConfigure={(widgetId: string) => alert(`Configure ${widgetId} widget`)}
        />
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    user: sampleUser,
    widgets: {
      spaces: sampleSpaces,
      connections: [],
    },
    isEditMode: false,
    onToggleEditMode: () => alert('Toggle edit mode'),
    onWidgetConfigure: (widgetId: string) => alert(`Configure ${widgetId} widget`),
  },
};