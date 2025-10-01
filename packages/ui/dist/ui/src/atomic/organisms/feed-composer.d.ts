import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Composer - Create new posts in the feed
 *
 * Features:
 * - Text input area (auto-growing)
 * - Media upload toolbar
 * - Space selector
 * - Privacy selector
 * - Character counter
 * - Submit button
 */
declare const feedComposerVariants: (props?: {
    variant?: "default" | "focused";
    size?: "full" | "compact";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedComposerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedComposerVariants> {
    placeholder?: string;
    maxLength?: number;
    selectedSpace?: string;
    isPrivate?: boolean;
    isSubmitting?: boolean;
    onSubmit?: (content: string) => void;
    onCancel?: () => void;
}
export declare const FeedComposer: React.ForwardRefExoticComponent<FeedComposerProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-composer.d.ts.map