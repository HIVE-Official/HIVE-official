import { ReactNode } from 'react';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type StatusType = 'loading' | 'success' | 'error' | 'warning';

interface AuthStatusProps {
  type: StatusType;
  title: string;
  message: string;
  action?: ReactNode;
}

const statusConfig = {
  loading: {
    icon: Loader2,
    iconClassName: 'animate-spin',
    bgColor: 'bg-[var(--hive-brand-primary)]/20',
    borderColor: 'border-[var(--hive-brand-primary)]/30',
    iconColor: 'text-[var(--hive-brand-primary)]'
  },
  success: {
    icon: CheckCircle,
    iconClassName: '',
    bgColor: 'bg-[var(--hive-status-success)]/20',
    borderColor: 'border-[var(--hive-status-success)]/30',
    iconColor: 'text-[var(--hive-status-success)]'
  },
  error: {
    icon: XCircle,
    iconClassName: '',
    bgColor: 'bg-[var(--hive-status-error)]/20',
    borderColor: 'border-[var(--hive-status-error)]/30',
    iconColor: 'text-[var(--hive-status-error)]'
  },
  warning: {
    icon: AlertCircle,
    iconClassName: '',
    bgColor: 'bg-[var(--hive-status-warning)]/20',
    borderColor: 'border-[var(--hive-status-warning)]/30',
    iconColor: 'text-[var(--hive-status-warning)]'
  }
};

/**
 * Consistent status display component for auth pages
 * Follows HIVE design system with proper tokens
 */
export function AuthStatus({ type, title, message, action }: AuthStatusProps) {
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div className="backdrop-blur-xl bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-glass)] p-[var(--hive-spacing-8)] rounded-xl text-center">
      <div className={`mx-auto w-20 h-20 backdrop-blur-xl rounded-full flex items-center justify-center border mb-[var(--hive-spacing-6)] ${config.bgColor} ${config.borderColor}`}>
        <Icon className={`w-10 h-10 ${config.iconColor} ${config.iconClassName}`} />
      </div>
      
      <div className="space-y-[var(--hive-spacing-4)] text-center">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          {title}
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          {message}
        </p>
        
        {action && (
          <div className="mt-[var(--hive-spacing-6)]">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}