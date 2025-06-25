"use client";

import { useState } from "react";
import { logger } from "@hive/core";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { cn } from "../../utils";

interface PostComposerProps {
  onSubmit: (content: string) => Promise<void>;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

export function PostComposer({
  onSubmit,
  className,
  placeholder = "What's on your mind?",
  maxLength = 1000,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      logger.debug("Empty post submission prevented");
      return;
    }

    try {
      setIsSubmitting(true);
      logger.debug("Submitting post", { contentLength: content.length });
      await onSubmit(content);
      setContent("");
      logger.debug("Post submitted successfully");
    } catch (error) {
      logger.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (value: string) => {
    if (value.length <= maxLength) {
      setContent(value);
    } else {
      logger.debug("Max length exceeded", {
        attempted: value.length,
        max: maxLength,
      });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px]"
        disabled={isSubmitting}
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {content.length}/{maxLength}
        </span>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
