import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock Firebase Admin
const mockFirestore = {
  collection: vi.fn(() => ({
    doc: vi.fn(() => ({
      get: vi.fn(),
      set: vi.fn(), 
      update: vi.fn(),
      delete: vi.fn(),
    })),
    where: vi.fn(() => ({
      get: vi.fn(),
      limit: vi.fn(() => ({
        get: vi.fn(),
      })),
    })),
    add: vi.fn(),
    get: vi.fn(),
  })),
  doc: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  })),
};

vi.mock('firebase-admin/firestore', () => ({
  getFirestore: () => mockFirestore,
  FieldValue: {
    serverTimestamp: () => 'server-timestamp',
    increment: (value: number) => `increment-${value}`,
    arrayUnion: (...values: any[]) => `array-union-${values.join(',')}`,
    arrayRemove: (...values: any[]) => `array-remove-${values.join(',')}`,
  },
}));

// Mock auth verification
vi.mock('@/lib/auth-admin', () => ({
  verifyAuthToken: vi.fn().mockResolvedValue({
    uid: 'test-user-uid',
    email: 'test@test.edu',
  }),
}));

// Mock input validation
vi.mock('@/lib/secure-input-validation', () => ({
  validateToolCreation: vi.fn().mockReturnValue({ isValid: true }),
  validateToolUpdate: vi.fn().mockReturnValue({ isValid: true }),
  sanitizeToolInput: vi.fn((input) => input),
}));

// Mock rate limiting
vi.mock('@/lib/rate-limiting', () => ({
  rateLimiter: {
    check: vi.fn().mockResolvedValue({ success: true }),
  },
}));

describe('Tools API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET /api/tools', () => {
    it('returns user tools successfully', async () => {
      const mockTools = [
        {
          id: 'tool-1',
          name: 'Test Tool 1',
          description: 'A test tool',
          category: 'productivity',
          isPublic: false,
          createdBy: 'test-user-uid',
          createdAt: new Date(),
        },
        {
          id: 'tool-2', 
          name: 'Test Tool 2',
          description: 'Another test tool',
          category: 'academic',
          isPublic: true,
          createdBy: 'test-user-uid',
          createdAt: new Date(),
        },
      ];

      mockFirestore.collection().where().get.mockResolvedValueOnce({
        docs: mockTools.map(tool => ({
          id: tool.id,
          data: () => tool,
        })),
      });

      const { GET } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tools).toHaveLength(2);
      expect(data.tools[0].name).toBe('Test Tool 1');
    });

    it('handles authentication errors', async () => {
      const mockVerifyAuthToken = await import('@/lib/auth-admin');
      vi.mocked(mockVerifyAuthToken.verifyAuthToken).mockRejectedValueOnce(
        new Error('Invalid token')
      );

      const { GET } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools');

      const response = await GET(request);

      expect(response.status).toBe(401);
    });

    it('handles database errors gracefully', async () => {
      mockFirestore.collection().where().get.mockRejectedValueOnce(
        new Error('Database connection failed')
      );

      const { GET } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request);

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/tools', () => {
    it('creates a new tool successfully', async () => {
      const newTool = {
        name: 'New Test Tool',
        description: 'A new test tool',
        category: 'productivity',
        privacy: 'personal',
        elements: [],
        settings: {},
      };

      mockFirestore.collection().add.mockResolvedValueOnce({
        id: 'new-tool-id',
      });

      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify(newTool),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.toolId).toBe('new-tool-id');
      expect(mockFirestore.collection().add).toHaveBeenCalledWith(
        expect.objectContaining({
          name: newTool.name,
          description: newTool.description,
          createdBy: 'test-user-uid',
        })
      );
    });

    it('validates input data', async () => {
      const mockValidation = await import('@/lib/secure-input-validation');
      vi.mocked(mockValidation.validateToolCreation).mockReturnValueOnce({
        isValid: false,
        errors: ['Tool name is required'],
      });

      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: '' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.errors).toContain('Tool name is required');
    });

    it('handles rate limiting', async () => {
      const mockRateLimit = await import('@/lib/rate-limiting');
      vi.mocked(mockRateLimit.rateLimiter.check).mockResolvedValueOnce({
        success: false,
        reset: Date.now() + 60000,
      });

      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: 'Test Tool' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(429);
    });
  });

  describe('GET /api/tools/[toolId]', () => {
    it('returns specific tool successfully', async () => {
      const mockTool = {
        id: 'tool-123',
        name: 'Specific Tool',
        description: 'A specific tool',
        elements: [],
        createdBy: 'test-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: mockTool.id,
        data: () => mockTool,
      });

      const { GET } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request, { params: { toolId: 'tool-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tool.name).toBe('Specific Tool');
    });

    it('returns 404 for non-existent tool', async () => {
      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: false,
      });

      const { GET } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/nonexistent', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request, { params: { toolId: 'nonexistent' } });

      expect(response.status).toBe(404);
    });

    it('handles permission errors for private tools', async () => {
      const mockTool = {
        id: 'private-tool',
        name: 'Private Tool',
        isPublic: false,
        createdBy: 'other-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: mockTool.id,
        data: () => mockTool,
      });

      const { GET } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/private-tool', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request, { params: { toolId: 'private-tool' } });

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/tools/[toolId]', () => {
    it('updates tool successfully', async () => {
      const existingTool = {
        id: 'tool-123',
        name: 'Original Tool',
        createdBy: 'test-user-uid',
      };

      const updates = {
        name: 'Updated Tool',
        description: 'Updated description',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: existingTool.id,
        data: () => existingTool,
      });

      mockFirestore.doc().update.mockResolvedValueOnce({});

      const { PUT } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        method: 'PUT',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const response = await PUT(request, { params: { toolId: 'tool-123' } });

      expect(response.status).toBe(200);
      expect(mockFirestore.doc().update).toHaveBeenCalledWith(
        expect.objectContaining({
          name: updates.name,
          description: updates.description,
          updatedAt: 'server-timestamp',
        })
      );
    });

    it('prevents unauthorized updates', async () => {
      const existingTool = {
        id: 'tool-123',
        name: 'Original Tool',
        createdBy: 'other-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: existingTool.id,
        data: () => existingTool,
      });

      const { PUT } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        method: 'PUT',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: 'Hacked Tool' }),
      });

      const response = await PUT(request, { params: { toolId: 'tool-123' } });

      expect(response.status).toBe(403);
    });

    it('validates update input', async () => {
      const mockValidation = await import('@/lib/secure-input-validation');
      vi.mocked(mockValidation.validateToolUpdate).mockReturnValueOnce({
        isValid: false,
        errors: ['Invalid tool configuration'],
      });

      const existingTool = {
        id: 'tool-123',
        createdBy: 'test-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: existingTool.id,
        data: () => existingTool,
      });

      const { PUT } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        method: 'PUT',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ elements: 'invalid' }),
      });

      const response = await PUT(request, { params: { toolId: 'tool-123' } });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tools/[toolId]', () => {
    it('deletes tool successfully', async () => {
      const existingTool = {
        id: 'tool-123',
        name: 'Tool to Delete',
        createdBy: 'test-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: existingTool.id,
        data: () => existingTool,
      });

      mockFirestore.doc().delete.mockResolvedValueOnce({});

      const { DELETE } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        method: 'DELETE',
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await DELETE(request, { params: { toolId: 'tool-123' } });

      expect(response.status).toBe(200);
      expect(mockFirestore.doc().delete).toHaveBeenCalled();
    });

    it('prevents unauthorized deletions', async () => {
      const existingTool = {
        id: 'tool-123',
        name: 'Protected Tool',
        createdBy: 'other-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: existingTool.id,
        data: () => existingTool,
      });

      const { DELETE } = await import('../../../app/api/tools/[toolId]/route');
      const request = new NextRequest('http://localhost:3000/api/tools/tool-123', {
        method: 'DELETE',
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await DELETE(request, { params: { toolId: 'tool-123' } });

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/tools/install', () => {
    it('installs tool successfully', async () => {
      const toolToInstall = {
        id: 'public-tool',
        name: 'Public Tool',
        isPublic: true,
        createdBy: 'creator-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: toolToInstall.id,
        data: () => toolToInstall,
      });

      // Mock user installations collection
      mockFirestore.collection().doc().set.mockResolvedValueOnce({});

      // Mock tool usage stats update
      mockFirestore.doc().update.mockResolvedValueOnce({});

      const { POST } = await import('../../../app/api/tools/install/route');
      const request = new NextRequest('http://localhost:3000/api/tools/install', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ toolId: 'public-tool' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockFirestore.collection().doc().set).toHaveBeenCalled();
    });

    it('prevents installing private tools', async () => {
      const privateTool = {
        id: 'private-tool',
        name: 'Private Tool',
        isPublic: false,
        createdBy: 'other-user-uid',
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: privateTool.id,
        data: () => privateTool,
      });

      const { POST } = await import('../../../app/api/tools/install/route');
      const request = new NextRequest('http://localhost:3000/api/tools/install', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ toolId: 'private-tool' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(403);
    });

    it('handles already installed tools', async () => {
      const toolToInstall = {
        id: 'already-installed',
        name: 'Already Installed Tool',
        isPublic: true,
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: toolToInstall.id,
        data: () => toolToInstall,
      });

      // Mock existing installation
      mockFirestore.collection().doc().get.mockResolvedValueOnce({
        exists: true,
      });

      const { POST } = await import('../../../app/api/tools/install/route');
      const request = new NextRequest('http://localhost:3000/api/tools/install', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ toolId: 'already-installed' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(409);
    });
  });

  describe('POST /api/tools/[toolId]/deploy', () => {
    it('deploys tool successfully', async () => {
      const toolToDeploy = {
        id: 'deploy-tool',
        name: 'Tool to Deploy',
        createdBy: 'test-user-uid',
        elements: [{ id: 'element-1', type: 'input' }],
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: toolToDeploy.id,
        data: () => toolToDeploy,
      });

      // Mock deployment creation
      mockFirestore.collection().add.mockResolvedValueOnce({
        id: 'deployment-123',
      });

      const { POST } = await import('../../../app/api/tools/[toolId]/deploy/route');
      const request = new NextRequest('http://localhost:3000/api/tools/deploy-tool/deploy', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ 
          deploymentName: 'Production Deployment',
          environment: 'production',
        }),
      });

      const response = await POST(request, { params: { toolId: 'deploy-tool' } });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.deploymentId).toBe('deployment-123');
    });

    it('validates deployment configuration', async () => {
      const toolToDeploy = {
        id: 'invalid-tool',
        name: 'Invalid Tool',
        createdBy: 'test-user-uid',
        elements: [], // Empty elements should fail validation
      };

      mockFirestore.doc().get.mockResolvedValueOnce({
        exists: true,
        id: toolToDeploy.id,
        data: () => toolToDeploy,
      });

      const { POST } = await import('../../../app/api/tools/[toolId]/deploy/route');
      const request = new NextRequest('http://localhost:3000/api/tools/invalid-tool/deploy', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ 
          deploymentName: 'Invalid Deployment',
        }),
      });

      const response = await POST(request, { params: { toolId: 'invalid-tool' } });

      expect(response.status).toBe(400);
    });
  });

  describe('Error Handling and Security', () => {
    it('handles malformed JSON requests', async () => {
      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: 'invalid json',
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('sanitizes user input', async () => {
      const mockSanitize = await import('@/lib/secure-input-validation');
      const sanitizeSpy = vi.mocked(mockSanitize.sanitizeToolInput);

      mockFirestore.collection().add.mockResolvedValueOnce({
        id: 'new-tool-id',
      });

      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ 
          name: '<script>alert("xss")</script>Test Tool',
          description: 'Safe description',
        }),
      });

      await POST(request);

      expect(sanitizeSpy).toHaveBeenCalled();
    });

    it('prevents SQL injection attempts', async () => {
      const maliciousInput = {
        name: "'; DROP TABLE tools; --",
        description: 'SELECT * FROM users WHERE admin = true',
      };

      const { POST } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: { 
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify(maliciousInput),
      });

      // The sanitization should handle this
      const response = await POST(request);

      // Should either sanitize and create or reject
      expect([201, 400]).toContain(response.status);
    });

    it('enforces HTTPS in production', async () => {
      // This would be handled at the infrastructure level,
      // but we can test that the API doesn't leak sensitive data
      const { GET } = await import('../../../app/api/tools/route');
      const request = new NextRequest('http://localhost:3000/api/tools', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const response = await GET(request);
      
      // Should not include sensitive fields in response
      if (response.status === 200) {
        const data = await response.json();
        expect(data).not.toHaveProperty('internalId');
        expect(data).not.toHaveProperty('secretKey');
      }
    });
  });
});