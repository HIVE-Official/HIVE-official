// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Button } from "@/index";

export type Privacy = "members_only" | "public";

export interface PrivacySelectorProps {
  value: Privacy;
  onChange?: (next: Privacy) => void;
  disabled?: boolean;
}

export const PrivacySelector: React.FC<PrivacySelectorProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="inline-flex rounded-lg border border-border/60 bg-muted/30 p-1" role="group" aria-label="Post visibility">
      <Button
        type="button"
        size="sm"
        variant={value === "members_only" ? "default" : "ghost"}
        disabled={disabled}
        onClick={() => onChange?.("members_only")}
      >
        Members
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === "public" ? "default" : "ghost"}
        disabled={disabled}
        onClick={() => onChange?.("public")}
      >
        Public
      </Button>
    </div>
  );
};

