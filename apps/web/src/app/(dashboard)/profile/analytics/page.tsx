"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, 
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger  } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  User, 
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  Users,
  Zap,
  BookOpen,
  Activity,
  Eye,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Star,
  Heart
} from 'lucide-react';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { useSession } from '../../../../hooks/use-session';

interface AnalyticsData {
  period: 'week' | 'month' | 'semester' | 'year';
  platformEngagement: {
    totalTimeSpent: number; // minutes
    sessionsCount: number;
    averageSessionLength: number;
    peakUsageTime: string;
    featuresUsed: number;
    engagementScore: number; // 0-100
  };
  academicIntegration: {
    studyToolsUsed: number;
    academicGoalsAchieved: number;
    courseActivity: number;
    gpaImprovement: number;
    assignmentsTracked: number;
    studyEfficiency: number; // 0-100
  };
  communityParticipation: {
    spacesActive: number;
    eventsAttended: number;
    toolsShared: number;
    leadershipRoles: number;
    contributionScore: number; // 0-100
    networkGrowth: number;
  };
  personalDevelopment: {
    skillsLearned: string[];
    goalsCompleted: number;
    platformMastery: number; // 0-100
    buildingSkills: number; // 0-100 if builder
    mentorshipGiven: number;
    campusIntegration: number; // 0-100
  };
  insights: {
    topRecommendation: string;
    efficiencyTrend: 'improving' | 'stable' | 'declining';
    nextMilestone: string;
    optimizationOpportunity: string;
  };
}

interface WeeklyPattern {
  day: string;
  usage: number;
  productivity: number;
  social: number;
}

interface SkillProgress {
  skill: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

const MOCK_ANALYTICS: AnalyticsData = {
  period: 'month',
  platformEngagement: {
    totalTimeSpent: 1440, // 24 hours
    sessionsCount: 156,
    averageSessionLength: 9.2,
    peakUsageTime: '2:00 PM - 4:00 PM',
    featuresUsed: 18,
    engagementScore: 87
  },
  academicIntegration: {
    studyToolsUsed: 12,
    academicGoalsAchieved: 8,
    courseActivity: 45,
    gpaImprovement: 0.3,
    assignmentsTracked: 23,
    studyEfficiency: 78
  },
  communityParticipation: {
    spacesActive: 6,
    eventsAttended: 12,
    toolsShared: 3,
    leadershipRoles: 1,
    contributionScore: 72,
    networkGrowth: 15
  },
  personalDevelopment: {
    skillsLearned: ['Time Management', 'Study Optimization', 'Community Leadership'],
    goalsCompleted: 5,
    platformMastery: 82,
    buildingSkills: 45,
    mentorshipGiven: 3,
    campusIntegration: 89
  },
  insights: {
    topRecommendation: 'Try joining the CS Study Group to boost your academic performance',
    efficiencyTrend: 'improving',
    nextMilestone: 'Reach 90% campus integration score',
    optimizationOpportunity: 'Use calendar integration to reduce scheduling conflicts by 40%'
  }
};

const WEEKLY_PATTERN: WeeklyPattern[] = [
  { day: 'Mon', usage: 85, productivity: 92, social: 45 },
  { day: 'Tue', usage: 78, productivity: 88, social: 52 },
  { day: 'Wed', usage: 92, productivity: 95, social: 38 },
  { day: 'Thu', usage: 87, productivity: 85, social: 68 },
  { day: 'Fri', usage: 65, productivity: 70, social: 85 },
  { day: 'Sat', usage: 45, productivity: 55, social: 78 },
  { day: 'Sun', usage: 58, productivity: 65, social: 62 }
];

const SKILL_PROGRESS: SkillProgress[] = [
  { skill: 'Platform Mastery', current: 82, target: 90, trend: 'up' },
  { skill: 'Academic Integration', current: 78, target: 85, trend: 'up' },
  { skill: 'Community Leadership', current: 72, target: 80, trend: 'stable' },
  { skill: 'Tool Building', current: 45, target: 70, trend: 'up' }
];

export default function ProfileAnalyticsPage() {
  const _router = useRouter();
  const { user: _user } = useSession();
  
  const [analytics, setAnalytics] = useState<AnalyticsData>(MOCK_ANALYTICS);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'semester' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(false);

  const handlePeriodChange = async (period: 'week' | 'month' | 'semester' | 'year') => {
    setIsLoading(true);
    setTimePeriod(period);
    
    // TODO: Fetch analytics for new period
    setTimeout(() => {
      setAnalytics(prev => ({ ...prev, period }));
      setIsLoading(false);
    }, 1000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      case 'stable': return <Activity className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getEfficiencyColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-400';
      case 'declining': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <ErrorBoundary>
      <PageContainer
        title="Personal Analytics"
        subtitle="Your HIVE usage insights and optimization opportunities"
        breadcrumbs={[
          { label: "Profile", icon: User, href: "/profile" },
          { label: "Analytics" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Select value={timePeriod} onValueChange={(value: any) => handlePeriodChange(value)}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
        maxWidth="xl"
      >
        <div className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-lg font-bold text-white">{analytics.platformEngagement.engagementScore}%</div>
              <div className="text-xs text-hive-text-mutedLight">Engagement Score</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-lg font-bold text-white">{analytics.academicIntegration.studyEfficiency}%</div>
              <div className="text-xs text-hive-text-mutedLight">Study Efficiency</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-lg font-bold text-white">{analytics.communityParticipation.contributionScore}%</div>
              <div className="text-xs text-hive-text-mutedLight">Community Score</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
              <Target className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <div className="text-lg font-bold text-white">{analytics.personalDevelopment.campusIntegration}%</div>
              <div className="text-xs text-hive-text-mutedLight">Campus Integration</div>
            </Card>
          </div>

          {/* Main Analytics Tabs */}
          <Tabs defaultValue="engagement" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            {/* Platform Engagement */}
            <TabsContent value="engagement" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Usage Patterns
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Total Time Spent</span>
                      <Badge variant="secondary">{formatTime(analytics.platformEngagement.totalTimeSpent)}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Sessions This {timePeriod}</span>
                      <span className="text-hive-gold">{analytics.platformEngagement.sessionsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Average Session</span>
                      <span className="text-green-400">{analytics.platformEngagement.averageSessionLength} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Peak Usage</span>
                      <span className="text-blue-400">{analytics.platformEngagement.peakUsageTime}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Weekly Activity Pattern
                  </h3>
                  <div className="space-y-3">
                    {WEEKLY_PATTERN.map((day) => (
                      <div key={day.day} className="flex items-center space-x-3">
                        <div className="w-8 text-xs text-hive-text-mutedLight">{day.day}</div>
                        <div className="flex-1 flex items-center space-x-2">
                          <div className="flex-1 bg-hive-background-tertiary rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${day.usage}%` }}
                            />
                          </div>
                          <span className="text-xs text-white w-8">{day.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Feature Adoption
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{analytics.platformEngagement.featuresUsed}</div>
                    <div className="text-sm text-hive-text-mutedLight">Features Used</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {Math.round((analytics.platformEngagement.featuresUsed / 25) * 100)}%
                    </div>
                    <div className="text-sm text-hive-text-mutedLight">Platform Explored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {analytics.platformEngagement.engagementScore}%
                    </div>
                    <div className="text-sm text-hive-text-mutedLight">Engagement Quality</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Academic Integration */}
            <TabsContent value="academic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Academic Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Study Tools Used</span>
                      <Badge variant="secondary">{analytics.academicIntegration.studyToolsUsed}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Goals Achieved</span>
                      <span className="text-green-400">{analytics.academicIntegration.academicGoalsAchieved}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">GPA Improvement</span>
                      <span className="text-hive-gold">+{analytics.academicIntegration.gpaImprovement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Assignments Tracked</span>
                      <span className="text-blue-400">{analytics.academicIntegration.assignmentsTracked}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Study Efficiency Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Time Management</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-hive-background-tertiary rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-xs text-white">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Goal Completion</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-hive-background-tertiary rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '72%' }} />
                        </div>
                        <span className="text-xs text-white">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Resource Utilization</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-hive-background-tertiary rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-xs text-white">78%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Community Participation */}
            <TabsContent value="community" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Community Engagement
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Active Spaces</span>
                      <Badge variant="secondary">{analytics.communityParticipation.spacesActive}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Events Attended</span>
                      <span className="text-green-400">{analytics.communityParticipation.eventsAttended}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Tools Shared</span>
                      <span className="text-blue-400">{analytics.communityParticipation.toolsShared}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Leadership Roles</span>
                      <span className="text-hive-gold">{analytics.communityParticipation.leadershipRoles}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Network Growth
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      +{analytics.communityParticipation.networkGrowth}
                    </div>
                    <div className="text-sm text-hive-text-mutedLight mb-4">New connections this {timePeriod}</div>
                    <div className="text-lg font-semibold text-white">
                      {analytics.communityParticipation.contributionScore}% Contribution Score
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Personal Development */}
            <TabsContent value="development" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Skills & Achievements
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white mb-2">Recently Learned Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analytics.personalDevelopment.skillsLearned.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Goals Completed</span>
                      <span className="text-green-400">{analytics.personalDevelopment.goalsCompleted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Platform Mastery</span>
                      <span className="text-hive-gold">{analytics.personalDevelopment.platformMastery}%</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Skill Progress Tracking
                  </h3>
                  <div className="space-y-4">
                    {SKILL_PROGRESS.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm">{skill.skill}</span>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(skill.trend)}
                            <span className="text-xs text-hive-text-mutedLight">
                              {skill.current}% / {skill.target}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                          <div 
                            className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(skill.current / skill.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Insights & Recommendations */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-hive-gold/10 to-hive-champagne/10 border-hive-gold/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Key Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Efficiency Trending</p>
                        <p className={`text-sm ${getEfficiencyColor(analytics.insights.efficiencyTrend)}`}>
                          Your productivity is {analytics.insights.efficiencyTrend}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Next Milestone</p>
                        <p className="text-sm text-hive-text-mutedLight">
                          {analytics.insights.nextMilestone}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Optimization Opportunities
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-hive-background-tertiary">
                      <p className="text-white font-medium mb-1">Top Recommendation</p>
                      <p className="text-sm text-hive-text-mutedLight">
                        {analytics.insights.topRecommendation}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-hive-background-tertiary">
                      <p className="text-white font-medium mb-1">Quick Win</p>
                      <p className="text-sm text-hive-text-mutedLight">
                        {analytics.insights.optimizationOpportunity}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Personalized Action Items
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-white">This Week</h4>
                    <div className="p-3 rounded-lg bg-hive-background-tertiary flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">Complete pending assignments tracker setup</span>
                    </div>
                    <div className="p-3 rounded-lg bg-hive-background-tertiary flex items-center space-x-3">
                      <Heart className="h-4 w-4 text-pink-400" />
                      <span className="text-sm text-white">Join 2 new study groups to expand network</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-white">Long Term</h4>
                    <div className="p-3 rounded-lg bg-hive-background-tertiary flex items-center space-x-3">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-white">Develop 3 custom tools to boost builder score</span>
                    </div>
                    <div className="p-3 rounded-lg bg-hive-background-tertiary flex items-center space-x-3">
                      <Award className="h-4 w-4 text-hive-gold" />
                      <span className="text-sm text-white">Reach community leadership milestone</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </ErrorBoundary>
  );
}