// Bounded Context Owner: Community Guild
// Defines core types and enums for Spaces across the platform.

export type SpaceType =
  | "student_organization"
  | "university_organization"
  | "greek_life"
  | "residential";

export type SpaceVisibility = "public" | "campus" | "private";

export interface Space {
  id: string;
  campusId: string;
  name: string;
  description: string;
  type: SpaceType;
  visibility: SpaceVisibility;
  tags: string[];
  memberCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Optional metrics and integrations
  coverImageUrl?: string;
  leaderIds?: string[];
  toolCount?: number;
}
