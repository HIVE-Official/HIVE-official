import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{S as s}from"./search-bar-BU8uUbjk.js";import{H as i,c as o,a as c,b as n}from"./hive-tokens-CKIUfcHM.js";import{B as d}from"./badge-B09J4pcg.js";import{T as r}from"./text-Cao0VGB4.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";import"./spinner-DD2yOTAA.js";import"./x-W2WQYUcx.js";import"./createLucideIcon-WpwZgzX-.js";import"./search-LJgCGvxp.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";const H={title:"02-Molecules/Search Bar - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🔍 HIVE Search Bar - Complete Molecule Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive search interface for University at Buffalo HIVE platform discovery and navigation.

### 🎯 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, ghost, filled for different interface contexts
- **3 Size Options** - Small, medium, large for responsive design
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Loading States** - Built-in spinner animation for async search operations
- **Clearable Input** - One-click clearing with accessibility support
- **Form Integration** - Proper form submission with enter key support
- **Icon Integration** - Search and clear icons with semantic styling
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and screen reader support
- **Campus Discovery** - Built for University at Buffalo student platform search workflows

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform discovery:
- **Study Partner Search** - Find classmates for CSE 331, engineering projects, exam prep
- **Space Discovery** - Search for academic spaces, residential communities, student organizations
- **Tool Marketplace** - Discover campus tools for productivity, collaboration, academic success
- **Event Finding** - Search campus events, study sessions, social gatherings
- **Profile Discovery** - Find students by major, interests, skills, availability
- **Academic Resources** - Search course materials, study guides, project templates
- **Campus Navigation** - Find buildings, dining options, services, support resources

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large search targets and clear visual feedback
- **Responsive Sizing** - Adaptive search bar for different screen sizes
- **Voice Search Ready** - Integration points for voice input (future enhancement)
- **Autocomplete Support** - Ready for predictive search suggestions
`}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Search bar size"},variant:{control:"select",options:["default","ghost","filled"],description:"Search bar visual variant"},loading:{control:"boolean",description:"Loading state with spinner"},clearable:{control:"boolean",description:"Show clear button when text is entered"},placeholder:{control:"text",description:"Placeholder text"},onSearch:{action:"searched",description:"Search submission handler"},onChange:{action:"changed",description:"Text change handler"},onClear:{action:"cleared",description:"Clear button handler"}}},t={args:{placeholder:"Search spaces, tools, and students...",size:"md",variant:"default",loading:!1,clearable:!0,onSearch:a("search-submitted"),onChange:a("search-changed"),onClear:a("search-cleared")},render:m=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(i,{children:e.jsxs(o,{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"HIVE search interface for University at Buffalo platform discovery:"}),e.jsx(s,{...m}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive search with loading states, clear functionality, and form submission"})]})})})},l={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"success",children:"🔍 SEARCH VARIANTS"}),"Visual Variant Options"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 search bar variants for different University at Buffalo HIVE platform interface contexts"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Visual Variants:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Default (Standard):"}),e.jsx(s,{placeholder:"Search CSE 331 study groups...",variant:"primary",onSearch:a("default-search"),onChange:a("default-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Standard search for main platform areas - space discovery, tool marketplace, profile search"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost (Subtle):"}),e.jsx(s,{placeholder:"Quick search...",variant:"ghost",onSearch:a("ghost-search"),onChange:a("ghost-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Subtle search for embedded contexts, widget search, secondary navigation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Filled (Prominent):"}),e.jsx(s,{placeholder:"Find your next study partner...",variant:"filled",onSearch:a("filled-search"),onChange:a("filled-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Prominent search for hero sections, onboarding flows, feature discovery"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"info",children:"📏 SEARCH SIZES"}),"Size Variations"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 search bar sizes for different interface densities and responsive design"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Options:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (Compact):"}),e.jsx(s,{size:"sm",placeholder:"Search tools...",onSearch:a("small-search"),onChange:a("small-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Compact search for toolbars, widget headers, secondary navigation areas"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (Standard):"}),e.jsx(s,{size:"md",placeholder:"Search spaces and communities...",onSearch:a("medium-search"),onChange:a("medium-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Standard search for main content areas, space discovery, profile browsing"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (Prominent):"}),e.jsx(s,{size:"lg",placeholder:"What are you looking for at UB?",onSearch:a("large-search"),onChange:a("large-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Large search for hero sections, landing pages, primary platform entry points"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"⚡ INTERACTIVE STATES"}),"Search States and Functionality"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Interactive search features for user feedback and enhanced functionality"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive Features:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Loading State:"}),e.jsx(s,{placeholder:"Searching campus spaces...",loading:!0,onSearch:a("loading-search"),onChange:a("loading-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Loading state with spinner for async search operations and API calls"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Clearable Input:"}),e.jsx(s,{placeholder:"Search UB students...",value:"Sarah Chen Computer Science",clearable:!0,onSearch:a("clearable-search"),onChange:a("clearable-change"),onClear:a("clearable-clear")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Clear button appears when text is entered, provides quick reset functionality"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Non-Clearable:"}),e.jsx(s,{placeholder:"Filter current results...",clearable:!1,onSearch:a("non-clearable-search"),onChange:a("non-clearable-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Search without clear button for contexts where clearing isn't appropriate"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Search Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Search usage in actual University at Buffalo student discovery and navigation contexts"})]}),e.jsxs(o,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Discovery & Study Partner Search:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 Algorithm Analysis Study Group Formation"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Partner Search:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{placeholder:"Find CSE 331 study partners...",size:"md",variant:"primary",onSearch:a("study-partner-search"),onChange:a("study-partner-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Search for classmates taking Algorithm Analysis, filter by availability and study preferences"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Resource Discovery:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{placeholder:"Algorithm study tools and guides...",size:"md",variant:"filled",onSearch:a("resource-search"),onChange:a("resource-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Find study tools, practice problems, and community-created resources for computer science courses"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Community & Space Discovery:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"University Spaces:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"sm",placeholder:"Computer Science spaces...",variant:"ghost",onSearch:a("university-search"),onChange:a("university-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Find official academic spaces, department communities, course-specific groups"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Residential Communities:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"sm",placeholder:"Ellicott Complex activities...",variant:"ghost",onSearch:a("residential-search"),onChange:a("residential-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Discover dorm communities, floor activities, residential life events and coordination"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Student Organizations:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"sm",placeholder:"Programming clubs...",variant:"ghost",onSearch:a("organization-search"),onChange:a("organization-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Find student clubs, interest groups, professional organizations, and social communities"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Platform Tool Discovery:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Tools:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{placeholder:"GPA calculator, study scheduler...",size:"md",variant:"primary",onSearch:a("academic-tools-search"),onChange:a("academic-tools-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Find productivity tools for academic success, grade tracking, assignment management"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Social Coordination Tools:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{placeholder:"Event planner, group chat...",size:"md",variant:"primary",onSearch:a("social-tools-search"),onChange:a("social-tools-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Discover tools for event coordination, group communication, community building"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Navigation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"Mobile-optimized search for on-campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Campus Search:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"lg",placeholder:"Find dining, libraries, events...",variant:"filled",onSearch:a("mobile-campus-search"),onChange:a("mobile-campus-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Large search interface for mobile discovery while walking around campus"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Space Finder:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"lg",placeholder:"Lockwood Library study rooms...",variant:"filled",loading:!0,onSearch:a("study-space-search"),onChange:a("study-space-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Location-aware search for available study spaces, quiet areas, collaborative zones"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Search Integration Contexts:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"Platform-Wide Search Functionality"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Global Platform Search:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"lg",placeholder:"Search everything at UB...",variant:"filled",onSearch:a("global-search"),onChange:a("global-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Universal search across spaces, tools, students, events, and resources"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Filtered Context Search:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{size:"md",placeholder:"Filter current space...",variant:"ghost",clearable:!1,onSearch:a("filter-search"),onChange:a("filter-change")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Context-aware filtering within current space, tool library, or community"})]})]})]})]})})]})]})]})]})},h={args:{placeholder:"Search...",size:"md",variant:"default",loading:!1,clearable:!0,onSearch:a("playground-search"),onChange:a("playground-change"),onClear:a("playground-clear")},render:m=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsx(n,{children:"Search Bar Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different search configurations"})]}),e.jsx(o,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{...m}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive search testing for University at Buffalo HIVE platform interface design"})]})})]})})};var v,p,g;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search spaces, tools, and students...',
    size: 'md',
    variant: 'default',
    loading: false,
    clearable: true,
    onSearch: action('search-submitted'),
    onChange: action('search-changed'),
    onClear: action('search-cleared')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE search interface for University at Buffalo platform discovery:
          </Text>
          <SearchBar {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive search with loading states, clear functionality, and form submission
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var y,u,x;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Search Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🔍 SEARCH VARIANTS</Badge>
            Visual Variant Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 search bar variants for different University at Buffalo HIVE platform interface contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Standard):</Text>
                  <SearchBar placeholder="Search CSE 331 study groups..." variant="primary" onSearch={action('default-search')} onChange={action('default-change')} />
                  <Text variant="body-xs" color="secondary">
                    Standard search for main platform areas - space discovery, tool marketplace, profile search
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Subtle):</Text>
                  <SearchBar placeholder="Quick search..." variant="ghost" onSearch={action('ghost-search')} onChange={action('ghost-change')} />
                  <Text variant="body-xs" color="secondary">
                    Subtle search for embedded contexts, widget search, secondary navigation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Filled (Prominent):</Text>
                  <SearchBar placeholder="Find your next study partner..." variant="filled" onSearch={action('filled-search')} onChange={action('filled-change')} />
                  <Text variant="body-xs" color="secondary">
                    Prominent search for hero sections, onboarding flows, feature discovery
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Search Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SEARCH SIZES</Badge>
            Size Variations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 search bar sizes for different interface densities and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <SearchBar size="sm" placeholder="Search tools..." onSearch={action('small-search')} onChange={action('small-change')} />
                  <Text variant="body-xs" color="secondary">
                    Compact search for toolbars, widget headers, secondary navigation areas
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <SearchBar size="md" placeholder="Search spaces and communities..." onSearch={action('medium-search')} onChange={action('medium-change')} />
                  <Text variant="body-xs" color="secondary">
                    Standard search for main content areas, space discovery, profile browsing
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <SearchBar size="lg" placeholder="What are you looking for at UB?" onSearch={action('large-search')} onChange={action('large-change')} />
                  <Text variant="body-xs" color="secondary">
                    Large search for hero sections, landing pages, primary platform entry points
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE STATES</Badge>
            Search States and Functionality
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive search features for user feedback and enhanced functionality
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading State:</Text>
                  <SearchBar placeholder="Searching campus spaces..." loading={true} onSearch={action('loading-search')} onChange={action('loading-change')} />
                  <Text variant="body-xs" color="secondary">
                    Loading state with spinner for async search operations and API calls
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Clearable Input:</Text>
                  <SearchBar placeholder="Search UB students..." value="Sarah Chen Computer Science" clearable={true} onSearch={action('clearable-search')} onChange={action('clearable-change')} onClear={action('clearable-clear')} />
                  <Text variant="body-xs" color="secondary">
                    Clear button appears when text is entered, provides quick reset functionality
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Non-Clearable:</Text>
                  <SearchBar placeholder="Filter current results..." clearable={false} onSearch={action('non-clearable-search')} onChange={action('non-clearable-change')} />
                  <Text variant="body-xs" color="secondary">
                    Search without clear button for contexts where clearing isn't appropriate
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Search Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Search usage in actual University at Buffalo student discovery and navigation contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Discovery & Study Partner Search:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 Algorithm Analysis Study Group Formation
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Partner Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar placeholder="Find CSE 331 study partners..." size="md" variant="primary" onSearch={action('study-partner-search')} onChange={action('study-partner-change')} />
                      <Text variant="body-xs" color="secondary">
                        Search for classmates taking Algorithm Analysis, filter by availability and study preferences
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Resource Discovery:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar placeholder="Algorithm study tools and guides..." size="md" variant="filled" onSearch={action('resource-search')} onChange={action('resource-change')} />
                      <Text variant="body-xs" color="secondary">
                        Find study tools, practice problems, and community-created resources for computer science courses
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Campus Community Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Community & Space Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">University Spaces:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar size="sm" placeholder="Computer Science spaces..." variant="ghost" onSearch={action('university-search')} onChange={action('university-change')} />
                    <Text variant="body-xs" color="secondary">
                      Find official academic spaces, department communities, course-specific groups
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar size="sm" placeholder="Ellicott Complex activities..." variant="ghost" onSearch={action('residential-search')} onChange={action('residential-change')} />
                    <Text variant="body-xs" color="secondary">
                      Discover dorm communities, floor activities, residential life events and coordination
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Organizations:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar size="sm" placeholder="Programming clubs..." variant="ghost" onSearch={action('organization-search')} onChange={action('organization-change')} />
                    <Text variant="body-xs" color="secondary">
                      Find student clubs, interest groups, professional organizations, and social communities
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Tool Marketplace */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Tool Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Tools:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar placeholder="GPA calculator, study scheduler..." size="md" variant="primary" onSearch={action('academic-tools-search')} onChange={action('academic-tools-change')} />
                    <Text variant="body-xs" color="secondary">
                      Find productivity tools for academic success, grade tracking, assignment management
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Coordination Tools:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar placeholder="Event planner, group chat..." size="md" variant="primary" onSearch={action('social-tools-search')} onChange={action('social-tools-change')} />
                    <Text variant="body-xs" color="secondary">
                      Discover tools for event coordination, group communication, community building
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Campus Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized search for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Campus Search:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar size="lg" placeholder="Find dining, libraries, events..." variant="filled" onSearch={action('mobile-campus-search')} onChange={action('mobile-campus-change')} />
                    <Text variant="body-xs" color="secondary">
                      Large search interface for mobile discovery while walking around campus
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Space Finder:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar size="lg" placeholder="Lockwood Library study rooms..." variant="filled" loading={true} onSearch={action('study-space-search')} onChange={action('study-space-change')} />
                    <Text variant="body-xs" color="secondary">
                      Location-aware search for available study spaces, quiet areas, collaborative zones
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Search Result Integration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Search Integration Contexts:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Platform-Wide Search Functionality
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Global Platform Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar size="lg" placeholder="Search everything at UB..." variant="filled" onSearch={action('global-search')} onChange={action('global-change')} />
                      <Text variant="body-xs" color="secondary">
                        Universal search across spaces, tools, students, events, and resources
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Filtered Context Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar size="md" placeholder="Filter current space..." variant="ghost" clearable={false} onSearch={action('filter-search')} onChange={action('filter-change')} />
                      <Text variant="body-xs" color="secondary">
                        Context-aware filtering within current space, tool library, or community
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(x=(u=l.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var b,f,S;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    size: 'md',
    variant: 'default',
    loading: false,
    clearable: true,
    onSearch: action('playground-search'),
    onChange: action('playground-change'),
    onClear: action('playground-clear')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Search Bar Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different search configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <SearchBar {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive search testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(S=(f=h.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};const V=["Default","CompleteShowcase","Playground"];export{l as CompleteShowcase,t as Default,h as Playground,V as __namedExportsOrder,H as default};
