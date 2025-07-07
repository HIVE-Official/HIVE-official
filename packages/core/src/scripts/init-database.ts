#!/usr/bin/env tsx
/**
 * Database initialization script for HIVE
 * 
 * This script initializes new collections and seed data WITHOUT
 * deleting or modifying existing data, especially onboarding flows.
 * 
 * Usage: pnpm tsx packages/core/src/scripts/init-database.ts
 */

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import * as path from 'path';
import * as fs from 'fs';

// Initialize Firebase Admin
function initializeFirebase() {
  if (getApps().length === 0) {
    try {
      // Try to use application default credentials first (works with Firebase CLI)
      initializeApp({
        projectId: 'hive-9265c'
      });
      console.log('✅ Using Firebase CLI / Application Default Credentials');
    } catch (error) {
      // Fallback to service account files
      const possiblePaths = [
        './firebase-service-account.json',
        './serviceAccountKey.json',
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        path.join(process.cwd(), 'firebase-service-account.json')
      ].filter(Boolean);

      let serviceAccount = null;
      
      for (const credPath of possiblePaths) {
        if (fs.existsSync(credPath!)) {
          serviceAccount = JSON.parse(fs.readFileSync(credPath!, 'utf8'));
          console.log(`✅ Using service account from: ${credPath}`);
          break;
        }
      }

      if (!serviceAccount && process.env.FIREBASE_ADMIN_SDK_KEY) {
        try {
          serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);
          console.log('✅ Using service account from environment variable');
        } catch (e) {
          console.error('❌ Failed to parse FIREBASE_ADMIN_SDK_KEY');
        }
      }

      if (!serviceAccount) {
        console.error('❌ No Firebase credentials found!');
        console.log('Please set up one of:');
        console.log('  - Login with: firebase login');
        console.log('  - ./firebase-service-account.json');
        console.log('  - GOOGLE_APPLICATION_CREDENTIALS env var');
        console.log('  - FIREBASE_ADMIN_SDK_KEY env var');
        process.exit(1);
      }

      initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || 'hive-9265c'
      });
    }
  }
  
  return getFirestore();
}

const db = initializeFirebase();

// Utility functions
function timestamp() {
  return new Date().toISOString();
}

async function collectionExists(collectionPath: string): Promise<boolean> {
  try {
    const snapshot = await db.collection(collectionPath).limit(1).get();
    return !snapshot.empty;
  } catch {
    return false;
  }
}

// Initialization functions
async function initRituals() {
  console.log('🕯️  Initializing Rituals...');
  
  if (await collectionExists('rituals')) {
    console.log('   Rituals collection already exists, skipping...');
    return;
  }

  const rituals = [
    {
      id: 'first_light_summer_2024',
      type: 'first_light',
      status: 'draft',
      title: '🕯️ First Light',
      description: 'Welcome to HIVE. Light your flame with your first public words.',
      instructions: 'Share your first public post to light your flame and join the community. This marks the beginning of your HIVE journey.',
      iconUrl: '🕯️',
      scheduledStart: new Date('2024-07-01T00:00:00Z'),
      scheduledEnd: new Date('2024-07-07T23:59:59Z'),
      targetAudience: 'all',
      config: {
        participationWindow: 604800, // 1 week
        reminderSchedule: [24, 6], // 24h and 6h before end
        requiresValidation: false,
        autoComplete: true,
        allowAttachments: false,
        allowComments: true,
        showParticipants: true,
        showProgress: true,
        contentFilter: true,
        requiresApproval: false
      },
      rewards: [
        {
          type: 'access',
          name: 'Community Member',
          description: 'Can now post in spaces and participate in discussions',
          autoGrant: true
        }
      ],
      totalParticipants: 0,
      completedParticipants: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'orientation_qa_summer_2024',
      type: 'orientation_qa',
      status: 'draft',
      title: '❓ Orientation Q&A',
      description: 'Share wisdom with incoming students through daily questions.',
      instructions: 'Answer rotating prompts to help future students and build community knowledge.',
      iconUrl: '❓',
      scheduledStart: new Date('2024-07-01T00:00:00Z'),
      scheduledEnd: new Date('2024-07-14T23:59:59Z'),
      targetAudience: 'all',
      config: {
        participationWindow: 1209600, // 2 weeks
        reminderSchedule: [48, 12], // 48h and 12h before end
        requiresValidation: false,
        autoComplete: true,
        allowAttachments: false,
        allowComments: true,
        showParticipants: true,
        showProgress: true,
        contentFilter: true,
        requiresApproval: false
      },
      rewards: [
        {
          type: 'badge',
          name: 'Wisdom Keeper',
          description: 'Helped guide new students with valuable advice',
          autoGrant: true
        }
      ],
      totalParticipants: 0,
      completedParticipants: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const batch = db.batch();
  rituals.forEach(ritual => {
    const ref = db.collection('rituals').doc(ritual.id);
    batch.set(ref, ritual);
  });

  await batch.commit();
  console.log(`   ✅ Created ${rituals.length} ritual templates`);
}

async function initNotificationTemplates() {
  console.log('📬 Initializing Notification Templates...');
  
  if (await collectionExists('notification_templates')) {
    console.log('   Notification templates already exist, skipping...');
    return;
  }

  const templates = [
    {
      id: 'ritual_available',
      type: 'ritual_available',
      titleTemplate: '🕯️ {{ritualTitle}} is Available',
      messageTemplate: 'A new ritual is ready for you. Light your flame and join the community!',
      variables: ['ritualTitle', 'ritualId'],
      defaultPriority: 'medium',
      defaultActions: [{
        label: 'Participate',
        action: 'navigate',
        target: '/rituals/{{ritualId}}'
      }],
      scheduleDelay: 0,
      expiryDuration: 604800, // 1 week
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'space_activated',
      type: 'space_activated',
      titleTemplate: '🚀 {{spaceName}} is Active',
      messageTemplate: 'The {{spaceName}} space is now active! Join {{memberCount}} other members.',
      variables: ['spaceName', 'spaceId', 'memberCount'],
      defaultPriority: 'medium',
      defaultActions: [{
        label: 'Join Space',
        action: 'navigate',
        target: '/spaces/{{spaceId}}'
      }],
      scheduleDelay: 0,
      expiryDuration: 259200, // 3 days
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'achievement_unlocked',
      type: 'achievement_unlocked',
      titleTemplate: '🏆 Achievement Unlocked',
      messageTemplate: 'Congratulations! You\'ve unlocked {{achievementName}}.',
      variables: ['achievementName', 'achievementDescription'],
      defaultPriority: 'high',
      scheduleDelay: 0,
      expiryDuration: 2592000, // 30 days
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const batch = db.batch();
  templates.forEach(template => {
    const ref = db.collection('notification_templates').doc(template.id);
    batch.set(ref, template);
  });

  await batch.commit();
  console.log(`   ✅ Created ${templates.length} notification templates`);
}

async function initToolTemplates() {
  console.log('🛠️  Initializing Tool Templates...');
  
  if (await collectionExists('tool_templates')) {
    console.log('   Tool templates already exist, skipping...');
    return;
  }

  const templates = [
    {
      id: 'simple_poll',
      name: 'Simple Poll',
      description: 'Create a quick poll with multiple choice answers',
      category: 'social',
      type: 'widget',
      tags: ['poll', 'voting', 'community'],
      template: {
        html: `
<div class="poll-widget">
  <h3>{{question}}</h3>
  <div class="poll-options">
    {{#options}}
    <button class="poll-option" data-option="{{.}}">{{.}}</button>
    {{/options}}
  </div>
  <div class="poll-results" style="display: none;">
    <div id="results"></div>
  </div>
</div>`,
        css: `
.poll-widget {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.poll-option {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 12px;
  border: 2px solid #2A2A2A;
  background: transparent;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
.poll-option:hover {
  background: #111111;
  border-color: #FFD700;
}`,
        js: `
document.querySelectorAll('.poll-option').forEach(button => {
  button.addEventListener('click', function() {
    // Handle vote logic here
    console.log('Voted for:', this.dataset.option);
  });
});`,
        config: {
          question: 'What\'s your favorite campus spot?',
          options: ['Library', 'Student Union', 'Quad', 'Cafeteria']
        }
      },
      customizableFields: [
        {
          name: 'question',
          type: 'text',
          default: 'What\'s your favorite campus spot?',
          required: true
        },
        {
          name: 'options',
          type: 'text',
          default: 'Library,Student Union,Quad,Cafeteria',
          required: true
        }
      ],
      usageCount: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'study_timer',
      name: 'Study Timer',
      description: 'Pomodoro-style study timer for focused sessions',
      category: 'productivity',
      type: 'widget',
      tags: ['timer', 'study', 'productivity', 'pomodoro'],
      template: {
        html: `
<div class="timer-widget">
  <div class="timer-display">
    <span id="minutes">{{defaultMinutes}}</span>:<span id="seconds">00</span>
  </div>
  <div class="timer-controls">
    <button id="start">Start</button>
    <button id="pause">Pause</button>
    <button id="reset">Reset</button>
  </div>
  <div class="timer-mode">
    <label>Session: <input type="number" id="sessionTime" value="{{defaultMinutes}}" min="1" max="60"></label>
  </div>
</div>`,
        css: `
.timer-widget {
  text-align: center;
  font-family: 'Geist Mono', monospace;
  color: white;
  padding: 20px;
}
.timer-display {
  font-size: 48px;
  margin: 20px 0;
  color: #FFD700;
}
.timer-controls button {
  margin: 0 8px;
  padding: 10px 20px;
  background: #2A2A2A;
  color: white;
  border: 1px solid #2A2A2A;
  border-radius: 6px;
  cursor: pointer;
}
.timer-controls button:hover {
  background: #3A3A3A;
}`,
        js: `
let timeLeft = {{defaultMinutes}} * 60;
let isRunning = false;
let interval;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

document.getElementById('start').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;
        alert('Time up!');
      }
    }, 1000);
  }
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
  timeLeft = parseInt(document.getElementById('sessionTime').value) * 60;
  updateDisplay();
});`,
        config: {
          defaultMinutes: 25
        }
      },
      customizableFields: [
        {
          name: 'defaultMinutes',
          type: 'number',
          default: 25,
          required: true
        }
      ],
      usageCount: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const batch = db.batch();
  templates.forEach(template => {
    const ref = db.collection('tool_templates').doc(template.id);
    batch.set(ref, template);
  });

  await batch.commit();
  console.log(`   ✅ Created ${templates.length} tool templates`);
}

async function initModerationRules() {
  console.log('🛡️  Initializing Content Filter Rules...');
  
  if (await collectionExists('content_filter_rules')) {
    console.log('   Content filter rules already exist, skipping...');
    return;
  }

  const rules = [
    {
      id: 'spam_detection',
      name: 'Spam Detection',
      description: 'Detects common spam patterns and excessive promotion',
      patterns: [
        '(buy now|click here|limited time).{0,50}(deal|offer|discount)',
        '(earn \\$|make money|work from home).{0,30}(fast|easy|guaranteed)',
        '(follow me|check out my).{0,20}(link|profile|channel)'
      ],
      keywords: [
        'cryptocurrency', 'bitcoin', 'forex trading', 'get rich quick',
        'mlm', 'pyramid scheme', 'work from home', 'make money fast'
      ],
      contentTypes: ['post', 'comment', 'user_profile'],
      severity: 'medium',
      autoAction: 'queue_review',
      confidence: 0.8,
      active: true,
      testMode: false,
      matches: 0,
      falsePositives: 0,
      accuracy: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'harassment_detection',
      name: 'Harassment Detection',
      description: 'Detects harassment, bullying, and personal attacks',
      patterns: [
        '(you are|you\'re).{0,20}(stupid|idiot|loser|pathetic)',
        '(kill yourself|kys|end it all)',
        '(shut up|stfu).{0,10}(nobody asked|no one cares)'
      ],
      keywords: [
        'harassment', 'bully', 'cyberbully', 'personal attack',
        'doxxing', 'stalking', 'threatening'
      ],
      contentTypes: ['post', 'comment', 'message'],
      severity: 'high',
      autoAction: 'flag',
      confidence: 0.9,
      active: true,
      testMode: false,
      matches: 0,
      falsePositives: 0,
      accuracy: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'academic_integrity',
      name: 'Academic Integrity',
      description: 'Detects potential academic dishonesty and cheating',
      patterns: [
        '(do my|write my).{0,20}(homework|assignment|essay|paper)',
        '(test answers|exam solutions|homework answers)',
        '(pay someone|hire someone).{0,20}(assignment|essay|homework)'
      ],
      keywords: [
        'cheating', 'plagiarism', 'academic dishonesty', 'homework help',
        'essay writing service', 'test bank', 'answer key'
      ],
      contentTypes: ['post', 'comment'],
      severity: 'high',
      autoAction: 'queue_review',
      confidence: 0.85,
      active: true,
      testMode: false,
      matches: 0,
      falsePositives: 0,
      accuracy: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const batch = db.batch();
  rules.forEach(rule => {
    const ref = db.collection('content_filter_rules').doc(rule.id);
    batch.set(ref, rule);
  });

  await batch.commit();
  console.log(`   ✅ Created ${rules.length} content filter rules`);
}

async function initSystemSettings() {
  console.log('⚙️  Initializing System Settings...');
  
  if (await collectionExists('system_settings')) {
    console.log('   System settings already exist, skipping...');
    return;
  }

  const settings = [
    {
      id: 'platform_config',
      category: 'platform',
      settings: {
        maintenanceMode: false,
        signupsEnabled: true,
        spacesEnabled: true,
        ritualsEnabled: true,
        toolsEnabled: true,
        notificationsEnabled: true,
        maxSpacesPerUser: 50,
        maxToolsPerUser: 20,
        maxPostsPerDay: 100,
        enableAnalytics: true,
        enableModeration: true
      },
      lastUpdated: new Date(),
      updatedBy: 'system'
    },
    {
      id: 'moderation_config',
      category: 'moderation',
      settings: {
        autoModerationEnabled: true,
        contentFilterEnabled: true,
        userReportingEnabled: true,
        moderatorReviewRequired: false,
        appealProcessEnabled: true,
        maxReportsBeforeReview: 3,
        autoSuspendThreshold: 5,
        autoBanThreshold: 10,
        rehabilitationEnabled: true,
        moderatorNotifications: true
      },
      lastUpdated: new Date(),
      updatedBy: 'system'
    },
    {
      id: 'notification_config',
      category: 'notifications',
      settings: {
        pushNotificationsEnabled: true,
        emailNotificationsEnabled: true,
        inAppNotificationsEnabled: true,
        batchNotifications: true,
        quietHoursDefault: {
          start: '22:00',
          end: '08:00'
        },
        maxNotificationsPerDay: 50,
        retentionDays: 30,
        groupSimilarNotifications: true
      },
      lastUpdated: new Date(),
      updatedBy: 'system'
    }
  ];

  const batch = db.batch();
  settings.forEach(setting => {
    const ref = db.collection('system_settings').doc(setting.id);
    batch.set(ref, setting);
  });

  await batch.commit();
  console.log(`   ✅ Created ${settings.length} system settings`);
}

async function initAnalyticsConfig() {
  console.log('📊 Initializing Analytics Configuration...');
  
  // Initialize platform analytics document
  const platformAnalyticsRef = db.collection('platform_analytics').doc('current');
  const platformAnalyticsDoc = await platformAnalyticsRef.get();
  
  if (!platformAnalyticsDoc.exists) {
    await platformAnalyticsRef.set({
      date: new Date().toISOString().split('T')[0],
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      totalSpaces: 0,
      activeSpaces: 0,
      totalPosts: 0,
      totalTools: 0,
      ritualsActive: 0,
      averageEngagement: 0,
      retentionRate: 0,
      schoolBreakdown: {},
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('   ✅ Created platform analytics baseline');
  } else {
    console.log('   Platform analytics already exist, skipping...');
  }
}

// Main initialization function
async function initializeDatabase() {
  console.log('🚀 Starting HIVE Database Initialization');
  console.log('=====================================');
  console.log('⚠️  This script will NOT modify existing data');
  console.log('✅ Safe to run on production database');
  console.log('');

  try {
    await initRituals();
    await initNotificationTemplates();
    await initToolTemplates();
    await initModerationRules();
    await initSystemSettings();
    await initAnalyticsConfig();

    console.log('');
    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Review the created collections in Firebase Console');
    console.log('2. Update security rules if needed');
    console.log('3. Test the new features in your application');
    console.log('4. Monitor the new analytics and moderation tools');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Initialization error:', error);
      process.exit(1);
    });
}

export { initializeDatabase };