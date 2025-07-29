import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSystem } from '../../components/profile/profile-system';
import { CalendarCard } from '../../components/profile/calendar-card';

const meta: Meta<typeof ProfileSystem> = {
  title: 'Profile/📱 Mobile & Responsive',
  component: ProfileSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mobile-first responsive design with touch-optimized interactions, cross-device synchronization, and progressive web app features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mobile Student - On the Go
export const MobileStudentOnTheGo: Story = {
  name: '📱 Mobile Student (Walking to Class)',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  args: {
    user: {
      id: 'mobile-student',
      fullName: 'Alex Walker',
      handle: 'alexwalks',
      email: 'alex.walker@university.edu',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
      major: 'Business Administration',
      graduationYear: 2025,
      school: 'State University',
      isBuilder: false,
      isPublic: true,
      memberSince: '2023-09-01',
      onlineStatus: 'mobile',
      locationStatus: 'Walking to class',
      bio: 'Always on the move 🚶‍♂️ | Business student | Quick phone checks between classes',
      interests: ['Business', 'Networking', 'Efficiency'],
      stats: {
        totalSpaces: 7,
        activeSpaces: 5,
        toolsCreated: 0,
        connectionsCount: 45,
        streakDays: 23,
        totalActivity: 267
      }
    },
    spaces: [
      {
        id: 'bus-301',
        name: 'BUS 301 - Marketing',
        type: 'course',
        memberCount: 89,
        unreadCount: 7,
        lastActivity: '2 minutes ago',
        isPinned: true,
        recentPosts: [
          {
            id: 'bus-1',
            author: 'Prof. Martinez',
            content: '📋 Quick reminder: Group project presentations tomorrow. Check your assigned time slots!',
            timestamp: '2 minutes ago',
            type: 'urgent-reminder',
            isMobileOptimized: true
          },
          {
            id: 'bus-2',
            author: 'Study Partner',
            content: 'Alex - can you review the slides one more time before class? 🙏',
            timestamp: '8 minutes ago',
            type: 'direct-message'
          }
        ]
      },
      {
        id: 'business-networking',
        name: 'Business Networking Club',
        type: 'club',
        memberCount: 156,
        unreadCount: 12,
        lastActivity: '15 minutes ago'
      }
    ],
    events: [
      {
        id: 'current-class',
        title: '🏃‍♂️ Marketing Class (WALKING TO)',
        time: '5 minutes',
        type: 'academic',
        location: 'Business Building 201',
        attendees: ['Prof. Martinez', 'Class'],
        metadata: {
          walkingTime: '3 minutes from current location',
          buildingCode: 'BUS',
          roomNumber: '201',
          isUrgent: true
        }
      },
      {
        id: 'group-meeting',
        title: '👥 Project Team Meetup',
        time: '45 minutes',
        type: 'study',
        location: 'Library Group Study Room',
        attendees: ['Project team'],
        metadata: {
          duration: '1 hour',
          purpose: 'Final presentation prep'
        }
      },
      {
        id: 'networking-event',
        title: '🤝 Business Mixer',
        time: 'Tonight 6:00 PM',
        type: 'networking',
        location: 'Student Union Ballroom',
        attendees: ['Business students', 'Alumni', 'Recruiters'],
        metadata: {
          dressCode: 'Business casual',
          rsvpRequired: true
        }
      }
    ],
    connections: [
      {
        id: 'classmates-nearby',
        type: 'proximity_based',
        message: '3 classmates from Marketing are also heading to Business Building',
        people: ['Sarah', 'Mike', 'Jenny'],
        action: 'Walk together'
      },
      {
        id: 'study-group',
        type: 'academic_collaboration',
        message: 'Your project team wants to connect on LinkedIn',
        people: ['Project teammates'],
        action: 'Connect professionally'
      }
    ],
    hiveLab: {
      isLocked: true,
      availableTools: ['Quick Timer', 'Class Locator'],
      createdTools: [],
      comingSoon: ['Mobile Study Tools'],
      unlockRequirements: 'Complete 3 courses or build first tool'
    },
    mobileOptimizations: {
      quickActions: true,
      swipeGestures: true,
      thumbReachable: true,
      reducedData: false,
      locationAware: true
    },
    isMobile: true
  }
};

// Tablet Student - Library Study
export const TabletStudySession: Story = {
  name: '📱 Tablet Study Session',
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  args: {
    user: {
      id: 'tablet-student',
      fullName: 'Jordan Rivera',
      handle: 'jordanstudies',
      email: 'jordan.rivera@university.edu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      major: 'Digital Art + Computer Science',
      graduationYear: 2024,
      school: 'Art Institute',
      isBuilder: true,
      isPublic: true,
      memberSince: '2020-08-20',
      onlineStatus: 'studying',
      locationStatus: 'Main Library - 3rd Floor',
      bio: 'Digital artist meets code | iPad Pro enthusiast | Always sketching and coding simultaneously ✏️💻',
      interests: ['Digital Art', 'UI/UX Design', 'Creative Coding', 'Procreate'],
      stats: {
        totalSpaces: 11,
        activeSpaces: 7,
        toolsCreated: 8,
        connectionsCount: 78,
        streakDays: 56,
        totalActivity: 1234
      }
    },
    spaces: [
      {
        id: 'digital-art',
        name: 'Digital Art Studio',
        type: 'course',
        memberCount: 34,
        unreadCount: 5,
        lastActivity: '20 minutes ago',
        recentPosts: [
          {
            id: 'art-1',
            author: 'Prof. Chen',
            content: '🎨 Portfolio review submissions due Friday. Upload to shared drive with your artist statement.',
            timestamp: '20 minutes ago',
            type: 'assignment',
            hasAttachment: true
          }
        ]
      },
      {
        id: 'creative-coding',
        name: 'Creative Coding Collective',
        type: 'club',
        memberCount: 67,
        unreadCount: 11,
        lastActivity: '1 hour ago'
      },
      {
        id: 'cs-algorithms',
        name: 'CS 450 - Algorithms',
        type: 'course',
        memberCount: 123,
        unreadCount: 3,
        lastActivity: '2 hours ago'
      }
    ],
    events: [
      {
        id: 'portfolio-work',
        title: '🎨 Portfolio Project Work',
        time: 'Current (2 hours remaining)',
        type: 'study',
        location: 'Library Study Room',
        attendees: ['You'],
        metadata: {
          focusMode: 'Deep work session',
          toolsNeeded: ['iPad Pro', 'Procreate', 'VS Code']
        }
      },
      {
        id: 'algorithm-lecture',
        title: '💻 Algorithms Lecture',
        time: 'Tomorrow 10:00 AM',
        type: 'academic',
        location: 'Computer Science Building',
        attendees: ['Prof. Williams', 'CS students']
      },
      {
        id: 'art-critique',
        title: '👥 Portfolio Critique Session',
        time: 'Friday 2:00 PM',
        type: 'academic',
        location: 'Art Studio',
        attendees: ['Art class', 'Visiting critics']
      }
    ],
    connections: [
      {
        id: 'creative-coders',
        type: 'skill_overlap',
        message: '15 students combine art and programming like you',
        people: ['Creative coding community'],
        action: 'Join collaboration projects'
      },
      {
        id: 'tool-users',
        type: 'tool_popularity',
        message: 'Your Procreate-to-CSS converter is used by 67 designers',
        people: ['Design students'],
        action: 'View usage analytics'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: ['Color Palette Generator', 'CSS Art Tools', 'Algorithm Visualizer'],
      createdTools: [
        'Procreate to CSS Converter',
        'Algorithm Animation Maker',
        'Digital Portfolio Builder',
        'Creative Coding Playground'
      ],
      comingSoon: ['AI Art Assistant', '3D Design Tools']
    },
    tabletOptimizations: {
      splitScreen: true,
      applePencilSupport: true,
      gestureNavigation: true,
      canvasIntegration: true
    },
    isTablet: true
  }
};

// Touch-First Interactions
export const TouchFirstInterface: Story = {
  name: '👆 Touch-First Interactions',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => {
    return (
      <div className="max-w-sm mx-auto bg-hive-background-primary min-h-screen">
        <div className="p-4 space-y-4">
          <div className="bg-hive-background-secondary p-4 rounded-lg">
            <h2 className="text-lg font-bold text-[var(--hive-text-primary)] mb-2">👆 Touch Interactions</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <div>• Tap - Select/Activate</div>
              <div>• Long press - Context menu</div>
              <div>• Swipe right - Quick actions</div>
              <div>• Swipe left - Dismiss/Archive</div>
              <div>• Pull down - Refresh</div>
              <div>• Pinch - Zoom content</div>
            </div>
          </div>
          
          <CalendarCard
            state="default"
            variant="mobile"
            data={{
              nextEvent: {
                id: 'touch-event',
                title: 'Touch UI Testing',
                time: '30 minutes',
                type: 'academic',
                location: 'Mobile Lab',
                attendees: ['Touch testers']
              },
              upcomingEvents: [
                {
                  id: 'swipe-demo',
                  title: 'Swipe Gesture Demo',
                  time: '2:00 PM',
                  type: 'demo',
                  location: 'UX Lab',
                  attendees: ['UX team']
                }
              ],
              todaysEvents: [],
              connections: [
                {
                  id: 'mobile',
                  name: 'Mobile Calendar',
                  type: 'google',
                  status: 'connected',
                  lastSync: new Date(),
                  color: 'var(--hive-status-info)'
                }
              ],
              conflicts: []
            }}
          />
          
          <div className="bg-hive-background-secondary p-4 rounded-lg">
            <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">Mobile Optimizations:</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>✅ Touch targets min 44px</li>
              <li>✅ Thumb-reachable navigation</li>
              <li>✅ Swipe gestures enabled</li>
              <li>✅ Haptic feedback support</li>
              <li>✅ Pull-to-refresh actions</li>
              <li>✅ Mobile keyboard adaptation</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

// Cross-Device Sync
export const CrossDeviceSync: Story = {
  name: '🔄 Cross-Device Synchronization',
  render: () => {
    return (
      <div className="p-6 space-y-8">
        <div className="bg-hive-background-secondary p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">🔄 Cross-Device Sync Demo</h2>
          <p className="text-gray-400">
            Same profile, seamlessly synchronized across all devices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile View */}
          <div className="space-y-2">
            <h3 className="text-center font-medium text-[var(--hive-text-primary)]">📱 Mobile</h3>
            <div className="bg-[var(--hive-background-primary)] rounded-lg p-2 mx-auto" style={{ width: '50', height: '100px' }}>
              <div className="bg-hive-background-primary rounded p-2 h-full overflow-hidden">
                <CalendarCard
                  state="default"
                  variant="mobile"
                  data={{
                    nextEvent: {
                      id: 'sync-event',
                      title: 'Physics Lab',
                      time: '45 minutes',
                      type: 'academic',
                      location: 'Science Bldg',
                      attendees: ['Lab partner']
                    },
                    upcomingEvents: [],
                    todaysEvents: [],
                    connections: [{
                      id: 'sync-mobile',
                      name: 'Mobile Sync',
                      type: 'google',
                      status: 'connected',
                      lastSync: new Date(),
                      color: 'var(--hive-status-info)'
                    }],
                    conflicts: []
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Tablet View */}
          <div className="space-y-2">
            <h3 className="text-center font-medium text-[var(--hive-text-primary)]">📱 Tablet</h3>
            <div className="bg-[var(--hive-background-primary)] rounded-lg p-2 mx-auto" style={{ width: '75px', height: '100px' }}>
              <div className="bg-hive-background-primary rounded p-3 h-full overflow-hidden">
                <CalendarCard
                  state="default"
                  variant="desktop"
                  data={{
                    nextEvent: {
                      id: 'sync-event-tablet',
                      title: 'Physics Lab',
                      time: '45 minutes',
                      type: 'academic',
                      location: 'Science Building 201',
                      attendees: ['Lab partner', 'TA Sarah']
                    },
                    upcomingEvents: [
                      {
                        id: 'study-session',
                        title: 'Study Group',
                        time: '3:00 PM',
                        type: 'study',
                        location: 'Library',
                        attendees: ['Study group']
                      }
                    ],
                    todaysEvents: [],
                    connections: [{
                      id: 'sync-tablet',
                      name: 'Tablet Sync',
                      type: 'google',
                      status: 'connected',
                      lastSync: new Date(),
                      color: 'var(--hive-status-info)'
                    }],
                    conflicts: []
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Desktop View */}
          <div className="space-y-2">
            <h3 className="text-center font-medium text-[var(--hive-text-primary)]">🖥️ Desktop</h3>
            <div className="bg-[var(--hive-background-primary)] rounded-lg p-2 mx-auto" style={{ width: '350px', height: '100px' }}>
              <div className="bg-hive-background-primary rounded p-4 h-full overflow-hidden">
                <CalendarCard
                  state="default"
                  variant="desktop"
                  data={{
                    nextEvent: {
                      id: 'sync-event-desktop',
                      title: '🧪 Physics Laboratory Session',
                      time: '45 minutes',
                      type: 'academic',
                      location: 'Science Building, Room 201',
                      attendees: ['Lab partner Alex', 'TA Sarah Wilson'],
                      metadata: {
                        professor: 'Dr. Johnson',
                        duration: '3 hours',
                        equipment: 'Wave interference setup'
                      }
                    },
                    upcomingEvents: [
                      {
                        id: 'study-detailed',
                        title: 'Physics Study Group',
                        time: '3:00 PM',
                        type: 'study',
                        location: 'Library Group Study Room 204',
                        attendees: ['Alex', 'Maria', 'David', '+3 others']
                      },
                      {
                        id: 'office-hours',
                        title: 'Office Hours - Dr. Johnson',
                        time: '4:30 PM',
                        type: 'academic',
                        location: 'Physics Department',
                        attendees: ['Dr. Johnson']
                      }
                    ],
                    todaysEvents: [],
                    connections: [{
                      id: 'sync-desktop',
                      name: 'Desktop Sync',
                      type: 'google',
                      status: 'connected',
                      lastSync: new Date(),
                      color: 'var(--hive-status-info)'
                    }],
                    conflicts: []
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg">
          <h3 className="font-medium text-green-300 mb-2">✅ Sync Status: Active</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-200">
            <div>📱 Mobile: Last sync 2 seconds ago</div>
            <div>📱 Tablet: Last sync 1 second ago</div>
            <div>🖥️ Desktop: Last sync just now</div>
          </div>
        </div>
      </div>
    );
  }
};

// Offline Mobile Experience
export const OfflineMobileExperience: Story = {
  name: '📵 Offline Mobile Experience',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  args: {
    user: {
      id: 'offline-mobile',
      fullName: 'Commuter Student',
      handle: 'commutestu',
      email: 'commuter@university.edu',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
      major: 'Engineering',
      graduationYear: 2025,
      school: 'Commuter University',
      isBuilder: false,
      isPublic: false,
      memberSince: '2023-09-01',
      onlineStatus: 'offline',
      locationStatus: 'On subway (no signal)',
      bio: 'Daily commuter | Offline study master | Making the most of subway time 🚇',
      interests: ['Engineering', 'Public Transit', 'Offline Productivity'],
      stats: {
        totalSpaces: 4,
        activeSpaces: 3,
        toolsCreated: 0,
        connectionsCount: 18,
        streakDays: 12,
        totalActivity: 89
      }
    },
    spaces: [
      {
        id: 'cached-engineering',
        name: '[CACHED] Engineering 201',
        type: 'course',
        memberCount: 67,
        unreadCount: 0, // Can't load new messages
        lastActivity: '2 hours ago (cached)',
        recentPosts: [
          {
            id: 'cached-1',
            author: 'Prof. Smith (cached)',
            content: 'Assignment 4 uploaded to course site (cached)',
            timestamp: '2 hours ago',
            type: 'cached-data',
            isOfflineContent: true
          }
        ]
      }
    ],
    events: [
      {
        id: 'cached-event',
        title: '[OFFLINE] Thermodynamics Lecture',
        time: '1 hour (cached)',
        type: 'academic',
        location: 'Engineering Building (cached)',
        attendees: ['Cached data'],
        metadata: {
          isOfflineData: true,
          lastCached: '2 hours ago'
        }
      }
    ],
    connections: [],
    hiveLab: {
      isLocked: true,
      availableTools: ['[OFFLINE] Basic Timer'],
      createdTools: [],
      comingSoon: ['Will sync when online'],
      offlineMode: true
    },
    isOffline: true,
    offlineMessage: 'Using cached data - will sync when connection is restored',
    lastSyncTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isMobile: true
  }
};

// Progressive Web App Features
export const ProgressiveWebAppFeatures: Story = {
  name: '📲 PWA Features',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  render: () => {
    return (
      <div className="max-w-sm mx-auto bg-hive-background-primary min-h-screen">
        <div className="p-4 space-y-4">
          <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-blue-300 mb-2">📲 PWA Features</h2>
            <div className="space-y-2 text-sm text-blue-200">
              <div>✅ Add to Home Screen</div>
              <div>✅ Offline functionality</div>
              <div>✅ Push notifications</div>
              <div>✅ Background sync</div>
              <div>✅ Install prompt</div>
            </div>
          </div>
          
          <div className="bg-hive-background-secondary p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[var(--hive-text-primary)]">Install HIVE App</h3>
              <button className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] px-3 py-1 rounded text-sm font-medium">
                Install
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Get the full HIVE experience with offline access, push notifications, and home screen access.
            </p>
          </div>
          
          <CalendarCard
            state="default"
            variant="mobile"
            data={{
              nextEvent: {
                id: 'pwa-event',
                title: '📱 PWA Workshop',
                time: '2 hours',
                type: 'academic',
                location: 'Tech Building',
                attendees: ['Web dev class']
              },
              upcomingEvents: [],
              todaysEvents: [],
              connections: [{
                id: 'pwa-sync',
                name: 'PWA Calendar',
                type: 'google',
                status: 'connected',
                lastSync: new Date(),
                color: 'var(--hive-status-info)'
              }],
              conflicts: []
            }}
          />
          
          <div className="bg-hive-background-secondary p-4 rounded-lg">
            <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">🔔 Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-2 bg-hive-background-tertiary rounded">
                <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--hive-text-primary)]">Class reminder</p>
                  <p className="text-xs text-gray-400">PWA Workshop starts in 2 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-hive-background-tertiary rounded">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--hive-text-primary)]">Background sync</p>
                  <p className="text-xs text-gray-400">Calendar updated with 3 new events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};