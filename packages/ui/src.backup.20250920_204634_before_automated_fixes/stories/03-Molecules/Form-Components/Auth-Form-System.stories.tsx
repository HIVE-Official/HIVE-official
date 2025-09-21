import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Mail, Lock, Eye, EyeOff, User, School, Calendar, AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';

const meta: Meta = {
  title: '03-Molecules/Form-Components/Auth Form System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Authentication Form System;
A comprehensive authentication system designed specifically for University at Buffalo students. These molecular form components handle user registration, login, and onboarding with campus-specific validation and data collection.

## Campus Integration Features;
- **UB Email Validation** - Ensures only @buffalo.edu email addresses can register;
- **Academic Information Collection** - Major, year, and academic preferences during onboarding;
- **Campus Community Setup** - Dorm assignment, study preferences, and initial space recommendations;
- **Privacy Controls** - Granular privacy settings aligned with campus safety and academic requirements;
## Form Types;
- **Login Forms** - Secure authentication with campus email and password;
- **Registration Forms** - Multi-step onboarding with academic and social information;
- **Password Recovery** - Campus-safe password reset with UB email verification;
- **Profile Setup** - Academic details, housing information, and platform preferences;
## Validation Features;
- **Real-time Validation** - Instant feedback for email format, password strength, and campus data;
- **Campus Data Verification** - Validation against known UB majors, dorms, and academic years;
- **Security Requirements** - Password strength requirements aligned with campus IT policies;
- **Error Handling** - Clear, helpful error messages with suggested corrections;
## Accessibility Standards;
- **WCAG 2.1 AA Compliant** - Full keyboard navigation and screen reader support;
- **Clear Form Structure** - Logical tab order and proper label associations;
- **Error Announcement** - Screen reader accessible error messaging;
- **Progress Indication** - Clear feedback on form completion and submission status;
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Form Data;
const campusFormData = {
  majors: [
    'Computer Science',
    'Business Administration', 
    'Psychology',
    'Mechanical Engineering',
    'Biology',
    'Mathematics',
    'English',
    'Political Science',
    'Chemistry',
    'Economics'
  ],
  academicYears: [
    { value: 'freshman', label: 'Freshman (1st year)' },
    { value: 'sophomore', label: 'Sophomore (2nd year)' },
    { value: 'junior', label: 'Junior (3rd year)' },
    { value: 'senior', label: 'Senior (4th+ year)' },
    { value: 'graduate', label: 'Graduate Student' },
    { value: 'faculty', label: 'Faculty/Staff' }
  ],
  dorms: [
    'Ellicott Complex',
    'Governors Complex',
    'South Campus Apartments',
    'Flint Loop',
    'Creekside Village',
    'Hadley Village',
    'Off-Campus Housing'
  ]
};

// Login Form Story;
export const LoginFormSystem: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({email: '',
      password: '',
      rememberMe: false;)};
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);

    const validateEmail = (email: string) => {
      if (!email) return 'Email is required';
      if (!email.endsWith('@buffalo.edu')) return 'Please use your UB email address (@buffalo.edu)';
      const emailRegex = /^[^\s@]+@buffalo\.edu$/;
      if (!emailRegex.test(email)) return 'Please enter a valid UB email address';
      return ''
    };

    const validatePassword = (password: string) => {
      if (!password) return 'Password is required';
      if (password.length < 8) return 'Password must be at least 8 characters';
      return ''
    };

    const handleInputChange = (field: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Clear errors on change;
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors: Record<string, string> = {};
      newErrors.email = validateEmail(formData.email);
      newErrors.password = validatePassword(formData.password);
      
      const hasErrors = Object.values(newErrors).some(error => error !== '');
      setErrors(newErrors);
      
      if (!hasErrors) {
        setIsLoading(true);
        // Simulate API call;
        setTimeout(() => {
          setIsLoading(false);
          console.log('Login successful:', formData)
        }, 2000)
      }
    };

    return (
      <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to HIVE</CardTitle>
            <CardDescription>Sign in to your University at Buffalo account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  UB Email Address;
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input;
                    id="email"
                    type="email"
                    placeholder="yourname@buffalo.edu"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password;
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input;
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button;
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox;
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) => { const checked = e.target.checked; handleInputChange('rememberMe', checked as boolean)}}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Keep me signed in on this device;
                </Label>
              </div>

              {/* Submit Button */}
              <Button;
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In;
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>

              {/* Links */}
              <div className="space-y-2 text-center">
                <button;
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button;
                    type="button"
                    className="text-blue-600 hover:underline"
                    disabled={isLoading}
                  >
                    Sign up for HIVE;
                  </button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
};

// Registration Form Story;
export const RegistrationFormSystem: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState({email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      major: '',
      academicYear: '',
      dorm: '',
      agreeToTerms: false;)};
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);

    const totalSteps = 3;

    const validateStep1 = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!formData.email.endsWith('@buffalo.edu')) newErrors.email = 'Must use UB email';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
      return newErrors;
    };

    const validateStep2 = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.major) newErrors.major = 'Please select your major';
      if (!formData.academicYear) newErrors.academicYear = 'Please select your academic year';
      return newErrors;
    };

    const validateStep3 = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.dorm) newErrors.dorm = 'Please select your housing situation';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      return newErrors;
    };

    const handleNext = () => {
      let newErrors: Record<string, string> = {};
      
      if (currentStep === 1) newErrors = validateStep1();
      else if (currentStep === 2) newErrors = validateStep2();
      else if (currentStep === 3) newErrors = validateStep3();
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1)
        } else {
          handleSubmit()
        }
      }
    };

    const handleSubmit = async () => {
      setIsLoading(true);
      // Simulate API call;
      setTimeout(() => {
        setIsLoading(false);
        console.log('Registration successful:', formData)
      }, 2000)
    };

    const handleInputChange = (field: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    };

    return (
      <div className="w-full max-w-lg mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join HIVE</CardTitle>
            <CardDescription>Connect with the University at Buffalo community</CardDescription>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mt-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: Account Setup */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900">Create Your Account</h3>
                  <p className="text-sm text-gray-600">Use your UB email to get started</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">UB Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input;
                      id="reg-email"
                      type="email"
                      placeholder="yourname@buffalo.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input;
                      id="reg-password"
                      type="password"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input;
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900">Tell Us About Yourself</h3>
                  <p className="text-sm text-gray-600">Help us personalize your HIVE experience</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input;
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="text-sm text-red-600">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input;
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.lastName && (
                      <div className="text-sm text-red-600">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <Select onValueChange={(value) => handleInputChange('major', value)}>
                      <SelectTrigger className={`pl-10 ${errors.major ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Choose your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {campusFormData.majors.map((major) => (
                          <SelectItem key={major} value={major}>
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.major && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.major}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <Select onValueChange={(value) => handleInputChange('academicYear', value)}>
                      <SelectTrigger className={`pl-10 ${errors.academicYear ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {campusFormData.academicYears.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.academicYear && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.academicYear}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Campus Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900">Campus Life Setup</h3>
                  <p className="text-sm text-gray-600">Complete your campus community profile</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dorm">Housing Situation</Label>
                  <Select onValueChange={(value) => handleInputChange('dorm', value)}>
                    <SelectTrigger className={errors.dorm ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Where do you live?" />
                    </SelectTrigger>
                    <SelectContent>
                      {campusFormData.dorms.map((dorm) => (
                        <SelectItem key={dorm} value={dorm}>
                          {dorm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.dorm && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.dorm}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox;
                      id="terms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => { const checked = e.target.checked; handleInputChange('agreeToTerms', checked as boolean)}}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the HIVE Terms of Service and Privacy Policy. I understand this platform is for University at Buffalo students only.
                    </Label>
                  </div>
                  {errors.agreeToTerms && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.agreeToTerms}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {currentStep > 1 && (
                <Button;
                  type="button" 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isLoading}
                >
                  Back;
                </Button>
              )}
              <Button;
                type="button" 
                onClick={handleNext}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : currentStep === totalSteps ? (
                  'Create Account'
                ) : (
                  <>
                    Continue;
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
};

// Password Recovery Form Story;
export const PasswordRecoveryForm: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email) {
        setError('Email is required');
        return;
      }
      }
      if (!email.endsWith('@buffalo.edu')) {
        setError('Please use your UB email address');
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      // Simulate API call;
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true)
      }, 2000)
    };

    if (isSubmitted) {
      return (
        <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
          <Card className="shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent password reset instructions to:
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="font-medium text-gray-900">{email}</div>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                If you don't see the email, check your spam folder or contact UB IT Support.
              </p>
              <Button;
                variant="outline" 
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('')
                }}
                className="w-full"
              >
                Try Different Email;
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your UB email to receive reset instructions</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recovery-email">UB Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input;
                    id="recovery-email"
                    type="email"
                    placeholder="yourname@buffalo.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('')}}
                    className={`pl-10 ${error ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <Button;
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Instructions...
                  </>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>

              <div className="text-center">
                <button;
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  disabled={isLoading}
                >
                  Back to Sign In;
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
};