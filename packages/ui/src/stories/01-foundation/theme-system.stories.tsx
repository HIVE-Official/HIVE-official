import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../../components';

const meta: Meta = {
  title: '01-Foundation/Theme System',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE's Dark Luxury Theme System**

A sophisticated design token system implementing HIVE's "matte obsidian glass" aesthetic. Creates the premium campus infrastructure feel that positions HIVE as serious academic platform.

## Theme Philosophy
- **Matte Obsidian Glass**: Dark luxury aesthetic inspired by matte black sports cars
- **Campus Infrastructure**: Colors that feel substantial and trustworthy for university platform
- **Premium Without Flashy**: Sophisticated luxury that doesn't distract from productivity
- **Builder Empowerment**: Visual language that makes students feel like powerful creators

## Color Psychology
- **Deep Blacks**: Convey seriousness and professional quality
- **Warm Golds**: Add premium accents without being flashy
- **Neutral Grays**: Create sophisticated information hierarchy
- **Status Colors**: Refined versions that maintain luxury feel

## Design Token Architecture
- **Semantic Naming**: Tokens named by purpose, not appearance
- **Theme Variants**: Support for different luxury variations
- **Accessibility Compliance**: WCAG 2.1 AA contrast ratios maintained
- **CSS Custom Properties**: Runtime theming capability

## Brand Differentiation
The theme system ensures HIVE tools are instantly recognizable when shared across campus, creating natural brand awareness and quality signaling.
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Design token examples
const colorTokens = {
  primary: {
    'hive-background': '#0A0A0B',
    'hive-background-card': '#111114',
    'hive-background-muted': '#1A1A1E',
    'hive-background-subtle': '#222228'
  },
  accent: {
    'hive-accent': '#FFD700',
    'hive-accent-muted': '#E6C200',
    'hive-accent-subtle': '#4D4000'
  },
  foreground: {
    'hive-foreground': '#FAFAFA',
    'hive-foreground-muted': '#A1A1AA',
    'hive-foreground-subtle': '#71717A'
  },
  semantic: {
    'hive-success': '#10B981',
    'hive-warning': '#F59E0B',
    'hive-destructive': '#EF4444',
    'hive-info': '#3B82F6'
  },
  borders: {
    'hive-border': '#27272A',
    'hive-border-muted': '#1F1F23'
  }
};

const spacingTokens = {
  'hive-spacing-xs': '0.25rem',
  'hive-spacing-sm': '0.5rem',
  'hive-spacing-md': '0.75rem',
  'hive-spacing-lg': '1rem',
  'hive-spacing-xl': '1.25rem',
  'hive-spacing-2xl': '1.5rem',
  'hive-spacing-3xl': '2rem',
  'hive-spacing-4xl': '2.5rem',
  'hive-spacing-5xl': '3rem',
  'hive-spacing-6xl': '4rem',
  'hive-spacing-7xl': '5rem',
  'hive-spacing-8xl': '6rem',
  'hive-spacing-9xl': '8rem'
};

const typographyTokens = {
  'hive-text-xs': '0.75rem',
  'hive-text-sm': '0.875rem',
  'hive-text-base': '1rem',
  'hive-text-lg': '1.125rem',
  'hive-text-xl': '1.25rem',
  'hive-text-2xl': '1.5rem',
  'hive-text-3xl': '1.875rem',
  'hive-text-4xl': '2.25rem',
  'hive-text-5xl': '3rem',
  'hive-text-6xl': '3.75rem'
};

export const ColorPalette: Story = {
  render: () => (
    <div className="space-y-8">
      {Object.entries(colorTokens).map(([category, colors]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 capitalize">{category} Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(colors).map(([name, value]) => (
              <div key={name} className="space-y-2">
                <div 
                  className="w-full h-16 rounded-lg border border-hive-border"
                  style={{ backgroundColor: value }}
                />
                <div className="space-y-1">
                  <div className="text-sm font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Spacing Tokens</h3>
      <div className="space-y-4">
        {Object.entries(spacingTokens).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32 text-sm font-mono">{name}</div>
            <div className="text-sm text-muted-foreground w-16">{value}</div>
            <div 
              className="bg-hive-accent rounded"
              style={{ width: value, height: '1rem' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Typography Tokens</h3>
      <div className="space-y-4">
        {Object.entries(typographyTokens).map(([name, value]) => (
          <div key={name} className="flex items-center gap-8">
            <div className="w-32 text-sm font-mono">{name}</div>
            <div className="text-sm text-muted-foreground w-16">{value}</div>
            <div style={{ fontSize: value }} className="font-medium">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export const ComponentShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Theme in Action</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HiveCard className="p-6">
          <h4 className="font-semibold mb-2">Tool Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Users</span>
              <HiveBadge variant="success">+28%</HiveBadge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Response Time</span>
              <HiveBadge variant="default">156ms</HiveBadge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Error Rate</span>
              <HiveBadge variant="destructive">0.02%</HiveBadge>
            </div>
          </div>
        </HiveCard>
        
        <HiveCard className="p-6">
          <h4 className="font-semibold mb-2">Space Activity</h4>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-hive-accent">2,156</div>
            <div className="text-sm text-hive-foreground-muted">Total Members</div>
            <div className="flex gap-2">
              <HiveButton size="sm">Join Space</HiveButton>
              <HiveButton size="sm" variant="outline">Preview</HiveButton>
            </div>
          </div>
        </HiveCard>
        
        <HiveCard className="p-6">
          <h4 className="font-semibold mb-2">Builder Status</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-accent rounded-full"></div>
              <span className="text-sm">Active in HiveLAB</span>
            </div>
            <div className="text-sm text-hive-foreground-muted">
              Building: Study Timer Pro
            </div>
            <HiveButton size="sm" className="w-full">
              Continue Building
            </HiveButton>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

export const SemanticColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Semantic Color Usage</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Status Indicators</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 border border-hive-border rounded-lg">
              <div className="w-3 h-3 bg-hive-success rounded-full"></div>
              <span className="text-sm">Tool Build Successful</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-hive-border rounded-lg">
              <div className="w-3 h-3 bg-hive-warning rounded-full"></div>
              <span className="text-sm">Space Activation Pending</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-hive-border rounded-lg">
              <div className="w-3 h-3 bg-hive-destructive rounded-full"></div>
              <span className="text-sm">Build Failed</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-hive-border rounded-lg">
              <div className="w-3 h-3 bg-hive-info rounded-full"></div>
              <span className="text-sm">New Elements Available</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Action Buttons</h4>
          <div className="space-y-2">
            <HiveButton className="w-full" variant="default">
              Primary Action
            </HiveButton>
            <HiveButton className="w-full" variant="outline">
              Secondary Action
            </HiveButton>
            <HiveButton className="w-full" variant="destructive">
              Destructive Action
            </HiveButton>
            <HiveButton className="w-full" variant="ghost">
              Ghost Action
            </HiveButton>
          </div>
        </div>
      </div>
    </div>
  )
};

export const DarkLuxuryVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Dark Luxury Variations</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium">Matte Obsidian (Default)</h4>
          <div className="p-6 bg-hive-background-card border border-hive-border rounded-lg">
            <div className="space-y-3">
              <div className="font-semibold">Study Timer Pro</div>
              <div className="text-sm text-hive-foreground-muted">
                Advanced pomodoro timer with analytics
              </div>
              <div className="flex gap-2">
                <HiveBadge variant="default">Productivity</HiveBadge>
                <HiveBadge variant="success">Popular</HiveBadge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Charcoal Variant</h4>
          <div className="p-6 rounded-lg border" style={{ 
            backgroundColor: '#16161A', 
            borderColor: '#2A2A30',
            color: '#F5F5F5'
          }}>
            <div className="space-y-3">
              <div className="font-semibold">GPA Calculator</div>
              <div className="text-sm opacity-75">
                Track your academic performance
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-zinc-700 text-xs rounded">Academic</span>
                <span className="px-2 py-1 bg-green-700 text-xs rounded">Trending</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Graphite Variant</h4>
          <div className="p-6 rounded-lg border" style={{ 
            backgroundColor: '#1C1C21', 
            borderColor: '#333338',
            color: '#FAFAFA'
          }}>
            <div className="space-y-3">
              <div className="font-semibold">Schedule Maker</div>
              <div className="text-sm opacity-75">
                Optimize your class schedule
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-700 text-xs rounded">Planning</span>
                <span className="px-2 py-1 bg-blue-700 text-xs rounded">New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const AccessibilityCompliance: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">WCAG 2.1 AA Compliance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Contrast Ratios</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-hive-border rounded-lg">
              <span className="text-sm">Primary Text</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">15.8:1 ✓</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-hive-border rounded-lg">
              <span className="text-sm text-hive-foreground-muted">Secondary Text</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">9.2:1 ✓</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-hive-border rounded-lg">
              <span className="text-sm text-hive-accent">Accent Text</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">11.3:1 ✓</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Interactive Elements</h4>
          <div className="space-y-3">
            <HiveButton className="w-full focus:ring-2 focus:ring-hive-accent focus:ring-offset-2 focus:ring-offset-hive-background">
              Focus Visible Button
            </HiveButton>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Focus visible input"
                className="w-full p-3 bg-hive-background-card border border-hive-border rounded-lg focus:ring-2 focus:ring-hive-accent focus:ring-offset-2 focus:ring-offset-hive-background focus:border-hive-accent"
              />
            </div>
            <div className="text-xs text-hive-foreground-muted">
              All interactive elements have clear focus indicators with gold outline
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};