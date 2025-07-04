"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

const toastVariants = cva(
  'fixed flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm z-50 max-w-md',
  {
    variants: {
      intent: {
        success: 'bg-[#111111]/95 border-[#FFD700]/60 text-foreground shadow-xl',
        error: 'bg-[#111111]/95 border-[#FFD700]/60 text-foreground shadow-xl',
        info: 'bg-[#111111]/95 border-[#FFD700]/60 text-foreground shadow-xl',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
      },
    },
    defaultVariants: {
      intent: 'info',
      position: 'bottom-right',
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: React.ReactNode
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
          transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        >
          <Icon
            className="h-5 w-5 text-[#FFD700]"
          />
          <div className="text-body flex-1">{message}</div>
          <button
            onClick={onClose}
            className="text-muted hover:text-[#FFD700] transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#111111] rounded-sm"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 