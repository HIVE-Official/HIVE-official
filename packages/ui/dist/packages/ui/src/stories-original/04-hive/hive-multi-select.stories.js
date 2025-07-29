import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveMultiSelect } from '../../components';
import { Users, BookOpen, Code, Palette, Music, Camera, Gamepad2, Coffee, GraduationCap, Building, Heart, Star, Award, Zap, Globe, Briefcase, Target, Lightbulb, Rocket, Shield } from 'lucide-react';
const meta = {
    title: '04-HIVE/Multi-Select',
    component: HiveMultiSelect,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Advanced multi-select component with search, tagging, and creation capabilities. Perfect for campus space management, skill selection, and tool building.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'premium', 'elevated', 'minimal'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
        },
        maxTags: {
            control: { type: 'number', min: 1, max: 10 },
        },
        tagLimit: {
            control: { type: 'number', min: 1, max: 20 },
        },
        creatable: {
            control: 'boolean',
        },
        clearable: {
            control: 'boolean',
        },
        showCount: {
            control: 'boolean',
        },
    },
};
export default meta;
// Sample data for different contexts
const campusSpaces = [
    { value: 'cs-lounge', label: 'CS Lounge', description: 'Computer Science student lounge', icon: _jsx(Code, { size: 16 }), variant: 'elevated', group: 'Academic' },
    { value: 'engineering-lab', label: 'Engineering Lab', description: 'Hands-on engineering workspace', icon: _jsx(Zap, { size: 16 }), variant: 'elevated', group: 'Academic' },
    { value: 'library-study', label: 'Library Study Room', description: 'Quiet study space', icon: _jsx(BookOpen, { size: 16 }), variant: 'elevated', group: 'Academic' },
    { value: 'student-union', label: 'Student Union', description: 'Main campus gathering space', icon: _jsx(Users, { size: 16 }), variant: 'default', group: 'Social' },
    { value: 'coffee-shop', label: 'Campus Coffee Shop', description: 'Casual meeting spot', icon: _jsx(Coffee, { size: 16 }), variant: 'default', group: 'Social' },
    { value: 'gym', label: 'Recreation Center', description: 'Campus fitness facility', icon: _jsx(Target, { size: 16 }), variant: 'default', group: 'Recreation' },
    { value: 'art-studio', label: 'Art Studio', description: 'Creative workspace', icon: _jsx(Palette, { size: 16 }), variant: 'default', group: 'Creative' },
    { value: 'music-room', label: 'Music Practice Room', description: 'Soundproof practice space', icon: _jsx(Music, { size: 16 }), variant: 'default', group: 'Creative' },
];
const studentSkills = [
    { value: 'javascript', label: 'JavaScript', description: 'Frontend & backend programming', icon: _jsx(Code, { size: 16 }), variant: 'default', group: 'Programming' },
    { value: 'python', label: 'Python', description: 'Data science & automation', icon: _jsx(Code, { size: 16 }), variant: 'default', group: 'Programming' },
    { value: 'react', label: 'React', description: 'Frontend framework', icon: _jsx(Code, { size: 16 }), variant: 'default', group: 'Programming' },
    { value: 'design', label: 'UI/UX Design', description: 'User interface design', icon: _jsx(Palette, { size: 16 }), variant: 'default', group: 'Design' },
    { value: 'photography', label: 'Photography', description: 'Visual storytelling', icon: _jsx(Camera, { size: 16 }), variant: 'default', group: 'Creative' },
    { value: 'leadership', label: 'Leadership', description: 'Team management & vision', icon: _jsx(Users, { size: 16 }), variant: 'premium', group: 'Soft Skills' },
    { value: 'marketing', label: 'Digital Marketing', description: 'Brand & growth strategy', icon: _jsx(Globe, { size: 16 }), variant: 'default', group: 'Business' },
    { value: 'project-management', label: 'Project Management', description: 'Planning & execution', icon: _jsx(Briefcase, { size: 16 }), variant: 'default', group: 'Business' },
];
const academicMajors = [
    { value: 'computer-science', label: 'Computer Science', description: 'Software development & algorithms', icon: _jsx(Code, { size: 16 }), variant: 'elevated', group: 'STEM' },
    { value: 'business', label: 'Business Administration', description: 'Management & entrepreneurship', icon: _jsx(Briefcase, { size: 16 }), variant: 'elevated', group: 'Business' },
    { value: 'psychology', label: 'Psychology', description: 'Human behavior & mental health', icon: _jsx(Heart, { size: 16 }), variant: 'elevated', group: 'Social Sciences' },
    { value: 'engineering', label: 'Engineering', description: 'Problem solving & innovation', icon: _jsx(Zap, { size: 16 }), variant: 'elevated', group: 'STEM' },
    { value: 'art', label: 'Fine Arts', description: 'Creative expression & design', icon: _jsx(Palette, { size: 16 }), variant: 'elevated', group: 'Arts' },
    { value: 'education', label: 'Education', description: 'Teaching & learning', icon: _jsx(GraduationCap, { size: 16 }), variant: 'elevated', group: 'Education' },
];
const projectTags = [
    { value: 'web-dev', label: 'Web Development', icon: _jsx(Globe, { size: 16 }), variant: 'default' },
    { value: 'mobile-app', label: 'Mobile App', icon: _jsx(Gamepad2, { size: 16 }), variant: 'default' },
    { value: 'ai-ml', label: 'AI/ML', icon: _jsx(Lightbulb, { size: 16 }), variant: 'premium' },
    { value: 'blockchain', label: 'Blockchain', icon: _jsx(Shield, { size: 16 }), variant: 'premium' },
    { value: 'startup', label: 'Startup Idea', icon: _jsx(Rocket, { size: 16 }), variant: 'premium' },
    { value: 'research', label: 'Research Project', icon: _jsx(BookOpen, { size: 16 }), variant: 'campus' },
];
// Basic Multi-Select
export const Default = {
    render: () => {
        const [value, setValue] = useState([]);
        return (_jsxs("div", { className: "w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Select Your Skills" }), _jsx(HiveMultiSelect, { options: studentSkills, value: value, onValueChange: setValue, placeholder: "Choose your skills...", maxTags: 3, tagLimit: 5 }), _jsxs("div", { className: "mt-4 text-sm text-gray-400", children: ["Selected: ", value.join(', ') || 'None'] })] }));
    },
};
// Campus Spaces Selection
export const CampusSpaces = {
    render: () => {
        const [value, setValue] = useState(['cs-lounge', 'library-study']);
        return (_jsxs("div", { className: "w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Your Active Spaces" }), _jsx(HiveMultiSelect, { variant: "elevated", options: campusSpaces, value: value, onValueChange: setValue, placeholder: "Select campus spaces...", searchPlaceholder: "Search spaces...", maxTags: 4, tagLimit: 8, groupBy: "group", showCount: true }), _jsx("div", { className: "mt-4 text-xs text-gray-500", children: "Spaces help you connect with students in similar areas" })] }));
    },
};
// Academic Major Selection
export const AcademicMajors = {
    render: () => {
        const [value, setValue] = useState(['computer-science']);
        return (_jsxs("div", { className: "w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Academic Interests" }), _jsx(HiveMultiSelect, { variant: "premium", size: "lg", options: academicMajors, value: value, onValueChange: setValue, placeholder: "Select your majors...", maxTags: 2, tagLimit: 3, groupBy: "group", creatable: false, showCount: true }), _jsx("div", { className: "mt-4 text-xs text-gray-500", children: "Primary and secondary areas of study" })] }));
    },
};
// Project Tags with Creation
export const ProjectTags = {
    render: () => {
        const [value, setValue] = useState(['web-dev', 'ai-ml']);
        const [options, setOptions] = useState(projectTags);
        const handleCreateOption = (query) => {
            const newOption = {
                value: query.toLowerCase().replace(/\s+/g, '-'),
                label: query,
                icon: _jsx(Star, { size: 16 }),
                variant: 'default',
                metadata: { created: true, timestamp: Date.now() }
            };
            setOptions(prev => [...prev, newOption]);
            return newOption;
        };
        return (_jsxs("div", { className: "w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Project Categories" }), _jsx(HiveMultiSelect, { variant: "default", options: options, value: value, onValueChange: setValue, placeholder: "Tag your project...", searchPlaceholder: "Search or create new tag...", maxTags: 5, tagLimit: 10, creatable: true, onCreateOption: handleCreateOption, createOptionMessage: "Add as new tag" }), _jsx("div", { className: "mt-4 text-xs text-gray-500", children: "Create custom tags to organize your projects" })] }));
    },
};
// Large Display with All Features
export const ComprehensiveExample = {
    render: () => {
        const [spaceValue, setSpaceValue] = useState(['cs-lounge', 'student-union']);
        const [skillValue, setSkillValue] = useState(['javascript', 'react', 'design']);
        const [majorValue, setMajorValue] = useState(['computer-science']);
        return (_jsxs("div", { className: "max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Student Builder Profile" }), _jsx("p", { className: "text-gray-400", children: "Configure your campus presence and skills" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(Building, { className: "inline w-4 h-4 mr-2" }), "Active Spaces"] }), _jsx(HiveMultiSelect, { variant: "elevated", options: campusSpaces, value: spaceValue, onValueChange: setSpaceValue, placeholder: "Select your spaces...", maxTags: 3, tagLimit: 6, groupBy: "group", showCount: true })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(Award, { className: "inline w-4 h-4 mr-2" }), "Your Skills"] }), _jsx(HiveMultiSelect, { variant: "default", options: studentSkills, value: skillValue, onValueChange: setSkillValue, placeholder: "Add your skills...", maxTags: 4, tagLimit: 8, groupBy: "group", creatable: true, showCount: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(GraduationCap, { className: "inline w-4 h-4 mr-2" }), "Academic Focus"] }), _jsx(HiveMultiSelect, { variant: "premium", size: "lg", options: academicMajors, value: majorValue, onValueChange: setMajorValue, placeholder: "Select your academic interests...", maxTags: 2, tagLimit: 3, groupBy: "group", creatable: false, showCount: true })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-primary)]/20 rounded-lg p-4 border border-white/10", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Profile Summary" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-gray-400 mb-1", children: ["Spaces (", spaceValue.length, ")"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]", children: spaceValue.join(', ') || 'None selected' })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-gray-400 mb-1", children: ["Skills (", skillValue.length, ")"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]", children: skillValue.join(', ') || 'None selected' })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-gray-400 mb-1", children: ["Majors (", majorValue.length, ")"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]", children: majorValue.join(', ') || 'None selected' })] })] })] })] }));
    },
};
// Size Variations
export const SizeVariations = {
    render: () => {
        const [values, setValues] = useState({
            sm: ['javascript'],
            default: ['javascript', 'python'],
            lg: ['javascript', 'python', 'react'],
            xl: ['javascript', 'python', 'react', 'design']
        });
        return (_jsxs("div", { className: "w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Size Variations" }), ['sm', 'default', 'lg', 'xl'].map(size => (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-300 mb-2 capitalize", children: [size, " Size"] }), _jsx(HiveMultiSelect, { size: size, options: studentSkills.slice(0, 6), value: values[size] || [], onValueChange: (value) => setValues(prev => ({ ...prev, [size]: value })), placeholder: `Select skills (${size})...`, maxTags: 3, tagLimit: 5 })] }, size)))] }));
    },
};
// Variant Showcase
export const VariantShowcase = {
    render: () => {
        const [values, setValues] = useState({
            default: ['javascript'],
            premium: ['ai-ml'],
            elevated: ['cs-lounge'],
            minimal: ['student-union']
        });
        return (_jsxs("div", { className: "w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Variant Showcase" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Default" }), _jsx(HiveMultiSelect, { variant: "default", options: studentSkills.slice(0, 4), value: values.default || [], onValueChange: (value) => setValues(prev => ({ ...prev, default: value })), placeholder: "Standard selection...", maxTags: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Premium" }), _jsx(HiveMultiSelect, { variant: "premium", options: projectTags.slice(0, 4), value: values.premium || [], onValueChange: (value) => setValues(prev => ({ ...prev, premium: value })), placeholder: "Premium features...", maxTags: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Elevated" }), _jsx(HiveMultiSelect, { variant: "elevated", options: campusSpaces.slice(0, 4), value: values.elevated || [], onValueChange: (value) => setValues(prev => ({ ...prev, elevated: value })), placeholder: "Elevated styling...", maxTags: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Minimal" }), _jsx(HiveMultiSelect, { variant: "minimal", options: campusSpaces.slice(0, 4), value: values.minimal || [], onValueChange: (value) => setValues(prev => ({ ...prev, minimal: value })), placeholder: "Minimal styling...", maxTags: 3 })] })] }));
    },
};
// States and Edge Cases
export const StatesAndEdgeCases = {
    render: () => {
        const [normalValue, setNormalValue] = useState(['javascript']);
        const [errorValue, setErrorValue] = useState([]);
        const [loadingValue, setLoadingValue] = useState([]);
        return (_jsxs("div", { className: "w-full max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "States & Edge Cases" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Normal State" }), _jsx(HiveMultiSelect, { options: studentSkills, value: normalValue, onValueChange: setNormalValue, placeholder: "Select skills...", maxTags: 3, clearable: true, showCount: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Error State" }), _jsx(HiveMultiSelect, { options: studentSkills, value: errorValue, onValueChange: setErrorValue, placeholder: "Required field...", error: true, maxTags: 3 }), _jsx("div", { className: "text-red-400 text-xs mt-1", children: "Please select at least one skill" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Loading State" }), _jsx(HiveMultiSelect, { options: [], value: loadingValue, onValueChange: setLoadingValue, placeholder: "Loading options...", loading: true, maxTags: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Disabled State" }), _jsx(HiveMultiSelect, { options: studentSkills, value: ['javascript', 'react'], placeholder: "Cannot edit...", disabled: true, maxTags: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Tag Limit Reached" }), _jsx(HiveMultiSelect, { options: studentSkills, value: ['javascript', 'python', 'react'], placeholder: "Max tags reached...", maxTags: 2, tagLimit: 3, showCount: true }), _jsx("div", { className: "text-yellow-400 text-xs mt-1", children: "Maximum 3 tags allowed" })] })] }));
    },
};
//# sourceMappingURL=hive-multi-select.stories.js.map