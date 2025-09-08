/**
 * SPACES DATABASE UTILITIES
 * 
 * Single source of truth for spaces database operations.
 * Uses FLAT collections for performance and consistency.
 * 
 * Collections:
 * - spaces: All spaces (flat)
 * - spaceMembers: All memberships (flat with spaceId + userId)
 * - spacePosts: All posts (flat with spaceId)
 * - spaceEvents: All events (flat with spaceId)
 */

import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { logger } from '@/lib/structured-logger';

// ============= TYPES =============

export interface Space {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'residential' | 'greek' | 'interest';
  category: string;
  campusId: string;
  
  // Status
  status: 'active' | 'inactive' | 'archived';
  visibility: 'public' | 'private' | 'invite_only';
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  
  // Settings
  maxMembers?: number;
  requireApproval: boolean;
  allowMemberPosts: boolean;
  allowMemberEvents: boolean;
  
  // Stats (denormalized for performance)
  memberCount: number;
  postCount: number;
  eventCount: number;
  
  // Greek life specific
  greekType?: 'fraternity' | 'sorority';
  greekCouncil?: string;
}

export interface SpaceMember {
  id: string; // Composite: {spaceId}_{userId}
  spaceId: string;
  userId: string;
  
  // User info (denormalized)
  displayName: string;
  email: string;
  photoURL?: string;
  
  // Membership
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: Timestamp;
  lastActiveAt: Timestamp;
  
  // Permissions
  canPost: boolean;
  canCreateEvents: boolean;
  canInvite: boolean;
  canModerate: boolean;
}

export interface SpacePost {
  id: string;
  spaceId: string;
  authorId: string;
  
  // Content
  content: string;
  attachments?: Array<{
    type: 'image' | 'link' | 'file';
    url: string;
    title?: string;
  }>;
  tags?: string[];
  
  // Metadata
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  editedAt?: Timestamp;
  
  // Engagement (denormalized)
  likeCount: number;
  commentCount: number;
  shareCount: number;
  
  // Moderation
  status: 'published' | 'pending' | 'removed';
  reportCount: number;
}

export interface SpaceEvent {
  id: string;
  spaceId: string;
  organizerId: string;
  
  // Event details
  title: string;
  description: string;
  startTime: Timestamp;
  endTime: Timestamp;
  
  // Location
  locationType: 'physical' | 'virtual' | 'hybrid';
  location: string;
  locationUrl?: string;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Attendance (denormalized)
  attendeeCount: number;
  maxAttendees?: number;
  
  // Status
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// ============= SPACES OPERATIONS =============

/**
 * Get a space by ID
 */
export async function getSpace(spaceId: string): Promise<Space | null> {
  try {
    const doc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Space;
  } catch (error) {
    logger.error('Error getting space', { spaceId, error });
    return null;
  }
}

/**
 * Get multiple spaces
 */
export async function getSpaces(filters?: {
  type?: string;
  category?: string;
  campusId?: string;
  status?: string;
}): Promise<Space[]> {
  try {
    let query = dbAdmin.collection('spaces').where('status', '==', 'active');
    
    if (filters?.type) {
      query = query.where('type', '==', filters.type);
    }
    if (filters?.category) {
      query = query.where('category', '==', filters.category);
    }
    if (filters?.campusId) {
      query = query.where('campusId', '==', filters.campusId);
    }
    
    const snapshot = await query.limit(100).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Space));
  } catch (error) {
    logger.error('Error getting spaces', { filters, error });
    return [];
  }
}

/**
 * Create a new space
 */
export async function createSpace(data: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'postCount' | 'eventCount'>): Promise<Space | null> {
  try {
    const spaceData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      memberCount: 0,
      postCount: 0,
      eventCount: 0
    };
    
    const docRef = await dbAdmin.collection('spaces').add(spaceData);
    return { id: docRef.id, ...spaceData } as Space;
  } catch (error) {
    logger.error('Error creating space', { data, error });
    return null;
  }
}

/**
 * Update a space
 */
export async function updateSpace(spaceId: string, updates: Partial<Space>): Promise<boolean> {
  try {
    await dbAdmin.collection('spaces').doc(spaceId).update({
      ...updates,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    logger.error('Error updating space', { spaceId, updates, error });
    return false;
  }
}

// ============= MEMBERSHIP OPERATIONS =============

/**
 * Get a member record
 */
export async function getSpaceMember(spaceId: string, userId: string): Promise<SpaceMember | null> {
  try {
    const memberId = `${spaceId}_${userId}`;
    const doc = await dbAdmin.collection('spaceMembers').doc(memberId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as SpaceMember;
  } catch (error) {
    logger.error('Error getting space member', { spaceId, userId, error });
    return null;
  }
}

/**
 * Get all members of a space
 */
export async function getSpaceMembers(spaceId: string): Promise<SpaceMember[]> {
  try {
    const snapshot = await dbAdmin
      .collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .orderBy('role')
      .orderBy('joinedAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpaceMember));
  } catch (error) {
    logger.error('Error getting space members', { spaceId, error });
    return [];
  }
}

/**
 * Get user's joined spaces
 */
export async function getUserSpaces(userId: string): Promise<SpaceMember[]> {
  try {
    const snapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId)
      .orderBy('joinedAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpaceMember));
  } catch (error) {
    logger.error('Error getting user spaces', { userId, error });
    return [];
  }
}

/**
 * Add a member to a space
 */
export async function addSpaceMember(
  spaceId: string, 
  userId: string, 
  userData: {
    displayName: string;
    email: string;
    photoURL?: string;
  },
  role: SpaceMember['role'] = 'member'
): Promise<SpaceMember | null> {
  try {
    const memberId = `${spaceId}_${userId}`;
    
    // Check if already a member
    const existing = await getSpaceMember(spaceId, userId);
    if (existing) {
      logger.warn('User already a member', { spaceId, userId });
      return existing;
    }
    
    const memberData: Omit<SpaceMember, 'id'> = {
      spaceId,
      userId,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL,
      role,
      joinedAt: Timestamp.now(),
      lastActiveAt: Timestamp.now(),
      canPost: true,
      canCreateEvents: role !== 'member',
      canInvite: role !== 'member',
      canModerate: role === 'owner' || role === 'admin' || role === 'moderator'
    };
    
    // Transaction to update member count
    await dbAdmin.runTransaction(async (transaction) => {
      const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
      const spaceDoc = await transaction.get(spaceRef);
      
      if (!spaceDoc.exists) {
        throw new Error('Space not found');
      }
      
      // Add member
      transaction.set(dbAdmin.collection('spaceMembers').doc(memberId), memberData);
      
      // Update space member count
      transaction.update(spaceRef, {
        memberCount: FieldValue.increment(1),
        updatedAt: Timestamp.now()
      });
    });
    
    return { id: memberId, ...memberData };
  } catch (error) {
    logger.error('Error adding space member', { spaceId, userId, error });
    return null;
  }
}

/**
 * Remove a member from a space
 */
export async function removeSpaceMember(spaceId: string, userId: string): Promise<boolean> {
  try {
    const memberId = `${spaceId}_${userId}`;
    
    // Transaction to update member count
    await dbAdmin.runTransaction(async (transaction) => {
      const memberRef = dbAdmin.collection('spaceMembers').doc(memberId);
      const memberDoc = await transaction.get(memberRef);
      
      if (!memberDoc.exists) {
        throw new Error('Member not found');
      }
      
      const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
      
      // Delete member
      transaction.delete(memberRef);
      
      // Update space member count
      transaction.update(spaceRef, {
        memberCount: FieldValue.increment(-1),
        updatedAt: Timestamp.now()
      });
    });
    
    return true;
  } catch (error) {
    logger.error('Error removing space member', { spaceId, userId, error });
    return false;
  }
}

/**
 * Update member role
 */
export async function updateMemberRole(spaceId: string, userId: string, newRole: SpaceMember['role']): Promise<boolean> {
  try {
    const memberId = `${spaceId}_${userId}`;
    
    await dbAdmin.collection('spaceMembers').doc(memberId).update({
      role: newRole,
      canPost: true,
      canCreateEvents: newRole !== 'member',
      canInvite: newRole !== 'member',
      canModerate: newRole === 'owner' || newRole === 'admin' || newRole === 'moderator',
      lastActiveAt: Timestamp.now()
    });
    
    return true;
  } catch (error) {
    logger.error('Error updating member role', { spaceId, userId, newRole, error });
    return false;
  }
}

// ============= POSTS OPERATIONS =============

/**
 * Create a post in a space
 */
export async function createSpacePost(
  spaceId: string,
  authorId: string,
  content: string,
  attachments?: SpacePost['attachments'],
  tags?: string[]
): Promise<SpacePost | null> {
  try {
    const postData: Omit<SpacePost, 'id'> = {
      spaceId,
      authorId,
      content,
      attachments,
      tags,
      createdAt: Timestamp.now(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      status: 'published',
      reportCount: 0
    };
    
    // Transaction to update post count
    const postRef = await dbAdmin.runTransaction(async (transaction) => {
      const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
      const spaceDoc = await transaction.get(spaceRef);
      
      if (!spaceDoc.exists) {
        throw new Error('Space not found');
      }
      
      // Create post
      const newPostRef = dbAdmin.collection('spacePosts').doc();
      transaction.set(newPostRef, postData);
      
      // Update space post count
      transaction.update(spaceRef, {
        postCount: FieldValue.increment(1),
        updatedAt: Timestamp.now()
      });
      
      return newPostRef;
    });
    
    return { id: postRef.id, ...postData };
  } catch (error) {
    logger.error('Error creating space post', { spaceId, authorId, error });
    return null;
  }
}

/**
 * Get posts for a space
 */
export async function getSpacePosts(spaceId: string, limit = 20): Promise<SpacePost[]> {
  try {
    const snapshot = await dbAdmin
      .collection('spacePosts')
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'published')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpacePost));
  } catch (error) {
    logger.error('Error getting space posts', { spaceId, error });
    return [];
  }
}

// ============= EVENTS OPERATIONS =============

/**
 * Create an event in a space
 */
export async function createSpaceEvent(
  spaceId: string,
  organizerId: string,
  eventData: Omit<SpaceEvent, 'id' | 'spaceId' | 'organizerId' | 'createdAt' | 'updatedAt' | 'attendeeCount' | 'status'>
): Promise<SpaceEvent | null> {
  try {
    const now = Timestamp.now();
    const event: Omit<SpaceEvent, 'id'> = {
      ...eventData,
      spaceId,
      organizerId,
      createdAt: now,
      updatedAt: now,
      attendeeCount: 0,
      status: 'upcoming'
    };
    
    // Transaction to update event count
    const eventRef = await dbAdmin.runTransaction(async (transaction) => {
      const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
      const spaceDoc = await transaction.get(spaceRef);
      
      if (!spaceDoc.exists) {
        throw new Error('Space not found');
      }
      
      // Create event
      const newEventRef = dbAdmin.collection('spaceEvents').doc();
      transaction.set(newEventRef, event);
      
      // Update space event count
      transaction.update(spaceRef, {
        eventCount: FieldValue.increment(1),
        updatedAt: Timestamp.now()
      });
      
      return newEventRef;
    });
    
    return { id: eventRef.id, ...event };
  } catch (error) {
    logger.error('Error creating space event', { spaceId, organizerId, error });
    return null;
  }
}

/**
 * Get events for a space
 */
export async function getSpaceEvents(spaceId: string, includeCompleted = false): Promise<SpaceEvent[]> {
  try {
    let query = dbAdmin
      .collection('spaceEvents')
      .where('spaceId', '==', spaceId);
    
    if (!includeCompleted) {
      query = query.where('status', 'in', ['upcoming', 'ongoing']);
    }
    
    const snapshot = await query
      .orderBy('startTime', 'asc')
      .limit(50)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpaceEvent));
  } catch (error) {
    logger.error('Error getting space events', { spaceId, error });
    return [];
  }
}

// ============= ANALYTICS OPERATIONS =============

/**
 * Get real space analytics
 */
export async function getSpaceAnalytics(spaceId: string) {
  try {
    const space = await getSpace(spaceId);
    if (!space) return null;
    
    const members = await getSpaceMembers(spaceId);
    const posts = await getSpacePosts(spaceId, 100);
    const events = await getSpaceEvents(spaceId, true);
    
    // Calculate real metrics
    const now = Timestamp.now();
    const oneWeekAgo = Timestamp.fromMillis(now.toMillis() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = Timestamp.fromMillis(now.toMillis() - 30 * 24 * 60 * 60 * 1000);
    
    const newMembers = members.filter(m => m.joinedAt > oneWeekAgo).length;
    const activeMembers = members.filter(m => m.lastActiveAt > oneWeekAgo).length;
    const postsThisWeek = posts.filter(p => p.createdAt > oneWeekAgo).length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    
    // Role distribution
    const roleDistribution = members.reduce((acc, m) => {
      acc[m.role] = (acc[m.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Engagement metrics
    const totalEngagement = posts.reduce((sum, p) => sum + p.likeCount + p.commentCount + p.shareCount, 0);
    const avgEngagement = posts.length > 0 ? totalEngagement / posts.length : 0;
    
    return {
      spaceId,
      spaceName: space.name,
      spaceType: space.type,
      
      membershipData: {
        totalMembers: members.length,
        activeMembers,
        newMembers,
        memberGrowthRate: members.length > 0 ? (newMembers / members.length) * 100 : 0,
        roleDistribution
      },
      
      contentData: {
        totalPosts: posts.length,
        postsThisWeek,
        averageEngagement: avgEngagement,
        postsPerMember: members.length > 0 ? posts.length / members.length : 0
      },
      
      eventData: {
        totalEvents: events.length,
        upcomingEvents,
        completedEvents: events.filter(e => e.status === 'completed').length,
        averageAttendance: events.reduce((sum, e) => sum + e.attendeeCount, 0) / Math.max(events.length, 1)
      },
      
      healthMetrics: {
        overallHealth: calculateHealthScore(members.length, activeMembers, postsThisWeek),
        engagementTrend: postsThisWeek > posts.length / 4 ? 'up' : postsThisWeek < posts.length / 8 ? 'down' : 'stable',
        lastUpdated: now
      }
    };
  } catch (error) {
    logger.error('Error getting space analytics', { spaceId, error });
    return null;
  }
}

function calculateHealthScore(totalMembers: number, activeMembers: number, recentPosts: number): number {
  const activityRate = totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0;
  const contentRate = recentPosts > 0 ? Math.min(recentPosts * 10, 100) : 0;
  return Math.round((activityRate + contentRate) / 2);
}