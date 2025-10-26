/**
 * ResourcesWidget - Files & Links Tool
 *
 * Quick access to important resources (Discord, GitHub, files)
 * Click-through to full resources page via breadcrumb navigation
 */

import React from "react";
import { BaseWidget } from "./base-widget";
import { Button } from "@/atoms/button";
import {
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Plus,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils/cn";

export interface Resource {
  id: string;
  type: "link" | "file";
  title: string;
  url: string;
  description?: string;
  iconName?: string;
  pinnedAt?: Date;
}

export interface ResourcesWidgetProps {
  resources: Resource[];
  onResourceClick?: (resourceId: string) => void;
  onAddResource?: () => void;
  onViewAll?: () => void;
  canManage?: boolean;
  loading?: boolean;
  className?: string;
}

const ResourcesWidget = React.forwardRef<HTMLDivElement, ResourcesWidgetProps>(
  (
    {
      resources,
      onResourceClick,
      onAddResource,
      onViewAll,
      canManage,
      loading,
      className,
    },
    ref
  ): JSX.Element => {
    const hasResources = resources.length > 0;

    const getResourceIcon = (resource: Resource) => {
      if (resource.type === "file") {
        return <FileText className="h-4 w-4" />;
      }
      return <LinkIcon className="h-4 w-4" />;
    };

    return (
      <BaseWidget
        ref={ref}
        title="RESOURCES"
        icon={<FileText className="h-4 w-4" />}
        headerHint="Reference shelf"
        accent="muted"
        backgroundLabel="Library"
        loading={loading}
        action={
          onViewAll ? { label: "Open", onClick: onViewAll } : undefined
        }
        className={cn(className)}
        onClick={() => onViewAll?.()}
      >
        {hasResources ? (
          <div className="space-y-3">
            {/* Resource List */}
            <div className="space-y-2">
              {resources.slice(0, 5).map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (onResourceClick) {
                      e.preventDefault();
                      onResourceClick(resource.id);
                    }
                  }}
                  className={cn(
                    "group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.25)]",
                    "bg-[hsl(var(--background)/0.65)]/80 p-3 transition-all duration-300 hover:-translate-y-0.5",
                    "hover:border-[hsl(var(--primary)/0.35)] hover:bg-[hsl(var(--background)/0.78)]"
                  )}
                >
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    {getResourceIcon(resource)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {resource.title}
                    </p>
                    {resource.description && (
                      <p className="text-caption text-muted-foreground line-clamp-1">
                        {resource.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            {/* Show count if more resources */}
            {resources.length > 5 && (
              <p className="border-t border-dashed border-[hsl(var(--border)/0.4)] pt-3 text-caption text-muted-foreground">
                +{resources.length - 5} more resources
              </p>
            )}

            {/* Click affordance */}
            {onViewAll && (
              <div className="mt-3 flex items-center justify-center border-t border-[hsl(var(--border)/0.35)] pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewAll();
                  }}
                  className="text-caption text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
                >
                  <span>View all resources</span>
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}

            {/* Add Resource Button (if leader) */}
            {canManage && onAddResource && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddResource();
                }}
                className="mt-2 w-full border-[hsl(var(--primary)/0.25)] text-primary hover:bg-[hsl(var(--primary)/0.12)]"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add Resource
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-body-sm text-muted-foreground mb-3">
              No resources shared yet
            </p>
            {canManage && onAddResource && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddResource();
                }}
                className="border-[hsl(var(--primary)/0.25)] text-primary hover:bg-[hsl(var(--primary)/0.12)]"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add First Resource
              </Button>
            )}
          </div>
        )}
      </BaseWidget>
    );
  }
);

ResourcesWidget.displayName = "ResourcesWidget";

export { ResourcesWidget };
