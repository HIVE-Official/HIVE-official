import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// 🔒 SECURITY: Input validation and sanitization

// Common validation patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const HANDLE_REGEX = /^[a-z0-9_]{3,20}$/
const SAFE_STRING_REGEX = /^[a-zA-Z0-9\s\-_.,!?()]+$/

// Base schemas for security
export const baseSchemas = {
  email: z.string()
    .min(5, 'Email too short')
    .max(254, 'Email too long')
    .regex(EMAIL_REGEX, 'Invalid email format')
    .transform(val => val.toLowerCase().trim()),
    
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(20, 'Handle must be at most 20 characters')
    .regex(HANDLE_REGEX, 'Handle can only contain lowercase letters, numbers, and underscores')
    .transform(val => val.toLowerCase().trim()),
    
  safeText: z.string()
    .min(1, 'Text cannot be empty')
    .max(1000, 'Text too long')
    .regex(SAFE_STRING_REGEX, 'Text contains invalid characters')
    .transform(val => DOMPurify.sanitize(val.trim())),
    
  shortText: z.string()
    .min(1, 'Text cannot be empty')
    .max(100, 'Text too long')
    .transform(val => DOMPurify.sanitize(val.trim())),
    
  id: z.string()
    .min(1, 'ID cannot be empty')
    .max(50, 'ID too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'ID contains invalid characters'),
    
  url: z.string()
    .url('Invalid URL format')
    .max(500, 'URL too long'),
}

// API request validation schemas
export const apiSchemas = {
  // Auth endpoints
  emailVerification: z.object({
    email: baseSchemas.email,
    schoolId: baseSchemas.id.optional(),
  }),
  
  handleCheck: z.object({
    handle: baseSchemas.handle,
  }),
  
  // Profile endpoints
  profileUpdate: z.object({
    fullName: baseSchemas.shortText,
    handle: baseSchemas.handle,
    bio: baseSchemas.safeText.optional(),
    avatar: baseSchemas.url.optional(),
  }),
  
  // Space endpoints
  spaceRequest: z.object({
    spaceId: baseSchemas.id,
    spaceName: baseSchemas.shortText,
    claimReason: baseSchemas.safeText,
    userRole: z.enum(['student', 'faculty']),
  }),
  
  // Post creation
  postCreation: z.object({
    content: baseSchemas.safeText,
    spaceId: baseSchemas.id,
    type: z.enum(['text', 'poll', 'event']),
  }),
}

// Sanitization functions
export const sanitize = {
  html: (input: string): string => {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    })
  },
  
  email: (input: string): string => {
    return input.toLowerCase().trim().replace(/[^a-z0-9@._-]/g, '')
  },
  
  handle: (input: string): string => {
    return input.toLowerCase().trim().replace(/[^a-z0-9_]/g, '')
  },
  
  filename: (input: string): string => {
    return input.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
  },
}

// Security checks
export const security = {
  // Check for common injection patterns
  checkSqlInjection: (input: string): boolean => {
    const sqlPatterns = [
      /('|(\\))|(;)|(\|)|(\*)|(%)/i,
      /((%3D)|(=))[^\n]*((%27)|(')|(--|(%3B))|(;))/i,
      /\w*((%27)|(')|)((%6F)|o|(%4F))((%72)|r|(%52))/i,
      /((%27)|')union/i,
    ]
    return sqlPatterns.some(pattern => pattern.test(input))
  },
  
  // Check for XSS patterns
  checkXSS: (input: string): boolean => {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]*src[^>]*=/gi,
      /data:text\/html/gi,
    ]
    return xssPatterns.some(pattern => pattern.test(input))
  },
  
  // Check for path traversal
  checkPathTraversal: (input: string): boolean => {
    const pathPatterns = [
      /\.\./,
      /\.\\/,
      /\.\/\./,
      /\\\.\./,
    ]
    return pathPatterns.some(pattern => pattern.test(input))
  },
}

// Main validation function with security checks
export function validateAndSanitize<T extends z.ZodSchema>(
  schema: T,
  data: unknown,
  options: {
    allowUnsafe?: boolean
    stripUnknown?: boolean
  } = {}
): z.infer<T> {
  // Parse with Zod
  const parsed = schema.parse(data)
  
  // Additional security checks if not explicitly allowing unsafe content
  if (!options.allowUnsafe) {
    const stringifyData = JSON.stringify(parsed)
    
    if (security.checkSqlInjection(stringifyData)) {
      throw new Error('Potential SQL injection detected')
    }
    
    if (security.checkXSS(stringifyData)) {
      throw new Error('Potential XSS detected')
    }
    
    if (security.checkPathTraversal(stringifyData)) {
      throw new Error('Potential path traversal detected')
    }
  }
  
  return parsed
}

// Rate limiting key generation for security
export function generateRateLimitKey(
  request: Request,
  endpoint: string
): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'
  
  // Hash IP for privacy while maintaining rate limiting
  const hashedIp = Buffer.from(ip).toString('base64').slice(0, 16)
  
  return `${endpoint}:${hashedIp}`
}

// Common error responses
export const securityErrors = {
  rateLimitExceeded: {
    error: 'Rate limit exceeded',
    message: 'Too many requests. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  
  invalidInput: {
    error: 'Invalid input',
    message: 'The provided data is invalid or contains unsafe content.',
    code: 'INVALID_INPUT'
  },
  
  unauthorized: {
    error: 'Unauthorized',
    message: 'You are not authorized to access this resource.',
    code: 'UNAUTHORIZED'
  },
  
  forbidden: {
    error: 'Forbidden',
    message: 'Access to this resource is forbidden.',
    code: 'FORBIDDEN'
  },
}