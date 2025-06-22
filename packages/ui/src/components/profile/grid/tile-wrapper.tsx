"use client";

import * as React from "react";
import type { TileLayout } from "./types";

interface TileWrapperProps {
  tile: TileLayout;
  children: React.ReactNode;
  isEditing: boolean;
  onDrag?: (tileId: string, x: number, y: number) => void;
  onResize?: (tileId: string, width: number, height: number) => void;
  onHide?: (tileId: string) => void;
}

export const TileWrapper: React.FC<TileWrapperProps> = ({
  tile,
  children,
  isEditing,
  // onDrag, // Commented out as drag functionality not implemented yet
  // onResize, // Commented out as resize functionality not implemented yet
  // onHide // Commented out as hide functionality not implemented yet
}) => {
  const gridColumn = `${tile.x + 1} / span ${tile.width}`;
  const gridRow = `${tile.y + 1} / span ${tile.height}`;

  return (
    <div
      className={`
        relative overflow-hidden w-full h-full
        ${isEditing ? "ring-2 ring-[#FFD700]/20 ring-offset-2 ring-offset-background" : ""}
        transition-all duration-200
      `}
      style={{
        gridColumn,
        gridRow,
      }}
    >
      {/* Edit Mode Indicators */}
      {isEditing && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Drag Handle */}
          <div className="absolute top-2 left-2 w-6 h-6 bg-[#FFD700] rounded-sm flex items-center justify-center opacity-75">
            <div className="w-3 h-3 bg-black/50 rounded-xs grid grid-cols-2 gap-px">
              <div className="bg-white/80 rounded-px"></div>
              <div className="bg-white/80 rounded-px"></div>
              <div className="bg-white/80 rounded-px"></div>
              <div className="bg-white/80 rounded-px"></div>
            </div>
          </div>

          {/* Resize Handles (corners only for simplicity) */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#FFD700] cursor-nw-resize"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#FFD700] cursor-nw-resize"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FFD700] cursor-nw-resize"></div>
        </div>
      )}

      {/* Tile Content */}
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
