import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Enhanced Profile Settings - Campus Command Center
 * Integrates ComprehensiveFormField molecule with campus-specific settings
 *
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveFormField molecule for consistent form patterns
 * - ComprehensiveCard molecule for organized settings sections
 * - NavigationMenu molecule for settings navigation
 * - Campus-specific validation and features
 */
import React, { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
// Molecule imports
import { ComprehensiveFormField } from '../../atomic/molecules/form-field-comprehensive';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';
import { NavigationMenu } from '../../atomic/molecules/navigation-menu';
import { iconComposition, User, Mail, Lock, Phone, MapPin, GraduationCap, Calendar, Bell, Eye, EyeOff, Shield, Save, AlertCircle, CheckCircle2, Globe, Users, Activity } from '../../atomic/foundations/icon-composition';
// === SETTINGS SECTIONS ===
const settingsSections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'campus', label: 'Campus Info', icon: GraduationCap },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Activity }
];
// === VALIDATION RULES ===
const validationRules = {
    fullName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s'-]+$/,
        message: 'Please enter your full name (letters, spaces, hyphens, and apostrophes only)'
    },
    handle: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_-]+$/,
        message: 'Handle must be 3-20 characters (letters, numbers, underscores, hyphens only)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@buffalo\.edu$/,
        message: 'Must be a valid @buffalo.edu email address'
    },
    phone: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Please enter a valid phone number'
    },
    website: {
        pattern: /^https?:\/\/.+/,
        message: 'Website must start with http:// or https://'
    },
    bio: {
        maxLength: 500,
        message: 'Bio must be under 500 characters'
    }
};
// === FORM VALIDATION ===
const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules)
        return undefined;
    const stringValue = String(value || '').trim();
    if (rules.required && !stringValue) {
        return `${fieldName} is required`;
    }
    if (stringValue && rules.minLength && stringValue.length < rules.minLength) {
        return `Must be at least ${rules.minLength} characters`;
    }
    if (stringValue && rules.maxLength && stringValue.length > rules.maxLength) {
        return `Must be under ${rules.maxLength} characters`;
    }
    if (stringValue && rules.pattern && !rules.pattern.test(stringValue)) {
        return rules.message;
    }
    return undefined;
};
// === PRIVACY LEVELS ===
const privacyLevels = [
    {
        value: 'public',
        label: 'Public',
        description: 'Visible to everyone on the internet',
        icon: Globe
    },
    {
        value: 'campus',
        label: 'Campus Only',
        description: 'Visible to all UB students and faculty',
        icon: GraduationCap
    },
    {
        value: 'connections',
        label: 'Connections Only',
        description: 'Visible only to your campus connections',
        icon: Users
    },
    {
        value: 'private',
        label: 'Private',
        description: 'Only visible to you',
        icon: Lock
    }
];
// === MAIN COMPONENT ===
export const EnhancedProfileSettings = React.forwardRef(({ user, isValidating = false, validationErrors = {}, isSaving = false, saveSuccess = false, saveError, showCampusFeatures = true, showAdvancedPrivacy = true, showNotificationSettings = true, onSave, onUploadAvatar, onDeleteAccount, className }, ref) => {
    const [activeSection, setActiveSection] = useState('basic');
    const [formData, setFormData] = useState(user);
    const [fieldErrors, setFieldErrors] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    // Handle field changes with validation
    const handleFieldChange = useCallback((fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
        setHasChanges(true);
        // Real-time validation
        const error = validateField(fieldName, value);
        setFieldErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    }, []);
    // Handle form save
    const handleSave = useCallback(async () => {
        try {
            await onSave(formData);
            setHasChanges(false);
        }
        catch (error) {
            console.error('Failed to save profile:', error);
        }
    }, [formData, onSave]);
    // Render section content
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'basic':
                return (_jsxs("div", { className: "space-y-6", children: [_jsx(ComprehensiveFormField, { id: "fullName", label: "Full Name", type: "text", value: formData.fullName, onChange: (value) => handleFieldChange('fullName', value), error: fieldErrors.fullName || validationErrors.fullName, required: true, campusOptimized: true, icon: User, helpText: "Your name as it appears on your student ID" }), _jsx(ComprehensiveFormField, { id: "handle", label: "Handle", type: "text", value: formData.handle, onChange: (value) => handleFieldChange('handle', value), error: fieldErrors.handle || validationErrors.handle, required: true, campusOptimized: true, helpText: "Your unique identifier on HIVE (@handle)" }), _jsx(ComprehensiveFormField, { id: "bio", label: "Bio", type: "text", value: formData.bio, onChange: (value) => handleFieldChange('bio', value), error: fieldErrors.bio || validationErrors.bio, helpText: `${formData.bio.length}/500 characters` }), _jsx(ComprehensiveFormField, { id: "email", label: "University Email", type: "email", value: formData.email, onChange: (value) => handleFieldChange('email', value), error: fieldErrors.email || validationErrors.email, required: true, campusOptimized: true, icon: Mail, helpText: "Your official @buffalo.edu email address" }), _jsx(ComprehensiveFormField, { id: "phone", label: "Phone Number", type: "tel", value: formData.phone || '', onChange: (value) => handleFieldChange('phone', value), error: fieldErrors.phone || validationErrors.phone, icon: Phone, helpText: "Optional: For campus notifications and coordination" }), _jsx(ComprehensiveFormField, { id: "website", label: "Personal Website", type: "url", value: formData.website || '', onChange: (value) => handleFieldChange('website', value), error: fieldErrors.website || validationErrors.website, icon: Globe, helpText: "Optional: Portfolio, GitHub, or personal site" })] }));
            case 'campus':
                return (_jsxs("div", { className: "space-y-6", children: [_jsx(ComprehensiveFormField, { id: "major", label: "Major", type: "text", value: formData.major, onChange: (value) => handleFieldChange('major', value), error: fieldErrors.major || validationErrors.major, required: true, campusOptimized: true, icon: GraduationCap, helpText: "Your primary area of study" }), _jsx(ComprehensiveFormField, { id: "graduationYear", label: "Graduation Year", type: "number", value: formData.graduationYear.toString(), onChange: (value) => handleFieldChange('graduationYear', parseInt(value) || new Date().getFullYear()), required: true, campusOptimized: true, icon: Calendar, helpText: "Expected graduation year" }), _jsx(ComprehensiveFormField, { id: "dorm", label: "Residence Hall", type: "text", value: formData.dorm || '', onChange: (value) => handleFieldChange('dorm', value), icon: MapPin, helpText: "Optional: For campus community building" }), _jsx(ComprehensiveFormField, { id: "roomNumber", label: "Room Number", type: "text", value: formData.roomNumber || '', onChange: (value) => handleFieldChange('roomNumber', value), helpText: "Optional: For floor/building connections" })] }));
            case 'privacy':
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-medium text-[var(--hive-text-primary)] mb-3", children: "Profile Visibility" }), _jsx("div", { className: "space-y-3", children: privacyLevels.map(level => {
                                        const IconComponent = level.icon;
                                        return (_jsxs("label", { className: cn('flex items-start gap-3 p-4 rounded-lg border cursor-pointer', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', formData.profileVisibility === level.value
                                                ? 'border-[var(--hive-gold-primary)] bg-[var(--hive-gold-background)]'
                                                : 'border-[var(--hive-border-subtle)]'), children: [_jsx("input", { type: "radio", name: "profileVisibility", value: level.value, checked: formData.profileVisibility === level.value, onChange: (e) => handleFieldChange('profileVisibility', e.target.value), className: "mt-1" }), _jsx(IconComponent, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-text-secondary)] mt-0.5') }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: level.label }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: level.description })] })] }, level.value));
                                    }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Contact Information" }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.showEmail, onChange: (e) => handleFieldChange('showEmail', e.target.checked) }), _jsx("span", { children: "Show email address on profile" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.showPhone, onChange: (e) => handleFieldChange('showPhone', e.target.checked) }), _jsx("span", { children: "Show phone number to connections" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.showDorm, onChange: (e) => handleFieldChange('showDorm', e.target.checked) }), _jsx("span", { children: "Show residence hall for campus connections" })] })] }), _jsx("div", { className: "p-4 rounded-lg border border-[var(--hive-warning-border)] bg-[var(--hive-warning-background)]", children: _jsxs("label", { className: "flex items-start gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.ghostMode, onChange: (e) => handleFieldChange('ghostMode', e.target.checked), className: "mt-1" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [formData.ghostMode ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: "Ghost Mode" })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Hide your online status and reduce your visibility in campus discovery features" })] })] }) })] }));
            case 'notifications':
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Email Notifications" }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.emailNotifications, onChange: (e) => handleFieldChange('emailNotifications', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Email notifications" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Receive important updates via email" })] })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.weeklyDigest, onChange: (e) => handleFieldChange('weeklyDigest', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Weekly digest" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Summary of your campus activity and opportunities" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Platform Notifications" }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.spacesNotifications, onChange: (e) => handleFieldChange('spacesNotifications', e.target.checked) }), _jsx("span", { children: "Space activity and invitations" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.toolsNotifications, onChange: (e) => handleFieldChange('toolsNotifications', e.target.checked) }), _jsx("span", { children: "Tool updates and collaboration requests" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.eventsNotifications, onChange: (e) => handleFieldChange('eventsNotifications', e.target.checked) }), _jsx("span", { children: "Campus events and calendar reminders" })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.connectionRequests, onChange: (e) => handleFieldChange('connectionRequests', e.target.checked) }), _jsx("span", { children: "Connection requests and messages" })] })] })] }));
            case 'advanced':
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Campus Integration" }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.enableCalendarSync, onChange: (e) => handleFieldChange('enableCalendarSync', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Calendar sync" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Sync with your UB calendar and class schedule" })] })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.enableLocationSharing, onChange: (e) => handleFieldChange('enableLocationSharing', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Location sharing" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Show your campus location to help with coordination" })] })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.enableMutualConnections, onChange: (e) => handleFieldChange('enableMutualConnections', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Mutual connections" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Show mutual connections to help discover classmates" })] })] }), _jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: formData.enableActivityTracking, onChange: (e) => handleFieldChange('enableActivityTracking', e.target.checked) }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Activity tracking" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Track your campus engagement for personalized insights" })] })] })] }), _jsxs("div", { className: "p-4 rounded-lg border border-[var(--hive-error-border)] bg-[var(--hive-error-background)]", children: [_jsxs("h4", { className: "font-medium text-[var(--hive-error-primary)] mb-3 flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), "Danger Zone"] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: "These actions cannot be undone. Please be careful." }), _jsx("button", { onClick: onDeleteAccount, className: cn('px-4 py-2 rounded-md', 'bg-[var(--hive-error-primary)]', 'text-[var(--hive-bg-primary)]', 'font-medium text-sm', 'hover:opacity-90', 'transition-opacity'), children: "Delete Account" })] })] }));
            default:
                return null;
        }
    };
    return (_jsx("div", { ref: ref, className: cn('max-w-4xl mx-auto', className), children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(NavigationMenu, { items: settingsSections, activeId: activeSection, variant: "sidebar", orientation: "vertical", layout: "sidebar", size: "base", campusOptimized: true, onItemClick: (item) => setActiveSection(item.id), className: "sticky top-6" }) }), _jsx("div", { className: "lg:col-span-3", children: _jsx(ComprehensiveCard, { variant: "default", size: "comfortable", campusOptimized: true, children: _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "border-b border-[var(--hive-border-subtle)] pb-4", children: _jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: settingsSections.find(s => s.id === activeSection)?.label }) }), renderSectionContent(), _jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [saveSuccess && (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-[var(--hive-success-primary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-success-primary)]", children: "Settings saved successfully" })] })), saveError && (_jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "w-4 h-4 text-[var(--hive-error-primary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-error-primary)]", children: saveError })] }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [hasChanges && (_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "You have unsaved changes" })), _jsxs("button", { onClick: handleSave, disabled: !hasChanges || isSaving || Object.keys(fieldErrors).some(key => fieldErrors[key]), className: cn('flex items-center gap-2 px-6 py-2 rounded-lg', 'font-medium', 'bg-[var(--hive-gold-primary)]', 'text-[var(--hive-bg-primary)]', 'hover:opacity-90', 'disabled:opacity-50 disabled:cursor-not-allowed', 'transition-opacity'), children: [_jsx(Save, { className: "w-4 h-4" }), isSaving ? 'Saving...' : 'Save Changes'] })] })] })] }) }) })] }) }));
});
EnhancedProfileSettings.displayName = 'EnhancedProfileSettings';
export { validationRules, validateField, privacyLevels };
//# sourceMappingURL=enhanced-profile-settings.js.map