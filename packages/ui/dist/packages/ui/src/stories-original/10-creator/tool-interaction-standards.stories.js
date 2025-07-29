import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Heart, MessageCircle, Share2, Bookmark, Plus } from 'lucide-react';
const meta = {
    title: '10-Creator/Tool Interaction Standards',
    parameters: {
        docs: {
            description: {
                component: 'HIVE Tool Interaction Standards - Unified patterns for tool interfaces, clicking behaviors, and user interactions across all tools',
            },
        },
    },
};
export default meta;
// Base Tool Container
const ToolContainer = ({ children, title, category, isActive = false, onActivate, className = "" }) => {
    return (_jsxs(motion.div, { className: `
        relative bg-[var(--hive-background-secondary)] border rounded-xl overflow-hidden transition-all duration-300
        ${isActive
            ? 'border-[var(--hive-brand-secondary)]/50 shadow-[0_0_20px_color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)]'
            : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/20'}
        ${className}
      `, whileHover: { scale: 1.02 }, onClick: onActivate, layout: true, children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[var(--hive-border-default)]", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-[var(--hive-text-primary)] font-semibold", children: title }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: category })] }), _jsx(motion.div, { className: `w-3 h-3 rounded-full ${isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-border-default)]'}`, animate: { scale: isActive ? [1, 1.2, 1] : 1 }, transition: { repeat: isActive ? Infinity : 0, duration: 2 } })] }), _jsx("div", { className: "p-4", children: children })] }));
};
// Standard Tool Actions
const ToolActions = ({ onLike, onComment, onShare, onBookmark, likes = 0, comments = 0, isLiked = false, isBookmarked = false }) => {
    return (_jsxs("div", { className: "flex items-center justify-between pt-4 mt-4 border-t border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(motion.button, { onClick: onLike, className: `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${isLiked
                            ? 'text-[#FF4757] bg-[#FF4757]/10'
                            : 'text-[var(--hive-text-tertiary)] hover:text-[#FF4757] hover:bg-[#FF4757]/5'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Heart, { size: 16, fill: isLiked ? 'currentColor' : 'none' }), likes > 0 && _jsx("span", { className: "text-sm font-medium", children: likes })] }), _jsxs(motion.button, { onClick: onComment, className: "flex items-center space-x-2 px-3 py-2 rounded-lg text-[var(--hive-text-tertiary)] hover:text-[#6366F1] hover:bg-[#6366F1]/5 transition-all", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(MessageCircle, { size: 16 }), comments > 0 && _jsx("span", { className: "text-sm font-medium", children: comments })] }), _jsx(motion.button, { onClick: onShare, className: "flex items-center space-x-2 px-3 py-2 rounded-lg text-[var(--hive-text-tertiary)] hover:text-[var(--hive-status-success)] hover:bg-[var(--hive-status-success)]/5 transition-all", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Share2, { size: 16 }) })] }), _jsx(motion.button, { onClick: onBookmark, className: `p-2 rounded-lg transition-all ${isBookmarked
                    ? 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10'
                    : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/5'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Bookmark, { size: 16, fill: isBookmarked ? 'currentColor' : 'none' }) })] }));
};
// Tool Settings Panel
const ToolSettings = ({ isOpen, onClose, children }) => {
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "absolute top-full left-0 right-0 z-10 mt-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4 backdrop-blur-md", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium", children: "Tool Settings" }), _jsx(motion.button, { onClick: onClose, className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: "\u00D7" })] }), children] })) }));
};
// Timer Tool Example
const TimerTool = () => {
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [showSettings, setShowSettings] = React.useState(false);
    const [likes, setLikes] = React.useState(5);
    const [isLiked, setIsLiked] = React.useState(false);
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    React.useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsxs(ToolContainer, { title: "Focus Timer", category: "Productivity Tool", className: "relative", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "text-4xl font-bold text-[var(--hive-brand-secondary)] mb-2 font-mono", children: formatTime(time) }), _jsx("div", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Focus Session" })] }), _jsxs("div", { className: "flex items-center justify-center space-x-4 mb-4", children: [_jsx(motion.button, { onClick: () => setIsRunning(!isRunning), className: "flex items-center justify-center w-12 h-12 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-full", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: isRunning ? _jsx(Pause, { size: 20 }) : _jsx(Play, { size: 20 }) }), _jsx(motion.button, { onClick: () => {
                            setTime(0);
                            setIsRunning(false);
                        }, className: "flex items-center justify-center w-10 h-10 bg-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-full hover:bg-[#3A3A3D]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(RotateCcw, { size: 16 }) }), _jsx(motion.button, { onClick: () => setShowSettings(!showSettings), className: "flex items-center justify-center w-10 h-10 bg-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-full hover:bg-[#3A3A3D]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Settings, { size: 16 }) })] }), _jsx(ToolSettings, { isOpen: showSettings, onClose: () => setShowSettings(false), children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Sound Alerts" }), _jsx(motion.button, { className: "w-10 h-6 bg-[var(--hive-brand-secondary)] rounded-full flex items-center px-1", whileTap: { scale: 0.95 }, children: _jsx("div", { className: "w-4 h-4 bg-[var(--hive-background-primary)] rounded-full ml-auto" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Auto-start breaks" }), _jsx(motion.button, { className: "w-10 h-6 bg-[var(--hive-border-default)] rounded-full flex items-center px-1", whileTap: { scale: 0.95 }, children: _jsx("div", { className: "w-4 h-4 bg-[var(--hive-text-tertiary)] rounded-full" }) })] })] }) }), _jsx(ToolActions, { onLike: () => {
                    setIsLiked(!isLiked);
                    setLikes(prev => isLiked ? prev - 1 : prev + 1);
                }, onComment: () => console.log('Comment'), onShare: () => console.log('Share'), onBookmark: () => setIsBookmarked(!isBookmarked), likes: likes, comments: 2, isLiked: isLiked, isBookmarked: isBookmarked })] }));
};
// GPA Calculator Tool Example
const GPACalculatorTool = () => {
    const [courses, setCourses] = React.useState([
        { name: 'Calculus II', credits: 4, grade: 'A' },
        { name: 'Physics I', credits: 3, grade: 'B+' },
        { name: 'Chemistry', credits: 3, grade: 'A-' },
    ]);
    const [showSettings, setShowSettings] = React.useState(false);
    const [likes, setLikes] = React.useState(12);
    const [isLiked, setIsLiked] = React.useState(false);
    const [isBookmarked, setIsBookmarked] = React.useState(true);
    const gradePoints = {
        'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    const calculateGPA = () => {
        const totalPoints = courses.reduce((sum, course) => sum + (gradePoints[course.grade] * course.credits), 0);
        const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    };
    return (_jsxs(ToolContainer, { title: "GPA Calculator", category: "Academic Tool", className: "relative", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "text-3xl font-bold text-[var(--hive-brand-secondary)] mb-1", children: calculateGPA() }), _jsx("div", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Current GPA" })] }), _jsx("div", { className: "space-y-3 mb-4", children: courses.map((course, index) => (_jsxs(motion.div, { className: "flex items-center justify-between p-3 bg-[var(--hive-background-tertiary)] rounded-lg", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: course.name }), _jsxs("div", { className: "text-[var(--hive-text-tertiary)] text-xs", children: [course.credits, " credits"] })] }), _jsx("div", { className: "text-[var(--hive-brand-secondary)] font-bold text-lg", children: course.grade })] }, index))) }), _jsxs(motion.button, { className: "w-full p-3 border-2 border-dashed border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-tertiary)] hover:border-[var(--hive-brand-secondary)]/30 hover:text-[var(--hive-brand-secondary)] transition-all", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { size: 20, className: "mx-auto mb-1" }), "Add Course"] }), _jsx(ToolActions, { onLike: () => {
                    setIsLiked(!isLiked);
                    setLikes(prev => isLiked ? prev - 1 : prev + 1);
                }, onComment: () => console.log('Comment'), onShare: () => console.log('Share'), onBookmark: () => setIsBookmarked(!isBookmarked), likes: likes, comments: 4, isLiked: isLiked, isBookmarked: isBookmarked })] }));
};
// Poll Tool Example
const PollTool = () => {
    const [poll] = React.useState({
        question: "Which programming language should we learn next?",
        options: [
            { text: "Python", votes: 23 },
            { text: "JavaScript", votes: 18 },
            { text: "Rust", votes: 12 },
            { text: "Go", votes: 8 }
        ]
    });
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [hasVoted, setHasVoted] = React.useState(false);
    const [likes, setLikes] = React.useState(8);
    const [isLiked, setIsLiked] = React.useState(false);
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
    const handleVote = () => {
        if (selectedOption !== null && !hasVoted) {
            setHasVoted(true);
        }
    };
    return (_jsxs(ToolContainer, { title: "Quick Poll", category: "Engagement Tool", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-[var(--hive-text-primary)] font-medium text-lg mb-2", children: poll.question }), _jsxs("div", { className: "text-[var(--hive-text-tertiary)] text-sm", children: [totalVotes, " votes"] })] }), _jsx("div", { className: "space-y-3 mb-6", children: poll.options.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    const isSelected = selectedOption === index;
                    return (_jsxs(motion.button, { onClick: () => !hasVoted && setSelectedOption(index), className: `
                relative w-full p-3 rounded-lg border text-left transition-all overflow-hidden
                ${hasVoted
                            ? 'cursor-default border-[var(--hive-border-default)]'
                            : isSelected
                                ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/30'}
              `, whileHover: !hasVoted ? { scale: 1.02 } : {}, whileTap: !hasVoted ? { scale: 0.98 } : {}, disabled: hasVoted, children: [hasVoted && (_jsx(motion.div, { className: "absolute inset-0 bg-[var(--hive-brand-secondary)]/10 origin-left", initial: { scaleX: 0 }, animate: { scaleX: percentage / 100 }, transition: { duration: 0.5, delay: index * 0.1 } })), _jsxs("div", { className: "relative flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${hasVoted
                                                    ? 'border-[var(--hive-brand-secondary)]'
                                                    : isSelected
                                                        ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]'
                                                        : 'border-[var(--hive-border-default)]'}
                  `, children: (hasVoted || isSelected) && (_jsx(motion.div, { className: "w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full", initial: { scale: 0 }, animate: { scale: 1 } })) }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: option.text })] }), hasVoted && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-[var(--hive-brand-secondary)] font-medium", children: [Math.round(percentage), "%"] }), _jsxs("span", { className: "text-[var(--hive-text-tertiary)] text-sm", children: ["(", option.votes, ")"] })] }))] })] }, index));
                }) }), !hasVoted && (_jsx(motion.button, { onClick: handleVote, disabled: selectedOption === null, className: "w-full p-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed", whileHover: { scale: selectedOption !== null ? 1.02 : 1 }, whileTap: { scale: selectedOption !== null ? 0.98 : 1 }, children: "Submit Vote" })), _jsx(ToolActions, { onLike: () => {
                    setIsLiked(!isLiked);
                    setLikes(prev => isLiked ? prev - 1 : prev + 1);
                }, onComment: () => console.log('Comment'), onShare: () => console.log('Share'), onBookmark: () => setIsBookmarked(!isBookmarked), likes: likes, comments: 6, isLiked: isLiked, isBookmarked: isBookmarked })] }));
};
// Stories
export const ToolInteractionStandards = {
    name: 'Tool Interaction Standards',
    render: () => {
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-4", children: "HIVE Tool Interaction Standards" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-12 max-w-3xl", children: "Unified interaction patterns and design standards for all HIVE tools. Every tool follows these consistent patterns for container design, action buttons, settings panels, and user feedback." }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8", children: [_jsx(TimerTool, {}), _jsx(GPACalculatorTool, {}), _jsx(PollTool, {})] }), _jsxs("div", { className: "mt-16 space-y-8", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Interaction Guidelines" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4", children: "Container Standards" }), _jsxs("ul", { className: "space-y-2 text-[var(--hive-text-secondary)]", children: [_jsx("li", { children: "\u2022 Dark glass morphism aesthetic" }), _jsx("li", { children: "\u2022 Golden active state indicators" }), _jsx("li", { children: "\u2022 Liquid metal hover animations" }), _jsx("li", { children: "\u2022 Consistent header with title & category" }), _jsx("li", { children: "\u2022 Status indicator (active/inactive)" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4", children: "Action Patterns" }), _jsxs("ul", { className: "space-y-2 text-[var(--hive-text-secondary)]", children: [_jsx("li", { children: "\u2022 Like (red heart) with count display" }), _jsx("li", { children: "\u2022 Comment (blue) with count display" }), _jsx("li", { children: "\u2022 Share (green) for distribution" }), _jsx("li", { children: "\u2022 Bookmark (gold) for saving" }), _jsx("li", { children: "\u2022 Settings gear for configuration" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4", children: "Click Behaviors" }), _jsxs("ul", { className: "space-y-2 text-[var(--hive-text-secondary)]", children: [_jsx("li", { children: "\u2022 Spring physics on tap (scale 0.95)" }), _jsx("li", { children: "\u2022 Gentle hover elevation (scale 1.05)" }), _jsx("li", { children: "\u2022 Magnetic snap for precise interactions" }), _jsx("li", { children: "\u2022 Liquid metal transitions (0.3s easing)" }), _jsx("li", { children: "\u2022 Tactile feedback with visual confirmation" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4", children: "State Management" }), _jsxs("ul", { className: "space-y-2 text-[var(--hive-text-secondary)]", children: [_jsx("li", { children: "\u2022 Clear active/inactive visual states" }), _jsx("li", { children: "\u2022 Progressive disclosure for settings" }), _jsx("li", { children: "\u2022 Persistent state across sessions" }), _jsx("li", { children: "\u2022 Real-time updates with animations" }), _jsx("li", { children: "\u2022 Error states with recovery options" })] })] })] })] })] }));
    },
};
//# sourceMappingURL=tool-interaction-standards.stories.js.map