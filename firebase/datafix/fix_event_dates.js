const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function fixEventDates() {
  try {
    // Get all events from the collection
    console.log('📋 Fetching all events from Firestore...');
    const eventsSnapshot = await firestore.collection('events').get();
    console.log(`🔍 Found ${eventsSnapshot.docs.length} events to process`);
    
    // Track statistics
    let totalProcessed = 0;
    let totalFixed = 0;
    
    // Process each event
    for (const doc of eventsSnapshot.docs) {
      const eventId = doc.id;
      const eventData = doc.data();
      
      let needsUpdate = false;
      const updatedData = {};
      
      // Check start date
      if (eventData.startDate != null && !(eventData.startDate instanceof admin.firestore.Timestamp)) {
        try {
          const startDate = parseDate(eventData.startDate);
          if (startDate) {
            updatedData.startDate = admin.firestore.Timestamp.fromDate(startDate);
            needsUpdate = true;
          }
        } catch (e) {
          console.log(`❌ Error parsing startDate for event ${eventId}: ${eventData.startDate}`);
        }
      }
      
      // Check end date
      if (eventData.endDate != null && !(eventData.endDate instanceof admin.firestore.Timestamp)) {
        try {
          const endDate = parseDate(eventData.endDate);
          if (endDate) {
            updatedData.endDate = admin.firestore.Timestamp.fromDate(endDate);
            needsUpdate = true;
          }
        } catch (e) {
          console.log(`❌ Error parsing endDate for event ${eventId}: ${eventData.endDate}`);
        }
      }
      
      // Check last modified date
      if (eventData.lastModified != null && !(eventData.lastModified instanceof admin.firestore.Timestamp)) {
        try {
          const lastModified = parseDate(eventData.lastModified);
          if (lastModified) {
            updatedData.lastModified = admin.firestore.Timestamp.fromDate(lastModified);
            needsUpdate = true;
          }
        } catch (e) {
          console.log(`❌ Error parsing lastModified for event ${eventId}: ${eventData.lastModified}`);
        }
      }
      
      // Check state updated at date
      if (eventData.stateUpdatedAt != null && !(eventData.stateUpdatedAt instanceof admin.firestore.Timestamp)) {
        try {
          const stateUpdatedAt = parseDate(eventData.stateUpdatedAt);
          if (stateUpdatedAt) {
            updatedData.stateUpdatedAt = admin.firestore.Timestamp.fromDate(stateUpdatedAt);
            needsUpdate = true;
          }
        } catch (e) {
          console.log(`❌ Error parsing stateUpdatedAt for event ${eventId}: ${eventData.stateUpdatedAt}`);
        }
      }
      
      // Update state history timestamps if needed
      if (Array.isArray(eventData.stateHistory)) {
        let historyChanged = false;
        const updatedHistory = [];
        
        for (const entry of eventData.stateHistory) {
          const updatedEntry = { ...entry };
          
          if (entry.timestamp != null && !(entry.timestamp instanceof admin.firestore.Timestamp)) {
            try {
              const timestamp = parseDate(entry.timestamp);
              if (timestamp) {
                updatedEntry.timestamp = admin.firestore.Timestamp.fromDate(timestamp);
                historyChanged = true;
              }
            } catch (e) {
              console.log(`❌ Error parsing history timestamp for event ${eventId}: ${entry.timestamp}`);
            }
          }
          
          updatedHistory.push(updatedEntry);
        }
        
        if (historyChanged) {
          updatedData.stateHistory = updatedHistory;
          needsUpdate = true;
        }
      }
      
      // Update event if needed
      if (needsUpdate) {
        try {
          await firestore.collection('events').doc(eventId).update(updatedData);
          totalFixed++;
          console.log(`✅ Fixed dates for event ${eventId}`);
        } catch (e) {
          console.log(`❌ Error updating event ${eventId}: ${e}`);
        }
      }
      
      totalProcessed++;
      if (totalProcessed % 10 === 0) {
        console.log(`🔄 Progress: ${totalProcessed}/${eventsSnapshot.docs.length} events processed`);
      }
    }
    
    console.log(`📊 Summary: Fixed dates in ${totalFixed}/${eventsSnapshot.docs.length} events`);
  } catch (e) {
    console.log(`❌ Error fixing event dates: ${e}`);
  } finally {
    // End the Firebase app
    admin.app().delete();
  }
}

// Parse a date from various formats
function parseDate(dateValue) {
  if (dateValue == null) return null;
  
  if (dateValue instanceof admin.firestore.Timestamp) {
    return dateValue.toDate();
  } else if (typeof dateValue === 'string') {
    // Try parsing as ISO 8601
    let date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // Try other date formats
    const formats = [
      { regex: /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, fn: (m) => new Date(m[1], m[2]-1, m[3], m[4], m[5], m[6]) },
      { regex: /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/, fn: (m) => new Date(m[1], m[2]-1, m[3], m[4], m[5]) },
      { regex: /^(\d{4})-(\d{2})-(\d{2})$/, fn: (m) => new Date(m[1], m[2]-1, m[3]) },
      { regex: /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/, fn: (m) => new Date(m[3], m[1]-1, m[2], m[4], m[5], m[6]) },
      { regex: /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/, fn: (m) => new Date(m[3], m[1]-1, m[2], m[4], m[5]) },
      { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, fn: (m) => new Date(m[3], m[1]-1, m[2]) }
    ];
    
    for (const format of formats) {
      const match = dateValue.match(format.regex);
      if (match) {
        const date = format.fn(match);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }
  } else if (typeof dateValue === 'number') {
    // Assume milliseconds since epoch
    return new Date(dateValue);
  } else if (typeof dateValue === 'object' && 
             'seconds' in dateValue && 
             'nanoseconds' in dateValue) {
    // Handle Firestore Timestamp object format
    return new Date(dateValue.seconds * 1000 + dateValue.nanoseconds / 1000000);
  }
  
  // Could not parse date
  return null;
}

// Start the fix process
console.log('🔧 Starting event date fix process...');
fixEventDates(); 