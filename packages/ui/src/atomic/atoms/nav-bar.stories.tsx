import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './nav-bar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Search, Bell, Settings, User } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof NavBar> = {
  title: '01-Atoms/Nav Bar - COMPLETE DEFINITION',
  component: NavBar,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Nav Bar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The sophisticated navigation bar system for University at Buffalo campus platform navigation and user interaction.

### 🏆 **COMPONENT EXCELLENCE**
- **HIVE Brand Integration** - Official HIVE logo with perfect visual hierarchy
- **Smart Search Interface** - Unified search with keyboard shortcut support (⌘K)
- **User Identity System** - Profile display with avatar and authentication states
- **Notification Center** - Badge-based notification system with unread counts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Responsive Design** - Adapts seamlessly from desktop to mobile breakpoints
- **Accessibility Ready** - Keyboard navigation and screen reader support
- **Campus Context** - Built for University at Buffalo student workflows

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo platform navigation:
- **Academic Navigation** - Course search, student directory, faculty lookup
- **Campus Services** - Dining, housing, library, recreation access
- **Administrative Tools** - Registration, grades, financial aid, transcripts
- **Social Features** - Student connections, group messaging, event coordination
- **Real-time Updates** - Assignment notifications, announcement alerts, deadline reminders
- **Mobile Campus Life** - On-the-go access while moving between classes

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Targets** - Appropriately sized touch targets for mobile interaction
- **Responsive Search** - Collapsible search interface for mobile screens
- **Notification Badges** - Clear visual indicators for mobile notification management
- **Accessible Controls** - Keyboard and screen reader navigation support
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User information object',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Show notifications button',
    },
    unreadCount: {
      control: 'number',
      description: 'Number of unread notifications',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

// Sample user data
const sampleUser = {
  id: 'user-1',
  name: 'Sarah Chen',
  handle: 'sarahc',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
};

// Default nav bar showcase
export const Default: Story = {
  args: {
    user: sampleUser,
    showSearch: true,
    showNotifications: true,
    unreadCount: 3,
  },
  render: (args: any) => (
    <div className="bg-[var(--hive-background-primary)]">
      <NavBar {...args} />
      <div className="p-6">
        <Card>
          <CardContent className="space-y-4">
            <Text variant="body-md" color="primary">
              Main navigation bar for University at Buffalo HIVE platform
            </Text>
            <Text variant="body-sm" color="secondary">
              Complete navigation with search, notifications, and user profile access
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 bg-[var(--hive-background-primary)]">
      
      {/* User States Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">👤 USER STATES</Badge>
            Navigation Bar User States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different user authentication and identity states in the navigation bar
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Authenticated User:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={sampleUser}
                  showSearch={true}
                  showNotifications={true}
                  unreadCount={5}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Logged-in student with notifications and full platform access
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Guest User (Not Signed In):</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={null}
                  showSearch={true}
                  showNotifications={false}
                  unreadCount={0}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Visitor to the platform with limited access and sign-in prompt
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">User with High Notification Count:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={{
                    id: 'user-2',
                    name: 'Alex Thompson',
                    handle: 'alexthompson',
                  }}
                  showSearch={true}
                  showNotifications={true}
                  unreadCount={15}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Student with many unread notifications (shows 9+ badge)
              </Text>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Feature Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚙️ FEATURES</Badge>
            Navigation Bar Feature Configuration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different feature combinations for various application contexts and user types
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Full Feature Set:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={sampleUser}
                  showSearch={true}
                  showNotifications={true}
                  unreadCount={3}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Complete navigation with search, notifications, settings, and user profile
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Search Only Navigation:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={sampleUser}
                  showSearch={true}
                  showNotifications={false}
                  unreadCount={0}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Focused on search functionality for academic resource discovery
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Minimal Navigation:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar
                  user={sampleUser}
                  showSearch={false}
                  showNotifications={false}
                  unreadCount={0}
                />
              </div>
              <Text variant="body-sm" color="secondary">
                Clean, minimal interface for focused academic workflows
              </Text>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Brand Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎨 BRAND</Badge>
            HIVE Brand Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Official HIVE branding with perfect visual hierarchy and University at Buffalo context
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Elements:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">HIVE Logo:</Text>
                  <div className="flex items-center space-x-3 p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg 
                        className="w-8 h-8"
                        viewBox="0 0 1500 1500" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fill="var(--hive-brand-secondary)"
                          d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-lg text-[var(--hive-text-primary)] tracking-tight">
                      HIVE
                    </span>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Official HIVE hexagonal logo with semantic color integration
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Typography:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <span className="font-bold text-lg text-[var(--hive-text-primary)] tracking-tight">
                      HIVE
                    </span>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Bold, tracking-tight typography for strong brand presence
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔍 SEARCH</Badge>
            Unified Search Interface
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Powerful search interface for University at Buffalo academic and social discovery
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Search Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Input:</Text>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]" />
                    <input
                      type="text"
                      placeholder="Search spaces, people, tools..."
                      readOnly
                      className="w-full h-10 pl-10 pr-12 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl text-sm text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)]"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] border border-[var(--hive-border-primary)]">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Unified search with keyboard shortcut (⌘K) for quick access
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Scope:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Spaces</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">People</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Tools</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Content</Text>
                    </div>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Comprehensive search across all platform content types
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Navigation Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Navigation bar usage in actual University at Buffalo student and academic contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Dashboard Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Daily Academic Navigation
                </Text>
                
                <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                  <NavBar
                    user={{
                      id: 'student-1',
                      name: 'Emily Rodriguez',
                      handle: 'erodriguez',
                    }}
                    showSearch={true}
                    showNotifications={true}
                    unreadCount={7}
                  />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Examples:</Text>
                  <div className="space-y-2">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"CSE 331" → Find Algorithm Analysis course space</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"study group" → Discover active study groups</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"Dr. Smith" → Find professor's tools and office hours</Text>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Notification Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Notification Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Light Activity (1-3 notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'student-2',
                        name: 'Marcus Johnson',
                        handle: 'mjohnson',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={2}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    New assignment posted, space invitation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Moderate Activity (4-9 notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'student-3',
                        name: 'Priya Patel',
                        handle: 'ppatel',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={6}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Multiple course updates, group messages, event reminders
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">High Activity (10+ notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'student-4',
                        name: 'David Kim',
                        handle: 'dkim',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={23}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Active in multiple spaces, group projects, event planning
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Different User Types */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">University User Types:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Undergraduate Student:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'undergrad-1',
                        name: 'Taylor Wilson',
                        handle: 'twilson',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={4}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Active in course spaces, study groups, campus events
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Graduate Student:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'grad-1',
                        name: 'Dr. Maria Santos',
                        handle: 'msantos',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={8}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Research collaboration, teaching assistant duties, academic conferences
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Faculty Member:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'faculty-1',
                        name: 'Prof. John Anderson',
                        handle: 'janderson',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={12}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Course management, student communications, department coordination
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Visitor:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={null}
                      showSearch={true}
                      showNotifications={false}
                      unreadCount={0}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Prospective student, parent, or community member browsing public resources
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Real-Time Campus Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Real-Time Campus Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Navigation bar adapts to different campus situations and times:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Finals Week:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'finals-student',
                        name: 'Jordan Lee',
                        handle: 'jlee',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={15}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    High notification activity: study group updates, exam reminders, library bookings
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Registration Period:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'registration-student',
                        name: 'Alex Chen',
                        handle: 'achen',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={9}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Course availability alerts, waitlist updates, academic advisor messages
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">New Semester Start:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'new-semester-student',
                        name: 'Sam Rivera',
                        handle: 'srivera',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={21}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    New course spaces, syllabus updates, campus event invitations, club recruitment
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Summer Break:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar
                      user={{
                        id: 'summer-student',
                        name: 'Riley Thompson',
                        handle: 'rthompson',
                      }}
                      showSearch={true}
                      showNotifications={true}
                      unreadCount={1}
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Minimal activity: summer course updates, fall registration reminders
                  </Text>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    user: sampleUser,
    showSearch: true,
    showNotifications: true,
    unreadCount: 3,
  },
  render: (args: any) => (
    <div className="bg-[var(--hive-background-primary)]">
      <NavBar {...args} />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Nav Bar Playground</CardTitle>
            <p className="text-[var(--hive-text-muted)]">
              Use the controls to test different navigation bar configurations
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Text variant="body-sm" color="secondary">
                Interactive navigation bar testing for University at Buffalo campus platform
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};