"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Check,
  Sparkles,
  Hash,
  TrendingUp,
  BookOpen,
  Users,
  Smartphone,
  Coffee,
  Heart,
  Zap,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';

/**
 * SPEC-Compliant Interest Selector
 * Per SPEC.md and HIVE_INTERESTS.md:
 * - Student-created interests (not corporate)
 * - Category-based selection
 * - Max 10 interests for focus
 * - Behavioral psychology: Makes selection feel personal
 */

// Interest categories with icons
const INTEREST_CATEGORIES = {
  academic: { icon: BookOpen, label: 'Academic', color: 'text-blue-500' },
  social: { icon: Users, label: 'Social', color: 'text-purple-500' },
  tech: { icon: Smartphone, label: 'Tech & Digital', color: 'text-green-500' },
  food: { icon: Coffee, label: 'Food & Survival', color: 'text-orange-500' },
  lifestyle: { icon: Heart, label: 'Lifestyle', color: 'text-pink-500' },
  activities: { icon: Zap, label: 'Activities', color: 'text-yellow-500' }
} as const;

type InterestCategory = keyof typeof INTEREST_CATEGORIES;

interface Interest {
  id: string;
  label: string;
  category: InterestCategory;
  trending?: boolean;
  matchCount?: number; // How many students share this
}

// Sample interests from HIVE_INTERESTS.md
const INTERESTS_DATA: Interest[] = [
  // Academic
  { id: 'cs-major', label: 'CS major (actually cool)', category: 'academic', trending: true, matchCount: 342 },
  { id: 'pre-med', label: 'Pre-med stress case', category: 'academic', matchCount: 289 },
  { id: 'engineering', label: 'Engineering survivor', category: 'academic', matchCount: 456 },
  { id: 'business', label: 'Business school networking', category: 'academic', matchCount: 198 },
  { id: 'lib-arts', label: 'Liberal arts defender', category: 'academic', matchCount: 167 },
  { id: 'double-major', label: 'Double major masochist', category: 'academic', matchCount: 89 },
  { id: 'honors', label: 'Honors program tryhard', category: 'academic', trending: true, matchCount: 234 },

  // Social
  { id: 'party-legend', label: 'Party legend', category: 'social', trending: true, matchCount: 412 },
  { id: 'introvert', label: 'Introvert by choice', category: 'social', matchCount: 567 },
  { id: 'greek-life', label: 'Greek life recruit', category: 'social', matchCount: 298 },
  { id: 'club-president', label: 'Club president (resume padding)', category: 'social', matchCount: 145 },
  { id: 'wing-person', label: 'Wing person duties', category: 'social', matchCount: 223 },
  { id: 'friend-therapist', label: 'Friend group therapist', category: 'social', trending: true, matchCount: 389 },
  { id: 'situationship', label: 'Situationship survivor', category: 'social', matchCount: 456 },

  // Tech
  { id: 'iphone', label: 'iPhone loyalist (obviously)', category: 'tech', trending: true, matchCount: 678 },
  { id: 'android', label: 'Android rebel', category: 'tech', matchCount: 234 },
  { id: 'pc-gaming', label: 'PC gaming superior', category: 'tech', matchCount: 345 },
  { id: 'coding-bootcamp', label: 'Coding bootcamp graduate', category: 'tech', matchCount: 189 },
  { id: 'tiktok', label: 'TikTok algorithm slave', category: 'tech', trending: true, matchCount: 789 },
  { id: 'discord', label: 'Discord kitten (ironically)', category: 'tech', matchCount: 267 },

  // Food
  { id: 'dining-hall', label: 'Dining hall strategist', category: 'food', matchCount: 456 },
  { id: 'ramen', label: 'Ramen innovator', category: 'food', trending: true, matchCount: 523 },
  { id: 'coffee-iv', label: 'Coffee IV drip', category: 'food', matchCount: 612 },
  { id: 'meal-prep', label: 'Meal prep Sunday warrior', category: 'food', matchCount: 234 },

  // Lifestyle
  { id: 'gym-rat', label: 'Gym rat (6am crew)', category: 'lifestyle', trending: true, matchCount: 345 },
  { id: 'netflix', label: 'Netflix binger', category: 'lifestyle', matchCount: 567 },
  { id: 'all-nighter', label: 'All-nighter professional', category: 'lifestyle', matchCount: 423 },
  { id: 'morning-person', label: 'Morning person (psychopath)', category: 'lifestyle', matchCount: 123 },

  // Activities
  { id: 'intramural', label: 'Intramural tryhard', category: 'activities', matchCount: 234 },
  { id: 'campus-job', label: 'Campus job hustler', category: 'activities', matchCount: 345 },
  { id: 'volunteer', label: 'Volunteer hours collector', category: 'activities', matchCount: 189 },
  { id: 'study-abroad', label: 'Study abroad flexer', category: 'activities', trending: true, matchCount: 267 }
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  maxInterests?: number;
  className?: string;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterests,
  onInterestsChange,
  maxInterests = 10,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InterestCategory | 'all'>('all');
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);

  // Filter interests based on search and category
  const filteredInterests = useMemo(() => {
    let filtered = INTERESTS_DATA;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(i => i.category === selectedCategory);
    }

    // Trending filter
    if (showOnlyTrending) {
      filtered = filtered.filter(i => i.trending);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(i =>
        i.label.toLowerCase().includes(query)
      );
    }

    // Sort by match count (social proof)
    return filtered.sort((a, b) => (b.matchCount || 0) - (a.matchCount || 0));
  }, [searchQuery, selectedCategory, showOnlyTrending]);

  const handleInterestToggle = useCallback((interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      // Remove interest
      onInterestsChange(selectedInterests.filter(id => id !== interestId));
    } else if (selectedInterests.length < maxInterests) {
      // Add interest
      onInterestsChange([...selectedInterests, interestId]);
    }
  }, [selectedInterests, onInterestsChange, maxInterests]);

  const isSelected = (interestId: string) => selectedInterests.includes(interestId);

  // Calculate completion percentage for behavioral psychology
  const completionPercentage = (selectedInterests.length / maxInterests) * 100;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-hive-foreground">
            Select Your Interests
          </h3>
          <span className="text-sm text-hive-text-secondary">
            {selectedInterests.length} / {maxInterests} selected
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-hive-background-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-hive-brand-gold to-hive-brand-gold-light"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Completion message */}
        <AnimatePresence>
          {completionPercentage >= 70 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-hive-brand-gold mt-2 flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" />
              Great selection! Your profile is looking authentic
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Search and filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hive-text-tertiary" />
          <Input
            type="text"
            placeholder="Search interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-hive-text-tertiary hover:text-hive-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs"
          >
            All Categories
          </Button>
          {Object.entries(INTEREST_CATEGORIES).map(([key, { icon: Icon, label, color }]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(key as InterestCategory)}
              className="text-xs"
            >
              <Icon className={cn('w-3 h-3 mr-1', color)} />
              {label}
            </Button>
          ))}
        </div>

        {/* Trending filter */}
        <div className="flex items-center gap-2">
          <Button
            variant={showOnlyTrending ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowOnlyTrending(!showOnlyTrending)}
            className="text-xs"
          >
            <TrendingUp className="w-3 h-3 mr-1 text-hive-brand-gold" />
            Trending on Campus
          </Button>
        </div>
      </div>

      {/* Interest chips */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {filteredInterests.length === 0 ? (
          <div className="text-center py-8 text-hive-text-secondary">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>No interests found matching your search</p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredInterests.map((interest) => {
              const CategoryIcon = INTEREST_CATEGORIES[interest.category].icon;
              const selected = isSelected(interest.id);
              const disabled = !selected && selectedInterests.length >= maxInterests;

              return (
                <motion.button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  disabled={disabled}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border transition-all',
                    selected
                      ? 'border-hive-brand-gold bg-hive-brand-gold/10'
                      : 'border-hive-border hover:border-hive-border-hover bg-hive-background-secondary',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  whileHover={!disabled ? { scale: 1.02 } : {}}
                  whileTap={!disabled ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-2 text-left">
                    <CategoryIcon className={cn('w-4 h-4', INTEREST_CATEGORIES[interest.category].color)} />
                    <span className={cn(
                      'text-sm font-medium',
                      selected ? 'text-hive-brand-gold' : 'text-hive-foreground'
                    )}>
                      {interest.label}
                    </span>
                    {interest.trending && (
                      <TrendingUp className="w-3 h-3 text-hive-brand-gold" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {interest.matchCount && (
                      <span className="text-xs text-hive-text-tertiary">
                        {interest.matchCount}
                      </span>
                    )}
                    {selected && (
                      <Check className="w-4 h-4 text-hive-brand-gold" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Helper text */}
      <div className="bg-hive-background-secondary rounded-lg p-3">
        <p className="text-xs text-hive-text-secondary">
          <Hash className="w-3 h-3 inline mr-1" />
          Select up to {maxInterests} interests that define your vibe.
          {' '}Numbers show how many students share each interest.
        </p>
      </div>
    </div>
  );
};