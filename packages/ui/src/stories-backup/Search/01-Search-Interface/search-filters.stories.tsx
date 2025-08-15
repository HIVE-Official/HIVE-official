import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/01-Search Interface/SearchFilters',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Category filters and sorting options for refining search results'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
type SpaceCategory = 'all' | 'academic' | 'residential' | 'interest';
type SortOption = 'relevance' | 'popularity' | 'activity' | 'members' | 'newest';
type ActivityLevel = 'all' | 'high' | 'medium' | 'low';

interface FilterState {
  category: SpaceCategory;
  sortBy: SortOption;
  activity: ActivityLevel;
  memberRange: [number, number];
  showOnlyJoined: boolean;
}

// Filter Components
const CategoryFilter: React.FC<{
  value: SpaceCategory;
  onChange: (category: SpaceCategory) => void;
}> = ({ value, onChange }) => {
  const categories = [
    { id: 'all', name: 'All Spaces', icon: '🌐', count: 847 },
    { id: 'academic', name: 'Academic', icon: '🎓', count: 324 },
    { id: 'residential', name: 'Residential', icon: '🏠', count: 156 },
    { id: 'interest', name: 'Interest Groups', icon: '🎯', count: 367 },
  ] as const;

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-hive-text-primary">Categories</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors
              ${value === category.id
                ? 'bg-hive-brand-primary text-white border-hive-brand-primary'
                : 'bg-white text-hive-text-secondary border-hive-border-default hover:border-hive-brand-primary hover:text-hive-text-primary'
              }
            `}
          >
            <span className="text-base">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              value === category.id 
                ? 'bg-white/20 text-white' 
                : 'bg-hive-background-primary text-hive-text-secondary'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SortFilter: React.FC<{
  value: SortOption;
  onChange: (sort: SortOption) => void;
}> = ({ value, onChange }) => {
  const sortOptions = [
    { id: 'relevance', name: 'Most Relevant', description: 'Best matches for your search' },
    { id: 'popularity', name: 'Most Popular', description: 'Highest join rate and engagement' },
    { id: 'activity', name: 'Most Active', description: 'Recent posts and coordination' },
    { id: 'members', name: 'Most Members', description: 'Largest communities' },
    { id: 'newest', name: 'Newest', description: 'Recently created spaces' },
  ] as const;

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-hive-text-primary">Sort By</div>
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              w-full text-left p-3 rounded-xl border transition-colors
              ${value === option.id
                ? 'bg-hive-brand-primary/10 border-hive-brand-primary text-hive-text-primary'
                : 'bg-white border-hive-border-default hover:border-hive-brand-primary hover:bg-hive-background-primary'
              }
            `}
          >
            <div className="font-medium text-hive-text-primary">{option.name}</div>
            <div className="text-sm text-hive-text-secondary">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ActivityFilter: React.FC<{
  value: ActivityLevel;
  onChange: (activity: ActivityLevel) => void;
}> = ({ value, onChange }) => {
  const activityLevels = [
    { id: 'all', name: 'All Activity', color: 'bg-hive-text-secondary' },
    { id: 'high', name: 'High Activity', color: 'bg-hive-status-success' },
    { id: 'medium', name: 'Medium Activity', color: 'bg-hive-status-warning' },
    { id: 'low', name: 'Low Activity', color: 'bg-hive-status-error' },
  ] as const;

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-hive-text-primary">Activity Level</div>
      <div className="space-y-2">
        {activityLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            className={`
              w-full text-left p-3 rounded-xl border transition-colors flex items-center gap-3
              ${value === level.id
                ? 'bg-hive-brand-primary/10 border-hive-brand-primary'
                : 'bg-white border-hive-border-default hover:border-hive-brand-primary hover:bg-hive-background-primary'
              }
            `}
          >
            <div className={`w-3 h-3 rounded-full ${level.color}`} />
            <span className="font-medium text-hive-text-primary">{level.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MemberRangeFilter: React.FC<{
  value: [number, number];
  onChange: (range: [number, number]) => void;
}> = ({ value, onChange }) => {
  const [min, max] = value;
  
  const presets = [
    { label: 'Small (1-25)', range: [1, 25] as [number, number] },
    { label: 'Medium (26-100)', range: [26, 100] as [number, number] },
    { label: 'Large (101-500)', range: [101, 500] as [number, number] },
    { label: 'Huge (500+)', range: [500, 9999] as [number, number] },
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-hive-text-primary">Member Count</div>
      
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onChange(preset.range)}
            className={`
              p-2 text-sm rounded-lg border transition-colors
              ${min === preset.range[0] && max === preset.range[1]
                ? 'bg-hive-brand-primary text-white border-hive-brand-primary'
                : 'bg-white text-hive-text-secondary border-hive-border-default hover:border-hive-brand-primary'
              }
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="number"
            value={min}
            onChange={(e) => onChange([parseInt(e.target.value) || 0, max])}
            placeholder="Min"
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          />
        </div>
        <span className="text-hive-text-secondary">to</span>
        <div className="flex-1">
          <input
            type="number"
            value={max === 9999 ? '' : max}
            onChange={(e) => onChange([min, parseInt(e.target.value) || 9999])}
            placeholder="Max"
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

const QuickFilters: React.FC<{
  showOnlyJoined: boolean;
  onToggleJoined: (show: boolean) => void;
  onClearAll: () => void;
}> = ({ showOnlyJoined, onToggleJoined, onClearAll }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onToggleJoined(!showOnlyJoined)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors
          ${showOnlyJoined
            ? 'bg-hive-brand-primary text-white border-hive-brand-primary'
            : 'bg-white text-hive-text-secondary border-hive-border-default hover:border-hive-brand-primary'
          }
        `}
      >
        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
          showOnlyJoined ? 'border-white bg-white' : 'border-hive-border-default'
        }`}>
          {showOnlyJoined && (
            <svg className="w-3 h-3 text-hive-brand-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="text-sm font-medium">Only spaces I've joined</span>
      </button>

      <button
        onClick={onClearAll}
        className="px-3 py-2 text-sm text-hive-text-secondary hover:text-hive-text-primary transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
};

// Main Filter Component
const SearchFilters: React.FC<{
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  layout?: 'horizontal' | 'vertical' | 'sidebar';
}> = ({ filters, onFiltersChange, layout = 'horizontal' }) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      sortBy: 'relevance',
      activity: 'all',
      memberRange: [1, 9999],
      showOnlyJoined: false,
    });
  };

  if (layout === 'sidebar') {
    return (
      <div className="w-80 bg-white rounded-2xl p-6 border border-hive-border-default space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-hive-text-primary">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-hive-text-secondary hover:text-hive-text-primary"
          >
            Clear all
          </button>
        </div>

        <CategoryFilter
          value={filters.category}
          onChange={(category) => updateFilter('category', category)}
        />

        <SortFilter
          value={filters.sortBy}
          onChange={(sortBy) => updateFilter('sortBy', sortBy)}
        />

        <ActivityFilter
          value={filters.activity}
          onChange={(activity) => updateFilter('activity', activity)}
        />

        <MemberRangeFilter
          value={filters.memberRange}
          onChange={(memberRange) => updateFilter('memberRange', memberRange)}
        />

        <div className="pt-4 border-t border-hive-border-default">
          <button
            onClick={() => updateFilter('showOnlyJoined', !filters.showOnlyJoined)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl border transition-colors
              ${filters.showOnlyJoined
                ? 'bg-hive-brand-primary/10 border-hive-brand-primary'
                : 'bg-white border-hive-border-default hover:border-hive-brand-primary'
              }
            `}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              filters.showOnlyJoined ? 'border-hive-brand-primary bg-hive-brand-primary' : 'border-hive-border-default'
            }`}>
              {filters.showOnlyJoined && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="font-medium text-hive-text-primary">Only my spaces</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-hive-border-default space-y-6">
      <QuickFilters
        showOnlyJoined={filters.showOnlyJoined}
        onToggleJoined={(show) => updateFilter('showOnlyJoined', show)}
        onClearAll={clearAllFilters}
      />

      <div className={layout === 'vertical' ? 'space-y-6' : 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'}>
        <CategoryFilter
          value={filters.category}
          onChange={(category) => updateFilter('category', category)}
        />

        <SortFilter
          value={filters.sortBy}
          onChange={(sortBy) => updateFilter('sortBy', sortBy)}
        />

        <ActivityFilter
          value={filters.activity}
          onChange={(activity) => updateFilter('activity', activity)}
        />

        <MemberRangeFilter
          value={filters.memberRange}
          onChange={(memberRange) => updateFilter('memberRange', memberRange)}
        />
      </div>
    </div>
  );
};

export const BasicSearchFilters: Story = {
  name: '🏷️ Basic Search Filters',
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      category: 'all',
      sortBy: 'relevance',
      activity: 'all',
      memberRange: [1, 9999],
      showOnlyJoined: false,
    });

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Search Filters</h1>
            <p className="text-hive-text-secondary">Category filters and sorting options for search results</p>
          </div>

          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            layout="horizontal"
          />

          {/* Current Filters Display */}
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
            <h3 className="text-lg font-bold text-hive-text-primary mb-4">Current Filter State</h3>
            <pre className="text-sm bg-hive-background-primary p-4 rounded-lg overflow-auto">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
};

export const FilterLayouts: Story = {
  name: '📐 Filter Layouts',
  render: () => {
    const [horizontalFilters, setHorizontalFilters] = useState<FilterState>({
      category: 'academic',
      sortBy: 'popularity',
      activity: 'high',
      memberRange: [26, 100],
      showOnlyJoined: false,
    });

    const [sidebarFilters, setSidebarFilters] = useState<FilterState>({
      category: 'interest',
      sortBy: 'activity',
      activity: 'all',
      memberRange: [1, 9999],
      showOnlyJoined: true,
    });

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Filter Layouts</h1>
            <p className="text-hive-text-secondary">Different layout options for various use cases</p>
          </div>

          {/* Horizontal Layout */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-hive-text-primary">Horizontal Layout</h2>
            <p className="text-hive-text-secondary">Best for main search pages with plenty of horizontal space</p>
            <SearchFilters
              filters={horizontalFilters}
              onFiltersChange={setHorizontalFilters}
              layout="horizontal"
            />
          </div>

          {/* Sidebar Layout */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-hive-text-primary">Sidebar Layout</h2>
            <p className="text-hive-text-secondary">Compact vertical layout for sidebars and narrow spaces</p>
            <div className="flex gap-8">
              <SearchFilters
                filters={sidebarFilters}
                onFiltersChange={setSidebarFilters}
                layout="sidebar"
              />
              <div className="flex-1 bg-white rounded-2xl p-8 border border-hive-border-default">
                <div className="text-center text-hive-text-secondary">
                  <div className="mb-4 text-4xl">📋</div>
                  <div>Search results would appear here</div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Usage Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Filter Types</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Category filtering (Academic, Residential, Interest)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Sorting options (Relevance, Popularity, Activity)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Activity level filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Member count ranges
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Layout Options</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Horizontal: Main search pages
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Sidebar: Browse and discovery pages
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Vertical: Mobile and narrow layouts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full" />
                    Quick filters for common actions
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