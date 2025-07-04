"use client";

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ErrorBoundary } from './error-boundary'
import { cn } from '../lib/utils'

const dialogVariants = cva(
  'relative bg-surface rounded-xl shadow-2xl border-2 border-accent/20 overflow-hidden ring-1 ring-white/10',
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface DialogProps extends VariantProps<typeof dialogVariants> {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  className,
}, ref) => {
  const dialogRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Merge refs
  const mergedRef = React.useMemo(() => {
    if (ref) {
      return (node: HTMLDivElement | null) => {
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
        dialogRef.current = node
      }
    }
    return dialogRef
  }, [ref])

  // Handle click outside
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            ref={mergedRef}
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby={description ? 'dialog-description' : undefined}
            aria-modal="true"
            className={dialogVariants({ size, className })}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-muted hover:text-foreground transition-colors duration-base"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Dialog header */}
            <div className="p-6 pb-4">
              <h2 id="dialog-title" className="text-h3 font-display font-semibold">
                {title}
              </h2>
              {description && (
                <p id="dialog-description" className="mt-2 text-body text-muted">
                  {description}
                </p>
              )}
            </div>

            {/* Dialog content with error boundary */}
            <ErrorBoundary>
              <DialogContent>{children}</DialogContent>
            </ErrorBoundary>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Dialog.displayName = 'Dialog' 