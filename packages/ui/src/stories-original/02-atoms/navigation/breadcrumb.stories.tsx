import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbNavigation } from '../../../components/shell/breadcrumb-navigation';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { 
  Home,
  Folder,
  FileText,
  Settings,
  User,
  Database,
  Code,
  Globe,
  Package,
  Layers,
  Box,
  GitBranch,
  Monitor,
  Shield,
  Bell,
  Archive
} from 'lucide-react';

const meta: Meta<typeof BreadcrumbNavigation> = {
  title: '02-atoms/Navigation/Breadcrumb',
  component: BreadcrumbNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Breadcrumb Navigation** - Hierarchical navigation showing user location and path history

Part of the HIVE Atomic Design System providing clear navigation context and wayfinding.

## Features
- **Home Icon**: Always-present home navigation starting point
- **Icon Support**: Optional icons for each breadcrumb item
- **Clickable Links**: Interactive navigation with hover states
- **Current Page**: Visual distinction for the current/last item
- **Responsive**: Adapts to different screen sizes and content lengths
- **Accessibility**: Proper ARIA labels and semantic navigation structure
- **Separator Icons**: Clear visual separation between levels

## Use Cases
- **File Systems**: Navigate through folder hierarchies
- **Settings Panels**: Show nested configuration sections
- **Multi-step Processes**: Track progress through workflows
- **Content Hierarchies**: Navigate through categorized content
- **Application Sections**: Show current location in app structure

## Accessibility Notes
- Uses semantic nav element with aria-label
- Proper focus management for keyboard navigation
- Visual distinction between clickable and non-clickable items
- Screen reader friendly with clear hierarchy indication
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of breadcrumb items with label, optional href, and optional icon'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard' },
      { label: 'Projects' },
      { label: 'HIVE Platform' }
    ]
  }
};

// With Icons
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: Monitor },
      { label: 'Projects', icon: Folder },
      { label: 'HIVE Platform', icon: Code }
    ]
  }
};

// With Clickable Links
export const WithClickableLinks: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: Monitor },
      { label: 'Projects', href: '/projects', icon: Folder },
      { label: 'Settings', href: '/settings', icon: Settings },
      { label: 'Profile' } // Current page - no href
    ]
  }
};

// File System Navigation
export const FileSystemNavigation: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <Text variant="heading-sm">File System Examples</Text>
        
        <div className="space-y-4">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Root Level</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Documents', icon: Folder }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Nested Folders</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Documents', href: '/documents', icon: Folder },
                { label: 'Projects', href: '/documents/projects', icon: Folder },
                { label: 'Web Development', href: '/documents/projects/web', icon: Code },
                { label: 'HIVE Platform', icon: Globe }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">File View</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Documents', href: '/documents', icon: Folder },
                { label: 'Designs', href: '/documents/designs', icon: Folder },
                { label: 'UI Components', href: '/documents/designs/ui', icon: Layers },
                { label: 'button-component.tsx', icon: FileText }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// Application Navigation
export const ApplicationNavigation: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <Text variant="heading-sm">Application Sections</Text>
        
        <div className="space-y-4">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">User Management</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Admin', href: '/admin', icon: Shield },
                { label: 'User Management', href: '/admin/users', icon: User },
                { label: 'Profile Settings' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">System Configuration</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'System', href: '/system', icon: Settings },
                { label: 'Database', href: '/system/database', icon: Database },
                { label: 'Connection Settings', href: '/system/database/connections', icon: Globe },
                { label: 'Primary Connection' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Content Management</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Content', href: '/content', icon: FileText },
                { label: 'Blog Posts', href: '/content/blog', icon: Archive },
                { label: 'Getting Started with HIVE' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// E-commerce Navigation
export const EcommerceNavigation: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <Text variant="heading-sm">E-commerce Examples</Text>
        
        <div className="space-y-4">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Product Catalog</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Catalog', href: '/catalog', icon: Package },
                { label: 'Electronics', href: '/catalog/electronics', icon: Monitor },
                { label: 'Computers', href: '/catalog/electronics/computers', icon: Monitor },
                { label: 'MacBook Pro 16-inch' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Order Management</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Orders', href: '/orders', icon: Box },
                { label: 'Pending', href: '/orders/pending', icon: Archive },
                { label: 'Order #12345' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Inventory</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Inventory', href: '/inventory', icon: Package },
                { label: 'Warehouse A', href: '/inventory/warehouse-a', icon: Archive },
                { label: 'Section B2', href: '/inventory/warehouse-a/b2', icon: Box },
                { label: 'SKU-ABC123' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// Long Navigation Paths
export const LongNavigationPaths: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-3">
        <Text variant="heading-sm">Long Navigation Paths</Text>
        
        <div className="space-y-4">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Deep Nesting Example</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Organization', href: '/org', icon: Globe },
                { label: 'Engineering', href: '/org/engineering', icon: Code },
                { label: 'Frontend Team', href: '/org/engineering/frontend', icon: Monitor },
                { label: 'Component Library', href: '/org/engineering/frontend/components', icon: Package },
                { label: 'Design System', href: '/org/engineering/frontend/components/design', icon: Layers },
                { label: 'Atomic Components', href: '/org/engineering/frontend/components/design/atomic', icon: Box },
                { label: 'Button Component' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Project Structure</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Workspace', href: '/workspace', icon: Folder },
                { label: 'HIVE Platform', href: '/workspace/hive', icon: Globe },
                { label: 'Frontend', href: '/workspace/hive/frontend', icon: Code },
                { label: 'Source', href: '/workspace/hive/frontend/src', icon: Folder },
                { label: 'Components', href: '/workspace/hive/frontend/src/components', icon: Package },
                { label: 'UI', href: '/workspace/hive/frontend/src/components/ui', icon: Layers },
                { label: 'Navigation', href: '/workspace/hive/frontend/src/components/ui/navigation', icon: GitBranch },
                { label: 'breadcrumb.tsx' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// Context Examples
export const ContextExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Dashboard Context</Text>
        <HiveCard className="p-6">
          <div className="mb-4">
            <BreadcrumbNavigation 
              items={[
                { label: 'Analytics', href: '/analytics', icon: Monitor },
                { label: 'Performance', href: '/analytics/performance', icon: GitBranch },
                { label: 'Real-time Metrics' }
              ]}
            />
          </div>
          <Text variant="heading-lg" className="mb-2">Real-time Metrics</Text>
          <Text variant="body-md" color="secondary">
            Monitor your application performance with real-time data visualization and alerts.
          </Text>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Settings Context</Text>
        <HiveCard className="p-6">
          <div className="mb-4">
            <BreadcrumbNavigation 
              items={[
                { label: 'Account', href: '/account', icon: User },
                { label: 'Security', href: '/account/security', icon: Shield },
                { label: 'Two-Factor Authentication' }
              ]}
            />
          </div>
          <Text variant="heading-lg" className="mb-2">Two-Factor Authentication</Text>
          <Text variant="body-md" color="secondary">
            Secure your account with an additional layer of authentication for enhanced security.
          </Text>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Content Management Context</Text>
        <HiveCard className="p-6">
          <div className="mb-4">
            <BreadcrumbNavigation 
              items={[
                { label: 'Content', href: '/content', icon: FileText },
                { label: 'Documentation', href: '/content/docs', icon: Archive },
                { label: 'API Reference', href: '/content/docs/api', icon: Code },
                { label: 'Authentication Endpoints' }
              ]}
            />
          </div>
          <Text variant="heading-lg" className="mb-2">Authentication Endpoints</Text>
          <Text variant="body-md" color="secondary">
            Complete reference for authentication API endpoints including request/response examples.
          </Text>
        </HiveCard>
      </div>
    </div>
  )
};

// Responsive Behavior
export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Responsive Breadcrumbs</Text>
        <Text variant="body-md" color="secondary">
          Breadcrumbs adapt to different screen sizes while maintaining usability.
        </Text>
        
        <div className="space-y-6">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Mobile View (Truncated)</Text>
            <div className="max-w-xs border border-[var(--hive-border-default)] rounded-lg p-4">
              <BreadcrumbNavigation 
                items={[
                  { label: 'Settings', icon: Settings },
                  { label: 'Profile' }
                ]}
              />
            </div>
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Tablet View (Moderate)</Text>
            <div className="max-w-md border border-[var(--hive-border-default)] rounded-lg p-4">
              <BreadcrumbNavigation 
                items={[
                  { label: 'Dashboard', href: '/dashboard', icon: Monitor },
                  { label: 'Projects', href: '/projects', icon: Folder },
                  { label: 'HIVE Platform' }
                ]}
              />
            </div>
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Desktop View (Full)</Text>
            <div className="max-w-2xl border border-[var(--hive-border-default)] rounded-lg p-4">
              <BreadcrumbNavigation 
                items={[
                  { label: 'Organization', href: '/org', icon: Globe },
                  { label: 'Engineering', href: '/org/engineering', icon: Code },
                  { label: 'Frontend Team', href: '/org/engineering/frontend', icon: Monitor },
                  { label: 'Component Library', href: '/org/engineering/frontend/components', icon: Package },
                  { label: 'Breadcrumb Component' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Special Cases
export const SpecialCases: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <Text variant="heading-sm">Special Cases</Text>
        
        <div className="space-y-4">
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Home Only</Text>
            <BreadcrumbNavigation items={[]} />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Single Level</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Dashboard', icon: Monitor }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">No Icons</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'Level 1', href: '/level1' },
                { label: 'Level 2', href: '/level1/level2' },
                { label: 'Level 3', href: '/level1/level2/level3' },
                { label: 'Current Page' }
              ]}
            />
          </div>
          
          <div>
            <Text variant="body-sm" color="secondary" className="mb-2">Mixed Icons</Text>
            <BreadcrumbNavigation 
              items={[
                { label: 'System', href: '/system', icon: Settings },
                { label: 'Notifications', href: '/system/notifications' }, // No icon
                { label: 'Email Settings', icon: Bell }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <BreadcrumbNavigation {...args} />
    </div>
  ),
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: Monitor },
      { label: 'Projects', href: '/projects', icon: Folder },
      { label: 'HIVE Platform', href: '/projects/hive', icon: Code },
      { label: 'Components' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - modify the items array in the controls to test different breadcrumb configurations. Each item can have a label, optional href (for clickable links), and optional icon.'
      }
    }
  }
};