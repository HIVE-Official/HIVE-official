/**
 * Represents the status of a Space.
 * - 'dormant': A new space, not yet activated by a builder.
 * - 'activated': A live space with a builder, open for activity.
 * - 'frozen': A space that has been locked by an admin.
 */
export type SpaceStatus = 'dormant' | 'activated' | 'frozen';

/**
 * Represents the type of a Space, used for filtering and discovery.
 * - 'academic': Related to majors, departments, or courses.
 * - 'social': For clubs, hobbies, and social groups.
 * - 'residential': For dorms and on-campus housing.
 * - 'administrative': Official university announcements.
 */
export type SpaceType = 'academic' | 'social' | 'residential' | 'administrative';

/**
 * Defines the tags for a Space, providing metadata for categorization.
 */
export interface SpaceTag {
  type: SpaceType;
  sub_type?: string; // e.g., 'Computer Science' for academic, 'Gaming' for social
}

/**
 * Represents a Space in the HIVE ecosystem.
 * This is the core document stored in the 'spaces' collection.
 */
export interface Space {
  id: string; // The document ID
  schoolId: string; // Foreign key to the 'schools' collection
  name: string;
  description: string;
  bannerUrl?: string;
  memberCount: number;
  tags: SpaceTag[];
  status: SpaceStatus;
  createdAt: Date;
  updatedAt: Date;
} 