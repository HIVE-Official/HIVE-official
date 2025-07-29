import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSelect, HiveSelectTags } from '../../components/hive-select';
import { Code, BookOpen, GraduationCap, Building, Users, Coffee, Clock, Zap, Camera, Music, Palette, Trophy, Star, Crown, Shield, Heart, Globe, Briefcase, Target, Lightbulb, Wrench } from 'lucide-react';
import { useState } from 'react';
const meta = {
    title: '04-HIVE/Select',
    component: HiveSelect,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Select system with magnetic dropdowns, search functionality, and liquid metal motion. Advanced select component optimized for campus-specific selections and tool building workflows.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'premium', 'minimal'],
            description: 'Visual variant of the select component'
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
            description: 'Size variant of the select component'
        },
        searchable: {
            control: 'boolean',
            description: 'Enable search/filter functionality'
        },
        multiple: {
            control: 'boolean',
            description: 'Allow multiple option selection'
        },
        clearable: {
            control: 'boolean',
            description: 'Show clear button when value is selected'
        },
        creatable: {
            control: 'boolean',
            description: 'Allow creating new options from search'
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the select component'
        },
        error: {
            control: 'boolean',
            description: 'Show error state styling'
        },
        loading: {
            control: 'boolean',
            description: 'Show loading state'
        }
    }
};
export default meta;
// Sample data sets
const campusSpaces = [
    {
        value: 'cs-lounge',
        label: 'CS Student Lounge',
        description: 'Computer Science student collaborative space',
        icon: _jsx(Code, { size: 16 }),
        group: 'Academic Buildings'
    },
    {
        value: 'engineering-lab',
        label: 'Engineering Lab',
        description: 'Hands-on engineering workshop space',
        icon: _jsx(Wrench, { size: 16 }),
        group: 'Academic Buildings'
    },
    {
        value: 'library-study',
        label: 'Library Study Rooms',
        description: 'Quiet individual and group study spaces',
        icon: _jsx(BookOpen, { size: 16 }),
        group: 'Academic Buildings'
    },
    {
        value: 'student-union',
        label: 'Student Union Building',
        description: 'Main campus social and dining hub',
        icon: _jsx(Users, { size: 16 }),
        group: 'Social Spaces'
    },
    {
        value: 'campus-coffee',
        label: 'Campus Coffee Shop',
        description: 'Casual study and meeting spot',
        icon: _jsx(Coffee, { size: 16 }),
        group: 'Social Spaces'
    },
    {
        value: 'rec-center',
        label: 'Recreation Center',
        description: 'Fitness and wellness facilities',
        icon: _jsx(Target, { size: 16 }),
        group: 'Recreation'
    },
    {
        value: 'art-studios',
        label: 'Art Studios',
        description: 'Creative workspace for visual arts',
        icon: _jsx(Palette, { size: 16 }),
        group: 'Creative Spaces'
    },
    {
        value: 'music-rooms',
        label: 'Music Practice Rooms',
        description: 'Soundproof individual practice spaces',
        icon: _jsx(Music, { size: 16 }),
        group: 'Creative Spaces'
    }
];
const academicMajors = [
    {
        value: 'computer-science',
        label: 'Computer Science',
        description: 'Software development, algorithms, and systems',
        icon: _jsx(Code, { size: 16 }),
        group: 'Engineering & Technology'
    },
    {
        value: 'electrical-engineering',
        label: 'Electrical Engineering',
        description: 'Electronics, circuits, and power systems',
        icon: _jsx(Zap, { size: 16 }),
        group: 'Engineering & Technology'
    },
    {
        value: 'mechanical-engineering',
        label: 'Mechanical Engineering',
        description: 'Design and manufacturing of mechanical systems',
        icon: _jsx(Wrench, { size: 16 }),
        group: 'Engineering & Technology'
    },
    {
        value: 'business-admin',
        label: 'Business Administration',
        description: 'Management, strategy, and entrepreneurship',
        icon: _jsx(Briefcase, { size: 16 }),
        group: 'Business & Economics'
    },
    {
        value: 'finance',
        label: 'Finance',
        description: 'Investment, banking, and financial analysis',
        icon: _jsx(Trophy, { size: 16 }),
        group: 'Business & Economics'
    },
    {
        value: 'psychology',
        label: 'Psychology',
        description: 'Human behavior and mental processes',
        icon: _jsx(Heart, { size: 16 }),
        group: 'Social Sciences'
    },
    {
        value: 'international-relations',
        label: 'International Relations',
        description: 'Global politics and diplomacy',
        icon: _jsx(Globe, { size: 16 }),
        group: 'Social Sciences'
    },
    {
        value: 'biology',
        label: 'Biology',
        description: 'Life sciences and biological research',
        icon: _jsx(Star, { size: 16 }),
        group: 'Natural Sciences'
    },
    {
        value: 'chemistry',
        label: 'Chemistry',
        description: 'Chemical processes and molecular science',
        icon: _jsx(Lightbulb, { size: 16 }),
        group: 'Natural Sciences'
    }
];
const toolElements = [
    {
        value: 'timer',
        label: 'Timer Element',
        description: 'Countdown and time tracking functionality',
        icon: _jsx(Clock, { size: 16 })
    },
    {
        value: 'calculator',
        label: 'Calculator Element',
        description: 'Mathematical computation component',
        icon: _jsx(Trophy, { size: 16 })
    },
    {
        value: 'note-editor',
        label: 'Note Editor',
        description: 'Rich text editing and note-taking',
        icon: _jsx(BookOpen, { size: 16 })
    },
    {
        value: 'chart-display',
        label: 'Chart Display',
        description: 'Data visualization and graphs',
        icon: _jsx(Target, { size: 16 })
    },
    {
        value: 'form-builder',
        label: 'Form Builder',
        description: 'Input collection and validation',
        icon: _jsx(Building, { size: 16 })
    },
    {
        value: 'media-player',
        label: 'Media Player',
        description: 'Video and audio playback controls',
        icon: _jsx(Camera, { size: 16 })
    }
];
const yearLevels = [
    { value: 'freshman', label: 'Freshman', description: 'First-year undergraduate student', icon: _jsx(GraduationCap, { size: 16 }) },
    { value: 'sophomore', label: 'Sophomore', description: 'Second-year undergraduate student', icon: _jsx(GraduationCap, { size: 16 }) },
    { value: 'junior', label: 'Junior', description: 'Third-year undergraduate student', icon: _jsx(GraduationCap, { size: 16 }) },
    { value: 'senior', label: 'Senior', description: 'Fourth-year undergraduate student', icon: _jsx(Crown, { size: 16 }) },
    { value: 'graduate', label: 'Graduate Student', description: 'Master\'s or PhD student', icon: _jsx(Star, { size: 16 }) },
    { value: 'postdoc', label: 'Postdoctoral', description: 'Postdoctoral researcher', icon: _jsx(Shield, { size: 16 }) }
];
export const Default = {
    args: {
        placeholder: 'Select an option...',
        options: campusSpaces.slice(0, 4)
    }
};
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Default Variant" }), _jsx(HiveSelect, { placeholder: "Select a campus space...", options: campusSpaces.slice(0, 4), variant: "default" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Premium Variant" }), _jsx(HiveSelect, { placeholder: "Select your major...", options: academicMajors.slice(0, 4), variant: "premium" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Minimal Variant" }), _jsx(HiveSelect, { placeholder: "Quick selection...", options: yearLevels.slice(0, 4), variant: "minimal" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different visual variants for various UI contexts and importance levels'
            }
        }
    }
};
export const SelectSizes = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Small Size" }), _jsx(HiveSelect, { placeholder: "Small select...", options: yearLevels.slice(0, 3), size: "sm" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Default Size" }), _jsx(HiveSelect, { placeholder: "Default select...", options: yearLevels.slice(0, 3), size: "default" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Large Size" }), _jsx(HiveSelect, { placeholder: "Large select...", options: yearLevels.slice(0, 3), size: "lg" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Size variants for different UI contexts and layouts'
            }
        }
    }
};
export const SearchableSelect = {
    render: () => {
        const [value, setValue] = useState('');
        return (_jsxs("div", { className: "w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-4", children: "Searchable Major Selection" }), _jsx(HiveSelect, { placeholder: "Search for your major...", searchPlaceholder: "Type to search majors...", options: academicMajors, value: value, onValueChange: (val) => setValue(val), searchable: true, variant: "premium", emptySearchMessage: "No majors found matching your search" }), value && (_jsxs("div", { className: "mt-4 text-sm text-[var(--hive-text-primary)]/70", children: ["Selected: ", academicMajors.find(m => m.value === value)?.label] }))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Searchable select with real-time filtering for large option sets'
            }
        }
    }
};
export const MultipleSelection = {
    render: () => {
        const [value, setValue] = useState(['cs-lounge', 'library-study']);
        return (_jsxs("div", { className: "w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-4", children: "Your Active Spaces" }), _jsx(HiveSelect, { placeholder: "Select campus spaces...", options: campusSpaces, value: value, onValueChange: (val) => setValue(val), multiple: true, searchable: true, clearable: true, variant: "premium" }), _jsxs("div", { className: "mt-4", children: [_jsx("h5", { className: "text-sm text-[var(--hive-text-primary)]/70 mb-2", children: "Selected Spaces:" }), _jsx(HiveSelectTags, { options: campusSpaces, value: value, onRemove: (removedValue) => setValue(prev => prev.filter(v => v !== removedValue)), maxDisplay: 3 })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Multiple selection with tag display and individual item removal'
            }
        }
    }
};
export const GroupedOptions = {
    render: () => {
        const [value, setValue] = useState('');
        return (_jsxs("div", { className: "w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-4", children: "Academic Major Selection" }), _jsx(HiveSelect, { placeholder: "Choose your field of study...", options: academicMajors, value: value, onValueChange: (val) => setValue(val), searchable: true, variant: "premium" }), value && (_jsxs("div", { className: "mt-4 p-3 bg-[var(--hive-background-primary)]/20 rounded-xl", children: [_jsx("div", { className: "text-sm text-[var(--hive-text-primary)]/70", children: "Selected Major:" }), _jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: academicMajors.find(m => m.value === value)?.label }), _jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50 mt-1", children: academicMajors.find(m => m.value === value)?.description })] }))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Grouped options with category headers for better organization'
            }
        }
    }
};
export const CreatableSelect = {
    render: () => {
        const [value, setValue] = useState([]);
        const [options, setOptions] = useState(toolElements);
        return (_jsxs("div", { className: "w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-4", children: "Tool Elements" }), _jsx(HiveSelect, { placeholder: "Select or create elements...", options: options, value: value, onValueChange: (val) => setValue(val), multiple: true, searchable: true, creatable: true, clearable: true, variant: "premium", searchPlaceholder: "Search or type to create..." }), _jsx("div", { className: "mt-4 text-xs text-[var(--hive-text-primary)]/50", children: "Type a new element name and press Enter to create it" }), value.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("h5", { className: "text-sm text-[var(--hive-text-primary)]/70 mb-2", children: "Selected Elements:" }), _jsx(HiveSelectTags, { options: options, value: value, onRemove: (removedValue) => setValue(prev => prev.filter(v => v !== removedValue)) })] }))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Creatable select allowing users to add custom options on the fly'
            }
        }
    }
};
export const LoadingAndStates = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Loading State" }), _jsx(HiveSelect, { placeholder: "Loading options...", options: [], loading: true })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Error State" }), _jsx(HiveSelect, { placeholder: "Select required field...", options: yearLevels.slice(0, 3), error: true }), _jsx("div", { className: "text-red-400 text-xs mt-1", children: "This field is required" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-2", children: "Disabled State" }), _jsx(HiveSelect, { placeholder: "Not available", options: yearLevels.slice(0, 3), disabled: true, value: "senior" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Various component states including loading, error, and disabled'
            }
        }
    }
};
export const AdvancedFeatures = {
    render: () => {
        const [campusValue, setCampusValue] = useState(['cs-lounge']);
        const [majorValue, setMajorValue] = useState('computer-science');
        const [elementValue, setElementValue] = useState(['timer', 'calculator']);
        return (_jsxs("div", { className: "space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Student Profile Builder" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Configure your campus presence" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(Building, { className: "inline w-4 h-4 mr-2" }), "Active Campus Spaces"] }), _jsx(HiveSelect, { placeholder: "Select your spaces...", options: campusSpaces, value: campusValue, onValueChange: (val) => setCampusValue(val), multiple: true, searchable: true, clearable: true, variant: "premium", maxHeight: "50" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(GraduationCap, { className: "inline w-4 h-4 mr-2" }), "Primary Major"] }), _jsx(HiveSelect, { placeholder: "Choose your major...", options: academicMajors, value: majorValue, onValueChange: (val) => setMajorValue(val), searchable: true, variant: "premium" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: [_jsx(Code, { className: "inline w-4 h-4 mr-2" }), "Tool Elements (Multi-select with Creation)"] }), _jsx(HiveSelect, { placeholder: "Select or create elements...", options: toolElements, value: elementValue, onValueChange: (val) => setElementValue(val), multiple: true, searchable: true, creatable: true, clearable: true, variant: "premium", searchPlaceholder: "Search or create new elements..." })] })] }), _jsxs("div", { className: "pt-4 border-t border-[var(--hive-border-subtle)]", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Profile Summary" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-primary)]/60 mb-1", children: ["Campus Spaces (", campusValue.length, ")"] }), _jsx(HiveSelectTags, { options: campusSpaces, value: campusValue, onRemove: (val) => setCampusValue(prev => prev.filter(v => v !== val)), maxDisplay: 2 })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-[var(--hive-text-primary)]/60 mb-1", children: "Major" }), _jsx("div", { className: "text-[var(--hive-text-primary)]", children: academicMajors.find(m => m.value === majorValue)?.label || 'Not selected' })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-primary)]/60 mb-1", children: ["Tool Elements (", elementValue.length, ")"] }), _jsx(HiveSelectTags, { options: toolElements, value: elementValue, onRemove: (val) => setElementValue(prev => prev.filter(v => v !== val)), maxDisplay: 2 })] })] })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive example showcasing all advanced features in a realistic campus profile form'
            }
        }
    }
};
export const CustomRendering = {
    render: () => {
        const [value, setValue] = useState('');
        const customRenderOption = (option) => (_jsxs("div", { className: "flex items-center justify-between w-full p-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [option.icon && (_jsx("div", { className: "text-yellow-400", children: option.icon })), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: option.label }), option.description && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50", children: option.description }))] })] }), _jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/30 px-2 py-1 bg-[var(--hive-text-primary)]/5 rounded", children: option.group })] }));
        const customRenderValue = (value, options) => {
            if (typeof value === 'string' && value) {
                const option = options.find(opt => opt.value === value);
                if (option) {
                    return (_jsxs("div", { className: "flex items-center space-x-2", children: [option.icon, _jsx("span", { children: option.label })] }));
                }
            }
            return 'Select a major...';
        };
        return (_jsxs("div", { className: "w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] mb-4", children: "Custom Rendering" }), _jsx(HiveSelect, { placeholder: "Select your major...", options: academicMajors, value: value, onValueChange: (val) => setValue(val), searchable: true, variant: "premium", renderOption: customRenderOption, renderValue: customRenderValue }), _jsx("div", { className: "mt-4 text-xs text-[var(--hive-text-primary)]/50", children: "This example shows custom option and value rendering" })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom rendering functions for both options and selected values'
            }
        }
    }
};
//# sourceMappingURL=hive-select.stories.js.map