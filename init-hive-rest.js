/**
 * HIVE Database Initialization using Firestore REST API
 * Uses Firebase CLI authentication
 */

const { spawn, execSync } = require('child_process');
const https = require('https');

const PROJECT_ID = 'hive-9265c';

// Get Firebase access token
function getAccessToken() {
  try {
    const result = execSync('firebase auth:print-access-token', { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    console.error('❌ Failed to get Firebase access token. Make sure you\'re logged in with: firebase login');
    process.exit(1);
  }
}

// Check if document exists
function checkDocumentExists(collection, docId, accessToken) {
  return new Promise((resolve) => {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}`;
    
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      if (res.statusCode === 200) {
        resolve(true); // Document exists
      } else if (res.statusCode === 404) {
        resolve(false); // Document doesn't exist
      } else {
        resolve(false); // Assume doesn't exist on other errors
      }
    });

    req.on('error', () => resolve(false));
    req.end();
  });
}

// Create document via REST API
function createDocument(collection, docId, data, accessToken) {
  return new Promise((resolve, reject) => {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?documentId=${docId}`;
    
    // Convert JS object to Firestore format
    function convertToFirestoreValue(obj) {
      if (obj === null) return { nullValue: null };
      if (typeof obj === 'boolean') return { booleanValue: obj };
      if (typeof obj === 'number') return { doubleValue: obj };
      if (typeof obj === 'string') return { stringValue: obj };
      if (obj instanceof Date) return { timestampValue: obj.toISOString() };
      if (Array.isArray(obj)) {
        return {
          arrayValue: {
            values: obj.map(convertToFirestoreValue)
          }
        };
      }
      if (typeof obj === 'object') {
        const fields = {};
        for (const [key, value] of Object.entries(obj)) {
          fields[key] = convertToFirestoreValue(value);
        }
        return { mapValue: { fields } };
      }
      return { stringValue: String(obj) };
    }

    const firestoreDoc = {
      fields: {}
    };

    for (const [key, value] of Object.entries(data)) {
      firestoreDoc.fields[key] = convertToFirestoreValue(value);
    }

    const postData = JSON.stringify(firestoreDoc);

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Sample data
const collections = {
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
    }
  },

  tool_templates: {
    'simple_poll': {
      id: 'simple_poll',
      name: 'Simple Poll',
      description: 'Create a quick poll with multiple choice answers',
      category: 'social',
      type: 'widget',
      tags: ['poll', 'voting', 'community'],
      template: {
        html: '<div class="poll-widget"><h3>{{question}}</h3><div class="poll-options">{{#options}}<button class="poll-option" data-option="{{.}}">{{.}}</button>{{/options}}</div></div>',
        css: '.poll-widget { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background: #0A0A0A; color: white; border-radius: 12px; } .poll-option { display: block; width: 100%; margin: 8px 0; padding: 12px; border: 2px solid #2A2A2A; background: transparent; color: white; border-radius: 8px; cursor: pointer; transition: all 180ms ease; } .poll-option:hover { background: #111111; border-color: #FFD700; }',
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
        }
      ],
      usageCount: 0,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },

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
    }
  },

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

async function initializeDatabase() {
  console.log('🚀 Starting HIVE Database Initialization');
  console.log('=====================================');
  console.log('⚠️  This script will NOT modify existing data');
  console.log('✅ Safe to run on production database');
  console.log('');

  try {
    console.log('🔑 Getting Firebase access token...');
    const accessToken = getAccessToken();
    console.log('✅ Authentication successful');
    console.log('');

    for (const [collectionName, documents] of Object.entries(collections)) {
      console.log(`📁 Initializing ${collectionName}...`);
      
      let createdCount = 0;
      let skippedCount = 0;

      for (const [docId, docData] of Object.entries(documents)) {
        const exists = await checkDocumentExists(collectionName, docId, accessToken);
        
        if (exists) {
          console.log(`   ⏭️  Document ${docId} already exists, skipping...`);
          skippedCount++;
        } else {
          await createDocument(collectionName, docId, docData, accessToken);
          console.log(`   ✅ Created document ${docId}`);
          createdCount++;
        }
      }

      if (createdCount > 0) {
        console.log(`   📊 Created ${createdCount} new documents in ${collectionName}`);
      }
      if (skippedCount > 0) {
        console.log(`   📊 Skipped ${skippedCount} existing documents in ${collectionName}`);
      }
    }

    console.log('');
    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('📋 Initialized collections:');
    console.log('   • rituals - Campus engagement activities (First Light ritual ready)');
    console.log('   • notification_templates - Notification management system');
    console.log('   • tool_templates - Tool creation templates (Poll & Timer)');
    console.log('   • system_settings - Platform configuration');
    console.log('   • platform_analytics - Analytics baseline');
    console.log('');
    console.log('🔍 Next steps:');
    console.log('1. ✅ Review created collections in Firebase Console');
    console.log('2. 🔒 Update security rules (run: cd packages/core && pnpm db:rules)');
    console.log('3. 🧪 Test new features in your application');
    console.log('4. 📊 Monitor analytics and engagement metrics');
    console.log('');
    console.log('🌟 Your HIVE database is now enhanced and ready!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();