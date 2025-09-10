"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Lock, Star, TrendingUp } from 'lucide-react';
import { getUserAchievements, Achievement, ACHIEVEMENTS } from '@/lib/achievements';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export function AchievementsModal({ isOpen, onClose, userId }: AchievementsModalProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);

  useEffect(() => {
    if (isOpen && (userId || auth.currentUser)) {
      loadAchievements();
    }
  }, [isOpen, userId]);

  const loadAchievements = async () => {
    setIsLoading(true);
    try {
      const targetUserId = userId || auth.currentUser?.uid;
      if (!targetUserId) return;

      const userAchievements = await getUserAchievements(targetUserId);
      setAchievements(userAchievements);
      
      // Calculate stats
      const unlocked = userAchievements.filter(a => a.unlockedAt);
      setUnlockedCount(unlocked.length);
      setTotalPoints(unlocked.reduce((sum, a) => sum + a.points, 0));
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'social', name: 'Social', icon: '🤝' },
    { id: 'academic', name: 'Academic', icon: '🎓' },
    { id: 'community', name: 'Community', icon: '🏘️' },
    { id: 'content', name: 'Content', icon: '✍️' },
    { id: 'special', name: 'Special', icon: '⭐' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'uncommon': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 5;
      case 'epic': return 4;
      case 'rare': return 3;
      case 'uncommon': return 2;
      default: return 1;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                Achievements
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{unlockedCount}</p>
                <p className="text-sm text-muted-foreground">Unlocked</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--hive-gold)]">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">
                  {Math.round((unlockedCount / achievements.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-[var(--hive-gold)] transition-all duration-500"
                  style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-6 py-3 border-b border-border overflow-x-auto">
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    selectedCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="p-6 overflow-y-auto max-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAchievements.map(achievement => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "relative p-4 rounded-lg border-2 transition-all",
                      achievement.unlockedAt
                        ? getRarityColor(achievement.rarity)
                        : "bg-muted/30 border-border opacity-60"
                    )}
                  >
                    {/* Lock overlay for locked achievements */}
                    {!achievement.unlockedAt && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="text-3xl flex-shrink-0">
                        {achievement.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>

                        {/* Points and Rarity */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(getRarityStars(achievement.rarity))].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            +{achievement.points} pts
                          </span>
                        </div>

                        {/* Unlock date */}
                        {achievement.unlockedAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Next Achievement Hint */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-muted-foreground">
                Next achievement: Keep being active to unlock more rewards!
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}