'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  Badge,
  Button,
  UsersIcon,
  ShieldIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../atoms';

export interface SpaceLeader {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
}

export interface SpaceAboutData {
  spaceId: string;
  description: string;
  memberCount: number;
  leaders: SpaceLeader[];
  category?: string;
  createdDate?: string;
  isPublic: boolean;
  isMember?: boolean;
}

export interface SpaceAboutWidgetCallbacks {
  onJoin?: (spaceId: string) => void;
  onLeave?: (spaceId: string) => void;
  onLeaderClick?: (leaderId: string) => void;
}

export interface SpaceAboutWidgetProps
  extends SpaceAboutWidgetCallbacks,
    React.HTMLAttributes<HTMLDivElement> {
  data: SpaceAboutData;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SpaceAboutWidget = React.forwardRef<HTMLDivElement, SpaceAboutWidgetProps>(
  (
    {
      data,
      collapsible = true,
      defaultCollapsed = false,
      onJoin,
      onLeave,
      onLeaderClick,
      className,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const { memberCount, leaders, category, createdDate, isPublic, isMember } = data;

    const handleToggle = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed);
      }
    };

    const handleJoinLeave = () => {
      if (isMember) {
        onLeave?.(data.spaceId);
      } else {
        onJoin?.(data.spaceId);
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--hive-text-secondary)]">
            About
          </h3>
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
          <div className="flex flex-col gap-5 p-5">
            {/* Description */}
            <p className="text-sm leading-relaxed text-[var(--hive-text-secondary)]">
              {data.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-xl border border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] bg-[var(--hive-background-tertiary)] p-3">
                <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
                  <UsersIcon className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">
                    Members
                  </span>
                </div>
                <span className="text-2xl font-bold text-[var(--hive-text-primary)]">
                  {memberCount.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl border border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] bg-[var(--hive-background-tertiary)] p-3">
                <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
                  <ShieldIcon className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">
                    Leaders
                  </span>
                </div>
                <span className="text-2xl font-bold text-[var(--hive-text-primary)]">
                  {leaders.length}
                </span>
              </div>
            </div>

            {/* Leaders */}
            {leaders.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                  Space Leaders
                </h4>
                <div className="flex flex-col gap-2">
                  {leaders.map((leader) => (
                    <button
                      key={leader.id}
                      onClick={() => onLeaderClick?.(leader.id)}
                      className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] hover:bg-[var(--hive-background-tertiary)]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hive-brand-primary)]/10 text-xs font-bold text-[var(--hive-brand-primary)]">
                        {leader.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-1 flex-col items-start gap-0.5 min-w-0">
                        <span className="text-sm font-medium text-[var(--hive-text-primary)] truncate w-full">
                          {leader.name}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                          {leader.role}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 border-t border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] pt-4">
              {category && (
                <Badge
                  variant="outline"
                  className="text-[var(--hive-text-tertiary)]"
                >
                  {category}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-[var(--hive-text-tertiary)]"
              >
                {isPublic ? 'Public' : 'Private'}
              </Badge>
              {createdDate && (
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                  Est. {createdDate}
                </span>
              )}
            </div>

            {/* Join/Leave Button */}
            {!isMember && (
              <Button
                variant="brand"
                size="md"
                onClick={handleJoinLeave}
                className="w-full"
              >
                Join Space
              </Button>
            )}

            {isMember && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleJoinLeave}
                className="w-full text-[var(--hive-text-tertiary)] hover:text-red-400"
              >
                Leave Space
              </Button>
            )}
          </div>
        )}
      </aside>
    );
  }
);

SpaceAboutWidget.displayName = 'SpaceAboutWidget';
