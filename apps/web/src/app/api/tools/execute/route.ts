import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";

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
    [key: string]: any;
  };
  usageCount?: number;
  [key: string]: any;
}

// Tool data interface
interface ToolData {
  id?: string;
  elements?: ToolElement[];
  useCount?: number;
  [key: string]: any;
}

// Tool element interface
interface ToolElement {
  id: string;
  type: string;
  config?: Record<string, unknown>;
  actions?: ToolAction[];
  [key: string]: any;
}

// Tool action interface
interface ToolAction {
  id: string;
  type: string;
  handler?: string;
  config?: Record<string, unknown>;
  [key: string]: any;
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

// POST - Execute tool action
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { deploymentId, action, elementId, data, context } = body as ToolExecutionRequest;

    if (!deploymentId || !action) {
      return NextResponse.json(ApiResponseHelper.error("Missing required fields", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get deployment details
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = { id: deploymentDoc.id, ...deploymentDoc.data() } as DeploymentData;

    // Check if deployment is active
    if (deployment.status !== 'active') {
      return NextResponse.json(ApiResponseHelper.error("Tool deployment is not active", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Check user permissions
    if (!await canUserExecuteTool(user.id, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get tool details
    if (!deployment.toolId) {
      return NextResponse.json(ApiResponseHelper.error("Invalid deployment: missing toolId", "INVALID_DATA"), { status: HttpStatus.BAD_REQUEST });
    }
    const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const tool = toolDoc.data() as ToolData;
    if (!tool) {
      return NextResponse.json(ApiResponseHelper.error("Tool data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Execute tool action
    const executionResult = await executeToolAction({
      deployment,
      tool,
      user: { uid: user.id },
      action,
      elementId,
      data: data || {},
      context: context || {}
    });

    // Update deployment usage stats
    await dbAdmin.collection('deployedTools').doc(deploymentId).update({
      usageCount: (deployment.usageCount || 0) + 1,
      lastUsed: new Date().toISOString()
    });

    // Update tool usage stats
    await dbAdmin.collection('tools').doc(deployment.toolId).update({
      useCount: (tool.useCount || 0) + 1,
      lastUsedAt: new Date().toISOString()
    });

    // Log activity event
    await dbAdmin.collection('activityEvents').add({
      userId: user.id,
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
      date: new Date().toISOString().split('T')[0]
    });

    // Generate feed content if requested and successful
    if (executionResult.success && executionResult.feedContent) {
      await generateFeedContent(deployment, tool, user.id, executionResult.feedContent);
    }

    // Send notifications if any
    if (executionResult.notifications) {
      await processNotifications(deployment, executionResult.notifications);
    }

    return NextResponse.json({
      result: executionResult,
      deploymentId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error executing tool at /api/tools/execute`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to execute tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to check tool execution permissions
async function canUserExecuteTool(userId: string, deployment: DeploymentData): Promise<boolean> {
  try {
    // Check deployment permissions
    if (!deployment.permissions?.canInteract) {
      return false;
    }

    // Profile deployments - only owner can execute
    if (deployment.deployedTo === 'profile') {
      return deployment.targetId === userId;
    }

    // Space deployments - check membership and role
    if (deployment.deployedTo === 'space') {
      const membershipQuery = dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', deployment.targetId)
        .where('status', '==', 'active');
      const membershipSnapshot = await membershipQuery.get();
      
      if (membershipSnapshot.empty) {
        return false;
      }

      const memberData = membershipSnapshot.docs[0].data() as { role: string; [key: string]: any };
      return deployment.permissions?.allowedRoles?.includes(memberData.role) || false;
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
}): Promise<ToolExecutionResult> {
  const { deployment, tool, user, action, elementId, data } = params;

  try {
    // Get or create tool state
    const stateId = `${deployment.id}_${user.uid}`;
    const stateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
    const currentState = stateDoc.exists ? (stateDoc.data() as { state?: Record<string, unknown> })?.state || {} : {};

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
      await dbAdmin.collection('toolStates').doc(stateId).set({
        deploymentId: deployment.id,
        toolId: tool.id || deployment.toolId,
        userId: user.uid,
        state: result.state,
        updatedAt: new Date().toISOString()
      });
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