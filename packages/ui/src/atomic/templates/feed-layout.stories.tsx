import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '04-Feed/FeedLayout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**SKELETON TEMPLATE** - Complete feed page layout with navigation, main feed, and suggestions sidebar. ' +
          'Shows desktop 3-column and mobile single-column layouts. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const FeedLayoutSkeleton = ({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      {variant === 'desktop' ? (
        // Desktop 3-column layout
        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <div className="w-60 h-screen sticky top-0 border-r border-[var(--hive-border-default)] p-4">
            <div className="space-y-4">
              <div className="text-2xl font-bold mb-6">HIVE</div>
              <div className="space-y-2">
                <div className="p-2 bg-[var(--hive-surface-secondary)] rounded">Feed</div>
                <div className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded">Spaces</div>
                <div className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded">Profile</div>
                <div className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded">HiveLab</div>
                <div className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded">Rituals</div>
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--hive-border-default)]">
                <p className="text-sm font-semibold mb-2">Your Spaces</p>
                <div className="space-y-1 text-sm">
                  <div className="p-1 hover:bg-[var(--hive-surface-secondary)] rounded">CS Department</div>
                  <div className="p-1 hover:bg-[var(--hive-surface-secondary)] rounded">Study Group</div>
                  <div className="p-1 hover:bg-[var(--hive-surface-secondary)] rounded">Campus News</div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg font-semibold">
                + Create
              </button>
            </div>
          </div>

          {/* Main Feed Area */}
          <div className="flex-1 max-w-[600px] mx-auto border-x border-[var(--hive-border-default)]">
            {/* Feed Composer */}
            <div className="p-4 border-b border-[var(--hive-border-default)] sticky top-0 bg-[var(--hive-background-primary)] z-10">
              <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)]" />
                  <input
                    type="text"
                    placeholder="What's happening?"
                    className="flex-1 bg-transparent border-none outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="p-2">📷</button>
                    <button className="p-2">🎥</button>
                    <button className="p-2">🔗</button>
                    <button className="p-2">📅</button>
                  </div>
                  <button className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg">
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="border-b border-[var(--hive-border-default)] flex">
              <button className="flex-1 py-3 border-b-2 border-[var(--hive-brand-primary)] font-semibold">
                Following
              </button>
              <button className="flex-1 py-3 text-[var(--hive-text-secondary)]">
                All
              </button>
            </div>

            {/* Feed Posts */}
            <div className="divide-y divide-[var(--hive-border-default)]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)]" />
                    <div>
                      <p className="font-semibold">User Name</p>
                      <p className="text-sm text-[var(--hive-text-secondary)]">@username · 2h ago</p>
                    </div>
                  </div>
                  <p className="mb-3">This is a placeholder post in the feed...</p>
                  <div className="flex gap-4 text-sm text-[var(--hive-text-secondary)]">
                    <button>❤️ 24</button>
                    <button>💬 5</button>
                    <button>🔄 2</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="w-80 h-screen sticky top-0 p-4">
            <div className="space-y-4">
              <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                <h3 className="font-semibold mb-3">Trending Topics</h3>
                <div className="space-y-2 text-sm">
                  <div>#CampusLife · 234 posts</div>
                  <div>#StudyTips · 156 posts</div>
                  <div>#UBEvents · 89 posts</div>
                </div>
              </div>

              <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                <h3 className="font-semibold mb-3">Suggested Spaces</h3>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-10 h-10 rounded bg-[var(--hive-surface-secondary)]" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Space Name</p>
                        <p className="text-xs text-[var(--hive-text-secondary)]">234 members</p>
                      </div>
                      <button className="px-3 py-1 text-xs bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--hive-surface-primary)] border border-[var(--hive-border-default)] rounded-lg p-4">
                <h3 className="font-semibold mb-3">Active Rituals</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>🔥</span>
                    <span>Study Streak Challenge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💪</span>
                    <span>Fitness Month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Mobile single column layout
        <div className="flex flex-col min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)] p-4 z-20">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">HIVE</div>
              <button>👤</button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="sticky top-[57px] bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)] flex z-10">
            <button className="flex-1 py-3 border-b-2 border-[var(--hive-brand-primary)] font-semibold">
              Following
            </button>
            <button className="flex-1 py-3 text-[var(--hive-text-secondary)]">
              All
            </button>
          </div>

          {/* Feed Posts */}
          <div className="flex-1 divide-y divide-[var(--hive-border-default)]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)]" />
                  <div>
                    <p className="font-semibold">User Name</p>
                    <p className="text-sm text-[var(--hive-text-secondary)]">@username · 2h ago</p>
                  </div>
                </div>
                <p className="mb-3">Mobile post content...</p>
                <div className="flex gap-4 text-sm text-[var(--hive-text-secondary)]">
                  <button>❤️ 24</button>
                  <button>💬 5</button>
                  <button>🔄 2</button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="sticky bottom-0 bg-[var(--hive-background-primary)] border-t border-[var(--hive-border-default)] flex justify-around py-3">
            <button className="flex flex-col items-center">
              <span className="text-xl">🏠</span>
              <span className="text-xs">Feed</span>
            </button>
            <button className="flex flex-col items-center text-[var(--hive-text-secondary)]">
              <span className="text-xl">🔍</span>
              <span className="text-xs">Explore</span>
            </button>
            <button className="flex flex-col items-center text-[var(--hive-text-secondary)]">
              <span className="text-xl">➕</span>
              <span className="text-xs">Create</span>
            </button>
            <button className="flex flex-col items-center text-[var(--hive-text-secondary)]">
              <span className="text-xl">🔔</span>
              <span className="text-xs">Alerts</span>
            </button>
            <button className="flex flex-col items-center text-[var(--hive-text-secondary)]">
              <span className="text-xl">👤</span>
              <span className="text-xs">Profile</span>
            </button>
          </div>

          {/* Floating Action Button */}
          <button className="fixed bottom-20 right-4 w-14 h-14 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-full shadow-lg text-2xl flex items-center justify-center">
            ✏️
          </button>
        </div>
      )}

      {/* Skeleton Warning */}
      <div className="fixed bottom-4 left-4 p-3 bg-[var(--hive-surface-tertiary)] border border-[var(--hive-border-default)] rounded-lg text-xs max-w-xs">
        ⚠️ SKELETON TEMPLATE: Complete feed layout structure. Actual UI/UX to be designed in Storybook review.
      </div>
    </div>
  );
};

export const DesktopLayout: Story = {
  render: () => <FeedLayoutSkeleton variant="desktop" />,
};

export const MobileLayout: Story = {
  render: () => <FeedLayoutSkeleton variant="mobile" />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletLayout: Story = {
  render: () => <FeedLayoutSkeleton variant="desktop" />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
