"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { Button } from "../../atomic/atoms/button-enhanced";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Heart,
  MoreHorizontal,
  Edit3,
  Trash2,
  Pin,
  Flag,
  Image as ImageIcon,
  BarChart3,
  Calendar,
  Wrench,
  Loader2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { Post } from "@hive/core";
// import { PostType } from '@hive/core'

interface PostCardProps {
  post: Post & {
    author: {
      id: string;
      fullName: string;
      handle: string;
      photoURL?: string;
      role?: "member" | "builder" | "admin"
    }
  };
  currentUser: {
    id: string;
    role?: "member" | "builder" | "admin"
  };
  onReact: (
    postId: string,
    reaction: "heart",
    action: "add" | "remove"
  ) => Promise<void>;
  onEdit?: (postId: string) => void;
  onDelete: (postId: string) => Promise<void>;
  onPin?: (postId: string, pin: boolean) => Promise<void>;
  onFlag?: (postId: string, reason?: string) => Promise<void>;
  className?: string
}

const POST_TYPE_ICONS = {
  text: null,
  image: ImageIcon,
  poll: BarChart3,
  event: Calendar,
  toolshare: Wrench,
} as const;

const POST_TYPE_COLORS = {
  text: "default",
  image: "blue",
  poll: "green",
  event: "purple",
  toolshare: "orange",
} as const;

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onReact,
  onEdit,
  onDelete,
  onPin,
  onFlag,
  className,
}) => {
  const [isReacting, setIsReacting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = post.authorId === currentUser.id;
  const canModerate =
    currentUser.role === "builder" || currentUser.role === "admin";
  const canEdit = isAuthor && !post.isDeleted;
  const canDelete = (isAuthor || canModerate) && !post.isDeleted;
  const canPin = canModerate && !post.isDeleted;
  const canFlag = !isAuthor && !post.isDeleted && !post.isFlagged;

  // Check if user has reacted
  const userHasReacted =
    post.reactedUsers?.heart?.includes(currentUser.id) || false;

  // Calculate if the post can be edited (within edit window)
  const now = new Date();
  const createdAt: Date =
    post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);
  const editWindowMs = 15 * 60 * 1000; // 15 minutes
  const canEditTime = now.getTime() - createdAt.getTime() <= editWindowMs;
  const canEditNow = canEdit && canEditTime;

  const handleReact = async () => {
    if (isReacting) return;

    setIsReacting(true);
    try {
      const action = userHasReacted ? "remove" : "add";
      await onReact(post.id, "heart", action)
    } catch (error) {
      console.error("Error reacting to post:", error)
    } finally {
      setIsReacting(false)
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(post.id);
      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Error deleting post:", error)
    } finally {
      setIsDeleting(false)
    }
  };

  const handlePin = async () => {
    if (!onPin) return;
    try {
      await onPin(post.id, !post.isPinned)
    } catch (error) {
      console.error("Error pinning post:", error)
    }
  };

  const handleFlag = async () => {
    if (!onFlag) return;
    try {
      await onFlag(post.id, "Inappropriate content")
    } catch (error) {
      console.error("Error flagging post:", error)
    }
  };

  const formatContent = (content: string) => {
    // Simple mention highlighting - in production, use proper rich text rendering
    return content.replace(
      /@(\w+)/g,
      '<span class="text-primary font-medium">@$1</span>'
    )
  };

  const TypeIcon =
    (POST_TYPE_ICONS[post.type] as React.ComponentType<{
      className?: string
    }>) || null;

  return (
    <>
      <Card
        className={cn(
          "transition-colors hover:bg-muted/50",
          post.isPinned && "border-primary/50 bg-primary/5",
          post.isFlagged && "border-destructive/50 bg-destructive/5",
          className
        )}
      >
        <CardContent className="p-4">
          {/* Pinned Badge */}
          {post.isPinned && (
            <div className="flex items-center gap-2 mb-3 text-sm text-primary">
              <Pin className="h-4 w-4" />
              <span className="font-medium">Pinned Post</span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post.author.photoURL}
                  alt={post.author.fullName}
                />
                <AvatarFallback>
                  {post.author.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">
                    {post.author.fullName}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    @{post.author.handle}
                  </span>

                  {post.author.role && post.author.role !== "member" && (
                    <Badge variant="secondary" className="text-xs capitalize">
                      {post.author.role}
                    </Badge>
                  )}

                  {post.type !== "text" && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        POST_TYPE_COLORS[post.type] === "blue" &&
                          "border-blue-200 text-blue-700",
                        POST_TYPE_COLORS[post.type] === "green" &&
                          "border-green-200 text-green-700",
                        POST_TYPE_COLORS[post.type] === "purple" &&
                          "border-purple-200 text-purple-700",
                        POST_TYPE_COLORS[post.type] === "orange" &&
                          "border-orange-200 text-orange-700"
                      )}
                    >
                      {TypeIcon && <TypeIcon className="h-3 w-3 mr-1" />}
                      {post.type}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <time dateTime={post.createdAt.toString()}>
                    {formatDistanceToNow(createdAt, { addSuffix: true }}
                  </time>

                  {post.isEdited && (
                    <>
                      <span>•</span>
                      <span>(edited)</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            {(canEditNow || canDelete || canPin || canFlag) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canEditNow && onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(post.id)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  )}

                  {canPin && (
                    <DropdownMenuItem onClick={() => void handlePin()}>
                      <Pin className="h-4 w-4 mr-2" />
                      {post.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                  )}

                  {canFlag && (
                    <DropdownMenuItem onClick={() => void handleFlag()}>
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  )}

                  {(canEditNow || canPin || canFlag) && canDelete && (
                    <DropdownMenuSeparator />
                  )}

                  {canDelete && (
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Content */}
          <div className="mb-4">
            {post.isDeleted ? (
              <div className="text-muted-foreground italic text-sm">
                {post.content}
              </div>
            ) : (
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{
                  __html: formatContent(post.content),
          }}
              />
            )}
          </div>

          {/* Type-specific content */}
          {!post.isDeleted && post.type === "poll" && post.pollMetadata && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="font-medium text-sm mb-2">
                {post.pollMetadata.question}
              </div>
              <div className="space-y-2">
                {post.pollMetadata.options.map((option, index) => (
                  <div
                    key={index}
                    className="text-sm p-2 bg-background rounded border"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!post.isDeleted && post.type === "event" && post.eventMetadata && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="font-medium text-sm mb-1">
                {post.eventMetadata.title}
              </div>
              {post.eventMetadata.description && (
                <div className="text-sm text-muted-foreground mb-2">
                  {post.eventMetadata.description}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                {new Date(post.eventMetadata.startTime).toLocaleString()}
              </div>
            </div>
          )}

          {/* Reactions */}
          {!post.isDeleted && (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void handleReact()}
                disabled={isReacting}
                className={cn(
                  "h-8 px-3 gap-2 transition-colors",
                  userHasReacted
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                    : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
                )}
              >
                {isReacting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-all",
                      userHasReacted && "fill-current"
                    )}
                  />
                )}
                <span className="text-sm font-medium">
                  {post.reactions.heart > 0 ? post.reactions.heart : ""}
                </span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone. The post will be replaced with a placeholder for 24 hours
              before being permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};
