import * as React from 'react';
export interface ComposerSpace {
    id: string;
    name: string;
    icon?: string;
    color?: string;
}
export interface MediaFile {
    id: string;
    url: string;
    type: 'image' | 'video';
    name: string;
}
export interface FeedComposerSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    spaces: ComposerSpace[];
    selectedSpaceId?: string;
    onSpaceChange?: (spaceId: string) => void;
    onSubmit?: (data: {
        content: string;
        spaceId: string;
        media: MediaFile[];
    }) => void;
    isSubmitting?: boolean;
    maxLength?: number;
    allowMedia?: boolean;
    className?: string;
    /** Optional custom footer content area (e.g., anonymous toggle) */
    customFooter?: React.ReactNode;
}
export declare const FeedComposerSheet: React.ForwardRefExoticComponent<FeedComposerSheetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-composer-sheet.d.ts.map