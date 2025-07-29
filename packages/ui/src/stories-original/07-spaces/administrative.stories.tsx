import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Input } from '../../atomic/atoms/input';
import { Avatar } from '../../atomic/atoms/avatar';
import { 
  Settings, 
  Shield, 
  Lock, 
  Globe, 
  Users, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Plus,
  Minus,
  Check,
  AlertTriangle,
  Info,
  Upload,
  Download,
  FileText,
  Image,
  Video,
  Link,
  Calendar,
  MapPin,
  Hash,
  AtSign,
  Crown,
  Star,
  UserPlus,
  UserMinus,
  Ban,
  Flag,
  Archive,
  RotateCcw,
  Copy,
  ExternalLink,
  Bell,
  Mail,
  MessageSquare,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Award,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  RefreshCw,
  Download as DownloadIcon
} from 'lucide-react';

const meta: Meta = {
  title: '07-Spaces/Administrative',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive administrative components for HIVE Spaces - Settings, privacy controls, content management, and moderation tools with kitchen sink variants',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data for comprehensive testing
const mockSpaceSettings = {
  id: 'space123',
  name: 'Computer Science Study Group',
  handle: 'cs-study-group',
  description: 'A collaborative space for computer science students to share resources, discuss concepts, and work on projects together.',
  category: 'student_organizations',
  subcategory: 'academic',
  visibility: 'public' as 'public' | 'private' | 'invite_only',
  joinApproval: 'automatic' as 'automatic' | 'manual' | 'invite_only',
  contentModeration: 'moderate' as 'none' | 'light' | 'moderate' | 'strict',
  allowedContentTypes: ['text', 'image', 'video', 'link', 'event'],
  maxMembers: 500,
  tags: ['computer-science', 'study-group', 'collaboration', 'academic'],
  rules: [
    'Be respectful and constructive in all interactions',
    'Stay on topic - focus on computer science and academic discussions',
    'No spam or self-promotion without permission',
    'Help others and share knowledge freely',
    'Follow university guidelines and academic integrity policies'
  ],
  integrations: {
    calendar: true,
    github: false,
    discord: true,
    slack: false
  },
  notifications: {
    newPosts: true,
    newMembers: true,
    mentions: true,
    events: true,
    moderationAlerts: true
  },
  customization: {
    banner: '/space-banner.jpg',
    icon: '/space-icon.jpg',
    accentColor: 'var(--hive-brand-secondary)',
    theme: 'dark'
  }
};

const mockModerationQueue = [
  {
    id: 'mod1',
    type: 'post',
    content: 'Check out this amazing AI project I built for my machine learning class!',
    author: {
      name: 'Alex Chen',
      handle: '@alexc',
      avatar: '/placeholder-avatar.jpg'
    },
    reportedBy: {
      name: 'Sarah Johnson',
      handle: '@sarahj'
    },
    reportReason: 'spam',
    reportDetails: 'This looks like self-promotion and doesn\'t follow community guidelines',
    createdAt: '2023-10-20T14:30:00Z',
    reportedAt: '2023-10-20T15:45:00Z',
    status: 'pending',
    severity: 'medium',
    autoModFlags: ['external_link', 'promotional_content']
  },
  {
    id: 'mod2',
    type: 'comment',
    content: 'This is completely wrong and you obviously don\'t understand basic algorithms.',
    author: {
      name: 'Mike Rodriguez',
      handle: '@miker',
      avatar: '/placeholder-avatar-2.jpg'
    },
    reportedBy: {
      name: 'Elena Vasquez',
      handle: '@elenav'
    },
    reportReason: 'harassment',
    reportDetails: 'Hostile and unconstructive criticism that violates community guidelines',
    createdAt: '2023-10-20T12:15:00Z',
    reportedAt: '2023-10-20T12:30:00Z',
    status: 'under_review',
    severity: 'high',
    autoModFlags: ['hostile_language', 'personal_attack']
  }
];

const mockContentManagement = {
  totalPosts: 1247,
  totalComments: 3892,
  totalReports: 23,
  activeReports: 5,
  resolvedToday: 12,
  autoModActions: 8,
  pinnedPosts: [
    {
      id: 'pin1',
      title: 'Welcome to CS Study Group - Read This First!',
      author: 'Sarah Chen',
      createdAt: '2023-09-01T10:00:00Z',
      pinnedAt: '2023-09-01T10:00:00Z',
      pinnedBy: 'Sarah Chen'
    }
  ],
  featuredContent: [
    {
      id: 'feat1',
      title: 'Data Structures Cheat Sheet - Comprehensive Guide',
      author: 'Marcus Rodriguez',
      type: 'post',
      engagement: 145,
      featuredAt: '2023-10-15T14:00:00Z'
    }
  ]
};

// ============================================================================
// SPACE SETTINGS COMPONENT
// ============================================================================

interface SpaceSettingsProps {
  settings: typeof mockSpaceSettings;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
  onSave?: (settings: any) => void;
  variant?: 'full' | 'basic' | 'modal';
}

const SpaceSettings: React.FC<SpaceSettingsProps> = ({
  settings: initialSettings,
  currentUserRole = 'admin',
  onSave,
  variant = 'full'
}) => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  const canEdit = ['owner', 'admin'].includes(currentUserRole);
  const canEditAdvanced = currentUserRole === 'owner';

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings };
    const keys = key.split('.');
    let current = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave?.(settings);
    setHasChanges(false);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'privacy', label: 'Privacy & Access', icon: Lock },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'customization', label: 'Appearance', icon: Edit3 },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'advanced', label: 'Advanced', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="heading-xl" className="text-[var(--hive-text-primary)] mb-2">
            Space Settings
          </Text>
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            Configure your space's behavior, appearance, and access controls
          </Text>
        </div>
        
        {hasChanges && canEdit && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setSettings(initialSettings);
                setHasChanges(false);
              }}
              className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isAdvanced = tab.id === 'advanced';
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    disabled={isAdvanced && !canEditAdvanced}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${isActive 
                        ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30' 
                        : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]'
                      }
                      ${isAdvanced && !canEditAdvanced ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{tab.label}</span>
                    {isAdvanced && !canEditAdvanced && (
                      <Lock className="h-3 w-3 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    General Settings
                  </Text>
                  
                  <div className="space-y-4">
                    <div>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">Space Name</Text>
                      <Input
                        value={settings.name}
                        onChange={(e) => updateSetting('name', e.target.value)}
                        disabled={!canEdit}
                        className="bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
                      />
                    </div>
                    
                    <div>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">Handle</Text>
                      <div className="flex items-center">
                        <span className="text-[var(--hive-text-tertiary)] mr-2">/spaces/</span>
                        <Input
                          value={settings.handle}
                          onChange={(e) => updateSetting('handle', e.target.value)}
                          disabled={!canEditAdvanced}
                          className="bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">Description</Text>
                      <textarea
                        value={settings.description}
                        onChange={(e) => updateSetting('description', e.target.value)}
                        disabled={!canEdit}
                        rows={4}
                        className="w-full p-3 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none"
                      />
                    </div>
                    
                    <div>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">Category</Text>
                      <select
                        value={settings.category}
                        onChange={(e) => updateSetting('category', e.target.value)}
                        disabled={!canEdit}
                        className="w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)]"
                      >
                        <option value="student_organizations">Student Organizations</option>
                        <option value="university_organizations">University Organizations</option>
                        <option value="greek_life">Greek Life</option>
                        <option value="campus_living">Campus Living</option>
                      </select>
                    </div>
                    
                    <div>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">Tags</Text>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {settings.tags.map((tag, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]"
                          >
                            {tag}
                            {canEdit && (
                              <button 
                                onClick={() => {
                                  const newTags = settings.tags.filter((_, i) => i !== index);
                                  updateSetting('tags', newTags);
                                }}
                                className="ml-2 hover:text-red-400"
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {canEdit && (
                        <Input
                          placeholder="Add tag and press Enter"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              const newTag = e.currentTarget.value.trim();
                              if (!settings.tags.includes(newTag)) {
                                updateSetting('tags', [...settings.tags, newTag]);
                              }
                              e.currentTarget.value = '';
                            }
                          }}
                          className="bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Access Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    Privacy & Access Controls
                  </Text>
                  
                  <div className="space-y-6">
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Space Visibility</Text>
                      <div className="space-y-3">
                        {[
                          {
                            value: 'public',
                            label: 'Public',
                            description: 'Anyone can find and view this space',
                            icon: Globe
                          },
                          {
                            value: 'private',
                            label: 'Private',
                            description: 'Only members can see this space',
                            icon: Lock
                          },
                          {
                            value: 'invite_only',
                            label: 'Invite Only',
                            description: 'Only invited users can find and join',
                            icon: UserPlus
                          }
                        ].map((option) => {
                          const Icon = option.icon;
                          return (
                            <label
                              key={option.value}
                              className={`
                                flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors
                                ${settings.visibility === option.value
                                  ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                  : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'
                                }
                                ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                            >
                              <input
                                type="radio"
                                name="visibility"
                                value={option.value}
                                checked={settings.visibility === option.value}
                                onChange={(e) => updateSetting('visibility', e.target.value)}
                                disabled={!canEdit}
                                className="sr-only"
                              />
                              <Icon className={`h-5 w-5 ${settings.visibility === option.value ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}`} />
                              <div className="flex-1">
                                <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                                  {option.label}
                                </Text>
                                <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                                  {option.description}
                                </Text>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Join Approval</Text>
                      <div className="space-y-3">
                        {[
                          {
                            value: 'automatic',
                            label: 'Automatic',
                            description: 'Users can join immediately'
                          },
                          {
                            value: 'manual',
                            label: 'Manual Approval',
                            description: 'Admins must approve new members'
                          },
                          {
                            value: 'invite_only',
                            label: 'Invite Only',
                            description: 'Only invited users can join'
                          }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`
                              flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                              ${settings.joinApproval === option.value
                                ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'
                              }
                              ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            <input
                              type="radio"
                              name="joinApproval"
                              value={option.value}
                              checked={settings.joinApproval === option.value}
                              onChange={(e) => updateSetting('joinApproval', e.target.value)}
                              disabled={!canEdit}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 ${settings.joinApproval === option.value ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]' : 'border-[var(--hive-text-tertiary)]'}`}>
                              {settings.joinApproval === option.value && (
                                <div className="w-full h-full rounded-full bg-[var(--hive-text-primary)] scale-50"></div>
                              )}
                            </div>
                            <div>
                              <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                                {option.label}
                              </Text>
                              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                                {option.description}
                              </Text>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-2">Member Limit</Text>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={settings.maxMembers}
                          onChange={(e) => updateSetting('maxMembers', parseInt(e.target.value) || 0)}
                          disabled={!canEdit}
                          className="w-32 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
                        />
                        <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                          Maximum number of members (0 = unlimited)
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Settings */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    Content Management
                  </Text>
                  
                  <div className="space-y-6">
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Content Moderation Level</Text>
                      <div className="space-y-3">
                        {[
                          {
                            value: 'none',
                            label: 'None',
                            description: 'No automatic moderation',
                            color: 'text-gray-400'
                          },
                          {
                            value: 'light',
                            label: 'Light',
                            description: 'Basic spam and abuse detection',
                            color: 'text-green-400'
                          },
                          {
                            value: 'moderate',
                            label: 'Moderate',
                            description: 'Standard content filtering and review',
                            color: 'text-yellow-400'
                          },
                          {
                            value: 'strict',
                            label: 'Strict',
                            description: 'Comprehensive moderation and approval',
                            color: 'text-red-400'
                          }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`
                              flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                              ${settings.contentModeration === option.value
                                ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'
                              }
                              ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            <input
                              type="radio"
                              name="contentModeration"
                              value={option.value}
                              checked={settings.contentModeration === option.value}
                              onChange={(e) => updateSetting('contentModeration', e.target.value)}
                              disabled={!canEdit}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full ${option.color} border-2 border-current`}>
                              {settings.contentModeration === option.value && (
                                <div className="w-full h-full rounded-full bg-current scale-50"></div>
                              )}
                            </div>
                            <div>
                              <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                                {option.label}
                              </Text>
                              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                                {option.description}
                              </Text>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Allowed Content Types</Text>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'text', label: 'Text Posts', icon: FileText },
                          { value: 'image', label: 'Images', icon: Image },
                          { value: 'video', label: 'Videos', icon: Video },
                          { value: 'link', label: 'Links', icon: Link },
                          { value: 'event', label: 'Events', icon: Calendar },
                          { value: 'poll', label: 'Polls', icon: BarChart3 }
                        ].map((contentType) => {
                          const Icon = contentType.icon;
                          const isEnabled = settings.allowedContentTypes.includes(contentType.value);
                          
                          return (
                            <label
                              key={contentType.value}
                              className={`
                                flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                                ${isEnabled
                                  ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                  : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'
                                }
                                ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                            >
                              <input
                                type="checkbox"
                                checked={isEnabled}
                                onChange={(e) => {
                                  let newTypes = [...settings.allowedContentTypes];
                                  if (e.target.checked) {
                                    newTypes.push(contentType.value);
                                  } else {
                                    newTypes = newTypes.filter(t => t !== contentType.value);
                                  }
                                  updateSetting('allowedContentTypes', newTypes);
                                }}
                                disabled={!canEdit}
                                className="sr-only"
                              />
                              <Icon className={`h-5 w-5 ${isEnabled ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}`} />
                              <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                                {contentType.label}
                              </Text>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Community Rules</Text>
                      <div className="space-y-3">
                        {settings.rules.map((rule, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                            <span className="text-[var(--hive-brand-secondary)] font-bold text-sm">{index + 1}.</span>
                            <Text variant="body-sm" className="text-[var(--hive-text-primary)] flex-1">
                              {rule}
                            </Text>
                            {canEdit && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => {
                                  const newRules = settings.rules.filter((_, i) => i !== index);
                                  updateSetting('rules', newRules);
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        
                        {canEdit && (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a new rule..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                  const newRule = e.currentTarget.value.trim();
                                  updateSetting('rules', [...settings.rules, newRule]);
                                  e.currentTarget.value = '';
                                }
                              }}
                              className="flex-1 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
                            />
                            <Button 
                              size="sm"
                              className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    Notification Settings
                  </Text>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => {
                      const labels: Record<string, string> = {
                        newPosts: 'New Posts',
                        newMembers: 'New Members',
                        mentions: 'Mentions',
                        events: 'Events',
                        moderationAlerts: 'Moderation Alerts'
                      };
                      
                      return (
                        <div key={key} className="flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                          <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                            {labels[key]}
                          </Text>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateSetting(`notifications.${key}`, e.target.checked)}
                              disabled={!canEdit}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Customization Settings */}
            {activeTab === 'customization' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    Appearance & Branding
                  </Text>
                  
                  <div className="space-y-6">
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Space Banner</Text>
                      <div className="border-2 border-dashed border-[var(--hive-border-hover)] rounded-lg p-8 text-center">
                        {settings.customization.banner ? (
                          <div className="space-y-3">
                            <div className="w-32 h-20 bg-[var(--hive-interactive-active)] rounded mx-auto"></div>
                            <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                              Current banner image
                            </Text>
                            {canEdit && (
                              <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
                                <Upload className="h-4 w-4 mr-2" />
                                Change Banner
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Upload className="h-12 w-12 text-[var(--hive-text-tertiary)] mx-auto" />
                            <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                              Upload a banner image (1200x300px recommended)
                            </Text>
                            {canEdit && (
                              <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
                                Upload Banner
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Space Icon</Text>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[var(--hive-interactive-active)] rounded-lg flex items-center justify-center">
                          {settings.customization.icon ? (
                            <div className="w-full h-full bg-[var(--hive-brand-secondary)] rounded-lg"></div>
                          ) : (
                            <Image className="h-8 w-8 text-[var(--hive-text-tertiary)]" />
                          )}
                        </div>
                        {canEdit && (
                          <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Icon
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Accent Color</Text>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-[var(--hive-border-hover)]"
                          style={{ backgroundColor: settings.customization.accentColor }}
                        ></div>
                        {canEdit && (
                          <Input
                            type="color"
                            value={settings.customization.accentColor}
                            onChange={(e) => updateSetting('customization.accentColor', e.target.value)}
                            className="w-20 h-10 bg-transparent border-[var(--hive-interactive-active)]"
                          />
                        )}
                        <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                          {settings.customization.accentColor}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Settings */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">
                    External Integrations
                  </Text>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.integrations).map(([key, enabled]) => {
                      const integrationData: Record<string, { label: string; description: string; icon: any }> = {
                        calendar: {
                          label: 'Calendar Integration',
                          description: 'Sync events with external calendar services',
                          icon: Calendar
                        },
                        github: {
                          label: 'GitHub Integration',
                          description: 'Connect repositories and track commits',
                          icon: Link
                        },
                        discord: {
                          label: 'Discord Integration',
                          description: 'Bridge with Discord server channels',
                          icon: MessageSquare
                        },
                        slack: {
                          label: 'Slack Integration',
                          description: 'Connect with Slack workspace',
                          icon: Hash
                        }
                      };
                      
                      const integration = integrationData[key];
                      const Icon = integration.icon;
                      
                      return (
                        <div key={key} className="flex items-center justify-between p-4 border border-[var(--hive-interactive-active)] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-[var(--hive-text-tertiary)]" />
                            <div>
                              <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                                {integration.label}
                              </Text>
                              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                                {integration.description}
                              </Text>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {enabled && (
                              <Badge variant="secondary" className="text-green-400 bg-green-500/10">
                                Connected
                              </Badge>
                            )}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={enabled}
                                onChange={(e) => updateSetting(`integrations.${key}`, e.target.checked)}
                                disabled={!canEdit}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]"></div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && canEditAdvanced && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
                      Advanced Settings
                    </Text>
                  </div>
                  <Text variant="body-sm" className="text-[var(--hive-text-tertiary)] mb-6">
                    These settings can significantly impact your space's functionality. Please proceed with caution.
                  </Text>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Danger Zone</Text>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Space
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Space
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3">Data Export</Text>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Export Member Data
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Export Content Data
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Export Analytics Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MODERATION QUEUE COMPONENT
// ============================================================================

interface ModerationQueueProps {
  queue: typeof mockModerationQueue;
  onAction?: (itemId: string, action: 'approve' | 'reject' | 'escalate' | 'ban_user') => void;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
}

const ModerationQueue: React.FC<ModerationQueueProps> = ({
  queue,
  onAction,
  currentUserRole = 'moderator'
}) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);

  const filteredQueue = queue.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const sortedQueue = [...filteredQueue].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
    }
    if (sortBy === 'severity') {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    }
    return 0;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="heading-xl" className="text-[var(--hive-text-primary)] mb-2">
            Moderation Queue
          </Text>
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            Review and moderate reported content
          </Text>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="text-red-400">
            {queue.filter(item => item.status === 'pending').length} pending
          </Badge>
          <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm"
            >
              <option value="all">All Reports</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="severity">By Severity</option>
            </select>
          </div>
          
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            {sortedQueue.length} item{sortedQueue.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </Card>

      {/* Queue Items */}
      <div className="space-y-4">
        {sortedQueue.map((item) => (
          <Card key={item.id} className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <div className="flex gap-4">
              <Avatar
                src={item.author.avatar}
                fallback={item.author.name.charAt(0)}
                size="md"
              />
              
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] font-medium">
                        {item.author.name}
                      </Text>
                      <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                        {item.author.handle}
                      </Text>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      Posted {new Date(item.createdAt).toLocaleString()} • 
                      Reported {new Date(item.reportedAt).toLocaleString()}
                    </Text>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(item.severity)}>
                      {item.severity} severity
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-[var(--hive-interactive-hover)] rounded-lg border-l-4 border-yellow-500">
                  <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                    {item.content}
                  </Text>
                </div>

                {/* Report Details */}
                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Text variant="body-sm" className="text-red-400 font-medium">
                        Reported by {item.reportedBy.name} ({item.reportedBy.handle})
                      </Text>
                      <Text variant="body-xs" className="text-red-300">
                        Reason: {item.reportReason.replace('_', ' ')}
                      </Text>
                    </div>
                    <Flag className="h-4 w-4 text-red-400" />
                  </div>
                  <Text variant="body-xs" className="text-red-300">
                    "{item.reportDetails}"
                  </Text>
                </div>

                {/* Auto-mod Flags */}
                {item.autoModFlags.length > 0 && (
                  <div className="flex gap-2">
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Auto-detected:</Text>
                    {item.autoModFlags.map((flag) => (
                      <Badge key={flag} variant="outline" className="text-xs text-orange-400 border-orange-500/30">
                        {flag.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {canModerate && item.status !== 'resolved' && (
                  <div className="flex items-center gap-3 pt-4 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                    <Button 
                      size="sm"
                      onClick={() => onAction?.(item.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700 text-[var(--hive-text-primary)]"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => onAction?.(item.id, 'reject')}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Content
                    </Button>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => onAction?.(item.id, 'ban_user')}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Ban User
                    </Button>
                    
                    {currentUserRole !== 'owner' && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => onAction?.(item.id, 'escalate')}
                        className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                    )}
                    
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] ml-auto"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedQueue.length === 0 && (
        <Card className="p-12 text-center bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Shield className="h-16 w-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-2">
            No items in moderation queue
          </Text>
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            All reported content has been reviewed
          </Text>
        </Card>
      )}
    </div>
  );
};

// ============================================================================
// CONTENT MANAGEMENT COMPONENT
// ============================================================================

interface ContentManagementProps {
  data: typeof mockContentManagement;
  onPin?: (postId: string) => void;
  onUnpin?: (postId: string) => void;
  onFeature?: (postId: string) => void;
  onUnfeature?: (postId: string) => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  data,
  onPin,
  onUnpin,
  onFeature,
  onUnfeature
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Text variant="heading-xl" className="text-[var(--hive-text-primary)] mb-2">
          Content Management
        </Text>
        <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
          Manage pinned posts, featured content, and content organization
        </Text>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="body-xs" className="text-blue-400 uppercase tracking-wide">
                Total Posts
              </Text>
              <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
                {data.totalPosts.toLocaleString()}
              </Text>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="body-xs" className="text-green-400 uppercase tracking-wide">
                Comments
              </Text>
              <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
                {data.totalComments.toLocaleString()}
              </Text>
            </div>
            <MessageSquare className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="body-xs" className="text-yellow-400 uppercase tracking-wide">
                Active Reports
              </Text>
              <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
                {data.activeReports}
              </Text>
            </div>
            <Flag className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="body-xs" className="text-purple-400 uppercase tracking-wide">
                Resolved Today
              </Text>
              <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
                {data.resolvedToday}
              </Text>
            </div>
            <Check className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--hive-interactive-active)]">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'pinned', label: 'Pinned Posts' },
          { id: 'featured', label: 'Featured Content' },
          { id: 'bulk', label: 'Bulk Actions' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]'
                : 'border-transparent text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-4">
              Recent Activity
            </Text>
            <div className="space-y-3">
              {[
                { action: 'Post pinned', user: 'Sarah Chen', time: '5 minutes ago' },
                { action: 'Content featured', user: 'Marcus Rodriguez', time: '1 hour ago' },
                { action: 'Report resolved', user: 'Elena Vasquez', time: '2 hours ago' },
                { action: 'User warned', user: 'System', time: '4 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                  <div>
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                      {activity.action}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      by {activity.user}
                    </Text>
                  </div>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                    {activity.time}
                  </Text>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-4">
              Auto-Moderation Summary
            </Text>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                  Actions taken today
                </Text>
                <Text variant="body-sm" className="text-[var(--hive-brand-secondary)] font-bold">
                  {data.autoModActions}
                </Text>
              </div>
              
              <div className="space-y-2">
                {[
                  { type: 'Spam filtered', count: 3 },
                  { type: 'Links flagged', count: 2 },
                  { type: 'Images reviewed', count: 2 },
                  { type: 'Text analyzed', count: 1 }
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--hive-text-tertiary)]">{item.type}</span>
                    <span className="text-[var(--hive-text-primary)]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'pinned' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <div className="flex items-center justify-between mb-6">
            <Text variant="heading-md" className="text-[var(--hive-text-primary)]">
              Pinned Posts
            </Text>
            <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
              <Plus className="h-4 w-4 mr-2" />
              Pin Post
            </Button>
          </div>

          <div className="space-y-4">
            {data.pinnedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg border border-[var(--hive-brand-secondary)]/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full"></div>
                  <div>
                    <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                      {post.title}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      by {post.author} • Pinned {new Date(post.pinnedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onUnpin?.(post.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'featured' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <div className="flex items-center justify-between mb-6">
            <Text variant="heading-md" className="text-[var(--hive-text-primary)]">
              Featured Content
            </Text>
            <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
              <Star className="h-4 w-4 mr-2" />
              Feature Content
            </Button>
          </div>

          <div className="space-y-4">
            {data.featuredContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-purple-400" />
                  <div>
                    <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                      {content.title}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      by {content.author} • {content.engagement} interactions • Featured {new Date(content.featuredAt).toLocaleDateString()}
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                    {content.type}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onUnfeature?.(content.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'bulk' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Bulk Content Actions
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                Content Operations
              </Text>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Old Posts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]"
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export Content
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Rebuild Search Index
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                Cleanup Tools
              </Text>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-yellow-500/50 text-yellow-400"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Remove Duplicate Posts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-red-500/50 text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Flagged Content
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-red-500/50 text-red-400"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Bulk User Actions
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const SpaceSettingsDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <SpaceSettings 
        settings={mockSpaceSettings}
        currentUserRole="admin"
        onSave={(settings) => console.log('Save settings:', settings)}
      />
    </div>
  ),
};

export const SpaceSettingsOwner: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <SpaceSettings 
        settings={mockSpaceSettings}
        currentUserRole="owner"
        onSave={(settings) => console.log('Save settings:', settings)}
      />
    </div>
  ),
};

export const ModerationQueueDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <ModerationQueue 
        queue={mockModerationQueue}
        currentUserRole="admin"
        onAction={(id, action) => console.log('Moderation action:', id, action)}
      />
    </div>
  ),
};

export const ContentManagementDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <ContentManagement 
        data={mockContentManagement}
        onPin={(id) => console.log('Pin:', id)}
        onUnpin={(id) => console.log('Unpin:', id)}
        onFeature={(id) => console.log('Feature:', id)}
        onUnfeature={(id) => console.log('Unfeature:', id)}
      />
    </div>
  ),
};

export const KitchenSinkAdministrative: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Administrative Tools - Kitchen Sink
      </Text>
      
      {/* Compact Settings Panel */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Space Settings (Basic)</Text>
        <SpaceSettings 
          settings={mockSpaceSettings}
          currentUserRole="moderator"
          variant="basic"
        />
      </div>
      
      {/* Moderation Queue */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Moderation Queue</Text>
        <ModerationQueue 
          queue={mockModerationQueue.slice(0, 1)}
          currentUserRole="moderator"
        />
      </div>
      
      {/* Content Management */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Content Management</Text>
        <ContentManagement data={mockContentManagement} />
      </div>
    </div>
  ),
};

export const EdgeCasesAdministrative: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Administrative Tools - Edge Cases
      </Text>
      
      {/* Empty Moderation Queue */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Empty Moderation Queue</Text>
        <ModerationQueue 
          queue={[]}
          currentUserRole="moderator"
        />
      </div>
      
      {/* Member-Only View */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Member View (Limited Access)</Text>
        <SpaceSettings 
          settings={mockSpaceSettings}
          currentUserRole="member"
        />
      </div>
      
      {/* High Priority Reports */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">High Priority Reports Only</Text>
        <ModerationQueue 
          queue={mockModerationQueue.filter(item => item.severity === 'high')}
          currentUserRole="admin"
        />
      </div>
    </div>
  ),
};