// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/molecules/tabs";

export type BoardTab = "all" | "events" | "tools";

export interface BoardTabsProps {
  value: BoardTab;
  onChange?: (next: BoardTab) => void;
  className?: string;
}

export const BoardTabs: React.FC<BoardTabsProps> = ({ value, onChange, className }) => (
  <Tabs value={value} onValueChange={(v) => onChange?.(v as BoardTab)} className={className}>
    <TabsList aria-label="Content filter" className="grid w-full max-w-md grid-cols-3">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="events">Events</TabsTrigger>
      <TabsTrigger value="tools">Tools</TabsTrigger>
    </TabsList>
  </Tabs>
);
