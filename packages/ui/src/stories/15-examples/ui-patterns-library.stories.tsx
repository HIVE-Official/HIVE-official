import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveButton, HiveCard, HiveInput, HiveBadge } from '../../components';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Skeleton } from '../../components/ui/skeleton';

const meta: Meta = {
  title: '15-Examples/UI Patterns Library',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Common UI patterns and compositions for the HIVE ecosystem**

Reusable UI patterns that demonstrate how HIVE components work together to create cohesive user experiences. These patterns follow HIVE's specialized design for campus infrastructure.

## Pattern Categories
- **Empty States**: When there's no content to display
- **Loading States**: While content is being fetched
- **Error States**: When something goes wrong
- **Success States**: Confirming completed actions
- **Data Display**: Showing information and metrics
- **Interactive Lists**: Collections with actions
- **Content Layouts**: Organizing different types of content

## Design Principles
- **Campus Infrastructure Feel**: Every pattern reinforces HIVE's positioning as serious campus infrastructure
- **Builder-Empowering**: Patterns make students feel like powerful creators, not passive users
- **Tool-First Approach**: All patterns support the Tool-driven nature of the platform
- **Magnetic Interactions**: Consistent liquid metal motion across all patterns

## Accessibility
- WCAG 2.1 AA compliant patterns
- Screen reader friendly structures
- Keyboard navigation support
- Clear visual hierarchy and focus management
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Library Empty State</h3>
        <HiveCard className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-hive-background-muted flex items-center justify-center mb-4">
            <span className="text-3xl">🔧</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">No Tools Yet</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            Start building your first tool in HiveLAB. Create calculators, timers, study aids, and more to share with your Space.
          </p>
          <div className="flex justify-center gap-3">
            <HiveButton>Open HiveLAB</HiveButton>
            <HiveButton variant="outline">Browse Templates</HiveButton>
          </div>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Space Members Empty State</h3>
        <HiveCard className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-hive-background-muted flex items-center justify-center mb-4">
            <span className="text-3xl">👥</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">Be the First to Join</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            This Space is waiting for its first members. Join to start building tools and sharing knowledge.
          </p>
          <HiveButton>Join Space</HiveButton>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Search Results Empty State</h3>
        <HiveCard className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-hive-background-muted flex items-center justify-center mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">No Tools Found</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            We couldn't find any tools matching "advanced calculator". Try a different search or create this tool yourself.
          </p>
          <div className="flex justify-center gap-3">
            <HiveButton>Create This Tool</HiveButton>
            <HiveButton variant="outline">Clear Search</HiveButton>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Card Loading</h3>
        <HiveCard className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Content List Loading</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <HiveCard key={i} className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            </HiveCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Page Loading with Spinner</h3>
        <HiveCard className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full border-4 border-hive-background-muted border-t-hive-accent animate-spin mb-4"></div>
          <h4 className="text-lg font-semibold text-hive-foreground mb-2">Loading Your Tools</h4>
          <p className="text-hive-foreground-muted">Fetching your latest creations from HiveLAB...</p>
        </HiveCard>
      </div>
    </div>
  )
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Network Error</h3>
        <HiveCard className="text-center py-12 border-destructive/20">
          <div className="mx-auto w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">Connection Lost</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            Unable to connect to HIVE servers. Please check your internet connection and try again.
          </p>
          <div className="flex justify-center gap-3">
            <HiveButton variant="destructive">Try Again</HiveButton>
            <HiveButton variant="outline">Go Offline</HiveButton>
          </div>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Access Denied</h3>
        <HiveCard className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-hive-background-muted flex items-center justify-center mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">Private Space</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            This Space is private and requires an invitation to join. Contact the Space Builder for access.
          </p>
          <div className="flex justify-center gap-3">
            <HiveButton>Request Access</HiveButton>
            <HiveButton variant="outline">Browse Public Spaces</HiveButton>
          </div>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Build Failed</h3>
        <HiveCard className="p-6 border-destructive/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">❌</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-hive-foreground mb-1">Build Failed</h4>
              <p className="text-hive-foreground-muted text-sm mb-3">
                Your tool couldn't be built due to incompatible Elements. Check the Element combinations and try again.
              </p>
              <div className="flex gap-2">
                <HiveButton size="sm" variant="destructive">Fix Issues</HiveButton>
                <HiveButton size="sm" variant="outline">View Logs</HiveButton>
              </div>
            </div>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

export const SuccessStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Created Successfully</h3>
        <HiveCard className="p-6 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✅</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-hive-foreground mb-1">Tool Created!</h4>
              <p className="text-hive-foreground-muted text-sm mb-3">
                Your "Study Timer Pro" tool is now live and ready to be used by your Space community.
              </p>
              <div className="flex gap-2">
                <HiveButton size="sm">View Tool</HiveButton>
                <HiveButton size="sm" variant="outline">Share with Space</HiveButton>
              </div>
            </div>
          </div>
        </HiveCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Space Activation Complete</h3>
        <HiveCard className="text-center py-12 border-green-200">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h4 className="text-xl font-semibold text-hive-foreground mb-2">Space Activated!</h4>
          <p className="text-hive-foreground-muted mb-6 max-w-md mx-auto">
            Your Computer Science Space is now live. Students can join and start building tools together.
          </p>
          <div className="flex justify-center gap-3">
            <HiveButton>Enter Space</HiveButton>
            <HiveButton variant="outline">Invite Members</HiveButton>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

export const DataDisplayPatterns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Metrics Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HiveCard className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-accent mb-1">156</div>
            <div className="text-sm text-hive-foreground-muted mb-2">Tools Created</div>
            <HiveBadge variant="success">+28% this week</HiveBadge>
          </HiveCard>
          <HiveCard className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-accent mb-1">2.1k</div>
            <div className="text-sm text-hive-foreground-muted mb-2">Space Members</div>
            <HiveBadge variant="default">+156 this month</HiveBadge>
          </HiveCard>
          <HiveCard className="p-6 text-center">
            <div className="text-3xl font-bold text-hive-accent mb-1">89</div>
            <div className="text-sm text-hive-foreground-muted mb-2">Active Today</div>
            <HiveBadge variant="warning">Peak hours</HiveBadge>
          </HiveCard>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Performance List</h3>
        <HiveCard>
          <div className="p-4 border-b border-hive-border">
            <h4 className="font-semibold text-hive-foreground">Top Performing Tools</h4>
            <p className="text-sm text-hive-foreground-muted">Most used tools this week</p>
          </div>
          {[
            { name: 'Study Timer Pro', uses: 342, rating: 4.9, trend: '+12%' },
            { name: 'GPA Calculator', uses: 289, rating: 4.7, trend: '+8%' },
            { name: 'Schedule Maker', uses: 156, rating: 4.8, trend: '+15%' },
            { name: 'Note Sync', uses: 134, rating: 4.6, trend: '+3%' }
          ].map((tool, i) => (
            <div key={i} className="p-4 border-b border-hive-border last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-hive-background-muted flex items-center justify-center">
                    <span className="text-sm">🔧</span>
                  </div>
                  <div>
                    <div className="font-medium text-hive-foreground">{tool.name}</div>
                    <div className="text-sm text-hive-foreground-muted">{tool.uses} uses • ⭐ {tool.rating}</div>
                  </div>
                </div>
                <HiveBadge variant="success">{tool.trend}</HiveBadge>
              </div>
            </div>
          ))}
        </HiveCard>
      </div>
    </div>
  )
};

export const InteractiveListPatterns: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    
    const toggleSelection = (id: number) => {
      setSelectedItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    const tools = [
      { id: 1, name: 'Study Timer', author: 'Sarah Chen', status: 'published' },
      { id: 2, name: 'Grade Tracker', author: 'Mike Johnson', status: 'draft' },
      { id: 3, name: 'Schedule Helper', author: 'Alex Kim', status: 'published' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Selectable Tool List</h3>
          <HiveCard>
            <div className="p-4 border-b border-hive-border">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-hive-foreground">My Tools</h4>
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-hive-foreground-muted">
                      {selectedItems.length} selected
                    </span>
                    <HiveButton size="sm" variant="outline">Delete</HiveButton>
                    <HiveButton size="sm">Share</HiveButton>
                  </div>
                )}
              </div>
            </div>
            {tools.map((tool) => (
              <div key={tool.id} className="p-4 border-b border-hive-border last:border-b-0 hover:bg-hive-background-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(tool.id)}
                    onChange={() => toggleSelection(tool.id)}
                    className="rounded border-gray-300 text-hive-accent focus:ring-hive-accent"
                  />
                  <div className="w-10 h-10 rounded-lg bg-hive-background-muted flex items-center justify-center">
                    <span>🔧</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-hive-foreground">{tool.name}</div>
                    <div className="text-sm text-hive-foreground-muted">by {tool.author}</div>
                  </div>
                  <HiveBadge variant={tool.status === 'published' ? 'success' : 'warning'}>
                    {tool.status}
                  </HiveBadge>
                  <HiveButton size="sm" variant="ghost">Edit</HiveButton>
                </div>
              </div>
            ))}
          </HiveCard>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Notification List</h3>
          <HiveCard>
            {[
              { type: 'tool', message: 'Your tool "Study Timer" has 5 new users', time: '2 min ago', unread: true },
              { type: 'space', message: 'New member joined Computer Science Space', time: '1 hour ago', unread: true },
              { type: 'system', message: 'Weekly Element drop: 3 new Elements available', time: '1 day ago', unread: false },
            ].map((notification, i) => (
              <div key={i} className={`p-4 border-b border-hive-border last:border-b-0 ${notification.unread ? 'bg-hive-accent/5' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-hive-accent' : 'bg-transparent'}`} />
                  <div className="flex-1">
                    <p className="text-hive-foreground text-sm">{notification.message}</p>
                    <p className="text-hive-foreground-muted text-xs mt-1">{notification.time}</p>
                  </div>
                  <HiveButton size="sm" variant="ghost">Mark Read</HiveButton>
                </div>
              </div>
            ))}
          </HiveCard>
        </div>
      </div>
    );
  }
};

export const SearchAndFilterPatterns: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Tool Discovery Interface</h3>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <HiveInput
                placeholder="Search tools, creators, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'productivity', 'study', 'social', 'utilities'].map((filter) => (
                <HiveButton
                  key={filter}
                  size="sm"
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </HiveButton>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Study Timer Pro', category: 'productivity', users: '2.1k', rating: 4.9 },
              { name: 'GPA Calculator', category: 'study', users: '1.8k', rating: 4.7 },
              { name: 'Room Finder', category: 'utilities', users: '956', rating: 4.5 },
            ].map((tool, i) => (
              <HiveCard key={i} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg bg-hive-background-muted flex items-center justify-center">
                    <span className="text-xl">🔧</span>
                  </div>
                  <HiveBadge variant="secondary">{tool.category}</HiveBadge>
                </div>
                <h4 className="font-semibold text-hive-foreground mb-1">{tool.name}</h4>
                <p className="text-sm text-hive-foreground-muted mb-3">
                  {tool.users} users • ⭐ {tool.rating}
                </p>
                <div className="flex gap-2">
                  <HiveButton size="sm" className="flex-1">Use Tool</HiveButton>
                  <HiveButton size="sm" variant="outline">Fork</HiveButton>
                </div>
              </HiveCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
};