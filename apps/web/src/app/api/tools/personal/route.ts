import { NextRequest, NextResponse } from 'next/server';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

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
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const tools = await fetchPersonalTools(authContext.userId);
    
    return NextResponse.json({
      success: true,
      tools,
      totalCount: tools.length,
      installedCount: tools.filter(t => t.isInstalled).length,
      userId: authContext.userId,
      message: 'Personal tools retrieved successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch personal tools',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Personal tools is non-sensitive for now
  operation: 'fetch_personal_tools' 
});

/**
 * Install or uninstall a tool
 * POST /api/tools/personal
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const body = await request.json();
    const { toolId, action } = body;

    if (!toolId || !action || !['install', 'uninstall'].includes(action)) {
      return ApiResponse.error("Invalid request. Must specify toolId and action (install/uninstall)", "INVALID_INPUT", 400);
    }

    // Implement actual tool installation/uninstallation in database
    try {
      const { dbAdmin } = await import('@/lib/firebase-admin');
      
      if (action === 'install') {
        // Get tool details from marketplace or create basic entry
        const toolRef = dbAdmin.collection('user_tools').doc();
        await toolRef.set({
          userId: authContext.userId,
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
          .where('userId', '==', authContext.userId)
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
      return NextResponse.json(
        { 
          error: 'Database operation failed',
          details: error instanceof Error ? error.message : 'Unknown error'
        }, 
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json({
      success: true,
      toolId,
      action,
      userId: authContext.userId,
      message: `Tool ${action}ed successfully`
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to process tool installation',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Tool installation is non-sensitive for now
  operation: 'modify_personal_tools' 
});