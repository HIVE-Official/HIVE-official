/**
 * Firebase Campus Repository
 * Firestore implementation for Campus-level operations
 */
import { Timestamp } from 'firebase/firestore';
import { ICampusRepository } from '../interfaces';
import { Result } from '../../domain';
interface CampusStats {
    totalUsers: number;
    totalSpaces: number;
    activeRituals: number;
    dailyActiveUsers: number;
}
interface CampusConfig {
    id: string;
    name: string;
    emailDomains: string[];
    isActive: boolean;
    settings: {
        allowPublicSignup: boolean;
        requireEmailVerification: boolean;
        defaultUserRole: string;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare class FirebaseCampusRepository implements ICampusRepository {
    private readonly campusCollection;
    private readonly profilesCollection;
    private readonly spacesCollection;
    private readonly ritualsCollection;
    private readonly activityCollection;
    getCampusStats(campusId: string): Promise<Result<CampusStats>>;
    verifyCampusEmail(email: string): Promise<Result<boolean>>;
    getValidEmailDomains(campusId: string): Promise<Result<string[]>>;
    getCampusConfiguration(campusId: string): Promise<Result<CampusConfig>>;
    getTopSpacesByActivity(campusId: string, limitCount?: number): Promise<Result<Array<{
        spaceId: string;
        activityScore: number;
    }>>>;
    getCampusEngagementMetrics(campusId: string): Promise<Result<{
        averagePostsPerDay: number;
        averageConnectionsPerUser: number;
        mostActiveSpaceType: string;
        peakActivityHour: number;
    }>>;
}
export {};
//# sourceMappingURL=campus.repository.d.ts.map