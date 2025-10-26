// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Separator, Button } from "@/index";

export const UnreadSeparator: React.FC<{ label?: string }> = ({ label = "Unread" }) => (
  <div className="relative my-3" role="separator" aria-label={label}>
    <Separator />
    <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-background px-2 text-caption text-muted-foreground">
      {label}
    </span>
  </div>
);

export const JumpToLatest: React.FC<{ onClick?: () => void; count?: number }> = ({ onClick, count }) => (
  <div className="sticky bottom-16 z-10 flex justify-center">
    <Button size="sm" variant="secondary" onClick={onClick} className="shadow-md">
      Jump to latest{typeof count === "number" && count > 0 ? ` (${count})` : ""}
    </Button>
  </div>
);

