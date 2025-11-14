'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pin } from 'lucide-react';
import { MotionDiv } from '../../../shells/motion-safe.js';
import { HiveCard } from '../../00-Global/atoms/hive-card.js';
const HIVE_EASING = {
    reveal: [0.23, 1, 0.32, 1],
};
export function PinnedPostsStack({ posts, onPostClick }) {
    // Only show up to 2 posts (enforce space rule)
    const displayPosts = posts.slice(0, 2);
    if (displayPosts.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 px-1", children: [_jsx(Pin, { className: "w-3.5 h-3.5 text-hive-brand-primary" }), _jsx("span", { className: "text-[10px] font-medium uppercase tracking-[0.18em] text-white/50", children: "Pinned by Leaders" })] }), _jsx("div", { className: "space-y-2", children: displayPosts.map((post, index) => (_jsx(MotionDiv, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: {
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: HIVE_EASING.reveal,
                    }, children: _jsx(HiveCard, { variant: "default", className: "border-l-4 border-l-hive-brand-primary bg-hive-brand-primary/5 hover:bg-hive-brand-primary/8 transition-colors cursor-pointer", onClick: () => onPostClick?.(post.id), children: _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [post.authorAvatar && (_jsx("img", { src: post.authorAvatar, alt: post.authorName, className: "w-8 h-8 rounded-full" })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white truncate", children: post.authorName }), _jsx("p", { className: "text-xs text-white/50", children: post.timestamp })] })] }), _jsx("p", { className: "text-sm text-white/90 line-clamp-3", children: post.content }), post.imageUrl && (_jsx("div", { className: "rounded-lg overflow-hidden border border-white/10", children: _jsx("img", { src: post.imageUrl, alt: "", className: "w-full h-auto max-h-64 object-cover" }) }))] }) }) }, post.id))) }), _jsx("p", { className: "text-[10px] text-white/30 px-1", children: "Pins expire after 7 days" })] }));
}
//# sourceMappingURL=pinned-posts-stack.js.map