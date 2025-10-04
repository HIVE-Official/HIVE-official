'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button, Input, Card, HiveLogo } from '@hive/ui';
import { Dialog, DialogContent } from '@hive/ui';

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';

interface LoginFormData {
  email: string;
}

interface School {
  id: string;
  name: string;
  domain: string;
  location: string;
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Check for direct school params from URL or use multi-step flow
  const urlSchoolId = searchParams?.get('schoolId');
  const urlSchoolName = searchParams?.get('schoolName');
  const urlSchoolDomain = searchParams?.get('domain');

  // State management
  const [currentStep, setCurrentStep] = useState<'school-selection' | 'email-input'>(
    (urlSchoolId && urlSchoolName && urlSchoolDomain) ? 'email-input' : 'school-selection'
  );
  const [selectedSchool, setSelectedSchool] = useState<School | null>(
    (urlSchoolId && urlSchoolName && urlSchoolDomain)
      ? { id: urlSchoolId, name: urlSchoolName, domain: urlSchoolDomain, location: '' }
      : null
  );
  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  // Check if user is returning with school preference
  useEffect(() => {
    const lastSchool = localStorage.getItem('hive_last_school');
    const returningUser = searchParams?.get('returning') === 'true';

    if (lastSchool && returningUser && !selectedSchool) {
      try {
        const school = JSON.parse(lastSchool);
        setSelectedSchool(school);
        setCurrentStep('email-input');
      } catch (error) {
        console.error('Failed to parse stored school:', error);
        localStorage.removeItem('hive_last_school');
      }
    }
  }, [searchParams, selectedSchool]);

  // Fetch schools for selection
  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        if (response.ok) {
          const schoolsData = await response.json();
          const activeSchools = schoolsData
            .filter((school: any) => school?.status === 'active' && school.name && school.location)
            .map((school: any) => ({
              id: school.id,
              name: school.name,
              domain: school.domain,
              location: typeof school.location === 'object'
                ? [school.location.city, school.location.state].filter(Boolean).join(', ')
                : school.location
            }));
          setSchools(activeSchools);
        } else {
          // Fallback for development
          setSchools([
            {
              id: 'test-university',
              name: 'Test University (Development)',
              domain: 'test.edu',
              location: 'Development, NY'
            },
            {
              id: 'ub',
              name: 'University at Buffalo',
              domain: 'buffalo.edu',
              location: 'Buffalo, NY'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
        setSchools([{
          id: 'test-university',
          name: 'Test University (Development)',
          domain: 'test.edu',
          location: 'Development, NY'
        }]);
      } finally {
        setSchoolsLoading(false);
      }
    }

    if (currentStep === 'school-selection' && !selectedSchool) {
      fetchSchools();
    }
  }, [currentStep, selectedSchool]);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    // Store school preference for returning users
    localStorage.setItem('hive_last_school', JSON.stringify(school));
    setCurrentStep('email-input');
  };

  const handleBackToSchoolSelection = () => {
    setCurrentStep('school-selection');
    setSelectedSchool(null);
    setError(null);
    setFormData({ email: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchool) return;

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
      localStorage.setItem('emailForSignIn', formData.email);

      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          schoolId: selectedSchool.id,
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
      console.error('Authentication error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      // Provide user-friendly error messages
      let userFriendlyError = errorMessage;

      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        userFriendlyError = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('Invalid email')) {
        userFriendlyError = 'Please enter a valid email address.';
      } else if (errorMessage.includes('unauthorized') || errorMessage.includes('not authorized')) {
        userFriendlyError = `This email is not authorized for ${selectedSchool?.name}. Please use your @${selectedSchool?.domain} email address.`;
      } else if (errorMessage.includes('rate limit')) {
        userFriendlyError = 'Too many attempts. Please wait a few minutes before trying again.';
      } else if (errorMessage.includes('domain')) {
        userFriendlyError = `Please use your @${selectedSchool?.domain} email address for ${selectedSchool?.name}.`;
      }

      setError(userFriendlyError);

      // Auto-clear error after 5 seconds
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
    const isTestDomain = selectedSchool?.domain === 'test.edu';
    if (!isTestDomain && selectedSchool?.domain && !email.toLowerCase().endsWith(`@${selectedSchool.domain.toLowerCase()}`)) {
      return `Please use your @${selectedSchool.domain} email address`;
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
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.015)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.025)_0%,transparent_50%)]" />

      {/* Floating glass orbs for ambiance */}
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-r from-white/[0.02] to-[var(--hive-brand-primary)]/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-[15%] w-40 h-40 bg-gradient-to-l from-[var(--hive-brand-primary)]/[0.02] to-white/[0.01] rounded-full blur-3xl" />

      {/* Header */}
      <motion.div
        className="relative z-10 border-b border-white/[0.08] backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {currentStep === 'email-input' && selectedSchool ? (
              <button
                onClick={handleBackToSchoolSelection}
                className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back to schools</span>
              </button>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back to home</span>
              </Link>
            )}

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                <HiveLogo size="default" variant="gradient" showText={true} />
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
          {selectedSchool?.domain === 'test.edu' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="text-center p-4 bg-[var(--hive-brand-primary)]/[0.08] border-[var(--hive-brand-primary)]/30 backdrop-blur-xl">
                <p className="text-sm text-[var(--hive-brand-primary)] font-medium">
                  🛠️ Development Mode Active
                </p>
              </Card>
            </motion.div>
          )}

          {/* School Selection Step */}
          <AnimatePresence mode="wait">
            {currentStep === 'school-selection' && (
              <motion.div
                key="school-selection"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="text-center mb-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                    Welcome to HIVE
                  </h1>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Select your university to continue
                  </p>
                </div>

                <Card className="p-8 bg-white/[0.02] border-white/[0.08] shadow-2xl backdrop-blur-xl">
                  {schoolsLoading ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-[var(--hive-brand-primary)] animate-spin" />
                      </div>
                      <p className="text-sm text-white/50 text-center">Loading universities...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {schools.map((school) => (
                        <motion.button
                          key={school.id}
                          onClick={() => handleSchoolSelect(school)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[var(--hive-brand-primary)]/30 hover:bg-[var(--hive-brand-primary)]/[0.02] transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <h3 className="font-semibold text-white group-hover:text-[var(--hive-brand-primary)] transition-colors duration-200">
                                {school.name}
                              </h3>
                              <p className="text-sm text-white/60 mt-1">{school.location}</p>
                              <p className="text-xs text-white/40 mt-1 font-mono">@{school.domain}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[var(--hive-brand-primary)] transition-colors duration-200" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Email Input Step */}
            {currentStep === 'email-input' && selectedSchool && (
              <motion.div
                key="email-input"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="text-center mb-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                    Sign in to HIVE
                  </h1>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Join <span className="text-[var(--hive-brand-primary)] font-semibold">{selectedSchool.name}</span> on HIVE
                  </p>
                </div>

                <Card className="p-8 bg-white/[0.02] border-white/[0.08] shadow-2xl backdrop-blur-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                          School email address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          placeholder={selectedSchool.domain === 'test.edu' ? 'Enter any email address (dev mode)' : `Enter your @${selectedSchool.domain} address`}
                          required
                          disabled={isLoading}
                          autoComplete="email"
                          autoFocus
                          variant={error ? 'destructive' : 'default'}
                          size="lg"
                          className="w-full bg-white/[0.03] border-white/[0.15] focus:border-[var(--hive-brand-primary)]/50 focus:ring-[var(--hive-brand-primary)]/20 text-white placeholder-white/40"
                          data-testid="email-input"
                        />
                      </div>

                      {!error && selectedSchool.domain === 'test.edu' && (
                        <p className="text-xs text-white/50">
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
                          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400">{error}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={isLoading || !formData.email || !!error}
                      variant="default"
                      size="lg"
                      className="w-full"
                      data-testid="send-magic-link-button"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending magic link...</span>
                        </div>
                      ) : (
                        'Send magic link'
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal with Recovery Options */}
      <Dialog
        open={success}
        onOpenChange={() => setSuccess(false)}
        size="sm"
      >
        <DialogContent className="bg-[#0F0F10] border-white/[0.08] backdrop-blur-2xl">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30">
              <Mail className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">
                Check your inbox!
              </h3>
              <p className="text-white/70">
                We've sent a magic link to:
              </p>
              <p className="text-[var(--hive-brand-primary)] font-semibold break-all">
                {formData.email}
              </p>
              <p className="text-xs text-white/50">
                The link will expire in 1 hour
              </p>

              {/* Development mode - show the magic link */}
              {devMagicLink && selectedSchool?.domain === 'test.edu' && (
                <Card className="p-4 bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-left">
                  <p className="text-xs text-[var(--hive-brand-primary)] font-medium mb-2">
                    🛠️ Development Mode - Magic Link:
                  </p>
                  <a
                    href={devMagicLink}
                    className="text-xs text-[var(--hive-brand-primary)] hover:underline break-all"
                  >
                    {devMagicLink}
                  </a>
                </Card>
              )}
            </div>

            <div className="space-y-3 pt-2">
              {devMagicLink && selectedSchool?.domain === 'test.edu' && (
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => window.location.href = devMagicLink}
                >
                  Use Dev Magic Link
                </Button>
              )}

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => {
                  setSuccess(false);
                  setDevMagicLink(null);
                }}
              >
                Close
              </Button>

              <div className="pt-2 border-t border-white/[0.08]">
                <p className="text-xs text-white/50 mb-2">
                  Didn't receive the email?
                </p>
                <Link
                  href={`/auth/expired?email=${encodeURIComponent(formData.email)}&schoolId=${selectedSchool?.id}`}
                  className="text-sm text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80 transition-colors"
                  onClick={() => setSuccess(false)}
                >
                  Request a new magic link →
                </Link>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-[var(--hive-brand-primary)] animate-spin" />
          <span className="text-white/70">Loading...</span>
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