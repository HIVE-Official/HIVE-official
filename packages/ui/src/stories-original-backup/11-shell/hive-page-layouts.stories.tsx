import type { Meta, StoryObj } from '@storybook/react';
import { 
  AppShell, 
  ProfileLayout, 
  SpaceLayout, 
  FeedLayout, 
  HiveLabLayout, 
  RitualLayout,
  SplitLayout,
  ModalLayout
} from '../../components/shell';
import { HiveButton } from '../../components/hive-button';
import { HiveBentoCard } from '../../layout/hive-layout';

const meta: Meta = {
  title: '11-Shell/HIVE Page Layouts',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Platform page layouts for the 5 core sections: Profile, Spaces, Feed, HiveLAB, and Rituals. Each layout is optimized for its specific use case while maintaining design system consistency.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alex Rivera',
  handle: '@alexrivera',
  avatar: 'https://github.com/alexrivera.png',
  builderStatus: 'active' as const,
};

// =============================================================================
// 1. PROFILE LAYOUT SHOWCASE
// =============================================================================

export const ProfileLayoutShowcase: Story = {
  name: 'Profile Layout - Command Center',
  render: () => (
    <AppShell 
      user={mockUser}
      currentSection="profile"
      layoutType="dashboard"
    >
      <ProfileLayout
        header={
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
                <span className="text-[var(--hive-background-primary)] font-bold text-xl">AR</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Alex Rivera</h1>
                <p className="text-[var(--hive-text-muted)]">@alexrivera • Active Builder</p>
              </div>
            </div>
          </div>
        }
        quickActions={
          <div className="flex gap-3">
            <HiveButton variant="premium" size="sm">Create Tool</HiveButton>
            <HiveButton variant="secondary" size="sm">Join Space</HiveButton>
            <HiveButton variant="ghost" size="sm">Settings</HiveButton>
          </div>
        }
        calendar={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Personal Calendar</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3">
                <div className="flex justify-between">
                  <span className="text-[var(--hive-text-primary)]">CS 250 Lecture</span>
                  <span className="text-[var(--hive-text-muted)]">2:00 PM</span>
                </div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="flex justify-between">
                  <span className="text-[var(--hive-text-primary)]">Study Group</span>
                  <span className="text-[var(--hive-text-muted)]">4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        }
        personalTools={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">My Tools</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3 cursor-pointer hover:bg-[var(--hive-interactive-hover)]">
                <span className="text-[var(--hive-text-primary)]">📊 GPA Calculator</span>
              </div>
              <div className="glass rounded-xl p-3 cursor-pointer hover:bg-[var(--hive-interactive-hover)]">
                <span className="text-[var(--hive-text-primary)]">📅 Schedule Builder</span>
              </div>
              <div className="glass rounded-xl p-3 cursor-pointer hover:bg-[var(--hive-interactive-hover)]">
                <span className="text-[var(--hive-text-primary)]">⏱️ Study Timer</span>
              </div>
            </div>
          </div>
        }
        spaceMemberships={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">My Spaces</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--hive-text-primary)]">CS 250</span>
                  <span className="text-xs bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] px-2 py-1 rounded-full">Active</span>
                </div>
              </div>
              <div className="glass rounded-xl p-3">
                <span className="text-[var(--hive-text-primary)]">Mathematics Club</span>
              </div>
            </div>
          </div>
        }
        activityFeed={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="text-[var(--hive-text-muted)]">Created "Quiz Helper" tool</div>
              <div className="text-[var(--hive-text-muted)]">Joined CS 250 study group</div>
              <div className="text-[var(--hive-text-muted)]">Updated schedule</div>
            </div>
          </div>
        }
      />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile Layout showcases the personal command center with bento grid layout, calendar integration, personal tools, and space memberships.'
      }
    }
  }
};

// =============================================================================
// 2. SPACES LAYOUT SHOWCASE
// =============================================================================

export const SpaceLayoutShowcase: Story = {
  name: 'Space Layout - 6 Universal Surfaces',
  render: () => (
    <AppShell 
      user={mockUser}
      currentSection="spaces"
      layoutType="surface"
    >
      <SpaceLayout
        spaceHeader={
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">CS 250 - Data Structures</h1>
                <p className="text-[var(--hive-text-muted)]">248 members • Computer Science</p>
              </div>
              <HiveButton variant="premium">Join Space</HiveButton>
            </div>
          </div>
        }
        pinned={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">📌 Pinned</h3>
            <div className="glass rounded-xl p-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Midterm Exam - March 15th</h4>
              <p className="text-[var(--hive-text-muted)] text-sm mt-2">Covers chapters 1-8. Study guides available in Tools.</p>
            </div>
          </div>
        }
        posts={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">📝 Posts</h3>
            <div className="space-y-4">
              <div className="glass rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-[var(--hive-text-primary)] text-sm">New practice problems uploaded!</p>
                    <span className="text-[var(--hive-text-muted)] text-xs">2 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-[var(--hive-text-primary)] text-sm">Study group forming for Thursday</p>
                    <span className="text-[var(--hive-text-muted)] text-xs">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        events={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">📅 Events</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3">
                <div className="text-[var(--hive-text-primary)] text-sm font-medium">Office Hours</div>
                <div className="text-[var(--hive-text-muted)] text-xs">Tomorrow 2-4 PM</div>
              </div>
            </div>
          </div>
        }
        toolsStack={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">🛠️ Tools</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3 cursor-pointer hover:bg-[var(--hive-interactive-hover)]">
                <span className="text-[var(--hive-text-primary)] text-sm">Study Guide Generator</span>
              </div>
              <div className="glass rounded-xl p-3 cursor-pointer hover:bg-[var(--hive-interactive-hover)]">
                <span className="text-[var(--hive-text-primary)] text-sm">Algorithm Visualizer</span>
              </div>
            </div>
          </div>
        }
        chat={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">💬 Chat</h3>
            <div className="text-[var(--hive-text-muted)] text-sm">
              Live discussion happening...
            </div>
          </div>
        }
        members={
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">👥 Members</h3>
            <div className="text-[var(--hive-text-muted)] text-sm">
              248 active members
            </div>
          </div>
        }
      />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space Layout demonstrates the 6 universal surfaces: Pinned, Posts, Events, Tools Stack, Chat, and Members arranged in a responsive grid.'
      }
    }
  }
};

// =============================================================================
// 3. FEED LAYOUT SHOWCASE
// =============================================================================

export const FeedLayoutShowcase: Story = {
  name: 'Feed Layout - Campus Pulse',
  render: () => (
    <AppShell 
      user={mockUser}
      currentSection="feed"
      layoutType="feed"
    >
      <FeedLayout
        feedHeader={
          <div className="glass rounded-3xl p-6">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Campus Feed</h1>
            <p className="text-[var(--hive-text-muted)]">Tool-generated content from your spaces</p>
          </div>
        }
        feedFilters={
          <div className="flex gap-3">
            <HiveButton variant="chip-gold" size="chip">All</HiveButton>
            <HiveButton variant="chip" size="chip">CS Spaces</HiveButton>
            <HiveButton variant="chip" size="chip">Study Groups</HiveButton>
            <HiveButton variant="chip" size="chip">Events</HiveButton>
          </div>
        }
        feedContent={
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-[var(--hive-text-primary)]">CS 250</span>
                    <span className="text-[var(--hive-text-muted)] text-sm">• 2 hours ago</span>
                  </div>
                  <p className="text-[var(--hive-text-primary)] mb-3">New algorithm visualization tool created by @sarah_builds</p>
                  <div className="glass rounded-2xl p-4 bg-[var(--hive-background-secondary)]/50">
                    <div className="text-sm text-[var(--hive-text-primary)]">🔧 Binary Search Visualizer</div>
                    <div className="text-xs text-[var(--hive-text-muted)]">Interactive tool for understanding binary search</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-[var(--hive-text-primary)]">Mathematics Club</span>
                    <span className="text-[var(--hive-text-muted)] text-sm">• 4 hours ago</span>
                  </div>
                  <p className="text-[var(--hive-text-primary)]">Study session scheduled for calculus review</p>
                </div>
              </div>
            </div>
          </div>
        }
        feedSidebar={
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4">
              <h3 className="font-semibold text-[var(--hive-text-primary)] mb-3">Active Spaces</h3>
              <div className="space-y-2 text-sm">
                <div className="text-[var(--hive-text-primary)]">CS 250 (12 new)</div>
                <div className="text-[var(--hive-text-primary)]">Math Club (3 new)</div>
              </div>
            </div>
          </div>
        }
      />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feed Layout shows the campus pulse with Tool-generated content, filtering options, and sidebar for active spaces.'
      }
    }
  }
};

// =============================================================================
// 4. HIVELAB LAYOUT SHOWCASE
// =============================================================================

export const HiveLabLayoutShowcase: Story = {
  name: 'HiveLAB Layout - Builder Console',
  render: () => (
    <AppShell 
      user={mockUser}
      currentSection="hivelab"
      layoutType="builder"
    >
      <HiveLabLayout
        builderHeader={
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[var(--hive-text-primary)]">Tool Builder</h1>
              <p className="text-[var(--hive-text-muted)]">Create custom tools for your spaces</p>
            </div>
            <div className="flex gap-3">
              <HiveButton variant="outline" size="sm">Save Draft</HiveButton>
              <HiveButton variant="premium" size="sm">Publish Tool</HiveButton>
            </div>
          </div>
        }
        elementLibrary={
          <div>
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">Elements</h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-3 cursor-grab">
                <div className="text-[var(--hive-text-primary)] text-sm">📝 Text Input</div>
              </div>
              <div className="glass rounded-xl p-3 cursor-grab">
                <div className="text-[var(--hive-text-primary)] text-sm">🔘 Button</div>
              </div>
              <div className="glass rounded-xl p-3 cursor-grab">
                <div className="text-[var(--hive-text-primary)] text-sm">📊 Chart</div>
              </div>
              <div className="glass rounded-xl p-3 cursor-grab">
                <div className="text-[var(--hive-text-primary)] text-sm">⏱️ Timer</div>
              </div>
            </div>
          </div>
        }
        designCanvas={
          <div className="glass rounded-3xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center text-[var(--hive-text-muted)]">
              <p className="text-lg mb-2">Drag elements here to build your tool</p>
              <p className="text-sm">Start by selecting an element from the library</p>
            </div>
          </div>
        }
        propertiesPanel={
          <div>
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Tool Name</label>
                <input 
                  type="text" 
                  placeholder="Enter tool name..."
                  className="w-full h-9 px-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Description</label>
                <textarea 
                  placeholder="Describe your tool..."
                  className="w-full h-20 px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] resize-none"
                />
              </div>
            </div>
          </div>
        }
        previewArea={
          <div className="flex items-center justify-center h-full">
            <div className="text-[var(--hive-text-muted)] text-sm">
              Tool preview will appear here
            </div>
          </div>
        }
      />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HiveLAB Layout provides the builder console with element library, design canvas, properties panel, and preview area for Tool creation.'
      }
    }
  }
};

// =============================================================================
// 5. RITUAL LAYOUT SHOWCASE  
// =============================================================================

export const RitualLayoutShowcase: Story = {
  name: 'Ritual Layout - Platform Experiences',
  render: () => (
    <AppShell 
      user={mockUser}
      currentSection="rituals"
      layoutType="ritual"
    >
      <RitualLayout
        ritualBackground="glow"
        centered={true}
        maxWidth="2xl"
      >
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[var(--hive-brand-primary)] rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="text-3xl">🌟</div>
            </div>
            <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-4">
              First Light Ritual
            </h1>
            <p className="text-xl text-[var(--hive-text-muted)] mb-8">
              Welcome to HIVE. Let's begin your journey as a builder.
            </p>
          </div>
          
          <div className="glass rounded-3xl p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">
                  Choose Your First Tool
                </h2>
                <p className="text-[var(--hive-text-muted)]">
                  Every journey begins with a single tool. What will yours be?
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-6 text-center cursor-pointer hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <div className="text-2xl mb-3">📊</div>
                  <h3 className="font-medium text-[var(--hive-text-primary)]">GPA Calculator</h3>
                  <p className="text-sm text-[var(--hive-text-muted)]">Track your academic progress</p>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center cursor-pointer hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <div className="text-2xl mb-3">⏱️</div>
                  <h3 className="font-medium text-[var(--hive-text-primary)]">Study Timer</h3>
                  <p className="text-sm text-[var(--hive-text-muted)]">Focused study sessions</p>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center cursor-pointer hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <div className="text-2xl mb-3">📅</div>
                  <h3 className="font-medium text-[var(--hive-text-primary)]">Schedule Builder</h3>
                  <p className="text-sm text-[var(--hive-text-muted)]">Plan your perfect schedule</p>
                </div>
              </div>
              
              <div className="text-center">
                <HiveButton variant="premium" size="lg">
                  Continue Journey
                </HiveButton>
              </div>
            </div>
          </div>
        </div>
      </RitualLayout>
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ritual Layout creates immersive platform-wide experiences that guide users through feature discovery and onboarding.'
      }
    }
  }
};

// =============================================================================
// LAYOUT COMPARISON
// =============================================================================

export const AllLayoutsComparison: Story = {
  name: 'All Layouts Overview',
  render: () => (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">
          HIVE Platform Layouts
        </h1>
        <p className="text-[var(--hive-text-muted)] max-w-2xl mx-auto">
          Five specialized layouts designed for HIVE's core platform sections, each optimized for specific user workflows and content types.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profile Layout Preview */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Profile Layout</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">Command center with bento grid</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="h-12 glass rounded-lg"></div>
            <div className="h-12 glass rounded-lg"></div>
            <div className="h-16 glass rounded-lg"></div>
            <div className="h-16 glass rounded-lg"></div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Calendar, tools, memberships, activity
          </div>
        </div>
        
        {/* Space Layout Preview */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-status-info)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Space Layout</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">6 universal surfaces</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-6 glass rounded w-full"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 glass rounded"></div>
              <div className="h-12 glass rounded"></div>
              <div className="h-12 glass rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 glass rounded"></div>
              <div className="h-8 glass rounded"></div>
              <div className="h-8 glass rounded"></div>
            </div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Pinned, posts, events, tools, chat, members
          </div>
        </div>
        
        {/* Feed Layout Preview */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-status-success)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Feed Layout</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">Campus pulse stream</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-6 glass rounded w-3/4"></div>
            <div className="h-4 glass rounded w-1/2"></div>
            <div className="h-12 glass rounded"></div>
            <div className="h-12 glass rounded"></div>
            <div className="h-8 glass rounded"></div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Tool-generated content with filters
          </div>
        </div>
        
        {/* HiveLAB Layout Preview */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-status-warning)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">HiveLAB Layout</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">Builder console</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="space-y-1">
              <div className="h-3 glass rounded"></div>
              <div className="h-3 glass rounded"></div>
              <div className="h-3 glass rounded"></div>
            </div>
            <div className="col-span-2 h-16 glass rounded"></div>
            <div className="space-y-1">
              <div className="h-3 glass rounded"></div>
              <div className="h-3 glass rounded"></div>
              <div className="h-3 glass rounded"></div>
            </div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Elements, canvas, properties, preview
          </div>
        </div>
        
        {/* Ritual Layout Preview */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Ritual Layout</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">Platform experiences</p>
            </div>
          </div>
          <div className="text-center space-y-2 mb-4">
            <div className="w-8 h-8 glass rounded-full mx-auto"></div>
            <div className="h-4 glass rounded w-3/4 mx-auto"></div>
            <div className="h-3 glass rounded w-1/2 mx-auto"></div>
            <div className="h-12 glass rounded mx-auto"></div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Immersive full-screen experiences
          </div>
        </div>
        
        {/* Utility Layouts */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--hive-text-muted)] rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Utility Layouts</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">Split, modal, responsive</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 glass rounded"></div>
              <div className="h-8 glass rounded"></div>
            </div>
            <div className="h-6 glass rounded w-2/3 mx-auto"></div>
            <div className="h-4 glass rounded w-1/3 mx-auto"></div>
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">
            Split panels, modals, responsive grids
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all HIVE platform layouts showing their distinctive structures and use cases.'
      }
    }
  }
};