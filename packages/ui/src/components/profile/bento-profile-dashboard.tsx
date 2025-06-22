"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Settings, Undo2 } from "lucide-react";
import { GridContainer } from "./grid/grid-container";
import { useGridState } from "./grid/grid-state-manager";
import type { TileData, TileLayout } from "./grid/types";

interface BentoProfileDashboardProps {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    avatar?: string;
    isBuilder: boolean;
    major?: string;
    graduationYear?: number;
    dormName?: string;
    isOnCampus?: boolean;
  };
}

export const BentoProfileDashboard: React.FC<BentoProfileDashboardProps> = ({
  user,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [layout, actions] = useGridState(user);

  // Mock tile data - in real app this would come from props/hooks
  const tileData: Record<string, TileData> = React.useMemo(
    () => ({
      "identity.hero": { user },
      "academic.card": { user },
      "residential.card": { user },
      "spaces.grid": { user },
      "activity.timeline": { user },
    }),
    [user]
  );

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save when exiting edit mode
      actions.saveLayout();
    }
  };

  const handleTileMove = React.useCallback(
    (tileId: string, x: number, y: number) => {
      actions.updateTileLayout(tileId, { x, y });
    },
    [actions]
  );

  const handleTileResize = React.useCallback(
    (tileId: string, width: number, height: number) => {
      actions.updateTileLayout(tileId, { width, height });
    },
    [actions]
  );

  const handleTileVisibilityChange = React.useCallback(
    (tileId: string) => {
      actions.toggleTileVisibility(tileId);
    },
    [actions]
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Profile Dashboard
          </h1>
          <p className="text-muted-foreground">
            Customize your profile layout and content
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing && actions.canUndo && (
            <Button variant="outline" size="sm" onClick={actions.undo}>
              <Undo2 className="h-4 w-4 mr-2" />
              Undo
            </Button>
          )}

          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={handleToggleEdit}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? "Done" : "Customize"}
          </Button>
        </div>
      </div>

      {/* Edit Mode Instructions */}
      {isEditing && (
        <div className="mb-6 p-4 rounded-lg bg-muted/20 border border-[#FFD700]/20">
          <h3 className="text-sm font-medium text-[#FFD700] mb-2">
            Edit Mode Active
          </h3>
          <p className="text-xs text-muted-foreground">
            Drag tiles to rearrange, resize by dragging corners, or hide tiles
            you don't need. Changes are saved automatically.
          </p>
        </div>
      )}

      {/* Bento Grid */}
      <div className="mb-8">
        <GridContainer
          tiles={layout}
          tileData={tileData}
          isEditing={isEditing}
          onTileMove={handleTileMove}
          onTileResize={handleTileResize}
          onTileVisibilityChange={handleTileVisibilityChange}
          onEditComplete={handleToggleEdit}
          onUndo={actions.canUndo ? actions.undo : undefined}
        />
      </div>

      {/* Debug Info (Dev Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
          <h3 className="text-sm font-medium text-foreground mb-2">
            Debug Info
          </h3>
          <pre className="text-xs text-muted-foreground overflow-auto">
            {JSON.stringify({ layout, isEditing }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
