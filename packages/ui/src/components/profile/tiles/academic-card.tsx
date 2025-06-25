"use client";

import * as React from "react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { GraduationCap } from "lucide-react";
import type { TileProps } from "../grid/types";

export const AcademicCard: React.FC<TileProps> = ({ isEditing = false }) => {
  const major = "Computer Science";
  const graduationYear = 2025;

  return (
    <Card
      className="flex flex-col h-full items-center justify-center text-center p-4"
      hoverable={!isEditing}
    >
      <CardHeader className="p-0 mb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 mr-2" />
          Academic
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-foreground">{major}</h3>
        {graduationYear && (
          <Badge variant="outline" className="mt-2">
            Class of {graduationYear}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
