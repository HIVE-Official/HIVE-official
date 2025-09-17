/**
 * HIVE Campus Rituals: Complete Dashboard System
 * Full rituals dashboard with categories, progress tracking, and leaderboards
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../atomic/atoms/button-enhanced';
import { Badge } from '../../../../components/ui/badge';
import { Progress } from '../../../../components/ui/progress';
import { 
  Search,
  Settings,
  Plus,
  Target,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Flame,
  CheckCircle,
  Timer,
  MoreVertical,
  Heart,
  Trophy,
  Medal,
  Crown
} from 'lucide-react';
import '../../../../hive-tokens.css';

// Mock Rituals Dashboard Component
const RitualsDashboard = () => {
  const [viewMode, setViewMode] = useState('my-rituals');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Rituals', count: 25 },
    { id: 'academic', label: 'Academic', count: 8 },
    { id: 'health', label: 'Health & Wellness', count: 12 },
    { id: 'mindfulness', label: 'Mindfulness', count: 5 }
  ];

  const myStats = {
    activeRituals: 3,
    completedToday: 2,
    longestStreak: 14,
    campusRanking: 23,
    totalPoints: 1250,
    weeklyGoal: 15,
    weeklyProgress: 12
  };

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 2890, streak: 45, avatar: 'AC' },
    { rank: 2, name: 'Maria Rodriguez', points: 2750, streak: 38, avatar: 'MR' },
    { rank: 3, name: 'Jordan Kim', points: 2680, streak: 42, avatar: 'JK' },
    { rank: 4, name: 'Taylor Swift', points: 2340, streak: 28, avatar: 'TS' },
    { rank: 5, name: 'Sam Wilson', points: 2180, streak: 31, avatar: 'SW' },
  ];

  const myRituals = [
    {
      id: 'morning_gym',
      name: 'Morning Gym Ritual',
      description: 'Hit the gym before classes start',
      category: 'Health & Wellness',
      icon: '💪',
      difficulty: 'Medium',
      duration: '45-60 min',
      bestTime: '6:00 AM - 9:00 AM',
      participants: 156,
      myStreak: 7,
      personalBest: 12,
      isActive: true,
      todayCompleted: true,
      weeklyTarget: 5,
      weeklyProgress: 4,
      campusRanking: 23,
      rewards: [
        { type: 'badge', name: 'Early Bird', earned: true },
        { type: 'points', amount: 50, earned: true },
        { type: 'badge', name: 'Gym Warrior', earned: false, requirement: '30-day streak' }
      ]
    },
    {
      id: 'campus_walk',
      name: 'Daily Campus Walk',
      description: 'Explore campus and get fresh air',
      category: 'Health & Wellness',
      icon: '🚶',
      difficulty: 'Easy',
      duration: '20-30 min',
      bestTime: 'Between classes',
      participants: 67,
      myStreak: 14,
      personalBest: 21,
      isActive: true,
      todayCompleted: true,
      weeklyTarget: 5,
      weeklyProgress: 5,
      campusRanking: 8,
      rewards: [
        { type: 'badge', name: 'Campus Explorer', earned: true },
        { type: 'badge', name: 'Streak Master', earned: true },
        { type: 'points', amount: 100, earned: true }
      ]
    },
    {
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
      weeklyTarget: 7,
      weeklyProgress: 3,
      campusRanking: 45,
      rewards: [
        { type: 'badge', name: 'Mindful Student', earned: true },
        { type: 'points', amount: 30, earned: true }
      ]
    }
  ];

  const discoverRituals = [
    {
      id: 'study_pomodoro',
      name: 'Study Pomodoro Sessions',
      description: 'Focused 25-minute study blocks',
      category: 'Academic',
      icon: '📚',
      difficulty: 'Easy',
      duration: '25 min',
      bestTime: 'Any time',
      participants: 234,
      isActive: false,
      popularityScore: 95,
      successRate: 87
    },
    {
      id: 'creative_writing',
      name: 'Creative Writing',
      description: 'Express yourself through words',
      category: 'Creativity',
      icon: '✍️',
      difficulty: 'Medium',
      duration: '20-40 min',
      bestTime: 'When inspired',
      participants: 45,
      isActive: false,
      popularityScore: 78,
      successRate: 72
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-[var(--hive-gold)]" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-[var(--hive-gold)]" />;
      default: return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const currentRituals = viewMode === 'my-rituals' ? myRituals : 
                        viewMode === 'discover' ? discoverRituals : 
                        myRituals;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Campus Rituals</h1>
              <p className="text-gray-400">Build healthy habits with your campus community</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Search className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ritual
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-4">
            {[
              { id: 'my-rituals', label: 'My Rituals', icon: Target },
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'leaderboard', label: 'Leaderboard', icon: Award },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  viewMode === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                  }`}
                  style={viewMode === id ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          {viewMode !== 'leaderboard' && (
            <div className="flex items-center space-x-2">
              {categories.map(({ id, label, count }) => (
                <Button
                  key={id}
                  size="sm"
                  variant={activeCategory === id ? "default" : "outline"}
                  onClick={() => setActiveCategory(id)}
                  className={activeCategory === id 
                    ? "hive-interactive"
                    : "border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
                  }
                  style={activeCategory === id ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}}
                >
                  {label} ({count})
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        
        {/* My Rituals View */}
        {viewMode === 'my-rituals' && (
          <>
            {/* Daily Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>{myStats.activeRituals}</div>
                  <div className="text-sm text-gray-400">Active Rituals</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-green-400">{myStats.completedToday}</div>
                  <div className="text-sm text-gray-400">Completed Today</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-400">{myStats.longestStreak}</div>
                  <div className="text-sm text-gray-400">Longest Streak</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-[var(--hive-gold)]">#{myStats.campusRanking}</div>
                  <div className="text-sm text-gray-400">Campus Ranking</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)]">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[var(--hive-text-primary)]">Goal: {myStats.weeklyGoal} ritual completions</span>
                  <span className="text-gray-400">{myStats.weeklyProgress}/{myStats.weeklyGoal}</span>
                </div>
                <Progress 
                  value={(myStats.weeklyProgress / myStats.weeklyGoal) * 100} 
                  className="bg-gray-700 mb-2"
                />
                <div className="text-sm text-gray-400">
                  {myStats.weeklyGoal - myStats.weeklyProgress} more to reach your weekly goal
                </div>
              </CardContent>
            </Card>

            {/* Rituals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentRituals.map((ritual) => (
                <Card key={ritual.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="text-3xl mr-3">{ritual.icon}</div>
                        <div>
                          <CardTitle className="text-[var(--hive-text-primary)] text-base">{ritual.name}</CardTitle>
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
                        <div className="text-[var(--hive-text-primary)] font-medium">{ritual.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Difficulty</span>
                        <div className="text-[var(--hive-text-primary)] font-medium">{ritual.difficulty}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Best Time</span>
                        <div className="text-[var(--hive-text-primary)] font-medium">{ritual.bestTime}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Participants</span>
                        <div className="text-[var(--hive-text-primary)] font-medium">{ritual.participants}</div>
                      </div>
                    </div>

                    {/* Streak Info */}
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[var(--hive-text-primary)] font-medium">Current Streak</span>
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
                        <span className="text-[var(--hive-text-primary)] font-medium">This Week</span>
                        <span className="text-gray-400 text-sm">
                          {ritual.weeklyProgress}/{ritual.weeklyTarget}
                        </span>
                      </div>
                      <Progress 
                        value={(ritual.weeklyProgress / ritual.weeklyTarget) * 100} 
                        className="bg-gray-700"
                      />
                    </div>

                    {/* Rewards */}
                    {ritual.rewards && ritual.rewards.length > 0 && (
                      <div>
                        <span className="text-[var(--hive-text-primary)] font-medium mb-2 block">Rewards</span>
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
                            <Button size="sm" className="flex-1 bg-green-600 text-[var(--hive-text-primary)]" disabled>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed Today
                            </Button>
                          ) : (
                            <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                              <Timer className="w-4 h-4 mr-2" />
                              Complete Now
                            </Button>
                          )}
                          <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" className="flex-1 bg-blue-500 text-[var(--hive-text-primary)] hover:bg-blue-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Start Ritual
                          </Button>
                          <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Leaderboard View */}
        {viewMode === 'leaderboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>{myStats.totalPoints}</div>
                  <div className="text-sm text-gray-400">Your Points</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-[var(--hive-gold)]">#{myStats.campusRanking}</div>
                  <div className="text-sm text-gray-400">Your Rank</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-400">{myStats.longestStreak}</div>
                  <div className="text-sm text-gray-400">Best Streak</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)] flex items-center">
                  <Trophy className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Campus Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(user.rank)}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--hive-gold)] to-pink-500 flex items-center justify-center text-[var(--hive-text-primary)] font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-[var(--hive-text-primary)] font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">
                            <Flame className="w-3 h-3 inline mr-1" />
                            {user.streak} day streak
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[var(--hive-text-primary)] font-bold">{user.points}</div>
                        <div className="text-gray-400 text-xs">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Discover More */}
        {viewMode === 'my-rituals' && (
          <div className="text-center mt-8">
            <Button 
              variant="secondary" 
              className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
              onClick={() => setViewMode('discover')}
            >
              Discover More Rituals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const meta = {
  title: '07-Social-Feed-Components/Rituals Dashboard',
  component: RitualsDashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyRitualsView: Story = {
  render: () => <RitualsDashboard />
};

export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <RitualsDashboard />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};