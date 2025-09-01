import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';

// Mock component for Storybook CSF compliance
const PageTemplates = () => <div>Page Templates</div>;

const meta: Meta<typeof PageTemplates> = {
  title: '04-Templates/Page Templates',
  component: PageTemplates,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Page Templates

Complete page layout templates that demonstrate how HIVE components work together to create cohesive user experiences.

## Template Types

### Base Templates
- **Page Layout**: Foundation layout with header, navigation, content, and footer
- **Profile Page**: Complete profile page with dashboard and customization options
- **Dashboard Page**: Platform dashboard with widgets and tools

### Design Principles

- **Consistent Structure**: Predictable layout patterns across all pages
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Accessibility First**: Keyboard navigation and screen reader support
- **Performance Optimized**: Efficient loading and rendering
- **Brand Consistency**: HIVE design system throughout
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const PageLayoutDemo: StoryObj = {
  render: () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    
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
            Desktop Page Layout Template
          </h3>
          
          <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
            {/* Header */}
            <div className="bg-[var(--hive-surface-primary)] border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full"></div>
                  <span className="text-lg font-bold text-[var(--hive-text-primary)]">
                    HIVE Platform
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[var(--hive-background-primary)] rounded-lg px-3 py-2 min-w-[200px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-1 bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] focus:outline-none"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-[var(--hive-surface-primary)] border-r">
                <div className="p-4">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-[var(--hive-brand-primary)] text-white'
                            : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]'
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6 bg-[var(--hive-background-secondary)]">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                    {navigationItems.find(item => item.id === activeSection)?.label}
                  </h1>
                  <p className="text-[var(--hive-text-secondary)]">
                    Welcome to the {activeSection} section of HIVE Platform
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <HiveCard>
                    <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                      Quick Stats
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[var(--hive-text-secondary)]">Active Items</span>
                        <span className="font-semibold text-[var(--hive-brand-primary)]">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--hive-text-secondary)]">Total Created</span>
                        <span className="font-semibold text-[var(--hive-brand-secondary)]">3</span>
                      </div>
                    </div>
                  </HiveCard>
                  
                  <HiveCard>
                    <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-[var(--hive-text-primary)]">Recent Action</div>
                        <div className="text-[var(--hive-text-secondary)]">2 hours ago</div>
                      </div>
                    </div>
                  </HiveCard>
                  
                  <HiveCard>
                    <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <HiveButton variant="primary" size="sm" fullWidth>
                        Primary Action
                      </HiveButton>
                      <HiveButton variant="ghost" size="sm" fullWidth>
                        Secondary Action
                      </HiveButton>
                    </div>
                  </HiveCard>
                </div>
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
        story: 'Complete page layout template with header, navigation, content area demonstration.',
      },
    },
  },
};

export const ProfilePageDemo: StoryObj = {
  render: () => {
    const [viewMode, setViewMode] = useState('grid');
    
    return (
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)]">
              Profile Page Template
            </h3>
            <div className="flex items-center gap-2">
              <HiveButton
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </HiveButton>
              <HiveButton
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </HiveButton>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] h-32"></div>
            <div className="relative -mt-16 p-6">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 bg-[var(--hive-surface-primary)] rounded-full border-4 border-white"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                    Jordan Smith
                  </h2>
                  <p className="text-[var(--hive-text-secondary)]">
                    Computer Science • Junior
                  </p>
                </div>
                <div className="flex gap-2">
                  <HiveButton variant="primary">Connect</HiveButton>
                  <HiveButton variant="ghost">Message</HiveButton>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <HiveCard>
                    <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">
                      About
                    </h4>
                    <p className="text-[var(--hive-text-secondary)]">
                      Passionate about artificial intelligence and machine learning. 
                      Currently working on research projects involving neural networks.
                    </p>
                  </HiveCard>
                </div>
                <div>
                  <HiveCard>
                    <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">
                      Stats
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--hive-text-secondary)]">GPA</span>
                        <span className="font-semibold">3.87</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--hive-text-secondary)]">Connections</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--hive-text-secondary)]">Tools Created</span>
                        <span className="font-semibold">5</span>
                      </div>
                    </div>
                  </HiveCard>
                </div>
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
        story: 'Profile page template with user information and stats.',
      },
    },
  },
};