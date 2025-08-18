interface BentoProfileDashboardProps {
    user: {
        fullName: string;
        handle?: string;
        avatarUrl?: string;
        major?: string;
        graduationYear?: number;
        isBuilder?: boolean;
        builderAchievements?: {
            toolsCreated: number;
            totalEngagement: number;
        };
    };
    className?: string;
}
export declare function BentoProfileDashboard({ user, className }: BentoProfileDashboardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=bento-profile-dashboard.d.ts.map