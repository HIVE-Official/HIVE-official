/**
 * Space Aggregate - Community and Content Domain
 * Based on SPEC.md spaces requirements and RSS integration
 */
import { SpaceId, SpaceName, SpaceDescription, SpaceType, PostId, PostContent, RSSFeedUrl, MemberRole, Result } from './value-objects';
import { ProfileId } from '../profile/value-objects';
export interface SpaceCreationProps {
    name: string;
    description: string;
    type: string;
    creatorId: string;
    campusId: string;
    isPrivate?: boolean;
}
export interface SpaceMember {
    profileId: ProfileId;
    role: MemberRole;
    joinedAt: Date;
}
export interface Post {
    id: PostId;
    content: PostContent;
    authorId: ProfileId;
    spaceId: SpaceId;
    createdAt: Date;
    updatedAt: Date;
    reactions: Record<string, ProfileId[]>;
    commentCount: number;
    isFromRSS: boolean;
    rssSourceUrl?: string;
}
export interface SpaceSettings {
    isPrivate: boolean;
    allowMemberPosts: boolean;
    requireApproval: boolean;
    rssFeedUrl?: RSSFeedUrl;
    rssFeedEnabled: boolean;
    allowInvites?: boolean;
    allowRSS?: boolean;
}
export interface SpaceData {
    id: SpaceId;
    name: SpaceName;
    description: SpaceDescription;
    type: SpaceType;
    spaceType?: string;
    visibility?: string;
    creator: ProfileId;
    createdBy?: ProfileId;
    members: SpaceMember[];
    posts: Post[];
    settings: SpaceSettings;
    campusId: string;
    lastActivityAt?: Date;
    rssUrl?: string | null;
    rssLastFetch?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Space Aggregate Root
 * Represents a student community and its content
 */
export declare class Space {
    private data;
    private constructor();
    get id(): SpaceId;
    get name(): SpaceName;
    get description(): SpaceDescription;
    get type(): SpaceType;
    get creator(): ProfileId;
    get memberCount(): number;
    get postCount(): number;
    get isPrivate(): boolean;
    get campusId(): string;
    get members(): SpaceMember[];
    get recentPosts(): Post[];
    get settings(): SpaceSettings;
    static create(props: SpaceCreationProps): Result<Space>;
    addMember(profileId: ProfileId): Result<SpaceMember>;
    removeMember(profileId: ProfileId, removedBy: ProfileId): Result<void>;
    createPost(content: PostContent, authorId: ProfileId): Result<Post>;
    addRSSPost(content: PostContent, sourceUrl: string): Result<Post>;
    updateSettings(newSettings: Partial<SpaceSettings>, updatedBy: ProfileId): Result<void>;
    promoteToModerator(profileId: ProfileId, promotedBy: ProfileId): Result<void>;
    isMember(profileId: ProfileId): boolean;
    getMemberRole(profileId: ProfileId): MemberRole | null;
    canJoin(profileId: ProfileId): boolean;
    getActivityScore(timeWindowHours?: number): number;
    toData(): SpaceData;
    static fromData(data: SpaceData): Space;
}
//# sourceMappingURL=space.d.ts.map