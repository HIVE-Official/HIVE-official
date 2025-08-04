"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  Search, 
  Filter, 
  Code, 
  Eye, 
  Settings, 
  Zap,
  MousePointer,
  Database,
  BarChart3,
  Grid,
  List,
  Play,
  Download,
  Copy,
  Star,
  Users,
  Layers,
  Package
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ElementDefinition {
  id: string;
  name: string;
  description: string;
  category: ElementCategory;
  type: ElementType;
  version: string;
  author: string;
  authorType: 'hive_team' | 'student' | 'faculty' | 'community';
  
  // Element Properties
  props: ElementProp[];
  defaultProps: Record<string, any>;
  
  // Visual & Behavior
  icon: React.ComponentType<any>;
  previewComponent: React.ComponentType<any>;
  configComponent: React.ComponentType<any>;
  
  // Usage & Popularity
  downloads: number;
  likes: number;
  rating: number;
  ratingCount: number;
  
  // Metadata
  tags: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Documentation
  documentation?: string;
  examples?: ElementExample[];
}

export type ElementCategory = 
  | 'input' 
  | 'display' 
  | 'action' 
  | 'logic' 
  | 'layout' 
  | 'data' 
  | 'social' 
  | 'media';

export type ElementType = 
  | 'text_input' 
  | 'number_input' 
  | 'date_input'
  | 'button' 
  | 'link'
  | 'text_display' 
  | 'image' 
  | 'chart'
  | 'table' 
  | 'list'
  | 'conditional' 
  | 'loop' 
  | 'api_call'
  | 'database_query'
  | 'user_profile'
  | 'space_feed';

export interface ElementProp {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'file' | 'array' | 'object';
  label: string;
  description: string;
  required: boolean;
  defaultValue?: any;
  options?: { value: any; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
}

export interface ElementExample {
  id: string;
  title: string;
  description: string;
  props: Record<string, any>;
  code?: string;
}

interface ElementBrowserProps {
  onElementSelect?: (element: ElementDefinition) => void;
  onElementPreview?: (element: ElementDefinition) => void;
  onElementInstall?: (elementId: string) => void;
  selectedCategories?: ElementCategory[];
  showInstalled?: boolean;
}

// Mock Elements Data
const MOCK_ELEMENTS: ElementDefinition[] = [
  {
    id: 'text-input',
    name: 'Text Input',
    description: 'Collect text input from users with validation and formatting options',
    category: 'input',
    type: 'text_input',
    version: '1.2.0',
    author: 'HIVE Team',
    authorType: 'hive_team',
    icon: ({ className }: { className?: string }) => <Code className={className} />,
    previewComponent: ({ value = '', placeholder = 'Enter text...' }) => (
      <input 
        type="text" 
        value={value}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        readOnly
      />
    ),
    configComponent: () => <div>Config Component</div>,
    props: [
      {
        name: 'label',
        type: 'string',
        label: 'Label',
        description: 'Text label displayed above the input',
        required: false,
        defaultValue: ''
      },
      {
        name: 'placeholder',
        type: 'string',
        label: 'Placeholder',
        description: 'Placeholder text shown when input is empty',
        required: false,
        defaultValue: 'Enter text...'
      },
      {
        name: 'required',
        type: 'boolean',
        label: 'Required',
        description: 'Whether this field is required',
        required: false,
        defaultValue: false
      },
      {
        name: 'maxLength',
        type: 'number',
        label: 'Max Length',
        description: 'Maximum number of characters allowed',
        required: false,
        validation: { min: 1, max: 1000 }
      }
    ],
    defaultProps: {
      label: '',
      placeholder: 'Enter text...',
      required: false,
      maxLength: 255
    },
    downloads: 1247,
    likes: 89,
    rating: 4.8,
    ratingCount: 45,
    tags: ['form', 'input', 'text', 'validation'],
    complexity: 'beginner',
    isVerified: true,
    isPremium: false,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    documentation: 'A versatile text input component for collecting user data.',
    examples: [
      {
        id: 'basic',
        title: 'Basic Text Input',
        description: 'Simple text input with placeholder',
        props: { placeholder: 'Enter your name' }
      },
      {
        id: 'required',
        title: 'Required Field',
        description: 'Required text input with validation',
        props: { label: 'Email Address', placeholder: 'you@example.com', required: true }
      }
    ]
  },
  {
    id: 'action-button',
    name: 'Action Button',
    description: 'Trigger actions with customizable styling and behavior',
    category: 'action',
    type: 'button',
    version: '2.1.0',
    author: 'HIVE Team',
    authorType: 'hive_team',
    icon: ({ className }: { className?: string }) => <MousePointer className={className} />,
    previewComponent: ({ label = 'Button', variant = 'primary' }) => (
      <button 
        className={cn(
          "px-4 py-2 rounded-md font-medium transition-colors",
          variant === 'primary' && "bg-amber-500 text-white hover:bg-amber-600",
          variant === 'secondary' && "bg-gray-200 text-gray-900 hover:bg-gray-300"
        )}
      >
        {label}
      </button>
    ),
    configComponent: () => <div>Button Config</div>,
    props: [
      {
        name: 'label',
        type: 'string',
        label: 'Button Text',
        description: 'Text displayed on the button',
        required: true,
        defaultValue: 'Button'
      },
      {
        name: 'variant',
        type: 'select',
        label: 'Style Variant',
        description: 'Visual style of the button',
        required: false,
        defaultValue: 'primary',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'outline', label: 'Outline' },
          { value: 'ghost', label: 'Ghost' }
        ]
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled State',
        description: 'Whether the button is disabled',
        required: false,
        defaultValue: false
      }
    ],
    defaultProps: {
      label: 'Button',
      variant: 'primary',
      disabled: false
    },
    downloads: 2156,
    likes: 156,
    rating: 4.9,
    ratingCount: 78,
    tags: ['action', 'button', 'click', 'trigger'],
    complexity: 'beginner',
    isVerified: true,
    isPremium: false,
    createdAt: new Date('2024-01-05T00:00:00Z'),
    updatedAt: new Date('2024-01-20T00:00:00Z')
  },
  {
    id: 'data-chart',
    name: 'Data Chart',
    description: 'Visualize data with interactive charts and graphs',
    category: 'display',
    type: 'chart',
    version: '1.5.0',
    author: 'DataViz Team',
    authorType: 'student',
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
    previewComponent: ({ type = 'bar', data = [] }) => (
      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">{type} Chart Preview</p>
        </div>
      </div>
    ),
    configComponent: () => <div>Chart Config</div>,
    props: [
      {
        name: 'type',
        type: 'select',
        label: 'Chart Type',
        description: 'Type of chart to display',
        required: true,
        defaultValue: 'bar',
        options: [
          { value: 'bar', label: 'Bar Chart' },
          { value: 'line', label: 'Line Chart' },
          { value: 'pie', label: 'Pie Chart' },
          { value: 'scatter', label: 'Scatter Plot' }
        ]
      },
      {
        name: 'data',
        type: 'array',
        label: 'Chart Data',
        description: 'Data to display in the chart',
        required: true,
        defaultValue: []
      },
      {
        name: 'title',
        type: 'string',
        label: 'Chart Title',
        description: 'Title displayed above the chart',
        required: false,
        defaultValue: ''
      }
    ],
    defaultProps: {
      type: 'bar',
      data: [],
      title: '',
      animated: true
    },
    downloads: 892,
    likes: 67,
    rating: 4.6,
    ratingCount: 34,
    tags: ['chart', 'graph', 'data', 'visualization', 'analytics'],
    complexity: 'intermediate',
    isVerified: true,
    isPremium: false,
    createdAt: new Date('2024-01-10T00:00:00Z'),
    updatedAt: new Date('2024-01-18T00:00:00Z')
  },
  {
    id: 'user-profile-card',
    name: 'User Profile Card',
    description: 'Display user information with avatar and social connections',
    category: 'social',
    type: 'user_profile',
    version: '1.0.0',
    author: 'Community Builder',
    authorType: 'community',
    icon: ({ className }: { className?: string }) => <Users className={className} />,
    previewComponent: ({ userName = 'John Doe', userEmail = 'john@example.com' }) => (
      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
          {userName.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{userName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
      </div>
    ),
    configComponent: () => <div>Profile Card Config</div>,
    props: [
      {
        name: 'showAvatar',
        type: 'boolean',
        label: 'Show Avatar',
        description: 'Whether to display user avatar',
        required: false,
        defaultValue: true
      },
      {
        name: 'showEmail',
        type: 'boolean',
        label: 'Show Email',
        description: 'Whether to display user email',
        required: false,
        defaultValue: true
      },
      {
        name: 'size',
        type: 'select',
        label: 'Card Size',
        description: 'Size of the profile card',
        required: false,
        defaultValue: 'medium',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ]
      }
    ],
    defaultProps: {
      showAvatar: true,
      showEmail: true,
      size: 'medium'
    },
    downloads: 543,
    likes: 89,
    rating: 4.7,
    ratingCount: 23,
    tags: ['profile', 'user', 'avatar', 'social', 'card'],
    complexity: 'intermediate',
    isVerified: false,
    isPremium: true,
    createdAt: new Date('2024-01-12T00:00:00Z'),
    updatedAt: new Date('2024-01-12T00:00:00Z')
  }
];

const ElementCard = ({ 
  element, 
  view = 'grid', 
  onSelect, 
  onPreview, 
  onInstall 
}: {
  element: ElementDefinition;
  view?: 'grid' | 'list';
  onSelect?: (element: ElementDefinition) => void;
  onPreview?: (element: ElementDefinition) => void;
  onInstall?: (elementId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = element.icon;

  if (view === 'list') {
    return (
      <HiveCard 
        className="p-4 hover:shadow-md transition-all cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect?.(element)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${element.isVerified ? '#10B981' : '#6B7280'}20` }}
            >
              <IconComponent className={cn(
                "w-6 h-6",
                element.isVerified ? "text-green-600" : "text-gray-600"
              )} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{element.name}</h3>
                <div className="flex items-center gap-1">
                  {element.isVerified && (
                    <HiveBadge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      Verified
                    </HiveBadge>
                  )}
                  {element.isPremium && (
                    <HiveBadge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                      Premium
                    </HiveBadge>
                  )}
                  <HiveBadge variant="outline" className="text-xs">
                    {element.complexity}
                  </HiveBadge>
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate mb-2">{element.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {element.rating} ({element.ratingCount})
                </span>
                <span>{element.downloads.toLocaleString()} downloads</span>
                <span>v{element.version}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HiveButton 
              size="sm" 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.(element);
              }}
            >
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </HiveButton>
            <HiveButton 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onInstall?.(element.id);
              }}
            >
              <Download className="w-3 h-3 mr-1" />
              Use
            </HiveButton>
          </div>
        </div>
      </HiveCard>
    );
  }

  return (
    <HiveCard 
      className="p-6 hover:shadow-lg transition-all cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(element)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
            style={{ backgroundColor: `${element.isVerified ? '#10B981' : '#6B7280'}20` }}
          >
            <IconComponent className={cn(
              "w-6 h-6 transition-colors",
              element.isVerified ? "text-green-600" : "text-gray-600",
              isHovered && "scale-110"
            )} />
          </div>
          
          <div className="flex items-center gap-1">
            {element.isVerified && (
              <HiveBadge className="bg-green-100 text-green-800 border-green-200 text-xs">
                ✓
              </HiveBadge>
            )}
            {element.isPremium && (
              <HiveBadge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                Pro
              </HiveBadge>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
            {element.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {element.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {element.tags.slice(0, 3).map((tag) => (
              <HiveBadge key={tag} variant="outline" className="text-xs">
                {tag}
              </HiveBadge>
            ))}
            {element.tags.length > 3 && (
              <HiveBadge variant="outline" className="text-xs">
                +{element.tags.length - 3}
              </HiveBadge>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="h-24 bg-gray-50 rounded-lg p-3 flex items-center justify-center">
          <element.previewComponent {...element.defaultProps} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              {element.rating}
            </span>
            <span>{element.downloads.toLocaleString()}</span>
          </div>
          <HiveBadge variant="outline" className="text-xs">
            {element.complexity}
          </HiveBadge>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <HiveButton 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(element);
            }}
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </HiveButton>
          <HiveButton 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onInstall?.(element.id);
            }}
          >
            <Download className="w-3 h-3 mr-1" />
            Use
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  );
};

export function ElementBrowser({ 
  onElementSelect, 
  onElementPreview, 
  onElementInstall,
  selectedCategories = [],
  showInstalled = false 
}: ElementBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ElementCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'recent' | 'name'>('popularity');
  const [complexityFilter, setComplexityFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'input', label: 'Input', icon: Code, count: 12 },
    { id: 'display', label: 'Display', icon: Eye, count: 18 },
    { id: 'action', label: 'Action', icon: MousePointer, count: 8 },
    { id: 'logic', label: 'Logic', icon: Settings, count: 6 },
    { id: 'layout', label: 'Layout', icon: Layers, count: 14 },
    { id: 'data', label: 'Data', icon: Database, count: 10 },
    { id: 'social', label: 'Social', icon: Users, count: 7 },
    { id: 'media', label: 'Media', icon: Package, count: 5 }
  ] as const;

  const filteredElements = useMemo(() => {
    let filtered = MOCK_ELEMENTS.filter(element => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!element.name.toLowerCase().includes(query) && 
            !element.description.toLowerCase().includes(query) &&
            !element.tags.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== 'all' && element.category !== categoryFilter) {
        return false;
      }

      // Selected categories filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(element.category)) {
        return false;
      }

      // Complexity filter
      if (complexityFilter !== 'all' && element.complexity !== complexityFilter) {
        return false;
      }

      return true;
    });

    // Sort elements
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, categoryFilter, selectedCategories, complexityFilter, sortBy]);

  const handleElementSelect = useCallback((element: ElementDefinition) => {
    onElementSelect?.(element);
  }, [onElementSelect]);

  const handleElementPreview = useCallback((element: ElementDefinition) => {
    onElementPreview?.(element);
  }, [onElementPreview]);

  const handleElementInstall = useCallback((elementId: string) => {
    onElementInstall?.(elementId);
  }, [onElementInstall]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Element Browser</h2>
          <p className="text-gray-600">Discover and use pre-built components for your tools</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <HiveButton
              size="sm"
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </HiveButton>
            <HiveButton
              size="sm"  
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </HiveButton>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search elements, descriptions, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="recent">Recently Updated</option>
            <option value="name">A-Z</option>
          </select>

          <HiveButton
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </HiveButton>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <HiveCard className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexity Level
              </label>
              <select
                value={complexityFilter}
                onChange={(e) => setComplexityFilter(e.target.value as typeof complexityFilter)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Element Type
              </label>
              <div className="flex flex-wrap gap-1">
                {['Verified', 'Premium', 'Community'].map(type => (
                  <HiveBadge key={type} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {type}
                  </HiveBadge>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <HiveButton size="sm" variant="outline" onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setComplexityFilter('all');
                setSortBy('popularity');
              }}>
                Clear Filters
              </HiveButton>
            </div>
          </div>
        </HiveCard>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isActive = categoryFilter === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(isActive ? 'all' : category.id as ElementCategory)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
              <span className="text-xs opacity-75">({category.count})</span>
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredElements.length} element{filteredElements.length !== 1 ? 's' : ''} found
        </p>
        <div className="text-sm text-gray-500">
          Sorted by {sortBy === 'popularity' ? 'popularity' : sortBy === 'rating' ? 'rating' : sortBy === 'recent' ? 'recent updates' : 'name'}
        </div>
      </div>

      {/* Elements Grid/List */}
      {filteredElements.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Elements Found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <HiveButton onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setComplexityFilter('all');
          }}>
            Clear All Filters
          </HiveButton>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredElements.map((element) => (
                <ElementCard
                  key={element.id}
                  element={element}
                  view="grid"
                  onSelect={handleElementSelect}
                  onPreview={handleElementPreview}
                  onInstall={handleElementInstall}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredElements.map((element) => (
                <ElementCard
                  key={element.id}
                  element={element}
                  view="list"
                  onSelect={handleElementSelect}
                  onPreview={handleElementPreview}
                  onInstall={handleElementInstall}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredElements.length >= 20 && (
            <div className="text-center pt-8">
              <HiveButton variant="outline">
                Load More Elements
              </HiveButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ElementBrowser;