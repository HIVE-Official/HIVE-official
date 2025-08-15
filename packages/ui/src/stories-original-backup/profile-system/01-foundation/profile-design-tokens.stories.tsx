import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/01-Foundation/Profile Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design token system for the HIVE Profile components, ensuring consistent styling, spacing, and branding across all profile elements.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// PROFILE DESIGN TOKENS
// =========================

export const ColorSystem: Story = {
  name: '🎨 Profile Color System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile Color System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Comprehensive color palette designed for profile components, ensuring accessibility, 
            brand consistency, and optimal user experience across all profile interactions.
          </p>
        </div>

        {/* Brand Colors */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🏷️ Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Primary', class: 'bg-hive-brand-primary', hex: '#F59E0B', usage: 'Main actions, avatar borders, badges' },
              { name: 'Secondary', class: 'bg-hive-brand-secondary', hex: '#3B82F6', usage: 'Links, secondary actions, highlights' },
              { name: 'Accent', class: 'bg-hive-brand-accent', hex: '#8B5CF6', usage: 'Special features, premium elements' },
              { name: 'Neutral', class: 'bg-hive-brand-neutral', hex: '#6B7280', usage: 'Text, borders, subtle elements' }
            ].map(({ name, class: className, hex, usage }) => (
              <div key={name} className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
                <div className={`w-full h-20 ${className} rounded-lg mb-4`}></div>
                <h3 className="text-lg font-semibold text-hive-text-primary mb-2">{name}</h3>
                <p className="text-sm text-hive-text-secondary mb-2">{hex}</p>
                <p className="text-xs text-hive-text-tertiary">{usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status Colors */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📊 Status Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Success', class: 'bg-hive-status-success', hex: '#10B981', usage: 'Online status, completed actions' },
              { name: 'Warning', class: 'bg-hive-status-warning', hex: '#F59E0B', usage: 'Away status, attention needed' },
              { name: 'Error', class: 'bg-hive-status-error', hex: '#EF4444', usage: 'Offline status, error states' },
              { name: 'Info', class: 'bg-hive-status-info', hex: '#3B82F6', usage: 'Busy status, informational' }
            ].map(({ name, class: className, hex, usage }) => (
              <div key={name} className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
                <div className={`w-full h-20 ${className} rounded-lg mb-4`}></div>
                <h3 className="text-lg font-semibold text-hive-text-primary mb-2">{name}</h3>
                <p className="text-sm text-hive-text-secondary mb-2">{hex}</p>
                <p className="text-xs text-hive-text-tertiary">{usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background System */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🖼️ Background System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Primary', class: 'bg-hive-background-primary', description: 'Main page background' },
              { name: 'Secondary', class: 'bg-hive-background-secondary', description: 'Card and widget backgrounds' },
              { name: 'Tertiary', class: 'bg-hive-background-tertiary', description: 'Subtle highlights and dividers' }
            ].map(({ name, class: className, description }) => (
              <div key={name} className={`${className} border border-hive-border-default rounded-xl p-8`}>
                <div className="bg-hive-background-secondary border border-hive-border-default rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-hive-text-primary mb-2">{name}</h3>
                  <p className="text-sm text-hive-text-secondary">{description}</p>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-hive-text-primary/10 rounded"></div>
                  <div className="h-3 bg-hive-text-primary/5 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Hierarchy */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📝 Text Hierarchy</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-hive-text-primary text-3xl font-bold mb-2">Primary Text</h3>
                <p className="text-sm text-hive-text-secondary">Main headings, user names, important labels</p>
              </div>
              <div>
                <h3 className="text-hive-text-secondary text-xl font-semibold mb-2">Secondary Text</h3>
                <p className="text-sm text-hive-text-secondary">Subheadings, descriptions, body text</p>
              </div>
              <div>
                <h3 className="text-hive-text-tertiary text-lg mb-2">Tertiary Text</h3>
                <p className="text-sm text-hive-text-secondary">Captions, timestamps, subtle information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile-Specific Colors */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">👤 Profile-Specific Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Avatar Border', class: 'border-4 border-hive-brand-primary', bg: 'bg-gray-200', description: 'Active user avatar border' },
              { name: 'Status Online', class: 'bg-hive-status-success', description: 'Online presence indicator' },
              { name: 'Status Away', class: 'bg-hive-status-warning', description: 'Away presence indicator' },
              { name: 'Status Busy', class: 'bg-hive-status-error', description: 'Busy presence indicator' },
              { name: 'Badge Highlight', class: 'bg-hive-brand-accent', description: 'Achievement and role badges' },
              { name: 'Stat Emphasis', class: 'bg-hive-brand-secondary/10 text-hive-brand-secondary', description: 'Profile statistics highlight' }
            ].map(({ name, class: className, bg, description }) => (
              <div key={name} className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 ${bg || className} ${className.includes('border') ? 'bg-gray-200' : ''}`}>
                  {className.includes('text') && <div className="w-full h-full flex items-center justify-center text-sm font-bold">Aa</div>}
                </div>
                <h3 className="text-lg font-semibold text-hive-text-primary mb-2 text-center">{name}</h3>
                <p className="text-xs text-hive-text-secondary text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export const SpacingSystem: Story = {
  name: '📏 Profile Spacing System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile Spacing System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Consistent spacing system for profile components, ensuring visual harmony 
            and proper information hierarchy across all profile layouts.
          </p>
        </div>

        {/* Spacing Scale */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📐 Spacing Scale</h2>
          <div className="space-y-4">
            {[
              { name: 'xs', value: '0.25rem', px: '4px', usage: 'Badge padding, icon spacing' },
              { name: 'sm', value: '0.5rem', px: '8px', usage: 'Button padding, small gaps' },
              { name: 'md', value: '1rem', px: '16px', usage: 'Card padding, default spacing' },
              { name: 'lg', value: '1.5rem', px: '24px', usage: 'Section spacing, widget gaps' },
              { name: 'xl', value: '2rem', px: '32px', usage: 'Large section spacing' },
              { name: '2xl', value: '3rem', px: '48px', usage: 'Page-level spacing' }
            ].map(({ name, value, px, usage }) => (
              <div key={name} className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
                <div className="flex items-center gap-8">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-semibold text-hive-text-primary">{name}</span>
                      <span className="text-sm text-hive-text-secondary">{value}</span>
                      <span className="text-xs text-hive-text-tertiary">({px})</span>
                    </div>
                    <p className="text-sm text-hive-text-secondary">{usage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`bg-hive-brand-primary h-8`} style={{ width: value }}></div>
                    <span className="text-xs text-hive-text-tertiary">{value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Spacing Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🏗️ Component Spacing Examples</h2>
          
          {/* Avatar Card Example */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h3 className="text-xl font-semibold text-hive-text-primary mb-6">Avatar Card Spacing</h3>
            <div className="bg-white border-2 border-dashed border-hive-brand-primary/30 rounded-xl p-6 max-w-md">
              <div className="relative">
                {/* Spacing annotations */}
                <div className="absolute -top-3 left-6 right-6 h-0.5 bg-red-400"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-red-600 bg-white px-2">p-6 (24px)</div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-hive-brand-primary rounded-full"></div>
                    <div className="absolute -right-2 top-6 w-0.5 h-4 bg-blue-400"></div>
                    <div className="absolute -right-8 top-8 text-xs text-blue-600 bg-white px-1">gap-4</div>
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <div className="h-4 bg-hive-text-primary/20 rounded w-24 mb-1"></div>
                      <div className="absolute -right-2 top-0 w-0.5 h-1 bg-green-400"></div>
                      <div className="absolute -right-8 top-0 text-xs text-green-600 bg-white px-1">mb-1</div>
                    </div>
                    <div className="h-3 bg-hive-text-secondary/20 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget Grid Example */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h3 className="text-xl font-semibold text-hive-text-primary mb-6">Widget Grid Spacing</h3>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <div className="bg-white border-2 border-dashed border-hive-brand-primary/30 rounded-lg p-4 h-24"></div>
                <div className="bg-white border-2 border-dashed border-hive-brand-primary/30 rounded-lg p-4 h-24"></div>
                <div className="bg-white border-2 border-dashed border-hive-brand-primary/30 rounded-lg p-4 h-24"></div>
                <div className="bg-white border-2 border-dashed border-hive-brand-primary/30 rounded-lg p-4 h-24"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-red-400"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 text-xs text-red-600 bg-white px-2">gap-6 (24px)</div>
            </div>
          </div>
        </div>

        {/* Responsive Spacing */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📱 Responsive Spacing</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Mobile</h3>
                <div className="bg-white border border-hive-border-default rounded-lg p-4 space-y-3">
                  <div className="text-sm text-hive-text-secondary">
                    <div>Container: p-4 (16px)</div>
                    <div>Widget gap: gap-4 (16px)</div>
                    <div>Text spacing: space-y-2</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tablet</h3>
                <div className="bg-white border border-hive-border-default rounded-lg p-6 space-y-4">
                  <div className="text-sm text-hive-text-secondary">
                    <div>Container: p-6 (24px)</div>
                    <div>Widget gap: gap-6 (24px)</div>
                    <div>Text spacing: space-y-3</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Desktop</h3>
                <div className="bg-white border border-hive-border-default rounded-lg p-8 space-y-6">
                  <div className="text-sm text-hive-text-secondary">
                    <div>Container: p-8 (32px)</div>
                    <div>Widget gap: gap-8 (32px)</div>
                    <div>Text spacing: space-y-4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const TypographySystem: Story = {
  name: '✍️ Profile Typography System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile Typography System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Typography hierarchy designed specifically for profile components, 
            ensuring optimal readability and information hierarchy across all profile elements.
          </p>
        </div>

        {/* Typography Scale */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📝 Typography Scale</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8 space-y-8">
            {[
              { name: 'Profile Name', class: 'text-3xl font-bold text-hive-text-primary', usage: 'Main profile heading' },
              { name: 'Section Title', class: 'text-2xl font-semibold text-hive-text-primary', usage: 'Widget and section titles' },
              { name: 'Subsection', class: 'text-xl font-medium text-hive-text-primary', usage: 'Widget subheadings' },
              { name: 'Body Large', class: 'text-lg text-hive-text-secondary', usage: 'Profile bio, descriptions' },
              { name: 'Body Default', class: 'text-base text-hive-text-secondary', usage: 'Default body text' },
              { name: 'Body Small', class: 'text-sm text-hive-text-secondary', usage: 'Secondary information' },
              { name: 'Caption', class: 'text-xs text-hive-text-tertiary', usage: 'Timestamps, metadata' }
            ].map(({ name, class: className, usage }) => (
              <div key={name} className="flex items-baseline gap-8">
                <div className="min-w-0 flex-1">
                  <div className={className}>The quick brown fox jumps over the lazy dog</div>
                </div>
                <div className="min-w-0 flex-shrink-0 text-right">
                  <div className="text-sm font-medium text-hive-text-primary">{name}</div>
                  <div className="text-xs text-hive-text-secondary">{usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Component Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">👤 Profile Component Typography</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Avatar Card Typography */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-xl font-semibold text-hive-text-primary mb-4">Avatar Card</h3>
              <div className="bg-white rounded-lg p-6 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-hive-brand-primary rounded-full"></div>
                  <div>
                    <div className="text-xl font-bold text-hive-text-primary">Sarah Chen</div>
                    <div className="text-sm text-hive-text-secondary">@sarahc</div>
                    <div className="text-xs text-hive-text-tertiary">Computer Science • Class of 2025</div>
                  </div>
                </div>
                <div className="text-sm text-hive-text-secondary">
                  Building the future of student collaboration. Love React, coffee, and late-night coding sessions.
                </div>
              </div>
            </div>

            {/* Stats Card Typography */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-xl font-semibold text-hive-text-primary mb-4">Stats Card</h3>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="text-lg font-semibold text-hive-text-primary">Profile Statistics</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hive-brand-primary">47</div>
                    <div className="text-sm text-hive-text-secondary">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hive-brand-secondary">8</div>
                    <div className="text-sm text-hive-text-secondary">Spaces</div>
                  </div>
                </div>
                <div className="text-xs text-hive-text-tertiary">Last updated 2 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Considerations */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">♿ Accessibility Considerations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">📏 Size Guidelines</h3>
              <ul className="space-y-2 text-hive-text-secondary">
                <li>• Minimum font size: 14px (text-sm)</li>
                <li>• Optimal reading size: 16px (text-base)</li>
                <li>• Clear hierarchy with size jumps</li>
                <li>• Consistent line heights for readability</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">🎨 Contrast Guidelines</h3>
              <ul className="space-y-2 text-hive-text-secondary">
                <li>• Primary text: AAA contrast (7:1)</li>
                <li>• Secondary text: AA contrast (4.5:1)</li>
                <li>• Tertiary text: AA large contrast (3:1)</li>
                <li>• Interactive elements: Clear focus states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};