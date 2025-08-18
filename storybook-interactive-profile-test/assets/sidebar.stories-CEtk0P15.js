import{j as e}from"./jsx-runtime-B9GTzLod.js";import{S as s}from"./sidebar-dkUoXBgR.js";import{H as d,c as o,a as n,b as t}from"./hive-card-DIMxrd4t.js";import{B as c}from"./badge-BLajwy0n.js";import{T as a}from"./text-BOe2XosQ.js";import{a as r}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";/* empty css                    */import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./button-DXaHCZ7Q.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./loader-circle-C0fUCed1.js";import"./createLucideIcon-DtX30ipI.js";import"./chevron-right-CIwutkFF.js";import"./house-Bg02DBcS.js";import"./user-DLkx1tbP.js";import"./compass-Cz07JEQ8.js";import"./zap-BzDMfB1h.js";import"./calendar-RwBiWFlj.js";import"./chevron-down-BBJuCIzE.js";import"./settings-Cw08DGvz.js";import"./index-BwobEAja.js";import"./v4-CtRu48qb.js";const W={title:"01-Atoms/Sidebar - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🔗 HIVE Sidebar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive navigation sidebar system for University at Buffalo HIVE platform main navigation and user interface.

### 🎯 **COMPONENT EXCELLENCE**
- **Hierarchical Navigation** - Support for parent items with expandable children for complex navigation structures
- **Collapsible Design** - Full and collapsed states for flexible layout management
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors, backgrounds, and borders
- **Active State Management** - Smart path matching and visual indicators for current page/section
- **User Profile Integration** - Embedded user profile display with avatar and handle
- **Breadcrumb Support** - Optional breadcrumb navigation for deep page hierarchies
- **Smooth Animations** - Transition effects for expanding/collapsing and hover states
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and focus management
- **Campus Navigation** - Built for University at Buffalo student platform navigation

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform navigation:
- **Feed Navigation** - Central social feed for campus activity and updates
- **Profile Management** - Personal profile, analytics, settings, and customization
- **Space Discovery** - Browse university, residential, Greek, and student spaces
- **Tool Ecosystem** - Personal tools, browse marketplace, and platform utilities
- **Calendar Integration** - Academic calendar, events, and scheduling
- **Campus Events** - University events, organization activities, and social gatherings
- **Settings & Preferences** - Account settings, privacy controls, and platform configuration

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Design** - Adaptive sidebar behavior for different screen sizes
- **Touch-Friendly** - Appropriate spacing and interaction areas for mobile
- **Collapsible Navigation** - Space-efficient collapsed mode for smaller screens
- **Clear Visual Hierarchy** - Easy navigation recognition on mobile devices
`}}},tags:["autodocs"],argTypes:{collapsed:{control:"boolean",description:"Collapsed state of the sidebar"},currentPath:{control:"text",description:"Current active path for highlighting navigation items"},user:{control:"object",description:"User profile information"},onItemClick:{action:"item-clicked",description:"Navigation item click handler"},onToggle:{action:"toggle-clicked",description:"Sidebar toggle handler"}}},i={id:"user-123",name:"Sarah Chen",handle:"schen_cs",avatar:"/api/placeholder/40/40"},l={args:{user:i,currentPath:"/feed",collapsed:!1,onItemClick:r("navigation-clicked"),onToggle:r("sidebar-toggled")},render:p=>e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(s,{...p}),e.jsx("div",{className:"flex-1 p-6",children:e.jsx(d,{children:e.jsxs(o,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"HIVE platform navigation sidebar for University at Buffalo students:"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Main navigation for campus social utility platform"})]})})})]})},v={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(d,{children:[e.jsxs(n,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"success",children:"🔗 NAVIGATION STRUCTURE"}),"Sidebar Navigation System"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive navigation system for University at Buffalo HIVE platform with hierarchical structure and state management"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Standard Navigation (Expanded):"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex h-96 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(s,{user:i,currentPath:"/spaces",collapsed:!1,onItemClick:r("expanded-navigation"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"Computer Science"}]}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(a,{variant:"body-sm",color:"secondary",children:"Main content area - Spaces section with breadcrumb navigation showing current location"})})]})})]})})})]}),e.jsxs(d,{children:[e.jsxs(n,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"info",children:"📱 RESPONSIVE STATES"}),"Sidebar Collapse Behavior"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Flexible sidebar sizing for different screen sizes and user preferences"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Expanded vs Collapsed Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Expanded Sidebar (Desktop):"}),e.jsxs("div",{className:"flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(s,{user:i,currentPath:"/profile",collapsed:!1,onItemClick:r("expanded-nav")}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"Full navigation with labels, user profile, and complete feature access"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Collapsed Sidebar (Space-Saving):"}),e.jsxs("div",{className:"flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(s,{user:i,currentPath:"/tools",collapsed:!0,onItemClick:r("collapsed-nav")}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(a,{variant:"body-xs",color:"secondary",children:"Icon-only navigation for maximum content space, perfect for tablets and focused work"})})]})]})]})]})})})]}),e.jsxs(d,{children:[e.jsxs(n,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"⚡ INTERACTIVE FEATURES"}),"Navigation States and Hierarchy"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Active state management, hierarchical navigation, and expandable sections"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Different Active States:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Feed Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/feed",collapsed:!1,onItemClick:r("feed-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Home feed active state"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Spaces Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/spaces/browse",collapsed:!1,onItemClick:r("spaces-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Spaces section with expandable children"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Calendar Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/calendar",collapsed:!1,onItemClick:r("calendar-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Calendar section active state"})]})]})})]})})})]}),e.jsxs(d,{children:[e.jsxs(n,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Navigation Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Sidebar navigation in actual University at Buffalo student workflow and campus platform usage contexts"})]}),e.jsxs(o,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Daily Navigation Workflow:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Sarah Chen - CSE Senior Daily Platform Usage"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Morning: Check Feed & Calendar:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:{id:"sarah-123",name:"Sarah Chen",handle:"schen_cs"},currentPath:"/feed",collapsed:!1,onItemClick:r("morning-workflow"),breadcrumbs:[{label:"Home",href:"/"},{label:"Feed"}]})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Start day by checking campus activity feed, then navigate to calendar for class schedule and study sessions"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Time: Access Spaces & Tools:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:{id:"sarah-123",name:"Sarah Chen",handle:"schen_cs"},currentPath:"/spaces/browse",collapsed:!1,onItemClick:r("study-workflow"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"Browse"}]})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Navigate to CSE 331 course space for algorithm study materials, then access personal tools for assignment tracking"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Different Student Navigation Patterns:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Computer Science Student:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:{id:"alex-456",name:"Alex Rodriguez",handle:"arodriguez_cs"},currentPath:"/tools",collapsed:!1,onItemClick:r("cs-student-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Heavy tools usage for coding projects, algorithm study spaces, and CS department resources"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Residential Life Leader:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:{id:"maria-789",name:"Maria Johnson",handle:"mjohnson_ra"},currentPath:"/events",collapsed:!1,onItemClick:r("ra-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Focus on events coordination, residential spaces management, and community building activities"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Organization President:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:{id:"jordan-012",name:"Jordan Kim",handle:"jkim_president"},currentPath:"/spaces",collapsed:!1,onItemClick:r("president-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Emphasis on spaces management for student organizations, event planning, and member coordination"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Navigation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Mobile navigation patterns for on-campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Walking Between Classes:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/calendar",collapsed:!0,onItemClick:r("mobile-nav")})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Collapsed sidebar for quick navigation while moving around campus - easy thumb access to key features"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Library Study Session:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/spaces/browse",collapsed:!1,onItemClick:r("library-nav"),breadcrumbs:[{label:"Spaces",href:"/spaces"},{label:"Browse",href:"/spaces/browse"},{label:"Study Groups"}]})}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Full navigation in Lockwood Library for finding study spaces, accessing course materials, and coordinating group work"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Advanced Navigation Features:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Deep Navigation with Breadcrumbs"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(s,{user:i,currentPath:"/spaces/university/cse-331",collapsed:!1,onItemClick:r("deep-nav"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"University",href:"/spaces/university"},{label:"CSE 331"}],currentSection:"Algorithm Analysis Course"})}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Complete navigation hierarchy showing breadcrumb path for deep page navigation in course spaces with context awareness"})]})]})})]})]})]})]})},m={args:{user:i,currentPath:"/feed",collapsed:!1,onItemClick:r("playground-navigation"),onToggle:r("playground-toggle")},render:p=>e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(s,{...p}),e.jsx("div",{className:"flex-1 p-6",children:e.jsxs(d,{children:[e.jsxs(n,{children:[e.jsx(t,{children:"Sidebar Navigation Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different sidebar configurations"})]}),e.jsx(o,{className:"p-6",children:e.jsx("div",{className:"space-y-4",children:e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive sidebar testing for University at Buffalo HIVE platform navigation"})})})]})})]})};var h,g,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    currentPath: '/feed',
    collapsed: false,
    onItemClick: action('navigation-clicked'),
    onToggle: action('sidebar-toggled')
  },
  render: args => <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <Sidebar {...args} />
      <div className="flex-1 p-6">
        <Card>
          <CardContent className="space-y-4">
            <Text variant="body-md" color="primary">
              HIVE platform navigation sidebar for University at Buffalo students:
            </Text>
            <Text variant="body-sm" color="secondary">
              Main navigation for campus social utility platform
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
}`,...(b=(g=l.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var u,y,x;v.parameters={...v.parameters,docs:{...(u=v.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Navigation Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🔗 NAVIGATION STRUCTURE</Badge>
            Sidebar Navigation System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive navigation system for University at Buffalo HIVE platform with hierarchical structure and state management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Navigation (Expanded):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex h-96 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                  <Sidebar user={sampleUser} currentPath="/spaces" collapsed={false} onItemClick={action('expanded-navigation')} breadcrumbs={[{
                  label: 'Home',
                  href: '/'
                }, {
                  label: 'Spaces',
                  href: '/spaces'
                }, {
                  label: 'Computer Science'
                }]} />
                  <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                    <Text variant="body-sm" color="secondary">
                      Main content area - Spaces section with breadcrumb navigation showing current location
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Collapsed vs Expanded States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📱 RESPONSIVE STATES</Badge>
            Sidebar Collapse Behavior
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Flexible sidebar sizing for different screen sizes and user preferences
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Expanded vs Collapsed Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Expanded Sidebar (Desktop):</Text>
                  <div className="flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar user={sampleUser} currentPath="/profile" collapsed={false} onItemClick={action('expanded-nav')} />
                    <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                      <Text variant="body-xs" color="secondary">
                        Full navigation with labels, user profile, and complete feature access
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Collapsed Sidebar (Space-Saving):</Text>
                  <div className="flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar user={sampleUser} currentPath="/tools" collapsed={true} onItemClick={action('collapsed-nav')} />
                    <div className="flex-1 p-4 bg-[var(--hive-background-primary)]">
                      <Text variant="body-xs" color="secondary">
                        Icon-only navigation for maximum content space, perfect for tablets and focused work
                      </Text>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Active States and Hierarchical Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE FEATURES</Badge>
            Navigation States and Hierarchy
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Active state management, hierarchical navigation, and expandable sections
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Different Active States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-3 gap-4">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Feed Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={sampleUser} currentPath="/feed" collapsed={false} onItemClick={action('feed-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">Home feed active state</Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Spaces Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={sampleUser} currentPath="/spaces/browse" collapsed={false} onItemClick={action('spaces-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">Spaces section with expandable children</Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Calendar Active:</Text>
                    <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={sampleUser} currentPath="/calendar" collapsed={false} onItemClick={action('calendar-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">Calendar section active state</Text>
                  </div>

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
            Real Campus Navigation Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Sidebar navigation in actual University at Buffalo student workflow and campus platform usage contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Daily Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Daily Navigation Workflow:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - CSE Senior Daily Platform Usage
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Morning: Check Feed & Calendar:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                        <Sidebar user={{
                        id: 'sarah-123',
                        name: 'Sarah Chen',
                        handle: 'schen_cs'
                      }} currentPath="/feed" collapsed={false} onItemClick={action('morning-workflow')} breadcrumbs={[{
                        label: 'Home',
                        href: '/'
                      }, {
                        label: 'Feed'
                      }]} />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Start day by checking campus activity feed, then navigate to calendar for class schedule and study sessions
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Time: Access Spaces & Tools:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                        <Sidebar user={{
                        id: 'sarah-123',
                        name: 'Sarah Chen',
                        handle: 'schen_cs'
                      }} currentPath="/spaces/browse" collapsed={false} onItemClick={action('study-workflow')} breadcrumbs={[{
                        label: 'Home',
                        href: '/'
                      }, {
                        label: 'Spaces',
                        href: '/spaces'
                      }, {
                        label: 'Browse'
                      }]} />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Navigate to CSE 331 course space for algorithm study materials, then access personal tools for assignment tracking
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Different User Types Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Different Student Navigation Patterns:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Computer Science Student:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={{
                      id: 'alex-456',
                      name: 'Alex Rodriguez',
                      handle: 'arodriguez_cs'
                    }} currentPath="/tools" collapsed={false} onItemClick={action('cs-student-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Heavy tools usage for coding projects, algorithm study spaces, and CS department resources
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Life Leader:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={{
                      id: 'maria-789',
                      name: 'Maria Johnson',
                      handle: 'mjohnson_ra'
                    }} currentPath="/events" collapsed={false} onItemClick={action('ra-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Focus on events coordination, residential spaces management, and community building activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Organization President:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={{
                      id: 'jordan-012',
                      name: 'Jordan Kim',
                      handle: 'jkim_president'
                    }} currentPath="/spaces" collapsed={false} onItemClick={action('president-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Emphasis on spaces management for student organizations, event planning, and member coordination
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Navigation Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile navigation patterns for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Walking Between Classes:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={sampleUser} currentPath="/calendar" collapsed={true} onItemClick={action('mobile-nav')} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Collapsed sidebar for quick navigation while moving around campus - easy thumb access to key features
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Library Study Session:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                      <Sidebar user={sampleUser} currentPath="/spaces/browse" collapsed={false} onItemClick={action('library-nav')} breadcrumbs={[{
                      label: 'Spaces',
                      href: '/spaces'
                    }, {
                      label: 'Browse',
                      href: '/spaces/browse'
                    }, {
                      label: 'Study Groups'
                    }]} />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Full navigation in Lockwood Library for finding study spaces, accessing course materials, and coordinating group work
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Advanced Navigation Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Advanced Navigation Features:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Deep Navigation with Breadcrumbs
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                  <div className="h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]">
                    <Sidebar user={sampleUser} currentPath="/spaces/university/cse-331" collapsed={false} onItemClick={action('deep-nav')} breadcrumbs={[{
                    label: 'Home',
                    href: '/'
                  }, {
                    label: 'Spaces',
                    href: '/spaces'
                  }, {
                    label: 'University',
                    href: '/spaces/university'
                  }, {
                    label: 'CSE 331'
                  }]} currentSection="Algorithm Analysis Course" />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Complete navigation hierarchy showing breadcrumb path for deep page navigation in course spaces with context awareness
                  </Text>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(x=(y=v.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var f,N,C;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    currentPath: '/feed',
    collapsed: false,
    onItemClick: action('playground-navigation'),
    onToggle: action('playground-toggle')
  },
  render: args => <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <Sidebar {...args} />
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Sidebar Navigation Playground</CardTitle>
            <p className="text-[var(--hive-text-muted)]">
              Use the controls to test different sidebar configurations
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Text variant="body-sm" color="secondary">
                Interactive sidebar testing for University at Buffalo HIVE platform navigation
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
}`,...(C=(N=m.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};const Y=["Default","CompleteShowcase","Playground"];export{v as CompleteShowcase,l as Default,m as Playground,Y as __namedExportsOrder,W as default};
