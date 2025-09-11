export interface HiveUser {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    token?: string;
    uid?: string;
    firstName?: string;
    lastName?: string;
    handle?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    school?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    isPublic?: boolean;
    builderOptIn?: boolean;
    onboardingCompleted?: boolean;
}
export declare function isHiveUser(user: any): user is HiveUser;
export declare function mapFirebaseUserToHiveUser(firebaseUser: any): HiveUser;
//# sourceMappingURL=user.d.ts.map