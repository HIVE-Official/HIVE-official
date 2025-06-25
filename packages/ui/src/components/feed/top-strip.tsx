"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "../progress";
import { Calendar, Users, Cpu, ArrowRight } from "lucide-react";
import { designTokens } from "@hive/tokens";

// ============================================================================
// HIVE-SPECIFIC DESIGN DECISIONS
// ============================================================================

const HIVE_MOTION = {
  transition: {
    duration: designTokens.motion.duration.fast,
    ease: designTokens.motion.easing.spring,
  },
  whileTap: { scale: 0.97 },
  hover: {
    scale: 1.02,
    transition: {
      duration: designTokens.motion.duration.instant,
      ease: designTokens.motion.easing.smooth,
    },
  },
};

// ============================================================================
// TYPES
// ============================================================================

export interface TopStripItem {
  id: string;
  type: "ritual" | "space-unlock" | "tool-reveal" | "campus-event";
  title: string;
  subtitle?: string;
  timestamp: Date;
  isUrgent?: boolean;
  participants?: number;
  maxParticipants?: number;
  priority: number;
}

export interface TopStripProps {
  items: TopStripItem[];
  onItemClick?: (item: TopStripItem) => void;
  onItemLongPress?: (item: TopStripItem) => void;
  className?: string;
}

// ============================================================================
// HELPER FUNCTIONS & COMPONENTS
// ============================================================================

const getIconForType = (type: TopStripItem["type"]) => {
  switch (type) {
    case "ritual":
      return <Cpu className="h-4 w-4" />;
    case "space-unlock":
      return <Users className="h-4 w-4" />;
    case "tool-reveal":
      return <Cpu className="h-4 w-4" />; // Re-using for now
    case "campus-event":
      return <Calendar className="h-4 w-4" />;
    default:
      return null;
  }
};

const Countdown = ({
  timestamp,
  isUrgent,
}: {
  timestamp: Date;
  isUrgent?: boolean;
}) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = timestamp.getTime() - now;

      if (distance < 0) {
        setTimeRemaining("Unlocked");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let countdownString = "";
      if (days > 0) countdownString += `${days}d `;
      if (hours > 0 || days > 0) countdownString += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0)
        countdownString += `${minutes}m `;
      countdownString += `${seconds}s`;

      setTimeRemaining(countdownString.trim());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const pulseAnimation = isUrgent
    ? {
        scale: [1, 1.05, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <motion.div
      className="font-mono text-sm tracking-tighter text-text-primary"
      animate={pulseAnimation}
    >
      {timeRemaining}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const TopStrip = ({
  items,
  onItemClick,
  onItemLongPress,
  className,
}: TopStripProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedItems = [...items].sort((a, b) => a.priority - b.priority);
  const leadRitual = sortedItems.find(
    (item) => item.type === "ritual" && item.isUrgent
  );
  const otherItems = sortedItems.filter((item) => item.id !== leadRitual?.id);

  const handleLongPress = (
    e: React.MouseEvent<HTMLDivElement>,
    item: TopStripItem
  ) => {
    e.preventDefault();
    onItemLongPress?.(item);
  };

  // Lead Ritual Tile Component
  const LeadRitualTile = ({ item }: { item: TopStripItem }) => (
    <motion.div
      className="col-span-full rounded-xl bg-surface-02 border border-border-line p-4 flex flex-col justify-between cursor-pointer h-32 relative overflow-hidden"
      onClick={() => onItemClick?.(item)}
      onContextMenu={(e) => handleLongPress(e, item)}
      whileHover={HIVE_MOTION.hover}
      {...HIVE_MOTION}
    >
      {/* Pulsing Gold Border for urgency */}
      {item.isUrgent && (
        <motion.div
          className="absolute inset-0 border-2 border-accent-gold rounded-xl"
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
          {getIconForType(item.type)}
          <span>{item.type.replace("-", " ")}</span>
        </div>
        <Countdown timestamp={item.timestamp} isUrgent={item.isUrgent} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-text-primary">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm text-text-muted">{item.subtitle}</p>
        )}
      </div>
      {item.participants !== undefined &&
        item.maxParticipants !== undefined && (
          <div className="mt-2">
            <Progress
              value={(item.participants / item.maxParticipants) * 100}
              className="h-1"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>{item.participants} joined</span>
              <span>{item.maxParticipants} max</span>
            </div>
          </div>
        )}
    </motion.div>
  );

  // Secondary Tile Component
  const SecondaryTile = ({ item }: { item: TopStripItem }) => (
    <motion.div
      className="rounded-lg bg-surface-01 border border-border-line p-3 flex items-center justify-between cursor-pointer h-20"
      onClick={() => onItemClick?.(item)}
      onContextMenu={(e) => handleLongPress(e, item)}
      whileHover={HIVE_MOTION.hover}
      {...HIVE_MOTION}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
          {getIconForType(item.type)}
          <span>{item.type.replace("-", " ")}</span>
        </div>
        <p className="font-body text-sm font-medium text-text-primary mt-1">
          {item.title}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-text-muted" />
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className={cn(
          "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
          className
        )}
      >
        {leadRitual && <LeadRitualTile item={leadRitual} />}
        {otherItems.map((item) => (
          <SecondaryTile key={item.id} item={item} />
        ))}
      </div>
    </AnimatePresence>
  );
};

// ============================================================================
// MOCK DATA GENERATOR - For Storybook & Prototyping
// ============================================================================

export const createSampleTopStripItems = (): TopStripItem[] => {
  const now = new Date();
  return [
    {
      id: "ritual-1",
      type: "ritual",
      title: "First Light Ceremony",
      subtitle: "The first campus-wide post flood begins.",
      timestamp: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
      isUrgent: true,
      participants: 842,
      maxParticipants: 2000,
      priority: 1,
    },
    {
      id: "space-unlock-1",
      type: "space-unlock",
      title: "Graphic Design Club",
      timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      priority: 2,
    },
    {
      id: "tool-reveal-1",
      type: "tool-reveal",
      title: 'New "Course Scheduler" Tool',
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      priority: 3,
    },
    {
      id: "campus-event-1",
      type: "campus-event",
      title: "Homecoming Football Game",
      timestamp: new Date(now.getTime() + 24 * 60 * 60 * 1000), // tomorrow
      priority: 4,
    },
  ];
};
