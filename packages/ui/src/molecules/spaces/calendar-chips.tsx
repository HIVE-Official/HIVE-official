// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Badge } from "@/atoms/badge";
import { Progress } from "@/atoms/progress";
import { Button } from "@/atoms/button";

export const NowChip: React.FC = () => (
  <Badge variant="success" className="bg-emerald-500 text-emerald-50">Now</Badge>
);

export const CoHostChips: React.FC<{ names: string[] }> = ({ names }) => (
  <div className="flex flex-wrap gap-1">
    {names.map((n) => (
      <Badge key={n} variant="outline" className="text-caption">Co-host: {n}</Badge>
    ))}
  </div>
);

export const CapacityBar: React.FC<{ current: number; total?: number }> = ({ current, total }) => {
  if (!total || total <= 0) return null;
  const value = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <Progress value={value} className="h-2" />
      <span className="text-caption text-muted-foreground">{current}/{total}</span>
    </div>
  );
};

export type RSVPStatus = "going" | "maybe" | "waitlist" | null;

export const RSVPChip: React.FC<{
  status: RSVPStatus;
  onChange?: (next: Exclude<RSVPStatus, null>) => void;
}> = ({ status, onChange }) => {
  const going = status === "going";
  const maybe = status === "maybe";
  return (
    <div className="inline-flex rounded-md border border-border/60 bg-muted/30 p-1">
      <Button size="sm" variant={going ? "default" : "ghost"} onClick={() => onChange?.("going")}>Going</Button>
      <Button size="sm" variant={maybe ? "default" : "ghost"} onClick={() => onChange?.("maybe")}>Maybe</Button>
    </div>
  );
};
