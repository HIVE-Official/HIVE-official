import { type Timestamp } from 'firebase/firestore';
/**
 * Represents the status of a space.
 * - 'dormant': The space exists but is not yet active. No content creation is allowed.
 * - 'activated': The space is live and fully functional.
 * - 'frozen': The space is temporarily locked, view-only. No new content or members.
 */
export type SpaceStatus = 'dormant' | 'activated' | 'frozen';
/**
 * Defines the type of a space, used for categorization and discovery.
 * - 'campus_living': Dorms, residential communities, and housing.
 * - 'fraternity_and_sorority': Greek life organizations.
 * - 'hive_exclusive': Special HIVE platform spaces.
 * - 'student_organizations': Student-run clubs and organizations.
 * - 'university_organizations': Official university departments and services.
 */
export type SpaceType = 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
/**
 * Tags provide metadata for filtering and identifying spaces.
 */
export interface SpaceTag {
    type: SpaceType;
    /**
     * A more specific descriptor, e.g., 'Computer Science' for a 'major' type.
     */
    sub_type: string;
}
/**
 * The core data model for a Space document in Firestore.
 */
export interface Space {
    id: string;
    name: string;
    name_lowercase: string;
    description: string;
    bannerUrl?: string;
    memberCount: number;
    schoolId: string;
    type: SpaceType;
    tags: SpaceTag[];
    status: SpaceStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pinnedPostId?: string;
}
//# sourceMappingURL=space.d.ts.map