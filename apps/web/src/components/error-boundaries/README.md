# HIVE Error Boundary System 🛡️

Production-ready error boundary system that prevents app crashes and provides graceful failure recovery for the HIVE platform.

## Overview

The HIVE error boundary system is designed to catch JavaScript errors anywhere in the component tree, log error information, and display a fallback UI instead of crashing the entire application. This is critical for maintaining user experience and preventing the panic-to-relief loop from being broken by technical failures.

## 🏗️ Architecture

### Global Error Boundary
- **Location**: `apps/web/src/app/layout.tsx`
- **Purpose**: Catches all unhandled errors across the entire application
- **Features**: Firebase integration, error reporting, auto-recovery for non-critical contexts

### Context-Specific Error Boundaries
Each major feature area has its own error boundary with contextual error handling:

1. **FeedErrorBoundary** - Campus feed protection
2. **SpacesErrorBoundary** - Space discovery and individual space protection
3. **ProfileErrorBoundary** - User profile data safety
4. **ToolsErrorBoundary** - HiveLab tool builder protection

## 🚀 Quick Start

### Import Error Boundaries
```typescript
import {
  FeedErrorBoundary,
  SpacesErrorBoundary,
  ProfileErrorBoundary,
  ToolsErrorBoundary
} from '@/components/error-boundaries';
```

### Wrap Components
```tsx
// Feed protection
<FeedErrorBoundary>
  <FeedContent />
</FeedErrorBoundary>

// Spaces protection with context
<SpacesErrorBoundary context="directory">
  <SpacesList />
</SpacesErrorBoundary>

// Individual space protection
<SpacesErrorBoundary context="individual" spaceId="space-123">
  <SpaceDetail />
</SpacesErrorBoundary>

// Profile protection
<ProfileErrorBoundary context="edit">
  <ProfileEditForm />
</ProfileErrorBoundary>

// Tools protection
<ToolsErrorBoundary context="edit" toolId="tool-456">
  <ToolEditor />
</ToolsErrorBoundary>
```

## 🎯 Features

### 1. **Contextual Error Messages**
Each error boundary provides context-appropriate messaging:
- **Feed**: "Feed Temporarily Unavailable" with options to check spaces
- **Spaces**: "Space Explorer Offline" with navigation alternatives
- **Profile**: "Profile Temporarily Unavailable" with data safety assurance
- **Tools**: "HiveLab Tools Offline" with project safety guarantee

### 2. **Smart Recovery Options**
- **Retry mechanisms** with configurable max attempts
- **Auto-recovery** for non-critical contexts (5-second delay)
- **Alternative navigation** options to maintain user flow
- **Graceful degradation** that preserves panic-to-relief pipeline

### 3. **Production Error Reporting**
- **Firebase Analytics** integration
- **Structured logging** with context and metadata
- **Error sanitization** to remove sensitive data
- **Unique error IDs** for tracking and support
- **Severity classification** (low, medium, high, critical)

### 4. **HIVE Brand Voice**
Error messages maintain HIVE's supportive, community-focused tone:
- Reassuring language about data safety
- Clear next steps and alternatives
- No technical jargon in user-facing messages
- Maintains trust during failures

## 🔧 Configuration Options

### Error Boundary Props
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  context?: string;           // Error context for logging
  enableRecovery?: boolean;   // Auto-retry functionality
  maxRetries?: number;        // Maximum retry attempts
  fallback?: React.ComponentType; // Custom error UI
}
```

### Context-Specific Settings
```typescript
// Feed: High retry count for core feature
<FeedErrorBoundary> // maxRetries: 5, enableRecovery: true

// Spaces: Contextual configuration
<SpacesErrorBoundary context="directory"> // maxRetries: 5
<SpacesErrorBoundary context="create">    // maxRetries: 2, no auto-recovery

// Profile: Safe defaults
<ProfileErrorBoundary context="edit">     // maxRetries: 2, no auto-recovery
<ProfileErrorBoundary context="own">      // maxRetries: 5, enableRecovery: true

// Tools: Operation-specific
<ToolsErrorBoundary context="edit">       // maxRetries: 2, no auto-recovery
<ToolsErrorBoundary context="deploy">     // maxRetries: 1, no auto-recovery
```

## 📊 Error Reporting & Analytics

### Error Classification
```typescript
type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Critical: Global errors, authentication, Firebase failures
// High: Core features (feed, spaces, profiles)
// Medium: Tools, retry attempts, React errors
// Low: Minor UI issues, warnings
```

### Logged Data (Sanitized)
```typescript
interface ErrorReport {
  errorId: string;          // Unique identifier
  message: string;          // Error message (truncated)
  context: string;          // Error boundary context
  retryCount: number;       // Retry attempts
  buildVersion?: string;    // App version
  environment: string;      // dev/staging/production
  // HIVE-specific context
  spaceId?: string;         // Space context
  toolId?: string;          // Tool context
  campusId?: string;        // Campus isolation
  sessionId?: string;       // User session
}
```

### Firebase Integration
- Errors stored in `error_reports` collection
- Rate limiting (5 reports per minute per user)
- Automatic severity classification
- Critical error alerting in production

## 🧪 Testing

### Development Testing
```tsx
import { ErrorBoundaryTest } from '@/components/error-boundaries';

// Add to any page in development
<ErrorBoundaryTest />
```

This component provides:
- Error trigger buttons for each context
- Different error types (render, async, null, chunk)
- Visual feedback for testing recovery mechanisms
- Console logging for debugging

### Test Scenarios
1. **Render Errors**: Component throws during render
2. **Async Errors**: Promises that reject
3. **Null Reference**: Accessing properties on null/undefined
4. **Chunk Load Errors**: Code splitting failures
5. **Network Errors**: API failures that bubble up

## 🔒 Security & Privacy

### Data Sanitization
- **Stack traces**: Remove file paths and usernames
- **URLs**: Strip sensitive query parameters
- **Messages**: Truncate to prevent data leaks
- **User data**: No PII in error reports

### Rate Limiting
- Maximum 5 error reports per minute per user
- Prevents spam and abuse
- Maintains system performance

## 🚨 Critical Error Handling

### Production Alerts
Critical errors trigger immediate notifications:
- Slack/Discord webhooks
- Email alerts to development team
- Error monitoring service integration
- Incident management system

### Auto-Recovery
Non-critical errors attempt automatic recovery:
- 5-second delay before retry
- Maximum retry limits per context
- Graceful degradation to alternative flows

## 📈 Behavioral Continuity

The error boundary system is designed to maintain HIVE's core behavioral patterns:

### Panic-to-Relief Pipeline Protection
- Errors don't break the 10-second relief target
- Alternative paths always available
- Community discovery remains accessible
- Social proof elements preserved

### 70% Completion Rate Maintenance
- Recovery mechanisms encourage completion
- Alternative flows maintain engagement
- Error states include progress preservation
- Retry functionality supports persistence

## 🛠️ Monitoring & Maintenance

### Error Metrics Dashboard
```typescript
interface ErrorMetrics {
  totalErrors: number;
  errorsByContext: Record<string, number>;
  errorsByType: Record<string, number>;
  recoveryRate: number;
  avgTimeToRecovery: number;
}
```

### Regular Maintenance
1. **Weekly error review**: Analyze patterns and frequencies
2. **Recovery rate monitoring**: Ensure >80% successful recoveries
3. **Performance impact**: Monitor error boundary overhead
4. **User feedback**: Track error experience satisfaction

## 🔮 Future Enhancements

### Planned Features
- **Smart retry**: AI-powered retry timing based on error type
- **User preferences**: Customizable error recovery behavior
- **Offline support**: Error boundaries for network failures
- **Error prevention**: Proactive error detection and prevention

### Integration Roadmap
- **Sentry**: Production error monitoring
- **DataDog**: Performance impact tracking
- **User feedback**: Error experience surveys
- **A/B testing**: Error message optimization

## 📝 Contributing

### Adding New Error Boundaries
1. Create new boundary file in `error-boundaries/`
2. Follow naming convention: `{context}-error-boundary.tsx`
3. Add contextual error messages and recovery options
4. Update exports in `index.ts`
5. Add tests to `error-boundary-test.tsx`

### Error Message Guidelines
- Use supportive, reassuring language
- Provide specific next steps
- Maintain HIVE brand voice
- Include data safety assurances
- Offer alternative navigation paths

---

**Remember**: Error boundaries are the last line of defense. They should provide a great user experience even when everything else fails. Every error is an opportunity to maintain trust and guide users back to their goals.