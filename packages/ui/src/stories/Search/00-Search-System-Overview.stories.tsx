import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Search/00-Search System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Search & Discovery System Overview - Complete system for finding and discovering spaces with basic search functionality and browsing capabilities.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchSystemOverview: Story = {
  name: '🔍 Search System Overview',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
              Search & Discovery System
            </div>
            <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
              Help students find and discover spaces that enhance their campus coordination and social utility
            </div>
          </div>

          {/* System Architecture */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">System Architecture</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Search Interface */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Search Interface</h3>
                  <p className="text-hive-text-secondary">Core search functionality</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🎯 Basic Search Bar</div>
                    <div className="text-sm text-hive-text-secondary">Traditional search with autocomplete and suggestions</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">⌨️ Command Palette</div>
                    <div className="text-sm text-hive-text-secondary">Quick search with keyboard shortcuts (⌘K)</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🏷️ Category Filters</div>
                    <div className="text-sm text-hive-text-secondary">Filter by academic, residential, interest-based spaces</div>
                  </div>
                </div>
              </div>

              {/* Discovery Engine */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🧭
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Discovery Engine</h3>
                  <p className="text-hive-text-secondary">Space recommendations</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">📊 Trending Spaces</div>
                    <div className="text-sm text-hive-text-secondary">Popular spaces based on recent activity and member growth</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🎓 Academic Matching</div>
                    <div className="text-sm text-hive-text-secondary">Spaces relevant to your major and courses</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👥 Social Proximity</div>
                    <div className="text-sm text-hive-text-secondary">Spaces where your connections are active</div>
                  </div>
                </div>
              </div>

              {/* Browse Experience */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📋
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Browse Experience</h3>
                  <p className="text-hive-text-secondary">Organized space exploration</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🗂️ Category Browsing</div>
                    <div className="text-sm text-hive-text-secondary">Organized by academic, residential, interest categories</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🔢 Sorting Options</div>
                    <div className="text-sm text-hive-text-secondary">Sort by popularity, activity, member count, relevance</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👁️ Space Previews</div>
                    <div className="text-sm text-hive-text-secondary">Rich space cards with activity and member info</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Search Capabilities</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Text Search</div>
                    <div className="text-sm text-blue-600">Search space names, descriptions, and tags</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Live Autocomplete</div>
                    <div className="text-sm text-blue-600">Real-time suggestions as you type</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Category Filtering</div>
                    <div className="text-sm text-blue-600">Filter by space type and characteristics</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Recent Searches</div>
                    <div className="text-sm text-blue-600">Quick access to previously searched spaces</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Discovery Features</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Trending Spaces</div>
                    <div className="text-sm text-green-600">Discover popular and growing communities</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Academic Relevance</div>
                    <div className="text-sm text-green-600">Spaces related to your major and courses</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Social Connections</div>
                    <div className="text-sm text-green-600">Spaces where your connections are active</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Activity Matching</div>
                    <div className="text-sm text-green-600">Spaces with coordination patterns you'd enjoy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component Structure */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Component Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🔍 Search Components</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• SearchBar - Main search input</li>
                  <li>• CommandPalette - Quick search modal</li>
                  <li>• SearchSuggestions - Autocomplete dropdown</li>
                  <li>• SearchFilters - Category and sorting filters</li>
                  <li>• SearchResults - Results list display</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🧭 Discovery Components</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• TrendingSpaces - Popular space showcase</li>
                  <li>• RecommendedSpaces - Personalized suggestions</li>
                  <li>• CategoryBrowser - Browse by category</li>
                  <li>• SpacePreviewCard - Rich space information</li>
                  <li>• DiscoveryFeed - Curated space discovery</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">📋 Browse Components</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• BrowseHeader - Category navigation</li>
                  <li>• SortOptions - Result ordering controls</li>
                  <li>• SpaceGrid - Grid layout for spaces</li>
                  <li>• SpaceListView - List layout alternative</li>
                  <li>• LoadMoreButton - Pagination control</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Progress */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Development Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">✅ Completed</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">System architecture planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Component structure design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Feature requirements definition</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">🚧 In Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Search interface components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Discovery engine components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Browse experience components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Integration with space system</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Storybook Navigation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="font-bold text-blue-800 mb-2">Search Interface</h3>
                <p className="text-sm text-blue-600 mb-4">Core search functionality and user interface components</p>
                <div className="text-xs text-blue-500">Search → 01-Search Interface</div>
              </div>

              <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
                <div className="text-3xl mb-4">🧭</div>
                <h3 className="font-bold text-green-800 mb-2">Discovery Engine</h3>
                <p className="text-sm text-green-600 mb-4">Space recommendations and trending content</p>
                <div className="text-xs text-green-500">Search → 02-Discovery Engine</div>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 text-center">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="font-bold text-purple-800 mb-2">Browse Experience</h3>
                <p className="text-sm text-purple-600 mb-4">Organized browsing and category exploration</p>
                <div className="text-xs text-purple-500">Search → 03-Browse Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};