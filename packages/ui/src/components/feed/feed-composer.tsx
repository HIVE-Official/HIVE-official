"use client";

import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface FeedComposerProps {
  className?: string;
  placeholder?: string;
  onPostCreated?: (content: string) => void;
}

export function FeedComposer({
  className,
  placeholder = "Share something with your community...",
  onPostCreated,
}: FeedComposerProps) {
  const [content, setContent] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPostCreated?.(content);
      setContent("");
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="min-h-[80px] resize-none"
      />

      {isExpanded && (
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">{/* Tool buttons can go here */}</div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setContent("");
                setIsExpanded(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!content.trim()}>
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
