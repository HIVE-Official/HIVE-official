import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedAppShell } from '../../components/shell/enhanced-app-shell';

const meta: Meta = {
  title: '05-Shell/Shell System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Shell System

The HIVE Shell System provides a comprehensive application layout and navigation framework for the HIVE campus social utility platform. It consists of several interconnected components that work together to create a consistent, responsive, and feature-rich user experience.

## Core Components

### 🏗️ **EnhancedAppShell**
The main shell wrapper that integrates all navigation, notification, and layout systems. This is the primary component used in production.

### 🧭 **Navigation System**
- **NavigationHeader**: Top navigation bar with search, notifications, and user menu
- **NavigationSidebar**: Collapsible sidebar with platform sections and user context
- **UserMenu**: Dropdown menu with user actions and settings

### 🔔 **Notification System**
- **NotificationCenter**: Real-time notification panel
- **NotificationService**: State management for notifications

### 🎯 **Utility Components**
- **CommandPalette**: ⌘K quick navigation and search
- **BreadcrumbNavigation**: Context-aware page navigation
- **PageContainer**: Consistent page layout wrapper

### 📱 **Layout Components**
Specialized layouts for each platform section:
- **ProfileLayout**: Bento grid dashboard for personal command center
- **SpaceLayout**: 6-surface container layout for campus communities
- **FeedLayout**: Stream layout for campus activity feed
- **HiveLabLayout**: Builder workspace for tool creation
- **RitualLayout**: Full-screen experiences for onboarding and features

## Design System Integration

All shell components use consistent HIVE design tokens:
- **Colors**: \`--hive-background-*\`, \`--hive-text-*\`, \`--hive-brand-*\`
- **Typography**: Space Grotesk for headings, Inter for body text
- **Spacing**: 8px grid system with responsive breakpoints
- **Motion**: 90ms transitions with iOS-inspired spring curves

## Features

### ⌨️ **Keyboard Navigation**
- **⌘K**: Open command palette
- **⌘⇧N**: Open notifications
- **⌘B**: Toggle sidebar
- **Escape**: Close overlays

### 📱 **Responsive Design**
- Mobile-first approach with smart breakpoints
- Collapsible navigation for smaller screens
- Touch-optimized interactions
- Progressive enhancement

### 🎨 **Theme Support**
- Dark theme optimized design
- Glass morphism effects
- HIVE gold accent color
- High contrast accessibility options

## Usage Patterns

### Authentication-Aware Layout
\`\`\`tsx
<AppLayout>
  <PageContent />
</AppLayout>
\`\`\`

### Direct Shell Usage
\`\`\`tsx
<EnhancedAppShell user={user}>
  <PageContainer title="Page Title">
    <Content />
  </PageContainer>
</EnhancedAppShell>
\`\`\`

### Specialized Layouts
\`\`\`tsx
<ProfileLayout
  header={<ProfileHeader />}
  calendar={<Calendar />}
  tools={<PersonalTools />}
/>
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const mockUser = {
  id: '1',
  name: 'Jacob Smith',
  handle: 'jacob_smith',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  builderStatus: 'active' as const,
  role: 'student' as const,
};

export const FullShellDemo: Story = {
  render: () => (
    <EnhancedAppShell user={mockUser}>
      <div className="p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-hive-text-primary mb-4">
            HIVE Shell System
          </h1>
          <p className="text-xl text-hive-text-secondary mb-8">
            Complete application shell with navigation, notifications, and responsive design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">🧭 Navigation</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• Responsive sidebar navigation</li>
              <li>• Platform section routing</li>
              <li>• User context awareness</li>
              <li>• Mobile-optimized</li>
            </ul>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">⌨️ Command Palette</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• Press ⌘K to open</li>
              <li>• Quick navigation</li>
              <li>• Fuzzy search</li>
              <li>• Keyboard shortcuts</li>
            </ul>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">🔔 Notifications</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• Real-time updates</li>
              <li>• Unread badges</li>
              <li>• Categorized alerts</li>
              <li>• Mark as read/unread</li>
            </ul>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">📱 Responsive</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• Mobile-first design</li>
              <li>• Smart breakpoints</li>
              <li>• Touch optimization</li>
              <li>• Progressive enhancement</li>
            </ul>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">🎨 Design System</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• HIVE design tokens</li>
              <li>• Consistent spacing</li>
              <li>• Brand colors</li>
              <li>• Accessibility focused</li>
            </ul>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-3">🏗️ Layouts</h3>
            <ul className="text-hive-text-secondary text-sm space-y-1">
              <li>• Profile bento grid</li>
              <li>• Space 6-surface layout</li>
              <li>• Feed stream layout</li>
              <li>• HiveLab builder layout</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-hive-text-secondary">
            Try the interactive features: press <kbd className="px-2 py-1 bg-hive-background-tertiary rounded text-xs">⌘K</kbd> for command palette,
            click the notification bell, or toggle the sidebar.
          </p>
        </div>
      </div>
    </EnhancedAppShell>
  ),
};