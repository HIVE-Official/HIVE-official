import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { TrendingUp, TrendingDown, Users, BookOpen, Calendar, Clock, Star, Award, Target, Zap, BarChart3, PieChart, Activity, CheckCircle } from 'lucide-react';

// HIVE Data Display Molecules - Student Engagement Analytics
const meta: Meta = {
  title: 'Molecules/📊 Data Displays',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**HIVE Data Display Molecules** - Student engagement analytics with dense responsive layouts

Brand-compliant data visualization patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that present campus engagement data clearly across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for positive metrics and highlights
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for data text
- **Zero Non-Brand Colors**: No blues, greens, reds for data visualization

## Dense Data Patterns
- **Compact Metrics**: Maximum information density with minimal space
- **Glanceable Data**: Quick insights for busy student schedules
- **Campus Context**: Data relevant to university social engagement
- **Mobile-First**: Touch-friendly data interactions that scale up

## Student Engagement Focus
- Study streaks and academic progress
- Social connections and campus engagement
- Tool usage and creation analytics
- Space participation and community metrics
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Study Streak Card - Academic Progress Tracking
const StudyStreakCard: React.FC<{
  currentStreak?: number;
  longestStreak?: number;
  todayComplete?: boolean;
  weeklyGoal?: number;
  weeklyProgress?: number;
}> = ({ 
  currentStreak = 47,
  longestStreak = 89,
  todayComplete = true,
  weeklyGoal = 7,
  weeklyProgress = 5
}) => {
  const streakDays = Array.from({ length: 7 }, (_, i) => ({
    day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
    complete: i < weeklyProgress
  }));

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum flex items-center">
          <Zap className="h-4 w-4 text-gold mr-2" />
          Study Streak
        </h3>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-silver">Today</span>
          {todayComplete ? (
            <CheckCircle className="h-4 w-4 text-gold" />
          ) : (
            <div className="h-4 w-4 border border-steel rounded-full" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gold mb-1">{currentStreak}</div>
          <div className="text-xs text-silver">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-platinum mb-1">{longestStreak}</div>
          <div className="text-xs text-silver">Best</div>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        {streakDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-1 ${
              day.complete 
                ? 'bg-gold border-gold' 
                : 'border-steel'
            }`}>
              {day.complete && <CheckCircle className="h-3 w-3 text-obsidian" />}
            </div>
            <span className="text-xs text-silver">{day.day}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-silver text-center">
        {weeklyProgress}/{weeklyGoal} days this week
      </div>
    </div>
  );
};

// Campus Engagement Stats - Social Activity Metrics
const CampusEngagementStats: React.FC<{
  totalSpaces?: number;
  activeSpaces?: number;
  connectionsCount?: number;
  weeklyMessages?: number;
  engagementTrend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}> = ({ 
  totalSpaces = 23,
  activeSpaces = 15,
  connectionsCount = 187,
  weeklyMessages = 42,
  engagementTrend = 'up',
  trendPercentage = 12
}) => {
  const metrics = [
    { label: 'Total Spaces', value: totalSpaces, icon: Users },
    { label: 'Active Spaces', value: activeSpaces, icon: BookOpen },
    { label: 'Connections', value: connectionsCount, icon: Users },
    { label: 'Messages/Week', value: weeklyMessages, icon: Activity }
  ];

  const TrendIcon = engagementTrend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum">Campus Engagement</h3>
        <div className={`flex items-center space-x-1 ${
          engagementTrend === 'up' ? 'text-gold' : 'text-silver'
        }`}>
          <TrendIcon className="h-4 w-4" />
          <span className="text-xs font-medium">{trendPercentage}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="text-center p-3 bg-graphite rounded-lg">
              <Icon className="h-5 w-5 text-gold mx-auto mb-2" />
              <div className="text-lg font-bold text-platinum mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-silver">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// HIVE Tools Analytics - Creation and Usage Stats
const HIVEToolsAnalytics: React.FC<{
  toolsCreated?: number;
  totalUsers?: number;
  weeklyActiveUsers?: number;
  topTool?: {
    name: string;
    users: number;
    rating: number;
  };
}> = ({ 
  toolsCreated = 12,
  totalUsers = 234,
  weeklyActiveUsers = 89,
  topTool = {
    name: 'Grade Tracker',
    users: 67,
    rating: 4.8
  }
}) => {
  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum flex items-center">
          <BookOpen className="h-4 w-4 text-gold mr-2" />
          HIVE Tools Impact
        </h3>
        <Award className="h-4 w-4 text-gold" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-gold">{toolsCreated}</div>
            <div className="text-xs text-silver">Tools Created</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-platinum">{totalUsers}</div>
            <div className="text-xs text-silver">Total Users</div>
          </div>
        </div>

        <div className="border-t border-steel pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-silver">Weekly Active</span>
            <span className="text-sm font-semibold text-platinum">{weeklyActiveUsers}</span>
          </div>
          <div className="w-full bg-graphite rounded-full h-2">
            <div 
              className="bg-gold h-2 rounded-full" 
              style={{ width: `${(weeklyActiveUsers / totalUsers) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-graphite rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-platinum">{topTool.name}</div>
              <div className="text-xs text-silver">{topTool.users} users</div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-gold" fill="currentColor" />
              <span className="text-xs font-medium text-gold">{topTool.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Study Session Analytics - Time Management Insights
const StudySessionAnalytics: React.FC<{
  totalHours?: number;
  averageSession?: number;
  focusScore?: number;
  todaysSessions?: Array<{
    subject: string;
    duration: number;
    focus: number;
  }>;
}> = ({ 
  totalHours = 127,
  averageSession = 45,
  focusScore = 87,
  todaysSessions = [
    { subject: 'CS 106B', duration: 90, focus: 92 },
    { subject: 'Math 51', duration: 60, focus: 78 },
    { subject: 'PWR 1', duration: 30, focus: 95 }
  ]
}) => {
  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum flex items-center">
          <Clock className="h-4 w-4 text-gold mr-2" />
          Study Analytics
        </h3>
        <Target className="h-4 w-4 text-gold" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gold">{totalHours}h</div>
          <div className="text-xs text-silver">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-platinum">{averageSession}m</div>
          <div className="text-xs text-silver">Avg Session</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gold">{focusScore}%</div>
          <div className="text-xs text-silver">Focus Score</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-silver mb-2">Today's Sessions</div>
        {todaysSessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between bg-graphite rounded p-2">
            <div>
              <div className="text-sm font-medium text-platinum">{session.subject}</div>
              <div className="text-xs text-silver">{session.duration} minutes</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gold">{session.focus}%</div>
              <div className="text-xs text-silver">focus</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Course Progress Dashboard - Academic Achievement Tracking
const CourseProgressDashboard: React.FC<{
  courses?: Array<{
    id: string;
    name: string;
    progress: number;
    grade: string;
    assignments: number;
    completed: number;
  }>;
}> = ({ 
  courses = [
    { id: 'cs106b', name: 'CS 106B', progress: 78, grade: 'A-', assignments: 12, completed: 9 },
    { id: 'math51', name: 'Math 51', progress: 85, grade: 'A', assignments: 8, completed: 7 },
    { id: 'pwr1', name: 'PWR 1', progress: 92, grade: 'A+', assignments: 6, completed: 6 },
    { id: 'cs161', name: 'CS 161', progress: 65, grade: 'B+', assignments: 10, completed: 6 }
  ]
}) => {
  const overallProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum flex items-center">
          <BarChart3 className="h-4 w-4 text-gold mr-2" />
          Course Progress
        </h3>
        <div className="text-right">
          <div className="text-lg font-bold text-gold">{overallProgress}%</div>
          <div className="text-xs text-silver">Overall</div>
        </div>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-graphite rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-medium text-platinum">{course.name}</div>
                <div className="text-xs text-silver">{course.completed}/{course.assignments} assignments</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gold">{course.grade}</div>
                <div className="text-xs text-silver">{course.progress}%</div>
              </div>
            </div>
            <div className="w-full bg-steel rounded-full h-2">
              <div 
                className="bg-gold h-2 rounded-full transition-all duration-300" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Campus Activity Feed - Social Engagement Summary
const CampusActivitySummary: React.FC<{
  weeklyStats?: {
    postsRead: number;
    commentsPosted: number;
    spacesVisited: number;
    eventsAttended: number;
  };
  topSpaces?: Array<{
    name: string;
    type: 'course' | 'housing' | 'club';
    activity: number;
  }>;
}> = ({ 
  weeklyStats = {
    postsRead: 156,
    commentsPosted: 23,
    spacesVisited: 12,
    eventsAttended: 3
  },
  topSpaces = [
    { name: 'CS 106B', type: 'course', activity: 45 },
    { name: 'Wilbur Hall 3rd', type: 'housing', activity: 32 },
    { name: 'HCI Club', type: 'club', activity: 18 }
  ]
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'housing': return Users;
      case 'club': return Star;
      default: return Users;
    }
  };

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum flex items-center">
          <Activity className="h-4 w-4 text-gold mr-2" />
          Weekly Activity
        </h3>
        <PieChart className="h-4 w-4 text-gold" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-graphite rounded p-2 text-center">
          <div className="text-lg font-bold text-gold">{weeklyStats.postsRead}</div>
          <div className="text-xs text-silver">Posts Read</div>
        </div>
        <div className="bg-graphite rounded p-2 text-center">
          <div className="text-lg font-bold text-platinum">{weeklyStats.commentsPosted}</div>
          <div className="text-xs text-silver">Comments</div>
        </div>
        <div className="bg-graphite rounded p-2 text-center">
          <div className="text-lg font-bold text-platinum">{weeklyStats.spacesVisited}</div>
          <div className="text-xs text-silver">Spaces</div>
        </div>
        <div className="bg-graphite rounded p-2 text-center">
          <div className="text-lg font-bold text-gold">{weeklyStats.eventsAttended}</div>
          <div className="text-xs text-silver">Events</div>
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-silver mb-2">Most Active Spaces</div>
        <div className="space-y-2">
          {topSpaces.map((space, index) => {
            const Icon = getTypeIcon(space.type);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-3 w-3 text-gold" />
                  <span className="text-sm text-platinum">{space.name}</span>
                </div>
                <span className="text-xs font-medium text-gold">{space.activity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Stories

export const StudentStudyStreaks: Story = {
  name: '⚡ Study Streak Tracking',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-sm mx-auto">
        <StudyStreakCard />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Academic Momentum</h3>
          <p className="text-sm text-silver">
            Track daily study habits and maintain academic consistency with visual progress indicators
          </p>
        </div>
      </div>
    </div>
  )
};

export const CampusEngagementMetrics: Story = {
  name: '🏛️ Campus Engagement Stats',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-sm mx-auto">
        <CampusEngagementStats />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Social Analytics</h3>
          <p className="text-sm text-silver">
            Monitor campus social engagement across spaces, connections, and community participation
          </p>
        </div>
      </div>
    </div>
  )
};

export const HIVEToolsImpactDashboard: Story = {
  name: '🛠️ HIVE Tools Analytics',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-sm mx-auto">
        <HIVEToolsAnalytics />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Builder Impact</h3>
          <p className="text-sm text-silver">
            Track the impact of your created HIVE tools on the campus community
          </p>
        </div>
      </div>
    </div>
  )
};

export const StudySessionInsights: Story = {
  name: '⏱️ Study Session Analytics',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-sm mx-auto">
        <StudySessionAnalytics />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Focus Insights</h3>
          <p className="text-sm text-silver">
            Analyze study patterns, session duration, and focus metrics for academic optimization
          </p>
        </div>
      </div>
    </div>
  )
};

export const AcademicProgressDashboard: Story = {
  name: '📚 Course Progress Tracking',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CourseProgressDashboard />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Academic Overview</h3>
          <p className="text-sm text-silver">
            Comprehensive course progress tracking with grades and assignment completion
          </p>
        </div>
      </div>
    </div>
  )
};

export const CampusActivityOverview: Story = {
  name: '📊 Campus Activity Summary',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-sm mx-auto">
        <CampusActivitySummary />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-platinum mb-2">Social Engagement</h3>
          <p className="text-sm text-silver">
            Weekly activity summary showing engagement across campus spaces and events
          </p>
        </div>
      </div>
    </div>
  )
};

export const DenseDataDashboard: Story = {
  name: '📱 Dense Mobile Dashboard',
  render: () => (
    <div className="bg-obsidian p-4 min-h-screen">
      <div className="max-w-sm mx-auto space-y-4">
        <StudyStreakCard />
        <CampusEngagementStats />
        <HIVEToolsAnalytics />
        <StudySessionAnalytics />
        
        <div className="bg-charcoal rounded-lg p-4 text-center">
          <Activity className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Complete Analytics</h3>
          <p className="text-sm text-silver">
            Dense mobile dashboard showing all student engagement metrics in a compact, scannable format
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile2' }
  }
};

export const ResponsiveDataGrid: Story = {
  name: '📐 Responsive Data Display',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StudyStreakCard />
          <CampusEngagementStats />
          <HIVEToolsAnalytics />
          <StudySessionAnalytics />
          <CourseProgressDashboard />
          <CampusActivitySummary />
        </div>
        
        <div className="mt-8 bg-charcoal rounded-lg p-6 text-center">
          <BarChart3 className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-platinum mb-4">Student Analytics Hub</h2>
          <p className="text-silver max-w-2xl mx-auto">
            Comprehensive responsive dashboard that adapts from single-column mobile to three-column desktop, 
            maintaining data clarity and visual hierarchy across all screen sizes
          </p>
        </div>
      </div>
    </div>
  )
};