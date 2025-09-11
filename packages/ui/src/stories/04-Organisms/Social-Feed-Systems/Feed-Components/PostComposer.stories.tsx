/**
 * HIVE Social Feed: Post Composer Component
 * Interactive post creation component with all post types and features
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
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
  AlertTriangle,
  Camera,
  Target,
  Smile
} from 'lucide-react';
import '../../../../hive-tokens.css';

// Mock Post Composer Component for Storybook
const PostComposer = ({ 
  onPost, 
  onCancel, 
  spaceId, 
  placeholder = "What's happening?", 
  maxLength = 500,
  allowedTypes = ['text', 'image', 'link', 'poll', 'event'],
  user 
}: any) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<string>('text');
  const [visibility, setVisibility] = useState<string>(spaceId ? 'space' : 'public');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll state
  const [poll, setPoll] = useState({
    question: '',
    options: ['', ''],
    allowMultiple: false
  });

  // Event state
  const [event, setEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });

  const handleContentChange = (value: string) => {
    setContent(value);
    setError(null);
  };

  const handlePost = async () => {
    if (!content.trim() && attachments.length === 0) {
      setError('Post cannot be empty');
      return;
    }

    if (content.length > maxLength) {
      setError(`Post is too long (${content.length}/${maxLength} characters)`);
      return;
    }

    setIsPosting(true);
    try {
      await onPost?.({
        content: content.trim(),
        type: postType,
        visibility,
        attachments,
        poll: postType === 'poll' ? poll : undefined,
        event: postType === 'event' ? event : undefined,
        spaceId
      });
      
      // Reset form
      setContent('');
      setAttachments([]);
      setPoll({ question: '', options: ['', ''], allowMultiple: false });
      setEvent({ title: '', description: '', startTime: '', endTime: '' });
      setPostType('text');
      setShowAdvanced(false);
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setIsPosting(false);
    }
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
    <div className="max-w-2xl">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-white">{user.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  {getVisibilityIcon()}
                  <span>{getVisibilityLabel()}</span>
                </div>
              </div>
              {onCancel && (
                <Button variant="secondary" size="sm" onClick={onCancel} className="border-gray-600 text-white">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Content Area */}
            <div className="space-y-3">
              <Textarea
                value={content}
                onChange={(e: any) => handleContentChange(e.target.value)}
                placeholder={placeholder}
                className={`min-h-[80px] resize-none bg-gray-900 border-gray-700 text-white placeholder-gray-400 ${
                  isOverLimit ? 'border-red-500' : ''
                }`}
                maxLength={maxLength + 50}
              />

              {/* Character Count */}
              <div className="flex justify-end">
                <span className={`text-xs ${
                  isOverLimit ? 'text-red-400' : 
                  isNearLimit ? 'text-yellow-400' : 
                  'text-gray-400'
                }`}>
                  {characterCount}/{maxLength}
                </span>
              </div>

              {/* Post Type Specific Content */}
              {postType === 'poll' && (
                <div className="space-y-3 p-3 bg-gray-800 rounded-lg">
                  <input
                    type="text"
                    value={poll.question}
                    onChange={(e: any) => setPoll(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Ask a question..."
                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                  />
                  
                  <div className="space-y-2">
                    {poll.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                        <input
                          type="text"
                          value={option}
                          onChange={(e: any) => updatePollOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none"
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
                      className="border-gray-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                    
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <input
                        type="checkbox"
                        checked={poll.allowMultiple}
                        onChange={(e: any) => setPoll(prev => ({ ...prev, allowMultiple: e.target.checked }))}
                        className="rounded"
                      />
                      <span>Allow multiple choices</span>
                    </label>
                  </div>
                </div>
              )}

              {postType === 'event' && (
                <div className="space-y-3 p-3 bg-gray-800 rounded-lg">
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e: any) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Event title"
                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none font-medium"
                  />
                  
                  <textarea
                    value={event.description}
                    onChange={(e: any) => setEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Event description"
                    rows={2}
                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400">Start Time</label>
                      <input
                        type="datetime-local"
                        value={event.startTime}
                        onChange={(e: any) => setEvent(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full mt-1 bg-transparent text-white border border-gray-700 rounded px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">End Time (Optional)</label>
                      <input
                        type="datetime-local"
                        value={event.endTime}
                        onChange={(e: any) => setEvent(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full mt-1 bg-transparent text-white border border-gray-700 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-red-200 text-sm">{error}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Post Type Selector */}
                <div className="flex items-center space-x-1">
                  {allowedTypes.map((type: string) => (
                    <Button
                      key={type}
                      variant="secondary"
                      size="sm"
                      onClick={() => setPostType(type)}
                      className={`border-gray-600 text-white ${postType === type ? 'hive-interactive' : ''}`}
                      style={postType === type ? {
                        backgroundColor: 'var(--hive-brand-primary)',
                        color: 'var(--hive-text-inverse)'
                      } : {}}
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
                  <Button variant="secondary" size="sm" className="border-gray-600 text-white">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                )}

                {/* Additional Tools */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`border-gray-600 text-white ${showAdvanced ? 'hive-interactive' : ''}`}
                  style={showAdvanced ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Post Button */}
              <Button
                onClick={handlePost}
                disabled={isPosting || isOverLimit || (!content.trim() && attachments.length === 0)}
                className="hive-interactive"
                style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              >
                <Send className="h-4 w-4 mr-2" />
                {isPosting ? 'Posting...' : 'Post'}
              </Button>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="pt-3 border-t border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Visibility</span>
                  <div className="flex items-center space-x-2">
                    {['public', 'space', 'private'].map(vis => (
                      <Button
                        key={vis}
                        variant="secondary"
                        size="sm"
                        onClick={() => setVisibility(vis)}
                        className={`border-gray-600 text-white ${visibility === vis ? 'hive-interactive' : ''}`}
                        style={visibility === vis ? {
                          backgroundColor: 'var(--hive-brand-primary)',
                          color: 'var(--hive-text-inverse)'
                        } : {}}
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
        </CardContent>
      </Card>
    </div>
  );
};

const meta = {
  title: '07-Social-Feed-Components/Post Composer',
  component: PostComposer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  id: 'user_1',
  name: 'Sarah Chen',
  handle: '@sarahc',
  avatarUrl: undefined
};

export const Default: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating post:', post);
      return Promise.resolve();
    },
    placeholder: "What's happening on campus?",
    maxLength: 500,
    allowedTypes: ['text', 'image', 'link', 'poll', 'event']
  }
};

export const WithSpaceContext: Story = {
  args: {
    user: mockUser,
    spaceId: 'cs101_study',
    onPost: (post: any) => {
      console.log('Creating post in space:', post);
      return Promise.resolve();
    },
    placeholder: "Share with your study group...",
    maxLength: 500,
    allowedTypes: ['text', 'image', 'link', 'poll', 'event']
  }
};

export const PollComposer: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating poll:', post);
      return Promise.resolve();
    },
    placeholder: "Ask your community a question...",
    maxLength: 300,
    allowedTypes: ['poll']
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const pollButton = canvas.querySelector('button[title="Create poll post"]');
    if (pollButton) {
      (pollButton as HTMLElement).click();
    }
  }
};

export const EventComposer: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating event:', post);
      return Promise.resolve();
    },
    placeholder: "Create an event for your community...",
    maxLength: 500,
    allowedTypes: ['event']
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const eventButton = canvas.querySelector('button[title="Create event post"]');
    if (eventButton) {
      (eventButton as HTMLElement).click();
    }
  }
};

export const LimitedComposer: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating limited post:', post);
      return Promise.resolve();
    },
    placeholder: "Quick update...",
    maxLength: 140,
    allowedTypes: ['text']
  }
};

export const WithCancelButton: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating post:', post);
      return Promise.resolve();
    },
    onCancel: () => {
      console.log('Cancelled post creation');
    },
    placeholder: "What's on your mind?",
    maxLength: 500,
    allowedTypes: ['text', 'image', 'link', 'poll', 'event']
  }
};

export const AllPostTypes: Story = {
  args: {
    user: mockUser,
    onPost: (post: any) => {
      console.log('Creating post:', post);
      return Promise.resolve();
    },
    placeholder: "Create any type of content...",
    maxLength: 500,
    allowedTypes: ['text', 'image', 'link', 'poll', 'event', 'tool']
  }
};