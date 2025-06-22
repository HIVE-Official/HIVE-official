"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Crown, Zap, TrendingUp, ExternalLink, Plus } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  type: "poll" | "rsvp" | "simple_form";
  totalViews: number;
  totalInteractions: number;
  createdAt: Date;
  isPublished: boolean;
}

interface BuilderStats {
  isBuilder: boolean;
  builderApprovedAt?: Date;
  toolsCreated: number;
  totalEngagement: number;
  totalViews: number;
  recentTools: Tool[];
  achievements: string[];
}

interface BuilderDashboardProps {
  builderStats: BuilderStats;
  isOwner?: boolean;
  onCreateTool?: () => void;
  onViewTool?: (toolId: string) => void;
  onViewHiveLAB?: () => void;
  className?: string;
}

const toolTypeLabels = {
  poll: "Poll",
  rsvp: "RSVP",
  simple_form: "Form",
};

export const BuilderDashboard = React.forwardRef<
  HTMLDivElement,
  BuilderDashboardProps
>(
  (
    {
      builderStats,
      isOwner = false,
      onCreateTool,
      onViewTool,
      onViewHiveLAB,
      className,
      ...props
    },
    ref
  ) => {
    if (!builderStats.isBuilder) {
      return null;
    }

    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
      }
      return num.toString();
    };

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Builder Dashboard
          </CardTitle>
          {isOwner && (
            <Button variant="outline" size="sm" onClick={onViewHiveLAB}>
              <ExternalLink className="h-4 w-4 mr-2" />
              HiveLAB
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Builder Badge and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-500 text-black font-medium">
                <Crown className="h-3 w-3 mr-1" />
                Builder
              </Badge>
              {builderStats.builderApprovedAt && (
                <span className="text-xs text-text-secondary">
                  Since{" "}
                  {new Date(
                    builderStats.builderApprovedAt
                  ).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-surface-02 rounded-lg">
              <div className="text-2xl font-bold text-text-primary">
                {builderStats.toolsCreated}
              </div>
              <div className="text-xs text-text-secondary">Tools Created</div>
            </div>
            <div className="text-center p-3 bg-surface-02 rounded-lg">
              <div className="text-2xl font-bold text-text-primary">
                {formatNumber(builderStats.totalViews)}
              </div>
              <div className="text-xs text-text-secondary">Total Views</div>
            </div>
            <div className="text-center p-3 bg-surface-02 rounded-lg">
              <div className="text-2xl font-bold text-text-primary">
                {formatNumber(builderStats.totalEngagement)}
              </div>
              <div className="text-xs text-text-secondary">Interactions</div>
            </div>
          </div>

          {/* Recent Tools */}
          {builderStats.recentTools.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text-secondary">
                  Recent Tools
                </h4>
                {isOwner && (
                  <Button variant="ghost" size="sm" onClick={onCreateTool}>
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {builderStats.recentTools.slice(0, 3).map((tool) => (
                  <div
                    key={tool.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      "bg-surface-02 border border-border-line",
                      "hover:bg-surface-02-hover transition-colors cursor-pointer"
                    )}
                    onClick={() => onViewTool?.(tool.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-text-primary">
                          {tool.name}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {toolTypeLabels[tool.type]}
                        </Badge>
                        {!tool.isPublished && (
                          <Badge variant="secondary" className="text-xs">
                            Draft
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {formatNumber(tool.totalViews)} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {formatNumber(tool.totalInteractions)} interactions
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-secondary" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {builderStats.achievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">
                Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {builderStats.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    🏆 {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Empty State for New Builders */}
          {builderStats.toolsCreated === 0 && isOwner && (
            <div className="text-center py-6">
              <Zap className="h-12 w-12 text-text-secondary mx-auto mb-3" />
              <h4 className="font-medium text-text-primary mb-2">
                Ready to Build?
              </h4>
              <p className="text-sm text-text-secondary mb-4">
                Create your first tool and start engaging your campus community.
              </p>
              <Button
                onClick={onCreateTool}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tool
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

BuilderDashboard.displayName = "BuilderDashboard";

export type { Tool, BuilderStats, BuilderDashboardProps };
