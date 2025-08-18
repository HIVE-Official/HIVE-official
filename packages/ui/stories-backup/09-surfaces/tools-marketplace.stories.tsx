import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToolMarketplace, LiveToolRuntime } from '../../components/tools-marketplace-stub';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { Star, Download, Eye, Users, Clock, Zap } from 'lucide-react';

/**
 * # ToolMarketplace - Campus Tool Discovery Hub
 * 
 * The ToolMarketplace is the central hub for discovering, installing, and managing
 * campus tools built by the HIVE community. It combines social discovery with practical utility.
 * 
 * ## Social Media Features
 * - Tool discovery and recommendations
 * - Community ratings and reviews
 * - Tool sharing and collaboration
 * - Creator profiles and showcases
 * 
 * ## Utility Features  
 * - Tool installation and management
 * - Category filtering and search
 * - Live tool runtime environment
 * - Tool creation workflows
 * 
 * ## Campus Integration
 * Designed for social tool discovery that makes campus utilities
 * discoverable, shareable, and community-driven.
 */

const mockTools = [
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator Pro',
    description: 'Calculate your GPA with course weights and credit hours',
    creator: 'Sarah Chen',
    rating: 4.8,
    downloads: 1240,
    category: 'academic',
    tags: ['grades', 'planning', 'calculator'],
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'dorm-laundry',
    name: 'Dorm Laundry Tracker',
    description: 'Track laundry machine availability in real-time',
    creator: 'Mike Rodriguez', 
    rating: 4.6,
    downloads: 892,
    category: 'residential',
    tags: ['dorm', 'utilities', 'tracker'],
    featured: false,
    createdAt: '2024-02-03'
  },
  {
    id: 'study-buddy',
    name: 'Study Buddy Finder',
    description: 'Find study partners for your courses',
    creator: 'Alex Kim',
    rating: 4.9,
    downloads: 2150,
    category: 'social',
    tags: ['study', 'social', 'matching'],
    featured: true,
    createdAt: '2024-01-28'
  },
  {
    id: 'meal-planner',
    name: 'Campus Meal Planner',
    description: 'Plan your dining hall visits and track meal swipes',
    creator: 'Emma Johnson',
    rating: 4.4,
    downloads: 678,
    category: 'dining',
    tags: ['food', 'planning', 'budget'],
    featured: false,
    createdAt: '2024-02-10'
  }
];

const meta: Meta<typeof ToolMarketplace> = {
  title: '09-Surfaces/ToolMarketplace',
  component: ToolMarketplace,
  parameters: {
    docs: {
      description: {
        component: `
# ToolMarketplace - Campus Tool Discovery

This surface component provides comprehensive tool discovery and management:

## Social Media Integration
- Tool discovery and recommendations
- Community ratings and reviews
- Creator profiles and showcases
- Social sharing and collaboration

## Campus Utility Features
- Tool installation and management
- Category filtering and search
- Live tool runtime environment
- Tool creation workflows

## Technical Features
- Real-time tool loading
- Community-driven curation
- Installation tracking
- Creator analytics
        `
      }
    },
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-4">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Marketplace stub
export const Default: Story = {
  args: {}
};

// 2. TOOL GRID MOCKUP STORY - What the marketplace will look like
export const ToolGridMockup: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          HIVE Tool Marketplace
        </h1>
        <p className="text-[var(--hive-text-secondary)]">
          Discover and install tools built by the campus community
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <HiveBadge variant="active-tag">All Tools</HiveBadge>
        <HiveBadge variant="skill-tag">Academic</HiveBadge>
        <HiveBadge variant="skill-tag">Residential</HiveBadge>
        <HiveBadge variant="skill-tag">Social</HiveBadge>
        <HiveBadge variant="skill-tag">Dining</HiveBadge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockTools.map((tool) => (
          <HiveCard key={tool.id} variant="elevated" className="group hover:scale-105 transition-transform">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-secondary)] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                {tool.featured && (
                  <HiveBadge variant="deans-list" size="sm" className="ml-2">
                    <Star className="h-3 w-3" />
                  </HiveBadge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-[var(--hive-brand-secondary)]" />
                  {tool.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {tool.downloads}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--hive-text-tertiary)]">
                  by {tool.creator}
                </span>
                <HiveBadge variant="skill-tag" size="sm">
                  {tool.category}
                </HiveBadge>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-1.5 bg-[var(--hive-brand-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--hive-brand-hover)] transition-colors">
                  Install
                </button>
                <button className="px-3 py-1.5 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] text-sm rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </HiveCard>
        ))}
      </div>
    </div>
  )
};

// 3. FEATURED TOOLS STORY - Highlighted community tools
export const FeaturedTools: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Featured Campus Tools
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Top-rated tools by the HIVE community
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTools.filter(tool => tool.featured).map((tool) => (
          <HiveCard key={tool.id} variant="premium" className="group">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                      {tool.name}
                    </h3>
                    <HiveBadge variant="deans-list" size="sm">
                      <Star className="h-3 w-3" />
                      Featured
                    </HiveBadge>
                  </div>
                  <p className="text-[var(--hive-text-secondary)]">
                    {tool.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-[var(--hive-brand-secondary)]">
                  <Star className="h-4 w-4 fill-current" />
                  {tool.rating} rating
                </div>
                <div className="flex items-center gap-1 text-[var(--hive-text-secondary)]">
                  <Download className="h-4 w-4" />
                  {tool.downloads.toLocaleString()} downloads
                </div>
                <div className="flex items-center gap-1 text-[var(--hive-text-secondary)]">
                  <Users className="h-4 w-4" />
                  {tool.creator}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[var(--hive-brand-primary)] text-white font-medium rounded-lg hover:bg-[var(--hive-brand-hover)] transition-colors">
                  Install Tool
                </button>
                <button className="px-4 py-2 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </HiveCard>
        ))}
      </div>
    </div>
  )
};

// 4. LIVE TOOL RUNTIME STORY - Tool execution environment
export const LiveToolRuntime: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Live Tool Runtime
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Execute tools in a secure sandbox environment
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HiveCard variant="elevated">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--hive-text-primary)]">
                GPA Calculator Pro
              </h3>
              <HiveBadge variant="active-tag" size="sm">
                <Zap className="h-3 w-3" />
                Running
              </HiveBadge>
            </div>
            
            <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4 border border-[var(--hive-border-subtle)]">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Course Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Computer Science 101"
                    className="w-full px-3 py-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded-md text-[var(--hive-text-primary)] text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Grade
                    </label>
                    <select className="w-full px-3 py-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded-md text-[var(--hive-text-primary)] text-sm">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Credits
                    </label>
                    <input 
                      type="number" 
                      placeholder="3"
                      className="w-full px-3 py-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)] rounded-md text-[var(--hive-text-primary)] text-sm"
                    />
                  </div>
                </div>
                <button className="w-full px-3 py-2 bg-[var(--hive-brand-primary)] text-white text-sm font-medium rounded-md hover:bg-[var(--hive-brand-hover)] transition-colors">
                  Calculate GPA
                </button>
              </div>
            </div>
          </div>
        </HiveCard>
        
        <div className="space-y-4">
          <HiveCard variant="elevated">
            <div className="p-4">
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
                Runtime Environment
              </h4>
              <div className="text-sm space-y-1 text-[var(--hive-text-secondary)]">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-[var(--hive-status-success)]">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span>2.4 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Execution Time:</span>
                  <span>150ms</span>
                </div>
              </div>
            </div>
          </HiveCard>
          
          <HiveCard variant="elevated">
            <div className="p-4">
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
                Security Sandbox
              </h4>
              <div className="text-sm space-y-1 text-[var(--hive-text-secondary)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full"></div>
                  <span>Network access restricted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full"></div>
                  <span>File system isolated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full"></div>
                  <span>Resource limits enforced</span>
                </div>
              </div>
            </div>
          </HiveCard>
        </div>
      </div>
    </div>
  )
};