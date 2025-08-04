import type { Meta, StoryObj } from '@storybook/react';
import { ProfileBoardSystem } from '../../../apps/web/src/components/profile/profile-board-system';

const meta = {
  title: 'HIVE/Profile Board System',
  component: ProfileBoardSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Enhanced Profile Board System with 4-column Bento Grid layout, Expand & Focus modals, configuration panels, loading states, and comprehensive error handling. Features real API integration, data validation, and full social platform functionality.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileBoardSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// CORE PROFILE BOARD STORIES
// =========================

export const DefaultProfile: Story = {
  name: '🎯 Default Profile (Complete State)',
  args: {
    user: {
      id: 'user123',
      name: 'Sarah Chen',
      handle: 'sarahc',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
      bio: 'Building the future of student collaboration. Love React, coffee, and late-night coding sessions. Always looking for new projects to work on! 🚀',
      location: 'San Francisco, CA',
      school: 'University at Buffalo',
      major: 'Computer Science',
      year: 'Class of 2025',
      joinedAt: '2024-01-15',
      status: 'online'
    },
    stats: {
      connections: 47,
      spaces: 8,
      tools: 3,
      contributions: 156
    },
    editMode: false,
    onEditModeToggle: () => console.log('Edit mode toggled'),
    onWidgetConfigure: (widgetId: string) => console.log('Configure widget:', widgetId)
  }
};

export const EditModeActive: Story = {
  name: '✏️ Edit Mode (Customization Active)',
  args: {
    ...DefaultProfile.args,
    editMode: true
  }
};

export const NewUserProfile: Story = {
  name: '🌱 New User (Onboarding State)',
  args: {
    user: {
      id: 'newuser',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: null,
      bio: null,
      location: null,
      school: 'University at Buffalo',
      major: 'Undeclared',
      year: 'Class of 2028',
      joinedAt: '2024-08-01',
      status: 'online'
    },
    stats: {
      connections: 0,
      spaces: 0,
      tools: 0,
      contributions: 0
    },
    editMode: false,
    onEditModeToggle: () => console.log('Edit mode toggled'),
    onWidgetConfigure: (widgetId: string) => console.log('Configure widget:', widgetId)
  }
};

export const PowerUserProfile: Story = {
  name: '🔥 Power User (Heavy Activity)',
  args: {
    user: {
      id: 'poweruser',
      name: 'Marcus Williams',
      handle: 'marcusw',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Serial builder, hackathon winner, coffee addict. Building tools that make student life easier. Mentor to underclassmen and always ready to collaborate.',
      location: 'Cambridge, MA',
      school: 'MIT',
      major: 'Engineering + Business',
      year: 'Class of 2025',
      joinedAt: '2023-08-20',
      status: 'busy'
    },
    stats: {
      connections: 234,
      spaces: 23,
      tools: 12,
      contributions: 2340
    },
    editMode: false,
    onEditModeToggle: () => console.log('Edit mode toggled'),
    onWidgetConfigure: (widgetId: string) => console.log('Configure widget:', widgetId)
  }
};

export const PrivateProfile: Story = {
  name: '🔒 Private Profile (Ghost Mode)',
  args: {
    user: {
      id: 'privateuser',
      name: 'Jordan Smith',
      handle: 'jsmith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Focused on academics and personal growth.',
      location: 'Stanford, CA',
      school: 'Stanford University',
      major: 'Psychology',
      year: 'Class of 2026',
      joinedAt: '2024-02-10',
      status: 'away'
    },
    stats: {
      connections: 12,
      spaces: 3,
      tools: 0,
      contributions: 45
    },
    editMode: false,
    onEditModeToggle: () => console.log('Edit mode toggled'),
    onWidgetConfigure: (widgetId: string) => console.log('Configure widget:', widgetId)
  }
};

export const InternationalStudent: Story = {
  name: '🌍 International Student',
  args: {
    user: {
      id: 'intluser',
      name: 'Yuki Tanaka',
      handle: 'yukitan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Exchange student from Waseda University. Love exploring American culture and making friends! Always looking for study groups and cultural exchange opportunities.',
      location: 'From Tokyo, Japan',
      school: 'UC Berkeley',
      major: 'International Business',
      year: 'Class of 2025',
      joinedAt: '2024-01-10',
      status: 'studying'
    },
    stats: {
      connections: 23,
      spaces: 6,
      tools: 0,
      contributions: 78
    },
    editMode: false,
    onEditModeToggle: () => console.log('Edit mode toggled'),
    onWidgetConfigure: (widgetId: string) => console.log('Configure widget:', widgetId)
  }
};

// =========================
// WIDGET-SPECIFIC STORIES
// =========================

export const AvatarWidgetFocus: Story = {
  name: '👤 Avatar Widget States',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen space-y-8">
      <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Avatar Widget Variations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Complete Avatar */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Complete Profile</h3>
          <div className="w-64 h-96">
            <ProfileBoardSystem
              user={{
                id: 'complete',
                name: 'Sarah Chen',
                handle: 'sarahc',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
                bio: 'CS student passionate about building tools',
                school: 'University at Buffalo',
                major: 'Computer Science',
                year: 'Class of 2025',
                status: 'online'
              }}
              stats={{ connections: 47, spaces: 8, tools: 3, contributions: 156 }}
            />
          </div>
        </div>

        {/* No Avatar */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">No Avatar</h3>
          <div className="w-64 h-96">
            <ProfileBoardSystem
              user={{
                id: 'noavatar',
                name: 'Alex Rivera',
                handle: 'alexr',
                avatar: null,
                bio: 'New student exploring campus life',
                school: 'University at Buffalo',
                major: 'Undeclared',
                year: 'Class of 2028',
                status: 'online'
              }}
              stats={{ connections: 5, spaces: 2, tools: 0, contributions: 12 }}
            />
          </div>
        </div>

        {/* Minimal Info */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Minimal Info</h3>
          <div className="w-64 h-96">
            <ProfileBoardSystem
              user={{
                id: 'minimal',
                name: 'J. Smith',
                handle: 'jsmith',
                avatar: null,
                bio: null,
                school: 'University at Buffalo',
                major: null,
                year: null,
                status: 'offline'
              }}
              stats={{ connections: 0, spaces: 0, tools: 0, contributions: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export const CalendarWidgetStates: Story = {
  name: '📅 Calendar Widget States',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen space-y-8">
      <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Calendar Widget Variations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Busy Schedule */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Busy Schedule</h3>
          <div className="h-64">
            <ProfileBoardSystem
              user={{
                id: 'busy',
                name: 'Busy Student',
                handle: 'busystudent',
                school: 'University at Buffalo',
                status: 'busy'
              }}
              stats={{ connections: 25, spaces: 12, tools: 2, contributions: 89 }}
            />
          </div>
        </div>

        {/* Light Schedule */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Light Schedule</h3>
          <div className="h-64">
            <ProfileBoardSystem
              user={{
                id: 'light',
                name: 'Relaxed Student',
                handle: 'relaxed',
                school: 'University at Buffalo',
                status: 'online'
              }}
              stats={{ connections: 8, spaces: 3, tools: 1, contributions: 23 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// =========================
// MODAL INTERACTION STORIES
// =========================

export const ExpandFocusDemo: Story = {
  name: '🔍 Expand & Focus Modal Demo',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-hive-text-primary">Expand & Focus Modal System</h2>
          <p className="text-lg text-hive-text-secondary">
            Click any widget to expand it into a detailed modal view with comprehensive information and actions.
          </p>
        </div>
        
        <ProfileBoardSystem
          user={{
            id: 'modal-demo',
            name: 'Modal Demo User',
            handle: 'modaldemo',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            bio: 'Click any widget to see the expand & focus modal system in action! Each widget opens with detailed information and interactive elements.',
            school: 'University at Buffalo',
            major: 'Computer Science',
            year: 'Class of 2025',
            status: 'online'
          }}
          stats={{
            connections: 47,
            spaces: 8,
            tools: 3,
            contributions: 156
          }}
          onWidgetConfigure={(widgetId) => console.log('Configure:', widgetId)}
        />
      </div>
    </div>
  )
};

export const ConfigurationPanelDemo: Story = {
  name: '⚙️ Configuration Panel Demo',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-hive-text-primary">Widget Configuration System</h2>
          <p className="text-lg text-hive-text-secondary">
            Enable edit mode and click the settings icon on any widget to open the configuration panel.
          </p>
        </div>
        
        <ProfileBoardSystem
          user={{
            id: 'config-demo',
            name: 'Config Demo User',
            handle: 'configdemo',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
            bio: 'Enable edit mode to see widget configuration options. Each widget has customizable settings and layout options.',
            school: 'University at Buffalo',
            major: 'User Experience Design',
            year: 'Class of 2025',
            status: 'online'
          }}
          stats={{
            connections: 28,
            spaces: 6,
            tools: 2,
            contributions: 94
          }}
          editMode={true}
          onEditModeToggle={() => console.log('Edit mode toggled')}
          onWidgetConfigure={(widgetId) => console.log('Configure:', widgetId)}
        />
      </div>
    </div>
  )
};

// =========================
// LOADING & ERROR STATES
// =========================

export const LoadingStates: Story = {
  name: '⏳ Loading States',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen space-y-8">
      <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Loading State Variations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Loading */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Loading</h3>
          <div className="h-96 bg-hive-background-secondary rounded-xl border border-hive-border-default p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-hive-background-primary rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-hive-background-primary rounded w-3/4" />
                <div className="h-3 bg-hive-background-primary rounded w-1/2" />
                <div className="h-3 bg-hive-background-primary rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Widget Loading */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Loading</h3>
          <div className="h-96 bg-hive-background-secondary rounded-xl border border-hive-border-default p-6">
            <div className="animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-hive-background-primary rounded-full" />
                <div className="h-4 bg-hive-background-primary rounded w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-hive-background-primary rounded-lg" />
                <div className="h-12 bg-hive-background-primary rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ErrorStates: Story = {
  name: '❌ Error States & Validation',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen space-y-8">
      <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Error Handling & Data Validation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Invalid User Data */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Invalid User Data</h3>
          <ProfileBoardSystem
            user={{
              id: '',
              name: '',
              handle: 'invalid-handle-@#$',
              avatar: 'invalid-url',
              bio: 'A'.repeat(600), // Too long bio
              school: 'University at Buffalo',
              major: 'A'.repeat(150), // Too long major
              year: 'Invalid Year',
              status: 'invalid-status' as any
            }}
            stats={{ connections: -5, spaces: -2, tools: -1, contributions: -10 }}
          />
        </div>

        {/* Network Error State */}
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Network Error</h3>
          <div className="h-96 bg-hive-background-secondary rounded-xl border border-hive-status-error p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-hive-status-error/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-hive-status-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Network Error</h3>
            <p className="text-hive-text-secondary mb-4">Unable to load profile data. Please check your connection.</p>
            <button className="px-4 py-2 bg-hive-status-error text-white rounded-lg hover:bg-red-600 transition-colors">
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

// =========================
// RESPONSIVE DESIGN STORIES
// =========================

export const MobileView: Story = {
  name: '📱 Mobile View',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    ...DefaultProfile.args
  }
};

export const TabletView: Story = {
  name: '📱 Tablet View',
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  args: {
    ...DefaultProfile.args
  }
};

export const DesktopView: Story = {
  name: '🖥️ Desktop View',
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  args: {
    ...DefaultProfile.args
  }
};

// =========================
// SOCIAL PLATFORM FEATURES
// =========================

export const SocialPlatformShowcase: Story = {
  name: '🌐 Social Platform Features',
  render: () => (
    <div className="p-6 bg-hive-background-primary min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-hive-text-primary">Social Platform Integration</h2>
          <p className="text-lg text-hive-text-secondary max-w-3xl mx-auto">
            HIVE Profile Board System designed for social utility - where connections form around solving real problems together.
            This is social media that actually makes your life better.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Social User */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-hive-text-primary">🔥 Active Social User</h3>
            <ProfileBoardSystem
              user={{
                id: 'social-active',
                name: 'Emma Rodriguez',
                handle: 'emmar',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
                bio: 'Building connections that matter! CS senior helping underclassmen succeed. Always down for a coffee chat or study session ☕️',
                school: 'Georgia Tech',
                major: 'Computer Science',
                year: 'Class of 2024',
                status: 'online'
              }}
              stats={{
                connections: 156,
                spaces: 15,
                tools: 5,
                contributions: 890
              }}
            />
          </div>

          {/* Community Builder */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-hive-text-primary">🏗️ Community Builder</h3>
            <ProfileBoardSystem
              user={{
                id: 'community-builder',
                name: 'Marcus Williams',
                handle: 'marcusw',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                bio: 'Creating spaces where students thrive together. Hackathon organizer, mentor, and tool builder. Let\'s make campus life better! 🚀',
                school: 'MIT',
                major: 'Engineering + Business',
                year: 'Class of 2025',
                status: 'busy'
              }}
              stats={{
                connections: 234,
                spaces: 23,
                tools: 12,
                contributions: 2340
              }}
            />
          </div>
        </div>
        
        <div className="bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-hive-text-primary mb-4">🌟 Social Utility Philosophy</h3>
          <p className="text-hive-text-secondary max-w-4xl mx-auto">
            Every connection has purpose, every community solves problems, and every interaction moves your life forward. 
            This is social media that prepares you for life, not just college.
          </p>
        </div>
      </div>
    </div>
  )
};

// =========================
// COMPREHENSIVE DEMO
// =========================

export const ComprehensiveDemo: Story = {
  name: '🎯 Comprehensive Demo (Kitchen Sink)',
  render: () => (
    <div className="space-y-8 bg-hive-background-primary min-h-screen p-6">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-hive-text-primary">HIVE Profile Board System</h1>
        <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
          Complete demonstration of all features, states, and interactions - kitchen sink approach showcasing 
          the full power of the Profile Board System with modals, configuration, loading states, and error handling.
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Complete Profile */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-hive-text-primary">✨ Complete Profile Experience</h2>
          <ProfileBoardSystem
            user={{
              id: 'complete-demo',
              name: 'Sarah Chen',
              handle: 'sarahc',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
              bio: 'Full-stack developer passionate about building tools that make student life easier. Always looking for collaboration opportunities! 💻✨',
              school: 'University at Buffalo',
              major: 'Computer Science',
              year: 'Class of 2025',
              status: 'online'
            }}
            stats={{
              connections: 47,
              spaces: 8,
              tools: 3,
              contributions: 156
            }}
            onEditModeToggle={() => console.log('Edit mode toggled')}
            onWidgetConfigure={(widgetId) => console.log('Configure widget:', widgetId)}
          />
        </div>

        {/* Edit Mode Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-hive-text-primary">⚙️ Customization Mode</h2>
          <ProfileBoardSystem
            user={{
              id: 'edit-demo',
              name: 'Alex Rivera',
              handle: 'alexr',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              bio: 'Customizing my profile board for the perfect campus experience. Love the flexibility!',
              school: 'University at Buffalo',
              major: 'Design',
              year: 'Class of 2026',
              status: 'online'
            }}
            stats={{
              connections: 23,
              spaces: 5,
              tools: 1,
              contributions: 67
            }}
            editMode={true}
            onEditModeToggle={() => console.log('Edit mode toggled')}
            onWidgetConfigure={(widgetId) => console.log('Configure widget:', widgetId)}
          />
        </div>
      </div>
    </div>
  )
};