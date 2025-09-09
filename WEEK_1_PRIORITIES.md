# WEEK 1 PRIORITIES - Ship or Die

*These 5 things MUST work by end of Week 1 or the platform is worthless.*

## 📈 CURRENT STATUS (December 2024)

| Priority | Status | What's Done | What's Left |
|----------|--------|-------------|-------------|
| 1. Posts Save | ✅ **DONE** | API works, saves to Firestore | - |
| 2. Real-Time Updates | ❌ **NOT DONE** | - | Add onSnapshot listeners |
| 3. Notifications | ⚠️ **PARTIAL** | API exists | Add triggers on post creation |
| 4. Photo Uploads | ⚠️ **PARTIAL** | Profile photos work | Add to posts |
| 5. Space Creation | ✅ **DONE** | Full API implementation | - |

## 🎯 THE ONLY 5 THINGS THAT MATTER

### 1. Posts Save to Firebase ✅ **COMPLETED**
**Current**: Posts now save to Firestore and persist!
**What we did**: 
- Connected API endpoint at `/api/spaces/[spaceId]/posts`
- Modified `HivePostsSurface` to accept real data
- Added `fetchPosts` to space detail page

**Implementation**:
```typescript
// Location: apps/web/src/app/api/spaces/[spaceId]/posts/route.ts
// Connect this endpoint to actually write to Firebase

await adminDb
  .collection('spaces')
  .doc(spaceId)
  .collection('posts')
  .add({
    content: body.content,
    authorId: session.user.id,
    createdAt: FieldValue.serverTimestamp(),
    type: body.type
  });
```

**Success Metric**: Post something, refresh page, it's still there

---

### 2. Real-Time Updates Work ❌ **NOT DONE - CRITICAL**
**Current**: Still requires page refresh to see new posts
**Goal**: New posts appear instantly for all users
**Blocker**: No Firebase onSnapshot listeners implemented

**Implementation**:
```typescript
// Location: apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx
// Replace mock data with real-time listener

useEffect(() => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, 'spaces', spaceId, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    ),
    (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    }
  );
  return () => unsubscribe();
}, [spaceId]);
```

**Success Metric**: Two users in same space see posts appear without refresh

---

### 3. Basic Notifications ⚠️ **PARTIAL - NEEDS TRIGGERS**
**Current**: API exists at `/api/notifications` but no automatic triggers
**Goal**: Get notified when someone posts in your space
**Missing**: Post creation doesn't trigger notifications

**Implementation**:
```typescript
// Location: apps/web/src/app/api/notifications/route.ts
// Minimum viable notification

- When post created → notify space members
- Store in 'notifications' collection
- Show count in UI
- Mark as read when viewed
```

**Success Metric**: Red badge appears when new content exists

---

### 4. Photo Uploads Work ⚠️ **PARTIAL - PROFILE ONLY**
**Current**: Profile photos work, but posts don't support images
**Goal**: Upload and display photos in posts
**Missing**: Firebase Storage integration for post images

**Implementation**:
```typescript
// Location: apps/web/src/components/spaces/post-creation-modal.tsx
// Add image upload to post creation

const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};
```

**Success Metric**: Post a meme, everyone sees it

---

### 5. Students Can Create Spaces ✅ **COMPLETED**
**Current**: Full space creation API implemented!
**What we did**:
- `POST /api/spaces` endpoint works
- Creates space and adds creator as owner
- Proper validation and permissions

**Implementation**:
```typescript
// Location: apps/web/src/app/api/spaces/create/route.ts
// Enable space creation

await adminDb.collection('spaces').add({
  name: body.name,
  description: body.description,
  createdBy: session.user.id,
  type: body.type,
  memberCount: 1,
  status: 'activated',
  createdAt: FieldValue.serverTimestamp()
});

// Auto-join creator as admin
await adminDb
  .collection('spaces')
  .doc(spaceId)
  .collection('members')
  .doc(session.user.id)
  .set({
    role: 'admin',
    joinedAt: FieldValue.serverTimestamp()
  });
```

**Success Metric**: Create space → appears in browse → others can join

---

## ❌ WHAT WE'RE NOT DOING

**DO NOT TOUCH THESE:**
- Tools/HiveLab (completely ignore)
- Rituals (not important)
- Analytics dashboards (fake data is fine)
- Advanced permissions (basic is enough)
- Intelligence layer (no ML needed)
- Cross-space features (focus on single space)
- PWA/offline (online only is fine)
- Performance optimization (just make it work)

---

## 🔥 WHAT'S NEXT - Priority Order

### 1. Real-Time Updates (4 hours)
```typescript
// In space detail page
useEffect(() => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, 'spaces', spaceId, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    ),
    (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(newPosts);
    }
  );
  return () => unsubscribe();
}, [spaceId]);
```

### 2. Image Uploads in Posts (3 hours)
```typescript
// Add to post creation
const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

// Update post schema
interface Post {
  imageUrl?: string;
  // ... other fields
}
```

### 3. Notification Triggers (2 hours)
```typescript
// In POST /api/spaces/[spaceId]/posts
// After creating post:
const spaceMembers = await db
  .collection('spaces')
  .doc(spaceId)
  .collection('members')
  .get();

const batch = db.batch();
for (const member of spaceMembers.docs) {
  if (member.id !== userId) {
    const notifRef = db.collection('notifications').doc();
    batch.set(notifRef, {
      userId: member.id,
      type: 'new_post',
      spaceId,
      postId: newPost.id,
      message: `New post in ${spaceName}`,
      isRead: false,
      createdAt: FieldValue.serverTimestamp()
    });
  }
}
await batch.commit();
```

### Weekend
- [ ] Get 10 real users to test
- [ ] Fix what breaks
- [ ] Prepare Week 2

---

## 🚀 How to Test Success

### The "Holy Shit It Works" Test - Current Status
1. **User A** creates a new space called "Test Squad" ✅ WORKS
2. **User B** finds and joins "Test Squad" ✅ WORKS 
3. **User A** posts "Who wants pizza?" ~~with a meme~~ ⚠️ TEXT ONLY
4. **User B** sees it ~~instantly~~ after refresh ❌ NEEDS FIX
5. **User B** gets a notification ❌ DOESN'T HAPPEN
6. **User B** replies "I'm in!" ❌ NO COMMENTS YET
7. **User A** sees reply ~~instantly~~ ❌ NOT IMPLEMENTED
8. Both users refresh - everything still there ✅ WORKS

**Score: 3/8 features working**

---

## 🔧 Technical Shortcuts Allowed

**Take these shortcuts to ship faster:**
- Use `any` types if TypeScript is blocking
- Copy-paste code if abstraction takes too long
- Inline styles if Tailwind classes are complex
- Console.log for debugging (clean up later)
- Skip error handling for happy path
- Hard-code Firebase config
- Ignore performance
- Skip tests

**We can refactor after it works.**

---

## 💀 If These Don't Work By Friday

If we can't make posts save to a database after a full week, we need to seriously question:
1. Is the architecture too complex?
2. Are we overthinking simple features?
3. Should we start over with a simpler stack?

**No excuses. No pivots. No "but the architecture..."**

Just make posts save to the fucking database.

---

## ✅ Definition of Done

By Friday 5pm, a new user can:
1. Sign up
2. Create a space
3. Post text and images
4. See others' posts in real-time
5. Get notifications
6. Come back tomorrow and everything is still there

**That's it. That's Week 1.**

Everything else can wait.

---

*Update this document daily. Check off completed items. No scope creep.*