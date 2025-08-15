import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Github,
  Chrome,
  University,
  Smartphone,
  Shield,
  Zap,
  Users,
  Calendar,
  MapPin,
  GraduationCap,
  Building
} from 'lucide-react';

// Auth Form Molecules for HIVE Student Platform
interface AuthFormProps {
  onSubmit?: (data: any) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
}

// Login Form - Tech sleek for students
const LoginForm: React.FC<AuthFormProps> = ({ onSubmit, loading, error, className }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full mx-auto flex items-center justify-center mb-4">
            <University className="w-6 h-6 text-[var(--hive-text-primary)]" />
          </div>
          <Text variant="heading-lg" className="font-bold">Welcome to HIVE</Text>
          <Text variant="body-md" color="secondary">
            Connect with your campus community
          </Text>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-red-400" />
            <Text variant="body-sm" className="text-red-300">{error}</Text>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">University Email</Text>
            <HiveInput
              type="email"
              placeholder="you@university.edu"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              disabled={loading}
              className="w-full"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>

          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">Password</Text>
            <HiveInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              disabled={loading}
              className="w-full"
              icon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-[var(--hive-text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
              <Text variant="body-sm" color="secondary">Remember me</Text>
            </label>
            <button type="button" className="text-[var(--hive-primary)] hover:underline">
              <Text variant="body-sm">Forgot password?</Text>
            </button>
          </div>

          <HiveButton
            type="submit"
            className="w-full"
            loading={loading}
            variant="premium"
            size="lg"
          >
            Sign In to Campus
            <ArrowRight className="h-4 w-4 ml-2" />
          </HiveButton>
        </form>

        {/* Social Login */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--hive-border-default)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--hive-background-primary)] text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HiveButton variant="outline" className="w-full">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </HiveButton>
            <HiveButton variant="outline" className="w-full">
              <Chrome className="h-4 w-4 mr-2" />
              Google
            </HiveButton>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Text variant="body-sm" color="secondary">
            Don't have an account?{' '}
            <button className="text-[var(--hive-primary)] hover:underline font-medium">
              Join your campus
            </button>
          </Text>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Registration Form - Campus onboarding
const RegistrationForm: React.FC<AuthFormProps> = ({ onSubmit, loading, error, className }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    university: '',
    major: '',
    graduationYear: '',
    campusRole: 'student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const stepTitles = [
    'Create Account',
    'Campus Profile',
    'Academic Info'
  ];

  return (
    <HiveCard className={`w-[480px] ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Progress Header */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full mx-auto flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-[var(--hive-text-primary)]" />
            </div>
            <Text variant="heading-lg" className="font-bold">Join HIVE</Text>
            <Text variant="body-md" color="secondary">
              {stepTitles[step - 1]}
            </Text>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  num <= step 
                    ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {num < step ? <CheckCircle className="w-4 h-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-0.5 transition-colors ${
                    num < step ? 'bg-[var(--hive-primary)]' : 'bg-gray-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-red-400" />
            <Text variant="body-sm" className="text-red-300">{error}</Text>
          </motion.div>
        )}

        {/* Form Steps */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">University Email</Text>
                  <HiveInput
                    type="email"
                    placeholder="you@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={loading}
                    className="w-full"
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <Text variant="body-xs" color="secondary">
                    We'll verify your campus affiliation
                  </Text>
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Create Password</Text>
                  <HiveInput
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={loading}
                    className="w-full"
                    icon={<Lock className="h-4 w-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Confirm Password</Text>
                  <HiveInput
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={loading}
                    className="w-full"
                    icon={<Lock className="h-4 w-4" />}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">First Name</Text>
                    <HiveInput
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={loading}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Last Name</Text>
                    <HiveInput
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={loading}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">University</Text>
                  <HiveInput
                    placeholder="Stanford University"
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                    disabled={loading}
                    className="w-full"
                    icon={<Building className="h-4 w-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Campus Role</Text>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'student', label: 'Student', icon: GraduationCap },
                      { value: 'faculty', label: 'Faculty', icon: Users },
                      { value: 'staff', label: 'Staff', icon: Building }
                    ].map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, campusRole: role.value }))}
                        className={`p-3 rounded-lg border transition-colors ${
                          formData.campusRole === role.value
                            ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                            : 'border-[var(--hive-border-default)] hover:border-gray-600'
                        }`}
                      >
                        <role.icon className="h-5 w-5 mx-auto mb-1" />
                        <Text variant="body-xs">{role.label}</Text>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Major/Field of Study</Text>
                  <HiveInput
                    placeholder="Computer Science"
                    value={formData.major}
                    onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                    disabled={loading}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Expected Graduation</Text>
                  <select 
                    value={formData.graduationYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: e.target.value }))}
                    className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 8 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>{year}</option>
                      );
                    })}
                  </select>
                </div>

                {/* Campus Features Preview */}
                <div className="p-4 bg-gradient-to-r from-[var(--hive-primary)]/10 to-[var(--hive-accent)]/10 rounded-lg border border-[var(--hive-primary)]/20">
                  <Text variant="body-sm" className="font-medium mb-3">You're about to unlock:</Text>
                  <div className="space-y-2">
                    {[
                      { icon: Users, text: 'Connect with campus communities' },
                      { icon: Calendar, text: 'Discover and create events' },
                      { icon: Zap, text: 'Build tools for your peers' },
                      { icon: Shield, text: 'Private, secure campus network' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <feature.icon className="h-4 w-4 text-[var(--hive-primary)]" />
                        <Text variant="body-sm" color="secondary">{feature.text}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <Text variant="body-sm" color="secondary">
                      I agree to the Terms of Service and Privacy Policy
                    </Text>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            {step > 1 && (
              <HiveButton
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
              >
                Back
              </HiveButton>
            )}
            <HiveButton
              type="submit"
              className={step === 1 ? 'w-full' : 'ml-auto'}
              loading={loading}
              variant="premium"
              size="lg"
            >
              {step === 3 ? 'Join Campus Community' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </HiveButton>
          </div>
        </form>
      </motion.div>
    </HiveCard>
  );
};

// 2FA Setup Form - Security for student platform
const TwoFactorSetupForm: React.FC<AuthFormProps> = ({ onSubmit, loading, error, className }) => {
  const [method, setMethod] = useState<'app' | 'sms'>('app');
  const [verificationCode, setVerificationCode] = useState('');
  const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/HIVE:student@university.edu?secret=JBSWY3DPEHPK3PXP&issuer=HIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ method, code: verificationCode });
  };

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[var(--hive-text-primary)]" />
          </div>
          <Text variant="heading-lg" className="font-bold">Secure Your Account</Text>
          <Text variant="body-md" color="secondary">
            Add an extra layer of protection to your HIVE account
          </Text>
        </div>

        {/* Method Selection */}
        <div className="space-y-4">
          <Text variant="body-sm" className="font-medium">Choose 2FA Method</Text>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod('app')}
              className={`p-4 rounded-lg border transition-colors ${
                method === 'app'
                  ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                  : 'border-[var(--hive-border-default)] hover:border-gray-600'
              }`}
            >
              <Smartphone className="h-6 w-6 mx-auto mb-2" />
              <Text variant="body-sm" className="font-medium">Authenticator App</Text>
              <Text variant="body-xs" color="secondary" className="mt-1">
                Most secure option
              </Text>
            </button>
            <button
              type="button"
              onClick={() => setMethod('sms')}
              className={`p-4 rounded-lg border transition-colors ${
                method === 'sms'
                  ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                  : 'border-[var(--hive-border-default)] hover:border-gray-600'
              }`}
            >
              <Mail className="h-6 w-6 mx-auto mb-2" />
              <Text variant="body-sm" className="font-medium">SMS Text</Text>
              <Text variant="body-xs" color="secondary" className="mt-1">
                Convenient option
              </Text>
            </button>
          </div>
        </div>

        {/* Setup Instructions */}
        <AnimatePresence mode="wait">
          {method === 'app' && (
            <motion.div
              key="app-setup"
              variants={गति.fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <div className="text-center space-y-4">
                <div className="p-4 bg-[var(--hive-text-primary)] rounded-lg mx-auto w-fit">
                  <img src={qrCodeUrl} alt="2FA QR Code" className="w-32 h-32" />
                </div>
                <div className="space-y-2">
                  <Text variant="body-sm" className="font-medium">Scan with your authenticator app</Text>
                  <Text variant="body-xs" color="secondary">
                    Use Google Authenticator, Authy, or any TOTP app
                  </Text>
                </div>
              </div>
            </motion.div>
          )}

          {method === 'sms' && (
            <motion.div
              key="sms-setup"
              variants={गति.fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <div className="space-y-2">
                <Text variant="body-sm" className="font-medium">Phone Number</Text>
                <HiveInput
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full"
                  icon={<Smartphone className="h-4 w-4" />}
                />
                <Text variant="body-xs" color="secondary">
                  We'll send verification codes to this number
                </Text>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verification */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">Enter Verification Code</Text>
            <HiveInput
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={loading}
              className="w-full text-center text-lg tracking-widest"
              maxLength={6}
            />
            <Text variant="body-xs" color="secondary" className="text-center">
              Enter the 6-digit code from your {method === 'app' ? 'authenticator app' : 'text message'}
            </Text>
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              variants={गति.fadeIn}
              initial="initial"
              animate="animate"
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 text-red-400" />
              <Text variant="body-sm" className="text-red-300">{error}</Text>
            </motion.div>
          )}

          <HiveButton
            type="submit"
            className="w-full"
            loading={loading}
            variant="premium"
            size="lg"
            disabled={!verificationCode || verificationCode.length !== 6}
          >
            <Shield className="h-4 w-4 mr-2" />
            Enable Two-Factor Auth
          </HiveButton>
        </form>

        {/* Security Note */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-blue-400 mt-0.5" />
            <div>
              <Text variant="body-sm" className="font-medium text-blue-300">Security Note</Text>
              <Text variant="body-xs" className="text-blue-200 mt-1">
                Two-factor authentication helps protect your campus data and connections from unauthorized access.
              </Text>
            </div>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Forms/Auth Forms',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Authentication Forms** - Tech sleek social platform authentication

Molecular-level form components designed specifically for the HIVE student platform experience. These forms combine multiple atomic components to create complete authentication flows that feel native to campus social networking.

## Form Philosophy
- **Student-Centric**: Designed for university email verification and campus-specific onboarding
- **Progressive Enhancement**: Multi-step flows that build engagement and completion
- **Social Context**: Always emphasizes campus community and peer connections
- **Security-Aware**: Built-in 2FA and verification flows for student safety

## Components
- **LoginForm**: Main authentication with social login options
- **RegistrationForm**: Multi-step campus onboarding with role selection
- **TwoFactorSetupForm**: Security enhancement with app/SMS options

## Design Patterns
- **Liquid Motion**: Smooth transitions using HIVE's गति motion system
- **Progressive Disclosure**: Information revealed as students progress
- **Campus Branding**: University context always visible and relevant
- **Accessibility First**: Screen reader friendly with proper ARIA support

## Tech Stack Integration
- HiveCard elevation for form containers
- HiveButton with loading states and variants
- HiveInput with icons and validation states
- Framer Motion for smooth step transitions
- Lucide React for consistent iconography
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Login Form Stories
export const LoginFormDefault: Story = {
  name: 'Login Form - Default',
  render: () => (
    <LoginForm 
      onSubmit={async (data) => {
        console.log('Login:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }}
    />
  )
};

export const LoginFormLoading: Story = {
  name: 'Login Form - Loading State',
  render: () => (
    <LoginForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Login:', data);
      }}
    />
  )
};

export const LoginFormError: Story = {
  name: 'Login Form - Error State',
  render: () => (
    <LoginForm 
      error="Invalid email or password. Please try again."
      onSubmit={async (data) => {
        console.log('Login:', data);
      }}
    />
  )
};

// Registration Form Stories
export const RegistrationFormDefault: Story = {
  name: 'Registration Form - Multi-step',
  render: () => (
    <RegistrationForm 
      onSubmit={async (data) => {
        console.log('Registration:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }}
    />
  )
};

export const RegistrationFormLoading: Story = {
  name: 'Registration Form - Loading',
  render: () => (
    <RegistrationForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Registration:', data);
      }}
    />
  )
};

// Two-Factor Auth Stories
export const TwoFactorSetupDefault: Story = {
  name: '2FA Setup - Authenticator App',
  render: () => (
    <TwoFactorSetupForm 
      onSubmit={async (data) => {
        console.log('2FA Setup:', data);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }}
    />
  )
};

export const TwoFactorSetupError: Story = {
  name: '2FA Setup - Invalid Code',
  render: () => (
    <TwoFactorSetupForm 
      error="Invalid verification code. Please try again."
      onSubmit={async (data) => {
        console.log('2FA Setup:', data);
      }}
    />
  )
};

// Campus Authentication Flow
export const CampusAuthFlow: Story = {
  name: 'Complete Campus Auth Flow',
  render: () => {
    const [currentForm, setCurrentForm] = useState<'login' | 'register' | '2fa'>('login');
    const [user, setUser] = useState<any>(null);

    const handleLogin = async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUser({ email: data.email });
      setCurrentForm('2fa');
    };

    const handleRegister = async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUser(data);
      setCurrentForm('2fa');
    };

    const handle2FA = async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Welcome to HIVE! 🎉');
    };

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setCurrentForm('login')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'login' 
                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentForm('register')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'register' 
                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setCurrentForm('2fa')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === '2fa' 
                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            2FA Setup
          </button>
        </div>

        <AnimatePresence mode="wait">
          {currentForm === 'login' && (
            <motion.div
              key="login"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginForm onSubmit={handleLogin} />
            </motion.div>
          )}
          {currentForm === 'register' && (
            <motion.div
              key="register"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RegistrationForm onSubmit={handleRegister} />
            </motion.div>
          )}
          {currentForm === '2fa' && (
            <motion.div
              key="2fa"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TwoFactorSetupForm onSubmit={handle2FA} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

// Mobile Responsive Auth
export const MobileAuthExperience: Story = {
  name: 'Mobile-First Auth Experience',
  render: () => (
    <div className="max-w-sm mx-auto">
      <LoginForm 
        className="w-full max-w-sm"
        onSubmit={async (data) => {
          console.log('Mobile Login:', data);
          await new Promise(resolve => setTimeout(resolve, 1500));
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};