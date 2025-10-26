// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/index";

export type RedactionProfile = "leader" | "advisor";

export interface ProofButtonProps {
  onExport?: (profile: RedactionProfile) => void;
  disabled?: boolean;
}

export const ProofButton: React.FC<ProofButtonProps> = ({ onExport, disabled }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" disabled={disabled} aria-haspopup>
          Proof ▾
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56">
        <div className="text-caption text-muted-foreground mb-2">Redaction profile</div>
        <div className="grid gap-2">
          <Button size="sm" variant="secondary" onClick={() => onExport?.("leader")}>Leader export (full)</Button>
          <Button size="sm" variant="secondary" onClick={() => onExport?.("advisor")}>Advisor export (redacted)</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

