/**
 * HIVE Direct Message System
 * Complete DM and chat functionality with real-time updates
 */

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Avatar, HiveBadge as Badge } from '../index';
import { 
  MessageSquare, 
  Send, 
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Star,
  Image,
  Paperclip,
  Smile,
  X,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Users,
  Pin,
  Edit3,
  Reply,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  title?: string; // For group chats
  avatar?: string; // For group chats
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

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  currentUserId: string;
  onSelectConversation: (conversationId: string) => void;
  onArchiveConversation?: (conversationId: string) => Promise<void>;
  onPinConversation?: (conversationId: string) => Promise<void>;
  onMuteConversation?: (conversationId: string) => Promise<void>;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  conversation: Conversation;
  onEditMessage?: (messageId: string, content: string) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  onReactToMessage?: (messageId: string, emoji: string) => Promise<void>;
  onReplyToMessage?: (message: Message) => void;
}

interface MessageInputProps {
  onSendMessage: (content: string, replyTo?: string) => Promise<void>;
  replyTo?: Message;
  onCancelReply?: () => void;
  isLoading?: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  currentUserId,
  onSelectConversation,
  onArchiveConversation,
  onPinConversation,
  onMuteConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const filteredConversations = useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter(conv => 
      conv.participants.some(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.handle.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      conv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const formatMessagePreview = (message: Message) => {
    if (message.type === 'image') return '📷 Image';
    if (message.type === 'file') return '📎 File';
    if (message.type === 'system') return message.content;
    return message.content.length > 50 ? `${message.content.substring(0, 50)}...` : message.content;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return conversation.title || 'Group Chat';
    }
    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
    return otherParticipant?.name || 'Unknown User';
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return conversation.avatar;
    }
    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
    return otherParticipant?.avatar;
  };

  return (
    <div className="w-80 bg-[var(--hive-background-elevated)] border-r border-[var(--hive-border-default)] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--hive-border-subtle)]">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" />
            <p className="text-sm text-[var(--hive-text-muted)]">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`relative p-3 rounded-lg cursor-pointer transition-colors group ${
                  activeConversationId === conversation.id 
                    ? 'bg-[var(--hive-primary)]/10 border border-[var(--hive-primary)]/20' 
                    : 'hover:bg-[var(--hive-background-secondary)]'
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar
                      src={getConversationAvatar(conversation)}
                      initials={getConversationTitle(conversation).charAt(0)}
                      size="md"
                    />
                    {conversation.type === 'direct' && (
                      <>
                        {conversation.participants.find(p => p.id !== currentUserId)?.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[var(--hive-background-elevated)] rounded-full" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-[var(--hive-text-primary)] truncate">
                          {getConversationTitle(conversation)}
                        </h3>
                        {conversation.isPinned && (
                          <Pin className="w-3 h-3 text-[var(--hive-primary)]" />
                        )}
                        {conversation.isMuted && (
                          <div className="w-3 h-3 bg-[var(--hive-text-muted)] rounded-full opacity-50" />
                        )}
                      </div>
                      <span className="text-xs text-[var(--hive-text-muted)]">
                        {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[var(--hive-text-secondary)] truncate">
                        {conversation.lastMessage ? formatMessagePreview(conversation.lastMessage) : 'No messages'}
                      </p>
                      <div className="flex items-center space-x-2">
                        {conversation.unreadCount > 0 && (
                          <Badge 
                            size="sm" 
                            className="bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] min-w-[20px] h-5 flex items-center justify-center"
                          >
                            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* More Menu */}
                  <div className="relative">
                    <ButtonEnhanced
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(showMenu === conversation.id ? null : conversation.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </ButtonEnhanced>

                    <AnimatePresence>
                      {showMenu === conversation.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPinConversation?.(conversation.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                          >
                            <Pin className="w-3 h-3" />
                            {conversation.isPinned ? 'Unpin' : 'Pin'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMuteConversation?.(conversation.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                          >
                            <div className="w-3 h-3 bg-current rounded-full opacity-50" />
                            {conversation.isMuted ? 'Unmute' : 'Mute'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onArchiveConversation?.(conversation.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                          >
                            <Archive className="w-3 h-3" />
                            Archive
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MessageItem: React.FC<{
  message: Message;
  currentUserId: string;
  participants: Conversation['participants'];
  onEdit?: (messageId: string, content: string) => Promise<void>;
  onDelete?: (messageId: string) => Promise<void>;
  onReact?: (messageId: string, emoji: string) => Promise<void>;
  onReply?: (message: Message) => void;
}> = ({ message, currentUserId, participants, onEdit, onDelete, onReact, onReply }) => {
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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getReadStatus = () => {
    if (!isOwnMessage) return null;
    if (message.readBy.length === 0) return <Clock className="w-3 h-3 text-[var(--hive-text-muted)]" />;
    if (message.readBy.length === 1) return <Check className="w-3 h-3 text-[var(--hive-text-muted)]" />;
    return <CheckCheck className="w-3 h-3 text-[var(--hive-primary)]" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 group mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar - only show for others' messages */}
      {!isOwnMessage && (
        <Avatar
          src={sender?.avatar}
          initials={sender?.name.charAt(0) || 'U'}
          size="sm"
          className="flex-shrink-0"
        />
      )}

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isOwnMessage ? 'flex flex-col items-end' : ''}`}>
        {/* Reply Context */}
        {message.replyTo && (
          <div className="mb-2 p-2 bg-[var(--hive-background-secondary)] rounded-lg border-l-2 border-[var(--hive-primary)]">
            <div className="text-xs text-[var(--hive-text-muted)] mb-1">
              Replying to {message.replyTo.senderName}
            </div>
            <div className="text-sm text-[var(--hive-text-secondary)] truncate">
              {message.replyTo.content}
            </div>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`relative p-3 rounded-2xl ${
            isOwnMessage
              ? 'bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] rounded-br-md'
              : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] rounded-bl-md'
          }`}
        >
          {isEditing ? (
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 bg-transparent border border-[var(--hive-border-default)] rounded resize-none focus:outline-none"
                rows={2}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <ButtonEnhanced size="xs" onClick={handleEdit}>
                  Save
                </ButtonEnhanced>
                <ButtonEnhanced size="xs" variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </ButtonEnhanced>
              </div>
            </div>
          ) : (
            <>
              {message.type === 'text' && (
                <p className="text-sm leading-relaxed">{message.content}</p>
              )}
              {message.type === 'image' && (
                <div className="space-y-2">
                  <img 
                    src={message.attachments?.[0]?.url} 
                    alt="Shared image"
                    className="max-w-full h-auto rounded-lg"
                  />
                  {message.content && <p className="text-sm">{message.content}</p>}
                </div>
              )}
              {message.type === 'file' && (
                <div className="flex items-center space-x-2 p-2 bg-black/10 rounded-lg">
                  <Paperclip className="w-4 h-4" />
                  <span className="text-sm font-medium">{message.attachments?.[0]?.name}</span>
                </div>
              )}
            </>
          )}

          {/* More Menu */}
          <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <ButtonEnhanced
              variant="ghost"
              size="xs"
              onClick={() => setShowMenu(!showMenu)}
              className="bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)]"
            >
              <MoreVertical className="w-3 h-3" />
            </ButtonEnhanced>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
                >
                  <button
                    onClick={() => {
                      onReply?.(message);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                  >
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      onReact?.(message.id, '👍');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                  >
                    <Smile className="w-3 h-3" />
                    React
                  </button>
                  {isOwnMessage && (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete?.(message.id);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Meta */}
        <div className={`flex items-center gap-2 mt-1 text-xs text-[var(--hive-text-muted)] ${isOwnMessage ? 'justify-end' : ''}`}>
          <span>{formatTime(message.timestamp)}</span>
          {message.isEdited && <span>(edited)</span>}
          {getReadStatus()}
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => onReact?.(message.id, reaction.emoji)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                  reaction.users.includes(currentUserId)
                    ? 'bg-[var(--hive-primary)]/20 text-[var(--hive-primary)]'
                    : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)]'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.users.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  conversation,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onReplyToMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" />
            <p className="text-[var(--hive-text-muted)]">No messages yet</p>
            <p className="text-sm text-[var(--hive-text-muted)] mt-1">Send the first message to start the conversation</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            participants={conversation.participants}
            onEdit={onEditMessage}
            onDelete={onDeleteMessage}
            onReact={onReactToMessage}
            onReply={onReplyToMessage}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  replyTo,
  onCancelReply,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(async () => {
    if (!message.trim() || isLoading) return;
    
    await onSendMessage(message, replyTo?.id);
    setMessage('');
    onCancelReply?.();
  }, [message, isLoading, onSendMessage, replyTo, onCancelReply]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-[var(--hive-border-subtle)]">
      {/* Reply Context */}
      {replyTo && (
        <div className="mb-3 p-3 bg-[var(--hive-background-secondary)] rounded-lg border-l-2 border-[var(--hive-primary)] flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--hive-text-muted)] mb-1">
              Replying to {replyTo.senderId}
            </div>
            <div className="text-sm text-[var(--hive-text-primary)] truncate">
              {replyTo.content}
            </div>
          </div>
          <ButtonEnhanced
            variant="ghost"
            size="xs"
            onClick={onCancelReply}
          >
            <X className="w-3 h-3" />
          </ButtonEnhanced>
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="w-full p-3 pr-20 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)] resize-none"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Input Actions */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <ButtonEnhanced
              variant="ghost"
              size="xs"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="w-4 h-4" />
            </ButtonEnhanced>
            <ButtonEnhanced
              variant="ghost"
              size="xs"
            >
              <Paperclip className="w-4 h-4" />
            </ButtonEnhanced>
          </div>
        </div>

        <ButtonEnhanced
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-primary)]/90 px-4 py-3"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </ButtonEnhanced>
      </div>
    </div>
  );
};

export const DirectMessageSystem: React.FC<DirectMessageSystemProps> = ({
  currentUserId,
  conversations,
  messages,
  activeConversationId,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onMarkAsRead,
  onStartConversation,
  onSearchMessages,
  onArchiveConversation,
  onPinConversation,
  onMuteConversation,
  isLoading = false,
  enableFeatureFlag = true
}) => {
  const [replyTo, setReplyTo] = useState<Message | undefined>();
  const [showInfo, setShowInfo] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) return null;

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  const handleSendMessage = useCallback(async (content: string, replyToId?: string) => {
    if (!activeConversationId) return;
    await onSendMessage?.(activeConversationId, content, replyToId);
  }, [activeConversationId, onSendMessage]);

  const handleSelectConversation = useCallback(async (conversationId: string) => {
    await onMarkAsRead?.(conversationId);
  }, [onMarkAsRead]);

  const handleReplyToMessage = useCallback((message: Message) => {
    setReplyTo(message);
  }, []);

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return conversation.title || 'Group Chat';
    }
    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
    return otherParticipant?.name || 'Unknown User';
  };

  return (
    <div className="flex h-full bg-[var(--hive-background-primary)]">
      {/* Conversation List */}
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId}
        currentUserId={currentUserId}
        onSelectConversation={handleSelectConversation}
        onArchiveConversation={onArchiveConversation}
        onPinConversation={onPinConversation}
        onMuteConversation={onMuteConversation}
      />

      {/* Chat Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--hive-border-subtle)] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                src={activeConversation.type === 'group' ? activeConversation.avatar : activeConversation.participants.find(p => p.id !== currentUserId)?.avatar}
                initials={getConversationTitle(activeConversation).charAt(0)}
                size="md"
              />
              <div>
                <h3 className="font-medium text-[var(--hive-text-primary)]">
                  {getConversationTitle(activeConversation)}
                </h3>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {activeConversation.type === 'group' 
                    ? `${activeConversation.participants.length} members`
                    : activeConversation.participants.find(p => p.id !== currentUserId)?.isOnline 
                      ? 'Online' 
                      : 'Offline'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ButtonEnhanced variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </ButtonEnhanced>
              <ButtonEnhanced variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </ButtonEnhanced>
              <ButtonEnhanced 
                variant="ghost" 
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="w-4 h-4" />
              </ButtonEnhanced>
            </div>
          </div>

          {/* Messages */}
          <MessageList
            messages={activeMessages}
            currentUserId={currentUserId}
            conversation={activeConversation}
            onEditMessage={onEditMessage}
            onDeleteMessage={onDeleteMessage}
            onReactToMessage={onReactToMessage}
            onReplyToMessage={handleReplyToMessage}
          />

          {/* Message Input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            replyTo={replyTo}
            onCancelReply={() => setReplyTo(undefined)}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-[var(--hive-text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
              Select a conversation
            </h3>
            <p className="text-[var(--hive-text-muted)] mb-6">
              Choose from your existing conversations or start a new one
            </p>
            <ButtonEnhanced
              onClick={() => onStartConversation?.([])}
              className="bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]"
            >
              Start New Conversation
            </ButtonEnhanced>
          </div>
        </div>
      )}

      {/* Conversation Info Panel */}
      <AnimatePresence>
        {showInfo && activeConversation && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[var(--hive-background-elevated)] border-l border-[var(--hive-border-default)] overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[var(--hive-text-primary)]">Conversation Info</h3>
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInfo(false)}
                >
                  <X className="w-4 h-4" />
                </ButtonEnhanced>
              </div>

              {/* Participants */}
              <div>
                <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
                  {activeConversation.type === 'group' ? 'Members' : 'Participants'}
                </h4>
                <div className="space-y-2">
                  {activeConversation.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3">
                      <Avatar
                        src={participant.avatar}
                        initials={participant.name.charAt(0)}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-[var(--hive-text-primary)] text-sm">
                          {participant.name}
                        </div>
                        <div className="text-xs text-[var(--hive-text-muted)]">
                          @{participant.handle}
                        </div>
                      </div>
                      {participant.isOnline && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};