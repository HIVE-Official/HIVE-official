"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter, HiveModalClose } from "./hive-modal"
import { Button } from "./button"

export interface HiveConfirmModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive" | "warning"
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}

const HiveConfirmModal = React.forwardRef<HTMLDivElement, HiveConfirmModalProps>(
  ({
    open,
    onOpenChange,
    onClose,
    title = "Confirm Action",
    description = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    onConfirm,
    onCancel,
    loading = false,
    disabled = false,
    children,
    className,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleModalClose = React.useCallback((newOpen: boolean) => {
      onOpenChange?.(newOpen)
      // Call onClose when modal is being closed
      if (!newOpen && onClose) {
        onClose()
      }
    }, [onOpenChange, onClose])

    const handleConfirm = React.useCallback(async () => {
      if (!onConfirm || loading || disabled) return

      try {
        setIsLoading(true)
        await onConfirm()
        handleModalClose(false)
      } catch (error) {
        console.error("HiveConfirmModal: Confirm action failed:", error)
      } finally {
        setIsLoading(false)
      }
    }, [onConfirm, loading, disabled, handleModalClose])

    const handleCancel = React.useCallback(() => {
      if (loading || isLoading) return
      onCancel?.()
      handleModalClose(false)
    }, [onCancel, loading, isLoading, handleModalClose])

    const getVariantStyles = () => {
      switch (variant) {
        case "destructive":
          return {
            confirmButton: "destructive",
            iconColor: "text-[var(--hive-status-error)]"
          }
        case "warning":
          return {
            confirmButton: "default",
            iconColor: "text-[var(--hive-status-warning)]"
          }
        default:
          return {
            confirmButton: "default",
            iconColor: "text-[var(--hive-brand-primary)]"
          }
      }
    }

    const variantStyles = getVariantStyles()
    const isProcessing = loading || isLoading

    return (
      <HiveModal open={open} onOpenChange={handleModalClose}>
        <HiveModalContent
          className={cn("max-w-md", className)}
          {...props}
        >
          <HiveModalHeader>
            <div className="flex items-center space-x-3">
              {variant === "destructive" && (
                <div className={cn("p-2 rounded-full bg-[var(--hive-status-error-bg)]", variantStyles.iconColor)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
              )}
              {variant === "warning" && (
                <div className={cn("p-2 rounded-full bg-[var(--hive-status-warning-bg)]", variantStyles.iconColor)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <circle cx="12" cy="17" r="1"></circle>
                  </svg>
                </div>
              )}
              {variant === "default" && (
                <div className={cn("p-2 rounded-full bg-[var(--hive-brand-primary-bg)]", variantStyles.iconColor)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
              )}
              <div>
                <HiveModalTitle className="text-left">{title}</HiveModalTitle>
                {description && (
                  <HiveModalDescription className="text-left">
                    {description}
                  </HiveModalDescription>
                )}
              </div>
            </div>
          </HiveModalHeader>

          {children && (
            <div className="px-6 py-4">
              {children}
            </div>
          )}

          <HiveModalFooter>
            <div className="flex items-center justify-end space-x-3 w-full">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isProcessing}
              >
                {cancelText}
              </Button>
              <Button
                variant={variantStyles.confirmButton as any}
                onClick={handleConfirm}
                disabled={disabled || isProcessing}
              >
                {isProcessing ? "Processing..." : confirmText}
              </Button>
            </div>
          </HiveModalFooter>
        </HiveModalContent>
      </HiveModal>
    )
  }
)

HiveConfirmModal.displayName = "HiveConfirmModal"

export { HiveConfirmModal }