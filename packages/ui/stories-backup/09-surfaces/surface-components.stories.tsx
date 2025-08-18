import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveChatSurface, 
  HivePinnedSurface, 
  HiveToolsSurface, 
  HivePostsSurface, 
  HiveEventsSurface, 
  HiveMembersSurface 
} from '../../components';

// Create a wrapper component that showcases all surfaces
const SurfaceShowcase = ({ activeTab = 'posts' }: { activeTab?: string }) => {
  const [currentTab, setCurrentTab] = React.useState(activeTab);
  
  const tabs = [
    { id: 'posts', label: 'Posts', component: HivePostsSurface },
    { id: 'events', label: 'Events', component: HiveEventsSurface },
    { id: 'tools', label: 'Tools', component: HiveToolsSurface },
    { id: 'members', label: 'Members', component: HiveMembersSurface },
    { id: 'chat', label: 'Chat', component: HiveChatSurface },
    { id: 'pinned', label: 'Pinned', component: HivePinnedSurface }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === currentTab)?.component || HivePostsSurface;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-[var(--hive-background-primary)] rounded-xl border border-[var(--hive-border-primary)] overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]/50">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={cn(
                'px-4 py-3 text-sm font-medium whitespace-nowrap transition-all',
                currentTab === tab.id
                  ? 'text-[var(--hive-brand-primary)] border-b-2 border-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)]'
                  : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Surface Content */}
      <div className="h-96 overflow-hidden">
        <ActiveComponent />
      </div>
    </div>
  );
};

const meta: Meta<typeof SurfaceShowcase> = {
  title: '09-Surfaces/Surface Components',
  component: SurfaceShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE Surface Components - Campus Community Interfaces**

Interactive surface components that power HIVE's social-utility platform. Each surface provides specialized functionality for different aspects of campus community engagement.

## Surface Types

### 📝 Posts Surface
- Community discussions and announcements
- Rich text posts with media support
- Engagement tracking and interactions
- Academic and campus-specific content

### 📅 Events Surface  
- Campus event discovery and management
- RSVP tracking and attendance
- Integration with academic calendar
- Study sessions and social gatherings

### 🛠️ Tools Surface
- Tool marketplace and discovery
- Creator showcase and ratings
- Installation and usage tracking
- Campus-specific productivity tools

### 👥 Members Surface
- Community member management
- Role-based permissions and access
- Student and faculty directory
- Study group coordination

### 💬 Chat Surface
- Real-time messaging and collaboration
- Study session coordination
- Office hours and support channels
- Academic project discussions

### 📌 Pinned Surface
- Important announcements and resources
- Course materials and syllabi
- Campus notifications and deadlines
- Reference materials and guides

## Foundation Features
- **Mobile-First Design**: Optimized for smartphone and tablet interactions
- **Accessibility Built-In**: Full keyboard navigation and screen reader support
- **HIVE Motion System**: Smooth transitions and liquid metal interactions
- **Semantic Design Tokens**: Consistent with HIVE brand and campus themes

## Campus Context
All surfaces are designed specifically for university environments, supporting academic workflows, student collaboration, and campus community building.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['posts', 'events', 'tools', 'members', 'chat', 'pinned'],
      description: 'Active surface tab to display'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Import React for the component
import React from 'react';
import { cn } from '../../lib/utils';

export const Default: Story = {
  args: {
    activeTab: 'posts'
  }
};

export const Playground: Story = {
  args: {
    activeTab: 'tools'
  }
};

export const PostsSurface: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          CS Study Group Posts
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Community discussions, study resources, and course announcements
        </p>
      </div>
      <HivePostsSurface 
        spaceId="cs-study-group"
        showComposer={true}
        enableReactions={true}
      />
    </div>
  )
};

export const EventsSurface: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Events & Study Sessions
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Discover and join academic events, study groups, and campus activities
        </p>
      </div>
      <HiveEventsSurface 
        spaceId="cs-study-group"
        showCreateButton={true}
        viewMode="calendar"
      />
    </div>
  )
};

export const ToolsSurface: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Tool Marketplace
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Discover, install, and share productivity tools built by the campus community
        </p>
      </div>
      <HiveToolsSurface 
        spaceId="campus-tools"
        category="productivity"
        showInstallButtons={true}
        enableRatings={true}
      />
    </div>
  )
};

export const MembersSurface: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Study Group Members
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Connect with classmates, manage group roles, and coordinate study sessions
        </p>
      </div>
      <HiveMembersSurface 
        spaceId="cs-study-group"
        showInviteButton={true}
        groupByRole={true}
        enableDirectMessage={true}
      />
    </div>
  )
};

export const ChatSurface: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Study Group Chat
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Real-time messaging for study coordination and academic discussions
        </p>
      </div>
      <HiveChatSurface 
        spaceId="cs-study-group"
        enableFileSharing={true}
        showTypingIndicator={true}
        maxHeight="400px"
      />
    </div>
  )
};

export const PinnedSurface: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Pinned Resources
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Important course materials, announcements, and reference resources
        </p>
      </div>
      <HivePinnedSurface 
        spaceId="cs-study-group"
        allowReordering={true}
        showCategories={true}
        enableSearch={true}
      />
    </div>
  )
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile Surface Experience
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Touch-optimized surfaces for campus community engagement
        </p>
      </div>
      <SurfaceShowcase activeTab="posts" />
    </div>
  )
};

export const DashboardIntegration: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Community Activity
        </h3>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
          <HivePostsSurface 
            spaceId="dashboard-preview"
            compact={true}
            maxItems={3}
            showComposer={false}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Upcoming Events
        </h3>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
          <HiveEventsSurface 
            spaceId="dashboard-preview"
            compact={true}
            maxItems={3}
            viewMode="list"
            showCreateButton={false}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Popular Tools
        </h3>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
          <HiveToolsSurface 
            spaceId="dashboard-preview"
            compact={true}
            maxItems={3}
            sortBy="popularity"
            showInstallButtons={false}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Active Members
        </h3>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
          <HiveMembersSurface 
            spaceId="dashboard-preview"
            compact={true}
            maxItems={6}
            viewMode="grid"
            showInviteButton={false}
          />
        </div>
      </div>
    </div>
  )
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h3>
        <ul className="text-sm text-[var(--hive-text-secondary)] space-y-1">
          <li>• Full keyboard navigation with Tab and Arrow keys</li>
          <li>• Screen reader announcements for all interactions</li>
          <li>• High contrast mode support</li>
          <li>• Focus management for modal dialogs</li>
          <li>• ARIA labels and descriptions for all elements</li>
        </ul>
      </div>
      
      <SurfaceShowcase activeTab="members" />
      
      <div className="text-sm text-[var(--hive-text-secondary)]">
        Try navigating with keyboard only: Tab to move focus, Enter to activate, Escape to close dialogs
      </div>
    </div>
  )
};

export const AllSurfaces: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          HIVE Surface Component System
        </h2>
        <p className="text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
          Complete showcase of all surface components that power campus community engagement
        </p>
      </div>
      
      <SurfaceShowcase activeTab="posts" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            📝 Posts Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Community discussions, study resources, and course announcements
          </p>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            📅 Events Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Campus events, study sessions, and academic calendar integration
          </p>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            🛠️ Tools Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Campus tool marketplace with ratings and installation tracking
          </p>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            👥 Members Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Community management with role-based permissions and messaging
          </p>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            💬 Chat Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Real-time messaging for study coordination and collaboration
          </p>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
            📌 Pinned Surface
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            Important resources, announcements, and reference materials
          </p>
        </div>
      </div>
    </div>
  )
};