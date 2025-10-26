"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * ToolsCatalog - Browse, install, and configure space tools
 *
 * Tools are no-code automation blocks created in HiveLab that:
 * - Emit posts on schedules or triggers
 * - Collect data via forms/surveys
 * - Display analytics/leaderboards
 * - Send notifications
 * - Execute custom logic
 *
 * UX Patterns:
 * - Browse catalog of available tools
 * - Install tool to space (creates instance)
 * - Configure tool settings
 * - View active tools
 * - Manage permissions and automation rules
 */

import React from "react";
import { Card } from "../../atoms/card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Input } from "../../atoms/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Search, Settings, Plus, Trash2, Eye, BarChart3, FileText, Clock, Users } from "lucide-react";
import { cn } from "../../utils/cn";
import type { SpaceTool, ToolTemplate, ToolCategory } from "./types";
import { format } from "date-fns";

export interface ToolsCatalogProps {
  /** Currently installed tools */
  installedTools: SpaceTool[];

  /** Available tool templates from HiveLab */
  availableTools: ToolTemplate[];

  /** Can user install/configure tools */
  canManageTools: boolean;

  /** Install tool handler */
  onInstall?: (templateId: string) => void;

  /** Uninstall tool handler */
  onUninstall?: (toolId: string) => void;

  /** Configure tool handler */
  onConfigure?: (toolId: string) => void;

  /** View tool posts handler */
  onViewPosts?: (toolId: string) => void;

  /** Active tab */
  activeTab?: "installed" | "catalog";

  /** Loading state */
  isLoading?: boolean;
}

const CATEGORY_ICONS: Record<
  ToolCategory,
  React.ComponentType<{ className?: string }>
> = {
  automation: Zap,
  analytics: BarChart3,
  engagement: Users,
  content: FileText,
};

const CATEGORY_LABELS: Record<ToolCategory, string> = {
  automation: "Automation",
  analytics: "Analytics",
  engagement: "Engagement",
  content: "Content",
};

export const ToolsCatalog = React.forwardRef<HTMLDivElement, ToolsCatalogProps>(
  (
    {
      installedTools,
      availableTools,
      canManageTools,
      onInstall,
      onUninstall,
      onConfigure,
      onViewPosts,
      activeTab = "installed",
      isLoading = false,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<
      ToolCategory | "all"
    >("all");

    // Filter available tools
    const filteredTools = availableTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Check if tool is installed
    const isInstalled = (templateId: string) =>
      installedTools.some((t) => t.templateId === templateId);

    return (
      <div ref={ref} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-h3 font-h3">Tools</h1>
              <p className="text-body-sm font-body-sm text-muted-foreground">
                Automate and enhance your space with no-code tools
              </p>
            </div>
          </div>

          {canManageTools && (
            <Badge variant="muted" className="gap-2">
              <Users className="h-3 w-3" />
              {installedTools.length} active
            </Badge>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="installed" className="gap-2">
              <Settings className="h-4 w-4" />
              Installed ({installedTools.length})
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-2">
              <Search className="h-4 w-4" />
              Catalog ({availableTools.length})
            </TabsTrigger>
          </TabsList>

          {/* Installed Tools Tab */}
          <TabsContent value="installed" className="space-y-4">
            {installedTools.length === 0 ? (
              <Card className="bg-card border-border p-8 text-center">
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                  <div className="p-3 rounded-full bg-muted/30">
                    <Zap className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-h4 font-h4">No tools installed</h3>
                  <p className="text-body-sm font-body-sm text-muted-foreground">
                    Browse the catalog to discover automation tools that can
                    enhance your space.
                  </p>
                  {canManageTools && (
                    <Button variant="default" className="mt-2">
                      Browse Catalog
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid gap-4">
                {installedTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className={cn(
                      "bg-card border-border p-4",
                      "transition-all duration-300 ease-out group",
                      "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Tool info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Icon */}
                        <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <Zap className="h-5 w-5" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-h5 font-h5 group-hover:text-primary transition-colors duration-200">
                              {tool.name}
                            </h3>
                            <Badge
                              variant={tool.isActive ? "success" : "outline"}
                              className="gap-1"
                            >
                              {tool.isActive ? "Active" : "Paused"}
                            </Badge>
                          </div>

                          <p className="text-body-sm font-body-sm text-muted-foreground line-clamp-2">
                            {tool.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-caption font-caption text-muted-foreground flex-wrap">
                            {tool.postsCreated > 0 && (
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {tool.postsCreated} posts
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Installed{" "}
                              {format(tool.installedAt, "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {canManageTools && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewPosts?.(tool.id)}
                            className="hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95"
                          >
                            <Eye className="h-4 w-4 transition-transform hover:scale-110" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onConfigure?.(tool.id)}
                            className="hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95"
                          >
                            <Settings className="h-4 w-4 transition-transform hover:rotate-90" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUninstall?.(tool.id)}
                            className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200 active:scale-95"
                          >
                            <Trash2 className="h-4 w-4 transition-transform hover:scale-110" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Catalog Tab */}
          <TabsContent value="catalog" className="space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 transition-all duration-300 focus:shadow-md"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="transition-all duration-200 active:scale-95"
                >
                  All
                </Button>
                {(Object.keys(CATEGORY_LABELS) as ToolCategory[]).map(
                  (category) => {
                    const Icon = CATEGORY_ICONS[category];
                    return (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="gap-2 transition-all duration-200 active:scale-95"
                      >
                        <Icon className="h-3 w-3 transition-transform hover:scale-110" />
                        {CATEGORY_LABELS[category]}
                      </Button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Tool Grid */}
            {filteredTools.length === 0 ? (
              <Card className="bg-card border-border p-8 text-center">
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                  <div className="p-3 rounded-full bg-muted/30">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-h4 font-h4">No tools found</h3>
                  <p className="text-body-sm font-body-sm text-muted-foreground">
                    Try adjusting your search or filters.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredTools.map((tool) => {
                  const Icon = CATEGORY_ICONS[tool.category];
                  const installed = isInstalled(tool.id);

                  return (
                    <Card
                      key={tool.id}
                      className={cn(
                        "bg-card border-border p-4",
                        "transition-all duration-300 ease-out group",
                        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-0.5",
                        installed && "border-primary/30 bg-primary/5"
                      )}
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-h5 font-h5 group-hover:text-primary transition-colors duration-200">
                                {tool.name}
                              </h3>
                              <p className="text-caption font-caption text-muted-foreground">
                                by {tool.authorName}
                              </p>
                            </div>
                          </div>

                          <Badge variant="muted" className="flex-shrink-0">
                            {CATEGORY_LABELS[tool.category]}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-body-sm font-body-sm text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-caption font-caption text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tool.installCount} installs
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            {tool.rating.toFixed(1)}★
                          </span>
                        </div>

                        {/* Action */}
                        {canManageTools && (
                          <Button
                            variant={installed ? "outline" : "default"}
                            size="sm"
                            onClick={() => !installed && onInstall?.(tool.id)}
                            disabled={installed || isLoading}
                            className={cn(
                              "w-full gap-2",
                              !installed &&
                                "hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95"
                            )}
                          >
                            {installed ? (
                              <>
                                <Zap className="h-4 w-4" />
                                Installed
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                                Install Tool
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
);

ToolsCatalog.displayName = "ToolsCatalog";
