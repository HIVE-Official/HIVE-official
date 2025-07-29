import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '07-Spaces/Space Management',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space Management & Administration

Complete workflows for space creation, management, and administration. These stories demonstrate the full builder experience from creating a space to managing an active community.

## Management Areas

1. **Space Creation** - Step-by-step space setup and configuration
2. **Settings Management** - Privacy, permissions, and space details
3. **Member Management** - Invite, remove, and manage member roles
4. **Content Moderation** - Moderate posts, pin content, manage discussions
5. **Analytics Dashboard** - Track space performance and member engagement
6. **Event Management** - Create and manage space events and activities

## Builder Capabilities

- **Space Configuration** - Set up surfaces, privacy, and basic settings
- **Member Operations** - Full member lifecycle management
- **Content Control** - Moderate and curate space content
- **Analytics Access** - Detailed insights and performance metrics
- **Event Creation** - Organize and manage space activities
- **Tool Deployment** - Add and configure space tools

## When to Use

- **New Space Creation** - Setting up a new community space
- **Administrative Tasks** - Day-to-day space management
- **Community Growth** - Strategies for member engagement
- **Content Curation** - Maintaining quality discussions
- **Performance Monitoring** - Tracking space health and activity
        `,
      },
    },
  },
};

export default meta;

// Mock data for space management
const mockSpaceData = {
  id: 'space123',
  name: 'Stanford CS Study Group',
  description: 'Collaborative study space for Computer Science students at Stanford University',
  memberCount: 156,
  type: 'academic' as const,
  status: 'activated' as const,
  privacy: 'public' as const,
  bannerUrl: '/api/placeholder/800/200',
  tags: ['computer-science', 'study-group', 'collaboration'],
  createdAt: new Date('2024-01-15'),
  surfaces: {
    posts: { enabled: true, order: 1 },
    events: { enabled: true, order: 2 },
    members: { enabled: true, order: 3 },
    tools: { enabled: true, order: 4 },
    pinned: { enabled: true, order: 5 },
    chat: { enabled: false, order: 6 },
  },
  settings: {
    autoJoin: true,
    joinRequests: false,
    memberVisibility: 'public',
    postModeration: false,
    allowEvents: true,
    allowTools: true,
  },
};

const mockMembers = [
  {
    id: 'member1',
    name: 'Alex Chen',
    email: 'alex.chen@stanford.edu',
    role: 'builder',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date('2024-01-20'),
    avatar: '/api/placeholder/40/40',
    contributions: 24,
    status: 'active',
  },
  {
    id: 'member2',
    name: 'Sarah Miller',
    email: 'sarah.miller@stanford.edu',
    role: 'builder',
    joinedAt: new Date('2024-01-16'),
    lastActive: new Date('2024-01-19'),
    avatar: '/api/placeholder/40/40',
    contributions: 18,
    status: 'active',
  },
  {
    id: 'member3',
    name: 'Mike Johnson',
    email: 'mike.johnson@stanford.edu',
    role: 'member',
    joinedAt: new Date('2024-01-18'),
    lastActive: new Date('2024-01-20'),
    avatar: '/api/placeholder/40/40',
    contributions: 12,
    status: 'active',
  },
  {
    id: 'member4',
    name: 'Emily Davis',
    email: 'emily.davis@stanford.edu',
    role: 'member',
    joinedAt: new Date('2024-01-19'),
    lastActive: new Date('2024-01-19'),
    avatar: '/api/placeholder/40/40',
    contributions: 8,
    status: 'active',
  },
  {
    id: 'member5',
    name: 'David Wilson',
    email: 'david.wilson@stanford.edu',
    role: 'requested_builder',
    joinedAt: new Date('2024-01-20'),
    lastActive: new Date('2024-01-20'),
    avatar: '/api/placeholder/40/40',
    contributions: 5,
    status: 'active',
  },
];

const mockAnalytics = {
  overview: {
    totalMembers: 156,
    activeMembers: 89,
    weeklyGrowth: 12,
    engagementRate: 0.78,
  },
  posts: {
    totalPosts: 234,
    thisWeek: 18,
    avgPerDay: 2.6,
    topContributors: ['Alex Chen', 'Sarah Miller', 'Mike Johnson'],
  },
  events: {
    totalEvents: 12,
    upcoming: 3,
    avgAttendance: 23,
    completionRate: 0.85,
  },
  tools: {
    deployed: 4,
    totalUses: 156,
    mostUsed: 'Study Schedule Coordinator',
    satisfaction: 4.7,
  },
};

const mockRecentActivity = [
  {
    id: '1',
    type: 'member_join',
    user: 'John Smith',
    timestamp: new Date('2024-01-20T14:30:00'),
    details: 'joined the space',
  },
  {
    id: '2',
    type: 'post_created',
    user: 'Emily Davis',
    timestamp: new Date('2024-01-20T13:45:00'),
    details: 'created a post about Algorithm study sessions',
  },
  {
    id: '3',
    type: 'event_created',
    user: 'Alex Chen',
    timestamp: new Date('2024-01-20T12:15:00'),
    details: 'created event "CS106B Review Session"',
  },
  {
    id: '4',
    type: 'tool_deployed',
    user: 'Sarah Miller',
    timestamp: new Date('2024-01-20T11:30:00'),
    details: 'deployed tool "Grade Calculator"',
  },
];

// Tab Navigation Component
const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}: { 
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => (
  <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${activeTab === tab 
            ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'}
        `}
      >
        {tab}
      </button>
    ))}
  </div>
);

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon 
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
}) => (
  <HiveCard className="p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {icon && <span className="text-lg">{icon}</span>}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    {subtitle && (
      <div className="flex items-center gap-1 text-sm">
        {trend && (
          <span className={`
            ${trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'}
          `}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </span>
        )}
        <span className="text-gray-600">{subtitle}</span>
      </div>
    )}
  </HiveCard>
);

export const SpaceCreationWizard: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [spaceData, setSpaceData] = useState({
      name: '',
      description: '',
      type: '',
      privacy: 'public',
      tags: [],
      surfaces: {
        posts: true,
        events: true,
        members: true,
        tools: true,
        pinned: true,
        chat: false,
      },
      settings: {
        autoJoin: true,
        joinRequests: false,
        memberVisibility: 'public',
        postModeration: false,
      },
    });

    const steps = [
      'Basic Information',
      'Space Type & Privacy',
      'Surface Configuration',
      'Initial Settings',
      'Review & Create'
    ];

    const spaceTypes = [
      { id: 'academic', name: 'Academic', description: 'Study groups, course discussions, research' },
      { id: 'residential', name: 'Residential', description: 'Dorm communities, residential programs' },
      { id: 'social', name: 'Social', description: 'Clubs, interest groups, social activities' },
      { id: 'professional', name: 'Professional', description: 'Career development, networking' },
      { id: 'creative', name: 'Creative', description: 'Art, music, writing, creative projects' },
    ];

    const surfaceOptions = [
      { id: 'posts', name: 'Posts & Discussions', description: 'Main feed for conversations', required: true },
      { id: 'events', name: 'Events & Calendar', description: 'Space events and activities', required: false },
      { id: 'members', name: 'Members Directory', description: 'Member profiles and directory', required: true },
      { id: 'tools', name: 'Tools & Resources', description: 'Collaborative tools and resources', required: false },
      { id: 'pinned', name: 'Pinned Content', description: 'Important announcements and resources', required: false },
      { id: 'chat', name: 'Real-time Chat', description: 'Live messaging (coming soon)', required: false, disabled: true },
    ];

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleTagAdd = (tag: string) => {
      if (tag && !spaceData.tags.includes(tag)) {
        setSpaceData({
          ...spaceData,
          tags: [...spaceData.tags, tag]
        });
      }
    };

    const handleTagRemove = (tagToRemove: string) => {
      setSpaceData({
        ...spaceData,
        tags: spaceData.tags.filter(tag => tag !== tagToRemove)
      });
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Space
            </h1>
            <p className="text-gray-600">
              Set up a new community space for your members
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep + 1) / steps.length * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep + 1) / steps.length * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {steps.map((step, index) => (
                <span key={step} className={index <= currentStep ? 'text-[var(--hive-brand-secondary)]' : ''}>
                  {step}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="basic-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Basic Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Space Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={spaceData.name}
                      onChange={(e) => setSpaceData({...spaceData, name: e.target.value})}
                      placeholder="Enter a descriptive name for your space"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Choose a clear, searchable name that describes your community
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={spaceData.description}
                      onChange={(e) => setSpaceData({...spaceData, description: e.target.value})}
                      placeholder="Describe what this space is for and who should join"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Help potential members understand the purpose and value of this space
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {spaceData.tags.map((tag) => (
                        <HiveBadge 
                          key={tag} 
                          variant="default" 
                          className="cursor-pointer"
                          onClick={() => handleTagRemove(tag)}
                        >
                          {tag} ×
                        </HiveBadge>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tags (press Enter to add)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTagAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Tags help members discover your space through search
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="type-privacy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Space Type & Privacy</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Space Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {spaceTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => setSpaceData({...spaceData, type: type.id})}
                          className={`
                            p-4 border rounded-lg cursor-pointer transition-colors
                            ${spaceData.type === type.id 
                              ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10' 
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <h3 className="font-semibold mb-1">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Privacy Settings
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="privacy"
                          value="public"
                          checked={spaceData.privacy === 'public'}
                          onChange={(e) => setSpaceData({...spaceData, privacy: e.target.value})}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                        <div>
                          <div className="font-medium">Public Space</div>
                          <div className="text-sm text-gray-600">
                            Anyone can find and join this space
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="privacy"
                          value="private"
                          checked={spaceData.privacy === 'private'}
                          onChange={(e) => setSpaceData({...spaceData, privacy: e.target.value})}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                        <div>
                          <div className="font-medium">Private Space</div>
                          <div className="text-sm text-gray-600">
                            Only invited members can join
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="privacy"
                          value="invite-only"
                          checked={spaceData.privacy === 'invite-only'}
                          onChange={(e) => setSpaceData({...spaceData, privacy: e.target.value})}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                        <div>
                          <div className="font-medium">Invite-Only Space</div>
                          <div className="text-sm text-gray-600">
                            Members can request to join, but need approval
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="surfaces"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Surface Configuration</h2>
                <p className="text-gray-600 mb-6">
                  Choose which surfaces to enable for your space. You can change these later.
                </p>
                
                <div className="space-y-4">
                  {surfaceOptions.map((surface) => (
                    <div
                      key={surface.id}
                      className={`
                        p-4 border rounded-lg 
                        ${surface.disabled 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'border-gray-200 hover:border-gray-300'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={spaceData.surfaces[surface.id]}
                            onChange={(e) => setSpaceData({
                              ...spaceData,
                              surfaces: {
                                ...spaceData.surfaces,
                                [surface.id]: e.target.checked
                              }
                            })}
                            disabled={surface.required || surface.disabled}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {surface.name}
                              {surface.required && (
                                <HiveBadge variant="outline" size="sm">Required</HiveBadge>
                              )}
                              {surface.disabled && (
                                <HiveBadge variant="outline" size="sm">Coming Soon</HiveBadge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {surface.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Surface Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Start with essential surfaces and add more as your community grows</li>
                    <li>• Posts & Members are required for all spaces</li>
                    <li>• Events surface is great for active communities</li>
                    <li>• Tools surface enables collaborative workflows</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Initial Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Membership Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Auto-join eligible members</div>
                          <div className="text-sm text-gray-600">
                            Automatically add members who meet your criteria
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={spaceData.settings.autoJoin}
                          onChange={(e) => setSpaceData({
                            ...spaceData,
                            settings: {...spaceData.settings, autoJoin: e.target.checked}
                          })}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                      </label>
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Allow join requests</div>
                          <div className="text-sm text-gray-600">
                            Members can request to join your space
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={spaceData.settings.joinRequests}
                          onChange={(e) => setSpaceData({
                            ...spaceData,
                            settings: {...spaceData.settings, joinRequests: e.target.checked}
                          })}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Content Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Post moderation</div>
                          <div className="text-sm text-gray-600">
                            Require approval for new posts
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={spaceData.settings.postModeration}
                          onChange={(e) => setSpaceData({
                            ...spaceData,
                            settings: {...spaceData.settings, postModeration: e.target.checked}
                          })}
                          className="text-[var(--hive-brand-secondary)]"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Visibility Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Member directory visibility
                        </label>
                        <select
                          value={spaceData.settings.memberVisibility}
                          onChange={(e) => setSpaceData({
                            ...spaceData,
                            settings: {...spaceData.settings, memberVisibility: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        >
                          <option value="public">Public - Anyone can see members</option>
                          <option value="members">Members only - Only space members can see directory</option>
                          <option value="builders">Builders only - Only builders can see full directory</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Review & Create</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Space Preview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Name:</span> {spaceData.name}
                      </div>
                      <div>
                        <span className="font-medium">Description:</span> {spaceData.description}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {spaceTypes.find(t => t.id === spaceData.type)?.name}
                      </div>
                      <div>
                        <span className="font-medium">Privacy:</span> {spaceData.privacy}
                      </div>
                      <div>
                        <span className="font-medium">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {spaceData.tags.map((tag) => (
                            <HiveBadge key={tag} variant="outline" size="sm">
                              {tag}
                            </HiveBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Enabled Surfaces</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(spaceData.surfaces)
                        .filter(([_, enabled]) => enabled)
                        .map(([surfaceId, _]) => {
                          const surface = surfaceOptions.find(s => s.id === surfaceId);
                          return (
                            <div key={surfaceId} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">{surface?.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">🎉 Ready to Create!</h3>
                    <p className="text-sm text-blue-800">
                      Your space is configured and ready to go. You'll be able to customize 
                      all settings after creation and start inviting members.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">📋 Next Steps</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Customize your space banner and branding</li>
                      <li>• Create your first pinned post with guidelines</li>
                      <li>• Invite initial members to get started</li>
                      <li>• Set up your first event or activity</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <HiveButton
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </HiveButton>
            <HiveButton
              onClick={currentStep === steps.length - 1 ? () => alert('Space created!') : handleNext}
              disabled={
                (currentStep === 0 && (!spaceData.name || !spaceData.description)) ||
                (currentStep === 1 && !spaceData.type)
              }
            >
              {currentStep === steps.length - 1 ? 'Create Space' : 'Next'}
            </HiveButton>
          </div>
        </div>
      </div>
    );
  },
};

export const SpaceSettingsManagement: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('General');
    const [spaceData, setSpaceData] = useState(mockSpaceData);
    const [hasChanges, setHasChanges] = useState(false);

    const tabs = ['General', 'Privacy', 'Surfaces', 'Advanced'];

    const handleSave = () => {
      setHasChanges(false);
      alert('Settings saved successfully!');
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Space Settings
            </h1>
            <p className="text-gray-600">
              Manage your space configuration and preferences
            </p>
          </div>

          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{spaceData.name}</h2>
                  <p className="text-gray-600">{spaceData.memberCount} members</p>
                </div>
                <div className="flex items-center gap-3">
                  <HiveBadge variant="default" className="capitalize">
                    {spaceData.status}
                  </HiveBadge>
                  <HiveBadge variant="outline" className="capitalize">
                    {spaceData.privacy}
                  </HiveBadge>
                </div>
              </div>
            </div>

            <div className="p-6">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              <AnimatePresence mode="wait">
                {activeTab === 'General' && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-semibold mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Space Name</label>
                          <input
                            type="text"
                            value={spaceData.name}
                            onChange={(e) => {
                              setSpaceData({...spaceData, name: e.target.value});
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Space Type</label>
                          <select
                            value={spaceData.type}
                            onChange={(e) => {
                              setSpaceData({...spaceData, type: e.target.value});
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                          >
                            <option value="academic">Academic</option>
                            <option value="social">Social</option>
                            <option value="residential">Residential</option>
                            <option value="professional">Professional</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={spaceData.description}
                        onChange={(e) => {
                          setSpaceData({...spaceData, description: e.target.value});
                          setHasChanges(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {spaceData.tags.map((tag) => (
                          <HiveBadge key={tag} variant="outline">
                            {tag}
                          </HiveBadge>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add new tag (press Enter)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value) {
                            setSpaceData({
                              ...spaceData,
                              tags: [...spaceData.tags, e.target.value]
                            });
                            e.target.value = '';
                            setHasChanges(true);
                          }
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Banner Image</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="text-gray-500 mb-2">📸</div>
                        <p className="text-sm text-gray-600 mb-2">
                          Upload a banner image for your space
                        </p>
                        <HiveButton variant="outline" size="sm">
                          Choose Image
                        </HiveButton>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Privacy' && (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-semibold mb-3">Space Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="privacy"
                            value="public"
                            checked={spaceData.privacy === 'public'}
                            onChange={(e) => {
                              setSpaceData({...spaceData, privacy: e.target.value});
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <div>
                            <div className="font-medium">Public</div>
                            <div className="text-sm text-gray-600">Anyone can find and join</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="privacy"
                            value="private"
                            checked={spaceData.privacy === 'private'}
                            onChange={(e) => {
                              setSpaceData({...spaceData, privacy: e.target.value});
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <div>
                            <div className="font-medium">Private</div>
                            <div className="text-sm text-gray-600">Invite only</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Member Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Auto-join eligible members</div>
                            <div className="text-sm text-gray-600">
                              Automatically add members who meet criteria
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={spaceData.settings.autoJoin}
                            onChange={(e) => {
                              setSpaceData({
                                ...spaceData,
                                settings: {...spaceData.settings, autoJoin: e.target.checked}
                              });
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Allow join requests</div>
                            <div className="text-sm text-gray-600">
                              Members can request to join
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={spaceData.settings.joinRequests}
                            onChange={(e) => {
                              setSpaceData({
                                ...spaceData,
                                settings: {...spaceData.settings, joinRequests: e.target.checked}
                              });
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Content Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Post moderation</div>
                            <div className="text-sm text-gray-600">
                              Require approval for new posts
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={spaceData.settings.postModeration}
                            onChange={(e) => {
                              setSpaceData({
                                ...spaceData,
                                settings: {...spaceData.settings, postModeration: e.target.checked}
                              });
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Allow events</div>
                            <div className="text-sm text-gray-600">
                              Members can create events
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={spaceData.settings.allowEvents}
                            onChange={(e) => {
                              setSpaceData({
                                ...spaceData,
                                settings: {...spaceData.settings, allowEvents: e.target.checked}
                              });
                              setHasChanges(true);
                            }}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Surfaces' && (
                  <motion.div
                    key="surfaces"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-semibold mb-3">Surface Configuration</h3>
                      <p className="text-gray-600 mb-4">
                        Configure which surfaces are available in your space and their display order.
                      </p>
                      <div className="space-y-3">
                        {Object.entries(spaceData.surfaces).map(([surfaceId, config]) => (
                          <div key={surfaceId} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium">
                                {config.order}
                              </div>
                              <div>
                                <div className="font-medium capitalize">{surfaceId}</div>
                                <div className="text-sm text-gray-600">
                                  {surfaceId === 'posts' && 'Main discussion feed'}
                                  {surfaceId === 'events' && 'Events and activities'}
                                  {surfaceId === 'members' && 'Member directory'}
                                  {surfaceId === 'tools' && 'Collaborative tools'}
                                  {surfaceId === 'pinned' && 'Pinned content'}
                                  {surfaceId === 'chat' && 'Real-time chat (coming soon)'}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={config.enabled}
                                onChange={(e) => {
                                  setSpaceData({
                                    ...spaceData,
                                    surfaces: {
                                      ...spaceData.surfaces,
                                      [surfaceId]: {...config, enabled: e.target.checked}
                                    }
                                  });
                                  setHasChanges(true);
                                }}
                                disabled={surfaceId === 'posts' || surfaceId === 'members' || surfaceId === 'chat'}
                                className="text-[var(--hive-brand-secondary)]"
                              />
                              <div className="flex flex-col gap-1">
                                <button className="text-xs text-gray-500 hover:text-gray-700">↑</button>
                                <button className="text-xs text-gray-500 hover:text-gray-700">↓</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Surface Tips</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Posts and Members surfaces are always enabled</li>
                        <li>• Drag surfaces to reorder them</li>
                        <li>• Chat surface is coming soon</li>
                        <li>• Consider your community's needs when choosing surfaces</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Advanced' && (
                  <motion.div
                    key="advanced"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-semibold mb-3">Space Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Space Status</div>
                            <div className="text-sm text-gray-600">
                              Current status: <span className="capitalize font-medium">{spaceData.status}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <HiveButton variant="outline" size="sm">
                              Freeze Space
                            </HiveButton>
                            <HiveButton variant="outline" size="sm">
                              Archive Space
                            </HiveButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Data Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Export Space Data</div>
                            <div className="text-sm text-gray-600">
                              Download all space content and member data
                            </div>
                          </div>
                          <HiveButton variant="outline" size="sm">
                            Export
                          </HiveButton>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Analytics Data</div>
                            <div className="text-sm text-gray-600">
                              Export usage analytics and member activity
                            </div>
                          </div>
                          <HiveButton variant="outline" size="sm">
                            Export Analytics
                          </HiveButton>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Integrations</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Webhook URL</div>
                            <div className="text-sm text-gray-600">
                              Receive notifications about space events
                            </div>
                          </div>
                          <HiveButton variant="outline" size="sm">
                            Configure
                          </HiveButton>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">API Access</div>
                            <div className="text-sm text-gray-600">
                              Generate API tokens for external integrations
                            </div>
                          </div>
                          <HiveButton variant="outline" size="sm">
                            Manage
                          </HiveButton>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-3">⚠️ Danger Zone</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-red-900">Delete Space</div>
                            <div className="text-sm text-red-700">
                              Permanently delete this space and all its data
                            </div>
                          </div>
                          <HiveButton variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            Delete
                          </HiveButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasChanges && (
                <div className="flex justify-between items-center mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    You have unsaved changes
                  </div>
                  <div className="flex gap-2">
                    <HiveButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSpaceData(mockSpaceData);
                        setHasChanges(false);
                      }}
                    >
                      Discard
                    </HiveButton>
                    <HiveButton size="sm" onClick={handleSave}>
                      Save Changes
                    </HiveButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const MemberManagementFlow: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('Members');
    const [members, setMembers] = useState(mockMembers);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    const tabs = ['Members', 'Invitations', 'Requests', 'Builders'];

    const handleRoleChange = (memberId: string, newRole: string) => {
      setMembers(members.map(member => 
        member.id === memberId ? {...member, role: newRole} : member
      ));
    };

    const handleRemoveMember = (memberId: string) => {
      setMembers(members.filter(member => member.id !== memberId));
    };

    const handleInviteMember = () => {
      if (inviteEmail) {
        // Add invite logic here
        setInviteEmail('');
        setShowInviteModal(false);
        alert(`Invitation sent to ${inviteEmail}`);
      }
    };

    const membersByRole = {
      builders: members.filter(m => m.role === 'builder'),
      members: members.filter(m => m.role === 'member'),
      requested: members.filter(m => m.role === 'requested_builder'),
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Member Management
                </h1>
                <p className="text-gray-600">
                  Manage space members, roles, and permissions
                </p>
              </div>
              <HiveButton onClick={() => setShowInviteModal(true)}>
                Invite Members
              </HiveButton>
            </div>
          </div>

          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Members"
                  value={members.length}
                  icon="👥"
                  subtitle="Active community"
                />
                <MetricCard
                  title="Builders"
                  value={membersByRole.builders.length}
                  icon="🛠️"
                  subtitle="Space administrators"
                />
                <MetricCard
                  title="Pending Requests"
                  value={membersByRole.requested.length}
                  icon="📋"
                  subtitle="Builder applications"
                />
                <MetricCard
                  title="Growth Rate"
                  value="+12%"
                  icon="📈"
                  subtitle="This month"
                  trend="up"
                />
              </div>
            </div>

            <div className="p-6">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              <AnimatePresence mode="wait">
                {activeTab === 'Members' && (
                  <motion.div
                    key="members"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          placeholder="Search members..."
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        />
                        <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold">
                          <option>All Roles</option>
                          <option>Builders</option>
                          <option>Members</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiveButton variant="outline" size="sm">
                          Export List
                        </HiveButton>
                        <HiveButton variant="outline" size="sm">
                          Bulk Actions
                        </HiveButton>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(member.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMembers([...selectedMembers, member.id]);
                                } else {
                                  setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                                }
                              }}
                              className="text-[var(--hive-brand-secondary)]"
                            />
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                              <div>Joined {member.joinedAt.toLocaleDateString()}</div>
                              <div>{member.contributions} contributions</div>
                            </div>
                            <HiveBadge 
                              variant={member.role === 'builder' ? 'default' : 'outline'}
                              className="capitalize"
                            >
                              {member.role.replace('_', ' ')}
                            </HiveBadge>
                            <div className="flex items-center gap-2">
                              <select
                                value={member.role}
                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-hive-gold"
                              >
                                <option value="member">Member</option>
                                <option value="builder">Builder</option>
                              </select>
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Invitations' && (
                  <motion.div
                    key="invitations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Pending Invitations</h3>
                      <HiveButton onClick={() => setShowInviteModal(true)}>
                        Send Invitation
                      </HiveButton>
                    </div>

                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm">📧</span>
                            </div>
                            <div>
                              <div className="font-medium">user{i}@stanford.edu</div>
                              <div className="text-sm text-gray-600">
                                Invited 2 days ago by Alex Chen
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiveBadge variant="outline" className="text-yellow-600">
                              Pending
                            </HiveBadge>
                            <HiveButton variant="outline" size="sm">
                              Resend
                            </HiveButton>
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Requests' && (
                  <motion.div
                    key="requests"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold">Builder Requests</h3>
                    
                    <div className="space-y-3">
                      {membersByRole.requested.map((member) => (
                        <div key={member.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-gray-600">{member.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiveButton
                                size="sm"
                                onClick={() => handleRoleChange(member.id, 'builder')}
                              >
                                Approve
                              </HiveButton>
                              <HiveButton
                                variant="outline"
                                size="sm"
                                onClick={() => handleRoleChange(member.id, 'member')}
                              >
                                Decline
                              </HiveButton>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Request reason:</strong> "I've been actively contributing to the space and would love to help moderate discussions and organize study sessions."
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Activity:</strong> {member.contributions} contributions, joined {member.joinedAt.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Builders' && (
                  <motion.div
                    key="builders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Space Builders</h3>
                      <HiveButton onClick={() => setShowInviteModal(true)}>
                        Invite Builder
                      </HiveButton>
                    </div>

                    <div className="space-y-3">
                      {membersByRole.builders.map((builder) => (
                        <div key={builder.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-[var(--hive-background-primary)]">
                                  {builder.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{builder.name}</div>
                                <div className="text-sm text-gray-600">{builder.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-gray-600">
                                <div>Builder since {builder.joinedAt.toLocaleDateString()}</div>
                                <div>{builder.contributions} contributions</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <HiveButton variant="outline" size="sm">
                                  Permissions
                                </HiveButton>
                                <button
                                  onClick={() => handleRoleChange(builder.id, 'member')}
                                  className="text-red-600 hover:text-red-700 text-sm"
                                >
                                  Remove Builder
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Builder Responsibilities</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Moderate posts and discussions</li>
                        <li>• Manage member invitations and requests</li>
                        <li>• Organize events and activities</li>
                        <li>• Configure space settings and surfaces</li>
                        <li>• Deploy and manage tools</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Invite Modal */}
          {showInviteModal && (
            <div className="fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-semibold mb-4">Invite Members</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold">
                      <option>Member</option>
                      <option>Builder</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
                    <textarea
                      placeholder="Add a personal message to the invitation..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <HiveButton
                    variant="outline"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </HiveButton>
                  <HiveButton onClick={handleInviteMember}>
                    Send Invitation
                  </HiveButton>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const ContentModerationTools: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('Recent Posts');
    const [posts, setPosts] = useState([
      {
        id: '1',
        author: 'John Smith',
        content: 'Anyone working on the algorithms assignment? I need help with the dynamic programming section.',
        timestamp: new Date('2024-01-20T14:30:00'),
        status: 'published',
        reports: 0,
        reactions: 5,
        comments: 3,
        isPinned: false,
      },
      {
        id: '2',
        author: 'Emily Davis',
        content: 'Check out this amazing resource for CS106B: https://example.com/cs106b-guide',
        timestamp: new Date('2024-01-20T13:45:00'),
        status: 'published',
        reports: 0,
        reactions: 12,
        comments: 7,
        isPinned: true,
      },
      {
        id: '3',
        author: 'Anonymous User',
        content: 'This class is stupid and the professor doesn\'t know what they\'re talking about.',
        timestamp: new Date('2024-01-20T12:15:00'),
        status: 'flagged',
        reports: 2,
        reactions: 0,
        comments: 1,
        isPinned: false,
      },
    ]);

    const tabs = ['Recent Posts', 'Flagged Content', 'Pinned Posts', 'Analytics'];

    const handlePostAction = (postId: string, action: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          switch (action) {
            case 'pin':
              return { ...post, isPinned: !post.isPinned };
            case 'approve':
              return { ...post, status: 'published' };
            case 'hide':
              return { ...post, status: 'hidden' };
            case 'delete':
              return { ...post, status: 'deleted' };
            default:
              return post;
          }
        }
        return post;
      }));
    };

    const postsByStatus = {
      published: posts.filter(p => p.status === 'published'),
      flagged: posts.filter(p => p.status === 'flagged'),
      pinned: posts.filter(p => p.isPinned),
      hidden: posts.filter(p => p.status === 'hidden'),
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Content Moderation
            </h1>
            <p className="text-gray-600">
              Manage and moderate space content to maintain quality discussions
            </p>
          </div>

          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Posts"
                  value={posts.length}
                  icon="📝"
                  subtitle="All time"
                />
                <MetricCard
                  title="Flagged Content"
                  value={postsByStatus.flagged.length}
                  icon="🚩"
                  subtitle="Needs review"
                />
                <MetricCard
                  title="Pinned Posts"
                  value={postsByStatus.pinned.length}
                  icon="📌"
                  subtitle="Important content"
                />
                <MetricCard
                  title="This Week"
                  value={18}
                  icon="📈"
                  subtitle="New posts"
                  trend="up"
                />
              </div>
            </div>

            <div className="p-6">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              <AnimatePresence mode="wait">
                {activeTab === 'Recent Posts' && (
                  <motion.div
                    key="recent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          placeholder="Search posts..."
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                        />
                        <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold">
                          <option>All Posts</option>
                          <option>Published</option>
                          <option>Flagged</option>
                          <option>Hidden</option>
                        </select>
                      </div>
                      <HiveButton variant="outline" size="sm">
                        Bulk Actions
                      </HiveButton>
                    </div>

                    <div className="space-y-3">
                      {posts.map((post) => (
                        <div 
                          key={post.id} 
                          className={`
                            p-4 border rounded-lg 
                            ${post.status === 'flagged' ? 'border-red-200 bg-red-50' : 'border-gray-200'}
                          `}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  {post.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{post.author}</div>
                                <div className="text-sm text-gray-600">
                                  {post.timestamp.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {post.isPinned && (
                                <HiveBadge variant="default" size="sm">
                                  📌 Pinned
                                </HiveBadge>
                              )}
                              <HiveBadge 
                                variant={post.status === 'flagged' ? 'default' : 'outline'}
                                size="sm"
                                className={post.status === 'flagged' ? 'bg-red-500 text-[var(--hive-text-primary)]' : ''}
                              >
                                {post.status}
                              </HiveBadge>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-gray-900">{post.content}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>❤️ {post.reactions}</span>
                              <span>💬 {post.comments}</span>
                              {post.reports > 0 && (
                                <span className="text-red-600">🚩 {post.reports} reports</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <HiveButton
                                variant="outline"
                                size="sm"
                                onClick={() => handlePostAction(post.id, 'pin')}
                              >
                                {post.isPinned ? 'Unpin' : 'Pin'}
                              </HiveButton>
                              {post.status === 'flagged' && (
                                <>
                                  <HiveButton
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePostAction(post.id, 'approve')}
                                  >
                                    Approve
                                  </HiveButton>
                                  <HiveButton
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePostAction(post.id, 'hide')}
                                  >
                                    Hide
                                  </HiveButton>
                                </>
                              )}
                              <button
                                onClick={() => handlePostAction(post.id, 'delete')}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Flagged Content' && (
                  <motion.div
                    key="flagged"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-2">⚠️ Content Requiring Review</h3>
                      <p className="text-sm text-red-800">
                        These posts have been flagged by community members and need your attention.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {postsByStatus.flagged.map((post) => (
                        <div key={post.id} className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-red-800">
                                  {post.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-red-900">{post.author}</div>
                                <div className="text-sm text-red-700">
                                  {post.timestamp.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <HiveBadge variant="default" className="bg-red-500 text-[var(--hive-text-primary)]">
                              🚩 {post.reports} reports
                            </HiveBadge>
                          </div>

                          <div className="mb-3">
                            <p className="text-red-900">{post.content}</p>
                          </div>

                          <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                            <h4 className="font-semibold text-red-900 mb-2">Report Reasons:</h4>
                            <ul className="text-sm text-red-800 space-y-1">
                              <li>• Inappropriate language</li>
                              <li>• Disrespectful to instructor</li>
                            </ul>
                          </div>

                          <div className="flex items-center gap-2">
                            <HiveButton
                              size="sm"
                              onClick={() => handlePostAction(post.id, 'approve')}
                            >
                              Approve Post
                            </HiveButton>
                            <HiveButton
                              variant="outline"
                              size="sm"
                              onClick={() => handlePostAction(post.id, 'hide')}
                            >
                              Hide Post
                            </HiveButton>
                            <HiveButton
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-700"
                              onClick={() => handlePostAction(post.id, 'delete')}
                            >
                              Delete Post
                            </HiveButton>
                            <HiveButton variant="outline" size="sm">
                              Contact Author
                            </HiveButton>
                          </div>
                        </div>
                      ))}
                    </div>

                    {postsByStatus.flagged.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-lg font-semibold mb-2">No flagged content!</h3>
                        <p className="text-gray-600">
                          All posts are in good standing with community guidelines.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'Pinned Posts' && (
                  <motion.div
                    key="pinned"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Pinned Posts</h3>
                      <HiveButton>
                        Create Pinned Post
                      </HiveButton>
                    </div>

                    <div className="space-y-3">
                      {postsByStatus.pinned.map((post) => (
                        <div key={post.id} className="p-4 border-2 border-hive-gold bg-[var(--hive-brand-secondary)]/5 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-[var(--hive-background-primary)]">
                                  {post.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{post.author}</div>
                                <div className="text-sm text-gray-600">
                                  {post.timestamp.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <HiveBadge variant="default" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
                              📌 Pinned
                            </HiveBadge>
                          </div>

                          <div className="mb-3">
                            <p className="text-gray-900">{post.content}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>❤️ {post.reactions}</span>
                              <span>💬 {post.comments}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiveButton
                                variant="outline"
                                size="sm"
                                onClick={() => handlePostAction(post.id, 'pin')}
                              >
                                Unpin
                              </HiveButton>
                              <HiveButton variant="outline" size="sm">
                                Edit
                              </HiveButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">💡 Pinned Post Tips</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use pinned posts for important announcements</li>
                        <li>• Include community guidelines and resources</li>
                        <li>• Keep pinned posts current and relevant</li>
                        <li>• Limit to 2-3 pinned posts for visibility</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="Content Quality Score"
                        value="8.7/10"
                        icon="⭐"
                        subtitle="Based on member feedback"
                      />
                      <MetricCard
                        title="Moderation Actions"
                        value="12"
                        icon="🛠️"
                        subtitle="This month"
                      />
                      <MetricCard
                        title="Community Health"
                        value="Excellent"
                        icon="💚"
                        subtitle="Low report rate"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Content Activity</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Posts this week</span>
                            <span className="font-semibold">18</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average engagement</span>
                            <span className="font-semibold">85%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Positive feedback</span>
                            <span className="font-semibold">94%</span>
                          </div>
                        </div>
                      </HiveCard>

                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Moderation Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Reports resolved</span>
                            <span className="font-semibold">8</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average response time</span>
                            <span className="font-semibold">2.3 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Content removed</span>
                            <span className="font-semibold">1</span>
                          </div>
                        </div>
                      </HiveCard>
                    </div>

                    <HiveCard className="p-4">
                      <h3 className="font-semibold mb-3">Recent Activity</h3>
                      <div className="space-y-3">
                        {mockRecentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-gray-600">{activity.details}</span>
                            <span className="text-gray-500 ml-auto">
                              {activity.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </HiveCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const SpaceAnalyticsDashboard: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [timeRange, setTimeRange] = useState('7d');

    const tabs = ['Overview', 'Members', 'Content', 'Engagement'];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Space Analytics
                </h1>
                <p className="text-gray-600">
                  Track your space performance and member engagement
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <HiveButton variant="outline">
                  Export Report
                </HiveButton>
              </div>
            </div>
          </div>

          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Members"
                  value={mockAnalytics.overview.totalMembers}
                  icon="👥"
                  subtitle={`${mockAnalytics.overview.activeMembers} active`}
                  trend="up"
                />
                <MetricCard
                  title="Growth Rate"
                  value={`+${mockAnalytics.overview.weeklyGrowth}%`}
                  icon="📈"
                  subtitle="This week"
                  trend="up"
                />
                <MetricCard
                  title="Engagement"
                  value={`${Math.round(mockAnalytics.overview.engagementRate * 100)}%`}
                  icon="💬"
                  subtitle="Member participation"
                  trend="up"
                />
                <MetricCard
                  title="Content Quality"
                  value="8.7/10"
                  icon="⭐"
                  subtitle="Community rating"
                  trend="stable"
                />
              </div>
            </div>

            <div className="p-6">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              <AnimatePresence mode="wait">
                {activeTab === 'Overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Member Activity</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Daily active members</span>
                            <span className="font-semibold text-green-600">
                              {mockAnalytics.overview.activeMembers}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">New members this week</span>
                            <span className="font-semibold text-blue-600">
                              {mockAnalytics.overview.weeklyGrowth}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Member retention</span>
                            <span className="font-semibold text-purple-600">92%</span>
                          </div>
                        </div>
                      </HiveCard>

                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Content Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Posts this week</span>
                            <span className="font-semibold text-green-600">
                              {mockAnalytics.posts.thisWeek}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average engagement</span>
                            <span className="font-semibold text-blue-600">
                              {Math.round(mockAnalytics.overview.engagementRate * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Response rate</span>
                            <span className="font-semibold text-purple-600">87%</span>
                          </div>
                        </div>
                      </HiveCard>
                    </div>

                    <HiveCard className="p-4">
                      <h3 className="font-semibold mb-3">Recent Highlights</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-[var(--hive-text-primary)] text-sm">🎉</span>
                          </div>
                          <div>
                            <div className="font-medium">New member milestone reached!</div>
                            <div className="text-sm text-gray-600">
                              Your space now has over 150 members
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-[var(--hive-text-primary)] text-sm">📈</span>
                          </div>
                          <div>
                            <div className="font-medium">Engagement increased by 25%</div>
                            <div className="text-sm text-gray-600">
                              Compared to last week
                            </div>
                          </div>
                        </div>
                      </div>
                    </HiveCard>
                  </motion.div>
                )}

                {activeTab === 'Members' && (
                  <motion.div
                    key="members"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="New Members"
                        value={mockAnalytics.overview.weeklyGrowth}
                        icon="👋"
                        subtitle="This week"
                        trend="up"
                      />
                      <MetricCard
                        title="Active Members"
                        value={mockAnalytics.overview.activeMembers}
                        icon="🔥"
                        subtitle="Weekly active"
                        trend="up"
                      />
                      <MetricCard
                        title="Member Retention"
                        value="92%"
                        icon="🎯"
                        subtitle="30-day retention"
                        trend="stable"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Top Contributors</h3>
                        <div className="space-y-3">
                          {mockAnalytics.posts.topContributors.map((contributor, index) => (
                            <div key={contributor} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--hive-background-primary)]">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{contributor}</span>
                              </div>
                              <span className="text-sm text-gray-600">
                                {24 - index * 6} posts
                              </span>
                            </div>
                          ))}
                        </div>
                      </HiveCard>

                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Member Growth</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">January</span>
                            <span className="font-semibold">+12 members</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">February</span>
                            <span className="font-semibold">+18 members</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">March</span>
                            <span className="font-semibold">+25 members</span>
                          </div>
                        </div>
                      </HiveCard>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Content' && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="Total Posts"
                        value={mockAnalytics.posts.totalPosts}
                        icon="📝"
                        subtitle="All time"
                      />
                      <MetricCard
                        title="This Week"
                        value={mockAnalytics.posts.thisWeek}
                        icon="🆕"
                        subtitle="New posts"
                        trend="up"
                      />
                      <MetricCard
                        title="Daily Average"
                        value={mockAnalytics.posts.avgPerDay}
                        icon="📊"
                        subtitle="Posts per day"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Content Types</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Text posts</span>
                            <span className="font-semibold">156 (67%)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Questions</span>
                            <span className="font-semibold">45 (19%)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Resources</span>
                            <span className="font-semibold">23 (10%)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Announcements</span>
                            <span className="font-semibold">10 (4%)</span>
                          </div>
                        </div>
                      </HiveCard>

                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Popular Topics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Algorithms</span>
                            <span className="font-semibold">34 posts</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Data Structures</span>
                            <span className="font-semibold">28 posts</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Study Groups</span>
                            <span className="font-semibold">22 posts</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Assignments</span>
                            <span className="font-semibold">18 posts</span>
                          </div>
                        </div>
                      </HiveCard>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Engagement' && (
                  <motion.div
                    key="engagement"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="Engagement Rate"
                        value={`${Math.round(mockAnalytics.overview.engagementRate * 100)}%`}
                        icon="💬"
                        subtitle="Member participation"
                        trend="up"
                      />
                      <MetricCard
                        title="Response Time"
                        value="2.3 hours"
                        icon="⏱️"
                        subtitle="Average response"
                        trend="stable"
                      />
                      <MetricCard
                        title="Discussion Quality"
                        value="8.7/10"
                        icon="⭐"
                        subtitle="Community rating"
                        trend="up"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Most Engaged Posts</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm mb-1">
                              "Algorithm study session this Friday"
                            </div>
                            <div className="text-xs text-gray-600">
                              23 reactions • 18 comments
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm mb-1">
                              "CS106B final exam tips and tricks"
                            </div>
                            <div className="text-xs text-gray-600">
                              19 reactions • 15 comments
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm mb-1">
                              "Great resources for dynamic programming"
                            </div>
                            <div className="text-xs text-gray-600">
                              16 reactions • 12 comments
                            </div>
                          </div>
                        </div>
                      </HiveCard>

                      <HiveCard className="p-4">
                        <h3 className="font-semibold mb-3">Event Participation</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total events</span>
                            <span className="font-semibold">{mockAnalytics.events.totalEvents}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Upcoming events</span>
                            <span className="font-semibold">{mockAnalytics.events.upcoming}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average attendance</span>
                            <span className="font-semibold">{mockAnalytics.events.avgAttendance}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Completion rate</span>
                            <span className="font-semibold">
                              {Math.round(mockAnalytics.events.completionRate * 100)}%
                            </span>
                          </div>
                        </div>
                      </HiveCard>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  },
};