import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavigationPreferences, NavigationStyle } from '../../atomic/atoms/navigation-preferences';

const meta: Meta<typeof NavigationPreferences> = {
  title: '01-Atoms/Navigation Preferences',
  component: NavigationPreferences,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Navigation Preferences

A settings component that allows users to choose their preferred navigation style in HIVE.

## Features

- **Tab Bar**: Clean & Simple navigation with top tabs
- **Sidebar**: Always visible navigation sidebar  
- **Auto**: Adapts to screen size automatically

## Usage

The component follows HIVE's navigation specification with responsive breakpoints:
- Mobile (<768px): Always bottom tabs
- Tablet (768-1199px): Collapsible drawer
- Desktop (1200-1440px): User preference applied
- Wide (>1440px): Sidebar recommended

## Implementation

This component is integrated into the Settings page and works with the \`useNavigationLayout\` hook to provide real-time navigation switching based on user preference and screen size.
        `
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['tabs', 'sidebar', 'auto'],
      description: 'Current navigation preference'
    },
    onChange: {
      action: 'preference changed',
      description: 'Callback when preference changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof NavigationPreferences>;

// Interactive story with state management
const InteractiveTemplate = (args: any) => {
  const [value, setValue] = useState<NavigationStyle>(args.value);
  
  return (
    <div className="w-80 p-6 bg-[var(--hive-bg-secondary)] rounded-lg">
      <NavigationPreferences
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    value: 'auto'
  }
};

export const TabsSelected: Story = {
  render: InteractiveTemplate,
  args: {
    value: 'tabs'
  }
};

export const SidebarSelected: Story = {
  render: InteractiveTemplate,
  args: {
    value: 'sidebar'
  }
};

// Settings page integration example
export const InSettingsPage: Story = {
  render: () => {
    const [preference, setPreference] = useState<NavigationStyle>('auto');
    
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Settings Card */}
        <div className="p-6 bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-default)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-6">
            Navigation Preferences
          </h3>
          
          <NavigationPreferences
            value={preference}
            onChange={setPreference}
          />
          
          {/* Current Status */}
          <div className="mt-6 p-4 bg-[var(--hive-bg-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Current Selection
            </h4>
            <div className="text-sm text-[var(--hive-text-secondary)]">
              <span className="font-medium text-[var(--hive-brand-secondary)]">
                {preference === 'tabs' && 'Tab Bar'}
                {preference === 'sidebar' && 'Sidebar'}  
                {preference === 'auto' && 'Auto'}
              </span>
              {' - '}
              {preference === 'tabs' && 'Clean navigation with top tabs'}
              {preference === 'sidebar' && 'Always visible navigation sidebar'}
              {preference === 'auto' && 'Adapts to your screen size automatically'}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// All options showcase
export const AllOptions: Story = {
  render: () => {
    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
            Navigation Preference Options
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
            Choose how you want to navigate HIVE based on your preferences and screen size.
          </p>
        </div>
        
        <div className="grid gap-6">
          {(['tabs', 'sidebar', 'auto'] as NavigationStyle[]).map((option) => (
            <div key={option} className="p-4 bg-[var(--hive-bg-secondary)] rounded-lg border border-[var(--hive-border-default)]">
              <NavigationPreferences
                value={option}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export const ResponsiveDemo: Story = {
  render: () => {
    const [preference, setPreference] = useState<NavigationStyle>('auto');
    
    return (
      <div className="space-y-6">
        {/* Controls */}
        <div className="p-4 bg-[var(--hive-bg-secondary)] rounded-lg">
          <NavigationPreferences
            value={preference}
            onChange={setPreference}
          />
        </div>
        
        {/* Responsive Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
            How this preference behaves across screen sizes:
          </h4>
          
          <div className="grid gap-4">
            {[
              { size: 'Mobile (<768px)', behavior: 'Always bottom tabs (preference ignored)' },
              { size: 'Tablet (768-1199px)', behavior: 'Collapsible drawer (preference ignored)' },
              { size: 'Desktop (1200-1440px)', behavior: `${preference === 'auto' ? 'Tab bar' : preference} applied` },
              { size: 'Wide (>1440px)', behavior: `${preference === 'auto' ? 'Sidebar recommended' : preference} applied` }
            ].map((item) => (
              <div key={item.size} className="flex justify-between items-center p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                  {item.size}
                </span>
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  {item.behavior}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};