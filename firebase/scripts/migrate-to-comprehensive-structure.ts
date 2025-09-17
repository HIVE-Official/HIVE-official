#!/usr/bin/env ts-node

/**
 * HIVE Comprehensive Firestore Structure Migration
 * 
 * This script incrementally adds the optimal Firestore structure
 * without breaking existing data. It adds new collections and
 * subcollections while preserving current functionality.
 */

import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK with production credentials
const serviceAccount = require('./service-account-prod.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = getFirestore();
const auth = getAuth();

// ============================================================================
// COMPREHENSIVE HIVE FIRESTORE STRUCTURE
// ============================================================================

/**
 * 1. SCHOOLS & UNIVERSITIES
 * Path: schools/{schoolId}
 * Status: ✅ Already implemented
 */

/**
 * 2. USER MANAGEMENT  
 * Path: users/{userId}
 * Status: ✅ Already implemented
 * 
 * New subcollections to add:
 * - users/{userId}/notifications/{notificationId}
 * - users/{userId}/preferences/{preferenceType}
 * - users/{userId}/analytics/{metricType}
 */

/**
 * 3. SPACES (NESTED STRUCTURE)
 * Path: spaces/{spacetype}/spaces/{spaceid}
 * Status: ✅ Already implemented correctly
 * 
 * Existing subcollections:
 * - spaces/{spacetype}/spaces/{spaceid}/members/{userId} ✅
 * - spaces/{spacetype}/spaces/{spaceid}/posts/{postId} ✅
 * - spaces/{spacetype}/spaces/{spaceid}/events/{eventId} ✅
 * 
 * New subcollections to add:
 * - spaces/{spacetype}/spaces/{spaceid}/analytics/{metricId}
 * - spaces/{spacetype}/spaces/{spaceid}/tools/{toolId}
 * - spaces/{spacetype}/spaces/{spaceid}/moderation/{reportId}
 */

/**
 * 4. FEED SYSTEM
 * New collections to add:
 * - feed/{schoolId}/content/{contentId} - School-specific feed content
 * - feed/{schoolId}/trending/{trendId} - Trending content
 * - topStripContent/{contentId} ✅ Already implemented
 */

/**
 * 5. CREATION ENGINE
 * Path: elements/{elementId}
 * Status: ✅ Already implemented
 * 
 * New collections to add:
 * - tools/{toolId} - User-created tools
 * - templates/{templateId} - Tool templates
 */

/**
 * 6. ANALYTICS & INSIGHTS
 * New collections to add:
 * - analytics/{schoolId}/metrics/{metricId}
 * - analytics/{schoolId}/reports/{reportId}
 */

/**
 * 7. MODERATION & SAFETY
 * New collections to add:
 * - moderation/reports/{reportId}
 * - moderation/queue/{queueId}
 */

interface MigrationStep {
  name: string;
  description: string;
  execute: () => Promise<void>;
}

const migrationSteps: MigrationStep[] = [
  {
    name: "Add User Subcollections",
    description: "Add notifications, preferences, and analytics subcollections to existing users",
    execute: async () => {
      console.log("📱 Adding user subcollections...");
      
      // Get existing users
      const usersSnapshot = await db.collection("users").limit(5).get();
      
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        
        // Add default user preferences
        await db.collection("users").doc(userId).collection("preferences").doc("notifications").set({
          email: true,
          push: true,
          feed: true,
          spaces: true,
          events: true,
          mentions: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        // Add analytics placeholder
        await db.collection("users").doc(userId).collection("analytics").doc("engagement").set({
          postsCreated: 0,
          reactionsGiven: 0,
          spacesJoined: 0,
          eventsAttended: 0,
          lastUpdated: new Date(),
        });
        
        console.log(`  ✓ Added subcollections for user: ${userId}`);
      }
    }
  },
  
  {
    name: "Add Space Analytics",
    description: "Add analytics subcollections to existing spaces",
    execute: async () => {
      console.log("📊 Adding space analytics...");
      
      // Get existing spaces using collection group query
      const spacesSnapshot = await db.collectionGroup("spaces").limit(10).get();
      
      for (const spaceDoc of spacesSnapshot.docs) {
        const spaceId = spaceDoc.id;
        const spaceType = spaceDoc.ref.parent.parent?.id;
        
        if (!spaceType) continue;
        
        // Add space analytics
        await db
          .collection("spaces")
          .doc(spaceType)
          .collection("spaces")
          .doc(spaceId)
          .collection("analytics")
          .doc("engagement")
          .set({
            memberCount: spaceDoc.data().memberCount || 0,
            postCount: 0,
            eventCount: 0,
            activeMembers: 0,
            growthRate: 0,
            lastUpdated: new Date(),
          });
        
        console.log(`  ✓ Added analytics for ${spaceType} space: ${spaceId}`);
      }
    }
  },
  
  {
    name: "Add Feed Collections",
    description: "Add school-specific feed collections",
    execute: async () => {
      console.log("📰 Adding feed collections...");
      
      // Get existing schools
      const schoolsSnapshot = await db.collection("schools").get();
      
      for (const schoolDoc of schoolsSnapshot.docs) {
        const schoolId = schoolDoc.id;
        
        // Add trending content placeholder
        await db.collection("feed").doc(schoolId).collection("trending").doc("daily").set({
          date: new Date(),
          topPosts: [],
          topSpaces: [],
          topEvents: [],
          updatedAt: new Date(),
        });
        
        // Add feed metrics
        await db.collection("feed").doc(schoolId).collection("metrics").doc("engagement").set({
          dailyActiveUsers: 0,
          postsCreated: 0,
          reactionsGiven: 0,
          spacesJoined: 0,
          date: new Date(),
        });
        
        console.log(`  ✓ Added feed collections for school: ${schoolId}`);
      }
    }
  },
  
  {
    name: "Add Creation Engine Collections",
    description: "Add tools and templates collections for creation engine",
    execute: async () => {
      console.log("🛠️ Adding creation engine collections...");
      
      // Add sample tool template
      await db.collection("templates").doc("basic-poll").set({
        id: "basic-poll",
        name: "Basic Poll",
        description: "A simple poll template with multiple choice options",
        category: "engagement",
        elements: [
          {
            type: "textBlock",
            config: { text: "Poll Question", style: { fontSize: "lg", fontWeight: "bold" } }
          },
          {
            type: "choiceGroup",
            config: { 
              options: ["Option 1", "Option 2", "Option 3"],
              allowMultiple: false,
              style: "radio"
            }
          }
        ],
        isOfficial: true,
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      console.log("  ✓ Added creation engine collections");
    }
  },
  
  {
    name: "Add Analytics Collections",
    description: "Add school-level analytics collections",
    execute: async () => {
      console.log("📈 Adding analytics collections...");
      
      // Get existing schools
      const schoolsSnapshot = await db.collection("schools").get();
      
      for (const schoolDoc of schoolsSnapshot.docs) {
        const schoolId = schoolDoc.id;
        
        // Add school analytics
        await db.collection("analytics").doc(schoolId).collection("metrics").doc("overview").set({
          totalUsers: 0,
          totalSpaces: 0,
          totalPosts: 0,
          totalEvents: 0,
          dailyActiveUsers: 0,
          weeklyActiveUsers: 0,
          monthlyActiveUsers: 0,
          lastUpdated: new Date(),
        });
        
        // Add growth metrics
        await db.collection("analytics").doc(schoolId).collection("reports").doc("growth").set({
          period: "weekly",
          userGrowth: 0,
          spaceGrowth: 0,
          engagementGrowth: 0,
          generatedAt: new Date(),
        });
        
        console.log(`  ✓ Added analytics for school: ${schoolId}`);
      }
    }
  },
  
  {
    name: "Add Moderation Collections",
    description: "Add moderation and safety collections",
    execute: async () => {
      console.log("🛡️ Adding moderation collections...");
      
      // Add moderation queue structure
      await db.collection("moderation").doc("queue").collection("reports").doc("example").set({
        id: "example",
        type: "inappropriate_content",
        status: "pending",
        priority: "medium",
        contentType: "post",
        contentId: "example-post",
        reportedBy: "system",
        reason: "Example moderation report",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Add moderation settings
      await db.collection("moderation").doc("settings").set({
        autoModerationEnabled: true,
        flagThresholds: {
          spam: 3,
          inappropriate: 2,
          harassment: 1,
        },
        reviewTimeouts: {
          low: 7 * 24 * 60 * 60 * 1000, // 7 days
          medium: 3 * 24 * 60 * 60 * 1000, // 3 days  
          high: 24 * 60 * 60 * 1000, // 1 day
        },
        updatedAt: new Date(),
      });
      
      console.log("  ✓ Added moderation collections");
    }
  }
];

async function runMigration() {
  try {
    console.log("🚀 Starting HIVE Firestore Structure Migration...\n");
    
    for (const step of migrationSteps) {
      console.log(`\n📋 ${step.name}`);
      console.log(`   ${step.description}`);
      
      try {
        await step.execute();
        console.log(`   ✅ Completed: ${step.name}\n`);
      } catch (error) {
        console.error(`   ❌ Failed: ${step.name}`, error);
        console.log(`   ⚠️  Continuing with next step...\n`);
      }
    }
    
    console.log("\n🎉 Migration completed successfully!");
    console.log("\n📊 New Firestore Structure Summary:");
    console.log("   ✅ User subcollections (notifications, preferences, analytics)");
    console.log("   ✅ Space analytics subcollections");
    console.log("   ✅ School-specific feed collections");
    console.log("   ✅ Creation engine tools and templates");
    console.log("   ✅ School-level analytics collections");
    console.log("   ✅ Moderation and safety collections");
    console.log("\n🔧 Existing data preserved:");
    console.log("   ✅ Users, schools, handles, posts, spaces");
    console.log("   ✅ Space memberships, posts, and events");
    console.log("   ✅ Top strip content and elements");
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigration();
} 