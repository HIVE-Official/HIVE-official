import React from 'react';
interface BaseLayoutProps {
    children: React.ReactNode;
    className?: string;
}
interface ProfileLayoutProps extends BaseLayoutProps {
    header?: React.ReactNode;
    quickActions?: React.ReactNode;
    calendar?: React.ReactNode;
    personalTools?: React.ReactNode;
    spaceMemberships?: React.ReactNode;
    activityFeed?: React.ReactNode;
}
export declare function ProfileLayout({ children, header, quickActions, calendar, personalTools, spaceMemberships, activityFeed, className }: ProfileLayoutProps): import("react/jsx-runtime").JSX.Element;
interface SpaceLayoutProps extends BaseLayoutProps {
    spaceHeader?: React.ReactNode;
    pinned?: React.ReactNode;
    posts?: React.ReactNode;
    events?: React.ReactNode;
    toolsStack?: React.ReactNode;
    chat?: React.ReactNode;
    members?: React.ReactNode;
    surfaceLayout?: '6-grid' | 'tabbed' | 'sidebar';
}
export declare function SpaceLayout({ children, spaceHeader, pinned, posts, events, toolsStack, chat, members, surfaceLayout, className }: SpaceLayoutProps): import("react/jsx-runtime").JSX.Element;
interface FeedLayoutProps extends BaseLayoutProps {
    feedHeader?: React.ReactNode;
    feedFilters?: React.ReactNode;
    feedContent?: React.ReactNode;
    feedSidebar?: React.ReactNode;
}
export declare function FeedLayout({ children, feedHeader, feedFilters, feedContent, feedSidebar, className }: FeedLayoutProps): import("react/jsx-runtime").JSX.Element;
interface HiveLabLayoutProps extends BaseLayoutProps {
    builderHeader?: React.ReactNode;
    elementLibrary?: React.ReactNode;
    designCanvas?: React.ReactNode;
    propertiesPanel?: React.ReactNode;
    previewArea?: React.ReactNode;
}
export declare function HiveLabLayout({ children, builderHeader, elementLibrary, designCanvas, propertiesPanel, previewArea, className }: HiveLabLayoutProps): import("react/jsx-runtime").JSX.Element;
interface RitualLayoutProps extends BaseLayoutProps {
    ritualBackground?: 'gradient' | 'particles' | 'glow' | 'minimal';
    centered?: boolean;
    maxWidth?: string;
}
export declare function RitualLayout({ children, ritualBackground, centered, maxWidth, className }: RitualLayoutProps): import("react/jsx-runtime").JSX.Element;
interface SplitLayoutProps extends BaseLayoutProps {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    splitRatio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
    resizable?: boolean;
}
export declare function SplitLayout({ leftPanel, rightPanel, splitRatio, resizable, className }: SplitLayoutProps): import("react/jsx-runtime").JSX.Element;
interface ModalLayoutProps extends BaseLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    backdrop?: 'blur' | 'dark' | 'none';
}
export declare function ModalLayout({ children, isOpen, onClose, size, backdrop, className }: ModalLayoutProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=page-layouts.d.ts.map