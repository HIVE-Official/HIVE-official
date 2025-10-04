/**
 * Space Aggregate
 * Represents a community space with full DDD business logic
 */
import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { SpaceId } from '../value-objects/space-id.value';
import { SpaceName } from '../value-objects/space-name.value';
import { SpaceDescription } from '../value-objects/space-description.value';
import { SpaceCategory } from '../value-objects/space-category.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { Tab } from '../entities/tab';
import { Widget } from '../entities/widget';
export interface SpaceMember {
    profileId: ProfileId;
    role: 'admin' | 'moderator' | 'member';
    joinedAt: Date;
}
export interface SpaceSettings {
    allowInvites: boolean;
    requireApproval: boolean;
    allowRSS: boolean;
    maxMembers?: number;
    isPublic: boolean;
}
export interface RushMode {
    isActive: boolean;
    startDate?: Date;
    endDate?: Date;
    requirements?: string[];
}
export interface SpaceProps {
    spaceId: SpaceId;
    name: SpaceName;
    description: SpaceDescription;
    category: SpaceCategory;
    campusId: CampusId;
    createdBy: ProfileId;
    members: SpaceMember[];
    tabs: Tab[];
    widgets: Widget[];
    settings: SpaceSettings;
    rssUrl?: string;
    visibility: 'public' | 'private';
    isActive: boolean;
    isVerified: boolean;
    trendingScore: number;
    rushMode?: RushMode;
    createdAt: Date;
    updatedAt: Date;
    lastActivityAt: Date;
    postCount: number;
}
export declare class Space extends AggregateRoot<SpaceProps> {
    get spaceId(): SpaceId;
    get name(): SpaceName;
    get description(): SpaceDescription;
    get category(): SpaceCategory;
    get campusId(): CampusId;
    get memberCount(): number;
    get isPublic(): boolean;
    get tabs(): Tab[];
    get widgets(): Widget[];
    get isVerified(): boolean;
    get trendingScore(): number;
    get rushMode(): RushMode | undefined;
    get postCount(): number;
    get members(): SpaceMember[];
    get adminCount(): number;
    get lastActivityAt(): Date;
    get createdAt(): Date;
    get updatedAt(): Date;
    get spaceIdValue(): SpaceId;
    get visibility(): 'public' | 'private';
    get settings(): SpaceSettings;
    get spaceType(): string;
    get posts(): any[];
    getMemberCount(): number;
    private constructor();
    static create(props: {
        spaceId: SpaceId;
        name: SpaceName;
        description: SpaceDescription;
        category: SpaceCategory;
        campusId: CampusId;
        createdBy: ProfileId;
        settings?: Partial<SpaceSettings>;
        visibility?: 'public' | 'private';
        rssUrl?: string;
    }, id?: string): Result<Space>;
    addMember(profileId: ProfileId, role?: 'member' | 'moderator'): Result<void>;
    removeMember(profileId: ProfileId): Result<void>;
    isMember(profileId: ProfileId): boolean;
    getMemberRole(profileId: ProfileId): string | null;
    updateMemberRole(profileId: ProfileId, newRole: 'admin' | 'moderator' | 'member'): Result<void>;
    addTab(tab: Tab): Result<void>;
    addWidget(widget: Widget): Result<void>;
    incrementPostCount(postId?: string, authorId?: string): void;
    updateSettings(settings: Partial<SpaceSettings>): void;
    private getAdminCount;
    private updateLastActivity;
    private createDefaultTabs;
    /**
     * Space Discovery Business Logic (Moved from SpaceDiscoveryService)
     */
    getWelcomeMessage(): string;
    getSuggestedActions(): Array<{
        action: string;
        description: string;
    }>;
    setIsVerified(isVerified: boolean): void;
    setPostCount(count: number): void;
    setMemberCount(count: number): void;
    setTrendingScore(score: number): void;
    setLastActivityAt(date: Date): void;
    setCreatedAt(date: Date): void;
    setUpdatedAt(date: Date): void;
    setTabs(tabs: Tab[]): void;
    setWidgets(widgets: Widget[]): void;
    toData(): any;
}
//# sourceMappingURL=space.aggregate.d.ts.map