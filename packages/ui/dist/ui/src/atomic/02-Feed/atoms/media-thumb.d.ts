import * as React from "react";
export type MediaThumbType = "image" | "video" | "audio";
export interface MediaThumbProps extends React.HTMLAttributes<HTMLButtonElement> {
    type?: MediaThumbType;
    src?: string;
    alt?: string;
    badges?: Array<{
        label: string;
    } | string>;
    ratio?: "1:1" | "4:3" | "16:9";
    onActivate?: () => void;
    disabled?: boolean;
}
/**
 * Lightweight media thumbnail for images/video/audio with overlay badges.
 * Button-based for keyboard accessibility; surface-agnostic.
 */
export declare function MediaThumb({ type, src, alt, badges, ratio, onActivate, className, disabled, ...props }: MediaThumbProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=media-thumb.d.ts.map