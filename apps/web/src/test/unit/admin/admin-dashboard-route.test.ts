import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET } from '../../../app/api/admin/dashboard/route';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() }))
  }
}));

// Mock Firebase database
vi.mock('@hive/core/server', () => ({
  db: {}
}));

// Mock admin auth
vi.mock('../../../lib/admin-auth', () => ({
  validateAdminToken: vi.fn(),
  checkAdminPermissions: vi.fn()
}));

// Mock admin activity logger
vi.mock('../../../lib/admin-activity-logger', () => ({
  logAdminActivity: vi.fn()
}));

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as fbLimit,
  Timestamp
} from 'firebase/firestore';
import { validateAdminToken, checkAdminPermissions } from '../../../lib/admin-auth';
import { logAdminActivity } from '../../../lib/admin-activity-logger';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Admin Dashboard Route API', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    role: 'admin',
    permissions: ['dashboard:view', 'analytics:view', 'system:monitor']
  };

  const mockDashboardData = {
    overview: {
      totalUsers: 1247,
      activeUsers: 892,
      totalSpaces: 156,
      activeSpaces: 134,
      totalTools: 89,
      builderRequests: 23,
      pendingRequests: 8,
      systemHealth: 'healthy'
    },
    userMetrics: {
      newUsersToday: 12,
      newUsersThisWeek: 78,
      newUsersThisMonth: 324,
      retentionRate: 0.85,
      averageSessionDuration: 1850000, // ms
      bounceRate: 0.23,
      userGrowthTrend: [
        { date: '2024-01-15', count: 1200 },
        { date: '2024-01-16', count: 1210 },
        { date: '2024-01-17', count: 1225 },
        { date: '2024-01-18', count: 1240 },
        { date: '2024-01-19', count: 1247 }
      ]
    },
    spaceMetrics: {
      newSpacesToday: 3,
      newSpacesThisWeek: 18,
      newSpacesThisMonth: 67,
      averageMembersPerSpace: 18.4,
      mostActiveSpaces: [
        { id: 'space-1', name: 'CS Study Group', memberCount: 45, activityScore: 92 },
        { id: 'space-2', name: 'Biology Lab', memberCount: 38, activityScore: 87 },
        { id: 'space-3', name: 'Math Tutoring', memberCount: 32, activityScore: 83 }
      ],
      spaceGrowthTrend: [
        { date: '2024-01-15', count: 140 },
        { date: '2024-01-16', count: 143 },
        { date: '2024-01-17', count: 148 },
        { date: '2024-01-18', count: 152 },
        { date: '2024-01-19', count: 156 }
      ]
    },
    builderMetrics: {
      totalBuilders: 67,
      activeBuilders: 52,
      pendingRequests: 8,
      approvedThisWeek: 5,
      rejectedThisWeek: 2,
      averageProcessingTime: 2.5, // days
      builderProductivity: [
        { builderId: 'builder-1', name: 'Alice Smith', toolsCreated: 8, usage: 234 },
        { builderId: 'builder-2', name: 'Bob Johnson', toolsCreated: 6, usage: 189 },
        { builderId: 'builder-3', name: 'Carol Davis', toolsCreated: 5, usage: 156 }
      ]
    },
    systemMetrics: {
      uptime: 0.9987,
      responseTime: 145, // ms
      errorRate: 0.012,
      activeConnections: 1284,
      databaseHealth: 'optimal',
      storageUsage: {
        used: 45.6, // GB
        total: 100, // GB
        percentage: 45.6
      },
      performanceAlerts: [
        {
          id: 'alert-1',
          type: 'warning',
          message: 'Database query time increased by 15%',
          timestamp: '2024-01-19T14:30:00Z',
          resolved: false
        }
      ]
    },
    recentActivity: [
      {
        id: 'activity-1',
        adminName: 'Admin User',
        action: 'Approved builder request',
        target: 'John Doe',
        timestamp: '2024-01-19T15:45:00Z',
        severity: 'low'
      },
      {
        id: 'activity-2',
        adminName: 'Moderator Jane',
        action: 'Created new space',
        target: 'Physics Study Group',
        timestamp: '2024-01-19T14:20:00Z',
        severity: 'low'
      },
      {
        id: 'activity-3',
        adminName: 'Admin User',
        action: 'Suspended user',
        target: 'Problem User',
        timestamp: '2024-01-19T13:15:00Z',
        severity: 'medium'
      }
    ],
    alerts: [
      {
        id: 'alert-system-1',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'System memory usage at 85%',
        timestamp: '2024-01-19T15:30:00Z',
        resolved: false,
        severity: 'medium'
      },
      {
        id: 'alert-security-1',
        type: 'info',
        title: 'Security Scan Complete',
        message: 'Weekly security scan completed successfully',
        timestamp: '2024-01-19T12:00:00Z',
        resolved: true,
        severity: 'low'
      }
    ]
  };

  const mockValidationResult = {
    isValid: true,
    user: mockAdminUser,
    profile: mockAdminProfile
  };

  // Mock Firestore query results
  const mockUserStats = {
    docs: Array(1247).fill(null).map((_, i) => ({
      id: `user-${i}`,
      data: () => ({
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: Math.random() > 0.1 ? 'active' : 'inactive',
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      })
    })),
    size: 1247
  };

  const mockSpaceStats = {
    docs: Array(156).fill(null).map((_, i) => ({
      id: `space-${i}`,
      data: () => ({
        name: `Space ${i}`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: Math.random() > 0.15 ? 'active' : 'inactive',
        memberCount: Math.floor(Math.random() * 50) + 5,
        statistics: {
          weeklyActivity: Math.floor(Math.random() * 100),
          healthScore: Math.floor(Math.random() * 40) + 60
        }
      })
    })),
    size: 156
  };

  const mockBuilderRequestStats = {
    docs: Array(23).fill(null).map((_, i) => ({
      id: `request-${i}`,
      data: () => ({
        submittedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
        reviewedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null
      })
    })),
    size: 23
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.error.mockClear();

    // Setup default mocks
    vi.mocked(validateAdminToken).mockResolvedValue(mockValidationResult);
    vi.mocked(checkAdminPermissions).mockResolvedValue(true);
    vi.mocked(logAdminActivity).mockResolvedValue(undefined);
    
    vi.mocked(doc).mockReturnValue({} as any);
    vi.mocked(collection).mockReturnValue({} as any);
    vi.mocked(query).mockReturnValue({} as any);
    vi.mocked(where).mockReturnValue({} as any);
    vi.mocked(orderBy).mockReturnValue({} as any);
    vi.mocked(fbLimit).mockReturnValue({} as any);
    vi.mocked(Timestamp.now).mockReturnValue({ toDate: () => new Date() } as any);

    // Setup default query results
    vi.mocked(getDocs)
      .mockResolvedValueOnce(mockUserStats as any)
      .mockResolvedValueOnce(mockSpaceStats as any)
      .mockResolvedValueOnce(mockBuilderRequestStats as any)
      .mockResolvedValue({ docs: [], size: 0 } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET - Get Dashboard Data', () => {
    it('gets complete dashboard data successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual(
        expect.objectContaining({
          overview: expect.objectContaining({
            totalUsers: expect.any(Number),
            activeUsers: expect.any(Number),
            totalSpaces: expect.any(Number),
            activeSpaces: expect.any(Number),
            builderRequests: expect.any(Number),
            systemHealth: expect.any(String)
          }),
          userMetrics: expect.objectContaining({
            newUsersToday: expect.any(Number),
            retentionRate: expect.any(Number),
            userGrowthTrend: expect.any(Array)
          }),
          spaceMetrics: expect.objectContaining({
            newSpacesToday: expect.any(Number),
            averageMembersPerSpace: expect.any(Number),
            mostActiveSpaces: expect.any(Array)
          }),
          builderMetrics: expect.objectContaining({
            totalBuilders: expect.any(Number),
            pendingRequests: expect.any(Number),
            averageProcessingTime: expect.any(Number)
          })
        })
      );
    });

    it('gets dashboard data with specific metrics filter', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?metrics=users,spaces');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.userMetrics).toBeDefined();
      expect(responseData.data.spaceMetrics).toBeDefined();
      expect(responseData.data.builderMetrics).toBeUndefined();
      expect(responseData.data.systemMetrics).toBeUndefined();
    });

    it('gets dashboard data with date range filter', async () => {
      const startDate = '2024-01-15T00:00:00Z';
      const endDate = '2024-01-19T23:59:59Z';
      const request = new NextRequest(
        `http://localhost/api/admin/dashboard?startDate=${startDate}&endDate=${endDate}`
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.dateRange).toEqual({
        startDate,
        endDate
      });
    });

    it('includes system health metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeSystem=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.systemMetrics).toEqual(
        expect.objectContaining({
          uptime: expect.any(Number),
          responseTime: expect.any(Number),
          errorRate: expect.any(Number),
          activeConnections: expect.any(Number),
          databaseHealth: expect.any(String),
          storageUsage: expect.objectContaining({
            used: expect.any(Number),
            total: expect.any(Number),
            percentage: expect.any(Number)
          })
        })
      );
    });

    it('includes recent admin activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeActivity=true&activityLimit=10');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.recentActivity).toBeDefined();
      expect(responseData.data.recentActivity).toHaveLength(3);
      expect(responseData.data.recentActivity[0]).toEqual(
        expect.objectContaining({
          adminName: expect.any(String),
          action: expect.any(String),
          target: expect.any(String),
          timestamp: expect.any(String),
          severity: expect.any(String)
        })
      );
    });

    it('includes system alerts and notifications', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeAlerts=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.alerts).toBeDefined();
      expect(responseData.data.alerts).toHaveLength(2);
      expect(responseData.data.alerts[0]).toEqual(
        expect.objectContaining({
          type: expect.any(String),
          title: expect.any(String),
          message: expect.any(String),
          timestamp: expect.any(String),
          resolved: expect.any(Boolean),
          severity: expect.any(String)
        })
      );
    });

    it('calculates user growth trends', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeTrends=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.userMetrics.userGrowthTrend).toBeDefined();
      expect(responseData.data.userMetrics.userGrowthTrend).toHaveLength(5);
      expect(responseData.data.userMetrics.userGrowthTrend[0]).toEqual(
        expect.objectContaining({
          date: expect.any(String),
          count: expect.any(Number)
        })
      );
    });

    it('calculates space activity rankings', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeSpaceRankings=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.spaceMetrics.mostActiveSpaces).toBeDefined();
      expect(responseData.data.spaceMetrics.mostActiveSpaces).toHaveLength(3);
      expect(responseData.data.spaceMetrics.mostActiveSpaces[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          memberCount: expect.any(Number),
          activityScore: expect.any(Number)
        })
      );
    });

    it('calculates builder productivity metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeBuilderStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.builderMetrics.builderProductivity).toBeDefined();
      expect(responseData.data.builderMetrics.builderProductivity).toHaveLength(3);
      expect(responseData.data.builderMetrics.builderProductivity[0]).toEqual(
        expect.objectContaining({
          builderId: expect.any(String),
          name: expect.any(String),
          toolsCreated: expect.any(Number),
          usage: expect.any(Number)
        })
      );
    });

    it('provides performance analytics summary', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includePerformance=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.performanceSummary).toEqual(
        expect.objectContaining({
          averageLoadTime: expect.any(Number),
          peakConcurrentUsers: expect.any(Number),
          errorBreakdown: expect.any(Object),
          resourceUtilization: expect.any(Object)
        })
      );
    });

    it('calculates retention and engagement metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeEngagement=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.userMetrics.retentionRate).toBeDefined();
      expect(responseData.data.userMetrics.averageSessionDuration).toBeDefined();
      expect(responseData.data.userMetrics.bounceRate).toBeDefined();
      expect(responseData.data.engagementMetrics).toEqual(
        expect.objectContaining({
          dailyActiveUsers: expect.any(Number),
          weeklyActiveUsers: expect.any(Number),
          monthlyActiveUsers: expect.any(Number),
          toolUsageRate: expect.any(Number)
        })
      );
    });

    it('returns cached data when available', async () => {
      // First request
      const request1 = new NextRequest('http://localhost/api/admin/dashboard');
      const response1 = await GET(request1);
      
      // Second request (should use cache)
      const request2 = new NextRequest('http://localhost/api/admin/dashboard');
      const response2 = await GET(request2);

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(response2.headers.get('X-Cache-Status')).toBe('hit');
    });

    it('refreshes data when cache is expired', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?refresh=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(response.headers.get('X-Cache-Status')).toBe('miss');
      expect(responseData.data.generatedAt).toBeDefined();
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 403 for insufficient permissions', async () => {
      vi.mocked(checkAdminPermissions).mockResolvedValue(false);

      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Insufficient permissions');
    });

    it('logs dashboard access activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?metrics=users,spaces');

      await GET(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'dashboard:view',
        expect.objectContaining({
          action: 'view_admin_dashboard',
          metricsRequested: ['users', 'spaces'],
          includeSystem: false,
          includeActivity: false
        })
      );
    });

    it('handles database errors gracefully', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get dashboard data');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error getting dashboard data:',
        expect.any(Error)
      );
    });

    it('validates date range parameters', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/dashboard?startDate=invalid-date&endDate=2024-01-19T23:59:59Z'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Invalid date format');
    });

    it('handles partial data availability', async () => {
      // Mock some queries to fail
      vi.mocked(getDocs)
        .mockResolvedValueOnce(mockUserStats as any)
        .mockRejectedValueOnce(new Error('Space query failed'))
        .mockResolvedValueOnce(mockBuilderRequestStats as any);

      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.userMetrics).toBeDefined();
      expect(responseData.data.spaceMetrics).toBeUndefined();
      expect(responseData.data.builderMetrics).toBeDefined();
      expect(responseData.warnings).toContain('Failed to load space metrics');
    });

    it('provides real-time status indicators', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?realtime=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.realtimeStatus).toEqual(
        expect.objectContaining({
          onlineUsers: expect.any(Number),
          activeConnections: expect.any(Number),
          systemLoad: expect.any(Number),
          lastUpdated: expect.any(String)
        })
      );
    });

    it('calculates comparative analytics', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?includeComparison=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.comparison).toEqual(
        expect.objectContaining({
          userGrowthChange: expect.any(Number),
          spaceGrowthChange: expect.any(Number),
          engagementChange: expect.any(Number),
          performanceChange: expect.any(Number)
        })
      );
    });
  });

  describe('Dashboard Performance Optimization', () => {
    it('implements efficient data aggregation', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const startTime = Date.now();
      const response = await GET(request);
      const endTime = Date.now();

      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(2000); // Should complete within 2 seconds
    });

    it('uses incremental loading for heavy metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard?incremental=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.loadingState).toEqual(
        expect.objectContaining({
          isIncremental: true,
          loadedSections: expect.any(Array),
          pendingSections: expect.any(Array)
        })
      );
    });

    it('provides data freshness indicators', async () => {
      const request = new NextRequest('http://localhost/api/admin/dashboard');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.data.dataFreshness).toEqual(
        expect.objectContaining({
          userMetrics: expect.any(String),
          spaceMetrics: expect.any(String),
          builderMetrics: expect.any(String),
          systemMetrics: expect.any(String)
        })
      );
    });
  });

  describe('Error Handling and Fallbacks', () => {
    it('provides fallback data when primary sources fail', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Primary database unavailable'));

      const request = new NextRequest('http://localhost/api/admin/dashboard?useFallback=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.fallbackMode).toBe(true);
      expect(responseData.data.overview).toBeDefined();
    });

    it('handles concurrent request limits gracefully', async () => {
      // Simulate multiple concurrent requests
      const requests = Array(10).fill(null).map(() => 
        GET(new NextRequest('http://localhost/api/admin/dashboard'))
      );

      const responses = await Promise.all(requests);

      expect(responses.every(r => r.status === 200 || r.status === 429)).toBe(true);
    });

    it('recovers from temporary service outages', async () => {
      // First request fails
      vi.mocked(getDocs).mockRejectedValueOnce(new Error('Service temporarily unavailable'));
      
      const request1 = new NextRequest('http://localhost/api/admin/dashboard');
      const response1 = await GET(request1);
      
      expect(response1.status).toBe(500);

      // Second request succeeds (service recovered)
      vi.mocked(getDocs)
        .mockResolvedValueOnce(mockUserStats as any)
        .mockResolvedValueOnce(mockSpaceStats as any)
        .mockResolvedValueOnce(mockBuilderRequestStats as any);
      
      const request2 = new NextRequest('http://localhost/api/admin/dashboard');
      const response2 = await GET(request2);
      
      expect(response2.status).toBe(200);
    });
  });
});