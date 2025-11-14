"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  BentoGridLayout,
  ProfileSystem,
  GridSize,
} from "@hive/core/types/profile-system";
import {
  Activity,
  Calendar,
  GripVertical,
  Maximize2,
  Minimize2,
  Search,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "../../00-Global/atoms/button";
import { Card } from "../../00-Global/atoms/card";
import { cn } from "../../../lib/utils";

type GridCard = {
  id: string;
  type: string;
  position: { x: number; y: number };
  size: GridSize;
  visible: boolean;
  customType?: string;
  title?: string;
  [key: string]: unknown;
};

type GridLayout = BentoGridLayout & {
  cards: GridCard[];
  mobileLayout: GridCard[];
  lastModified?: Date | string | null;
};

export interface ProfileBentoGridProps {
  profile: ProfileSystem;
  editable?: boolean;
  onLayoutChange?: (layout: BentoGridLayout) => void;
  className?: string;
}

const DEFAULT_LAYOUT: GridLayout = {
  cards: [
    {
      id: "spaces_hub",
      type: "spaces_hub",
      position: { x: 0, y: 0 },
      size: "2x1",
      visible: true,
    },
    {
      id: "friends_network",
      type: "friends_network",
      position: { x: 1, y: 0 },
      size: "2x1",
      visible: true,
    },
    {
      id: "active_now",
      type: "active_now",
      position: { x: 2, y: 0 },
      size: "1x1",
      visible: true,
    },
    {
      id: "discovery",
      type: "discovery",
      position: { x: 3, y: 0 },
      size: "1x1",
      visible: true,
    },
  ],
  mobileLayout: [
    {
      id: "spaces_hub_mobile",
      type: "spaces_hub",
      position: { x: 0, y: 0 },
      size: "2x1",
      visible: true,
    },
    {
      id: "friends_network_mobile",
      type: "friends_network",
      position: { x: 1, y: 0 },
      size: "2x1",
      visible: true,
    },
  ],
  lastModified: null,
};

const CARD_CONFIGS = {
  spaces_hub: {
    title: "My Spaces",
    icon: Users,
    color: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-500/20",
  },
  friends_network: {
    title: "Friends Network",
    icon: Users,
    color: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
  },
  schedule_overlap: {
    title: "Schedule Overlap",
    icon: Calendar,
    color: "bg-gradient-to-br from-green-500/10 to-green-600/10",
    borderColor: "border-green-500/20",
  },
  active_now: {
    title: "Active Now",
    icon: Activity,
    color: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
    borderColor: "border-orange-500/20",
  },
  discovery: {
    title: "Discover",
    icon: Search,
    color: "bg-gradient-to-br from-pink-500/10 to-pink-600/10",
    borderColor: "border-pink-500/20",
  },
  vibe_check: {
    title: "Campus Vibe",
    icon: Zap,
    color: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10",
    borderColor: "border-yellow-500/20",
  },
  tools_created: {
    title: "Tools",
    icon: Zap,
    color: "bg-gradient-to-br from-indigo-500/10 to-indigo-600/10",
    borderColor: "border-indigo-500/20",
  },
  rituals_active: {
    title: "Rituals",
    icon: Activity,
    color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10",
    borderColor: "border-emerald-500/20",
  },
  reputation: {
    title: "Reputation",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-amber-500/10 to-amber-600/10",
    borderColor: "border-amber-500/20",
  },
} satisfies Record<
  string,
  {
    title: string;
    icon: typeof Users;
    color: string;
    borderColor: string;
  }
>;

function normalizeLayout(layout: Partial<GridLayout> | undefined): GridLayout {
  if (!layout) {
    return DEFAULT_LAYOUT;
  }

  const cards = Array.isArray(layout.cards) ? layout.cards : [];
  const mobile = Array.isArray(layout.mobileLayout)
    ? layout.mobileLayout
    : cards;

  const withPositions = (
    items: Array<Partial<GridCard> | Record<string, any>>,
    offset = 0,
  ): GridCard[] =>
    items.map((card, index) => {
      const rawPos: any = (card as any).position;
      const resolvedPos: { x: number; y: number } =
        typeof rawPos === "number"
          ? { x: rawPos, y: 0 }
          : rawPos && typeof rawPos.x === "number" && typeof rawPos.y === "number"
            ? rawPos
            : { x: index + offset, y: 0 };

      const size = ((card as any).size as GridSize) ?? "1x1";
      const visible = (card as any).visible ?? true;

      return {
        id: (card as any).id ?? `card-${index}`,
        type: (card as any).type ?? "custom",
        position: resolvedPos,
        size,
        visible,
        customType: (card as any).customType,
        title: (card as any).title,
      } as GridCard;
    });

  return {
    ...layout,
    cards: withPositions(cards as GridCard[]),
    mobileLayout: withPositions(mobile as GridCard[]),
    lastModified: layout.lastModified ?? null,
  } as GridLayout;
}

/**
 * Mobile-first responsive Bento Grid
 * - Mobile: 2 columns max, vertical scroll
 * - Tablet: 3 columns
 * - Desktop: 4 columns full grid
 */
export function ProfileBentoGrid({
  profile,
  editable = false,
  onLayoutChange,
  className,
}: ProfileBentoGridProps) {
  const [layout, setLayout] = useState<GridLayout>(() =>
    normalizeLayout((profile as any)?.grid),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLayout(normalizeLayout((profile as any)?.grid));
  }, [profile]);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const activeCards = useMemo<GridCard[]>(() => {
    const cards = isMobile ? layout.mobileLayout : layout.cards;
    return Array.isArray(cards) ? cards : [];
  }, [isMobile, layout.cards, layout.mobileLayout]);

  const updateLayout = (updatedCards: GridCard[]) => {
    const nextLayout: GridLayout = {
      ...layout,
      [isMobile ? "mobileLayout" : "cards"]: updatedCards,
      lastModified: new Date(),
    };
    setLayout(nextLayout);
    onLayoutChange?.(nextLayout as BentoGridLayout);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    cardId: string,
  ) => {
    if (!editable) return;
    setIsDragging(true);
    setDraggedCard(cardId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!editable) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetPos: { x: number; y: number },
  ) => {
    event.preventDefault();
    if (!editable || !draggedCard) return;

    const updatedCards = activeCards.map((card) =>
      card.id === draggedCard ? { ...card, position: targetPos } : card,
    );

    setIsDragging(false);
    setDraggedCard(null);
    updateLayout(updatedCards);
  };

  const toggleCardSize = (cardId: string) => {
    if (!editable) return;

    const updatedCards = activeCards.map((card) => {
      if (card.id !== cardId) return card;

      const nextSize: GridSize =
        card.size === "1x1"
          ? "2x1"
          : card.size === "2x1"
            ? "2x2"
            : card.size === "2x2"
              ? "1x1"
              : "1x1";

      return { ...card, size: nextSize };
    });

    updateLayout(updatedCards);
  };

  const renderCardContent = (card: GridCard) => {
    const cardType = card.type === "custom" ? card.customType : card.type;
    const cardProfile = profile as any;

    switch (cardType) {
      case "spaces_hub": {
        const activeSpaces =
          cardProfile?.connections?.connections?.filter(
            (conn: any) => conn.sharedSpaces?.length > 0,
          ) ?? [];

        return (
          <div className="mt-2 space-y-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {activeSpaces.length || 0}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Active spaces
            </div>
            {card.size !== "1x1" && activeSpaces.length > 0 ? (
              <div className="mt-3 space-y-1">
                <div className="mb-1 text-xs text-hive-text-secondary">
                  Recent activity
                </div>
                {activeSpaces.slice(0, 3).map((conn: any, index: number) => (
                  <div
                    key={index}
                    className="truncate text-xs text-hive-text-primary"
                  >
                    {conn.sharedSpaces?.[0] ?? "Space"}
                  </div>
                ))}
              </div>
            ) : null}
            {card.size === "2x2" ? (
              <Button size="sm" variant="outline" className="mt-3 w-full">
                Browse Spaces
              </Button>
            ) : null}
          </div>
        );
      }

      case "friends_network": {
        const friendCount =
          cardProfile?.connections?.friends?.length ??
          cardProfile?.stats?.friends ??
          0;
        const connectionCount =
          cardProfile?.connections?.connections?.length ?? 0;

        return (
          <div className="mt-2 space-y-2">
            <div className="flex gap-4">
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {friendCount}
                </div>
                <div className="text-xs text-hive-text-secondary">Friends</div>
              </div>
              <div>
                <div className="text-xl font-bold text-hive-text-primary">
                  {connectionCount}
                </div>
                <div className="text-xs text-hive-text-secondary">
                  Connections
                </div>
              </div>
            </div>

            {card.size === "2x2" && (friendCount > 0 || connectionCount > 0) ? (
              <div className="mt-3">
                <div className="mb-2 text-xs text-hive-text-secondary">
                  Recently connected
                </div>
                <div className="flex -space-x-2">
                  {Array.from({
                    length: Math.min(5, friendCount + connectionCount),
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full border-2 border-hive-background-primary bg-gradient-to-br from-hive-accent/40 to-hive-accent/20"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      }

      case "active_now": {
        const allFriends = cardProfile?.connections?.friends ?? [];
        const activeFriends = allFriends.filter((_: unknown, index: number) =>
          index % 2 === 0 ? true : false,
        );
        const isUserOnline =
          cardProfile?.presence?.isOnline ?? cardProfile?.isOnline ?? false;

        return (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-hive-text-primary">
                {activeFriends.length}
              </div>
              {isUserOnline ? (
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              ) : null}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Friends online now
            </div>
            {card.size !== "1x1" && activeFriends.length > 0 ? (
              <div className="mt-2">
                <div className="flex -space-x-2">
                  {activeFriends.slice(0, 5).map((_: unknown, index: number) => (
                    <div
                      key={index}
                      className="h-6 w-6 rounded-full border border-hive-background-primary bg-gradient-to-br from-green-400 to-green-600"
                    />
                  ))}
                  {activeFriends.length > 5 ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-hive-background-primary bg-hive-background-secondary">
                      <span className="text-xs text-hive-text-secondary">
                        +{activeFriends.length - 5}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      }

      case "vibe_check": {
        const currentVibe = cardProfile?.presence?.vibe ?? "🚀 Building";
        const vibeOptions = [
          "🎯 Focused",
          "🚀 Building",
          "📚 Studying",
          "🤝 Connecting",
          "⚡ Energized",
          "😴 Resting",
        ];

        return (
          <div className="mt-2 space-y-2">
            <div className="text-lg font-semibold text-hive-text-primary">
              {currentVibe}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Campus vibe • Tap to update
            </div>
            {card.size === "2x2" ? (
              <div className="mt-3 grid grid-cols-2 gap-1">
                {vibeOptions.slice(0, 4).map((vibe, index) => (
                  <button
                    key={index}
                    className="rounded bg-hive-background-secondary p-2 text-xs transition-colors hover:bg-hive-background-tertiary"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      }

      case "schedule_overlap": {
        const overlaps = cardProfile?.intelligence?.overlaps ?? [];
        const beaconActive = cardProfile?.presence?.beacon?.active ?? false;
        const beaconLocation =
          cardProfile?.presence?.beacon?.location ?? "Campus";

        return (
          <div className="mt-2 space-y-2">
            <div className="text-sm text-hive-text-primary">
              {overlaps.length > 0
                ? `${overlaps.length} overlaps today`
                : "No overlaps today"}
            </div>
            {beaconActive ? (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Beacon at {beaconLocation}
              </div>
            ) : (
              <div className="text-xs text-hive-text-secondary">
                Enable beacon to find friends
              </div>
            )}
            {card.size !== "1x1" && overlaps.length > 0 ? (
              <div className="mt-2 space-y-1">
                {overlaps.slice(0, 2).map((overlap: any, index: number) => (
                  <div
                    key={index}
                    className="text-xs text-hive-text-primary"
                  >
                    {overlap.time ?? "TBD"} • {overlap.name ?? "Event"}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      }

      case "discovery": {
        const suggestions = cardProfile?.intelligence?.suggestions ?? [];
        const hasSuggestions = suggestions.length > 0;

        return (
          <div className="mt-2 space-y-2">
            <div className="text-sm text-hive-text-primary">
              {hasSuggestions
                ? `${suggestions.length} new suggestions`
                : "Explore HIVE"}
            </div>
            <div className="text-xs text-hive-text-secondary">
              {hasSuggestions
                ? "Based on your interests"
                : "Discover spaces & tools"}
            </div>
            {card.size !== "1x1" ? (
              <div className="mt-3">
                {hasSuggestions ? (
                  <div className="space-y-2">
                    {suggestions.slice(0, 2).map((suggestion: any, index: number) => (
                      <div
                        key={index}
                        className="rounded bg-hive-background-secondary p-2"
                      >
                        <div className="text-xs font-medium text-hive-text-primary">
                          {suggestion.name ?? "Suggestion"}
                        </div>
                        <div className="text-xs text-hive-text-secondary">
                          {suggestion.reason ??
                            suggestion.reasons?.[0] ??
                            "Recommended for you"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Search size={12} className="mr-1" />
                    Discover
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        );
      }

      case "tools_created": {
        const toolsCount = cardProfile?.stats?.toolsCreated ?? 0;
        return (
          <div className="mt-2 space-y-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {toolsCount}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Tools created
            </div>
            {card.size !== "1x1" ? (
              <div className="mt-3">
                <Button size="sm" variant="outline" className="w-full">
                  <Zap size={12} className="mr-1" />
                  Create Tool
                </Button>
              </div>
            ) : null}
          </div>
        );
      }

      case "rituals_active": {
        const activeRituals = cardProfile?.stats?.activeRituals ?? 0;
        return (
          <div className="mt-2 space-y-2">
            <div className="text-2xl font-bold text-hive-text-primary">
              {activeRituals}
            </div>
            <div className="text-xs text-hive-text-secondary">
              Active rituals
            </div>
            {card.size !== "1x1" ? (
              <div className="mt-2 text-xs text-hive-accent">
                Current streak: {cardProfile?.stats?.currentStreak ?? 0} days
              </div>
            ) : null}
          </div>
        );
      }

      case "reputation": {
        const reputation = cardProfile?.stats?.reputation ?? 0;
        return (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-hive-text-primary">
                {reputation}
              </div>
              <TrendingUp size={14} className="text-green-400" />
            </div>
            <div className="text-xs text-hive-text-secondary">
              Reputation score
            </div>
            {card.size !== "1x1" ? (
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-hive-background-secondary">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-hive-accent to-green-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, reputation)}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        );
      }

      default:
        return (
          <div className="mt-2 space-y-2">
            <div className="text-sm text-hive-text-secondary">
              Widget coming soon
            </div>
          </div>
        );
    }
  };

  const renderCard = (card: GridCard) => {
    const resolvedType =
      card.type === "custom" ? (card.customType as string | undefined) ?? card.type : card.type;

    const config =
      CARD_CONFIGS[resolvedType] ??
      CARD_CONFIGS[card.customType ?? ""] ?? {
        title: card.title ?? "Widget",
        icon: Settings,
        color: "bg-hive-background-secondary/60",
        borderColor: "border-hive-border",
      };

    return (
      <Card
        key={card.id}
        draggable={editable}
        onDragStart={(event) => handleDragStart(event, card.id)}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, card.position)}
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(10,10,18,0.9)) 80%,transparent)] shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-shadow",
          card.size === "2x2" ? "row-span-2" : undefined,
          card.size === "2x1" ? "col-span-2" : undefined,
          card.size === "1x2" ? "row-span-2" : undefined,
          config.borderColor,
        )}
      >
        <div className={cn("relative rounded-t-[inherit] px-4 pt-4", config.color)}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 70%,transparent)]">
                {config.title}
              </div>
              <div className="text-sm text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 78%,transparent)]">
                {card.title ?? cardTypeLabel(resolvedType)}
              </div>
            </div>
            <config.icon className="h-5 w-5 text-[var(--hive-brand-primary,#FACC15)]" />
          </div>

          {editable ? (
            <div className="absolute right-3 top-3 flex gap-1 rounded-full bg-black/40 p-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => toggleCardSize(card.id)}
                className="rounded p-1 hover:bg-white/10"
              >
                {card.size === "2x2" ? (
                  <Minimize2 size={14} />
                ) : (
                  <Maximize2 size={14} />
                )}
              </button>
              <button
                type="button"
                className="cursor-move rounded p-1 hover:bg-white/10"
              >
                <GripVertical size={14} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="px-4 pb-4">{renderCardContent(card)}</div>
      </Card>
    );
  };

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-4 p-4",
        isMobile
          ? "grid-cols-2"
          : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {activeCards.filter((card) => card.visible ?? true).map(renderCard)}

      {editable ? (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="default"
            size="sm"
            className="shadow-lg"
            onClick={() => onLayoutChange?.(layout as BentoGridLayout)}
          >
            Save Layout
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function cardTypeLabel(type: string) {
  switch (type) {
    case "spaces_hub":
      return "Spaces overview";
    case "friends_network":
      return "Network";
    case "active_now":
      return "Active now";
    case "schedule_overlap":
      return "Schedule overlap";
    case "discovery":
      return "Discover";
    case "vibe_check":
      return "Campus vibe";
    case "tools_created":
      return "Tools";
    case "rituals_active":
      return "Rituals";
    case "reputation":
      return "Reputation";
    default:
      return "Widget";
  }
}
