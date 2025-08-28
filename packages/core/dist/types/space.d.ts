export type SpaceType = 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
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
    leaders: string[];
    members: string[];
}
//# sourceMappingURL=space.d.ts.map