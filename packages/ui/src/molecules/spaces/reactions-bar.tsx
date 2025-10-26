// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Button } from "@/index";

export interface Reaction {
  key: string; // e.g., "👍", "🎉"
  label?: string;
  count: number;
  mine?: boolean;
}

export interface ReactionsBarProps {
  reactions: Reaction[];
  onToggle?: (key: string) => void;
  disabled?: boolean;
}

export const ReactionsBar: React.FC<ReactionsBarProps> = ({ reactions, onToggle, disabled }) => (
  <div className="flex items-center gap-2">
    {reactions.map((r) => (
      <Button
        key={r.key}
        variant={r.mine ? "default" : "outline"}
        size="sm"
        className="gap-1"
        disabled={disabled}
        onClick={() => onToggle?.(r.key)}
        aria-pressed={r.mine}
      >
        <span aria-hidden>{r.key}</span>
        <span className="text-caption text-muted-foreground">{r.count}</span>
      </Button>
    ))}
  </div>
);

