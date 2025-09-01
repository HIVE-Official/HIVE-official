"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../../atomic/atoms/badge.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.js';
import { CheckCircle, ArrowRight, ArrowLeft, Mail, Shield, Users, GraduationCap, Building2, Loader2, X, AlertCircle } from 'lucide-react';
import { HiveLogo } from '../HiveLogo.js';
import { cn } from '../../lib/utils.js';
import { hiveVariants, hiveTransitions, hivePresets } from '../../lib/motion.js';
// Mock Data - Replace with API calls in production
const UB_DEPARTMENTS = [
    { id: 'cse', name: 'Computer Science & Engineering', college: 'School of Engineering', facultyCount: 24 },
    { id: 'ee', name: 'Electrical Engineering', college: 'School of Engineering', facultyCount: 18 },
    { id: 'me', name: 'Mechanical Engineering', college: 'School of Engineering', facultyCount: 22 },
    { id: 'bio', name: 'Biological Sciences', college: 'College of Arts & Sciences', facultyCount: 31 },
    { id: 'chem', name: 'Chemistry', college: 'College of Arts & Sciences', facultyCount: 19 },
    { id: 'math', name: 'Mathematics', college: 'College of Arts & Sciences', facultyCount: 28 },
    { id: 'psych', name: 'Psychology', college: 'College of Arts & Sciences', facultyCount: 25 },
    { id: 'med', name: 'Medicine', college: 'Jacobs School of Medicine', facultyCount: 45 },
    { id: 'bus', name: 'Business Administration', college: 'School of Management', facultyCount: 16 },
    { id: 'law', name: 'Law', college: 'School of Law', facultyCount: 34 }
];
const UB_MAJORS = [
    // Engineering
    { id: 'cs-bs', name: 'Computer Science', department: 'cse', level: 'undergraduate' },
    { id: 'cs-ms', name: 'Computer Science', department: 'cse', level: 'graduate' },
    { id: 'cs-phd', name: 'Computer Science', department: 'cse', level: 'phd' },
    { id: 'ee-bs', name: 'Electrical Engineering', department: 'ee', level: 'undergraduate' },
    { id: 'me-bs', name: 'Mechanical Engineering', department: 'me', level: 'undergraduate' },
    // Arts & Sciences
    { id: 'bio-bs', name: 'Biology', department: 'bio', level: 'undergraduate' },
    { id: 'chem-bs', name: 'Chemistry', department: 'chem', level: 'undergraduate' },
    { id: 'math-bs', name: 'Mathematics', department: 'math', level: 'undergraduate' },
    { id: 'psych-bs', name: 'Psychology', department: 'psych', level: 'undergraduate' },
    // Business
    { id: 'bus-bs', name: 'Business Administration', department: 'bus', level: 'undergraduate' },
    { id: 'mba', name: 'MBA', department: 'bus', level: 'graduate' },
    // Medicine
    { id: 'med-md', name: 'Doctor of Medicine', department: 'med', level: 'graduate' },
    // Law
    { id: 'law-jd', name: 'Juris Doctor', department: 'law', level: 'graduate' }
];
const CLASS_YEARS = [
    { value: 'freshman', label: 'Freshman (1st Year)' },
    { value: 'sophomore', label: 'Sophomore (2nd Year)' },
    { value: 'junior', label: 'Junior (3rd Year)' },
    { value: 'senior', label: 'Senior (4th Year)' },
    { value: 'super-senior', label: 'Super Senior (5+ Years)' },
    { value: 'graduate', label: 'Graduate Student' },
    { value: 'phd', label: 'PhD Student' }
];
// Mock user type detection (in real app, this would be API calls)
const detectUserType = async (email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Mock detection logic
    if (email.includes('student') || email.includes('sarah') || email.includes('john.doe')) {
        return 'STUDENT';
    }
    if (email.includes('prof') || email.includes('dr.') || email.includes('johnson')) {
        return 'FACULTY';
    }
    if (email.includes('alumni') || email.includes('class')) {
        return 'ALUMNI';
    }
    if (email.endsWith('@buffalo.edu')) {
        // Default UB emails to student unless proven otherwise
        return 'STUDENT';
    }
    return 'NOT_ELIGIBLE';
};
// University domains validation
const UNIVERSITY_DOMAINS = [
    'buffalo.edu',
    'student.buffalo.edu',
    'cse.buffalo.edu',
    'eng.buffalo.edu'
];
const isUniversityEmail = (email) => {
    return UNIVERSITY_DOMAINS.some(domain => email.endsWith(`@${domain}`));
};
export const ComprehensiveAuthFlow = ({ onAuthComplete, onStartOnboarding, mockMode = false }) => {
    const [state, setState] = useState({
        step: 'entry',
        email: '',
        userType: null,
        loading: false,
        error: null,
        userData: {}
    });
    const updateState = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);
    const handleEmailSubmit = async () => {
        if (!state.email.trim()) {
            updateState({ error: 'Please enter your email address' });
            return;
        }
        if (!isUniversityEmail(state.email)) {
            updateState({ error: 'Please use your university .edu email address' });
            return;
        }
        updateState({ loading: true, error: null, step: 'user-type-detection' });
        try {
            const userType = await detectUserType(state.email);
            updateState({
                userType,
                loading: false,
                step: getUserTypeNextStep(userType)
            });
        }
        catch (error) {
            updateState({
                loading: false,
                error: 'Failed to verify your account. Please try again.',
                step: 'entry'
            });
        }
    };
    const getUserTypeNextStep = (userType) => {
        switch (userType) {
            case 'STUDENT': return 'student-flow';
            case 'FACULTY': return 'faculty-warning';
            case 'ALUMNI': return 'alumni-rejection';
            default: return 'not-eligible';
        }
    };
    const handleStudentContinue = () => {
        if (onStartOnboarding) {
            // Pass initial student data for onboarding
            const initialStudentData = {
                profileComplete: false,
                onboardingStep: 0,
                universityId: 'ub-buffalo',
                campusId: 'north-campus',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                studentId: `stu_${Date.now()}`
            };
            onStartOnboarding('STUDENT', state.email, initialStudentData);
        }
        else {
            // Mock complete for demo
            const completeStudentData = {
                profileComplete: true,
                onboardingStep: 100,
                universityId: 'ub-buffalo',
                campusId: 'north-campus',
                major: 'Computer Science',
                majorId: 'cs-bs',
                classYear: 'junior',
                academicLevel: 'undergraduate',
                graduationYear: 2026,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                studentId: `stu_${Date.now()}`
            };
            updateState({
                userData: completeStudentData,
                step: 'complete'
            });
            if (onAuthComplete) {
                const authResult = {
                    success: true,
                    user: {
                        id: `user_${Date.now()}`,
                        email: state.email,
                        userType: 'STUDENT',
                        userData: completeStudentData
                    },
                    requiresOnboarding: false
                };
                onAuthComplete(authResult);
            }
        }
    };
    const handleFacultyAcceptTerms = () => {
        updateState({ step: 'faculty-setup' });
    };
    const handleFacultyComplete = async (facultyData) => {
        updateState({ loading: true });
        // Simulate faculty setup API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const completeUserData = {
            ...facultyData,
            profileComplete: true,
            onboardingStep: 100,
            universityId: 'ub-buffalo',
            campusId: 'north-campus',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            departmentId: UB_DEPARTMENTS.find(d => d.name === facultyData.department)?.id || '',
            facultyId: `fac_${Date.now()}`
        };
        updateState({
            userData: completeUserData,
            loading: false,
            step: 'complete'
        });
        if (onAuthComplete) {
            const authResult = {
                success: true,
                user: {
                    id: `user_${Date.now()}`,
                    email: state.email,
                    userType: 'FACULTY',
                    userData: completeUserData
                },
                requiresOnboarding: false
            };
            onAuthComplete(authResult);
        }
    };
    const renderStep = () => {
        switch (state.step) {
            case 'entry':
                return _jsx(EntryStep, { email: state.email, loading: state.loading, error: state.error, onEmailChange: (email) => updateState({ email, error: null }), onSubmit: handleEmailSubmit });
            case 'user-type-detection':
                return _jsx(UserTypeDetectionStep, { email: state.email });
            case 'student-flow':
                return _jsx(StudentFlowStep, { email: state.email, onContinue: handleStudentContinue });
            case 'faculty-warning':
                return _jsx(FacultyWarningStep, { email: state.email, onAccept: handleFacultyAcceptTerms, onReject: () => updateState({ step: 'entry', email: '', userType: null }) });
            case 'faculty-setup':
                return _jsx(FacultySetupStep, { email: state.email, loading: state.loading, onComplete: handleFacultyComplete, onBack: () => updateState({ step: 'faculty-warning' }) });
            case 'alumni-rejection':
                return _jsx(AlumniRejectionStep, { onBack: () => updateState({ step: 'entry', email: '', userType: null }) });
            case 'not-eligible':
                return _jsx(NotEligibleStep, { email: state.email, onBack: () => updateState({ step: 'entry', email: '', userType: null }) });
            case 'complete':
                return _jsx(CompleteStep, { userType: state.userType, email: state.email, userData: state.userData });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.1),transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[conic-gradient(from_45deg,transparent,rgba(255,215,0,0.05),transparent)]" })] }), _jsx(motion.div, { className: "w-full max-w-lg relative z-10", initial: "hidden", animate: "visible", variants: hiveVariants.container, children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { variants: {
                            hidden: { opacity: 0, scale: 0.95, y: 20 },
                            visible: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 1.05, y: -20 }
                        }, initial: "hidden", animate: "visible", exit: "exit", transition: hiveTransitions.elegant, children: renderStep() }, state.step) }) })] }));
};
const EntryStep = ({ email, loading, error, onEmailChange, onSubmit }) => (_jsxs(Card, { className: "text-center", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsx("div", { className: "mb-6", children: _jsx(HiveLogo, { variant: "gold", size: "xl", animationType: "gentle-float" }) }), _jsx(CardTitle, { className: "text-2xl mb-2", children: "HIVE" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Your campus community" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "text-left space-y-4", children: [_jsx("label", { className: "block text-sm font-medium", children: "Enter your .edu email:" }), _jsx(Input, { type: "email", placeholder: "sarah.chen@buffalo.edu", value: email, onChange: (e) => onEmailChange(e.target.value), onKeyPress: (e) => e.key === 'Enter' && !loading && onSubmit(), className: cn(error && "border-red-500") }), error && (_jsxs("p", { className: "text-sm text-red-600 flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), error] }))] }), _jsx(Button, { onClick: onSubmit, disabled: loading || !email.trim(), className: "w-full", size: "lg", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Verifying..."] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] }));
const UserTypeDetectionStep = ({ email }) => (_jsx(Card, { className: "text-center", children: _jsx(CardContent, { className: "py-12", children: _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto", children: _jsx(Loader2, { className: "h-8 w-8 text-blue-600 animate-spin" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Verifying your account" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] text-sm", children: ["Checking university records for ", email, "..."] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full animate-pulse", style: { width: '70%' } }) })] }) }) }));
const StudentFlowStep = ({ email, onContinue }) => (_jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8 text-center", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx(motion.div, { className: "w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto", variants: hiveVariants.goldPulse, animate: "pulse", children: _jsx(CheckCircle, { className: "h-10 w-10 text-accent" }) }), _jsxs(motion.div, { className: "space-y-3", variants: hiveVariants.item, transition: { delay: 0.2 }, children: [_jsx("h2", { className: "text-3xl font-display font-bold text-foreground", children: "Welcome to HIVE! \uD83C\uDF89" }), _jsx("p", { className: "text-lg text-accent font-medium", children: "Student verification complete" })] })] }), _jsxs(motion.div, { className: "bg-surface-02 rounded-lg p-6 text-left space-y-3", variants: hiveVariants.item, transition: { delay: 0.3 }, children: [_jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx(Mail, { className: "w-4 h-4 text-accent" }), _jsx("span", { className: "text-muted", children: "Verified Email:" }), _jsx("span", { className: "font-medium text-foreground", children: email })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx(GraduationCap, { className: "w-4 h-4 text-accent" }), _jsx("span", { className: "text-muted", children: "Status:" }), _jsx(Badge, { variant: "primary", className: "bg-accent/20 text-accent border-accent/30", children: "Active Student" })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx(Shield, { className: "w-4 h-4 text-accent" }), _jsx("span", { className: "text-muted", children: "Access Level:" }), _jsx("span", { className: "font-medium text-foreground", children: "Full Platform Access" })] })] }), _jsxs(motion.div, { className: "space-y-3", variants: hiveVariants.item, transition: { delay: 0.4 }, children: [_jsx("h3", { className: "font-display font-semibold text-foreground", children: "You can now:" }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-muted", children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: "Join Spaces" })] }), _jsxs("div", { className: "flex items-center gap-2 text-muted", children: [_jsx(Building2, { className: "w-4 h-4" }), _jsx("span", { children: "Use Tools" })] })] })] }), _jsx(motion.div, { variants: hiveVariants.item, transition: { delay: 0.5 }, children: _jsxs(Button, { onClick: onContinue, variant: "primary", size: "lg", className: "w-full", ...hivePresets.button, children: ["Start Your HIVE Journey", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] }) })] }));
const FacultyWarningStep = ({ email, onAccept, onReject }) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "text-center pb-4", children: [_jsx("div", { className: "w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Shield, { className: "h-8 w-8 text-orange-600" }) }), _jsx(CardTitle, { className: "text-orange-800", children: "FACULTY ACCESS NOTICE" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mb-2", children: "Dr. Johnson (detected as faculty)" }), _jsx("p", { className: "text-sm font-mono text-gray-500", children: email }), _jsx(Badge, { variant: "secondary", className: "mt-3 bg-orange-100 text-orange-800", children: "\u26A0\uFE0F LIMITED ACCESS MODE" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-green-700 mb-2", children: "As faculty, you CAN:" }), _jsxs("ul", { className: "text-sm space-y-1 text-green-600", children: [_jsx("li", { children: "\u2713 Request to run/moderate Spaces" }), _jsx("li", { children: "\u2713 View public campus activity" }), _jsx("li", { children: "\u2713 Use academic Tools" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-red-700 mb-2", children: "You CANNOT:" }), _jsxs("ul", { className: "text-sm space-y-1 text-red-600", children: [_jsx("li", { children: "\u2717 Create new Spaces" }), _jsx("li", { children: "\u2717 Join student social Spaces" }), _jsx("li", { children: "\u2717 Access residential Spaces" }), _jsx("li", { children: "\u2717 View private student profiles" }), _jsx("li", { children: "\u2717 Participate in social polls" })] })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { onClick: onAccept, className: "flex-1", children: "I understand" }), _jsx(Button, { onClick: onReject, variant: "secondary", className: "flex-1", children: "I'm not faculty" })] })] })] }));
const FacultySetupStep = ({ email, loading, onComplete, onBack }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        department: '',
        role: '',
        office: '',
        spaceRequests: []
    });
    const [selectedSpaces, setSelectedSpaces] = useState([]);
    const facultyRoles = [
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Lecturer',
        'Research Scientist',
        'Post-doctoral Researcher',
        'Graduate Teaching Assistant',
        'Adjunct Faculty',
        'Visiting Scholar'
    ];
    const academicSpaces = [
        'CS 115 - Intro to Programming',
        'CS 250 - Data Structures',
        'CS 337 - Computer Graphics',
        'CS 429 - Machine Learning',
        'CS Research Lab',
        'Graduate Seminar',
        'Department Meetings'
    ];
    const handleSubmit = async () => {
        const facultyData = {
            ...formData,
            spaceRequests: selectedSpaces,
            email
        };
        await onComplete(facultyData);
    };
    return (_jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "text-center space-y-3", variants: hiveVariants.item, children: [_jsx("div", { className: "w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Building2, { className: "w-8 h-8 text-accent" }) }), _jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Faculty Profile Setup" }), _jsx("p", { className: "text-muted font-body", children: "Complete your faculty profile to access HIVE" })] }), _jsxs(motion.div, { className: "space-y-6", variants: hiveVariants.container, children: [_jsxs(motion.div, { variants: hiveVariants.item, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Display Name" }), _jsx(Input, { placeholder: "Dr. John Johnson", value: formData.displayName, onChange: (e) => setFormData({ ...formData, displayName: e.target.value }), className: "bg-surface-01 border-border" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Office Location" }), _jsx(Input, { placeholder: "Davis Hall 344", value: formData.office, onChange: (e) => setFormData({ ...formData, office: e.target.value }), className: "bg-surface-01 border-border" })] })] }), _jsxs(motion.div, { variants: hiveVariants.item, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Department" }), _jsxs(Select, { value: formData.department, onValueChange: (value) => setFormData({ ...formData, department: value }), children: [_jsx(SelectTrigger, { className: "bg-surface-01 border-border", children: _jsx(SelectValue, { placeholder: "Select your department" }) }), _jsx(SelectContent, { children: UB_DEPARTMENTS.map((dept) => (_jsx(SelectItem, { value: dept.name, children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: dept.name }), _jsx("span", { className: "text-xs text-muted", children: dept.college })] }) }, dept.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Role" }), _jsxs(Select, { value: formData.role, onValueChange: (value) => setFormData({ ...formData, role: value }), children: [_jsx(SelectTrigger, { className: "bg-surface-01 border-border", children: _jsx(SelectValue, { placeholder: "Select your role" }) }), _jsx(SelectContent, { children: facultyRoles.map((role) => (_jsx(SelectItem, { value: role, children: role }, role))) })] })] })] }), _jsxs(motion.div, { variants: hiveVariants.item, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-foreground", children: "Request Space Leadership" }), _jsx("p", { className: "text-sm text-muted", children: "Which academic spaces would you like to lead? Students will vote to approve your requests." })] }), _jsx("div", { className: "space-y-3", children: academicSpaces.map((space, index) => (_jsxs(motion.label, { className: cn("flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer", "hover:border-accent/30 hover:bg-surface-02", selectedSpaces.includes(space) && "border-accent bg-accent/10"), variants: hiveVariants.item, transition: { delay: index * 0.05 }, whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsx("input", { type: "checkbox", checked: selectedSpaces.includes(space), onChange: (e) => {
                                                if (e.target.checked) {
                                                    setSelectedSpaces([...selectedSpaces, space]);
                                                }
                                                else {
                                                    setSelectedSpaces(selectedSpaces.filter(s => s !== space));
                                                }
                                            }, className: "w-4 h-4 text-accent bg-surface-01 border-border rounded focus:ring-accent" }), _jsx("span", { className: "text-sm font-body text-foreground flex-1", children: space }), selectedSpaces.includes(space) && (_jsx(CheckCircle, { className: "w-4 h-4 text-accent" }))] }, space))) }), _jsx("div", { className: "bg-surface-02 p-3 rounded-lg", children: _jsxs("p", { className: "text-xs text-muted flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), "Faculty space requests require student community approval"] }) })] }), _jsxs(motion.div, { variants: hiveVariants.item, className: "flex gap-3 pt-4", children: [_jsxs(Button, { onClick: onBack, variant: "secondary", className: "flex-1", ...hivePresets.button, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsx(Button, { onClick: handleSubmit, disabled: loading || !formData.displayName || !formData.department || !formData.role, variant: "primary", className: "flex-2", ...hivePresets.button, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Setting up..."] })) : (_jsxs(_Fragment, { children: ["Complete Setup", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] })] }));
};
const AlumniRejectionStep = ({ onBack }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(GraduationCap, { className: "h-8 w-8 text-blue-600" }) }), _jsx("h3", { className: "text-xl font-semibold text-blue-800 mb-2", children: "ALUMNI ACCESS" }), _jsxs("div", { className: "space-y-4 text-left", children: [_jsx("p", { children: "Hi John (Class of 2020)" }), _jsx("p", { children: "Alumni cannot self-register for HIVE." }), _jsx("p", { children: "Current students can invite alumni for:" }), _jsxs("ul", { className: "text-sm space-y-1 ml-4", children: [_jsx("li", { children: "\u2022 Mentorship programs" }), _jsx("li", { children: "\u2022 Career networking" }), _jsx("li", { children: "\u2022 Special events" })] }), _jsx("p", { className: "text-sm font-medium", children: "Want access? Ask a current student to invite you." })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx(Button, { variant: "secondary", className: "flex-1", children: "Learn about mentorship" }), _jsx(Button, { onClick: onBack, className: "flex-1", children: "Back" })] })] }) }));
const NotEligibleStep = ({ email, onBack }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(X, { className: "h-8 w-8 text-red-600" }) }), _jsx("h3", { className: "text-xl font-semibold text-red-800 mb-4", children: "ACCESS DENIED" }), _jsxs("div", { className: "space-y-4 text-left", children: [_jsx("p", { children: "HIVE is exclusively for the University at Buffalo community." }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm", children: _jsx("strong", { children: "Eligible users:" }) }), _jsxs("ul", { className: "text-sm space-y-1 mt-2", children: [_jsx("li", { children: "\u2022 Current students (.edu email)" }), _jsx("li", { children: "\u2022 Faculty/staff (verified)" }), _jsx("li", { children: "\u2022 Invited alumni" })] })] }), _jsx("div", { className: "bg-red-50 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-red-700", children: [_jsx("strong", { children: "Your email:" }), " ", email, _jsx("br", {}), _jsx("strong", { children: "Status:" }), " Not eligible"] }) })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx(Button, { onClick: onBack, className: "flex-1", children: "Back" }), _jsx(Button, { variant: "secondary", className: "flex-1", children: "Learn more" })] })] }) }));
const CompleteStep = ({ userType, email, userData }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(CheckCircle, { className: "h-8 w-8 text-green-600" }) }), _jsx("h3", { className: "text-xl font-semibold text-green-800 mb-2", children: userType === 'STUDENT' ? 'Ready for onboarding!' : 'Setup complete!' }), userType === 'STUDENT' ? (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-green-600", children: "Your student account is verified and ready." }), _jsx("div", { className: "bg-green-50 rounded-lg p-4 text-left", children: _jsxs("p", { className: "text-sm text-green-700", children: [_jsx("strong", { children: "Next:" }), " Complete your campus profile setup to join your community spaces."] }) })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-blue-600", children: "Your faculty dashboard is ready." }), _jsx("div", { className: "bg-blue-50 rounded-lg p-4 text-left", children: _jsxs("p", { className: "text-sm text-blue-700", children: [_jsx("strong", { children: "Pending requests:" }), _jsx("br", {}), userData.spaceRequests?.map((space) => (_jsxs("span", { className: "block", children: ["\u2022 ", space, " (awaiting approval)"] }, space)))] }) })] }))] }) }));
//# sourceMappingURL=comprehensive-auth-flow.js.map