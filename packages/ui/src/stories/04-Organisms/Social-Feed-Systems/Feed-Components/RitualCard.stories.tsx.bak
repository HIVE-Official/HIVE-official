/**
 * HIVE Campus Rituals: Ritual Card Component
 * Individual ritual card component showcasing different ritual types and states
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Progress } from '../../../../components/ui/progress';
import { 
  CheckCircle,
  Timer,
  Settings,
  Plus,
  Heart,
  MoreVertical,
  Flame,
  Target,
  Award
} from 'lucide-react';
import '../../../../hive-tokens.css';

// Mock Ritual Card Component for Storybook
const RitualCard = ({ ritual, onComplete, onStart, onToggleFavorite }: any) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete?.(ritual.id);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="text-3xl mr-3">{ritual.icon}</div>
            <div>
              <CardTitle className="text-white text-base">{ritual.name}</CardTitle>
              <p className="text-gray-400 text-sm">{ritual.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {ritual.todayCompleted && (
              <CheckCircle className="w-5 h-5 text-green-400" />
            )}
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Ritual Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Duration</span>
            <div className="text-white font-medium">{ritual.duration}</div>
          </div>
          <div>
            <span className="text-gray-400">Difficulty</span>
            <div className="text-white font-medium">{ritual.difficulty}</div>
          </div>
          <div>
            <span className="text-gray-400">Best Time</span>
            <div className="text-white font-medium">{ritual.bestTime}</div>
          </div>
          <div>
            <span className="text-gray-400">Participants</span>
            <div className="text-white font-medium">{ritual.participants}</div>
          </div>
        </div>

        {/* Streak Info */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Current Streak</span>
            <div className="flex items-center">
              <Flame className="w-4 h-4 mr-1" style={{ color: 'var(--hive-brand-primary)' }} />
              <span className="font-bold" style={{ color: 'var(--hive-brand-primary)' }}>{ritual.myStreak} days</span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Personal Best: {ritual.personalBest} days</span>
            {ritual.campusRanking && (
              <span>Campus Rank: #{ritual.campusRanking}</span>
            )}
          </div>
        </div>

        {/* Weekly Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">This Week</span>
            <span className="text-gray-400 text-sm">
              {ritual.weeklyProgress}/{ritual.weeklyTarget}
            </span>
          </div>
          <Progress 
            value={(ritual.weeklyProgress / ritual.weeklyTarget) * 100} 
            className="bg-gray-700"
            style={{ 
              '--progress-foreground': 'var(--hive-brand-primary)' 
            } as any}
          />
        </div>

        {/* Rewards */}
        {ritual.rewards.length > 0 && (
          <div>
            <span className="text-white font-medium mb-2 block">Rewards</span>
            <div className="flex flex-wrap gap-1">
              {ritual.rewards.map((reward: any, index: number) => (
                <Badge 
                  key={index}
                  className={`text-xs ${
                    reward.earned 
                      ? '' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                  style={reward.earned ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}}
                >
                  {reward.type === 'badge' ? (
                    <>🏆 {reward.name}</>
                  ) : (
                    <>⭐ {reward.amount} pts</>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          {ritual.isActive ? (
            <>
              {ritual.todayCompleted ? (
                <Button size="sm" className="flex-1 bg-green-600 text-white" disabled>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed Today
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  className="flex-1 hive-interactive" 
                  style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
                  onClick={handleComplete}
                  disabled={isCompleting}
                >
                  <Timer className="w-4 h-4 mr-2" />
                  {isCompleting ? 'Completing...' : 'Complete Now'}
                </Button>
              )}
              <Button size="icon" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Settings className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => onStart?.(ritual.id)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Ritual
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => onToggleFavorite?.(ritual.id)}
              >
                <Heart className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const meta = {
  title: '07-Social-Feed-Components/Ritual Card',
  component: RitualCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Base ritual template
const baseRitual = {
  participants: 156,
  weeklyTarget: 5,
  rewards: [
    { type: 'badge', name: 'Early Bird', earned: true },
    { type: 'points', amount: 50, earned: true },
    { type: 'badge', name: 'Streak Master', earned: false, requirement: '30-day streak' }
  ]
};

export const ActiveRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'morning_gym',
      name: 'Morning Gym Ritual',
      description: 'Hit the gym before classes start',
      category: 'Health & Wellness',
      icon: '💪',
      difficulty: 'Medium',
      duration: '45-60 min',
      bestTime: '6:00 AM - 9:00 AM',
      myStreak: 7,
      personalBest: 12,
      isActive: true,
      todayCompleted: false,
      weeklyProgress: 4,
      campusRanking: 23
    },
    onComplete: (id: string) => {
      console.log('Completing ritual:', id);
      return Promise.resolve();
    },
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const CompletedToday: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'campus_walk',
      name: 'Daily Campus Walk',
      description: 'Explore campus and get fresh air',
      category: 'Health & Wellness',
      icon: '🚶',
      difficulty: 'Easy',
      duration: '20-30 min',
      bestTime: 'Between classes',
      myStreak: 14,
      personalBest: 21,
      isActive: true,
      todayCompleted: true,
      weeklyProgress: 5,
      campusRanking: 8,
      rewards: [
        { type: 'badge', name: 'Campus Explorer', earned: true },
        { type: 'badge', name: 'Streak Master', earned: true },
        { type: 'points', amount: 100, earned: true }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const InactiveRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'study_pomodoro',
      name: 'Study Pomodoro Sessions',
      description: 'Focused 25-minute study blocks',
      category: 'Academic',
      icon: '📚',
      difficulty: 'Easy',
      duration: '25 min',
      bestTime: 'Any time',
      participants: 234,
      myStreak: 0,
      personalBest: 5,
      isActive: false,
      todayCompleted: false,
      weeklyProgress: 0,
      campusRanking: null,
      rewards: [
        { type: 'badge', name: 'Focus Master', earned: false, requirement: '7-day streak' },
        { type: 'points', amount: 25, earned: false }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const MindfulnessRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'evening_reflection',
      name: 'Evening Reflection',
      description: 'Daily gratitude and planning',
      category: 'Mindfulness',
      icon: '🌅',
      difficulty: 'Easy',
      duration: '10 min',
      bestTime: '8:00 PM - 11:00 PM',
      participants: 89,
      myStreak: 3,
      personalBest: 8,
      isActive: true,
      todayCompleted: false,
      weeklyProgress: 3,
      weeklyTarget: 7,
      campusRanking: 45,
      rewards: [
        { type: 'badge', name: 'Mindful Student', earned: true },
        { type: 'points', amount: 30, earned: true }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const HighStreakRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'reading_habit',
      name: 'Daily Reading',
      description: 'Read for personal growth',
      category: 'Learning',
      icon: '📖',
      difficulty: 'Easy',
      duration: '30 min',
      bestTime: 'Before bed',
      participants: 127,
      myStreak: 45,
      personalBest: 67,
      isActive: true,
      todayCompleted: true,
      weeklyProgress: 7,
      weeklyTarget: 7,
      campusRanking: 3,
      rewards: [
        { type: 'badge', name: 'Bookworm', earned: true },
        { type: 'badge', name: 'Knowledge Seeker', earned: true },
        { type: 'badge', name: 'Reading Champion', earned: true },
        { type: 'points', amount: 200, earned: true }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const SocialRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'coffee_chat',
      name: 'Weekly Coffee Chat',
      description: 'Connect with someone new on campus',
      category: 'Social',
      icon: '☕',
      difficulty: 'Medium',
      duration: '30-45 min',
      bestTime: 'Afternoon',
      participants: 78,
      myStreak: 2,
      personalBest: 6,
      isActive: true,
      todayCompleted: false,
      weeklyProgress: 1,
      weeklyTarget: 2,
      campusRanking: 15,
      rewards: [
        { type: 'badge', name: 'Social Butterfly', earned: false, requirement: '5-week streak' },
        { type: 'points', amount: 75, earned: true }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};

export const CreativeRitual: Story = {
  args: {
    ritual: {
      ...baseRitual,
      id: 'creative_writing',
      name: 'Creative Writing',
      description: 'Express yourself through words',
      category: 'Creativity',
      icon: '✍️',
      difficulty: 'Medium',
      duration: '20-40 min',
      bestTime: 'When inspired',
      participants: 45,
      myStreak: 0,
      personalBest: 3,
      isActive: false,
      todayCompleted: false,
      weeklyProgress: 0,
      weeklyTarget: 3,
      campusRanking: null,
      rewards: [
        { type: 'badge', name: 'Wordsmith', earned: false, requirement: '10-day streak' },
        { type: 'points', amount: 40, earned: false }
      ]
    },
    onComplete: (id: string) => Promise.resolve(console.log('Completing ritual:', id)),
    onStart: (id: string) => console.log('Starting ritual:', id),
    onToggleFavorite: (id: string) => console.log('Toggling favorite:', id)
  }
};