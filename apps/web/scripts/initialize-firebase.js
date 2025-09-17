/**
 * Initialize Firebase Firestore Collections
 * Run this script to set up the initial collections and documents needed for HIVE
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require(path.join(__dirname, '../firebase-service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hive-9265c-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

async function initializeCollections() {
  console.log('🚀 Initializing Firebase collections for HIVE...\n');

  try {
    // 1. Create schools collection with UB
    console.log('📚 Creating schools collection...');
    const schoolData = {
      id: 'ub-buffalo',
      name: 'University at Buffalo',
      domain: 'buffalo.edu',
      active: true,
      campuses: ['North Campus', 'South Campus', 'Downtown Campus'],
      colors: {
        primary: '#005BBB',
        secondary: '#FFB81C'
      },
      mascot: 'Victor E. Bull',
      totalStudents: 32000,
      founded: 1846,
      location: {
        city: 'Buffalo',
        state: 'NY',
        country: 'USA'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('schools').doc('ub-buffalo').set(schoolData);
    console.log('✅ School created: University at Buffalo');

    // 2. Create sample spaces
    console.log('\n🏠 Creating initial spaces...');
    const spaces = [
      {
        id: 'cs-2025',
        name: 'Computer Science 2025',
        description: 'Space for CS majors graduating in 2025',
        type: 'cohort',
        schoolId: 'ub-buffalo',
        visibility: 'public',
        memberCount: 0,
        category: 'academic',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        id: 'hackathon-club',
        name: 'UB Hackathon Club',
        description: 'Organize and participate in hackathons',
        type: 'club',
        schoolId: 'ub-buffalo',
        visibility: 'public',
        memberCount: 0,
        category: 'technology',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        id: 'north-campus-events',
        name: 'North Campus Events',
        description: 'Events happening on North Campus',
        type: 'community',
        schoolId: 'ub-buffalo',
        visibility: 'public',
        memberCount: 0,
        category: 'social',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    for (const space of spaces) {
      await db.collection('spaces').doc(space.id).set(space);
      console.log(`✅ Space created: ${space.name}`);
    }

    // 3. Create majors collection
    console.log('\n🎓 Creating majors collection...');
    const majors = [
      'Computer Science',
      'Computer Engineering',
      'Psychology',
      'Business Administration',
      'Mechanical Engineering',
      'Biology',
      'Economics',
      'Data Science',
      'Nursing',
      'Architecture'
    ];

    for (const major of majors) {
      await db.collection('majors').doc(major.toLowerCase().replace(/\s+/g, '-')).set({
        name: major,
        schoolId: 'ub-buffalo',
        active: true
      });
    }
    console.log(`✅ Created ${majors.length} majors`);

    // 4. Create interests collection
    console.log('\n💡 Creating interests collection...');
    const interests = [
      { id: 'coding', name: 'Coding', category: 'technology' },
      { id: 'design', name: 'Design', category: 'creative' },
      { id: 'music', name: 'Music', category: 'arts' },
      { id: 'sports', name: 'Sports', category: 'athletics' },
      { id: 'gaming', name: 'Gaming', category: 'entertainment' },
      { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'business' },
      { id: 'research', name: 'Research', category: 'academic' },
      { id: 'volunteering', name: 'Volunteering', category: 'social' },
      { id: 'photography', name: 'Photography', category: 'creative' },
      { id: 'ai-ml', name: 'AI/Machine Learning', category: 'technology' }
    ];

    for (const interest of interests) {
      await db.collection('interests').doc(interest.id).set(interest);
    }
    console.log(`✅ Created ${interests.length} interests`);

    // 5. Initialize feature flags
    console.log('\n🚩 Creating feature flags...');
    const featureFlags = {
      enableRituals: true,
      enableTools: true,
      enableGhostMode: true,
      enableAnalytics: true,
      enableNotifications: true,
      maxSpacesPerUser: 20,
      maxBuilderSpaces: 5,
      enableMagicLinks: true
    };

    await db.collection('config').doc('features').set(featureFlags);
    console.log('✅ Feature flags initialized');

    // 6. Create rituals templates
    console.log('\n🔄 Creating ritual templates...');
    const ritualTemplates = [
      {
        id: 'daily-standup',
        name: 'Daily Standup',
        description: 'Quick daily check-in with your team',
        frequency: 'daily',
        duration: 15,
        category: 'productivity'
      },
      {
        id: 'weekly-review',
        name: 'Weekly Review',
        description: 'Review the week and plan ahead',
        frequency: 'weekly',
        duration: 30,
        category: 'planning'
      },
      {
        id: 'study-group',
        name: 'Study Group',
        description: 'Regular study session with classmates',
        frequency: 'custom',
        duration: 120,
        category: 'academic'
      }
    ];

    for (const template of ritualTemplates) {
      await db.collection('ritualTemplates').doc(template.id).set(template);
    }
    console.log(`✅ Created ${ritualTemplates.length} ritual templates`);

    console.log('\n🎉 Firebase initialization complete!');
    console.log('Your HIVE platform is ready to use with:');
    console.log('- University at Buffalo school configuration');
    console.log('- Initial spaces for students to join');
    console.log('- Majors and interests for onboarding');
    console.log('- Feature flags and ritual templates');
    
    console.log('\n📱 Next steps:');
    console.log('1. Enable Email/Password authentication in Firebase Console');
    console.log('2. Configure authorized domains for magic links');
    console.log('3. Set up email templates (optional)');
    console.log('4. Test the auth flow at http://localhost:3000/auth');

  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the initialization
initializeCollections();