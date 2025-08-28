"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  MessageCircle,
  Send,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  Reply,
  Heart,
  Trash2,
  Edit3,
  Copy,
  Flag,
  Pin,
  Lock,
  Unlock,
  Users,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  Search,
  Filter,
  Settings,
  Crown,
  Sparkles,
  Zap,
  Star,
  Volume2,
  VolumeX,
  EyeOff,
  Eye,
  UserPlus,
  UserMinus,
  XCircle
} from 'lucide-react';

// HIVE Chat Surface - Real-time Communication
// Modern chat interface with threads, reactions, and rich media

const hiveChatSurfaceVariants = cva(
  "relative w-full h-full flex flex-col",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-orange-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-orange-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Message types
const messageTypes = {
  text: { icon: MessageCircle, label: 'Text' },
  image: { icon: ImageIcon, label: 'Image' },
  file: { icon: Paperclip, label: 'File' },
  audio: { icon: Mic, label: 'Audio' },
  system: { icon: AlertCircle, label: 'System' },
} as const;

// Message status
const messageStatuses = {
  sending: { icon: Clock, color: 'text-gray-400' },
  sent: { icon: Check, color: 'text-gray-400' },
  delivered: { icon: CheckCheck, color: 'text-gray-400' },
  read: { icon: CheckCheck, color: 'text-blue-400' },
  failed: { icon: AlertCircle, color: 'text-red-400' },
} as const;

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

export interface HiveChatSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveChatSurfaceVariants> {
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
  typingUsers?: Array<{ id: string; name: string; }>;
  enableVoiceMessages?: boolean;
  enableFileSharing?: boolean;
  maxMessageLength?: number;
}

export const HiveChatSurface = React.forwardRef<HTMLDivElement, HiveChatSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    messages = [],
    currentUserId,
    isBuilder = false,
    canSendMessages = true,
    canModerate = false,
    isLocked = false,
    onSendMessage,
    onEditMessage,
    onDeleteMessage,
    onReactToMessage,
    onReplyToMessage,
    onPinMessage,
    onMentionUser,
    showTypingIndicator = true,
    typingUsers = [],
    enableVoiceMessages = false,
    enableFileSharing = true,
    maxMessageLength = 2000,
    ...props 
  }, ref) => {
    
    const [messageText, setMessageText] = useState('');
    const [replyToMessage, setReplyToMessage] = useState<ChatMessage | null>(null);
    const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
    const [editingMessage, setEditingMessage] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);
    
    // Handle message submission
    const handleSendMessage = useCallback(() => {
      if (!messageText.trim() || !onSendMessage) return;
      
      onSendMessage(messageText, 'text');
      setMessageText('');
      setReplyToMessage(null);
    }, [messageText, onSendMessage]);
    
    // Handle key press in input
    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    }, [handleSendMessage]);
    
    // Common reactions
    const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
    
    // Check if chat is available
    if (isLocked) {
      return (
        <div
          ref={ref}
          className={cn(hiveChatSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="flex-1 flex items-center justify-center text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <div>
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: motionDurations.quick }}
              >
                <Lock className="w-8 h-8 text-orange-400" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Chat Coming Soon</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Real-time chat will be available in v0.1.1. Stay tuned for live conversations with your community!
              </p>
            </div>
          </motion.div>
        </div>
      );
    }
    
    // Empty state
    if (messages.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hiveChatSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="flex-1 flex items-center justify-center text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <div>
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: motionDurations.quick }}
              >
                <MessageCircle className="w-8 h-8 text-orange-400" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Start Chatting</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Connect with your community in real-time. Share thoughts, ask questions, and build relationships through conversation.
              </p>
              
              {canSendMessages && (
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl hover:bg-orange-500/30 transition-all duration-200 font-medium"
                  onClick={() => inputRef.current?.focus()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Send First Message
                </motion.button>
              )}
            </div>
          </motion.div>
          
          {/* Message Input */}
          {canSendMessages && (
            <div className="border-t border-white/10 p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-[var(--hive-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 resize-none"
                    rows={1}
                    maxLength={maxMessageLength}
                  />
                  
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {messageText.length}/{maxMessageLength}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  className="p-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl hover:bg-orange-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hiveChatSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Chat</h3>
            <span className="text-sm text-gray-400">{space.memberCount} members</span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-4 h-4" />
            </motion.button>
            
            {canModerate && (
              <motion.button
                className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => {
            const isOwn = message.authorId === currentUserId;
            const isHovered = hoveredMessage === message.id;
            const statusConfig = messageStatuses[message.status];
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  isOwn && "flex-row-reverse"
                )}
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                {/* Avatar */}
                {!isOwn && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                    {message.authorAvatar ? (
                      <img src={message.authorAvatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-[var(--hive-text-primary)]">
                          {message.authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Message Content */}
                <div className={cn(
                  "flex-1 max-w-md",
                  isOwn && "flex flex-col items-end"
                )}>
                  {/* Message Bubble */}
                  <motion.div
                    className={cn(
                      "relative group px-4 py-3 rounded-2xl",
                      isOwn 
                        ? "bg-orange-500/20 text-[var(--hive-text-primary)]" 
                        : "bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/5 text-[var(--hive-text-primary)]",
                      message.isPinned && "ring-1 ring-yellow-500/30"
                    )}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: motionDurations.quick }}
                  >
                    {/* Reply Reference */}
                    {message.replyToId && (
                      <div className="mb-2 p-2 bg-[var(--hive-text-primary)]/5 rounded-lg border-l-2 border-gray-500">
                        <div className="text-xs text-gray-400">
                          Replying to message
                        </div>
                      </div>
                    )}
                    
                    {/* Author Name (for others' messages) */}
                    {!isOwn && (
                      <div className="text-xs font-medium text-orange-400 mb-1">
                        {message.authorName}
                      </div>
                    )}
                    
                    {/* Message Text */}
                    <div className="text-sm leading-relaxed">
                      {message.content}
                    </div>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-2 p-2 bg-[var(--hive-text-primary)]/5 rounded-lg"
                          >
                            <Paperclip className="w-4 h-4 text-gray-400" />
                            <span className="text-sm truncate">{attachment.name}</span>
                            <span className="text-xs text-gray-500">
                              {(attachment.size / 1024).toFixed(1)}KB
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Message Actions */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className={cn(
                            "absolute -top-8 flex items-center gap-1 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-lg p-1",
                            isOwn ? "right-0" : "left-0"
                          )}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: motionDurations.quick }}
                        >
                          <motion.button
                            className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200"
                            onClick={() => onReplyToMessage?.(message.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Reply className="w-3 h-3" />
                          </motion.button>
                          
                          <motion.button
                            className="p-1.5 text-gray-400 hover:text-red-400 rounded hover:bg-red-500/10 transition-all duration-200"
                            onClick={() => onReactToMessage?.(message.id, '❤️')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className="w-3 h-3" />
                          </motion.button>
                          
                          {(isOwn || canModerate) && (
                            <>
                              {isOwn && (
                                <motion.button
                                  className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200"
                                  onClick={() => setEditingMessage(message.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Edit3 className="w-3 h-3" />
                                </motion.button>
                              )}
                              
                              <motion.button
                                className="p-1.5 text-gray-400 hover:text-red-400 rounded hover:bg-red-500/10 transition-all duration-200"
                                onClick={() => onDeleteMessage?.(message.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </motion.button>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Reactions */}
                  {message.reactions.length > 0 && (
                    <motion.div
                      className="flex items-center gap-1 mt-1 flex-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {message.reactions.map((reaction, i) => (
                        <motion.button
                          key={i}
                          className="flex items-center gap-1 px-2 py-1 bg-[var(--hive-text-primary)]/5 rounded-full text-xs hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-gray-400">{reaction.count}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Message Meta */}
                  <div className={cn(
                    "flex items-center gap-2 mt-1 text-xs text-gray-500",
                    isOwn && "flex-row-reverse"
                  )}>
                    <time>
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </time>
                    
                    {message.isEdited && (
                      <span className="text-gray-400">(edited)</span>
                    )}
                    
                    {isOwn && (
                      <StatusIcon className={cn("w-3 h-3", statusConfig.color)} />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Typing Indicator */}
          {showTypingIndicator && typingUsers.length > 0 && (
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs">...</span>
              </div>
              <div className="bg-[var(--hive-background-primary)]/20 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Messages End Marker */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        {canSendMessages && (
          <div className="border-t border-white/10 p-4">
            {/* Reply Preview */}
            <AnimatePresence>
              {replyToMessage && (
                <motion.div
                  className="mb-3 p-3 bg-[var(--hive-text-primary)]/5 border-l-2 border-orange-500 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-orange-400 mb-1">
                        Replying to {replyToMessage.authorName}
                      </div>
                      <div className="text-sm text-gray-300 line-clamp-1">
                        {replyToMessage.content}
                      </div>
                    </div>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-[var(--hive-text-primary)]"
                      onClick={() => setReplyToMessage(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Input Area */}
            <div className="flex items-end gap-3">
              {/* Attachment Button */}
              {enableFileSharing && (
                <motion.button
                  className="p-3 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-xl hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>
              )}
              
              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 pr-20 text-[var(--hive-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 resize-none"
                  rows={1}
                  maxLength={maxMessageLength}
                />
                
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {messageText.length}/{maxMessageLength}
                  </span>
                  
                  <motion.button
                    className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Smile className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Voice Message Button */}
              {enableVoiceMessages && (
                <motion.button
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200",
                    isRecording
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:text-[var(--hive-text-primary)] hover:border-white/20"
                  )}
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  onMouseLeave={() => setIsRecording(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
              )}
              
              {/* Send Button */}
              <motion.button
                className="p-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl hover:bg-orange-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        )}
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="absolute top-4 left-4 right-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-orange-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-orange-300/80">
                  Chat enables real-time community connection. Configure moderation settings and features to create a welcoming environment.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HiveChatSurface.displayName = "HiveChatSurface";

export { hiveChatSurfaceVariants, messageTypes, messageStatuses };