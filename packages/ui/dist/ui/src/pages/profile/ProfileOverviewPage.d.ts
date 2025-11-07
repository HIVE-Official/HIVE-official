export interface ProfileHighlight {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    category: string;
    icon?: string;
}
export interface ProfileStat {
    label: string;
    value: string;
}
export interface ProfileExperience {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    tags?: string[];
}
export interface ProfileOverviewPageProps {
    campusName?: string;
    userName?: string;
    handle?: string;
    avatarUrl?: string;
    avatarFallback?: string;
    pronouns?: string;
    program?: string;
    badges?: string[];
    stats?: ProfileStat[];
    highlights?: ProfileHighlight[];
    experiences?: ProfileExperience[];
    spaces?: Array<{
        id: string;
        name: string;
        role: string;
    }>;
}
export declare function ProfileOverviewPage({ campusName, userName, handle, avatarUrl, avatarFallback, pronouns, program, badges, stats, highlights, experiences, spaces, }: ProfileOverviewPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ProfileOverviewPage.d.ts.map