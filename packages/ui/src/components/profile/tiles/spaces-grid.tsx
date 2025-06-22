"use client";

import * as React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { MoreHorizontal, Users, Lock } from "lucide-react";
import type { TileProps } from "../grid/types";

interface Space {
  id: string;
  name: string;
  memberCount: number;
  category: string;
  isLocked: boolean;
  isAutoJoined: boolean;
}

export const SpacesGrid: React.FC<TileProps> = ({ isEditing = false }) => {
  const spaces: Space[] = [
    {
      id: "cs-major",
      name: "CS Major",
      memberCount: 234,
      category: "Academic",
      isLocked: false,
      isAutoJoined: true,
    },
    {
      id: "west-hall",
      name: "West Hall",
      memberCount: 89,
      category: "Housing",
      isLocked: false,
      isAutoJoined: true,
    },
    {
      id: "robotics-club",
      name: "Robotics Club",
      memberCount: 42,
      category: "Interest",
      isLocked: false,
      isAutoJoined: false,
    },
    {
      id: "study-group",
      name: "CS260 Study",
      memberCount: 8,
      category: "Study",
      isLocked: true,
      isAutoJoined: false,
    },
  ];

  return (
    <Card className="flex flex-col h-full" hoverable={!isEditing}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#FFD700]" />
            <span className="text-sm font-medium text-muted-foreground">
              My Spaces
            </span>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Spaces Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {spaces.slice(0, 4).map((space) => (
            <div
              key={space.id}
              className="flex flex-col p-3 bg-muted/10 rounded-lg border border-border hover:border-[#FFD700]/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground line-clamp-1">
                  {space.name}
                </h4>
                {space.isLocked && (
                  <Lock className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-1" />
                )}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Badge variant="secondary" className="text-xs">
                  {space.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {space.memberCount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
            disabled={isEditing}
          >
            View All Spaces
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
