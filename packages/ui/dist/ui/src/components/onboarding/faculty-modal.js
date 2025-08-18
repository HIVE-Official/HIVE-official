"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { X, Users, Loader2, Building, Shield, Star, BookOpen, Award } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
export const FacultyModal = ({ isOpen, onClose, onContinue, schoolName, userEmail, }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [selectedSpaceId, setSelectedSpaceId] = useState('');
    const [availableSpaces, setAvailableSpaces] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);
    // Load available spaces when modal opens
    useEffect(() => {
        if (isOpen) {
            loadAvailableSpaces();
        }
    }, [isOpen]);
    const loadAvailableSpaces = async () => {
        setIsLoadingSpaces(true);
        try {
            // Try to fetch spaces from API
            const response = await fetch('/api/spaces/available-for-claim');
            if (response.ok) {
                const spaces = await response.json();
                // Show all available spaces for faculty
                setAvailableSpaces(spaces.spaces || spaces);
            }
        }
        catch (error) {
            console.error('Failed to load spaces:', error);
            // Fallback to mock data
            setAvailableSpaces([
                { id: 'cs-dept', name: 'Computer Science Department', spaceType: 'university_organizations' },
                { id: 'bio-dept', name: 'Biology Department', spaceType: 'university_organizations' },
                { id: 'eng-dept', name: 'Engineering Department', spaceType: 'university_organizations' },
                { id: 'math-dept', name: 'Mathematics Department', spaceType: 'university_organizations' },
                { id: 'greek-council', name: 'Greek Life Council', spaceType: 'fraternity_and_sorority' },
                { id: 'student-gov', name: 'Student Government', spaceType: 'student_organizations' },
            ]);
        }
        finally {
            setIsLoadingSpaces(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim() || !role.trim() || !selectedSpaceId.trim())
            return;
        setIsSubmitting(true);
        // Brief delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        onContinue({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            role: role.trim(),
            selectedSpaceId: selectedSpaceId.trim()
        });
        setIsSubmitting(false);
    };
    const handleClose = () => {
        setFirstName('');
        setLastName('');
        setRole('');
        setSelectedSpaceId('');
        setAvailableSpaces([]);
        setIsSubmitting(false);
        onClose();
    };
    const commonRoles = [
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Lecturer',
        'Instructor',
        'Research Faculty',
        'Staff',
        'Administrator',
    ];
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: handleClose, children: _jsxs(motion.div, { className: "bg-surface border border-border rounded-xl p-8 w-full max-w-lg relative overflow-hidden", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent/10 rounded-full blur-2xl -translate-y-8 translate-x-8" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-accent/10 rounded-full blur-2xl translate-y-8 -translate-x-8" }), _jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 p-2 text-muted hover:text-foreground transition-colors", children: _jsx(X, { className: "w-4 h-4" }) }), _jsxs(motion.div, { className: "space-y-8 relative z-10", variants: hiveVariants.container, children: [_jsxs(motion.div, { className: "text-center space-y-6", variants: hiveVariants.item, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(Shield, { className: "w-10 h-10 text-accent" }) }), _jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center", children: _jsx(Award, { className: "w-3 h-3 text-accent" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h2", { className: "text-2xl font-display font-semibold text-foreground", children: ["Welcome, ", schoolName, " faculty!"] }), _jsx("p", { className: "text-muted font-body text-lg", children: "Choose a space to manage and tell us your role" }), _jsxs("div", { className: "flex flex-wrap gap-2 justify-center mt-4", children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(BookOpen, { className: "w-3 h-3" }), "Space Management"] }), _jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(Users, { className: "w-3 h-3" }), "Student Mentoring"] }), _jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(Star, { className: "w-3 h-3" }), "Community Building"] })] })] })] }), _jsxs(motion.form, { onSubmit: handleSubmit, className: "space-y-6", variants: hiveVariants.item, children: [_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "firstName", className: "text-sm font-medium", children: "First Name" }), _jsx(Input, { id: "firstName", type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "First name", required: true, variant: "accent", className: "h-12" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "lastName", className: "text-sm font-medium", children: "Last Name" }), _jsx(Input, { id: "lastName", type: "text", value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Last name", required: true, variant: "accent", className: "h-12" })] })] }) }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "space", className: "text-sm font-medium", children: "Select Space to Manage *" }), isLoadingSpaces ? (_jsxs("div", { className: "flex items-center gap-3 p-4 border border-border rounded-lg bg-surface-01", children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin text-accent" }), _jsx("span", { className: "text-sm text-muted", children: "Loading available spaces..." })] })) : (_jsxs("select", { id: "space", value: selectedSpaceId, onChange: (e) => setSelectedSpaceId(e.target.value), required: true, className: "w-full h-12 px-4 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all", children: [_jsx("option", { value: "", children: "Choose a space to manage" }), availableSpaces.map((space) => (_jsxs("option", { value: space.id, children: [space.name, " (", space.spaceType, ")"] }, space.id)))] })), _jsx("div", { className: "bg-accent/5 border border-accent/20 rounded-lg p-3", children: _jsx("p", { className: "text-xs text-accent font-medium", children: "\uD83D\uDCA1 Faculty must manage a space to join HIVE and guide student communities" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "role", className: "text-sm font-medium", children: "Your Role" }), _jsx(Input, { id: "role", type: "text", value: role, onChange: (e) => setRole(e.target.value), placeholder: "e.g., Associate Professor", required: true, variant: "accent", className: "h-12", list: "roles" }), _jsx("datalist", { id: "roles", children: commonRoles.map((roleOption) => (_jsx("option", { value: roleOption }, roleOption))) })] }), _jsxs("div", { className: "space-y-4 pt-2", children: [_jsx(Button, { type: "submit", variant: "ritual", size: "lg", className: "w-full h-12", disabled: !firstName.trim() || !lastName.trim() || !role.trim() || !selectedSpaceId.trim() || isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin mr-2" }), "Setting up your faculty account..."] })) : (_jsxs(_Fragment, { children: [_jsx(Building, { className: "w-5 h-5 mr-2" }), "Continue Faculty Setup"] })) }), _jsx(Button, { type: "button", variant: "outline", size: "lg", onClick: handleClose, className: "w-full h-12", disabled: isSubmitting, children: "Back" })] })] }), _jsx(motion.div, { className: "text-center pt-4 border-t border-border", variants: hiveVariants.item, children: _jsxs("div", { className: "bg-surface-01 border border-border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [_jsx(Shield, { className: "w-4 h-4 text-accent" }), _jsx("span", { className: "text-sm font-medium text-foreground", children: "Verification Process" })] }), _jsxs("p", { className: "text-xs text-muted font-body", children: ["Your faculty status will be verified with ", _jsx("span", { className: "font-medium text-foreground", children: userEmail })] })] }) })] })] }) })) }));
};
//# sourceMappingURL=faculty-modal.js.map