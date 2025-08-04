import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useRef } from 'react';

const meta = {
  title: 'Search/01-Search Interface/CommandPalette',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Quick search modal activated with ⌘K, providing fast access to spaces and actions'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo data
const DEMO_SPACES = [
  { id: '1', name: 'CS 220 Study Group', type: 'academic', members: 47, activity: 'high', icon: '📚' },
  { id: '2', name: 'Richmond Quad Floor 3', type: 'residential', members: 23, activity: 'medium', icon: '🏠' },
  { id: '3', name: 'Ultimate Frisbee Club', type: 'interest', members: 89, activity: 'high', icon: '🥏' },
  { id: '4', name: 'Data Structures & Algorithms', type: 'academic', members: 156, activity: 'high', icon: '💻' },
  { id: '5', name: 'Photography Enthusiasts', type: 'interest', members: 34, activity: 'low', icon: '📸' },
  { id: '6', name: 'Ellicott Complex Gaming', type: 'residential', members: 67, activity: 'medium', icon: '🎮' },
];

const QUICK_ACTIONS = [
  { id: 'create-space', name: 'Create New Space', icon: '➕', category: 'action' },
  { id: 'join-space', name: 'Join Space by Code', icon: '🔗', category: 'action' },
  { id: 'browse-academic', name: 'Browse Academic Spaces', icon: '🎓', category: 'browse' },
  { id: 'browse-residential', name: 'Browse Residential Spaces', icon: '🏠', category: 'browse' },
  { id: 'browse-interest', name: 'Browse Interest Groups', icon: '🎯', category: 'browse' },
];

// Command Palette Component
const CommandPalette: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  onAction?: (actionId: string) => void;
}> = ({ isOpen, onClose, onSearch, onAction }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredResults(QUICK_ACTIONS);
    } else {
      const spaceResults = DEMO_SPACES
        .filter(space => space.name.toLowerCase().includes(query.toLowerCase()))
        .map(space => ({ ...space, category: 'space' }));
      
      const actionResults = QUICK_ACTIONS
        .filter(action => action.name.toLowerCase().includes(query.toLowerCase()));
      
      setFilteredResults([...spaceResults, ...actionResults]);
    }
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
        break;
    }
  };

  const handleSelect = (item: any) => {
    if (item.category === 'space') {
      onSearch?.(item.name);
    } else {
      onAction?.(item.id);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-hive-border-default overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-hive-border-default">
          <div className="pl-6 pr-4 py-4">
            <svg className="w-5 h-5 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search spaces or actions..."
            className="flex-1 py-4 pr-6 text-hive-text-primary placeholder-hive-text-secondary bg-transparent border-none outline-none text-lg"
          />
          
          <div className="px-6 py-4 text-sm text-hive-text-secondary">
            ESC to close
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-hive-text-secondary">
              {query.length === 0 ? 'Start typing to search...' : `No results for "${query}"`}
            </div>
          ) : (
            <div className="p-2">
              {query.length === 0 && (
                <div className="px-4 py-2 text-sm font-semibold text-hive-text-secondary">
                  Quick Actions
                </div>
              )}
              
              {filteredResults.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`
                    w-full p-4 text-left rounded-xl transition-colors flex items-center justify-between
                    ${index === selectedIndex ? 'bg-hive-brand-primary text-white' : 'hover:bg-hive-background-primary'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className={`font-semibold ${
                        index === selectedIndex ? 'text-white' : 'text-hive-text-primary'
                      }`}>
                        {item.name}
                      </div>
                      {item.category === 'space' && (
                        <div className={`text-sm ${
                          index === selectedIndex ? 'text-white/80' : 'text-hive-text-secondary'
                        }`}>
                          {item.type} • {item.members} members
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {item.category === 'space' && (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item.activity === 'high' ? 'bg-hive-status-success' :
                        item.activity === 'medium' ? 'bg-hive-status-warning' :
                        'bg-hive-status-error'
                      }`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-hive-border-default p-4 bg-hive-background-primary">
          <div className="flex items-center justify-between text-sm text-hive-text-secondary">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded border text-xs">ESC</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trigger Button Component
const CommandPaletteTrigger: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 bg-white border border-hive-border-default rounded-xl hover:border-hive-brand-primary transition-colors group"
    >
      <svg className="w-5 h-5 text-hive-text-secondary group-hover:text-hive-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="text-hive-text-secondary group-hover:text-hive-text-primary">Search spaces...</span>
      <div className="ml-auto flex items-center gap-1">
        <kbd className="px-2 py-1 bg-hive-background-primary rounded text-xs text-hive-text-secondary">⌘</kbd>
        <kbd className="px-2 py-1 bg-hive-background-primary rounded text-xs text-hive-text-secondary">K</kbd>
      </div>
    </button>
  );
};

export const BasicCommandPalette: Story = {
  name: '⌨️ Basic Command Palette',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    // Listen for ⌘K
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setIsOpen(true);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Command Palette</h1>
            <p className="text-hive-text-secondary">Quick search modal with keyboard shortcuts</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-hive-text-primary">Trigger Button</h2>
              <p className="text-hive-text-secondary">Click the button or press ⌘K to open the command palette</p>
              
              <div className="max-w-md">
                <CommandPaletteTrigger onClick={() => setIsOpen(true)} />
              </div>
            </div>
          </div>

          <CommandPalette
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSearch={(query) => {
              console.log('Search:', query);
              alert(`Searching for: ${query}`);
            }}
            onAction={(actionId) => {
              console.log('Action:', actionId);
              alert(`Action: ${actionId}`);
            }}
          />
        </div>
      </div>
    );
  }
};

export const CommandPaletteStates: Story = {
  name: '🎯 Command Palette States',
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    const DemoButton: React.FC<{ 
      title: string; 
      description: string; 
      demoKey: string;
      initialQuery?: string;
    }> = ({ title, description, demoKey, initialQuery }) => (
      <div className="bg-white rounded-xl p-6 border border-hive-border-default">
        <h3 className="font-bold text-hive-text-primary mb-2">{title}</h3>
        <p className="text-hive-text-secondary mb-4">{description}</p>
        <button
          onClick={() => setActiveDemo(demoKey)}
          className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
        >
          Open Demo
        </button>
      </div>
    );

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Command Palette States</h1>
            <p className="text-hive-text-secondary">Different states and use cases</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoButton
              title="Empty State"
              description="Shows quick actions when no search query"
              demoKey="empty"
            />
            
            <DemoButton
              title="Search Results"
              description="Shows spaces and filtered actions"
              demoKey="search"
            />
            
            <DemoButton
              title="No Results"
              description="Handles empty search results gracefully"
              demoKey="no-results"
            />
            
            <DemoButton
              title="Quick Actions"
              description="Shows available actions and shortcuts"
              demoKey="actions"
            />
          </div>

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Usage Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Keyboard Shortcuts</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white rounded border text-xs">⌘K</kbd>
                    <span>Open command palette</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white rounded border text-xs">↑↓</kbd>
                    <span>Navigate results</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white rounded border text-xs">↵</kbd>
                    <span>Select item</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white rounded border text-xs">ESC</kbd>
                    <span>Close palette</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Features</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Global keyboard shortcut (⌘K)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Mixed results (spaces + actions)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Keyboard navigation support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Visual feedback and states
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Demo Modals */}
          <CommandPalette
            isOpen={activeDemo === 'empty'}
            onClose={() => setActiveDemo(null)}
            onSearch={(query) => console.log('Search:', query)}
            onAction={(actionId) => console.log('Action:', actionId)}
          />
        </div>
      </div>
    );
  }
};