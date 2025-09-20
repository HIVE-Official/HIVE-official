"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  Plus, 
  Search, 
  Filter, 
  Wand2, 
  Sparkles, 
  Target, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Zap, 
  ChevronRight,
  Clock,
  TrendingUp,
  Star,
  ArrowRight,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ElementDefinition, ElementCategory } from '../hivelab/element-browser';
// import { SpaceDefinition } from '../spaces/space-system-core';

interface LibraryContextualAccessProps {
  space: any; // SpaceDefinition;
  onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
  onClose?: () => void;
  isOpen?: boolean;
  triggerRef?: React.RefObject<HTMLElement>
}

interface ToolSuggestion {
  element: ElementDefinition;
  relevanceScore: number;
  reason: string;
  category: 'trending' | 'recommended' | 'space_specific' | 'popular'
}

interface ContextualCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  elements: ElementDefinition[];
  priority: number
}

// Mock contextual suggestions based on space type and current tools
const generateContextualSuggestions = (space: any): ToolSuggestion[] => {
  // Mock element data - in production, this would come from the Element Browser
  const mockElements: ElementDefinition[] = [
    {
      id: 'poll-creator',
      name: 'Quick Poll',
      description: 'Create instant polls for group decisions and feedback',
      category: 'social',
      type: 'text_input',
      version: '1.0.0',
      author: 'HIVE Team',
      authorType: 'hive_team',
      icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
      previewComponent: () => <div className="text-sm text-gray-600">Poll preview</div>,
      configComponent: () => <div>Poll Config</div>,
      props: [],
      defaultProps: {},
      downloads: 2543,
      likes: 189,
      rating: 4.8,
      ratingCount: 67,
      tags: ['poll', 'voting', 'decision', 'group'],
      complexity: 'beginner',
      isVerified: true,
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'study-timer',
      name: 'Focus Timer',
      description: 'Pomodoro-style timer for study sessions and productivity',
      category: 'action',
      type: 'button',
      version: '2.0.0',
      author: 'StudyHive',
      authorType: 'student',
      icon: ({ className }: { className?: string }) => <Clock className={className} />,
      previewComponent: () => <div className="text-sm text-gray-600">Timer preview</div>,
      configComponent: () => <div>Timer Config</div>,
      props: [],
      defaultProps: {},
      downloads: 1876,
      likes: 143,
      rating: 4.6,
      ratingCount: 89,
      tags: ['timer', 'focus', 'pomodoro', 'study'],
      complexity: 'beginner',
      isVerified: true,
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'attendance-tracker',
      name: 'Attendance Tracker',
      description: 'Track meeting and event attendance with check-in codes',
      category: 'data',
      type: 'table',
      version: '1.5.0',
      author: 'OrganizeU',
      authorType: 'faculty',
      icon: ({ className }: { className?: string }) => <Users className={className} />,
      previewComponent: () => <div className="text-sm text-gray-600">Attendance preview</div>,
      configComponent: () => <div>Attendance Config</div>,
      props: [],
      defaultProps: {},
      downloads: 987,
      likes: 76,
      rating: 4.4,
      ratingCount: 34,
      tags: ['attendance', 'tracking', 'meetings', 'organization'],
      complexity: 'intermediate',
      isVerified: true,
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'mood-check',
      name: 'Team Mood Check',
      description: 'Quick anonymous mood surveys for team wellness',
      category: 'social',
      type: 'text_input',
      version: '1.2.0',
      author: 'WellnessLab',
      authorType: 'community',
      icon: ({ className }: { className?: string }) => <MessageSquare className={className} />,
      previewComponent: () => <div className="text-sm text-gray-600">Mood check preview</div>,
      configComponent: () => <div>Mood Config</div>,
      props: [],
      defaultProps: {},
      downloads: 1234,
      likes: 98,
      rating: 4.7,
      ratingCount: 56,
      tags: ['mood', 'wellness', 'team', 'survey'],
      complexity: 'beginner',
      isVerified: false,
      isPremium: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Generate contextual suggestions based on space category and existing tools
  const suggestions: ToolSuggestion[] = [];

  // Space-specific recommendations
  switch (space.category) {
    case 'study':
      suggestions.push({
        element: mockElements.find(e => e.id === 'study-timer')!,
        relevanceScore: 0.9,
        reason: 'Perfect for study group productivity',
        category: 'space_specific'
      })};
      break;
    
    case 'social':
      suggestions.push({
        element: mockElements.find(e => e.id === 'poll-creator')!,
        relevanceScore: 0.8,
        reason: 'Great for group decision making',
        category: 'space_specific'
      })};
      break;
    
    case 'clubs':
      suggestions.push({
        element: mockElements.find(e => e.id === 'attendance-tracker')!,
        relevanceScore: 0.9,
        reason: 'Essential for club meeting management',
        category: 'space_specific'
      })};
      break
  }

  // Trending tools
  suggestions.push({
    element: mockElements.find(e => e.id === 'mood-check')!,
    relevanceScore: 0.7,
    reason: 'Trending in wellness communities',
    category: 'trending'
  });

  // Popular recommendations
  mockElements
    .filter(e => e.downloads > 1500)
    .forEach(element => {
      if (!suggestions.find(s => s.element.id === element.id)) {
        suggestions.push({
          element,
          relevanceScore: 0.6,
          reason: `Popular choice with ${element.downloads.toLocaleString()} downloads`,
          category: 'popular'
        })
      }
    });

  return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore)
};

const SuggestionCard = ({ 
  suggestion, 
  onInstall, 
  onPreview 
}: { 
  suggestion: ToolSuggestion; 
  onInstall: (elementId: string) => void;
  onPreview: (element: ElementDefinition) => void
}) => {
  const { element, reason, category } = suggestion;
  const IconComponent = element.icon;

  const categoryConfig = {
    trending: { label: 'Trending', className: 'bg-purple-100 text-purple-800 border-purple-200' },
    recommended: { label: 'Recommended', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    space_specific: { label: 'For This Space', className: 'bg-green-100 text-green-800 border-green-200' },
    popular: { label: 'Popular', className: 'bg-amber-100 text-amber-800 border-amber-200' }
  };

  return (
    <HiveCard className="p-4 hover:shadow-md transition-all group cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                {element.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {element.description}
              </p>
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <HiveBadge className={categoryConfig[category].className}>
                {categoryConfig[category].label}
              </HiveBadge>
              {element.isVerified && (
                <HiveBadge className="bg-green-100 text-green-800 border-green-200">
                  ✓
                </HiveBadge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {element.rating}
              </span>
              <span>{element.downloads.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <HiveButton 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(element)
          }}
              >
                Preview
              </HiveButton>
              <HiveButton 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onInstall(element.id)
          }}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </HiveButton>
            </div>
          </div>
          
          <div className="mt-2 p-2 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600">{reason}</p>
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

const CategorySection = ({ 
  category, 
  suggestions, 
  onInstall, 
  onPreview 
}: { 
  category: ContextualCategory;
  suggestions: ToolSuggestion[];
  onInstall: (elementId: string) => void;
  onPreview: (element: ElementDefinition) => void
}) => {
  const IconComponent = category.icon;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <IconComponent className="w-5 h-5 text-amber-600" />
        <h3 className="font-semibold text-gray-900">{category.title}</h3>
        <span className="text-sm text-gray-500">({suggestions.length})</span>
      </div>
      <p className="text-sm text-gray-600">{category.description}</p>
      
      <div className="grid gap-3">
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.element.id}
            suggestion={suggestion}
            onInstall={onInstall}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  )
};

export function LibraryContextualAccess({ 
  space, 
  onToolInstall, 
  onClose, 
  isOpen = false,
  triggerRef 
}: LibraryContextualAccessProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(() => generateContextualSuggestions(space), [space]);

  // Group suggestions by category
  const categorizedSuggestions = useMemo(() => {
    const categories: ContextualCategory[] = [
      {
        id: 'space_specific',
        title: `Perfect for ${space.category} spaces`,
        description: `Tools specifically designed for ${space.category} communities like yours`,
        icon: Target,
        elements: [],
        priority: 1
      },
      {
        id: 'trending',
        title: 'Trending Now',
        description: 'Popular tools that communities are adding this week',
        icon: TrendingUp,
        elements: [],
        priority: 2
      },
      {
        id: 'popular',
        title: 'Community Favorites',
        description: 'Most downloaded and highest-rated tools',
        icon: Star,
        elements: [],
        priority: 3
      }
    ];

    // Group suggestions by category
    suggestions.forEach(suggestion => {
      const category = categories.find(c => c.id === suggestion.category);
      if (category) {
        category.elements.push(suggestion.element)
      }
    });

    return categories
      .filter(category => category.elements.length > 0)
      .sort((a, b) => a.priority - b.priority)
  }, [suggestions, space.category]);

  const filteredSuggestions = useMemo(() => {
    let filtered = suggestions;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(suggestion =>
        suggestion.element.name.toLowerCase().includes(query) ||
        suggestion.element.description.toLowerCase().includes(query) ||
        suggestion.element.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.category === activeCategory)
    }

    return filtered
  }, [suggestions, searchQuery, activeCategory]);

  const handleInstall = useCallback(async (elementId: string) => {
    setLoading(true);
    try {
      await onToolInstall?.(elementId);
      onClose?.()
    } catch (error) {
      console.error('Failed to install tool:', error)
    } finally {
      setLoading(false)
    }
  }, [onToolInstall, onClose]);

  const handlePreview = useCallback((element: ElementDefinition) => {
    // Open element preview modal or navigate to preview
    console.log('Preview element:', element)
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-amber-500" />
                Add Tools to {space.name}
              </h2>
              <p className="text-gray-600">
                Discover tools perfect for your {space.category} community
              </p>
            </div>
            
            <HiveButton variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </HiveButton>
          </div>

          {/* Search & Filters */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="space_specific">Space Specific</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" />
              <p className="text-gray-600">Installing tool...</p>
            </div>
          ) : filteredSuggestions.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tools Found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try different search terms' : 'No tools available for the selected category'}
              </p>
            </div>
          ) : searchQuery || activeCategory !== 'all' ? (
            /* Filtered Results */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {filteredSuggestions.length} tool{filteredSuggestions.length !== 1 ? 's' : ''} found
                </h3>
              </div>
              
              <div className="grid gap-3">
                {filteredSuggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.element.id}
                    suggestion={suggestion}
                    onInstall={handleInstall}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Categorized View */
            <div className="space-y-8">
              {categorizedSuggestions.map((category) => {
                const categorySuggestions = suggestions.filter(s => s.category === category.id);
                return (
                  <CategorySection
                    key={category.id}
                    category={category}
                    suggestions={categorySuggestions}
                    onInstall={handleInstall}
                    onPreview={handlePreview}
                  />
                )
          })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Can't find what you need? <button className="text-amber-600 hover:text-amber-700 font-medium">Browse all tools</button>
            </div>
            
            <div className="flex items-center gap-2">
              <HiveButton variant="outline" onClick={onClose}>
                Cancel
              </HiveButton>
              <HiveButton onClick={() => console.log('Browse HiveLAB')}>
                <Zap className="w-4 h-4 mr-2" />
                Browse HiveLAB
              </HiveButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibraryContextualAccess;