'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Target,
  Zap,
  Star,
  Medal,
  Crown,
  Shield,
  Flame,
  Diamond,
  Heart,
  Users,
  Calendar,
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  Info,
  Share2,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Button, Badge, Progress } from '@hive/ui';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

interface Achievement {
  id: string;
  category: 'academic' | 'social' | 'leadership' | 'creativity' | 'exploration' | 'collaboration';
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  requirements: string[];
  rewards?: {
    type: 'badge' | 'title' | 'feature' | 'cosmetic';
    value: string;
  }[];
}

interface AchievementCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  achievements: Achievement[];
  totalPoints: number;
  unlockedPoints: number;
}

interface AchievementsSystemProps {
  userId: string;
  className?: string;
}

export function AchievementsSystem({ userId, className = '' }: AchievementsSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [categories, setCategories] = useState<AchievementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextLevelProgress, setNextLevelProgress] = useState(0);

  useEffect(() => {
    fetchAchievements();
  }, [userId]);

  const fetchAchievements = async () => {
    try {
      const response = await authenticatedFetch(`/api/users/${userId}/achievements`);
      if (response.ok) {
        const data = await response.json();
        setAchievements(data.achievements || []);
        calculateCategories(data.achievements || []);
        calculateLevel(data.totalPoints || 0);
      }
    } catch (error) {
      logger.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCategories = (achievementList: Achievement[]) => {
    const categoryMap: Record<string, AchievementCategory> = {
      academic: {
        id: 'academic',
        name: 'Academic Excellence',
        icon: Trophy,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      },
      social: {
        id: 'social',
        name: 'Social Butterfly',
        icon: Users,
        color: 'text-pink-400',
        bgColor: 'bg-pink-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      },
      leadership: {
        id: 'leadership',
        name: 'Leadership',
        icon: Crown,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      },
      creativity: {
        id: 'creativity',
        name: 'Creative Mind',
        icon: Zap,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      },
      exploration: {
        id: 'exploration',
        name: 'Explorer',
        icon: Target,
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      },
      collaboration: {
        id: 'collaboration',
        name: 'Team Player',
        icon: Shield,
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        achievements: [],
        totalPoints: 0,
        unlockedPoints: 0
      }
    };

    achievementList.forEach(achievement => {
      const category = categoryMap[achievement.category];
      if (category) {
        category.achievements.push(achievement);
        category.totalPoints += achievement.points;
        if (achievement.unlockedAt) {
          category.unlockedPoints += achievement.points;
        }
      }
    });

    setCategories(Object.values(categoryMap));
    
    // Calculate total points
    const total = achievementList
      .filter(a => a.unlockedAt)
      .reduce((sum, a) => sum + a.points, 0);
    setTotalPoints(total);
  };

  const calculateLevel = (points: number) => {
    // Simple level calculation: 100 points per level
    const currentLevel = Math.floor(points / 100) + 1;
    const pointsInCurrentLevel = points % 100;
    const pointsForNextLevel = 100;
    
    setLevel(currentLevel);
    setNextLevelProgress((pointsInCurrentLevel / pointsForNextLevel) * 100);
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'legendary': return 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/20';
    }
  };

  const getRarityIcon = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return Star;
      case 'rare': return Medal;
      case 'epic': return Crown;
      case 'legendary': return Diamond;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = filterRarity === 'all' || achievement.rarity === filterRarity;
    
    return matchesCategory && matchesSearch && matchesRarity;
  });

  const shareAchievement = async (achievement: Achievement) => {
    try {
      await navigator.share({
        title: `I unlocked "${achievement.name}" on HIVE!`,
        text: achievement.description,
        url: window.location.href
      });
    } catch (error) {
      logger.error('Error sharing achievement:', error);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
              Achievements
            </h2>
            <p className="text-sm text-neutral-400">
              Track your progress and unlock rewards
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--hive-brand-secondary)]">
              {totalPoints}
            </div>
            <div className="text-xs text-neutral-400">Total Points</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-300">Level {level}</span>
            <span className="text-neutral-400">Level {level + 1}</span>
          </div>
          <div className="relative">
            <Progress value={nextLevelProgress} className="h-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white mix-blend-difference">
                {Math.floor(nextLevelProgress)}%
              </span>
            </div>
          </div>
          <div className="text-xs text-neutral-400 text-center">
            {100 - Math.floor(nextLevelProgress)} points to next level
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map(category => {
          const Icon = category.icon;
          const unlockedCount = category.achievements.filter(a => a.unlockedAt).length;
          const totalCount = category.achievements.length;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'p-4 rounded-lg border transition-all text-left',
                selectedCategory === category.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
              )}
            >
              <Icon className={cn('h-6 w-6 mb-2', category.color)} />
              <div className="text-xs font-medium text-[var(--hive-text-inverse)] mb-1">
                {category.name}
              </div>
              <div className="text-xs text-neutral-400">
                {unlockedCount}/{totalCount}
              </div>
              <div className="text-xs text-neutral-500">
                {category.unlockedPoints} pts
              </div>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-white/20"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'border-white/20',
              selectedCategory === 'all' && 'bg-white/10'
            )}
          >
            All
          </Button>
          
          <select
            value={filterRarity}
            onChange={(e: any) => setFilterRarity(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-white/20"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
      </div>

      {/* Achievements Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No achievements found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement) => {
              const RarityIcon = getRarityIcon(achievement.rarity);
              const isUnlocked = !!achievement.unlockedAt;
              
              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={cn(
                    'relative p-4 rounded-lg border cursor-pointer transition-all',
                    isUnlocked
                      ? 'bg-white/[0.07] border-white/20 hover:bg-white/10'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] opacity-60'
                  )}
                >
                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      <Lock className="h-8 w-8 text-neutral-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex items-start gap-3">
                    <div className={cn('p-2 rounded-lg', getRarityColor(achievement.rarity))}>
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm text-[var(--hive-text-inverse)]">
                          {achievement.name}
                        </h3>
                        <RarityIcon className="h-3 w-3 text-neutral-400" />
                      </div>
                      
                      <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                        {achievement.description}
                      </p>
                      
                      {/* Progress Bar */}
                      {achievement.progress !== undefined && achievement.maxProgress && !isUnlocked && (
                        <div className="mb-2">
                          <Progress
                            value={(achievement.progress / achievement.maxProgress) * 100}
                            className="h-1"
                          />
                          <div className="text-xs text-neutral-500 mt-1">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">
                          +{achievement.points} pts
                        </span>
                        {isUnlocked && (
                          <span className="text-xs text-green-400">
                            {formatDistanceToNow(achievement.unlockedAt, { addSuffix: true })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/10 rounded-xl p-6 z-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn('p-3 rounded-lg', getRarityColor(selectedAchievement.rarity))}>
                    <span className="text-3xl">{selectedAchievement.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-inverse)]">
                      {selectedAchievement.name}
                    </h3>
                    <Badge className={cn('text-xs mt-1', getRarityColor(selectedAchievement.rarity))}>
                      {selectedAchievement.rarity}
                    </Badge>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm text-neutral-300 mb-4">
                {selectedAchievement.description}
              </p>
              
              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-neutral-400 mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {selectedAchievement.requirements.map((req, index) => (
                    <li key={index} className="text-xs text-neutral-300 flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 text-neutral-500 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Rewards */}
              {selectedAchievement.rewards && selectedAchievement.rewards.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-neutral-400 mb-2">Rewards</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.rewards.map((reward, index) => (
                      <Badge key={index} className="bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] text-xs">
                        {reward.value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--hive-brand-secondary)]">
                    +{selectedAchievement.points}
                  </div>
                  <div className="text-xs text-neutral-400">Points</div>
                </div>
                
                {selectedAchievement.unlockedAt && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareAchievement(selectedAchievement)}
                    className="border-white/20"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}