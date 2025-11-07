'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  Badge,
  Button,
  ZapIcon,
  ClockIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../atoms';

export interface SpaceTool {
  id: string;
  name: string;
  icon?: string;
  type: string;
  closeTime?: string; // e.g., "2h 15m" or "Ends in 3 days"
  isActive: boolean;
  responseCount?: number;
}

export interface SpaceToolsWidgetData {
  spaceId: string;
  tools: SpaceTool[];
  hasMore: boolean;
}

export interface SpaceToolsWidgetCallbacks {
  onToolClick?: (toolId: string) => void;
  onViewAll?: (spaceId: string) => void;
}

export interface SpaceToolsWidgetProps
  extends SpaceToolsWidgetCallbacks,
    React.HTMLAttributes<HTMLDivElement> {
  data: SpaceToolsWidgetData;
  maxVisible?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SpaceToolsWidget = React.forwardRef<HTMLDivElement, SpaceToolsWidgetProps>(
  (
    {
      data,
      maxVisible = 3,
      collapsible = true,
      defaultCollapsed = false,
      onToolClick,
      onViewAll,
      className,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const visibleTools = data.tools.slice(0, maxVisible);
    const hiddenCount = Math.max(0, data.tools.length - maxVisible);

    const handleToggle = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed);
      }
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 65%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 98%,transparent)]',
          className
        )}
        {...props}
      >
        {/* Header */}
        <header
          className={cn(
            'flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--hive-border-default) 50%,transparent)] px-5 py-4',
            collapsible && 'cursor-pointer'
          )}
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--hive-text-secondary)]">
              Active Tools
            </h3>
            {data.tools.length > 0 && (
              <Badge
                variant="outline"
                className="text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/30"
              >
                {data.tools.length}
              </Badge>
            )}
          </div>
          {collapsible && (
            <button
              className="text-[var(--hive-text-tertiary)] transition-colors hover:text-[var(--hive-text-secondary)]"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronUpIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </header>

        {/* Content */}
        {!isCollapsed && (
          <div className="flex flex-col p-3">
            {data.tools.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--hive-background-tertiary)]">
                  <ZapIcon className="h-6 w-6 text-[var(--hive-text-tertiary)]" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--hive-text-secondary)]">
                    No active tools
                  </p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Leaders can create tools in HiveLab
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Tool List */}
                <div className="flex flex-col gap-2">
                  {visibleTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onToolClick?.(tool.id)}
                      className="group flex items-start gap-3 rounded-xl border border-transparent p-3 text-left transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] hover:bg-[var(--hive-background-tertiary)]"
                    >
                      {/* Tool Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--hive-brand-primary)]/10 text-lg">
                        {tool.icon ? (
                          <span>{tool.icon}</span>
                        ) : (
                          <ZapIcon className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                        )}
                      </div>

                      {/* Tool Info */}
                      <div className="flex flex-1 flex-col gap-2 min-w-0">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-[var(--hive-text-primary)] truncate">
                            {tool.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-[10px] text-[var(--hive-text-tertiary)]"
                            >
                              {tool.type}
                            </Badge>
                            {tool.responseCount !== undefined && tool.responseCount > 0 && (
                              <span className="text-[11px] text-[var(--hive-text-tertiary)]">
                                {tool.responseCount} responses
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Close Time Countdown */}
                        {tool.closeTime && (
                          <div className="flex items-center gap-1.5 text-xs text-[var(--hive-text-secondary)]">
                            <ClockIcon className="h-3.5 w-3.5 text-[var(--hive-brand-primary)]" />
                            <span>{tool.closeTime}</span>
                          </div>
                        )}
                      </div>

                      {/* Chevron */}
                      <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--hive-text-tertiary)] transition-colors group-hover:text-[var(--hive-text-secondary)]" />
                    </button>
                  ))}
                </div>

                {/* View All Link */}
                {(hiddenCount > 0 || data.hasMore) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewAll?.(data.spaceId)}
                    className="mt-3 w-full text-[var(--hive-text-secondary)]"
                  >
                    View all tools
                    {hiddenCount > 0 && ` (+${hiddenCount} more)`}
                    <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </aside>
    );
  }
);

SpaceToolsWidget.displayName = 'SpaceToolsWidget';
