import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Icon } from '../../../atomic/atoms/icon';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Activity,
  BarChart3,
  Users,
  Mail,
  Calendar,
  FileText,
  Database,
  Shield,
  Code,
  Globe
} from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: '02-atoms/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Tabs Component** - Interactive navigation tabs for content organization

Part of the HIVE Atomic Design System providing tabbed interfaces with smooth transitions and accessibility.

## Features
- **Context-based**: Uses React Context for state management across components
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Accessibility**: Full keyboard navigation and ARIA support
- **Flexible Layout**: Customizable styling and content organization
- **State Management**: Automatic active state handling and transitions
- **Disabled States**: Support for disabled tabs when needed

## Components
- **Tabs**: Root container component with state management
- **TabsList**: Container for tab triggers with styling
- **TabsTrigger**: Individual tab buttons with active states
- **TabsContent**: Content panels that display based on active tab

## Use Cases
- **Settings Panels**: Organize different configuration sections
- **Dashboard Views**: Switch between different data visualizations
- **Content Categories**: Organize related content by topic
- **Form Sections**: Multi-step forms with clear navigation
- **Profile Sections**: Different aspects of user information

## Accessibility Notes
- Proper ARIA roles and states for screen readers
- Keyboard navigation with arrow keys and Tab/Shift+Tab
- Focus management and visual indicators
- Disabled state support with proper attributes
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default active tab value (uncontrolled)'
    },
    value: {
      control: 'text',
      description: 'Active tab value (controlled)'
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when tab changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-100">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Overview</Text>
          <Text variant="body-md" color="secondary">
            Welcome to your dashboard overview. Here you can see a summary of your account activity and key metrics.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Analytics</Text>
          <Text variant="body-md" color="secondary">
            Detailed analytics and performance metrics for your account and projects.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Settings</Text>
          <Text variant="body-md" color="secondary">
            Configure your account preferences, notifications, and security settings.
          </Text>
        </HiveCard>
      </TabsContent>
    </Tabs>
  )
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-125">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <Icon icon={Home} size="sm" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Icon icon={Users} size="sm" />
          Users
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <Icon icon={BarChart3} size="sm" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Icon icon={Settings} size="sm" />
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="mt-4">
        <HiveCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon icon={Home} size="lg" color="gold" />
            <Text variant="heading-lg">Dashboard</Text>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Text variant="display-sm" color="emerald">1.2K</Text>
              <Text variant="body-sm" color="secondary">Active Users</Text>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Text variant="display-sm" color="sapphire">45</Text>
              <Text variant="body-sm" color="secondary">Projects</Text>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="users" className="mt-4">
        <HiveCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon icon={Users} size="lg" color="sapphire" />
            <Text variant="heading-lg">User Management</Text>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon={User} size="sm" />
                <div>
                  <Text variant="body-md">John Doe</Text>
                  <Text variant="body-sm" color="secondary">Administrator</Text>
                </div>
              </div>
              <Badge variant="success" dot>Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon={User} size="sm" />
                <div>
                  <Text variant="body-md">Jane Smith</Text>
                  <Text variant="body-sm" color="secondary">Editor</Text>
                </div>
              </div>
              <Badge variant="warning" dot>Away</Badge>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <HiveCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon icon={BarChart3} size="lg" color="emerald" />
            <Text variant="heading-lg">Analytics</Text>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon icon={Activity} size="lg" color="emerald" className="mx-auto mb-2" />
              <Text variant="body-md">Performance</Text>
              <Text variant="body-sm" color="emerald">+15% this week</Text>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon icon={Users} size="lg" color="sapphire" className="mx-auto mb-2" />
              <Text variant="body-md">Engagement</Text>
              <Text variant="body-sm" color="sapphire">85% active</Text>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon icon={BarChart3} size="lg" color="gold" className="mx-auto mb-2" />
              <Text variant="body-md">Revenue</Text>
              <Text variant="body-sm" color="gold">$12.5K</Text>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-4">
        <HiveCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon icon={Settings} size="lg" color="gold" />
            <Text variant="heading-lg">Settings</Text>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon={Bell} size="sm" />
                <Text variant="body-md">Notifications</Text>
              </div>
              <Badge variant="primary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon={Shield} size="sm" />
                <Text variant="body-md">Security</Text>
              </div>
              <Badge variant="success">2FA Active</Badge>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
    </Tabs>
  )
};

// With Badges
export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="messages" className="w-125">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="messages" className="flex items-center gap-2">
          Messages
          <Badge variant="primary" count={12} />
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          Notifications
          <Badge variant="error" count={3} />
        </TabsTrigger>
        <TabsTrigger value="updates" className="flex items-center gap-2">
          Updates
          <Badge variant="warning" count={5} />
        </TabsTrigger>
        <TabsTrigger value="archive">
          Archive
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="messages" className="mt-4">
        <HiveCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Text variant="heading-sm">Messages</Text>
            <Badge variant="primary" count={12} />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Text variant="body-md">Team Meeting Reminder</Text>
                <Text variant="body-xs" color="secondary">2 min ago</Text>
              </div>
              <Text variant="body-sm" color="secondary">
                Don't forget about the team standup at 2 PM today.
              </Text>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Text variant="body-md">Project Update</Text>
                <Text variant="body-xs" color="secondary">1 hour ago</Text>
              </div>
              <Text variant="body-sm" color="secondary">
                The latest deployment was successful. All systems operational.
              </Text>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-4">
        <HiveCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Text variant="heading-sm">Notifications</Text>
            <Badge variant="error" count={3} />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon={Activity} size="sm" color="ruby" />
                <Text variant="body-md">High CPU Usage</Text>
              </div>
              <Text variant="body-sm" color="secondary">
                Server CPU usage exceeded 90% threshold.
              </Text>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="updates" className="mt-4">
        <HiveCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Text variant="heading-sm">Updates</Text>
            <Badge variant="warning" count={5} />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon={Code} size="sm" color="gold" />
                <Text variant="body-md">Security Update Available</Text>
              </div>
              <Text variant="body-sm" color="secondary">
                A new security patch is available for your system.
              </Text>
            </div>
          </div>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="archive" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Archive</Text>
          <Text variant="body-md" color="secondary">
            No archived items to display.
          </Text>
        </HiveCard>
      </TabsContent>
    </Tabs>
  )
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-100">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
        <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
        <TabsTrigger value="admin" disabled>Admin</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">General Settings</Text>
          <Text variant="body-md" color="secondary">
            Basic account settings and preferences that are available to all users.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="advanced" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Advanced Settings</Text>
          <Text variant="body-md" color="secondary">
            Advanced configuration options for power users and developers.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="billing" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Billing Settings</Text>
          <Text variant="body-md" color="secondary">
            Billing and subscription management (Premium feature).
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="admin" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Admin Panel</Text>
          <Text variant="body-md" color="secondary">
            Administrative controls (Admin access required).
          </Text>
        </HiveCard>
      </TabsContent>
    </Tabs>
  )
};

// Vertical Tabs Layout
export const VerticalLayout: Story = {
  render: () => (
    <div className="flex gap-6 w-150">
      <Tabs defaultValue="profile" orientation="vertical" className="flex">
        <TabsList className="flex flex-col h-auto w-48 bg-gray-800">
          <TabsTrigger value="profile" className="w-full justify-start gap-3 p-3">
            <Icon icon={User} size="sm" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start gap-3 p-3">
            <Icon icon={Shield} size="sm" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start gap-3 p-3">
            <Icon icon={Bell} size="sm" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="w-full justify-start gap-3 p-3">
            <Icon icon={Globe} size="sm" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 ml-6">
          <TabsContent value="profile">
            <HiveCard className="p-6">
              <Text variant="heading-lg" className="mb-4">Profile Settings</Text>
              <div className="space-y-4">
                <div>
                  <Text variant="body-md" className="mb-2">Display Name</Text>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Text variant="body-md">John Doe</Text>
                  </div>
                </div>
                <div>
                  <Text variant="body-md" className="mb-2">Email</Text>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Text variant="body-md">john.doe@example.com</Text>
                  </div>
                </div>
              </div>
            </HiveCard>
          </TabsContent>
          
          <TabsContent value="security">
            <HiveCard className="p-6">
              <Text variant="heading-lg" className="mb-4">Security Settings</Text>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <Text variant="body-md">Two-Factor Authentication</Text>
                    <Text variant="body-sm" color="secondary">Add an extra layer of security</Text>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <Text variant="body-md">Login Notifications</Text>
                    <Text variant="body-sm" color="secondary">Get notified of new logins</Text>
                  </div>
                  <Badge variant="primary">Active</Badge>
                </div>
              </div>
            </HiveCard>
          </TabsContent>
          
          <TabsContent value="notifications">
            <HiveCard className="p-6">
              <Text variant="heading-lg" className="mb-4">Notification Preferences</Text>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={Mail} size="sm" />
                    <div>
                      <Text variant="body-md">Email Notifications</Text>
                      <Text variant="body-sm" color="secondary">Receive updates via email</Text>
                    </div>
                  </div>
                  <Badge variant="primary">On</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={Bell} size="sm" />
                    <div>
                      <Text variant="body-md">Push Notifications</Text>
                      <Text variant="body-sm" color="secondary">Browser notifications</Text>
                    </div>
                  </div>
                  <Badge variant="secondary">Off</Badge>
                </div>
              </div>
            </HiveCard>
          </TabsContent>
          
          <TabsContent value="integrations">
            <HiveCard className="p-6">
              <Text variant="heading-lg" className="mb-4">Integrations</Text>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={Database} size="sm" />
                    <div>
                      <Text variant="body-md">Database Connection</Text>
                      <Text variant="body-sm" color="secondary">Connect external databases</Text>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon={Globe} size="sm" />
                    <div>
                      <Text variant="body-md">API Access</Text>
                      <Text variant="body-sm" color="secondary">Third-party API integration</Text>
                    </div>
                  </div>
                  <Badge variant="warning">Limited</Badge>
                </div>
              </div>
            </HiveCard>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
};

// Complex Dashboard Example
export const ComplexDashboard: Story = {
  render: () => (
    <div className="w-[800px]">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Icon icon={Home} size="sm" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Icon icon={FileText} size="sm" />
            Projects
            <Badge variant="primary" count={8} />
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Icon icon={Users} size="sm" />
            Team
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Icon icon={BarChart3} size="sm" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Icon icon={Settings} size="sm" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Text variant="heading-md">Quick Stats</Text>
                <Icon icon={Activity} size="lg" color="gold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Text variant="display-md" color="emerald">23</Text>
                  <Text variant="body-sm" color="secondary">Active Projects</Text>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Text variant="display-md" color="sapphire">156</Text>
                  <Text variant="body-sm" color="secondary">Team Members</Text>
                </div>
              </div>
            </HiveCard>
            
            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Text variant="heading-md">Recent Activity</Text>
                <Icon icon={Calendar} size="lg" color="sapphire" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon icon={FileText} size="sm" color="emerald" />
                  <div>
                    <Text variant="body-sm">Project Alpha updated</Text>
                    <Text variant="body-xs" color="secondary">2 hours ago</Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon={Users} size="sm" color="sapphire" />
                  <div>
                    <Text variant="body-sm">New team member added</Text>
                    <Text variant="body-xs" color="secondary">4 hours ago</Text>
                  </div>
                </div>
              </div>
            </HiveCard>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <HiveCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Text variant="heading-lg">Active Projects</Text>
              <Badge variant="primary" count={8} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Text variant="body-md">HIVE Dashboard</Text>
                  <Badge variant="success">Active</Badge>
                </div>
                <Text variant="body-sm" color="secondary">
                  Modern analytics dashboard with real-time data
                </Text>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Text variant="body-md">Mobile App</Text>
                  <Badge variant="warning">In Progress</Badge>
                </div>
                <Text variant="body-sm" color="secondary">
                  Cross-platform mobile application
                </Text>
              </div>
            </div>
          </HiveCard>
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <HiveCard className="p-6">
            <Text variant="heading-lg" className="mb-6">Team Members</Text>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon={User} size="md" />
                  <div>
                    <Text variant="body-md">Sarah Johnson</Text>
                    <Text variant="body-sm" color="secondary">Lead Developer</Text>
                  </div>
                </div>
                <Badge variant="success" dot>Online</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon={User} size="md" />
                  <div>
                    <Text variant="body-md">Mike Chen</Text>
                    <Text variant="body-sm" color="secondary">UI/UX Designer</Text>
                  </div>
                </div>
                <Badge variant="warning" dot>Away</Badge>
              </div>
            </div>
          </HiveCard>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <HiveCard className="p-6">
            <Text variant="heading-lg" className="mb-6">Analytics Dashboard</Text>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Icon icon={BarChart3} size="xl" color="emerald" className="mx-auto mb-3" />
                <Text variant="display-sm" color="emerald">94%</Text>
                <Text variant="body-sm" color="secondary">Success Rate</Text>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Icon icon={Activity} size="xl" color="sapphire" className="mx-auto mb-3" />
                <Text variant="display-sm" color="sapphire">2.4K</Text>
                <Text variant="body-sm" color="secondary">Active Sessions</Text>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Icon icon={Users} size="xl" color="gold" className="mx-auto mb-3" />
                <Text variant="display-sm" color="gold">1.8K</Text>
                <Text variant="body-sm" color="secondary">Monthly Users</Text>
              </div>
            </div>
          </HiveCard>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <HiveCard className="p-6">
            <Text variant="heading-lg" className="mb-6">Application Settings</Text>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon={Bell} size="md" />
                  <div>
                    <Text variant="body-md">Push Notifications</Text>
                    <Text variant="body-sm" color="secondary">Receive real-time updates</Text>
                  </div>
                </div>
                <Badge variant="primary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon={Shield} size="md" />
                  <div>
                    <Text variant="body-md">Security Mode</Text>
                    <Text variant="body-sm" color="secondary">Enhanced security features</Text>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </HiveCard>
        </TabsContent>
      </Tabs>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <Tabs {...args} className="w-100">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tab1" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">First Tab</Text>
          <Text variant="body-md" color="secondary">
            This is the content for the first tab. You can customize the behavior using the controls below.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="tab2" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Second Tab</Text>
          <Text variant="body-md" color="secondary">
            This is the content for the second tab. Notice how the state is managed seamlessly.
          </Text>
        </HiveCard>
      </TabsContent>
      
      <TabsContent value="tab3" className="mt-4">
        <HiveCard className="p-4">
          <Text variant="heading-sm" className="mb-2">Third Tab</Text>
          <Text variant="body-md" color="secondary">
            This is the content for the third tab. Each tab can contain any type of content.
          </Text>
        </HiveCard>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'tab1'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different tab configurations. Note that controlled vs uncontrolled mode depends on whether you provide the value prop.'
      }
    }
  }
};