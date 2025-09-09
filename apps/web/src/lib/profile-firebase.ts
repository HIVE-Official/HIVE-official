/**
 * Firebase Profile Operations
 * Real data operations for the Profile system - NO MOCK DATA
 */

import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  onSnapshot,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  addDoc,
  deleteDoc,
  WriteBatch,
  writeBatch
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { auth } from './firebase';

// ============= INTERFACES =============
export interface ProfileData {
  uid: string;
  email: string;
  handle: string;
  fullName: string;
  displayName: string;
  
  // Academic
  campus: string;
  major: string;
  year: string;
  graduationYear: number;
  
  // Personal
  pronouns?: string;
  bio?: string;
  dormBuilding?: string;
  
  // Photos
  avatarUrl: string;
  photos: ProfilePhoto[];
  
  // Status
  currentStatus: {
    emoji: string;
    text: string;
    availability: string;
    duration?: number;
    expiresAt?: Timestamp;
    updatedAt: Timestamp;
  };
  
  // Stats
  stats: {
    profileViews: number;
    connections: number;
    friends: number;
    spacesJoined: number;
    postsCreated: number;
    toolsCreated: number;
  };
  
  // Settings
  privacy: {
    profileVisibility: string;
    ghostMode: boolean;
    allowMessages: string;
  };
  
  // Metadata
  isVerified: boolean;
  completionPercentage: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActive: Timestamp;
}

export interface ProfilePhoto {
  id: string;
  url: string;
  context: string[];
  privacy: string;
  uploadedAt: Timestamp;
  order: number;
}

export interface Connection {
  id: string;
  user1: string;
  user2: string;
  status: 'pending' | 'connected' | 'blocked';
  type: 'connection' | 'friend';
  connectedAt: Timestamp;
  friendsSince?: Timestamp;
  lastInteraction?: Timestamp;
  mutualSpaces: string[];
}

export interface SpaceMembership {
  id: string;
  userId: string;
  spaceId: string;
  spaceName: string;
  spaceType: string;
  role: string;
  joinedAt: Timestamp;
  lastActivity: Timestamp;
  activityLevel: string;
  unreadCount: number;
}

// ============= PROFILE OPERATIONS =============

/**
 * Get user profile by ID
 */
export async function getProfile(userId: string): Promise<ProfileData | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    
    return {
      uid: userDoc.id,
      ...userDoc.data()
    } as ProfileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Create or update user profile
 */
export async function updateProfile(userId: string, data: Partial<ProfileData>): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
      lastActive: serverTimestamp()
    };
    
    // Calculate completion percentage
    const completionPercentage = calculateCompletion(data);
    updateData.completionPercentage = completionPercentage;
    
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Update user status with real-time sync
 */
export async function updateStatus(
  userId: string, 
  status: { emoji: string; text: string; availability: string; duration?: number }
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const statusUpdate = {
      currentStatus: {
        ...status,
        updatedAt: serverTimestamp(),
        expiresAt: status.duration 
          ? Timestamp.fromDate(new Date(Date.now() + status.duration * 60000))
          : null
      },
      lastActive: serverTimestamp()
    };
    
    await updateDoc(userRef, statusUpdate);
    
    // Also create a status update record for history
    await addDoc(collection(db, 'statusUpdates'), {
      userId,
      ...status,
      createdAt: serverTimestamp(),
      expiresAt: status.duration 
        ? Timestamp.fromDate(new Date(Date.now() + status.duration * 60000))
        : null
    });
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

/**
 * Upload profile photo to Firebase Storage
 */
export async function uploadProfilePhoto(
  userId: string, 
  file: File, 
  context: string[] = ['main']
): Promise<string> {
  try {
    // Create unique filename
    const timestamp = Date.now();
    const filename = `profiles/${userId}/photos/${timestamp}_${file.name}`;
    const storageRef = ref(storage, filename);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    // Update user profile with new photo
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const currentPhotos = userDoc.data()?.photos || [];
    
    const newPhoto: ProfilePhoto = {
      id: `photo_${timestamp}`,
      url: downloadUrl,
      context,
      privacy: 'public',
      uploadedAt: Timestamp.now(),
      order: currentPhotos.length
    };
    
    await updateDoc(userRef, {
      photos: [...currentPhotos, newPhoto],
      avatarUrl: currentPhotos.length === 0 ? downloadUrl : userDoc.data()?.avatarUrl,
      updatedAt: serverTimestamp()
    });
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
}

// ============= CONNECTIONS OPERATIONS =============

/**
 * Get user connections with real data
 */
export async function getUserConnections(userId: string): Promise<Connection[]> {
  try {
    // Query connections where user is either user1 or user2
    const q1 = query(
      collection(db, 'connections'),
      where('user1', '==', userId),
      where('status', '==', 'connected')
    );
    
    const q2 = query(
      collection(db, 'connections'),
      where('user2', '==', userId),
      where('status', '==', 'connected')
    );
    
    const [snapshot1, snapshot2] = await Promise.all([
      getDocs(q1),
      getDocs(q2)
    ]);
    
    const connections: Connection[] = [];
    
    snapshot1.forEach(doc => {
      connections.push({
        id: doc.id,
        ...doc.data()
      } as Connection);
    });
    
    snapshot2.forEach(doc => {
      connections.push({
        id: doc.id,
        ...doc.data()
      } as Connection);
    });
    
    return connections;
  } catch (error) {
    console.error('Error fetching connections:', error);
    return [];
  }
}

/**
 * Send connection/friend request
 */
export async function sendConnectionRequest(
  fromUserId: string, 
  toUserId: string, 
  message?: string
): Promise<void> {
  try {
    // Check if connection already exists
    const existing = await checkExistingConnection(fromUserId, toUserId);
    if (existing) {
      throw new Error('Connection already exists');
    }
    
    // Create connection request
    await addDoc(collection(db, 'connections'), {
      user1: fromUserId,
      user2: toUserId,
      status: 'pending',
      type: 'connection',
      requestedBy: fromUserId,
      requestedAt: serverTimestamp(),
      message: message || '',
      connectedAt: null,
      mutualSpaces: await getMutualSpaces(fromUserId, toUserId)
    });
    
    // Create notification for recipient
    await addDoc(collection(db, 'notifications'), {
      userId: toUserId,
      type: 'connection_request',
      title: 'New Connection Request',
      body: message || 'Someone wants to connect with you',
      fromUserId,
      actionUrl: `/profile/${fromUserId}`,
      read: false,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
}

// ============= SPACES OPERATIONS =============

/**
 * Get user's space memberships with real data
 */
export async function getUserSpaces(userId: string): Promise<SpaceMembership[]> {
  try {
    const q = query(
      collection(db, 'spaceMembers'),
      where('userId', '==', userId),
      orderBy('joinedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const memberships: SpaceMembership[] = [];
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Get space details
      const spaceDoc = await getDoc(doc(db, 'spaces', data.spaceId));
      const spaceData = spaceDoc.data();
      
      memberships.push({
        id: doc.id,
        ...data,
        spaceName: spaceData?.name || 'Unknown Space',
        spaceType: spaceData?.type || 'general',
        unreadCount: 0 // Will be calculated separately
      } as SpaceMembership);
    }
    
    return memberships;
  } catch (error) {
    console.error('Error fetching user spaces:', error);
    return [];
  }
}

// ============= REAL-TIME LISTENERS =============

/**
 * Subscribe to profile updates
 */
export function subscribeToProfile(
  userId: string, 
  callback: (profile: ProfileData) => void
): () => void {
  const unsubscribe = onSnapshot(
    doc(db, 'users', userId),
    (doc) => {
      if (doc.exists()) {
        callback({
          uid: doc.id,
          ...doc.data()
        } as ProfileData);
      }
    },
    (error) => {
      console.error('Profile subscription error:', error);
    }
  );
  
  return unsubscribe;
}

/**
 * Subscribe to status updates from connections
 */
export function subscribeToConnectionStatuses(
  userId: string,
  callback: (statuses: Map<string, any>) => void
): () => void {
  // First get user's connections
  getUserConnections(userId).then(connections => {
    const connectionIds = connections.map(c => 
      c.user1 === userId ? c.user2 : c.user1
    );
    
    if (connectionIds.length === 0) return;
    
    // Subscribe to status updates
    const q = query(
      collection(db, 'statusUpdates'),
      where('userId', 'in', connectionIds),
      where('expiresAt', '>', Timestamp.now()),
      orderBy('expiresAt', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const statuses = new Map();
      snapshot.forEach(doc => {
        const data = doc.data();
        statuses.set(data.userId, data);
      });
      callback(statuses);
    });
    
    return unsubscribe;
  });
  
  return () => {};
}

// ============= HELPER FUNCTIONS =============

function calculateCompletion(profile: Partial<ProfileData>): number {
  const fields = [
    profile.fullName,
    profile.bio,
    profile.major && profile.major !== 'Undeclared',
    profile.year,
    profile.pronouns,
    profile.dormBuilding,
    profile.photos && profile.photos.length > 0,
    profile.currentStatus?.text !== 'New to HIVE'
  ];
  
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

async function checkExistingConnection(user1: string, user2: string): Promise<boolean> {
  const q1 = query(
    collection(db, 'connections'),
    where('user1', '==', user1),
    where('user2', '==', user2)
  );
  
  const q2 = query(
    collection(db, 'connections'),
    where('user1', '==', user2),
    where('user2', '==', user1)
  );
  
  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  return !snap1.empty || !snap2.empty;
}

async function getMutualSpaces(user1: string, user2: string): Promise<string[]> {
  const [spaces1, spaces2] = await Promise.all([
    getUserSpaces(user1),
    getUserSpaces(user2)
  ]);
  
  const spaceIds1 = new Set(spaces1.map(s => s.spaceId));
  return spaces2
    .filter(s => spaceIds1.has(s.spaceId))
    .map(s => s.spaceId);
}

// ============= PROFILE DISCOVERY =============

/**
 * Get profile suggestions based on mutual spaces and connections
 */
export async function getProfileSuggestions(userId: string, limit = 10): Promise<ProfileData[]> {
  try {
    // Get user's spaces
    const userSpaces = await getUserSpaces(userId);
    const spaceIds = userSpaces.map(s => s.spaceId);
    
    if (spaceIds.length === 0) {
      // If no spaces, just return random verified profiles
      const q = query(
        collection(db, 'users'),
        where('isVerified', '==', true),
        where('privacy.profileVisibility', '==', 'public'),
        limit(limit)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs
        .filter(doc => doc.id !== userId)
        .map(doc => ({
          uid: doc.id,
          ...doc.data()
        } as ProfileData));
    }
    
    // Get members from user's spaces
    const suggestions = new Map<string, ProfileData>();
    
    for (const spaceId of spaceIds.slice(0, 3)) { // Limit to 3 spaces for performance
      const q = query(
        collection(db, 'spaceMembers'),
        where('spaceId', '==', spaceId),
        limit(20)
      );
      
      const snapshot = await getDocs(q);
      
      for (const doc of snapshot.docs) {
        const memberData = doc.data();
        if (memberData.userId === userId) continue;
        
        // Get profile data
        const profileDoc = await getDoc(doc(db, 'users', memberData.userId));
        if (profileDoc.exists() && !suggestions.has(memberData.userId)) {
          suggestions.set(memberData.userId, {
            uid: profileDoc.id,
            ...profileDoc.data()
          } as ProfileData);
        }
        
        if (suggestions.size >= limit) break;
      }
    }
    
    return Array.from(suggestions.values()).slice(0, limit);
  } catch (error) {
    console.error('Error getting profile suggestions:', error);
    return [];
  }
}