// Test script to demonstrate event date fixing functionality
// This script simulates the conversion of various date formats to Firestore Timestamps

// Mock event data with various date formats
const mockEvents = [
  {
    id: 'event1',
    data: {
      title: 'Event 1',
      startDate: '2024-04-15 14:30:00',
      endDate: '2024-04-15 16:30:00',
      lastModified: 1681574400000,  // Unix timestamp in milliseconds
      stateUpdatedAt: { seconds: 1681574400, nanoseconds: 0 },  // Firestore Timestamp format
      stateHistory: [
        { state: 'created', timestamp: '2024-04-15 10:00:00' },
        { state: 'updated', timestamp: 1681574400000 }
      ]
    }
  },
  {
    id: 'event2',
    data: {
      title: 'Event 2',
      startDate: '04/15/2024 14:30',
      endDate: null,
      lastModified: '2024-04-15T14:30:00Z',
      stateHistory: []
    }
  },
  {
    id: 'event3',
    data: {
      title: 'Event 3',
      startDate: { seconds: 1681574400, nanoseconds: 0 },  // Already in Timestamp format
      endDate: '2024-04-15',
      stateHistory: [
        { state: 'created', timestamp: { seconds: 1681574400, nanoseconds: 0 } }
      ]
    }
  }
];

// Mock Timestamp class to simulate Firestore
class Timestamp {
  constructor(seconds, nanoseconds = 0) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }

  static fromDate(date) {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = (date.getTime() % 1000) * 1000000;
    return new Timestamp(seconds, nanoseconds);
  }

  toDate() {
    return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
  }
}

// Parse a date from various formats
function parseDate(dateValue) {
  if (dateValue == null) return null;
  
  if (dateValue instanceof Timestamp) {
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
console.log('🔧 Starting event date fix process (TEST)...');
console.log(`📊 Processing ${mockEvents.length} events...`);

// Track statistics
let totalProcessed = 0;
let totalFixed = 0;

// Process each event
for (const event of mockEvents) {
  const eventId = event.id;
  const eventData = event.data;
  
  console.log(`\n🔍 Processing event: ${eventId} - ${eventData.title}`);
  
  let needsUpdate = false;
  const updatedData = {};
  
  // Check start date
  if (eventData.startDate != null && !(eventData.startDate instanceof Timestamp)) {
    try {
      const startDate = parseDate(eventData.startDate);
      if (startDate) {
        updatedData.startDate = Timestamp.fromDate(startDate);
        needsUpdate = true;
        console.log(`  - Converting startDate: ${eventData.startDate} -> ${JSON.stringify(updatedData.startDate)}`);
      }
    } catch (e) {
      console.log(`  ❌ Error parsing startDate: ${eventData.startDate}`);
    }
  }
  
  // Check end date
  if (eventData.endDate != null && !(eventData.endDate instanceof Timestamp)) {
    try {
      const endDate = parseDate(eventData.endDate);
      if (endDate) {
        updatedData.endDate = Timestamp.fromDate(endDate);
        needsUpdate = true;
        console.log(`  - Converting endDate: ${eventData.endDate} -> ${JSON.stringify(updatedData.endDate)}`);
      }
    } catch (e) {
      console.log(`  ❌ Error parsing endDate: ${eventData.endDate}`);
    }
  }
  
  // Check last modified date
  if (eventData.lastModified != null && !(eventData.lastModified instanceof Timestamp)) {
    try {
      const lastModified = parseDate(eventData.lastModified);
      if (lastModified) {
        updatedData.lastModified = Timestamp.fromDate(lastModified);
        needsUpdate = true;
        console.log(`  - Converting lastModified: ${eventData.lastModified} -> ${JSON.stringify(updatedData.lastModified)}`);
      }
    } catch (e) {
      console.log(`  ❌ Error parsing lastModified: ${eventData.lastModified}`);
    }
  }
  
  // Check state history timestamps
  if (Array.isArray(eventData.stateHistory)) {
    let historyChanged = false;
    const updatedHistory = [];
    
    for (const entry of eventData.stateHistory) {
      const updatedEntry = { ...entry };
      
      if (entry.timestamp != null && !(entry.timestamp instanceof Timestamp)) {
        try {
          const timestamp = parseDate(entry.timestamp);
          if (timestamp) {
            updatedEntry.timestamp = Timestamp.fromDate(timestamp);
            historyChanged = true;
            console.log(`  - Converting history timestamp: ${entry.timestamp} -> ${JSON.stringify(updatedEntry.timestamp)}`);
          }
        } catch (e) {
          console.log(`  ❌ Error parsing history timestamp: ${entry.timestamp}`);
        }
      }
      
      updatedHistory.push(updatedEntry);
    }
    
    if (historyChanged) {
      updatedData.stateHistory = updatedHistory;
      needsUpdate = true;
    }
  }
  
  // Simulate update
  if (needsUpdate) {
    // In real code, we would update the document in Firestore here
    totalFixed++;
    console.log(`  ✅ Would update event ${eventId} with:`, updatedData);
  } else {
    console.log(`  ✓ All dates are already in Timestamp format`);
  }
  
  totalProcessed++;
}

// Print summary
console.log('\n📊 Summary:');
console.log(`  - Total events processed: ${totalProcessed}`);
console.log(`  - Events that need date fixes: ${totalFixed}`); 