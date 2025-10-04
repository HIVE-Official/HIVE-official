"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { useTouchGestures } from "@hive/hooks";
import { Card } from "../atoms/card";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { Avatar } from "../atoms/avatar";
import { Heart, MessageCircle, Repeat2, Quote, Bookmark, MoreHorizontal, TrendingUp, } from "lucide-react";
const FeedPostCard = React.forwardRef(({ className, post, onReact, onComment, onRepost, onRequote, onSave, onHide, onSpaceClick, onAuthorClick, compact = false, enableMobileGestures = true, ...props }, ref) => {
    const [showFullContent, setShowFullContent] = React.useState(false);
    const isLongContent = post.content.length > 280;
    // Mobile touch gestures
    const { touchHandlers, triggerHaptic } = useTouchGestures({
        enableSwipe: enableMobileGestures,
        enableLongPress: enableMobileGestures,
        enableDoubleTap: enableMobileGestures,
        swipeThreshold: 80,
        longPressDuration: 600,
    }, {
        onSwipe: (data) => {
            if (data.direction === 'right' && data.distance > 100) {
                // Swipe right to save
                triggerHaptic('light');
                onSave?.(post.id);
            }
            else if (data.direction === 'left' && data.distance > 100) {
                // Swipe left to hide
                triggerHaptic('light');
                onHide?.(post.id);
            }
        },
        onDoubleTap: () => {
            // Double tap to react
            triggerHaptic('medium');
            onReact?.(post.id);
        },
        onLongPress: () => {
            // Long press to show more options
            triggerHaptic('heavy');
            // Could trigger context menu or additional actions
        }
    });
    return (_jsxs(Card, { ref: ref, className: cn("p-4 border transition-all duration-fast ease-smooth bg-[#0c0c0c] hover:shadow-md", 
        // Dark monochrome borders with smooth transitions
        post.isPromoted
            ? "border-l-4 border-l-[#FFD700] border-white/8 hover:border-white/20 hover:shadow-[#FFD700]/10"
            : "border-white/8 hover:border-white/20", className), ...(enableMobileGestures ? touchHandlers : {}), ...props, children: [post.isPromoted && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-white/70 mb-2", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-[#FFD700]" }), _jsx("span", { children: "Promoted by space leaders" })] })), post.friendActivity && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-white/70 mb-2", children: [_jsx("span", { className: "font-semibold text-white", children: post.friendActivity.names.slice(0, 2).join(", ") }), post.friendActivity.names.length > 2 && (_jsxs("span", { className: "font-semibold text-white", children: ["+", post.friendActivity.names.length - 2] })), _jsx("span", { children: post.friendActivity.action })] })), _jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx(Avatar, { className: "h-10 w-10 cursor-pointer border border-white/20", onClick: () => onAuthorClick?.(post.author.handle), children: post.author.avatar ? (_jsx("img", { src: post.author.avatar, alt: post.author.name })) : (_jsx("div", { className: "bg-white/10 text-white flex items-center justify-center text-sm font-bold", children: post.author.name.charAt(0) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => onAuthorClick?.(post.author.handle), className: "text-sm font-bold text-white hover:underline truncate", children: post.author.name }), _jsxs("span", { className: "text-xs text-white/50", children: ["@", post.author.handle] }), _jsx("span", { className: "text-xs text-white/50", children: "\u00B7" }), _jsx("span", { className: "text-xs text-white/50", children: post.timestamp })] }), _jsxs("button", { onClick: () => onSpaceClick?.(post.space.id), className: "flex items-center gap-1 mt-0.5 text-xs text-white/70 hover:text-white transition-colors", children: [_jsx("span", { children: "in" }), _jsx("span", { className: "font-semibold", children: post.space.name }), _jsxs(Badge, { variant: "freshman", className: "h-4 px-1 text-[9px] ml-1 border-white/20 text-white/70", children: [post.space.memberCount, " members"] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0 hover:bg-white/10", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }), post.requotedPost && (_jsxs("div", { className: "mb-3 p-3 border border-white/8 rounded-lg bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-xs font-semibold text-white", children: post.requotedPost.author }), _jsx("span", { className: "text-xs text-white/50", children: post.requotedPost.timestamp })] }), _jsx("p", { className: "text-sm text-white/70 line-clamp-3", children: post.requotedPost.content })] })), _jsxs("div", { className: "mb-3", children: [_jsx("p", { className: cn("text-sm text-white whitespace-pre-wrap", !showFullContent && isLongContent && "line-clamp-6"), children: post.content }), isLongContent && (_jsx("button", { onClick: () => setShowFullContent(!showFullContent), className: "text-xs text-white font-semibold hover:underline mt-1", children: showFullContent ? "Show less" : "Show more" }))] }), post.media && post.media.length > 0 && (_jsx("div", { className: cn("mb-3 rounded-lg overflow-hidden border border-white/20", post.media.length === 1 && "aspect-video", post.media.length === 2 && "grid grid-cols-2 gap-0.5", post.media.length > 2 && "grid grid-cols-2 gap-0.5"), children: post.media.slice(0, 4).map((item, idx) => (_jsxs("div", { className: "relative bg-white/5 aspect-square", children: [item.type === "image" ? (_jsx("img", { src: item.url, alt: "", className: "w-full h-full object-cover" })) : (_jsx("video", { src: item.url, className: "w-full h-full object-cover", controls: true })), post.media && post.media.length > 4 && idx === 3 && (_jsxs("div", { className: "absolute inset-0 bg-black/80 flex items-center justify-center text-white text-lg font-bold", children: ["+", post.media.length - 4] }))] }, idx))) })), post.comments.preview && post.comments.preview.length > 0 && (_jsx("div", { className: "mb-3 p-2 border border-white/8 rounded bg-white/5", children: _jsx("div", { className: "text-xs text-white/70 space-y-1", children: post.comments.preview.map((comment, idx) => (_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-white", children: comment.author }), " ", _jsx("span", { className: "line-clamp-1", children: comment.text })] }, idx))) }) })), !compact && (_jsxs("div", { className: "flex items-center gap-4 mb-2 text-xs text-white/50", children: [post.reactions.count > 0 && (_jsxs("span", { className: "font-medium", children: [post.reactions.topEmoji && _jsx("span", { className: "mr-1", children: post.reactions.topEmoji }), post.reactions.count, " reactions"] })), post.comments.count > 0 && _jsxs("span", { className: "font-medium", children: [post.comments.count, " comments"] }), (post.reposts.count > 0 || post.requotes.count > 0) && (_jsxs("span", { className: "font-medium", children: [post.reposts.count + post.requotes.count, " shares"] }))] })), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-white/8", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: cn("flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95", post.reactions.hasReacted && "text-white font-bold"), onClick: () => onReact?.(post.id), children: [_jsx(Heart, { className: cn("h-4 w-4 transition-all duration-fast ease-smooth", post.reactions.hasReacted && "fill-current scale-110") }), !compact && _jsx("span", { className: "text-xs font-medium", children: post.reactions.count || "React" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95", onClick: () => onComment?.(post.id), children: [_jsx(MessageCircle, { className: "h-4 w-4 transition-all duration-fast ease-smooth" }), !compact && _jsx("span", { className: "text-xs font-medium", children: post.comments.count || "Comment" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: cn("flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95", post.reposts.hasReposted && "text-white font-bold"), onClick: () => onRepost?.(post.id), children: [_jsx(Repeat2, { className: cn("h-4 w-4 transition-all duration-fast ease-smooth", post.reposts.hasReposted && "text-[#FFD700]") }), !compact && _jsx("span", { className: "text-xs font-medium", children: post.reposts.count || "Repost" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95", onClick: () => onRequote?.(post.id), children: [_jsx(Quote, { className: "h-4 w-4 transition-all duration-fast ease-smooth" }), !compact && _jsx("span", { className: "text-xs font-medium", children: "Requote" })] }), _jsx(Button, { variant: "ghost", size: "sm", className: cn("h-8 w-8 p-0 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95", post.saves.hasSaved && "text-[#FFD700] hover:text-[#FFD700]"), onClick: () => onSave?.(post.id), children: _jsx(Bookmark, { className: cn("h-4 w-4 transition-all duration-fast ease-smooth", post.saves.hasSaved && "fill-current scale-110") }) })] }), post.isTrending && (_jsx("div", { className: "mt-2 pt-2 border-t border-white/8", children: _jsxs("div", { className: "flex items-center gap-1 text-xs", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-[#FFD700]" }), _jsx("span", { className: "font-semibold text-white", children: "Trending on campus" })] }) }))] }));
});
FeedPostCard.displayName = "FeedPostCard";
export { FeedPostCard };
//# sourceMappingURL=feed-post-card.js.map