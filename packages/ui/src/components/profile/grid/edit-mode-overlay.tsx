"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import { X, Undo2 } from "lucide-react";
import type { TileLayout } from "./types";

interface EditModeOverlayProps {
  layout: TileLayout[];
  onComplete?: () => void;
  onUndo?: () => void;
}

export const EditModeOverlay: React.FC<EditModeOverlayProps> = ({
  // layout, // Commented out as it's not used yet
  onComplete,
  onUndo,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {onUndo && (
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          className="bg-[#1A1A1A] border-[#374151] text-[#6B7280] hover:text-white hover:bg-[#374151]"
        >
          <Undo2 className="h-4 w-4 mr-2" />
          Undo
        </Button>
      )}

      <Button
        variant="default"
        size="sm"
        onClick={onComplete}
        className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
      >
        <X className="h-4 w-4 mr-2" />
        Done Editing
      </Button>
    </div>
  );
};
