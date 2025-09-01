"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, GraduationCap, CheckCircle, Plus } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { Card, CardHeader, CardContent } from '../card.js';
import { cn } from '../../lib/utils.js';
const DEMO_SCHOOLS = [
    {
        id: 'stanford',
        name: 'Stanford University',
        location: 'Stanford, CA',
        domain: 'stanford.edu',
        studentCount: '17,249',
        isActive: true
    },
    {
        id: 'mit',
        name: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        domain: 'mit.edu',
        studentCount: '11,858',
        isActive: true
    },
    {
        id: 'berkeley',
        name: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        domain: 'berkeley.edu',
        studentCount: '45,057',
        isActive: true
    },
    {
        id: 'uw',
        name: 'University of Washington',
        location: 'Seattle, WA',
        domain: 'washington.edu',
        studentCount: '47,400',
        isActive: true
    },
    {
        id: 'harvard',
        name: 'Harvard University',
        location: 'Cambridge, MA',
        domain: 'harvard.edu',
        studentCount: '23,731',
        isActive: true
    },
    {
        id: 'caltech',
        name: 'California Institute of Technology',
        location: 'Pasadena, CA',
        domain: 'caltech.edu',
        studentCount: '2,397',
        isActive: true
    },
    {
        id: 'cmu',
        name: 'Carnegie Mellon University',
        location: 'Pittsburgh, PA',
        domain: 'cmu.edu',
        studentCount: '15,818',
        isActive: true
    },
    {
        id: 'georgia-tech',
        name: 'Georgia Institute of Technology',
        location: 'Atlanta, GA',
        domain: 'gatech.edu',
        studentCount: '45,303',
        isActive: true
    }
];
export const SchoolSearch = ({ onSchoolSelect, onRequestSchool, className, initialSearch = '' }) => {
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestSchoolName, setRequestSchoolName] = useState('');
    // Filter schools based on search query
    const filteredSchools = useMemo(() => {
        if (!searchQuery.trim())
            return DEMO_SCHOOLS;
        const query = searchQuery.toLowerCase();
        return DEMO_SCHOOLS.filter(school => school.name.toLowerCase().includes(query) ||
            school.location.toLowerCase().includes(query) ||
            school.domain.toLowerCase().includes(query));
    }, [searchQuery]);
    const handleSchoolClick = (school) => {
        setSelectedSchool(school);
    };
    const handleContinue = () => {
        if (selectedSchool) {
            onSchoolSelect(selectedSchool);
        }
    };
    const handleRequestSchool = () => {
        if (requestSchoolName.trim() && onRequestSchool) {
            onRequestSchool(requestSchoolName.trim());
            setRequestSchoolName('');
            setShowRequestForm(false);
        }
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-2xl mx-auto", className), children: _jsxs(Card, { variant: "elevated", padding: "lg", children: [_jsxs(CardHeader, { children: [_jsx("h2", { className: "text-2xl font-semibold text-center", children: "Select your school" }), _jsx("p", { className: "text-center text-muted-foreground", children: "Choose your university to join the HIVE campus community" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" }), _jsx(Input, { type: "text", placeholder: "Search universities...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10", variant: "search" })] }), _jsx("div", { className: "space-y-3 max-h-64 overflow-y-auto", children: _jsx(AnimatePresence, { children: filteredSchools.length > 0 ? (filteredSchools.map((school, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { delay: index * 0.05 }, children: _jsx(Card, { variant: selectedSchool?.id === school.id ? "accent" : "interactive", padding: "sm", className: "cursor-pointer transition-all duration-200", onClick: () => handleSchoolClick(school), children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(GraduationCap, { className: "w-4 h-4 text-accent" }), _jsx("h3", { className: "font-medium text-[var(--hive-text-inverse)]", children: school.name }), selectedSchool?.id === school.id && (_jsx(CheckCircle, { className: "w-4 h-4 text-accent" }))] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-muted", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: school.location })] }), school.studentCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [school.studentCount, " students"] })] }))] }), _jsxs("div", { className: "text-xs text-muted mt-1 font-mono", children: ["@", school.domain] })] }) }) }) }, school.id)))) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-8", children: [_jsxs("div", { className: "text-muted mb-4", children: ["No schools found matching \"", searchQuery, "\""] }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => setShowRequestForm(true), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Request your school"] })] })) }) }), _jsx(AnimatePresence, { children: showRequestForm && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "border border-border rounded-lg p-4 bg-surface/50", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] mb-3", children: "Request a new school" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Input, { type: "text", placeholder: "Enter your university name", value: requestSchoolName, onChange: (e) => setRequestSchoolName(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "primary", size: "sm", onClick: handleRequestSchool, disabled: !requestSchoolName.trim(), children: "Submit Request" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowRequestForm(false), children: "Cancel" })] })] })] })) }), _jsxs("div", { className: "flex justify-between items-center pt-4", children: [_jsxs("div", { className: "text-xs text-muted", children: [filteredSchools.length, " school", filteredSchools.length !== 1 ? 's' : '', " available"] }), _jsx(Button, { variant: "primary", onClick: handleContinue, disabled: !selectedSchool, className: "min-w-[120px]", children: "Continue" })] }), _jsxs("div", { className: "text-xs text-muted text-center border-t border-border pt-4", children: ["Don't see your school? ", _jsx("button", { className: "text-accent hover:text-accent/80 underline", onClick: () => setShowRequestForm(true), children: "Request to add it" })] })] })] }) }));
};
//# sourceMappingURL=school-search.js.map