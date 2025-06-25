"use client";

import { useState } from "react";
import { Button } from "@hive/ui";
import { Card, CardContent } from "@hive/ui";
import { Textarea } from "@hive/ui";
import { Loader2, Send } from "lucide-react";
import { logger } from "@hive/core";

interface Post {
  id: string;
  content: string;
  type: string;
  createdAt: string;
  author: {
    id: string;
    handle: string;
    fullName: string;
  };
}

interface CreatePostProps {
  spaceId: string;
  onPostCreated: (_post: Post) => void;
}

export function CreatePost({ spaceId, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/spaces/${spaceId}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          type: "text",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = (await response.json()) as Post;
      onPostCreated(newPost);
      setContent("");
    } catch (error) {
      logger.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in this space?"
            className="min-h-[100px] bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
