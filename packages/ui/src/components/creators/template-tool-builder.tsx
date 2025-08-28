// HIVE Template Tool Builder - Atomic Design: Template
// Pre-built campus-focused templates for quick tool creation

"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Zap, 
  BookOpen, 
  MessageSquare,
  Calendar,
  BarChart3,
  Vote,
  GraduationCap,
  Coffee,
  Heart,
  Trophy,
  Grid3X3,
  List,
  ChevronDown,
  Play,
  Eye,
  Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from '../hive-card';
import { HiveSelect } from '../hive-select';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import { ToolPreview } from './tool-preview';
import type { TemplateBuilderProps, ToolTemplate, ToolCategory, Tool } from './types';

// Enhanced campus-focused templates
const CAMPUS_TEMPLATES: ToolTemplate[] = [
  // Academic Templates
  {
    id: 'course-feedback',
    name: 'Course Feedback Form',
    description: 'Collect student feedback on courses, professors, and curriculum',
    category: 'academic',
    difficulty: 'beginner',
    thumbnail: '/templates/course-feedback.png',
    elements: [],
    config: {
      primaryColor: '#3B82F6',
      theme: 'light',
      allowMultipleSubmissions: false,
      requireAuthentication: true
    },
    metadata: {
      toolType: 'template',
      tags: ['feedback', 'academic', 'survey'],
      estimatedBuildTime: 5
    },
    tags: ['academic', 'feedback', 'survey', 'forms'],
    useCount: 1247,
    rating: 4.8,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'study-group-scheduler',
    name: 'Study Group Scheduler',
    description: 'Coordinate study sessions and group meetings',
    category: 'academic',
    difficulty: 'intermediate',
    thumbnail: '/templates/study-scheduler.png',
    elements: [],
    config: {
      primaryColor: '#10B981',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['scheduling', 'study', 'groups'],
      estimatedBuildTime: 15
    },
    tags: ['academic', 'scheduling', 'collaboration'],
    useCount: 892,
    rating: 4.6,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'assignment-tracker',
    name: 'Assignment Tracker',
    description: 'Track assignments, deadlines, and progress across courses',
    category: 'productivity',
    difficulty: 'intermediate',
    thumbnail: '/templates/assignment-tracker.png',
    elements: [],
    config: {
      primaryColor: '#F59E0B',
      theme: 'auto'
    },
    metadata: {
      toolType: 'template',
      tags: ['productivity', 'deadlines', 'tracking'],
      estimatedBuildTime: 20
    },
    tags: ['productivity', 'academic', 'planning'],
    useCount: 2156,
    rating: 4.9,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Social Templates
  {
    id: 'event-poll',
    name: 'Event Planning Poll',
    description: 'Collect preferences for events, dates, and activities',
    category: 'social',
    difficulty: 'beginner',
    thumbnail: '/templates/event-poll.png',
    elements: [],
    config: {
      primaryColor: '#8B5CF6',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['polls', 'events', 'planning'],
      estimatedBuildTime: 8
    },
    tags: ['social', 'events', 'polls', 'planning'],
    useCount: 1654,
    rating: 4.7,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'roommate-finder',
    name: 'Roommate Compatibility Quiz',
    description: 'Help students find compatible roommates',
    category: 'social',
    difficulty: 'intermediate',
    thumbnail: '/templates/roommate-finder.png',
    elements: [],
    config: {
      primaryColor: '#EC4899',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['housing', 'compatibility', 'matching'],
      estimatedBuildTime: 25
    },
    tags: ['social', 'housing', 'compatibility'],
    useCount: 743,
    rating: 4.5,
    isPremium: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Campus Life Templates
  {
    id: 'dining-review',
    name: 'Dining Hall Reviews',
    description: 'Rate and review campus dining options',
    category: 'campus-life',
    difficulty: 'beginner',
    thumbnail: '/templates/dining-review.png',
    elements: [],
    config: {
      primaryColor: '#F97316',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['reviews', 'dining', 'ratings'],
      estimatedBuildTime: 10
    },
    tags: ['campus-life', 'dining', 'reviews'],
    useCount: 567,
    rating: 4.3,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'club-signup',
    name: 'Club Registration Form',
    description: 'Streamline club and organization signups',
    category: 'campus-life',
    difficulty: 'beginner',
    thumbnail: '/templates/club-signup.png',
    elements: [],
    config: {
      primaryColor: '#06B6D4',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['clubs', 'registration', 'forms'],
      estimatedBuildTime: 12
    },
    tags: ['campus-life', 'clubs', 'registration'],
    useCount: 1023,
    rating: 4.6,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Greek Life Templates
  {
    id: 'rush-feedback',
    name: 'Rush Week Feedback',
    description: 'Collect feedback from rush events and activities',
    category: 'greek-life',
    difficulty: 'beginner',
    thumbnail: '/templates/rush-feedback.png',
    elements: [],
    config: {
      primaryColor: '#7C3AED',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['greek-life', 'rush', 'feedback'],
      estimatedBuildTime: 8
    },
    tags: ['greek-life', 'rush', 'feedback'],
    useCount: 234,
    rating: 4.4,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Analytics Templates
  {
    id: 'engagement-dashboard',
    name: 'Student Engagement Dashboard',
    description: 'Track and visualize student engagement metrics',
    category: 'analytics',
    difficulty: 'advanced',
    thumbnail: '/templates/engagement-dashboard.png',
    elements: [],
    config: {
      primaryColor: '#84CC16',
      theme: 'light'
    },
    metadata: {
      toolType: 'template',
      tags: ['analytics', 'dashboard', 'metrics'],
      estimatedBuildTime: 45
    },
    tags: ['analytics', 'dashboard', 'admin'],
    useCount: 156,
    rating: 4.8,
    isPremium: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Template categories with campus focus
const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: Grid3X3, color: 'var(--hive-color-neutral-400)' },
  { id: 'academic', name: 'Academic', icon: BookOpen, color: 'var(--hive-color-blue-500)' },
  { id: 'social', name: 'Social', icon: MessageSquare, color: 'var(--hive-color-pink-500)' },
  { id: 'campus-life', name: 'Campus Life', icon: Coffee, color: 'var(--hive-color-orange-500)' },
  { id: 'greek-life', name: 'Greek Life', icon: Trophy, color: 'var(--hive-color-purple-500)' },
  { id: 'productivity', name: 'Productivity', icon: Zap, color: 'var(--hive-color-green-500)' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'var(--hive-color-yellow-500)' },
  { id: 'events', name: 'Events', icon: Calendar, color: 'var(--hive-color-indigo-500)' }
] as const;

// Template card component
interface TemplateCardProps {
  template: ToolTemplate;
  onSelect: (template: ToolTemplate) => void;
  onPreview: (template: ToolTemplate) => void;
  isSelected: boolean;
  viewMode: 'grid' | 'list';
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onPreview,
  isSelected,
  viewMode
}) => {
  const difficultyColors = {
    beginner: 'text-green-600 bg-green-100',
    intermediate: 'text-yellow-600 bg-yellow-100',
    advanced: 'text-red-600 bg-red-100'
  };

  return (
    <HiveMotionWrapper
      className="scale-hover"
    >
      <HiveCard
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-lg group relative",
          viewMode === 'list' ? "flex-row" : "",
          isSelected && "ring-2 ring-[var(--hive-color-gold-primary)] ring-offset-2"
        )}
        onClick={() => onSelect(template)}
      >
        {/* Premium badge */}
        {template.isPremium && (
          <div className="absolute top-2 right-2 z-10">
            <HiveBadge className="bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]">
              <Star size={12} />
              Premium
            </HiveBadge>
          </div>
        )}

        <HiveCardContent className={cn(
          "p-0",
          viewMode === 'list' ? "flex items-center" : ""
        )}>
          {/* Template thumbnail */}
          <div className={cn(
            "bg-gradient-to-br from-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] flex items-center justify-center",
            viewMode === 'list' ? "w-24 h-24 rounded-l-lg" : "w-full h-32 rounded-t-lg"
          )}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: template.config.primaryColor + '20' }}
            >
              <div 
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: template.config.primaryColor }}
              >
                <GraduationCap size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Template info */}
          <div className={cn(
            "p-4",
            viewMode === 'list' ? "flex-1" : ""
          )}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-color-gold-primary)] transition-colors truncate">
                  {template.name}
                </h3>
                <p className={cn(
                  "text-[var(--hive-text-secondary)] mt-1",
                  viewMode === 'list' ? "text-sm line-clamp-1" : "text-sm line-clamp-2"
                )}>
                  {template.description}
                </p>
              </div>
            </div>

            {/* Template metadata */}
            <div className="flex items-center gap-2 mb-3">
              <HiveBadge 
                variant="course-tag" 
                className={cn("text-xs", difficultyColors[template.difficulty])}
              >
                {template.difficulty}
              </HiveBadge>
              <HiveBadge variant="course-tag" className="text-xs">
                {template.category}
              </HiveBadge>
            </div>

            {/* Template stats */}
            <div className="flex items-center justify-between text-xs text-[var(--hive-text-tertiary)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  {template.useCount.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  {template.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {template.metadata.estimatedBuildTime}min
                </div>
              </div>
            </div>

            {/* Action buttons - only show on hover or in list view */}
            <div className={cn(
              "flex gap-2 mt-3",
              viewMode === 'grid' ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""
            )}>
              <HiveButton
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(template);
                }}
                className="flex-1"
              >
                <Eye size={14} />
                Preview
              </HiveButton>
              <HiveButton
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(template);
                }}
                className="flex-1"
              >
                Use Template
              </HiveButton>
            </div>
          </div>
        </HiveCardContent>
      </HiveCard>
    </HiveMotionWrapper>
  );
};

// Main Template Tool Builder component
export const TemplateToolBuilder: React.FC<TemplateBuilderProps> = ({
  tool,
  templates = CAMPUS_TEMPLATES,
  onChange,
  onSave,
  onPreview,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<ToolTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<ToolTemplate | null>(null);

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort templates
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.useCount - a.useCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });
  }, [templates, selectedCategory, searchTerm, sortBy]);

  // Handle template selection
  const handleTemplateSelect = (template: ToolTemplate) => {
    setSelectedTemplate(template);
    
    // Create new tool from template
    const newTool: Tool = {
      ...tool,
      name: template.name,
      description: template.description,
      elements: [...template.elements],
      config: { ...tool.config, ...template.config },
      metadata: { 
        ...tool.metadata, 
        ...template.metadata,
        templateId: template.id
      },
      updatedAt: new Date()
    };

    onChange(newTool);
  };

  // Handle template preview
  const handleTemplatePreview = (template: ToolTemplate) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--hive-background-primary)]">
      {/* Header */}
      <div className="p-6 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Template Library
            </h1>
            <p className="text-[var(--hive-text-secondary)] mt-1">
              Start with a pre-built template designed for campus communities
            </p>
          </div>

          {/* View toggle */}
          <div className="flex gap-1 p-1 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-default)]">
            <HiveButton
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </HiveButton>
            <HiveButton
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </HiveButton>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-tertiary)]" 
            />
            <HiveInput
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category filter */}
          <HiveSelect
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as any)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...TEMPLATE_CATEGORIES.map((category) => ({
                value: category.id,
                label: category.name
              }))
            ]}
          />

          {/* Sort */}
          <HiveSelect
            value={sortBy}
            onValueChange={(value) => setSortBy(value as any)}
            options={[
              { value: 'popular', label: 'Most Popular' },
              { value: 'rating', label: 'Highest Rated' },
              { value: 'newest', label: 'Newest' }
            ]}
          />
        </div>
      </div>

      {/* Template grid/list */}
      <div className="flex-1 overflow-auto p-6">
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mb-4">
              <Search size={24} className="text-[var(--hive-text-tertiary)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
              No templates found
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)] max-w-sm">
              Try adjusting your search or filter to find the perfect template for your needs.
            </p>
          </div>
        ) : (
          <div className={cn(
            "gap-6",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
          )}>
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
                onPreview={handleTemplatePreview}
                isSelected={selectedTemplate?.id === template.id}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer actions */}
      {selectedTemplate && (
        <div className="p-6 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: selectedTemplate.config.primaryColor + '20' }}
              >
                <GraduationCap size={20} style={{ color: selectedTemplate.config.primaryColor }} />
              </div>
              <div>
                <h3 className="font-medium text-[var(--hive-text-primary)]">
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Ready to customize and deploy
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <HiveButton
                variant="secondary"
                onClick={() => onSave(tool)}
                disabled={isLoading}
              >
                <Save size={16} />
                Save Draft
              </HiveButton>
              <HiveButton
                variant="primary"
                onClick={() => onPreview(tool)}
              >
                <Play size={16} />
                Continue Building
              </HiveButton>
            </div>
          </div>
        </div>
      )}

      {/* Template preview modal */}
      {showPreview && previewTemplate && (
        <ToolPreview
          tool={{
            ...tool,
            name: previewTemplate.name,
            description: previewTemplate.description,
            elements: previewTemplate.elements
          }}
          onClose={() => {
            setShowPreview(false);
            setPreviewTemplate(null);
          }}
        />
      )}
    </div>
  );
};

export default TemplateToolBuilder;