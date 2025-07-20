'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiveButton, HiveInput, HiveCard, HiveModal, HiveLogo } from '@hive/ui';

interface LoginFormData {
  email: string;
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const schoolId = searchParams.get('schoolId');
  const schoolName = searchParams.get('schoolName');
  const schoolDomain = searchParams.get('domain');

  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);

  // Redirect if no school context
  if (!schoolId || !schoolName || !schoolDomain) {
    router.push('/schools');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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

      // Store dev magic link if available
      if (data.devMode && data.magicLink) {
        setDevMagicLink(data.magicLink);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ email });
    setError(null);
    
    // Real-time validation (bypass domain check in development)
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (email && !email.includes('@')) {
      setError('Please enter a valid email address');
    } else if (email && !isDevelopment && schoolDomain && !email.endsWith(`@${schoolDomain}`)) {
      setError(`Please use your @${schoolDomain} email address`);
    }
  };

  return (
    <div className="min-h-screen bg-hive-background-primary text-hive-text-primary flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-hive-background-primary via-hive-background-secondary to-hive-background-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <motion.div 
        className="relative z-10 border-b border-hive-border-primary/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/schools" 
              className="flex items-center gap-2 text-hive-text-muted hover:text-hive-text-primary transition-colors duration-200 group"
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
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <HiveCard className="text-center p-4 bg-hive-brand-primary/10 border-hive-brand-primary/30">
                <p className="hive-font-sans text-sm text-hive-brand-primary font-medium">
                  🛠️ Development Mode Active
                </p>
              </HiveCard>
            </motion.div>
          )}

          {/* Title Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="hive-font-sans text-4xl lg:text-5xl font-bold text-hive-text-primary tracking-tight leading-tight mb-4">
              Sign in to HIVE
            </h1>
            <p className="hive-font-sans text-xl text-hive-text-secondary leading-relaxed mb-2">
              Join <span className="text-hive-brand-primary font-semibold">{schoolName}</span> on HIVE
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <HiveCard className="p-8 bg-hive-background-secondary/40 backdrop-blur-xl border border-hive-border-primary/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="block hive-font-sans text-sm font-medium text-hive-text-primary">
                    School email address
                  </label>
                  <HiveInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder={process.env.NODE_ENV === 'development' ? 'Enter any email address (dev mode)' : `Enter your @${schoolDomain} address`}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                    variant={error ? 'error' : 'premium'}
                    size="lg"
                    floatingLabel={false}
                    className="w-full"
                  />
                  {!error && process.env.NODE_ENV === 'development' && (
                    <p className="hive-font-sans text-xs text-hive-text-muted">
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
                      <div className="p-4 rounded-xl bg-hive-status-error/10 border border-hive-status-error/30">
                        <p className="hive-font-sans text-sm text-hive-status-error">{error}</p>
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

      {/* Success Modal */}
      <HiveModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        title="Check your inbox"
        size="sm"
        motionPreset="slideUp"
      >
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-hive-status-success/20 border border-hive-status-success/30">
            <Mail className="w-8 h-8 text-hive-status-success" />
          </div>
          
          <div className="space-y-3">
            <p className="text-hive-text-secondary">
              Magic link sent to
            </p>
            <p className="text-hive-brand-primary font-semibold break-all">
              {formData.email}
            </p>
            
            {/* Development mode - show the magic link */}
            {devMagicLink && process.env.NODE_ENV === 'development' && (
              <HiveCard className="p-4 bg-hive-brand-primary/10 border-hive-brand-primary/30 text-left">
                <p className="text-xs text-hive-brand-primary font-medium mb-2">
                  🛠️ Development Mode - Magic Link:
                </p>
                <a 
                  href={devMagicLink}
                  className="text-xs text-hive-brand-primary hover:underline break-all"
                >
                  {devMagicLink}
                </a>
              </HiveCard>
            )}
          </div>

          <div className="space-y-4 pt-4">
            {devMagicLink && process.env.NODE_ENV === 'development' && (
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-hive-brand-primary animate-spin" />
          <span className="text-hive-text-secondary">Loading...</span>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}