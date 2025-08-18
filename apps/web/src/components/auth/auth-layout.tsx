import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HiveLogo } from "@hive/ui";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

/**
 * Consistent auth layout following HIVE design system
 * Used across all authentication pages for consistency
 */
export function AuthLayout({ 
  children, 
  title, 
  subtitle,
  showBackButton = false,
  backHref = "/schools",
  backText = "Back to schools"
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-primary)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 border-b border-[var(--hive-border-primary)]/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto p-[var(--hive-spacing-6)]">
          <div className="flex items-center justify-between">
            {showBackButton ? (
              <Link href={backHref} className="flex items-center gap-[var(--hive-spacing-2)] hover:opacity-80 transition-all duration-200 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{backText}</span>
              </Link>
            ) : (
              <div className="w-24"></div>
            )}
            
            <Link href="/landing" className="hover:opacity-80 transition-all duration-200">
              <HiveLogo size="md" variant="gold" showWordmark={true} />
            </Link>
            
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto p-[var(--hive-spacing-6)] py-16">
        <div className="text-center mb-12">
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-[var(--hive-spacing-4)] p-[var(--hive-spacing-3)] rounded-lg bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30">
              <p className="text-sm text-[var(--hive-brand-primary)] font-medium">
                🛠️ Development Mode Active
              </p>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-[var(--hive-spacing-4)] text-[var(--hive-text-primary)] leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl mb-[var(--hive-spacing-4)] text-[var(--hive-text-secondary)] leading-relaxed">
              {subtitle}
            </p>
          )}
          
          <p className="text-sm text-[var(--hive-text-muted)] leading-relaxed">
            Your campus. Built by students who got tired of GroupMe chaos.
          </p>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}