import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Edit, Trash2, Share2, Copy, FileText } from 'lucide-react';
const meta = {
    title: '01-Foundation/Responsive Components',
    parameters: {
        docs: {
            description: {
                component: 'HIVE Responsive Components - Bottom Sheet, Swipe Actions, Pull to Refresh, and Context Menus with mobile-first design',
            },
        },
    },
};
export default meta;
// Bottom Sheet Component
const BottomSheet = ({ isOpen, onClose, children, snapPoints = ['25%', '50%', '90%'], initialSnap = 1 }) => {
    const [currentSnap, setCurrentSnap] = React.useState(initialSnap);
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        if (velocity.y > 500 || offset.y > 200) {
            onClose();
        }
        else if (velocity.y < -500 || offset.y < -200) {
            setCurrentSnap(Math.min(currentSnap + 1, snapPoints.length - 1));
        }
        else if (velocity.y > 200) {
            setCurrentSnap(Math.max(currentSnap - 1, 0));
        }
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40", onClick: onClose }), _jsxs(motion.div, { initial: { y: '100%' }, animate: { y: `calc(100% - ${snapPoints[currentSnap]})` }, exit: { y: '100%' }, drag: "y", dragConstraints: { top: 0, bottom: 0 }, dragElastic: 0.2, onDragEnd: handleDragEnd, className: "fixed inset-x-0 bottom-0 z-50 bg-[var(--hive-background-primary)] border-t border-[var(--hive-border-default)] rounded-t-xl", style: { height: '100vh' }, children: [_jsx("div", { className: "flex justify-center py-3", children: _jsx("div", { className: "w-12 h-1 bg-[var(--hive-border-default)] rounded-full" }) }), _jsxs("div", { className: "flex items-center justify-between px-6 pb-4", children: [_jsx("h3", { className: "text-[var(--hive-text-primary)] text-lg font-semibold", children: "Bottom Sheet" }), _jsx(motion.button, { onClick: onClose, className: "p-2 rounded-full bg-[var(--hive-background-secondary)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: "px-6 pb-6 overflow-y-auto", style: { height: 'calc(100% - 80px)' }, children: children })] })] })) }));
};
// Swipe Actions Component
const SwipeActions = ({ children, leftActions, rightActions, onSwipe }) => {
    const [swipeOffset, setSwipeOffset] = React.useState(0);
    const [isRevealed, setIsRevealed] = React.useState(false);
    const handleDrag = (event, info) => {
        setSwipeOffset(info.offset.x);
    };
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        const threshold = 100;
        if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500) {
            setIsRevealed(true);
            setSwipeOffset(offset.x > 0 ? 120 : -120);
        }
        else {
            setIsRevealed(false);
            setSwipeOffset(0);
        }
    };
    const executeAction = (actions, index, direction) => {
        if (actions?.[index]) {
            actions[index].action();
            onSwipe?.(direction, index);
            setIsRevealed(false);
            setSwipeOffset(0);
        }
    };
    return (_jsxs("div", { className: "relative overflow-hidden bg-[var(--hive-background-secondary)] rounded-lg", children: [leftActions && (_jsx("div", { className: "absolute left-0 top-0 h-full flex", children: leftActions.map((action, index) => (_jsxs(motion.button, { onClick: () => executeAction(leftActions, index, 'left'), className: "flex flex-col items-center justify-center px-6 text-[var(--hive-text-primary)]", style: { backgroundColor: action.color }, initial: { x: -120 }, animate: { x: swipeOffset > 0 ? 0 : -120 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [action.icon, _jsx("span", { className: "text-xs mt-1", children: action.label })] }, index))) })), rightActions && (_jsx("div", { className: "absolute right-0 top-0 h-full flex", children: rightActions.map((action, index) => (_jsxs(motion.button, { onClick: () => executeAction(rightActions, index, 'right'), className: "flex flex-col items-center justify-center px-6 text-[var(--hive-text-primary)]", style: { backgroundColor: action.color }, initial: { x: 120 }, animate: { x: swipeOffset < 0 ? 0 : 120 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [action.icon, _jsx("span", { className: "text-xs mt-1", children: action.label })] }, index))) })), _jsx(motion.div, { drag: "x", dragConstraints: { left: -150, right: 150 }, dragElastic: 0.2, onDrag: handleDrag, onDragEnd: handleDragEnd, animate: { x: swipeOffset }, className: "relative z-10 bg-[var(--hive-background-secondary)]", children: children })] }));
};
// Pull to Refresh Component
const PullToRefresh = ({ onRefresh, children, refreshThreshold = 100 }) => {
    const [pullDistance, setPullDistance] = React.useState(0);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [canRefresh, setCanRefresh] = React.useState(false);
    const handleDrag = (event, info) => {
        const distance = Math.max(0, info.offset.y);
        setPullDistance(distance);
        setCanRefresh(distance >= refreshThreshold);
    };
    const handleDragEnd = async (event, info) => {
        if (canRefresh && !isRefreshing) {
            setIsRefreshing(true);
            try {
                await onRefresh();
            }
            finally {
                setIsRefreshing(false);
                setPullDistance(0);
                setCanRefresh(false);
            }
        }
        else {
            setPullDistance(0);
            setCanRefresh(false);
        }
    };
    return (_jsxs("div", { className: "relative overflow-hidden", children: [_jsx(motion.div, { className: "absolute top-0 left-0 right-0 flex items-center justify-center py-4 bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)]", initial: { y: -60, opacity: 0 }, animate: {
                    y: pullDistance > 0 ? Math.min(pullDistance - 60, 0) : -60,
                    opacity: pullDistance > 30 ? 1 : 0
                }, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(motion.div, { animate: {
                                rotate: isRefreshing ? 360 : canRefresh ? 180 : 0
                            }, transition: {
                                duration: isRefreshing ? 1 : 0.3,
                                repeat: isRefreshing ? Infinity : 0,
                                ease: "linear"
                            }, children: _jsx(RefreshCw, { size: 20, className: canRefresh ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]' }) }), _jsx("span", { className: `text-sm ${canRefresh ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}`, children: isRefreshing ? 'Refreshing...' : canRefresh ? 'Release to refresh' : 'Pull to refresh' })] }) }), _jsx(motion.div, { drag: "y", dragConstraints: { top: 0, bottom: 0 }, dragElastic: { top: 0.3, bottom: 0 }, onDrag: handleDrag, onDragEnd: handleDragEnd, animate: { y: isRefreshing ? refreshThreshold : 0 }, className: "relative", children: children })] }));
};
// Context Menu Component
const ContextMenu = ({ children, items, trigger = 'rightClick' }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [longPressTimer, setLongPressTimer] = React.useState(null);
    const handleContextMenu = (event) => {
        if (trigger === 'rightClick') {
            event.preventDefault();
            setPosition({ x: event.clientX, y: event.clientY });
            setIsOpen(true);
        }
    };
    const handleMouseDown = (event) => {
        if (trigger === 'longPress') {
            const timer = setTimeout(() => {
                setPosition({ x: event.clientX, y: event.clientY });
                setIsOpen(true);
            }, 500);
            setLongPressTimer(timer);
        }
    };
    const handleMouseUp = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };
    const handleItemClick = (action) => {
        action();
        setIsOpen(false);
    };
    React.useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { onContextMenu: handleContextMenu, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, className: "relative", children: children }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, className: "fixed z-50 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg py-2 backdrop-blur-md shadow-xl", style: {
                        left: position.x,
                        top: position.y,
                        transform: 'translate(-10px, -10px)'
                    }, children: items.map((item, index) => (_jsxs(motion.button, { onClick: () => handleItemClick(item.action), disabled: item.disabled, className: `
                  flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors
                  ${item.disabled
                            ? 'text-[#6B7280] cursor-not-allowed'
                            : 'text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'}
                `, whileHover: !item.disabled ? { backgroundColor: 'var(--hive-background-secondary)' } : {}, style: { color: item.color && !item.disabled ? item.color : undefined }, children: [item.icon, _jsx("span", { className: "text-sm font-medium", children: item.label })] }, index))) })) })] }));
};
// Stories
export const BottomSheetStory = {
    name: 'Bottom Sheet',
    render: () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Bottom Sheet" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "Mobile-first modal with drag interactions and snap points." }), _jsx(motion.button, { onClick: () => setIsOpen(true), className: "px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Open Bottom Sheet" }), _jsx(BottomSheet, { isOpen: isOpen, onClose: () => setIsOpen(false), snapPoints: ['30%', '60%', '90%'], initialSnap: 0, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Sheet Content" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: "This bottom sheet supports multiple snap points and drag gestures. You can drag the handle or swipe up/down to change the height." })] }), _jsx("div", { className: "space-y-4", children: Array.from({ length: 10 }, (_, i) => (_jsxs("div", { className: "p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: [_jsxs("h4", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: ["List Item ", i + 1] }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Some content that demonstrates scrolling within the bottom sheet." })] }, i))) })] }) })] }));
    },
};
export const SwipeActionsStory = {
    name: 'Swipe Actions',
    render: () => {
        const [messages, setMessages] = React.useState([
            { id: 1, sender: 'Alex Johnson', message: 'Hey! Are you free for the study session tomorrow?', time: '2m ago' },
            { id: 2, sender: 'Sarah Chen', message: 'Thanks for sharing those notes from yesterday\'s lecture', time: '5m ago' },
            { id: 3, sender: 'Mike Rodriguez', message: 'Did you finish the assignment? I\'m stuck on question 3', time: '10m ago' },
        ]);
        const handleDelete = (id) => {
            setMessages(prev => prev.filter(msg => msg.id !== id));
        };
        const leftActions = [
            {
                icon: _jsx(Share2, { size: 18 }),
                label: 'Share',
                color: 'var(--hive-status-success)',
                action: () => console.log('Share')
            }
        ];
        const rightActions = [
            {
                icon: _jsx(Edit, { size: 18 }),
                label: 'Edit',
                color: '#6366F1',
                action: () => console.log('Edit')
            },
            {
                icon: _jsx(Trash2, { size: 18 }),
                label: 'Delete',
                color: 'var(--hive-status-error)',
                action: () => console.log('Delete')
            }
        ];
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Swipe Actions" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "Swipe left or right on message items to reveal contextual actions." }), _jsx("div", { className: "max-w-md space-y-4", children: messages.map((message) => (_jsx(SwipeActions, { leftActions: leftActions, rightActions: [
                            ...rightActions.slice(0, -1),
                            {
                                ...rightActions[rightActions.length - 1],
                                action: () => handleDelete(message.id)
                            }
                        ], children: _jsxs("div", { className: "p-4 border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium", children: message.sender }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] text-xs", children: message.time })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm", children: message.message })] }) }, message.id))) })] }));
    },
};
export const PullToRefreshStory = {
    name: 'Pull to Refresh',
    render: () => {
        const [items, setItems] = React.useState([
            'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'
        ]);
        const [lastRefresh, setLastRefresh] = React.useState(new Date());
        const handleRefresh = async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setItems(prev => [
                `New Item ${Date.now()}`,
                ...prev.slice(0, 10) // Keep only 10 items
            ]);
            setLastRefresh(new Date());
        };
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen", children: [_jsxs("div", { className: "p-8 pb-4", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Pull to Refresh" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-2", children: "Pull down on the content area to refresh the list." }), _jsxs("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: ["Last refreshed: ", lastRefresh.toLocaleTimeString()] })] }), _jsx(PullToRefresh, { onRefresh: handleRefresh, children: _jsx("div", { className: "px-8 space-y-4", children: items.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-[var(--hive-text-primary)] font-medium", children: item }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] text-sm", children: index === 0 && item.includes('New') ? 'New!' : `Item ${index + 1}` })] }), _jsxs("p", { className: "text-[var(--hive-text-tertiary)] text-sm mt-2", children: ["This is some content for ", item, ". Pull down to refresh and see new items appear."] })] }, `${item}-${index}`))) }) })] }));
    },
};
export const ContextMenuStory = {
    name: 'Context Menu',
    render: () => {
        const contextItems = [
            {
                icon: _jsx(Edit, { size: 16 }),
                label: 'Edit',
                action: () => console.log('Edit clicked')
            },
            {
                icon: _jsx(Copy, { size: 16 }),
                label: 'Copy',
                action: () => console.log('Copy clicked')
            },
            {
                icon: _jsx(Share2, { size: 16 }),
                label: 'Share',
                action: () => console.log('Share clicked')
            },
            {
                icon: _jsx(Trash2, { size: 16 }),
                label: 'Delete',
                action: () => console.log('Delete clicked'),
                color: 'var(--hive-status-error)'
            }
        ];
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Context Menu" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "Right-click or long-press on items to reveal context menus." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Right Click Menu" }), _jsx(ContextMenu, { items: contextItems, trigger: "rightClick", children: _jsxs("div", { className: "p-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-center cursor-pointer hover:border-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "Right Click Me" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Right-click to open context menu" })] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Long Press Menu" }), _jsx(ContextMenu, { items: contextItems, trigger: "longPress", children: _jsxs("div", { className: "p-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-center cursor-pointer hover:border-[var(--hive-brand-secondary)]/20 transition-colors select-none", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "Long Press Me" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Hold down to open context menu" })] }) })] })] }), _jsxs("div", { className: "mt-12", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Usage Examples" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ['File Item 1', 'File Item 2', 'File Item 3'].map((item, index) => (_jsx(ContextMenu, { items: contextItems, trigger: "rightClick", children: _jsx("div", { className: "p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg hover:border-[var(--hive-brand-secondary)]/20 transition-colors cursor-pointer", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-[var(--hive-brand-secondary)]", children: _jsx(FileText, { size: 20 }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium", children: item }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "Document file" })] })] }) }) }, index))) })] })] }));
    },
};
//# sourceMappingURL=responsive-components.stories.js.map