import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveRichTextEditor } from '../../components';
import { Code } from 'lucide-react';
const meta = {
    title: '04-HIVE/Rich Text Editor',
    component: HiveRichTextEditor,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Comprehensive rich text editor with markdown support, campus integrations, and collaborative features. Perfect for tool building, documentation, and content creation.',
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
        mode: {
            control: 'select',
            options: ['edit', 'preview', 'split'],
        },
        showToolbar: {
            control: 'boolean',
        },
        showPreview: {
            control: 'boolean',
        },
        showWordCount: {
            control: 'boolean',
        },
        showCollaborators: {
            control: 'boolean',
        },
        syntaxHighlight: {
            control: 'boolean',
        },
        autosave: {
            control: 'boolean',
        },
        creatable: {
            control: 'boolean',
        },
    },
};
export default meta;
// Sample campus links for stories
const sampleCampusLinks = [
    { type: 'space', id: 'cs-lounge', name: 'CS Lounge', url: '/spaces/cs-lounge' },
    { type: 'space', id: 'engineering-lab', name: 'Engineering Lab', url: '/spaces/engineering-lab' },
    { type: 'space', id: 'design-studio', name: 'Design Studio', url: '/spaces/design-studio' },
    { type: 'student', id: 'jane-doe', name: 'Jane Doe', url: '/students/jane-doe' },
    { type: 'student', id: 'john-smith', name: 'John Smith', url: '/students/john-smith' },
    { type: 'course', id: 'cs-101', name: 'Intro to Computer Science', url: '/courses/cs-101' },
    { type: 'course', id: 'eng-201', name: 'Engineering Design', url: '/courses/eng-201' },
    { type: 'tool', id: 'task-manager', name: 'Campus Task Manager', url: '/tools/task-manager' },
];
// Sample collaborators
const sampleCollaborators = [
    { id: '1', name: 'Alex Chen', avatar: '/avatars/alex.jpg' },
    { id: '2', name: 'Maria Rodriguez', avatar: '/avatars/maria.jpg' },
    { id: '3', name: 'David Kim', avatar: '/avatars/david.jpg' },
    { id: '4', name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
];
// Sample markdown content
const sampleMarkdown = `# Campus Project Documentation

## Overview
This is a comprehensive guide for building tools on the HIVE platform. Students can create, collaborate, and share their projects with the campus community.

### Key Features
- **Markdown Support**: Write with familiar syntax
- **Campus Links**: Connect to [#CS Lounge](/spaces/cs-lounge) and [@Jane Doe](/students/jane-doe)
- **Collaborative Editing**: Work together in real-time
- **Code Blocks**: Share your implementations

\`\`\`javascript
function buildTool() {
  return {
    name: 'Campus Builder',
    platform: 'HIVE',
    collaborative: true
  };
}
\`\`\`

> "Students as builders, not just users" - HIVE Philosophy

### Next Steps
1. Design your tool interface
2. Implement core functionality
3. Test with campus community
4. Deploy to production

---

*Created by students, for students* 🎓`;
// Basic Rich Text Editor
export const Default = {
    render: () => {
        const [value, setValue] = useState('');
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Tool Documentation" }), _jsx(HiveRichTextEditor, { value: value, onChange: setValue, placeholder: "Start writing your documentation...", showWordCount: true, syntaxHighlight: true, autosave: true, onSave: (content) => console.log('Saved:', content) })] }));
    },
};
// Campus Integration Example
export const CampusIntegration = {
    render: () => {
        const [value, setValue] = useState(sampleMarkdown);
        const handleCampusLinkSearch = async (query, type) => {
            // Simulate search
            await new Promise(resolve => setTimeout(resolve, 200));
            return sampleCampusLinks.filter(link => link.type === type && link.name.toLowerCase().includes(query.toLowerCase()));
        };
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Campus Project Builder" }), _jsx(HiveRichTextEditor, { variant: "elevated", value: value, onChange: setValue, placeholder: "Document your campus project...", campusLinks: sampleCampusLinks, onCampusLinkSearch: handleCampusLinkSearch, showWordCount: true, syntaxHighlight: true, autosave: true, onSave: (content) => console.log('Saved:', content) }), _jsx("div", { className: "mt-4 text-xs text-gray-500", children: "Use @ to mention students, # to reference spaces" })] }));
    },
};
// Collaborative Editor
export const CollaborativeEditor = {
    render: () => {
        const [value, setValue] = useState('# Team Project\n\nCollaborating on campus innovation...');
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Collaborative Document" }), _jsx(HiveRichTextEditor, { variant: "premium", value: value, onChange: setValue, placeholder: "Start collaborating...", collaborators: sampleCollaborators, showCollaborators: true, showWordCount: true, syntaxHighlight: true, autosave: true, onSave: (content) => console.log('Saved:', content) }), _jsx("div", { className: "mt-4 text-xs text-gray-500", children: "Real-time collaboration with campus community" })] }));
    },
};
// Split Mode Preview
export const SplitMode = {
    render: () => {
        const [value, setValue] = useState(sampleMarkdown);
        return (_jsxs("div", { className: "w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Split View Editor" }), _jsx(HiveRichTextEditor, { mode: "split", size: "lg", value: value, onChange: setValue, placeholder: "Write and preview simultaneously...", showWordCount: true, syntaxHighlight: true, autosave: true, onSave: (content) => console.log('Saved:', content) })] }));
    },
};
// Tool Builder Interface
export const ToolBuilder = {
    render: () => {
        const [value, setValue] = useState('');
        const handleImageUpload = async (file) => {
            // Simulate upload
            await new Promise(resolve => setTimeout(resolve, 2000));
            return `/uploads/${file.name}`;
        };
        const handleCampusLinkSearch = async (query, type) => {
            await new Promise(resolve => setTimeout(resolve, 200));
            return sampleCampusLinks.filter(link => link.type === type && link.name.toLowerCase().includes(query.toLowerCase()));
        };
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center", children: _jsx(Code, { className: "w-5 h-5 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Campus Tool Builder" }), _jsx("p", { className: "text-sm text-gray-400", children: "Create documentation for your campus tool" })] })] }), _jsx(HiveRichTextEditor, { variant: "elevated", size: "lg", value: value, onChange: setValue, placeholder: "## Tool Name\\n\\nDescribe your tool and how it helps the campus community...", campusLinks: sampleCampusLinks, onCampusLinkSearch: handleCampusLinkSearch, onImageUpload: handleImageUpload, showWordCount: true, syntaxHighlight: true, autosave: true, maxLength: 5000, onSave: (content) => console.log('Saved:', content) })] }));
    },
};
// Size Variations
export const SizeVariations = {
    render: () => {
        const [values, setValues] = useState({
            sm: '# Small Editor\n\nCompact interface for quick notes.',
            default: '# Default Editor\n\nStandard size for most use cases.',
            lg: '# Large Editor\n\nExpanded interface for detailed documentation.',
            xl: '# Extra Large Editor\n\nMaximum space for comprehensive content creation.'
        });
        return (_jsxs("div", { className: "w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Size Variations" }), ['sm', 'default', 'lg', 'xl'].map(size => (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-300 capitalize", children: [size, " Size"] }), _jsx(HiveRichTextEditor, { size: size, value: values[size] || '', onChange: (value) => setValues(prev => ({ ...prev, [size]: value })), placeholder: `${size} editor placeholder...`, showWordCount: true, syntaxHighlight: true })] }, size)))] }));
    },
};
// Variant Showcase
export const VariantShowcase = {
    render: () => {
        const [values, setValues] = useState({
            default: '# Default Style\n\nStandard HIVE editor styling.',
            premium: '# Premium Style\n\nEnhanced with gold accents and premium features.',
            elevated: '# Elevated Style\n\nRaised appearance with enhanced borders.',
            minimal: '# Minimal Style\n\nClean, minimal interface for focused writing.'
        });
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Variant Showcase" }), ['default', 'premium', 'elevated', 'minimal'].map(variant => (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-300 capitalize", children: [variant, " Variant"] }), _jsx(HiveRichTextEditor, { variant: variant, value: values[variant] || '', onChange: (value) => setValues(prev => ({ ...prev, [variant]: value })), placeholder: `${variant} editor...`, showWordCount: true, syntaxHighlight: true })] }, variant)))] }));
    },
};
// States and Edge Cases
export const StatesAndEdgeCases = {
    render: () => {
        const [normalValue, setNormalValue] = useState('# Normal State\n\nFully functional editor.');
        const [readOnlyValue] = useState('# Read-Only Content\n\nThis content cannot be edited.');
        const [errorValue, setErrorValue] = useState('');
        return (_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "States & Edge Cases" }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300", children: "Normal State" }), _jsx(HiveRichTextEditor, { value: normalValue, onChange: setNormalValue, placeholder: "Normal editor state...", showWordCount: true, syntaxHighlight: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300", children: "Read-Only State" }), _jsx(HiveRichTextEditor, { value: readOnlyValue, readOnly: true, placeholder: "Read-only content...", showWordCount: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300", children: "Error State" }), _jsx(HiveRichTextEditor, { value: errorValue, onChange: setErrorValue, placeholder: "Required field...", error: "Content is required", showWordCount: true }), _jsx("div", { className: "text-red-400 text-xs", children: "Please provide some content" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300", children: "Disabled State" }), _jsx(HiveRichTextEditor, { value: "# Disabled Content\\n\\nThis editor is disabled.", disabled: true, placeholder: "Disabled editor...", showWordCount: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300", children: "Character Limit" }), _jsx(HiveRichTextEditor, { value: "Short content with character limit.", onChange: (value) => console.log('Content:', value), maxLength: 100, placeholder: "Maximum 100 characters...", showWordCount: true }), _jsx("div", { className: "text-yellow-400 text-xs", children: "Character limit: 100" })] })] }));
    },
};
// Comprehensive Feature Demo
export const ComprehensiveDemo = {
    render: () => {
        const [value, setValue] = useState(sampleMarkdown);
        const handleImageUpload = async (file) => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return `/uploads/${file.name}`;
        };
        const handleCampusLinkSearch = async (query, type) => {
            await new Promise(resolve => setTimeout(resolve, 200));
            return sampleCampusLinks.filter(link => link.type === type && link.name.toLowerCase().includes(query.toLowerCase()));
        };
        return (_jsxs("div", { className: "w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "HIVE Rich Text Editor" }), _jsx("p", { className: "text-gray-400", children: "Full-featured editor with campus integration" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[var(--hive-background-primary)]/20 rounded-lg border border-white/10", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)] mb-1", children: value.split(/\s+/).filter(w => w.length > 0).length }), _jsx("div", { className: "text-xs text-gray-400", children: "Words" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)] mb-1", children: value.length }), _jsx("div", { className: "text-xs text-gray-400", children: "Characters" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)] mb-1", children: sampleCollaborators.length }), _jsx("div", { className: "text-xs text-gray-400", children: "Collaborators" })] })] }), _jsx(HiveRichTextEditor, { variant: "premium", size: "lg", mode: "split", value: value, onChange: setValue, placeholder: "Create something amazing for your campus...", campusLinks: sampleCampusLinks, collaborators: sampleCollaborators, onCampusLinkSearch: handleCampusLinkSearch, onImageUpload: handleImageUpload, showWordCount: true, showCollaborators: true, syntaxHighlight: true, spellCheck: true, autosave: true, autosaveInterval: 3000, maxLength: 10000, onSave: (content) => console.log('Auto-saved:', content) })] })] }));
    },
};
//# sourceMappingURL=hive-rich-text-editor.stories.js.map