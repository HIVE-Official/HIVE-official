// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { getPlacementFromDeploymentDoc } from '@/lib/tool-placement';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import {
  withAuthValidationAndErrors,
  withAuthAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { z } from "zod";

// Feed content generation interface
interface FeedContentTemplate {
  id: string;
  toolId: string;
  triggerEvent: string;
  template: {
    type: 'post' | 'update' | 'achievement' | 'announcement';
    contentTemplate: string;
    titleTemplate?: string;
    visibility: 'public' | 'space_members' | 'private';
    includeData: boolean;
    includeMedia: boolean;
  };
  conditions?: {
    minValue?: number;
    maxValue?: number;
    requiredFields?: string[];
    userRole?: string[];
  };
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

// POST - Generate feed content from tool interaction
const FeedIntegrationSchema = z.object({
  deploymentId: z.string(),
  toolId: z.string(),
  action: z.string(),
  data: z.any().optional(),
  elementId: z.string().optional(),
  generateContent: z.boolean().optional(),
});

export const POST = withAuthValidationAndErrors(
  FeedIntegrationSchema,
  async (
    request: AuthenticatedRequest,
    _context,
    body,
    respond
  ) => {
    try {
      const userId = getUserId(request);
      const { deploymentId, toolId, action, data, elementId, generateContent = true } = body;

    // Get deployment details
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
        return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
        return respond.error("Deployment data not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }
    if (deployment?.campusId && deployment.campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }

    const placementContext = await getPlacementFromDeploymentDoc(deploymentDoc);
    const placementData = placementContext?.snapshot?.data();
    const targetType = placementData?.targetType || deployment.deployedTo;
    const targetId = placementData?.targetId || deployment.targetId;
    const collectAnalytics = placementData?.settings?.collectAnalytics ?? deployment.settings?.collectAnalytics;

    // Only generate content for space deployments with analytics enabled
    if (targetType !== 'space' || !collectAnalytics) {
      return respond.success({ 
        generated: false, 
        reason: 'Content generation disabled for this deployment' 
      });
    }

    // Get tool details
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
        return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const tool = toolDoc.data();
    if (!tool) {
        return respond.error("Tool data not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }
    if (tool?.campusId && tool.campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }

    if (!generateContent) {
      return respond.success({ generated: false, reason: 'Content generation disabled' });
    }

    // Generate feed content based on action
    const feedContent = await generateFeedContentFromAction({
      deployment: { ...deployment, targetId },
      tool,
        user: { uid: userId },
      action,
      data,
      elementId
    });

    if (!feedContent) {
      return respond.success({ 
        generated: false, 
        reason: 'No content template matched this action' 
      });
    }

    // Create the feed post
    const postId = await createFeedPost({ ...deployment, targetId }, tool, userId, feedContent);

      return respond.success({
      generated: true,
      postId,
      content: feedContent,
      spaceId: targetId
    });
  } catch (error) {
    logger.error(
      `Error generating feed content at /api/tools/feed-integration`,
      error instanceof Error ? error : new Error(String(error))
    );
      return respond.error("Failed to generate feed content", "INTERNAL_ERROR", { status: 500 });
  }
  }
);

// GET - Get feed content templates for a tool
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond
) => {
  try {
    const userId = getUserId(request);

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    const isActive = searchParams.get('isActive');

    if (!toolId) {
      return respond.error("Tool ID is required", "INVALID_INPUT", { status: 400 });
    }

    // Check if user can view this tool
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const tool = toolDoc.data();
    if (!tool) {
      return respond.error("Tool data not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }
    if (tool.ownerId !== userId && tool.status !== 'published') {
      return respond.error("Access denied", "FORBIDDEN", { status: 403 });
    }

    // Get feed content templates
    let templatesQuery = dbAdmin
      .collection('feedContentTemplates')
      .where('toolId', '==', toolId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .orderBy('createdAt', 'desc');

    if (isActive !== null) {
      templatesQuery = templatesQuery.where('isActive', '==', isActive === 'true');
    }

    const templatesSnapshot = await templatesQuery.get();
    const templates = templatesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return respond.success({
      templates,
      count: templates.length
    });
  } catch (error) {
    logger.error(
      `Error fetching feed templates at /api/tools/feed-integration`,
      error instanceof Error ? error : new Error(String(error))
    );
    return respond.error("Failed to fetch feed templates", "INTERNAL_ERROR", { status: 500 });
  }
});

// Helper function to generate feed content from tool action
async function generateFeedContentFromAction(params: {
  deployment: any;
  tool: any;
  user: { uid: string };
  action: string;
  data: any;
  elementId?: string;
}): Promise<any> {
  const { deployment, tool, user, action, data, elementId } = params;

  try {
    // Get feed content templates for this tool
    const templatesSnapshot = await dbAdmin
      .collection('feedContentTemplates')
      .where('toolId', '==', tool.id || deployment.toolId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .where('triggerEvent', '==', action)
      .where('isActive', '==', true)
      .get();
    
    if (templatesSnapshot.empty) {
      // Use default content generation
      return generateDefaultContent(tool, action, data, elementId);
    }

    // Use the first matching template
    const template = templatesSnapshot.docs[0].data();
    
    // Check conditions
    if (template.conditions && !checkConditions(template.conditions, data, user)) {
      return null;
    }

    return generateContentFromTemplate(template, tool, data, user);
  } catch (error) {
    logger.error(
      `Error generating content from action at /api/tools/feed-integration`,
      error instanceof Error ? error : new Error(String(error))
    );
    return generateDefaultContent(tool, action, data, elementId);
  }
}

// Helper function to generate default content
function generateDefaultContent(tool: any, action: string, data: any, elementId?: string): any {
  const toolName = tool.name || 'Tool';
  
  switch (action) {
    case 'submit_form':
      return {
        type: 'post',
        title: `${toolName} Submission`,
        content: `Made a submission using ${toolName}`,
        visibility: 'space_members',
        metadata: {
          action,
          toolId: tool.id,
          elementId,
          hasData: !!data
        }
      };
    
    case 'stop_timer': {
      const minutes = Math.round((data.sessionTime || 0) / 1000 / 60);
      return {
        type: 'update',
        title: 'Timer Session Complete',
        content: `Completed a ${minutes} minute session with ${toolName}`,
        visibility: 'space_members',
        metadata: {
          action,
          toolId: tool.id,
          sessionTime: data.sessionTime,
          totalTime: data.totalTime
        }
      };
    }
    
    case 'submit_poll':
      return {
        type: 'update',
        title: 'Poll Vote',
        content: `Voted in ${toolName} poll`,
        visibility: 'space_members',
        metadata: {
          action,
          toolId: tool.id,
          choice: data.choice,
          totalVotes: data.totalVotes
        }
      };
    
    case 'update_counter':
      if (data.increment && Math.abs(data.increment) >= 5) {
        return {
          type: 'update',
          title: 'Counter Update',
          content: `Updated ${toolName} counter by ${data.increment}`,
          visibility: 'space_members',
          metadata: {
            action,
            toolId: tool.id,
            increment: data.increment,
            newValue: data.value
          }
        };
      }
      break;
    
    default:
      return {
        type: 'update',
        title: `${toolName} Activity`,
        content: `Used ${toolName}`,
        visibility: 'space_members',
        metadata: {
          action,
          toolId: tool.id,
          elementId
        }
      };
  }

  return null;
}

// Helper function to generate content from template
function generateContentFromTemplate(template: any, tool: any, data: any, user: any): any {
  const variables = {
    toolName: tool.name,
    userName: user.name || 'User',
    ...data
  };

  // Replace template variables
  const content = replaceTemplateVariables(template.template.contentTemplate, variables);
  const title = template.template.titleTemplate 
    ? replaceTemplateVariables(template.template.titleTemplate, variables)
    : undefined;

  return {
    type: template.template.type,
    title,
    content,
    visibility: template.template.visibility,
    includeData: template.template.includeData ? data : undefined,
    metadata: {
      templateId: template.id,
      toolId: tool.id,
      generatedFrom: 'template'
    }
  };
}

// Helper function to replace template variables
function replaceTemplateVariables(template: string, variables: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

// Helper function to check template conditions
function checkConditions(conditions: any, data: any, user: any): boolean {
  if (conditions.minValue !== undefined && (data.value || 0) < conditions.minValue) {
    return false;
  }

  if (conditions.maxValue !== undefined && (data.value || 0) > conditions.maxValue) {
    return false;
  }

  if (conditions.requiredFields) {
    for (const field of conditions.requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        return false;
      }
    }
  }

  // User role conditions would require additional space membership lookup
  // Simplified for now
  
  return true;
}

// Helper function to create feed post
async function createFeedPost(deployment: any, tool: any, userId: string, content: any): Promise<string> {
  const now = new Date().toISOString();
  
  const post = {
    authorId: userId,
    spaceId: deployment.targetId,
    campusId: CURRENT_CAMPUS_ID,
    type: 'tool_generated',
    subType: content.type,
    toolId: deployment.toolId,
    deploymentId: deployment.id,
    title: content.title,
    content: content.content,
    visibility: content.visibility || 'space_members',
    metadata: {
      ...content.metadata,
      generatedBy: 'tool_interaction',
      surface: deployment.surface,
      includeData: content.includeData || false
    },
    data: content.includeData ? content.data : undefined,
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    },
    status: 'published',
    createdAt: now,
    updatedAt: now
  };

  const postRef = await dbAdmin.collection('posts').add(post);
  
  // Update space activity
  const spaceDoc = await dbAdmin.collection('spaces').doc(deployment.targetId).get();
  if (spaceDoc.exists) {
    const spaceData = spaceDoc.data();
    if (!spaceData) return postRef.id;
    await dbAdmin.collection('spaces').doc(deployment.targetId).update({
      lastActivity: now,
      postCount: (spaceData.postCount || 0) + 1,
      'activity.toolGenerated': (spaceData.activity?.toolGenerated || 0) + 1
    });
  }

  return postRef.id;
}
