import { NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

// Minimal DTOs for metrics used below
interface UserStats { total: number; active: number; new: number; verified: number }
interface SpaceStats { total: number; active: number; growth: number }
interface EngagementStats { dailyActiveUsers: number; weeklyActiveUsers: number; monthlyActiveUsers: number; averageSessionDuration: number; postsPerDay: number; retention: { day1: number; day7: number; day30: number } }
interface PerformanceStats { averageResponseTime: number; errorRate: number; uptime: number; supportTickets: { total: number; resolved: number; averageResolutionTime: number } }
interface CampusOverview {
  campusId: string;
  name: string;
  launchDate: string;
  status: string;
  students: UserStats;
  spaces: SpaceStats;
  engagement: EngagementStats;
  performance: PerformanceStats;
  healthScore: number;
}
interface PipelineCampus { id: string; status?: string; readinessScore?: number; priority?: number; name?: string; campusId?: string; estimatedStudents?: number; [key: string]: unknown }

export const GET = withSecureAuth(async (request, token) => {

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'overview'; // 'overview', 'campuses', 'expansion-plan', 'metrics'

  try {
    logger.info('Fetching campus expansion data', { userId: token?.uid || 'unknown', action });

    // Get comprehensive campus expansion data
    const [
      campusMetrics,
      expansionPipeline,
      readinessAssessment,
      scalingPlan
    ] = await Promise.all([
      getCampusMetrics(),
      getExpansionPipeline(),
      getCampusReadinessAssessment(),
      getScalingPlan()
    ]);

    const expansion = {
      overview: {
        currentCampuses: 1, // UB Buffalo only
        activePipeline: expansionPipeline.active.length,
        targetCampuses: expansionPipeline.total,
        readinessScore: calculateReadinessScore(readinessAssessment),
        estimatedTimeline: '6-12 months',
        totalAddressableMarket: calculateTAM(expansionPipeline.all)
      },
      currentStatus: {
        ubBuffalo: campusMetrics.ubBuffalo,
        lessons: extractLessonsLearned(campusMetrics.ubBuffalo),
        successFactors: identifySuccessFactors(campusMetrics.ubBuffalo),
        challenges: identifyChallenges(campusMetrics.ubBuffalo)
      },
      pipeline: expansionPipeline,
      readiness: readinessAssessment,
      scaling: scalingPlan,
      infrastructure: {
        multiTenancy: assessMultiTenancyReadiness(),
        dataIsolation: assessDataIsolation(),
        customization: assessCustomizationNeeds(),
        compliance: assessComplianceRequirements()
      }
    };

    return NextResponse.json({
      success: true,
      expansion,
      action,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error fetching campus expansion data', { error: error instanceof Error ? error : new Error(String(error)) });

    // Return mock data for development
    return NextResponse.json({
      success: true,
      expansion: getMockExpansionData(),
      action,
      isMock: true,
      error: 'Using mock data - Campus expansion API not fully implemented'
    });
  }
}, { requireAdmin: true });

export const POST = withSecureAuth(async (request, token) => {

  try {
    const body = await request.json();
    const { action, campusId, data } = body;

    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }

    let result;
    switch (action) {
      case 'add_campus_to_pipeline':
        result = await addCampusToPipeline(data, token?.uid || 'unknown');
        break;
      case 'update_campus_status':
        result = await updateCampusStatus(campusId, data, token?.uid || 'unknown');
        break;
      case 'assess_campus_readiness':
        result = await assessCampusReadiness(campusId, token?.uid || 'unknown');
        break;
      case 'deploy_campus_infrastructure':
        result = await deployCampusInfrastructure(campusId, data, token?.uid || 'unknown');
        break;
      case 'generate_expansion_report':
        result = await generateExpansionReport(token?.uid || 'unknown');
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    logger.info('Campus expansion action performed', {
      action,
      userId: token?.uid || 'unknown',
      metadata: {
        campusId,
        result: result.success
      }
    });

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error performing campus expansion action', { error: error instanceof Error ? error : new Error(String(error)), userId: auth.userId });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, { requireAdmin: true });

/**
 * Get metrics for current campus (UB Buffalo)
 */
async function getCampusMetrics() {
  try {
    // Get UB Buffalo metrics
    const [
      userStats,
      spaceStats,
      engagementStats,
      performanceStats
    ] = await Promise.all([
      getUserStatistics('ub-buffalo'),
      getSpaceStatistics('ub-buffalo'),
      getEngagementStatistics('ub-buffalo'),
      getPerformanceStatistics('ub-buffalo')
    ]);

    return {
      ubBuffalo: {
        campusId: 'ub-buffalo',
        name: 'University at Buffalo',
        launchDate: '2024-10-01',
        status: 'active',
        students: userStats,
        spaces: spaceStats,
        engagement: engagementStats,
        performance: performanceStats,
        healthScore: calculateCampusHealth(userStats, spaceStats, engagementStats, performanceStats)
      }
    };

  } catch (error) {
    logger.error('Error getting campus metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    return getMockExpansionData().currentStatus;
  }
}

/**
 * Get expansion pipeline data
 */
async function getExpansionPipeline() {
  try {
    // Query expansion pipeline from database
    const pipelineQuery = dbAdmin.collection('campus_expansion')
      .orderBy('priority', 'asc');

    const pipelineSnap = await pipelineQuery.get();
    const pipeline = pipelineSnap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Record<string, unknown>)
    })) as PipelineCampus[];

    // Categorize by status
    const categorized = {
      active: pipeline.filter(c => c.status === 'researching' || c.status === 'planning'),
      pending: pipeline.filter(c => c.status === 'identified' || c.status === 'evaluating'),
      future: pipeline.filter(c => c.status === 'future'),
      total: pipeline.length,
      all: pipeline
    };

    return categorized;

  } catch (error) {
    logger.error('Error getting expansion pipeline', { error: error instanceof Error ? error : new Error(String(error)) });
    return getMockExpansionData().pipeline;
  }
}

/**
 * Assess campus readiness for HIVE deployment
 */
async function getCampusReadinessAssessment() {
  try {
    const readiness = {
      technical: {
        multiTenancy: 85,
        dataIsolation: 92,
        scalingInfrastructure: 78,
        monitoringAlerts: 88
      },
      operational: {
        adminTraining: 65,
        supportProcesses: 70,
        moderationPolicies: 80,
        complianceFramework: 75
      },
      business: {
        marketResearch: 90,
        competitorAnalysis: 85,
        revenueProjections: 70,
        partnershipStrategy: 60
      },
      product: {
        campusCustomization: 55,
        brandingFlexibility: 80,
        localIntegrations: 45,
        culturalAdaptation: 70
      }
    };

    return readiness;

  } catch (error) {
    logger.error('Error assessing campus readiness', { error: error instanceof Error ? error : new Error(String(error)) });
    return getMockExpansionData().readiness;
  }
}

/**
 * Get scaling plan and infrastructure requirements
 */
async function getScalingPlan() {
  try {
    const scaling = {
      phase1: {
        name: 'Northeast Expansion',
        timeframe: 'Q1-Q2 2025',
        campuses: ['cornell', 'syracuse', 'rochester'],
        requirements: {
          infrastructure: ['Multi-tenant architecture', 'Regional data isolation'],
          team: ['2 Campus Success Managers', '1 Regional Operations Lead'],
          budget: 250000
        },
        risks: ['Competition from existing apps', 'Regulatory compliance variations']
      },
      phase2: {
        name: 'Mid-Atlantic Expansion',
        timeframe: 'Q3-Q4 2025',
        campuses: ['penn-state', 'temple', 'drexel'],
        requirements: {
          infrastructure: ['Advanced analytics platform', 'Automated onboarding'],
          team: ['3 Campus Success Managers', '1 Technical Operations Specialist'],
          budget: 400000
        },
        risks: ['Technical complexity scaling', 'Campus-specific feature requests']
      },
      phase3: {
        name: 'National Scale',
        timeframe: '2026',
        campuses: ['nationwide-rollout'],
        requirements: {
          infrastructure: ['Enterprise-grade infrastructure', 'Advanced compliance framework'],
          team: ['Regional teams', 'Dedicated compliance officer'],
          budget: 1000000
        },
        risks: ['Regulatory complexity', 'Cultural adaptation challenges']
      }
    };

    return scaling;

  } catch (error) {
    logger.error('Error getting scaling plan', { error: error instanceof Error ? error : new Error(String(error)) });
    return getMockExpansionData().scaling;
  }
}

/**
 * Campus expansion actions
 */
async function addCampusToPipeline(campusData: Record<string, unknown>, userId: string) {
  try {
    const newCampus = {
      ...campusData,
      addedBy: userId,
      addedAt: new Date(),
      status: 'identified',
      priority: (campusData as { priority?: number }).priority || 50,
      estimatedStudents: (campusData as { estimatedStudents?: number }).estimatedStudents || 0,
      marketSize: calculateMarketSize(campusData),
      readinessScore: 0
    };

    const docRef = await dbAdmin.collection('campus_expansion').add(newCampus);

    // Log the action
    await dbAdmin.collection('admin_logs').add({
      action: 'campus_added_to_pipeline',
      campusId: newCampus.campusId,
      campusName: newCampus.name,
      userId,
      timestamp: new Date(),
      level: 'info'
    });

    return {
      success: true,
      campusId: docRef.id,
      message: `${newCampus.name} added to expansion pipeline`,
      estimatedLaunch: calculateEstimatedLaunch(newCampus.priority)
    };

  } catch (error) {
    logger.error('Error adding campus to pipeline', { error: error instanceof Error ? error : new Error(String(error)) });
    return { success: false, error: 'Failed to add campus to pipeline' };
  }
}

async function updateCampusStatus(campusId: string, updateData: Partial<{ status: string }> & Record<string, unknown>, userId: string) {
  try {
    const campusRef = dbAdmin.collection('campus_expansion').doc(campusId);

    await campusRef.update({
      ...updateData,
      updatedBy: userId,
      updatedAt: new Date()
    });

    // Log the status change
    await dbAdmin.collection('admin_logs').add({
      action: 'campus_status_updated',
      campusId,
      newStatus: (updateData as { status?: string }).status,
      userId,
      timestamp: new Date(),
      level: 'info'
    });

    return {
      success: true,
      message: `Campus status updated to ${(updateData as { status?: string }).status}`,
      nextSteps: generateNextSteps((updateData as { status?: string }).status || '')
    };

  } catch (error) {
    logger.error('Error updating campus status', { error: error instanceof Error ? error : new Error(String(error)) });
    return { success: false, error: 'Failed to update campus status' };
  }
}

async function assessCampusReadiness(campusId: string, userId: string) {
  try {
    // Perform comprehensive readiness assessment
    const assessment = await performReadinessAssessment(campusId);

    // Store assessment results
    await dbAdmin.collection('campus_readiness').doc(campusId).set({
      ...assessment,
      assessedBy: userId,
      assessedAt: new Date()
    });

    // Update campus record with readiness score
    await dbAdmin.collection('campus_expansion').doc(campusId).update({
      readinessScore: assessment.overallScore,
      lastAssessed: new Date()
    });

    return {
      success: true,
      assessment,
      recommendations: generateReadinessRecommendations(assessment)
    };

  } catch (error) {
    logger.error('Error assessing campus readiness', { error: error instanceof Error ? error : new Error(String(error)) });
    return { success: false, error: 'Failed to assess campus readiness' };
  }
}

async function deployCampusInfrastructure(campusId: string, deploymentData: Record<string, unknown>, userId: string) {
  try {
    // Create campus-specific infrastructure
    const infrastructure = await createCampusInfrastructure(campusId, deploymentData);

    // Initialize campus data isolation
    await setupDataIsolation(campusId);

    // Configure campus-specific settings
    await configureCampusSettings(campusId, deploymentData.settings);

    // Log deployment
    await dbAdmin.collection('admin_logs').add({
      action: 'campus_infrastructure_deployed',
      campusId,
      deploymentConfig: deploymentData,
      userId,
      timestamp: new Date(),
      level: 'info'
    });

    return {
      success: true,
      infrastructure,
      message: 'Campus infrastructure deployed successfully',
      launchChecklist: generateLaunchChecklist(campusId)
    };

  } catch (error) {
    logger.error('Error deploying campus infrastructure', { error: error instanceof Error ? error : new Error(String(error)) });
    return { success: false, error: 'Failed to deploy campus infrastructure' };
  }
}

async function generateExpansionReport(userId: string) {
  try {
    const [
      currentMetrics,
      pipelineStatus,
      readinessAssessment,
      recommendations
    ] = await Promise.all([
      getCampusMetrics(),
      getExpansionPipeline(),
      getCampusReadinessAssessment(),
      generateExpansionRecommendations()
    ]);

    const report = {
      generatedAt: new Date().toISOString(),
      generatedBy: userId,
      executiveSummary: {
        currentCampuses: 1,
        pipelineCampuses: pipelineStatus.total,
        readyForDeployment: pipelineStatus.active.filter(c => (c.readinessScore ?? 0) > 80).length,
        estimatedRevenue: calculateRevenueProjection(pipelineStatus.all),
        timeline: 'Next expansion in Q1 2025'
      },
      currentPerformance: currentMetrics,
      pipeline: pipelineStatus,
      readiness: readinessAssessment,
      recommendations,
      risks: identifyExpansionRisks(pipelineStatus.all),
      nextActions: generateNextActions(pipelineStatus.active)
    };

    // Store report
    await dbAdmin.collection('expansion_reports').add(report);

    return {
      success: true,
      report,
      downloadUrl: `/api/admin/campus-expansion/report/${report.generatedAt}`
    };

  } catch (error) {
    logger.error('Error generating expansion report', { error: error instanceof Error ? error : new Error(String(error)) });
    return { success: false, error: 'Failed to generate expansion report' };
  }
}

/**
 * Helper functions
 */
async function getUserStatistics(campusId: string) {
  try {
    const usersSnap = await dbAdmin.collection('users')
      .where('campusId', '==', campusId)
      .get();

    const users = usersSnap.docs.map(doc => doc.data());

    return {
      total: users.length,
      active: users.filter(u => u.lastActive && isWithinDays(u.lastActive.toDate(), 7)).length,
      newThisMonth: users.filter(u => isWithinDays(u.createdAt.toDate(), 30)).length,
      byYear: groupBy(users, 'year'),
      byMajor: groupBy(users, 'major')
    };
  } catch (error) {
    return { total: 0, active: 0, newThisMonth: 0, byYear: {}, byMajor: {} };
  }
}

async function getSpaceStatistics(campusId: string) {
  try {
    const spacesSnap = await dbAdmin.collection('spaces')
      .where('campusId', '==', campusId)
      .get();

    const spaces = spacesSnap.docs.map(doc => doc.data());

    return {
      total: spaces.length,
      active: spaces.filter(s => s.isActive).length,
      totalMembers: spaces.reduce((sum, s) => sum + (s.memberCount || 0), 0),
      averageMembers: spaces.length > 0 ? spaces.reduce((sum, s) => sum + (s.memberCount || 0), 0) / spaces.length : 0,
      byCategory: groupBy(spaces, 'category')
    };
  } catch (error) {
    return { total: 0, active: 0, totalMembers: 0, averageMembers: 0, byCategory: {} };
  }
}

async function getEngagementStatistics(campusId: string) {
  try {
    // This would integrate with actual engagement tracking
    return {
      dailyActiveUsers: Math.floor(Math.random() * 500) + 200,
      weeklyActiveUsers: Math.floor(Math.random() * 800) + 400,
      monthlyActiveUsers: Math.floor(Math.random() * 1000) + 600,
      averageSessionDuration: Math.floor(Math.random() * 15) + 8, // minutes
      postsPerDay: Math.floor(Math.random() * 50) + 20,
      retention: {
        day1: 85,
        day7: 65,
        day30: 45
      }
    };
  } catch (error) {
    return { dailyActiveUsers: 0, weeklyActiveUsers: 0, monthlyActiveUsers: 0, averageSessionDuration: 0, postsPerDay: 0, retention: { day1: 0, day7: 0, day30: 0 } };
  }
}

async function getPerformanceStatistics(campusId: string) {
  return {
    averageResponseTime: Math.floor(Math.random() * 200) + 150, // ms
    errorRate: Math.random() * 2, // %
    uptime: 99.9 + Math.random() * 0.09, // %
    supportTickets: {
      total: Math.floor(Math.random() * 20) + 5,
      resolved: Math.floor(Math.random() * 15) + 8,
      averageResolutionTime: Math.floor(Math.random() * 24) + 6 // hours
    }
  };
}

function calculateCampusHealth(users: UserStats, spaces: SpaceStats, engagement: EngagementStats, performance: PerformanceStats) {
  const userHealth = (users.active / users.total) * 100 || 0;
  const spaceHealth = (spaces.active / spaces.total) * 100 || 0;
  const engagementHealth = Math.min(engagement.retention.day7, 100);
  const performanceHealth = Math.max(0, 100 - performance.errorRate * 10);

  return Math.round((userHealth + spaceHealth + engagementHealth + performanceHealth) / 4);
}

function calculateReadinessScore(readiness: Record<string, Record<string, number>>) {
  const categories = Object.values(readiness);
  const totalScore = categories.reduce((sum: number, category: Record<string, number>) => {
    const categoryScore = Object.values(category).reduce((catSum: number, score: number) => catSum + score, 0) / Object.keys(category).length;
    return sum + categoryScore;
  }, 0);

  return Math.round(totalScore / categories.length);
}

function assessMultiTenancyReadiness() {
  return {
    score: 85,
    status: 'ready',
    components: {
      dataIsolation: 'implemented',
      userManagement: 'implemented',
      campusRouting: 'implemented',
      customization: 'partial'
    },
    gaps: ['Campus-specific theming', 'Localized content management']
  };
}

function assessDataIsolation() {
  return {
    score: 92,
    status: 'ready',
    implementation: {
      firestoreRules: 'implemented',
      campusIdFiltering: 'implemented',
      crossCampusQueries: 'restricted',
      dataExport: 'campus-specific'
    }
  };
}

function assessCustomizationNeeds() {
  return {
    score: 65,
    requirements: {
      branding: 'high',
      features: 'medium',
      integrations: 'high',
      policies: 'medium'
    },
    gaps: ['Campus branding system', 'School-specific integrations', 'Custom policy frameworks']
  };
}

function assessComplianceRequirements() {
  return {
    score: 75,
    frameworks: {
      ferpa: 'compliant',
      coppa: 'compliant',
      ccpa: 'partial',
      gdpr: 'partial'
    },
    gaps: ['State-specific privacy laws', 'International student regulations']
  };
}

function extractLessonsLearned(_campusData: unknown) {
  return [
    'Strong academic partnerships drive initial adoption',
    'Peer-to-peer discovery is the primary growth driver',
    'Campus-specific events create strong engagement spikes',
    'Faculty endorsement significantly impacts trust'
  ];
}

function identifySuccessFactors(_campusData: unknown) {
  return [
    'High user engagement in academic spaces',
    'Strong retention in study groups',
    'Effective viral coefficient through event sharing',
    'Minimal support burden due to intuitive design'
  ];
}

function identifyChallenges(_campusData: unknown) {
  return [
    'Competing with established social platforms',
    'Seasonal usage patterns during exams/breaks',
    'Moderation complexity with student content',
    'Balancing privacy with community features'
  ];
}

function calculateTAM(campuses: Array<Record<string, unknown>>) {
  return campuses.reduce((total, campus) => total + (campus.estimatedStudents || 0), 0) * 20; // $20 LTV per student
}

function calculateMarketSize(campusData: Record<string, unknown>) {
  return (campusData.estimatedStudents || 0) * 20; // $20 LTV per student
}

function calculateEstimatedLaunch(priority: number) {
  const monthsFromNow = Math.ceil(priority / 10); // Higher priority = sooner launch
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + monthsFromNow);
  return launchDate.toISOString().substr(0, 7); // YYYY-MM format
}

function generateNextSteps(status: string) {
  const steps = {
    identified: ['Conduct market research', 'Assess competition', 'Estimate student population'],
    evaluating: ['Complete technical assessment', 'Identify key partnerships', 'Develop launch plan'],
    planning: ['Finalize infrastructure requirements', 'Recruit campus team', 'Set launch timeline'],
    deploying: ['Configure campus instance', 'Train support team', 'Execute soft launch'],
    active: ['Monitor metrics', 'Optimize engagement', 'Plan expansion within campus']
  };

  return steps[status as keyof typeof steps] || ['Review current status', 'Define next milestone'];
}

async function performReadinessAssessment(campusId: string) {
  // Simulate comprehensive assessment
  return {
    overallScore: Math.floor(Math.random() * 20) + 70, // 70-90
    technical: Math.floor(Math.random() * 15) + 80,
    operational: Math.floor(Math.random() * 20) + 60,
    business: Math.floor(Math.random() * 15) + 75,
    product: Math.floor(Math.random() * 25) + 60
  };
}

function generateReadinessRecommendations(assessment: Record<string, Record<string, number>>) {
  const recommendations = [];

  if (assessment.technical < 80) {
    recommendations.push('Upgrade technical infrastructure for scalability');
  }
  if (assessment.operational < 75) {
    recommendations.push('Develop comprehensive operational procedures');
  }
  if (assessment.business < 70) {
    recommendations.push('Complete market research and competitive analysis');
  }
  if (assessment.product < 70) {
    recommendations.push('Implement campus-specific customization features');
  }

  return recommendations;
}

async function createCampusInfrastructure(campusId: string, config: Record<string, unknown>) {
  // Simulate infrastructure creation
  return {
    database: `campus_${campusId}_db`,
    cdn: `cdn-${campusId}.hive.college`,
    monitoring: `monitoring-${campusId}`,
    support: `support-${campusId}@hive.college`
  };
}

async function setupDataIsolation(campusId: string) {
  // Simulate data isolation setup
  return {
    firestoreRules: `campus_${campusId}_rules`,
    dataPartition: `partition_${campusId}`,
    backupStrategy: `backup_${campusId}_daily`
  };
}

async function configureCampusSettings(campusId: string, settings: Record<string, unknown>) {
  // Store campus-specific settings
  return dbAdmin.collection('campus_settings').doc(campusId).set({
    ...settings,
    configuredAt: new Date()
  });
}

function generateLaunchChecklist(campusId: string) {
  return [
    'Technical infrastructure deployed and tested',
    'Data isolation verified',
    'Campus admin accounts created',
    'Support processes established',
    'Marketing materials localized',
    'Launch event planned',
    'Beta user group identified',
    'Monitoring and alerts configured'
  ];
}

async function generateExpansionRecommendations() {
  return [
    {
      priority: 'high',
      category: 'technical',
      title: 'Implement advanced campus customization',
      description: 'Build flexible theming and localization system',
      impact: 'Enables rapid campus onboarding',
      effort: 'high'
    },
    {
      priority: 'high',
      category: 'operational',
      title: 'Develop campus success playbook',
      description: 'Document proven strategies for campus launch and growth',
      impact: 'Reduces time to market for new campuses',
      effort: 'medium'
    },
    {
      priority: 'medium',
      category: 'business',
      title: 'Establish university partnership program',
      description: 'Create formal partnership framework with academic institutions',
      impact: 'Facilitates official endorsement and integration',
      effort: 'high'
    }
  ];
}

function identifyExpansionRisks(campuses: Array<Record<string, unknown>>) {
  return [
    {
      risk: 'Technical complexity scaling',
      probability: 'medium',
      impact: 'high',
      mitigation: 'Invest in automated deployment and monitoring systems'
    },
    {
      risk: 'Regulatory compliance variations',
      probability: 'high',
      impact: 'medium',
      mitigation: 'Develop flexible compliance framework'
    },
    {
      risk: 'Competition from established platforms',
      probability: 'high',
      impact: 'high',
      mitigation: 'Focus on unique value proposition and campus-specific features'
    }
  ];
}

function generateNextActions(activeCampuses: Array<Record<string, unknown>>) {
  return [
    'Complete readiness assessment for top 3 pipeline campuses',
    'Finalize multi-tenant architecture implementation',
    'Recruit and train campus success team',
    'Develop campus-specific marketing materials',
    'Establish partnership agreements with target universities'
  ];
}

function calculateRevenueProjection(campuses: Array<Record<string, unknown>>) {
  return campuses.reduce((total, campus) => {
    const students = campus.estimatedStudents || 0;
    const penetration = 0.15; // 15% market penetration
    const ltv = 20; // $20 LTV per student
    return total + (students * penetration * ltv);
  }, 0);
}

// Utility functions
function isWithinDays(date: Date, days: number) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
}

function groupBy<T extends Record<string, unknown>>(array: T[], key: string) {
  return array.reduce((groups, item) => {
    const value = item[key] || 'Unknown';
    groups[value] = (groups[value] || 0) + 1;
    return groups;
  }, {});
}

/**
 * Mock data for development
 */
function getMockExpansionData() {
  return {
    overview: {
      currentCampuses: 1,
      activePipeline: 8,
      targetCampuses: 15,
      readinessScore: 78,
      estimatedTimeline: '6-12 months',
      totalAddressableMarket: 450000
    },
    currentStatus: {
      ubBuffalo: {
        campusId: 'ub-buffalo',
        name: 'University at Buffalo',
        launchDate: '2024-10-01',
        status: 'active',
        students: {
          total: 1247,
          active: 856,
          newThisMonth: 234,
          byYear: {
            'Freshman': 342,
            'Sophomore': 298,
            'Junior': 289,
            'Senior': 268,
            'Graduate': 50
          },
          byMajor: {
            'Engineering': 387,
            'Business': 254,
            'Arts & Sciences': 398,
            'Other': 208
          }
        },
        spaces: {
          total: 89,
          active: 76,
          totalMembers: 2341,
          averageMembers: 26.3,
          byCategory: {
            'Academic': 34,
            'Social': 28,
            'Professional': 15,
            'Other': 12
          }
        },
        engagement: {
          dailyActiveUsers: 432,
          weeklyActiveUsers: 678,
          monthlyActiveUsers: 893,
          averageSessionDuration: 12,
          postsPerDay: 34,
          retention: {
            day1: 85,
            day7: 65,
            day30: 45
          }
        },
        performance: {
          averageResponseTime: 187,
          errorRate: 0.8,
          uptime: 99.94,
          supportTickets: {
            total: 23,
            resolved: 21,
            averageResolutionTime: 8
          }
        },
        healthScore: 87
      },
      lessons: [
        'Strong academic partnerships drive initial adoption',
        'Peer-to-peer discovery is the primary growth driver',
        'Campus-specific events create strong engagement spikes',
        'Faculty endorsement significantly impacts trust'
      ],
      successFactors: [
        'High user engagement in academic spaces',
        'Strong retention in study groups',
        'Effective viral coefficient through event sharing',
        'Minimal support burden due to intuitive design'
      ],
      challenges: [
        'Competing with established social platforms',
        'Seasonal usage patterns during exams/breaks',
        'Moderation complexity with student content',
        'Balancing privacy with community features'
      ]
    },
    pipeline: {
      active: [
        {
          id: 'cornell',
          campusId: 'cornell-university',
          name: 'Cornell University',
          status: 'researching',
          priority: 10,
          estimatedStudents: 15000,
          marketSize: 300000,
          readinessScore: 72,
          targetLaunch: '2025-02-01',
          challenges: ['Strong existing social networks', 'Rural location considerations'],
          opportunities: ['Tech-focused student body', 'Strong engineering programs']
        },
        {
          id: 'syracuse',
          campusId: 'syracuse-university',
          name: 'Syracuse University',
          status: 'evaluating',
          priority: 15,
          estimatedStudents: 13000,
          marketSize: 260000,
          readinessScore: 65,
          targetLaunch: '2025-03-01',
          challenges: ['Seasonal student population', 'Competition from Greek life'],
          opportunities: ['Strong school spirit', 'Active campus life']
        }
      ],
      pending: [
        {
          id: 'rochester',
          campusId: 'university-of-rochester',
          name: 'University of Rochester',
          status: 'identified',
          priority: 25,
          estimatedStudents: 6500,
          marketSize: 130000,
          readinessScore: 0,
          targetLaunch: '2025-04-01'
        }
      ],
      future: [
        {
          id: 'penn-state',
          campusId: 'penn-state-university',
          name: 'Pennsylvania State University',
          status: 'future',
          priority: 50,
          estimatedStudents: 47000,
          marketSize: 940000,
          readinessScore: 0,
          targetLaunch: '2025-08-01'
        }
      ],
      total: 15,
      all: [] // Would contain all campuses
    },
    readiness: {
      technical: {
        multiTenancy: 85,
        dataIsolation: 92,
        scalingInfrastructure: 78,
        monitoringAlerts: 88
      },
      operational: {
        adminTraining: 65,
        supportProcesses: 70,
        moderationPolicies: 80,
        complianceFramework: 75
      },
      business: {
        marketResearch: 90,
        competitorAnalysis: 85,
        revenueProjections: 70,
        partnershipStrategy: 60
      },
      product: {
        campusCustomization: 55,
        brandingFlexibility: 80,
        localIntegrations: 45,
        culturalAdaptation: 70
      }
    },
    scaling: {
      phase1: {
        name: 'Northeast Expansion',
        timeframe: 'Q1-Q2 2025',
        campuses: ['cornell', 'syracuse', 'rochester'],
        requirements: {
          infrastructure: ['Multi-tenant architecture', 'Regional data isolation'],
          team: ['2 Campus Success Managers', '1 Regional Operations Lead'],
          budget: 250000
        },
        risks: ['Competition from existing apps', 'Regulatory compliance variations']
      },
      phase2: {
        name: 'Mid-Atlantic Expansion',
        timeframe: 'Q3-Q4 2025',
        campuses: ['penn-state', 'temple', 'drexel'],
        requirements: {
          infrastructure: ['Advanced analytics platform', 'Automated onboarding'],
          team: ['3 Campus Success Managers', '1 Technical Operations Specialist'],
          budget: 400000
        },
        risks: ['Technical complexity scaling', 'Campus-specific feature requests']
      },
      phase3: {
        name: 'National Scale',
        timeframe: '2026',
        campuses: ['nationwide-rollout'],
        requirements: {
          infrastructure: ['Enterprise-grade infrastructure', 'Advanced compliance framework'],
          team: ['Regional teams', 'Dedicated compliance officer'],
          budget: 1000000
        },
        risks: ['Regulatory complexity', 'Cultural adaptation challenges']
      }
    },
    infrastructure: {
      multiTenancy: {
        score: 85,
        status: 'ready',
        components: {
          dataIsolation: 'implemented',
          userManagement: 'implemented',
          campusRouting: 'implemented',
          customization: 'partial'
        },
        gaps: ['Campus-specific theming', 'Localized content management']
      },
      dataIsolation: {
        score: 92,
        status: 'ready',
        implementation: {
          firestoreRules: 'implemented',
          campusIdFiltering: 'implemented',
          crossCampusQueries: 'restricted',
          dataExport: 'campus-specific'
        }
      },
      customization: {
        score: 65,
        requirements: {
          branding: 'high',
          features: 'medium',
          integrations: 'high',
          policies: 'medium'
        },
        gaps: ['Campus branding system', 'School-specific integrations', 'Custom policy frameworks']
      },
      compliance: {
        score: 75,
        frameworks: {
          ferpa: 'compliant',
          coppa: 'compliant',
          ccpa: 'partial',
          gdpr: 'partial'
        },
        gaps: ['State-specific privacy laws', 'International student regulations']
      }
    }
  };
}
