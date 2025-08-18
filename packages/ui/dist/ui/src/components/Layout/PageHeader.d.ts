import React from 'react';
type PageType = 'profile' | 'spaces' | 'tools' | 'feed' | 'settings' | 'onboarding' | 'auth' | 'generic';
type ActionPlacement = 'auto' | 'thumb-left' | 'thumb-right' | 'center' | 'split';
type HeaderBehavior = 'static' | 'sticky' | 'floating' | 'hidden' | 'auto-hide';
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ComponentType<any>;
    isActive?: boolean;
}
interface PageAction {
    id: string;
    label: string;
    icon?: React.ComponentType<any>;
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    priority?: 'high' | 'medium' | 'low';
    mobileHidden?: boolean;
}
interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    backAction?: {
        label?: string;
        href?: string;
        onClick?: () => void;
    };
    primaryAction?: PageAction;
    secondaryActions?: PageAction[];
    actionPlacement?: ActionPlacement;
    pageType?: PageType;
    userRole?: 'student' | 'faculty' | 'admin';
    campusContext?: {
        spaceName?: string;
        toolName?: string;
        isBuilder?: boolean;
    };
    behavior?: HeaderBehavior;
    glassMorphism?: boolean;
    hideOnScroll?: boolean;
    showProgress?: boolean;
    progressValue?: number;
    mobileTitle?: string;
    collapsible?: boolean;
    headingLevel?: 'h1' | 'h2' | 'h3';
    landmarkRole?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare function calculateActionPlacement(placement: ActionPlacement, viewport: any, actionsCount: number): string;
declare function generateContextualContent(pageType: PageType, campusContext?: PageHeaderProps['campusContext']): {
    titlePrefix?: string;
    contextualHint?: string;
};
declare function sortActionsByPriority(actions: PageAction[], isMobile: boolean): PageAction[];
export declare const PageHeader: React.FC<PageHeaderProps>;
export { calculateActionPlacement, generateContextualContent, sortActionsByPriority };
export type { PageHeaderProps, PageType, PageAction, BreadcrumbItem, ActionPlacement, HeaderBehavior };
//# sourceMappingURL=PageHeader.d.ts.map