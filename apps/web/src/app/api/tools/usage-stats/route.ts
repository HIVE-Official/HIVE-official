import { NextRequest, NextResponse } from 'next/server';

// Usage statistics interface matching the component expectations
interface ToolUsageStats {
  totalTools: number;
  weeklyUsage: number;
  lastUsed: string | null;
  mostUsedTool: string | null;
  topTools: Array<{
    id: string;
    name: string;
    usageCount: number;
    lastUsed: string;
  }>;
  usageByCategory: Record<string, number>;
  weeklyActivity: Array<{
    date: string;
    usage: number;
  }>;
}

// Mock usage statistics - will be replaced with actual analytics when Tool System is implemented
const generateMockUsageStats = (): ToolUsageStats => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return {
    totalTools: 6,
    weeklyUsage: 24,
    lastUsed: 'Study Timer • 2 hours ago',
    mostUsedTool: 'Note Keeper',
    topTools: [
      {
        id: 'note-keeper',
        name: 'Note Keeper',
        usageCount: 55,
        lastUsed: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'study-timer',
        name: 'Study Timer',
        usageCount: 45,
        lastUsed: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'task-tracker',
        name: 'Task Tracker',
        usageCount: 32,
        lastUsed: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString()
      }
    ],
    usageByCategory: {
      productivity: 18,
      study: 14,
      organization: 8,
      communication: 3,
      other: 2
    },
    weeklyActivity: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(weekAgo.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usage: Math.floor(Math.random() * 8) + 1
    }))
  };
};

/**
 * Get tool usage statistics for the authenticated user
 * GET /api/tools/usage-stats
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    // Development mode or missing auth - return mock data
    if (!authHeader || authHeader === 'Bearer test-token' || authHeader.startsWith('Bearer dev_token_')) {
      // Simulate API delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockStats = generateMockUsageStats();
      
      return NextResponse.json({
        success: true,
        stats: mockStats,
        generatedAt: new Date().toISOString(),
        developmentMode: true,
        message: 'Usage statistics retrieved successfully (development mode)'
      });
    }

    // TODO: Implement actual authentication and analytics integration
    // This would connect to the actual Tool System analytics when implemented
    
    // For now, return mock data for all requests
    const mockStats = generateMockUsageStats();
    
    return NextResponse.json({
      success: true,
      stats: mockStats,
      generatedAt: new Date().toISOString(),
      message: 'Usage statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Usage stats fetch error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch usage statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * Record a tool usage event
 * POST /api/tools/usage-stats
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
    const { toolId, action, metadata } = body;

    if (!toolId || !action) {
      return NextResponse.json(
        { error: 'Invalid request. Must specify toolId and action' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 150));

    // TODO: Implement actual usage tracking logic
    // This would record usage events in the analytics system when implemented

    console.log(`Tool usage tracked: ${toolId} - ${action}`, metadata);

    return NextResponse.json({
      success: true,
      toolId,
      action,
      timestamp: new Date().toISOString(),
      message: `Usage event recorded successfully (development mode)`,
      developmentMode: true
    });

  } catch (error) {
    console.error('Usage tracking error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to record usage event',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}