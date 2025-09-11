'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  Mail,
  Phone,
  Shield,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  User,
  HelpCircle,
  Send,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Smartphone,
  CreditCard,
  FileText
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { cn } from '../../lib/utils';
import { authenticatedFetch } from '../../lib/auth-utils';
import { useRouter } from 'next/navigation';

interface AccountRecoveryProps {
  mode?: 'password' | 'account' | 'twofactor';
  className?: string;
}

type RecoveryStep = 'identify' | 'verify' | 'reset' | 'success';

interface RecoveryMethod {
  id: string;
  type: 'email' | 'sms' | 'security_question' | 'backup_code' | 'support';
  label: string;
  description: string;
  icon: React.ElementType;
  available: boolean;
  verified?: boolean;
  value?: string;
}

export function AccountRecovery({ mode = 'password', className = '' }: AccountRecoveryProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RecoveryStep>('identify');
  const [identifier, setIdentifier] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<RecoveryMethod | null>(null);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [availableMethods, setAvailableMethods] = useState<RecoveryMethod[]>([]);

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const identifyAccount = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authenticatedFetch('/api/auth/recovery/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });

      const data = await response.json();

      if (response.ok) {
        const methods: RecoveryMethod[] = [
          {
            id: 'email',
            type: 'email',
            label: 'Email',
            description: data.maskedEmail || 'Send code to your email',
            icon: Mail,
            available: !!data.hasEmail,
            verified: data.emailVerified
          },
          {
            id: 'sms',
            type: 'sms',
            label: 'SMS',
            description: data.maskedPhone || 'Send code to your phone',
            icon: Phone,
            available: !!data.hasPhone,
            verified: data.phoneVerified
          },
          {
            id: 'security_question',
            type: 'security_question',
            label: 'Security Question',
            description: 'Answer your security question',
            icon: HelpCircle,
            available: !!data.hasSecurityQuestion
          },
          {
            id: 'backup_code',
            type: 'backup_code',
            label: 'Backup Code',
            description: 'Use a backup recovery code',
            icon: Key,
            available: true
          },
          {
            id: 'support',
            type: 'support',
            label: 'Contact Support',
            description: 'Get help from our support team',
            icon: Shield,
            available: true
          }
        ];

        setAvailableMethods(methods.filter(m => m.available));
        setCurrentStep('verify');
      } else {
        setError(data.error || 'Account not found. Please check your email or username.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    if (!selectedMethod) return;

    setLoading(true);
    setError('');

    try {
      const response = await authenticatedFetch('/api/auth/recovery/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          method: selectedMethod.type
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCountdown(60);
        // Stay on verify step to enter code
      } else {
        setError(data.error || 'Failed to send verification code.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authenticatedFetch('/api/auth/recovery/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          code,
          method: selectedMethod?.type
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep('reset');
      } else {
        setError(data.error || 'Invalid verification code.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authenticatedFetch('/api/auth/recovery/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          newPassword,
          verificationCode: verificationCode.join('')
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep('success');
      } else {
        setError(data.error || 'Failed to reset password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      const newCode = [...verificationCode];
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      setVerificationCode(newCode);
      
      const nextIndex = Math.min(index + pastedCode.length, 5);
      document.getElementById(`recovery-code-${nextIndex}`)?.focus();
    } else {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        document.getElementById(`recovery-code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`recovery-code-${index - 1}`)?.focus();
    }
  };

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'text-red-400' };
    if (score <= 3) return { score, label: 'Fair', color: 'text-yellow-400' };
    if (score <= 4) return { score, label: 'Good', color: 'text-blue-400' };
    return { score, label: 'Strong', color: 'text-green-400' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className={cn('max-w-md mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          {mode === 'password' ? (
            <Key className="h-8 w-8 text-[var(--hive-brand-secondary)]" />
          ) : mode === 'twofactor' ? (
            <Smartphone className="h-8 w-8 text-[var(--hive-brand-secondary)]" />
          ) : (
            <Shield className="h-8 w-8 text-[var(--hive-brand-secondary)]" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
          {mode === 'password' ? 'Reset Your Password' :
           mode === 'twofactor' ? 'Recover 2FA Access' :
           'Account Recovery'}
        </h2>
        <p className="text-neutral-400">
          {currentStep === 'identify' ? "Let's find your account" :
           currentStep === 'verify' ? 'Choose a recovery method' :
           currentStep === 'reset' ? 'Create a new password' :
           'Recovery complete!'}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2">
        {['identify', 'verify', 'reset', 'success'].map((step, index) => (
          <div
            key={step}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              currentStep === step ? 'w-8 bg-[var(--hive-brand-secondary)]' :
              index < ['identify', 'verify', 'reset', 'success'].indexOf(currentStep) 
                ? 'bg-green-400' : 'bg-white/20'
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Identify Account */}
        {currentStep === 'identify' && (
          <motion.div
            key="identify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e: any) => setIdentifier(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
              />
            </div>

            <Button
              onClick={identifyAccount}
              disabled={!identifier || loading}
              className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Finding account...
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Step 2: Verify Identity */}
        {currentStep === 'verify' && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-3">
              {availableMethods.map(method => {
                const Icon = method.icon;
                const isSelected = selectedMethod?.id === method.id;
                
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={cn(
                      'w-full p-4 rounded-lg border text-left transition-all',
                      isSelected
                        ? 'bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'p-2 rounded-lg',
                        isSelected ? 'bg-[var(--hive-brand-secondary)]/20' : 'bg-white/10'
                      )}>
                        <Icon className={cn(
                          'h-5 w-5',
                          isSelected ? 'text-[var(--hive-brand-secondary)]' : 'text-neutral-400'
                        )} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[var(--hive-text-inverse)]">
                            {method.label}
                          </h4>
                          {method.verified && (
                            <Badge className="bg-green-500/20 text-green-400 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedMethod && (selectedMethod.type === 'email' || selectedMethod.type === 'sms') && (
              <>
                <Button
                  onClick={sendVerificationCode}
                  disabled={loading || countdown > 0}
                  className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend in {countdown}s
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Verification Code
                    </>
                  )}
                </Button>

                {countdown > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-400 text-center">
                      Enter the 6-digit code sent to your {selectedMethod.type === 'email' ? 'email' : 'phone'}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2">
                      {verificationCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`recovery-code-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e: any) => handleCodeInput(index, e.target.value)}
                          onKeyDown={(e: any) => handleKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)] focus:bg-white/10 transition-all"
                        />
                      ))}
                    </div>

                    <Button
                      onClick={verifyCode}
                      disabled={verificationCode.join('').length !== 6 || loading}
                      className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                    >
                      Verify Code
                    </Button>
                  </div>
                )}
              </>
            )}

            {selectedMethod?.type === 'security_question' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    What was the name of your first pet?
                  </label>
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={(e: any) => setSecurityAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                  />
                </div>

                <Button
                  onClick={() => setCurrentStep('reset')}
                  disabled={!securityAnswer}
                  className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                >
                  Continue
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              onClick={() => setCurrentStep('identify')}
              className="w-full text-neutral-400"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </motion.div>
        )}

        {/* Step 3: Reset Password */}
        {currentStep === 'reset' && (
          <motion.div
            key="reset"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e: any) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-400">Password strength</span>
                    <span className={passwordStrength.color}>{passwordStrength.label}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'h-full transition-all',
                        passwordStrength.color.replace('text-', 'bg-')
                      )}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
              />
              
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>

            <Button
              onClick={resetPassword}
              disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || loading}
              className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="h-10 w-10 text-green-400" />
            </motion.div>
            
            <div>
              <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">
                Password Reset Successful!
              </h3>
              <p className="text-neutral-400">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>

            <Button
              onClick={() => router.push('/auth/signin')}
              className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
            >
              Sign In
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Section */}
      {currentStep !== 'success' && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="/auth/signin" className="text-neutral-400 hover:text-[var(--hive-text-inverse)]">
              Back to Sign In
            </a>
            <span className="text-neutral-600">•</span>
            <a href="/support" className="text-neutral-400 hover:text-[var(--hive-text-inverse)]">
              Contact Support
            </a>
          </div>
        </div>
      )}
    </div>
  );
}