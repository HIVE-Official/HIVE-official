import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveChatSurfaceVariants: (props?: ({
    mode?: "view" | "edit" | "builder" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const messageTypes: {
    readonly text: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Text";
    };
    readonly image: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Image";
    };
    readonly file: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "File";
    };
    readonly audio: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Audio";
    };
    readonly system: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "System";
    };
};
declare const messageStatuses: {
    readonly sending: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly color: "text-gray-400";
    };
    readonly sent: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly color: "text-gray-400";
    };
    readonly delivered: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly color: "text-gray-400";
    };
    readonly read: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly color: "text-blue-400";
    };
    readonly failed: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly color: "text-red-400";
    };
};
export interface ChatMessage {
    id: string;
    content: string;
    type: keyof typeof messageTypes;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    timestamp: Date;
    status: keyof typeof messageStatuses;
    isEdited: boolean;
    isPinned: boolean;
    replyToId?: string;
    reactions: Array<{
        emoji: string;
        count: number;
        userIds: string[];
    }>;
    attachments?: Array<{
        id: string;
        name: string;
        type: string;
        url: string;
        size: number;
    }>;
    mentions?: string[];
}
export interface HiveChatSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveChatSurfaceVariants> {
    space: Space;
    messages?: ChatMessage[];
    currentUserId?: string;
    isBuilder?: boolean;
    canSendMessages?: boolean;
    canModerate?: boolean;
    isLocked?: boolean;
    onSendMessage?: (content: string, type?: keyof typeof messageTypes) => void;
    onEditMessage?: (messageId: string, content: string) => void;
    onDeleteMessage?: (messageId: string) => void;
    onReactToMessage?: (messageId: string, emoji: string) => void;
    onReplyToMessage?: (messageId: string) => void;
    onPinMessage?: (messageId: string) => void;
    onMentionUser?: (userId: string) => void;
    showTypingIndicator?: boolean;
    typingUsers?: Array<{
        id: string;
        name: string;
    }>;
    enableVoiceMessages?: boolean;
    enableFileSharing?: boolean;
    maxMessageLength?: number;
}
export declare const HiveChatSurface: React.ForwardRefExoticComponent<HiveChatSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hiveChatSurfaceVariants, messageTypes, messageStatuses };
//# sourceMappingURL=hive-chat-surface.d.ts.map