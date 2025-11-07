// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { getPlacementFromDeploymentDoc } from '@/lib/tool-placement';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { z } from "zod";

// Deployment data interface
interface DeploymentData {
  id: string;
  status?: string;
  toolId?: string;
  deployedTo?: 'profile' | 'space';
  targetId?: string;
  surface?: string;
  permissions?: {
    canInteract?: boolean;
    allowedRoles?: string[];
  };
  settings?: {
    collectAnalytics?: boolean;
    [key: string]: unknown;
  };
  usageCount?: number;
  [key: string]: unknown;
}

// Tool data interface
interface ToolData {
  id?: string;
  elements?: ToolElement[];
  useCount?: number;
  [key: string]: unknown;
}

// Tool element interface
interface ToolElement {
  id: string;
  type: string;
  config?: Record<string, unknown>;
  actions?: ToolAction[];
  [key: string]: unknown;
}

// Tool action interface
interface ToolAction {
  id: string;
  type: string;
  handler?: string;
  config?: Record<string, unknown>;
  [key: string]: unknown;
}

// Tool execution request interface
interface ToolExecutionRequest {
  deploymentId: string;
  action: string;
  elementId?: string;
  data?: Record<string, unknown>;
  context?: Record<string, unknown>;
}

// Tool execution result interface
interface ToolExecutionResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  feedContent?: {
    type: 'post' | 'update' | 'achievement';
    content: string;
    metadata?: Record<string, unknown>;
  };
  state?: Record<string, unknown>;
  notifications?: Array<{
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    recipients?: string[];
  }>;
}

const ToolExecutionSchema = z.object({
  deploymentId: z.string(),
  action: z.string(),
  elementId: z.string().optional(),
  data: z.record(z.any()).optional(),
  context: z.record(z.any()).optional(),
});

// POST - Execute tool action
export const POST = withAuthValidationAndErrors(
  ToolExecutionSchema,
  async (
    request: AuthenticatedRequest,
    _context,
    body,
    respond
  ) => {
    try {
      const userId = getUserId(request);
      const { deploymentId, action, elementId, data, context } = body;

    // Get deployment details
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
        return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const deployment = { id: deploymentDoc.id, ...deploymentDoc.data() } as DeploymentData;
    // Enforce campus isolation
    if ((deployment as any)?.campusId && (deployment as any).campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }
    const placementContext = await getPlacementFromDeploymentDoc(deploymentDoc);
    const placementData = placementContext?.snapshot?.data() as (Record<string, any> | undefined);

    // Check if deployment is active
    const deploymentStatus = placementData?.status || deployment.status;
    if (deploymentStatus !== 'active') {
        return respond.error("Tool deployment is not active", "FORBIDDEN", { status: 403 });
    }

    // Check user permissions
    if (!await canUserExecuteTool(userId, deployment, placementData)) {
        return respond.error("Insufficient permissions", "FORBIDDEN", { status: 403 });
    }

    // Get tool details
    if (!deployment.toolId) {
        return respond.error("Invalid deployment: missing toolId", "INVALID_DATA", { status: 400 });
    }
    const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
    if (!toolDoc.exists) {
        return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const tool = toolDoc.data() as ToolData;
    if ((tool as any)?.campusId && (tool as any).campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }
    if (!tool) {
        return respond.error("Tool data not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    // Execute tool action
    const executionResult = await executeToolAction({
      deployment,
      tool,
        user: { uid: userId },
      action,
      elementId,
      data: data || {},
        context: context || {},
        placementContext
    });

    // Update deployment usage stats
    const nowIso = new Date().toISOString();
    await dbAdmin.collection('deployedTools').doc(deploymentId).update({
      usageCount: (deployment.usageCount || 0) + 1,
      lastUsed: nowIso
    });

    if (placementContext) {
      await placementContext.ref.update({
        usageCount: admin.firestore.FieldValue.increment(1),
        lastUsedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Update tool usage stats
    await dbAdmin.collection('tools').doc(deployment.toolId).update({
      useCount: (tool.useCount || 0) + 1,
      lastUsedAt: nowIso
    });

    // Log activity event
    await dbAdmin.collection('activityEvents').add({
        userId,
      type: 'tool_interaction',
      toolId: deployment.toolId,
      spaceId: deployment.deployedTo === 'space' ? deployment.targetId : undefined,
      duration: context?.duration || undefined,
      metadata: {
        action,
        elementId,
        deploymentId,
        success: executionResult.success,
        surface: deployment.surface
      },
      timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        campusId: CURRENT_CAMPUS_ID,
    });

    // Generate feed content if requested and successful
    if (executionResult.success && executionResult.feedContent) {
      await generateFeedContent(deployment, tool, userId, executionResult.feedContent);
    }

    // Send notifications if any
    if (executionResult.notifications) {
      await processNotifications(deployment, executionResult.notifications);
    }

      return respond.success({
      result: executionResult,
      deploymentId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error executing tool at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
      return respond.error("Failed to execute tool", "INTERNAL_ERROR", { status: 500 });
  }
  }
);

// Helper function to check tool execution permissions
async function canUserExecuteTool(
  userId: string,
  deployment: DeploymentData,
  placement?: Record<string, any>
): Promise<boolean> {
  try {
    const permissionConfig = placement?.permissions || deployment.permissions;
    if (permissionConfig?.canInteract === false) {
      return false;
    }

    const targetType = placement?.targetType || deployment.deployedTo;
    const targetId = placement?.targetId || deployment.targetId;

    if (targetType === 'profile') {
      return targetId === userId;
    }

    if (targetType === 'space') {
      const membershipQuery = dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', targetId)
        .where('status', '==', 'active')
        .where('campusId', '==', CURRENT_CAMPUS_ID);
      const membershipSnapshot = await membershipQuery.get();

      if (membershipSnapshot.empty) {
        return false;
      }

      const memberData = membershipSnapshot.docs[0].data() as { role: string; [key: string]: unknown };
      const allowedRoles = permissionConfig?.allowedRoles || deployment.permissions?.allowedRoles;
      return allowedRoles?.includes(memberData.role) || false;
    }

    return false;
  } catch (error) {
    logger.error(
      `Error checking tool execution permissions at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
    return false;
  }
}

// Helper function to execute tool action
async function executeToolAction(params: {
  deployment: DeploymentData;
  tool: ToolData;
  user: { uid: string };
  action: string;
  elementId?: string;
  data: Record<string, unknown>;
  context: Record<string, unknown>;
  placementContext?: Awaited<ReturnType<typeof getPlacementFromDeploymentDoc>> | null;
}): Promise<ToolExecutionResult> {
  const { deployment, tool, user, action, elementId, data, placementContext } = params;

  try {
    // Get or create tool state
    const stateId = `${deployment.id}_${user.uid}`;
    let currentState: Record<string, unknown> = {};

    let placementStateRef: admin.firestore.DocumentReference<admin.firestore.DocumentData> | null = null;
    if (placementContext) {
      placementStateRef = placementContext.ref.collection('state').doc(user.uid);
      const stateSnapshot = await placementStateRef.get();
      if (stateSnapshot.exists) {
        currentState = (stateSnapshot.data()?.state as Record<string, unknown>) || {};
      }
    } else {
      const stateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
      currentState = stateDoc.exists ? (stateDoc.data() as { state?: Record<string, unknown> })?.state || {} : {};
    }

    // Find the target element if elementId is provided
    let targetElement = null;
    if (elementId) {
      targetElement = tool.elements?.find((el: ToolElement) => el.id === elementId) || null;
      if (!targetElement) {
        return {
          success: false,
          error: `Element ${elementId} not found in tool`
        };
      }
    }

    // Execute action based on type
    let result: ToolExecutionResult;
    
    switch (action) {
      case 'initialize':
        result = await initializeTool(tool, deployment, currentState);
        break;
      
      case 'submit_form':
        result = await handleFormSubmission(tool, targetElement, data, currentState);
        break;
      
      case 'update_counter':
        result = await handleCounterUpdate(targetElement, data, currentState);
        break;
      
      case 'start_timer':
        result = await handleTimerStart(targetElement, data, currentState);
        break;
      
      case 'stop_timer':
        result = await handleTimerStop(targetElement, data, currentState);
        break;
      
      case 'submit_poll':
        result = await handlePollSubmission(tool, targetElement, data, currentState, user.uid);
        break;
      
      case 'save_data':
        result = await handleDataSave(tool, data, currentState);
        break;
      
      default:
        result = {
          success: false,
          error: `Unknown action: ${action}`
        };
    }

    // Save updated state if action was successful
    if (result.success && result.state) {
      const statePayload = {
        deploymentId: deployment.id,
        toolId: tool.id || deployment.toolId,
        userId: user.uid,
        state: result.state,
        updatedAt: new Date().toISOString(),
        campusId: CURRENT_CAMPUS_ID,
      };

      if (placementStateRef) {
        await placementStateRef.set(statePayload, { merge: true });
      }

      await dbAdmin.collection('toolStates').doc(stateId).set(statePayload);
    }

    if (result.success && placementContext && action.startsWith('submit')) {
      const submissionRecord = {
        userId: user.uid,
        actionName: action,
        elementId: elementId || null,
        payload: data || {},
        response: result.data || {},
        metadata: {},
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await placementContext.ref
        .collection('responses')
        .doc(user.uid)
        .set(submissionRecord, { merge: true });

      await placementContext.ref.set(
        {
          responseCount: admin.firestore.FieldValue.increment(1),
          lastResponseAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    return result;
  } catch (error) {
    logger.error(
      `Error in tool execution at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
    return {
      success: false,
      error: 'Tool execution failed'
    };
  }
}

// Tool action handlers
async function initializeTool(tool: ToolData, deployment: DeploymentData, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  const initialState = { ...currentState };
  
  // Initialize state for each element
  tool.elements?.forEach((element: ToolElement) => {
    if (!initialState[element.id]) {
      switch (element.type) {
        case 'counter':
          initialState[element.id] = { value: element.config?.initialValue || 0 };
          break;
        case 'timer':
          initialState[element.id] = { 
            startTime: null, 
            elapsed: 0, 
            isRunning: false 
          };
          break;
        case 'poll':
          initialState[element.id] = { 
            responses: {},
            totalVotes: 0
          };
          break;
        case 'progressBar':
          initialState[element.id] = { 
            value: element.config?.value || 0,
            max: element.config?.max || 100
          };
          break;
        case 'countdownTimer':
          initialState[element.id] = { 
            targetDate: element.config?.targetDate,
            isComplete: false
          };
          break;
        default:
          initialState[element.id] = {};
      }
    }
  });

  return {
    success: true,
    state: initialState,
    data: { initialized: true }
  };
}

async function handleFormSubmission(tool: ToolData, element: ToolElement | null, data: Record<string, unknown>, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  const newState = { ...currentState };
  
  if (element) {
    const currentElementState = (newState[element.id] as Record<string, unknown>) || {};
    newState[element.id] = {
      ...currentElementState,
      lastSubmission: data,
      submissionCount: ((currentElementState.submissionCount as number) || 0) + 1,
      lastSubmittedAt: new Date().toISOString()
    };
  }

  // Generate feed content for form submissions
  const feedContent = {
    type: 'post' as const,
    content: `Used ${tool.name} tool`,
    metadata: {
      toolId: tool.id,
      formData: data,
      submissionTime: new Date().toISOString()
    }
  };

  return {
    success: true,
    state: newState,
    data: { submitted: true, formData: data },
    feedContent
  };
}

async function handleCounterUpdate(element: ToolElement | null, data: Record<string, unknown>, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  if (!element || element.type !== 'counter') {
    return { success: false, error: 'Invalid counter element' };
  }

  const newState = { ...currentState };
  const currentElementState = (newState[element.id] as Record<string, unknown>) || {};
  const currentValue = (currentElementState.value as number) || 0;
  const increment = (data.increment as number) || 1;
  const newValue = currentValue + increment;

  newState[element.id] = {
    ...currentElementState,
    value: newValue,
    lastUpdated: new Date().toISOString()
  };

  return {
    success: true,
    state: newState,
    data: { value: newValue, increment }
  };
}

async function handleTimerStart(element: ToolElement | null, data: Record<string, unknown>, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  if (!element || element.type !== 'timer') {
    return { success: false, error: 'Invalid timer element' };
  }

  const newState = { ...currentState };
  const currentElementState = (newState[element.id] as Record<string, unknown>) || {};
  const startTime = new Date().toISOString();
  
  newState[element.id] = {
    ...currentElementState,
    startTime,
    isRunning: true,
    elapsed: (currentElementState.elapsed as number) || 0
  };

  return {
    success: true,
    state: newState,
    data: { started: true, startTime }
  };
}

async function handleTimerStop(element: ToolElement | null, data: Record<string, unknown>, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  if (!element || element.type !== 'timer') {
    return { success: false, error: 'Invalid timer element' };
  }

  const newState = { ...currentState };
  const timerState = (newState[element.id] as Record<string, unknown>) || {};
  
  if (!(timerState.isRunning as boolean)) {
    return { success: false, error: 'Timer is not running' };
  }

  const startTime = new Date(timerState.startTime as string).getTime();
  const sessionElapsed = Date.now() - startTime;
  newState[element.id] = {
    ...timerState,
    isRunning: false,
    elapsed: (timerState.elapsed as number || 0) + sessionElapsed,
    lastSession: sessionElapsed
  };

  const totalTime = (timerState.elapsed as number || 0) + sessionElapsed;
  
  return {
    success: true,
    state: newState,
    data: { 
      stopped: true, 
      sessionTime: sessionElapsed, 
      totalTime 
    },
    feedContent: {
      type: 'update' as const,
      content: `Completed ${Math.round(sessionElapsed / 1000 / 60)} minute session`,
      metadata: { sessionTime: sessionElapsed, totalTime }
    }
  };
}

async function handlePollSubmission(tool: ToolData, element: ToolElement | null, data: Record<string, unknown>, currentState: Record<string, unknown>, userId: string): Promise<ToolExecutionResult> {
  if (!element || element.type !== 'poll') {
    return { success: false, error: 'Invalid poll element' };
  }

  const newState = { ...currentState };
  const currentPollState = (newState[element.id] as Record<string, unknown>) || {};
  const responses = (currentPollState.responses as Record<string, unknown>) || {};
  const totalVotes = (currentPollState.totalVotes as number) || 0;
  
  // Check if user already voted
  if (responses[userId]) {
    return { success: false, error: 'User has already voted' };
  }

  const updatedResponses = {
    ...responses,
    [userId]: {
      choice: data.choice,
      timestamp: new Date().toISOString()
    }
  };
  
  newState[element.id] = {
    ...currentPollState,
    responses: updatedResponses,
    totalVotes: totalVotes + 1
  };

  return {
    success: true,
    state: newState,
    data: { 
      voted: true, 
      choice: data.choice, 
      totalVotes: totalVotes + 1
    }
  };
}

async function handleDataSave(tool: ToolData, data: Record<string, unknown>, currentState: Record<string, unknown>): Promise<ToolExecutionResult> {
  const newState = { ...currentState, ...data };
  
  return {
    success: true,
    state: newState,
    data: { saved: true }
  };
}

// Helper function to generate feed content
async function generateFeedContent(deployment: DeploymentData, tool: ToolData, userId: string, feedContent: ToolExecutionResult['feedContent']) {
  try {
    if (deployment.deployedTo === 'space' && deployment.settings?.collectAnalytics && feedContent) {
      await dbAdmin.collection('posts').add({
        authorId: userId,
        spaceId: deployment.targetId,
        campusId: CURRENT_CAMPUS_ID,
        type: 'tool_generated',
        toolId: deployment.toolId,
        content: feedContent.content,
        metadata: {
          ...feedContent.metadata,
          deploymentId: deployment.id,
          generatedBy: 'tool_execution'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published',
        engagement: { likes: 0, comments: 0, shares: 0 }
      });
    }
  } catch (error) {
    logger.error(
      `Error generating feed content at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to process notifications
async function processNotifications(deployment: DeploymentData, notifications: ToolExecutionResult['notifications']) {
  try {
    if (!notifications) return;
    for (const notification of notifications) {
      await dbAdmin.collection('notifications').add({
        type: notification.type,
        message: notification.message,
        recipients: notification.recipients || [],
        deploymentId: deployment.id,
        toolId: deployment.toolId,
        spaceId: deployment.deployedTo === 'space' ? deployment.targetId : undefined,
        campusId: CURRENT_CAMPUS_ID,
        createdAt: new Date().toISOString(),
        read: false
      });
    }
  } catch (error) {
    logger.error(
      `Error processing notifications at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}
