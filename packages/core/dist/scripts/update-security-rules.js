#!/usr/bin/env tsx
"use strict";
/**
 * Security Rules Enhancement Script
 *
 * This script generates additional security rules for the new collections
 * to be added to your existing firestore.rules file.
 *
 * Usage: pnpm tsx packages/core/src/scripts/update-security-rules.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexUpdates = exports.newSecurityRules = void 0;
const newSecurityRules = `
    // ======== RITUALS ========
    
    match /rituals/{ritualId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin();
      
      match /participants/{userId} {
        allow read: if isAuthenticated();
        allow create: if isAuthenticated() && request.auth.uid == userId;
        allow update: if isAuthenticated() && request.auth.uid == userId;
        allow delete: if isAdmin();
      }
      
      match /analytics/{analyticsId} {
        allow read: if isAdmin();
        allow write: if isAdmin();
      }
    }
    
    match /ritual_announcements/{announcementId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // ======== NOTIFICATIONS ========
    
    match /notification_templates/{templateId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }
    
    match /notification_batches/{batchId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }
    
    // User notifications are handled in user subcollections above

    // ======== TOOLS (Enhanced) ========
    
    match /tool_templates/{templateId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isVerified();
      allow update, delete: if isAdmin() || 
                           resource.data.createdBy == request.auth.uid;
    }
    
    // Tool usage tracking
    match /tools/{toolId}/usage/{usageId} {
      allow read: if isAdmin() || 
                 resource.data.userId == request.auth.uid ||
                 exists(/databases/$(database)/documents/tools/$(toolId)) &&
                 get(/databases/$(database)/documents/tools/$(toolId)).data.ownerId == request.auth.uid;
      allow create: if isAuthenticated() && 
                   request.resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && 
                   resource.data.userId == request.auth.uid;
      allow delete: if isAdmin();
    }
    
    // Tool feedback
    match /tools/{toolId}/feedback/{feedbackId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
                   request.resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && 
                   resource.data.userId == request.auth.uid;
      allow delete: if isAdmin() || 
                   resource.data.userId == request.auth.uid;
    }

    // ======== MODERATION ========
    
    match /content_reports/{reportId} {
      allow read: if resource.data.reportedBy == request.auth.uid || 
                 isModerator() || isAdmin();
      allow create: if isAuthenticated() && 
                   request.resource.data.reportedBy == request.auth.uid;
      allow update: if isModerator() || isAdmin();
      allow delete: if isAdmin();
    }
    
    match /moderation_queue/{queueId} {
      allow read, write: if isModerator() || isAdmin();
    }
    
    match /moderation_action_logs/{logId} {
      allow read: if isModerator() || isAdmin();
      allow create: if isModerator() || isAdmin();
      allow update, delete: if isAdmin();
    }
    
    match /user_safety_records/{userId} {
      allow read: if isModerator() || isAdmin() || 
                 request.auth.uid == userId;
      allow write: if isModerator() || isAdmin();
    }
    
    match /content_filter_rules/{ruleId} {
      allow read: if isModerator() || isAdmin();
      allow write: if isAdmin();
    }

    // ======== ANALYTICS (Enhanced) ========
    
    match /platform_analytics/{analyticsId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }
    
    match /analytics_events/{eventId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated() && 
                   request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // ======== FILE UPLOADS ========
    
    match /file_uploads/{fileId} {
      allow read: if resource.data.uploadedBy == request.auth.uid ||
                 resource.data.visibility == 'public' ||
                 (resource.data.visibility == 'authenticated' && isAuthenticated()) ||
                 isAdmin();
      allow create: if isAuthenticated() && 
                   request.resource.data.uploadedBy == request.auth.uid;
      allow update: if resource.data.uploadedBy == request.auth.uid || isAdmin();
      allow delete: if resource.data.uploadedBy == request.auth.uid || isAdmin();
    }
    
    match /upload_sessions/{sessionId} {
      allow read, write: if isAuthenticated() && 
                        request.auth.uid == resource.data.userId;
    }
    
    match /file_access_logs/{logId} {
      allow read: if isAdmin();
      allow create: if true; // Allow creation for tracking
      allow update, delete: if isAdmin();
    }
    
    match /file_quotas/{userId} {
      allow read: if request.auth.uid == userId || isAdmin();
      allow write: if isAdmin();
    }

    // ======== SYSTEM CONFIGURATION ========
    
    match /system_settings/{settingId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    match /feature_flags/{flagId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    match /app_config/{configId} {
      allow read: if true;
      allow write: if isAdmin();
    }
`;
exports.newSecurityRules = newSecurityRules;
const indexUpdates = `
    // ======== NEW INDEXES FOR ENHANCED COLLECTIONS ========
    
    // Ritual indexes
    {
      "collectionGroup": "rituals",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "scheduledStart", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "participants",
      "queryScope": "COLLECTION_GROUP",
      "fields": [
        { "fieldPath": "ritualId", "order": "ASCENDING" },
        { "fieldPath": "completedAt", "order": "DESCENDING" }
      ]
    },
    
    // Tool usage indexes
    {
      "collectionGroup": "usage",
      "queryScope": "COLLECTION_GROUP",
      "fields": [
        { "fieldPath": "toolId", "order": "ASCENDING" },
        { "fieldPath": "startTime", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "feedback",
      "queryScope": "COLLECTION_GROUP",
      "fields": [
        { "fieldPath": "toolId", "order": "ASCENDING" },
        { "fieldPath": "rating", "order": "DESCENDING" }
      ]
    },
    
    // Moderation indexes
    {
      "collectionGroup": "content_reports",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "priority", "order": "DESCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "moderation_queue",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "urgency", "order": "DESCENDING" },
        { "fieldPath": "createdAt", "order": "ASCENDING" }
      ]
    },
    
    // Analytics indexes
    {
      "collectionGroup": "analytics_events",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "eventType", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    
    // File upload indexes
    {
      "collectionGroup": "file_uploads",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "uploadedBy", "order": "ASCENDING" },
        { "fieldPath": "purpose", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
`;
exports.indexUpdates = indexUpdates;
function generateRulesFile() {
    console.log('🔒 HIVE Security Rules Enhancement');
    console.log('==================================');
    console.log('');
    console.log('Add the following rules to your firestore.rules file:');
    console.log('');
    console.log('📋 COPY THE RULES BELOW:');
    console.log('========================');
    console.log(newSecurityRules);
    console.log('');
    console.log('📊 ADD THESE INDEXES TO firestore.indexes.json:');
    console.log('===============================================');
    console.log(indexUpdates);
    console.log('');
    console.log('⚠️  IMPORTANT NOTES:');
    console.log('- Add these rules to your existing firestore.rules file');
    console.log('- Place them before the closing brackets of your rules');
    console.log('- Deploy rules using: firebase deploy --only firestore:rules');
    console.log('- Deploy indexes using: firebase deploy --only firestore:indexes');
    console.log('- Test rules in Firebase Console before deploying to production');
    console.log('');
    console.log('🔍 The new rules provide:');
    console.log('- Secure access to ritual participation');
    console.log('- User notification management');
    console.log('- Tool usage tracking and feedback');
    console.log('- Content moderation workflows');
    console.log('- Analytics event collection');
    console.log('- File upload security');
    console.log('- System configuration protection');
}
// Run the generator
if (require.main === module) {
    generateRulesFile();
}
//# sourceMappingURL=update-security-rules.js.map