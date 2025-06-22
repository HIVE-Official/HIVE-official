"use client";

import * as React from "react";
import { TileWrapper } from "./tile-wrapper";
import { EditModeOverlay } from "./edit-mode-overlay";
import type { TileLayout, TileData } from "./types";

// Import tile components directly
import { IdentityHero } from "../tiles/identity-hero";
import { AcademicCard } from "../tiles/academic-card";
import { ResidentialCard } from "../tiles/residential-card";
import { SpacesGrid } from "../tiles/spaces-grid";
import { ActivityTimeline } from "../tiles/activity-timeline";

interface GridContainerProps {
  tiles: TileLayout[];
  tileData: Record<string, TileData>;
  isEditing: boolean;
  onTileMove?: (tileId: string, x: number, y: number) => void;
  onTileResize?: (tileId: string, width: number, height: number) => void;
  onTileVisibilityChange?: (tileId: string) => void;
  onEditComplete?: () => void;
  onUndo?: () => void;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  tiles,
  tileData,
  isEditing,
  onTileMove,
  onTileResize,
  onTileVisibilityChange,
  onEditComplete,
  onUndo,
}) => {
  // Calculate grid height based on tiles
  const maxY = Math.max(...tiles.map((tile) => tile.y + tile.height), 6);
  const gridRows = Math.max(maxY, 6);

  // Render tile component based on ID
  const renderTileContent = (tileId: string, data: TileData) => {
    const layout = tiles.find((t) => t.id === tileId);
    if (!layout) return null;

    const commonProps = {
      user: data.user,
      layout,
      isEditing,
    };

    switch (tileId) {
      case "identity.hero":
        return <IdentityHero {...commonProps} />;
      case "academic.card":
        return <AcademicCard {...commonProps} />;
      case "residential.card":
        return <ResidentialCard {...commonProps} />;
      case "spaces.grid":
        return <SpacesGrid {...commonProps} />;
      case "activity.timeline":
        return <ActivityTimeline {...commonProps} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Unknown tile: {tileId}
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Edit Mode Overlay */}
      {isEditing && (
        <EditModeOverlay
          layout={tiles}
          onComplete={onEditComplete}
          onUndo={onUndo}
        />
      )}

      {/* CSS Grid Container */}
      <div
        className={`
          grid gap-4
          grid-cols-12
          auto-rows-[120px]
          min-h-[600px]
          relative
          w-full
        `}
        style={{
          gridTemplateRows: `repeat(${gridRows}, 120px)`,
        }}
      >
        {tiles
          .filter((tile) => tile.isVisible)
          .map((tile) => {
            const data = tileData[tile.id];
            if (!data) return null;

            return (
              <TileWrapper
                key={tile.id}
                tile={tile}
                isEditing={isEditing}
                onDrag={onTileMove}
                onResize={onTileResize}
                onHide={onTileVisibilityChange}
              >
                {renderTileContent(tile.id, data)}
              </TileWrapper>
            );
          })}
      </div>
    </div>
  );
};
