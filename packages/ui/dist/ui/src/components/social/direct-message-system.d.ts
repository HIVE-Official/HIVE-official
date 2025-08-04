/**
 * HIVE Direct Message System
 * Complete DM and chat functionality with real-time updates
 */
import React from 'react';
export interface Message {
    id: string;
    content: string;
    type: 'text' | 'image' | 'file' | 'system';
    senderId: string;
    timestamp: string;
    isEdited?: boolean;
    editedAt?: string;
    readBy: string[];
    reactions?: {
        emoji: string;
        users: string[];
    }[];
    replyTo?: {
        messageId: string;
        content: string;
        senderName: string;
    };
    attachments?: {
        id: string;
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
}
export interface Conversation {
    id: string;
    type: 'direct' | 'group';
    participants: {
        id: string;
        name: string;
        avatar?: string;
        handle: string;
        isOnline?: boolean;
        lastSeen?: string;
    }[];
    lastMessage?: Message;
    unreadCount: number;
    isArchived: boolean;
    isPinned: boolean;
    isMuted: boolean;
    createdAt: string;
    updatedAt: string;
    title?: string;
    avatar?: string;
}
interface DirectMessageSystemProps {
    currentUserId: string;
    conversations: Conversation[];
    messages: Record<string, Message[]>;
    activeConversationId?: string;
    onSendMessage?: (conversationId: string, content: string, replyTo?: string) => Promise<void>;
    onEditMessage?: (messageId: string, content: string) => Promise<void>;
    onDeleteMessage?: (messageId: string) => Promise<void>;
    onReactToMessage?: (messageId: string, emoji: string) => Promise<void>;
    onMarkAsRead?: (conversationId: string) => Promise<void>;
    onStartConversation?: (participantIds: string[]) => Promise<string>;
    onSearchMessages?: (query: string) => Promise<Message[]>;
    onArchiveConversation?: (conversationId: string) => Promise<void>;
    onPinConversation?: (conversationId: string) => Promise<void>;
    onMuteConversation?: (conversationId: string) => Promise<void>;
    isLoading?: boolean;
    enableFeatureFlag?: boolean;
}
export declare const DirectMessageSystem: React.FC<DirectMessageSystemProps>;
export {};
//# sourceMappingURL=direct-message-system.d.ts.map