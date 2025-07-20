import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveCommandPalette, HiveButton } from '../../components';

const meta: Meta<typeof HiveCommandPalette> = {
  title: '04-Hive/Command Palette',
  component: HiveCommandPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Command Palette - Advanced search and command interface with intelligent filtering, keyboard navigation, and instant results. Built for power users.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls palette visibility',
    },
    placeholder: {
      control: 'text',
      description: 'Search input placeholder text',
    },
    showCategories: {
      control: 'boolean',
      description: 'Show command categories',
    },
    showKeyboardShortcuts: {
      control: 'boolean',
      description: 'Display keyboard shortcuts',
    },
    maxResults: {
      control: 'number',
      description: 'Maximum number of results to show',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for demonstrations
const mockSpaces = [
  { id: '1', name: 'Computer Science Hub', type: 'academic', memberCount: 245, description: 'CS students and faculty collaboration' },
  { id: '2', name: 'Design Studio', type: 'creative', memberCount: 89, description: 'Creative minds and design thinking' },
  { id: '3', name: 'Entrepreneurship', type: 'business', memberCount: 156, description: 'Startup ideas and business development' },
  { id: '4', name: 'Research Lab', type: 'academic', memberCount: 67, description: 'Scientific research and discoveries' },
  { id: '5', name: 'Gaming Community', type: 'social', memberCount: 312, description: 'Gamers and esports enthusiasts' },
];

const mockCommands = [
  { id: 'create-space', name: 'Create New Space', category: 'Actions', shortcut: '⌘N', icon: '🏗️' },
  { id: 'join-space', name: 'Join Space', category: 'Actions', shortcut: '⌘J', icon: '🚪' },
  { id: 'settings', name: 'Settings', category: 'Navigation', shortcut: '⌘,', icon: '⚙️' },
  { id: 'profile', name: 'My Profile', category: 'Navigation', shortcut: '⌘P', icon: '👤' },
  { id: 'notifications', name: 'Notifications', category: 'Navigation', shortcut: '⌘B', icon: '🔔' },
  { id: 'help', name: 'Help & Support', category: 'Support', shortcut: '⌘?', icon: '❓' },
  { id: 'logout', name: 'Sign Out', category: 'Account', shortcut: '⌘⇧Q', icon: '🚪' },
];

const mockRecentActions = [
  { id: 'r1', name: 'Computer Science Hub', type: 'space', timestamp: '2 minutes ago' },
  { id: 'r2', name: 'Updated profile photo', type: 'action', timestamp: '1 hour ago' },
  { id: 'r3', name: 'Design Studio', type: 'space', timestamp: '3 hours ago' },
];

// Command Palette Trigger Component
const CommandPaletteTrigger = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="space-y-4 text-center">
        <HiveButton onClick={() => setIsOpen(true)}>
          Open Command Palette
        </HiveButton>
        <p className="text-sm text-gray-400">
          Try: ⌘K or Click the button above
        </p>
      </div>
      <HiveCommandPalette
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        spaces={mockSpaces}
        commands={mockCommands}
        recentActions={mockRecentActions}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <CommandPaletteTrigger {...args} />
  ),
  args: {
    placeholder: 'Search spaces, commands, or actions...',
    showCategories: true,
    showKeyboardShortcuts: true,
    maxResults: 8,
  },
};

export const SpaceSearch: Story = {
  render: (args) => (
    <CommandPaletteTrigger 
      {...args}
      initialQuery="design"
      initialFilter="spaces"
    />
  ),
  args: {
    placeholder: 'Find spaces...',
    showCategories: false,
    maxResults: 5,
  },
};

export const CommandsOnly: Story = {
  render: (args) => (
    <CommandPaletteTrigger 
      {...args}
      initialFilter="commands"
    />
  ),
  args: {
    placeholder: 'Quick actions...',
    showCategories: true,
    showKeyboardShortcuts: true,
  },
};

export const MinimalMode: Story = {
  render: (args) => (
    <CommandPaletteTrigger {...args} />
  ),
  args: {
    placeholder: 'Search...',
    showCategories: false,
    showKeyboardShortcuts: false,
    maxResults: 4,
  },
};

export const WithRecentActions: Story = {
  render: (args) => (
    <CommandPaletteTrigger {...args} />
  ),
  args: {
    placeholder: 'Search or continue recent actions...',
    showRecentActions: true,
    showCategories: true,
    maxResults: 6,
  },
};

export const PowerUserMode: Story = {
  render: (args) => (
    <CommandPaletteTrigger {...args} />
  ),
  args: {
    placeholder: 'Advanced search with filters and shortcuts...',
    showCategories: true,
    showKeyboardShortcuts: true,
    showRecentActions: true,
    showAdvancedFilters: true,
    maxResults: 10,
  },
};

// Interactive Showcase
export const InteractiveShowcase: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState<string>('');
    
    const handleCommand = (command: any) => {
      setSelectedCommand(`Executed: ${command.name} (${command.category})`);
      setIsOpen(false);
    };
    
    const handleSpaceSelect = (space: any) => {
      setSelectedCommand(`Navigating to: ${space.name} (${space.type})`);
      setIsOpen(false);
    };
    
    return (
      <div className="space-y-6 max-w-md">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Interactive Command Palette</h3>
          <p className="text-sm text-gray-400">
            Try searching for spaces, commands, or use keyboard shortcuts
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <HiveButton onClick={() => setIsOpen(true)}>
              Open Palette
            </HiveButton>
            <HiveButton 
              variant="outline"
              onClick={() => {
                setIsOpen(true);
                // Pre-populate with 'create' query
              }}
            >
              Quick Create
            </HiveButton>
          </div>
          
          {selectedCommand && (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              {selectedCommand}
            </div>
          )}
        </div>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="font-medium">Keyboard Shortcuts:</div>
          <div className="grid grid-cols-2 gap-2">
            <div>⌘K - Open palette</div>
            <div>⌘N - Create space</div>
            <div>⌘J - Join space</div>
            <div>⌘P - Profile</div>
            <div>↑/↓ - Navigate</div>
            <div>⏎ - Select</div>
          </div>
        </div>
        
        <HiveCommandPalette
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          spaces={mockSpaces}
          commands={mockCommands}
          recentActions={mockRecentActions}
          onCommandSelect={handleCommand}
          onSpaceSelect={handleSpaceSelect}
          placeholder="Search everything..."
          showCategories={true}
          showKeyboardShortcuts={true}
          showRecentActions={true}
          maxResults={8}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive command palette with real command execution and space navigation. Test all features and keyboard shortcuts.',
      },
    },
  },
};