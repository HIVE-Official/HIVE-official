"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * BoardCardPoll - Poll post with voting
 *
 * Displays:
 * - Poll question
 * - Voting options with visual results
 * - Vote counts and percentages
 * - Poll state (open/closed)
 * - Multiple selection support
 */

import React from "react";
import { BoardCard, type BoardCardProps } from "./board-card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Checkbox } from "../../atoms/checkbox";
import type { PollPost, InteractiveState } from "./types";
import { BarChart3, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../utils/cn";

export interface BoardCardPollProps
  extends Omit<BoardCardProps, "post" | "children"> {
  /** Poll post data */
  post: PollPost;

  /** Vote click handler */
  onVote?: (optionIds: string[]) => void;

  /** Loading state for voting */
  isLoading?: boolean;
}

const POLL_STATE_CONFIG: Record<
  InteractiveState,
  {
    label: string;
    badgeVariant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  open: { label: "Open", badgeVariant: "default" },
  closed: { label: "Closed", badgeVariant: "outline" },
};

export const BoardCardPoll = React.forwardRef<
  HTMLDivElement,
  BoardCardPollProps
>(({ post, onVote, isLoading = false, ...boardCardProps }, ref) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    post.userVotes || []
  );

  const stateConfig = POLL_STATE_CONFIG[post.state];
  const hasVoted = post.userVotes && post.userVotes.length > 0;
  const showResults =
    post.state === "closed" || (hasVoted && post.showResultsAfterVote);

  // Calculate total votes
  const totalVotes = post.options.reduce<number>((sum, option) => sum + option.voteCount, 0);

  // Handle option selection
  const handleOptionToggle = (optionId: string) => {
    if (post.state === "closed" || hasVoted) return;

    if (post.allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  // Handle vote submission
  const handleVote = () => {
    if (selectedOptions.length > 0) {
      onVote?.(selectedOptions);
    }
  };

  return (
    <BoardCard ref={ref} post={post} {...boardCardProps}>
      {/* Poll header */}
      <div className="space-y-3">
        {/* State badge */}
        <div className="flex items-center justify-between">
          <Badge variant={stateConfig.badgeVariant} className="w-fit gap-2">
            <BarChart3 className="h-3 w-3" />
            {stateConfig.label}
          </Badge>

          {post.closeAt && post.state === "open" && (
            <span className="text-caption font-caption text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Closes {format(new Date(post.closeAt), "MMM d, h:mm a")}
            </span>
          )}
        </div>

        {/* Question */}
        <h2 className="text-h4 font-h4">{post.question}</h2>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-body-sm font-body-sm text-muted-foreground">
          <span>
            {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
          </span>
          {post.allowMultiple && <span>• Multiple choice</span>}
          {hasVoted && (
            <div className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>You voted</span>
            </div>
          )}
        </div>
      </div>

      {/* Poll options */}
      <div className="space-y-2">
        {post.options.map((option) => {
          const percentage =
            totalVotes > 0
              ? Math.round((option.voteCount / totalVotes) * 100)
              : 0;
          const isSelected = selectedOptions.includes(option.id);
          const userVoted = post.userVotes?.includes(option.id);

          return (
            <div
              key={option.id}
              onClick={() => handleOptionToggle(option.id)}
              className={cn(
                "relative rounded-lg border transition-all cursor-pointer",
                "hover:bg-muted/30",
                isSelected && "border-primary bg-primary/5",
                (hasVoted || post.state === "closed") && "cursor-default",
                userVoted && "border-primary/50"
              )}
            >
              {/* Background fill (if showing results) */}
              {showResults && (
                <div
                  className={cn(
                    "absolute inset-0 rounded-lg transition-all",
                    userVoted ? "bg-primary/10" : "bg-muted/20"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              )}

              {/* Option content */}
              <div className="relative flex items-center justify-between p-4 gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Checkbox/Radio */}
                  {!hasVoted && post.state === "open" && (
                    <div className="flex-shrink-0">
                      {post.allowMultiple ? (
                        <Checkbox checked={isSelected} />
                      ) : (
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => {}}
                          className="h-4 w-4 text-primary"
                        />
                      )}
                    </div>
                  )}

                  {/* Option text */}
                  <span
                    className={cn(
                      "text-body font-body flex-1",
                      userVoted && "font-semibold text-primary"
                    )}
                  >
                    {option.text}
                  </span>
                </div>

                {/* Vote count / percentage */}
                {showResults && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-body-sm font-body-sm font-semibold">
                      {percentage}%
                    </span>
                    <span className="text-caption font-caption text-muted-foreground">
                      ({option.voteCount})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vote button (if not voted and poll is open) */}
      {!hasVoted && post.state === "open" && (
        <Button
          onClick={handleVote}
          variant="default"
          size="default"
          disabled={isLoading || selectedOptions.length === 0}
          className="w-full brand-cta"
        >
          {isLoading
            ? "Submitting..."
            : `Vote${
                post.allowMultiple && selectedOptions.length > 1
                  ? ` (${selectedOptions.length})`
                  : ""
              }`}
        </Button>
      )}

      {/* Results hidden message */}
      {hasVoted && !post.showResultsAfterVote && post.state === "open" && (
        <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
          <p className="text-body-sm font-body-sm text-muted-foreground">
            Results will be visible when the poll closes.
          </p>
        </div>
      )}
    </BoardCard>
  );
});

BoardCardPoll.displayName = "BoardCardPoll";
