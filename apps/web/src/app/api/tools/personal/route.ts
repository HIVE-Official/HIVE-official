import { z } from 'zod';
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

// Schema for tool installation requests
const ToolActionSchema = z.object({
  toolId: z.string().min(1, "toolId is required"),
  action: z.enum(['install', 'uninstall'])
});

// Personal tool interface matching the component expectations
interface PersonalTool {
  id: string;
  name: string;
  icon: string;
  category: 'productivity' | 'study' | 'organization' | 'communication' | 'other';
  isInstalled: boolean;
  lastUsed?: string;
  usageCount: number;
  quickLaunch: boolean;
}

// Fetch user's actual personal tools from database
async function fetchPersonalTools(userId: string): Promise<PersonalTool[]> {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');

    // Get user's installed tools
    const userToolsSnapshot = await dbAdmin
      .collection('user_tools')
      .where('userId', '==', userId)
      .where('isInstalled', '==', true)
      .get();

    const tools: PersonalTool[] = userToolsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || data.toolName || 'Unknown Tool',
        icon: data.icon || '🛠️',
        category: data.category || 'other',
        isInstalled: true,
        lastUsed: data.lastUsed,
        usageCount: data.usageCount || 0,
        quickLaunch: data.quickLaunch || false,
      };
    });

    return tools;
  } catch (error) {
    console.error('Failed to fetch personal tools:', error);
    return [];
  }
}

/**
 * Get personal tools for the authenticated user
 * GET /api/tools/personal
 */
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const userId = getUserId(request);
  const tools = await fetchPersonalTools(userId);

  return respond.success({
    tools,
    totalCount: tools.length,
    installedCount: tools.filter(t => t.isInstalled).length,
    userId,
    message: 'Personal tools retrieved successfully'
  });
});

/**
 * Install or uninstall a tool
 * POST /api/tools/personal
 */
export const POST = withAuthValidationAndErrors(
  ToolActionSchema,
  async (
    request: AuthenticatedRequest,
    context,
    { toolId, action },
    respond
  ) => {
    const userId = getUserId(request);

    // Implement actual tool installation/uninstallation in database
    try {
      const { dbAdmin } = await import('@/lib/firebase-admin');
      
      if (action === 'install') {
        // Get tool details from marketplace or create basic entry
        const toolRef = dbAdmin.collection('user_tools').doc();
        await toolRef.set({
          userId: userId,
          toolId,
          isInstalled: true,
          installedAt: new Date().toISOString(),
          lastUsed: null,
          usageCount: 0,
          quickLaunch: false,
          settings: {}
        });
      } else if (action === 'uninstall') {
        // Remove tool from user's collection
        const userToolsSnapshot = await dbAdmin
          .collection('user_tools')
          .where('userId', '==', userId)
          .where('toolId', '==', toolId)
          .get();
        
        const batch = dbAdmin.batch();
        userToolsSnapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    } catch (error) {
      console.error('Failed to process tool installation:', error);
      return respond.error(
        'Database operation failed',
        "INTERNAL_ERROR",
        500,
        { details: error instanceof Error ? error.message : 'Unknown error' }
      );
    }

    return respond.success({
      toolId,
      action,
      userId,
      message: `Tool ${action}ed successfully`
    });

  }
);