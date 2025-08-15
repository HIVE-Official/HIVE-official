"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useRef, useEffect } from 'react';
import { usePullToRefresh, useSwipeGestures, useHapticFeedback, useMobileViewport } from '../../hooks/use-mobile-interactions';
import { Card, CardContent, Button, Badge } from '../index';
import { Heart, MessageCircle, Share2, Bookmark, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';
export function MobileFeed({ posts, onRefresh, onLoadMore, onLike, onBookmark, onShare, onComment, hasMore = false, isLoading = false }) {
    const { isMobile } = useMobileViewport();
    const { triggerHaptic } = useHapticFeedback();
    const [swipedPostId, setSwipedPostId] = useState(null);
    const feedRef = useRef(null);
    // Pull to refresh setup
    const { pullToRefreshHandlers, isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
        threshold: 80,
        onRefresh,
        resistance: 2.5,
        snapBackDuration: 300
    });
    // Handle post interactions with haptic feedback
    const handleLike = useCallback((postId) => {
        triggerHaptic('light');
        onLike(postId);
    }, [onLike, triggerHaptic]);
    const handleBookmark = useCallback((postId) => {
        triggerHaptic('medium');
        onBookmark(postId);
    }, [onBookmark, triggerHaptic]);
    const handleShare = useCallback((post) => {
        triggerHaptic('light');
        onShare(post);
    }, [onShare, triggerHaptic]);
    // Infinite scroll
    const handleScroll = useCallback(() => {
        if (!feedRef.current || isLoading || !hasMore)
            return;
        const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        if (scrollPercentage > 0.9) {
            onLoadMore();
        }
    }, [onLoadMore, isLoading, hasMore]);
    useEffect(() => {
        const feedElement = feedRef.current;
        if (!feedElement)
            return;
        feedElement.addEventListener('scroll', handleScroll, { passive: true });
        return () => feedElement.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    // Pull to refresh indicator
    const PullToRefreshIndicator = () => (_jsx("div", { className: "flex items-center justify-center py-4 transition-opacity duration-200", style: {
            transform: `translateY(${Math.max(0, pullDistance - 20)}px)`,
            opacity: pullDistance > 0 ? Math.min(pullDistance / 60, 1) : 0
        }, children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-5 w-5 animate-spin text-blue-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "Refreshing feed..." })] })) : canRefresh ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-5 w-5 text-blue-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "Release to refresh" })] })) : (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { className: "h-5 w-5 text-gray-400 mr-2 transition-transform duration-200", style: { transform: `rotate(${Math.min(pullDistance * 2, 180)}deg)` } }), _jsx("span", { className: "text-sm text-gray-400", children: "Pull to refresh" })] })) }));
    return (_jsxs("div", { className: "relative h-full overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 z-10", children: _jsx(PullToRefreshIndicator, {}) }), _jsx("div", { ref: feedRef, className: "h-full overflow-y-auto scrollbar-hide", style: {
                    transform: isPulling ? `translateY(${Math.min(pullDistance, 100)}px)` : 'translateY(0)',
                    transition: isPulling ? 'none' : 'transform 0.3s ease-out',
                    paddingTop: pullDistance > 0 ? `${Math.min(pullDistance, 80)}px` : '0'
                }, ...pullToRefreshHandlers, children: _jsxs("div", { className: "space-y-4 px-4 py-2", children: [posts.map((post) => (_jsx(MobilePostCard, { post: post, onLike: handleLike, onBookmark: handleBookmark, onShare: handleShare, onComment: onComment, isSwipedOut: swipedPostId === post.id }, post.id))), hasMore && (_jsx("div", { className: "flex items-center justify-center py-8", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-5 w-5 animate-spin text-blue-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "Loading more posts..." })] })) : (_jsx(Button, { onClick: onLoadMore, variant: "secondary", size: "sm", className: "touch-target-large", children: "Load More" })) })), !hasMore && posts.length > 0 && (_jsx("div", { className: "text-center py-8 text-gray-500 text-sm", children: "You're all caught up! \uD83C\uDF89" }))] }) })] }));
}
// Mobile-optimized post card component
function MobilePostCard({ post, onLike, onBookmark, onShare, onComment, isSwipedOut }) {
    const [isLikeAnimating, setIsLikeAnimating] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const { triggerHaptic } = useHapticFeedback();
    // Swipe gestures for quick actions
    const { swipeHandlers } = useSwipeGestures({
        threshold: 80,
        restrained: true,
        onSwipeLeft: () => {
            setShowQuickActions(true);
            triggerHaptic('selection');
            setTimeout(() => setShowQuickActions(false), 3000);
        },
        onSwipeRight: () => {
            // Quick like on right swipe
            handleLike();
        }
    });
    const handleLike = useCallback(() => {
        if (isLikeAnimating)
            return;
        setIsLikeAnimating(true);
        onLike(post.id);
        triggerHaptic(post.isLiked ? 'light' : 'medium');
        setTimeout(() => setIsLikeAnimating(false), 300);
    }, [post.id, post.isLiked, onLike, triggerHaptic, isLikeAnimating]);
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = diff / (1000 * 60 * 60);
        if (hours < 1) {
            return `${Math.floor(diff / (1000 * 60))}m`;
        }
        else if (hours < 24) {
            return `${Math.floor(hours)}h`;
        }
        else {
            return `${Math.floor(hours / 24)}d`;
        }
    };
    return (_jsx("div", { ...swipeHandlers, children: _jsxs(Card, { className: `relative overflow-hidden transition-all duration-300 ${isSwipedOut ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`, children: [showQuickActions && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-10 flex items-center justify-end px-4", children: _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => onBookmark(post.id), className: "text-white bg-blue-600/80 hover:bg-blue-600 touch-target-large", children: _jsx(Bookmark, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onShare(post), className: "text-white bg-purple-600/80 hover:bg-purple-600 touch-target-large", children: _jsx(Share2, { className: "h-4 w-4" }) })] }) })), _jsxs(CardContent, { className: "p-4 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium", children: post.author.name.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white text-sm", children: post.author.name }), _jsxs("div", { className: "text-gray-400 text-xs", children: ["@", post.author.handle, " \u2022 ", formatTimestamp(post.timestamp)] })] })] }), post.space && (_jsx(Badge, { variant: "outline", className: "text-xs", style: { borderColor: post.space.color, color: post.space.color }, children: post.space.name }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-gray-200 leading-relaxed", children: post.content }), post.preview && (_jsxs("div", { className: "border border-gray-700 rounded-lg overflow-hidden", children: [post.preview.image && (_jsx("img", { src: post.preview.image, alt: post.preview.title, className: "w-full h-32 object-cover" })), _jsxs("div", { className: "p-3", children: [post.preview.title && (_jsx("h4", { className: "font-medium text-white text-sm mb-1", children: post.preview.title })), post.preview.description && (_jsx("p", { className: "text-gray-400 text-xs leading-relaxed", children: post.preview.description }))] })] }))] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-800", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("button", { onClick: handleLike, className: `flex items-center space-x-2 text-sm transition-all duration-200 touch-target ${post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'} ${isLikeAnimating ? 'scale-110' : 'scale-100'}`, children: [_jsx(Heart, { className: `h-4 w-4 ${post.isLiked ? 'fill-current' : ''}` }), _jsx("span", { children: post.likes })] }), _jsxs("button", { onClick: () => onComment(post.id), className: "flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors touch-target", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { children: post.comments })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { onClick: () => onBookmark(post.id), className: `text-sm transition-colors touch-target ${post.isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'}`, children: _jsx(Bookmark, { className: `h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}` }) }), _jsx("button", { onClick: () => onShare(post), className: "text-sm text-gray-400 hover:text-blue-400 transition-colors touch-target", children: _jsx(Share2, { className: "h-4 w-4" }) })] })] })] })] }) }));
}
//# sourceMappingURL=mobile-feed.js.map