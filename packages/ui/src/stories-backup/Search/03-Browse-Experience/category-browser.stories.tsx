import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/03-Browse Experience/CategoryBrowser',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Browse spaces organized by categories with filtering and sorting options'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  spaceCount: number;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  spaceCount: number;
}

interface Space {
  id: string;
  name: string;
  description: string;
  members: number;
  activity: 'high' | 'medium' | 'low';
  tags: string[];
  lastActive: string;
  isJoined: boolean;
}

// Demo data
const CATEGORIES: Category[] = [
  {
    id: 'academic',
    name: 'Academic Spaces',
    description: 'Study groups, course communities, and academic collaboration',
    icon: '🎓',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    spaceCount: 324,
    subcategories: [
      { id: 'study-groups', name: 'Study Groups', spaceCount: 156 },
      { id: 'course-specific', name: 'Course Specific', spaceCount: 89 },
      { id: 'research', name: 'Research Groups', spaceCount: 34 },
      { id: 'tutoring', name: 'Tutoring & Help', spaceCount: 45 }
    ]
  },
  {
    id: 'residential',
    name: 'Residential Communities',
    description: 'Dorm floors, building communities, and residence hall groups',
    icon: '🏠',
    color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    spaceCount: 156,
    subcategories: [
      { id: 'floor-communities', name: 'Floor Communities', spaceCount: 67 },
      { id: 'building-wide', name: 'Building-Wide', spaceCount: 34 },
      { id: 'quad-communities', name: 'Quad Communities', spaceCount: 28 },
      { id: 'special-interest', name: 'Special Interest Housing', spaceCount: 27 }
    ]
  },
  {
    id: 'interest',
    name: 'Interest Groups',
    description: 'Clubs, hobbies, and recreational communities',
    icon: '🎯',
    color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    spaceCount: 367,
    subcategories: [
      { id: 'sports-recreation', name: 'Sports & Recreation', spaceCount: 89 },
      { id: 'arts-creative', name: 'Arts & Creative', spaceCount: 67 },
      { id: 'gaming', name: 'Gaming', spaceCount: 78 },
      { id: 'cultural', name: 'Cultural Groups', spaceCount: 45 },
      { id: 'professional', name: 'Professional Development', spaceCount: 56 },
      { id: 'volunteer', name: 'Volunteer & Service', spaceCount: 32 }
    ]
  }
];

const ACADEMIC_SPACES: Space[] = [
  {
    id: '1',
    name: 'CS 220 Study Group',
    description: 'Weekly study sessions for Data Structures & Algorithms',
    members: 47,
    activity: 'high',
    tags: ['Computer Science', 'Study Group', 'Algorithms'],
    lastActive: '5 minutes ago',
    isJoined: true
  },
  {
    id: '2',
    name: 'Calculus II Problem Sessions',
    description: 'Collaborative problem solving for Calc II students',
    members: 34,
    activity: 'medium',
    tags: ['Mathematics', 'Calculus', 'Problem Solving'],
    lastActive: '1 hour ago',
    isJoined: false
  },
  {
    id: '3',
    name: 'Machine Learning Research',
    description: 'Undergraduate research group working on ML projects',
    members: 23,
    activity: 'high',
    tags: ['Machine Learning', 'Research', 'AI'],
    lastActive: '30 minutes ago',
    isJoined: false
  }
];

// Category Card Component
const CategoryCard: React.FC<{ 
  category: Category; 
  onSelect: (categoryId: string) => void;
  isSelected: boolean;
}> = ({ category, onSelect, isSelected }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border-2 transition-all duration-200 cursor-pointer group
        ${isSelected 
          ? 'border-hive-brand-primary shadow-lg scale-105' 
          : 'border-hive-border-default hover:border-hive-brand-primary hover:shadow-md'
        }
      `}
      onClick={() => onSelect(category.id)}
    >
      {/* Background Gradient */}
      <div className={`${category.color} p-6 text-white relative`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{category.icon}</div>
            <div className="text-right">
              <div className="text-2xl font-bold">{category.spaceCount}</div>
              <div className="text-sm opacity-90">spaces</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{category.description}</p>
        </div>
      </div>

      {/* Subcategories Preview */}
      <div className="bg-white p-4">
        <div className="text-sm font-medium text-hive-text-primary mb-2">Popular subcategories:</div>
        <div className="flex flex-wrap gap-2">
          {category.subcategories.slice(0, 3).map((sub) => (
            <span key={sub.id} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
              {sub.name} ({sub.spaceCount})
            </span>
          ))}
          {category.subcategories.length > 3 && (
            <span className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
              +{category.subcategories.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcategory Filter Component
const SubcategoryFilter: React.FC<{
  subcategories: Subcategory[];
  selectedSubcategory: string | null;
  onSelect: (subcategoryId: string | null) => void;
}> = ({ subcategories, selectedSubcategory, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Filter by Subcategory</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left p-3 rounded-xl border transition-colors ${
            selectedSubcategory === null
              ? 'bg-hive-brand-primary text-white border-hive-brand-primary'
              : 'bg-white border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary hover:bg-hive-background-primary'
          }`}
        >
          <div className="font-medium">All Subcategories</div>
          <div className="text-sm opacity-80">Show all spaces in this category</div>
        </button>
        
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSelect(subcategory.id)}
            className={`w-full text-left p-3 rounded-xl border transition-colors ${
              selectedSubcategory === subcategory.id
                ? 'bg-hive-brand-primary text-white border-hive-brand-primary'
                : 'bg-white border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary hover:bg-hive-background-primary'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{subcategory.name}</div>
                <div className="text-sm opacity-80">{subcategory.spaceCount} spaces</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Space List Item Component
const SpaceListItem: React.FC<{ 
  space: Space; 
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
}> = ({ space, onJoin, onView }) => {
  const ActivityIndicator = () => {
    const config = {
      high: { color: 'bg-hive-status-success', label: 'High' },
      medium: { color: 'bg-hive-status-warning', label: 'Medium' },
      low: { color: 'bg-hive-status-error', label: 'Low' }
    };

    return (
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${config[space.activity].color}`} />
        <span className="text-xs text-hive-text-secondary">{config[space.activity].label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-hive-border-default hover:border-hive-brand-primary transition-colors p-6 group cursor-pointer" onClick={() => onView(space.id)}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-hive-brand-primary rounded-xl flex items-center justify-center text-white text-xl font-bold">
          {space.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-hive-text-primary text-lg group-hover:text-hive-brand-primary transition-colors">
                {space.name}
              </h3>
              <div className="flex items-center gap-3 text-sm text-hive-text-secondary">
                <span>{space.members} members</span>
                <span>•</span>
                <ActivityIndicator />
                <span>•</span>
                <span>Active {space.lastActive}</span>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJoin(space.id);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                space.isJoined
                  ? 'bg-hive-status-success text-white'
                  : 'bg-hive-brand-primary text-white hover:bg-hive-brand-primary/80'
              }`}
              disabled={space.isJoined}
            >
              {space.isJoined ? 'Joined' : 'Join'}
            </button>
          </div>

          <p className="text-hive-text-secondary text-sm mb-3 line-clamp-1">
            {space.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {space.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Category Browser Component
const CategoryBrowser: React.FC<{
  categories: Category[];
  onJoinSpace: (spaceId: string) => void;
  onViewSpace: (spaceId: string) => void;
}> = ({ categories, onJoinSpace, onViewSpace }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">📋</span>
          <h2 className="text-2xl font-bold text-hive-text-primary">Browse by Category</h2>
        </div>
        <p className="text-hive-text-secondary">
          Explore spaces organized by academic, residential, and interest categories
        </p>
      </div>

      {!selectedCategory ? (
        // Category Selection View
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={setSelectedCategory}
              isSelected={false}
            />
          ))}
        </div>
      ) : (
        // Category Detail View
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className="text-hive-brand-primary hover:underline"
            >
              All Categories
            </button>
            <span className="text-hive-text-secondary">/</span>
            <span className="text-hive-text-primary font-medium">{currentCategory?.name}</span>
            {selectedSubcategory && (
              <>
                <span className="text-hive-text-secondary">/</span>
                <span className="text-hive-text-primary">
                  {currentCategory?.subcategories.find(sub => sub.id === selectedSubcategory)?.name}
                </span>
              </>
            )}
          </div>

          {/* Category Header */}
          <div className="bg-white rounded-2xl border border-hive-border-default p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${currentCategory?.color} rounded-2xl flex items-center justify-center text-white text-2xl`}>
                {currentCategory?.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-hive-text-primary">{currentCategory?.name}</h3>
                <p className="text-hive-text-secondary">{currentCategory?.description}</p>
                <div className="text-sm text-hive-text-secondary mt-1">
                  {currentCategory?.spaceCount} total spaces
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Subcategory Filter */}
            <div className="lg:col-span-1">
              {currentCategory && (
                <SubcategoryFilter
                  subcategories={currentCategory.subcategories}
                  selectedSubcategory={selectedSubcategory}
                  onSelect={setSelectedSubcategory}
                />
              )}
            </div>

            {/* Spaces List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-hive-text-secondary">
                    Showing {ACADEMIC_SPACES.length} spaces
                    {selectedSubcategory && (
                      <span> in {currentCategory?.subcategories.find(sub => sub.id === selectedSubcategory)?.name}</span>
                    )}
                  </div>
                  <select className="px-3 py-2 border border-hive-border-default rounded-lg text-sm">
                    <option>Most Popular</option>
                    <option>Most Active</option>
                    <option>Newest</option>
                    <option>Most Members</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {ACADEMIC_SPACES.map((space) => (
                    <SpaceListItem
                      key={space.id}
                      space={space}
                      onJoin={onJoinSpace}
                      onView={onViewSpace}
                    />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center pt-8">
                  <button className="px-6 py-3 bg-white border border-hive-border-default text-hive-text-primary rounded-xl hover:border-hive-brand-primary hover:text-hive-brand-primary transition-colors">
                    Load More Spaces
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BasicCategoryBrowser: Story = {
  name: '📋 Basic Category Browser',
  render: () => {
    const handleJoinSpace = (spaceId: string) => {
      console.log('Joining space:', spaceId);
    };

    const handleViewSpace = (spaceId: string) => {
      console.log('Viewing space:', spaceId);
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <CategoryBrowser
            categories={CATEGORIES}
            onJoinSpace={handleJoinSpace}
            onViewSpace={handleViewSpace}
          />
        </div>
      </div>
    );
  }
};

export const CategoryBrowserStates: Story = {
  name: '🔄 Category Browser States',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Category Browser States</h1>
            <p className="text-hive-text-secondary">Different views and interaction states</p>
          </div>

          {/* Category Overview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Category Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={() => console.log('Selected:', category.id)}
                  isSelected={false}
                />
              ))}
            </div>
          </div>

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Category System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Academic Spaces</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Study groups and course communities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Research groups and academic projects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Tutoring and peer help
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Residential Communities</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Floor and building communities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Quad-wide coordination
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Special interest housing
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Interest Groups</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Sports and recreation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Arts, creative, and cultural
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Professional development
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