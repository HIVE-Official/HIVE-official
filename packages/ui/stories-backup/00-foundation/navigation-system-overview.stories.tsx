import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavigationPreferences, NavigationStyle } from '../../atomic/atoms/navigation-preferences';

// Mock component for Storybook CSF compliance
const NavigationSystemOverview = () => <div>Navigation System Overview</div>;

const meta: Meta<typeof NavigationSystemOverview> = {
  title: '00-Foundation/Navigation System Overview',
  component: NavigationSystemOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Navigation System Overview

Complete implementation of the HIVE Shell Application Layout Options & Navigation Strategy specification.

## 🎯 Navigation Philosophy: Choice & Context

**Student Mental Model Remains the Same**:
- **Profile** = "My campus command center" 
- **Feed** = "What's happening around me"
- **Spaces** = "My communities" 
- **HiveLAB** = "Build solutions" (Builder-enabled users)

**Layout Choice Based On**:
- **Screen Size**: Larger screens can support sidebar
- **User Preference**: Some students prefer sidebar organization
- **Content Context**: Some sections benefit from persistent navigation

## 📐 Navigation Modes

### Mobile (<768px): Bottom Tabs (Enforced)
- Always uses bottom tabs regardless of user preference
- Optimized for thumb navigation
- Four main sections accessible with one tap

### Tablet (768px-1199px): Collapsible Drawer
- Drawer slides in/out as needed
- Preserves content space while maintaining navigation
- Touch-optimized interaction patterns

### Desktop (1200px-1440px): User Choice Applied
- **Tab Bar**: Clean horizontal navigation, maximum content space
- **Sidebar**: Persistent navigation with status indicators
- **Auto**: Automatically chooses based on screen size

### Wide Screen (>1440px): Sidebar Recommended
- Room for both navigation and content
- Power user features like sub-navigation
- Status indicators and quick actions

## 🎨 Design System Integration

### Components Created
- \`NavigationPreferences\` - Settings component for user choice
- \`useNavigationLayout\` - Hook for responsive behavior
- Enhanced shell system with adaptive layouts
- Status indicators and notification badges

### Responsive Breakpoints
- Mobile: <768px
- Tablet: 768px-1199px  
- Desktop: 1200px-1440px
- Wide: >1440px

## 🔄 Implementation Features

- **User Preference Persistence**: Choices saved to localStorage
- **Real-time Switching**: Layout updates immediately when preference changes
- **Responsive Adaptation**: Automatically adjusts to screen size changes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Builder Integration**: Enhanced features for HiveLAB users
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const SystemOverview: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                <div className="text-2xl font-bold text-[var(--hive-background-primary)]">#</div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
              HIVE Navigation System
            </h1>
            <p className="text-lg text-[var(--hive-text-secondary)] max-w-3xl mx-auto">
              Adaptive navigation that puts student choice first while ensuring optimal experience across all devices and contexts.
            </p>
          </div>

          {/* Four Pillars */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] text-center">
              Four-Pillar Navigation
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: 'Profile',
                  description: 'My campus command center',
                  icon: '👤',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  name: 'Feed', 
                  description: 'What\'s happening around me',
                  icon: '📰',
                  color: 'from-green-500 to-green-600'
                },
                {
                  name: 'Spaces',
                  description: 'My communities',
                  icon: '👥', 
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  name: 'HiveLAB',
                  description: 'Build solutions',
                  icon: '🔧',
                  color: 'from-yellow-500 to-yellow-600'
                }
              ].map((pillar) => (
                <div key={pillar.name} className="text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mx-auto text-2xl`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Layouts */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] text-center">
              Responsive Navigation Layouts
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Mobile',
                  breakpoint: '<768px',
                  layout: 'Bottom Tabs',
                  description: 'Enforced for optimal thumb navigation',
                  mockup: (
                    <div className="bg-[var(--hive-bg-secondary)] rounded-lg p-3 h-32 relative">
                      <div className="bg-[var(--hive-bg-tertiary)] rounded h-20"></div>
                      <div className="absolute bottom-1 left-1 right-1 h-8 bg-[var(--hive-brand-secondary)]/20 rounded flex justify-around items-center">
                        {Array.from({length: 4}, (_, i) => (
                          <div key={i} className="w-4 h-4 bg-[var(--hive-brand-secondary)] rounded"></div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  name: 'Tablet',
                  breakpoint: '768-1199px', 
                  layout: 'Drawer',
                  description: 'Collapsible for content focus',
                  mockup: (
                    <div className="bg-[var(--hive-bg-secondary)] rounded-lg p-3 h-32 flex">
                      <div className="w-8 bg-[var(--hive-brand-secondary)]/20 rounded mr-2"></div>
                      <div className="flex-1 bg-[var(--hive-bg-tertiary)] rounded"></div>
                    </div>
                  )
                },
                {
                  name: 'Desktop',
                  breakpoint: '1200-1440px',
                  layout: 'User Choice', 
                  description: 'Tab bar or sidebar preference',
                  mockup: (
                    <div className="bg-[var(--hive-bg-secondary)] rounded-lg p-3 h-32">
                      <div className="h-6 bg-[var(--hive-brand-secondary)]/20 rounded mb-2"></div>
                      <div className="bg-[var(--hive-bg-tertiary)] rounded h-20"></div>
                    </div>
                  )
                },
                {
                  name: 'Wide Screen',
                  breakpoint: '>1440px',
                  layout: 'Sidebar',
                  description: 'Recommended for power users',
                  mockup: (
                    <div className="bg-[var(--hive-bg-secondary)] rounded-lg p-3 h-32 flex">
                      <div className="w-12 bg-[var(--hive-brand-secondary)]/20 rounded mr-2"></div>
                      <div className="flex-1 bg-[var(--hive-bg-tertiary)] rounded"></div>
                    </div>
                  )
                }
              ].map((layout) => (
                <div key={layout.name} className="text-center space-y-4">
                  {layout.mockup}
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-primary)]">
                      {layout.name}
                    </h3>
                    <div className="text-xs text-[var(--hive-brand-secondary)] font-mono mb-1">
                      {layout.breakpoint}
                    </div>
                    <div className="font-medium text-sm text-[var(--hive-text-primary)] mb-1">
                      {layout.layout}
                    </div>
                    <p className="text-xs text-[var(--hive-text-secondary)]">
                      {layout.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Preferences */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] text-center">
              User Preference System
            </h2>
            
            <div className="max-w-md mx-auto">
              <NavigationPreferences
                value="auto"
                onChange={() => {}}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  name: 'Tab Bar',
                  subtitle: 'Clean & Simple',
                  description: 'Horizontal navigation that maximizes content space. Perfect for reading-heavy sections like Feed.',
                  bestFor: ['Clean experience', 'Maximum content', 'Quick switching']
                },
                {
                  name: 'Sidebar',
                  subtitle: 'Always Visible', 
                  description: 'Persistent navigation with status indicators. Ideal for power users who want constant section awareness.',
                  bestFor: ['Power users', 'Status awareness', 'Deep navigation']
                },
                {
                  name: 'Auto',
                  subtitle: 'Adapts to screen size',
                  description: 'Intelligent mode that chooses the best layout based on your screen size and usage context.',
                  bestFor: ['New users', 'Multi-device', 'Smart defaults']
                }
              ].map((option) => (
                <div key={option.name} className="p-6 bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-default)]">
                  <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
                    {option.name}
                  </h3>
                  <div className="text-sm text-[var(--hive-brand-secondary)] mb-3">
                    {option.subtitle}
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                    {option.description}
                  </p>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-[var(--hive-text-primary)]">
                      Best for:
                    </div>
                    {option.bestFor.map((item) => (
                      <div key={item} className="text-xs text-[var(--hive-text-tertiary)]">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] text-center">
              Implementation Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '💾',
                  title: 'Preference Persistence',
                  description: 'User choices saved to localStorage and synced across sessions'
                },
                {
                  icon: '⚡',
                  title: 'Real-time Switching',
                  description: 'Layout updates immediately when preferences or screen size changes'
                },
                {
                  icon: '📱',
                  title: 'Mobile-First Design',
                  description: 'Optimized touch targets and thumb-friendly navigation patterns'
                },
                {
                  icon: '🎯',
                  title: 'Status Indicators',
                  description: 'Notification badges, builder status, and activity indicators'
                },
                {
                  icon: '⌨️',
                  title: 'Keyboard Navigation',
                  description: 'Full keyboard support with shortcuts (⌘K, ⌘B, ⌘⇧N)'
                },
                {
                  icon: '♿',
                  title: 'Accessibility',
                  description: 'ARIA labels, focus management, and screen reader support'
                }
              ].map((feature) => (
                <div key={feature.title} className="p-6 bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-default)]">
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-default)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] text-center mb-6">
              Success Metrics
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">
                  Navigation Efficiency
                </h3>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Time to reach desired content</div>
                  <div>• Task completion success rates</div>
                  <div>• User satisfaction scores</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">
                  User Adoption
                </h3>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Preference selection rates</div>
                  <div>• Layout switching frequency</div>
                  <div>• Section engagement metrics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};