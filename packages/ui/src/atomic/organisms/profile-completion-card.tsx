'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Progress } from '../atoms/progress';
import {
  Award,
  Camera,
  User,
  MapPin,
  BookOpen,
  Users,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Check,
  Lock,
  Zap
} from 'lucide-react';

export interface CompletionStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  points: number;
  action?: () => void;
}

export interface ProfileCompletionCardProps {
  completionPercentage: number;
  completedSteps: string[];
  onStepClick?: (stepId: string) => void;
  className?: string;
}

/**
 * Profile Completion Card - DESIGN_SPEC Compliant with Behavioral Psychology
 *
 * Psychology Principles:
 * - 70% completion target for habit formation
 * - Variable rewards at strategic points
 * - Social proof through completion stats
 * - Loss aversion with "almost there" messaging
 * - Gamification without being obvious
 */
export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
  completionPercentage = 0,
  completedSteps = [],
  onStepClick,
  className = ''
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Animate percentage on mount for psychological impact
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(completionPercentage);
    }, 100);

    // Show reward animation at key thresholds
    if (completionPercentage === 50 || completionPercentage === 70 || completionPercentage === 100) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }

    return () => clearTimeout(timer);
  }, [completionPercentage]);

  const steps: CompletionStep[] = [
    {
      id: 'avatar',
      label: 'Add profile photo',
      description: 'Help others recognize you',
      icon: Camera,
      completed: completedSteps.includes('avatar'),
      points: 20
    },
    {
      id: 'bio',
      label: 'Write your bio',
      description: 'Share what makes you unique',
      icon: User,
      completed: completedSteps.includes('bio'),
      points: 15
    },
    {
      id: 'academic',
      label: 'Add academic info',
      description: 'Major, year, and graduation',
      icon: BookOpen,
      completed: completedSteps.includes('academic'),
      points: 15
    },
    {
      id: 'housing',
      label: 'Add your dorm',
      description: 'Connect with neighbors',
      icon: MapPin,
      completed: completedSteps.includes('housing'),
      points: 10
    },
    {
      id: 'interests',
      label: 'Select interests',
      description: 'Find your communities',
      icon: Sparkles,
      completed: completedSteps.includes('interests'),
      points: 20
    },
    {
      id: 'spaces',
      label: 'Join 3 spaces',
      description: 'Start building connections',
      icon: Users,
      completed: completedSteps.includes('spaces'),
      points: 20
    }
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const totalPoints = steps.reduce((sum, step) => sum + step.points, 0);
  const earnedPoints = steps.filter(s => s.completed).reduce((sum, step) => sum + step.points, 0);

  // Psychological messaging based on completion
  const getMotivationalMessage = () => {
    if (completionPercentage === 0) {
      return "Start your journey - it only takes 2 minutes";
    } else if (completionPercentage < 30) {
      return "Great start! Keep going to unlock features";
    } else if (completionPercentage < 50) {
      return "You're building momentum";
    } else if (completionPercentage < 70) {
      return "Almost at the sweet spot - don't stop now!"; // Loss aversion
    } else if (completionPercentage === 70) {
      return "Perfect! You've unlocked core features 🎉";
    } else if (completionPercentage < 100) {
      return "Go for 100% to become a trusted member";
    } else {
      return "Profile complete! You're all set 🌟";
    }
  };

  // Color transitions for psychological reinforcement
  const getProgressColor = () => {
    if (completionPercentage >= 70) return 'from-[#FFD700] to-[#FFD700]';
    if (completionPercentage >= 50) return 'from-[#FFD700]/60 to-[#FFD700]';
    return 'from-gray-600 to-[#FFD700]/60';
  };

  return (
    <Card
      className={`
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `}
    >
      {/* Header with Trophy Icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-900 rounded-lg">
            <Award className="w-4 h-4 text-[#FFD700]" />
          </div>
          <h3 className="text-lg font-medium text-white">Profile Strength</h3>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            {animatedPercentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar with Animation */}
      <div className="space-y-2">
        <div className="relative h-3 bg-gray-900 rounded-full overflow-hidden">
          <div
            className={`
              absolute inset-y-0 left-0
              bg-gradient-to-r ${getProgressColor()}
              transition-all duration-1000 ease-out
            `}
            style={{ width: `${animatedPercentage}%` }}
          />

          {/* 70% Target Marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/20"
            style={{ left: '70%' }}
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Target
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <p className="text-sm text-gray-300">
          {getMotivationalMessage()}
        </p>
      </div>

      {/* Completion Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLocked = index > 0 && !steps[index - 1].completed && !step.completed;

          return (
            <button
              key={step.id}
              onClick={() => !isLocked && !step.completed && onStepClick?.(step.id)}
              disabled={isLocked || step.completed}
              className={`
                group w-full
                flex items-center gap-3
                p-3 rounded-lg
                transition-all duration-200
                ${step.completed
                  ? 'bg-gray-900/50 cursor-default'
                  : isLocked
                  ? 'bg-gray-900/30 cursor-not-allowed opacity-50'
                  : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'
                }
              `}
            >
              {/* Step Icon */}
              <div
                className={`
                  p-2 rounded-lg transition-all
                  ${step.completed
                    ? 'bg-[#FFD700]/20'
                    : isLocked
                    ? 'bg-gray-800'
                    : 'bg-gray-800 group-hover:bg-gray-700'
                  }
                `}
              >
                {step.completed ? (
                  <Check className="w-4 h-4 text-[#FFD700]" />
                ) : isLocked ? (
                  <Lock className="w-4 h-4 text-gray-600" />
                ) : (
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 text-left">
                <p className={`
                  text-sm font-medium
                  ${step.completed ? 'text-gray-400 line-through' : 'text-white'}
                `}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-500">
                  {step.description}
                </p>
              </div>

              {/* Points Badge */}
              <div className={`
                px-2 py-1 rounded-md text-xs font-medium
                ${step.completed
                  ? 'bg-[#FFD700]/10 text-[#FFD700]'
                  : 'bg-gray-800 text-gray-400'
                }
              `}>
                +{step.points} pts
              </div>

              {/* Action Arrow */}
              {!step.completed && !isLocked && (
                <ChevronRight className="
                  w-4 h-4 text-gray-600
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                " />
              )}
            </button>
          );
        })}
      </div>

      {/* Reward Animation Overlay */}
      {showReward && completionPercentage === 70 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="animate-bounce">
            <div className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-medium">
              🎉 Core features unlocked!
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats */}
      <div className="pt-4 border-t border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs text-gray-400">
              {completedCount} of {steps.length} complete
            </span>
          </div>
          <span className="text-xs text-[#FFD700] font-medium">
            {earnedPoints}/{totalPoints} points
          </span>
        </div>
      </div>
    </Card>
  );
};