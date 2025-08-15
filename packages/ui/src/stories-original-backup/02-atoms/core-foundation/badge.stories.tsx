import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../atomic/atoms/badge';
import { HiveCard } from '../../../components/hive-card';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Star, 
  Crown,
  Zap,
  Shield,
  Bookmark,
  Tag
} from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: '02-atoms/Core Foundation/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Badge Component** - Compact status indicators and labels with semantic meaning

Part of the HIVE Atomic Design System providing visual categorization and status indication.

## Features
- **7 Semantic Variants**: Primary, secondary, success, warning, error, info, ghost
- **3 Sizes**: sm, md, lg with appropriate padding and text sizing
- **3 Display Modes**: Standard label, dot indicator, count/notification badge
- **Status Colors**: Semantic color system with proper contrast ratios
- **Icon Support**: Works seamlessly with icons for enhanced meaning
- **Flexible Content**: Supports text, numbers, and mixed content
- **Accessibility**: Proper contrast ratios and semantic meaning

## Use Cases
- **Status Indicators**: Online/offline, active/inactive states
- **Category Labels**: Tags, types, classifications
- **Notification Counts**: Unread messages, pending items
- **Priority Levels**: High, medium, low priority indicators
- **Feature Badges**: New, beta, premium feature indicators
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'ghost'],
      description: 'Semantic color variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size variant'
    },
    dot: {
      control: 'boolean',
      description: 'Show as dot indicator instead of full badge'
    },
    count: {
      control: 'number',
      description: 'Show numeric count (overrides children)'
    },
    maxCount: {
      control: 'number',
      description: 'Maximum count before showing "max+"'
    },
    children: {
      control: 'text',
      description: 'Badge content (text or elements)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Badge
export const Default: Story = {
  args: {
    children: 'Badge'
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant="primary" size="sm">Small</Badge>
        <Badge variant="primary" size="md">Medium</Badge>
        <Badge variant="primary" size="lg">Large</Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge variant="success" size="sm">Active</Badge>
        <Badge variant="success" size="md">Active</Badge>
        <Badge variant="success" size="lg">Active</Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge variant="warning" size="sm">Warning</Badge>
        <Badge variant="warning" size="md">Warning</Badge>
        <Badge variant="warning" size="lg">Warning</Badge>
      </div>
    </div>
  )
};

// Dot Indicators
export const DotIndicators: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Away</Badge>
          <Badge variant="error" dot>Offline</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="primary" dot size="sm">Small Dot</Badge>
          <Badge variant="primary" dot size="md">Medium Dot</Badge>
          <Badge variant="primary" dot size="lg">Large Dot</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="info" dot>Processing</Badge>
          <Badge variant="success" dot>Complete</Badge>
          <Badge variant="ghost" dot>Inactive</Badge>
        </div>
      </div>
    </div>
  )
};

// Count Badges
export const CountBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Notification Counts</h4>
        <div className="flex items-center gap-4">
          <Badge variant="primary" count={3} />
          <Badge variant="error" count={12} />
          <Badge variant="warning" count={156} />
          <Badge variant="success" count={1} />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Large Counts</h4>
        <div className="flex items-center gap-4">
          <Badge variant="primary" count={99} />
          <Badge variant="primary" count={100} maxCount={99} />
          <Badge variant="error" count={999} maxCount={99} />
          <Badge variant="warning" count={1500} maxCount={999} />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Different Sizes</h4>
        <div className="flex items-center gap-4">
          <Badge variant="primary" count={5} size="sm" />
          <Badge variant="primary" count={5} size="md" />
          <Badge variant="primary" count={5} size="lg" />
        </div>
      </div>
    </div>
  )
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Status Badges</h4>
        <div className="flex items-center gap-3">
          <Badge variant="success">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </Badge>
          
          <Badge variant="warning">
            <AlertTriangle className="w-3 h-3" />
            Pending
          </Badge>
          
          <Badge variant="error">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
          
          <Badge variant="info">
            <Info className="w-3 h-3" />
            Info
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Feature Badges</h4>
        <div className="flex items-center gap-3">
          <Badge variant="primary">
            <Star className="w-3 h-3" />
            Featured
          </Badge>
          
          <Badge variant="warning" size="sm">
            <Crown className="w-3 h-3" />
            Premium
          </Badge>
          
          <Badge variant="success">
            <Zap className="w-3 h-3" />
            Fast
          </Badge>
          
          <Badge variant="secondary">
            <Shield className="w-3 h-3" />
            Secure
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Icon Only</h4>
        <div className="flex items-center gap-3">
          <Badge variant="ghost" size="sm">
            <Bookmark className="w-3 h-3" />
          </Badge>
          
          <Badge variant="primary" size="md">
            <Star className="w-4 h-4" />
          </Badge>
          
          <Badge variant="success" size="lg">
            <CheckCircle2 className="w-4 h-4" />
          </Badge>
        </div>
      </div>
    </div>
  )
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">User Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">John Doe</span>
            <Badge variant="success" dot>Online</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">Jane Smith</span>
            <Badge variant="warning" dot>Away</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">Bob Johnson</span>
            <Badge variant="error" dot>Offline</Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">System Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">API Server</span>
            <Badge variant="success">Operational</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">Database</span>
            <Badge variant="warning">Degraded</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">CDN</span>
            <Badge variant="error">Down</Badge>
          </div>
        </div>
      </div>
    </div>
  )
};

// Notification Examples
export const NotificationExamples: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Notifications</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">M</span>
            </div>
            <span className="text-[var(--hive-text-primary)]">Messages</span>
          </div>
          <Badge variant="primary" count={12} />
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">T</span>
            </div>
            <span className="text-[var(--hive-text-primary)]">Tasks</span>
          </div>
          <Badge variant="success" count={5} />
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">A</span>
            </div>
            <span className="text-[var(--hive-text-primary)]">Alerts</span>
          </div>
          <Badge variant="error" count={3} />
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">R</span>
            </div>
            <span className="text-[var(--hive-text-primary)]">Reviews</span>
          </div>
          <Badge variant="warning" count={156} maxCount={99} />
        </div>
      </div>
    </HiveCard>
  )
};

// Category Tags
export const CategoryTags: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Content Categories</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">JavaScript</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="info">TypeScript</Badge>
          <Badge variant="success">Node.js</Badge>
          <Badge variant="warning">Beta</Badge>
          <Badge variant="ghost">Archive</Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Priority Levels</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="error" size="sm">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </Badge>
          <Badge variant="warning" size="sm">
            <Info className="w-3 h-3" />
            High
          </Badge>
          <Badge variant="primary" size="sm">
            <Tag className="w-3 h-3" />
            Medium
          </Badge>
          <Badge variant="ghost" size="sm">
            <Tag className="w-3 h-3" />
            Low
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Feature Flags</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" size="lg">
            <CheckCircle2 className="w-4 h-4" />
            Stable
          </Badge>
          <Badge variant="warning" size="lg">
            <Zap className="w-4 h-4" />
            Beta
          </Badge>
          <Badge variant="info" size="lg">
            <Star className="w-4 h-4" />
            Experimental
          </Badge>
          <Badge variant="error" size="lg">
            <XCircle className="w-4 h-4" />
            Deprecated
          </Badge>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="p-8">
      <Badge {...args} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    dot: false,
    count: undefined,
    maxCount: 99,
    children: 'Interactive Badge'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different badge configurations including variants, sizes, dot mode, and count display.'
      }
    }
  }
};