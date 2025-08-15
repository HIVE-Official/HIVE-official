'use client';

import { useState, useEffect, Suspense } from 'react';

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiveButton, HiveInput, HiveCard, HiveLogo } from "@hive/ui";
import { HiveModal } from "@/components/temp-stubs";

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

  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);
   
  const [_isRedirecting, _setIsRedirecting] = useState(false);

  // Redirect if missing required school context
  useEffect(() => {
    if (!schoolId || !schoolName || !schoolDomain) {
      router.push('/schools');
    }
  }, [schoolId, schoolName, schoolDomain, router]);

  // Show loading if redirecting due to missing school context
  if (!schoolId || !schoolName || !schoolDomain) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-[var(--hive-brand-primary)] animate-spin mx-auto" />
          <p className="text-[var(--hive-text-secondary)]">Redirecting to school selection...</p>
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
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-primary)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <motion.div 
        className="relative z-10 border-b border-[var(--hive-border-primary)]/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/schools" 
              className="flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to schools</span>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/landing" className="hover:opacity-80 transition-opacity duration-200">
                <HiveLogo size="md" variant="gold" showWordmark={true} />
              </Link>
            </div>
            
            <div className="w-32" />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          
          {/* Development Mode Badge */}
          {schoolDomain === 'test.edu' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <HiveCard className="text-center p-4 bg-[var(--hive-overlay-gold-subtle)] border-[var(--hive-border-gold)]">
                <p className="text-sm text-[var(--hive-brand-primary)] font-medium">
                  🛠️ Development Mode Active
                </p>
              </HiveCard>
            </motion.div>
          )}

          {/* Title Section */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--hive-text-primary)] tracking-tight leading-tight mb-4">
              Sign in to HIVE
            </h1>
            <p className="text-lg text-[var(--hive-text-secondary)] leading-relaxed">
              Join <span className="text-[var(--hive-brand-primary)] font-semibold">{schoolName}</span> on HIVE
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <HiveCard className="p-8 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] shadow-[var(--hive-shadow-level2)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
                      School email address
                    </label>
                  <HiveInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder={schoolDomain === 'test.edu' ? 'Enter any email address (dev mode)' : `Enter your @${schoolDomain} address`}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                    variant={error ? 'error' : 'default'}
                    size="lg"
                    className="w-full"
                    data-testid="email-input"
                    aria-label={`Email address for ${schoolName}`}
                    aria-required="true"
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  </div>
                  
                  {!error && schoolDomain === 'test.edu' && (
                    <p className="text-xs text-[var(--hive-text-tertiary)]">
                      Dev mode: Any email will work for testing
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div id="email-error" className="p-4 rounded-xl bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20">
                        <p className="text-sm text-[var(--hive-status-error)]" role="alert" aria-live="polite">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <HiveButton
                  type="submit"
                  disabled={isLoading || !formData.email || !!error}
                  variant="premium"
                  size="xl"
                  className="w-full"
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
                </HiveButton>
              </form>
            </HiveCard>
          </motion.div>


        </div>
      </div>

      {/* Redirect Success Modal */}
      <HiveModal
        isOpen={_isRedirecting}
        onClose={() => {}}
        title="Authentication successful"
        size="sm"
        showCloseButton={false}
      >
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[var(--hive-status-success)]/20 border border-[var(--hive-status-success)]/30">
            <Loader2 className="w-8 h-8 text-[var(--hive-status-success)] animate-spin" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              Welcome to HIVE!
            </h3>
            <p className="text-[var(--hive-text-secondary)]">
              Redirecting you to the platform...
            </p>
          </div>
        </motion.div>
      </HiveModal>

      {/* Success Modal */}
      <HiveModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        title="Check your inbox"
        size="sm"
      >
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[var(--hive-status-success)]/20 border border-[var(--hive-status-success)]/30">
            <Mail className="w-8 h-8 text-[var(--hive-status-success)]" />
          </div>
          
          <div className="space-y-3">
            <p className="text-[var(--hive-text-secondary)]">
              Magic link sent to
            </p>
            <p className="text-[var(--hive-brand-primary)] font-semibold break-all">
              {formData.email}
            </p>
            
            {/* Development mode - show the magic link */}
            {devMagicLink && schoolDomain === 'test.edu' && (
              <HiveCard className="p-4 bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-left">
                <p className="text-xs text-[var(--hive-brand-primary)] font-medium mb-2">
                  🛠️ Development Mode - Magic Link:
                </p>
                <a 
                  href={devMagicLink}
                  className="text-xs text-[var(--hive-brand-primary)] hover:underline break-all"
                >
                  {devMagicLink}
                </a>
              </HiveCard>
            )}
          </div>

          <div className="space-y-4 pt-4">
            {devMagicLink && schoolDomain === 'test.edu' && (
              <HiveButton
                variant="premium"
                size="xl"
                className="w-full"
                onClick={() => window.location.href = devMagicLink}
              >
                Use Dev Magic Link
              </HiveButton>
            )}
            <HiveButton
              variant="secondary"
              size="xl"
              className="w-full"
              onClick={() => {
                setSuccess(false);
                setDevMagicLink(null);
              }}
            >
              Send another link
            </HiveButton>
          </div>
        </motion.div>
      </HiveModal>
    </div>
  );
}

function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-[var(--hive-brand-primary)] animate-spin" />
          <span className="text-[var(--hive-text-secondary)]">Loading...</span>
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