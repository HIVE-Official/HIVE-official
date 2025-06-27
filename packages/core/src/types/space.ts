export type SpaceType = 'clubs' | 'organizations' | 'academic' | 'greek';

export interface Space {
  id: string;
  name: string;
  description: string;
  type: SpaceType;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  imageUrl?: string;
  bannerUrl?: string;
  isVerified: boolean;
  leaders: string[]; // User IDs
  members: string[]; // User IDs
} 