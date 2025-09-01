import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Direct Message System
 * Complete DM and chat functionality with real-time updates
 */
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Avatar, HiveBadge as Badge } from '../index.js';
import { MessageSquare, Send, Search, MoreVertical, Phone, Video, Info, Archive, Trash2, Paperclip, Smile, X, Check, CheckCheck, Clock, Pin, Edit3, Reply } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const ConversationList = ({ conversations, activeConversationId, currentUserId, onSelectConversation, onArchiveConversation, onPinConversation, onMuteConversation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showMenu, setShowMenu] = useState(null);
    const filteredConversations = useMemo(() => {
        if (!searchQuery)
            return conversations;
        return conversations.filter(conv => conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.handle.toLowerCase().includes(searchQuery.toLowerCase())) ||
            conv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [conversations, searchQuery]);
    const formatMessagePreview = (message) => {
        if (message.type === 'image')
            return '📷 Image';
        if (message.type === 'file')
            return '📎 File';
        if (message.type === 'system')
            return message.content;
        return message.content.length > 50 ? `${message.content.substring(0, 50)}...` : message.content;
    };
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffMins < 1)
            return 'now';
        if (diffMins < 60)
            return `${diffMins}m`;
        if (diffHours < 24)
            return `${diffHours}h`;
        if (diffDays < 7)
            return `${diffDays}d`;
        return date.toLocaleDateString();
    };
    const getConversationTitle = (conversation) => {
        if (conversation.type === 'group') {
            return conversation.title || 'Group Chat';
        }
        const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
        return otherParticipant?.name || 'Unknown User';
    };
    const getConversationAvatar = (conversation) => {
        if (conversation.type === 'group') {
            return conversation.avatar;
        }
        const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
        return otherParticipant?.avatar;
    };
    return (_jsxs("div", { className: "w-80 bg-[var(--hive-background-elevated)] border-r border-[var(--hive-border-default)] flex flex-col h-full", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-subtle)]", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Messages" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: "Search conversations...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filteredConversations.length === 0 ? (_jsxs("div", { className: "p-4 text-center", children: [_jsx(MessageSquare, { className: "w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: searchQuery ? 'No conversations found' : 'No messages yet' })] })) : (_jsx("div", { className: "space-y-1 p-2", children: filteredConversations.map((conversation) => (_jsx("div", { className: `relative p-3 rounded-lg cursor-pointer transition-colors group ${activeConversationId === conversation.id
                            ? 'bg-[var(--hive-primary)]/10 border border-[var(--hive-primary)]/20'
                            : 'hover:bg-[var(--hive-background-secondary)]'}`, onClick: () => onSelectConversation(conversation.id), children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { src: getConversationAvatar(conversation), initials: getConversationTitle(conversation).charAt(0), size: "md" }), conversation.type === 'direct' && (_jsx(_Fragment, { children: conversation.participants.find(p => p.id !== currentUserId)?.isOnline && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[var(--hive-background-elevated)] rounded-full" })) }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: getConversationTitle(conversation) }), conversation.isPinned && (_jsx(Pin, { className: "w-3 h-3 text-[var(--hive-primary)]" })), conversation.isMuted && (_jsx("div", { className: "w-3 h-3 bg-[var(--hive-text-muted)] rounded-full opacity-50" }))] }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: conversation.lastMessage && formatTime(conversation.lastMessage.timestamp) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] truncate", children: conversation.lastMessage ? formatMessagePreview(conversation.lastMessage) : 'No messages' }), _jsx("div", { className: "flex items-center space-x-2", children: conversation.unreadCount > 0 && (_jsx(Badge, { size: "sm", className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] min-w-[20px] h-5 flex items-center justify-center", children: conversation.unreadCount > 99 ? '99+' : conversation.unreadCount })) })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: (e) => {
                                                e.stopPropagation();
                                                setShowMenu(showMenu === conversation.id ? null : conversation.id);
                                            }, className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreVertical, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu === conversation.id && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]", children: [_jsxs("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            onPinConversation?.(conversation.id);
                                                            setShowMenu(null);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Pin, { className: "w-3 h-3" }), conversation.isPinned ? 'Unpin' : 'Pin'] }), _jsxs("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            onMuteConversation?.(conversation.id);
                                                            setShowMenu(null);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-current rounded-full opacity-50" }), conversation.isMuted ? 'Unmute' : 'Mute'] }), _jsxs("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            onArchiveConversation?.(conversation.id);
                                                            setShowMenu(null);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Archive, { className: "w-3 h-3" }), "Archive"] })] })) })] })] }) }, conversation.id))) })) })] }));
};
const MessageItem = ({ message, currentUserId, participants, onEdit, onDelete, onReact, onReply }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);
    const [showMenu, setShowMenu] = useState(false);
    const isOwnMessage = message.senderId === currentUserId;
    const sender = participants.find(p => p.id === message.senderId);
    const handleEdit = useCallback(async () => {
        if (!editContent.trim() || editContent === message.content) {
            setIsEditing(false);
            return;
        }
        await onEdit?.(message.id, editContent);
        setIsEditing(false);
    }, [editContent, message.id, message.content, onEdit]);
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const getReadStatus = () => {
        if (!isOwnMessage)
            return null;
        if (message.readBy.length === 0)
            return _jsx(Clock, { className: "w-3 h-3 text-[var(--hive-text-muted)]" });
        if (message.readBy.length === 1)
            return _jsx(Check, { className: "w-3 h-3 text-[var(--hive-text-muted)]" });
        return _jsx(CheckCheck, { className: "w-3 h-3 text-[var(--hive-primary)]" });
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex gap-3 group mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`, children: [!isOwnMessage && (_jsx(Avatar, { src: sender?.avatar, initials: sender?.name.charAt(0) || 'U', size: "sm", className: "flex-shrink-0" })), _jsxs("div", { className: `flex-1 max-w-[70%] ${isOwnMessage ? 'flex flex-col items-end' : ''}`, children: [message.replyTo && (_jsxs("div", { className: "mb-2 p-2 bg-[var(--hive-background-secondary)] rounded-lg border-l-2 border-[var(--hive-primary)]", children: [_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)] mb-1", children: ["Replying to ", message.replyTo.senderName] }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)] truncate", children: message.replyTo.content })] })), _jsxs("div", { className: `relative p-3 rounded-2xl ${isOwnMessage
                            ? 'bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] rounded-br-md'
                            : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] rounded-bl-md'}`, children: [isEditing ? (_jsxs("div", { children: [_jsx("textarea", { value: editContent, onChange: (e) => setEditContent(e.target.value), className: "w-full p-2 bg-transparent border border-[var(--hive-border-default)] rounded resize-none focus:outline-none", rows: 2, autoFocus: true }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Button, { size: "xs", onClick: handleEdit, children: "Save" }), _jsx(Button, { size: "xs", variant: "ghost", onClick: () => setIsEditing(false), children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [message.type === 'text' && (_jsx("p", { className: "text-sm leading-relaxed", children: message.content })), message.type === 'image' && (_jsxs("div", { className: "space-y-2", children: [_jsx("img", { src: message.attachments?.[0]?.url, alt: "Shared image", className: "max-w-full h-auto rounded-lg" }), message.content && _jsx("p", { className: "text-sm", children: message.content })] })), message.type === 'file' && (_jsxs("div", { className: "flex items-center space-x-2 p-2 bg-black/10 rounded-lg", children: [_jsx(Paperclip, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: message.attachments?.[0]?.name })] }))] })), _jsxs("div", { className: "absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowMenu(!showMenu), className: "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)]", children: _jsx(MoreVertical, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-10 min-w-[120px]", children: [_jsxs("button", { onClick: () => {
                                                        onReply?.(message);
                                                        setShowMenu(false);
                                                    }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Reply, { className: "w-3 h-3" }), "Reply"] }), _jsxs("button", { onClick: () => {
                                                        onReact?.(message.id, '👍');
                                                        setShowMenu(false);
                                                    }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Smile, { className: "w-3 h-3" }), "React"] }), isOwnMessage && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                                setIsEditing(true);
                                                                setShowMenu(false);
                                                            }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Edit3, { className: "w-3 h-3" }), "Edit"] }), _jsxs("button", { onClick: () => {
                                                                onDelete?.(message.id);
                                                                setShowMenu(false);
                                                            }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]", children: [_jsx(Trash2, { className: "w-3 h-3" }), "Delete"] })] }))] })) })] })] }), _jsxs("div", { className: `flex items-center gap-2 mt-1 text-xs text-[var(--hive-text-muted)] ${isOwnMessage ? 'justify-end' : ''}`, children: [_jsx("span", { children: formatTime(message.timestamp) }), message.isEdited && _jsx("span", { children: "(edited)" }), getReadStatus()] }), message.reactions && message.reactions.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: message.reactions.map((reaction, index) => (_jsxs("button", { onClick: () => onReact?.(message.id, reaction.emoji), className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${reaction.users.includes(currentUserId)
                                ? 'bg-[var(--hive-primary)]/20 text-[var(--hive-primary)]'
                                : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)]'}`, children: [_jsx("span", { children: reaction.emoji }), _jsx("span", { children: reaction.users.length })] }, index))) }))] })] }));
};
const MessageList = ({ messages, currentUserId, conversation, onEditMessage, onDeleteMessage, onReactToMessage, onReplyToMessage }) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [messages.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsxs("div", { className: "text-center", children: [_jsx(MessageSquare, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "No messages yet" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: "Send the first message to start the conversation" })] }) })) : (messages.map((message) => (_jsx(MessageItem, { message: message, currentUserId: currentUserId, participants: conversation.participants, onEdit: onEditMessage, onDelete: onDeleteMessage, onReact: onReactToMessage, onReply: onReplyToMessage }, message.id)))), _jsx("div", { ref: messagesEndRef })] }));
};
const MessageInput = ({ onSendMessage, replyTo, onCancelReply, isLoading = false }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const handleSubmit = useCallback(async () => {
        if (!message.trim() || isLoading)
            return;
        await onSendMessage(message, replyTo?.id);
        setMessage('');
        onCancelReply?.();
    }, [message, isLoading, onSendMessage, replyTo, onCancelReply]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    return (_jsxs("div", { className: "p-4 border-t border-[var(--hive-border-subtle)]", children: [replyTo && (_jsxs("div", { className: "mb-3 p-3 bg-[var(--hive-background-secondary)] rounded-lg border-l-2 border-[var(--hive-primary)] flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)] mb-1", children: ["Replying to ", replyTo.senderId] }), _jsx("div", { className: "text-sm text-[var(--hive-text-primary)] truncate", children: replyTo.content })] }), _jsx(Button, { variant: "ghost", size: "xs", onClick: onCancelReply, children: _jsx(X, { className: "w-3 h-3" }) })] })), _jsxs("div", { className: "flex items-end gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx("textarea", { ref: textareaRef, value: message, onChange: (e) => setMessage(e.target.value), onKeyPress: handleKeyPress, placeholder: "Type a message...", rows: 1, className: "w-full p-3 pr-20 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)] resize-none", style: { minHeight: '44px', maxHeight: '120px' } }), _jsxs("div", { className: "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowEmojiPicker(!showEmojiPicker), children: _jsx(Smile, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "xs", children: _jsx(Paperclip, { className: "w-4 h-4" }) })] })] }), _jsx(Button, { onClick: handleSubmit, disabled: !message.trim() || isLoading, className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-primary)]/90 px-4 py-3", children: isLoading ? (_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsx(Send, { className: "w-4 h-4" })) })] })] }));
};
export const DirectMessageSystem = ({ currentUserId, conversations, messages, activeConversationId, onSendMessage, onEditMessage, onDeleteMessage, onReactToMessage, onMarkAsRead, onStartConversation, onSearchMessages, onArchiveConversation, onPinConversation, onMuteConversation, isLoading = false, enableFeatureFlag = true }) => {
    const [replyTo, setReplyTo] = useState();
    const [showInfo, setShowInfo] = useState(false);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];
    const handleSendMessage = useCallback(async (content, replyToId) => {
        if (!activeConversationId)
            return;
        await onSendMessage?.(activeConversationId, content, replyToId);
    }, [activeConversationId, onSendMessage]);
    const handleSelectConversation = useCallback(async (conversationId) => {
        await onMarkAsRead?.(conversationId);
    }, [onMarkAsRead]);
    const handleReplyToMessage = useCallback((message) => {
        setReplyTo(message);
    }, []);
    const getConversationTitle = (conversation) => {
        if (conversation.type === 'group') {
            return conversation.title || 'Group Chat';
        }
        const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
        return otherParticipant?.name || 'Unknown User';
    };
    return (_jsxs("div", { className: "flex h-full bg-[var(--hive-background-primary)]", children: [_jsx(ConversationList, { conversations: conversations, activeConversationId: activeConversationId, currentUserId: currentUserId, onSelectConversation: handleSelectConversation, onArchiveConversation: onArchiveConversation, onPinConversation: onPinConversation, onMuteConversation: onMuteConversation }), activeConversation ? (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-subtle)] flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { src: activeConversation.type === 'group' ? activeConversation.avatar : activeConversation.participants.find(p => p.id !== currentUserId)?.avatar, initials: getConversationTitle(activeConversation).charAt(0), size: "md" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: getConversationTitle(activeConversation) }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: activeConversation.type === 'group'
                                                    ? `${activeConversation.participants.length} members`
                                                    : activeConversation.participants.find(p => p.id !== currentUserId)?.isOnline
                                                        ? 'Online'
                                                        : 'Offline' })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Phone, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Video, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowInfo(!showInfo), children: _jsx(Info, { className: "w-4 h-4" }) })] })] }), _jsx(MessageList, { messages: activeMessages, currentUserId: currentUserId, conversation: activeConversation, onEditMessage: onEditMessage, onDeleteMessage: onDeleteMessage, onReactToMessage: onReactToMessage, onReplyToMessage: handleReplyToMessage }), _jsx(MessageInput, { onSendMessage: handleSendMessage, replyTo: replyTo, onCancelReply: () => setReplyTo(undefined), isLoading: isLoading })] })) : (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(MessageSquare, { className: "w-16 h-16 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "Select a conversation" }), _jsx("p", { className: "text-[var(--hive-text-muted)] mb-6", children: "Choose from your existing conversations or start a new one" }), _jsx(Button, { onClick: () => onStartConversation?.([]), className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]", children: "Start New Conversation" })] }) })), _jsx(AnimatePresence, { children: showInfo && activeConversation && (_jsx(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 300, opacity: 1 }, exit: { width: 0, opacity: 0 }, className: "bg-[var(--hive-background-elevated)] border-l border-[var(--hive-border-default)] overflow-hidden", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: "Conversation Info" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowInfo(false), children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: activeConversation.type === 'group' ? 'Members' : 'Participants' }), _jsx("div", { className: "space-y-2", children: activeConversation.participants.map((participant) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { src: participant.avatar, initials: participant.name.charAt(0), size: "sm" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] text-sm", children: participant.name }), _jsxs("div", { className: "text-xs text-[var(--hive-text-muted)]", children: ["@", participant.handle] })] }), participant.isOnline && (_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }))] }, participant.id))) })] })] }) })) })] }));
};
//# sourceMappingURL=direct-message-system.js.map