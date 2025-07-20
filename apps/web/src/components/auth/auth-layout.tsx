import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HiveLogo } from '@hive/ui';

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
    <div className="relative min-h-screen overflow-hidden bg-hive-background-primary text-hive-text-primary">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-hive-background-primary via-hive-background-secondary to-hive-background-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 border-b border-hive-border-primary/30 hive-glass">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            {showBackButton ? (
              <Link href={backHref} className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 text-hive-text-muted hover:text-hive-text-primary">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">{backText}</span>
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
      <div className="relative z-10 max-w-md mx-auto p-6 py-16">
        <div className="text-center mb-12">
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 rounded-lg bg-hive-brand-primary/10 border border-hive-brand-primary/30">
              <p className="text-sm text-hive-brand-primary font-medium">
                🛠️ Development Mode Active
              </p>
            </div>
          )}
          
          <h1 className="hive-font-sans text-4xl md:text-5xl font-bold mb-4 text-hive-text-primary leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="hive-font-sans text-xl mb-4 text-hive-text-secondary leading-relaxed">
              {subtitle}
            </p>
          )}
          
          <p className="hive-font-sans text-sm text-hive-text-muted leading-relaxed">
            Your campus. Built by students who got tired of GroupMe chaos.
          </p>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}