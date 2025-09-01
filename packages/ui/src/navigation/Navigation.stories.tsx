/**
 * HIVE Navigation System - Complete Overview Stories
 * YC-Quality Documentation for the Entire Navigation System
 * 
 * Comprehensive documentation showing the complete adaptive navigation
 * system with all modes, responsive behavior, and integration examples.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { NavigationContainer } from './components/NavigationContainer';
import { MobileNavigation } from './components/MobileNavigation';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopTopbar } from './components/DesktopTopbar';
import { TabletDrawer, TabletDrawerTrigger } from './components/TabletDrawer';
import { createNavigationItems } from './core/data';
import { type NavigationUser } from './core/types';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUser: NavigationUser = {
  id: 'user-123',
  name: 'Alex Thompson',
  handle: 'alexthompson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  builderStatus: 'active',
  role: 'student',
  preferences: {
    layout: 'auto',
    sidebarCollapsed: false,
    enableKeyboardShortcuts: true,
    enableAnimations: true,
    theme: 'system'
  }
};

const createMockItems = (activeSection = 'feed') => {
  const items = createNavigationItems();
  return items.map(item => ({
    ...item,
    isActive: item.id === activeSection,
    badge: item.id === 'spaces' ? { type: 'notification' as const, count: 5 } : 
           item.id === 'feed' ? { type: 'status' as const, count: 12 } : undefined
  }));
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof ResponsiveShowcase> = {
  component: ResponsiveShowcase,
  title: 'Navigation/System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Navigation System

A complete adaptive navigation system built for HIVE's campus social platform.

## 🎯 System Overview

The HIVE Navigation System provides seamless navigation across all device sizes with four distinct modes:

- **📱 Mobile (< 768px)**: Bottom tab navigation with touch optimization
- **📋 Tablet (768-1199px)**: Slide-out drawer with swipe gestures  
- **🖥️ Desktop Sidebar (1200-1439px)**: Collapsible sidebar with power user features
- **🖥️ Desktop Topbar (≥ 1440px)**: Horizontal navigation with integrated search

## ✨ Key Features

### 🎨 **Brand Consistent**
- Perfect integration with HIVE design system
- Consistent color palette and typography
- Brand-aligned animations and interactions

### 📱 **Responsive Excellence**
- Automatic mode switching based on screen size
- Touch-optimized interfaces for mobile and tablet
- Desktop power user features and keyboard shortcuts

### ⚡ **Performance Optimized**
- Memoized calculations prevent unnecessary re-renders
- Smooth 60fps animations with Framer Motion
- Bundle-size optimized with tree-shaking support

### ♿ **Accessibility First**
- Complete ARIA label support
- Keyboard navigation for all interactions
- Screen reader compatibility
- High contrast focus indicators

### 👤 **User-Centric**
- Persistent user preferences
- Builder status integration
- Role-based navigation customization
- Notification badge system

## 🏗️ Architecture

### Core Components
- **NavigationContainer**: Master orchestrator component
- **useNavigationState**: Primary state management hook
- **Navigation Engine**: Responsive calculation system
- **Brand Data**: Centralized navigation items and theming

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1199px  
- **Desktop**: 1200px - 1439px
- **Wide**: ≥ 1440px

### Integration Points
- **Command Palette**: ⌘+K shortcut integration
- **Notification System**: Unified badge management
- **User System**: Profile and role integration
- **Routing**: Next.js router compatibility

## 📊 Usage Analytics

The system includes built-in analytics for:
- Navigation pattern tracking
- User preference analysis
- Performance monitoring
- Error reporting

## 🚀 Implementation

\`\`\`tsx
import { NavigationContainer } from '@hive/ui';

<NavigationContainer
  user={user}
  onOpenCommandPalette={() => setCommandPaletteOpen(true)}
  onOpenNotifications={() => setNotificationCenterOpen(true)}
  unreadNotificationCount={5}
>
  {/* Your app content */}
</NavigationContainer>
\`\`\`

## 🎮 Interactive Demo

Use the stories below to explore each navigation mode and see how the system
adapts to different screen sizes, user types, and interaction patterns.
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj;

// ============================================================================
// RESPONSIVE SHOWCASE COMPONENT
// ============================================================================

const ResponsiveShowcase = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  const items = createMockItems();

  const mockMobileDemo = (
    <div className="relative bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden" style={{ width: '320px', height: '568px' }}>
      <div className="p-4 pb-20 h-full overflow-auto">
        <h3 className="font-semibold mb-2">Mobile View</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4">Bottom tabs with touch optimization</p>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="bg-[var(--hive-bg-secondary)] p-3 mb-2 rounded-lg">
            <div className="text-sm">Content {i + 1}</div>
          </div>
        ))}
      </div>
      <MobileNavigation
        items={items}
        user={mockUser}
        onNavigate={action('mobile-navigate')}
      />
    </div>
  );

  const mockTabletDemo = (
    <div className="relative bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden" style={{ width: '768px', height: '1024px', transform: 'scale(0.4)', transformOrigin: 'top left' }}>
      <TabletDrawerTrigger onOpen={action('tablet-trigger')} />
      <div className="p-6 pl-16">
        <h3 className="font-semibold mb-2">Tablet View</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4">Slide-out drawer navigation</p>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-[var(--hive-bg-secondary)] p-4 rounded-lg">
              <div className="text-sm">Content {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const mockDesktopDemo = (
    <div className="relative bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden" style={{ width: '1200px', height: '800px', transform: 'scale(0.4)', transformOrigin: 'top left' }}>
      <div className="flex h-full">
        <DesktopSidebar
          items={items}
          user={mockUser}
          collapsed={false}
          onNavigate={action('desktop-navigate')}
          onToggleCollapse={action('toggle-sidebar')}
        />
        <div className="flex-1 p-8 ml-64">
          <h3 className="font-semibold mb-2">Desktop Sidebar</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">Collapsible sidebar navigation</p>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="bg-[var(--hive-bg-secondary)] p-4 rounded-lg">
                <div className="text-sm">Content {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const mockWideDemo = (
    <div className="relative bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden" style={{ width: '1440px', height: '900px', transform: 'scale(0.35)', transformOrigin: 'top left' }}>
      <DesktopTopbar
        items={items}
        user={mockUser}
        onNavigate={action('topbar-navigate')}
        onOpenCommandPalette={action('open-command-palette')}
        onOpenNotifications={action('open-notifications')}
        unreadNotificationCount={7}
      />
      <div className="pt-16 p-8">
        <h3 className="font-semibold mb-2">Desktop Topbar</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4">Horizontal navigation with search</p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="bg-[var(--hive-bg-secondary)] p-4 rounded-lg">
              <div className="text-sm">Content {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      padding: '2rem'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[var(--hive-brand-secondary)]">
            HIVE Navigation System
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] max-w-3xl mx-auto">
            Adaptive navigation that seamlessly transitions between devices and screen sizes,
            providing the perfect user experience at every breakpoint.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-lg">Mobile</h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">&lt; 768px</p>
            </div>
            <div className="space-y-2 text-sm">
              <div>• Bottom tabs</div>
              <div>• Touch optimized</div>
              <div>• 44px+ targets</div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-lg">Tablet</h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">768-1199px</p>
            </div>
            <div className="space-y-2 text-sm">
              <div>• Slide-out drawer</div>
              <div>• Swipe gestures</div>
              <div>• Rich content</div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl">🖥️</span>
              </div>
              <h3 className="font-semibold text-lg">Desktop</h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">1200-1439px</p>
            </div>
            <div className="space-y-2 text-sm">
              <div>• Collapsible sidebar</div>
              <div>• Keyboard shortcuts</div>
              <div>• Power user features</div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl">🖥️</span>
              </div>
              <h3 className="font-semibold text-lg">Wide</h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">&ge; 1440px</p>
            </div>
            <div className="space-y-2 text-sm">
              <div>• Horizontal topbar</div>
              <div>• Integrated search</div>
              <div>• Content focused</div>
            </div>
          </div>
        </div>

        {/* Demo Previews */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Navigation Previews</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-lg font-medium mb-4">Mobile Navigation</h3>
                {mockMobileDemo}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Tablet Navigation</h3>
                {mockTabletDemo}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-lg font-medium mb-4">Desktop Sidebar</h3>
              {mockDesktopDemo}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Desktop Topbar</h3>
              {mockWideDemo}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">System Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Responsive Design', desc: 'Automatically adapts to any screen size' },
              { icon: '⚡', title: 'Performance', desc: 'Optimized animations and minimal re-renders' },
              { icon: '♿', title: 'Accessible', desc: 'Full keyboard and screen reader support' },
              { icon: '🎨', title: 'Brand Consistent', desc: 'Perfect HIVE design system integration' },
              { icon: '👤', title: 'User-Centric', desc: 'Personalized based on role and preferences' },
              { icon: '🔧', title: 'Developer Friendly', desc: 'TypeScript support and clear APIs' }
            ].map((feature, i) => (
              <div key={i} className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--hive-text-secondary)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STORIES
// ============================================================================

export const SystemOverview: Story = {
  render: () => <ResponsiveShowcase />,
  parameters: {
    docs: {
      description: {
        story: `
Complete overview of the HIVE Navigation System showing all four navigation modes,
responsive behavior, and key features. This story demonstrates how the system
adapts to different screen sizes and provides consistent user experience.
        `
      }
    }
  }
};

export const FullIntegration: Story = {
  render: () => (
    <NavigationContainer
      user={mockUser}
      onOpenCommandPalette={action('open-command-palette')}
      onOpenNotifications={action('open-notifications')}
      unreadNotificationCount={8}
    >
      <div className="p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Full Integration Demo</h1>
          <p className="text-lg text-[var(--hive-text-secondary)] mb-8">
            This demonstrates the complete NavigationContainer integration. 
            Resize your browser window to see responsive behavior in action.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
                <h3 className="font-semibold mb-2">Feature Card {i + 1}</h3>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Sample content demonstrating how the navigation system integrates
                  with your application content seamlessly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NavigationContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Complete integration example showing how the NavigationContainer wraps your
application content and automatically provides the appropriate navigation
based on screen size. Resize the browser window to see the system adapt.
        `
      }
    }
  }
};