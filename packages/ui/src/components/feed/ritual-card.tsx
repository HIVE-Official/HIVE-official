import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from "../ui/avatar";

export interface RitualCardProps {
  name: string;
  description: string;
  participantCount: number;
  participants: {
    name: string;
    avatarUrl?: string;
  }[];
  className?: string;
}

export const RitualCard = ({
  name,
  description,
  participantCount,
  participants = [],
  className,
}: RitualCardProps) => {
  return (
    <div
      className={`bg-gradient-to-br from-surface-02 to-surface-03 border border-border rounded-lg p-6 flex flex-col ${className}`}
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-semibold text-accent">
            ACTIVE RITUAL
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          {name}
        </h3>
        <p className="text-muted text-sm mb-6">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AvatarGroup>
            {participants.slice(0, 3).map((p, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-surface-02">
                <AvatarImage src={p.avatarUrl} />
                <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span className="text-sm text-muted">
            {participantCount} {participantCount === 1 ? "person" : "people"}{" "}
            participating
          </span>
        </div>
        <Button variant="default" size="sm">
          Join Ritual
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
