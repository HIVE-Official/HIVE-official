import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSystem } from '../../components/profile/profile-system';
import { CalendarCard } from '../../components/profile/calendar-card';

const meta: Meta<typeof ProfileSystem> = {
  title: 'Profile/♿ Accessibility & Edge Cases',
  component: ProfileSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accessibility features, edge cases, error states, and extreme scenarios that test component resilience and inclusive design patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Accessibility Features Demo
export const AccessibilityFeatures: Story = {
  name: '♿ Full Accessibility Features',
  args: {
    user: {
      id: 'accessible-user',
      fullName: 'Jamie Chen-Rodriguez',
      handle: 'jamiea11y',
      email: 'jamie.accessibility@university.edu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      major: 'Computer Science + Disability Studies',
      graduationYear: 2025,
      school: 'Inclusive University',
      isBuilder: true,
      isPublic: true,
      memberSince: '2023-08-15',
      onlineStatus: 'online',
      bio: 'Advocating for digital accessibility | Screen reader user | Building inclusive tech for everyone 🌟',
      interests: ['Accessibility', 'Inclusive Design', 'Assistive Technology', 'Advocacy'],
      accessibilityNeeds: {
        screenReader: true,
        highContrast: true,
        reducedMotion: true,
        keyboardNavigation: true,
        alternativeText: true
      },
      stats: {
        totalSpaces: 9,
        activeSpaces: 6,
        toolsCreated: 5,
        connectionsCount: 67,
        streakDays: 34,
        totalActivity: 445
      }
    },
    spaces: [
      {
        id: 'accessibility-advocates',
        name: 'Digital Accessibility Advocates',
        type: 'advocacy',
        memberCount: 89,
        unreadCount: 12,
        lastActivity: '15 minutes ago',
        ariaLabel: 'Digital Accessibility Advocates space with 89 members',
        recentPosts: [
          {
            id: 'a11y-1',
            author: 'Jamie C-R',
            content: '🎉 Just completed WCAG 2.1 audit of university website - found 47 issues and submitted detailed report with solutions!',
            timestamp: '15 minutes ago',
            type: 'achievement',
            hasAltText: true,
            ariaLabel: 'Achievement post by Jamie about WCAG audit completion'
          },
          {
            id: 'a11y-2',
            author: 'Screen Reader User',
            content: 'Jamie your accessibility testing toolkit saved me hours of manual testing. Thank you!',
            timestamp: '1 hour ago',
            type: 'appreciation'
          }
        ]
      },
      {
        id: 'assistive-tech',
        name: 'Assistive Technology Research',
        type: 'research',
        memberCount: 23,
        unreadCount: 5,
        lastActivity: '30 minutes ago',
        ariaLabel: 'Assistive Technology Research group'
      },
      {
        id: 'cs-inclusive',
        name: 'Computer Science - Inclusive Design',
        type: 'course',
        memberCount: 156,
        unreadCount: 8,
        lastActivity: '45 minutes ago'
      }
    ],
    events: [
      {
        id: 'a11y-workshop',
        title: '♿ Accessibility Workshop',
        time: '2 hours',
        type: 'academic',
        location: 'Accessible Learning Center',
        attendees: ['Students', 'Faculty'],
        metadata: {
          hasASLInterpreter: true,
          hasCAPTIONING: true,
          accessibleVenue: true,
          wheelchairAccessible: true
        },
        ariaLabel: 'Accessibility Workshop in 2 hours at Accessible Learning Center with ASL interpreter and captioning'
      },
      {
        id: 'screen-reader-demo',
        title: '🔊 Screen Reader Demo Session',
        time: 'Tomorrow 3:00 PM',
        type: 'demo',
        location: 'CS Lab (Voice-enabled)',
        attendees: ['CS students', 'Accessibility team'],
        metadata: {
          demonstrationFor: 'Developers learning screen reader usage',
          equipment: 'JAWS, NVDA, VoiceOver'
        }
      }
    ],
    connections: [
      {
        id: 'a11y-network',
        type: 'accessibility_community',
        message: '34 students are using your accessibility testing tools',
        people: ['Accessibility advocates', 'CS students', 'Researchers'],
        action: 'Share more resources'
      },
      {
        id: 'disability-services',
        type: 'support_network',
        message: 'Disability Services wants to collaborate on campus accessibility improvements',
        people: ['Disability Services team'],
        action: 'Schedule collaboration meeting'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: [
        'Screen Reader Tester',
        'Color Contrast Checker',
        'Keyboard Navigation Validator',
        'Alt Text Generator'
      ],
      createdTools: [
        'WCAG Compliance Scanner',
        'Accessibility Testing Toolkit',
        'Alt Text AI Assistant',
        'Voice Navigation Helper',
        'High Contrast Theme Generator'
      ],
      comingSoon: [
        'Braille Display Integration',
        'Voice Control API'
      ]
    },
    accessibilityMode: {
      isActive: true,
      screenReader: true,
      highContrast: true,
      reducedMotion: true,
      focusIndicators: 'enhanced',
      skipLinks: true
    }
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'keyboard-navigation',
            enabled: true
          },
          {
            id: 'aria-labels',
            enabled: true
          }
        ]
      }
    }
  }
};

// High Contrast Mode
export const HighContrastMode: Story = {
  name: '🎨 High Contrast Mode',
  args: {
    user: {
      id: 'contrast-user',
      fullName: 'Vision User',
      handle: 'visionuser',
      email: 'vision@university.edu',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
      major: 'Digital Media Design',
      graduationYear: 2025,
      school: 'Accessible University',
      isBuilder: false,
      isPublic: true,
      memberSince: '2024-02-01',
      onlineStatus: 'online',
      bio: 'Low vision user testing high contrast interfaces',
      interests: ['Visual Design', 'Accessibility', 'Color Theory'],
      stats: {
        totalSpaces: 4,
        activeSpaces: 3,
        toolsCreated: 1,
        connectionsCount: 23,
        streakDays: 12,
        totalActivity: 123
      }
    },
    spaces: [
      {
        id: 'design-class',
        name: 'Accessible Design Principles',
        type: 'course',
        memberCount: 45,
        unreadCount: 3,
        lastActivity: '20 minutes ago'
      }
    ],
    events: [
      {
        id: 'contrast-test',
        title: 'High Contrast UI Testing',
        time: '1 hour',
        type: 'academic',
        location: 'Design Lab',
        attendees: ['Design team']
      }
    ],
    connections: [],
    hiveLab: {
      isLocked: false,
      availableTools: ['Contrast Analyzer'],
      createdTools: ['High Contrast Theme Tester'],
      comingSoon: []
    },
    theme: 'high-contrast'
  },
  parameters: {
    backgrounds: {
      default: 'high-contrast',
      values: [
        {
          name: 'high-contrast',
          value: 'var(--hive-background-primary)'
        }
      ]
    }
  }
};

// Extreme Data Scenarios
export const DataExtremes: Story = {
  name: '🚀 Extreme Data Scenarios',
  args: {
    user: {
      id: 'extreme-user',
      fullName: 'Dr. Maximilian Extraordinarily-Long-Hyphenated-Family-Name III',
      handle: 'superlonghandlethatexceedsusualcharacterlimitsfortesting',
      email: 'very.long.email.address.for.testing.extreme.cases@very-long-university-name.edu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      major: 'Quantum Computing & Interdisciplinary Artificial Intelligence with a Minor in Sustainable Energy Systems',
      graduationYear: 2024,
      school: 'Massachusetts Institute of Technology - Cambridge Campus',
      isBuilder: true,
      isPublic: true,
      memberSince: '2019-08-15',
      onlineStatus: 'online',
      bio: 'Testing extreme data scenarios with exceptionally long biographical information that spans multiple lines and includes various special characters, unicode symbols ✨🎓🔬, and extensive technical jargon to validate component resilience under stress conditions while maintaining readability and accessibility standards across all supported platforms and devices.',
      interests: Array.from({ length: 20 }, (_, i) => `Interest ${i + 1} with Very Long Name`),
      stats: {
        totalSpaces: 999,
        activeSpaces: 123,
        toolsCreated: 456,
        connectionsCount: 9999,
        streakDays: 365,
        totalActivity: 99999
      }
    },
    spaces: Array.from({ length: 50 }, (_, i) => ({
      id: `space-${i}`,
      name: `Space ${i + 1} with Extremely Long Name That Tests Layout Boundaries`,
      type: ['course', 'research', 'social', 'study', 'organization'][i % 5] as any,
      memberCount: Math.floor(Math.random() * 10000),
      unreadCount: Math.floor(Math.random() * 999),
      lastActivity: `${Math.floor(Math.random() * 60)} minutes ago`,
      recentPosts: [{
        id: `post-${i}`,
        author: 'User with Very Long Name',
        content: 'This is an extremely long post content that tests how the component handles text overflow and wrapping in various scenarios with different content lengths and formatting requirements.',
        timestamp: `${Math.floor(Math.random() * 60)} minutes ago`,
        type: 'discussion'
      }]
    })),
    events: Array.from({ length: 100 }, (_, i) => ({
      id: `event-${i}`,
      title: `Event ${i + 1} with Extremely Long Title That Tests Text Truncation`,
      time: `${i + 1} hours`,
      type: ['academic', 'social', 'work', 'study', 'personal'][i % 5] as any,
      location: `Location ${i + 1} with Very Long Address That Tests Layout`,
      attendees: [`Person ${i + 1}`, 'Many others']
    })),
    connections: Array.from({ length: 25 }, (_, i) => ({
      id: `conn-${i}`,
      type: 'massive_network',
      message: `Connection ${i + 1} with extremely detailed message about complex relationships and multiple overlapping interests that span across various academic and social domains`,
      people: [`Person ${i + 1}`, `Person ${i + 2}`, `+${Math.floor(Math.random() * 100)} others`],
      action: 'View massive network'
    })),
    hiveLab: {
      isLocked: false,
      availableTools: Array.from({ length: 20 }, (_, i) => `Tool ${i + 1} with Long Name`),
      createdTools: Array.from({ length: 30 }, (_, i) => `Created Tool ${i + 1} with Very Long Descriptive Name`),
      comingSoon: Array.from({ length: 15 }, (_, i) => `Coming Soon Tool ${i + 1}`)
    }
  }
};

// Network Error States
export const NetworkErrorStates: Story = {
  name: '🌐 Network Error Handling',
  args: {
    user: {
      id: 'error-user',
      fullName: 'Error State User',
      handle: 'erroruser',
      email: 'error@university.edu',
      avatar: null, // Simulating failed avatar load
      major: 'Computer Science',
      graduationYear: 2025,
      school: 'Error University',
      isBuilder: false,
      isPublic: true,
      memberSince: '2024-01-15',
      onlineStatus: 'unknown',
      bio: 'Testing various error states and network failures',
      interests: ['Error Handling', 'Resilient Systems'],
      stats: {
        totalSpaces: 0,
        activeSpaces: 0,
        toolsCreated: 0,
        connectionsCount: 0,
        streakDays: 0,
        totalActivity: 0
      }
    },
    spaces: [],
    events: [],
    connections: [],
    hiveLab: null,
    errors: {
      profileError: 'Failed to load complete profile data',
      spacesError: 'Network timeout - unable to fetch spaces',
      eventsError: 'Calendar service temporarily unavailable',
      connectionsError: 'Connection service down for maintenance',
      hiveLab: 'HIVE Lab access restricted due to server issues'
    },
    isOffline: true,
    lastSyncTime: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
};

// Slow Network Simulation
export const SlowNetworkSimulation: Story = {
  name: '🐌 Slow Network Performance',
  render: () => {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-orange-300 mb-2">🐌 Slow Network Detected</h2>
          <p className="text-orange-200 mb-4">
            Connection speed: 2G (slow) | Data saver mode enabled | Images disabled
          </p>
          <div className="text-sm text-orange-300">
            ⚡ Showing optimized low-bandwidth version | 📱 Reduced animations | 🖼️ Text-only mode
          </div>
        </div>
        
        <CalendarCard
          state="loading"
          variant="desktop"
          data={{
            nextEvent: undefined,
            upcomingEvents: [],
            todaysEvents: [],
            connections: [
              {
                id: 'slow-connection',
                name: 'Google (Slow)',
                type: 'google',
                status: 'syncing',
                lastSync: new Date(Date.now() - 5 * 60 * 1000),
                color: 'var(--hive-status-info)'
              }
            ],
            conflicts: []
          }}
        />
        
        <div className="bg-hive-background-secondary p-4 rounded-lg">
          <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">Slow Network Optimizations:</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>✅ Skeleton loading states instead of spinners</li>
            <li>✅ Progressive image loading disabled</li>
            <li>✅ Reduced animation complexity</li>
            <li>✅ Compressed data payloads</li>
            <li>✅ Critical content prioritized</li>
            <li>✅ Background sync disabled</li>
          </ul>
        </div>
      </div>
    );
  }
};

// Keyboard Navigation Demo
export const KeyboardNavigationDemo: Story = {
  name: '⌨️ Keyboard Navigation',
  render: () => {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-blue-300 mb-2">⌨️ Keyboard Navigation Instructions</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
            <div>
              <strong>Basic Navigation:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Tab - Next focusable element</li>
                <li>• Shift+Tab - Previous element</li>
                <li>• Enter/Space - Activate button</li>
                <li>• Arrow keys - Navigate within components</li>
              </ul>
            </div>
            <div>
              <strong>Advanced Navigation:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Alt+M - Skip to main content</li>
                <li>• Alt+N - Skip to navigation</li>
                <li>• Ctrl+Home - Go to top</li>
                <li>• Esc - Close modals/menus</li>
              </ul>
            </div>
          </div>
        </div>
        
        <ProfileSystem
          user={{
            id: 'keyboard-user',
            fullName: 'Keyboard Navigation User',
            handle: 'keyboarduser',
            email: 'keyboard@university.edu',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
            major: 'Human-Computer Interaction',
            graduationYear: 2025,
            school: 'Accessible University',
            isBuilder: true,
            isPublic: true,
            memberSince: '2024-01-15',
            onlineStatus: 'online',
            bio: 'Testing keyboard accessibility and navigation patterns',
            interests: ['Keyboard Navigation', 'Accessibility', 'UX'],
            stats: {
              totalSpaces: 5,
              activeSpaces: 3,
              toolsCreated: 2,
              connectionsCount: 25,
              streakDays: 10,
              totalActivity: 150
            }
          }}
          spaces={[
            {
              id: 'hci-class',
              name: 'Human-Computer Interaction',
              type: 'course',
              memberCount: 67,
              unreadCount: 4,
              lastActivity: '20 minutes ago'
            }
          ]}
          events={[
            {
              id: 'usability-test',
              title: 'Keyboard Usability Testing',
              time: '2 hours',
              type: 'academic',
              location: 'UX Lab',
              attendees: ['Research team']
            }
          ]}
          connections={[]}
          hiveLab={{
            isLocked: false,
            availableTools: ['Keyboard Navigation Tester'],
            createdTools: ['Tab Order Analyzer', 'Focus Indicator Generator'],
            comingSoon: ['Voice Navigation API']
          }}
          keyboardNavigationMode={{
            isActive: true,
            showFocusIndicators: 'enhanced',
            skipLinks: true,
            tabOrder: 'logical'
          }}
        />
      </div>
    );
  }
};

// Color Blind Friendly
export const ColorBlindFriendly: Story = {
  name: '🎨 Color Blind Accessibility',
  args: {
    user: {
      id: 'colorblind-user',
      fullName: 'Color Accessibility User',
      handle: 'colorblinduser',
      email: 'colorblind@university.edu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      major: 'Visual Design + Psychology',
      graduationYear: 2025,
      school: 'Inclusive University',
      isBuilder: true,
      isPublic: true,
      memberSince: '2024-01-15',
      onlineStatus: 'online',
      bio: 'Deuteranopia color vision | Advocating for color-accessible design patterns',
      interests: ['Color Accessibility', 'Visual Design', 'Inclusive UX'],
      stats: {
        totalSpaces: 6,
        activeSpaces: 4,
        toolsCreated: 3,
        connectionsCount: 34,
        streakDays: 18,
        totalActivity: 189
      }
    },
    spaces: [
      {
        id: 'color-accessibility',
        name: 'Color Accessibility Research',
        type: 'research',
        memberCount: 23,
        unreadCount: 3,
        lastActivity: '15 minutes ago'
      }
    ],
    events: [
      {
        id: 'color-workshop',
        title: '🎨 Color-Blind Design Workshop',
        time: '3 hours',
        type: 'academic',
        location: 'Design Studio',
        attendees: ['Design students']
      }
    ],
    connections: [],
    hiveLab: {
      isLocked: false,
      availableTools: ['Color Blind Simulator', 'Pattern Generator'],
      createdTools: ['Deuteranopia Color Palette', 'Shape-Based Status Icons', 'Pattern-Based Data Visualization'],
      comingSoon: ['Protanopia Support', 'Tritanopia Testing']
    },
    colorBlindMode: {
      isActive: true,
      type: 'deuteranopia',
      usePatterns: true,
      useShapes: true,
      highContrast: true
    }
  }
};