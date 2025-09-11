import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Comprehensive API Validation System
 * Provides strict input validation for all API endpoints
 */

// Common validation schemas
export const schemas = {
  // ID validations
  userId: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  spaceId: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  postId: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  eventId: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  toolId: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  
  // Content validations
  title: z.string().min(1).max(200).trim(),
  description: z.string().min(1).max(2000).trim(),
  content: z.string().min(1).max(10000).trim(),
  
  // Email validation
  email: z.string().email().toLowerCase().max(255),
  buffaloEmail: z.string().email().endsWith('@buffalo.edu').toLowerCase(),
  
  // URL validation
  url: z.string().url().max(2048),
  imageUrl: z.string().url().max(2048).regex(/\.(jpg|jpeg|png|gif|webp)$/i),
  
  // File upload validation
  fileUpload: z.object({
    name: z.string().max(255),
    type: z.string().regex(/^(image|video|audio|application)\//),
    size: z.number().max(10 * 1024 * 1024), // 10MB max
  }),
  
  // Pagination
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
  
  // Date range
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
};

// API endpoint validation schemas
export const apiSchemas = {
  // Space endpoints
  createSpace: z.object({
    name: schemas.title,
    description: schemas.description,
    type: z.enum(['academic', 'social', 'professional', 'residential']),
    privacy: z.enum(['public', 'private', 'invite-only']),
    tags: z.array(z.string()).max(10).optional(),
  }),
  
  joinSpace: z.object({
    spaceId: schemas.spaceId,
    message: z.string().max(500).optional(),
  }),
  
  // Post endpoints
  createPost: z.object({
    spaceId: schemas.spaceId,
    title: schemas.title.optional(),
    content: schemas.content,
    type: z.enum(['discussion', 'question', 'announcement', 'poll', 'link']),
    images: z.array(schemas.imageUrl).max(4).optional(),
    pollOptions: z.array(z.string().max(200)).min(2).max(6).optional(),
    linkUrl: schemas.url.optional(),
  }),
  
  updatePost: z.object({
    title: schemas.title.optional(),
    content: schemas.content.optional(),
    images: z.array(schemas.imageUrl).max(4).optional(),
  }),
  
  // Event endpoints
  createEvent: z.object({
    spaceId: schemas.spaceId,
    title: schemas.title,
    description: schemas.description,
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    location: z.string().max(500),
    maxAttendees: z.number().int().min(1).max(10000).optional(),
    isOnline: z.boolean(),
    meetingUrl: schemas.url.optional(),
  }),
  
  rsvpEvent: z.object({
    eventId: schemas.eventId,
    status: z.enum(['attending', 'maybe', 'not-attending']),
  }),
  
  // Profile endpoints
  updateProfile: z.object({
    displayName: z.string().min(1).max(100).optional(),
    bio: z.string().max(500).optional(),
    major: z.string().max(100).optional(),
    year: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).optional(),
    interests: z.array(z.string()).max(20).optional(),
    privacy: z.object({
      showEmail: z.boolean().optional(),
      showSchedule: z.boolean().optional(),
      showSpaces: z.boolean().optional(),
    }).optional(),
  }),
  
  // Tool endpoints
  createTool: z.object({
    name: schemas.title,
    description: schemas.description,
    category: z.enum(['productivity', 'social', 'academic', 'utility']),
    config: z.record(z.unknown()).optional(),
    isPublic: z.boolean().default(false),
  }),
  
  installTool: z.object({
    toolId: schemas.toolId,
    spaceId: schemas.spaceId.optional(),
  }),
  
  // Comment endpoints
  createComment: z.object({
    postId: schemas.postId,
    content: z.string().min(1).max(1000).trim(),
    parentCommentId: z.string().optional(),
  }),
  
  // Search endpoints
  search: z.object({
    query: z.string().min(1).max(200).trim(),
    type: z.enum(['all', 'spaces', 'posts', 'events', 'users', 'tools']).optional(),
    filters: z.object({
      spaceId: schemas.spaceId.optional(),
      userId: schemas.userId.optional(),
      dateRange: schemas.dateRange.optional(),
      tags: z.array(z.string()).optional(),
    }).optional(),
    ...schemas.pagination.shape,
  }),
};

/**
 * Validate request body against schema
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ data?: T; error?: NextResponse }> {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    return { data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: NextResponse.json(
          {
            error: 'Validation Error',
            message: 'Invalid request data',
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
          { status: 400 }
        ),
      };
    }
    return {
      error: NextResponse.json(
        { error: 'Bad Request', message: 'Invalid JSON body' },
        { status: 400 }
      ),
    };
  }
}

/**
 * Validate query parameters
 */
export function validateQuery<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): { data?: T; error?: string } {
  try {
    const params: any = {};
    searchParams.forEach((value, key) => {
      // Handle array parameters
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      } else {
        params[key] = value;
      }
    });
    
    // Convert numeric strings to numbers where expected
    if (params.page) params.page = parseInt(params.page);
    if (params.limit) params.limit = parseInt(params.limit);
    
    const validated = schema.parse(params);
    return { data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Invalid query parameters' };
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' };
  }
  
  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const expectedExtensions: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'application/pdf': ['pdf'],
    'text/plain': ['txt'],
  };
  
  const validExtensions = expectedExtensions[file.type];
  if (validExtensions && extension && !validExtensions.includes(extension)) {
    return { valid: false, error: 'File extension does not match file type' };
  }
  
  return { valid: true };
}

/**
 * Rate limit key generator
 */
export function getRateLimitKey(request: NextRequest, userId?: string): string {
  const ip = request.headers.get('x-forwarded-for') || (request.headers?.['x-forwarded-for'] || request.headers?.['x-real-ip'] || 'unknown') || 'unknown';
  const route = request.nextUrl.pathname;
  return userId ? `user:${userId}:${route}` : `ip:${ip}:${route}`;
}

/**
 * Validate ownership of resource
 */
export async function validateOwnership(
  resourceType: 'post' | 'space' | 'event' | 'tool',
  resourceId: string,
  userId: string,
  db: any // Firestore instance
): Promise<boolean> {
  try {
    const doc = await db.collection(`${resourceType}s`).doc(resourceId).get();
    if (!doc.exists) return false;
    
    const data = doc.data();
    return data.ownerId === userId || data.createdBy === userId;
  } catch {
    return false;
  }
}

/**
 * Validate permissions for action
 */
export async function validatePermission(
  action: string,
  spaceId: string,
  userId: string,
  db: any // Firestore instance
): Promise<boolean> {
  try {
    // Check if user is member of space
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();
      
    if (!memberDoc.exists) return false;
    
    const member = memberDoc.data();
    const role = member.role || 'member';
    
    // Define permission matrix
    const permissions: Record<string, string[]> = {
      'create-post': ['member', 'moderator', 'admin', 'owner'],
      'delete-post': ['moderator', 'admin', 'owner'],
      'create-event': ['moderator', 'admin', 'owner'],
      'delete-event': ['admin', 'owner'],
      'manage-members': ['admin', 'owner'],
      'configure-space': ['owner'],
    };
    
    const allowedRoles = permissions[action] || [];
    return allowedRoles.includes(role);
  } catch {
    return false;
  }
}

// Export validation middleware
export const validation = {
  schemas,
  apiSchemas,
  validateRequest,
  validateQuery,
  sanitizeInput,
  validateFileUpload,
  getRateLimitKey,
  validateOwnership,
  validatePermission,
};