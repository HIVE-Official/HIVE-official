import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '07-Spaces/Builder Experience',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space Builder Experience

Complete builder tools and workflows for space administration and community management. These stories demonstrate the advanced capabilities available to space builders.

## Builder Tools

1. **Builder Onboarding** - First-time setup and orientation
2. **Space Configuration** - Advanced space settings and customization
3. **Content Management** - Creation, curation, and moderation tools
4. **Member Management** - Advanced member administration
5. **Analytics & Insights** - Performance tracking and reporting

## Builder Capabilities

- **Advanced Permissions** - Full administrative access
- **Tool Deployment** - Add and configure space tools
- **Surface Customization** - Configure space layout and features
- **Analytics Access** - Detailed performance insights
- **Community Leadership** - Guide and moderate discussions

## When to Use

- **Space Administration** - Managing space settings and configuration
- **Community Moderation** - Maintaining healthy discussions
- **Growth Management** - Scaling space membership and engagement
- **Performance Optimization** - Improving space effectiveness
- **Leadership Development** - Training new builders
        `,
      },
    },
  },
};

export default meta;

// Mock data for builder experience
const mockBuilderData = {
  id: 'builder123',
  name: 'Alex Chen',
  email: 'alex.chen@stanford.edu',
  role: 'builder',
  spaces: [
    { id: 'space1', name: 'Stanford CS Study Group', role: 'founder' },
    { id: 'space2', name: 'AI Research Lab', role: 'co-builder' },
  ],
  experience: {
    builderSince: new Date('2024-01-15'),
    spacesManaged: 2,
    membersHelped: 156,
    contentModerated: 24,
    toolsDeployed: 8,
  },
};

const mockOnboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Builder Tools',
    description: 'Learn about your new capabilities and responsibilities',
    completed: true,
  },
  {
    id: 'space-settings',
    title: 'Configure Your Space',
    description: 'Set up basic space settings and privacy options',
    completed: true,
  },
  {
    id: 'surface-setup',
    title: 'Customize Surfaces',
    description: 'Enable and configure the 6-surface architecture',
    completed: true,
  },
  {
    id: 'member-management',
    title: 'Member Management',
    description: 'Learn to invite and manage community members',
    completed: false,
  },
  {
    id: 'content-moderation',
    title: 'Content Moderation',
    description: 'Understand content policies and moderation tools',
    completed: false,
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Access and interpret space performance data',
    completed: false,
  },
];

const mockTools = [
  {
    id: 'tool1',
    name: 'Study Schedule Coordinator',
    description: 'Helps members coordinate study sessions',
    status: 'active',
    users: 45,
    satisfaction: 4.8,
  },
  {
    id: 'tool2',
    name: 'Grade Calculator',
    description: 'Calculate GPA and track academic progress',
    status: 'active',
    users: 32,
    satisfaction: 4.6,
  },
  {
    id: 'tool3',
    name: 'Resource Library',
    description: 'Curated collection of study materials',
    status: 'draft',
    users: 0,
    satisfaction: 0,
  },
];

const mockAnalytics = {
  memberGrowth: {
    thisWeek: 12,
    lastWeek: 8,
    trend: 'up',
  },
  engagement: {
    postsThisWeek: 24,
    commentsThisWeek: 156,
    averageDaily: 3.4,
  },
  topContent: [
    { title: 'CS106B Study Guide', engagement: 89, type: 'resource' },
    { title: 'Algorithm Workshop', engagement: 67, type: 'event' },
    { title: 'Debug Help Thread', engagement: 45, type: 'discussion' },
  ],
};

export const BuilderOnboarding: StoryObj = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set([0, 1, 2]));

    const handleStepComplete = (stepIndex: number) => {
      setCompletedSteps(new Set([...completedSteps, stepIndex]));
      if (stepIndex === currentStep && stepIndex < mockOnboardingSteps.length - 1) {
        setCurrentStep(stepIndex + 1);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Builder Onboarding
            </h1>
            <p className="text-gray-600">
              Welcome to your builder journey! Let's get you set up with everything you need.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Onboarding Progress</h2>
              <div className="text-sm text-gray-600">
                {completedSteps.size} of {mockOnboardingSteps.length} completed
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps.size / mockOnboardingSteps.length) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockOnboardingSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-colors
                    ${completedSteps.has(index) 
                      ? 'bg-green-50 border-green-200' 
                      : index === currentStep 
                        ? 'bg-[var(--hive-brand-secondary)]/10 border-hive-gold' 
                        : 'bg-gray-50 border-gray-200'}
                  `}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                      ${completedSteps.has(index) 
                        ? 'bg-green-500 text-[var(--hive-text-primary)]' 
                        : index === currentStep 
                          ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                          : 'bg-gray-300 text-gray-600'}
                    `}>
                      {completedSteps.has(index) ? '✓' : index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {mockOnboardingSteps[currentStep]?.title}
                </h2>
                
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-hive-gold/20 to-yellow-100 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">🎉 Congratulations!</h3>
                      <p className="text-gray-700">
                        You've been promoted to a builder role. This means you now have advanced 
                        capabilities to help shape and grow your space community.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">What's New</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Content moderation tools</li>
                          <li>• Member management access</li>
                          <li>• Space configuration options</li>
                          <li>• Analytics and insights</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Your Responsibilities</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Foster positive community culture</li>
                          <li>• Moderate content appropriately</li>
                          <li>• Help new members get oriented</li>
                          <li>• Keep space settings up to date</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Learn how to effectively manage your space members, handle invitations, 
                      and promote community engagement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">👥 Member Management</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Send invitations to new members</li>
                          <li>• Approve or decline join requests</li>
                          <li>• Promote members to builder status</li>
                          <li>• Remove members if necessary</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">🤝 Community Building</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Welcome new members personally</li>
                          <li>• Facilitate introductions</li>
                          <li>• Encourage participation</li>
                          <li>• Recognize valuable contributions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Master the art of content moderation to maintain a healthy, 
                      productive community environment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">📝 Content Guidelines</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Keep discussions relevant and helpful</li>
                          <li>• Ensure respectful communication</li>
                          <li>• Remove spam or inappropriate content</li>
                          <li>• Pin important announcements</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">⚖️ Moderation Tools</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Pin/unpin posts</li>
                          <li>• Delete inappropriate content</li>
                          <li>• Handle reported content</li>
                          <li>• Communicate with members</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Learn to use analytics to understand your space's performance 
                      and make data-driven decisions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">156</div>
                        <div className="text-sm text-gray-600">Total Members</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">89%</div>
                        <div className="text-sm text-gray-600">Engagement Rate</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-sm text-gray-600">Posts This Week</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <HiveButton
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </HiveButton>
                  <HiveButton
                    onClick={() => {
                      if (!completedSteps.has(currentStep)) {
                        handleStepComplete(currentStep);
                      } else if (currentStep < mockOnboardingSteps.length - 1) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                  >
                    {completedSteps.has(currentStep) 
                      ? (currentStep === mockOnboardingSteps.length - 1 ? 'Finish' : 'Next')
                      : 'Complete Step'}
                  </HiveButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  },
};

export const SpaceConfigurationTools: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('surfaces');
    const [spaceSettings, setSpaceSettings] = useState({
      surfaces: {
        pinned: { enabled: true, order: 1 },
        posts: { enabled: true, order: 2 },
        events: { enabled: true, order: 3 },
        tools: { enabled: true, order: 4 },
        members: { enabled: true, order: 5 },
        chat: { enabled: false, order: 6 },
      },
      privacy: {
        visibility: 'public',
        joinRequests: true,
        memberDirectory: 'public',
      },
      features: {
        allowEvents: true,
        allowTools: true,
        postModeration: false,
        autoWelcome: true,
      },
    });

    const tabs = ['Surfaces', 'Privacy', 'Features', 'Integrations'];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Space Configuration Tools
            </h1>
            <p className="text-gray-600">
              Advanced settings and customization options for your space
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border mb-6">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`
                    flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab.toLowerCase()
                      ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'surfaces' && (
                <motion.div
                  key="surfaces"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Surface Configuration</h2>
                  <p className="text-gray-600 mb-6">
                    Configure which surfaces are available and their display order
                  </p>
                  
                  <div className="space-y-4">
                    {Object.entries(spaceSettings.surfaces).map(([surfaceId, config]) => (
                      <div key={surfaceId} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-bold">
                            {config.order}
                          </div>
                          <div>
                            <h3 className="font-medium capitalize">{surfaceId}</h3>
                            <p className="text-sm text-gray-600">
                              {surfaceId === 'pinned' && 'Important announcements and resources'}
                              {surfaceId === 'posts' && 'Main discussion feed'}
                              {surfaceId === 'events' && 'Events and activities'}
                              {surfaceId === 'tools' && 'Collaborative tools'}
                              {surfaceId === 'members' && 'Member directory'}
                              {surfaceId === 'chat' && 'Real-time chat (coming soon)'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={config.enabled}
                              onChange={(e) => setSpaceSettings({
                                ...spaceSettings,
                                surfaces: {
                                  ...spaceSettings.surfaces,
                                  [surfaceId]: { ...config, enabled: e.target.checked }
                                }
                              })}
                              disabled={surfaceId === 'posts' || surfaceId === 'members' || surfaceId === 'chat'}
                              className="text-[var(--hive-brand-secondary)]"
                            />
                            <span className="text-sm">Enabled</span>
                          </label>
                          <div className="flex flex-col">
                            <button className="text-xs text-gray-500 hover:text-gray-700">↑</button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">↓</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Space Visibility</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={spaceSettings.privacy.visibility === 'public'}
                            onChange={(e) => setSpaceSettings({
                              ...spaceSettings,
                              privacy: { ...spaceSettings.privacy, visibility: e.target.value }
                            })}
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
                            name="visibility"
                            value="private"
                            checked={spaceSettings.privacy.visibility === 'private'}
                            onChange={(e) => setSpaceSettings({
                              ...spaceSettings,
                              privacy: { ...spaceSettings.privacy, visibility: e.target.value }
                            })}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <div>
                            <div className="font-medium">Private</div>
                            <div className="text-sm text-gray-600">Invitation only</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Member Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Allow Join Requests</div>
                            <div className="text-sm text-gray-600">Members can request to join</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={spaceSettings.privacy.joinRequests}
                            onChange={(e) => setSpaceSettings({
                              ...spaceSettings,
                              privacy: { ...spaceSettings.privacy, joinRequests: e.target.checked }
                            })}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Feature Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Allow Events</div>
                        <div className="text-sm text-gray-600">Members can create events</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={spaceSettings.features.allowEvents}
                        onChange={(e) => setSpaceSettings({
                          ...spaceSettings,
                          features: { ...spaceSettings.features, allowEvents: e.target.checked }
                        })}
                        className="text-[var(--hive-brand-secondary)]"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Allow Tools</div>
                        <div className="text-sm text-gray-600">Enable tool deployment</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={spaceSettings.features.allowTools}
                        onChange={(e) => setSpaceSettings({
                          ...spaceSettings,
                          features: { ...spaceSettings.features, allowTools: e.target.checked }
                        })}
                        className="text-[var(--hive-brand-secondary)]"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Post Moderation</div>
                        <div className="text-sm text-gray-600">Require approval for posts</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={spaceSettings.features.postModeration}
                        onChange={(e) => setSpaceSettings({
                          ...spaceSettings,
                          features: { ...spaceSettings.features, postModeration: e.target.checked }
                        })}
                        className="text-[var(--hive-brand-secondary)]"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Auto Welcome</div>
                        <div className="text-sm text-gray-600">Send welcome message to new members</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={spaceSettings.features.autoWelcome}
                        onChange={(e) => setSpaceSettings({
                          ...spaceSettings,
                          features: { ...spaceSettings.features, autoWelcome: e.target.checked }
                        })}
                        className="text-[var(--hive-brand-secondary)]"
                      />
                    </label>
                  </div>
                </motion.div>
              )}

              {activeTab === 'integrations' && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Integrations</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Canvas Integration</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Connect with Canvas to sync assignments and grades
                      </p>
                      <HiveButton variant="outline" size="sm">
                        Connect Canvas
                      </HiveButton>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Google Calendar</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Sync space events with Google Calendar
                      </p>
                      <HiveButton variant="outline" size="sm">
                        Connect Google Calendar
                      </HiveButton>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Slack Notifications</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Send notifications to Slack channels
                      </p>
                      <HiveButton variant="outline" size="sm">
                        Connect Slack
                      </HiveButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <HiveButton>
              Save Configuration
            </HiveButton>
          </div>
        </div>
      </div>
    );
  },
};

export const ContentManagementTools: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('create');
    const [contentForm, setContentForm] = useState({
      type: 'announcement',
      title: '',
      content: '',
      pinned: false,
      schedule: '',
    });

    const tabs = ['Create', 'Manage', 'Templates', 'Schedule'];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Content Management Tools
            </h1>
            <p className="text-gray-600">
              Create, manage, and schedule content for your space
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border mb-6">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`
                    flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab.toLowerCase()
                      ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Creation */}
          {activeTab === 'create' && (
            <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Create Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select
                    value={contentForm.type}
                    onChange={(e) => setContentForm({...contentForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="resource">Resource</option>
                    <option value="discussion">Discussion Starter</option>
                    <option value="poll">Poll</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={contentForm.title}
                    onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                    placeholder="Enter a compelling title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={contentForm.content}
                    onChange={(e) => setContentForm({...contentForm, content: e.target.value})}
                    placeholder="Write your content here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    rows={6}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={contentForm.pinned}
                      onChange={(e) => setContentForm({...contentForm, pinned: e.target.checked})}
                      className="text-[var(--hive-brand-secondary)]"
                    />
                    <span className="text-sm">Pin to top of feed</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <HiveButton>
                    Publish Now
                  </HiveButton>
                  <HiveButton variant="outline">
                    Save Draft
                  </HiveButton>
                  <HiveButton variant="outline">
                    Schedule
                  </HiveButton>
                </div>
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === 'manage' && (
            <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Welcome to CS Study Group</h3>
                    <p className="text-sm text-gray-600">Pinned announcement • 2 days ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiveButton variant="outline" size="sm">Edit</HiveButton>
                    <HiveButton variant="outline" size="sm">Unpin</HiveButton>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Study Session Guidelines</h3>
                    <p className="text-sm text-gray-600">Resource • 1 week ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiveButton variant="outline" size="sm">Edit</HiveButton>
                    <HiveButton variant="outline" size="sm">Pin</HiveButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const BuilderAnalyticsTools: StoryObj = {
  render: () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Builder Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive insights into your space's performance
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <HiveCard className="p-4 text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">
                {mockAnalytics.memberGrowth.thisWeek}
              </div>
              <div className="text-sm text-gray-600">New Members</div>
              <div className="text-xs text-green-600">↗ +{mockAnalytics.memberGrowth.thisWeek - mockAnalytics.memberGrowth.lastWeek}</div>
            </HiveCard>
            <HiveCard className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockAnalytics.engagement.postsThisWeek}
              </div>
              <div className="text-sm text-gray-600">Posts This Week</div>
              <div className="text-xs text-blue-600">Avg: {mockAnalytics.engagement.averageDaily}/day</div>
            </HiveCard>
            <HiveCard className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockAnalytics.engagement.commentsThisWeek}
              </div>
              <div className="text-sm text-gray-600">Comments</div>
              <div className="text-xs text-green-600">High engagement</div>
            </HiveCard>
            <HiveCard className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mockTools.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Tools</div>
              <div className="text-xs text-purple-600">
                {mockTools.reduce((sum, t) => sum + t.users, 0)} users
              </div>
            </HiveCard>
          </div>

          {/* Top Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiveCard className="p-4">
              <h3 className="font-semibold mb-3">Top Performing Content</h3>
              <div className="space-y-3">
                {mockAnalytics.topContent.map((content, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{content.title}</div>
                      <div className="text-xs text-gray-600 capitalize">{content.type}</div>
                    </div>
                    <div className="text-sm font-medium text-[var(--hive-brand-secondary)]">
                      {content.engagement}% engagement
                    </div>
                  </div>
                ))}
              </div>
            </HiveCard>

            <HiveCard className="p-4">
              <h3 className="font-semibold mb-3">Tool Performance</h3>
              <div className="space-y-3">
                {mockTools.filter(t => t.status === 'active').map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-600">{tool.users} active users</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      ⭐ {tool.satisfaction}
                    </div>
                  </div>
                ))}
              </div>
            </HiveCard>
          </div>
        </div>
      </div>
    );
  },
};