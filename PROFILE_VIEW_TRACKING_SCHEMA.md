# 👁️ **HIVE Profile View Tracking - Database Schema**

## 🎯 **System Overview**

**Cost-Optimized, Privacy-First Profile View Tracking System**

- **Batch processing** to minimize Firebase write operations
- **Privacy controls** respect ghost mode and user preferences  
- **Real-time counters** for immediate social proof
- **Aggregated analytics** for cost-efficient reporting

---

## 🗄️ **Firestore Collections**

### **1. `profile_view_stats` - Daily Aggregated Data (Primary)**

**Purpose**: Cost-efficient daily aggregations for analytics dashboard

```typescript
// Document ID: `{viewedUserId}_{YYYY-MM-DD}`
interface ProfileViewStats {
  viewedUserId: string;           // User whose profile was viewed
  date: string;                   // YYYY-MM-DD format
  viewCount: number;              // Total views this day
  uniqueViewers: number;          // Unique viewers this day (approx)
  publicViewCount: number;        // Anonymous public profile views
  contextBreakdown: {             // Views by source
    search: number;               // From search results
    space: number;                // From space member lists
    direct_link: number;          // Direct profile URL
    recommendation: number;       // From people recommendations
    profile_card: number;         // From profile cards in feed
  };
  updatedAt: Timestamp;
  campusId: 'ub-buffalo';         // Campus isolation for v1
}
```

**Firestore Rules**:
```javascript
// Only allow users to read their own stats
match /profile_view_stats/{statsId} {
  allow read: if request.auth != null && 
    resource.data.viewedUserId == request.auth.uid;
  allow write: if false; // Only server writes
}
```

### **2. `profile_views` - Individual View Records (Secondary)**

**Purpose**: Detailed tracking for "who viewed your profile" feature

```typescript
// Document ID: Auto-generated
interface ProfileView {
  viewerId: string;               // Who viewed (or 'anonymous')
  viewedUserId: string;           // Whose profile was viewed
  timestamp: Timestamp;           // When the view occurred
  context: 'search' | 'space' | 'direct_link' | 'recommendation' | 'profile_card';
  spaceId?: string;               // If viewed from space context
  anonymous: boolean;             // Viewer was in ghost mode
  campusId: 'ub-buffalo';         // Campus isolation
}
```

**Storage Strategy**: 
- Only store **non-anonymous views** for cost efficiency
- **Limit to last 30 days** with TTL cleanup
- **Max 20 views per batch** to control costs

**Firestore Rules**:
```javascript
match /profile_views/{viewId} {
  allow read: if request.auth != null && 
    (resource.data.viewedUserId == request.auth.uid ||
     resource.data.viewerId == request.auth.uid);
  allow write: if false; // Only server writes
}
```

### **3. Enhanced `users` Collection Fields**

**Purpose**: Real-time counters for immediate social proof

```typescript
// Added to existing users/{userId} document
interface UserProfileExtensions {
  // View counters (updated in real-time)
  profileViewCount: number;       // All-time total views
  profileViewCountThisWeek: number; // Rolling 7-day count
  lastProfileView: Timestamp;     // Most recent view timestamp
  
  // Social metrics
  connectionCount: number;        // For future connection system
  
  // Privacy settings (quick access)
  ghostMode?: {
    enabled: boolean;
    level: 'minimal' | 'moderate' | 'maximum';
  };
  
  // Discovery settings
  allowViewTracking: boolean;     // Default true
  showViewers: boolean;           // Show "who viewed" list
}
```

---

## 📊 **API Endpoints Implementation**

### **POST `/api/profile/views` - Track View**

**Request**:
```typescript
{
  viewedUserId: string;
  context: 'search' | 'space' | 'direct_link' | 'recommendation';
  spaceId?: string;
  anonymous?: boolean; // Auto-detected from user's ghost mode
}
```

**Response**:
```typescript
{
  success: true,
  message: "View tracked",
  batched: true // Indicates batched processing
}
```

**Batch Processing**:
- Views collected in 30-second batches
- Max 50 views per batch
- Automatic deduplication (same viewer, 5-minute window)

### **GET `/api/profile/views` - View Analytics**

**Query Params**:
- `timeRange`: 'day' | 'week' | 'month' (default: 'week')
- `includeViewers`: boolean (default: false)

**Response**:
```typescript
{
  success: true,
  analytics: {
    summary: {
      totalViews: number;
      uniqueViewers: number;
      averageViewsPerDay: number;
      timeRange: string;
    },
    trends: {
      daily: Array<{
        date: string;
        views: number;
        uniqueViewers: number;
      }>;
    },
    contexts: {
      search: number;
      space: number;
      direct_link: number;
      recommendation: number;
    },
    recentViewers?: Array<{ // Only if includeViewers=true
      viewerId: string;
      timestamp: string;
      context: string;
    }>;
  }
}
```

---

## 💰 **Cost Optimization Strategy**

### **Write Operations (Expensive)**
- **Batched writes every 30 seconds** (reduce from potential 1000s to ~120 per hour)
- **Aggregated daily stats** instead of individual view storage
- **Deduplication** prevents spam writes
- **Anonymous filtering** reduces storage for privacy

### **Read Operations (Cheaper)**
- **Dashboard queries** read from aggregated stats only
- **Individual views** only queried when explicitly requested
- **Limited time ranges** (max 31 days) to control query costs
- **Pagination** for large result sets

### **Cost Estimates (UB 1000 active users)**
- **Daily writes**: ~500 batch operations vs. 10,000+ individual writes
- **Monthly storage**: ~30KB per user vs. 500KB+ with individual tracking
- **Analytics queries**: 1-3 reads per dashboard vs. 30+ raw aggregation

**Estimated monthly cost**: **$2-5** vs. $50-100+ with naive implementation

---

## 🔒 **Privacy Implementation**

### **Ghost Mode Compliance**
```typescript
// Privacy check in view tracking
const viewerInGhostMode = viewerPrivacy?.ghostMode?.enabled || viewData.anonymous;
const allowsViewTracking = viewedUserPrivacy?.allowAnalytics !== false;

if (!allowsViewTracking) {
  return { success: true, message: 'View not tracked due to privacy settings' };
}

// Store as anonymous if viewer in ghost mode
const viewerIdToStore = viewerInGhostMode ? 'anonymous' : viewerId;
```

### **Privacy Controls**
- **allowAnalytics**: User can opt out of all view tracking
- **showViewers**: Control "who viewed your profile" visibility
- **ghostMode levels**:
  - **Minimal**: Hide online status, allow view tracking
  - **Moderate**: Anonymous views only, hide activity
  - **Maximum**: No tracking, minimal profile visibility

---

## ⚡ **Performance Optimizations**

### **Batch Processing System**
```typescript
// In-memory batch storage (Redis in production)
const viewBatch = new Map<string, ProfileView[]>();
const BATCH_INTERVAL = 30000; // 30 seconds
const MAX_BATCH_SIZE = 50;

// Automatic flush on interval or size limit
setInterval(() => {
  flushExpiredBatches();
}, BATCH_INTERVAL);
```

### **Query Optimization**
- **Compound indices**: `viewedUserId + date` for analytics
- **TTL cleanup**: Automatic deletion of old view records
- **Aggregation pipelines**: Pre-calculated stats reduce query complexity

### **Caching Strategy**
- **Analytics cache**: 5-minute TTL for dashboard data
- **User counters cache**: Real-time updates with eventual consistency
- **Batch deduplication**: Prevent duplicate processing

---

## 🚀 **Deployment Checklist**

### **Firestore Setup**
- [ ] Create `profile_view_stats` collection
- [ ] Create `profile_views` collection with TTL index
- [ ] Add compound indices for analytics queries
- [ ] Update security rules for both collections
- [ ] Add fields to existing `users` collection

### **API Testing**
- [ ] Test view tracking with various contexts
- [ ] Verify batch processing under load
- [ ] Test privacy controls (ghost mode, opt-out)
- [ ] Validate analytics aggregation accuracy
- [ ] Load test with 100+ concurrent views

### **Monitoring Setup**
- [ ] Track batch processing latency
- [ ] Monitor Firebase write operations count
- [ ] Alert on batch processing failures
- [ ] Dashboard for view tracking metrics

---

## 🎯 **Success Metrics**

### **Technical Performance**
- **Write cost reduction**: 90%+ vs. naive implementation
- **View tracking latency**: <100ms response time
- **Batch processing reliability**: 99%+ success rate
- **Analytics query speed**: <500ms for dashboard data

### **User Engagement**
- **Daily profile views per user**: 5+ (target for viral loop)
- **View-to-connection conversion**: 15%+ (when connections launch)
- **Analytics page engagement**: 60%+ users check weekly
- **Privacy compliance**: 0 privacy-related issues

### **Business Impact**
- **Social discovery**: Profile views drive 25%+ of new connections
- **Viral growth**: View notifications drive 10%+ return visits  
- **Campus penetration**: Profile tracking enables network mapping
- **Data insights**: Analytics inform product development decisions

---

## 🔮 **Future Enhancements**

### **Phase 2: Advanced Analytics**
- Real-time hourly view patterns
- Geographic view distribution (dorm/building)
- Cross-space view correlation analysis
- A/B testing for profile optimization

### **Phase 3: AI-Powered Insights**
- Profile optimization recommendations
- Optimal posting/activity timing
- Connection recommendations based on view patterns
- Automated privacy suggestions

### **Phase 4: Social Features Integration**
- View-based friend suggestions
- "People also viewed" recommendations  
- View notifications and alerts
- Social proof in space discovery

---

**This system provides the foundation for HIVE's social discovery engine while maintaining our broke startup budget and privacy-first approach. Ready to implement the connection system next!**