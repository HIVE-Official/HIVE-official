import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof Sidebar> = {
  title: '01-Atoms/Sidebar - COMPLETE DEFINITION',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: `
## 🔗 HIVE Sidebar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive navigation sidebar system for University at Buffalo HIVE platform main navigation and user interface.

### 🎯 **COMPONENT EXCELLENCE**
- **Hierarchical Navigation** - Support for parent items with expandable children for complex navigation structures
- **Collapsible Design** - Full and collapsed states for flexible layout management
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors, backgrounds, and borders
- **Active State Management** - Smart path matching and visual indicators for current page/section
- **User Profile Integration** - Embedded user profile display with avatar and handle
- **Breadcrumb Support** - Optional breadcrumb navigation for deep page hierarchies
- **Smooth Animations** - Transition effects for expanding/collapsing and hover states
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and focus management
- **Campus Navigation** - Built for University at Buffalo student platform navigation

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform navigation:
- **Feed Navigation** - Central social feed for campus activity and updates
- **Profile Management** - Personal profile, analytics, settings, and customization
- **Space Discovery** - Browse university, residential, Greek, and student spaces
- **Tool Ecosystem** - Personal tools, browse marketplace, and platform utilities
- **Calendar Integration** - Academic calendar, events, and scheduling
- **Campus Events** - University events, organization activities, and social gatherings
- **Settings & Preferences** - Account settings, privacy controls, and platform configuration

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Design** - Adaptive sidebar behavior for different screen sizes
- **Touch-Friendly** - Appropriate spacing and interaction areas for mobile
- **Collapsible Navigation** - Space-efficient collapsed mode for smaller screens
- **Clear Visual Hierarchy** - Easy navigation recognition on mobile devices
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Collapsed state of the sidebar',
    },
    currentPath: {
      control: 'text',
      description: 'Current active path for highlighting navigation items',
    },
    user: {
      control: 'object',
      description: 'User profile information',
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'Navigation item click handler',
    },
    onToggle: {
      action: 'toggle-clicked',
      description: 'Sidebar toggle handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Sample user data for stories
const sampleUser = {
  id: 'user-123',
  name: 'Sarah Chen',
  handle: 'schen_cs',
  avatar: '/api/placeholder/40/40',
};

// Default sidebar showcase
export const Default: Story = {
  args: {
    user: sampleUser,
    currentPath: '/feed',
    collapsed: false,
    onItemClick: action('navigation-clicked'),
    onToggle: action('sidebar-toggled'),
  },
  render: (args) => (
    <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <Sidebar {...args} />
      <div className="flex-1 p-6">
        <Card>
          <CardContent className="space-y-4">
            <Text variant="body-md" color="primary">
              HIVE platform navigation sidebar for University at Buffalo students:
            </Text>
            <Text variant="body-sm" color="secondary">
              Main navigation for campus social utility platform
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
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Navigation Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🔗 NAVIGATION STRUCTURE</Badge>
            Sidebar Navigation System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive navigation system for University at Buffalo HIVE platform with hierarchical structure and state management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Navigation (Expanded):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex h-96 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                  <Sidebar
                    user={sampleUser}
                    currentPath="/spaces"
                    collapsed={false}
                    onItemClick={action('expanded-navigation')}
                    breadcrumbs={[
                      { label: 'Home', href: '/' },
                      { label: 'Spaces', href: '/spaces' },
                      { label: 'Computer Science' }
                    ]}
                  />
                  <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                    <Text variant="body-sm" color="secondary">
                      Main content area - Spaces section with breadcrumb navigation showing current location
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Collapsed vs Expanded States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📱 RESPONSIVE STATES</Badge>
            Sidebar Collapse Behavior
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Flexible sidebar sizing for different screen sizes and user preferences
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Expanded vs Collapsed Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Expanded Sidebar (Desktop):</Text>
                  <div className="flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar
                      user={sampleUser}
                      currentPath="/profile"
                      collapsed={false}
                      onItemClick={action('expanded-nav')}
                    />
                    <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                      <Text variant="body-xs" color="secondary">
                        Full navigation with labels, user profile, and complete feature access
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Collapsed Sidebar (Space-Saving):</Text>
                  <div className="flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar
                      user={sampleUser}
                      currentPath="/tools"
                      collapsed={true}
                      onItemClick={action('collapsed-nav')}
                    />
                    <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                      <Text variant="body-xs" color="secondary">
                        Icon-only navigation for maximum content space, perfect for tablets and focused work
                      </Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Active States and Hierarchical Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE FEATURES</Badge>
            Navigation States and Hierarchy
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Active state management, hierarchical navigation, and expandable sections
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Different Active States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-3 gap-4">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Feed Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={sampleUser}
                        currentPath="/feed"
                        collapsed={false}
                        onItemClick={action('feed-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">Home feed active state</Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Spaces Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={sampleUser}
                        currentPath="/spaces/browse"
                        collapsed={false}
                        onItemClick={action('spaces-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">Spaces section with expandable children</Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Calendar Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={sampleUser}
                        currentPath="/calendar"
                        collapsed={false}
                        onItemClick={action('calendar-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">Calendar section active state</Text>
                  </div>

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
            Sidebar navigation in actual University at Buffalo student workflow and campus platform usage contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Daily Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Daily Navigation Workflow:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - CSE Senior Daily Platform Usage
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Morning: Check Feed & Calendar:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                        <Sidebar
                          user={{
                            id: 'sarah-123',
                            name: 'Sarah Chen',
                            handle: 'schen_cs',
                          }}
                          currentPath="/feed"
                          collapsed={false}
                          onItemClick={action('morning-workflow')}
                          breadcrumbs={[
                            { label: 'Home', href: '/' },
                            { label: 'Feed' }
                          ]}
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Start day by checking campus activity feed, then navigate to calendar for class schedule and study sessions
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Time: Access Spaces & Tools:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                        <Sidebar
                          user={{
                            id: 'sarah-123',
                            name: 'Sarah Chen',
                            handle: 'schen_cs',
                          }}
                          currentPath="/spaces/browse"
                          collapsed={false}
                          onItemClick={action('study-workflow')}
                          breadcrumbs={[
                            { label: 'Home', href: '/' },
                            { label: 'Spaces', href: '/spaces' },
                            { label: 'Browse' }
                          ]}
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Navigate to CSE 331 course space for algorithm study materials, then access personal tools for assignment tracking
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Different User Types Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Different Student Navigation Patterns:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Computer Science Student:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={{
                          id: 'alex-456',
                          name: 'Alex Rodriguez',
                          handle: 'arodriguez_cs',
                        }}
                        currentPath="/tools"
                        collapsed={false}
                        onItemClick={action('cs-student-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Heavy tools usage for coding projects, algorithm study spaces, and CS department resources
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Life Leader:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={{
                          id: 'maria-789',
                          name: 'Maria Johnson',
                          handle: 'mjohnson_ra',
                        }}
                        currentPath="/events"
                        collapsed={false}
                        onItemClick={action('ra-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Focus on events coordination, residential spaces management, and community building activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Organization President:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={{
                          id: 'jordan-012',
                          name: 'Jordan Kim',
                          handle: 'jkim_president',
                        }}
                        currentPath="/spaces"
                        collapsed={false}
                        onItemClick={action('president-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Emphasis on spaces management for student organizations, event planning, and member coordination
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Navigation Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile navigation patterns for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Walking Between Classes:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={sampleUser}
                        currentPath="/calendar"
                        collapsed={true}
                        onItemClick={action('mobile-nav')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Collapsed sidebar for quick navigation while moving around campus - easy thumb access to key features
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Library Study Session:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar
                        user={sampleUser}
                        currentPath="/spaces/browse"
                        collapsed={false}
                        onItemClick={action('library-nav')}
                        breadcrumbs={[
                          { label: 'Spaces', href: '/spaces' },
                          { label: 'Browse', href: '/spaces/browse' },
                          { label: 'Study Groups' }
                        ]}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Full navigation in Lockwood Library for finding study spaces, accessing course materials, and coordinating group work
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Advanced Navigation Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Advanced Navigation Features:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Deep Navigation with Breadcrumbs
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                  <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar
                      user={sampleUser}
                      currentPath="/spaces/university/cse-331"
                      collapsed={false}
                      onItemClick={action('deep-nav')}
                      breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Spaces', href: '/spaces' },
                        { label: 'University', href: '/spaces/university' },
                        { label: 'CSE 331' }
                      ]}
                      currentSection="Algorithm Analysis Course"
                    />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Complete navigation hierarchy showing breadcrumb path for deep page navigation in course spaces with context awareness
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
    currentPath: '/feed',
    collapsed: false,
    onItemClick: action('playground-navigation'),
    onToggle: action('playground-toggle'),
  },
  render: (args) => (
    <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <Sidebar {...args} />
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Sidebar Navigation Playground</CardTitle>
            <p className="text-[var(--hive-text-muted)]">
              Use the controls to test different sidebar configurations
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Text variant="body-sm" color="secondary">
                Interactive sidebar testing for University at Buffalo HIVE platform navigation
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};