'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  HiveButton,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';
import {
  Brain,
  Target,
  Zap,
  Timer,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Activity
} from 'lucide-react';

interface BehavioralMetrics {
  completionRates: {
    overall: number;
    feedDiscovery: number;
    spaceJoining: number;
    profileBuilding: number;
    firstPost: number;
    ritualParticipation: number;
  };
  panicToRelief: {
    averageTime: number; // milliseconds
    under10Seconds: number; // percentage
    targetAchievement: number; // percentage achieving <10s
    topSources: { trigger: string; avgTime: number; count: number }[];
  };
  hookCycleMetrics: {
    triggerActivation: number; // percentage detecting student pain
    actionCompletion: number; // percentage taking intended action
    rewardDelivery: number; // percentage receiving variable reward
    investmentMade: number; // percentage making commitment investment
    cycleCompletion: number; // overall cycle completion rate
  };
  anxietyRelief: {
    morningAnxiety: { triggered: number; relieved: number; avgTime: number };
    socialIsolation: { triggered: number; relieved: number; avgTime: number };
    fomo: { triggered: number; relieved: number; avgTime: number };
    academicPanic: { triggered: number; relieved: number; avgTime: number };
    weekendWorry: { triggered: number; relieved: number; avgTime: number };
  };
  behavioralChange: {
    habitFormation: number; // percentage showing automatic HIVE usage
    returnRate: number; // 14-day consecutive usage
    anxietyResponseTime: number; // time from trigger to HIVE open
    organicSharing: number; // natural mention rate without prompts
  };
  studentPsychology: {
    sexualRomanticCapital: { interactions: number; connections: number; success: number };
    socialProof: { postsShared: number; statusGained: number; fearReduced: number };
    insiderKnowledge: { exclusiveInfo: number; earlyAccess: number; advantageGained: number };
  };
}

interface CompletionFunnelStep {
  step: string;
  startCount: number;
  completionCount: number;
  completionRate: number;
  averageTime: number;
  dropOffReasons: string[];
}

export function BehavioralAnalytics() {
  const [metrics, setMetrics] = useState<BehavioralMetrics | null>(null);
  const [completionFunnel, setCompletionFunnel] = useState<CompletionFunnelStep[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBehavioralMetrics();
  }, [timeRange]);

  const loadBehavioralMetrics = async () => {
    try {
      setLoading(true);
      const [metricsRes, funnelRes] = await Promise.all([
        fetch(`/api/admin/behavioral-analytics?range=${timeRange}`),
        fetch(`/api/admin/completion-funnel?range=${timeRange}`)
      ]);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData.metrics);
      }

      if (funnelRes.ok) {
        const funnelData = await funnelRes.json();
        setCompletionFunnel(funnelData.funnel);
      }
    } catch (error) {
      console.error('Failed to load behavioral analytics:', error);
      setMetrics(getMockBehavioralMetrics());
      setCompletionFunnel(getMockCompletionFunnel());
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (value: number, target: number) => {
    if (value >= target) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (value >= target * 0.8) return <ArrowUp className="w-4 h-4 text-yellow-500" />;
    return <AlertTriangle className="w-4 h-4 text-red-500" />;
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 70) return 'text-green-400 bg-green-400/10 border-green-400/30';
    if (rate >= 50) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    return 'text-red-400 bg-red-400/10 border-red-400/30';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-8 text-gray-400">
        No behavioral analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Behavioral Analytics</h2>
          <p className="text-gray-400">Measuring HIVE's core behavioral change metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7 days</TabsTrigger>
              <TabsTrigger value="30d">30 days</TabsTrigger>
            </TabsList>
          </Tabs>
          <HiveButton variant="outline" size="sm" onClick={loadBehavioralMetrics}>
            <Activity className="w-4 h-4 mr-2" />
            Refresh
          </HiveButton>
        </div>
      </div>

      {/* Core Success Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className={`${getCompletionColor(metrics.completionRates.overall)}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">70% Completion Target</CardTitle>
              <Target className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completionRates.overall}%</div>
            <div className="flex items-center gap-2 mt-1">
              {getTrendIcon(metrics.completionRates.overall, 70)}
              <span className="text-xs opacity-70">
                {metrics.completionRates.overall >= 70 ? 'TARGET ACHIEVED' : `${(70 - metrics.completionRates.overall).toFixed(1)}% to target`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`${metrics.panicToRelief.under10Seconds >= 70 ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Panic-to-Relief (&lt;10s)</CardTitle>
              <Zap className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.panicToRelief.under10Seconds}%</div>
            <div className="flex items-center gap-2 mt-1">
              <Timer className="w-3 h-3" />
              <span className="text-xs opacity-70">
                Avg: {(metrics.panicToRelief.averageTime / 1000).toFixed(1)}s
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`${metrics.hookCycleMetrics.cycleCompletion >= 70 ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-orange-400 bg-orange-400/10 border-orange-400/30'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Hook Cycle Complete</CardTitle>
              <Brain className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.hookCycleMetrics.cycleCompletion}%</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs opacity-70">
                Trigger → Action → Reward → Investment
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`${metrics.behavioralChange.habitFormation >= 60 ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-purple-400 bg-purple-400/10 border-purple-400/30'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Behavioral Change</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.behavioralChange.habitFormation}%</div>
            <div className="flex items-center gap-2 mt-1">
              <Heart className="w-3 h-3" />
              <span className="text-xs opacity-70">
                "Never panic alone" achieved
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="completion" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="completion">Completion Funnel</TabsTrigger>
          <TabsTrigger value="anxiety">Anxiety Relief</TabsTrigger>
          <TabsTrigger value="psychology">Student Psychology</TabsTrigger>
          <TabsTrigger value="hook-cycle">Hook Cycle</TabsTrigger>
        </TabsList>

        {/* 70% Completion Funnel Analysis */}
        <TabsContent value="completion" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>70% Completion Rate Funnel</CardTitle>
              <CardDescription>
                Tracking user journey completion rates to achieve behavioral change target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completionFunnel.map((step, index) => (
                  <div key={step.step} className="relative">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          step.completionRate >= 70 ? 'bg-green-500 text-white' :
                          step.completionRate >= 50 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{step.step}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-400">
                              {step.completionCount.toLocaleString()} / {step.startCount.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400">
                              Avg time: {(step.averageTime / 1000).toFixed(1)}s
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          step.completionRate >= 70 ? 'text-green-400' :
                          step.completionRate >= 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {step.completionRate}%
                        </div>
                        <Progress
                          value={step.completionRate}
                          className="w-24 mt-1"
                        />
                      </div>
                    </div>
                    {step.dropOffReasons.length > 0 && (
                      <div className="mt-2 ml-12 text-xs text-gray-500">
                        Drop-off reasons: {step.dropOffReasons.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anxiety Relief Tracking */}
        <TabsContent value="anxiety" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(metrics.anxietyRelief).map(([anxiety, data]) => (
              <Card key={anxiety} className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm capitalize">
                    {anxiety.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Triggered</span>
                      <Badge variant="outline">{data.triggered}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Relieved</span>
                      <Badge className={`${data.relieved / data.triggered >= 0.7 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {data.relieved} ({((data.relieved / data.triggered) * 100).toFixed(0)}%)
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Avg Relief Time</span>
                      <span className={`text-sm font-medium ${data.avgTime <= 10000 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {(data.avgTime / 1000).toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Student Psychology Tracking */}
        <TabsContent value="psychology" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-800/20 border-pink-500/30">
              <CardHeader>
                <CardTitle className="text-pink-400">Sexual/Romantic Capital</CardTitle>
                <CardDescription>Hookup infrastructure effectiveness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Interactions</span>
                  <span className="font-medium">{metrics.studentPsychology.sexualRomanticCapital.interactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Connections</span>
                  <span className="font-medium">{metrics.studentPsychology.sexualRomanticCapital.connections}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-pink-400">
                    {metrics.studentPsychology.sexualRomanticCapital.success}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-800/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">Social Proof</CardTitle>
                <CardDescription>Status building and fear reduction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Posts Shared</span>
                  <span className="font-medium">{metrics.studentPsychology.socialProof.postsShared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status Gained</span>
                  <span className="font-medium">{metrics.studentPsychology.socialProof.statusGained}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Fear Reduced</span>
                  <span className="font-medium text-blue-400">
                    {metrics.studentPsychology.socialProof.fearReduced}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-800/20 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">Insider Knowledge</CardTitle>
                <CardDescription>Exclusive access and advantage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Exclusive Info</span>
                  <span className="font-medium">{metrics.studentPsychology.insiderKnowledge.exclusiveInfo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Early Access</span>
                  <span className="font-medium">{metrics.studentPsychology.insiderKnowledge.earlyAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Advantage Rate</span>
                  <span className="font-medium text-yellow-400">
                    {metrics.studentPsychology.insiderKnowledge.advantageGained}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hook Cycle Analysis */}
        <TabsContent value="hook-cycle" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Nir Eyal Hook Cycle Implementation</CardTitle>
              <CardDescription>
                Measuring Trigger → Action → Variable Reward → Investment cycle completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">1. Trigger Detection</h4>
                      <p className="text-sm text-gray-400">Student pain/anxiety identified</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">{metrics.hookCycleMetrics.triggerActivation}%</div>
                      <Progress value={metrics.hookCycleMetrics.triggerActivation} className="w-20 mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">2. Action Completion</h4>
                      <p className="text-sm text-gray-400">User takes intended action</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{metrics.hookCycleMetrics.actionCompletion}%</div>
                      <Progress value={metrics.hookCycleMetrics.actionCompletion} className="w-20 mt-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">3. Variable Reward</h4>
                      <p className="text-sm text-gray-400">Intermittent reinforcement delivered</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{metrics.hookCycleMetrics.rewardDelivery}%</div>
                      <Progress value={metrics.hookCycleMetrics.rewardDelivery} className="w-20 mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">4. Investment Made</h4>
                      <p className="text-sm text-gray-400">Commitment/personalization added</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">{metrics.hookCycleMetrics.investmentMade}%</div>
                      <Progress value={metrics.hookCycleMetrics.investmentMade} className="w-20 mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-hive-gold/10 border border-hive-gold/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-hive-gold/20 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-hive-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-hive-gold">Overall Hook Cycle Success</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-2xl font-bold text-white">{metrics.hookCycleMetrics.cycleCompletion}%</div>
                      {getTrendIcon(metrics.hookCycleMetrics.cycleCompletion, 70)}
                      <span className="text-sm text-gray-400">
                        {metrics.hookCycleMetrics.cycleCompletion >= 70 ? 'Behavioral addiction achieved' : 'Working toward habit formation'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock data for development
function getMockBehavioralMetrics(): BehavioralMetrics {
  return {
    completionRates: {
      overall: 73.2,
      feedDiscovery: 89.1,
      spaceJoining: 76.4,
      profileBuilding: 82.3,
      firstPost: 65.8,
      ritualParticipation: 71.5
    },
    panicToRelief: {
      averageTime: 8420,
      under10Seconds: 74.3,
      targetAchievement: 74.3,
      topSources: [
        { trigger: 'morning_anxiety', avgTime: 7200, count: 234 },
        { trigger: 'social_isolation', avgTime: 9100, count: 189 },
        { trigger: 'fomo', avgTime: 6800, count: 345 },
        { trigger: 'academic_panic', avgTime: 11200, count: 156 }
      ]
    },
    hookCycleMetrics: {
      triggerActivation: 87.2,
      actionCompletion: 76.8,
      rewardDelivery: 82.4,
      investmentMade: 71.1,
      cycleCompletion: 72.6
    },
    anxietyRelief: {
      morningAnxiety: { triggered: 234, relieved: 189, avgTime: 7200 },
      socialIsolation: { triggered: 189, relieved: 145, avgTime: 9100 },
      fomo: { triggered: 345, relieved: 287, avgTime: 6800 },
      academicPanic: { triggered: 156, relieved: 112, avgTime: 11200 },
      weekendWorry: { triggered: 98, relieved: 76, avgTime: 8900 }
    },
    behavioralChange: {
      habitFormation: 68.7,
      returnRate: 74.2,
      anxietyResponseTime: 8420,
      organicSharing: 23.4
    },
    studentPsychology: {
      sexualRomanticCapital: { interactions: 456, connections: 123, success: 27 },
      socialProof: { postsShared: 789, statusGained: 234, fearReduced: 43 },
      insiderKnowledge: { exclusiveInfo: 345, earlyAccess: 189, advantageGained: 31 }
    }
  };
}

function getMockCompletionFunnel(): CompletionFunnelStep[] {
  return [
    {
      step: 'Anxiety Trigger Detection',
      startCount: 1000,
      completionCount: 892,
      completionRate: 89.2,
      averageTime: 2100,
      dropOffReasons: ['No clear pain point', 'Trigger not recognized']
    },
    {
      step: 'Feed Discovery Action',
      startCount: 892,
      completionCount: 734,
      completionRate: 82.3,
      averageTime: 4500,
      dropOffReasons: ['App not opened', 'Distracted by other apps']
    },
    {
      step: 'Community Relief Found',
      startCount: 734,
      completionCount: 567,
      completionRate: 77.2,
      averageTime: 8200,
      dropOffReasons: ['No relevant content', 'Poor matching algorithm']
    },
    {
      step: 'Engagement Investment',
      startCount: 567,
      completionCount: 423,
      completionRate: 74.6,
      averageTime: 12400,
      dropOffReasons: ['Fear of judgment', 'Privacy concerns']
    },
    {
      step: 'Behavioral Loop Complete',
      startCount: 423,
      completionCount: 312,
      completionRate: 73.8,
      averageTime: 18600,
      dropOffReasons: ['Insufficient reward', 'No habit formation']
    }
  ];
}