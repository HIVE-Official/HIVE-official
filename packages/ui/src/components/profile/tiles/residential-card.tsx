"use client";

import * as React from "react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Home } from "lucide-react";
import type { TileProps } from "../grid/types";
import { cn } from "@hive/ui/lib/utils";

export const ResidentialCard: React.FC<TileProps> = ({ isEditing = false }) => {
  const user = {
    dormName: "West Hall",
    isOnCampus: true,
    showRoomNumber: false,
  };

  return (
    <Card
      className="flex flex-col h-full items-center justify-center text-center p-4"
      hoverable={!isEditing}
    >
      <CardHeader className="p-0 mb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Home className="h-4 w-4 mr-2" />
          Housing
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-foreground">
          {user.dormName}
        </h3>
        <Badge
          className={cn(
            "mt-2",
            user.isOnCampus
              ? "border-green-400/50 bg-green-900/30 text-green-300"
              : "border-blue-400/50 bg-blue-900/30 text-blue-300"
          )}
        >
          {user.isOnCampus ? "On Campus" : "Off Campus"}
        </Badge>
      </CardContent>
    </Card>
  );
};
