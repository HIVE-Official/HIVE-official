# Structured Logging Guide

This guide explains how to use the structured logging system in HIVE for consistent, searchable, and actionable logs.

## Overview

The structured logging system provides:
- **Environment-aware logging**: Different log levels and behaviors per environment
- **Centralized configuration**: Consistent logging across all components
- **Security-conscious**: Automatic PII masking and sensitive data protection
- **Integration-ready**: Works with Sentry, DataDog, CloudWatch, etc.
- **Performance tracking**: Built-in performance metrics and slow request detection
- **Request correlation**: Automatic request ID tracking for distributed tracing

## Basic Usage

### Import the Logger

```typescript
import { logger, authLogger, apiLogger, securityLogger } from '@/lib/structured-logger';
```

### Simple Logging

```typescript
// Basic log levels
await logger.info('User profile updated');
await logger.warn('Rate limit approaching');
await logger.error('Database connection failed', {}, error);

// With context
await logger.info('User logged in', {
  userId: 'user-123',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...'
});
```

### Specialized Loggers

```typescript
// Authentication events
await authLogger.info('Password reset requested', {
  userId: 'user-123',
  email: 'user@example.com'
});

// API requests
await apiLogger.info('API endpoint called', {
  operation: 'create_post',
  duration: 150,
  requestId: 'req-456'
});

// Security events
await securityLogger.warn('Suspicious login attempt', {
  ip: '192.168.1.1',
  failedAttempts: 5
});
```

## API Integration

### Using with API Wrapper

The new API wrapper automatically provides a logger instance:

```typescript
import { createPostHandler } from '@/lib/api-wrapper';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email()
});

export const POST = createPostHandler(async (context) => {
  // Logger is automatically available in context
  await context.logger.info('Creating new user', {
    operation: 'user_creation',
    email: context.body.email
  });

  try {
    const user = await createUser(context.body);
    
    await context.logger.info('User created successfully', {
      userId: user.id,
      operation: 'user_creation'
    });
    
    return { user };
  } catch (error) {
    await context.logger.error('Failed to create user', {
      operation: 'user_creation',
      email: context.body.email
    }, error);
    
    throw error;
  }
}, {
  validation: { body: schema },
  auth: { required: false }
});
```

### Manual Request Logger

For routes not using the API wrapper:

```typescript
import { createRequestLogger } from '@/lib/structured-logger';

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || 'req-' + Date.now();
  const logger = createRequestLogger(requestId);
  
  await logger.info('Processing request', {
    operation: 'manual_endpoint'
  });
  
  // Your logic here
}
```

## Convenience Functions

### Authentication Events

```typescript
import { logAuthEvent } from '@/lib/structured-logger';

// Log login attempt
await logAuthEvent('login', {
  userId: 'user-123',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...'
});

// Log failed authentication
await logAuthEvent('failed_login', {
  email: 'user@example.com',
  reason: 'invalid_password',
  ip: '192.168.1.1'
});
```

### API Call Tracking

```typescript
import { logApiCall } from '@/lib/structured-logger';

// Automatically called by API wrapper, but can be used manually
await logApiCall('POST', '/api/users', 201, 150, {
  userId: 'user-123',
  requestId: 'req-456'
});
```

### Security Events

```typescript
import { logSecurityEvent } from '@/lib/structured-logger';

// Rate limiting
await logSecurityEvent('rate_limit', {
  ip: '192.168.1.1',
  endpoint: '/api/auth/login',
  limit: 5
});

// Bypass attempts
await logSecurityEvent('bypass_attempt', {
  userId: 'user-123',
  attemptedBypass: 'admin_token',
  ip: '192.168.1.1'
});
```

### Performance Tracking

```typescript
import { logPerformance } from '@/lib/structured-logger';

const startTime = Date.now();
// ... some operation
const duration = Date.now() - startTime;

await logPerformance('database_query', duration, {
  query: 'getUserPosts',
  userId: 'user-123'
});
```

### User Actions

```typescript
import { logUserAction } from '@/lib/structured-logger';

// Track user behavior for analytics
await logUserAction('post_created', {
  userId: 'user-123',
  spaceId: 'space-456',
  postType: 'discussion'
});

await logUserAction('space_joined', {
  userId: 'user-123',
  spaceId: 'space-789'
});
```

## Context Structure

### Standard Context Fields

```typescript
interface LogContext {
  // User context
  userId?: string;
  userEmail?: string;
  isTestUser?: boolean;
  
  // Request context
  requestId?: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  
  // Operation context
  operation?: string;
  duration?: number;
  
  // Business context
  spaceId?: string;
  organizationId?: string;
  
  // Technical context
  component?: string;
  version?: string;
  
  // Additional metadata
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}
```

### Best Practices for Context

```typescript
// Good: Structured, searchable data
await logger.info('User subscription updated', {
  userId: 'user-123',
  operation: 'subscription_update',
  tags: {
    planType: 'premium',
    paymentMethod: 'stripe',
    renewalDate: '2024-01-15'
  },
  extra: {
    previousPlan: 'basic',
    upgradeReason: 'storage_limit'
  }
});

// Bad: Unstructured message
await logger.info('User user-123 upgraded from basic to premium plan using stripe payment, renewal on 2024-01-15 because of storage limit');
```

## Environment Configuration

### Development
- **Console Output**: Enabled with full context
- **Remote Logging**: Disabled
- **Min Level**: DEBUG
- **Sensitive Data**: Included for debugging

### Staging
- **Console Output**: Enabled for debugging
- **Remote Logging**: Enabled
- **Min Level**: INFO
- **Sensitive Data**: Masked

### Production
- **Console Output**: Disabled (performance)
- **Remote Logging**: Enabled
- **Min Level**: WARN
- **Sensitive Data**: Masked

## Log Categories

### Available Categories

```typescript
enum LogCategory {
  AUTH = 'auth',           // Authentication and authorization
  API = 'api',             // API requests and responses
  DATABASE = 'database',   // Database operations
  SECURITY = 'security',   // Security events and alerts
  PERFORMANCE = 'performance', // Performance metrics
  USER_ACTION = 'user_action', // User behavior analytics
  SYSTEM = 'system',       // System events and health
  BUSINESS = 'business',   // Business logic events
  INTEGRATION = 'integration' // External service integrations
}
```

### Using Categories

```typescript
await logger.logWithCategory(
  LogLevel.INFO,
  LogCategory.DATABASE,
  'Query executed successfully',
  {
    operation: 'user_lookup',
    duration: 45,
    table: 'users'
  }
);
```

## Child Loggers

Create specialized loggers with default context:

```typescript
// Component-specific logger
const userServiceLogger = logger.child({
  component: 'UserService',
  version: '1.2.0'
});

// All logs from this logger will include the default context
await userServiceLogger.info('User created', {
  userId: 'user-123',
  operation: 'create_user'
});
// Logs: { component: 'UserService', version: '1.2.0', userId: 'user-123', operation: 'create_user' }

// Request-specific logger
const requestLogger = createRequestLogger('req-456', 'user-123');
await requestLogger.info('Processing request');
// Logs: { requestId: 'req-456', userId: 'user-123' }
```

## Error Logging

### Automatic Error Handling

Errors at ERROR and FATAL levels are automatically sent to Sentry:

```typescript
try {
  await riskyOperation();
} catch (error) {
  await logger.error('Operation failed', {
    operation: 'risky_operation',
    userId: 'user-123'
  }, error);
  // Automatically captured by Sentry with full context
}
```

### Custom Error Logging

```typescript
// Log without throwing
await logger.error('Validation warning', {
  operation: 'user_validation',
  field: 'email',
  value: 'invalid-email'
});

// Log with error object
const error = new Error('Database connection failed');
await logger.fatal('Critical system failure', {
  component: 'DatabaseService',
  operation: 'connect'
}, error);
```

## Security Features

### Automatic PII Masking

```typescript
// Email addresses are automatically masked in production
await logger.info('User registered', {
  userEmail: 'john.doe@example.com' // Becomes: joh***@example.com
});

// Sensitive fields are removed from extra data
await logger.info('User login', {
  extra: {
    password: 'secret123',    // Removed
    token: 'jwt-token',       // Removed
    secret: 'api-secret',     // Removed
    publicData: 'safe'        // Kept
  }
});
```

### Development vs Production

```typescript
// Development: Full logging with sensitive data
await logger.debug('Database query', {
  query: 'SELECT * FROM users WHERE email = ?',
  params: ['user@example.com'],
  rawResponse: { /* full data */ }
});

// Production: Masked and filtered
await logger.debug('Database query', {
  query: 'SELECT * FROM users WHERE email = ?',
  params: ['use***@example.com'],
  // rawResponse removed
});
```

## Performance Considerations

### Async Logging

All logging is asynchronous and won't block your application:

```typescript
// Non-blocking
await logger.info('User action completed'); // Returns immediately
// Your code continues...
```

### Conditional Logging

Expensive operations are only performed when needed:

```typescript
// Only processed if level >= configured minimum
await logger.debug('Expensive debug info', {
  expensiveData: calculateComplexMetrics() // Only called if debug enabled
});

// Use functions for expensive operations
await logger.debug('Complex data', {
  get expensiveData() {
    return calculateComplexMetrics(); // Only called when actually logged
  }
});
```

### Sampling

For high-volume logs, consider sampling:

```typescript
// Log only 10% of requests in production
if (Math.random() < 0.1 || isDevelopment) {
  await logger.info('High frequency event', { userId });
}
```

## Integration Examples

### Database Operations

```typescript
class UserRepository {
  private logger = logger.child({ component: 'UserRepository' });
  
  async createUser(userData: CreateUserData): Promise<User> {
    const startTime = Date.now();
    
    await this.logger.info('Creating user', {
      operation: 'create_user',
      email: userData.email
    });
    
    try {
      const user = await this.db.users.create(userData);
      const duration = Date.now() - startTime;
      
      await this.logger.info('User created successfully', {
        operation: 'create_user',
        userId: user.id,
        duration
      });
      
      return user;
    } catch (error) {
      await this.logger.error('Failed to create user', {
        operation: 'create_user',
        email: userData.email,
        duration: Date.now() - startTime
      }, error);
      
      throw error;
    }
  }
}
```

### External API Integration

```typescript
class PaymentService {
  private logger = logger.child({ 
    component: 'PaymentService',
    integration: 'stripe' 
  });
  
  async processPayment(amount: number, userId: string): Promise<Payment> {
    await this.logger.info('Processing payment', {
      operation: 'process_payment',
      userId,
      amount,
      tags: { currency: 'USD' }
    });
    
    try {
      const payment = await stripe.charges.create({
        amount: amount * 100,
        currency: 'usd'
      });
      
      await this.logger.info('Payment processed successfully', {
        operation: 'process_payment',
        userId,
        paymentId: payment.id,
        tags: { 
          status: payment.status,
          provider: 'stripe'
        }
      });
      
      return payment;
    } catch (error) {
      await this.logger.error('Payment processing failed', {
        operation: 'process_payment',
        userId,
        amount,
        tags: { 
          errorType: error.type,
          errorCode: error.code
        }
      }, error);
      
      throw error;
    }
  }
}
```

## Monitoring and Alerting

### Log-based Alerts

Structure logs for easy alerting:

```typescript
// Alert-worthy events
await logger.error('High error rate detected', {
  operation: 'health_check',
  tags: {
    alertType: 'error_rate',
    severity: 'critical',
    threshold: '10%',
    current: '15%'
  }
});

// Business metrics
await logger.info('Daily active users', {
  operation: 'metrics_collection',
  tags: {
    metric: 'dau',
    value: '1500',
    date: '2024-01-15'
  }
});
```

### Dashboard Queries

Structure for dashboard consumption:

```typescript
// Performance dashboard
await logger.info('API performance', {
  operation: 'api_metrics',
  duration: 150,
  tags: {
    endpoint: '/api/users',
    method: 'POST',
    status: '201',
    region: 'us-east-1'
  }
});

// User engagement dashboard
await logger.info('User engagement', {
  operation: 'engagement_metrics',
  tags: {
    action: 'post_created',
    category: 'content_creation',
    userId: 'user-123'
  }
});
```

This structured logging system provides a solid foundation for observability, debugging, and business intelligence while maintaining security and performance.