"use client";

import * as React from "react";
import { Heart, Share2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AdaptiveCard,
  CardHeader,
  CardContent,
  CardFooter,
} from "./adaptive-card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "./badge-system";
import { Button } from "../ui/button";

export interface UGCPostData {
  id: string;
  author: {
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    isVerified?: boolean;
    badges?: string[];
  };
  space?: {
    id: string;
    name: string;
    color?: string;
  };
  content: {
    text: string;
    media?: {
      type: "image" | "video" | "link";
      url: string;
      thumbnail?: string;
      alt?: string;
      metadata?: {
        title?: string;
        description?: string;
        domain?: string;
      };
    }[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks?: number;
  };
  userInteractions: {
    hasLiked: boolean;
    hasBookmarked: boolean;
    hasShared: boolean;
  };
  timestamp: string; // ISO date string
  editedTimestamp?: string;
  postType: "text" | "media" | "link" | "poll" | "event" | "announcement";
  isPinned?: boolean;
  isHighlighted?: boolean;
  tags?: string[];
  mentions?: {
    id: string;
    name: string;
    handle: string;
  }[];
}

export interface UGCPostCardProps {
  post: UGCPostData;
  variant?: "compact" | "detailed" | "featured";
  showEngagement?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onProfile?: (userId: string) => void;
  onSpace?: (spaceId: string) => void;
  className?: string;
}

const UGCPostCard = React.forwardRef<HTMLDivElement, UGCPostCardProps>(
  ({ post, onLike, onComment, onShare, className }, ref) => {
    const { author, content, engagement, timestamp, userInteractions } = post;

    const timeAgo = new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const mediaItem =
      content.media && content.media.length > 0 ? content.media[0] : null;

    return (
      <AdaptiveCard
        ref={ref}
        variant="glass"
        size="default"
        interactive="hover"
        className={cn("w-full max-w-lg", className)}
      >
        <CardHeader>
          <PostHeader author={author} timeAgo={timeAgo} />
        </CardHeader>
        <CardContent>
          <p className="text-white/90 whitespace-pre-wrap">{content.text}</p>
          {mediaItem && <PostMedia media={mediaItem} />}
        </CardContent>
        {engagement && userInteractions && (
          <CardFooter>
            <EngagementBar
              engagement={engagement}
              userInteractions={userInteractions}
              onLike={() => onLike?.(post.id)}
              onComment={() => onComment?.(post.id)}
              onShare={() => onShare?.(post.id)}
            />
          </CardFooter>
        )}
      </AdaptiveCard>
    );
  }
);
UGCPostCard.displayName = "UGCPostCard";

const PostHeader = ({
  author,
  timeAgo,
}: {
  author: UGCPostData["author"];
  timeAgo: string;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-white">{author.name}</h4>
          {author.isVerified && <Badge variant="verified" size="xs" />}
        </div>
        <p className="text-xs text-white/60">
          @{author.handle} · {timeAgo}
        </p>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="text-white/60">
      <MoreHorizontal className="h-5 w-5" />
    </Button>
  </div>
);

const PostMedia = ({
  media,
}: {
  media: UGCPostData["content"]["media"][0];
}) => (
  <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
    <img
      src={media.url}
      alt={media.alt || "Post media"}
      className="h-full w-full object-cover"
    />
  </div>
);

const EngagementBar = ({
  engagement,
  userInteractions,
  onLike,
  onComment,
  onShare,
}: {
  engagement: UGCPostData["engagement"];
  userInteractions: UGCPostData["userInteractions"];
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}) => (
  <div className="flex w-full items-center justify-between text-white/60">
    <EngagementButton
      icon={Heart}
      count={engagement.likes}
      isActive={userInteractions.hasLiked}
      onClick={onLike}
      activeClass="text-red-500"
    />
    <EngagementButton
      icon={MessageSquare}
      count={engagement.comments}
      onClick={onComment}
    />
    <EngagementButton
      icon={Share2}
      count={engagement.shares}
      onClick={onShare}
    />
  </div>
);

const EngagementButton = ({
  icon: Icon,
  count,
  isActive,
  onClick,
  activeClass,
}: {
  icon: React.ElementType;
  count: number;
  isActive?: boolean;
  onClick: () => void;
  activeClass?: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
  >
    <Icon className={cn("h-5 w-5", isActive && activeClass)} />
    <span className="text-sm">{count}</span>
  </button>
);

export { UGCPostCard };
