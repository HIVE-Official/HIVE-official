import React from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { MotionDiv, MotionButton } from './motion-wrapper';

const AppHeaderRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <MotionDiv
          ref={ref}
          className={cn(getVariantStyles(), className)}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ 
            duration: 0.18, 
            ease: [0.33, 0.65, 0, 1]
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
        <MotionDiv 
            ref={ref} 
            className={cn('container flex h-14 items-center', className)} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
        <MotionDiv 
            ref={ref} 
            className={cn('mr-4 flex items-center', className)} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
            {...motionProps} 
        />
    )
});
AppHeaderLogo.displayName = 'AppHeaderLogo';

const AppHeaderNav = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    // Exclude HTML event handlers that conflict with Framer Motion
    const { 
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
        <MotionDiv 
            ref={ref} 
            className={cn('flex items-center space-x-6 text-sm font-medium', className)} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
        <MotionDiv 
            ref={ref} 
            className={cn('flex flex-1 items-center justify-end space-x-4', className)} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <MotionDiv
        ref={ref}
        className={cn(
          'flex items-center gap-3 cursor-pointer transition-all duration-200 max-w-sm w-full',
          getVariantStyles(),
          className
        )}
        onClick={onSearchClick}
        whileHover={{ 
          scale: 1.02
        }}
        whileTap={{ 
          scale: 0.98
        }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        {...motionProps}
      >
        <Search className="w-4 h-4 text-muted flex-shrink-0" />
        <span className="flex-1 text-muted text-sm font-medium">{placeholder}</span>
        <div className="flex items-center gap-1 text-xs text-muted/70">
          <kbd className="hidden sm:inline-flex h-5 px-1.5 items-center border border-border/50 bg-surface-02/50 rounded text-[11px] font-medium">
            {shortcut}
          </kbd>
        </div>
      </MotionDiv>
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <MotionButton
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center text-muted hover:text-accent transition-colors md:hidden',
          getVariantStyles(),
          className
        )}
        whileHover={{ 
          scale: 1.05
        }}
        whileTap={{ 
          scale: 0.95
        }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        {...motionProps}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </MotionButton>
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
      onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragOver: _onDragOver, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDrop: _onDrop,
      onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration,
      onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <MotionButton
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center text-muted hover:text-accent transition-colors',
          getVariantStyles(),
          className
        )}
        whileHover={{ 
          scale: 1.05
        }}
        whileTap={{ 
          scale: 0.95
        }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        {...motionProps}
      >
        <Bell className="w-5 h-5" />
        
        {/* Badge */}
        {(count > 0 || showDot) && (
          <MotionDiv
            className={cn(
              "absolute -top-1 -right-1 flex items-center justify-center border-2 border-surface",
              count > 0 
                ? "min-w-[1.25rem] h-5 text-xs font-semibold text-background bg-accent rounded-full" 
                : "w-2 h-2 bg-accent rounded-full"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
          >
            {count > 0 && (count > 99 ? '99+' : count)}
          </MotionDiv>
        )}
      </MotionButton>
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