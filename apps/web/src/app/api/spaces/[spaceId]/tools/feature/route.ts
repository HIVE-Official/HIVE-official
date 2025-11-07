import { z } from 'zod';
import * as admin from 'firebase-admin';
import { dbAdmin } from '@/lib/firebase-admin';
import { withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';
import { HttpStatus } from '@/lib/api-response-types';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { requireSpaceMembership } from '@/lib/space-security';
import { logger } from '@/lib/logger';

const FeatureToolSchema = z.object({
  toolId: z.string().min(1)
});

// POST /api/spaces/[spaceId]/tools/feature - Feature a tool in a space (server-side)
export const POST = withAuthValidationAndErrors(
  FeatureToolSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    { toolId }: z.infer<typeof FeatureToolSchema>,
    respond
  ) => {
    const { spaceId } = await params;
    const userId = getUserId(request);

    // Validate space membership and permissions
    const membership = await requireSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code = membership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
      return respond.error(membership.error, code, { status: membership.status });
    }

    const role = membership.membership.role;
    const canFeature = ['owner', 'admin', 'builder'].includes(role);
    if (!canFeature) {
      return respond.error('Insufficient permissions to feature tools', 'FORBIDDEN', { status: HttpStatus.FORBIDDEN });
    }

    // Validate tool exists
    const toolRef = dbAdmin.collection('tools').doc(toolId);
    const toolSnap = await toolRef.get();
    if (!toolSnap.exists) {
      return respond.error('Tool not found', 'RESOURCE_NOT_FOUND', { status: HttpStatus.NOT_FOUND });
    }
    const toolData = toolSnap.data() || {};
    if (toolData.campusId && toolData.campusId !== CURRENT_CAMPUS_ID) {
      return respond.error('Access denied for this campus', 'FORBIDDEN', { status: HttpStatus.FORBIDDEN });
    }

    // Ensure active deployment exists for this space
    const existingDeployments = await dbAdmin
      .collection('deployments')
      .where('toolId', '==', toolId)
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    let deploymentId: string;
    if (existingDeployments.empty) {
      const deployment = {
        toolId,
        spaceId,
        userId,
        status: 'active',
        version: toolData.version || '1.0.0',
        configuration: {},
        isShared: true,
        permissions: { canEdit: [], canView: [], isPublic: true },
        deployedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastUsed: null,
        isFeatured: true,
        campusId: CURRENT_CAMPUS_ID,
      };
      const ref = await dbAdmin.collection('deployments').add(deployment);
      deploymentId = ref.id;
    } else {
      deploymentId = existingDeployments.docs[0].id;
      await existingDeployments.docs[0].ref.set({ isFeatured: true }, { merge: true });
    }

    // Update space featured tools metadata
    await dbAdmin.collection('spaces').doc(spaceId).set(
      {
        featuredTools: admin.firestore.FieldValue.arrayUnion({
          toolId,
          deploymentId,
          featuredAt: admin.firestore.FieldValue.serverTimestamp(),
          featuredBy: userId,
        }),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    logger.info('Tool featured via API', { spaceId, toolId, userId, deploymentId });

    return respond.success({
      message: 'Tool featured successfully',
      deploymentId,
      toolId,
      spaceId,
    });
  }
);
