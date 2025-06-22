"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FeedItem {
  id: string;
  type:
    | "post"
    | "ritual"
    | "space-unlock"
    | "tool-reveal"
    | "campus-event"
    | "builder-challenge";
  timestamp: Date;
  priority: "high" | "medium" | "low";
  data: Record<string, unknown>; // Specific data for each type
}

export interface MainFeedProps {
  items: FeedItem[];
  onItemClick?: (item: FeedItem) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MainFeed = React.forwardRef<HTMLDivElement, MainFeedProps>(
  (
    { items, onItemClick, onLoadMore, isLoading, hasMore, className, children },
    ref
  ) => {
    const [isNearBottom, setIsNearBottom] = React.useState(false);

    const handleScroll = React.useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isNear = scrollHeight - scrollTop - clientHeight < 200;

        if (isNear && !isNearBottom && hasMore && !isLoading) {
          setIsNearBottom(true);
          onLoadMore?.();
        } else if (!isNear && isNearBottom) {
          setIsNearBottom(false);
        }
      },
      [isNearBottom, hasMore, isLoading, onLoadMore]
    );

    const renderFeedItem = (item: FeedItem) => {
      const baseStyles = "mb-6 last:mb-0 transition-all duration-200";

      switch (item.type) {
        case "post":
          return (
            <div
              key={item.id}
              className={cn(baseStyles, "cursor-pointer hover:scale-[1.01]")}
            >
              <PostFeedItem item={item} onClick={() => onItemClick?.(item)} />
            </div>
          );

        case "ritual":
          return (
            <div key={item.id} className={cn(baseStyles, "cursor-pointer")}>
              <RitualFeedItem item={item} onClick={() => onItemClick?.(item)} />
            </div>
          );

        case "space-unlock":
          return (
            <div key={item.id} className={cn(baseStyles, "cursor-pointer")}>
              <SpaceUnlockFeedItem
                item={item}
                onClick={() => onItemClick?.(item)}
              />
            </div>
          );

        case "tool-reveal":
          return (
            <div key={item.id} className={cn(baseStyles, "cursor-pointer")}>
              <ToolRevealFeedItem
                item={item}
                onClick={() => onItemClick?.(item)}
              />
            </div>
          );

        case "campus-event":
          return (
            <div key={item.id} className={cn(baseStyles, "cursor-pointer")}>
              <CampusEventFeedItem
                item={item}
                onClick={() => onItemClick?.(item)}
              />
            </div>
          );

        case "builder-challenge":
          return (
            <div key={item.id} className={cn(baseStyles, "cursor-pointer")}>
              <BuilderChallengeFeedItem
                item={item}
                onClick={() => onItemClick?.(item)}
              />
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          "px-4 py-6",
          className
        )}
        onScroll={handleScroll}
      >
        {children}

        <div className="space-y-6">{items.map(renderFeedItem)}</div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full" />
          </div>
        )}

        {/* End of feed indicator */}
        {!hasMore && items.length > 0 && (
          <div className="text-center py-8 text-text-secondary text-sm">
            You&apos;re all caught up! 🎉
          </div>
        )}
      </div>
    );
  }
);

MainFeed.displayName = "MainFeed";

// Feed item components
const PostFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-surface-01 border border-border-line rounded-lg p-4 hover:bg-surface-02 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 bg-surface-03 rounded-full" />
      <div>
        <p className="font-medium text-text-primary text-sm font-display">
          {item.data.author?.name || "Anonymous"}
        </p>
        <p className="text-text-secondary text-xs">
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
    <p className="text-text-primary mb-3">{item.data.content}</p>
    {item.data.reactions && (
      <div className="flex gap-2">
        {Object.entries(item.data.reactions).map(([emoji, count]) => (
          <span
            key={emoji}
            className="text-xs bg-surface-02 px-2 py-1 rounded-full"
          >
            {emoji} {count}
          </span>
        ))}
      </div>
    )}
  </div>
);

const RitualFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
      <span className="text-yellow-500 text-sm font-medium font-display">
        RITUAL ACTIVE
      </span>
    </div>
    <h3 className="font-bold text-text-primary mb-2 font-display">
      {item.data.title}
    </h3>
    <p className="text-text-secondary text-sm mb-3">{item.data.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-xs">
        {item.data.participants}/{item.data.maxParticipants} participating
      </span>
      <span className="text-yellow-500 text-sm font-medium">Join Ritual →</span>
    </div>
  </div>
);

const SpaceUnlockFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-surface-01 border border-border-line rounded-lg p-4 relative overflow-hidden"
    onClick={onClick}
  >
    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8 translate-x-8" />
    <h3 className="font-bold text-text-primary mb-2 font-display">
      {item.data.spaceName} is opening!
    </h3>
    <p className="text-text-secondary text-sm mb-3">{item.data.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-xs">
        {item.data.requirements} requirement met
      </span>
      <span className="text-yellow-500 text-sm font-medium">
        Explore Space →
      </span>
    </div>
  </div>
);

const ToolRevealFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-surface-01 border border-border-line rounded-lg p-4"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
        NEW TOOL
      </span>
    </div>
    <h3 className="font-bold text-text-primary mb-2 font-display">
      {item.data.toolName}
    </h3>
    <p className="text-text-secondary text-sm mb-3">
      Built by {item.data.builderName}
    </p>
    <p className="text-text-primary text-sm mb-3">{item.data.description}</p>
    <span className="text-yellow-500 text-sm font-medium">Try Tool →</span>
  </div>
);

const CampusEventFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-surface-01 border border-border-line rounded-lg p-4"
    onClick={onClick}
  >
    <h3 className="font-bold text-text-primary mb-2 font-display">
      {item.data.eventName}
    </h3>
    <p className="text-text-secondary text-sm mb-3">{item.data.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-xs">
        {item.data.date} • {item.data.location}
      </span>
      <span className="text-yellow-500 text-sm font-medium">Learn More →</span>
    </div>
  </div>
);

const BuilderChallengeFeedItem = ({
  item,
  onClick,
}: {
  item: FeedItem;
  onClick: () => void;
}) => (
  <div
    className="bg-gradient-to-r from-surface-01 to-surface-02 border border-yellow-500/50 rounded-lg p-4"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
        BUILDER CHALLENGE
      </span>
    </div>
    <h3 className="font-bold text-text-primary mb-2 font-display">
      {item.data.challengeName}
    </h3>
    <p className="text-text-secondary text-sm mb-3">{item.data.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-xs">
        Reward: {item.data.reward}
      </span>
      <span className="text-yellow-500 text-sm font-medium">
        Accept Challenge →
      </span>
    </div>
  </div>
);
