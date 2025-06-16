"use client";

import React from "react";

import { cn } from "../../../lib/utils";
import {
  Type,
  Image,
  Minus,
  Square,
  MousePointer,
  CheckSquare,
  TextCursor,
  Star,
  Clock,
  BarChart3,
  GitBranch,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Element } from "@hive/core";

// Map element types to Lucide icons
const ELEMENT_ICONS = {
  textBlock: Type,
  imageBlock: Image,
  divider: Minus,
  stack: Square,
  button: MousePointer,
  choiceSelect: CheckSquare,
  textInput: TextCursor,
  ratingStars: Star,
  countdownTimer: Clock,
  progressBar: BarChart3,
  conditionGate: GitBranch,
  pingTrigger: Zap,
} as const;

interface ElementCardProps {
  element: Element;
  onSelect: (elementId: string) => void;
  enableDrag?: boolean;
  className?: string;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  onSelect,
  enableDrag = false,
  className,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        elementId: element.id,
        elementType: element.type,
      })
    );
  };

  const handleClick = () => {
    onSelect(element.id);
  };

  const IconComponent = ELEMENT_ICONS[element.type] || Type;

  const cardClassName = cn(
    "group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors",
    className
  );

  const cardContent = (
    <>
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-gold/20 text-accent-gold">
        <IconComponent className="w-4 h-4" />
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-text-primary">
          {element.name}
        </h3>
        <p className="text-xs text-text-muted mt-1 line-clamp-2">
          {element.description}
        </p>
      </div>

      <div className="absolute inset-0 rounded-lg border-2 border-accent-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </>
  );

  if (enableDrag) {
    // Use regular div for drag functionality to avoid framer motion conflicts
    return (
      <div
        className={cardClassName}
        draggable={true}
        onDragStart={handleDragStart}
        onClick={handleClick}
      >
        {cardContent}
      </div>
    );
  }

  // Use motion.div for non-draggable cards
  return (
    <motion.div
      className={cardClassName}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {cardContent}
    </motion.div>
  );
};
