import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Tool Review System
 * Complete reviews and ratings for tools in the marketplace
 */
import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar } from '../index';
import { HiveBadge as Badge } from '../index';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Flag, Edit3, Trash2, MoreHorizontal, Send, ChevronDown, TrendingUp, Award, CheckCircle, AlertTriangle, Search, X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const StarRating = ({ rating, size = 'md', interactive = false, onChange }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };
    const currentRating = interactive ? (hoverRating || rating) : rating;
    return (_jsx("div", { className: "flex items-center space-x-0.5", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { disabled: !interactive, onMouseEnter: () => interactive && setHoverRating(star), onMouseLeave: () => interactive && setHoverRating(0), onClick: () => interactive && onChange?.(star), className: `${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`, children: _jsx(Star, { className: `${sizeClasses[size]} transition-colors ${star <= currentRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'}` }) }, star))) }));
};
const RatingsSummary = ({ summary }) => {
    const maxCount = Math.max(...Object.values(summary.distribution));
    return (_jsxs("div", { className: "p-6 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl", children: [_jsxs("div", { className: "flex items-start justify-between mb-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("div", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: summary.averageRating.toFixed(1) }), _jsxs("div", { children: [_jsx(StarRating, { rating: summary.averageRating, size: "lg" }), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: [summary.totalReviews, " reviews"] })] })] }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: [(summary.recommendationRate * 100).toFixed(0), "% recommend"] }), _jsxs("span", { children: [(summary.verifiedPurchaseRate * 100).toFixed(0), "% verified"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 text-green-500 mb-1", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "Highly Rated" })] }), _jsxs(Badge, { variant: "secondary", className: "flex items-center space-x-1", children: [_jsx(Award, { className: "w-3 h-3" }), _jsx("span", { children: "Editor's Choice" })] })] })] }), _jsx("div", { className: "space-y-2 mb-6", children: [5, 4, 3, 2, 1].map((stars) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "flex items-center space-x-1 w-12", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: stars }), _jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-current" })] }), _jsx("div", { className: "flex-1 bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-yellow-400 h-2 rounded-full transition-all duration-300", style: {
                                    width: `${maxCount > 0 ? (summary.distribution[stars] / maxCount) * 100 : 0}%`
                                } }) }), _jsx("span", { className: "text-sm text-[var(--hive-text-muted)] w-8 text-right", children: summary.distribution[stars] })] }, stars))) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Category Breakdown" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(summary.categories).map(([category, rating]) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)] capitalize", children: category }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: rating.toFixed(1) })] }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] rounded-full h-1.5", children: _jsx("div", { className: "bg-[var(--hive-primary)] h-1.5 rounded-full transition-all duration-300", style: { width: `${(rating / 5) * 100}%` } }) })] }, category))) })] })] }));
};
const ReviewForm = ({ toolId, existingReview, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: existingReview?.rating || 0,
        title: existingReview?.title || '',
        content: existingReview?.content || '',
        pros: existingReview?.pros || [''],
        cons: existingReview?.cons || [''],
        useCase: existingReview?.useCase || '',
        wouldRecommend: existingReview?.wouldRecommend ?? true,
        usageDuration: existingReview?.usageDuration || '1month',
        categories: existingReview?.categories || []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (formData.rating === 0)
            newErrors.rating = 'Please select a rating';
        if (!formData.title.trim())
            newErrors.title = 'Title is required';
        if (!formData.content.trim())
            newErrors.content = 'Review content is required';
        if (formData.content.length < 50)
            newErrors.content = 'Review must be at least 50 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = useCallback(async () => {
        if (!validateForm() || isSubmitting)
            return;
        setIsSubmitting(true);
        try {
            const reviewData = {
                ...formData,
                toolId,
                userId: '', // Will be set by the API
                pros: formData.pros.filter(p => p.trim()),
                cons: formData.cons.filter(c => c.trim()),
                helpfulVotes: 0,
                unhelpfulVotes: 0,
                userVote: null,
                replies: []
            };
            await onSubmit(reviewData);
            onCancel?.();
        }
        catch (error) {
            console.error('Failed to submit review:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [formData, toolId, onSubmit, onCancel, isSubmitting]);
    const addPro = () => setFormData(prev => ({ ...prev, pros: [...prev.pros, ''] }));
    const removePro = (index) => setFormData(prev => ({
        ...prev,
        pros: prev.pros.filter((_, i) => i !== index)
    }));
    const updatePro = (index, value) => setFormData(prev => ({
        ...prev,
        pros: prev.pros.map((p, i) => i === index ? value : p)
    }));
    const addCon = () => setFormData(prev => ({ ...prev, cons: [...prev.cons, ''] }));
    const removeCon = (index) => setFormData(prev => ({
        ...prev,
        cons: prev.cons.filter((_, i) => i !== index)
    }));
    const updateCon = (index, value) => setFormData(prev => ({
        ...prev,
        cons: prev.cons.map((c, i) => i === index ? value : c)
    }));
    return (_jsxs("div", { className: "p-6 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-6", children: existingReview ? 'Edit Your Review' : 'Write a Review' }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Overall Rating *" }), _jsx(StarRating, { rating: formData.rating, size: "lg", interactive: true, onChange: (rating) => setFormData(prev => ({ ...prev, rating })) }), errors.rating && (_jsx("p", { className: "text-sm text-red-400 mt-1", children: errors.rating }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Review Title *" }), _jsx("input", { type: "text", value: formData.title, onChange: (e) => setFormData(prev => ({ ...prev, title: e.target.value })), placeholder: "Summarize your experience...", className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" }), errors.title && (_jsx("p", { className: "text-sm text-red-400 mt-1", children: errors.title }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Review Content *" }), _jsx("textarea", { value: formData.content, onChange: (e) => setFormData(prev => ({ ...prev, content: e.target.value })), placeholder: "Share your detailed experience with this tool...", rows: 6, className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)] resize-none" }), _jsxs("div", { className: "flex items-center justify-between mt-1", children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: [formData.content.length, "/1000 characters"] }), errors.content && (_jsx("p", { className: "text-sm text-red-400", children: errors.content }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Pros" }), _jsxs("div", { className: "space-y-2", children: [formData.pros.map((pro, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: pro, onChange: (e) => updatePro(index, e.target.value), placeholder: "What did you like?", className: "flex-1 p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-green-500" }), _jsx(Button, { variant: "ghost", size: "xs", onClick: () => removePro(index), className: "text-red-400 hover:text-red-300", children: _jsx(X, { className: "w-3 h-3" }) })] }, index))), _jsx(Button, { variant: "outline", size: "sm", onClick: addPro, className: "w-full border-dashed", children: "Add Pro" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Cons" }), _jsxs("div", { className: "space-y-2", children: [formData.cons.map((con, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: con, onChange: (e) => updateCon(index, e.target.value), placeholder: "What could be improved?", className: "flex-1 p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-red-500" }), _jsx(Button, { variant: "ghost", size: "xs", onClick: () => removeCon(index), className: "text-red-400 hover:text-red-300", children: _jsx(X, { className: "w-3 h-3" }) })] }, index))), _jsx(Button, { variant: "outline", size: "sm", onClick: addCon, className: "w-full border-dashed", children: "Add Con" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Use Case (Optional)" }), _jsx("input", { type: "text", value: formData.useCase, onChange: (e) => setFormData(prev => ({ ...prev, useCase: e.target.value })), placeholder: "How did you use this tool?", className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Usage Duration" }), _jsxs("select", { value: formData.usageDuration, onChange: (e) => setFormData(prev => ({ ...prev, usageDuration: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "1week", children: "Less than a week" }), _jsx("option", { value: "1month", children: "1 month" }), _jsx("option", { value: "3months", children: "3 months" }), _jsx("option", { value: "6months", children: "6 months" }), _jsx("option", { value: "1year+", children: "1 year or more" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Recommendation" }), _jsxs("div", { className: "flex items-center space-x-4 mt-3", children: [_jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [_jsx("input", { type: "radio", checked: formData.wouldRecommend, onChange: () => setFormData(prev => ({ ...prev, wouldRecommend: true })), className: "text-[var(--hive-primary)]" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Yes, I recommend this" })] }), _jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [_jsx("input", { type: "radio", checked: !formData.wouldRecommend, onChange: () => setFormData(prev => ({ ...prev, wouldRecommend: false })), className: "text-[var(--hive-primary)]" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "No, I don't recommend" })] })] })] })] }), _jsxs("div", { className: "flex items-center justify-end space-x-3 pt-4 border-t border-[var(--hive-border-subtle)]", children: [onCancel && (_jsx(Button, { variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancel" })), _jsxs(Button, { onClick: handleSubmit, disabled: isSubmitting, className: "bg-[var(--hive-primary)] text-white", children: [isSubmitting ? (_jsx("div", { className: "w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-2" })) : null, existingReview ? 'Update Review' : 'Submit Review'] })] })] })] }));
};
const ReviewItem = ({ review, currentUserId, onVote, onReply, onEdit, onDelete, onReport }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);
    const isOwnReview = currentUserId === review.userId;
    const totalVotes = review.helpfulVotes + review.unhelpfulVotes;
    const helpfulPercentage = totalVotes > 0 ? (review.helpfulVotes / totalVotes) * 100 : 0;
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0)
            return 'Today';
        if (diffDays === 1)
            return 'Yesterday';
        if (diffDays < 30)
            return `${diffDays} days ago`;
        if (diffDays < 365)
            return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };
    const handleVote = useCallback(async (vote) => {
        await onVote?.(review.id, vote);
    }, [review.id, onVote]);
    const handleReply = useCallback(async () => {
        if (!replyContent.trim() || isSubmittingReply)
            return;
        setIsSubmittingReply(true);
        try {
            await onReply?.(review.id, replyContent);
            setReplyContent('');
            setShowReplyForm(false);
            setShowReplies(true);
        }
        finally {
            setIsSubmittingReply(false);
        }
    }, [review.id, replyContent, onReply, isSubmittingReply]);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-6 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { src: review.author.avatar, initials: review.author.name.charAt(0), size: "md" }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: review.author.name }), review.author.isVerified && (_jsx(CheckCircle, { className: "w-4 h-4 text-[var(--hive-primary)]" })), review.isVerifiedPurchase && (_jsx(Badge, { size: "xs", className: "bg-green-500/10 text-green-400 border-green-500/20", children: "Verified" }))] }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["@", review.author.handle] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTimeAgo(review.timestamp) }), review.isEdited && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: "Edited" })] }))] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(StarRating, { rating: review.rating, size: "sm" }), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowMenu(!showMenu), children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]", children: isOwnReview ? (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                            onEdit?.(review.id);
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Edit3, { className: "w-3 h-3" }), "Edit Review"] }), _jsxs("button", { onClick: () => {
                                                            onDelete?.(review.id);
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-red-400", children: [_jsx(Trash2, { className: "w-3 h-3" }), "Delete Review"] })] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                            // Handle share
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Share, { className: "w-3 h-3" }), "Share Review"] }), _jsxs("button", { onClick: () => {
                                                            onReport?.(review.id, 'inappropriate');
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-orange-400", children: [_jsx(Flag, { className: "w-3 h-3" }), "Report Review"] })] })) })) })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: review.title }), _jsx("p", { className: "text-[var(--hive-text-secondary)] leading-relaxed", children: review.content }), (review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [review.pros && review.pros.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "font-medium text-green-400 mb-2 flex items-center space-x-2", children: [_jsx(ThumbsUp, { className: "w-4 h-4" }), _jsx("span", { children: "Pros" })] }), _jsx("ul", { className: "space-y-1", children: review.pros.map((pro, index) => (_jsxs("li", { className: "text-sm text-[var(--hive-text-secondary)] flex items-start space-x-2", children: [_jsx("span", { className: "text-green-400 mt-1", children: "+" }), _jsx("span", { children: pro })] }, index))) })] })), review.cons && review.cons.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "font-medium text-red-400 mb-2 flex items-center space-x-2", children: [_jsx(ThumbsDown, { className: "w-4 h-4" }), _jsx("span", { children: "Cons" })] }), _jsx("ul", { className: "space-y-1", children: review.cons.map((con, index) => (_jsxs("li", { className: "text-sm text-[var(--hive-text-secondary)] flex items-start space-x-2", children: [_jsx("span", { className: "text-red-400 mt-1", children: "-" }), _jsx("span", { children: con })] }, index))) })] }))] })) : null, review.useCase && (_jsxs("div", { className: "p-3 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-1", children: "Use Case" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: review.useCase })] })), _jsxs("div", { className: "flex items-center space-x-2", children: [review.wouldRecommend ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-400" })) : (_jsx(AlertTriangle, { className: "w-4 h-4 text-red-400" })), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: review.wouldRecommend ? 'Recommends this tool' : 'Does not recommend this tool' })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-6 pt-4 border-t border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleVote('helpful'), className: `flex items-center space-x-1 ${review.userVote === 'helpful' ? 'text-green-400' : 'text-[var(--hive-text-muted)]'}`, children: [_jsx(ThumbsUp, { className: "w-4 h-4" }), _jsx("span", { children: review.helpfulVotes })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleVote('unhelpful'), className: `flex items-center space-x-1 ${review.userVote === 'unhelpful' ? 'text-red-400' : 'text-[var(--hive-text-muted)]'}`, children: [_jsx(ThumbsDown, { className: "w-4 h-4" }), _jsx("span", { children: review.unhelpfulVotes })] })] }), totalVotes > 5 && (_jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: [helpfulPercentage.toFixed(0), "% found this helpful"] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setShowReplyForm(!showReplyForm), className: "flex items-center space-x-1", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), _jsx("span", { children: "Reply" })] }), review.replies && review.replies.length > 0 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setShowReplies(!showReplies), className: "flex items-center space-x-1", children: [_jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showReplies ? 'rotate-180' : ''}` }), _jsxs("span", { children: [review.replies.length, " replies"] })] }))] })] }), _jsx(AnimatePresence, { children: showReplyForm && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 pt-4 border-t border-[var(--hive-border-subtle)]", children: _jsxs("div", { className: "flex space-x-3", children: [_jsx("textarea", { value: replyContent, onChange: (e) => setReplyContent(e.target.value), placeholder: "Share your thoughts on this review...", rows: 3, className: "flex-1 p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)] resize-none" }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Button, { size: "sm", onClick: handleReply, disabled: !replyContent.trim() || isSubmittingReply, className: "bg-[var(--hive-primary)] text-white", children: isSubmittingReply ? (_jsx("div", { className: "w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" })) : (_jsx(Send, { className: "w-3 h-3" })) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowReplyForm(false), children: _jsx(X, { className: "w-3 h-3" }) })] })] }) })) }), _jsx(AnimatePresence, { children: showReplies && review.replies && review.replies.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 pt-4 border-t border-[var(--hive-border-subtle)] space-y-3", children: review.replies.map((reply) => (_jsxs("div", { className: "flex space-x-3 p-3 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsx(Avatar, { src: reply.author.avatar, initials: reply.author.name.charAt(0), size: "sm" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] text-sm", children: reply.author.name }), reply.author.isDeveloper && (_jsx(Badge, { size: "xs", className: "bg-blue-500/10 text-blue-400 border-blue-500/20", children: "Developer" })), _jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: formatTimeAgo(reply.timestamp) })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: reply.content })] })] }, reply.id))) })) })] }));
};
export const ToolReviewSystem = ({ toolId, reviews, summary, currentUserId, userReview, onSubmitReview, onUpdateReview, onDeleteReview, onVoteReview, onReplyToReview, onReportReview, canReview = true, isLoading = false, enableFeatureFlag = true }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const filteredAndSortedReviews = useMemo(() => {
        let filtered = reviews;
        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(review => review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.author.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(review => review.rating === parseInt(filterBy));
        }
        // Apply sort
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                case 'oldest':
                    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                case 'helpful':
                    return b.helpfulVotes - a.helpfulVotes;
                default:
                    return 0;
            }
        });
        return sorted;
    }, [reviews, searchQuery, filterBy, sortBy]);
    const handleSubmitReview = useCallback(async (reviewData) => {
        await onSubmitReview?.(reviewData);
        setShowReviewForm(false);
    }, [onSubmitReview]);
    const handleEditReview = useCallback((reviewId) => {
        setEditingReviewId(reviewId);
        setShowReviewForm(true);
    }, []);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(RatingsSummary, { summary: summary }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: ["Reviews (", summary.totalReviews, ")"] }), canReview && !userReview && (_jsx(Button, { onClick: () => setShowReviewForm(true), className: "bg-[var(--hive-primary)] text-white", children: "Write a Review" })), userReview && (_jsx(Button, { variant: "outline", onClick: () => handleEditReview(userReview.id), children: "Edit Your Review" }))] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", placeholder: "Search reviews...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" })] }), _jsxs("select", { value: filterBy, onChange: (e) => setFilterBy(e.target.value), className: "px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "all", children: "All Ratings" }), _jsx("option", { value: "5", children: "5 Stars" }), _jsx("option", { value: "4", children: "4 Stars" }), _jsx("option", { value: "3", children: "3 Stars" }), _jsx("option", { value: "2", children: "2 Stars" }), _jsx("option", { value: "1", children: "1 Star" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "newest", children: "Newest First" }), _jsx("option", { value: "oldest", children: "Oldest First" }), _jsx("option", { value: "highest", children: "Highest Rating" }), _jsx("option", { value: "lowest", children: "Lowest Rating" }), _jsx("option", { value: "helpful", children: "Most Helpful" })] })] })] }), _jsx(AnimatePresence, { children: showReviewForm && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: _jsx(ReviewForm, { toolId: toolId, existingReview: editingReviewId ? reviews.find(r => r.id === editingReviewId) : undefined, onSubmit: handleSubmitReview, onCancel: () => {
                            setShowReviewForm(false);
                            setEditingReviewId(null);
                        } }) })) }), _jsx("div", { className: "space-y-4", children: isLoading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-8 h-8 border-2 border-[var(--hive-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Loading reviews..." })] })) : filteredAndSortedReviews.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Star, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: searchQuery || filterBy !== 'all' ? 'No reviews found' : 'No reviews yet' }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: searchQuery || filterBy !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Be the first to review this tool!' })] })) : (filteredAndSortedReviews.map((review) => (_jsx(ReviewItem, { review: review, currentUserId: currentUserId, onVote: onVoteReview, onReply: onReplyToReview, onEdit: handleEditReview, onDelete: onDeleteReview, onReport: onReportReview }, review.id)))) })] }));
};
//# sourceMappingURL=tool-review-system.js.map