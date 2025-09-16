import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth/auth';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

const GetSpaceToolsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  category: z.enum(['productivity', 'academic', 'social', 'utility', 'entertainment', 'other']).optional(),
  status: z.enum(['active', 'inactive', 'all']).default('active'),
  sortBy: z.enum(['deployments', 'rating', 'recent', 'alphabetical']).default('deployments') });

const CreateSpaceToolSchema = z.object({
  toolId: z.string().min(1),
  configuration: z.record(z.any()).optional(),
  isShared: z.boolean().default(true),
  permissions: z.object({
    canEdit: z.array(z.string()).default([]),
    canView: z.array(z.string()).default([]),
    isPublic: z.boolean().default(true),
  }).optional() });

const db = dbAdmin;

// GET /api/spaces/[spaceId]/tools - Get tools deployed in a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const { limit, offset, category, status, sortBy } = GetSpaceToolsSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get space tools (deployments in this space)
    let deploymentQuery = db
      .collection('deployments')
      .where('spaceId', '==', spaceId);

    if (status !== 'all') {
      deploymentQuery = deploymentQuery.where('status', '==', status);
    }

    const deploymentSnapshot = await deploymentQuery.get();
    const tools = [];

    // Process each deployment
    for (const deploymentDoc of deploymentSnapshot.docs) {
      const deploymentData = deploymentDoc.data();
      
      // Get the tool details
      const toolDoc = await dbAdmin.collection('tools').doc(deploymentData.toolId).get();
      if (!toolDoc.exists) continue;
      
      const toolData = toolDoc.data();
      if (!toolData) continue;
      
      // Apply category filter
      if (category && toolData.category !== category) continue;

      // Get deployer info
      let deployer = null;
      if (deploymentData.userId) {
        try {
          const deployerDoc = await dbAdmin.collection('users').doc(deploymentData.userId).get();
          if (deployerDoc.exists) {
            const deployerData = deployerDoc.data();
            deployer = {
              id: deployerDoc.id,
              name: deployerData?.fullName || 'Unknown',
              avatar: deployerData?.photoURL || null,
            };
          }
        } catch (error) {
          logger.warn('Failed to fetch deployer info', { data: error, endpoint: '/api/spaces/[spaceId]/tools' });
        }
      }

      // Get usage stats for this deployment
      let usageStats = null;
      try {
        const usageSnapshot = await db
          .collection('deployments')
          .doc(deploymentDoc.id)
          .collection('usage')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();
        
        if (!usageSnapshot.empty) {
          usageStats = usageSnapshot.docs[0].data();
        }
      } catch (error) {
        logger.warn('Failed to fetch usage stats', { data: error, endpoint: '/api/spaces/[spaceId]/tools' });
      }

      tools.push({
        deploymentId: deploymentDoc.id,
        toolId: toolData.id || deploymentData.toolId,
        name: toolData.name,
        description: toolData.description,
        category: toolData.category,
        version: deploymentData.version || '1.0.0',
        status: deploymentData.status,
        configuration: deploymentData.configuration || {},
        permissions: deploymentData.permissions || {
          canEdit: [],
          canView: [],
          isPublic: true,
        },
        isShared: deploymentData.isShared || true,
        deployer,
        deployedAt: deploymentData.deployedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastUsed: usageStats?.timestamp?.toDate?.()?.toISOString() || null,
        usageCount: usageStats?.totalUsage || 0,
        // Tool metadata
        originalTool: {
          averageRating: toolData.averageRating || 0,
          ratingCount: toolData.ratingCount || 0,
          totalDeployments: toolData.deploymentCount || 0,
          isVerified: toolData.isVerified || false,
          creatorId: toolData.creatorId,
        }
      });
    }

    // Sort results
    tools.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.originalTool.averageRating - a.originalTool.averageRating;
        case 'recent':
          return new Date(b.deployedAt).getTime() - new Date(a.deployedAt).getTime();
        case 'alphabetical':
          return (a.name || '').localeCompare(b.name || '');
        case 'deployments':
        default:
          return b.originalTool.totalDeployments - a.originalTool.totalDeployments;
      }
    });

    // Apply pagination
    const paginatedTools = tools.slice(offset, offset + limit);

    return NextResponse.json({
      tools: paginatedTools,
      total: tools.length,
      hasMore: tools.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: tools.length > offset + limit ? offset + limit : null,
      } });

  } catch (error) {
    logger.error('Error fetching space tools', { error: error, endpoint: '/api/spaces/[spaceId]/tools' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch space tools", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/tools - Deploy a tool to a space
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const validatedData = CreateSpaceToolSchema.parse(body);
    const { toolId, configuration, isShared, permissions } = validatedData;

    // Verify the tool exists
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();

    // Check if tool is already deployed in this space
    const existingDeploymentSnapshot = await db
      .collection('deployments')
      .where('toolId', '==', toolId)
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active')
      .get();

    if (!existingDeploymentSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool is already deployed in this space", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Create deployment
    const deploymentData = {
      toolId,
      spaceId,
      userId: decodedToken.uid,
      status: 'active',
      version: toolData?.version || '1.0.0',
      configuration: configuration || {},
      isShared: isShared ?? true,
      permissions: permissions || {
        canEdit: [],
        canView: [],
        isPublic: true,
      },
      deployedAt: new Date(),
      lastUsed: null,
    };

    const deploymentRef = await dbAdmin.collection('deployments').add(deploymentData);

    // Update tool deployment count
    try {
      await dbAdmin.collection('tools').doc(toolId).update({
        deploymentCount: (toolData?.deploymentCount || 0) + 1,
        lastDeployedAt: new Date() });
    } catch (error) {
      logger.warn('Failed to update tool deployment count', { data: error, endpoint: '/api/spaces/[spaceId]/tools' });
    }

    // Get deployer info
    const deployerDoc = await dbAdmin.collection('users').doc(decodedToken.uid).get();
    const deployerData = deployerDoc.data();

    const deployment = {
      deploymentId: deploymentRef.id,
      toolId,
      name: toolData?.name || 'Unknown Tool',
      description: toolData?.description || '',
      category: toolData?.category || 'other',
      version: deploymentData.version,
      status: deploymentData.status,
      configuration: deploymentData.configuration,
      permissions: deploymentData.permissions,
      isShared: deploymentData.isShared,
      deployer: {
        id: decodedToken.uid,
        name: deployerData?.fullName || 'Unknown User',
        avatar: deployerData?.photoURL || null,
      },
      deployedAt: deploymentData.deployedAt.toISOString(),
      lastUsed: null,
      usageCount: 0,
      originalTool: {
        averageRating: toolData?.averageRating || 0,
        ratingCount: toolData?.ratingCount || 0,
        totalDeployments: (toolData?.deploymentCount || 0) + 1,
        isVerified: toolData?.isVerified || false,
        creatorId: toolData?.creatorId,
      }
    };

    return NextResponse.json({ deployment }, { status: HttpStatus.CREATED });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid deployment data',
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error deploying tool to space', { error: error, endpoint: '/api/spaces/[spaceId]/tools' });
    return NextResponse.json(ApiResponseHelper.error("Failed to deploy tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}