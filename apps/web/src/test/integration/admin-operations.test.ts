import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testEnvSetup, mockFirestore, mockAuth, mockUser, createMockRequest } from '../setup';

const mockAdminUser = {
  uid: 'admin-123',
  email: 'admin@university.edu',
  role: 'admin',
  permissions: ['user_management', 'content_moderation', 'system_administration']
};

const mockReportedContent = {
  id: 'report-123',
  type: 'post',
  contentId: 'post-456',
  reportedBy: 'user-789',
  reason: 'spam',
  description: 'This post contains promotional content',
  status: 'pending',
  createdAt: '2024-07-30T10:00:00Z'
};

vi.mock('../../lib/firebase', () => mockFirestore);
vi.mock('../../lib/auth', () => ({
  ...mockAuth,
  requireAdmin: vi.fn().mockResolvedValue(mockAdminUser)
}));

describe('Admin Operations Integration Tests', () => {
  beforeEach(() => {
    testEnvSetup();
    vi.clearAllMocks();
  });

  describe('User Management APIs', () => {
    it('fetches user list with filtering and pagination', async () => {
      const { GET: usersGET } = await import('../../app/api/admin/users/route');
      
      const request = createMockRequest('GET', '/api/admin/users?status=active&page=1&limit=20');
      const response = await usersGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toBeInstanceOf(Array);
      expect(data.pagination).toMatchObject({
        page: 1,
        limit: 20,
        total: expect.any(Number),
        totalPages: expect.any(Number)
      });
      expect(data.filters).toMatchObject({
        status: 'active'
      });
    });

    it('updates user status and permissions', async () => {
      const { PUT: userPUT } = await import('../../app/api/admin/users/[userId]/route');
      
      const updateData = {
        status: 'suspended',
        reason: 'Violation of community guidelines',
        duration: '7days'
      };

      const request = createMockRequest('PUT', '/api/admin/users/user-789', updateData);
      const response = await userPUT(request, { params: { userId: 'user-789' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user.status).toBe('suspended');
      expect(data.action.type).toBe('status_update');
      expect(data.action.performedBy).toBe(mockAdminUser.uid);
      
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'suspended',
          suspensionReason: 'Violation of community guidelines',
          suspensionDuration: '7days'
        })
      );
    });

    it('handles bulk user operations', async () => {
      const { POST: bulkUsersPOST } = await import('../../app/api/admin/users/bulk/route');
      
      const bulkData = {
        action: 'suspend',
        userIds: ['user-123', 'user-456', 'user-789'],
        reason: 'Coordinated spam activity',
        duration: '30days'
      };

      const request = createMockRequest('POST', '/api/admin/users/bulk', bulkData);
      const response = await bulkUsersPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.processed).toBe(3);
      expect(data.successful).toBe(3);
      expect(data.failed).toBe(0);
      expect(data.results).toHaveLength(3);
    });

    it('exports user data for compliance', async () => {
      const { POST: exportPOST } = await import('../../app/api/admin/users/export/route');
      
      const exportData = {
        filters: {
          status: 'active',
          registrationDate: '2024-01-01',
          school: 'University of Test'
        },
        format: 'csv',
        fields: ['email', 'displayName', 'school', 'registrationDate', 'lastActive']
      };

      const request = createMockRequest('POST', '/api/admin/users/export', exportData);
      const response = await exportPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.exportId).toBeDefined();
      expect(data.status).toBe('processing');
      expect(data.estimatedCompletion).toBeDefined();
    });
  });

  describe('Content Moderation APIs', () => {
    it('fetches reported content queue', async () => {
      const { GET: reportsGET } = await import('../../app/api/admin/reports/route');
      
      const request = createMockRequest('GET', '/api/admin/reports?status=pending&type=post');
      const response = await reportsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reports).toBeInstanceOf(Array);
      expect(data.summary).toMatchObject({
        pending: expect.any(Number),
        resolved: expect.any(Number),
        total: expect.any(Number)
      });
    });

    it('processes content moderation decisions', async () => {
      const { PUT: reportPUT } = await import('../../app/api/admin/reports/[reportId]/route');
      
      const moderationData = {
        decision: 'remove_content',
        reason: 'Spam content violates community guidelines',
        action: 'delete_post',
        notifyUser: true,
        escalate: false
      };

      const request = createMockRequest('PUT', '/api/admin/reports/report-123', moderationData);
      const response = await reportPUT(request, { params: { reportId: 'report-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.report.status).toBe('resolved');
      expect(data.report.decision).toBe('remove_content');
      expect(data.contentAction.performed).toBe(true);
      expect(data.userNotification.sent).toBe(true);
    });

    it('handles content appeals process', async () => {
      const { POST: appealsPOST } = await import('../../app/api/admin/appeals/route');
      
      const appealData = {
        originalReportId: 'report-123',
        appealReason: 'Content was educational and not spam',
        evidence: 'The post was sharing legitimate academic resources',
        requestedAction: 'restore_content'
      };

      const request = createMockRequest('POST', '/api/admin/appeals', appealData);
      const response = await appealsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.appeal.status).toBe('pending_review');
      expect(data.appeal.originalReport).toBe('report-123');
      expect(data.reviewAssigned).toBe(true);
    });

    it('manages automated moderation rules', async () => {
      const { POST: moderationRulesPOST } = await import('../../app/api/admin/moderation/rules/route');
      
      const ruleData = {
        name: 'Spam Link Detection',
        type: 'automated',
        condition: {
          contentType: 'post',
          contains: ['bit.ly', 'tinyurl.com'],
          threshold: 2
        },
        action: 'flag_for_review',
        severity: 'medium',
        enabled: true
      };

      const request = createMockRequest('POST', '/api/admin/moderation/rules', ruleData);
      const response = await moderationRulesPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.rule.name).toBe('Spam Link Detection');
      expect(data.rule.enabled).toBe(true);
      expect(data.rule.id).toBeDefined();
    });
  });

  describe('System Administration APIs', () => {
    it('fetches system metrics and health status', async () => {
      const { GET: metricsGET } = await import('../../app/api/admin/metrics/route');
      
      const request = createMockRequest('GET', '/api/admin/metrics?timeframe=24h');
      const response = await metricsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.system).toMatchObject({
        uptime: expect.any(Number),
        memory: expect.any(Object),
        cpu: expect.any(Object),
        database: expect.any(Object)
      });
      expect(data.application).toMatchObject({
        activeUsers: expect.any(Number),
        totalUsers: expect.any(Number),
        postsCreated: expect.any(Number),
        toolsCreated: expect.any(Number)
      });
    });

    it('manages feature flags and configurations', async () => {
      const { PUT: featureFlagsPUT } = await import('../../app/api/admin/features/route');
      
      const featuresData = {
        features: {
          'new-tool-editor': { enabled: true, rollout: 0.5 },
          'enhanced-search': { enabled: false, rollout: 0 },
          'real-time-collaboration': { enabled: true, rollout: 1.0 }
        }
      };

      const request = createMockRequest('PUT', '/api/admin/features', featuresData);
      const response = await featureFlagsPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.updated).toBe(3);
      expect(data.features['new-tool-editor'].enabled).toBe(true);
      expect(data.features['enhanced-search'].enabled).toBe(false);
    });

    it('handles system maintenance operations', async () => {
      const { POST: maintenancePOST } = await import('../../app/api/admin/maintenance/route');
      
      const maintenanceData = {
        operation: 'database_cleanup',
        parameters: {
          cleanupOlderThan: '90days',
          tables: ['sessions', 'logs', 'temporary_files']
        },
        schedule: 'immediate',
        notifyUsers: false
      };

      const request = createMockRequest('POST', '/api/admin/maintenance', maintenanceData);
      const response = await maintenancePOST(request);
      const data = await response.json();

      expect(response.status).toBe(202);
      expect(data.job.id).toBeDefined();
      expect(data.job.status).toBe('queued');
      expect(data.job.operation).toBe('database_cleanup');
    });

    it('manages system announcements', async () => {
      const { POST: announcementsPOST } = await import('../../app/api/admin/announcements/route');
      
      const announcementData = {
        title: 'Scheduled Maintenance Window',
        message: 'HIVE will be undergoing maintenance on Sunday at 2 AM EST',
        type: 'maintenance',
        priority: 'high',
        targetAudience: 'all_users',
        displayFrom: '2024-08-01T00:00:00Z',
        displayUntil: '2024-08-04T23:59:59Z',
        channels: ['in_app', 'email']
      };

      const request = createMockRequest('POST', '/api/admin/announcements', announcementData);
      const response = await announcementsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.announcement.title).toBe('Scheduled Maintenance Window');
      expect(data.announcement.status).toBe('scheduled');
      expect(data.notification.queued).toBe(true);
    });
  });

  describe('Analytics and Reporting APIs', () => {
    it('generates comprehensive platform analytics', async () => {
      const { GET: analyticsGET } = await import('../../app/api/admin/analytics/route');
      
      const request = createMockRequest('GET', '/api/admin/analytics?period=7days&breakdown=daily');
      const response = await analyticsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.summary).toMatchObject({
        activeUsers: expect.any(Number),
        newRegistrations: expect.any(Number),
        contentCreated: expect.any(Number),
        engagementRate: expect.any(Number)
      });
      expect(data.breakdown).toBeInstanceOf(Array);
      expect(data.breakdown).toHaveLength(7);
    });

    it('creates custom reports with filters', async () => {
      const { POST: reportsPOST } = await import('../../app/api/admin/reports/custom/route');
      
      const reportData = {
        name: 'Weekly User Engagement Report',
        type: 'user_activity',
        filters: {
          dateRange: '7days',
          userType: 'active',
          schools: ['University of Test', 'Tech College']
        },
        metrics: ['logins', 'posts_created', 'tools_used', 'connections_made'],
        format: 'pdf',
        schedule: 'weekly'
      };

      const request = createMockRequest('POST', '/api/admin/reports/custom', reportData);
      const response = await reportsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.report.name).toBe('Weekly User Engagement Report');
      expect(data.report.status).toBe('generating');
      expect(data.report.id).toBeDefined();
    });

    it('tracks admin action audit logs', async () => {
      const { GET: auditGET } = await import('../../app/api/admin/audit/route');
      
      const request = createMockRequest('GET', '/api/admin/audit?action=user_suspension&admin=admin-123&limit=50');
      const response = await auditGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.logs).toBeInstanceOf(Array);
      expect(data.logs[0]).toMatchObject({
        id: expect.any(String),
        adminId: expect.any(String),
        action: expect.any(String),
        target: expect.any(String),
        timestamp: expect.any(String),
        details: expect.any(Object)
      });
    });
  });

  describe('Security and Compliance APIs', () => {
    it('handles data privacy requests', async () => {
      const { POST: privacyPOST } = await import('../../app/api/admin/privacy/requests/route');
      
      const privacyRequest = {
        type: 'data_export',
        userId: 'user-123',
        requestedBy: 'user-123',
        reason: 'GDPR compliance',
        dataTypes: ['profile', 'posts', 'tools', 'connections'],
        format: 'json'
      };

      const request = createMockRequest('POST', '/api/admin/privacy/requests', privacyRequest);
      const response = await privacyPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.request.type).toBe('data_export');
      expect(data.request.status).toBe('processing');
      expect(data.estimatedCompletion).toBeDefined();
    });

    it('manages security incidents', async () => {
      const { POST: securityPOST } = await import('../../app/api/admin/security/incidents/route');
      
      const incidentData = {
        type: 'suspicious_activity',
        severity: 'medium',
        description: 'Multiple failed login attempts from same IP',
        affectedUsers: ['user-123', 'user-456'],
        sourceIP: '192.168.1.100',
        mitigationSteps: ['Rate limiting enabled', 'IP temporarily blocked'],
        status: 'investigating'
      };

      const request = createMockRequest('POST', '/api/admin/security/incidents', incidentData);
      const response = await securityPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.incident.type).toBe('suspicious_activity');
      expect(data.incident.id).toBeDefined();
      expect(data.alertsSent).toBe(true);
    });

    it('performs security scans and vulnerability assessments', async () => {
      const { POST: securityScanPOST } = await import('../../app/api/admin/security/scan/route');
      
      const scanData = {
        type: 'vulnerability_scan',
        scope: 'user_content',
        parameters: {
          checkMaliciousLinks: true,
          scanUploads: true,
          validateUserInput: true
        }
      };

      const request = createMockRequest('POST', '/api/admin/security/scan', scanData);
      const response = await securityScanPOST(request);
      const data = await response.json();

      expect(response.status).toBe(202);
      expect(data.scan.id).toBeDefined();
      expect(data.scan.status).toBe('running');
      expect(data.scan.type).toBe('vulnerability_scan');
    });
  });

  describe('Admin Permission and Role Management', () => {
    it('validates admin permissions for sensitive operations', async () => {
      const { POST: permissionCheckPOST } = await import('../../app/api/admin/permissions/check/route');
      
      const permissionData = {
        operation: 'user_suspension',
        resource: 'user-123',
        context: {
          reason: 'community_guidelines_violation',
          severity: 'high'
        }
      };

      const request = createMockRequest('POST', '/api/admin/permissions/check', permissionData);
      const response = await permissionCheckPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.allowed).toBe(true);
      expect(data.permissions).toContain('user_management');
      expect(data.requiresApproval).toBe(false);
    });

    it('manages admin role assignments', async () => {
      const { PUT: rolesPUT } = await import('../../app/api/admin/roles/[adminId]/route');
      
      const roleData = {
        roles: ['content_moderator', 'user_manager'],
        permissions: [
          'content_moderation',
          'user_management', 
          'report_generation'
        ],
        restrictions: {
          maxUserActions: 100,
          requireApprovalFor: ['permanent_ban']
        }
      };

      const request = createMockRequest('PUT', '/api/admin/roles/admin-456', roleData);
      const response = await rolesPUT(request, { params: { adminId: 'admin-456' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.admin.roles).toEqual(['content_moderator', 'user_manager']);
      expect(data.admin.permissions).toContain('content_moderation');
      expect(data.updated).toBe(true);
    });
  });
});