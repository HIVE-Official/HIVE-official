import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileGhostModeWidget } from './profile-ghost-mode-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileGhostModeWidget> = {
  title: '04-Organisms/Profile System/Profile Ghost Mode Widget - COMPLETE DEFINITION',
  component: ProfileGhostModeWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Profile Ghost Mode Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive privacy controls and ghost mode interface for University at Buffalo HIVE platform student privacy management and campus visibility control.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Privacy Categories** - Visibility, data protection, interactions, location, activity tracking for complete privacy control
- **4 Visibility Levels** - Public, friends-only, private, ghost mode for granular campus visibility management
- **Advanced Ghost Mode** - Temporary, scheduled, permanent invisibility with selective interaction controls
- **Privacy Scoring** - Real-time privacy assessment with recommendations and campus safety insights
- **Session Management** - Active session tracking and security monitoring for UB account protection
- **Interactive Controls** - Toggle switches, configuration panels, and responsive privacy setting management
- **Campus Safety** - University at Buffalo specific privacy considerations and academic environment protection
- **Data Export** - FERPA-compliant data management and educational privacy rights protection

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student privacy management:
- **Academic Privacy** - Course participation visibility, grade discussion privacy, study group discretion
- **Campus Safety** - Residence hall location privacy, campus activity tracking, peer interaction controls
- **Social Boundaries** - Friend circle visibility, event participation privacy, community engagement control
- **Professional Growth** - Career development privacy, networking discretion, academic achievement visibility
- **Ghost Mode Usage** - Study isolation periods, social breaks, campus drama avoidance, academic focus time
- **Privacy Education** - FERPA awareness, digital citizenship, campus safety protocols, data protection rights
- **Emergency Override** - Campus safety protocols with privacy respect and emergency contact systems

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Controls** - Large toggle switches and privacy setting buttons optimized for mobile interaction
- **Responsive Privacy Panel** - Adaptive layout for different screen sizes and one-handed campus usage
- **Quick Ghost Toggle** - Instant privacy mode activation for immediate campus visibility control
- **Mobile Security** - Location-aware privacy suggestions and campus network safety protocols
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ghostModeConfig: {
      control: 'object',
      description: 'Ghost mode configuration object',
    },
    privacySettings: {
      control: 'object',
      description: 'Array of privacy setting items',
    },
    visibilityLevel: {
      control: 'select',
      options: ['public', 'friends', 'private', 'ghost'],
      description: 'Current visibility level',
    },
    privacyScore: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Privacy score percentage',
    },
    activeSessions: {
      control: 'number',
      description: 'Number of active sessions',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing capabilities',
    },
    onToggleGhostMode: {
      action: 'toggle-ghost-mode',
      description: 'Ghost mode toggle handler',
    },
    onUpdatePrivacySetting: {
      action: 'update-privacy-setting',
      description: 'Privacy setting update handler',
    },
    onViewPrivacySettings: {
      action: 'view-privacy-settings',
      description: 'View all privacy settings handler',
    },
    onConfigureGhostMode: {
      action: 'configure-ghost-mode',
      description: 'Ghost mode configuration handler',
    },
    onViewDataExport: {
      action: 'view-data-export',
      description: 'Data export handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileGhostModeWidget>;

// Mock privacy settings for University at Buffalo scenarios
const mockPrivacySettingsBasic = [
  {
    id: 'privacy-001',
    name: 'Profile visibility to classmates',
    description: 'Control who can see your academic profile',
    category: 'visibility' as const,
    isEnabled: true,
    level: 'friends' as const,
    lastModified: '2024-01-15T09:30:00Z'
  },
  {
    id: 'privacy-002',
    name: 'Location sharing in residence halls',
    description: 'Share your location with floor community',
    category: 'location' as const,
    isEnabled: false,
    level: 'private' as const,
    lastModified: '2024-01-15T08:15:00Z'
  },
  {
    id: 'privacy-003',
    name: 'Activity feed visibility',
    description: 'Control who sees your campus activity',
    category: 'activity' as const,
    isEnabled: true,
    level: 'friends' as const,
    lastModified: '2024-01-15T07:45:00Z'
  }
];

const mockPrivacySettingsAdvanced = [
  {
    id: 'privacy-101',
    name: 'Profile visibility to classmates',
    description: 'Control who can see your academic profile',
    category: 'visibility' as const,
    isEnabled: true,
    level: 'friends' as const,
    lastModified: '2024-01-15T11:30:00Z'
  },
  {
    id: 'privacy-102',
    name: 'Personal data encryption',
    description: 'Encrypt sensitive academic and personal information',
    category: 'data' as const,
    isEnabled: true,
    level: 'private' as const,
    lastModified: '2024-01-15T11:00:00Z'
  },
  {
    id: 'privacy-103',
    name: 'Direct message permissions',
    description: 'Control who can send you private messages',
    category: 'interaction' as const,
    isEnabled: true,
    level: 'friends' as const,
    lastModified: '2024-01-15T10:45:00Z'
  },
  {
    id: 'privacy-104',
    name: 'Campus location tracking',
    description: 'Share real-time location with study partners',
    category: 'location' as const,
    isEnabled: false,
    level: 'hidden' as const,
    lastModified: '2024-01-15T10:15:00Z'
  },
  {
    id: 'privacy-105',
    name: 'Activity analytics sharing',
    description: 'Share usage patterns for community insights',
    category: 'activity' as const,
    isEnabled: true,
    level: 'private' as const,
    lastModified: '2024-01-15T09:30:00Z'
  },
  {
    id: 'privacy-106',
    name: 'Academic data protection',
    description: 'Enhanced FERPA compliance and grade privacy',
    category: 'data' as const,
    isEnabled: true,
    level: 'private' as const,
    lastModified: '2024-01-15T09:00:00Z'
  }
];

const mockGhostModeInactive = {
  isActive: false,
  duration: 'temporary' as const,
  hiddenActivities: [],
  visibilityLevel: 'minimal' as const,
  allowedInteractions: ['emergency', 'academic']
};

const mockGhostModeActive = {
  isActive: true,
  duration: 'scheduled' as const,
  scheduledEnd: '2024-01-20T23:59:59Z',
  hiddenActivities: ['posts', 'comments', 'likes', 'location'],
  visibilityLevel: 'invisible' as const,
  allowedInteractions: ['emergency']
};

const mockGhostModeStudyFocus = {
  isActive: true,
  duration: 'temporary' as const,
  hiddenActivities: ['social', 'casual'],
  visibilityLevel: 'selective' as const,
  allowedInteractions: ['academic', 'study-groups', 'emergency']
};

// Default ghost mode widget showcase
export const Default: Story = {
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen'
    },
    ghostModeConfig: mockGhostModeInactive,
    privacySettings: mockPrivacySettingsBasic,
    visibilityLevel: 'private',
    lastPrivacyUpdate: '2024-01-15T09:30:00Z',
    privacyScore: 85,
    activeSessions: 1,
    isEditable: true,
    onToggleGhostMode: action('toggle-ghost-mode'),
    onUpdatePrivacySetting: action('update-privacy-setting'),
    onViewPrivacySettings: action('view-privacy-settings'),
    onConfigureGhostMode: action('configure-ghost-mode'),
    onViewDataExport: action('view-data-export'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile ghost mode widget for University at Buffalo student privacy management:
          </Text>
          <ProfileGhostModeWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive privacy controls with ghost mode activation, campus safety features, and UB-specific privacy management
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Ghost Mode Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 GHOST MODE WIDGET SYSTEM</Badge>
            Privacy & Visibility Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile ghost mode widget system for University at Buffalo HIVE platform student privacy management and campus visibility control
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Ghost Mode Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Standard Privacy Mode:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-001', name: 'Sarah Johnson' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={mockPrivacySettingsBasic}
                      visibilityLevel="private"
                      lastPrivacyUpdate="2024-01-15T09:30:00Z"
                      privacyScore={85}
                      activeSessions={1}
                      onToggleGhostMode={action('standard-ghost-toggle')}
                      onUpdatePrivacySetting={action('standard-privacy-update')}
                      onViewPrivacySettings={action('standard-privacy-view')}
                      onConfigureGhostMode={action('standard-ghost-config')}
                      onViewDataExport={action('standard-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Standard privacy configuration for regular campus engagement with balanced visibility control
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Active Ghost Mode:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-002', name: 'Marcus Rodriguez' }}
                      ghostModeConfig={mockGhostModeActive}
                      privacySettings={mockPrivacySettingsAdvanced}
                      visibilityLevel="ghost"
                      lastPrivacyUpdate="2024-01-15T11:00:00Z"
                      privacyScore={95}
                      activeSessions={1}
                      onToggleGhostMode={action('ghost-active-toggle')}
                      onUpdatePrivacySetting={action('ghost-active-privacy-update')}
                      onViewPrivacySettings={action('ghost-active-privacy-view')}
                      onConfigureGhostMode={action('ghost-active-config')}
                      onViewDataExport={action('ghost-active-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Full ghost mode activation with scheduled duration and comprehensive invisibility settings
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Privacy Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🔒 PRIVACY CATEGORIES</Badge>
            Comprehensive Privacy Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 privacy categories for complete University at Buffalo campus privacy management and student data protection
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Privacy Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Privacy Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Visibility Control</Text>
                        <Text variant="body-xs" color="secondary">Profile visibility, social presence, campus activity display</Text>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Data Protection</Text>
                        <Text variant="body-xs" color="secondary">Personal data encryption, academic record privacy, FERPA compliance</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Interaction Controls</Text>
                        <Text variant="body-xs" color="secondary">Message permissions, collaboration access, social engagement</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Advanced Privacy Features:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Location Privacy</Text>
                        <Text variant="body-xs" color="secondary">Campus location sharing, residence hall privacy, study space discretion</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Activity Tracking</Text>
                        <Text variant="body-xs" color="secondary">Usage analytics, engagement patterns, study habit protection</Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visibility Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">👁️ VISIBILITY LEVELS</Badge>
            Campus Visibility Management
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visibility levels for granular University at Buffalo campus presence control and social interaction management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visibility Level Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Public Profile:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-public', name: 'Emma Martinez' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={mockPrivacySettingsBasic}
                      visibilityLevel="public"
                      lastPrivacyUpdate="2024-01-15T10:00:00Z"
                      privacyScore={60}
                      activeSessions={2}
                      onToggleGhostMode={action('public-ghost-toggle')}
                      onUpdatePrivacySetting={action('public-privacy-update')}
                      onViewPrivacySettings={action('public-privacy-view')}
                      onConfigureGhostMode={action('public-ghost-config')}
                      onViewDataExport={action('public-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Open campus engagement with full visibility to UB student community
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Friends Only:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-friends', name: 'David Park' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={mockPrivacySettingsBasic}
                      visibilityLevel="friends"
                      lastPrivacyUpdate="2024-01-15T09:45:00Z"
                      privacyScore={75}
                      activeSessions={1}
                      onToggleGhostMode={action('friends-ghost-toggle')}
                      onUpdatePrivacySetting={action('friends-privacy-update')}
                      onViewPrivacySettings={action('friends-privacy-view')}
                      onConfigureGhostMode={action('friends-ghost-config')}
                      onViewDataExport={action('friends-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Selective visibility limited to connected friends and study partners
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Private Mode:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-private', name: 'Lisa Thompson' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={mockPrivacySettingsAdvanced}
                      visibilityLevel="private"
                      lastPrivacyUpdate="2024-01-15T09:15:00Z"
                      privacyScore={90}
                      activeSessions={1}
                      onToggleGhostMode={action('private-ghost-toggle')}
                      onUpdatePrivacySetting={action('private-privacy-update')}
                      onViewPrivacySettings={action('private-privacy-view')}
                      onConfigureGhostMode={action('private-ghost-config')}
                      onViewDataExport={action('private-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      High privacy with limited visibility and controlled campus presence
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Ghost Mode Active:</Text>
                    <ProfileGhostModeWidget
                      user={{ id: 'user-ghost', name: 'Jordan Lee' }}
                      ghostModeConfig={mockGhostModeStudyFocus}
                      privacySettings={mockPrivacySettingsAdvanced}
                      visibilityLevel="ghost"
                      lastPrivacyUpdate="2024-01-15T08:30:00Z"
                      privacyScore={98}
                      activeSessions={1}
                      onToggleGhostMode={action('ghost-mode-toggle')}
                      onUpdatePrivacySetting={action('ghost-mode-privacy-update')}
                      onViewPrivacySettings={action('ghost-mode-privacy-view')}
                      onConfigureGhostMode={action('ghost-mode-config')}
                      onViewDataExport={action('ghost-mode-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Complete invisibility with selective academic interaction permissions
                    </Text>
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
            Real Campus Privacy Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile ghost mode widget usage in actual University at Buffalo student privacy management and campus safety contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Finals Week Ghost Mode */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Finals Week Study Focus - Ghost Mode Usage:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE Senior Using Ghost Mode for Final Project Concentration
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Isolation Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget
                        user={{ id: 'user-finals-001', name: 'Alex Chen' }}
                        ghostModeConfig={{
                          isActive: true,
                          duration: 'scheduled',
                          scheduledEnd: '2024-01-20T23:59:59Z',
                          hiddenActivities: ['social', 'casual', 'entertainment'],
                          visibilityLevel: 'selective',
                          allowedInteractions: ['academic', 'study-groups', 'emergency', 'professors']
                        }}
                        privacySettings={[
                          {
                            id: 'finals-001',
                            name: 'Hide social activity during finals',
                            description: 'Focus mode for academic priorities',
                            category: 'activity',
                            isEnabled: true,
                            level: 'hidden',
                            lastModified: '2024-01-15T12:00:00Z'
                          },
                          {
                            id: 'finals-002',
                            name: 'Academic collaboration only',
                            description: 'Limit interactions to study-related content',
                            category: 'interaction',
                            isEnabled: true,
                            level: 'private',
                            lastModified: '2024-01-15T12:00:00Z'
                          },
                          {
                            id: 'finals-003',
                            name: 'Study location privacy',
                            description: 'Hide library and study space location',
                            category: 'location',
                            isEnabled: true,
                            level: 'hidden',
                            lastModified: '2024-01-15T12:00:00Z'
                          }
                        ]}
                        visibilityLevel="ghost"
                        lastPrivacyUpdate="2024-01-15T12:00:00Z"
                        privacyScore={96}
                        activeSessions={1}
                        onToggleGhostMode={action('finals-ghost-toggle')}
                        onUpdatePrivacySetting={action('finals-privacy-update')}
                        onViewPrivacySettings={action('finals-privacy-view')}
                        onConfigureGhostMode={action('finals-ghost-config')}
                        onViewDataExport={action('finals-data-export')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student using ghost mode for capstone project focus with academic-only interaction permissions
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Scheduled Privacy Break:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget
                        user={{ id: 'user-finals-002', name: 'Maya Patel' }}
                        ghostModeConfig={{
                          isActive: true,
                          duration: 'temporary',
                          hiddenActivities: ['posts', 'comments', 'likes'],
                          visibilityLevel: 'minimal',
                          allowedInteractions: ['close-friends', 'emergency']
                        }}
                        privacySettings={mockPrivacySettingsAdvanced}
                        visibilityLevel="ghost"
                        lastPrivacyUpdate="2024-01-15T11:30:00Z"
                        privacyScore={94}
                        activeSessions={1}
                        onToggleGhostMode={action('break-ghost-toggle')}
                        onUpdatePrivacySetting={action('break-privacy-update')}
                        onViewPrivacySettings={action('break-privacy-view')}
                        onConfigureGhostMode={action('break-ghost-config')}
                        onViewDataExport={action('break-data-export')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Temporary ghost mode for mental health break with close friend access maintained
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Residence Hall Privacy */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Residence Hall Privacy Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ellicott Complex Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget
                      user={{ id: 'user-ellicott-001', name: 'Jordan Kim' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={[
                        {
                          id: 'ellicott-001',
                          name: 'Floor community visibility',
                          description: 'Share activity with floor residents',
                          category: 'visibility',
                          isEnabled: true,
                          level: 'friends',
                          lastModified: '2024-01-15T10:30:00Z'
                        },
                        {
                          id: 'ellicott-002',
                          name: 'Room location privacy',
                          description: 'Hide specific room number from non-residents',
                          category: 'location',
                          isEnabled: true,
                          level: 'private',
                          lastModified: '2024-01-15T10:30:00Z'
                        }
                      ]}
                      visibilityLevel="friends"
                      lastPrivacyUpdate="2024-01-15T10:30:00Z"
                      privacyScore={78}
                      activeSessions={1}
                      onToggleGhostMode={action('ellicott-ghost-toggle')}
                      onUpdatePrivacySetting={action('ellicott-privacy-update')}
                      onViewPrivacySettings={action('ellicott-privacy-view')}
                      onConfigureGhostMode={action('ellicott-ghost-config')}
                      onViewDataExport={action('ellicott-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Freshman balancing floor community engagement with personal privacy boundaries
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Off-Campus Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget
                      user={{ id: 'user-offcampus-001', name: 'Sam Wilson' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={[
                        {
                          id: 'offcampus-001',
                          name: 'Home address protection',
                          description: 'Hide off-campus residence location',
                          category: 'location',
                          isEnabled: true,
                          level: 'hidden',
                          lastModified: '2024-01-15T09:45:00Z'
                        },
                        {
                          id: 'offcampus-002',
                          name: 'Campus commute privacy',
                          description: 'Hide transportation and schedule patterns',
                          category: 'activity',
                          isEnabled: true,
                          level: 'private',
                          lastModified: '2024-01-15T09:45:00Z'
                        }
                      ]}
                      visibilityLevel="private"
                      lastPrivacyUpdate="2024-01-15T09:45:00Z"
                      privacyScore={88}
                      activeSessions={1}
                      onToggleGhostMode={action('offcampus-ghost-toggle')}
                      onUpdatePrivacySetting={action('offcampus-privacy-update')}
                      onViewPrivacySettings={action('offcampus-privacy-view')}
                      onConfigureGhostMode={action('offcampus-ghost-config')}
                      onViewDataExport={action('offcampus-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Senior living off-campus with enhanced location privacy and commute discretion
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">International Student Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget
                      user={{ id: 'user-intl-001', name: 'Priya Sharma' }}
                      ghostModeConfig={mockGhostModeInactive}
                      privacySettings={[
                        {
                          id: 'intl-001',
                          name: 'Cultural background sharing',
                          description: 'Control visibility of cultural information',
                          category: 'visibility',
                          isEnabled: true,
                          level: 'friends',
                          lastModified: '2024-01-15T11:15:00Z'
                        },
                        {
                          id: 'intl-002',
                          name: 'Immigration status protection',
                          description: 'Enhanced privacy for sensitive personal data',
                          category: 'data',
                          isEnabled: true,
                          level: 'hidden',
                          lastModified: '2024-01-15T11:15:00Z'
                        }
                      ]}
                      visibilityLevel="friends"
                      lastPrivacyUpdate="2024-01-15T11:15:00Z"
                      privacyScore={92}
                      activeSessions={1}
                      onToggleGhostMode={action('intl-ghost-toggle')}
                      onUpdatePrivacySetting={action('intl-privacy-update')}
                      onViewPrivacySettings={action('intl-privacy-view')}
                      onConfigureGhostMode={action('intl-ghost-config')}
                      onViewDataExport={action('intl-data-export')}
                    />
                    <Text variant="body-xs" color="secondary">
                      International graduate student with enhanced data protection and cultural privacy controls
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Low Privacy Warning */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Privacy Education - Low Score Warning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  New user education with privacy score improvement guidance:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Low Privacy Score:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget
                        user={{ id: 'user-lowpriv-001', name: 'Casey Johnson' }}
                        ghostModeConfig={mockGhostModeInactive}
                        privacySettings={[
                          {
                            id: 'lowpriv-001',
                            name: 'Public profile visibility',
                            description: 'Profile visible to all UB students',
                            category: 'visibility',
                            isEnabled: true,
                            level: 'public',
                            lastModified: '2024-01-15T08:00:00Z'
                          },
                          {
                            id: 'lowpriv-002',
                            name: 'Location sharing enabled',
                            description: 'Real-time location visible to all',
                            category: 'location',
                            isEnabled: true,
                            level: 'public',
                            lastModified: '2024-01-15T08:00:00Z'
                          }
                        ]}
                        visibilityLevel="public"
                        lastPrivacyUpdate="2024-01-15T08:00:00Z"
                        privacyScore={35}
                        activeSessions={3}
                        onToggleGhostMode={action('lowpriv-ghost-toggle')}
                        onUpdatePrivacySetting={action('lowpriv-privacy-update')}
                        onViewPrivacySettings={action('lowpriv-privacy-view')}
                        onConfigureGhostMode={action('lowpriv-ghost-config')}
                        onViewDataExport={action('lowpriv-data-export')}
                      />
                      <Text variant="body-xs" color="secondary">
                        New user with minimal privacy protection needing education and setting improvements
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Multiple Active Sessions Warning:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget
                        user={{ id: 'user-sessions-001', name: 'Riley Martinez' }}
                        ghostModeConfig={mockGhostModeInactive}
                        privacySettings={mockPrivacySettingsBasic}
                        visibilityLevel="friends"
                        lastPrivacyUpdate="2024-01-15T07:30:00Z"
                        privacyScore={72}
                        activeSessions={5}
                        onToggleGhostMode={action('sessions-ghost-toggle')}
                        onUpdatePrivacySetting={action('sessions-privacy-update')}
                        onViewPrivacySettings={action('sessions-privacy-view')}
                        onConfigureGhostMode={action('sessions-ghost-config')}
                        onViewDataExport={action('sessions-data-export')}
                      />
                      <Text variant="body-xs" color="secondary">
                        User with multiple active sessions requiring security review and session management
                      </Text>
                    </div>
                  </div>

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
    user: {
      id: 'user-playground',
      name: 'Alex Chen'
    },
    ghostModeConfig: mockGhostModeInactive,
    privacySettings: mockPrivacySettingsBasic,
    visibilityLevel: 'private',
    lastPrivacyUpdate: '2024-01-15T09:30:00Z',
    privacyScore: 85,
    activeSessions: 1,
    isEditable: true,
    onToggleGhostMode: action('playground-ghost-toggle'),
    onUpdatePrivacySetting: action('playground-privacy-update'),
    onViewPrivacySettings: action('playground-privacy-view'),
    onConfigureGhostMode: action('playground-ghost-config'),
    onViewDataExport: action('playground-data-export'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Ghost Mode Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different ghost mode and privacy configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileGhostModeWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive ghost mode widget testing for University at Buffalo HIVE platform privacy management design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};