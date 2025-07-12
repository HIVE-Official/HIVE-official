"use client";
import React from "react";
import { Button } from "@hive/ui";
import { type SpaceType } from "@hive/core";
import { cn } from "@/lib/utils";

const spaceFilters: { name: string; type: SpaceType | "all" }[] = [
  { name: "All", type: "all" },
  { name: "Academic", type: "academic" },
  { name: "Social", type: "social" },
  { name: "Professional", type: "professional" },
  { name: "Sports", type: "sports" },
  { name: "Cultural", type: "cultural" },
  { name: "Service", type: "service" },
];

interface SpaceFilterPillsProps {
  activeFilter: SpaceType | "all";
  onFilterChange: (_filter: SpaceType | "all") => void;
}

export function SpaceFilterPills({
  activeFilter,
  onFilterChange,
}: SpaceFilterPillsProps) {
  const handleFilterClick = (filter: SpaceType | "all") => {
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {spaceFilters.map((filterItem) => (
        <Button
          key={filterItem.type}
          variant="ghost"
          size="sm"
          onClick={() => handleFilterClick(filterItem.type)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap",
            activeFilter === filterItem.type
              ? "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20"
              : "text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent"
          )}
        >
          {filterItem.name}
        </Button>
      ))}
    </div>
  );
}
