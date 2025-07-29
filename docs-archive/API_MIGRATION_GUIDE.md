# API Migration Guide

This guide explains how to migrate existing API routes to use the new centralized API middleware system.

## Benefits of the New System

- **Consistent Security**: All routes automatically get security headers, CORS, and rate limiting
- **Centralized Authentication**: Unified auth handling with development bypass protection
- **Automatic Validation**: Built-in request validation with Zod schemas
- **Error Handling**: Standardized error responses and monitoring
- **Rate Limiting**: Redis-based rate limiting with fallback
- **Monitoring**: Automatic API call tracking and performance metrics
- **Type Safety**: Full TypeScript support with proper types

## Migration Examples

### Before: Manual API Route

```typescript
// OLD: Manual implementation with many security gaps
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    // Manual auth check (inconsistent across routes)
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Manual rate limiting (memory-based, doesn't scale)
    // ... rate limit logic
    
    // Business logic
    const result = await someBusinessLogic(email);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### After: Using New API Wrapper

```typescript
// NEW: Secure, standardized implementation
import { z } from 'zod';
import { createPostHandler } from '@/lib/api-wrapper';

const requestSchema = z.object({
  email: z.string().email('Valid email required')
});

export const POST = createPostHandler(async (context) => {
  const { email } = context.body; // Already validated!
  const userId = context.auth?.userId; // Authenticated user ID
  
  // Business logic only - security is handled by the wrapper
  const result = await someBusinessLogic(email, userId);
  
  return { success: true, data: result };
}, {
  auth: { required: true }, // Require authentication
  rateLimit: 'API', // Apply API rate limiting
  validation: { body: requestSchema } // Validate request body
});
```

## Available Wrappers

### 1. `createApiHandler` - Full Control

```typescript
import { createApiHandler } from '@/lib/api-wrapper';

export const POST = createApiHandler(async (context, params) => {
  // Your logic here
  return NextResponse.json({ message: 'Success' });
}, {
  auth: { required: true },
  rateLimit: 'AUTH',
  methods: ['POST'],
  validation: {
    body: z.object({ name: z.string() })
  }
});
```

### 2. `createPostHandler` - Simple POST Endpoints

```typescript
import { createPostHandler } from '@/lib/api-wrapper';

export const POST = createPostHandler(async (context) => {
  return { message: 'Hello', userId: context.auth?.userId };
}, {
  auth: { required: false },
  rateLimit: 'API'
});
```

### 3. `createCrudHandler` - Multiple Methods

```typescript
import { createCrudHandler } from '@/lib/api-wrapper';

export const { GET, POST, PUT, DELETE } = createCrudHandler({
  get: async (context) => ({ items: await getItems() }),
  post: async (context) => ({ item: await createItem(context.body) }),
  put: async (context) => ({ item: await updateItem(context.body) }),
  delete: async (context) => ({ success: await deleteItem(context.query.id) })
}, {
  auth: { required: true },
  rateLimit: 'API'
});
```

### 4. `createPublicHandler` - No Authentication

```typescript
import { createPublicHandler } from '@/lib/api-wrapper';

export const GET = createPublicHandler(async (context) => {
  return NextResponse.json({ status: 'healthy' });
}, {
  rateLimit: 'API'
});
```

### 5. `createAdminHandler` - Admin Only

```typescript
import { createAdminHandler } from '@/lib/api-wrapper';

export const POST = createAdminHandler(async (context) => {
  // Only admins can access this
  return NextResponse.json({ adminData: await getAdminData() });
}, {
  rateLimit: 'AUTH'
});
```

## Configuration Options

### Authentication Config

```typescript
auth: {
  required: boolean,           // Require valid authentication
  allowTestTokens: boolean,    // Allow dev tokens (auto-detected)
  allowAnonymous: boolean,     // Allow unauthenticated access
  operation: string            // Operation name for logging
}
```

### Rate Limiting Options

```typescript
rateLimit: 'AUTH' | 'MAGIC_LINK' | 'API'
```

- `AUTH`: 5 requests/minute (strict for auth operations)
- `MAGIC_LINK`: 3 requests/minute (very strict for magic links)  
- `API`: 100 requests/minute (generous for general API use)

### Validation Schemas

```typescript
validation: {
  body: z.ZodSchema,    // Validate request body (POST/PUT/PATCH)
  query: z.ZodSchema    // Validate query parameters (GET)
}
```

### Method Restrictions

```typescript
methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
```

## Context Object

The `context` object passed to your handler contains:

```typescript
interface ApiContext {
  request: NextRequest;        // Original Next.js request
  auth: AuthContext | null;    // Authenticated user info
  body?: any;                  // Validated request body
  query?: any;                 // Validated query parameters
  startTime: number;           // Request start timestamp
  requestId: string;           // Unique request ID
}

interface AuthContext {
  userId: string;              // User ID
  email?: string;              // User email
  isTestUser: boolean;         // Is this a development test user?
  isDevelopmentMode: boolean;  // Is this in development mode?
}
```

## Security Features

### Automatic Security Headers

All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (production)
- Content Security Policy
- CORS headers

### Development Bypass Protection

- Development tokens (`test-token`, `DEV_MODE`) are blocked in production
- Security alerts are logged for bypass attempts
- Centralized configuration prevents accidental exposure

### Rate Limiting

- Redis-based sliding window algorithm
- Automatic fallback to in-memory limiting
- Per-route configuration
- Proper error responses with retry headers

### Error Handling

- Consistent error response format
- Automatic error monitoring with Sentry
- Request ID tracking
- Development vs production error details

## Migration Checklist

1. **Install Dependencies**: Ensure `zod` is installed
2. **Import New Wrapper**: Replace manual implementations
3. **Define Schemas**: Create Zod schemas for validation
4. **Configure Options**: Set auth, rate limiting, and validation
5. **Update Handler**: Focus on business logic only
6. **Test Thoroughly**: Verify auth, validation, and rate limiting
7. **Remove Old Code**: Clean up manual implementations

## Common Patterns

### Protected User Route

```typescript
export const GET = createGetHandler(async (context) => {
  const user = await getUserById(context.auth!.userId);
  return { user };
}, {
  auth: { required: true },
  rateLimit: 'API'
});
```

### Admin Dashboard

```typescript
export const GET = createAdminHandler(async (context) => {
  const stats = await getAdminStats();
  return { stats };
}, {
  rateLimit: 'API'
});
```

### Public API

```typescript
export const GET = createPublicHandler(async (context) => {
  const publicData = await getPublicData();
  return { data: publicData };
}, {
  rateLimit: 'API'
});
```

### Form Submission

```typescript
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10)
});

export const POST = createPostHandler(async (context) => {
  const submission = await saveSubmission(context.body);
  return { id: submission.id };
}, {
  auth: { required: false },
  rateLimit: 'AUTH', // Stricter for form submissions
  validation: { body: schema }
});
```

## Benefits Summary

- ✅ **Security**: Comprehensive protection against common vulnerabilities
- ✅ **Consistency**: Standardized responses and error handling
- ✅ **Performance**: Efficient rate limiting and monitoring
- ✅ **Developer Experience**: Less boilerplate, more focus on business logic
- ✅ **Maintainability**: Centralized middleware makes updates easier
- ✅ **Type Safety**: Full TypeScript support with proper inference
- ✅ **Monitoring**: Built-in metrics and error tracking
- ✅ **Production Ready**: Designed for scale and security

Start migrating your most critical routes first, then gradually update the rest of your API endpoints.