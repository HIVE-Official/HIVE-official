import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { cn } from "../../../lib/utils";

interface PropertiesPanelProps {
  selectedElement: any | null;
  elementDefinition: any | null;
  onElementUpdate?: (id: string, updates: any) => void;
  onElementDelete?: (id: string) => void;
  onElementDuplicate?: (id: string) => void;
  className?: string;
}

export function PropertiesPanel({
  selectedElement,
  elementDefinition,
  className,
}: PropertiesPanelProps) {
  if (!selectedElement || !elementDefinition)
    return (
      <Card className={cn("w-[320px] text-center", className)}>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-text-muted">
            No element selected
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-text-muted">
          Click an element in the canvas to edit its properties.
        </CardContent>
      </Card>
    );

  return (
    <Card className={cn("w-[320px]", className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          {elementDefinition.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-text-muted">ID</span>
          <span>{selectedElement.id}</span>
        </div>
        {/* Placeholder for future property controls */}
        <div className="rounded-md bg-white/5 p-3 text-center text-text-muted">
          Property controls coming soon
        </div>
      </CardContent>
    </Card>
  );
}
