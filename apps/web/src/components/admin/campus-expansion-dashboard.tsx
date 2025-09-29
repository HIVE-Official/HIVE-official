'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@hive/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Button } from '@hive/ui';

interface CampusExpansionData {
  overview: {
    currentCampuses: number;
    activePipeline: number;
    targetCampuses: number;
    readinessScore: number;
    estimatedTimeline: string;
  };
  pipeline: Array<{
    campusId: string;
    universityName: string;
    state: string;
    stage: 'identifying' | 'evaluating' | 'planning' | 'deploying' | 'active';
    priority: 'high' | 'medium' | 'low';
    studentCount: number;
    emailDomain: string;
    estimatedLaunch: string;
    readinessScore: number;
    lastUpdated: string;
  }>;
  readinessAssessment: {
    technical: {
      score: number;
      multiTenancy: boolean;
      campusIsolation: boolean;
      scalingInfrastructure: boolean;
      deploymentAutomation: boolean;
      monitoringSetup: boolean;
    };
    operational: {
      score: number;
      adminTraining: boolean;
      supportProcesses: boolean;
      onboardingFlows: boolean;
      contentModeration: boolean;
      legalCompliance: boolean;
    };
    business: {
      score: number;
      marketAnalysis: boolean;
      competitorResearch: boolean;
      pricingStrategy: boolean;
      revenueProjections: boolean;
      partnershipStrategy: boolean;
    };
    product: {
      score: number;
      featureLocalization: boolean;
      campusCustomization: boolean;
      userFeedback: boolean;
      performanceBenchmarks: boolean;
      accessibilityCompliance: boolean;
    };
  };
  scalingPlan: {
    phases: Array<{
      phase: number;
      name: string;
      campusCount: number;
      timeline: string;
      requirements: string[];
      milestones: string[];
      risks: string[];
    }>;
    resourceRequirements: {
      engineering: number;
      operations: number;
      business: number;
      totalBudget: number;
    };
  };
  marketAnalysis: {
    targetMarkets: Array<{
      region: string;
      totalUniversities: number;
      targetUniversities: number;
      estimatedStudents: number;
      competitorPresence: 'low' | 'medium' | 'high';
      marketPotential: number;
    }>;
    revenueProjections: {
      year1: number;
      year2: number;
      year3: number;
      totalProjected: number;
    };
  };
}

export default function CampusExpansionDashboard() {
  const [data, setData] = useState<CampusExpansionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/campus-expansion');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch campus expansion data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAction = async (action: string, params?: any) => {
    setActiveAction(action);
    try {
      const response = await fetch('/api/admin/campus-expansion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...params })
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActiveAction(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading campus expansion data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">Failed to load campus expansion data</div>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'active':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'deploying':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'planning':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'evaluating':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'identifying':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-400/10 border-green-400/30';
    if (score >= 70) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    if (score >= 50) return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    return 'text-red-400 bg-red-400/10 border-red-400/30';
  };

  const getCompetitorColor = (presence: string) => {
    switch (presence) {
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Campus Expansion Management</h1>
          <p className="text-gray-400">Manage HIVE's expansion to universities across the nation</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button
            onClick={() => handleAction('generateExpansionReport')}
            disabled={activeAction === 'generateExpansionReport'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {activeAction === 'generateExpansionReport' ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Active Campuses</div>
          <div className="text-2xl font-bold text-white">{data.overview.currentCampuses}</div>
          <div className="text-xs text-gray-500">Currently deployed</div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Pipeline</div>
          <div className="text-2xl font-bold text-blue-400">{data.overview.activePipeline}</div>
          <div className="text-xs text-gray-500">In development</div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Target Total</div>
          <div className="text-2xl font-bold text-purple-400">{data.overview.targetCampuses}</div>
          <div className="text-xs text-gray-500">Long-term goal</div>
        </Card>
        <Card className={`border p-4 ${getReadinessColor(data.overview.readinessScore)}`}>
          <div className="text-sm opacity-90">Readiness Score</div>
          <div className="text-2xl font-bold">{data.overview.readinessScore}%</div>
          <div className="text-xs opacity-75">Overall system readiness</div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Timeline</div>
          <div className="text-lg font-bold text-white">{data.overview.estimatedTimeline}</div>
          <div className="text-xs text-gray-500">Estimated rollout</div>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
          <TabsTrigger value="pipeline" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Campus Pipeline
          </TabsTrigger>
          <TabsTrigger value="readiness" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Readiness Assessment
          </TabsTrigger>
          <TabsTrigger value="scaling" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Scaling Plan
          </TabsTrigger>
          <TabsTrigger value="market" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Market Analysis
          </TabsTrigger>
        </TabsList>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid gap-4">
            {data.pipeline.map((campus) => (
              <Card key={campus.campusId} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{campus.universityName}</h3>
                    <p className="text-gray-400">{campus.state} • {campus.studentCount.toLocaleString()} students</p>
                    <p className="text-sm text-gray-500">{campus.emailDomain}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getStageColor(campus.stage)} capitalize`}>
                      {campus.stage}
                    </Badge>
                    <Badge className={`${getPriorityColor(campus.priority)} capitalize`}>
                      {campus.priority} Priority
                    </Badge>
                    <Badge className={`${getReadinessColor(campus.readinessScore)}`}>
                      {campus.readinessScore}% Ready
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Estimated Launch:</span>
                    <div className="text-white">{campus.estimatedLaunch}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Updated:</span>
                    <div className="text-white">{campus.lastUpdated}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction('updateCampusStage', { campusId: campus.campusId, stage: 'planning' })}
                      disabled={activeAction === 'updateCampusStage'}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Advance Stage
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction('generateCampusReport', { campusId: campus.campusId })}
                      disabled={activeAction === 'generateCampusReport'}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Readiness Assessment Tab */}
        <TabsContent value="readiness" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.readinessAssessment).map(([category, assessment]) => (
              <Card key={category} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white capitalize">{category}</h3>
                  <Badge className={`${getReadinessColor(assessment.score)}`}>
                    {assessment.score}%
                  </Badge>
                </div>
                <div className="space-y-3">
                  {Object.entries(assessment).map(([key, value]) => {
                    if (key === 'score') return null;
                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${
                          value ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scaling Plan Tab */}
        <TabsContent value="scaling" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Resource Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{data.scalingPlan.resourceRequirements.engineering}</div>
                <div className="text-sm text-gray-400">Engineering</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{data.scalingPlan.resourceRequirements.operations}</div>
                <div className="text-sm text-gray-400">Operations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{data.scalingPlan.resourceRequirements.business}</div>
                <div className="text-sm text-gray-400">Business</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">${(data.scalingPlan.resourceRequirements.totalBudget / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Total Budget</div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {data.scalingPlan.phases.map((phase) => (
              <Card key={phase.phase} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Phase {phase.phase}: {phase.name}</h4>
                    <p className="text-gray-400">{phase.campusCount} campuses • {phase.timeline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Requirements</h5>
                    <ul className="space-y-1">
                      {phase.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-400">• {req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Milestones</h5>
                    <ul className="space-y-1">
                      {phase.milestones.map((milestone, index) => (
                        <li key={index} className="text-sm text-gray-400">• {milestone}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Risks</h5>
                    <ul className="space-y-1">
                      {phase.risks.map((risk, index) => (
                        <li key={index} className="text-sm text-red-400">• {risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Projections</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${(data.marketAnalysis.revenueProjections.year1 / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Year 1</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">${(data.marketAnalysis.revenueProjections.year2 / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Year 2</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">${(data.marketAnalysis.revenueProjections.year3 / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Year 3</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">${(data.marketAnalysis.revenueProjections.totalProjected / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Total Projected</div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {data.marketAnalysis.targetMarkets.map((market, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{market.region}</h4>
                    <p className="text-gray-400">{market.targetUniversities} target universities out of {market.totalUniversities} total</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getCompetitorColor(market.competitorPresence)} capitalize`}>
                      {market.competitorPresence} Competition
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Estimated Students:</span>
                    <div className="text-white">{market.estimatedStudents.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Market Potential:</span>
                    <div className="text-green-400">${(market.marketPotential / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction('analyzeMarket', { region: market.region })}
                      disabled={activeAction === 'analyzeMarket'}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Deep Analysis
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}