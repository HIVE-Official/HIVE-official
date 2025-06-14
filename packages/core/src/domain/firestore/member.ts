import { type Timestamp } from 'firebase/firestore';

/**
 * Defines the role of a user within a space.
 * - 'member': A standard participant in the space.
 * - 'builder': A member with elevated permissions to manage the space's content and settings.
 * - 'requested_builder': A member who has requested to become a builder, pending admin approval.
 */
export type MemberRole = 'member' | 'builder' | 'requested_builder';

/**
 * The data model for a Member document, stored in the `/spaces/{spaceId}/members` sub-collection.
 * The document ID for a member is the same as their User ID (uid).
 */
export interface Member {
  uid: string; // Corresponds to the document ID and the user's Auth UID.
  role: MemberRole;
  joinedAt: Timestamp;
} 