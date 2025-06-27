import React, { createContext, useContext, useCallback, useState } from 'react'
import { Toast, type ToastProps } from './toast'

type ToastOptions = Omit<ToastProps, 'isVisible' | 'onClose' | 'message'>

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string
    isVisible: boolean
    options?: ToastOptions
  }>({
    message: '',
    isVisible: false,
  })

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }, [])

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    setToast({
      message,
      isVisible: true,
      options,
    })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        {...toast.options}
      />
    </ToastContext.Provider>
  )
} 