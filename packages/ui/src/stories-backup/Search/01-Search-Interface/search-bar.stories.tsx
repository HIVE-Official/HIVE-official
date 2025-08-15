import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';

const meta = {
  title: 'Search/01-Search Interface/SearchBar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Primary search input component with live autocomplete, recent searches, and category filtering'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo data
const DEMO_SPACES = [
  { id: '1', name: 'CS 220 Study Group', type: 'academic', members: 47, activity: 'high' },
  { id: '2', name: 'Richmond Quad Floor 3', type: 'residential', members: 23, activity: 'medium' },
  { id: '3', name: 'Ultimate Frisbee Club', type: 'interest', members: 89, activity: 'high' },
  { id: '4', name: 'Data Structures & Algorithms', type: 'academic', members: 156, activity: 'high' },
  { id: '5', name: 'Photography Enthusiasts', type: 'interest', members: 34, activity: 'low' },
  { id: '6', name: 'Ellicott Complex Gaming', type: 'residential', members: 67, activity: 'medium' },
  { id: '7', name: 'Engineering Career Prep', type: 'academic', members: 203, activity: 'high' },
  { id: '8', name: 'South Campus Events', type: 'residential', members: 145, activity: 'medium' },
];

const RECENT_SEARCHES = [
  'Study groups',
  'CS 220',
  'Richmond',
  'Career prep'
];

// Search Bar Component
const SearchBar: React.FC<{
  placeholder?: string;
  onSearch?: (query: string) => void;
  showSuggestions?: boolean;
  showRecentSearches?: boolean;
}> = ({ 
  placeholder = "Search spaces...", 
  onSearch,
  showSuggestions = true,
  showRecentSearches = true 
}) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof DEMO_SPACES>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = DEMO_SPACES.filter(space =>
        space.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      setIsActive(false);
    }
  };

  const handleSuggestionClick = (space: typeof DEMO_SPACES[0]) => {
    setQuery(space.name);
    onSearch?.(space.name);
    setIsActive(false);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    onSearch?.(search);
    setIsActive(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center bg-white rounded-2xl border-2 transition-colors duration-200
          ${isActive ? 'border-hive-brand-primary shadow-lg' : 'border-hive-border-default'}
        `}>
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
            onFocus={() => setIsActive(true)}
            onBlur={() => setTimeout(() => setIsActive(false), 200)}
            placeholder={placeholder}
            className="flex-1 py-4 pr-6 text-hive-text-primary placeholder-hive-text-secondary bg-transparent border-none outline-none text-lg"
          />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mr-6 p-1 rounded-full hover:bg-hive-background-primary transition-colors"
            >
              <svg className="w-4 h-4 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isActive && (showSuggestions || showRecentSearches) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-hive-border-default shadow-xl z-50 overflow-hidden">
          {query.length === 0 && showRecentSearches && RECENT_SEARCHES.length > 0 && (
            <div className="p-4 border-b border-hive-border-default">
              <div className="text-sm font-semibold text-hive-text-secondary mb-3">Recent Searches</div>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="px-3 py-1 bg-hive-background-primary rounded-full text-sm text-hive-text-secondary hover:bg-hive-brand-primary hover:text-white transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && showSuggestions && (
            <div className="p-2">
              <div className="text-sm font-semibold text-hive-text-secondary mb-2 px-3">Spaces</div>
              {suggestions.map((space) => (
                <button
                  key={space.id}
                  onClick={() => handleSuggestionClick(space)}
                  className="w-full p-3 text-left hover:bg-hive-background-primary rounded-xl transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-hive-text-primary">{space.name}</div>
                    <div className="text-sm text-hive-text-secondary capitalize">
                      {space.type} • {space.members} members
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      space.activity === 'high' ? 'bg-hive-status-success' :
                      space.activity === 'medium' ? 'bg-hive-status-warning' :
                      'bg-hive-status-error'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && suggestions.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-hive-text-secondary">No spaces found for "{query}"</div>
              <button className="mt-2 text-hive-brand-primary hover:underline text-sm">
                Browse all categories instead
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const BasicSearchBar: Story = {
  name: '🔍 Basic Search Bar',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Search Bar Component</h1>
            <p className="text-hive-text-secondary">Primary search input with autocomplete and recent searches</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-hive-text-primary">Default Search Bar</h2>
              <SearchBar onSearch={(query) => console.log('Search:', query)} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-hive-text-primary">Without Suggestions</h2>
              <SearchBar 
                placeholder="Search for academic spaces..."
                showSuggestions={false}
                onSearch={(query) => console.log('Search:', query)} 
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-hive-text-primary">Minimal (No Recent Searches)</h2>
              <SearchBar 
                placeholder="Find your community..."
                showRecentSearches={false}
                onSearch={(query) => console.log('Search:', query)} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const SearchBarStates: Story = {
  name: '🎯 Search Bar States',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Search Bar States</h1>
            <p className="text-hive-text-secondary">Different states and interactions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Default State */}
            <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
              <h3 className="font-bold text-hive-text-primary mb-4">Default State</h3>
              <SearchBar placeholder="Search spaces..." />
            </div>

            {/* With Content */}
            <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
              <h3 className="font-bold text-hive-text-primary mb-4">With Content</h3>
              <SearchBar placeholder="Search spaces..." />
              <div className="text-sm text-hive-text-secondary mt-2">Try typing "CS" or "Richmond"</div>
            </div>

            {/* Academic Focus */}
            <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
              <h3 className="font-bold text-hive-text-primary mb-4">Academic Focus</h3>
              <SearchBar placeholder="Find study groups and academic spaces..." />
            </div>

            {/* Residential Focus */}
            <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
              <h3 className="font-bold text-hive-text-primary mb-4">Residential Focus</h3>
              <SearchBar placeholder="Search dorms and residence communities..." />
            </div>
          </div>

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Usage Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Features</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Live autocomplete as you type
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Recent searches quick access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Space activity indicators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Clear button when typing
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Interaction Patterns</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Focus highlights border in brand color
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Suggestions appear below search bar
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Click suggestion to select
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Enter key to search current query
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};