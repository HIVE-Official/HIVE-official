"use client";

/**
 * Ritual Horizontal Cards Component
 *
 * Displays rituals as swipeable horizontal cards instead of stories.
 * Used for competitions, collective challenges, and marketing.
 *
 * @educational This component uses the "card" pattern for content that needs
 * more information density than stories. Cards can show progress bars,
 * leaderboards, and multiple CTAs - perfect for complex rituals.
 */

import React, { useRef, useState } from 'react';
import { Card, Button, Badge, Progress } from '@hive/ui';
import {
  Trophy,
  Users,
  Timer,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
  Calendar,
  Star,
  Target,
  Award
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════
// Type Definitions
// ═══════════════════════════════════════════════════════════════════════

export interface RitualCard {
  id: string;
  type: 'active' | 'upcoming' | 'completed' | 'marketing';

  // Visual
  title: string;
  subtitle?: string;
  description: string;
  backgroundColor: string;
  accentColor: string;
  icon?: 'trophy' | 'users' | 'zap' | 'star' | 'target';
  imageUrl?: string;

  // Status
  status?: 'live' | 'starting_soon' | 'ending_soon' | 'new';
  timeRemaining?: string;
  startTime?: Date;
  endTime?: Date;

  // Progress
  progress?: {
    current: number;
    target: number;
    percentage: number;
    label?: string;
  };

  // Participation
  participantCount?: number;
  participantAvatars?: string[]; // First 3 participant avatars

  // Competition specific
  leaderboard?: Array<{
    position: number;
    name: string;
    score: number;
    avatar?: string;
    isCurrentUser?: boolean;
  }>;

  // Collective specific
  milestones?: Array<{
    label: string;
    reached: boolean;
    value?: number;
  }>;

  // Rewards
  rewards?: Array<{
    icon: string;
    label: string;
    unlocked: boolean;
  }>;

  // Actions
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'gold';
    disabled?: boolean;
  };

  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

interface RitualHorizontalCardsProps {
  cards: RitualCard[];
  className?: string;
  onCardClick?: (card: RitualCard) => void;
}

// ═══════════════════════════════════════════════════════════════════════
// Icon Mapping
// ═══════════════════════════════════════════════════════════════════════

const RITUAL_ICONS = {
  trophy: Trophy,
  users: Users,
  zap: Zap,
  star: Star,
  target: Target,
};

const STATUS_COLORS = {
  live: 'bg-green-500',
  starting_soon: 'bg-orange-500',
  ending_soon: 'bg-red-500',
  new: 'bg-purple-500',
};

// ═══════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════

export function RitualHorizontalCards({
  cards,
  className = '',
  onCardClick
}: RitualHorizontalCardsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (!cards || cards.length === 0) {
    return null;
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 340; // Card width + gap
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll = direction === 'left'
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  const formatTimeRemaining = (time: string | Date | undefined): string => {
    if (!time) return '';

    const endTime = typeof time === 'string' ? new Date(time) : time;
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d left`;
    if (hours > 0) return `${hours}h left`;

    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m left`;
  };

  return (
    <div className={`relative bg-hive-surface border-b border-hive-border ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            <h3 className="font-semibold text-hive-text-primary">Active Rituals</h3>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className={`p-1 rounded-lg transition-opacity ${
                showLeftArrow
                  ? 'opacity-100 hover:bg-hive-background-overlay'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              disabled={!showLeftArrow}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-1 rounded-lg transition-opacity ${
                showRightArrow
                  ? 'opacity-100 hover:bg-hive-background-overlay'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              disabled={!showRightArrow}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {cards.map((card) => {
            const Icon = card.icon ? RITUAL_ICONS[card.icon] : Trophy;

            return (
              <Card
                key={card.id}
                className="flex-shrink-0 w-80 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => onCardClick?.(card)}
                style={{
                  background: `linear-gradient(135deg, ${card.backgroundColor}, ${card.accentColor})`
                }}
              >
                <div className="p-6 text-white">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-5 w-5" />
                        {card.status && (
                          <Badge
                            className={`${STATUS_COLORS[card.status]} text-white border-0 px-2 py-0.5 text-xs`}
                          >
                            {card.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold">{card.title}</h3>
                      {card.subtitle && (
                        <p className="text-sm opacity-90">{card.subtitle}</p>
                      )}
                    </div>
                    {card.timeRemaining && (
                      <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-1">
                        <Timer className="h-3 w-3" />
                        <span className="text-xs">{formatTimeRemaining(card.timeRemaining)}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm opacity-90 mb-4">{card.description}</p>

                  {/* Progress Bar */}
                  {card.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1 opacity-80">
                        <span>{card.progress.label || 'Progress'}</span>
                        <span>{card.progress.percentage}%</span>
                      </div>
                      <Progress
                        value={card.progress.percentage}
                        className="h-2 bg-white/20"
                      />
                      {card.progress.current !== undefined && (
                        <p className="text-xs mt-1 opacity-70">
                          {card.progress.current.toLocaleString()} / {card.progress.target.toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Leaderboard */}
                  {card.leaderboard && card.leaderboard.length > 0 && (
                    <div className="mb-4 bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-1 text-xs font-semibold mb-2 opacity-80">
                        <Trophy className="h-3 w-3" />
                        TOP SPACES
                      </div>
                      {card.leaderboard.slice(0, 3).map((entry) => (
                        <div
                          key={entry.position}
                          className={`flex items-center justify-between py-1 text-sm ${
                            entry.isCurrentUser ? 'text-[var(--hive-brand-primary)] font-semibold' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="opacity-70">{entry.position}.</span>
                            {entry.avatar && (
                              <div className="w-4 h-4 rounded-full bg-white/30" />
                            )}
                            <span className="truncate max-w-[140px]">{entry.name}</span>
                          </div>
                          <span className="font-bold">{entry.score.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Milestones */}
                  {card.milestones && card.milestones.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {card.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                              milestone.reached
                                ? 'bg-green-500/30 text-green-100'
                                : 'bg-white/10 opacity-70'
                            }`}
                          >
                            {milestone.reached ? (
                              <Star className="h-3 w-3" fill="currentColor" />
                            ) : (
                              <Target className="h-3 w-3" />
                            )}
                            <span>{milestone.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Participation */}
                  {card.participantCount !== undefined && (
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{card.participantCount.toLocaleString()} participating</span>
                      </div>
                      {card.participantAvatars && card.participantAvatars.length > 0 && (
                        <div className="flex -space-x-2">
                          {card.participantAvatars.slice(0, 3).map((avatar, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-white/30 border-2 border-white/20"
                            />
                          ))}
                          {card.participantCount > 3 && (
                            <div className="w-6 h-6 rounded-full bg-black/30 border-2 border-white/20 flex items-center justify-center">
                              <span className="text-[10px]">+{card.participantCount - 3}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rewards */}
                  {card.rewards && card.rewards.length > 0 && (
                    <div className="mb-4">
                      <div className="flex gap-3">
                        {card.rewards.map((reward, index) => (
                          <div
                            key={index}
                            className={`flex flex-col items-center ${
                              reward.unlocked ? 'opacity-100' : 'opacity-50'
                            }`}
                          >
                            <Award className="h-6 w-6 mb-1" />
                            <span className="text-[10px]">{reward.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {card.primaryAction && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          card.primaryAction!.onClick();
                        }}
                        disabled={card.primaryAction.disabled}
                        className={`flex-1 ${
                          card.primaryAction.variant === 'gold'
                            ? 'bg-[var(--hive-brand-primary)] text-black hover:bg-hive-champagne'
                            : 'bg-white/20 hover:bg-white/30 text-white border-white/40'
                        }`}
                        size="sm"
                      >
                        {card.primaryAction.label}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                    {card.secondaryAction && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          card.secondaryAction!.onClick();
                        }}
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        size="sm"
                      >
                        {card.secondaryAction.label}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Marketing Card Example */}
          <Card className="flex-shrink-0 w-80 bg-gradient-to-br from-hive-gold/20 to-hive-champagne/20 border-[var(--hive-brand-primary)]/30">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                <Badge className="bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-0">NEW</Badge>
              </div>
              <h3 className="text-lg font-bold text-hive-text-primary mb-2">
                Build Campus Tools
              </h3>
              <p className="text-sm text-hive-text-secondary mb-4">
                Create tools that affect everyone on campus with HiveLab
              </p>
              <Button
                onClick={() => window.location.href = '/hivelab'}
                className="w-full bg-[var(--hive-brand-primary)] text-black hover:bg-hive-champagne"
                size="sm"
              >
                Explore HiveLab
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}