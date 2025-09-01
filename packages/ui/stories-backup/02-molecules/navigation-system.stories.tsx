import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';

// Mock component for Storybook CSF compliance
const NavigationSystemMolecules = () => <div>Navigation System Molecules</div>;

const meta: Meta<typeof NavigationSystemMolecules> = {
  title: '02-Molecules/Navigation System',
  component: NavigationSystemMolecules,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Navigation System Molecules

Complete navigation system for the HIVE platform with multiple variants and responsive behavior.

## Navigation Features

- **Responsive Design**: Adapts to all screen sizes
- **Active States**: Clear indication of current page
- **Badge Support**: Notification counts and status indicators
- **User Context**: Profile and settings access

## Implementation

Navigation components are integrated throughout the HIVE platform providing consistent
user experience across all pages and features.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const NavigationDemo: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    
    const navigationItems = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'spaces', label: 'Spaces' },
      { id: 'tools', label: 'Tools' },
      { id: 'profile', label: 'Profile' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
            Navigation System Demo
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-[var(--hive-surface-primary)] border-b">
              <div className="flex gap-2">
                {navigationItems.map((item) => (
                  <HiveButton
                    key={item.id}
                    variant={activeTab === item.id ? 'primary' : 'ghost'}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.label}
                  </HiveButton>
                ))}
              </div>
            </div>
            <div className="p-8 bg-[var(--hive-background-secondary)]">
              <h4 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                {navigationItems.find(item => item.id === activeTab)?.label} Page
              </h4>
              <p className="text-[var(--hive-text-secondary)]">
                Content for the {activeTab} section would appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation system demonstration using HIVE components.',
      },
    },
  },
};