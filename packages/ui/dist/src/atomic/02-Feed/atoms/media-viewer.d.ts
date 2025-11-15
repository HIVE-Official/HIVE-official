import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
export type MediaViewerItem = {
    id: string;
    type: 'image';
    src: string;
    alt?: string;
    caption?: string;
} | {
    id: string;
    type: 'video';
    src: string;
    caption?: string;
    autoPlay?: boolean;
};
declare const MediaViewerRoot: React.FC<DialogPrimitive.DialogProps>;
declare const MediaViewerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const MediaViewerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const MediaViewerPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const MediaViewerOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface MediaViewerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    withChrome?: boolean;
    showCloseButton?: boolean;
}
declare const MediaViewerContent: React.ForwardRefExoticComponent<MediaViewerContentProps & React.RefAttributes<HTMLDivElement>>;
declare const MediaViewerViewport: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const MediaViewerCaption: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
interface MediaViewerCarouselProps {
    items: MediaViewerItem[];
    index?: number;
    onIndexChange?: (index: number) => void;
    enableLoop?: boolean;
    showChrome?: boolean;
}
declare const MediaViewerCarousel: ({ items, index, onIndexChange, enableLoop, showChrome }: MediaViewerCarouselProps) => import("react/jsx-runtime").JSX.Element;
export { MediaViewerRoot as MediaViewer, MediaViewerTrigger, MediaViewerClose, MediaViewerPortal, MediaViewerOverlay, MediaViewerContent, MediaViewerViewport, MediaViewerCaption, MediaViewerCarousel };
//# sourceMappingURL=media-viewer.d.ts.map