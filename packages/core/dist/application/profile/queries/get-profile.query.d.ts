/**
 * Get Profile Query
 * Retrieves a profile with privacy checks
 */
import { Query, IQueryHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IProfileRepository } from '../../../infrastructure/repositories/interfaces';
export declare class GetProfileQuery extends Query {
    readonly handle: string;
    readonly viewerId?: string | undefined;
    constructor(handle: string, viewerId?: string | undefined, campusId: string);
}
export interface GetProfileResult {
    id: string;
    handle: string;
    fullName: string;
    bio?: string;
    avatar?: string;
    isVerified: boolean;
    followerCount: number;
    followingCount: number;
    isOwnProfile: boolean;
    canView: boolean;
    visibleWidgets: string[];
    badges?: any[];
    connectionStatus?: 'none' | 'following' | 'follower' | 'mutual' | 'friend';
}
export declare class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, GetProfileResult> {
    private readonly profileRepository;
    private readonly connectionRepository?;
    constructor(profileRepository: IProfileRepository, connectionRepository?: any | undefined);
    execute(query: GetProfileQuery): Promise<Result<GetProfileResult>>;
    private determineViewerType;
    private getConnectionStatus;
}
//# sourceMappingURL=get-profile.query.d.ts.map