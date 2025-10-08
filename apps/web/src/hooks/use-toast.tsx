import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  variant?: 'default' | 'destructive'; // Deprecated - use type instead
}

// Helper type for toast calls - allows either type or variant
type ToastInput = Omit<Toast, 'id'> | (Omit<Omit<Toast, 'id'>, 'type'> & { variant: 'default' | 'destructive' });

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
}

// Hook return type for better type safety
interface UseToastReturn {
  toast: (toast: ToastInput) => void;
  toasts: Toast[];
  dismiss: (id: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: ToastInput) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Map variant to type for backward compatibility
    let type: ToastType;
    if ('type' in toast && toast.type) {
      type = toast.type;
    } else if ('variant' in toast && toast.variant === 'destructive') {
      type = 'error';
    } else if ('variant' in toast && toast.variant === 'default') {
      type = 'info';
    } else {
      type = 'info';
    }

    const newToast: Toast = { ...toast, id, type };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration || 5000;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm
            animate-in slide-in-from-right-5 duration-300
            ${toast.type === 'success' ? 'bg-green-500/90 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500/90 text-white' : ''}
            ${toast.type === 'warning' ? 'bg-yellow-500/90 text-black' : ''}
            ${toast.type === 'info' ? 'bg-blue-500/90 text-white' : ''}
          `}
        >
          {toast.type === 'success' && <Check className="w-5 h-5 mt-0.5" />}
          {toast.type === 'error' && <X className="w-5 h-5 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 mt-0.5" />}

          <div className="flex-1">
            <p className="font-semibold">{toast.title}</p>
            {toast.description && (
              <p className="text-sm opacity-90 mt-1">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast(): UseToastReturn {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return {
    toast: context.addToast,
    toasts: context.toasts,
    dismiss: context.removeToast,
    // Convenience methods
    success: (title: string, description?: string) =>
      context.addToast({ type: 'success', title, description }),
    error: (title: string, description?: string) =>
      context.addToast({ type: 'error', title, description }),
    warning: (title: string, description?: string) =>
      context.addToast({ type: 'warning', title, description }),
    info: (title: string, description?: string) =>
      context.addToast({ type: 'info', title, description }),
  };
}