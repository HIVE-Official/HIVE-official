'use client';

/**
 * SpaceComposer - Minimal in-space composer with reduced chrome
 * No avatar, consolidated attachment button
 * Based on YC/SF minimalism: focus on the content, not the chrome
 */

import React, { useState } from 'react';
import { Plus, Image, Calendar, Wrench } from 'lucide-react';
import { Button } from '../../00-Global/atoms/button';
import { Textarea } from '../../00-Global/atoms/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../molecules/dropdown-menu';
import { MotionDiv } from '../motion-safe';

export interface SpaceComposerProps {
  /** Space name for context */
  spaceName: string;
  /** Whether user can create events */
  canCreateEvents?: boolean;
  /** Whether user can use tools */
  canUseTools?: boolean;
  /** Submit post handler */
  onSubmit?: (content: string, attachments: { type: 'image' | 'event' | 'tool'; data: unknown }[]) => void;
  /** Placeholder text */
  placeholder?: string;
}

const HIVE_EASING = {
  reveal: [0.23, 1, 0.32, 1] as const,
  interactive: [0.25, 0.46, 0.45, 0.94] as const,
};

export function SpaceComposer({
  spaceName,
  canCreateEvents = false,
  canUseTools = false,
  onSubmit,
  placeholder = "What's happening?",
}: SpaceComposerProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Array<{ type: 'image' | 'event' | 'tool'; data: unknown }>>([]);

  const handleSubmit = () => {
    if (!content.trim() && attachments.length === 0) return;
    onSubmit?.(content, attachments);
    setContent('');
    setAttachments([]);
  };

  const handleAddAttachment = (type: 'image' | 'event' | 'tool') => {
    // Placeholder - would open respective modals
    console.log(`Add ${type}`);
  };

  const canPost = content.trim().length > 0 || attachments.length > 0;

  return (
    <MotionDiv
      className="bg-black/20 border border-white/8 rounded-xl p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: HIVE_EASING.reveal }}
    >
      {/* Textarea - NO avatar, clean input */}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-[80px] bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 resize-none"
      />

      {/* Attachments preview (if any) */}
      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {attachments.map((att, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70"
            >
              {att.type === 'image' && '📷 Image'}
              {att.type === 'event' && '📅 Event'}
              {att.type === 'tool' && '🔧 Tool'}
            </div>
          ))}
        </div>
      )}

      {/* Actions row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
        {/* Left: [+ Add] dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/5 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-black/95 border-white/10">
            <DropdownMenuItem
              onClick={() => handleAddAttachment('image')}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              <Image className="w-4 h-4 mr-2" />
              Photo
            </DropdownMenuItem>

            {canCreateEvents && (
              <DropdownMenuItem
                onClick={() => handleAddAttachment('event')}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Event
              </DropdownMenuItem>
            )}

            {canUseTools && (
              <DropdownMenuItem
                onClick={() => handleAddAttachment('tool')}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Tool
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right: Post button */}
        <Button
          variant="brand"
          size="sm"
          onClick={handleSubmit}
          disabled={!canPost}
          className="min-w-[80px]"
        >
          Post
        </Button>
      </div>
    </MotionDiv>
  );
}
