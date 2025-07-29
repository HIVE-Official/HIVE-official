import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveForm, HiveInput, HiveSelect, HiveButton } from '../../components';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
const meta = {
    title: '15-Examples/Form System Patterns',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**Comprehensive form patterns for the HIVE ecosystem**

Complete form system showcasing HIVE's approach to data collection, validation, and user input. Optimized for Builder workflows, Space creation, and campus-specific forms.

## Form Design Principles
- **Builder-Centric**: Forms designed for creative workflows and tool composition
- **Campus Context**: University-specific form patterns and validation
- **Infrastructure Feel**: Matte obsidian glass with premium form experience
- **Magnetic Interactions**: Form elements snap and flow with liquid metal physics

## Form Types
- **Tool Creation**: Building and configuring tools in HiveLAB
- **Space Setup**: Creating and customizing Spaces
- **Profile Forms**: User onboarding and preference setting
- **Content Forms**: Posts, comments, and community content

## Validation Strategy
- **Real-time feedback** with liquid metal motion
- **Campus-aware validation** (email domains, university data)
- **Builder workflow optimization** with smart defaults
- **Accessibility-first error messaging**

## Accessibility
- WCAG 2.1 AA compliant form structure
- Screen reader friendly labels and descriptions
- Keyboard navigation between form elements
- Clear error messaging and recovery paths
        `
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const ToolCreationForm = {
    render: () => {
        const [formData, setFormData] = useState({
            name: '',
            description: '',
            category: '',
            visibility: 'public',
            allowForking: true,
            tags: []
        });
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            // Simulate form submission
            setTimeout(() => {
                setIsSubmitting(false);
                console.log('Tool created:', formData);
            }, 2000);
        };
        return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-hive-foreground mb-2", children: "Create New Tool" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Build a tool to share with your Space and the HIVE community." })] }), _jsxs(HiveForm, { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tool-name", children: "Tool Name *" }), _jsx(HiveInput, { id: "tool-name", placeholder: "e.g., Study Timer Pro", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Choose a clear, descriptive name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tool-category", children: "Category *" }), _jsx(HiveSelect, { id: "tool-category", placeholder: "Select category...", options: [
                                                { value: 'productivity', label: 'Productivity' },
                                                { value: 'study', label: 'Study Tools' },
                                                { value: 'social', label: 'Social' },
                                                { value: 'utilities', label: 'Utilities' },
                                                { value: 'entertainment', label: 'Entertainment' }
                                            ], value: formData.category, onChange: (value) => setFormData({ ...formData, category: value }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tool-description", children: "Description *" }), _jsx(Textarea, { id: "tool-description", placeholder: "Describe what your tool does and how students can use it...", rows: 4, value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), required: true }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Help other students understand the value of your tool (200-500 characters recommended)" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Visibility" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", id: "public", name: "visibility", value: "public", checked: formData.visibility === 'public', onChange: (e) => setFormData({ ...formData, visibility: e.target.value }), className: "text-hive-accent focus:ring-hive-accent" }), _jsx(Label, { htmlFor: "public", className: "text-sm font-normal", children: "Public - Anyone can discover and use" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", id: "space-only", name: "visibility", value: "space", checked: formData.visibility === 'space', onChange: (e) => setFormData({ ...formData, visibility: e.target.value }), className: "text-hive-accent focus:ring-hive-accent" }), _jsx(Label, { htmlFor: "space-only", className: "text-sm font-normal", children: "Space Only - Visible to Space members" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Permissions" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "allow-forking", className: "text-sm font-normal", children: "Allow other Builders to fork this tool" }), _jsx(Switch, { id: "allow-forking", checked: formData.allowForking, onCheckedChange: (checked) => setFormData({ ...formData, allowForking: checked }) })] }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Forking helps the community build on your work" })] })] }), _jsxs("div", { className: "flex justify-end space-x-4 pt-6", children: [_jsx(HiveButton, { variant: "outline", type: "button", children: "Save as Draft" }), _jsx(HiveButton, { type: "submit", loading: isSubmitting, children: isSubmitting ? 'Creating Tool...' : 'Create Tool' })] })] })] }));
    }
};
export const SpaceActivationForm = {
    render: () => {
        const [formData, setFormData] = useState({
            university: '',
            spaceName: '',
            spaceType: '',
            description: '',
            welcomeMessage: '',
            isPrivate: false,
            requireApproval: true
        });
        return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-hive-foreground mb-2", children: "Activate New Space" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Create a community space for your university or department." })] }), _jsxs(HiveForm, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "university", children: "University *" }), _jsx(HiveSelect, { id: "university", placeholder: "Search for your university...", searchable: true, options: [
                                        { value: 'stanford', label: 'Stanford University' },
                                        { value: 'berkeley', label: 'UC Berkeley' },
                                        { value: 'mit', label: 'MIT' },
                                        { value: 'harvard', label: 'Harvard University' }
                                    ], value: formData.university, onChange: (value) => setFormData({ ...formData, university: value }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "space-name", children: "Space Name *" }), _jsx(HiveInput, { id: "space-name", placeholder: "e.g., Computer Science", value: formData.spaceName, onChange: (e) => setFormData({ ...formData, spaceName: e.target.value }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "space-type", children: "Space Type *" }), _jsx(HiveSelect, { id: "space-type", placeholder: "Select type...", options: [
                                                { value: 'department', label: 'Academic Department' },
                                                { value: 'course', label: 'Course/Class' },
                                                { value: 'club', label: 'Student Organization' },
                                                { value: 'project', label: 'Project Team' },
                                                { value: 'general', label: 'General Interest' }
                                            ], value: formData.spaceType, onChange: (value) => setFormData({ ...formData, spaceType: value }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "space-description", children: "Space Description *" }), _jsx(Textarea, { id: "space-description", placeholder: "Describe the purpose and community of this Space...", rows: 3, value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "welcome-message", children: "Welcome Message" }), _jsx(Textarea, { id: "welcome-message", placeholder: "Welcome new members with a custom message...", rows: 2, value: formData.welcomeMessage, onChange: (e) => setFormData({ ...formData, welcomeMessage: e.target.value }) }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "This message will be shown to new members when they join" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Space Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "private-space", className: "text-sm font-normal", children: "Private Space" }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Only invited members can join" })] }), _jsx(Switch, { id: "private-space", checked: formData.isPrivate, onCheckedChange: (checked) => setFormData({ ...formData, isPrivate: checked }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "require-approval", className: "text-sm font-normal", children: "Require Approval" }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Review join requests before approval" })] }), _jsx(Switch, { id: "require-approval", checked: formData.requireApproval, onCheckedChange: (checked) => setFormData({ ...formData, requireApproval: checked }) })] })] })] }), _jsxs("div", { className: "flex justify-end space-x-4 pt-6", children: [_jsx(HiveButton, { variant: "outline", type: "button", children: "Preview Space" }), _jsx(HiveButton, { type: "submit", children: "Activate Space" })] })] })] }));
    }
};
export const ProfileOnboardingForm = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(1);
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            university: '',
            major: '',
            graduationYear: '',
            interests: [],
            bio: '',
            isBuilder: false
        });
        const totalSteps = 3;
        const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps));
        const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));
        return (_jsxs("div", { className: "max-w-lg mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-bold text-hive-foreground", children: "Complete Your Profile" }), _jsxs("span", { className: "text-sm text-hive-foreground-muted", children: ["Step ", currentStep, " of ", totalSteps] })] }), _jsx("div", { className: "w-full bg-hive-background-muted rounded-full h-2", children: _jsx("div", { className: "bg-hive-accent h-2 rounded-full transition-all duration-300", style: { width: `${(currentStep / totalSteps) * 100}%` } }) })] }), _jsxs(HiveForm, { className: "space-y-6", children: [currentStep === 1 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-foreground mb-2", children: "Basic Information" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Let's start with the basics" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "first-name", children: "First Name *" }), _jsx(HiveInput, { id: "first-name", placeholder: "Jane", value: formData.firstName, onChange: (e) => setFormData({ ...formData, firstName: e.target.value }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "last-name", children: "Last Name *" }), _jsx(HiveInput, { id: "last-name", placeholder: "Doe", value: formData.lastName, onChange: (e) => setFormData({ ...formData, lastName: e.target.value }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "university", children: "University *" }), _jsx(HiveSelect, { id: "university", placeholder: "Search for your university...", searchable: true, options: [
                                                { value: 'stanford', label: 'Stanford University' },
                                                { value: 'berkeley', label: 'UC Berkeley' },
                                                { value: 'mit', label: 'MIT' }
                                            ], value: formData.university, onChange: (value) => setFormData({ ...formData, university: value }) })] })] })), currentStep === 2 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-foreground mb-2", children: "Academic Details" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Help us customize your HIVE experience" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "major", children: "Major/Field of Study *" }), _jsx(HiveSelect, { id: "major", placeholder: "Select your major...", searchable: true, options: [
                                                { value: 'cs', label: 'Computer Science' },
                                                { value: 'engineering', label: 'Engineering' },
                                                { value: 'business', label: 'Business' },
                                                { value: 'psychology', label: 'Psychology' }
                                            ], value: formData.major, onChange: (value) => setFormData({ ...formData, major: value }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "graduation-year", children: "Expected Graduation *" }), _jsx(HiveSelect, { id: "graduation-year", placeholder: "Select year...", options: [
                                                { value: '2024', label: '2024' },
                                                { value: '2025', label: '2025' },
                                                { value: '2026', label: '2026' },
                                                { value: '2027', label: '2027' },
                                                { value: '2028', label: '2028' }
                                            ], value: formData.graduationYear, onChange: (value) => setFormData({ ...formData, graduationYear: value }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "is-builder", className: "text-sm font-medium", children: "I want to become a Builder" }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "Get early access to HiveLAB and tool creation features" })] }), _jsx(Switch, { id: "is-builder", checked: formData.isBuilder, onCheckedChange: (checked) => setFormData({ ...formData, isBuilder: checked }) })] })] })), currentStep === 3 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-foreground mb-2", children: "Personalize Your Profile" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Help your community get to know you" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "bio", children: "Bio (Optional)" }), _jsx(Textarea, { id: "bio", placeholder: "Tell us a bit about yourself, your interests, or what you're working on...", rows: 3, value: formData.bio, onChange: (e) => setFormData({ ...formData, bio: e.target.value }) }), _jsx("p", { className: "text-xs text-hive-foreground-muted", children: "This will be visible on your profile and help others connect with you" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Interests (Optional)" }), _jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: ['AI/ML', 'Web Dev', 'Mobile', 'Data Science', 'Cybersecurity', 'Game Dev', 'Startups', 'Research'].map((interest) => (_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", className: "rounded border-gray-300 text-hive-accent focus:ring-hive-accent", checked: formData.interests.includes(interest), onChange: (e) => {
                                                            if (e.target.checked) {
                                                                setFormData({ ...formData, interests: [...formData.interests, interest] });
                                                            }
                                                            else {
                                                                setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
                                                            }
                                                        } }), _jsx("span", { children: interest })] }, interest))) })] })] })), _jsxs("div", { className: "flex justify-between pt-6", children: [_jsx(HiveButton, { variant: "outline", type: "button", onClick: prevStep, disabled: currentStep === 1, children: "Previous" }), _jsx(HiveButton, { type: "button", onClick: currentStep === totalSteps ? () => console.log('Complete!') : nextStep, children: currentStep === totalSteps ? 'Complete Profile' : 'Next' })] })] })] }));
    }
};
export const ValidationShowcase = {
    render: () => {
        const [formData, setFormData] = useState({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
        const [errors, setErrors] = useState({});
        const [touched, setTouched] = useState({});
        const validateField = (field, value) => {
            switch (field) {
                case 'email':
                    if (!value)
                        return 'Email is required';
                    if (!/\S+@\S+\.\S+/.test(value))
                        return 'Invalid email format';
                    if (!value.endsWith('.edu'))
                        return 'Please use your university email (.edu)';
                    return '';
                case 'password':
                    if (!value)
                        return 'Password is required';
                    if (value.length < 8)
                        return 'Password must be at least 8 characters';
                    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                        return 'Password must contain uppercase, lowercase, and number';
                    }
                    return '';
                case 'confirmPassword':
                    if (!value)
                        return 'Please confirm your password';
                    if (value !== formData.password)
                        return 'Passwords do not match';
                    return '';
                case 'username':
                    if (!value)
                        return 'Username is required';
                    if (value.length < 3)
                        return 'Username must be at least 3 characters';
                    if (!/^[a-zA-Z0-9_]+$/.test(value))
                        return 'Username can only contain letters, numbers, and underscores';
                    return '';
                default:
                    return '';
            }
        };
        const handleFieldChange = (field, value) => {
            setFormData({ ...formData, [field]: value });
            if (touched[field]) {
                const error = validateField(field, value);
                setErrors({ ...errors, [field]: error });
            }
        };
        const handleBlur = (field) => {
            setTouched({ ...touched, [field]: true });
            const error = validateField(field, formData[field]);
            setErrors({ ...errors, [field]: error });
        };
        return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-hive-foreground mb-2", children: "Validation Examples" }), _jsx("p", { className: "text-hive-foreground-muted", children: "Real-time validation with HIVE styling" })] }), _jsxs(HiveForm, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "University Email *" }), _jsx(HiveInput, { id: "email", type: "email", placeholder: "jane.doe@stanford.edu", value: formData.email, onChange: (e) => handleFieldChange('email', e.target.value), onBlur: () => handleBlur('email'), error: errors.email }), errors.email && (_jsx("p", { className: "text-xs text-destructive", children: errors.email }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "username", children: "Username *" }), _jsx(HiveInput, { id: "username", placeholder: "jane_doe_cs", value: formData.username, onChange: (e) => handleFieldChange('username', e.target.value), onBlur: () => handleBlur('username'), error: errors.username }), errors.username && (_jsx("p", { className: "text-xs text-destructive", children: errors.username })), !errors.username && formData.username && touched.username && (_jsx("p", { className: "text-xs text-green-600", children: "\u2713 Username is available" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password *" }), _jsx(HiveInput, { id: "password", type: "password", placeholder: "Create a strong password", value: formData.password, onChange: (e) => handleFieldChange('password', e.target.value), onBlur: () => handleBlur('password'), error: errors.password }), errors.password && (_jsx("p", { className: "text-xs text-destructive", children: errors.password }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password *" }), _jsx(HiveInput, { id: "confirm-password", type: "password", placeholder: "Confirm your password", value: formData.confirmPassword, onChange: (e) => handleFieldChange('confirmPassword', e.target.value), onBlur: () => handleBlur('confirmPassword'), error: errors.confirmPassword }), errors.confirmPassword && (_jsx("p", { className: "text-xs text-destructive", children: errors.confirmPassword }))] }), _jsx(HiveButton, { type: "submit", className: "w-full", children: "Create Account" })] })] }));
    }
};
//# sourceMappingURL=form-system-patterns.stories.js.map