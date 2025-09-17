#!/usr/bin/env tsx
/**
 * Simple Database Initialization for HIVE
 * 
 * Uses Firebase CLI authentication to initialize the database
 * without requiring service account setup.
 */

import { spawn } from 'child_process';
import * as fs from 'fs';

// Sample data to initialize
const ritualData = {
  id: 'first_light_summer_2024',
  type: 'first_light',
  status: 'draft',
  title: '🕯️ First Light',
  description: 'Welcome to HIVE. Light your flame with your first public words.',
  instructions: 'Share your first public post to light your flame and join the community. This marks the beginning of your HIVE journey.',
  scheduledStart: '2024-07-01T00:00:00Z',
  scheduledEnd: '2024-07-07T23:59:59Z',
  targetAudience: 'all',
  config: {
    participationWindow: 604800,
    reminderSchedule: [24, 6],
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const notificationTemplate = {
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
  expiryDuration: 604800,
  active: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const toolTemplate = {
  id: 'simple_poll',
  name: 'Simple Poll',
  description: 'Create a quick poll with multiple choice answers',
  category: 'social',
  type: 'widget',
  tags: ['poll', 'voting', 'community'],
  template: {
    html: '<div class="poll-widget"><h3>{{question}}</h3><div class="poll-options">{{#options}}<button class="poll-option" data-option="{{.}}">{{.}}</button>{{/options}}</div></div>',
    css: '.poll-widget { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; } .poll-option { display: block; width: 100%; margin: 8px 0; padding: 12px; border: 2px solid #2A2A2A; background: transparent; color: white; border-radius: 8px; cursor: pointer; } .poll-option:hover { background: #111111; border-color: #FFD700; }',
    js: 'document.querySelectorAll(".poll-option").forEach(button => { button.addEventListener("click", function() { console.log("Voted for:", this.dataset.option); }); });',
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const systemSettings = {
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
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

function runFirebaseCommand(collection: string, docId: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create temporary JSON file
    const tempFile = `/tmp/firebase_data_${docId}.json`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
    
    const command = 'firebase';
    const args = [
      'firestore:set',
      `${collection}/${docId}`,
      tempFile,
      '--project', 'hive-9265c'
    ];
    
    console.log(`   📝 Creating ${collection}/${docId}...`);
    
    const child = spawn(command, args, { stdio: 'pipe' });
    
    let output = '';
    let error = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    child.on('close', (code) => {
      // Clean up temp file
      try {
        fs.unlinkSync(tempFile);
      } catch {}
      
      if (code === 0) {
        console.log(`   ✅ Successfully created ${collection}/${docId}`);
        resolve();
      } else {
        console.log(`   ❌ Failed to create ${collection}/${docId}: ${error || output}`);
        reject(new Error(`Firebase command failed: ${error || output}`));
      }
    });
  });
}

async function checkIfDocExists(collection: string, docId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const command = 'firebase';
    const args = [
      'firestore:get',
      `${collection}/${docId}`,
      '--project', 'hive-9265c'
    ];
    
    const child = spawn(command, args, { stdio: 'pipe' });
    
    child.on('close', (code) => {
      // If document exists, firebase firestore:get returns 0
      // If document doesn't exist, it returns non-zero
      resolve(code === 0);
    });
  });
}

async function initializeCollections() {
  console.log('🚀 Starting HIVE Database Initialization');
  console.log('=====================================');
  console.log('⚠️  This script will NOT modify existing data');
  console.log('✅ Safe to run on production database');
  console.log('');

  try {
    // Initialize Rituals
    console.log('🕯️  Initializing Rituals...');
    if (await checkIfDocExists('rituals', 'first_light_summer_2024')) {
      console.log('   Ritual already exists, skipping...');
    } else {
      await runFirebaseCommand('rituals', 'first_light_summer_2024', ritualData);
    }

    // Initialize Notification Templates
    console.log('📬 Initializing Notification Templates...');
    if (await checkIfDocExists('notification_templates', 'ritual_available')) {
      console.log('   Template already exists, skipping...');
    } else {
      await runFirebaseCommand('notification_templates', 'ritual_available', notificationTemplate);
    }

    // Initialize Tool Templates
    console.log('🛠️  Initializing Tool Templates...');
    if (await checkIfDocExists('tool_templates', 'simple_poll')) {
      console.log('   Tool template already exists, skipping...');
    } else {
      await runFirebaseCommand('tool_templates', 'simple_poll', toolTemplate);
    }

    // Initialize System Settings
    console.log('⚙️  Initializing System Settings...');
    if (await checkIfDocExists('system_settings', 'platform_config')) {
      console.log('   System settings already exist, skipping...');
    } else {
      await runFirebaseCommand('system_settings', 'platform_config', systemSettings);
    }

    // Initialize Platform Analytics baseline
    console.log('📊 Initializing Analytics Configuration...');
    if (await checkIfDocExists('platform_analytics', 'current')) {
      console.log('   Platform analytics already exist, skipping...');
    } else {
      const platformAnalytics = {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await runFirebaseCommand('platform_analytics', 'current', platformAnalytics);
    }

    console.log('');
    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('📋 Created collections:');
    console.log('   • rituals - Campus engagement activities');
    console.log('   • notification_templates - Notification management');
    console.log('   • tool_templates - Tool creation templates');
    console.log('   • system_settings - Platform configuration');
    console.log('   • platform_analytics - Analytics baseline');
    console.log('');
    console.log('🔍 Next steps:');
    console.log('1. Review the created collections in Firebase Console');
    console.log('2. Update security rules using: pnpm db:rules');
    console.log('3. Test the new features in your application');
    console.log('4. Monitor the new analytics and moderation tools');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeCollections()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Initialization error:', error);
      process.exit(1);
    });
}

export { initializeCollections };