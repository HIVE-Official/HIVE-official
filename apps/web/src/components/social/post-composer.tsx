"use client";

import { useState, useRef, useCallback } from 'react';
import { Card, Button, Textarea } from "@hive/ui";
import { Alert, AlertDescription } from "@/components/temp-stubs";
import {
  Send,
  Image,
  Link,
  Code,
  BarChart3 as Poll,
  Calendar,
  X,
  Plus,
  Paperclip,
  Users,
  Lock,
  Globe,
  AlertTriangle
} from 'lucide-react';

interface PostComposerProps {
  onPost: (_post: PostData) => Promise<void>;
  onCancel?: () => void;
  spaceId?: string;
  placeholder?: string;
  maxLength?: number;
  allowedTypes?: PostType[];
  user: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
  };
}

interface PostData {
  content: string;
  type: PostType;
  visibility: 'public' | 'space' | 'private';
  attachments: Attachment[];
  mentions: string[];
  tags: string[];
  poll?: Poll;
  event?: Event;
  location?: Location;
  spaceId?: string;
}

interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'link' | 'tool';
  url: string;
  name: string;
  size?: number;
  metadata?: Record<string, unknown>;
}

interface Poll {
  question: string;
  options: string[];
  allowMultiple: boolean;
  expiresAt?: string;
}

interface Event {
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  location?: string;
}

interface Location {
  name: string;
  coordinates?: [number, number];
}

type PostType = 'text' | 'image' | 'video' | 'link' | 'poll' | 'event' | 'tool' | 'announcement';

export function PostComposer({
  onPost,
  onCancel,
  spaceId,
  placeholder = "What's happening?",
  maxLength = 500,
  allowedTypes = ['text', 'image', 'link', 'poll', 'event'],
  user
}: PostComposerProps) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<PostType>('text');
  const [visibility, setVisibility] = useState<'public' | 'space' | 'private'>(
    spaceId ? 'space' : 'public'
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll state
  const [poll, setPoll] = useState<Poll>({
    question: '',
    options: ['', ''],
    allowMultiple: false
  });

  // Event state
  const [event, setEvent] = useState<Event>({
    title: '',
    description: '',
    startTime: '',
  });

  // Location state
  const [location, setLocation] = useState<Location | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
    setError(null);
    adjustTextareaHeight();
    
    // Extract mentions and hashtags
    const mentionMatches = value.match(/@(\w+)/g) || [];
    const tagMatches = value.match(/#(\w+)/g) || [];
    
    setMentions(mentionMatches.map(m => m.slice(1)));
    setTags(tagMatches.map(t => t.slice(1)));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      const attachment: Attachment = {
        id: `attachment_${Date.now()}_${Math.random()}`,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'file',
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        metadata: { originalFile: file }
      };
      
      setAttachments(prev => [...prev, attachment]);
    });
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment && attachment.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const addPollOption = () => {
    setPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updatePollOption = (index: number, value: string) => {
    setPoll(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removePollOption = (index: number) => {
    if (poll.options.length > 2) {
      setPoll(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const validatePost = (): string | null => {
    if (!content.trim() && attachments.length === 0) {
      return 'Post cannot be empty';
    }
    
    if (content.length > maxLength) {
      return `Post is too long (${content.length}/${maxLength} characters)`;
    }
    
    if (postType === 'poll') {
      if (!poll.question.trim()) {
        return 'Poll question is required';
      }
      const validOptions = poll.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        return 'Poll must have at least 2 options';
      }
    }
    
    if (postType === 'event') {
      if (!event.title.trim()) {
        return 'Event title is required';
      }
      if (!event.startTime) {
        return 'Event start time is required';
      }
    }
    
    return null;
  };

  const handlePost = async () => {
    const validationError = validatePost();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsPosting(true);
    setError(null);

    try {
      const postData: PostData = {
        content: content.trim(),
        type: postType,
        visibility,
        attachments,
        mentions,
        tags,
        spaceId,
        ...(postType === 'poll' && { poll }),
        ...(postType === 'event' && { event }),
        ...(location && { location })
      };

      await onPost(postData);
      
      // Reset form
      setContent('');
      setAttachments([]);
      setMentions([]);
      setTags([]);
      setPoll({ question: '', options: ['', ''], allowMultiple: false });
      setEvent({ title: '', description: '', startTime: '' });
      setLocation(null);
      setPostType('text');
      setShowAdvanced(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'public': return <Globe className="h-4 w-4" />;
      case 'space': return <Users className="h-4 w-4" />;
      case 'private': return <Lock className="h-4 w-4" />;
    }
  };

  const getVisibilityLabel = () => {
    switch (visibility) {
      case 'public': return 'Everyone on HIVE';
      case 'space': return spaceId ? 'Space members only' : 'Space members';
      case 'private': return 'Only you';
    }
  };

  const characterCount = content.length;
  const isOverLimit = characterCount > maxLength;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-hive-gold text-hive-obsidian font-semibold rounded-full flex items-center justify-center">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-white">{user.name}</p>
            <div className="flex items-center space-x-2 text-sm text-hive-text-mutedLight">
              {getVisibilityIcon()}
              <span>{getVisibilityLabel()}</span>
            </div>
          </div>
          {onCancel && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-3">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className={`min-h-[80px] resize-none border-none bg-transparent text-white placeholder:text-hive-text-mutedLight focus:outline-none ${
              isOverLimit ? 'text-red-400' : ''
            }`}
            maxLength={maxLength + 50} // Allow slightly over for better UX
          />

          {/* Character Count */}
          <div className="flex justify-end">
            <span className={`text-xs ${
              isOverLimit ? 'text-red-400' : 
              isNearLimit ? 'text-yellow-400' : 
              'text-hive-text-mutedLight'
            }`}>
              {characterCount}/{maxLength}
            </span>
          </div>

          {/* Post Type Specific Content */}
          {postType === 'poll' && (
            <div className="space-y-3 p-3 bg-hive-background-tertiary rounded-lg">
              <input
                type="text"
                value={poll.question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoll(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Ask a question..."
                className="w-full bg-transparent text-white placeholder:text-hive-text-mutedLight border-none outline-none"
              />
              
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-2 border-hive-text-mutedLight" />
                    <input
                      type="text"
                      value={option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-transparent text-white placeholder:text-hive-text-mutedLight border-none outline-none"
                    />
                    {poll.options.length > 2 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => removePollOption(index)}
                        className="text-red-400 border-red-400"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addPollOption}
                  disabled={poll.options.length >= 4}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
                
                <label className="flex items-center space-x-2 text-sm text-hive-text-mutedLight">
                  <input
                    type="checkbox"
                    checked={poll.allowMultiple}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoll(prev => ({ ...prev, allowMultiple: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Allow multiple choices</span>
                </label>
              </div>
            </div>
          )}

          {postType === 'event' && (
            <div className="space-y-3 p-3 bg-hive-background-tertiary rounded-lg">
              <input
                type="text"
                value={event.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Event title"
                className="w-full bg-transparent text-white placeholder:text-hive-text-mutedLight border-none outline-none font-medium"
              />
              
              <textarea
                value={event.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEvent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Event description"
                rows={2}
                className="w-full bg-transparent text-white placeholder:text-hive-text-mutedLight border-none outline-none resize-none"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-hive-text-mutedLight">Start Time</label>
                  <input
                    type="datetime-local"
                    value={event.startTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full mt-1 bg-transparent text-white border border-hive-border-default rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-hive-text-mutedLight">End Time (Optional)</label>
                  <input
                    type="datetime-local"
                    value={event.endTime || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full mt-1 bg-transparent text-white border border-hive-border-default rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center justify-between p-2 bg-hive-background-tertiary rounded">
                  <div className="flex items-center space-x-2">
                    {attachment.type === 'image' ? <Image className="h-4 w-4" /> :
                     attachment.type === 'video' ? <Image className="h-4 w-4" /> :
                     <Paperclip className="h-4 w-4" />}
                    <span className="text-sm text-white">{attachment.name}</span>
                    {attachment.size && (
                      <span className="text-xs text-hive-text-mutedLight">
                        ({(attachment.size / 1024).toFixed(1)}KB)
                      </span>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-red-400 border-red-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Post Type Selector */}
            <div className="flex items-center space-x-1">
              {allowedTypes.map(type => (
                <Button
                  key={type}
                  variant="secondary"
                  size="sm"
                  onClick={() => setPostType(type)}
                  className={postType === type ? 'bg-hive-gold/20 border-hive-gold' : ''}
                  title={`Create ${type} post`}
                >
                  {type === 'text' && <span className="h-4 w-4 flex items-center justify-center text-xs">📄</span>}
                  {type === 'image' && <Image className="h-4 w-4" />}
                  {type === 'link' && <Link className="h-4 w-4" />}
                  {type === 'poll' && <Poll className="h-4 w-4" />}
                  {type === 'event' && <Calendar className="h-4 w-4" />}
                  {type === 'tool' && <Code className="h-4 w-4" />}
                </Button>
              ))}
            </div>

            {/* Media Upload */}
            {allowedTypes.includes('image') && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            )}

            {/* Additional Tools */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={showAdvanced ? 'bg-hive-gold/20 border-hive-gold' : ''}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Button */}
          <Button
            onClick={handlePost}
            disabled={isPosting || isOverLimit || (!content.trim() && attachments.length === 0)}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            <Send className="h-4 w-4 mr-2" />
            {isPosting ? 'Posting...' : 'Post'}
          </Button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="pt-3 border-t border-hive-border-default space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Visibility</span>
              <div className="flex items-center space-x-2">
                {['public', 'space', 'private'].map(vis => (
                  <Button
                    key={vis}
                    variant="secondary"
                    size="sm"
                    onClick={() => setVisibility(vis as 'public' | 'space' | 'private')}
                    className={visibility === vis ? 'bg-hive-gold/20 border-hive-gold' : ''}
                    disabled={vis === 'space' && !spaceId}
                  >
                    {vis === 'public' && <Globe className="h-4 w-4" />}
                    {vis === 'space' && <Users className="h-4 w-4" />}
                    {vis === 'private' && <Lock className="h-4 w-4" />}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

