"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { Button } from "../../atomic/atoms/button-enhanced";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../ui/alert-dialog";
import { Heart, MoreHorizontal, Edit3, Trash2, Pin, Flag, Image as ImageIcon, BarChart3, Calendar, Wrench, Loader2, } from "lucide-react";
import { cn } from "../../lib/utils";
const POST_TYPE_ICONS = {
    text: null,
    image: ImageIcon,
    poll: BarChart3,
    event: Calendar,
    toolshare: Wrench,
};
const POST_TYPE_COLORS = {
    text: "default",
    image: "blue",
    poll: "green",
    event: "purple",
    toolshare: "orange",
};
export const PostCard = ({ post, currentUser, onReact, onEdit, onDelete, onPin, onFlag, className, }) => {
    const [isReacting, setIsReacting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isAuthor = post.authorId === currentUser.id;
    const canModerate = currentUser.role === "builder" || currentUser.role === "admin";
    const canEdit = isAuthor && !post.isDeleted;
    const canDelete = (isAuthor || canModerate) && !post.isDeleted;
    const canPin = canModerate && !post.isDeleted;
    const canFlag = !isAuthor && !post.isDeleted && !post.isFlagged;
    // Check if user has reacted
    const userHasReacted = post.reactedUsers?.heart?.includes(currentUser.id) || false;
    // Calculate if the post can be edited (within edit window)
    const now = new Date();
    const createdAt = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);
    const editWindowMs = 15 * 60 * 1000; // 15 minutes
    const canEditTime = now.getTime() - createdAt.getTime() <= editWindowMs;
    const canEditNow = canEdit && canEditTime;
    const handleReact = async () => {
        if (isReacting)
            return;
        setIsReacting(true);
        try {
            const action = userHasReacted ? "remove" : "add";
            await onReact(post.id, "heart", action);
        }
        catch (error) {
            console.error("Error reacting to post:", error);
        }
        finally {
            setIsReacting(false);
        }
    };
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(post.id);
            setShowDeleteDialog(false);
        }
        catch (error) {
            console.error("Error deleting post:", error);
        }
        finally {
            setIsDeleting(false);
        }
    };
    const handlePin = async () => {
        if (!onPin)
            return;
        try {
            await onPin(post.id, !post.isPinned);
        }
        catch (error) {
            console.error("Error pinning post:", error);
        }
    };
    const handleFlag = async () => {
        if (!onFlag)
            return;
        try {
            await onFlag(post.id, "Inappropriate content");
        }
        catch (error) {
            console.error("Error flagging post:", error);
        }
    };
    const formatContent = (content) => {
        // Simple mention highlighting - in production, use proper rich text rendering
        return content.replace(/@(\w+)/g, '<span class="text-primary font-medium">@$1</span>');
    };
    const TypeIcon = POST_TYPE_ICONS[post.type] || null;
    return (_jsxs(_Fragment, { children: [_jsx(Card, { className: cn("transition-colors hover:bg-muted/50", post.isPinned && "border-primary/50 bg-primary/5", post.isFlagged && "border-destructive/50 bg-destructive/5", className), children: _jsxs(CardContent, { className: "p-4", children: [post.isPinned && (_jsxs("div", { className: "flex items-center gap-2 mb-3 text-sm text-primary", children: [_jsx(Pin, { className: "h-4 w-4" }), _jsx("span", { className: "font-medium", children: "Pinned Post" })] })), _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10", children: [_jsx(AvatarImage, { src: post.author.photoURL, alt: post.author.fullName }), _jsx(AvatarFallback, { children: post.author.fullName
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase() })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: "font-semibold text-sm", children: post.author.fullName }), _jsxs("span", { className: "text-muted-foreground text-sm", children: ["@", post.author.handle] }), post.author.role && post.author.role !== "member" && (_jsx(Badge, { variant: "secondary", className: "text-xs capitalize", children: post.author.role })), post.type !== "text" && (_jsxs(Badge, { variant: "outline", className: cn("text-xs", POST_TYPE_COLORS[post.type] === "blue" &&
                                                                "border-blue-200 text-blue-700", POST_TYPE_COLORS[post.type] === "green" &&
                                                                "border-green-200 text-green-700", POST_TYPE_COLORS[post.type] === "purple" &&
                                                                "border-purple-200 text-purple-700", POST_TYPE_COLORS[post.type] === "orange" &&
                                                                "border-orange-200 text-orange-700"), children: [TypeIcon && _jsx(TypeIcon, { className: "h-3 w-3 mr-1" }), post.type] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mt-1", children: [_jsx("time", { dateTime: post.createdAt.toString(), children: formatDistanceToNow(createdAt, { addSuffix: true }) }), post.isEdited && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: "(edited)" })] }))] })] })] }), (canEditNow || canDelete || canPin || canFlag) && (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [canEditNow && onEdit && (_jsxs(DropdownMenuItem, { onClick: () => onEdit(post.id), children: [_jsx(Edit3, { className: "h-4 w-4 mr-2" }), "Edit"] })), canPin && (_jsxs(DropdownMenuItem, { onClick: () => void handlePin(), children: [_jsx(Pin, { className: "h-4 w-4 mr-2" }), post.isPinned ? "Unpin" : "Pin"] })), canFlag && (_jsxs(DropdownMenuItem, { onClick: () => void handleFlag(), children: [_jsx(Flag, { className: "h-4 w-4 mr-2" }), "Report"] })), (canEditNow || canPin || canFlag) && canDelete && (_jsx(DropdownMenuSeparator, {})), canDelete && (_jsxs(DropdownMenuItem, { onClick: () => setShowDeleteDialog(true), className: "text-destructive focus:text-destructive", children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete"] }))] })] }))] }), _jsx("div", { className: "mb-4", children: post.isDeleted ? (_jsx("div", { className: "text-muted-foreground italic text-sm", children: post.content })) : (_jsx("div", { className: "text-sm leading-relaxed whitespace-pre-wrap break-words", dangerouslySetInnerHTML: {
                                    __html: formatContent(post.content),
                                } })) }), !post.isDeleted && post.type === "poll" && post.pollMetadata && (_jsxs("div", { className: "mb-4 p-3 bg-muted/50 rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-2", children: post.pollMetadata.question }), _jsx("div", { className: "space-y-2", children: post.pollMetadata.options.map((option, index) => (_jsx("div", { className: "text-sm p-2 bg-background rounded border", children: option }, index))) })] })), !post.isDeleted && post.type === "event" && post.eventMetadata && (_jsxs("div", { className: "mb-4 p-3 bg-muted/50 rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-1", children: post.eventMetadata.title }), post.eventMetadata.description && (_jsx("div", { className: "text-sm text-muted-foreground mb-2", children: post.eventMetadata.description })), _jsx("div", { className: "text-xs text-muted-foreground", children: new Date(post.eventMetadata.startTime).toLocaleString() })] })), !post.isDeleted && (_jsx("div", { className: "flex items-center gap-4", children: _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => void handleReact(), disabled: isReacting, className: cn("h-8 px-3 gap-2 transition-colors", userHasReacted
                                    ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                                    : "text-muted-foreground hover:text-red-500 hover:bg-red-50"), children: [isReacting ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(Heart, { className: cn("h-4 w-4 transition-all", userHasReacted && "fill-current") })), _jsx("span", { className: "text-sm font-medium", children: post.reactions.heart > 0 ? post.reactions.heart : "" })] }) }))] }) }), _jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete Post" }), _jsx(AlertDialogDescription, { children: "Are you sure you want to delete this post? This action cannot be undone. The post will be replaced with a placeholder for 24 hours before being permanently removed." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { disabled: isDeleting, children: "Cancel" }), _jsx(AlertDialogAction, { onClick: () => void handleDelete(), disabled: isDeleting, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: isDeleting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Deleting..."] })) : ("Delete") })] })] }) })] }));
};
//# sourceMappingURL=post-card.js.map