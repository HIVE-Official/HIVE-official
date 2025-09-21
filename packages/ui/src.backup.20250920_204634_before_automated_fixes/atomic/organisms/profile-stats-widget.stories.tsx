import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStatsWidget } from './profile-stats-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileStatsWidget> = {
  title: '04-Organisms/Profile System/Profile Stats Widget - COMPLETE DEFINITION',
  component: ProfileStatsWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Profile Stats Widget - Complete Organism Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal analytics and goal tracking interface for University at Buffalo HIVE platform student performance monitoring and academic success insights.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Metric Categories** - Engagement, academic, social, productivity, growth for complete performance tracking;
- **4 Goal Categories** - Academic, social, personal, career goal setting with progress monitoring;
- **Trend Analysis** - Up, down, stable trends with percentage change tracking and visual indicators;
- **Progress Visualization** - Academic year progress, semester completion, goal achievement tracking;
- **Level System** - Platform level progression with streak tracking and achievement recognition;
- **Real-Time Analytics** - Live metric updates with weekly growth analysis and performance insights;
- **Campus Context** - University at Buffalo specific academic progress and semester milestone tracking;
- **Data Export** - Analytics export functionality for academic portfolio and progress documentation;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student performance and goal tracking:
- **Academic Analytics** - Course engagement, study time tracking, GPA correlation, semester progress;
- **Social Metrics** - Community participation, peer interaction, space engagement, collaboration tracking;
- **Campus Activity** - Event attendance, organization involvement, leadership participation metrics;
- **Career Development** - Professional growth tracking, skill development, networking progress monitoring;
- **Goal Achievement** - Academic milestones, personal development targets, career preparation objectives;
- **Semester Planning** - Academic year progress with semester-specific goal setting and achievement tracking;
- **Performance Insights** - Data-driven recommendations for academic success and campus engagement optimization;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Analytics** - Large metric cards and goal progress bars optimized for mobile viewing;
- **Responsive Charts** - Adaptive data visualization for different screen sizes and orientations;
- **Quick Goal Setting** - One-tap goal creation and progress updates for on-the-go academic management;
- **Mobile Insights** - Location-aware campus analytics and real-time engagement tracking;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    keyMetrics: {
      control: 'object',
      description: 'Array of key performance metrics',
    },
    personalGoals: {
      control: 'object',
      description: 'Array of personal goal items',
    },
    overallScore: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Overall performance score',
    },
    weeklyGrowth: {
      control: { type: 'range', min: -50, max: 50 },
      description: 'Weekly growth percentage',
    },
    academicProgress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Academic progress percentage',
    },
    socialEngagement: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Social engagement percentage',
    },
    platformLevel: {
      control: 'number',
      description: 'Platform level achievement',
    },
    streak: {
      control: 'number',
      description: 'Daily activity streak',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing capabilities',
    },
    onViewMetric: {
      action: 'view-metric',
      description: 'View metric details handler',
    },
    onViewAllStats: {
      action: 'view-all-stats',
      description: 'View all statistics handler',
    },
    onSetGoal: {
      action: 'set-goal',
      description: 'Set new goal handler',
    },
    onExportData: {
      action: 'export-data',
      description: 'Export analytics data handler',
    },
    onViewInsights: {
      action: 'view-insights',
      description: 'View analytics insights handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileStatsWidget>;

// Mock metrics data for University at Buffalo scenarios;
const mockMetricsBasic = [
  {
    id: 'metric-001',
    name: 'Study Sessions',
    value: 12,
    unit: '',
    category: 'academic' as const,
    trend: 'up' as const,
    trendPercentage: 15,
    period: 'weekly' as const,
    isHighlighted: true;
  },
  {
    id: 'metric-002',
    name: 'Community Posts',
    value: 8,
    unit: '',
    category: 'social' as const,
    trend: 'up' as const,
    trendPercentage: 25,
    period: 'weekly' as const;
  },
  {
    id: 'metric-003',
    name: 'Tools Created',
    value: 2,
    unit: '',
    category: 'productivity' as const,
    trend: 'stable' as const,
    trendPercentage: 0,
    period: 'monthly' as const;
  }
];

const mockMetricsAdvanced = [
  {
    id: 'metric-101',
    name: 'Study Hours',
    value: 42,
    unit: 'h',
    category: 'academic' as const,
    trend: 'up' as const,
    trendPercentage: 18,
    period: 'weekly' as const,
    isHighlighted: true;
  },
  {
    id: 'metric-102',
    name: 'Community Engagement',
    value: 156,
    unit: ' interactions',
    category: 'social' as const,
    trend: 'up' as const,
    trendPercentage: 32,
    period: 'weekly' as const,
    isHighlighted: true;
  },
  {
    id: 'metric-103',
    name: 'Tools Deployed',
    value: 8,
    unit: '',
    category: 'productivity' as const,
    trend: 'up' as const,
    trendPercentage: 60,
    period: 'monthly' as const;
  },
  {
    id: 'metric-104',
    name: 'Peer Collaborations',
    value: 24,
    unit: '',
    category: 'growth' as const,
    trend: 'up' as const,
    trendPercentage: 41,
    period: 'monthly' as const;
  },
  {
    id: 'metric-105',
    name: 'Platform Activity',
    value: 89,
    unit: '%',
    category: 'engagement' as const,
    trend: 'up' as const,
    trendPercentage: 12,
    period: 'weekly' as const;
  }
];

const mockGoalsBasic = [
  {
    id: 'goal-001',
    name: 'Complete CSE 331 Project',
    target: 100,
    current: 65,
    unit: '%',
    deadline: '2024-02-15T23:59:59Z',
    category: 'academic' as const,
    isActive: true;
  },
  {
    id: 'goal-002',
    name: 'Join 3 Study Groups',
    target: 3,
    current: 2,
    unit: ' groups',
    deadline: '2024-01-30T23:59:59Z',
    category: 'social' as const,
    isActive: true;
  }
];

const mockGoalsAdvanced = [
  {
    id: 'goal-101',
    name: 'Maintain 3.8+ GPA',
    target: 38,
    current: 37,
    unit: '/10',
    deadline: '2024-05-15T23:59:59Z',
    category: 'academic' as const,
    isActive: true;
  },
  {
    id: 'goal-102',
    name: 'Lead 2 Community Projects',
    target: 2,
    current: 2,
    unit: ' projects',
    deadline: '2024-03-30T23:59:59Z',
    category: 'social' as const,
    isActive: true;
  },
  {
    id: 'goal-103',
    name: 'Build Professional Portfolio',
    target: 5,
    current: 4,
    unit: ' projects',
    deadline: '2024-04-20T23:59:59Z',
    category: 'career' as const,
    isActive: true;
  },
  {
    id: 'goal-104',
    name: 'Daily Platform Engagement',
    target: 30,
    current: 28,
    unit: ' days',
    deadline: '2024-02-28T23:59:59Z',
    category: 'personal' as const,
    isActive: true;
  }
];

// Default stats widget showcase;
export const Default: Story = {
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen',
      academicYear: 'junior'
    },
    keyMetrics: mockMetricsBasic,
    personalGoals: mockGoalsBasic,
    overallScore: 78,
    weeklyGrowth: 12,
    academicProgress: 68,
    socialEngagement: 82,
    platformLevel: 5,
    streak: 14,
    isEditable: true,
    onViewMetric: action('view-metric'),
    onViewAllStats: action('view-all-stats'),
    onSetGoal: action('set-goal'),
    onExportData: action('export-data'),
    onViewInsights: action('view-insights'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile stats widget for University at Buffalo student performance tracking:
          </Text>
          <ProfileStatsWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive analytics dashboard with goal tracking, progress monitoring, and UB academic context integration;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Stats Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 STATS WIDGET SYSTEM</Badge>
            Personal Analytics & Goals;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile stats widget system for University at Buffalo HIVE platform student performance monitoring and academic success tracking;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Stats Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Basic Analytics:</Text>
                    <ProfileStatsWidget;
                      user={{ id: 'user-001', name: 'Sarah Johnson', academicYear: 'freshman' }}
                      keyMetrics={mockMetricsBasic}
                      personalGoals={mockGoalsBasic}
                      overallScore={65}
                      weeklyGrowth={8}
                      academicProgress={45}
                      socialEngagement={72}
                      platformLevel={2}
                      streak={7}
                      onViewMetric={action('basic-view-metric')}
                      onViewAllStats={action('basic-view-all')}
                      onSetGoal={action('basic-set-goal')}
                      onExportData={action('basic-export')}
                      onViewInsights={action('basic-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Beginning student with foundational metrics and academic goal tracking;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Advanced Analytics:</Text>
                    <ProfileStatsWidget;
                      user={{ id: 'user-002', name: 'Marcus Rodriguez', academicYear: 'senior' }}
                      keyMetrics={mockMetricsAdvanced}
                      personalGoals={mockGoalsAdvanced}
                      overallScore={92}
                      weeklyGrowth={15}
                      academicProgress={88}
                      socialEngagement={94}
                      platformLevel={12}
                      streak={45}
                      onViewMetric={action('advanced-view-metric')}
                      onViewAllStats={action('advanced-view-all')}
                      onSetGoal={action('advanced-set-goal')}
                      onExportData={action('advanced-export')}
                      onViewInsights={action('advanced-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Advanced student with comprehensive analytics and multiple active goal achievements;
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Metric Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📊 METRIC CATEGORIES</Badge>
            Performance Tracking Areas;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 metric categories for comprehensive University at Buffalo student performance monitoring and academic success analytics;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Metric Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Performance Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Engagement Metrics</Text>
                        <Text variant="body-xs" color="secondary">Platform activity, interaction frequency, community participation</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Academic Performance</Text>
                        <Text variant="body-xs" color="secondary">Study time, course progress, academic milestone tracking</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Social Analytics</Text>
                        <Text variant="body-xs" color="secondary">Community building, peer collaboration, network growth</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Growth & Development Areas:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Productivity Tracking</Text>
                        <Text variant="body-xs" color="secondary">Tool creation, project completion, efficiency improvements</Text>
                      </div>
                      <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Growth Indicators</Text>
                        <Text variant="body-xs" color="secondary">Skill development, leadership progression, achievement trends</Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Academic Year Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎓 ACADEMIC YEAR TRACKING</Badge>
            UB Semester Progress;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Academic year specific progress tracking for University at Buffalo semester system and graduation planning;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic Year Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Freshman Year Progress:</Text>
                    <ProfileStatsWidget;
                      user={{ id: 'user-fresh', name: 'Emma Martinez', academicYear: 'freshman' }}
                      keyMetrics={[
                        {
                          id: 'fresh-001',
                          name: 'Orientation Completion',
                          value: 100,
                          unit: '%',
                          category: 'academic',
                          trend: 'up',
                          trendPercentage: 100,
                          period: 'semester'
                        },
                        {
                          id: 'fresh-002',
                          name: 'Study Group Participation',
                          value: 3,
                          unit: ' groups',
                          category: 'social',
                          trend: 'up',
                          trendPercentage: 50,
                          period: 'weekly'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'fresh-goal-001',
                          name: 'Complete First Semester',
                          target: 100,
                          current: 35,
                          unit: '%',
                          deadline: '2024-05-15T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={58}
                      weeklyGrowth={22}
                      academicProgress={35}
                      socialEngagement={68}
                      platformLevel={1}
                      streak={12}
                      onViewMetric={action('fresh-view-metric')}
                      onViewAllStats={action('fresh-view-all')}
                      onSetGoal={action('fresh-set-goal')}
                      onExportData={action('fresh-export')}
                      onViewInsights={action('fresh-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      First-year student establishing academic foundation and campus community connections;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Senior Year Achievement:</Text>
                    <ProfileStatsWidget;
                      user={{ id: 'user-senior', name: 'David Park', academicYear: 'senior' }}
                      keyMetrics={[
                        {
                          id: 'senior-001',
                          name: 'Capstone Progress',
                          value: 92,
                          unit: '%',
                          category: 'academic',
                          trend: 'up',
                          trendPercentage: 8,
                          period: 'weekly',
                          isHighlighted: true;
                        },
                        {
                          id: 'senior-002',
                          name: 'Career Network',
                          value: 45,
                          unit: ' connections',
                          category: 'growth',
                          trend: 'up',
                          trendPercentage: 18,
                          period: 'monthly'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'senior-goal-001',
                          name: 'Graduate Magna Cum Laude',
                          target: 375,
                          current: 368,
                          unit: ' GPA points',
                          deadline: '2024-05-15T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={94}
                      weeklyGrowth={5}
                      academicProgress={92}
                      socialEngagement={88}
                      platformLevel={15}
                      streak={67}
                      onViewMetric={action('senior-view-metric')}
                      onViewAllStats={action('senior-view-all')}
                      onSetGoal={action('senior-set-goal')}
                      onExportData={action('senior-export')}
                      onViewInsights={action('senior-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Final year student completing degree requirements and preparing for post-graduation success;
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Graduate Student Research:</Text>
                    <ProfileStatsWidget;
                      user={{ id: 'user-grad', name: 'Lisa Thompson', academicYear: 'graduate' }}
                      keyMetrics={[
                        {
                          id: 'grad-001',
                          name: 'Research Publications',
                          value: 3,
                          unit: ' papers',
                          category: 'academic',
                          trend: 'up',
                          trendPercentage: 50,
                          period: 'semester',
                          isHighlighted: true;
                        },
                        {
                          id: 'grad-002',
                          name: 'Conference Presentations',
                          value: 2,
                          unit: ' presentations',
                          category: 'growth',
                          trend: 'up',
                          trendPercentage: 100,
                          period: 'semester'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'grad-goal-001',
                          name: 'Complete Dissertation',
                          target: 100,
                          current: 78,
                          unit: '%',
                          deadline: '2024-08-30T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={89}
                      weeklyGrowth={3}
                      academicProgress={78}
                      socialEngagement={65}
                      platformLevel={18}
                      streak={34}
                      onViewMetric={action('grad-view-metric')}
                      onViewAllStats={action('grad-view-all')}
                      onSetGoal={action('grad-set-goal')}
                      onExportData={action('grad-export')}
                      onViewInsights={action('grad-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Graduate researcher with advanced analytics focused on academic achievement and research progress;
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Analytics Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile stats widget usage in actual University at Buffalo student performance tracking and academic success contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* CSE Student Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Student Performance Tracking:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE Junior - Alex Chen - Academic Excellence Analytics;
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">High Achievement Metrics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget;
                        user={{ id: 'user-cse-001', name: 'Alex Chen', academicYear: 'junior' }}
                        keyMetrics={[
                          {
                            id: 'cse-001',
                            name: 'Algorithm Study Hours',
                            value: 35,
                            unit: 'h',
                            category: 'academic',
                            trend: 'up',
                            trendPercentage: 25,
                            period: 'weekly',
                            isHighlighted: true;
                          },
                          {
                            id: 'cse-002',
                            name: 'Code Reviews Given',
                            value: 18,
                            unit: ' reviews',
                            category: 'social',
                            trend: 'up',
                            trendPercentage: 38,
                            period: 'weekly'
                          },
                          {
                            id: 'cse-003',
                            name: 'Projects Deployed',
                            value: 4,
                            unit: ' apps',
                            category: 'productivity',
                            trend: 'up',
                            trendPercentage: 100,
                            period: 'monthly'
                          }
                        ]}
                        personalGoals={[
                          {
                            id: 'cse-goal-001',
                            name: 'Master Data Structures',
                            target: 15,
                            current: 13,
                            unit: ' topics',
                            deadline: '2024-03-15T23:59:59Z',
                            category: 'academic',
                            isActive: true;
                          },
                          {
                            id: 'cse-goal-002',
                            name: 'Lead Study Groups',
                            target: 3,
                            current: 3,
                            unit: ' groups',
                            deadline: '2024-02-28T23:59:59Z',
                            category: 'social',
                            isActive: true;
                          }
                        ]}
                        overallScore={89}
                        weeklyGrowth={18}
                        academicProgress={87}
                        socialEngagement={91}
                        platformLevel={8}
                        streak={28}
                        onViewMetric={action('cse-view-metric')}
                        onViewAllStats={action('cse-view-all')}
                        onSetGoal={action('cse-set-goal')}
                        onExportData={action('cse-export')}
                        onViewInsights={action('cse-insights')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Junior CSE student with high academic performance and strong peer collaboration metrics;
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research Focus Analytics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget;
                        user={{ id: 'user-research-001', name: 'Maya Patel', academicYear: 'senior' }}
                        keyMetrics={[
                          {
                            id: 'research-001',
                            name: 'Research Hours',
                            value: 45,
                            unit: 'h',
                            category: 'academic',
                            trend: 'up',
                            trendPercentage: 12,
                            period: 'weekly',
                            isHighlighted: true;
                          },
                          {
                            id: 'research-002',
                            name: 'Lab Collaborations',
                            value: 8,
                            unit: ' projects',
                            category: 'growth',
                            trend: 'up',
                            trendPercentage: 33,
                            period: 'monthly'
                          },
                          {
                            id: 'research-003',
                            name: 'Conference Submissions',
                            value: 2,
                            unit: ' papers',
                            category: 'academic',
                            trend: 'up',
                            trendPercentage: 100,
                            period: 'semester'
                          }
                        ]}
                        personalGoals={[
                          {
                            id: 'research-goal-001',
                            name: 'Complete Honors Thesis',
                            target: 100,
                            current: 85,
                            unit: '%',
                            deadline: '2024-04-30T23:59:59Z',
                            category: 'academic',
                            isActive: true;
                          },
                          {
                            id: 'research-goal-002',
                            name: 'Publish Research Paper',
                            target: 1,
                            current: 0,
                            unit: ' publication',
                            deadline: '2024-06-15T23:59:59Z',
                            category: 'career',
                            isActive: true;
                          }
                        ]}
                        overallScore={94}
                        weeklyGrowth={8}
                        academicProgress={92}
                        socialEngagement={76}
                        platformLevel={12}
                        streak={41}
                        onViewMetric={action('research-view-metric')}
                        onViewAllStats={action('research-view-all')}
                        onSetGoal={action('research-set-goal')}
                        onExportData={action('research-export')}
                        onViewInsights={action('research-insights')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Senior researcher with advanced academic metrics and graduate school preparation analytics;
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Academic Struggle Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Support & Recovery Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Recovery Plan:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget;
                      user={{ id: 'user-recovery-001', name: 'Jordan Kim', academicYear: 'sophomore' }}
                      keyMetrics={[
                        {
                          id: 'recovery-001',
                          name: 'Tutoring Sessions',
                          value: 6,
                          unit: ' sessions',
                          category: 'academic',
                          trend: 'up',
                          trendPercentage: 50,
                          period: 'weekly',
                          isHighlighted: true;
                        },
                        {
                          id: 'recovery-002',
                          name: 'Study Hours',
                          value: 25,
                          unit: 'h',
                          category: 'academic',
                          trend: 'up',
                          trendPercentage: 67,
                          period: 'weekly'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'recovery-goal-001',
                          name: 'Raise GPA to 3.0',
                          target: 30,
                          current: 26,
                          unit: '/10',
                          deadline: '2024-05-15T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={52}
                      weeklyGrowth={28}
                      academicProgress={48}
                      socialEngagement={65}
                      platformLevel={3}
                      streak={9}
                      onViewMetric={action('recovery-view-metric')}
                      onViewAllStats={action('recovery-view-all')}
                      onSetGoal={action('recovery-set-goal')}
                      onExportData={action('recovery-export')}
                      onViewInsights={action('recovery-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Student implementing academic recovery plan with tutoring support and structured study analytics;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Balanced Improvement:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget;
                      user={{ id: 'user-balance-001', name: 'Sam Wilson', academicYear: 'junior' }}
                      keyMetrics={[
                        {
                          id: 'balance-001',
                          name: 'Study-Life Balance',
                          value: 78,
                          unit: '%',
                          category: 'personal',
                          trend: 'up',
                          trendPercentage: 15,
                          period: 'weekly'
                        },
                        {
                          id: 'balance-002',
                          name: 'Wellness Check-ins',
                          value: 5,
                          unit: ' sessions',
                          category: 'personal',
                          trend: 'stable',
                          trendPercentage: 0,
                          period: 'weekly'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'balance-goal-001',
                          name: 'Maintain 3.5+ GPA',
                          target: 35,
                          current: 34,
                          unit: '/10',
                          deadline: '2024-05-15T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={72}
                      weeklyGrowth={6}
                      academicProgress={76}
                      socialEngagement={68}
                      platformLevel={6}
                      streak={21}
                      onViewMetric={action('balance-view-metric')}
                      onViewAllStats={action('balance-view-all')}
                      onSetGoal={action('balance-set-goal')}
                      onExportData={action('balance-export')}
                      onViewInsights={action('balance-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Student focusing on sustainable academic performance with wellness and life balance integration;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Leadership Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget;
                      user={{ id: 'user-leader-001', name: 'Riley Martinez', academicYear: 'senior' }}
                      keyMetrics={[
                        {
                          id: 'leader-001',
                          name: 'Students Mentored',
                          value: 12,
                          unit: ' students',
                          category: 'growth',
                          trend: 'up',
                          trendPercentage: 20,
                          period: 'monthly',
                          isHighlighted: true;
                        },
                        {
                          id: 'leader-002',
                          name: 'Org Leadership Roles',
                          value: 3,
                          unit: ' positions',
                          category: 'social',
                          trend: 'stable',
                          trendPercentage: 0,
                          period: 'semester'
                        }
                      ]}
                      personalGoals={[
                        {
                          id: 'leader-goal-001',
                          name: 'Graduate Summa Cum Laude',
                          target: 38,
                          current: 37,
                          unit: '/10',
                          deadline: '2024-05-15T23:59:59Z',
                          category: 'academic',
                          isActive: true;
                        }
                      ]}
                      overallScore={91}
                      weeklyGrowth={4}
                      academicProgress={94}
                      socialEngagement={96}
                      platformLevel={14}
                      streak={52}
                      onViewMetric={action('leader-view-metric')}
                      onViewAllStats={action('leader-view-all')}
                      onSetGoal={action('leader-set-goal')}
                      onExportData={action('leader-export')}
                      onViewInsights={action('leader-insights')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Senior leader with exceptional metrics in mentorship, academic excellence, and community impact;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Student - Starting Analytics Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time platform experience with minimal analytics data:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Account:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget;
                        user={{ id: 'user-empty-001', name: 'Taylor Wilson', academicYear: 'freshman' }}
                        keyMetrics={[]}
                        personalGoals={[]}
                        overallScore={0}
                        weeklyGrowth={0}
                        academicProgress={0}
                        socialEngagement={0}
                        platformLevel={1}
                        streak={0}
                        onViewMetric={action('empty-view-metric')}
                        onViewAllStats={action('empty-view-all')}
                        onSetGoal={action('empty-set-goal')}
                        onExportData={action('empty-export')}
                        onViewInsights={action('empty-insights')}
                      />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first goal setting and platform engagement;
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Analytics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget;
                        user={{ id: 'user-readonly-001', name: 'Casey Johnson', academicYear: 'sophomore' }}
                        keyMetrics={mockMetricsBasic}
                        personalGoals={mockGoalsBasic}
                        overallScore={78}
                        weeklyGrowth={12}
                        academicProgress={68}
                        socialEngagement={82}
                        platformLevel={5}
                        streak={14}
                        isEditable={false}
                        onViewMetric={action('readonly-view-metric')}
                        onViewAllStats={action('readonly-view-all')}
                        onViewInsights={action('readonly-insights')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities for public analytics viewing;
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground;
export const Playground: Story = {
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen',
      academicYear: 'junior'
    },
    keyMetrics: mockMetricsBasic,
    personalGoals: mockGoalsBasic,
    overallScore: 78,
    weeklyGrowth: 12,
    academicProgress: 68,
    socialEngagement: 82,
    platformLevel: 5,
    streak: 14,
    isEditable: true,
    onViewMetric: action('playground-view-metric'),
    onViewAllStats: action('playground-view-all'),
    onSetGoal: action('playground-set-goal'),
    onExportData: action('playground-export'),
    onViewInsights: action('playground-insights'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Stats Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different analytics and goal configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileStatsWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive stats widget testing for University at Buffalo HIVE platform performance analytics design;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};