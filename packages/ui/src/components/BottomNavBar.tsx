import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { createGoldAccent, useAdaptiveMotion } from '../lib/motion';

const BottomNavBarRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    variant?: 'fixed' | 'floating' | 'dock'
    hideOnScroll?: boolean
  }
>(({ className, variant = 'floating', hideOnScroll = false, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)
  
  React.useEffect(() => {
    if (!hideOnScroll) return
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10)
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideOnScroll])
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'fixed':
        return 'fixed bottom-0 left-0 w-full border-t bg-background'
      case 'dock':
        return 'fixed bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border bg-surface/80 backdrop-blur-xl shadow-lg'
      case 'floating':
      default:
        return 'fixed bottom-6 left-1/2 -translate-x-1/2 rounded-3xl border bg-surface/90 backdrop-blur-xl shadow-xl'
    }
  }
  
  // Exclude HTML event handlers that conflict with Framer Motion
  const { 
    onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
    onAnimationStart, onAnimationEnd, onAnimationIteration,
    onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
    ...motionProps 
  } = props
  
  return (
    <motion.nav
      ref={ref}
      className={cn(
        'z-50 transition-all duration-300',
        getVariantStyles(),
        className
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      {...motionProps}
    />
  )
});
BottomNavBarRoot.displayName = 'BottomNavBarRoot';

const BottomNavBarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    itemCount?: number
  }
>(({ className, itemCount = 3, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full items-center justify-center font-medium px-2',
      itemCount <= 3 && 'gap-8',
      itemCount === 4 && 'gap-6', 
      itemCount >= 5 && 'gap-4',
      className
    )}
    {...props}
  />
));
BottomNavBarContent.displayName = 'BottomNavBarContent';

interface BottomNavBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'pill' | 'chip' | 'minimal' | 'bubble'
  showLabel?: boolean
  badge?: number
  enableMotion?: boolean
}

const BottomNavBarItem = React.forwardRef<
  HTMLButtonElement,
  BottomNavBarItemProps
>(({ 
  className, 
  isActive = false, 
  variant = 'bubble',
  showLabel = false,
  badge,
  enableMotion = true,
  children,
  ...props 
}, ref) => {
  const { createTransition } = useAdaptiveMotion('navigation')
  
  const getVariantStyles = () => {
    const base = 'relative inline-flex items-center justify-center transition-all duration-200 ease-smooth'
    
    switch (variant) {
      case 'pill':
        return cn(base, 
          'rounded-full px-4 py-2 min-w-[3rem]',
          isActive 
            ? 'bg-accent/15 text-accent border border-accent/30' 
            : 'text-muted hover:bg-accent/10 hover:text-accent'
        )
      case 'chip':
        return cn(base,
          'rounded-2xl px-3 py-2 min-w-[2.5rem]',
          isActive 
            ? 'bg-accent/15 text-accent border border-accent/30' 
            : 'text-muted hover:bg-surface-01 hover:text-accent'
        )
      case 'minimal':
        return cn(base,
          'rounded-lg px-2 py-2',
          isActive 
            ? 'text-accent' 
            : 'text-muted hover:text-accent'
        )
      case 'bubble':
      default:
        return cn(base,
          'rounded-2xl p-3 min-w-[3rem] min-h-[3rem]',
          isActive 
            ? 'bg-accent/15 text-accent shadow-lg shadow-accent/20 scale-110' 
            : 'text-muted hover:bg-surface-01 hover:text-accent hover:scale-105'
        )
    }
  }
  
  const getMotionProps = () => {
    if (!enableMotion) return {}
    
    return {
      whileHover: { 
        scale: isActive ? 1.1 : 1.05,
        transition: createTransition('fast')
      },
      whileTap: { 
        scale: 0.95,
        transition: createTransition('fast') 
      },
      ...(isActive && createGoldAccent('fast'))
    }
  }
  
  // Exclude HTML event handlers that conflict with Framer Motion
  const { 
    onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
    onAnimationStart, onAnimationEnd, onAnimationIteration,
    onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
    ...motionProps 
  } = props
  
  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn(getVariantStyles(), className)}
      {...getMotionProps()}
      {...motionProps}
    >
      <div className={cn(
        'flex items-center justify-center',
        showLabel ? 'flex-col gap-1' : 'relative'
      )}>
        {children}
        
        {/* Badge indicator */}
        {badge !== undefined && badge > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 text-xs font-semibold text-background bg-accent rounded-full border-2 border-surface"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {badge > 99 ? '99+' : badge}
          </motion.div>
        )}
      </div>
    </motion.button>
  )
});
BottomNavBarItem.displayName = 'BottomNavBarItem';

const BottomNavBarIcon = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      size?: 'sm' | 'default' | 'lg'
    }
>(({ className, size = 'default', ...props }, ref) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    default: 'w-6 h-6',
    lg: 'w-7 h-7'
  }
  
  return (
    <div ref={ref} className={cn(sizeClasses[size], className)} {...props} />
  )
});
BottomNavBarIcon.displayName = 'BottomNavBarIcon';

const BottomNavBarLabel = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement> & {
      size?: 'xs' | 'sm' | 'default'
    }
>(({ className, size = 'xs', ...props }, ref) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm', 
    default: 'text-sm'
  }
  
  return (
    <span ref={ref} className={cn(sizeClasses[size], 'font-medium', className)} {...props} />
  )
});
BottomNavBarLabel.displayName = 'BottomNavBarLabel';

// Active indicator for floating docks
const BottomNavBarIndicator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      variant?: 'dot' | 'line' | 'glow'
    }
>(({ className, variant = 'dot', ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'line':
        return 'absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-accent rounded-full'
      case 'glow':
        return 'absolute inset-0 rounded-2xl bg-accent/20 blur-md'
      case 'dot':
      default:
        return 'absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full'
    }
  }
  
  // Exclude HTML event handlers that conflict with Framer Motion
  const { 
    onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
    onAnimationStart, onAnimationEnd, onAnimationIteration,
    onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
    ...motionProps 
  } = props
  
  return (
    <motion.div
      ref={ref}
      className={cn(getVariantStyles(), className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      {...motionProps}
    />
  )
});
BottomNavBarIndicator.displayName = 'BottomNavBarIndicator';


export const BottomNavBar = {
    Root: BottomNavBarRoot,
    Content: BottomNavBarContent,
    Item: BottomNavBarItem,
    Icon: BottomNavBarIcon,
    Label: BottomNavBarLabel,
    Indicator: BottomNavBarIndicator,
} 