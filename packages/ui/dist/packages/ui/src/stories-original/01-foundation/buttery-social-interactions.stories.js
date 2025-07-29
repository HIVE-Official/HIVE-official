import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, BookOpen, Zap, Clock, MapPin } from 'lucide-react';
import { HiveButton, HiveCard, HiveCardHeader, HiveCardTitle, HiveCardContent, HiveBadge } from '../../components';
const meta = {
    title: '01-Foundation/HIVE Luxury Social Interactions',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Buttery smooth social interactions using complete HIVE luxury design system - obsidian/charcoal backgrounds, gold accents, liquid metal physics.',
            },
        },
    },
};
export default meta;
// HIVE Liquid Metal Physics - Premium spring timing
const hiveLiquidMotion = {
    socialButton: {
        rest: {
            scale: 1,
            y: 0,
            rotateZ: 0,
            transition: {
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1], // HIVE liquid metal easing
                type: "spring",
                stiffness: 300,
                damping: 20,
            }
        },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                stiffness: 500,
                damping: 12,
            }
        },
        pressed: {
            scale: 0.95,
            y: 1,
            transition: {
                duration: 0.1,
                ease: [0.23, 1, 0.32, 1],
            }
        }
    },
    presencePulse: {
        online: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
            }
        },
        active: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
            }
        },
        typing: {
            scale: [1, 1.3, 1],
            transition: {
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
            }
        }
    },
    engagementFlow: {
        likeButton: {
            idle: {
                scale: 1,
                rotate: 0,
                transition: {
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                }
            },
            liked: {
                scale: [1, 1.3, 1.1],
                rotate: [0, 15, 0],
                transition: {
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1], // Bouncy satisfaction
                    times: [0, 0.6, 1],
                }
            }
        }
    }
};
// HIVE Campus Presence Indicator - Complete luxury implementation
const HIVEPresenceIndicator = ({ status }) => {
    return (_jsxs(motion.div, { className: "flex items-center gap-3 p-3 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm border border-[var(--hive-border-subtle)] rounded-2xl", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }, children: [_jsx(motion.div, { className: `w-3 h-3 rounded-full shadow-lg ${status === 'online'
                    ? 'bg-[var(--hive-status-success)] shadow-[var(--hive-status-success)]/40' :
                    status === 'active'
                        ? 'bg-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]' :
                        'bg-[var(--hive-status-info)] shadow-[var(--hive-status-info)]/40'}`, variants: hiveLiquidMotion.presencePulse, animate: status }), _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: status === 'online' ? 'Online in CS Hub' :
                    status === 'active' ? 'Active in Study Room' :
                        'Typing in Group Chat...' })] }));
};
// HIVE Campus Social Post - Real campus platform content
const HIVECampusSocialPost = () => {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    return (_jsxs(HiveCard, { variant: "space", className: "max-w-lg", children: [_jsx(HiveCardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-primary)]/60 rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--hive-shadow-gold-glow)]", children: _jsx(Zap, { className: "w-6 h-6 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx(HiveCardTitle, { className: "text-base", children: "CS Study Group" }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-muted)] text-sm", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: "2 hours ago" }), _jsx("span", { children: "\u2022" }), _jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: "Academic Spaces" })] })] }), _jsx(HiveBadge, { variant: "success", className: "shadow-lg", children: "Live" })] }) }), _jsxs(HiveCardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-2 text-lg", children: "Just built an amazing GPA calculator tool! \uD83D\uDCCA" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] leading-relaxed", children: "Finished this collaborative project with my study group. It automatically imports course data and predicts semester outcomes. The tool handles weighted GPAs and shows visual progress charts. Try it out and let me know what you think!" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)]/60 backdrop-blur-sm border border-[var(--hive-border-gold)]/30 rounded-xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: "GPA Calculator v2.0" })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Smart academic planning tool with semester forecasting" })] }), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(motion.button, { className: `flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${liked
                                            ? 'bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)] shadow-lg shadow-[var(--hive-status-error)]/20'
                                            : 'bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-primary)] hover:text-[var(--hive-text-primary)]'}`, variants: hiveLiquidMotion.engagementFlow.likeButton, animate: liked ? "liked" : "idle", onClick: () => setLiked(!liked), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Heart, { className: `w-4 h-4 ${liked ? 'fill-current' : ''}` }), _jsx("span", { className: "text-sm font-medium", children: liked ? 'Liked' : 'Like' }), _jsx("span", { className: "text-xs bg-[var(--hive-overlay-glass)] px-2 py-1 rounded-full", children: liked ? '24' : '23' })] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", className: "gap-2", onClick: () => setShared(!shared), children: [_jsx(Share2, { className: "w-4 h-4" }), _jsx("span", { children: "Share" })] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", className: "gap-2", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), _jsx("span", { children: "Comment" })] })] }), _jsx(motion.button, { className: `p-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${bookmarked
                                    ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
                                    : 'bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-primary)]'}`, onClick: () => setBookmarked(!bookmarked), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Star, { className: `w-4 h-4 ${bookmarked ? 'fill-current' : ''}` }) })] })] })] }));
};
// HIVE Social Button Grid - Campus interaction patterns
const HIVESocialButtonGrid = () => {
    const [states, setStates] = useState({
        like: false,
        share: false,
        comment: false,
        bookmark: false
    });
    const toggleState = (key) => {
        setStates(prev => ({ ...prev, [key]: !prev[key] }));
    };
    return (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] rounded-3xl space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] text-center", children: "HIVE Campus Social Interactions" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(motion.button, { className: `flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${states.like
                            ? 'bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)] shadow-lg shadow-[var(--hive-status-error)]/20'
                            : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'}`, onClick: () => toggleState('like'), variants: hiveLiquidMotion.socialButton, initial: "rest", whileHover: "hover", whileTap: "pressed", children: [_jsx(Heart, { className: `w-5 h-5 ${states.like ? 'fill-current' : ''}` }), _jsx("span", { className: "font-medium", children: "Like Tool" })] }), _jsxs(motion.button, { className: `flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${states.share
                            ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
                            : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'}`, onClick: () => toggleState('share'), variants: hiveLiquidMotion.socialButton, initial: "rest", whileHover: "hover", whileTap: "pressed", children: [_jsx(Share2, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: "Share with Study Group" })] }), _jsxs(motion.button, { className: `flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${states.comment
                            ? 'bg-[var(--hive-status-info)]/10 border border-[var(--hive-status-info)]/30 text-[var(--hive-status-info)] shadow-lg shadow-[var(--hive-status-info)]/20'
                            : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'}`, onClick: () => toggleState('comment'), variants: hiveLiquidMotion.socialButton, initial: "rest", whileHover: "hover", whileTap: "pressed", children: [_jsx(MessageCircle, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: "Add Comment" })] }), _jsxs(motion.button, { className: `flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${states.bookmark
                            ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
                            : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'}`, onClick: () => toggleState('bookmark'), variants: hiveLiquidMotion.socialButton, initial: "rest", whileHover: "hover", whileTap: "pressed", children: [_jsx(Star, { className: `w-5 h-5 ${states.bookmark ? 'fill-current' : ''}` }), _jsx("span", { className: "font-medium", children: "Save for Later" })] })] })] }));
};
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const CampusSocialPost = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(HIVECampusSocialPost, {}) })),
    parameters: {
        docs: {
            description: {
                story: 'Complete campus social post with HIVE luxury design system - obsidian backgrounds, gold shadows, liquid metal physics.',
            },
        },
    },
};
export const SocialInteractionGrid = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(HIVESocialButtonGrid, {}) })),
    parameters: {
        docs: {
            description: {
                story: 'Campus social interaction buttons with buttery smooth animations and luxury HIVE styling.',
            },
        },
    },
};
export const PresenceIndicators = {
    render: () => (_jsxs("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-4", children: [_jsx(HIVEPresenceIndicator, { status: "online" }), _jsx(HIVEPresenceIndicator, { status: "active" }), _jsx(HIVEPresenceIndicator, { status: "typing" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Campus presence indicators showing student activity with pulsing animations and luxury styling.',
            },
        },
    },
};
export const CompleteExperience = {
    render: () => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-2", children: "HIVE Campus Social Experience" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Luxury interactions for premium campus platform" })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-8 items-start", children: [_jsx(HIVECampusSocialPost, {}), _jsxs("div", { className: "space-y-6", children: [_jsx(HIVESocialButtonGrid, {}), _jsxs("div", { className: "space-y-3", children: [_jsx(HIVEPresenceIndicator, { status: "online" }), _jsx(HIVEPresenceIndicator, { status: "active" }), _jsx(HIVEPresenceIndicator, { status: "typing" })] })] })] })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Complete HIVE campus social experience showcasing luxury design system in action.',
            },
        },
    },
};
//# sourceMappingURL=buttery-social-interactions.stories.js.map