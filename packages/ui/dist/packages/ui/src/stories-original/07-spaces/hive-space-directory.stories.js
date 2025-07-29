import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveSpaceDirectory } from '../../components';
const meta = {
    title: '07-Spaces/Hive Space Directory',
    component: HiveSpaceDirectory,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**Comprehensive space discovery and browsing interface**

Advanced directory system for exploring university Spaces with sophisticated filtering, search, and discovery mechanisms. Core component for campus-wide space exploration.

## When to Use
- Primary space discovery interface
- University space browsing
- Space category exploration  
- Community discovery flows

## Design Principles
- **Campus Infrastructure**: Feels like serious university directory system
- **Discovery Optimization**: Designed for finding relevant academic communities
- **Builder Recognition**: Highlights spaces with active Builders
- **Tool Discovery**: Showcases spaces with the best tools
- **Glass Morphism**: Cards use HIVE's signature backdrop blur effects
- **Semantic Tokens**: Consistent with HIVE design system colors
- **Magnetic Interactions**: Hover effects with subtle attraction animations

## Directory Features
- **Smart Search**: University-aware search with fuzzy matching
- **Advanced Filtering**: By school, department, activity level, tool count
- **Space Categories**: Academic, social, project-based, general interest
- **Live Metrics**: Real-time member counts and activity indicators
- **Builder Highlights**: Spaces with active tool creators
- **Trending Spaces**: Algorithm-driven space recommendations

## Accessibility
- WCAG 2.1 AA compliant directory structure
- Screen reader friendly space listings with proper ARIA labels
- Keyboard navigation between spaces and filters (Tab, Arrow keys, Enter)
- Clear focus management with golden ring indicators
- Search functionality supports screen readers
- High contrast mode and reduced motion support
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        view: {
            control: 'select',
            options: ['grid', 'list', 'featured'],
            description: 'Directory display format'
        },
        university: {
            control: 'text',
            description: 'Filter by specific university'
        },
        showFilters: {
            control: 'boolean',
            description: 'Display advanced filtering options'
        }
    }
};
export default meta;
const sampleSpaces = [
    {
        id: 'cs-stanford',
        name: 'Computer Science',
        university: 'Stanford University',
        description: 'The official Computer Science space for Stanford students. Share code, collaborate on projects, and discover tools built by your peers.',
        category: 'Academic Department',
        members: 2156,
        tools: 342,
        activeToday: 89,
        trending: true,
        verified: true,
        builders: 23,
        cover: 'https://picsum.photos/400/200?random=1',
        tags: ['Programming', 'AI/ML', 'Algorithms', 'Software Engineering'],
        lastActivity: '2 minutes ago',
        engagement: 'High'
    },
    {
        id: 'engineering-mit',
        name: 'Mechanical Engineering',
        university: 'MIT',
        description: 'MIT Mechanical Engineering community for sharing designs, collaborating on projects, and building engineering tools.',
        category: 'Academic Department',
        members: 1842,
        tools: 156,
        activeToday: 67,
        verified: true,
        builders: 18,
        cover: 'https://picsum.photos/400/200?random=2',
        tags: ['CAD', 'Design', 'Manufacturing', 'Robotics'],
        lastActivity: '15 minutes ago',
        engagement: 'High'
    },
    {
        id: 'entrepreneurship-berkeley',
        name: 'Startup Community',
        university: 'UC Berkeley',
        description: 'Berkeley entrepreneurs building the next generation of startups. Share ideas, find co-founders, and build business tools.',
        category: 'Student Organization',
        members: 967,
        tools: 89,
        activeToday: 45,
        builders: 12,
        cover: 'https://picsum.photos/400/200?random=3',
        tags: ['Startups', 'Business', 'Networking', 'Innovation'],
        lastActivity: '1 hour ago',
        engagement: 'Medium'
    },
    {
        id: 'design-stanford',
        name: 'Product Design',
        university: 'Stanford University',
        description: 'Stanford product designers sharing portfolios, design tools, and collaborative design workflows.',
        category: 'Academic Program',
        members: 456,
        tools: 67,
        activeToday: 23,
        builders: 8,
        cover: 'https://picsum.photos/400/200?random=4',
        tags: ['Design', 'UX/UI', 'Prototyping', 'Research'],
        lastActivity: '3 hours ago',
        engagement: 'Medium'
    },
    {
        id: 'physics-harvard',
        name: 'Physics Research',
        university: 'Harvard University',
        description: 'Harvard physics students and researchers sharing simulations, data analysis tools, and research collaborations.',
        category: 'Research Group',
        members: 234,
        tools: 45,
        activeToday: 12,
        builders: 5,
        cover: 'https://picsum.photos/400/200?random=5',
        tags: ['Physics', 'Research', 'Simulations', 'Data Analysis'],
        lastActivity: '6 hours ago',
        engagement: 'Low'
    }
];
export const DefaultDirectory = {
    args: {
        spaces: sampleSpaces,
        view: 'grid',
        showFilters: true
    }
};
export const UniversityFiltered = {
    args: {
        spaces: sampleSpaces.filter(space => space.university === 'Stanford University'),
        view: 'grid',
        university: 'Stanford University',
        showFilters: true,
        title: 'Stanford University Spaces'
    }
};
export const ListView = {
    args: {
        spaces: sampleSpaces,
        view: 'list',
        showFilters: true,
        showMetrics: true,
        showEngagement: true
    }
};
export const FeaturedSpaces = {
    args: {
        spaces: sampleSpaces.filter(space => space.trending || space.engagement === 'High'),
        view: 'featured',
        title: 'Trending Spaces',
        subtitle: 'Most active spaces across universities',
        showFilters: false
    }
};
export const EmptyDirectory = {
    args: {
        spaces: [],
        view: 'grid',
        showFilters: true,
        emptyState: {
            title: 'No spaces found',
            description: 'Try adjusting your filters or search for different terms.',
            action: 'Create New Space'
        }
    }
};
export const LoadingDirectory = {
    args: {
        loading: true,
        view: 'grid',
        showFilters: true,
        skeletonCount: 6
    }
};
export const SearchExample = {
    render: () => {
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedFilters, setSelectedFilters] = useState({
            category: 'all',
            university: 'all',
            engagement: 'all',
            hasBuilders: false
        });
        const filteredSpaces = sampleSpaces.filter(space => {
            const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedFilters.category === 'all' ||
                space.category === selectedFilters.category;
            const matchesUniversity = selectedFilters.university === 'all' ||
                space.university === selectedFilters.university;
            const matchesEngagement = selectedFilters.engagement === 'all' ||
                space.engagement === selectedFilters.engagement;
            const matchesBuilders = !selectedFilters.hasBuilders || space.builders > 10;
            return matchesSearch && matchesCategory && matchesUniversity && matchesEngagement && matchesBuilders;
        });
        return (_jsx(HiveSpaceDirectory, { spaces: filteredSpaces, view: "grid", showFilters: true, searchQuery: searchQuery, onSearchChange: setSearchQuery, filters: selectedFilters, onFiltersChange: setSelectedFilters, onSpaceClick: (space) => console.log('Space clicked:', space.name), onJoinSpace: (space) => console.log('Join space:', space.name), onCreateSpace: () => console.log('Create new space') }));
    }
};
export const CategoryBreakdown = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Academic Departments" }), _jsx(HiveSpaceDirectory, { spaces: sampleSpaces.filter(space => space.category === 'Academic Department'), view: "grid", showFilters: false, compact: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Student Organizations" }), _jsx(HiveSpaceDirectory, { spaces: sampleSpaces.filter(space => space.category === 'Student Organization'), view: "list", showFilters: false, compact: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Research Groups" }), _jsx(HiveSpaceDirectory, { spaces: sampleSpaces.filter(space => space.category === 'Research Group'), view: "grid", showFilters: false, compact: true })] })] }))
};
export const InteractiveDemo = {
    args: {
        spaces: sampleSpaces,
        view: 'grid',
        showFilters: true,
        interactive: true,
        onSpaceClick: (space) => {
            console.log('Navigate to space:', space.name);
        },
        onJoinSpace: (space) => {
            console.log('Join space request:', space.name);
        },
        onFilterChange: (filters) => {
            console.log('Filters changed:', filters);
        },
        onViewChange: (view) => {
            console.log('View changed to:', view);
        }
    }
};
//# sourceMappingURL=hive-space-directory.stories.js.map