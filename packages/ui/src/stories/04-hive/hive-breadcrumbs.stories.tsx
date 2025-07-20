import type { Meta, StoryObj } from '@storybook/react';
import { HiveBreadcrumbs } from '../../components';

const meta: Meta<typeof HiveBreadcrumbs> = {
  title: '04-Hive/Hive Breadcrumbs',
  component: HiveBreadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Magnetic navigation trail for the HIVE ecosystem**

Advanced breadcrumb navigation with liquid metal motion and magnetic interactions. Provides clear hierarchical navigation for complex Builder workflows and campus navigation.

## When to Use
- Multi-level navigation in HiveLAB workflows
- Deep Space navigation (Space > Surface > Tool)
- Builder progression tracking
- Complex configuration flows

## Design Principles
- **Magnetic Trail**: Breadcrumbs connect with liquid metal physics
- **Campus Context**: University-specific navigation patterns
- **Builder Focus**: Optimized for creative workflow navigation
- **Hierarchical Clarity**: Clear path visualization with premium feel

## Navigation Patterns
- **Space Navigation**: University > Space > Surface > Content
- **Builder Navigation**: HiveLAB > Tool Type > Configuration > Preview
- **Content Navigation**: Feed > Post > Comments > Replies
- **Settings Navigation**: Profile > Preferences > Category > Setting

## Accessibility
- WCAG 2.1 AA compliant navigation structure
- Screen reader friendly breadcrumb trails
- Keyboard navigation between breadcrumb items
- Clear focus indicators with gold outline
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'space', 'builder', 'minimal'],
      description: 'Breadcrumb style variant optimized for different contexts'
    },
    showIcons: {
      control: 'boolean',
      description: 'Display icons for each breadcrumb level'
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of breadcrumb items before condensing'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const spaceNavigation = [
  { id: 'university', label: 'Stanford University', href: '/universities/stanford', icon: '🏛️' },
  { id: 'space', label: 'Computer Science', href: '/spaces/cs', icon: '💻' },
  { id: 'surface', label: 'Tools', href: '/spaces/cs/tools', icon: '🔧' },
  { id: 'tool', label: 'Study Timer Pro', current: true, icon: '⏰' }
];

const builderNavigation = [
  { id: 'hivelab', label: 'HiveLAB', href: '/lab', icon: '🔬' },
  { id: 'create', label: 'Create Tool', href: '/lab/create', icon: '➕' },
  { id: 'template', label: 'Timer Template', href: '/lab/template/timer', icon: '📄' },
  { id: 'config', label: 'Configuration', current: true, icon: '⚙️' }
];

const deepNavigation = [
  { id: 'spaces', label: 'My Spaces', href: '/spaces', icon: '🏢' },
  { id: 'stanford', label: 'Stanford', href: '/spaces/stanford', icon: '🌲' },
  { id: 'cs', label: 'Computer Science', href: '/spaces/stanford/cs', icon: '💻' },
  { id: 'posts', label: 'Posts', href: '/spaces/stanford/cs/posts', icon: '📝' },
  { id: 'discussion', label: 'Algorithm Discussion', href: '/spaces/stanford/cs/posts/123', icon: '💬' },
  { id: 'thread', label: 'Reply Thread', current: true, icon: '🧵' }
];

export const SpaceNavigation: Story = {
  args: {
    variant: 'space',
    items: spaceNavigation,
    showIcons: true
  }
};

export const BuilderWorkflow: Story = {
  args: {
    variant: 'builder',
    items: builderNavigation,
    showIcons: true,
    builderMode: true
  }
};

export const DeepNavigation: Story = {
  args: {
    variant: 'default',
    items: deepNavigation,
    showIcons: true,
    maxItems: 4,
    showOverflow: true
  }
};

export const MinimalStyle: Story = {
  args: {
    variant: 'minimal',
    items: spaceNavigation.slice(0, 3),
    showIcons: false,
    separator: '/'
  }
};

export const WithDropdowns: Story = {
  args: {
    variant: 'space',
    items: [
      { 
        id: 'university', 
        label: 'Stanford University', 
        href: '/universities/stanford', 
        icon: '🏛️',
        dropdown: [
          { label: 'UC Berkeley', href: '/universities/berkeley' },
          { label: 'MIT', href: '/universities/mit' },
          { label: 'Harvard', href: '/universities/harvard' }
        ]
      },
      { 
        id: 'space', 
        label: 'Computer Science', 
        href: '/spaces/cs', 
        icon: '💻',
        dropdown: [
          { label: 'Engineering', href: '/spaces/engineering' },
          { label: 'Business', href: '/spaces/business' },
          { label: 'Design', href: '/spaces/design' }
        ]
      },
      { id: 'surface', label: 'Tools', current: true, icon: '🔧' }
    ],
    enableDropdowns: true
  }
};

export const LoadingState: Story = {
  args: {
    variant: 'default',
    loading: true,
    skeletonItems: 4
  }
};

export const ErrorState: Story = {
  args: {
    variant: 'default',
    items: [
      { id: 'spaces', label: 'My Spaces', href: '/spaces', icon: '🏢' },
      { id: 'error', label: 'Failed to load', error: true, icon: '⚠️' }
    ],
    showIcons: true
  }
};

export const InteractiveBreadcrumbs: Story = {
  args: {
    variant: 'builder',
    items: builderNavigation,
    showIcons: true,
    interactive: true,
    onBreadcrumbClick: (item: any) => {
      console.log('Breadcrumb clicked:', item.label);
    },
    onDropdownSelect: (parent: any, selected: any) => {
      console.log('Dropdown selected:', parent.label, '->', selected.label);
    }
  }
};

export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Desktop View</h4>
        <div className="w-full">
          <HiveBreadcrumbs
            variant="space"
            items={deepNavigation}
            showIcons={true}
            responsive={false}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-3">Mobile View (Responsive)</h4>
        <div className="w-80">
          <HiveBreadcrumbs
            variant="space"
            items={deepNavigation}
            showIcons={true}
            responsive={true}
            mobileCollapse={true}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-3">Tablet View</h4>
        <div className="w-96">
          <HiveBreadcrumbs
            variant="space"
            items={deepNavigation}
            showIcons={true}
            responsive={true}
            maxItems={3}
          />
        </div>
      </div>
    </div>
  )
};