# HIVE Database Setup Guide

This guide covers the enhanced Firestore database architecture for HIVE, including new collections, validation schemas, and initialization scripts.

## 🎯 Overview

The enhanced database includes:

- **6 new validation schema packages** with comprehensive Zod validation
- **5 new Firestore collection types** with converters and utilities  
- **Safe initialization scripts** that won't modify existing data
- **Enhanced security rules** for new collections
- **Helper utilities** for common database operations

## 📊 New Collections Added

### 1. Rituals (`rituals/`)
Campus-wide engagement activities like "First Light" and "Orientation Q&A"
- **Main collection**: `rituals/{ritualId}`
- **Subcollections**: 
  - `rituals/{ritualId}/participants/{userId}`
  - `rituals/{ritualId}/analytics/{analyticsId}`

### 2. Notifications (`users/{userId}/notifications/`)
User notification management with preferences and templates
- **User notifications**: `users/{userId}/notifications/{notificationId}`
- **User preferences**: `users/{userId}/notification_preferences/{preferenceId}`
- **Templates**: `notification_templates/{templateId}`
- **Batches**: `notification_batches/{batchId}`

### 3. Enhanced Tools (`tools/` + subcollections)
Comprehensive tool creation and management system
- **Main collection**: `tools/{toolId}`
- **Usage tracking**: `tools/{toolId}/usage/{usageId}`
- **Feedback**: `tools/{toolId}/feedback/{feedbackId}`
- **Templates**: `tool_templates/{templateId}`

### 4. Moderation (`content_reports/`, `moderation_queue/`)
Content moderation and safety systems
- **Reports**: `content_reports/{reportId}`
- **Queue**: `moderation_queue/{queueId}`
- **Action logs**: `moderation_action_logs/{logId}`
- **User safety**: `user_safety_records/{userId}`
- **Filter rules**: `content_filter_rules/{ruleId}`

### 5. Analytics (`analytics_events/`, user analytics)
Comprehensive usage and engagement tracking
- **Global events**: `analytics_events/{eventId}`
- **User events**: `users/{userId}/events/{eventId}`
- **User analytics**: `users/{userId}/analytics/{date}`
- **Platform analytics**: `platform_analytics/{analyticsId}`

### 6. File Management (`file_uploads/`)
Secure file upload and management
- **Uploads**: `file_uploads/{fileId}`
- **Sessions**: `upload_sessions/{sessionId}`
- **Access logs**: `file_access_logs/{logId}`
- **Quotas**: `file_quotas/{userId}`

## 🚀 Quick Setup

### Prerequisites

1. **Firebase Admin SDK** credentials configured
2. **Existing HIVE database** (this won't modify existing data)
3. **Node.js 18+** and **pnpm**

### Step 1: Install Dependencies

```bash
cd packages/core
pnpm install
```

### Step 2: Configure Firebase Admin

Set up one of these credential options:

**Option A: Service Account File**
```bash
# Place your service account JSON in project root
cp path/to/your/firebase-service-account.json ./firebase-service-account.json
```

**Option B: Environment Variable**
```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
```

**Option C: Environment JSON**
```bash
export FIREBASE_ADMIN_SDK_KEY='{"type":"service_account",...}'
```

### Step 3: Initialize Database

```bash
# Run the database initialization script
pnpm db:init
```

This script will:
- ✅ **Skip existing collections** (safe for production)
- 🆕 **Create new collections** with seed data
- 📝 **Add sample rituals, templates, and configurations**
- 🔧 **Set up system settings and analytics baseline**

### Step 4: Update Security Rules

```bash
# Generate security rules for new collections
pnpm db:rules
```

**Copy the output** and add to your `firestore.rules` file, then deploy:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## 📋 Validation Schemas

All new collections include comprehensive Zod validation:

```typescript
// Import validation schemas
import { 
  RitualSchema, 
  NotificationSchema, 
  ToolSchema,
  ContentReportSchema,
  AnalyticsEventSchema,
  FileUploadSchema
} from "@hive/validation";

// Use in your code
const ritual = RitualSchema.parse(data);
```

Available schemas:
- **Analytics**: `UserAnalyticsSchema`, `AnalyticsEventSchema`, `PlatformAnalyticsSchema`
- **Notifications**: `NotificationSchema`, `NotificationPreferencesSchema`, `NotificationTemplateSchema`
- **Rituals**: `RitualSchema`, `RitualParticipationSchema`, `RitualRewardSchema`
- **Tools**: `ToolSchema`, `ToolUsageSchema`, `ToolFeedbackSchema`, `ToolTemplateSchema`
- **Moderation**: `ContentReportSchema`, `ModerationActionLogSchema`, `UserSafetyRecordSchema`
- **Files**: `FileUploadSchema`, `UploadConfigSchema`, `FileMetadataSchema`

## 🛠 Database Helpers

Use the provided helper classes for common operations:

```typescript
import { DatabaseHelpers } from "@hive/core";
import { db } from "@hive/core";

const helpers = new DatabaseHelpers(db);

// Ritual operations
const activeRituals = await helpers.rituals.getActiveRituals();
await helpers.rituals.participateInRitual(ritualId, userId, response);

// Notification operations
await helpers.notifications.createNotification(userId, notification);
const unreadCount = await helpers.notifications.getUnreadCount(userId);

// Tool operations
const toolId = await helpers.tools.createTool(toolData);
await helpers.tools.recordToolUsage(toolId, usageData);

// Analytics tracking
await helpers.analytics.trackEvent(eventData);
await helpers.analytics.updateDailyAnalytics(userId, date);

// Moderation
const reportId = await helpers.moderation.createContentReport(reportData);
const pendingReports = await helpers.moderation.getPendingReports();
```

## 🔒 Security Features

### New Security Rules
- **Role-based access** (admin, moderator, verified, builder)
- **User ownership validation** for personal data
- **Content visibility controls** for tools and posts
- **Moderation workflow permissions**
- **Analytics data protection**

### Data Validation
- **Server-side validation** using Zod schemas
- **Type safety** with TypeScript interfaces
- **Input sanitization** and security checks
- **Content filtering** for harmful content

### Privacy Controls
- **User consent management** for analytics
- **Notification preferences** with granular controls
- **File access logging** and quota management
- **Content moderation** with appeal processes

## 📈 Analytics & Monitoring

### User Analytics
- **Daily engagement metrics** (active time, sessions, interactions)
- **Content creation tracking** (posts, tools, ritual participation)
- **Space participation** and tool usage
- **Engagement scoring** algorithm

### Platform Analytics
- **User growth and retention** metrics
- **Content and space health** indicators
- **Ritual participation** rates
- **Tool usage** and adoption

### Real-time Tracking
- **Event-based analytics** with session tracking
- **User journey** mapping
- **Performance metrics** and error tracking
- **Custom event** support

## 🚨 Moderation Tools

### Content Reports
- **User reporting** system with categories
- **Automated flagging** using content filters
- **Priority scoring** based on severity
- **Moderation queue** with SLA tracking

### Safety Records
- **User behavior tracking** with scores
- **Violation history** and rehabilitation progress
- **Automated actions** (warnings, timeouts, suspensions)
- **Appeal process** management

### Content Filtering
- **Regex pattern** matching
- **Keyword detection** with confidence scoring
- **Machine learning** integration ready
- **Custom rule** creation and testing

## 🎭 Ritual System

### Ritual Types
- **First Light**: Welcome ritual for new users
- **Orientation Q&A**: Community wisdom sharing
- **Torch Pass**: Invitation system
- **Custom rituals**: Configurable campus events

### Features
- **Time-bound participation** with reminders
- **Progress tracking** and community visualization
- **Reward systems** (access, badges, privileges)
- **Analytics tracking** for engagement

## 🛠 Tool Creation Engine

### Tool Types
- **Widget tools**: Interactive components
- **Web app tools**: Embedded applications
- **Form tools**: Data collection
- **Utility tools**: Calculators, timers, etc.

### Features
- **Template system** with customizable fields
- **Usage analytics** and feedback collection
- **Permission management** and collaboration
- **Version control** and deployment

## 📞 Support & Troubleshooting

### Common Issues

**❌ "No Firebase service account found"**
- Ensure you have set up Firebase Admin credentials (see Step 2)
- Check file paths and environment variables

**❌ "Collection already exists, skipping"**
- This is normal! The script safely skips existing data
- Only new collections and documents will be created

**❌ "Permission denied" errors**
- Update your security rules using `pnpm db:rules`
- Deploy rules with `firebase deploy --only firestore:rules`

### Getting Help

1. **Check the console output** from initialization scripts
2. **Review Firebase Console** for new collections
3. **Test security rules** in Firebase Console Rules Playground
4. **Monitor logs** for any validation errors

## 🔄 Migration Notes

### From Existing Setup
- ✅ **No data loss**: Existing collections are preserved
- ✅ **Backward compatible**: Current features continue working  
- ✅ **Incremental adoption**: Use new features as needed
- ✅ **Schema evolution**: Validation schemas can be updated

### Best Practices
- **Test in development** before production deployment
- **Monitor performance** after adding new collections
- **Review analytics** to understand user engagement
- **Iterate on moderation** rules based on community needs

---

## 📚 Additional Resources

- **[Firebase Documentation](https://firebase.google.com/docs/firestore)**
- **[Zod Validation](https://zod.dev/)**
- **[HIVE Product Foundation](../memory-bank/HIVE_PRODUCT_FOUNDATION.md)**
- **[Brand Design System](../docs/brand-design.md)**

*Last updated: January 2025*