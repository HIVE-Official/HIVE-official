interface UpdateProfileData {
    fullName?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    isPublic?: boolean;
    builderOptIn?: boolean;
    builderAnalyticsEnabled?: boolean;
}
interface UseProfileReturn {
    updateProfile: (data: UpdateProfileData) => Promise<boolean>;
    uploadPhoto: (file: File) => Promise<string | null>;
    isUpdating: boolean;
    error: string | null;
    clearError: () => void;
}
export declare function useProfile(): UseProfileReturn;
export {};
//# sourceMappingURL=use-profile.d.ts.map