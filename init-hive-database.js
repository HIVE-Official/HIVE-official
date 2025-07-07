/**
 * HIVE Database Initialization Script
 * Simple Node.js script to initialize new collections
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin with default credentials
admin.initializeApp({
  projectId: 'hive-9265c'
});

const db = admin.firestore();

// Sample data to initialize
const collections = {
  // Rituals collection
  rituals: {
    'first_light_summer_2024': {
      id: 'first_light_summer_2024',
      type: 'first_light',
      status: 'draft',
      title: '🕯️ First Light',
      description: 'Welcome to HIVE. Light your flame with your first public words.',
      instructions: 'Share your first public post to light your flame and join the community.',
      scheduledStart: new Date('2024-07-01T00:00:00Z'),
      scheduledEnd: new Date('2024-07-07T23:59:59Z'),
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
      rewards: [{
        type: 'access',
        name: 'Community Member',
        description: 'Can now post in spaces and participate in discussions',
        autoGrant: true
      }],
      totalParticipants: 0,
      completedParticipants: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },

  // Notification templates
  notification_templates: {
    'ritual_available': {
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
      createdAt: new Date(),
      updatedAt: new Date()
    },
    'space_activated': {
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
      expiryDuration: 259200,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },

  // Tool templates
  tool_templates: {
    'simple_poll': {
      id: 'simple_poll',
      name: 'Simple Poll',
      description: 'Create a quick poll with multiple choice answers',
      category: 'social',
      type: 'widget',
      tags: ['poll', 'voting', 'community'],
      template: {
        html: `<div class="poll-widget">
  <h3>{{question}}</h3>
  <div class="poll-options">
    {{#options}}
    <button class="poll-option" data-option="{{.}}">{{.}}</button>
    {{/options}}
  </div>
</div>`,
        css: `.poll-widget {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #0A0A0A;
  color: white;
  border-radius: 12px;
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
  transition: all 180ms ease;
}
.poll-option:hover {
  background: #111111;
  border-color: #FFD700;
}`,
        js: `document.querySelectorAll('.poll-option').forEach(button => {
  button.addEventListener('click', function() {
    console.log('Voted for:', this.dataset.option);
    // Add voting logic here
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
    'study_timer': {
      id: 'study_timer',
      name: 'Study Timer',
      description: 'Pomodoro-style study timer for focused sessions',
      category: 'productivity',
      type: 'widget',
      tags: ['timer', 'study', 'productivity', 'pomodoro'],
      template: {
        html: `<div class="timer-widget">
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
        css: `.timer-widget {
  text-align: center;
  font-family: 'Geist Mono', monospace;
  color: white;
  padding: 20px;
  background: #0A0A0A;
  border-radius: 12px;
}
.timer-display {
  font-size: 48px;
  margin: 20px 0;
  color: #FFD700;
  font-weight: 600;
}
.timer-controls button {
  margin: 0 8px;
  padding: 10px 20px;
  background: #2A2A2A;
  color: white;
  border: 1px solid #2A2A2A;
  border-radius: 6px;
  cursor: pointer;
  transition: all 180ms ease;
}
.timer-controls button:hover {
  background: #3A3A3A;
  border-color: #FFD700;
}`,
        js: `let timeLeft = {{defaultMinutes}} * 60;
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
        alert('Time up! Take a break! 🎉');
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
  },

  // System settings
  system_settings: {
    'platform_config': {
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
    'moderation_config': {
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
    }
  },

  // Platform analytics baseline
  platform_analytics: {
    'current': {
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
    }
  }
};

async function checkCollectionExists(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).limit(1).get();
    return !snapshot.empty;
  } catch (error) {
    return false;
  }
}

async function initializeCollections() {
  console.log('🚀 Starting HIVE Database Initialization');
  console.log('=====================================');
  console.log('⚠️  This script will NOT modify existing data');
  console.log('✅ Safe to run on production database');
  console.log('');

  try {
    for (const [collectionName, documents] of Object.entries(collections)) {
      console.log(`📁 Initializing ${collectionName}...`);
      
      if (await checkCollectionExists(collectionName)) {
        console.log(`   Collection ${collectionName} already exists, skipping...`);
        continue;
      }

      const batch = db.batch();
      let docCount = 0;

      for (const [docId, docData] of Object.entries(documents)) {
        const docRef = db.collection(collectionName).doc(docId);
        batch.set(docRef, docData);
        docCount++;
      }

      await batch.commit();
      console.log(`   ✅ Created ${docCount} documents in ${collectionName}`);
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
    console.log('2. Update security rules (see packages/core/src/scripts/update-security-rules.ts)');
    console.log('3. Test the new features in your application');
    console.log('4. Monitor the new analytics and moderation tools');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeCollections()
  .then(() => {
    console.log('✅ Initialization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Initialization error:', error);
    process.exit(1);
  });