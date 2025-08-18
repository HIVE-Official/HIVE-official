import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// import { logger } from '@hive/core'; // Removed - not currently used

// Comprehensive error categorization
const ERROR_TYPES = {
  // Critical errors that need immediate attention
  CRITICAL: {
    AUTH_FAILURE: 'auth_failure',
    DATABASE_ERROR: 'database_error', 
    PAYMENT_ERROR: 'payment_error',
    SECURITY_BREACH: 'security_breach'
  },
  // User experience errors
  UX: {
    VALIDATION_ERROR: 'validation_error',
    NETWORK_TIMEOUT: 'network_timeout',
    RATE_LIMIT: 'rate_limit_exceeded',
    NOT_FOUND: 'resource_not_found'
  },
  // Development/build errors
  DEV: {
    HYDRATION_MISMATCH: 'hydration_mismatch',
    COMPONENT_ERROR: 'component_error',
    BUILD_ERROR: 'build_error',
    TYPE_ERROR: 'type_error'
  },
  // External service errors
  EXTERNAL: {
    API_ERROR: 'external_api_error',
    CDN_ERROR: 'cdn_error',
    THIRD_PARTY: 'third_party_error'
  },
  // Bot/crawler noise
  IGNORABLE: {
    BOT_ERROR: 'bot_error',
    SCREENSHOT_ERROR: 'screenshot_error',
    CRAWLER_ERROR: 'crawler_error'
  }
} as const;

// Specific error patterns with smart categorization
const ERROR_PATTERNS = [
  // Critical patterns - need immediate attention
  {
    category: ERROR_TYPES.CRITICAL.AUTH_FAILURE,
    patterns: [/authentication failed/i, /unauthorized/i, /invalid token/i, /session expired/i],
    priority: 'critical',
    shouldAlert: true
  },
  {
    category: ERROR_TYPES.CRITICAL.DATABASE_ERROR,
    patterns: [/database connection/i, /firestore.*error/i, /transaction failed/i],
    priority: 'critical',
    shouldAlert: true
  },
  {
    category: ERROR_TYPES.CRITICAL.SECURITY_BREACH,
    patterns: [/xss/i, /csrf/i, /injection/i, /security/i],
    priority: 'critical',
    shouldAlert: true
  },

  // UX patterns - impact user experience
  {
    category: ERROR_TYPES.UX.VALIDATION_ERROR,
    patterns: [/validation.*failed/i, /invalid.*input/i, /required field/i],
    priority: 'high',
    shouldAlert: false
  },
  {
    category: ERROR_TYPES.UX.NETWORK_TIMEOUT,
    patterns: [/timeout/i, /network.*error/i, /connection.*refused/i],
    priority: 'medium',
    shouldAlert: false
  },
  {
    category: ERROR_TYPES.UX.NOT_FOUND,
    patterns: [/404/i, /not found/i, /does not exist/i],
    priority: 'low',
    shouldAlert: false
  },

  // Dev patterns - development issues
  {
    category: ERROR_TYPES.DEV.HYDRATION_MISMATCH,
    patterns: [/hydration/i, /server.*client.*mismatch/i],
    priority: 'medium',
    shouldAlert: false
  },
  {
    category: ERROR_TYPES.DEV.COMPONENT_ERROR,
    patterns: [/react.*children/i, /cannot read prop/i, /undefined.*not.*function/i],
    priority: 'medium',
    shouldAlert: false
  },
  {
    category: ERROR_TYPES.DEV.TYPE_ERROR,
    patterns: [/typescript/i, /type.*error/i, /cannot access before initialization/i],
    priority: 'low',
    shouldAlert: false
  },

  // External service patterns
  {
    category: ERROR_TYPES.EXTERNAL.API_ERROR,
    patterns: [/api.*error/i, /external.*service/i, /upstream.*error/i],
    priority: 'medium',
    shouldAlert: false
  },

  // Ignorable patterns - bot/crawler noise
  {
    category: ERROR_TYPES.IGNORABLE.SCREENSHOT_ERROR,
    patterns: [/vercel.*screenshot/i, /screenshot.*failed/i, /headless.*chrome/i],
    priority: 'ignore',
    shouldAlert: false
  },
  {
    category: ERROR_TYPES.IGNORABLE.BOT_ERROR,
    patterns: [/bot/i, /crawler/i, /spider/i, /scraper/i],
    priority: 'ignore',
    shouldAlert: false
  }
];

// Enhanced error metadata schema
const ErrorMetadataSchema = z.object({
  type: z.string().default('unknown'),
  priority: z.enum(['critical', 'high', 'medium', 'low', 'ignore']).default('medium'),
  category: z.string().default('unknown'),
  shouldAlert: z.boolean().default(false),
  componentStack: z.string().optional(),
  location: z.string().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString()),
  userId: z.string().optional(),
  sessionId: z.string().nullable().optional(),
  userAgent: z.string().optional(),
  url: z.string().optional(),
  tags: z.array(z.string()).default([]),
  context: z.record(z.unknown()).default({})
});

// Streamlined error payload schema
const ErrorPayloadSchema = z.object({
  name: z.string().default('UnknownError'),
  message: z.string().default('No error message provided'),
  stack: z.string().optional(),
  metadata: ErrorMetadataSchema.default({})
});

// Smart error categorization
function categorizeError(error: { name: string; message: string; stack?: string }, userAgent?: string): {
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'ignore';
  shouldAlert: boolean;
} {
  const fullErrorText = `${error.name} ${error.message} ${error.stack || ''}`.toLowerCase();
  
  // Check user agent first for bot detection
  if (userAgent) {
    const botPatterns = [/bot/i, /crawler/i, /spider/i, /vercel.*screenshot/i, /headless/i];
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      return {
        category: ERROR_TYPES.IGNORABLE.BOT_ERROR,
        priority: 'ignore',
        shouldAlert: false
      };
    }
  }

  // Match against specific patterns
  for (const pattern of ERROR_PATTERNS) {
    if (pattern.patterns.some(regex => regex.test(fullErrorText))) {
      return {
        category: pattern.category,
        priority: pattern.priority as 'critical' | 'high' | 'medium' | 'low' | 'ignore',
        shouldAlert: pattern.shouldAlert
      };
    }
  }

  // Default categorization for unknown errors
  return {
    category: 'unknown_error',
    priority: 'medium',
    shouldAlert: false
  };
}

// Simplified rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMITS = {
  critical: { max: 50, window: 5 * 60 * 1000 }, // 50 critical errors per 5 minutes
  high: { max: 100, window: 10 * 60 * 1000 },   // 100 high priority per 10 minutes
  medium: { max: 200, window: 15 * 60 * 1000 }, // 200 medium priority per 15 minutes
  low: { max: 500, window: 30 * 60 * 1000 },    // 500 low priority per 30 minutes
  ignore: { max: 10, window: 60 * 1000 }        // 10 ignored errors per minute
};

function checkRateLimit(ip: string, priority: keyof typeof RATE_LIMITS): boolean {
  const now = Date.now();
  const limit = RATE_LIMITS[priority];
  const key = `${ip}:${priority}`;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + limit.window });
    return true;
  }

  if (current.count >= limit.max) {
    return false;
  }

  current.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
         request.headers.get("x-real-ip") ||
         request.headers.get("cf-connecting-ip") ||
         "unknown";
}

// Enhanced logging with structured data
function logError(errorData: z.infer<typeof ErrorPayloadSchema>) {
  const { priority, category, shouldAlert } = errorData.metadata;
  
  // Use different log levels based on priority
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: priority === 'critical' ? 'error' : priority === 'high' ? 'warn' : 'info',
    category,
    priority,
    shouldAlert,
    error: {
      name: errorData.name,
      message: errorData.message,
      stack: errorData.stack
    },
    context: errorData.metadata.context,
    user: {
      id: errorData.metadata.userId,
      sessionId: errorData.metadata.sessionId,
      userAgent: errorData.metadata.userAgent,
      url: errorData.metadata.url
    }
  };

  // Log with appropriate level
  if (priority === 'critical') {
    console.error('[CRITICAL ERROR]', JSON.stringify(logEntry, null, 2));
  } else if (priority === 'high') {
    console.warn('[HIGH PRIORITY ERROR]', JSON.stringify(logEntry, null, 2));
  } else if (priority !== 'ignore') {
    
  }

  // In production, you'd send critical/high priority errors to monitoring services
  if (shouldAlert && process.env.NODE_ENV === 'production') {
    // Send to Sentry, DataDog, etc.
    // await sendToMonitoringService(logEntry);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';

    // Parse request body
    const body = await request.json() as unknown;
    
    let validatedError;
    try {
      validatedError = ErrorPayloadSchema.parse(body);
    } catch (validationError) {
      console.warn('Invalid error payload received:', validationError);
      return NextResponse.json(
        { error: 'Invalid error payload format' },
        { status: 400 }
      );
    }

    // Smart categorization
    const errorCategory = categorizeError(validatedError, userAgent);
    
    // Early return for ignored errors
    if (errorCategory.priority === 'ignore') {
      return NextResponse.json({ status: 'ignored', reason: 'bot_or_crawler' });
    }

    // Apply priority-based rate limiting
    if (!checkRateLimit(ip, errorCategory.priority)) {
      const retryAfter = Math.ceil(RATE_LIMITS[errorCategory.priority].window / 1000);
      return NextResponse.json(
        { 
          error: "Rate limit exceeded for error priority",
          priority: errorCategory.priority,
          retryAfter
        },
        { status: 429 }
      );
    }

    // Enhance metadata with categorization results
    const enhancedError = {
      ...validatedError,
      metadata: {
        ...validatedError.metadata,
        ...errorCategory,
        userAgent,
        url: request.headers.get('referer') || '',
        ip: ip !== 'unknown' ? ip : undefined,
        context: {
          ...validatedError.metadata.context,
          timestamp: new Date().toISOString()
        }
      }
    };

    // Log the error with enhanced context
    logError(enhancedError);

    // Return success with error ID for tracking
    const errorId = `${errorCategory.priority}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    return NextResponse.json({ 
      status: 'logged',
      id: errorId,
      category: errorCategory.category,
      priority: errorCategory.priority
    });

  } catch (error) {
    // Handle errors in the error handler
    console.error('Error handler failed:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { error: 'Error handler internal error' },
      { status: 500 }
    );
  }
}

// Clean up rate limit store periodically
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000); // Clean up every 5 minutes
}

// Helper functions
function _isKnownBotError(_error: z.infer<typeof ErrorPayloadSchema>, _headers: Headers): boolean {
  const userAgent = _headers.get('user-agent') || '';
  
  // Ignore Vercel bot errors
  if (userAgent.includes('Vercel') && _error.message.includes('Screenshot')) {
    return true;
  }

  // Add more bot detection logic as needed
  return false;
}

function _isCriticalError(_error: z.infer<typeof ErrorPayloadSchema>): boolean {
  // Define what constitutes a critical error
  const criticalPatterns = [
    'FATAL',
    'CRITICAL',
    'SECURITY',
    'AUTHENTICATION_FAILED',
    'DATABASE_CONNECTION_ERROR'
  ];

  return criticalPatterns.some(pattern => 
    _error.message.includes(pattern) || _error.name.includes(pattern)
  );
}

async function _storeError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Implement error storage logic (e.g., Firebase, PostgreSQL)
  // This is where you'd store the error for later analysis
}

async function _notifyErrorService(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Implement notification logic for critical errors
  // This could be sending to Slack, email, or other monitoring services
}

async function _handleReactError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for React errors
  // e.g., tracking component error patterns
}

async function _handleApiError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for API errors
  // e.g., tracking API endpoint error patterns
}

async function _handleValidationError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for validation errors
  // e.g., tracking validation pattern failures
} 