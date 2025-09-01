'use client';

import { useState, useEffect, Suspense } from 'react';
import * as React from 'react';

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// Remove problematic import - create local modal instead

// Local modal component with HIVE styling
function HiveModal({ 
  isOpen, 
  onClose, 
  title, 
  size = "md", 
  showCloseButton = true, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  size?: "sm" | "md" | "lg"; 
  showCloseButton?: boolean; 
  children: React.ReactNode; 
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full ${sizeClasses[size]} bg-hive-background-secondary border border-hive-border-[var(--hive-brand-secondary)] rounded-lg shadow-2xl`}>
        <div className="flex items-center justify-between p-6 border-b border-hive-border-primary">
          <h2 className="text-xl font-semibold text-hive-text-primary">{title}</h2>
          {showCloseButton && (
            <button 
              onClick={onClose}
              className="text-hive-text-muted hover:text-hive-text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Enhanced HIVE logo component with proper branding
function HiveLogo({ variant = "white", size = "lg" }: { variant?: "white" | "black" | "gold"; size?: "sm" | "md" | "lg" | "xl" }) {
  const logoSrc = `/assets/hive-logo-${variant}.svg`;
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10",
    xl: "h-16 w-16"
  };
  
  return (
    <div className="flex items-center justify-center">
      <img
        src={logoSrc}
        alt="HIVE Logo"
        className={`${sizeClasses[size]} object-contain transition-transform duration-200 hover:scale-105`}
        onError={(e) => {
          // Fallback to whitelogo.svg if hive-logo assets don't work
          const target = e.target as HTMLImageElement;
          target.src = "/assets/whitelogo.svg";
        }}
      />
    </div>
  );
}

interface LoginFormData {
  email: string;
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Safely get search params with null checks
  const schoolId = searchParams?.get('schoolId') || null;
  const schoolName = searchParams?.get('schoolName') || null;
  const schoolDomain = searchParams?.get('domain') || null;

  // Debug logging to understand parameter extraction
  useEffect(() => {
    console.log('🔍 Login page parameters debug:', {
      searchParams: searchParams?.toString(),
      schoolId,
      schoolName, 
      schoolDomain,
      allParams: Object.fromEntries(searchParams?.entries() || [])
    });
  }, [searchParams, schoolId, schoolName, schoolDomain]);

  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);
   
  const [_isRedirecting] = useState(false);

  // Redirect if missing required school context
  useEffect(() => {
    if (!schoolId || !schoolName || !schoolDomain) {
      router.push('/schools');
    }
  }, [schoolId, schoolName, schoolDomain, router]);

  // Show loading if redirecting due to missing school context
  if (!schoolId || !schoolName || !schoolDomain) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin mx-auto" />
          <p className="text-muted">Redirecting to school selection...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate email before submitting
    const emailValidationError = validateEmail(formData.email.trim());
    if (emailValidationError) {
      setError(emailValidationError);
      setIsLoading(false);
      return;
    }

    try {
      // Save email for magic link verification
      window.localStorage.setItem('emailForSignIn', formData.email);
      
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          schoolId,
        }),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      // SECURITY: Development auth bypass removed for production safety
      // All authentication must go through proper magic link verification

      // Store dev magic link if available
      if (data.devMode && data.magicLink) {
        setDevMagicLink(data.magicLink);
      }

      setSuccess(true);
    } catch (err) {
      console.error('Authentication error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      
      // Provide more specific error messages with actionable advice
      let userFriendlyError = errorMessage;
      
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        userFriendlyError = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('Invalid email')) {
        userFriendlyError = 'Please enter a valid email address.';
      } else if (errorMessage.includes('unauthorized') || errorMessage.includes('not authorized')) {
        userFriendlyError = `This email is not authorized for ${schoolName}. Please use your @${schoolDomain} email address.`;
      } else if (errorMessage.includes('rate limit')) {
        userFriendlyError = 'Too many attempts. Please wait a few minutes before trying again.';
      } else if (errorMessage.includes('server') || errorMessage.includes('500')) {
        userFriendlyError = 'Server error. Please try again in a few moments.';
      } else if (errorMessage.includes('timeout')) {
        userFriendlyError = 'Request timed out. Please check your connection and try again.';
      } else if (errorMessage.includes('domain')) {
        userFriendlyError = `Please use your @${schoolDomain} email address for ${schoolName}.`;
      }
      
      setError(userFriendlyError);
      
      // Auto-clear error after 5 seconds for better UX
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string): string | null => {
    if (!email) return null;
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    // Domain validation (bypass for test.edu domain)
    const isTestDomain = schoolDomain === 'test.edu';
    if (!isTestDomain && schoolDomain && !email.toLowerCase().endsWith(`@${schoolDomain.toLowerCase()}`)) {
      return `Please use your @${schoolDomain} email address`;
    }
    
    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ email });
    
    // Clear previous errors
    setError(null);
    
    // Validate email if not empty
    if (email.trim()) {
      const validationError = validateEmail(email.trim());
      if (validationError) {
        setError(validationError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 border-b border-accent/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/schools" 
              className="flex items-center gap-2 text-gray-400 hover:text-[var(--hive-text-inverse)] transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to schools</span>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/landing" className="hover:opacity-90 transition-all duration-200 flex items-center gap-3 group">
                <HiveLogo variant="white" size="lg" />
                <span className="text-3xl font-bold text-[var(--hive-text-inverse)] tracking-tight group-hover:text-yellow-400 transition-colors duration-200">HIVE</span>
              </Link>
            </div>
            
            <div className="w-32" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg">
          
          {/* Development Mode Badge */}
          {schoolDomain === 'test.edu' && (
            <div className="mb-8">
              <div className="text-center p-4 bg-hive-status-warning/10 border border-hive-status-warning/30 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-hive-status-warning font-medium">
                  🛠️ Development Mode Active
                </p>
              </div>
            </div>
          )}

          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-4 sm:mb-6">
                Sign in to HIVE
              </h1>
              <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-sm mx-auto px-4 sm:px-0">
                Join <span className="text-accent font-semibold">University at Buffalo</span> on HIVE
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="mb-6">
            <div className="p-6 sm:p-8 bg-hive-background-secondary/80 border border-hive-border-[var(--hive-brand-secondary)] shadow-2xl backdrop-blur-sm rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-hive-text-primary mb-3">
                        School email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder={schoolDomain === 'test.edu' ? 'Enter any email address (dev mode)' : `Enter your @${schoolDomain} address`}
                        required
                        disabled={isLoading}
                        autoComplete="email"
                        autoFocus
                        className={`w-full text-lg px-4 py-3 bg-hive-background-secondary border rounded-lg text-hive-text-primary placeholder-hive-text-placeholder focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 focus:border-hive-brand-primary transition-colors ${error ? 'border-hive-status-error focus:border-hive-status-error focus:ring-hive-status-error/50' : 'border-hive-border-primary'}`}
                        data-testid="email-input"
                        aria-label={`Email address for ${schoolName}`}
                        aria-required="true"
                        aria-invalid={!!error}
                        aria-describedby={error ? "email-error" : undefined}
                      />
                    </div>
                    
                    {!error && schoolDomain === 'test.edu' && (
                      <p className="text-xs text-hive-text-muted">
                        Dev mode: Any email will work for testing
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="overflow-hidden">
                      <div id="email-error" className="p-4 bg-hive-status-error/10 border border-hive-status-error/30 rounded-lg">
                        <p className="text-sm text-hive-status-error" role="alert" aria-live="polite">{error}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !formData.email || !!error}
                    className="w-full text-lg px-6 py-4 bg-transparent border-2 border-hive-brand-primary text-hive-brand-primary rounded-lg hover:bg-hive-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    data-testid="send-magic-link-button"
                    aria-label="Send magic link to email"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending magic link...</span>
                      </div>
                    ) : (
                      'Send magic link'
                    )}
                  </button>
                </form>
            </div>
          </div>


        </div>
      </div>

      {/* Redirect Success Modal */}
      <Modal
        isOpen={_isRedirecting}
        onClose={() => {}}
        title="Authentication successful"
        size="sm"
        showCloseButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-success/20 border border-success/30">
            <Loader2 className="w-8 h-8 text-success animate-spin" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Welcome to HIVE!
            </h3>
            <p className="text-muted">
              Redirecting you to the platform...
            </p>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={success}
        onClose={() => setSuccess(false)}
        title="Check your inbox"
        size="sm"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-hive-status-success/20 border border-hive-status-success/30">
            <Mail className="w-8 h-8 text-hive-status-success" />
          </div>
          
          <div className="space-y-3">
            <p className="text-muted">
              Magic link sent to
            </p>
            <p className="text-accent font-semibold break-all">
              {formData.email}
            </p>
            
            {/* Development mode - show the magic link */}
            {devMagicLink && schoolDomain === 'test.edu' && (
              <div className="p-4 bg-hive-status-warning/10 border border-hive-status-warning/30 text-left rounded-lg">
                <p className="text-xs text-hive-status-warning font-medium mb-2">
                  🛠️ Development Mode - Magic Link:
                </p>
                <a 
                  href={devMagicLink}
                  className="text-xs text-hive-status-warning hover:underline break-all"
                >
                  {devMagicLink}
                </a>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4">
            {devMagicLink && schoolDomain === 'test.edu' && (
              <button
                className="w-full px-6 py-4 bg-transparent border-2 border-hive-brand-primary text-hive-brand-primary rounded-lg hover:bg-hive-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 transition-all duration-200 font-medium"
                onClick={() => window.location.href = devMagicLink}
              >
                Use Dev Magic Link
              </button>
            )}
            <button
              className="w-full px-6 py-4 bg-transparent border-2 border-hive-border-primary text-hive-text-secondary rounded-lg hover:bg-hive-background-tertiary/10 focus:outline-none focus:ring-2 focus:ring-hive-border-primary/50 transition-all duration-200 font-medium"
              onClick={() => {
                setSuccess(false);
                setDevMagicLink(null);
              }}
            >
              Send another link
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-accent animate-spin" />
          <span className="text-muted">Loading...</span>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}

export default function LoginPage() {
  return <LoginPageWrapper />;
}