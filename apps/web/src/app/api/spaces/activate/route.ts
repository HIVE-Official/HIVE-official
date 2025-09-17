import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

interface SpaceActivationRequest {
  spaceId: string;
  features: string[];
  settings?: {
    allowGuestAccess?: boolean;
    moderationLevel?: 'low' | 'medium' | 'high';
    autoApproveMembers?: boolean;
    enableAnalytics?: boolean;
    customBranding?: boolean;
  };
}

interface SpaceFeature {
  id: string;
  name: string;
  description: string;
  category: 'communication' | 'organization' | 'engagement' | 'analytics' | 'customization';
  requiredPlan: 'free' | 'plus' | 'pro';
  dependencies?: string[];
  configurable: boolean;
}

// Available space features
const SPACE_FEATURES: Record<string, SpaceFeature> = {
  posts: {
    id: 'posts',
    name: 'Posts & Discussions',
    description: 'Enable posting and threaded discussions',
    category: 'communication',
    requiredPlan: 'free',
    configurable: true
  },
  events: {
    id: 'events',
    name: 'Event Management',
    description: 'Create and manage space events with RSVP',
    category: 'organization',
    requiredPlan: 'free',
    configurable: true
  },
  tools: {
    id: 'tools',
    name: 'Tool Integration',
    description: 'Add custom tools to your space',
    category: 'engagement',
    requiredPlan: 'free',
    configurable: true
  },
  polls: {
    id: 'polls',
    name: 'Polling System',
    description: 'Create polls and gather member feedback',
    category: 'engagement',
    requiredPlan: 'free',
    dependencies: ['tools'],
    configurable: true
  },
  announcements: {
    id: 'announcements',
    name: 'Announcements',
    description: 'Send important updates to all members',
    category: 'communication',
    requiredPlan: 'plus',
    configurable: true
  },
  private_channels: {
    id: 'private_channels',
    name: 'Private Channels',
    description: 'Create private discussion channels',
    category: 'communication',
    requiredPlan: 'plus',
    configurable: true
  },
  advanced_analytics: {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Detailed engagement metrics and insights',
    category: 'analytics',
    requiredPlan: 'pro',
    configurable: false
  },
  custom_branding: {
    id: 'custom_branding',
    name: 'Custom Branding',
    description: 'Customize space appearance with your branding',
    category: 'customization',
    requiredPlan: 'pro',
    configurable: true
  },
  api_access: {
    id: 'api_access',
    name: 'API Access',
    description: 'Integrate with external systems via API',
    category: 'organization',
    requiredPlan: 'pro',
    configurable: false
  }
};

// Mock space data
const MOCK_SPACES = {
  'cs-majors': {
    id: 'cs-majors',
    name: 'Computer Science Majors',
    status: 'draft',
    plan: 'free',
    features: [] as string[],
    settings: {}
  },
  'study-groups': {
    id: 'study-groups',
    name: 'Study Groups',
    status: 'active',
    plan: 'plus',
    features: ['posts', 'events', 'tools', 'polls'],
    settings: {
      allowGuestAccess: true,
      moderationLevel: 'medium',
      autoApproveMembers: true
    }
  }
};

function validateFeatureDependencies(features: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const featureId of features) {
    const feature = SPACE_FEATURES[featureId];
    if (!feature) {
      errors.push(`Unknown feature: ${featureId}`);
      continue;
    }
    
    if (feature.dependencies) {
      for (const dependency of feature.dependencies) {
        if (!features.includes(dependency)) {
          errors.push(`Feature "${featureId}" requires "${dependency}"`);
        }
      }
    }
  }
  
  return { valid: errors.length === 0, errors };
}

function checkPlanLimits(features: string[], plan: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const featureId of features) {
    const feature = SPACE_FEATURES[featureId];
    if (!feature) continue;
    
    const planHierarchy = { free: 0, plus: 1, pro: 2 };
    const userPlanLevel = planHierarchy[plan as keyof typeof planHierarchy] ?? 0;
    const requiredPlanLevel = planHierarchy[feature.requiredPlan];
    
    if (userPlanLevel < requiredPlanLevel) {
      errors.push(`Feature "${feature.name}" requires ${feature.requiredPlan} plan`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    const body: SpaceActivationRequest = await request.json();
    const { spaceId, features, settings = {} } = body;

    if (!spaceId || !features) {
      return NextResponse.json(ApiResponseHelper.error("Space ID and features are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get space info (in real app, this would be from database)
    const space = MOCK_SPACES[spaceId as keyof typeof MOCK_SPACES];
    if (!space) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Validate feature dependencies
    const dependencyCheck = validateFeatureDependencies(features);
    if (!dependencyCheck.valid) {
      return NextResponse.json(
        { 
          error: 'Feature dependency validation failed',
          details: dependencyCheck.errors 
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Check plan limits
    const planCheck = checkPlanLimits(features, space.plan);
    if (!planCheck.valid) {
      return NextResponse.json(
        { 
          error: 'Plan limitations exceeded',
          details: planCheck.errors,
          upgradeRequired: true
        },
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Simulate activation process
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time

    // Update space (in real app, this would update database)
    const updatedSpace = {
      ...space,
      status: 'active',
      features,
      settings: { ...space.settings, ...settings },
      activatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      space: updatedSpace,
      message: `Space "${space.name}" has been successfully activated with ${features.length} features.`,
      activationSummary: {
        featuresEnabled: features.map(id => SPACE_FEATURES[id]?.name).filter(Boolean),
        settingsApplied: Object.keys(settings),
        estimatedSetupTime: '2-3 minutes'
      }
    });

  } catch (error) {
    logger.error('Space activation error', { error: error, endpoint: '/api/spaces/activate' });
    return NextResponse.json(ApiResponseHelper.error("Failed to activate space", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');

    if (spaceId) {
      // Get specific space activation status
      const space = MOCK_SPACES[spaceId as keyof typeof MOCK_SPACES];
      if (!space) {
        return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      return NextResponse.json({
        space,
        availableFeatures: Object.values(SPACE_FEATURES).filter(
          feature => checkPlanLimits([feature.id], space.plan).valid
        ),
        recommendedFeatures: ['posts', 'events', 'tools'], // Based on space type/category
        currentPlan: space.plan
      });
    }

    // Return all available features and plans
    return NextResponse.json({
      features: SPACE_FEATURES,
      plans: {
        free: {
          name: 'Free',
          price: 0,
          features: Object.values(SPACE_FEATURES).filter(f => f.requiredPlan === 'free'),
          limits: { members: 50, tools: 5, events: 10 }
        },
        plus: {
          name: 'Plus',
          price: 9.99,
          features: Object.values(SPACE_FEATURES).filter(f => ['free', 'plus'].includes(f.requiredPlan)),
          limits: { members: 200, tools: 15, events: 50 }
        },
        pro: {
          name: 'Pro',
          price: 19.99,
          features: Object.values(SPACE_FEATURES),
          limits: { members: 1000, tools: 'unlimited', events: 'unlimited' }
        }
      }
    });

  } catch (error) {
    logger.error('Get activation info error', { error: error, endpoint: '/api/spaces/activate' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get activation information", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { spaceId, action, featureId, settings } = body;

    if (!spaceId || !action) {
      return NextResponse.json(ApiResponseHelper.error("Space ID and action are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const space = MOCK_SPACES[spaceId as keyof typeof MOCK_SPACES];
    if (!space) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    switch (action) {
      case 'enable_feature':
        if (!featureId || space.features.includes(featureId)) {
          return NextResponse.json(ApiResponseHelper.error("Feature already enabled or invalid feature ID", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }
        
        space.features.push(featureId);
        return NextResponse.json({
          success: true,
          message: `Feature ${SPACE_FEATURES[featureId]?.name} enabled`,
          space
        });

      case 'disable_feature':
        if (!featureId || !space.features.includes(featureId)) {
          return NextResponse.json(ApiResponseHelper.error("Feature not enabled or invalid feature ID", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }
        
        space.features = space.features.filter(id => id !== featureId);
        return NextResponse.json({
          success: true,
          message: `Feature ${SPACE_FEATURES[featureId]?.name} disabled`,
          space
        });

      case 'update_settings':
        if (!settings) {
          return NextResponse.json(ApiResponseHelper.error("Settings are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }
        
        space.settings = { ...space.settings, ...settings };
        return NextResponse.json({
          success: true,
          message: 'Space settings updated',
          space
        });

      default:
        return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

  } catch (error) {
    logger.error('Update space error', { error: error, endpoint: '/api/spaces/activate' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update space", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}