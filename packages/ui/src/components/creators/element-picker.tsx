// HIVE Element Picker - Atomic Design: Organism
// Comprehensive element library with categorization and search

"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, ChevronDown, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent } from '../hive-card';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import type { Element, ElementCategory, ElementPickerProps } from './types';

// Element categories with enhanced campus focus
export const ELEMENT_CATEGORIES: Array<{
  id: ElementCategory | 'all';
  name: string;
  description: string;
  icon: React.ComponentType;
  color: string
}> = [
  {
    id: 'all',
    name: 'All Elements',
    description: 'Browse all available elements',
    icon: Grid3X3,
    color: 'var(--hive-color-neutral-400)'
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Text, headings, and fundamental elements',
    icon: () => <span className="text-xs font-medium">Aa</span>,
    color: 'var(--hive-color-blue-500)'
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Forms, buttons, and interactive elements',
    icon: () => <span className="text-xs font-medium">⌨️</span>,
    color: 'var(--hive-color-green-500)'
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'Containers, grids, and structural elements',
    icon: () => <span className="text-xs font-medium">□</span>,
    color: 'var(--hive-color-purple-500)'
  },
  {
    id: 'media',
    name: 'Media',
    description: 'Images, videos, and multimedia elements',
    icon: () => <span className="text-xs font-medium">🎨</span>,
    color: 'var(--hive-color-orange-500)'
  },
  {
    id: 'social',
    name: 'Social',
    description: 'Polls, comments, and social interactions',
    icon: () => <span className="text-xs font-medium">💬</span>,
    color: 'var(--hive-color-pink-500)'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Charts, calendars, and complex widgets',
    icon: () => <span className="text-xs font-medium">⚡</span>,
    color: 'var(--hive-color-yellow-500)'
  },
  {
    id: 'campus',
    name: 'Campus',
    description: 'University-specific elements',
    icon: () => <span className="text-xs font-medium">🎓</span>,
    color: 'var(--hive-color-gold-primary)'
  }
];

// Element card component
interface ElementCardProps {
  element: Element;
  onSelect: (element: Element) => void;
  isSelected?: boolean;
  viewMode: 'grid' | 'list'
}

const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onSelect, 
  isSelected = false,
  viewMode 
}) => {
  const IconComponent = element.icon;
  
  return (
    <HiveMotionWrapper>
      <HiveCard
        variant={isSelected ? "gold-premium" : "default"}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md group",
          viewMode === 'list' ? "flex-row items-center p-3" : "p-4",
          isSelected && "ring-2 ring-[var(--hive-color-gold-primary)] ring-offset-2"
        )}
        onClick={() => onSelect(element)}
      >
        <HiveCardContent className={cn(
          "p-0",
          viewMode === 'list' ? "flex items-center gap-3 w-full" : "text-center"
        )}>
          {/* Element Icon */}
          <div 
            className={cn(
              "rounded-lg flex items-center justify-center shrink-0 transition-colors",
              viewMode === 'list' ? "w-10 h-10" : "w-12 h-12 mx-auto mb-3"
            )}
            style={{ backgroundColor: `${element.color}15`, color: element.color }}
          >
            <IconComponent size={viewMode === 'list' ? 20 : 24} />
          </div>
          
          {/* Element Info */}
          <div className={cn(
            viewMode === 'list' ? "flex-1 min-w-0" : "w-full"
          )}>
            <h3 className={cn(
              "font-medium text-[var(--hive-text-primary)] group-hover:text-[var(--hive-color-gold-primary)] transition-colors",
              viewMode === 'list' ? "text-sm" : "text-sm mb-1"
            )}>
              {element.name}
            </h3>
            
            <p className={cn(
              "text-[var(--hive-text-tertiary)] leading-tight",
              viewMode === 'list' ? "text-xs truncate" : "text-xs mb-2"
            )}>
              {element.description}
            </p>
            
            {/* Element Tags */}
            {viewMode === 'grid' && element.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {element.tags.slice(0, 2).map((tag) => (
                  <HiveBadge 
                    key={tag} 
                    variant="skill-tag" 
                    className="text-xs px-1.5 py-0.5"
                  >
                    {tag}
                  </HiveBadge>
                ))}
                {element.tags.length > 2 && (
                  <span className="text-xs text-[var(--hive-text-tertiary)]">
                    +{element.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Premium indicator */}
          {element.version !== '1.0.0' && viewMode === 'list' && (
            <div className="shrink-0">
              <Star size={14} className="text-[var(--hive-color-gold-primary)]" />
            </div>
          )}
        </HiveCardContent>
      </HiveCard>
    </HiveMotionWrapper>
  )
};

// Category filter component
interface CategoryFilterProps {
  categories: typeof ELEMENT_CATEGORIES;
  selectedCategory: ElementCategory | 'all';
  onCategoryChange: (category: ElementCategory | 'all') => void;
  elementCounts: Record<string, number>
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  elementCounts
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-2">
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <HiveButton
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter size={16} />
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </span>
          <ChevronDown size={16} className={cn(
            "transition-transform",
            isExpanded && "rotate-180"
          )} />
        </HiveButton>
        
        {isExpanded && (
          <div className="mt-2 space-y-1">
            {categories.map((category) => (
              <HiveButton
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsExpanded(false)
          }}
                className="w-full justify-start"
              >
                <category.icon />
                <span>{category.name}</span>
                <span className="ml-auto text-xs text-[var(--hive-text-tertiary)]">
                  {elementCounts[category.id] || 0}
                </span>
              </HiveButton>
            ))}
          </div>
        )}
      </div>
      
      {/* Desktop horizontal scroll */}
      <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <HiveButton
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="shrink-0 gap-2"
          >
            <category.icon />
            <span>{category.name}</span>
            <HiveBadge variant="tool-tag" className="text-xs">
              {elementCounts[category.id] || 0}
            </HiveBadge>
          </HiveButton>
        ))}
      </div>
    </div>
  )
};

// Main Element Picker component
export const ElementPicker: React.FC<ElementPickerProps> = ({
  elements,
  selectedCategory = 'all',
  onElementSelect,
  searchQuery = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [currentCategory, setCurrentCategory] = useState<ElementCategory | 'all'>(selectedCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Filter and search logic
  const filteredElements = useMemo(() => {
    let filtered = elements;

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(element => element.category === currentCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(element =>
        element.name.toLowerCase().includes(query) ||
        element.description.toLowerCase().includes(query) ||
        element.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort by popularity (usage) and name
    return filtered.sort((a, b) => {
      // Prioritize non-deprecated elements
      if (a.isDeprecated !== b.isDeprecated) {
        return a.isDeprecated ? 1 : -1
      }
      // Then sort by name
      return a.name.localeCompare(b.name)
    })
  }, [elements, currentCategory, searchTerm]);

  // Calculate element counts per category
  const elementCounts = useMemo(() => {
    const counts: Record<string, number> = { all: elements.length };
    
    ELEMENT_CATEGORIES.forEach(category => {
      if (category.id !== 'all') {
        counts[category.id] = elements.filter(el => el.category === category.id).length
      }
    });
    
    return counts
  }, [elements]);

  const handleElementSelect = (element: Element) => {
    setSelectedElement(element.id);
    onElementSelect(element)
  };

  return (
    <div className="flex flex-col h-full bg-[var(--hive-background-primary)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--hive-border-default)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              Element Library
            </h2>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Choose elements to build your tool
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg">
            <HiveButton
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-2"
            >
              <Grid3X3 size={16} />
            </HiveButton>
            <HiveButton
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-2"
            >
              <List size={16} />
            </HiveButton>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-tertiary)]" 
          />
          <HiveInput
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-[var(--hive-border-default)]">
        <CategoryFilter
          categories={ELEMENT_CATEGORIES}
          selectedCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
          elementCounts={elementCounts}
        />
      </div>

      {/* Elements Grid/List */}
      <div className="flex-1 overflow-auto p-4">
        {filteredElements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mb-4">
              <Search size={24} className="text-[var(--hive-text-tertiary)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
              No elements found
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)] max-w-sm">
              Try adjusting your search or filter to find the elements you're looking for.
            </p>
          </div>
        ) : (
          <div className={cn(
            "gap-4",
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-2"
          )}>
            {filteredElements.map((element) => (
              <ElementCard
                key={element.id}
                element={element}
                onSelect={handleElementSelect}
                isSelected={selectedElement === element.id}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer with element count */}
      <div className="p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--hive-text-secondary)]">
            {filteredElements.length} element{filteredElements.length !== 1 ? 's' : ''} available
          </span>
          <span className="text-[var(--hive-text-tertiary)]">
            v1.0 • HIVE Elements
          </span>
        </div>
      </div>
    </div>
  )
};

export default ElementPicker;