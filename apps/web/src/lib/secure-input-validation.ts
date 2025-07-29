/**
 * COMPREHENSIVE INPUT VALIDATION with security-first design
 * Prevents injection attacks, validates all user inputs, and sanitizes data
 */

import { z } from 'zod';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment } from './env';

/**
 * Security-focused validation result
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  securityLevel: 'safe' | 'suspicious' | 'dangerous';
  sanitized?: Partial<T>;
}

/**
 * Security patterns for detecting malicious inputs
 */
const SECURITY_PATTERNS = {
  // SQL injection patterns
  SQL_INJECTION: [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(\-\-|\;|\|\||\/\*|\*\/)/,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
    /(CONCAT\s*\(|CHAR\s*\()/i
  ],
  
  // XSS patterns
  XSS: [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript\s*:/gi,
    /on\w+\s*=\s*["'][^"']*["']/gi,
    /<img[^>]+src\s*=\s*["']javascript:/gi
  ],
  
  // NoSQL injection patterns
  NOSQL_INJECTION: [
    /\$where/i,
    /\$regex/i,
    /\$ne/i,
    /\$gt/i,
    /\$lt/i,
    /\$or/i,
    /\$and/i,
    /\$not/i
  ],
  
  // Path traversal patterns
  PATH_TRAVERSAL: [
    /\.\.[\/\\]/,
    /[\/\\]\.\.[\/\\]/,
    /%2e%2e[\/\\]/i,
    /%252e%252e/i
  ],
  
  // Command injection patterns
  COMMAND_INJECTION: [
    /(\||&|;|`|\$\(|\${)/,
    /(wget|curl|nc|netcat|ping|nslookup)/i,
    /(rm|del|format|shutdown)/i
  ],
  
  // Email header injection
  EMAIL_INJECTION: [
    /(bcc\s*:|cc\s*:|to\s*:|from\s*:)/i,
    /\r|\n/,
    /%0d|%0a|%0D|%0A/i
  ]
} as const;

/**
 * Enhanced Zod schemas with security validation
 */
export const SecureSchemas = {
  /**
   * Secure email validation with domain checking
   */
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email too long')
    .email('Invalid email format')
    .refine((email) => {
      // Check for email injection patterns
      const hasInjection = SECURITY_PATTERNS.EMAIL_INJECTION.some(pattern => 
        pattern.test(email)
      );
      return !hasInjection;
    }, 'Invalid email format')
    .refine((email) => {
      // Validate domain part
      const domain = email.split('@')[1];
      if (!domain) return false;
      
      // Basic domain validation
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
      return domainPattern.test(domain);
    }, 'Invalid email domain'),

  /**
   * Secure handle validation (usernames, space handles)
   */
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(30, 'Handle must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Handle can only contain letters, numbers, underscores, and hyphens')
    .refine((handle) => {
      // Reserved handles
      const reserved = [
        'admin', 'root', 'api', 'www', 'mail', 'ftp', 'localhost',
        'test', 'dev', 'staging', 'production', 'app', 'web',
        'system', 'support', 'help', 'info', 'contact', 'about',
        'null', 'undefined', 'void', 'anonymous'
      ];
      return !reserved.includes(handle.toLowerCase());
    }, 'Handle is reserved')
    .transform((handle) => handle.toLowerCase()),

  /**
   * Secure name validation
   */
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters')
    .refine((name) => {
      // Check for suspicious patterns
      const suspicious = [
        /<[^>]*>/,  // HTML tags
        /javascript:/i,
        /data:/i,
        /vbscript:/i
      ];
      return !suspicious.some(pattern => pattern.test(name));
    }, 'Name contains invalid content'),

  /**
   * Secure text content validation (posts, descriptions)
   */
  textContent: z.string()
    .max(5000, 'Content too long')
    .refine((content) => {
      // Check for XSS patterns
      const hasXSS = SECURITY_PATTERNS.XSS.some(pattern => 
        pattern.test(content)
      );
      return !hasXSS;
    }, 'Content contains invalid markup')
    .refine((content) => {
      // Check for excessive special characters (potential encoding attacks)
      const specialCharCount = (content.match(/[<>'"&%$#@!]/g) || []).length;
      return specialCharCount / content.length < 0.1; // Less than 10% special chars
    }, 'Content has suspicious character patterns'),

  /**
   * Secure URL validation
   */
  url: z.string()
    .url('Invalid URL format')
    .refine((url) => {
      try {
        const parsed = new URL(url);
        // Only allow HTTP and HTTPS
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Only HTTP and HTTPS URLs are allowed')
    .refine((url) => {
      // Block potentially dangerous URLs
      const dangerous = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '192.168.',
        '10.',
        '172.'
      ];
      return !dangerous.some(pattern => url.includes(pattern));
    }, 'URL not allowed'),

  /**
   * Secure file path validation
   */
  filePath: z.string()
    .max(255, 'File path too long')
    .refine((path) => {
      // Check for path traversal
      const hasTraversal = SECURITY_PATTERNS.PATH_TRAVERSAL.some(pattern => 
        pattern.test(path)
      );
      return !hasTraversal;
    }, 'Invalid file path')
    .refine((path) => {
      // Only allow safe characters
      const safePattern = /^[a-zA-Z0-9\/_\-\.]+$/;
      return safePattern.test(path);
    }, 'File path contains invalid characters'),

  /**
   * Secure search query validation
   */
  searchQuery: z.string()
    .min(1, 'Search query required')
    .max(200, 'Search query too long')
    .refine((query) => {
      // Check for SQL injection patterns
      const hasSQL = SECURITY_PATTERNS.SQL_INJECTION.some(pattern => 
        pattern.test(query)
      );
      return !hasSQL;
    }, 'Invalid search query')
    .refine((query) => {
      // Check for NoSQL injection patterns
      const hasNoSQL = SECURITY_PATTERNS.NOSQL_INJECTION.some(pattern => 
        pattern.test(query)
      );
      return !hasNoSQL;
    }, 'Invalid search query'),

  /**
   * Secure ID validation (UUIDs, Firebase IDs)
   */
  id: z.string()
    .min(1, 'ID is required')
    .max(50, 'ID too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'ID contains invalid characters'),

  /**
   * Secure phone number validation
   */
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .refine((phone) => {
      // Remove common formatting and validate length
      const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
      return cleaned.length >= 10 && cleaned.length <= 15;
    }, 'Phone number length invalid'),

  /**
   * Secure password validation
   */
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .refine((password) => {
      // Must contain lowercase, uppercase, number
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      return hasLower && hasUpper && hasNumber;
    }, 'Password must contain uppercase, lowercase, and number'),

  /**
   * Secure token validation
   */
  token: z.string()
    .min(10, 'Token too short')
    .max(500, 'Token too long')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Token contains invalid characters')
    .refine((token) => {
      // Block development tokens in production
      if (currentEnvironment === 'production') {
        const devTokens = [
          'test-token', 'dev-token', 'development-token',
          'bypass-token', 'admin-token', 'debug-token', 'DEV_MODE'
        ];
        return !devTokens.includes(token);
      }
      return true;
    }, 'Invalid token format')
};

/**
 * Advanced security scanner for input content
 */
export class SecurityScanner {
  /**
   * Scan input for security threats
   */
  static scanInput(input: string, context: string = 'general'): {
    level: 'safe' | 'suspicious' | 'dangerous';
    threats: string[];
    sanitized: string;
  } {
    const threats: string[] = [];
    let level: 'safe' | 'suspicious' | 'dangerous' = 'safe';

    // Check each security pattern category
    Object.entries(SECURITY_PATTERNS).forEach(([category, patterns]) => {
      const hasMatch = patterns.some(pattern => pattern.test(input));
      if (hasMatch) {
        threats.push(category.toLowerCase());
        level = category === 'XSS' || category === 'SQL_INJECTION' ? 'dangerous' : 'suspicious';
      }
    });

    // Additional threat detection
    if (input.length > 10000) {
      threats.push('excessive_length');
      level = 'suspicious';
    }

    // Check for encoded attacks
    if (/%[0-9a-f]{2}/i.test(input)) {
      const decoded = decodeURIComponent(input);
      if (decoded !== input) {
        const decodedScan = this.scanInput(decoded, context);
        if (decodedScan.level !== 'safe') {
          threats.push('encoded_attack');
          level = 'dangerous';
        }
      }
    }

    // Sanitize the input
    const sanitized = this.sanitizeInput(input);

    return { level, threats, sanitized };
  }

  /**
   * Sanitize input by removing/escaping dangerous content
   */
  static sanitizeInput(input: string): string {
    return input
      // Remove script tags
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      // Remove iframe tags
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      // Remove javascript: URLs
      .replace(/javascript\s*:/gi, '')
      // Remove event handlers
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      // Remove control characters
      .replace(/[\x00-\x1F\x7F]/g, '')
      // Trim whitespace
      .trim();
  }
}

/**
 * Comprehensive validation function with security scanning
 */
export async function validateWithSecurity<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context: {
    operation: string;
    userId?: string;
    ip?: string;
  }
): Promise<ValidationResult<T>> {
  try {
    // First, scan for security threats if data is string-based
    let securityLevel: 'safe' | 'suspicious' | 'dangerous' = 'safe';
    const threats: string[] = [];
    const sanitized: any = {};

    if (typeof data === 'object' && data !== null) {
      // Scan string fields for security threats
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          const scan = SecurityScanner.scanInput(value, key);
          sanitized[key] = scan.sanitized;
          
          if (scan.level === 'dangerous') {
            securityLevel = 'dangerous';
          } else if (scan.level === 'suspicious' && securityLevel !== 'dangerous') {
            securityLevel = 'suspicious';
          }
          
          threats.push(...scan.threats);
        } else {
          sanitized[key] = value;
        }
      }
    }

    // Log security events for suspicious/dangerous inputs
    if (securityLevel !== 'safe') {
      await logSecurityEvent('input_validation', {
        operation: `suspicious_input_${context.operation}`,
        tags: {
          securityLevel,
          threats: threats.join(','),
          userId: context.userId || 'anonymous',
          ip: context.ip || 'unknown'
        }
      });
    }

    // Validate with Zod schema
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
        securityLevel,
        sanitized: sanitized as Partial<T>
      };
    } else {
      // Format Zod errors
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }));

      return {
        success: false,
        errors,
        securityLevel,
        sanitized: sanitized as Partial<T>
      };
    }
  } catch (error) {
    console.error('Validation error:', error);
    
    return {
      success: false,
      errors: [{
        field: 'general',
        message: 'Validation failed',
        code: 'VALIDATION_ERROR'
      }],
      securityLevel: 'dangerous'
    };
  }
}

/**
 * Middleware for request validation
 */
export function createValidationMiddleware<T>(
  schema: z.ZodSchema<T>,
  options: {
    validateBody?: boolean;
    validateQuery?: boolean;
    requireAuth?: boolean;
  } = {}
) {
  return async (request: Request, context: any = {}) => {
    const { validateBody = true, validateQuery = false } = options;
    const results: ValidationResult<any>[] = [];

    if (validateBody && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        const body = await request.json();
        const result = await validateWithSecurity(body, schema, {
          operation: 'request_body',
          userId: context.userId,
          ip: request.headers.get('x-forwarded-for') || undefined
        });
        results.push(result);
        
        if (!result.success || result.securityLevel === 'dangerous') {
          throw new Error('Request validation failed');
        }
      } catch (error) {
        throw new Error('Invalid request body');
      }
    }

    if (validateQuery) {
      const url = new URL(request.url);
      const queryParams = Object.fromEntries(url.searchParams.entries());
      
      const result = await validateWithSecurity(queryParams, schema, {
        operation: 'query_params',
        userId: context.userId,
        ip: request.headers.get('x-forwarded-for') || undefined
      });
      results.push(result);
      
      if (!result.success || result.securityLevel === 'dangerous') {
        throw new Error('Query parameter validation failed');
      }
    }

    return results[0]?.data;
  };
}

/**
 * Common validation schemas for API endpoints
 */
export const ApiSchemas = {
  // Authentication
  magicLinkRequest: z.object({
    email: SecureSchemas.email,
    redirectTo: SecureSchemas.url.optional()
  }),

  magicLinkVerify: z.object({
    token: SecureSchemas.token,
    email: SecureSchemas.email.optional()
  }),

  // User management
  userRegistration: z.object({
    email: SecureSchemas.email,
    handle: SecureSchemas.handle,
    name: SecureSchemas.name,
    phone: SecureSchemas.phone.optional()
  }),

  userUpdate: z.object({
    name: SecureSchemas.name.optional(),
    handle: SecureSchemas.handle.optional(),
    bio: SecureSchemas.textContent.optional()
  }),

  // Content creation
  postCreation: z.object({
    title: z.string().min(1).max(200).refine((content) => {
      // Check for XSS patterns
      const hasXSS = SECURITY_PATTERNS.XSS.some(pattern => 
        pattern.test(content)
      );
      return !hasXSS;
    }, 'Title contains invalid markup'),
    content: SecureSchemas.textContent,
    spaceId: SecureSchemas.id,
    tags: z.array(z.string().max(50)).max(10).optional()
  }),

  // Space management
  spaceCreation: z.object({
    name: SecureSchemas.name,
    handle: SecureSchemas.handle,
    description: SecureSchemas.textContent.optional(),
    isPrivate: z.boolean().default(false)
  }),

  // Search
  search: z.object({
    query: SecureSchemas.searchQuery,
    type: z.enum(['users', 'spaces', 'posts']).default('posts'),
    limit: z.number().min(1).max(50).default(20)
  })
} as const;