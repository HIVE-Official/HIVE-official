import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, addDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Tool execution request interface
interface ToolExecutionRequest {
  deploymentId: string;
  action: string;
  elementId?: string;
  data?: Record<string, any>;
  context?: Record<string, any>;
}

// Tool execution result interface
interface ToolExecutionResult {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  feedContent?: {
    type: 'post' | 'update' | 'achievement';
    content: string;
    metadata?: Record<string, any>;
  };
  state?: Record<string, any>;
  notifications?: Array<{
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    recipients?: string[];
  }>;
}

// POST - Execute tool action
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { deploymentId, action, elementId, data, context } = body as ToolExecutionRequest;

    if (!deploymentId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get deployment details
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = { id: deploymentDoc.id, ...deploymentDoc.data() };

    // Check if deployment is active
    if (deployment.status !== 'active') {
      return NextResponse.json({ error: 'Tool deployment is not active' }, { status: 403 });
    }

    // Check user permissions
    if (!await canUserExecuteTool(user.uid, deployment)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get tool details
    const toolDoc = await getDoc(doc(db, 'tools', deployment.toolId));
    if (!toolDoc.exists()) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    const tool = toolDoc.data();

    // Execute tool action
    const executionResult = await executeToolAction({
      deployment,
      tool,
      user: { uid: user.uid },
      action,
      elementId,
      data: data || {},
      context: context || {}
    });

    // Update deployment usage stats
    await updateDoc(doc(db, 'deployedTools', deploymentId), {
      usageCount: (deployment.usageCount || 0) + 1,
      lastUsed: new Date().toISOString()
    });

    // Update tool usage stats
    await updateDoc(doc(db, 'tools', deployment.toolId), {
      useCount: (tool.useCount || 0) + 1,
      lastUsedAt: new Date().toISOString()
    });

    // Log activity event
    await addDoc(collection(db, 'activityEvents'), {
      userId: user.uid,
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
      await generateFeedContent(deployment, tool, user.uid, executionResult.feedContent);
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
    console.error('Error executing tool:', error);
    return NextResponse.json({ error: 'Failed to execute tool' }, { status: 500 });
  }
}

// Helper function to check tool execution permissions
async function canUserExecuteTool(userId: string, deployment: any): Promise<boolean> {
  try {
    // Check deployment permissions
    if (!deployment.permissions.canInteract) {
      return false;
    }

    // Profile deployments - only owner can execute
    if (deployment.deployedTo === 'profile') {
      return deployment.targetId === userId;
    }

    // Space deployments - check membership and role
    if (deployment.deployedTo === 'space') {
      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('spaceId', '==', deployment.targetId),
        where('status', '==', 'active')
      );
      const membershipSnapshot = await getDocs(membershipQuery);
      
      if (membershipSnapshot.empty) {
        return false;
      }

      const memberData = membershipSnapshot.docs[0].data();
      return deployment.permissions.allowedRoles?.includes(memberData.role) || false;
    }

    return false;
  } catch (error) {
    console.error('Error checking tool execution permissions:', error);
    return false;
  }
}

// Helper function to execute tool action
async function executeToolAction(params: {
  deployment: any;
  tool: any;
  user: { uid: string };
  action: string;
  elementId?: string;
  data: Record<string, any>;
  context: Record<string, any>;
}): Promise<ToolExecutionResult> {
  const { deployment, tool, user, action, elementId, data, context } = params;

  try {
    // Get or create tool state
    const stateId = `${deployment.id}_${user.uid}`;
    const stateDoc = await getDoc(doc(db, 'toolStates', stateId));
    const currentState = stateDoc.exists() ? stateDoc.data()?.state || {} : {};

    // Find the target element if elementId is provided
    let targetElement = null;
    if (elementId) {
      targetElement = tool.elements.find((el: any) => el.id === elementId);
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
      await setDoc(doc(db, 'toolStates', stateId), {
        deploymentId: deployment.id,
        toolId: tool.id || deployment.toolId,
        userId: user.uid,
        state: result.state,
        updatedAt: new Date().toISOString()
      });
    }

    return result;
  } catch (error) {
    console.error('Error in tool execution:', error);
    return {
      success: false,
      error: 'Tool execution failed'
    };
  }
}

// Tool action handlers
async function initializeTool(tool: any, deployment: any, currentState: any): Promise<ToolExecutionResult> {
  const initialState = { ...currentState };
  
  // Initialize state for each element
  tool.elements.forEach((element: any) => {
    if (!initialState[element.id]) {
      switch (element.elementId) {
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

async function handleFormSubmission(tool: any, element: any, data: any, currentState: any): Promise<ToolExecutionResult> {
  const newState = { ...currentState };
  
  if (element) {
    newState[element.id] = {
      ...newState[element.id],
      lastSubmission: data,
      submissionCount: (newState[element.id]?.submissionCount || 0) + 1,
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

async function handleCounterUpdate(element: any, data: any, currentState: any): Promise<ToolExecutionResult> {
  if (!element || element.elementId !== 'counter') {
    return { success: false, error: 'Invalid counter element' };
  }

  const newState = { ...currentState };
  const currentValue = newState[element.id]?.value || 0;
  const increment = data.increment || 1;
  const newValue = currentValue + increment;

  newState[element.id] = {
    ...newState[element.id],
    value: newValue,
    lastUpdated: new Date().toISOString()
  };

  return {
    success: true,
    state: newState,
    data: { value: newValue, increment }
  };
}

async function handleTimerStart(element: any, data: any, currentState: any): Promise<ToolExecutionResult> {
  if (!element || element.elementId !== 'timer') {
    return { success: false, error: 'Invalid timer element' };
  }

  const newState = { ...currentState };
  newState[element.id] = {
    ...newState[element.id],
    startTime: new Date().toISOString(),
    isRunning: true,
    elapsed: newState[element.id]?.elapsed || 0
  };

  return {
    success: true,
    state: newState,
    data: { started: true, startTime: newState[element.id].startTime }
  };
}

async function handleTimerStop(element: any, data: any, currentState: any): Promise<ToolExecutionResult> {
  if (!element || element.elementId !== 'timer') {
    return { success: false, error: 'Invalid timer element' };
  }

  const newState = { ...currentState };
  const timerState = newState[element.id];
  
  if (!timerState?.isRunning) {
    return { success: false, error: 'Timer is not running' };
  }

  const elapsed = Date.now() - new Date(timerState.startTime).getTime();
  newState[element.id] = {
    ...timerState,
    isRunning: false,
    elapsed: timerState.elapsed + elapsed,
    lastSession: elapsed
  };

  return {
    success: true,
    state: newState,
    data: { 
      stopped: true, 
      sessionTime: elapsed, 
      totalTime: newState[element.id].elapsed 
    },
    feedContent: {
      type: 'update' as const,
      content: `Completed ${Math.round(elapsed / 1000 / 60)} minute session`,
      metadata: { sessionTime: elapsed, totalTime: newState[element.id].elapsed }
    }
  };
}

async function handlePollSubmission(tool: any, element: any, data: any, currentState: any, userId: string): Promise<ToolExecutionResult> {
  if (!element || element.elementId !== 'poll') {
    return { success: false, error: 'Invalid poll element' };
  }

  const newState = { ...currentState };
  const pollState = newState[element.id] || { responses: {}, totalVotes: 0 };
  
  // Check if user already voted
  if (pollState.responses[userId]) {
    return { success: false, error: 'User has already voted' };
  }

  pollState.responses[userId] = {
    choice: data.choice,
    timestamp: new Date().toISOString()
  };
  pollState.totalVotes = (pollState.totalVotes || 0) + 1;
  newState[element.id] = pollState;

  return {
    success: true,
    state: newState,
    data: { 
      voted: true, 
      choice: data.choice, 
      totalVotes: pollState.totalVotes 
    }
  };
}

async function handleDataSave(tool: any, data: any, currentState: any): Promise<ToolExecutionResult> {
  const newState = { ...currentState, ...data };
  
  return {
    success: true,
    state: newState,
    data: { saved: true }
  };
}

// Helper function to generate feed content
async function generateFeedContent(deployment: any, tool: any, userId: string, feedContent: any) {
  try {
    if (deployment.deployedTo === 'space' && deployment.settings.collectAnalytics) {
      await addDoc(collection(db, 'posts'), {
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
    console.error('Error generating feed content:', error);
  }
}

// Helper function to process notifications
async function processNotifications(deployment: any, notifications: any[]) {
  try {
    for (const notification of notifications) {
      await addDoc(collection(db, 'notifications'), {
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
    console.error('Error processing notifications:', error);
  }
}