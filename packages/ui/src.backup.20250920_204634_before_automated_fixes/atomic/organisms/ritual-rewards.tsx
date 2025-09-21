'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Trophy, Star, Unlock, Share2, Lock, Check, Clock, Filter, Search } from 'lucide-react';

export interface RitualReward {id: string;
  type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization' | 'achievement';
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: 'completion' | 'participation' | 'social' | 'creative' | 'leadership' | 'milestone' | 'streak';
  
  // Unlock conditions isUnlocked: boolean;
  unlockedAt?: string;
  unlockedBy?: string; // ritual id;
  unlockedFromRitual?: {
    id: string;
    name: string;
    title: string;};
  
  // Requirements requiresCompletion: boolean;
  minimumParticipation: number;
  unlockScope: 'user' | 'space' | 'campus' | 'platform';
  
  // Display properties;
  icon?: string; // URL or emoji;
  color?: string;
  imageUrl?: string;
  animationUrl?: string;
  
  // Time limits isTimeLimited: boolean;
  expiresAt?: string;
  
  // Metadata;
  stats?: {
    totalEarned: number;
    firstEarnedAt?: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  };
  
  // Features unlocked by this reward;
  featureUnlocks?: Array<{
    featureId: string;
    name: string;
    description: string;
  }>;
  
  // Social aspects isPublic: boolean;
  isShowcase: boolean;
  canShare: boolean;
}

export interface Achievement extends RitualReward {
  type: 'achievement';
  progress?: {
    current: number;
    target: number;
    unit: string;
  };
  conditions: Array<{
    type: string;
    description: string;
    completed: boolean;
  }>;
}

export interface RitualRewardsProps {rewards: RitualReward[];
  achievements: Achievement[];
  onViewReward?: (reward: RitualReward) => void;
  onShareReward?: (reward: RitualReward) => void;
  onToggleShowcase?: (rewardId: string, showcase: boolean) => void;
  className?: string;
  view?: 'grid' | 'list' | 'showcase';
  filterCategory?: string[];
  filterRarity?: string[];
  filterStatus?: 'all' | 'unlocked' | 'locked';
  sortBy?: 'date' | 'rarity' | 'name' | 'category';
  showStats?: boolean;
  showProgress?: boolean;}

const RARITY_CONFIG = {
  common: { 
    color: 'text-gray-400', 
    bg: 'bg-gray-500/20', 
    border: 'border-gray-500/30',
    gradient: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/20'
  }
  uncommon: { 
    color: 'text-green-400', 
    bg: 'bg-green-500/20', 
    border: 'border-green-500/30',
    gradient: 'from-green-400 to-green-600',
    glow: 'shadow-green-500/20'
  }
  rare: { 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/20', 
    border: 'border-blue-500/30',
    gradient: 'from-blue-400 to-blue-600',
    glow: 'shadow-blue-500/20'
  }
  epic: { 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/20', 
    border: 'border-purple-500/30',
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-500/20'
  }
  legendary: { 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-500/20', 
    border: 'border-yellow-500/30',
    gradient: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/20'
  }
};

const CATEGORY_CONFIG = {
  completion: { icon: Trophy, label: 'Completion' },
  participation: { icon: Users, label: 'Participation' },
  social: { icon: Heart, label: 'Social' },
  creative: { icon: Sparkles, label: 'Creative' },
  leadership: { icon: Crown, label: 'Leadership' },
  milestone: { icon: Target, label: 'Milestone' },
  streak: { icon: Zap, label: 'Streak' }
};

const TYPE_ICONS = {
  badge: Award,
  feature: Unlock,
  access: Shield,
  recognition: Medal,
  tool: Zap,
  customization: Sparkles,
  achievement: Trophy;
};

export function RitualRewards({
  rewards,
  achievements,
  onViewReward,
  onShareReward,
  onToggleShowcase,
  className,
  view = 'grid',
  filterCategory = [],
  filterRarity = [],
  filterStatus = 'all',
  sortBy = 'date',
  showStats = true,
  showProgress = true;
}: RitualRewardsProps) {
  const [selectedView, setSelectedView] = useState(view);
  const [selectedFilters, setSelectedFilters] = useState({category: filterCategory,
    rarity: filterRarity,
    status: filterStatus;)};
  const [sortOrder, setSortOrder] = useState(sortBy);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReward, setSelectedReward] = useState<RitualReward | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(null);

  // Combine rewards and achievements;
  const allItems = [...rewards, ...achievements];
  
  // Filter and sort items;
  const filteredItems = allItems.filter(item => {
    // Search filter;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    }
    // Category filter;
    if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(item.category)) {
      return false;
    }
    
    // Rarity filter;
    if (selectedFilters.rarity.length > 0 && !selectedFilters.rarity.includes(item.rarity)) {
      return false;
    }
    
    // Status filter;
    if (selectedFilters.status === 'unlocked' && !item.isUnlocked) {
      return false;
    }
    if (selectedFilters.status === 'locked' && item.isUnlocked) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortOrder) {
      case 'date':
        if (!a.unlockedAt && !b.unlockedAt) return 0;
        if (!a.unlockedAt) return 1;
        if (!b.unlockedAt) return -1;
        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
      case 'rarity': {
        const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // Stats;
  const stats = {
    total: allItems.length,
    unlocked: allItems.filter(item => item.isUnlocked).length,
    legendary: allItems.filter(item => item.rarity === 'legendary').length,
    legendaryUnlocked: allItems.filter(item => item.rarity === 'legendary' && item.isUnlocked).length,
    recentlyUnlocked: allItems.filter(item => 
      item.isUnlocked && item.unlockedAt && 
      Date.now() - new Date(item.unlockedAt).getTime() < 7 * 24 * 60 * 60 * 1000
    ).length;
  };

  // Handle new unlocks animation;
  useEffect(() => {
    const recentlyUnlocked = allItems.find(item => 
      item.isUnlocked && item.unlockedAt && 
      Date.now() - new Date(item.unlockedAt).getTime() < 10000
    );
    
    if (recentlyUnlocked) {
      setShowUnlockAnimation(recentlyUnlocked.id);
      setTimeout(() => setShowUnlockAnimation(null), 5000);
    }}
  }, [allItems]);

  // Render reward card;
  const renderRewardCard = (item: RitualReward, compact: boolean = false) => {
    const rarityConfig = RARITY_CONFIG[item.rarity];
    const TypeIcon = TYPE_ICONS[item.type];
    const CategoryIcon = CATEGORY_CONFIG[item.category]?.icon || Award;
    const isAchievement = item.type === 'achievement';
    const achievement = isAchievement ? item as Achievement : null;
    
    if (compact) {
      return (
        <motion.div;
          key={item.id}}
          layout;
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -2 }}
          className={cn(
            "relative p-3 rounded-xl border transition-all cursor-pointer group overflow-hidden",
            item.isUnlocked;
              ? cn(rarityConfig.bg, rarityConfig.border, "hover:shadow-lg", rarityConfig.glow)
              : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] opacity-60"
          )}
          onClick={() => onViewReward?.(item)}
        >
          {/* Rarity gradient background */}
          {item.isUnlocked && (
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
              rarityConfig.gradient;
            )} />
          )}
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("p-2 rounded-lg", item.isUnlocked ? rarityConfig.bg : "bg-gray-500/20")}>
                <TypeIcon className={cn("h-5 w-5", item.isUnlocked ? rarityConfig.color : "text-gray-500")} />
              </div>
              
              {!item.isUnlocked && <Lock className="h-4 w-4 text-gray-500" />}
              {item.isShowcase && <Star className="h-4 w-4 text-[var(--hive-gold)]" />}
            </div>
            
            <h4 className={cn(
              "font-semibold mb-1 line-clamp-1",
              item.isUnlocked ? "text-[var(--hive-text-primary)]" : "text-gray-500"
            )}>
              {item.name}
            </h4>
            
            <p className={cn(
              "text-xs mb-2 line-clamp-2",
              item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"
            )}>
              {item.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                rarityConfig.bg,
                rarityConfig.color;
              )}>
                {item.rarity.toUpperCase()}
              </span>
              
              {item.unlockedAt && (
                <span className="text-xs text-[var(--hive-text-secondary)]">
                  {new Date(item.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {/* Progress for achievements */}
            {achievement && achievement.progress && showProgress && (
              <div className="mt-2">
                <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-1.5">
                  <div;
                    className={cn("h-1.5 rounded-full bg-gradient-to-r", rarityConfig.gradient)}
                    style={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)] mt-1">
                  {achievement.progress.current}/{achievement.progress.target} {achievement.progress.unit}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      );
    }
    
    // Full card view;
    return (
      <motion.div;
        key={item.id}
        layout;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={cn(
          "relative p-6 rounded-xl border transition-all cursor-pointer group overflow-hidden",
          item.isUnlocked;
            ? cn(rarityConfig.bg, rarityConfig.border, "hover:shadow-2xl", rarityConfig.glow)
            : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] opacity-75"
        )}
        onClick={() => onViewReward?.(item)}
      >
        {/* Unlock animation overlay */}
        <AnimatePresence>
          {showUnlockAnimation === item.id && (
            <motion.div;
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--hive-gold)]/20 to-purple-500/20 flex items-center justify-center z-20"
            >
              <motion.div;
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2 }}
                className="text-6xl"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Rarity gradient background */}
        {item.isUnlocked && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-opacity",
            rarityConfig.gradient;
          )} />
        )}
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-3 rounded-xl",
                item.isUnlocked ? rarityConfig.bg : "bg-gray-500/20"
              )}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="h-8 w-8" />
                ) : item.icon ? (
                  <span className="text-2xl">{item.icon}</span>
                ) : (
                  <TypeIcon className={cn("h-8 w-8", item.isUnlocked ? rarityConfig.color : "text-gray-500")} />
                )}
              </div>
              <div>
                <h3 className={cn(
                  "text-lg font-bold",
                  item.isUnlocked ? "text-[var(--hive-text-primary)]" : "text-gray-500"
                )}>
                  {item.name}
                </h3>
                <p className={cn(
                  "text-sm",
                  item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"
                )}>
                  {CATEGORY_CONFIG[item.category]?.label}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!item.isUnlocked && <Lock className="h-5 w-5 text-gray-500" />}
              {item.isShowcase && <Star className="h-5 w-5 text-[var(--hive-gold)]" />}
              {item.isTimeLimited && item.expiresAt && (
                <div className="flex items-center gap-1 text-red-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Limited</span>
                </div>
              )}
            </div>
          </div>
          
          <p className={cn(
            "text-sm mb-4",
            item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"
          )}>
            {item.description}
          </p>
          
          {/* Achievement progress */}
          {achievement && achievement.progress && showProgress && (
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-[var(--hive-text-primary)]">Progress</span>
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  {achievement.progress.current}/{achievement.progress.target} {achievement.progress.unit}
                </span>
              </div>
              <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
                <motion.div;
                  className={cn("h-2 rounded-full bg-gradient-to-r", rarityConfig.gradient)}
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
          
          {/* Achievement conditions */}
          {achievement && achievement.conditions && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Conditions</h5>
              <div className="space-y-1">
                {achievement.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {condition.completed ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <div className="h-3 w-3 border border-gray-500 rounded-sm" />
                    )}
                    <span className={condition.completed ? "text-green-400" : "text-[var(--hive-text-secondary)]"}>
                      {condition.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Feature unlocks */}
          {item.featureUnlocks && item.featureUnlocks.length > 0 && item.isUnlocked && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Unlocks</h5>
              <div className="space-y-1">
                {item.featureUnlocks.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]">
                    <Unlock className="h-3 w-3 text-[var(--hive-gold)]" />
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-sm px-3 py-1 rounded-full font-medium",
                rarityConfig.bg,
                rarityConfig.color;
              )}>
                {item.rarity.toUpperCase()}
              </span>
              
              {item.unlockedAt && (
                <div className="text-xs text-[var(--hive-text-secondary)]">
                  Unlocked {new Date(item.unlockedAt).toLocaleDateString()}
                </div>
              )}
              
              {item.stats?.totalEarned && (
                <div className="text-xs text-[var(--hive-text-secondary)]">
                  {item.stats.totalEarned.toLocaleString()} earned;
                </div>
              )}
            </div>
            
            {item.isUnlocked && (
              <div className="flex items-center gap-2">
                {item.canShare && onShareReward && (
                  <button;
                    onClick={(e) => {
                      e.stopPropagation();
                      onShareReward(item);
                    }}
                    className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
                    title="Share reward"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                )}
                
                {onToggleShowcase && (
                  <button;
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleShowcase(item.id, !item.isShowcase);
                    }}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      item.isShowcase;
                        ? "text-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                        : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"
                    )}
                    title={item.isShowcase ? "Remove from showcase" : "Add to showcase"}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)]", className)}>
      {/* Header */}
      <div className="p-6 border-b border-[var(--hive-border-subtle)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Rewards & Achievements</h2>
            <p className="text-[var(--hive-text-secondary)]">
              Track your progress and celebrate your accomplishments;
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-[var(--hive-background-tertiary)] rounded-lg p-1">
            {[
              { key: 'grid', icon: Grid3X3 },
              { key: 'list', icon: List },
              { key: 'showcase', icon: Star }
            ].map(({ key, icon: Icon })} => (
              <button;
                key={key}
                onClick={() => setSelectedView(key as 'grid' | 'list' | 'showcase')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  selectedView === key;
                    ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                    : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]"
                )}
                title={key.charAt(0).toUpperCase() + key.slice(1) + ' view'}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{stats.unlocked}/{stats.total}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Unlocked</div>
            </div>
            <div className="text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
              <div className="text-2xl font-bold text-[var(--hive-gold)]">{stats.legendaryUnlocked}/{stats.legendary}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Legendary</div>
            </div>
            <div className="text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{stats.recentlyUnlocked}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">This Week</div>
            </div>
            <div className="text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {Math.round((stats.unlocked / stats.total) * 100)}%
              </div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Complete</div>
            </div>
          </div>
        )}
        
        {/* Filters & Search */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" />
            <input;
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rewards and achievements..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-secondary)]"
            />
          </div>
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-[var(--hive-text-secondary)]" />
            
            {/* Status Filter */}
            <select;
              value={selectedFilters.status}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value as 'all' | 'unlocked' | 'locked' }))}
              className="px-3 py-1 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-sm text-[var(--hive-text-primary)]"
            >
              <option value="all">All</option>
              <option value="unlocked">Unlocked</option>
              <option value="locked">Locked</option>
            </select>
            
            {/* Sort */}
            <select;
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'date' | 'rarity' | 'name' | 'category')}
              className="px-3 py-1 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-sm text-[var(--hive-text-primary)]"
            >
              <option value="date">Recent</option>
              <option value="rarity">Rarity</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
            
            {/* Category Filters */}
            {Object.entries(CATEGORY_CONFIG).map(([category, config]) => {
              const Icon = config.icon;
              const isSelected = selectedFilters.category.includes(category);
              
              return (
                <button;
                  key={category}}
                  onClick={() => {
                    setSelectedFilters(prev => ({
                      ...prev,
                      category: isSelected;
                        ? prev.category.filter(c => c !== category)
                        : [...prev.category, category]
                    })});
                  }}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all",
                    isSelected;
                      ? "bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border border-[var(--hive-gold)]/30"
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {config.label}
                </button>
              );
            })}
            
            {/* Rarity Filters */}
            {Object.entries(RARITY_CONFIG).map(([rarity, config]) => {
              const isSelected = selectedFilters.rarity.includes(rarity);
              
              return (
                <button;
                  key={rarity}}
                  onClick={() => {
                    setSelectedFilters(prev => ({
                      ...prev,
                      rarity: isSelected;
                        ? prev.rarity.filter(r => r !== rarity)
                        : [...prev.rarity, rarity]
                    })});
                  }}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium transition-all border",
                    isSelected;
                      ? cn(config.bg, config.color, config.border)
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)]"
                  )}
                >
                  {rarity.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedView === 'showcase' && (
            <motion.div;
              key="showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {filteredItems.filter(item => item.isShowcase).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.filter(item => item.isShowcase).map(item => renderRewardCard(item))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                  <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No items in showcase</p>
                  <p className="text-sm mt-2">Star your favorite rewards to display them here</p>
                </div>
              )}
            </motion.div>
          )}
          
          {selectedView === 'grid' && (
            <motion.div;
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map(item => renderRewardCard(item, true))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No rewards found</p>
                  <p className="text-sm mt-2">Try adjusting your filters</p>
                </div>
              )}
            </motion.div>
          )}
          
          {selectedView === 'list' && (
            <motion.div;
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {filteredItems.map(item => renderRewardCard(item))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No rewards found</p>
                  <p className="text-sm mt-2">Try adjusting your filters</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}