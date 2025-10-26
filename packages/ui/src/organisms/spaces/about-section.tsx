"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * AboutSection - Full about page with edit/view states
 *
 * View mode:
 * - Space description
 * - Tags
 * - Featured links
 * - Space metadata (type, verification, member count)
 * - Leader list
 *
 * Edit mode (leaders only):
 * - Edit description (textarea)
 * - Manage tags (add/remove)
 * - Manage featured links (add/edit/remove)
 * - Save/cancel actions
 */

import React, { useState } from "react";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Avatar } from "../../atoms/avatar";
import { Input } from "../../atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/card";
import { cn } from "../../utils/cn";
import type { Space, SpaceMember, SpaceLink } from "./types";
import {
  Info,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Crown,
  Users,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

export interface AboutSectionProps {
  /** Space data */
  space: Space;

  /** Space leaders/mods */
  leaders: SpaceMember[];

  /** Whether current user is a leader */
  isLeader?: boolean;

  /** Save changes handler */
  onSave?: (updates: {
    description: string;
    tags: string[];
  featuredLinks: SpaceLink[];
  }) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const AboutSection = React.forwardRef<HTMLDivElement, AboutSectionProps>(
  (
    { space, leaders, isLeader = false, onSave, isLoading = false, className },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(space.description);
    const [tags, setTags] = useState(space.tags);
    const [featuredLinks, setFeaturedLinks] = useState(space.featuredLinks);
    const [newTag, setNewTag] = useState("");
    const [newLinkLabel, setNewLinkLabel] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("");

    const handleSave = () => {
      if (onSave) {
        onSave({ description, tags, featuredLinks });
        setIsEditing(false);
      }
    };

    const handleCancel = () => {
      setDescription(space.description);
      setTags(space.tags);
      setFeaturedLinks(space.featuredLinks);
      setIsEditing(false);
    };

    const addTag = () => {
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag("");
      }
    };

    const removeTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    const addLink = () => {
      if (newLinkLabel && newLinkUrl) {
        setFeaturedLinks([
          ...featuredLinks,
          { label: newLinkLabel, url: newLinkUrl, iconName: "ExternalLink" },
        ]);
        setNewLinkLabel("");
        setNewLinkUrl("");
      }
    };

    const removeLink = (index: number) => {
      setFeaturedLinks(featuredLinks.filter((_, i) => i !== index));
    };

    return (
      <Card ref={ref} className={cn("bg-card border-border", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-h3 font-h3">About</CardTitle>
            </div>
            {isLeader && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
            {isEditing && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  variant="default"
                  size="sm"
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-body font-body font-semibold">Description</h3>
            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-background text-body font-body resize-y"
                placeholder="Describe your space..."
              />
            ) : (
              <p className="text-body font-body text-muted-foreground whitespace-pre-wrap">
                {description || "No description yet."}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-body font-body font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(
                    "gap-1 transition-all duration-200",
                    isEditing && "pr-1 hover:scale-105"
                  )}
                >
                  {tag}
                  {isEditing && (
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    placeholder="Add tag..."
                    className="h-7 w-32 text-xs"
                  />
                  <Button
                    onClick={addTag}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            {tags.length === 0 && !isEditing && (
              <p className="text-body-sm font-body-sm text-muted-foreground">
                No tags yet.
              </p>
            )}
          </div>

          {/* Featured Links */}
          <div className="space-y-2">
            <h3 className="text-body font-body font-semibold">Links</h3>
            <div className="space-y-2">
              {featuredLinks.map((link, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg border border-border/50",
                    "transition-all duration-200",
                    !isEditing && "hover:bg-muted/30 hover:border-primary/30"
                  )}
                >
                  <ExternalLink className="h-4 w-4 text-primary flex-shrink-0 transition-transform hover:scale-110" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-body-sm font-body-sm text-primary hover:underline truncate transition-all duration-200"
                  >
                    {link.label}
                  </a>
                  {isEditing && (
                    <Button
                      onClick={() => removeLink(index)}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    placeholder="Label"
                    className="h-8 text-xs flex-1"
                  />
                  <Input
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="URL"
                    className="h-8 text-xs flex-1"
                  />
                  <Button
                    onClick={addLink}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            {featuredLinks.length === 0 && !isEditing && (
              <p className="text-body-sm font-body-sm text-muted-foreground">
                No links yet.
              </p>
            )}
          </div>

          {/* Space metadata */}
          <div className="space-y-3 pt-4 border-t border-border/30">
            <h3 className="text-body font-body font-semibold">Space Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-caption font-caption text-muted-foreground mb-1">
                  Type
                </p>
                <Badge variant="outline">{space.type.replace("_", " ")}</Badge>
              </div>
              {space.isVerified && (
                <div>
                  <p className="text-caption font-caption text-muted-foreground mb-1">
                    Status
                  </p>
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              )}
              <div>
                <p className="text-caption font-caption text-muted-foreground mb-1">
                  Members
                </p>
                <div className="flex items-center gap-1 text-body-sm font-body-sm">
                  <Users className="h-4 w-4 text-primary" />
                  {space.memberCount.toLocaleString()}
                </div>
              </div>
              <div>
                <p className="text-caption font-caption text-muted-foreground mb-1">
                  Created
                </p>
                <div className="flex items-center gap-1 text-body-sm font-body-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  {format(new Date(space.createdAt), "MMM d, yyyy")}
                </div>
              </div>
            </div>
          </div>

          {/* Leaders */}
          {leaders.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border/30">
              <h3 className="text-body font-body font-semibold">Leadership</h3>
              <div className="space-y-2">
                {leaders.map((leader) => (
                  <div
                    key={leader.userId}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Avatar
                      src={leader.avatarUrl}
                      alt={leader.fullName}
                      fallback={leader.fullName[0]?.toUpperCase()}
                      className="h-10 w-10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-body-sm font-body-sm font-semibold truncate">
                          {leader.fullName}
                        </p>
                        {leader.role === "leader" ? (
                          <Crown className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <Shield className="h-4 w-4 text-secondary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-caption font-caption text-muted-foreground truncate">
                        @{leader.handle}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {leader.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

AboutSection.displayName = "AboutSection";
