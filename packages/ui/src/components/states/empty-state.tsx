import React from "react";
import { cn } from "../../lib/utils";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon = <PackageOpen className="w-12 h-12 text-muted" />,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg bg-surface-01 border-2 border-dashed border-border",
        className
      )}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
};
