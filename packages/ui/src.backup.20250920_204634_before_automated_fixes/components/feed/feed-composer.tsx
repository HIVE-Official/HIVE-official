"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../atomic/atoms/button-enhanced";
import { Textarea } from "../../atomic/atoms/textarea-enhanced";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Image,
  BarChart3,
  Calendar,
  Wrench,
  Loader2,
  AlertCircle,
  SendIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { CreatePost } from "@hive/core";
import type { PostType } from "@hive/core";

interface FeedComposerProps {spaceId: string;
  currentUser: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;};
  onPostCreated: (post: CreatePost) => void;
  className?: string;
}

interface MentionSuggestion {id: string;
  handle: string;
  fullName: string;
  photoURL?: string;}

interface DraftData {content: string;
  postType: PostType;
  timestamp: number;}

interface ErrorWithMessage {error?: string;
  message?: string;}

interface ApiErrorResponse {error: string;}

interface ApiSuccessResponse {post: CreatePost;}

const POST_TYPE_CONFIG = {
  text: { icon: null, label: "Text", color: "default" },
  image: { icon: Image, label: "Image", color: "blue" },
  poll: { icon: BarChart3, label: "Poll", color: "green" },
  event: { icon: Calendar, label: "Event", color: "purple" },
  toolshare: { icon: Wrench, label: "Tool", color: "orange" },
} as const;

export const FeedComposer: React.FC<FeedComposerProps> = ({
  spaceId,
  currentUser,
  onPostCreated,
  className,
}) => {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("text");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionSuggestions, setMentionSuggestions] = useState<
    MentionSuggestion[]
  >([]);
  const [cursorPosition, setCursorPosition] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);

  const CHAR_LIMIT = 500;
  const remainingChars = CHAR_LIMIT - content.length;

  // Auto-save draft to localStorage;
  useEffect(() => {
    const draftKey = `hive-draft-${spaceId}`;
    if (content.trim()) {localStorage.setItem(
        draftKey,
        JSON.stringify({content,
          postType,
          timestamp: Date.now(),) })})
    } else {
      localStorage.removeItem(draftKey)
    }
  }, [content, postType, spaceId]);

  // Load draft on mount;
  useEffect(() => {
    const draftKey = `hive-draft-${spaceId}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft) as DraftData;
        // Only load if draft is less than 24 hours old;
        if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
          setContent(draft.content || "");
          setPostType(draft.postType || "text")
        }
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }, [spaceId]);

  // Handle @mention detection;
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = content.slice(0, cursorPos);
      const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

      if (mentionMatch) {
        setMentionQuery(mentionMatch[1]);
        setShowMentions(true);
        setCursorPosition(cursorPos);
        // In a real app, fetch mention suggestions here;
        // For now, we'll use mock data;
        setMentionSuggestions(
          [
            { id: "1", handle: "alice", fullName: "Alice Johnson" },
            { id: "2", handle: "bob", fullName: "Bob Smith" },
            { id: "3", handle: "charlie", fullName: "Charlie Brown" },
          ].filter(
            (user) =>
              user.handle.toLowerCase().includes(mentionQuery.toLowerCase()) ||
              user.fullName.toLowerCase().includes(mentionQuery.toLowerCase())
          )
        )
      } else {
        setShowMentions(false);
        setMentionQuery("")
      }
    };

    textarea.addEventListener("input", handleInput);
    textarea.addEventListener("selectionchange", handleInput);

    return () => {
      textarea.removeEventListener("input", handleInput);
      textarea.removeEventListener("selectionchange", handleInput)
    }}
  }, [content, mentionQuery]);

  const handleMentionSelect = (user: MentionSuggestion) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const beforeMention = content.slice(
      0,
      cursorPosition - mentionQuery.length - 1
    );
    const afterMention = content.slice(cursorPosition);
    const newContent = `${beforeMention}@${user.handle} ${afterMention}`;

    setContent(newContent);
    setShowMentions(false);
    setMentionQuery("");

    // Focus back to textarea;
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = beforeMention.length + user.handle.length + 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fire and forget the async operation with proper error handling;
    void submitPost().catch((error) => {
      console.error("Error submitting post:", error);
      const errorMessage =
        error instanceof Error;
          ? error.message;
          : (error as ErrorWithMessage)?.error || "Failed to submit post";
      setError(errorMessage)
    })
  };

  const submitPost = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const postData: CreatePost = {
        type: postType,
        content: content.trim(),
      };

      const response = await fetch(`/api/spaces/${spaceId}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ApiErrorResponse;
        throw new Error(errorData.error || "Failed to create post")
      }

      const responseData = (await response.json()) as ApiSuccessResponse;
      const { post } = responseData;

      // Clear form and draft;
      setContent("");
      setPostType("text");
      localStorage.removeItem(`hive-draft-${spaceId}`);

      // Notify parent;
      onPostCreated(post);
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e)
    }
}
    if (showMentions) {
      if (e.key === "Escape") {
        setShowMentions(false)
      }
      // Handle arrow keys and enter for mention selection;
      // Implementation would go here for full keyboard navigation;
    }
  };

  const canSubmit =
    content.trim().length > 0 && remainingChars >= 0 && !isSubmitting;

  return (
    <Card;
      className={cn(
        "sticky top-4 z-10 bg-background/95 backdrop-blur",
        className;
      )}
      ref={composerRef}
    >
      <CardHeader>
        <CardTitle>What's on your mind?</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage;
                src={currentUser.photoURL}
                alt={currentUser.fullName}
              />
              <AvatarFallback>
                {currentUser.fullName;
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              {/* Post Type Selector */}
              <div className="flex gap-2 flex-wrap">
                {Object.entries(POST_TYPE_CONFIG).map(([type, config]) => {
                  const Icon = config.icon as React.ComponentType<{
                    className?: string;
                  }>;
                  const isSelected = postType === type;

                  return (
                    <Button;
                      key={type}
                      variant={isSelected ? "primary" : "outline"}
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setPostType(type as PostType)
          }}
                      className="h-7 text-xs"
                    >
                      {Icon && <Icon className="h-3 w-3 mr-1" />}
                      {config.label}
                    </Button>
                  )
          })}
              </div>

              {/* Content Input */}
              <div className="relative">
                <Textarea;
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`What's happening in this space?`}
                  className="min-h-20 resize-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
                  maxLength={CHAR_LIMIT}
                />

                {/* Mention Suggestions */}
                {showMentions && mentionSuggestions.length > 0 && (
                  <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-48 overflow-y-auto">
                    <CardContent className="p-2">
                      {mentionSuggestions.map((user) => (
                        <button;
                          key={user.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleMentionSelect(user)
          }}
                          className="w-full flex items-center gap-2 p-2 rounded hover:bg-muted text-left"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage;
                              src={user.photoURL}
                              alt={user.fullName}
                            />
                            <AvatarFallback className="text-xs">
                              {user.fullName;
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {user.fullName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              @{user.handle}
                            </div>
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Character Count */}
              <div;
                className={cn(
                  "text-sm",
                  remainingChars < 50
                    ? "text-orange-500"
                    : "text-muted-foreground",
                  remainingChars < 0 ? "text-destructive" : ""
                )}
              >
                {remainingChars}
              </div>

              {/* Draft Indicator */}
              {content.trim() && (
                <Badge variant="outline" className="text-xs">
                  Draft saved;
                </Badge>
              )}
            </div>

            <Button;
              type="submit"
              disabled={!canSubmit}
              size="sm"
              className="min-w-20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="w-4 h-4 mr-2" />
                  Post;
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
};
