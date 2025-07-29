import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Github, Chrome, University, Smartphone, Shield, Zap, Users, Calendar, GraduationCap, Building } from 'lucide-react';
// Login Form - Tech sleek for students
const LoginForm = ({ onSubmit, loading, error, className }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(University, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Welcome to HIVE" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Connect with your campus community" })] }), error && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-400" }), _jsx(Text, { variant: "body-sm", className: "text-red-300", children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "University Email" }), _jsx(HiveInput, { type: "email", placeholder: "you@university.edu", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Mail, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Password" }), _jsx(HiveInput, { type: showPassword ? 'text' : 'password', placeholder: "Enter your password", value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Lock, { className: "h-4 w-4" }), rightIcon: _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "text-gray-400 hover:text-[var(--hive-text-primary)] transition-colors", children: showPassword ? _jsx(EyeOff, { className: "h-4 w-4" }) : _jsx(Eye, { className: "h-4 w-4" }) }) })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "rounded border-gray-600 bg-gray-800" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Remember me" })] }), _jsx("button", { type: "button", className: "text-[var(--hive-primary)] hover:underline", children: _jsx(Text, { variant: "body-sm", children: "Forgot password?" }) })] }), _jsxs(HiveButton, { type: "submit", className: "w-full", loading: loading, variant: "premium", size: "lg", children: ["Sign In to Campus", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-[var(--hive-border-default)]" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-[var(--hive-background-primary)] text-gray-400", children: "Or continue with" }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(HiveButton, { variant: "outline", className: "w-full", children: [_jsx(Github, { className: "h-4 w-4 mr-2" }), "GitHub"] }), _jsxs(HiveButton, { variant: "outline", className: "w-full", children: [_jsx(Chrome, { className: "h-4 w-4 mr-2" }), "Google"] })] })] }), _jsx("div", { className: "text-center", children: _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["Don't have an account?", ' ', _jsx("button", { className: "text-[var(--hive-primary)] hover:underline font-medium", children: "Join your campus" })] }) })] }) }));
};
// Registration Form - Campus onboarding
const RegistrationForm = ({ onSubmit, loading, error, className }) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            onSubmit?.(formData);
        }
    };
    const stepTitles = [
        'Create Account',
        'Campus Profile',
        'Academic Info'
    ];
    return (_jsx(HiveCard, { className: `w-[480px] ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(GraduationCap, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Join HIVE" }), _jsx(Text, { variant: "body-md", color: "secondary", children: stepTitles[step - 1] })] }), _jsx("div", { className: "flex items-center gap-2", children: [1, 2, 3].map((num) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: `flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${num <= step
                                            ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                            : 'bg-gray-800 text-gray-400'}`, children: num < step ? _jsx(CheckCircle, { className: "w-4 h-4" }) : num }), num < 3 && (_jsx("div", { className: `flex-1 h-0.5 transition-colors ${num < step ? 'bg-[var(--hive-primary)]' : 'bg-gray-800'}` }))] }, num))) })] }), error && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-400" }), _jsx(Text, { variant: "body-sm", className: "text-red-300", children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "University Email" }), _jsx(HiveInput, { type: "email", placeholder: "you@university.edu", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Mail, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "We'll verify your campus affiliation" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Create Password" }), _jsx(HiveInput, { type: "password", placeholder: "Minimum 8 characters", value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Lock, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Confirm Password" }), _jsx(HiveInput, { type: "password", placeholder: "Confirm your password", value: formData.confirmPassword, onChange: (e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Lock, { className: "h-4 w-4" }) })] })] }, "step1")), step === 2 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "First Name" }), _jsx(HiveInput, { placeholder: "Your first name", value: formData.firstName, onChange: (e) => setFormData(prev => ({ ...prev, firstName: e.target.value })), disabled: loading, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Last Name" }), _jsx(HiveInput, { placeholder: "Your last name", value: formData.lastName, onChange: (e) => setFormData(prev => ({ ...prev, lastName: e.target.value })), disabled: loading, className: "w-full" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "University" }), _jsx(HiveInput, { placeholder: "Stanford University", value: formData.university, onChange: (e) => setFormData(prev => ({ ...prev, university: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Building, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Campus Role" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: [
                                                        { value: 'student', label: 'Student', icon: GraduationCap },
                                                        { value: 'faculty', label: 'Faculty', icon: Users },
                                                        { value: 'staff', label: 'Staff', icon: Building }
                                                    ].map((role) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, campusRole: role.value })), className: `p-3 rounded-lg border transition-colors ${formData.campusRole === role.value
                                                            ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                                                            : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(role.icon, { className: "h-5 w-5 mx-auto mb-1" }), _jsx(Text, { variant: "body-xs", children: role.label })] }, role.value))) })] })] }, "step2")), step === 3 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Major/Field of Study" }), _jsx(HiveInput, { placeholder: "Computer Science", value: formData.major, onChange: (e) => setFormData(prev => ({ ...prev, major: e.target.value })), disabled: loading, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Expected Graduation" }), _jsxs("select", { value: formData.graduationYear, onChange: (e) => setFormData(prev => ({ ...prev, graduationYear: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "", children: "Select year" }), Array.from({ length: 8 }, (_, i) => {
                                                            const year = new Date().getFullYear() + i;
                                                            return (_jsx("option", { value: year, children: year }, year));
                                                        })] })] }), _jsxs("div", { className: "p-4 bg-gradient-to-r from-[var(--hive-primary)]/10 to-[var(--hive-accent)]/10 rounded-lg border border-[var(--hive-primary)]/20", children: [_jsx(Text, { variant: "body-sm", className: "font-medium mb-3", children: "You're about to unlock:" }), _jsx("div", { className: "space-y-2", children: [
                                                        { icon: Users, text: 'Connect with campus communities' },
                                                        { icon: Calendar, text: 'Discover and create events' },
                                                        { icon: Zap, text: 'Build tools for your peers' },
                                                        { icon: Shield, text: 'Private, secure campus network' }
                                                    ].map((feature, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(feature.icon, { className: "h-4 w-4 text-[var(--hive-primary)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: feature.text })] }, index))) })] }), _jsx("div", { className: "text-center space-y-2", children: _jsxs("label", { className: "flex items-center justify-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "rounded border-gray-600 bg-gray-800" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "I agree to the Terms of Service and Privacy Policy" })] }) })] }, "step3"))] }), _jsxs("div", { className: "flex items-center justify-between pt-4", children: [step > 1 && (_jsx(HiveButton, { type: "button", variant: "outline", onClick: () => setStep(step - 1), disabled: loading, children: "Back" })), _jsxs(HiveButton, { type: "submit", className: step === 1 ? 'w-full' : 'ml-auto', loading: loading, variant: "premium", size: "lg", children: [step === 3 ? 'Join Campus Community' : 'Continue', _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })] })] })] }) }));
};
// 2FA Setup Form - Security for student platform
const TwoFactorSetupForm = ({ onSubmit, loading, error, className }) => {
    const [method, setMethod] = useState('app');
    const [verificationCode, setVerificationCode] = useState('');
    const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/HIVE:student@university.edu?secret=JBSWY3DPEHPK3PXP&issuer=HIVE');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ method, code: verificationCode });
    };
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(Shield, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Secure Your Account" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Add an extra layer of protection to your HIVE account" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Choose 2FA Method" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { type: "button", onClick: () => setMethod('app'), className: `p-4 rounded-lg border transition-colors ${method === 'app'
                                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                                        : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Smartphone, { className: "h-6 w-6 mx-auto mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: "Authenticator App" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: "Most secure option" })] }), _jsxs("button", { type: "button", onClick: () => setMethod('sms'), className: `p-4 rounded-lg border transition-colors ${method === 'sms'
                                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                                        : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Mail, { className: "h-6 w-6 mx-auto mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: "SMS Text" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: "Convenient option" })] })] })] }), _jsxs(AnimatePresence, { mode: "wait", children: [method === 'app' && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "p-4 bg-[var(--hive-text-primary)] rounded-lg mx-auto w-fit", children: _jsx("img", { src: qrCodeUrl, alt: "2FA QR Code", className: "w-32 h-32" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Scan with your authenticator app" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Use Google Authenticator, Authy, or any TOTP app" })] })] }) }, "app-setup")), method === 'sms' && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Phone Number" }), _jsx(HiveInput, { type: "tel", placeholder: "+1 (555) 123-4567", className: "w-full", icon: _jsx(Smartphone, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "We'll send verification codes to this number" })] }) }, "sms-setup"))] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Enter Verification Code" }), _jsx(HiveInput, { placeholder: "123456", value: verificationCode, onChange: (e) => setVerificationCode(e.target.value), disabled: loading, className: "w-full text-center text-lg tracking-widest", maxLength: 6 }), _jsxs(Text, { variant: "body-xs", color: "secondary", className: "text-center", children: ["Enter the 6-digit code from your ", method === 'app' ? 'authenticator app' : 'text message'] })] }), error && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-400" }), _jsx(Text, { variant: "body-sm", className: "text-red-300", children: error })] })), _jsxs(HiveButton, { type: "submit", className: "w-full", loading: loading, variant: "premium", size: "lg", disabled: !verificationCode || verificationCode.length !== 6, children: [_jsx(Shield, { className: "h-4 w-4 mr-2" }), "Enable Two-Factor Auth"] })] }), _jsx("div", { className: "p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Shield, { className: "h-4 w-4 text-blue-400 mt-0.5" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium text-blue-300", children: "Security Note" }), _jsx(Text, { variant: "body-xs", className: "text-blue-200 mt-1", children: "Two-factor authentication helps protect your campus data and connections from unauthorized access." })] })] }) })] }) }));
};
// Stories Configuration
const meta = {
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
// Login Form Stories
export const LoginFormDefault = {
    name: 'Login Form - Default',
    render: () => (_jsx(LoginForm, { onSubmit: async (data) => {
            console.log('Login:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
        } }))
};
export const LoginFormLoading = {
    name: 'Login Form - Loading State',
    render: () => (_jsx(LoginForm, { loading: true, onSubmit: async (data) => {
            console.log('Login:', data);
        } }))
};
export const LoginFormError = {
    name: 'Login Form - Error State',
    render: () => (_jsx(LoginForm, { error: "Invalid email or password. Please try again.", onSubmit: async (data) => {
            console.log('Login:', data);
        } }))
};
// Registration Form Stories
export const RegistrationFormDefault = {
    name: 'Registration Form - Multi-step',
    render: () => (_jsx(RegistrationForm, { onSubmit: async (data) => {
            console.log('Registration:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
        } }))
};
export const RegistrationFormLoading = {
    name: 'Registration Form - Loading',
    render: () => (_jsx(RegistrationForm, { loading: true, onSubmit: async (data) => {
            console.log('Registration:', data);
        } }))
};
// Two-Factor Auth Stories
export const TwoFactorSetupDefault = {
    name: '2FA Setup - Authenticator App',
    render: () => (_jsx(TwoFactorSetupForm, { onSubmit: async (data) => {
            console.log('2FA Setup:', data);
            await new Promise(resolve => setTimeout(resolve, 1500));
        } }))
};
export const TwoFactorSetupError = {
    name: '2FA Setup - Invalid Code',
    render: () => (_jsx(TwoFactorSetupForm, { error: "Invalid verification code. Please try again.", onSubmit: async (data) => {
            console.log('2FA Setup:', data);
        } }))
};
// Campus Authentication Flow
export const CampusAuthFlow = {
    name: 'Complete Campus Auth Flow',
    render: () => {
        const [currentForm, setCurrentForm] = useState('login');
        const [user, setUser] = useState(null);
        const handleLogin = async (data) => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUser({ email: data.email });
            setCurrentForm('2fa');
        };
        const handleRegister = async (data) => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setUser(data);
            setCurrentForm('2fa');
        };
        const handle2FA = async (data) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Welcome to HIVE! 🎉');
        };
        return (_jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx("button", { onClick: () => setCurrentForm('login'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'login'
                                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Login" }), _jsx("button", { onClick: () => setCurrentForm('register'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'register'
                                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Register" }), _jsx("button", { onClick: () => setCurrentForm('2fa'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === '2fa'
                                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "2FA Setup" })] }), _jsxs(AnimatePresence, { mode: "wait", children: [currentForm === 'login' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(LoginForm, { onSubmit: handleLogin }) }, "login")), currentForm === 'register' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(RegistrationForm, { onSubmit: handleRegister }) }, "register")), currentForm === '2fa' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(TwoFactorSetupForm, { onSubmit: handle2FA }) }, "2fa"))] })] }));
    }
};
// Mobile Responsive Auth
export const MobileAuthExperience = {
    name: 'Mobile-First Auth Experience',
    render: () => (_jsx("div", { className: "max-w-sm mx-auto", children: _jsx(LoginForm, { className: "w-full max-w-sm", onSubmit: async (data) => {
                console.log('Mobile Login:', data);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } }) })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=auth-forms.stories.js.map