'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { HiveLogo, HiveButton, HiveCard, Badge } from '../../atomic/atoms';

const meta: Meta = {
  title: '00-System/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Design System - Built by students, for students. A comprehensive atomic design system with dark theme aesthetics and college-focused UX patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SystemOverview: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-hive-obsidian via-slate-950 to-hive-obsidian text-hive-platinum">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <HiveLogo variant="full" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-hive-gold to-yellow-400 bg-clip-text text-transparent">
            HIVE Design System
          </h1>
          <p className="text-xl text-hive-platinum/80 max-w-2xl mx-auto">
            Built by students, for students. A comprehensive atomic design system powering the campus social experience.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary">v2.0.0</Badge>
            <Badge variant="outline">70+ Components</Badge>
            <Badge variant="outline">Mobile-First</Badge>
          </div>
        </div>

        {/* Design Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <HiveCard className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-hive-gold">
              "Dorm Room Startup" Aesthetic
            </h3>
            <p className="text-hive-platinum/70">
              Approachable, scrappy, and authentic design that feels built by students who understand campus life.
            </p>
          </HiveCard>

          <HiveCard className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-hive-gold">
              Dark Theme First
            </h3>
            <p className="text-hive-platinum/70">
              Optimized for late-night study sessions and dorm room lighting conditions.
            </p>
          </HiveCard>

          <HiveCard className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-hive-gold">
              Mobile-First Campus Life
            </h3>
            <p className="text-hive-platinum/70">
              Every component designed for students walking between classes with their phones.
            </p>
          </HiveCard>
        </div>

        {/* Color Palette */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-20 bg-hive-obsidian rounded-lg mb-2 border border-hive-platinum/20"></div>
              <p className="text-sm font-medium">Obsidian</p>
              <p className="text-xs text-hive-platinum/60">#0F0F23</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-hive-gold rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Gold</p>
              <p className="text-xs text-hive-platinum/60">#FFD700</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-hive-platinum rounded-lg mb-2"></div>
              <p className="text-sm font-medium text-hive-obsidian">Platinum</p>
              <p className="text-xs text-slate-600">#E5E7EB</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-slate-800 rounded-lg mb-2 border border-hive-platinum/20"></div>
              <p className="text-sm font-medium">Slate</p>
              <p className="text-xs text-hive-platinum/60">#1E293B</p>
            </div>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Component Preview</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <HiveButton variant="default">Primary Action</HiveButton>
            <HiveButton variant="outline">Secondary</HiveButton>
            <HiveButton variant="ghost">Ghost</HiveButton>
            <HiveButton disabled>Disabled</HiveButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-hive-platinum/10">
            <div className="text-3xl font-bold text-hive-gold mb-2">70+</div>
            <div className="text-sm text-hive-platinum/70">Components</div>
          </div>
          <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-hive-platinum/10">
            <div className="text-3xl font-bold text-hive-gold mb-2">5</div>
            <div className="text-sm text-hive-platinum/70">Atomic Layers</div>
          </div>
          <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-hive-platinum/10">
            <div className="text-3xl font-bold text-hive-gold mb-2">100%</div>
            <div className="text-sm text-hive-platinum/70">TypeScript</div>
          </div>
          <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-hive-platinum/10">
            <div className="text-3xl font-bold text-hive-gold mb-2">12</div>
            <div className="text-sm text-hive-platinum/70">Design Tokens</div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-hive-platinum/70 mb-6 max-w-2xl mx-auto">
            Explore the atomic design system organized from smallest building blocks to complete features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <HiveButton size="lg">Browse Atoms</HiveButton>
            <HiveButton variant="outline" size="lg">View Molecules</HiveButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of the HIVE Design System showcasing the core aesthetic, color palette, and component philosophy.',
      },
    },
  },
};

export const DesignTokens: Story = {
  render: () => (
    <div className="p-8 bg-hive-obsidian text-hive-platinum min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-hive-gold">Design Tokens</h1>

      <div className="space-y-12">
        {/* Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Typography Scale</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-xs</span>
              <span className="text-xs">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-sm</span>
              <span className="text-sm">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-base</span>
              <span className="text-base">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-lg</span>
              <span className="text-lg">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-xl</span>
              <span className="text-xl">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-hive-platinum/60 w-16">text-2xl</span>
              <span className="text-2xl">The quick brown fox jumps over the lazy dog</span>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Spacing Scale</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-hive-platinum/60 w-12">
                  {size}
                </span>
                <div
                  className="bg-hive-gold h-4"
                  style={{ width: `${size * 4}px` }}
                />
                <span className="text-xs text-hive-platinum/60">
                  {size * 4}px
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Border Radius</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'none', value: '0px' },
              { name: 'sm', value: '2px' },
              { name: 'md', value: '6px' },
              { name: 'lg', value: '8px' },
              { name: 'xl', value: '12px' },
              { name: 'full', value: '9999px' },
            ].map((radius) => (
              <div key={radius.name} className="text-center">
                <div
                  className="w-16 h-16 bg-hive-gold mb-2"
                  style={{ borderRadius: radius.value }}
                />
                <p className="text-xs font-mono">{radius.name}</p>
                <p className="text-xs text-hive-platinum/60">{radius.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
};