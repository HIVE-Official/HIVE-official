"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

const toastVariants = cva(
  'fixed flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm',
  {
    variants: {
      intent: {
        success: 'bg-surface-01/90 border-accent text-foreground',
        error: 'bg-surface-01/90 border-red-500 text-foreground',
        info: 'bg-surface-01/90 border-border text-foreground',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
      },
    },
    defaultVariants: {
      intent: 'info',
      position: 'top-right',
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  isVisible: boolean
  onClose: () => void
  className?: string
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  intent = 'info',
  position = 'top-right',
  className,
  duration = 5000,
}) => {
  React.useEffect(() => {
    if (isVisible && duration !== Infinity) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const Icon = React.useMemo(() => {
    switch (intent) {
      case 'success':
        return CheckCircle
      case 'error':
        return XCircle
      default:
        return Info
    }
  }, [intent])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          className={toastVariants({ intent, position, className })}
          initial={{ opacity: 0, y: position?.includes('top') ? -20 : 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Icon
            className={`h-5 w-5 ${
              intent === 'success'
                ? 'text-accent'
                : intent === 'error'
                ? 'text-red-500'
                : 'text-muted'
            }`}
          />
          <p className="text-body flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors duration-base"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 