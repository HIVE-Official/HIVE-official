import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { MotionDiv, MotionButton } from './motion-wrapper';
const BottomNavBarRoot = React.forwardRef(({ className, variant = 'floating', hideOnScroll = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const lastScrollY = React.useRef(0);
    React.useEffect(() => {
        if (!hideOnScroll)
            return;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hideOnScroll]);
    const getVariantStyles = () => {
        switch (variant) {
            case 'fixed':
                return 'fixed bottom-0 left-0 w-full border-t bg-background';
            case 'dock':
                return 'fixed bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border bg-surface/80 backdrop-blur-xl shadow-lg';
            case 'floating':
            default:
                return 'fixed bottom-6 left-1/2 -translate-x-1/2 rounded-3xl border bg-surface/90 backdrop-blur-xl shadow-xl';
        }
    };
    // Exclude HTML event handlers that conflict with Framer Motion
    const { onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop, onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration, onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel, ...motionProps } = props;
    return (_jsx(MotionDiv, { ref: ref, className: cn('z-50 transition-all duration-300', getVariantStyles(), className), initial: { y: 100, opacity: 0 }, animate: {
            y: isVisible ? 0 : 100,
            opacity: isVisible ? 1 : 0
        }, transition: {
            duration: 0.18,
            ease: [0.33, 0.65, 0, 1]
        }, ...motionProps }));
});
BottomNavBarRoot.displayName = 'BottomNavBarRoot';
const BottomNavBarContent = React.forwardRef(({ className, itemCount = 3, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('flex h-full items-center justify-center font-medium px-2', itemCount <= 3 && 'gap-8', itemCount === 4 && 'gap-6', itemCount >= 5 && 'gap-4', className), ...props })));
BottomNavBarContent.displayName = 'BottomNavBarContent';
const BottomNavBarItem = React.forwardRef(({ className, isActive = false, variant = 'bubble', showLabel = false, badge, enableMotion = true, children, ...props }, ref) => {
    const getVariantStyles = () => {
        const base = 'relative inline-flex items-center justify-center transition-all duration-200 ease-smooth';
        switch (variant) {
            case 'pill':
                return cn(base, 'rounded-full px-4 py-2 min-w-[3rem]', isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-muted hover:bg-accent/10 hover:text-accent');
            case 'chip':
                return cn(base, 'rounded-2xl px-3 py-2 min-w-[2.5rem]', isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-muted hover:bg-surface-01 hover:text-accent');
            case 'minimal':
                return cn(base, 'rounded-lg px-2 py-2', isActive
                    ? 'text-accent'
                    : 'text-muted hover:text-accent');
            case 'bubble':
            default:
                return cn(base, 'rounded-2xl p-3 min-w-[3rem] min-h-[3rem]', isActive
                    ? 'bg-accent/15 text-accent shadow-lg shadow-accent/20 scale-110'
                    : 'text-muted hover:bg-surface-01 hover:text-accent hover:scale-105');
        }
    };
    const getMotionProps = () => {
        if (!enableMotion)
            return {};
        return {
            whileHover: {
                scale: isActive ? 1.1 : 1.05
            },
            whileTap: {
                scale: 0.95
            },
            transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }
        };
    };
    // Exclude HTML event handlers that conflict with Framer Motion
    const { onDrag: _onDrag2, onDragStart: _onDragStart2, onDragEnd: _onDragEnd2, onDragOver: _onDragOver2, onDragEnter: _onDragEnter2, onDragLeave: _onDragLeave2, onDrop: _onDrop2, onAnimationStart: _onAnimationStart2, onAnimationEnd: _onAnimationEnd2, onAnimationIteration: _onAnimationIteration2, onTransitionStart: _onTransitionStart2, onTransitionEnd: _onTransitionEnd2, onTransitionRun: _onTransitionRun2, onTransitionCancel: _onTransitionCancel2, ...motionProps } = props;
    return (_jsx(MotionButton, { ref: ref, className: cn(getVariantStyles(), className), ...getMotionProps(), ...motionProps, children: _jsxs("div", { className: cn('flex items-center justify-center', showLabel ? 'flex-col gap-1' : 'relative'), children: [children, badge !== undefined && badge > 0 && (_jsx(MotionDiv, { className: "absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 text-xs font-semibold text-background bg-accent rounded-full border-2 border-surface", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }, children: badge > 99 ? '99+' : badge }))] }) }));
});
BottomNavBarItem.displayName = 'BottomNavBarItem';
const BottomNavBarIcon = React.forwardRef(({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
        sm: 'w-5 h-5',
        default: 'w-6 h-6',
        lg: 'w-7 h-7'
    };
    return (_jsx("div", { ref: ref, className: cn(sizeClasses[size], className), ...props }));
});
BottomNavBarIcon.displayName = 'BottomNavBarIcon';
const BottomNavBarLabel = React.forwardRef(({ className, size = 'xs', ...props }, ref) => {
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        default: 'text-sm'
    };
    return (_jsx("span", { ref: ref, className: cn(sizeClasses[size], 'font-medium', className), ...props }));
});
BottomNavBarLabel.displayName = 'BottomNavBarLabel';
// Active indicator for floating docks
const BottomNavBarIndicator = React.forwardRef(({ className, variant = 'dot', ...props }, ref) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'line':
                return 'absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-accent rounded-full';
            case 'glow':
                return 'absolute inset-0 rounded-2xl bg-accent/20 blur-md';
            case 'dot':
            default:
                return 'absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full';
        }
    };
    // Exclude HTML event handlers that conflict with Framer Motion
    const { onDrag: _onDrag3, onDragStart: _onDragStart3, onDragEnd: _onDragEnd3, onDragOver: _onDragOver3, onDragEnter: _onDragEnter3, onDragLeave: _onDragLeave3, onDrop: _onDrop3, onAnimationStart: _onAnimationStart3, onAnimationEnd: _onAnimationEnd3, onAnimationIteration: _onAnimationIteration3, onTransitionStart: _onTransitionStart3, onTransitionEnd: _onTransitionEnd3, onTransitionRun: _onTransitionRun3, onTransitionCancel: _onTransitionCancel3, ...motionProps } = props;
    return (_jsx(MotionDiv, { ref: ref, className: cn(getVariantStyles(), className), initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }, ...motionProps }));
});
BottomNavBarIndicator.displayName = 'BottomNavBarIndicator';
export const BottomNavBar = {
    Root: BottomNavBarRoot,
    Content: BottomNavBarContent,
    Item: BottomNavBarItem,
    Icon: BottomNavBarIcon,
    Label: BottomNavBarLabel,
    Indicator: BottomNavBarIndicator,
};
//# sourceMappingURL=BottomNavBar.js.map