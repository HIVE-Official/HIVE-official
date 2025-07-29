"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Star, ThumbsUp, Flag, ShieldCheck, MessageSquare, Filter } from 'lucide-react';
import { HiveCard as Card } from '../hive-card';
import { HiveButton as Button } from '../hive-button';
import { HiveBadge as Badge } from '../hive-badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../../index';
import { HiveInput as Input } from '../hive-input';
import { cn } from '../../lib/utils';
const StarRating = ({ rating, size = 'md', interactive = false, onChange }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };
    return (_jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx(Star, { className: cn(sizeClasses[size], 'transition-colors', interactive && 'cursor-pointer', (hoverRating || rating) >= star
                ? 'fill-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]'
                : 'text-[var(--hive-text-disabled)] hover:text-[var(--hive-brand-secondary)]/50'), onClick: () => interactive && onChange?.(star), onMouseEnter: () => interactive && setHoverRating(star), onMouseLeave: () => interactive && setHoverRating(0) }, star))) }));
};
const RatingDistribution = ({ summary }) => {
    return (_jsx("div", { className: "space-y-2", children: [5, 4, 3, 2, 1].map((stars) => {
            const count = summary.distribution[stars];
            const percentage = summary.total > 0 ? (count / summary.total) * 100 : 0;
            return (_jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1 w-12", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: stars }), _jsx(Star, { className: "h-3 w-3 fill-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]" })] }), _jsx("div", { className: "flex-1 bg-[var(--hive-interactive-active)] rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300", style: { width: `${percentage}%` } }) }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] w-8 text-right", children: count })] }, stars));
        }) }));
};
const ReviewForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        title: '',
        content: '',
        pros: [''],
        cons: [''],
        useCase: ''
    });
    const updatePros = (index, value) => {
        const newPros = [...formData.pros];
        newPros[index] = value;
        if (value && index === newPros.length - 1)
            newPros.push('');
        setFormData({ ...formData, pros: newPros.filter((pro, i) => pro || i < newPros.length - 1) });
    };
    const updateCons = (index, value) => {
        const newCons = [...formData.cons];
        newCons[index] = value;
        if (value && index === newCons.length - 1)
            newCons.push('');
        setFormData({ ...formData, cons: newCons.filter((con, i) => con || i < newCons.length - 1) });
    };
    const canSubmit = formData.rating > 0 && formData.title.trim() && formData.content.trim();
    return (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-6", children: "Write a Review" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Rating ", _jsx("span", { className: "text-red-400", children: "*" })] }), _jsx(StarRating, { rating: formData.rating, size: "lg", interactive: true, onChange: (rating) => setFormData({ ...formData, rating }) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Review Title ", _jsx("span", { className: "text-red-400", children: "*" })] }), _jsx(Input, { value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), placeholder: "Summarize your experience", className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", maxLength: 100 })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Review Content ", _jsx("span", { className: "text-red-400", children: "*" })] }), _jsx(Textarea, { value: formData.content, onChange: (e) => setFormData({ ...formData, content: e.target.value }), placeholder: "Share your detailed experience with this tool...", className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] min-h-[30]", maxLength: 1000 }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: [formData.content.length, "/1000 characters"] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "What did you like? (Optional)" }), _jsx("div", { className: "space-y-2", children: formData.pros.map((pro, index) => (_jsx(Input, { value: pro, onChange: (e) => updatePros(index, e.target.value), placeholder: `Pro ${index + 1}`, className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" }, index))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "What could be improved? (Optional)" }), _jsx("div", { className: "space-y-2", children: formData.cons.map((con, index) => (_jsx(Input, { value: con, onChange: (e) => updateCons(index, e.target.value), placeholder: `Con ${index + 1}`, className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" }, index))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "How do you use this tool? (Optional)" }), _jsx(Input, { value: formData.useCase, onChange: (e) => setFormData({ ...formData, useCase: e.target.value }), placeholder: "e.g., For managing group projects, Creating polls for events...", className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]" })] }), _jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-[var(--hive-interactive-active)]", children: [_jsx(Button, { onClick: () => onSubmit(formData), disabled: !canSubmit, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: "Submit Review" }), _jsx(Button, { onClick: onCancel, variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: "Cancel" })] })] })] }));
};
const ReviewCard = ({ review, onHelpful, onReport }) => {
    const [showReport, setShowReport] = useState(false);
    return (_jsx(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { className: "h-10 w-10", children: [_jsx(AvatarImage, { src: review.user?.avatar }), _jsx(AvatarFallback, { className: "bg-[var(--hive-interactive-active)] text-[var(--hive-text-primary)]", children: review.user?.displayName?.[0] || 'U' })] }), _jsxs("div", { className: "flex-1 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: review.user?.displayName || 'Anonymous User' }), review.user?.verified && (_jsx(ShieldCheck, { className: "h-4 w-4 text-blue-400" })), review.verified && (_jsx(Badge, { variant: "outline", className: "border-green-400/30 text-green-400 text-xs", children: "Verified User" }))] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-tertiary)]", children: [_jsx(StarRating, { rating: review.rating, size: "sm" }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: new Date(review.createdAt).toLocaleDateString() })] })] }), _jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] text-lg", children: review.title }), _jsx("p", { className: "text-[var(--hive-text-secondary)] leading-relaxed", children: review.content }), (review.pros?.length || review.cons?.length) && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-2", children: [review.pros?.length && (_jsxs("div", { children: [_jsx("h5", { className: "text-sm font-medium text-green-400 mb-2", children: "\uD83D\uDC4D Pros" }), _jsx("ul", { className: "space-y-1", children: review.pros.map((pro, index) => (_jsxs("li", { className: "text-sm text-[var(--hive-text-tertiary)]", children: ["\u2022 ", pro] }, index))) })] })), review.cons?.length && (_jsxs("div", { children: [_jsx("h5", { className: "text-sm font-medium text-red-400 mb-2", children: "\uD83D\uDC4E Cons" }), _jsx("ul", { className: "space-y-1", children: review.cons.map((con, index) => (_jsxs("li", { className: "text-sm text-[var(--hive-text-tertiary)]", children: ["\u2022 ", con] }, index))) })] }))] })), review.useCase && (_jsxs("div", { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)] rounded-lg p-3", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "\uD83D\uDCA1 Use Case" }), _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)]", children: review.useCase })] })), _jsxs("div", { className: "flex items-center gap-4 pt-2", children: [_jsxs("button", { onClick: () => onHelpful?.(true), className: "flex items-center gap-1 text-sm text-[var(--hive-text-tertiary)] hover:text-green-400 transition-colors", children: [_jsx(ThumbsUp, { className: "h-4 w-4" }), _jsx("span", { children: review.helpful })] }), _jsxs("button", { onClick: () => setShowReport(!showReport), className: "flex items-center gap-1 text-sm text-[var(--hive-text-tertiary)] hover:text-red-400 transition-colors", children: [_jsx(Flag, { className: "h-4 w-4" }), "Report"] }), review.version && (_jsxs(Badge, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-tertiary)] text-xs", children: ["v", review.version] }))] }), showReport && (_jsxs("div", { className: "bg-[var(--hive-interactive-hover)] rounded-lg p-4 space-y-3", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Report this review" }), _jsx("div", { className: "space-y-2", children: ['Inappropriate content', 'Spam', 'Fake review', 'Other'].map((reason) => (_jsx("button", { onClick: () => {
                                            onReport?.(reason);
                                            setShowReport(false);
                                        }, className: "block w-full text-left text-sm text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] p-2 rounded hover:bg-[var(--hive-interactive-hover)] transition-colors", children: reason }, reason))) })] }))] })] }) }));
};
export const ToolRatingSystem = ({ toolId, toolName, ratingSummary, reviews = [], canReview = false, onReviewSubmit, onReviewHelpful, onReviewReport, className }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [filterVerified, setFilterVerified] = useState(false);
    const handleReviewSubmit = async (data) => {
        await onReviewSubmit?.(data);
        setShowReviewForm(false);
    };
    const sortedReviews = [...reviews].sort((a, b) => {
        switch (sortBy) {
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'rating_high':
                return b.rating - a.rating;
            case 'rating_low':
                return a.rating - b.rating;
            case 'helpful':
                return b.helpful - a.helpful;
            default: // newest
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });
    const filteredReviews = filterVerified
        ? sortedReviews.filter(review => review.verified)
        : sortedReviews;
    return (_jsxs("div", { className: cn("space-y-8", className), children: [ratingSummary && (_jsx(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "text-center lg:text-left", children: _jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-4", children: [_jsx("div", { className: "text-5xl font-bold text-[var(--hive-text-primary)]", children: ratingSummary.average.toFixed(1) }), _jsxs("div", { className: "space-y-2", children: [_jsx(StarRating, { rating: Math.round(ratingSummary.average), size: "lg" }), _jsxs("div", { className: "text-sm text-[var(--hive-text-tertiary)]", children: ["Based on ", ratingSummary.total, " review", ratingSummary.total !== 1 ? 's' : ''] }), ratingSummary.verifiedCount > 0 && (_jsxs("div", { className: "text-xs text-green-400", children: [ratingSummary.verifiedCount, " verified purchase", ratingSummary.verifiedCount !== 1 ? 's' : ''] }))] })] }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Rating Breakdown" }), _jsx(RatingDistribution, { summary: ratingSummary })] })] }) })), _jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: ["Reviews (", filteredReviews.length, ")"] }), canReview && !showReviewForm && (_jsxs(Button, { onClick: () => setShowReviewForm(true), className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-2" }), "Write a Review"] }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setFilterVerified(!filterVerified), className: cn("border-[var(--hive-border-hover)]", filterVerified ? "bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]" : "text-[var(--hive-text-tertiary)]"), children: [_jsx(Filter, { className: "h-4 w-4 mr-1" }), "Verified Only"] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-hover)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "newest", children: "Newest" }), _jsx("option", { value: "oldest", children: "Oldest" }), _jsx("option", { value: "rating_high", children: "Highest Rated" }), _jsx("option", { value: "rating_low", children: "Lowest Rated" }), _jsx("option", { value: "helpful", children: "Most Helpful" })] })] })] }), showReviewForm && (_jsx(ReviewForm, { onSubmit: handleReviewSubmit, onCancel: () => setShowReviewForm(false) })), _jsx("div", { className: "space-y-6", children: filteredReviews.length > 0 ? (filteredReviews.map((review) => (_jsx(ReviewCard, { review: review, onHelpful: (helpful) => onReviewHelpful?.(review.id, helpful), onReport: (reason) => onReviewReport?.(review.id, reason) }, review.id)))) : (_jsxs(Card, { className: "p-12 text-center bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(MessageSquare, { className: "h-12 w-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "No reviews yet" }), _jsxs("p", { className: "text-[var(--hive-text-tertiary)] mb-4", children: ["Be the first to share your experience with ", toolName] }), canReview && !showReviewForm && (_jsx(Button, { onClick: () => setShowReviewForm(true), className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: "Write the First Review" }))] })) })] }));
};
export default ToolRatingSystem;
//# sourceMappingURL=tool-rating-system.js.map