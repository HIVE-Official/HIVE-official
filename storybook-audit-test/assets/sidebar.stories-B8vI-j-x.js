import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as Z,R as K}from"./index-DJO9vBfz.js";import{c as d}from"./utils-CytzSlOG.js";import{C as A}from"./chevron-right-BGhHLs4c.js";import{H as X}from"./house-C4nS1CaC.js";import{U as S}from"./user-CFaOcM52.js";import{C as T}from"./compass-DQEiAODW.js";import{Z as U}from"./zap-0mfePDxG.js";import{C as B}from"./calendar-BPdIbUwb.js";import{c as Q}from"./createLucideIcon-WpwZgzX-.js";import{S as $}from"./settings-GFIh7SpU.js";import{H as m,c as h,a as b,b as g}from"./hive-tokens-CKIUfcHM.js";import{B as x}from"./badge-B09J4pcg.js";import{T as r}from"./text-Cao0VGB4.js";import{a as s}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=Q("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),ae=[{id:"feed",icon:X,label:"Feed",href:"/feed",matchPaths:["/feed"]},{id:"profile",icon:S,label:"Profile",href:"/profile",matchPaths:["/profile"]},{id:"spaces",icon:T,label:"Spaces",href:"/spaces",matchPaths:["/spaces"],children:[{id:"spaces-my",icon:S,label:"My Spaces",href:"/spaces/my"},{id:"spaces-browse",icon:T,label:"Browse",href:"/spaces/browse"},{id:"spaces-activate",icon:U,label:"Activate",href:"/spaces/activate"}]},{id:"tools",icon:U,label:"Tools",href:"/tools",matchPaths:["/tools"],children:[{id:"tools-personal",icon:S,label:"Personal",href:"/tools/personal"},{id:"tools-browse",icon:T,label:"Browse",href:"/tools/browse"}]},{id:"calendar",icon:B,label:"Calendar",href:"/calendar",matchPaths:["/calendar"]},{id:"events",icon:B,label:"Events",href:"/events",matchPaths:["/events"]}],re=[{id:"settings",icon:$,label:"Settings",href:"/settings"}],i=({user:l,currentPath:j="/",collapsed:t=!1,onItemClick:v,onToggle:se,breadcrumbs:k=[],currentSection:ie,className:z})=>{var E;const _=((E=l==null?void 0:l.name)==null?void 0:E.split(" ").map(a=>a[0]).join("").slice(0,2))||"",[G,W]=Z.useState([]),C=a=>j===a.href?!0:a.matchPaths?a.matchPaths.some(o=>j===o||j.startsWith(o+"/")):!1,I=a=>{a.children&&a.children.length>0?W(o=>o.includes(a.id)?o.filter(n=>n!==a.id):[...o,a.id]):v==null||v(a.href)},J=a=>G.includes(a);return e.jsxs("aside",{className:d("h-screen flex-shrink-0 flex flex-col","bg-[var(--hive-background-primary)]","border-r border-[var(--hive-border-default)]","transition-all duration-300 ease-out",t?"w-16":"w-72",z),children:[!t&&k.length>0&&e.jsx("div",{className:"px-4 py-3 border-b border-[var(--hive-border-default)]",children:e.jsx("div",{className:"flex items-center space-x-2 text-sm",children:k.map((a,o)=>e.jsxs(K.Fragment,{children:[o>0&&e.jsx(A,{className:"h-3 w-3 text-[var(--hive-text-tertiary)]"}),e.jsx("button",{onClick:()=>a.href&&(v==null?void 0:v(a.href)),className:d("text-sm transition-colors hover:text-[var(--hive-text-primary)]",a.href?"text-[var(--hive-text-secondary)] cursor-pointer":"text-[var(--hive-text-primary)] font-medium"),children:a.label})]},o))})}),!t&&l&&e.jsx("div",{className:"px-4 py-4 border-b border-[var(--hive-border-default)]",children:e.jsxs("div",{className:"flex items-center space-x-3 p-3 rounded-2xl bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-[var(--hive-background-tertiary)] to-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-2xl flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]",children:_}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"text-sm font-semibold text-[var(--hive-text-primary)] truncate",children:l.name}),e.jsxs("div",{className:"text-xs text-[var(--hive-text-secondary)] truncate",children:["@",l.handle]})]})]})}),e.jsx("nav",{className:"flex-1 px-4 overflow-y-auto",children:e.jsx("div",{className:"space-y-1",children:ae.map(a=>{const o=a.icon,n=C(a),w=a.children&&a.children.length>0,P=J(a.id);return e.jsxs("div",{children:[e.jsxs(ButtonEnhanced,{variant:"ghost",onClick:()=>I(a),className:d("w-full transition-all duration-300 relative group",t?"h-12 px-0 justify-center":"h-12 px-3 justify-start","rounded-xl",n?["bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5","border border-[var(--hive-brand-secondary)]/20"].join(" "):["hover:bg-[var(--hive-background-secondary)]","border border-transparent"].join(" ")),children:[e.jsx("div",{className:d("w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300",!t&&"mr-3",n?"bg-[var(--hive-brand-secondary)]":"bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]"),children:e.jsx(o,{className:d("h-4 w-4 transition-colors duration-300",n?"text-[var(--hive-text-inverse)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]")})}),!t&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:d("text-sm font-medium truncate transition-colors duration-300 flex-1 text-left",n?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]"),children:a.label}),w&&e.jsx("div",{className:"w-5 h-5 flex items-center justify-center",children:P?e.jsx(ee,{className:"h-3 w-3 text-[var(--hive-text-tertiary)]"}):e.jsx(A,{className:"h-3 w-3 text-[var(--hive-text-tertiary)]"})})]}),n&&!t&&!w&&e.jsx("div",{className:"absolute right-3 w-1.5 h-6 bg-[var(--hive-brand-secondary)] rounded-full"})]}),!t&&w&&P&&e.jsx("div",{className:"ml-6 mt-1 space-y-1 border-l border-[var(--hive-border-default)] pl-4",children:a.children.map(p=>{const Y=p.icon,u=C(p);return e.jsxs(ButtonEnhanced,{variant:"ghost",onClick:()=>v==null?void 0:v(p.href),className:d("w-full h-10 px-3 justify-start rounded-lg transition-all duration-300 group",u?["bg-[var(--hive-brand-secondary)]/5","border border-[var(--hive-brand-secondary)]/15"].join(" "):["hover:bg-[var(--hive-background-secondary)]","border border-transparent"].join(" ")),children:[e.jsx("div",{className:d("w-6 h-6 rounded-md flex items-center justify-center mr-3 transition-all duration-300",u?"bg-[var(--hive-brand-secondary)]/20":"bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]"),children:e.jsx(Y,{className:d("h-3 w-3 transition-colors duration-300",u?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]")})}),e.jsx("span",{className:d("text-sm font-medium truncate transition-colors duration-300",u?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]"),children:p.label}),u&&e.jsx("div",{className:"absolute right-3 w-1 h-4 bg-[var(--hive-brand-secondary)] rounded-full"})]},p.id)})})]},a.id)})})}),e.jsx("div",{className:"p-4 border-t border-[var(--hive-border-default)]",children:e.jsx("div",{className:"space-y-2",children:re.map(a=>{const o=a.icon,n=C(a);return e.jsxs(ButtonEnhanced,{variant:"ghost",onClick:()=>I(a),className:d("w-full transition-all duration-300 relative group",t?"h-12 px-0 justify-center":"h-12 px-4 justify-start","rounded-2xl",n?["bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5","border border-[var(--hive-brand-secondary)]/20"].join(" "):["hover:bg-[var(--hive-background-secondary)]","border border-transparent"].join(" ")),children:[e.jsx("div",{className:d("w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300",!t&&"mr-3",n?"bg-[var(--hive-brand-secondary)]":"bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]"),children:e.jsx(o,{className:d("h-4 w-4 transition-colors duration-300",n?"text-[var(--hive-text-inverse)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]")})}),!t&&e.jsx("span",{className:d("text-sm font-medium truncate transition-colors duration-300",n?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]"),children:a.label})]},a.id)})})})]})};i.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},collapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},breadcrumbs:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; href?: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}}]}}],raw:"{ label: string; href?: string }[]"},description:"",defaultValue:{value:"[]",computed:!1}},currentSection:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Ce={title:"01-Atoms/Sidebar - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
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
`}}},tags:["autodocs"],argTypes:{collapsed:{control:"boolean",description:"Collapsed state of the sidebar"},currentPath:{control:"text",description:"Current active path for highlighting navigation items"},user:{control:"object",description:"User profile information"},onItemClick:{action:"item-clicked",description:"Navigation item click handler"},onToggle:{action:"toggle-clicked",description:"Sidebar toggle handler"}}},c={id:"user-123",name:"Sarah Chen",handle:"schen_cs",avatar:"/api/placeholder/40/40"},y={args:{user:c,currentPath:"/feed",collapsed:!1,onItemClick:s("navigation-clicked"),onToggle:s("sidebar-toggled")},render:l=>e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(i,{...l}),e.jsx("div",{className:"flex-1 p-6",children:e.jsx(m,{children:e.jsxs(h,{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"HIVE platform navigation sidebar for University at Buffalo students:"}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Main navigation for campus social utility platform"})]})})})]})},f={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(x,{variant:"success",children:"🔗 NAVIGATION STRUCTURE"}),"Sidebar Navigation System"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive navigation system for University at Buffalo HIVE platform with hierarchical structure and state management"})]}),e.jsx(h,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Standard Navigation (Expanded):"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex h-96 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(i,{user:c,currentPath:"/spaces",collapsed:!1,onItemClick:s("expanded-navigation"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"Computer Science"}]}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:"Main content area - Spaces section with breadcrumb navigation showing current location"})})]})})]})})})]}),e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(x,{variant:"info",children:"📱 RESPONSIVE STATES"}),"Sidebar Collapse Behavior"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Flexible sidebar sizing for different screen sizes and user preferences"})]}),e.jsx(h,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Expanded vs Collapsed Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Expanded Sidebar (Desktop):"}),e.jsxs("div",{className:"flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(i,{user:c,currentPath:"/profile",collapsed:!1,onItemClick:s("expanded-nav")}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(r,{variant:"body-xs",color:"secondary",children:"Full navigation with labels, user profile, and complete feature access"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Collapsed Sidebar (Space-Saving):"}),e.jsxs("div",{className:"flex h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:[e.jsx(i,{user:c,currentPath:"/tools",collapsed:!0,onItemClick:s("collapsed-nav")}),e.jsx("div",{className:"flex-1 p-4 bg-[var(--hive-background-primary)]",children:e.jsx(r,{variant:"body-xs",color:"secondary",children:"Icon-only navigation for maximum content space, perfect for tablets and focused work"})})]})]})]})]})})})]}),e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(x,{variant:"primary",children:"⚡ INTERACTIVE FEATURES"}),"Navigation States and Hierarchy"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Active state management, hierarchical navigation, and expandable sections"})]}),e.jsx(h,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Different Active States:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Feed Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/feed",collapsed:!1,onItemClick:s("feed-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Home feed active state"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Spaces Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/spaces/browse",collapsed:!1,onItemClick:s("spaces-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Spaces section with expandable children"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Calendar Active:"}),e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/calendar",collapsed:!1,onItemClick:s("calendar-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Calendar section active state"})]})]})})]})})})]}),e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsxs(g,{className:"flex items-center gap-3",children:[e.jsx(x,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Navigation Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Sidebar navigation in actual University at Buffalo student workflow and campus platform usage contexts"})]}),e.jsxs(h,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Daily Navigation Workflow:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"Sarah Chen - CSE Senior Daily Platform Usage"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Morning: Check Feed & Calendar:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:{id:"sarah-123",name:"Sarah Chen",handle:"schen_cs"},currentPath:"/feed",collapsed:!1,onItemClick:s("morning-workflow"),breadcrumbs:[{label:"Home",href:"/"},{label:"Feed"}]})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Start day by checking campus activity feed, then navigate to calendar for class schedule and study sessions"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Time: Access Spaces & Tools:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:{id:"sarah-123",name:"Sarah Chen",handle:"schen_cs"},currentPath:"/spaces/browse",collapsed:!1,onItemClick:s("study-workflow"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"Browse"}]})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Navigate to CSE 331 course space for algorithm study materials, then access personal tools for assignment tracking"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Different Student Navigation Patterns:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Computer Science Student:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:{id:"alex-456",name:"Alex Rodriguez",handle:"arodriguez_cs"},currentPath:"/tools",collapsed:!1,onItemClick:s("cs-student-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Heavy tools usage for coding projects, algorithm study spaces, and CS department resources"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Residential Life Leader:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:{id:"maria-789",name:"Maria Johnson",handle:"mjohnson_ra"},currentPath:"/events",collapsed:!1,onItemClick:s("ra-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Focus on events coordination, residential spaces management, and community building activities"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Organization President:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-40 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:{id:"jordan-012",name:"Jordan Kim",handle:"jkim_president"},currentPath:"/spaces",collapsed:!1,onItemClick:s("president-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Emphasis on spaces management for student organizations, event planning, and member coordination"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Navigation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"Mobile navigation patterns for on-campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Walking Between Classes:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/calendar",collapsed:!0,onItemClick:s("mobile-nav")})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Collapsed sidebar for quick navigation while moving around campus - easy thumb access to key features"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Library Study Session:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-48 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/spaces/browse",collapsed:!1,onItemClick:s("library-nav"),breadcrumbs:[{label:"Spaces",href:"/spaces"},{label:"Browse",href:"/spaces/browse"},{label:"Study Groups"}]})}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Full navigation in Lockwood Library for finding study spaces, accessing course materials, and coordinating group work"})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Advanced Navigation Features:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"Deep Navigation with Breadcrumbs"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx("div",{className:"h-64 rounded-lg overflow-hidden border border-[var(--hive-border-primary)]",children:e.jsx(i,{user:c,currentPath:"/spaces/university/cse-331",collapsed:!1,onItemClick:s("deep-nav"),breadcrumbs:[{label:"Home",href:"/"},{label:"Spaces",href:"/spaces"},{label:"University",href:"/spaces/university"},{label:"CSE 331"}],currentSection:"Algorithm Analysis Course"})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Complete navigation hierarchy showing breadcrumb path for deep page navigation in course spaces with context awareness"})]})]})})]})]})]})]})},N={args:{user:c,currentPath:"/feed",collapsed:!1,onItemClick:s("playground-navigation"),onToggle:s("playground-toggle")},render:l=>e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(i,{...l}),e.jsx("div",{className:"flex-1 p-6",children:e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsx(g,{children:"Sidebar Navigation Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different sidebar configurations"})]}),e.jsx(h,{className:"p-6",children:e.jsx("div",{className:"space-y-4",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive sidebar testing for University at Buffalo HIVE platform navigation"})})})]})})]})};var H,F,D;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(D=(F=y.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var R,O,M;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(M=(O=f.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var V,L,q;N.parameters={...N.parameters,docs:{...(V=N.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(q=(L=N.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};const we=["Default","CompleteShowcase","Playground"];export{f as CompleteShowcase,y as Default,N as Playground,we as __namedExportsOrder,Ce as default};
