import React from 'react';
import type { LucideIcon } from 'lucide-react';
export type HiveLabMode = 'visual' | 'template' | 'wizard' | 'marketplace' | 'analytics' | 'code';
export interface HiveLabQuickAction {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    mode?: HiveLabMode;
    tags?: Array<{
        label: string;
        tone?: 'accent' | 'success' | 'info' | 'warning';
    }>;
    highlight?: string;
}
export interface HiveLabHeroConfig {
    eyebrow?: string;
    title: string;
    description: string;
    icon?: LucideIcon;
    supportingBadges?: Array<{
        id: string;
        label: string;
        icon?: LucideIcon;
    }>;
}
export interface HiveLabStat {
    id: string;
    label: string;
    value: string;
    description?: string;
    icon?: LucideIcon;
}
export interface HiveLabElementCategory {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    accent?: 'blue' | 'green' | 'purple' | 'orange';
    stat?: string;
}
export interface HiveLabCallToAction {
    title: string;
    description: string;
    buttonLabel: string;
    onClick?: () => void;
    annotation?: string;
}
export interface HiveLabOverviewProps {
    hero: HiveLabHeroConfig;
    quickActions: HiveLabQuickAction[];
    elementCategories: HiveLabElementCategory[];
    stats?: HiveLabStat[];
    callToAction?: HiveLabCallToAction;
    className?: string;
    onSelectAction?: (action: HiveLabQuickAction) => void;
}
export declare const HiveLabOverview: React.FC<HiveLabOverviewProps>;
//# sourceMappingURL=hivelab-overview.d.ts.map