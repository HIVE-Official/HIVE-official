import type { Meta, StoryObj } from '@storybook/react';
import { HiveMenu } from '../../components';

const meta: Meta<typeof HiveMenu> = {
  title: '04-Hive/Hive Menu',
  component: HiveMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Premium navigation menu component for the HIVE ecosystem**

Context-aware menu system with magnetic interactions and liquid metal motion. Optimized for Builder workflows and campus navigation.

## When to Use
- Primary navigation in app shell
- Context menus for tools and elements
- Builder workflow navigation
- Space-specific action menus

## Design Principles
- **Magnetic Interactions**: Menu items snap and flow with liquid metal physics
- **Infrastructure Feel**: Matte obsidian glass with premium navigation experience
- **Builder-Optimized**: Quick access to frequently used Builder tools and actions
- **Campus Context**: University-specific navigation patterns and content

## Menu Types
- **Primary Navigation**: Main app navigation with Space and Builder access
- **Context Menus**: Right-click actions for tools, elements, and content
- **Dropdown Menus**: Action lists from buttons and interactive elements
- **Breadcrumb Navigation**: Hierarchical navigation for complex workflows

## Accessibility
- WCAG 2.1 AA compliant keyboard navigation
- Screen reader friendly menu structure
- Focus management and escape key handling
- Clear visual focus indicators with gold outlines
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'context', 'dropdown', 'breadcrumb'],
      description: 'Menu variant optimized for different navigation patterns'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      description: 'Menu positioning relative to trigger'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Menu size variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const primaryNavItems = [
  { id: 'spaces', label: 'My Spaces', icon: '🏢', href: '/spaces', badge: '3' },
  { id: 'hivelab', label: 'HiveLAB', icon: '🔧', href: '/lab', highlight: true },
  { id: 'discover', label: 'Discover', icon: '🔍', href: '/discover' },
  { id: 'activity', label: 'Activity', icon: '📊', href: '/activity' },
  { type: 'divider' },
  { id: 'profile', label: 'Profile', icon: '👤', href: '/profile' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' }
];

const contextMenuItems = [
  { id: 'edit', label: 'Edit Tool', icon: '✏️', shortcut: 'Cmd+E' },
  { id: 'duplicate', label: 'Duplicate', icon: '📋', shortcut: 'Cmd+D' },
  { id: 'share', label: 'Share Tool', icon: '🔗' },
  { type: 'divider' },
  { id: 'move', label: 'Move to Space', icon: '📁', submenu: true },
  { id: 'export', label: 'Export Tool', icon: '📤' },
  { type: 'divider' },
  { id: 'delete', label: 'Delete Tool', icon: '🗑️', destructive: true, shortcut: 'Del' }
];

const builderMenuItems = [
  { id: 'elements', label: 'Elements Library', icon: '🧩', badge: 'NEW' },
  { id: 'templates', label: 'Templates', icon: '📄' },
  { id: 'my-tools', label: 'My Tools', icon: '🔧', badge: '12' },
  { type: 'divider' },
  { id: 'tutorial', label: 'Builder Tutorial', icon: '🎓' },
  { id: 'docs', label: 'Documentation', icon: '📚' },
  { id: 'community', label: 'Builder Community', icon: '👥' }
];

export const PrimaryNavigation: Story = {
  args: {
    variant: 'primary',
    items: primaryNavItems,
    currentPath: '/lab'
  }
};

export const ContextMenu: Story = {
  args: {
    variant: 'context',
    items: contextMenuItems,
    trigger: 'right-click',
    placement: 'auto'
  }
};

export const BuilderDropdown: Story = {
  args: {
    variant: 'dropdown',
    items: builderMenuItems,
    trigger: (
      <button className="px-4 py-2 bg-hive-accent text-[var(--hive-text-primary)] rounded-lg">
        Builder Tools ▼
      </button>
    ),
    placement: 'bottom'
  }
};

export const SpaceNavigation: Story = {
  args: {
    variant: 'primary',
    items: [
      { id: 'pinned', label: 'Pinned', icon: '📌', href: '/space/cs/pinned' },
      { id: 'posts', label: 'Posts', icon: '📝', href: '/space/cs/posts', badge: '24' },
      { id: 'events', label: 'Events', icon: '📅', href: '/space/cs/events', badge: '3' },
      { id: 'tools', label: 'Tools', icon: '🔧', href: '/space/cs/tools', badge: '156' },
      { id: 'chat', label: 'Chat', icon: '💬', href: '/space/cs/chat', active: true },
      { id: 'members', label: 'Members', icon: '👥', href: '/space/cs/members', badge: '2.1k' }
    ],
    title: 'Computer Science Space',
    subtitle: 'Stanford University'
  }
};

export const BreadcrumbNavigation: Story = {
  args: {
    variant: 'breadcrumb',
    items: [
      { id: 'spaces', label: 'My Spaces', href: '/spaces' },
      { id: 'cs-space', label: 'Computer Science', href: '/spaces/cs' },
      { id: 'tools', label: 'Tools', href: '/spaces/cs/tools' },
      { id: 'study-timer', label: 'Study Timer Tool', current: true }
    ]
  }
};

export const WithSubmenu: Story = {
  args: {
    variant: 'dropdown',
    items: [
      { id: 'new-tool', label: 'New Tool', icon: '➕' },
      { 
        id: 'templates', 
        label: 'From Template', 
        icon: '📄',
        submenu: [
          { id: 'study-template', label: 'Study Tools' },
          { id: 'calc-template', label: 'Calculators' },
          { id: 'social-template', label: 'Social Tools' }
        ]
      },
      { id: 'import', label: 'Import Tool', icon: '📥' }
    ]
  }
};

export const LoadingState: Story = {
  args: {
    variant: 'primary',
    loading: true,
    skeleton: true
  }
};

export const EmptyState: Story = {
  args: {
    variant: 'dropdown',
    items: [],
    emptyState: {
      icon: '🔧',
      title: 'No tools yet',
      description: 'Create your first tool in HiveLAB',
      action: 'Open HiveLAB'
    }
  }
};

export const Interactive: Story = {
  args: {
    variant: 'context',
    items: contextMenuItems,
    onItemClick: (item: any) => {
      console.log('Menu item clicked:', item.id);
    },
    onSubmenuOpen: (item: any) => {
      console.log('Submenu opened:', item.id);
    }
  }
};