'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../atoms/input';
import { Select } from '../atoms/select';
import { FormField } from './form-field';
import { Mail, GraduationCap, Building2, Users, Calendar, Eye, Hammer, Zap, Package, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
export const UniversityEmailFieldMolecule = ({ value = '', onChange, onBlur, error, required = false, disabled = false, university, className }) => {
    const [isValidUniversityEmail, setIsValidUniversityEmail] = React.useState(null);
    const validateUniversityEmail = (email) => {
        if (!email)
            return null;
        // Common university email patterns
        const universityPatterns = [
            /\.edu$/, // Standard .edu domains
            /\.ac\.[a-z]{2}$/, // Academic domains (e.g., .ac.uk)
            /\.university$/, // .university domains
            /student\./, // Student subdomains
            /alumni\./ // Alumni subdomains
        ];
        return universityPatterns.some(pattern => pattern.test(email.toLowerCase()));
    };
    React.useEffect(() => {
        if (value) {
            setIsValidUniversityEmail(validateUniversityEmail(value));
        }
        else {
            setIsValidUniversityEmail(null);
        }
    }, [value]);
    const handleChange = (e) => {
        onChange?.(e.target.value);
    };
    const displayError = error || (isValidUniversityEmail === false ? 'Please use your university email address' : undefined);
    return (_jsx(FormField, { label: "University Email", description: university ? `Use your ${university} email address` : 'Use your university email address (.edu domain)', error: displayError, required: required, className: className, children: _jsx(Input, { type: "email", value: value, onChange: handleChange, onBlur: onBlur, placeholder: "student@university.edu", disabled: disabled, leftIcon: _jsx(Mail, { className: "h-4 w-4" }), rightIcon: isValidUniversityEmail === true ? (_jsx(CheckCircle, { className: "h-4 w-4 text-[var(--hive-status-success)]" })) : isValidUniversityEmail === false ? (_jsx(AlertCircle, { className: "h-4 w-4 text-[var(--hive-status-error)]" })) : null }) }));
};
export const StudentIDFieldMolecule = ({ value = '', onChange, onBlur, error, required = false, disabled = false, className }) => {
    const handleChange = (e) => {
        // Allow only alphanumeric characters and common separators
        const sanitized = e.target.value.replace(/[^a-zA-Z0-9\-_]/g, '');
        onChange?.(sanitized);
    };
    return (_jsx(FormField, { label: "Student ID", description: "Your official university student identification number", error: error, required: required, className: className, children: _jsx(Input, { type: "text", value: value, onChange: handleChange, onBlur: onBlur, placeholder: "123456789", disabled: disabled, leftIcon: _jsx(GraduationCap, { className: "h-4 w-4" }), maxLength: 20 }) }));
};
const ACADEMIC_MAJORS = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'art', label: 'Art & Design' },
    { value: 'music', label: 'Music' },
    { value: 'economics', label: 'Economics' },
    { value: 'political-science', label: 'Political Science' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'nursing', label: 'Nursing' },
    { value: 'education', label: 'Education' },
    { value: 'communications', label: 'Communications' },
    { value: 'other', label: 'Other' }
];
const ACADEMIC_YEARS = [
    { value: 'freshman', label: 'Freshman (1st Year)' },
    { value: 'sophomore', label: 'Sophomore (2nd Year)' },
    { value: 'junior', label: 'Junior (3rd Year)' },
    { value: 'senior', label: 'Senior (4th Year)' },
    { value: 'grad', label: 'Graduate Student' },
    { value: 'phd', label: 'PhD Student' },
    { value: 'postdoc', label: 'Postdoc' }
];
export const MajorSelectionFieldMolecule = ({ major = '', year = '', onMajorChange, onYearChange, majorError, yearError, required = false, disabled = false, className }) => {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Academic Major", description: "Your primary field of study", error: majorError, required: required, children: _jsx(Select, { options: ACADEMIC_MAJORS, value: major, onChange: (value) => onMajorChange?.(value), placeholder: "Select your major", disabled: disabled, searchable: true }) }), _jsx(FormField, { label: "Academic Year", description: "Your current year in university", error: yearError, required: required, children: _jsx(Select, { options: ACADEMIC_YEARS, value: year, onChange: (value) => onYearChange?.(value), placeholder: "Select your year", disabled: disabled }) })] }));
};
export const DormSelectionFieldMolecule = ({ dormBuilding = '', roomNumber = '', onDormChange, onRoomChange, dormError, roomError, required = false, disabled = false, className }) => {
    const handleRoomChange = (e) => {
        // Allow alphanumeric room numbers
        const sanitized = e.target.value.replace(/[^a-zA-Z0-9\-]/g, '');
        onRoomChange?.(sanitized);
    };
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Residence Hall", description: "Your dormitory or residence hall name", error: dormError, required: required, children: _jsx(Input, { type: "text", value: dormBuilding, onChange: (e) => onDormChange?.(e.target.value), placeholder: "e.g., Smith Hall, West Campus Dorms", disabled: disabled, leftIcon: _jsx(Building2, { className: "h-4 w-4" }) }) }), _jsx(FormField, { label: "Room Number", description: "Your room or suite number", error: roomError, required: required, children: _jsx(Input, { type: "text", value: roomNumber, onChange: handleRoomChange, placeholder: "e.g., 314, A205", disabled: disabled, maxLength: 10 }) })] }));
};
const GREEK_POSITIONS = [
    { value: 'member', label: 'Member' },
    { value: 'pledge', label: 'Pledge' },
    { value: 'president', label: 'President' },
    { value: 'vice-president', label: 'Vice President' },
    { value: 'treasurer', label: 'Treasurer' },
    { value: 'secretary', label: 'Secretary' },
    { value: 'social-chair', label: 'Social Chair' },
    { value: 'philanthropy-chair', label: 'Philanthropy Chair' },
    { value: 'recruitment-chair', label: 'Recruitment Chair' },
    { value: 'other-officer', label: 'Other Officer' }
];
export const GreekAffiliationFieldMolecule = ({ organization = '', position = '', onOrganizationChange, onPositionChange, organizationError, positionError, disabled = false, className }) => {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Greek Organization", description: "Your fraternity, sorority, or Greek organization", error: organizationError, children: _jsx(Input, { type: "text", value: organization, onChange: (e) => onOrganizationChange?.(e.target.value), placeholder: "e.g., Alpha Beta Gamma, Delta Phi Epsilon", disabled: disabled, leftIcon: _jsx(Users, { className: "h-4 w-4" }) }) }), organization && (_jsx(FormField, { label: "Position", description: "Your role in the organization", error: positionError, children: _jsx(Select, { options: GREEK_POSITIONS, value: position, onChange: (value) => onPositionChange?.(value), placeholder: "Select your position", disabled: disabled }) }))] }));
};
export const CalendarConnectionFieldMolecule = ({ googleCalendar = false, outlookCalendar = false, appleCalendar = false, onGoogleChange, onOutlookChange, onAppleChange, error, disabled = false, className }) => {
    return (_jsx(FormField, { label: "Calendar Integration", description: "Connect your calendars to sync your schedule with HIVE", error: error, className: className, children: _jsxs("div", { className: "space-y-3 p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Google Calendar" })] }), _jsxs("button", { type: "button", onClick: () => onGoogleChange?.(!googleCalendar), disabled: disabled, className: cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', googleCalendar
                                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'), children: [googleCalendar ? 'Connected' : 'Connect', _jsx(ExternalLink, { className: "h-3 w-3" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Outlook Calendar" })] }), _jsxs("button", { type: "button", onClick: () => onOutlookChange?.(!outlookCalendar), disabled: disabled, className: cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', outlookCalendar
                                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'), children: [outlookCalendar ? 'Connected' : 'Connect', _jsx(ExternalLink, { className: "h-3 w-3" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Apple Calendar" })] }), _jsxs("button", { type: "button", onClick: () => onAppleChange?.(!appleCalendar), disabled: disabled, className: cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', appleCalendar
                                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'), children: [appleCalendar ? 'Connected' : 'Connect', _jsx(ExternalLink, { className: "h-3 w-3" })] })] })] }) }));
};
const PRIVACY_LEVELS = [
    { value: 'public', label: 'Public Profile' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'ghost', label: 'Ghost Mode' }
];
export const PrivacyLevelFieldMolecule = ({ value = 'friends', onChange, error, disabled = false, className }) => {
    const getPrivacyDescription = (level) => {
        switch (level) {
            case 'public':
                return 'Your profile is visible to everyone in your university';
            case 'friends':
                return 'Your profile is only visible to your connections';
            case 'ghost':
                return 'Your profile is completely private and invisible to others';
            default:
                return 'Choose your privacy level';
        }
    };
    return (_jsx(FormField, { label: "Privacy Level", description: getPrivacyDescription(value), error: error, className: className, children: _jsxs("div", { className: "space-y-3", children: [_jsx(Select, { options: PRIVACY_LEVELS, value: value, onChange: (val) => onChange?.(val), disabled: disabled }), value === 'ghost' && (_jsxs("div", { className: "flex items-center gap-2 p-3 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-default)]", children: [_jsx(Eye, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Ghost mode allows you to browse and participate while remaining completely anonymous" })] }))] }) }));
};
const EXPERIENCE_LEVELS = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
];
export const BuilderVerificationFieldMolecule = ({ portfolioUrl = '', githubUrl = '', experience = '', onPortfolioChange, onGithubChange, onExperienceChange, portfolioError, githubError, experienceError, disabled = false, className }) => {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Portfolio URL", description: "Link to your portfolio or personal website", error: portfolioError, children: _jsx(Input, { type: "url", value: portfolioUrl, onChange: (e) => onPortfolioChange?.(e.target.value), placeholder: "https://yourportfolio.com", disabled: disabled, leftIcon: _jsx(Hammer, { className: "h-4 w-4" }) }) }), _jsx(FormField, { label: "GitHub Profile", description: "Your GitHub username or profile URL", error: githubError, children: _jsx(Input, { type: "text", value: githubUrl, onChange: (e) => onGithubChange?.(e.target.value), placeholder: "github.com/username", disabled: disabled, leftIcon: _jsx(Package, { className: "h-4 w-4" }) }) }), _jsx(FormField, { label: "Experience Level", description: "Your coding/building experience", error: experienceError, required: true, children: _jsx(Select, { options: EXPERIENCE_LEVELS, value: experience, onChange: (value) => onExperienceChange?.(value), placeholder: "Select your experience level", disabled: disabled }) })] }));
};
const SPACE_TYPES = [
    { value: 'academic', label: 'Academic (Class/Study Group)' },
    { value: 'club', label: 'Club/Organization' },
    { value: 'greek', label: 'Greek Life' },
    { value: 'residential', label: 'Residential (Dorm/Floor)' },
    { value: 'social', label: 'Social Group' },
    { value: 'professional', label: 'Professional/Career' },
    { value: 'hobby', label: 'Hobby/Interest' },
    { value: 'other', label: 'Other' }
];
export const SpaceActivationFieldMolecule = ({ spaceName = '', spaceType = '', description = '', expectedMembers = '', onSpaceNameChange, onSpaceTypeChange, onDescriptionChange, onExpectedMembersChange, spaceNameError, spaceTypeError, descriptionError, disabled = false, className }) => {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Space Name", description: "What would you like to call your space?", error: spaceNameError, required: true, children: _jsx(Input, { type: "text", value: spaceName, onChange: (e) => onSpaceNameChange?.(e.target.value), placeholder: "e.g., CS Study Group, Delta Chi, Floor 3 East", disabled: disabled, leftIcon: _jsx(Zap, { className: "h-4 w-4" }) }) }), _jsx(FormField, { label: "Space Type", description: "What kind of space is this?", error: spaceTypeError, required: true, children: _jsx(Select, { options: SPACE_TYPES, value: spaceType, onChange: (value) => onSpaceTypeChange?.(value), placeholder: "Select space type", disabled: disabled }) }), _jsx(FormField, { label: "Description", description: "Briefly describe your space and its purpose", error: descriptionError, required: true, children: _jsx("textarea", { value: description, onChange: (e) => onDescriptionChange?.(e.target.value), placeholder: "Tell us about your space, its goals, and what members can expect...", disabled: disabled, className: cn('w-full min-h-[80px] p-4 rounded-xl', 'bg-transparent border border-[var(--hive-border-default)]', 'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20', 'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]', 'resize-none transition-all duration-200'), maxLength: 500 }) }), _jsx(FormField, { label: "Expected Members", description: "How many people do you expect to join?", required: true, children: _jsx(Input, { type: "number", value: expectedMembers, onChange: (e) => onExpectedMembersChange?.(e.target.value), placeholder: "e.g., 25", disabled: disabled, min: "1", max: "1000" }) })] }));
};
const TOOL_CATEGORIES = [
    { value: 'productivity', label: 'Productivity' },
    { value: 'academic', label: 'Academic/Study' },
    { value: 'social', label: 'Social/Communication' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'utility', label: 'Utility' },
    { value: 'health', label: 'Health/Wellness' },
    { value: 'finance', label: 'Finance' },
    { value: 'creative', label: 'Creative/Design' },
    { value: 'developer', label: 'Developer Tools' },
    { value: 'other', label: 'Other' }
];
export const ToolPublishingFieldMolecule = ({ toolName = '', toolDescription = '', toolCategory = '', repositoryUrl = '', onToolNameChange, onToolDescriptionChange, onToolCategoryChange, onRepositoryUrlChange, toolNameError, toolDescriptionError, toolCategoryError, repositoryError, disabled = false, className }) => {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(FormField, { label: "Tool Name", description: "What's your tool called?", error: toolNameError, required: true, children: _jsx(Input, { type: "text", value: toolName, onChange: (e) => onToolNameChange?.(e.target.value), placeholder: "e.g., Study Scheduler, Grade Calculator", disabled: disabled, leftIcon: _jsx(Package, { className: "h-4 w-4" }) }) }), _jsx(FormField, { label: "Category", description: "What category does your tool fit into?", error: toolCategoryError, required: true, children: _jsx(Select, { options: TOOL_CATEGORIES, value: toolCategory, onChange: (value) => onToolCategoryChange?.(value), placeholder: "Select a category", disabled: disabled }) }), _jsx(FormField, { label: "Description", description: "Describe what your tool does and how it helps students", error: toolDescriptionError, required: true, children: _jsx("textarea", { value: toolDescription, onChange: (e) => onToolDescriptionChange?.(e.target.value), placeholder: "Describe your tool's features, benefits, and how students can use it...", disabled: disabled, className: cn('w-full min-h-[100px] p-4 rounded-xl', 'bg-transparent border border-[var(--hive-border-default)]', 'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20', 'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]', 'resize-none transition-all duration-200'), maxLength: 1000 }) }), _jsx(FormField, { label: "Repository URL (Optional)", description: "Link to your GitHub repository or source code", error: repositoryError, children: _jsx(Input, { type: "url", value: repositoryUrl, onChange: (e) => onRepositoryUrlChange?.(e.target.value), placeholder: "https://github.com/username/tool-name", disabled: disabled, leftIcon: _jsx(Package, { className: "h-4 w-4" }) }) })] }));
};
//# sourceMappingURL=form-comprehensive.js.map