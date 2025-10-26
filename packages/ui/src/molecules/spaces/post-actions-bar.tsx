// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Button } from "@/index";
import { ReactionsBar, type Reaction } from "./reactions-bar";
import { ProofButton } from "./proof-button";

export interface PostActionsBarProps {
  reactions: Reaction[];
  onToggleReaction?: (key: string) => void;
  onOpenComments?: () => void;
  onShare?: () => void;
  onExportProof?: (profile: "leader" | "advisor") => void;
  canManage?: boolean;
}

export const PostActionsBar: React.FC<PostActionsBarProps> = ({
  reactions,
  onToggleReaction,
  onOpenComments,
  onShare,
  onExportProof,
  canManage,
}) => (
  <div className="flex items-center justify-between gap-3">
    <ReactionsBar reactions={reactions} onToggle={onToggleReaction} />
    <div className="flex items-center gap-2">
      <Button size="sm" variant="ghost" onClick={onOpenComments}>
        Comment
      </Button>
      <Button size="sm" variant="ghost" onClick={onShare}>
        Share
      </Button>
      <ProofButton onExport={onExportProof} />
      {canManage && (
        <Button size="sm" variant="outline" aria-label="Manage post">⋯</Button>
      )}
    </div>
  </div>
);

