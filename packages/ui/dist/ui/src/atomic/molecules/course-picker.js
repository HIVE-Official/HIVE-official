'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Badge } from '../atoms/badge.js';
import { SearchInput } from '../atoms/input-enhanced.js';
import { Button } from '../atoms/button-enhanced.js';
import { Alert, AlertDescription } from '../atoms/alert.js';
const CoursePicker = React.forwardRef(({ courses = [], selectedCourses = [], onCourseSelect, onCourseRemove, maxCourses = 6, searchable = true, showPrerequisites = true, showScheduleConflicts = true, semester, departments = [], onDepartmentFilter, loading = false, error, className, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedDepartment, setSelectedDepartment] = React.useState(null);
    // Filter courses based on search and department
    const filteredCourses = React.useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = !searchTerm ||
                course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDepartment = !selectedDepartment ||
                course.department === selectedDepartment;
            return matchesSearch && matchesDepartment;
        });
    }, [courses, searchTerm, selectedDepartment]);
    const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
        onDepartmentFilter?.(department);
    };
    const handleCourseToggle = (course) => {
        const isSelected = selectedCourses.some(c => c.id === course.id);
        if (isSelected) {
            onCourseRemove?.(course);
        }
        else if (selectedCourses.length < maxCourses) {
            onCourseSelect?.(course);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'success';
            case 'waitlist': return 'warning';
            case 'closed': return 'error';
            default: return 'default';
        }
    };
    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
    const hasMaxCourses = selectedCourses.length >= maxCourses;
    return (_jsxs("div", { ref: ref, className: cn('space-y-6 bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-xl p-6', className), ...props, children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: ["Course Selection ", semester && `- ${semester}`] }), _jsxs(Badge, { variant: "secondary", className: "text-[var(--hive-text-secondary)]", children: [selectedCourses.length, "/", maxCourses, " courses (", totalCredits, " credits)"] })] }), error && (_jsx(Alert, { variant: "error", children: _jsx(AlertDescription, { children: error }) }))] }), _jsxs("div", { className: "space-y-4", children: [searchable && (_jsx(SearchInput, { placeholder: "Search courses by code, title, or instructor...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onClear: () => setSearchTerm(''), className: "w-full" })), departments.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: selectedDepartment === null ? 'primary' : 'ghost', size: "sm", onClick: () => handleDepartmentChange(null), children: "All Departments" }), departments.map(dept => (_jsx(Button, { variant: selectedDepartment === dept ? 'primary' : 'ghost', size: "sm", onClick: () => handleDepartmentChange(dept), children: dept }, dept)))] }))] }), selectedCourses.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Selected Courses" }), _jsx("div", { className: "grid gap-3", children: selectedCourses.map(course => (_jsx(SelectedCourseCard, { course: course, onRemove: () => onCourseRemove?.(course) }, course.id))) })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: ["Available Courses (", filteredCourses.length, ")"] }), loading ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3].map(i => (_jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "bg-[var(--hive-background-tertiary)] h-24 rounded-lg" }) }, i))) })) : filteredCourses.length === 0 ? (_jsx("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: searchTerm || selectedDepartment ? 'No courses match your search criteria' : 'No courses available' })) : (_jsx("div", { className: "grid gap-3 max-h-96 overflow-y-auto", children: filteredCourses.map(course => {
                            const isSelected = selectedCourses.some(c => c.id === course.id);
                            const canSelect = !isSelected && !hasMaxCourses;
                            return (_jsx(CourseCard, { course: course, isSelected: isSelected, canSelect: canSelect, onToggle: () => handleCourseToggle(course), showPrerequisites: showPrerequisites }, course.id));
                        }) }))] }), selectedCourses.length > 0 && (_jsxs("div", { className: "pt-4 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: ["Total: ", selectedCourses.length, " courses, ", totalCredits, " credits"] }), _jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: [maxCourses - selectedCourses.length, " spots remaining"] })] }), totalCredits > 18 && (_jsx(Alert, { variant: "warning", className: "mt-3", children: _jsxs(AlertDescription, { children: ["You've selected ", totalCredits, " credits. Most students take 12-18 credits per semester."] }) }))] }))] }));
});
CoursePicker.displayName = 'CoursePicker';
const CourseCard = ({ course, isSelected, canSelect, onToggle, showPrerequisites }) => {
    const statusColors = {
        open: 'text-[var(--hive-status-success)]',
        waitlist: 'text-[var(--hive-status-warning)]',
        closed: 'text-[var(--hive-status-error)]'
    };
    return (_jsx("div", { className: cn('border rounded-lg p-4 transition-all duration-200 cursor-pointer', 'hover:bg-[var(--hive-interactive-hover)]', isSelected
            ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-overlay-orange-subtle)]'
            : 'border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]', !canSelect && !isSelected && 'opacity-50 cursor-not-allowed'), onClick: canSelect || isSelected ? onToggle : undefined, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h5", { className: "font-semibold text-[var(--hive-text-primary)]", children: course.code }), _jsxs(Badge, { size: "sm", className: "text-xs", children: [course.credits, " cr"] }), _jsx("span", { className: cn('text-xs font-medium', statusColors[course.status]), children: course.status.toUpperCase() })] }), _jsx("h6", { className: "text-sm text-[var(--hive-text-primary)] font-medium", children: course.title }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] space-y-1", children: [course.instructor && (_jsxs("div", { children: ["Instructor: ", course.instructor] })), course.schedule && (_jsxs("div", { children: ["Schedule: ", course.schedule] })), course.location && (_jsxs("div", { children: ["Location: ", course.location] })), _jsxs("div", { children: ["Seats: ", course.seats.available, "/", course.seats.total] })] }), showPrerequisites && course.prerequisites && course.prerequisites.length > 0 && (_jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["Prerequisites: ", course.prerequisites.join(', ')] }))] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Button, { variant: isSelected ? 'destructive' : 'primary', size: "sm", disabled: !canSelect && !isSelected, children: isSelected ? 'Remove' : 'Add' }) })] }) }));
};
const SelectedCourseCard = ({ course, onRemove }) => (_jsxs("div", { className: "flex items-center justify-between bg-[var(--hive-overlay-orange-subtle)] border border-[var(--hive-brand-primary)] rounded-lg p-3", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)]", children: course.code }), _jsxs(Badge, { size: "sm", variant: "secondary", children: [course.credits, " cr"] })] }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: course.title }), course.schedule && (_jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: course.schedule }))] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onRemove, "aria-label": `Remove ${course.code}`, children: "\u00D7" })] }));
export { CoursePicker };
//# sourceMappingURL=course-picker.js.map