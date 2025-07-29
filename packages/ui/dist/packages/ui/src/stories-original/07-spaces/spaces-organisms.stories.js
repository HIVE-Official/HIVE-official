import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveCard as Card, HiveButton as Button, CategoryGridOrganism as CategoryGrid, HeroSearchOrganism as HeroSearch, PersonalizationFeedOrganism as PersonalizationFeed } from '../../components';
const meta = {
    title: '07-Spaces/Organisms',
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'hive',
            values: [{ name: 'hive', value: 'var(--hive-background-primary)' }],
        },
        docs: {
            description: {
                component: `
**HIVE Spaces Organisms - Design System Options**

Comprehensive organism-level components for the HIVE spaces section. These organisms provide consistent, reusable patterns that can be composed to create discovery, browse, and management experiences.

## Available Organisms

### Discovery Organisms
- **HeroSearchOrganism**: Campus visualization + enhanced search
- **CategoryGridOrganism**: Filterable space categories
- **PersonalizationFeedOrganism**: My Spaces + recommendations

### Browse Organisms  
- **SpacesDiscoveryOrganism**: Complete discovery landing page
- **SpacesBrowseOrganism**: Advanced search and filtering
- **SpacesGridOrganism**: Standardized results display

## Design System Principles
- Built on existing HiveCard and PageContainer systems
- Uses semantic design tokens for consistency
- Modular composition for A/B testing and customization
- Responsive mobile-first design patterns
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
// Mock data for demonstrations
const mockUserSpaces = [
    {
        id: '1',
        name: 'Computer Science Majors',
        description: 'Connect with fellow CS students',
        memberCount: 1248,
        type: 'university_organizations',
        role: 'member',
        isActive: true
    },
    {
        id: '2',
        name: 'Campus Photography',
        description: 'Capture campus life together',
        memberCount: 89,
        type: 'student_organizations',
        role: 'admin',
        isActive: true
    },
    {
        id: '3',
        name: 'Alpha Beta Gamma',
        description: 'Brotherhood and academic excellence',
        memberCount: 67,
        type: 'greek_life',
        role: 'member',
        isActive: false
    },
];
const mockRecommendedSpaces = [
    {
        id: 'rec1',
        name: 'AI/ML Research Group',
        description: 'Machine learning and artificial intelligence research',
        memberCount: 156,
        type: 'university_organizations',
        reason: 'Based on your CS major',
        confidence: 0.85
    },
    {
        id: 'rec2',
        name: 'Campus Sustainability',
        description: 'Environmental initiatives and green campus projects',
        memberCount: 234,
        type: 'student_organizations',
        reason: 'Popular with your connections',
        confidence: 0.72
    },
    {
        id: 'rec3',
        name: 'Student Government',
        description: 'Voice student concerns and shape campus policy',
        memberCount: 89,
        type: 'university_organizations',
        reason: 'Leadership interest match',
        confidence: 0.68
    }
];
const mockActivityStats = {
    spacesJoined: 3,
    weeklyGrowth: 2,
    activeNow: 3,
    totalInteractions: 47,
    favoriteSpaces: 2
};
const categoryStats = {
    student_organizations: 120,
    university_organizations: 180,
    greek_life: 23,
    campus_living: 37,
};
// ===== OPTION 1: HERO SEARCH ORGANISM =====
export const HeroSearchOrganism = {
    render: () => (_jsx(HeroSearch, { totalSpaces: 360, categoryBreakdown: categoryStats, onSearch: (query) => console.log('Search:', query), onBrowseAll: () => console.log('Browse All'), onTrending: () => console.log('Trending'), onMySpaces: () => console.log('My Spaces'), searchConfig: {
            placeholder: "Search spaces, organizations, communities...",
            showFilters: true,
            filterTags: ['Student Orgs', 'Greek Life', 'Academic', 'Sports', 'Arts', 'Tech']
        } })),
    parameters: {
        docs: {
            description: {
                story: `
**HeroSearchOrganism** - Complete hero section with campus visualization and enhanced search capabilities.

**Features:**
- Animated campus visualization with interactive elements
- Enhanced search bar with filter capabilities  
- Quick action buttons for common paths
- Background ambient effects
- Responsive design with mobile optimization

**Use Cases:**
- Main spaces discovery landing page
- Marketing/onboarding hero sections
- Dashboard discovery widgets
        `,
            },
        },
    },
};
// ===== OPTION 2: CATEGORY GRID ORGANISM =====
export const CategoryGridOrganism = {
    render: () => (_jsx(CategoryGrid, { categoryBreakdown: categoryStats, totalSpaces: 360, onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId) })),
    parameters: {
        docs: {
            description: {
                story: `
**CategoryGridOrganism** - Standardized category display with consistent patterns.

**Features:**
- Animated icon patterns for each category type
- Liquid fill hover effects
- Consistent card structure with design system integration
- Real-time statistics display
- Responsive grid layout

**Use Cases:**
- Discovery page category sections
- Browse page filters
- Dashboard category widgets
- Landing page feature sections
        `,
            },
        },
    },
};
// ===== OPTION 3: PERSONALIZATION FEED ORGANISM =====
export const PersonalizationFeedOrganism = {
    render: () => (_jsx(PersonalizationFeed, { mySpaces: mockUserSpaces, recommendedSpaces: mockRecommendedSpaces, activityStats: mockActivityStats, onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId), onRecommendationClick: (spaceId) => console.log('Recommendation clicked:', spaceId), onJoinSpace: (spaceId) => console.log('Join space:', spaceId), onBrowseSpaces: () => console.log('Browse spaces') })),
    parameters: {
        docs: {
            description: {
                story: `
**PersonalizationFeedOrganism** - User-specific dashboard with recommendations and quick access.

**Features:**
- My active spaces with quick navigation
- AI-powered recommendations
- Personal activity statistics
- Role-based access indicators
- Liquid animation effects

**Use Cases:**
- Dashboard personalization sections
- User onboarding flows
- Profile page widgets
- Mobile app home screens
        `,
            },
        },
    },
};
// ===== VARIANTS AND CONFIGURATIONS =====
export const HeroSearchVariants = {
    render: () => (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Default Variant" }), _jsx(HeroSearch, { totalSpaces: 360, categoryBreakdown: categoryStats, onSearch: (query) => console.log('Search:', query) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Compact Variant" }), _jsx(HeroSearch, { variant: "compact", totalSpaces: 360, categoryBreakdown: categoryStats, onSearch: (query) => console.log('Search:', query) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Minimal Variant" }), _jsx(HeroSearch, { variant: "minimal", title: "Find Your Community", subtitle: "Search through campus spaces and organizations", onSearch: (query) => console.log('Search:', query) })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different variants of the HeroSearchOrganism showing layout flexibility.',
            },
        },
    },
};
export const CategoryGridVariants = {
    render: () => (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Default Layout" }), _jsx(CategoryGrid, { categoryBreakdown: categoryStats, totalSpaces: 360 })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Compact Layout" }), _jsx(CategoryGrid, { variant: "compact", categoryBreakdown: categoryStats, showStats: false })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Featured Layout" }), _jsx(CategoryGrid, { variant: "featured", title: "Explore Campus Communities", subtitle: "Discover spaces that match your interests and academic goals", categoryBreakdown: categoryStats, totalSpaces: 360 })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different layout variants of the CategoryGridOrganism.',
            },
        },
    },
};
export const PersonalizationFeedVariants = {
    render: () => (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Default Layout" }), _jsx(PersonalizationFeed, { mySpaces: mockUserSpaces, recommendedSpaces: mockRecommendedSpaces, activityStats: mockActivityStats })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Compact Layout" }), _jsx(PersonalizationFeed, { layout: "compact", mySpaces: mockUserSpaces.slice(0, 2), recommendedSpaces: mockRecommendedSpaces.slice(0, 2), activityStats: mockActivityStats })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Expanded Layout" }), _jsx(PersonalizationFeed, { layout: "expanded", mySpaces: mockUserSpaces, recommendedSpaces: mockRecommendedSpaces, activityStats: mockActivityStats, showSections: {
                            mySpaces: true,
                            recommendations: true,
                            activity: true
                        } })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different layout configurations of the PersonalizationFeedOrganism.',
            },
        },
    },
};
// ===== LOADING STATES =====
export const LoadingStates = {
    render: () => (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Category Grid Loading" }), _jsx(CategoryGrid, { isLoading: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Personalization Feed Loading" }), _jsx(PersonalizationFeed, { isLoading: {
                            mySpaces: true,
                            recommendations: true,
                            activity: true
                        } })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Loading states for all organisms showing skeleton animations.',
            },
        },
    },
};
// ===== COMPLETE DISCOVERY ORGANISM =====
export const CompleteDiscoveryOrganism = {
    render: () => (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[var(--hive-background-tertiary)] relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute -top-40 -right-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/5 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/3 rounded-full blur-3xl animate-pulse delay-1000" })] }), _jsx(HeroSearch, { totalSpaces: 360, categoryBreakdown: categoryStats, onSearch: (query) => console.log('Search:', query), onBrowseAll: () => console.log('Browse All'), onTrending: () => console.log('Trending'), onMySpaces: () => console.log('My Spaces') }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 mb-8", children: _jsx(PersonalizationFeed, { mySpaces: mockUserSpaces, recommendedSpaces: mockRecommendedSpaces, activityStats: mockActivityStats, onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId), onRecommendationClick: (spaceId) => console.log('Recommendation clicked:', spaceId), onJoinSpace: (spaceId) => console.log('Join space:', spaceId), onBrowseSpaces: () => console.log('Browse spaces') }) }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 mb-8", children: _jsx(CategoryGrid, { categoryBreakdown: categoryStats, totalSpaces: 360, onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId) }) }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 mb-8", children: _jsxs(Card, { className: "p-8 text-center bg-gradient-to-r from-[color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent)] to-[color-mix(in_srgb,var(--hive-brand-secondary)_2%,transparent)] border-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Ready to explore?" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] mb-6 max-w-md mx-auto", children: "Browse all spaces with advanced search and filtering, or check out what's trending." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsx(Button, { className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: "Browse & Search" }), _jsx(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-active)]", children: "View Trending" })] })] }) })] })),
    parameters: {
        docs: {
            description: {
                story: `
**CompleteDiscoveryOrganism** - Full-page discovery experience combining all organisms.

**Features:**
- Complete hero section with search
- Personalized dashboard integration  
- Category grid with statistics
- Call-to-action sections
- Responsive full-page layout
- Background ambient effects

**Use Cases:**
- Main spaces landing page
- Discovery dashboard
- Onboarding experiences
- Marketing landing pages
        `,
            },
        },
    },
};
// ===== COMPARISON VIEW =====
export const OrganismComparison = {
    render: () => (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "HIVE Spaces Organisms" }), _jsx("p", { className: "text-[var(--hive-text-tertiary)] max-w-3xl mx-auto", children: "Three core organism components for rebuilding the spaces section with consistent design system patterns. Each organism can be used independently or composed together for complete experiences." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                    {
                        title: "HeroSearchOrganism",
                        description: "Campus visualization + enhanced search capabilities",
                        features: ["Animated campus map", "Enhanced search bar", "Quick action buttons"],
                        complexity: "Medium",
                        useCase: "Landing page hero"
                    },
                    {
                        title: "CategoryGridOrganism",
                        description: "Standardized category display with consistent patterns",
                        features: ["Animated icons", "Liquid hover effects", "Statistics integration"],
                        complexity: "Low",
                        useCase: "Category sections"
                    },
                    {
                        title: "PersonalizationFeedOrganism",
                        description: "User-specific dashboard with recommendations",
                        features: ["My spaces display", "AI recommendations", "Activity statistics"],
                        complexity: "High",
                        useCase: "Dashboard widgets"
                    }
                ].map((organism, index) => (_jsx(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: organism.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)] mb-3", children: organism.description }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsxs("span", { className: "text-xs px-2 py-1 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded", children: [organism.complexity, " Complexity"] }), _jsx("span", { className: "text-xs px-2 py-1 bg-[var(--hive-interactive-active)] text-[var(--hive-text-primary)] rounded", children: organism.useCase })] }), _jsx("div", { className: "space-y-1", children: organism.features.map((feature, i) => (_jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] flex items-center", children: [_jsx("div", { className: "w-1 h-1 bg-[var(--hive-brand-secondary)] rounded-full mr-2" }), feature] }, i))) })] }) }, index))) }), _jsxs(Card, { className: "p-8 bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/20", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-6", children: "Implementation Recommendations" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Start With (Phase 1)" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold", children: "1" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "CategoryGridOrganism - Lowest complexity, highest reusability" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold", children: "2" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "HeroSearchOrganism - Core discovery pattern" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Expand With (Phase 2)" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold", children: "3" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "PersonalizationFeedOrganism - User customization" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold", children: "4" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Complete discovery composition" })] })] })] })] }), _jsxs("div", { className: "mt-8 p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border border-[var(--hive-interactive-active)] rounded-lg", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-semibold mb-2", children: "Design System Benefits" }), _jsxs("div", { className: "text-sm text-[var(--hive-text-tertiary)] space-y-1", children: [_jsx("div", { children: "\u2022 All organisms build on existing HiveCard and HiveButton systems" }), _jsx("div", { children: "\u2022 Consistent with design tokens for theming and spacing" }), _jsx("div", { children: "\u2022 Modular composition enables A/B testing and customization" }), _jsx("div", { children: "\u2022 Patterns can be reused across other discovery sections" })] })] })] })] })),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: `
**Organism Comparison View** - Complete overview of all available spaces organisms with implementation guidance.

This story provides a comprehensive comparison of all organism options, helping you choose the right components for your implementation needs.
        `,
            },
        },
    },
};
//# sourceMappingURL=spaces-organisms.stories.js.map