/**
 * Tool Aggregate
 * HiveLab no-code builder - custom tools created by space leaders
 *
 * From SPEC.md: "HiveLab = How to make things happen"
 * Purpose: Empower space leaders to build custom tools for their communities
 */
import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ToolId } from '../value-objects/tool-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { SpaceId } from '../../spaces/value-objects/space-id.value';
export type ToolStatus = 'draft' | 'published' | 'archived';
export type ToolVisibility = 'private' | 'space' | 'campus' | 'public';
/**
 * Element Instance - Components in the visual builder
 */
export interface ElementInstance {
    id: string;
    type: string;
    config: Record<string, any>;
    position: {
        x: number;
        y: number;
    };
    connections: {
        inputs: string[];
        outputs: string[];
    };
}
/**
 * Tool Permissions - Who can do what
 */
export interface ToolPermissions {
    canFork: boolean;
    canEdit: ProfileId[];
    requiresApproval: boolean;
}
/**
 * Tool Analytics - Usage metrics
 */
export interface ToolAnalytics {
    uses: number;
    forks: number;
    rating: number;
    submissions: number;
}
export interface ToolProps {
    toolId: ToolId;
    name: string;
    description: string;
    icon?: string;
    createdBy: ProfileId;
    spaceId?: SpaceId;
    forkedFrom?: ToolId;
    elements: ElementInstance[];
    version: string;
    status: ToolStatus;
    visibility: ToolVisibility;
    deployedTo: SpaceId[];
    analytics: ToolAnalytics;
    permissions: ToolPermissions;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}
/**
 * Tool Aggregate
 * Represents a no-code tool built in HiveLab
 */
export declare class Tool extends AggregateRoot<ToolProps> {
    private constructor();
    get toolId(): ToolId;
    get name(): string;
    get description(): string;
    get icon(): string | undefined;
    get createdBy(): ProfileId;
    get spaceId(): SpaceId | undefined;
    get forkedFrom(): ToolId | undefined;
    get elements(): ElementInstance[];
    get version(): string;
    get status(): ToolStatus;
    get visibility(): ToolVisibility;
    get deployedTo(): SpaceId[];
    get analytics(): ToolAnalytics;
    get permissions(): ToolPermissions;
    get createdAt(): Date;
    get updatedAt(): Date;
    get publishedAt(): Date | undefined;
    get isPublished(): boolean;
    get isDraft(): boolean;
    get isArchived(): boolean;
    static create(props: Omit<ToolProps, 'toolId' | 'createdAt' | 'updatedAt' | 'deployedTo' | 'analytics'> & {
        toolId?: ToolId;
    }, id?: string): Result<Tool>;
    /**
     * Publish Tool - Make it available to others
     */
    publish(): Result<void>;
    /**
     * Archive Tool - Remove from active use
     */
    archive(): Result<void>;
    /**
     * Fork Tool - Create a copy with modifications
     */
    fork(newName: string, newCreator: ProfileId, newSpaceId?: SpaceId): Result<Tool>;
    /**
     * Deploy Tool to Spaces
     */
    deployToSpaces(spaceIds: SpaceId[]): Result<void>;
    /**
     * Undeploy Tool from Space
     */
    undeployFromSpace(spaceId: SpaceId): Result<void>;
    /**
     * Record Tool Usage
     */
    recordUse(userId: ProfileId): Result<void>;
    /**
     * Record Submission (for form-based tools)
     */
    recordSubmission(): Result<void>;
    /**
     * Update Rating
     */
    updateRating(newRating: number): Result<void>;
    /**
     * Update Elements (for builder)
     */
    updateElements(elements: ElementInstance[]): Result<void>;
    /**
     * Update Visibility
     */
    updateVisibility(visibility: ToolVisibility): Result<void>;
    /**
     * Grant Edit Access
     */
    grantEditAccess(profileId: ProfileId): Result<void>;
    /**
     * Revoke Edit Access
     */
    revokeEditAccess(profileId: ProfileId): Result<void>;
    /**
     * Check if user can edit this tool
     */
    canUserEdit(profileId: ProfileId): boolean;
    /**
     * Check if user can use this tool
     */
    canUserUse(profileId: ProfileId): boolean;
    /**
     * Increment Version (semantic versioning)
     */
    incrementVersion(type: 'major' | 'minor' | 'patch'): Result<void>;
    setCreatedAt(date: Date): void;
    setUpdatedAt(date: Date): void;
    setPublishedAt(date: Date | undefined): void;
    setAnalytics(analytics: ToolAnalytics): void;
    setDeployedTo(deployedTo: SpaceId[]): void;
}
//# sourceMappingURL=tool.aggregate.d.ts.map