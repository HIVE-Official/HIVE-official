import { NextRequest } from 'next/server';
import { POST } from './route';

// Mock Firebase modules
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  writeBatch: jest.fn(),
  serverTimestamp: jest.fn(() => 'MOCK_TIMESTAMP'),
  increment: jest.fn((value) => ({ _increment: value })),
}));

jest.mock('@/lib/firebase', () => ({
  db: 'MOCK_DB',
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

// Mock Zod schema
jest.mock('zod', () => ({
  z: {
    object: jest.fn(() => ({
      parse: jest.fn(),
    })),
    string: jest.fn(() => ({
      min: jest.fn(() => ({})),
    })),
  },
}));

describe('/api/spaces/join', () => {
  const mockVerifyIdToken = jest.fn();
  const mockGetDoc = jest.fn();
  const mockWriteBatch = jest.fn();
  const mockParse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    require('firebase-admin/auth').getAuth.mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
    });
    
    require('firebase/firestore').getDoc.mockImplementation(mockGetDoc);
    require('firebase/firestore').writeBatch.mockImplementation(mockWriteBatch);
    require('zod').z.object.mockReturnValue({
      parse: mockParse,
    });
  });

  it('should successfully join a space', async () => {
    // Mock valid authentication
    mockVerifyIdToken.mockResolvedValue({ uid: 'user123' });
    
    // Mock valid request body
    mockParse.mockReturnValue({ spaceId: 'space123' });
    
    // Mock space exists and is joinable
    mockGetDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          name: 'Test Space',
          type: 'major',
          status: 'activated',
          schoolId: 'ub',
        }),
      })
      // Mock user is not already a member
      .mockResolvedValueOnce({
        exists: () => false,
      })
      // Mock user data
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          schoolId: 'ub',
        }),
      });

    // Mock batch operations
    const mockCommit = jest.fn().mockResolvedValue(undefined);
    const mockSet = jest.fn();
    const mockUpdate = jest.fn();
    
    mockWriteBatch.mockReturnValue({
      set: mockSet,
      update: mockUpdate,
      commit: mockCommit,
    });

    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer valid-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'space123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Successfully joined the space');
    expect(mockCommit).toHaveBeenCalled();
  });

  it('should reject unauthenticated requests', async () => {
    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'space123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Missing or invalid authorization header');
  });

  it('should reject invalid tokens', async () => {
    mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'));

    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer invalid-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'space123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid or expired token');
  });

  it('should reject when space not found', async () => {
    mockVerifyIdToken.mockResolvedValue({ uid: 'user123' });
    mockParse.mockReturnValue({ spaceId: 'nonexistent' });
    
    // Mock space doesn't exist
    mockGetDoc.mockResolvedValueOnce({
      exists: () => false,
    });

    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer valid-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'nonexistent' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Space not found');
  });

  it('should reject joining frozen spaces', async () => {
    mockVerifyIdToken.mockResolvedValue({ uid: 'user123' });
    mockParse.mockReturnValue({ spaceId: 'space123' });
    
    // Mock frozen space
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        name: 'Frozen Space',
        type: 'major',
        status: 'frozen',
        schoolId: 'ub',
      }),
    });

    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer valid-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'space123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe('This space is currently frozen and not accepting new members');
  });

  it('should reject if user is already a member', async () => {
    mockVerifyIdToken.mockResolvedValue({ uid: 'user123' });
    mockParse.mockReturnValue({ spaceId: 'space123' });
    
    mockGetDoc
      // Mock space exists and is joinable
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          name: 'Test Space',
          type: 'major',
          status: 'activated',
          schoolId: 'ub',
        }),
      })
      // Mock user is already a member
      .mockResolvedValueOnce({
        exists: () => true,
      });

    const request = new NextRequest('http://localhost/api/spaces/join', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer valid-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ spaceId: 'space123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe('You are already a member of this space');
  });
}); 