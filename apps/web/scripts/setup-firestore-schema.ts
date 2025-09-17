import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || 
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChinojw2B835Lt\nwCUUJp9B3mlbBRM/IvX9wBUQp8GRT9Lse4qZNuCQlcjgpP/ZSfKDsX64Y4R8rfi4\n6F6imrFWBHvOZv93DauXPQRCUozqo5+G4e000A8Mj+bqXJ/HmeEX0XPKWFJBRJdV\noHIB6iL1MboxxsaxltSmFepB95Qr8DQcT/heMgxvwujt/LykMNpyMAxvL+ToCrQD\n3fk0Yk4GYC3etlqch0NqJTq95uEu6E0znwl45duPyE8gvfslfiNCIkzug7QmaSPw\nOfMYkRTMv+byOYNdqdeOGjgyLN8SjpQ71OG+x+oUZ7FxIHRTPkRrmQC0lROERfmv\nB7YYVmk9AgMBAAECggEAFD2JEz0SNGNBAigenTk/oB2xfrWSlUkYoFw2Z3lVgBML\n3xSVp5/gIE2cN0WFRyEEUWrmcU0K1yJnNSfsX5xZVulF5/Uw0iZ01wTOqU61mFq7\nDMf3FDRzhkPrj3bekEBgGz9jrjlFySbCfXiWgFXpXmaGKWF6GNtItqytRumx95U0\nbFTy/lJhEuTdmPfKqgbArn4O5YO1CDBDnUVPjbpUCe+1UtA20HVnH76S39upa7Ze\n96jVW2cUBnXeV5DX/tnJhsguOouUXykdkhJdN6LVh2ghGYHPnPtPG6Sz/L8db5tg\ntgs0VkcgKlhiT8R5HEpwLkfRqpHkc6v27gZL6v3LsQKBgQDkZsmbrAUoLnLItjvO\nM99pb33pv3kezgFzYa2yAcvH3IzeiPUbavn/hIbuHyArQ0niFS69lpg4oIEL4V5z\n3WgfH14bamWB0DRLO5NlgMFOnEpUd2O48+yLcnlMyyljjxZnmZnBTXE8CgbcIRkL\n3F6q6bCPPYJRWed799UBFRyX1QKBgQC1D3iSfzj1vHmPCY34b65+pG2pTRoJPfT+\nji0SjluL+CuXdaGFgVLqyr0Y5taCEDnHAjMZC2UdNHX0X/Yu/FXqLgesT3vN9XPo\nbZJjkWtCHwLwSJUg2rkR93B732FQ3615m/Og9yluEZgKanUGpF97zkHrXa3DiQV7\nJNoTe1rnyQKBgCtcgEX3oHsCZnRIdI4vNujza7omyb3ZalkXYDx9LszgyDWvVqk/\n4/polJ08d4T/H1W2o8sGfhuyDQ3OWXoxvIS8FceqqV69wk/OHauViB1+enYSvHHu\njSfkMbcsksz960j71j7mjurRFIBSIEkqKybTetuW19jN8q6MXHn6IhWJAoGBAJcw\nnQkPjTu9r2/elZtffsEngp690EDpaJvrkv2MvCssBxKJWmAF9nwy4SZbE8I11Fk2\nn/6Iwl1ZwilWvFbNxNwwpZ2gHYyFKs1qObRE6OCkzqpgoY52tdWn3ljB1hxXOx9y\nN0UxPno33NLNxHzQYx8Zw3fLmN7PmzESO7vK5MTpAoGAVWf5yhUVTbyy/fUYdY8e\nApS6gCYYUG87lail9YdHY62yxxvtj1/ivRAI1vRfUkVg1UhEIWMdUEKVU0LT3f6V\nhN5dhYkdOMNdGaEMVPgjGBinCBP4/ul5Sq3Ek24H0tWsB+lH+KrrZzvVpht3WpHy\nsWaR0bpjkATiqnz441r1+2E=\n-----END PRIVATE KEY-----\n";

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'hive-9265c',
      clientEmail: 'firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com',
      privateKey: privateKey
    })
  });
}

const db = admin.firestore();
const auth = admin.auth();

// Define the complete user profile schema
interface UserProfile {
  // Core fields
  uid: string;
  email: string;
  handle: string;
  displayName: string;
  
  // Profile details
  bio?: string;
  major?: string;
  graduationYear?: number;
  interests?: string[];
  skills?: string[];
  
  // Campus info
  campusId: string;
  housing?: string;
  year?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  
  // Avatar
  photoURL?: string;
  avatarStyle?: {
    backgroundColor: string;
    textColor: string;
  };
  
  // Privacy settings
  privacy: {
    profileVisibility: 'public' | 'connections' | 'private';
    showEmail: boolean;
    showActivity: boolean;
    allowMessages: 'everyone' | 'connections' | 'none';
  };
  
  // Status
  isBuilder: boolean;
  isVerified: boolean;
  onboardingCompleted: boolean;
  
  // Timestamps
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
  lastActive: admin.firestore.Timestamp;
  
  // Stats
  stats: {
    spacesJoined: number;
    spacesCreated: number;
    toolsBuilt: number;
    connectionsCount: number;
    resourcesShared: number;
    studyGroupsJoined: number;
  };
}

async function setupSchema() {
  console.log('🚀 Setting up Firestore schema for HIVE profiles...\n');
  
  try {
    // Create sample users with complete profiles
    const sampleUsers = [
      {
        uid: 'demo-user-1',
        email: 'sarah.chen@buffalo.edu',
        handle: 'sarahchen',
        displayName: 'Sarah Chen',
        bio: 'CS Major | Building tools for student success | Always down for coffee & code',
        major: 'Computer Science',
        graduationYear: 2025,
        interests: ['web-dev', 'ai', 'hackathons', 'coffee'],
        skills: ['React', 'TypeScript', 'Python', 'Firebase'],
        campusId: 'ub-buffalo',
        housing: 'Ellicott Complex',
        year: 'junior',
        photoURL: null,
        avatarStyle: {
          backgroundColor: '#6B46C1',
          textColor: '#FFFFFF'
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showActivity: true,
          allowMessages: 'connections'
        },
        isBuilder: true,
        isVerified: true,
        onboardingCompleted: true,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
        lastActive: admin.firestore.Timestamp.now(),
        stats: {
          spacesJoined: 5,
          spacesCreated: 2,
          toolsBuilt: 3,
          connectionsCount: 47,
          resourcesShared: 12,
          studyGroupsJoined: 3
        }
      },
      {
        uid: 'demo-user-2',
        email: 'mike.johnson@buffalo.edu',
        handle: 'mikej',
        displayName: 'Mike Johnson',
        bio: 'Engineering student | Study group organizer | Night owl coder',
        major: 'Mechanical Engineering',
        graduationYear: 2026,
        interests: ['robotics', '3d-printing', 'study-groups'],
        skills: ['CAD', 'MATLAB', 'Arduino'],
        campusId: 'ub-buffalo',
        housing: 'Governors Complex',
        year: 'sophomore',
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showActivity: true,
          allowMessages: 'everyone'
        },
        isBuilder: false,
        isVerified: true,
        onboardingCompleted: true,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
        lastActive: admin.firestore.Timestamp.now(),
        stats: {
          spacesJoined: 8,
          spacesCreated: 1,
          toolsBuilt: 0,
          connectionsCount: 23,
          resourcesShared: 5,
          studyGroupsJoined: 6
        }
      },
      {
        uid: 'demo-user-3',
        email: 'emily.rodriguez@buffalo.edu',
        handle: 'emilyr',
        displayName: 'Emily Rodriguez',
        bio: 'Pre-med | Textbook exchange coordinator | Morning study sessions',
        major: 'Biology',
        graduationYear: 2024,
        interests: ['pre-med', 'volunteering', 'research'],
        skills: ['Research', 'Lab Techniques', 'Data Analysis'],
        campusId: 'ub-buffalo',
        housing: 'Off-campus',
        year: 'senior',
        privacy: {
          profileVisibility: 'connections',
          showEmail: false,
          showActivity: false,
          allowMessages: 'connections'
        },
        isBuilder: false,
        isVerified: true,
        onboardingCompleted: true,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
        lastActive: admin.firestore.Timestamp.now(),
        stats: {
          spacesJoined: 4,
          spacesCreated: 0,
          toolsBuilt: 0,
          connectionsCount: 31,
          resourcesShared: 18,
          studyGroupsJoined: 4
        }
      }
    ];
    
    // Create users in Firestore
    console.log('👤 Creating sample user profiles...');
    for (const user of sampleUsers) {
      await db.collection('users').doc(user.uid).set(user as any);
      console.log(`  ✅ Created profile for ${user.displayName} (@${user.handle})`);
    }
    
    // Create sample connections
    console.log('\n🤝 Creating sample connections...');
    await db.collection('connections').doc('demo-user-1_demo-user-2').set({
      user1: 'demo-user-1',
      user2: 'demo-user-2',
      status: 'connected',
      connectedAt: admin.firestore.Timestamp.now(),
      type: 'study-partner'
    });
    console.log('  ✅ Connected Sarah and Mike as study partners');
    
    await db.collection('connections').doc('demo-user-1_demo-user-3').set({
      user1: 'demo-user-1',
      user2: 'demo-user-3',
      status: 'connected',
      connectedAt: admin.firestore.Timestamp.now(),
      type: 'classmate'
    });
    console.log('  ✅ Connected Sarah and Emily as classmates');
    
    // Create sample spaces
    console.log('\n🏛️ Creating sample spaces...');
    const spaces = [
      {
        id: 'cs-study-group',
        name: 'CS Study Group',
        description: 'Computer Science students helping each other succeed',
        category: 'academic',
        campusId: 'ub-buffalo',
        createdBy: 'demo-user-1',
        memberCount: 47,
        isActive: true,
        tags: ['computer-science', 'study-group', 'tutoring'],
        createdAt: admin.firestore.Timestamp.now()
      },
      {
        id: 'textbook-exchange',
        name: 'UB Textbook Exchange',
        description: 'Buy, sell, and share textbooks with fellow Bulls',
        category: 'marketplace',
        campusId: 'ub-buffalo',
        createdBy: 'demo-user-3',
        memberCount: 234,
        isActive: true,
        tags: ['textbooks', 'marketplace', 'resources'],
        createdAt: admin.firestore.Timestamp.now()
      }
    ];
    
    for (const space of spaces) {
      await db.collection('spaces').doc(space.id).set(space);
      console.log(`  ✅ Created space: ${space.name}`);
    }
    
    // Create sample study groups
    console.log('\n📚 Creating sample study groups...');
    await db.collection('studyGroups').doc('calc-iii-group').set({
      name: 'Calculus III Study Group',
      courseCode: 'MTH 241',
      createdBy: 'demo-user-2',
      members: ['demo-user-1', 'demo-user-2', 'demo-user-3'],
      meetingTime: 'Mon/Wed 7-9pm',
      location: 'Lockwood Library',
      studyStyle: 'intensive',
      isActive: true,
      createdAt: admin.firestore.Timestamp.now()
    });
    console.log('  ✅ Created Calculus III study group');
    
    // Create sample resources
    console.log('\n📦 Creating sample resources...');
    await db.collection('resources').doc('resource-1').set({
      type: 'textbook',
      title: 'Calculus: Early Transcendentals',
      description: 'Stewart 8th Edition - Great condition',
      ownerId: 'demo-user-3',
      price: 45,
      condition: 'good',
      availability: 'available',
      courseCode: 'MTH 241',
      createdAt: admin.firestore.Timestamp.now()
    });
    console.log('  ✅ Created sample textbook resource');
    
    // Create indexes metadata
    console.log('\n🔍 Setting up collection metadata...');
    await db.collection('metadata').doc('collections').set({
      users: {
        count: 3,
        lastUpdated: admin.firestore.Timestamp.now()
      },
      spaces: {
        count: 2,
        lastUpdated: admin.firestore.Timestamp.now()
      },
      connections: {
        count: 2,
        lastUpdated: admin.firestore.Timestamp.now()
      }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Firestore schema setup complete!');
    console.log('\n📊 Created:');
    console.log('  - 3 user profiles with complete data');
    console.log('  - 2 connections between users');
    console.log('  - 2 spaces');
    console.log('  - 1 study group');
    console.log('  - 1 resource');
    console.log('\n🚀 Your Firestore is now ready for production!');
    
  } catch (error) {
    console.error('❌ Schema setup failed:', error);
    process.exit(1);
  }
}

setupSchema();