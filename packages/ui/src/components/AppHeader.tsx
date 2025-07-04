import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { hiveVariants, useAdaptiveMotion } from '../lib/motion';

const AppHeaderRoot = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & {
      variant?: 'default' | 'minimal' | 'floating'
      transparent?: boolean
      hideOnScroll?: boolean
    }
>(({ className, variant = 'default', transparent = false, hideOnScroll = false, ...props }, ref) => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(true)
    const lastScrollY = React.useRef(0)
    
    React.useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY
        setIsScrolled(currentScrollY > 10)
        
        if (hideOnScroll) {
          setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 50)
        }
        
        lastScrollY.current = currentScrollY
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [hideOnScroll])
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'minimal':
          return cn(
            'sticky top-0 z-50 w-full',
            transparent || !isScrolled 
              ? 'bg-transparent border-transparent' 
              : 'bg-background/80 border-b backdrop-blur-xl'
          )
        case 'floating':
          return cn(
            'fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl border shadow-lg max-w-4xl mx-auto',
            'bg-surface/90 backdrop-blur-xl'
          )
        case 'default':
        default:
          return cn(
            'sticky top-0 z-50 w-full border-b transition-all duration-300',
            transparent && !isScrolled 
              ? 'bg-transparent border-transparent' 
              : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          )
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
      <motion.header
          ref={ref}
          className={cn(getVariantStyles(), className)}
          variants={hiveVariants.slideDown}
          initial="hidden"
          animate={{ 
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30 
          }}
          {...motionProps}
      />
    )
});
AppHeaderRoot.displayName = 'AppHeaderRoot';

const AppHeaderContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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
            className={cn('container flex h-14 items-center', className)} 
            variants={hiveVariants.container}
            initial="hidden"
            animate="visible"
            {...motionProps} 
        />
    )
});
AppHeaderContent.displayName = 'AppHeaderContent';

const AppHeaderLogo = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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
            className={cn('mr-4 flex items-center', className)} 
            variants={hiveVariants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...motionProps} 
        />
    )
});
AppHeaderLogo.displayName = 'AppHeaderLogo';

const AppHeaderNav = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
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
            className={cn('flex items-center space-x-6 text-sm font-medium', className)} 
            variants={hiveVariants.item}
            {...motionProps} 
        />
    )
});
AppHeaderNav.displayName = 'AppHeaderNav';

const AppHeaderActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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
            className={cn('flex flex-1 items-center justify-end space-x-4', className)} 
            variants={hiveVariants.item}
            {...motionProps} 
        />
    )
});
AppHeaderActions.displayName = 'AppHeaderActions';

// Modern search command palette
const AppHeaderSearch = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      placeholder?: string
      variant?: 'chip' | 'minimal' | 'command'
      shortcut?: string
      onSearchClick?: () => void
    }
>(({ className, placeholder = "Search...", variant = 'chip', shortcut = "⌘K", onSearchClick, ...props }, ref) => {
    const { createTransition } = useAdaptiveMotion('academic')
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'minimal':
          return 'rounded-lg bg-transparent border border-transparent hover:border-border hover:bg-surface-01/50 px-3 py-2'
        case 'command':
          return 'rounded-xl bg-surface-01/50 border border-border hover:border-accent/30 hover:bg-surface-01 px-4 py-2.5 shadow-sm'
        case 'chip':
        default:
          return 'rounded-2xl bg-surface-01/30 border border-border hover:border-accent/40 hover:bg-surface-01 px-4 py-2'
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
        className={cn(
          'flex items-center gap-3 cursor-pointer transition-all duration-200 max-w-sm w-full',
          getVariantStyles(),
          className
        )}
        onClick={onSearchClick}
        whileHover={{ 
          scale: 1.02,
          transition: createTransition('fast')
        }}
        whileTap={{ 
          scale: 0.98,
          transition: createTransition('fast')
        }}
        {...motionProps}
      >
        <Search className="w-4 h-4 text-muted flex-shrink-0" />
        <span className="flex-1 text-muted text-sm font-medium">{placeholder}</span>
        <div className="flex items-center gap-1 text-xs text-muted/70">
          <kbd className="hidden sm:inline-flex h-5 px-1.5 items-center border border-border/50 bg-surface-02/50 rounded text-[11px] font-medium">
            {shortcut}
          </kbd>
        </div>
      </motion.div>
    )
});
AppHeaderSearch.displayName = 'AppHeaderSearch';

// Mobile menu button
const AppHeaderMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      isOpen?: boolean
      variant?: 'chip' | 'minimal'
    }
>(({ className, isOpen = false, variant = 'chip', ...props }, ref) => {
    const { createTransition } = useAdaptiveMotion('navigation')
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'minimal':
          return 'rounded-lg p-2 hover:bg-surface-01/50'
        case 'chip':
        default:
          return 'rounded-2xl p-2.5 bg-surface-01/30 border border-border hover:border-accent/40 hover:bg-surface-01'
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
        className={cn(
          'inline-flex items-center justify-center text-muted hover:text-accent transition-colors md:hidden',
          getVariantStyles(),
          className
        )}
        whileHover={{ 
          scale: 1.05,
          transition: createTransition('fast')
        }}
        whileTap={{ 
          scale: 0.95,
          transition: createTransition('fast')
        }}
        {...motionProps}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
});
AppHeaderMenuButton.displayName = 'AppHeaderMenuButton';

// Notification button with badge
const AppHeaderNotifications = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      count?: number
      variant?: 'chip' | 'minimal'
      showDot?: boolean
    }
>(({ className, count = 0, variant = 'chip', showDot = false, ...props }, ref) => {
    const { createTransition } = useAdaptiveMotion('navigation')
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'minimal':
          return 'rounded-lg p-2 hover:bg-surface-01/50'
        case 'chip':
        default:
          return 'rounded-2xl p-2.5 bg-surface-01/30 border border-border hover:border-accent/40 hover:bg-surface-01'
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
        className={cn(
          'relative inline-flex items-center justify-center text-muted hover:text-accent transition-colors',
          getVariantStyles(),
          className
        )}
        whileHover={{ 
          scale: 1.05,
          transition: createTransition('fast')
        }}
        whileTap={{ 
          scale: 0.95,
          transition: createTransition('fast')
        }}
        {...motionProps}
      >
        <Bell className="w-5 h-5" />
        
        {/* Badge */}
        {(count > 0 || showDot) && (
          <motion.div
            className={cn(
              "absolute -top-1 -right-1 flex items-center justify-center border-2 border-surface",
              count > 0 
                ? "min-w-[1.25rem] h-5 text-xs font-semibold text-background bg-accent rounded-full" 
                : "w-2 h-2 bg-accent rounded-full"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {count > 0 && (count > 99 ? '99+' : count)}
          </motion.div>
        )}
      </motion.button>
    )
});
AppHeaderNotifications.displayName = 'AppHeaderNotifications';

export const AppHeader = {
    Root: AppHeaderRoot,
    Content: AppHeaderContent,
    Logo: AppHeaderLogo,
    Nav: AppHeaderNav,
    Actions: AppHeaderActions,
    Search: AppHeaderSearch,
    MenuButton: AppHeaderMenuButton,
    Notifications: AppHeaderNotifications,
}; 