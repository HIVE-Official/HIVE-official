import * as React from 'react';
import { type MediaFile } from './feed-composer-sheet';
export interface SpacePostComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
    spaceId: string;
    spaceName: string;
    spaceIcon?: string;
    spaceColor?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    allowAnonymous?: boolean;
    defaultAnonymous?: boolean;
    onSubmit?: (data: {
        content: string;
        spaceId: string;
        media: MediaFile[];
        anonymous: boolean;
    }) => void;
    isSubmitting?: boolean;
    maxLength?: number;
    allowMedia?: boolean;
}
/**
 * SpacePostComposer
 *
 * Pre-configured post composer for a specific space.
 * - Space is pre-selected (not changeable)
 * - Optional anonymous posting toggle
 * - Wraps FeedComposerSheet with space context
 */
export declare const SpacePostComposer: React.ForwardRefExoticComponent<SpacePostComposerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-post-composer.d.ts.map