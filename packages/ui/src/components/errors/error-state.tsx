import React from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title,
  description,
  onRetry,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg bg-surface-02 border border-border",
        className
      )}
      role="alert"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
        <AlertTriangle className="w-6 h-6 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted mb-6 max-w-sm">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
};
