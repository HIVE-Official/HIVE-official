/**
 * Defines the role of a user within a Space.
 * - 'member': A standard participant in the space.
 * - 'builder': A member with privileges to edit the space and its tools.
 */
export type SpaceRole = 'member' | 'builder';
/**
 * Represents a member of a Space.
 * This document is stored in the `/spaces/{spaceId}/members/{userId}` sub-collection.
 */
export interface SpaceMember {
    userId: string;
    spaceId: string;
    role: SpaceRole;
    joinedAt: Date;
}
//# sourceMappingURL=member.d.ts.map