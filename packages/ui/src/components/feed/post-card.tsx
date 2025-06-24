"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MoreHorizontal, MessageCircle, Heart } from "lucide-react";

export interface PostCardProps {
  author: {
    name: string;
    avatarUrl?: string;
    handle: string;
  };
  timestamp: string;
  content: string;
  stats: {
    likes: number;
    comments: number;
  };
  className?: string;
}

export const PostCard = ({
  author,
  timestamp,
  content,
  stats,
  className,
}: PostCardProps) => {
  return (
    <div
      className={`bg-surface-02 border border-border rounded-lg p-5 flex space-x-4 ${className}`}
    >
      <Avatar>
        <AvatarImage src={author.avatarUrl} alt={`${author.name}'s avatar`} />
        <AvatarFallback>
          {author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-semibold text-foreground">{author.name}</span>
            <span className="text-sm text-muted">@{author.handle}</span>
            <span className="text-sm text-muted">·</span>
            <span className="text-sm text-muted">{timestamp}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4 text-muted" />
          </Button>
        </div>

        <p className="text-foreground/90 mt-2">{content}</p>

        <div className="flex items-center space-x-6 mt-4 -ml-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted"
          >
            <Heart className="h-4 w-4" />
            <span>{stats.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{stats.comments}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
