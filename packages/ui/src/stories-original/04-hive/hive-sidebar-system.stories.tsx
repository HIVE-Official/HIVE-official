import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveSidebar, HiveButton } from '../../components';

const meta: Meta<typeof HiveSidebar> = {
  title: '04-Hive/Sidebar System',
  component: HiveSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Sidebar System - Advanced navigation sidebar with collapsible sections, search, and premium styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'minimal'],
      description: 'Sidebar visual style',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Sidebar position',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable collapse/expand',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Default expanded state',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockNavItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/dashboard',
    badge: '3',
  },
  {
    id: 'spaces',
    label: 'My Spaces',
    icon: '🏗️',
    children: [
      { id: 'cs-hub', label: 'Computer Science Hub', href: '/spaces/cs-hub', active: true },
      { id: 'design-studio', label: 'Design Studio', href: '/spaces/design-studio' },
      { id: 'research-lab', label: 'Research Lab', href: '/spaces/research-lab' },
    ],
  },
  {
    id: 'discover',
    label: 'Discover',
    icon: '🔍',
    href: '/discover',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    href: '/notifications',
    badge: '12',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    href: '/analytics',
    premium: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    children: [
      { id: 'profile', label: 'Profile', href: '/settings/profile' },
      { id: 'privacy', label: 'Privacy', href: '/settings/privacy' },
      { id: 'notifications-settings', label: 'Notifications', href: '/settings/notifications' },
      { id: 'billing', label: 'Billing', href: '/settings/billing', premium: true },
    ],
  },
];

const SidebarWrapper = ({ children, ...props }: any) => {
  const [isExpanded, setIsExpanded] = useState(props.defaultExpanded ?? true);
  
  return (
    <div className="flex h-screen bg-gray-900">
      <HiveSidebar
        {...props}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        navItems={mockNavItems}
      />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">Main Content Area</h1>
          <p className="text-gray-400 mb-6">
            This is the main content area. The sidebar navigation adapts to different states
            and provides smooth transitions between expanded and collapsed modes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Content Section 1</h3>
              <p className="text-gray-400">Sample content to demonstrate the layout behavior.</p>
            </div>
            <div className="p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Content Section 2</h3>
              <p className="text-gray-400">More content to show responsive behavior.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    variant: 'default',
    position: 'left',
    collapsible: true,
    defaultExpanded: true,
    showSearch: true,
  },
};

export const Premium: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    variant: 'premium',
    position: 'left',
    collapsible: true,
    defaultExpanded: true,
    showSearch: true,
    showUserProfile: true,
    showQuickActions: true,
  },
};

export const Minimal: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    variant: 'minimal',
    position: 'left',
    collapsible: true,
    defaultExpanded: false,
    showSearch: false,
  },
};

export const RightSidebar: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    variant: 'default',
    position: 'right',
    collapsible: true,
    defaultExpanded: true,
    showSearch: true,
  },
};

export const CollapsedByDefault: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    variant: 'default',
    position: 'left',
    collapsible: true,
    defaultExpanded: false,
    showSearch: true,
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'premium' | 'minimal'>('default');
    const [position, setPosition] = useState<'left' | 'right'>('left');
    const [isExpanded, setIsExpanded] = useState(true);
    const [features, setFeatures] = useState({
      showSearch: true,
      showUserProfile: true,
      showQuickActions: false,
    });
    
    return (
      <div className="h-screen bg-gray-900">
        {/* Controls */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex space-x-2">
              <span className="text-gray-400">Variant:</span>
              {(['default', 'premium', 'minimal'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-2 py-1 rounded text-xs ${
                    variant === v ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <span className="text-gray-400">Position:</span>
              {(['left', 'right'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`px-2 py-1 rounded text-xs ${
                    position === p ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 rounded text-xs bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/20"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
        
        {/* Sidebar Demo */}
        <div className="flex h-full">
          {position === 'left' && (
            <HiveSidebar
              variant={variant}
              position={position}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              navItems={mockNavItems}
              collapsible
              {...features}
            />
          )}
          
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">Interactive Sidebar Demo</h1>
              <p className="text-gray-400 mb-6">
                Use the controls above to test different sidebar configurations. 
                The sidebar adapts smoothly to different variants and states.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(features).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-[var(--hive-text-primary)]/5 rounded-lg">
                      <span className="text-[var(--hive-text-primary)] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setFeatures({...features, [key]: e.target.checked})}
                        className="text-yellow-500"
                      />
                    </label>
                  ))}
                </div>
                
                <div className="p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Navigation Features</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Collapsible sections with smooth animations</li>
                    <li>• Search functionality for quick navigation</li>
                    <li>• Badge indicators for notifications and counts</li>
                    <li>• Premium item highlighting</li>
                    <li>• Active state management</li>
                    <li>• Responsive design for different screen sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {position === 'right' && (
            <HiveSidebar
              variant={variant}
              position={position}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              navItems={mockNavItems}
              collapsible
              {...features}
            />
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive sidebar demo. Test different variants, positions, and features using the controls.',
      },
    },
  },
};