import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { 
  Star, 
  Download, 
  Users, 
  Search, 
  Sparkles, 
  TrendingUp,
  Settings,
  Eye,
  BarChart3,
  Calendar,
  X,
  Send
} from 'lucide-react';

const meta: Meta = {
  title: '10-creator/HIVE Tool System (Refined)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Tool System - Black Matte Refined

Consolidated tool ecosystem with consistent black matte sleek aesthetic. Removes redundancies and establishes clear design hierarchy.

## Unified Design Principles:
- **Single color system**: HIVE tokens only (obsidian, charcoal, graphite)
- **Black matte foundation**: All interfaces use consistent dark theme
- **Strategic yellow accents**: Brand moments and primary actions only
- **Minimal complexity levels**: Simplified interaction patterns

## Design Tokens Used:
- \`obsidian\` (var(--hive-background-primary)) - Main backgrounds
- \`charcoal\` (var(--hive-background-secondary)) - Card backgrounds  
- \`graphite\` (var(--hive-background-tertiary)) - Elevated surfaces
- \`platinum\` (var(--hive-text-primary)) - Primary text
- \`gold\` (var(--hive-brand-secondary)) - Brand accents
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Unified Tool Card Component (eliminates redundancy)
const UnifiedToolCard = ({ tool, variant = 'marketplace', onAction }: any) => (
  <Card className="bg-charcoal border-graphite hover:border-gold/20 transition-all duration-300">
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-platinum group-hover:text-gold transition-colors">
              {tool.name}
            </h3>
            {tool.featured && (
              <Badge className="bg-gold text-obsidian text-xs">Featured</Badge>
            )}
          </div>
          <p className="text-sm text-silver mb-3 line-clamp-2">{tool.description}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-mercury">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{tool.stats?.installs || tool.installs}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span>{tool.stats?.rating || '4.8'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{tool.stats?.spaces || tool.activeUsers}</span>
            </div>
          </div>
        </div>
        
        {variant === 'management' && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              tool.status === 'active' ? 'bg-emerald' : 'bg-mercury'
            }`}></div>
            <Button variant="ghost" size="sm" className="text-platinum hover:text-gold">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={() => onAction(tool, 'primary')}
          className="flex-1 bg-gold hover:bg-gold/90 text-obsidian font-medium"
        >
          {variant === 'marketplace' ? 'Install' : 'Configure'}
        </Button>
        <Button 
          onClick={() => onAction(tool, 'secondary')}
          variant="outline" 
          size="sm"
          className="border-steel text-platinum hover:border-gold hover:text-gold"
        >
          {variant === 'marketplace' ? <Eye className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  </Card>
);

// Unified Modal Component (eliminates redundancy)
const UnifiedModal = ({ isOpen, onClose, title, children, actions }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm flex items-end md:items-center justify-center">
      <div className="bg-obsidian border border-steel w-full max-w-2xl max-h-[90vh] overflow-y-auto md:rounded-xl">
        {/* Header */}
        <div className="sticky top-0 bg-obsidian border-b border-steel px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-platinum hover:text-gold"
            >
              <X className="w-4 h-4" />
            </Button>
            <h2 className="font-semibold text-platinum">{title}</h2>
          </div>
          <Badge variant="outline" className="border-steel text-mercury">CS 442</Badge>
        </div>

        {/* Content */}
        <div className="p-6 text-platinum">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="sticky bottom-0 bg-obsidian border-t border-steel px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data (simplified)
const mockTools = [
  {
    id: '1',
    name: 'Quick Poll',
    description: 'Create instant polls with real-time results',
    installs: 847,
    featured: true,
    status: 'active',
    activeUsers: 234,
  },
  {
    id: '2',
    name: 'Event Coordinator',
    description: 'Advanced event planning and RSVP tracking',
    installs: 623,
    featured: false,
    status: 'active',
    activeUsers: 156,
  },
  {
    id: '3',
    name: 'GPA Calculator',
    description: 'Track semester GPA with predictions',
    installs: 1205,
    featured: true,
    status: 'needs_update',
    activeUsers: 345,
  },
];

// Consolidated Tool Marketplace
export const ToolMarketplace: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <div className="min-h-screen bg-obsidian text-platinum">
        {/* Header */}
        <div className="bg-charcoal border-b border-steel px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-platinum">Tool Marketplace</h1>
                <p className="text-silver">Discover tools built by students, for students</p>
              </div>
              <Button className="bg-gold text-obsidian hover:bg-gold/90 font-medium">
                Build a Tool
              </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mercury w-4 h-4" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-graphite border-steel text-platinum placeholder:text-mercury"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card className="bg-charcoal border-steel p-4">
                <h3 className="font-semibold text-platinum mb-4">Categories</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Featured', count: 8, icon: Sparkles },
                    { name: 'Trending', count: 12, icon: TrendingUp },
                    { name: 'Academic', count: 24, icon: Users },
                  ].map(category => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors hover:bg-graphite group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-mercury group-hover:text-gold" />
                          <span className="text-sm text-platinum">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="border-steel text-mercury text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Available Tools', value: '247', accent: 'gold' },
                  { label: 'Student Builders', value: '89', accent: 'emerald' },
                  { label: 'Active Installations', value: '1.2K', accent: 'sapphire' },
                  { label: 'Spaces Using Tools', value: '156', accent: 'citrine' },
                ].map(stat => (
                  <Card key={stat.label} className="bg-charcoal border-steel p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.accent}`}>{stat.value}</div>
                    <div className="text-sm text-mercury">{stat.label}</div>
                  </Card>
                ))}
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTools.map(tool => (
                  <UnifiedToolCard 
                    key={tool.id}
                    tool={tool}
                    variant="marketplace"
                    onAction={(tool: any, action: string) => console.log(`${action}:`, tool.name)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Unified tool marketplace with consistent black matte aesthetic and HIVE design tokens.',
      },
    },
  },
};

// Consolidated Tool Management
export const ToolManagement: Story = {
  render: () => (
    <div className="min-h-screen bg-obsidian text-platinum">
      {/* Header */}
      <div className="bg-charcoal border-b border-steel px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-platinum">Tool Management</h1>
              <p className="text-silver">CS 442 - Software Engineering</p>
            </div>
            <Button className="bg-gold text-obsidian hover:bg-gold/90 font-medium">
              Install New Tool
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tools', value: '4', icon: Settings },
            { label: 'Active Tools', value: '3', icon: Users },
            { label: 'Active Users', value: '735', icon: TrendingUp },
            { label: 'Interactions', value: '4.8K', icon: BarChart3 },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-charcoal border-steel p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-graphite rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-mercury">{stat.label}</div>
                    <div className="text-2xl font-bold text-platinum">{stat.value}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-lg font-semibold text-platinum mb-6">Installed Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockTools.map(tool => (
              <UnifiedToolCard 
                key={tool.id}
                tool={tool}
                variant="management"
                onAction={(tool: any, action: string) => console.log(`${action}:`, tool.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Unified tool management dashboard with consistent black matte design.',
      },
    },
  },
};

// Consolidated HiveLAB Builder
export const HiveLabBuilder: Story = {
  render: () => (
    <div className="h-screen bg-obsidian text-platinum flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-charcoal border-b border-steel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-platinum">HiveLAB Builder</h1>
          <Badge variant="outline" className="border-steel text-mercury">Draft</Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-platinum hover:text-gold">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-gold text-obsidian hover:bg-gold/90 font-medium">
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Element Library */}
        <div className="w-64 bg-charcoal border-r border-steel overflow-y-auto">
          <div className="p-4">
            <h3 className="font-medium text-platinum mb-4">Element Library</h3>
            <div className="space-y-3">
              {[
                { name: 'Text Input', icon: '📝' },
                { name: 'Button', icon: '🔘' },
                { name: 'Poll', icon: '📊' },
                { name: 'Calendar', icon: '📅' },
              ].map(element => (
                <div
                  key={element.name}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-graphite cursor-pointer transition-colors group"
                >
                  <span className="text-lg">{element.icon}</span>
                  <span className="text-sm text-platinum group-hover:text-gold">{element.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-graphite relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-medium text-platinum mb-2">Start Building</div>
              <div className="text-sm text-mercury">Drag elements from the library to begin</div>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-charcoal border-l border-steel">
          <div className="p-4">
            <h3 className="font-medium text-platinum mb-4">Properties</h3>
            <div className="text-center text-mercury text-sm mt-8">
              Select an element to edit properties
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Unified HiveLAB builder with consistent black matte professional interface.',
      },
    },
  },
};

// Consolidated Tool Usage Modal
export const ToolUsageModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-screen bg-obsidian p-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-charcoal border-steel p-6">
            <h3 className="font-semibold text-platinum mb-2">CS 442 - Software Engineering</h3>
            <p className="text-mercury text-sm mb-4">34 members • 12 tools installed</p>
            <Button 
              onClick={() => setIsOpen(true)}
              className="w-full bg-gold text-obsidian hover:bg-gold/90 font-medium"
            >
              Create Quick Poll
            </Button>
          </Card>
        </div>

        <UnifiedModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Quick Poll"
          actions={
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="border-steel text-platinum hover:border-gold hover:text-gold"
              >
                Cancel
              </Button>
              <Button className="bg-gold text-obsidian hover:bg-gold/90 font-medium">
                <Send className="w-4 h-4 mr-2" />
                Post Poll
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-platinum mb-2 block">Question</label>
              <textarea
                placeholder="What would you like to ask?"
                className="w-full bg-graphite border border-steel rounded-lg px-4 py-3 text-platinum placeholder:text-mercury resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-platinum mb-3 block">Options</label>
              <div className="space-y-2">
                <Input
                  placeholder="Option 1"
                  className="bg-graphite border-steel text-platinum placeholder:text-mercury"
                />
                <Input
                  placeholder="Option 2"
                  className="bg-graphite border-steel text-platinum placeholder:text-mercury"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-steel text-platinum hover:border-gold hover:text-gold"
                >
                  Add Option
                </Button>
              </div>
            </div>
          </div>
        </UnifiedModal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Unified tool usage modal with consistent black matte interface and HIVE tokens.',
      },
    },
  },
};