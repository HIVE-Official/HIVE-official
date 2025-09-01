import React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost' | 'builder' | 'verified' | 'leader' | 'ghost-mode' | 'achievement' | 'streak' | 'scholar' | 'connector' | 'dean' | 'developer' | 'organizer' | 'helper';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    count?: number;
    maxCount?: number;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}
export declare const badgeVariants: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    ghost: string;
    builder: string;
    verified: string;
    leader: string;
    'ghost-mode': string;
    achievement: string;
    streak: string;
    scholar: string;
    connector: string;
    dean: string;
    developer: string;
    organizer: string;
    helper: string;
};
export declare const Badge: React.FC<BadgeProps>;
export declare const RecognitionBadges: {
    Builder: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Verified: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Leader: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    GhostMode: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Achievement: ({ children, count, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Streak: ({ children, count, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Scholar: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Connector: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    DeansListing: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Developer: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    EventOrganizer: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    CommunityHelper: ({ children, ...props }: Omit<BadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=badge.d.ts.map