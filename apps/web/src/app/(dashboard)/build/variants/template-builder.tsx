"use client";

import React, { useState } from 'react';
import { Card, Button } from '@hive/ui';
import { 
  Search, 
  Star, 
  Eye, 
  Users, 
  Clock,
  Zap,
  Check,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usageCount: number;
  rating: number;
  estimatedTime: number; // minutes
  preview: string;
  tags: string[];
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  featured: boolean;
}

const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'GPA Calculator',
    description: 'Calculate semester and cumulative GPA with credit hours',
    category: 'calculator',
    difficulty: 'beginner',
    usageCount: 1247,
    rating: 4.8,
    estimatedTime: 5,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['gpa', 'grades', 'academic'],
    author: { name: 'Sarah Chen', handle: 'sarahc' },
    featured: true,
  },
  {
    id: '2',
    name: 'Study Schedule Planner',
    description: 'Create optimized study schedules based on your courses and deadlines',
    category: 'organizer',
    difficulty: 'intermediate',
    usageCount: 892,
    rating: 4.6,
    estimatedTime: 15,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['planning', 'schedule', 'study'],
    author: { name: 'Alex Johnson', handle: 'alexj' },
    featured: true,
  },
  {
    id: '3',
    name: 'Random Team Generator',
    description: 'Automatically create balanced teams for group projects',
    category: 'generator',
    difficulty: 'beginner',
    usageCount: 634,
    rating: 4.4,
    estimatedTime: 3,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['teams', 'groups', 'random'],
    author: { name: 'Mike Davis', handle: 'miked' },
    featured: false,
  },
  {
    id: '4',
    name: 'Unit Converter Suite',
    description: 'Convert between various units for physics and engineering',
    category: 'converter',
    difficulty: 'intermediate',
    usageCount: 445,
    rating: 4.7,
    estimatedTime: 10,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['units', 'physics', 'engineering'],
    author: { name: 'Emma Wilson', handle: 'emmaw' },
    featured: false,
  },
  {
    id: '5',
    name: 'Quiz Builder',
    description: 'Create interactive quizzes with multiple choice and short answer questions',
    category: 'generator',
    difficulty: 'advanced',
    usageCount: 723,
    rating: 4.5,
    estimatedTime: 20,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['quiz', 'assessment', 'education'],
    author: { name: 'David Kim', handle: 'davidk' },
    featured: true,
  },
  {
    id: '6',
    name: 'Expense Tracker',
    description: 'Track and categorize your student expenses with budget alerts',
    category: 'organizer',
    difficulty: 'intermediate',
    usageCount: 567,
    rating: 4.3,
    estimatedTime: 12,
    preview: 'https://via.placeholder.com/300x200',
    tags: ['budget', 'expenses', 'finance'],
    author: { name: 'Lisa Park', handle: 'lisap' },
    featured: false,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Templates', count: MOCK_TEMPLATES.length },
  { id: 'calculator', label: 'Calculators', count: MOCK_TEMPLATES.filter(t => t.category === 'calculator').length },
  { id: 'organizer', label: 'Organizers', count: MOCK_TEMPLATES.filter(t => t.category === 'organizer').length },
  { id: 'generator', label: 'Generators', count: MOCK_TEMPLATES.filter(t => t.category === 'generator').length },
  { id: 'converter', label: 'Converters', count: MOCK_TEMPLATES.filter(t => t.category === 'converter').length },
];

function TemplateCard({ template, onSelect, onPreview }: {
  template: Template;
  onSelect: () => void;
  onPreview: () => void;
}) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-zinc-400 bg-zinc-400/20';
    }
  };

  return (
    <Card className="group hover:border-[#FFD700] transition-all duration-200 bg-zinc-900 border-zinc-700 overflow-hidden">
      {/* Template Preview */}
      <div className="relative h-48 bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
          <Zap className="w-12 h-12 text-zinc-500" />
        </div>
        {template.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-[#FFD700] text-[#0A0A0A] text-xs font-medium rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            onClick={onPreview}
            className="bg-zinc-900/90 border-zinc-600"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white group-hover:text-[#FFD700] transition-colors">
            {template.name}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
            {template.difficulty}
          </span>
        </div>

        <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{template.description}</p>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-xs text-zinc-500 mb-3">
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {template.usageCount.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
            {template.rating}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {template.estimatedTime}m
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
              <span className="text-xs text-zinc-400">{template.author.name[0]}</span>
            </div>
            <span className="text-xs text-zinc-500">by @{template.author.handle}</span>
          </div>
          <Button
            size="sm"
            onClick={onSelect}
            className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
          >
            Use Template
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function TemplateToolBuilder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = MOCK_TEMPLATES
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.usageCount - a.usageCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedTemplate(null)}
              className="mb-4 border-zinc-600 text-zinc-300"
            >
              ← Back to Templates
            </Button>
            <h1 className="text-3xl font-bold text-white mb-2">Customize "{selectedTemplate.name}"</h1>
            <p className="text-zinc-400">{selectedTemplate.description}</p>
          </div>

          <Card className="p-8 bg-zinc-900 border-zinc-700">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Template Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Tool Name</label>
                    <input
                      type="text"
                      defaultValue={selectedTemplate.name}
                      className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Space</label>
                    <select className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white">
                      <option>Personal Tools</option>
                      <option>CS Study Group</option>
                      <option>Math Tutoring</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Customization Options</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-zinc-300">Enable custom branding</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-zinc-300">Allow public sharing</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-zinc-300">Enable analytics tracking</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" className="border-zinc-600 text-zinc-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
                  <Check className="w-4 h-4 mr-2" />
                  Create Tool
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose a Template</h1>
          <p className="text-zinc-400">Start with a proven template and customize it to your needs</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-[#FFD700] text-[#0A0A0A]" 
                  : "border-zinc-600 text-zinc-300 hover:border-[#FFD700] hover:text-[#FFD700]"
                }
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Templates */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-[#FFD700]" />
              Featured Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TEMPLATES.filter(t => t.featured).slice(0, 3).map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => setSelectedTemplate(template)}
                  onPreview={() => console.log('Preview', template.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {selectedCategory === 'all' ? 'All Templates' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
            <span className="text-zinc-400 font-normal ml-2">({filteredTemplates.length})</span>
          </h2>
          
          {filteredTemplates.length === 0 ? (
            <Card className="p-12 text-center bg-zinc-900 border-zinc-700">
              <div className="text-zinc-500">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => setSelectedTemplate(template)}
                  onPreview={() => console.log('Preview', template.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}