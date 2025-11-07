import * as React from 'react';
import { type RitualFeedBannerCardProps } from '../organisms/ritual-feed-banner';
export interface RitualData {
    id: string;
    name: string;
    description: string;
    icon?: string;
    progress: number;
    participantCount: number;
    duration: string;
    startDate?: string;
    endDate?: string;
    frequency: string;
    isParticipating: boolean;
    isCompleted?: boolean;
    status: 'active' | 'upcoming' | 'completed';
}
export interface RitualsPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    rituals: RitualData[];
    featuredRitual?: RitualData;
    featuredRitualBanner?: RitualFeedBannerCardProps['banner'];
    onRitualJoin?: (ritualId: string) => void;
    onRitualView?: (ritualId: string) => void;
    onBannerAction?: (href: string) => void;
    defaultTab?: 'active' | 'upcoming' | 'completed';
    isLoading?: boolean;
}
/**
 * RitualsPageLayout
 *
 * Complete rituals page with:
 * - Tab filters (Active, Upcoming, Completed)
 * - Featured ritual banner
 * - Grid of ritual cards
 * - Empty states per tab
 */
export declare const RitualsPageLayout: React.ForwardRefExoticComponent<RitualsPageLayoutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=rituals-page-layout.d.ts.map