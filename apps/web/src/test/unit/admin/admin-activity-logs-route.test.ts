import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, DELETE } from '../../../app/api/admin/activity-logs/route';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  startAfter: vi.fn(),
  Timestamp: {
    fromDate: vi.fn((date) => ({ toDate: () => date }))
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
  logAdminActivity: vi.fn(),
  getActivityLogs: vi.fn(),
  getActivityStatistics: vi.fn(),
  cleanupOldLogs: vi.fn()
}));

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit as fbLimit,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { validateAdminToken, checkAdminPermissions } from '../../../lib/admin-auth';
import { 
  logAdminActivity, 
  getActivityLogs, 
  getActivityStatistics, 
  cleanupOldLogs 
} from '../../../lib/admin-activity-logger';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Admin Activity Logs Route API', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    role: 'admin',
    permissions: ['activity_logs:view', 'activity_logs:manage', 'audit:access']
  };

  const mockActivityLog = {
    id: 'log-123',
    adminId: 'admin-user-123',
    adminName: 'Admin User',
    adminEmail: 'admin@hive.test',
    action: 'users:suspend',
    resource: 'user',
    resourceId: 'user-456',
    resourceName: 'John Doe',
    description: 'Suspended user for policy violation',
    metadata: {
      targetUserId: 'user-456',
      reason: 'Inappropriate behavior',
      duration: '7d',
      severity: 'medium',
      affectedSpaces: ['space-123'],
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      sessionId: 'session-789'
    },
    context: {
      spaceId: 'space-123',
      spaceName: 'CS Study Group',
      requestId: 'req-456',
      batchId: null,
      automation: false
    },
    timestamp: '2024-01-15T14:30:00Z',
    severity: 'medium',
    category: 'user_management',
    tags: ['suspension', 'moderation', 'policy'],
    outcome: 'success',
    duration: 1250, // ms
    errors: null,
    relatedLogs: ['log-122', 'log-124']
  };

  const mockValidationResult = {
    isValid: true,
    user: mockAdminUser,
    profile: mockAdminProfile
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
    vi.mocked(startAfter).mockReturnValue({} as any);
    vi.mocked(Timestamp.fromDate).mockImplementation((date) => ({ toDate: () => date } as any));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET - Get Activity Logs', () => {
    beforeEach(() => {
      vi.mocked(getActivityLogs).mockResolvedValue({
        logs: [
          mockActivityLog,
          {
            ...mockActivityLog,
            id: 'log-456',
            action: 'spaces:create',
            description: 'Created new academic space',
            category: 'space_management'
          }
        ],
        pagination: {
          hasMore: false,
          nextCursor: null,
          totalCount: 2
        }
      });

      vi.mocked(getActivityStatistics).mockResolvedValue({
        totalLogs: 150,
        logsToday: 12,
        logsThisWeek: 85,
        topActions: [
          { action: 'users:view', count: 45 },
          { action: 'spaces:update', count: 32 },
          { action: 'builder_requests:approve', count: 18 }
        ],
        topAdmins: [
          { adminId: 'admin-1', adminName: 'Admin One', count: 67 },
          { adminId: 'admin-2', adminName: 'Admin Two', count: 43 }
        ],
        errorRate: 0.03,
        averageDuration: 850,
        categoryBreakdown: {
          user_management: 45,
          space_management: 38,
          builder_requests: 25,
          system_admin: 42
        }
      });
    });

    it('gets activity logs with default pagination', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.logs).toHaveLength(2);
      expect(responseData.logs[0]).toEqual(
        expect.objectContaining({
          id: 'log-123',
          adminId: 'admin-user-123',
          action: 'users:suspend',
          category: 'user_management'
        })
      );
      expect(responseData.pagination.totalCount).toBe(2);
    });

    it('filters logs by admin ID', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?adminId=admin-user-123');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          adminId: 'admin-user-123'
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by action type', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?action=users:suspend');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'users:suspend'
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by category', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?category=user_management');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'user_management'
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by severity level', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?severity=high');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'high'
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by date range', async () => {
      const startDate = '2024-01-15T00:00:00Z';
      const endDate = '2024-01-16T00:00:00Z';
      const request = new NextRequest(
        `http://localhost/api/admin/activity-logs?startDate=${startDate}&endDate=${endDate}`
      );

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by resource type and ID', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?resource=user&resourceId=user-456'
      );

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: 'user',
          resourceId: 'user-456'
        })
      );
      expect(response.status).toBe(200);
    });

    it('searches logs by keyword', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?search=suspended');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'suspended'
        })
      );
      expect(response.status).toBe(200);
    });

    it('sorts logs by timestamp descending', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?sortBy=timestamp&sortOrder=desc');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: 'timestamp',
          sortOrder: 'desc'
        })
      );
      expect(response.status).toBe(200);
    });

    it('includes statistics when requested', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?includeStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.statistics).toBeDefined();
      expect(responseData.statistics.totalLogs).toBe(150);
      expect(responseData.statistics.topActions).toHaveLength(3);
      expect(responseData.statistics.categoryBreakdown).toBeDefined();
    });

    it('handles pagination with cursor', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?cursor=log-100&limit=10');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          cursor: 'log-100',
          limit: 10
        })
      );
      expect(response.status).toBe(200);
    });

    it('filters logs by outcome status', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?outcome=error');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          outcome: 'error'
        })
      );
      expect(response.status).toBe(200);
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest('http://localhost/api/admin/activity-logs');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 403 for insufficient permissions', async () => {
      vi.mocked(checkAdminPermissions).mockResolvedValue(false);

      const request = new NextRequest('http://localhost/api/admin/activity-logs');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Insufficient permissions');
    });

    it('logs activity viewing action', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?category=user_management');

      await GET(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'activity_logs:view',
        expect.objectContaining({
          action: 'view_activity_logs',
          filters: expect.objectContaining({
            category: 'user_management'
          })
        })
      );
    });

    it('handles errors gracefully', async () => {
      vi.mocked(getActivityLogs).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost/api/admin/activity-logs');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get activity logs');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error getting activity logs:',
        expect.any(Error)
      );
    });

    it('validates date range parameters', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?startDate=invalid-date'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Invalid date format');
    });

    it('limits maximum results per request', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?limit=1000');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 100 // Should be capped at maximum
        })
      );
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE - Cleanup Activity Logs', () => {
    beforeEach(() => {
      vi.mocked(cleanupOldLogs).mockResolvedValue({
        deletedCount: 250,
        oldestRetained: '2024-01-01T00:00:00Z',
        cleanupDuration: 5500
      });
    });

    it('cleans up old activity logs successfully', async () => {
      const olderThan = '2024-01-01T00:00:00Z';
      const request = new NextRequest(
        `http://localhost/api/admin/activity-logs?olderThan=${olderThan}&confirm=true`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.deletedCount).toBe(250);
      expect(responseData.oldestRetained).toBe('2024-01-01T00:00:00Z');

      expect(vi.mocked(cleanupOldLogs)).toHaveBeenCalledWith(
        new Date(olderThan),
        undefined // No specific admin ID
      );
    });

    it('cleans up logs for specific admin', async () => {
      const olderThan = '2024-01-01T00:00:00Z';
      const adminId = 'admin-user-456';
      const request = new NextRequest(
        `http://localhost/api/admin/activity-logs?olderThan=${olderThan}&adminId=${adminId}&confirm=true`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      expect(vi.mocked(cleanupOldLogs)).toHaveBeenCalledWith(
        new Date(olderThan),
        'admin-user-456'
      );
    });

    it('requires confirmation for cleanup', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=2024-01-01T00:00:00Z',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Cleanup confirmation required');
    });

    it('requires olderThan parameter', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('olderThan parameter is required');
    });

    it('validates date format for olderThan', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=invalid-date&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Invalid date format for olderThan');
    });

    it('prevents deletion of recent logs', async () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 1); // Yesterday
      
      const request = new NextRequest(
        `http://localhost/api/admin/activity-logs?olderThan=${recentDate.toISOString()}&confirm=true`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Cannot delete logs newer than 30 days');
    });

    it('requires super admin permissions for cleanup', async () => {
      const moderatorProfile = { ...mockAdminProfile, role: 'moderator' };
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: true,
        user: mockAdminUser,
        profile: moderatorProfile
      });

      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=2024-01-01T00:00:00Z&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Super admin permissions required for log cleanup');
    });

    it('logs cleanup activity', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=2024-01-01T00:00:00Z&confirm=true',
        { method: 'DELETE' }
      );

      await DELETE(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'activity_logs:cleanup',
        expect.objectContaining({
          action: 'cleanup_old_logs',
          olderThan: '2024-01-01T00:00:00Z',
          deletedCount: 250
        })
      );
    });

    it('handles cleanup errors gracefully', async () => {
      vi.mocked(cleanupOldLogs).mockRejectedValue(new Error('Cleanup failed'));

      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=2024-01-01T00:00:00Z&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to cleanup activity logs');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error cleaning up activity logs:',
        expect.any(Error)
      );
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?olderThan=2024-01-01T00:00:00Z&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });
  });

  describe('Advanced Filtering and Analytics', () => {
    it('gets logs with complex multi-filter query', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?' +
        'category=user_management&' +
        'severity=high&' +
        'outcome=success&' +
        'startDate=2024-01-15T00:00:00Z&' +
        'endDate=2024-01-16T00:00:00Z&' +
        'adminId=admin-user-123'
      );

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'user_management',
          severity: 'high',
          outcome: 'success',
          startDate: new Date('2024-01-15T00:00:00Z'),
          endDate: new Date('2024-01-16T00:00:00Z'),
          adminId: 'admin-user-123'
        })
      );
      expect(response.status).toBe(200);
    });

    it('provides performance analytics for admin actions', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?includePerformance=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.performance).toBeDefined();
      expect(responseData.performance.averageDuration).toBe(850);
      expect(responseData.performance.errorRate).toBe(0.03);
    });

    it('gets audit trail for specific resource', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?resource=user&resourceId=user-456&includeRelated=true'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.logs[0].relatedLogs).toEqual(['log-122', 'log-124']);
    });

    it('aggregates logs by time periods', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?aggregateBy=day&includeStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.timeAggregation).toBeDefined();
    });

    it('filters logs by IP address patterns', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?ipAddress=192.168.1.*');

      const response = await GET(request);

      expect(vi.mocked(getActivityLogs)).toHaveBeenCalledWith(
        expect.objectContaining({
          ipAddress: '192.168.1.*'
        })
      );
      expect(response.status).toBe(200);
    });

    it('gets logs for security audit', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?' +
        'category=security&' +
        'severity=high&' +
        'includeMetadata=true&' +
        'sortBy=timestamp&' +
        'sortOrder=desc'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.logs[0].metadata).toBeDefined();
      expect(responseData.logs[0].metadata.ipAddress).toBe('192.168.1.100');
      expect(responseData.logs[0].metadata.userAgent).toContain('Mozilla');
    });
  });

  describe('Export and Reporting', () => {
    it('prepares logs for CSV export', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?format=export&limit=1000');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.exportData).toBeDefined();
      expect(responseData.exportData.headers).toEqual(
        expect.arrayContaining([
          'timestamp', 'adminName', 'action', 'category', 
          'resourceName', 'description', 'outcome'
        ])
      );
      expect(responseData.exportData.rows).toHaveLength(2);
    });

    it('generates summary report for date range', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/activity-logs?' +
        'startDate=2024-01-01T00:00:00Z&' +
        'endDate=2024-01-31T23:59:59Z&' +
        'includeStats=true&' +
        'includeTrends=true'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.statistics).toBeDefined();
      expect(responseData.trends).toBeDefined();
    });
  });

  describe('Real-time Monitoring Integration', () => {
    it('marks critical security events for real-time alerts', async () => {
      const securityLog = {
        ...mockActivityLog,
        category: 'security',
        severity: 'critical',
        action: 'auth:failed_login_attempts'
      };

      vi.mocked(getActivityLogs).mockResolvedValue({
        logs: [securityLog],
        pagination: { hasMore: false, nextCursor: null, totalCount: 1 }
      });

      const request = new NextRequest('http://localhost/api/admin/activity-logs?category=security&severity=critical');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.alerts).toBeDefined();
      expect(responseData.logs[0].severity).toBe('critical');
    });

    it('identifies patterns in failed operations', async () => {
      const request = new NextRequest('http://localhost/api/admin/activity-logs?outcome=error&includePatterns=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.patterns).toBeDefined();
    });
  });
});