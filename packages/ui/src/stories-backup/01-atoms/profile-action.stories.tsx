import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileAction, 
  EditAction, 
  ShareAction, 
  MessageAction, 
  ConnectAction, 
  SettingsAction, 
  CameraAction, 
  MoreAction,
  ACTION_TYPES 
} from '../../atomic/atoms/profile-action';
import { 
  Edit3, 
  Settings, 
  Share2, 
  MessageSquare, 
  UserPlus, 
  MoreHorizontal,
  Camera,
  Bell,
  Shield,
  Eye,
  Heart,
  Bookmark,
  Link,
  Download,
  Upload,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileAction> = {
  title: '01-Atoms/Profile Action',
  component: ProfileAction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile action component for user interactions, profile management, and social actions with predefined types and customization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Action button size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success'],
      description: 'Visual variant',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
      description: 'Button shape',
    },
    width: {
      control: 'select',
      options: ['auto', 'full', 'icon'],
      description: 'Width behavior',
    },
    actionType: {
      control: 'select',
      options: Object.keys(ACTION_TYPES),
      description: 'Predefined action type',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only icon',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Profile Action',
    icon: Settings,
  },
};

export const Edit: Story = {
  args: {
    actionType: 'edit',
  },
};

export const Message: Story = {
  args: {
    actionType: 'message',
  },
};

export const WithBadge: Story = {
  args: {
    actionType: 'notifications',
    badge: 5,
  },
};

export const Loading: Story = {
  args: {
    actionType: 'settings',
    loading: true,
  },
};

export const IconOnly: Story = {
  args: {
    actionType: 'share',
    iconOnly: true,
    width: 'icon',
  },
};

// All predefined action types
export const AllActionTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {Object.keys(ACTION_TYPES).map((key) => (
        <ProfileAction
          key={key}
          actionType={key as any}
          size="sm"
        />
      ))}
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <ProfileAction size="xs" actionType="edit" />
      <ProfileAction size="sm" actionType="message" />
      <ProfileAction size="md" actionType="share" />
      <ProfileAction size="lg" actionType="settings" />
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <ProfileAction variant="primary" label="Primary" icon={MessageSquare} />
      <ProfileAction variant="secondary" label="Secondary" icon={Edit3} />
      <ProfileAction variant="outline" label="Outline" icon={UserPlus} />
      <ProfileAction variant="ghost" label="Ghost" icon={Share2} />
      <ProfileAction variant="destructive" label="Destructive" icon={Trash2} />
      <ProfileAction variant="success" label="Success" icon={Heart} />
    </div>
  ),
};

// All shapes and widths
export const ShapesAndWidths: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <div>
        <h4 className="text-sm font-semibold text-hive-text-primary mb-3">Shapes</h4>
        <div className="flex gap-3">
          <ProfileAction shape="rounded" actionType="edit" />
          <ProfileAction shape="pill" actionType="message" />
          <ProfileAction shape="square" actionType="share" />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-hive-text-primary mb-3">Widths</h4>
        <div className="space-y-2">
          <ProfileAction width="auto" actionType="settings" />
          <ProfileAction width="full" actionType="edit" />
          <div className="flex gap-2">
            <ProfileAction width="icon" actionType="share" iconOnly />
            <ProfileAction width="icon" actionType="bookmark" iconOnly />
            <ProfileAction width="icon" actionType="more" iconOnly />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Campus profile action scenarios
export const CampusProfileActionScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Header</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-hive-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-hive-background-primary">AR</span>
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <CameraAction size="xs" shape="pill" />
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-semibold text-hive-text-primary">Alex Rodriguez</h4>
                <p className="text-hive-text-secondary mb-2">Computer Science Junior • Class of 2025</p>
                <p className="text-sm text-hive-text-mutedLight">Last seen 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <MessageAction size="sm" />
                <ConnectAction size="sm" />
                <MoreAction size="sm" iconOnly width="icon" />
              </div>
              <div className="flex space-x-2">
                <ShareAction size="sm" />
                <ProfileAction actionType="bookmark" size="sm" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-hive-background-tertiary rounded-lg">
              <h5 className="font-semibold text-hive-text-primary mb-2">Academic Stats</h5>
              <p className="text-2xl font-bold text-hive-gold">3.87 GPA</p>
              <p className="text-sm text-hive-text-secondary">89 Credit Hours</p>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg">
              <h5 className="font-semibold text-hive-text-primary mb-2">Community</h5>
              <p className="text-2xl font-bold text-hive-emerald">24 Groups</p>
              <p className="text-sm text-hive-text-secondary">156 Study Hours</p>
            </div>
            
            <div className="p-4 bg-hive-background-tertiary rounded-lg">
              <h5 className="font-semibold text-hive-text-primary mb-2">Tools Built</h5>
              <p className="text-2xl font-bold text-hive-sapphire">8 Published</p>
              <p className="text-sm text-hive-text-secondary">2.8k Total Users</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Own Profile Management</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-hive-text-primary">Your Profile</h4>
              <p className="text-hive-text-secondary">Manage your profile settings and privacy</p>
            </div>
            <div className="flex space-x-2">
              <EditAction variant="primary" />
              <SettingsAction />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Profile Settings</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Profile Photo</p>
                    <p className="text-sm text-hive-text-secondary">Update your profile picture</p>
                  </div>
                  <CameraAction size="sm" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Basic Information</p>
                    <p className="text-sm text-hive-text-secondary">Name, bio, and contact details</p>
                  </div>
                  <EditAction size="sm" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Academic Details</p>
                    <p className="text-sm text-hive-text-secondary">Major, year, and achievements</p>
                  </div>
                  <EditAction size="sm" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Privacy & Sharing</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Profile Visibility</p>
                    <p className="text-sm text-hive-text-secondary">Control who can see your profile</p>
                  </div>
                  <ProfileAction actionType="visibility" size="sm" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Notifications</p>
                    <p className="text-sm text-hive-text-secondary">Manage notification preferences</p>
                  </div>
                  <ProfileAction actionType="notifications" size="sm" badge={3} />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">Share Profile</p>
                    <p className="text-sm text-hive-text-secondary">Get a link to share your profile</p>
                  </div>
                  <div className="flex space-x-1">
                    <ProfileAction actionType="copy" size="sm" iconOnly width="icon" />
                    <ShareAction size="sm" iconOnly width="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Actions</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-4">
            {[
              {
                name: 'CS 101 Study Group',
                members: 28,
                role: 'Leader',
                actions: [
                  { type: 'edit', variant: 'outline' as const },
                  { type: 'settings', variant: 'ghost' as const },
                  { type: 'share', variant: 'ghost' as const },
                  { type: 'more', variant: 'ghost' as const, iconOnly: true, width: 'icon' as const }
                ]
              },
              {
                name: 'Physics Lab Partners',
                members: 12,
                role: 'Member',
                actions: [
                  { type: 'message', variant: 'primary' as const },
                  { type: 'notifications', variant: 'ghost' as const, badge: 2 },
                  { type: 'share', variant: 'ghost' as const },
                  { type: 'more', variant: 'ghost' as const, iconOnly: true, width: 'icon' as const }
                ]
              },
              {
                name: 'Calculus Study Sessions',
                members: 15,
                role: 'Member',
                actions: [
                  { type: 'bookmark', variant: 'ghost' as const },
                  { type: 'notifications', variant: 'ghost' as const },
                  { type: 'share', variant: 'ghost' as const },
                  { custom: true, label: 'Leave Group', variant: 'destructive' as const, icon: Trash2 }
                ]
              }
            ].map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-hive-background-tertiary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hive-emerald rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white">{group.name.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-hive-text-primary">{group.name}</h4>
                    <p className="text-sm text-hive-text-secondary">{group.members} members • {group.role}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {group.actions.map((action, actionIndex) => (
                    'custom' in action ? (
                      <ProfileAction
                        key={actionIndex}
                        size="sm"
                        variant={action.variant}
                        label={action.label}
                        icon={action.icon}
                      />
                    ) : (
                      <ProfileAction
                        key={actionIndex}
                        size="sm"
                        actionType={action.type as any}
                        variant={action.variant}
                        badge={action.badge}
                        iconOnly={action.iconOnly}
                        width={action.width}
                      />
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Management Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Your Published Tools</h4>
            <p className="text-hive-text-secondary">Manage and track your tool performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'GPA Calculator Pro',
                users: '2.8k',
                rating: 4.9,
                status: 'Published',
                actions: [
                  { type: 'edit', variant: 'outline' as const },
                  { type: 'settings', variant: 'ghost' as const },
                  { custom: true, label: 'Analytics', variant: 'ghost' as const, icon: Eye },
                  { type: 'share', variant: 'ghost' as const },
                  { type: 'more', variant: 'ghost' as const, iconOnly: true, width: 'icon' as const }
                ]
              },
              {
                name: 'Study Schedule Planner',
                users: '1.2k',
                rating: 4.7,
                status: 'Published',
                actions: [
                  { type: 'edit', variant: 'outline' as const },
                  { type: 'settings', variant: 'ghost' as const },
                  { custom: true, label: 'Analytics', variant: 'ghost' as const, icon: Eye },
                  { type: 'share', variant: 'ghost' as const },
                  { type: 'more', variant: 'ghost' as const, iconOnly: true, width: 'icon' as const }
                ]
              },
              {
                name: 'Course Review Helper',
                users: '456',
                rating: 4.5,
                status: 'Draft',
                actions: [
                  { type: 'edit', variant: 'primary' as const },
                  { custom: true, label: 'Publish', variant: 'success' as const, icon: Upload },
                  { type: 'settings', variant: 'ghost' as const },
                  { custom: true, label: 'Delete', variant: 'destructive' as const, icon: Trash2 }
                ]
              },
              {
                name: 'Assignment Tracker',
                users: '0',
                rating: 0,
                status: 'In Development',
                actions: [
                  { type: 'edit', variant: 'primary' as const },
                  { custom: true, label: 'Preview', variant: 'outline' as const, icon: Eye },
                  { type: 'settings', variant: 'ghost' as const },
                  { custom: true, label: 'Delete', variant: 'destructive' as const, icon: Trash2 }
                ]
              }
            ].map((tool, index) => (
              <div key={index} className="p-4 bg-hive-background-tertiary rounded-lg">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-hive-text-primary">{tool.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tool.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                      tool.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-hive-text-secondary">
                    <span>{tool.users} users</span>
                    {tool.rating > 0 && <span>★ {tool.rating}</span>}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {tool.actions.map((action, actionIndex) => (
                    'custom' in action ? (
                      <ProfileAction
                        key={actionIndex}
                        size="xs"
                        variant={action.variant}
                        label={action.label}
                        icon={action.icon}
                      />
                    ) : (
                      <ProfileAction
                        key={actionIndex}
                        size="xs"
                        actionType={action.type as any}
                        variant={action.variant}
                        iconOnly={action.iconOnly}
                        width={action.width}
                      />
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Social Interaction Panel</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Connect With Peers</h5>
              <div className="space-y-2">
                <ProfileAction width="full" actionType="message" />
                <ProfileAction width="full" actionType="connect" />
                <ProfileAction width="full" actionType="follow" />
                <div className="flex space-x-2">
                  <ProfileAction actionType="share" width="full" />
                  <ProfileAction actionType="bookmark" iconOnly width="icon" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Privacy Controls</h5>
              <div className="space-y-2">
                <ProfileAction width="full" actionType="privacy" />
                <ProfileAction width="full" actionType="visibility" />
                <ProfileAction width="full" actionType="ghost" />
                <div className="flex space-x-2">
                  <ProfileAction actionType="notifications" width="full" badge={7} />
                  <SettingsAction iconOnly width="icon" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Content Actions</h5>
              <div className="space-y-2">
                <ProfileAction width="full" actionType="upload" />
                <ProfileAction width="full" actionType="download" />
                <ProfileAction width="full" actionType="copy" />
                <div className="flex space-x-2">
                  <ProfileAction 
                    width="full" 
                    label="Export Data" 
                    icon={ExternalLink} 
                    variant="outline"
                  />
                  <MoreAction iconOnly width="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive action examples
export const InteractiveActionExamples: Story = {
  render: () => {
    const [followStatus, setFollowStatus] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    const [notificationCount, setNotificationCount] = useState(5);
    const [loadingActions, setLoadingActions] = useState<string[]>([]);

    const handleAction = async (actionId: string) => {
      setLoadingActions(prev => [...prev, actionId]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (actionId) {
        case 'follow':
          setFollowStatus(!followStatus);
          break;
        case 'bookmark':
          setBookmarkStatus(!bookmarkStatus);
          break;
        case 'notifications':
          setNotificationCount(0);
          break;
      }
      
      setLoadingActions(prev => prev.filter(id => id !== actionId));
    };

    return (
      <div className="space-y-8 p-6 max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Social Actions</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex flex-wrap gap-3">
              <ProfileAction
                actionType="follow"
                variant={followStatus ? 'success' : 'outline'}
                label={followStatus ? 'Following' : 'Follow'}
                icon={Heart}
                loading={loadingActions.includes('follow')}
                onClick={() => handleAction('follow')}
              />
              
              <ProfileAction
                actionType="bookmark"
                variant={bookmarkStatus ? 'success' : 'ghost'}
                label={bookmarkStatus ? 'Saved' : 'Save'}
                loading={loadingActions.includes('bookmark')}
                onClick={() => handleAction('bookmark')}
              />
              
              <ProfileAction
                actionType="notifications"
                badge={notificationCount > 0 ? notificationCount : undefined}
                loading={loadingActions.includes('notifications')}
                onClick={() => handleAction('notifications')}
              />
              
              <MessageAction
                variant="primary"
                onClick={() => alert('Opening message dialog...')}
              />
              
              <ShareAction
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Profile link copied to clipboard!');
                }}
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                Status: {followStatus ? 'Following' : 'Not following'} • 
                {bookmarkStatus ? ' Bookmarked' : ' Not bookmarked'} • 
                {notificationCount} notification{notificationCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Preset Action Components</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <EditAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">EditAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <MessageAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">MessageAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <ConnectAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">ConnectAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <ShareAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">ShareAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <SettingsAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">SettingsAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <CameraAction size="md" />
                <p className="text-xs text-hive-text-secondary mt-2">CameraAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <MoreAction size="md" iconOnly width="icon" />
                <p className="text-xs text-hive-text-secondary mt-2">MoreAction</p>
              </div>
              
              <div className="text-center p-3 bg-hive-background-tertiary rounded-lg">
                <ProfileAction actionType="notifications" size="md" badge={99} />
                <p className="text-xs text-hive-text-secondary mt-2">With Badge</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">External Link Actions</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex flex-wrap gap-3">
              <ProfileAction
                label="View GitHub"
                icon={ExternalLink}
                href="https://github.com"
                external
                variant="outline"
              />
              
              <ProfileAction
                label="LinkedIn Profile"
                icon={ExternalLink}
                href="https://linkedin.com"
                external
                variant="ghost"
              />
              
              <ProfileAction
                label="Portfolio Site"
                icon={Link}
                href="https://example.com"
                external
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Action - Use controls to customize →',
    icon: Settings,
    actionType: 'settings',
    size: 'md',
    variant: 'secondary',
    shape: 'rounded',
    width: 'auto',
    interactive: true,
    iconOnly: false,
    loading: false,
    disabled: false,
  },
};