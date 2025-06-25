"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { logger } from "@hive/core";

export interface PostComposerProps {
  placeholder?: string;
  maxLength?: number;
  onSubmit?: (content: string, reactions: string[]) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const EMOJI_REACTIONS = [
  "🔥",
  "💯",
  "🎉",
  "👏",
  "❤️",
  "😂",
  "🤔",
  "👀",
  "🚀",
  "⚡",
  "🌟",
  "💡",
];

export const PostComposer = React.forwardRef<
  HTMLTextAreaElement,
  PostComposerProps
>(
  (
    {
      placeholder = "Share what's happening on campus...",
      maxLength = 280,
      onSubmit,
      onCancel,
      isSubmitting = false,
      className,
      autoFocus = false,
    },
    ref
  ) => {
    const [content, setContent] = React.useState("");
    const [selectedReactions, setSelectedReactions] = React.useState<string[]>(
      []
    );
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current!, []);

    const remainingChars = maxLength - content.length;
    const isOverLimit = remainingChars < 0;
    const canSubmit =
      content.trim().length > 0 && !isOverLimit && !isSubmitting;

    const handleSubmit = useCallback(async () => {
      if (canSubmit) {
        await onSubmit?.(content.trim(), selectedReactions);
        setContent("");
        setSelectedReactions([]);
        setShowEmojiPicker(false);
        logger.debug("Post submitted", {
          content,
          reactions: selectedReactions,
        });
      }
    }, [content, selectedReactions, onSubmit]);

    const handleCancel = () => {
      setContent("");
      setSelectedReactions([]);
      setShowEmojiPicker(false);
      onCancel?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    };

    const toggleReaction = (emoji: string) => {
      setSelectedReactions((prev) =>
        prev.includes(emoji)
          ? prev.filter((e) => e !== emoji)
          : [...prev, emoji]
      );
    };

    // Auto-resize textarea
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      }
    }, [content]);

    return (
      <div
        className={cn(
          "bg-surface-01 border border-border-line rounded-lg p-4",
          "transition-all duration-200",
          "focus-within:border-yellow-500/50 focus-within:shadow-focus",
          className
        )}
      >
        {/* Main composer */}
        <div className="space-y-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              "w-full min-h-[80px] max-h-[120px] resize-none",
              "bg-transparent text-text-primary placeholder-text-secondary",
              "border-none outline-none",
              "text-base leading-relaxed"
            )}
            disabled={isSubmitting}
          />

          {/* Emoji reactions */}
          {selectedReactions.length > 0 && (
            <div className="flex flex-wrap gap-2 py-2 border-t border-border-line">
              <span className="text-text-secondary text-sm">Reactions:</span>
              {selectedReactions.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => toggleReaction(emoji)}
                  className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm hover:bg-yellow-500/30 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="grid grid-cols-6 gap-2 p-3 bg-surface-02 rounded-lg border border-border-line">
              {EMOJI_REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(emoji)}
                  className={cn(
                    "p-2 rounded-lg text-lg hover:bg-surface-03 transition-colors",
                    selectedReactions.includes(emoji) && "bg-yellow-500/20"
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-border-line">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  "hover:bg-surface-02 text-text-secondary hover:text-text-primary",
                  showEmojiPicker && "bg-yellow-500/20 text-yellow-500"
                )}
                disabled={isSubmitting}
              >
                😊
              </button>

              <div className="text-xs text-text-secondary">
                {remainingChars >= 0 ? (
                  <span
                    className={remainingChars < 20 ? "text-yellow-500" : ""}
                  >
                    {remainingChars} chars left
                  </span>
                ) : (
                  <span className="text-red-500">
                    {Math.abs(remainingChars)} chars over
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(content.length > 0 || selectedReactions.length > 0) && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 font-display",
                  canSubmit
                    ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-elevation-1"
                    : "bg-surface-03 text-text-disabled cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Posting...
                  </div>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Character limit indicator */}
        {content.length > maxLength * 0.8 && (
          <div className="mt-2">
            <div className="w-full bg-surface-03 rounded-full h-1">
              <div
                className={cn(
                  "h-1 rounded-full transition-all duration-200",
                  isOverLimit ? "bg-red-500" : "bg-yellow-500"
                )}
                style={{
                  width: `${Math.min((content.length / maxLength) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

PostComposer.displayName = "PostComposer";

// Utility function for sample usage
export const createSamplePostComposer = () => ({
  placeholder: "What's happening at your campus?",
  maxLength: 280,
  onSubmit: (content: string, reactions: string[]) => {
    logger.debug("Post submitted:", { content, reactions });
  },
});
