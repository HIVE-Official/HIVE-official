import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hivePinnedSurfaceVariants: (props?: {
    mode?: "view" | "edit" | "builder";
} & import("class-variance-authority/types").ClassProp) => string;
declare const pinnedContentTypes: {
    readonly welcome: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Welcome Message";
        readonly color: "text-yellow-400";
        readonly description: "Space introduction and guidelines";
    };
    readonly announcement: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Announcement";
        readonly color: "text-orange-400";
        readonly description: "Important updates and news";
    };
    readonly link: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Quick Link";
        readonly color: "text-blue-400";
        readonly description: "External resources and websites";
    };
    readonly event: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Featured Event";
        readonly color: "text-green-400";
        readonly description: "Upcoming important events";
    };
    readonly image: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Image";
        readonly color: "text-purple-400";
        readonly description: "Visual content and media";
    };
    readonly document: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Document";
        readonly color: "text-gray-400";
        readonly description: "Important files and resources";
    };
};
export interface PinnedContent {
    id: string;
    type: keyof typeof pinnedContentTypes;
    title: string;
    content?: string;
    url?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    priority: 'high' | 'medium' | 'low';
    expiresAt?: Date;
}
export interface HivePinnedSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hivePinnedSurfaceVariants> {
    space: Space;
    pinnedContent?: PinnedContent[];
    isBuilder?: boolean;
    canEdit?: boolean;
    onAddContent?: (type: keyof typeof pinnedContentTypes) => void;
    onEditContent?: (content: PinnedContent) => void;
    onDeleteContent?: (contentId: string) => void;
    onReorderContent?: (contentIds: string[]) => void;
    showWelcomePrompt?: boolean;
    maxItems?: number;
}
export declare const HivePinnedSurface: React.ForwardRefExoticComponent<HivePinnedSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hivePinnedSurfaceVariants, pinnedContentTypes };
//# sourceMappingURL=hive-pinned-surface.d.ts.map