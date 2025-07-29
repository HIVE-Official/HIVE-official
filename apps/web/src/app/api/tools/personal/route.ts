import { NextRequest, NextResponse } from 'next/server';

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

// Mock personal tools data - will be replaced with actual Tool System integration
const mockPersonalTools: PersonalTool[] = [
  { 
    id: 'study-timer', 
    name: 'Study Timer', 
    icon: '⏱️', 
    category: 'productivity', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    usageCount: 45, 
    quickLaunch: true 
  },
  { 
    id: 'task-tracker', 
    name: 'Task Tracker', 
    icon: '✅', 
    category: 'productivity', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    usageCount: 32, 
    quickLaunch: true 
  },
  { 
    id: 'grade-calc', 
    name: 'Grade Calculator', 
    icon: '📊', 
    category: 'study', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    usageCount: 28, 
    quickLaunch: true 
  },
  { 
    id: 'schedule-sync', 
    name: 'Schedule Sync', 
    icon: '📅', 
    category: 'organization', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    usageCount: 18, 
    quickLaunch: true 
  },
  { 
    id: 'note-keeper', 
    name: 'Note Keeper', 
    icon: '📝', 
    category: 'study', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    usageCount: 55, 
    quickLaunch: true 
  },
  { 
    id: 'campus-map', 
    name: 'Campus Navigator', 
    icon: '🗺️', 
    category: 'other', 
    isInstalled: true, 
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    usageCount: 12, 
    quickLaunch: false 
  },
];

/**
 * Get personal tools for the authenticated user
 * GET /api/tools/personal
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    // Development mode or missing auth - return mock data
    if (!authHeader || authHeader === 'Bearer test-token' || authHeader.startsWith('Bearer dev_token_')) {
      // Simulate API delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return NextResponse.json({
        success: true,
        tools: mockPersonalTools,
        totalCount: mockPersonalTools.length,
        installedCount: mockPersonalTools.filter(t => t.isInstalled).length,
        developmentMode: true,
        message: 'Personal tools retrieved successfully (development mode)'
      });
    }

    // TODO: Implement actual authentication and Tool System integration
    // This would connect to the actual Tool System APIs when implemented
    
    // For now, return mock data for all requests
    return NextResponse.json({
      success: true,
      tools: mockPersonalTools,
      totalCount: mockPersonalTools.length,
      installedCount: mockPersonalTools.filter(t => t.isInstalled).length,
      message: 'Personal tools retrieved successfully'
    });

  } catch (error) {
    console.error('Personal tools fetch error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch personal tools',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * Install or uninstall a tool
 * POST /api/tools/personal
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || (!authHeader.startsWith('Bearer test-token') && !authHeader.startsWith('Bearer dev_token_'))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { toolId, action } = body;

    if (!toolId || !action || !['install', 'uninstall'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request. Must specify toolId and action (install/uninstall)' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Implement actual tool installation/uninstallation logic
    // This would connect to the Tool System when implemented

    return NextResponse.json({
      success: true,
      toolId,
      action,
      message: `Tool ${action}ed successfully (development mode)`,
      developmentMode: true
    });

  } catch (error) {
    console.error('Tool installation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process tool installation',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}