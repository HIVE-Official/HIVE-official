import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useFocusTrap } from '@hive/hooks'

const dialogVariants = cva(
  'relative bg-surface-01 rounded-xl shadow-2xl border border-border overflow-hidden',
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

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  className,
}) => {
  const dialogRef = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    onEscape: onClose,
  })

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
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

            {/* Dialog content */}
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 