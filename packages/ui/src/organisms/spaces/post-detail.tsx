// Bounded Context Owner: Spaces Domain Guild
/**
 * PostDetail — Detail surface for a post.
 * - mode="sheet" renders as a Radix Dialog sheet overlay
 * - mode="route" renders inline (for full route demos)
 */
import * as React from "react";
import type { Post } from "./types";
import { Dialog, DialogContent, DialogOverlay } from "@/molecules/dialog";
import { BoardCardStandard } from "./board-card-standard";
import { BoardCardAnnouncement } from "./board-card-announcement";
import { BoardCardEvent } from "./board-card-event";
import { BoardCardPoll } from "./board-card-poll";

export interface PostDetailProps {
  post: Post;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "sheet" | "route";
}

const renderCard = (post: Post) => {
  switch (post.type) {
    case "standard":
      return <BoardCardStandard post={post} showOverflow={false} />;
    case "announcement":
      return <BoardCardAnnouncement post={post} showOverflow={false} />;
    case "event":
      return <BoardCardEvent post={post} showOverflow={false} />;
    case "poll":
      return <BoardCardPoll post={post} showOverflow={false} />;
    default:
      return <BoardCardStandard post={post as any} showOverflow={false} />;
  }
};

export const PostDetail: React.FC<PostDetailProps> = ({ post, open = false, onOpenChange, mode = "sheet" }) => {
  if (mode === "route") {
    return <div className="max-w-2xl mx-auto">{renderCard(post)}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="p-0 w-[min(96vw,560px)]">
        {renderCard(post)}
      </DialogContent>
    </Dialog>
  );
};
