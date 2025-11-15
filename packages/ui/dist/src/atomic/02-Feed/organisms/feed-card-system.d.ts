import * as React from 'react';
export type FeedSystemVariant = 'ritual' | 'announcement' | 'urgent';
export interface FeedCardSystemMeta {
    variant: FeedSystemVariant;
    timeAgo?: string;
    expiresLabel?: string;
}
export interface FeedCardSystemData {
    id: string;
    title: string;
    description: string;
    meta: FeedCardSystemMeta;
    actionLabel?: string;
    isDismissible?: boolean;
}
export interface FeedCardSystemCallbacks {
    onAction?: (cardId: string) => void;
    onDismiss?: (cardId: string) => void;
}
export interface FeedCardSystemProps extends FeedCardSystemCallbacks, React.HTMLAttributes<HTMLDivElement> {
    card: FeedCardSystemData;
}
export declare const FeedCardSystem: React.ForwardRefExoticComponent<FeedCardSystemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-card-system.d.ts.map