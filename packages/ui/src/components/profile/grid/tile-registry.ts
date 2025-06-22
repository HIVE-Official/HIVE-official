import type { TileLayout, TileMeta } from "./types";

// Tile metadata registry
export const TILE_REGISTRY: Record<string, TileMeta> = {
  "identity.hero": {
    id: "identity.hero",
    name: "Identity Hero",
    description: "Avatar, name, handle, and Builder status",
    category: "Profile",
    defaultSize: { width: 4, height: 2 },
    minSize: { width: 4, height: 2 },
    maxSize: { width: 4, height: 2 },
    isResizable: false,
    isHideable: false,
    isMandatory: true,
    builderOnly: false,
    component: "IdentityHero",
  },
  "academic.card": {
    id: "academic.card",
    name: "Academic Info",
    description: "Major, class year, and academic space link",
    category: "Academic",
    defaultSize: { width: 3, height: 1 },
    minSize: { width: 3, height: 1 },
    maxSize: { width: 4, height: 2 },
    isResizable: true,
    isHideable: true,
    isMandatory: false,
    builderOnly: false,
    component: "AcademicCard",
  },
  "residential.card": {
    id: "residential.card",
    name: "Housing Info",
    description: "Dorm or off-campus housing information",
    category: "Housing",
    defaultSize: { width: 3, height: 1 },
    minSize: { width: 3, height: 1 },
    maxSize: { width: 4, height: 2 },
    isResizable: true,
    isHideable: true,
    isMandatory: false,
    builderOnly: false,
    component: "ResidentialCard",
  },
  "spaces.grid": {
    id: "spaces.grid",
    name: "My Spaces",
    description: "Grid of most important spaces",
    category: "Community",
    defaultSize: { width: 4, height: 2 },
    minSize: { width: 3, height: 2 },
    maxSize: { width: 4, height: 3 },
    isResizable: true,
    isHideable: false,
    isMandatory: false,
    builderOnly: false,
    component: "SpacesGrid",
  },
  "activity.timeline": {
    id: "activity.timeline",
    name: "Recent Activity",
    description: "Timeline of recent posts and joins",
    category: "Activity",
    defaultSize: { width: 4, height: 2 },
    minSize: { width: 3, height: 2 },
    maxSize: { width: 4, height: 3 },
    isResizable: true,
    isHideable: true,
    isMandatory: false,
    builderOnly: false,
    component: "ActivityTimeline",
  },
};

// Get available tiles for a user
export function getAvailableTiles(user: { isBuilder: boolean }): TileMeta[] {
  return Object.values(TILE_REGISTRY).filter(
    (tile) => !tile.builderOnly || user.isBuilder
  );
}

// Generate default layout
export function generateDefaultLayout(user: {
  isBuilder: boolean;
}): TileLayout[] {
  const baseLayout: Omit<TileLayout, "isVisible" | "isPinned">[] = [
    { id: "identity.hero", x: 0, y: 0, width: 5, height: 2 },
    { id: "academic.card", x: 5, y: 0, width: 4, height: 1 },
    { id: "residential.card", x: 9, y: 0, width: 3, height: 1 },
    { id: "spaces.grid", x: 0, y: 2, width: 5, height: 2 },
    { id: "activity.timeline", x: 5, y: 1, width: 7, height: 3 },
  ];

  const availableTiles = getAvailableTiles(user);
  const availableTileIds = new Set(availableTiles.map((t) => t.id));

  return baseLayout
    .filter((tile) => availableTileIds.has(tile.id))
    .map((tile) => {
      const meta = getTileMeta(tile.id);
      return {
        ...tile,
        isVisible: true,
        isPinned: meta?.isMandatory || false,
      };
    });
}

// Get tile metadata by ID
export function getTileMeta(tileId: string): TileMeta | undefined {
  return TILE_REGISTRY[tileId];
}
