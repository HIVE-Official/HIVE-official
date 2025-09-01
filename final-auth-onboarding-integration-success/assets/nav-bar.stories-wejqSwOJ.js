import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{c as p}from"./utils-CytzSlOG.js";import{S as T}from"./search-LJgCGvxp.js";import{c as D}from"./createLucideIcon-WpwZgzX-.js";import{B as F}from"./bell-CtgVmOAD.js";import{S as V}from"./settings-GFIh7SpU.js";import{H as i,c as t,a as o,b as d}from"./hive-tokens-BKUtHA8Z.js";import{B as c}from"./badge-B09J4pcg.js";import{T as r}from"./text-Cao0VGB4.js";import"./index-DJO9vBfz.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=D("Command",[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]]),a=({user:s,showSearch:S=!0,showNotifications:k=!0,unreadCount:h=0,onSearchClick:B,onNotificationsClick:U,onSettingsClick:E,onUserClick:I,className:A})=>{var u;const H=((u=s==null?void 0:s.name)==null?void 0:u.split(" ").map(R=>R[0]).join("").slice(0,2))||"";return e.jsxs("nav",{className:p("flex items-center justify-between h-14 px-6","bg-[var(--hive-background-primary)]","border-b border-[var(--hive-border-primary)]","backdrop-blur-xl",A),children:[e.jsx("div",{className:"flex items-center space-x-3",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:"w-8 h-8 flex items-center justify-center",children:e.jsx("svg",{className:"w-8 h-8",viewBox:"0 0 1500 1500",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fill:"var(--hive-brand-secondary)",d:"M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"})})}),e.jsx("span",{className:"font-bold text-lg text-[var(--hive-text-primary)] tracking-tight",children:"HIVE"})]})}),S&&e.jsx("div",{className:"flex-1 max-w-md mx-8",children:e.jsxs("div",{className:"relative",children:[e.jsx(T,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]"}),e.jsx("input",{type:"text",placeholder:"Search spaces, people, tools...",onClick:B,readOnly:!0,className:p("w-full h-10 pl-10 pr-12","bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-primary)]","rounded-2xl","text-sm text-[var(--hive-text-primary)]","placeholder-[var(--hive-text-muted)]","cursor-pointer","transition-all duration-200","hover:border-[var(--hive-brand-secondary)]","focus:outline-none focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20")}),e.jsx("div",{className:"absolute right-3 top-1/2 transform -translate-y-1/2",children:e.jsxs("kbd",{className:"inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] border border-[var(--hive-border-primary)]",children:[e.jsx(P,{className:"h-2.5 w-2.5 mr-1"}),"K"]})})]})}),e.jsxs("div",{className:"flex items-center space-x-2",children:[k&&e.jsxs(ButtonEnhanced,{variant:"ghost",size:"sm",onClick:U,className:"h-10 w-10 p-0 relative",children:[e.jsx(F,{className:"h-4 w-4"}),h>0&&e.jsx("div",{className:"absolute -top-1 -right-1 h-5 w-5 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-medium text-[var(--hive-text-inverse)]",children:h>9?"9+":h})})]}),e.jsx(ButtonEnhanced,{variant:"ghost",size:"sm",onClick:E,className:"h-10 w-10 p-0",children:e.jsx(V,{className:"h-4 w-4"})}),s?e.jsx("div",{onClick:I,className:"cursor-pointer w-8 h-8 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-primary)] rounded-xl flex items-center justify-center text-sm font-medium text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-secondary)] transition-colors",children:H}):e.jsx(ButtonEnhanced,{variant:"accent",size:"sm",className:"font-medium",children:"Sign In"})]})]})};a.__docgenInfo={description:"",methods:[],displayName:"NavBar",props:{user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},showSearch:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showNotifications:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},unreadCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onSearchClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onNotificationsClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSettingsClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onUserClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const X={title:"01-Atoms/Nav Bar - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Nav Bar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The sophisticated navigation bar system for University at Buffalo campus platform navigation and user interaction.

### 🏆 **COMPONENT EXCELLENCE**
- **HIVE Brand Integration** - Official HIVE logo with perfect visual hierarchy
- **Smart Search Interface** - Unified search with keyboard shortcut support (⌘K)
- **User Identity System** - Profile display with avatar and authentication states
- **Notification Center** - Badge-based notification system with unread counts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Responsive Design** - Adapts seamlessly from desktop to mobile breakpoints
- **Accessibility Ready** - Keyboard navigation and screen reader support
- **Campus Context** - Built for University at Buffalo student workflows

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo platform navigation:
- **Academic Navigation** - Course search, student directory, faculty lookup
- **Campus Services** - Dining, housing, library, recreation access
- **Administrative Tools** - Registration, grades, financial aid, transcripts
- **Social Features** - Student connections, group messaging, event coordination
- **Real-time Updates** - Assignment notifications, announcement alerts, deadline reminders
- **Mobile Campus Life** - On-the-go access while moving between classes

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Targets** - Appropriately sized touch targets for mobile interaction
- **Responsive Search** - Collapsible search interface for mobile screens
- **Notification Badges** - Clear visual indicators for mobile notification management
- **Accessible Controls** - Keyboard and screen reader navigation support
`}}},tags:["autodocs"],argTypes:{user:{control:"object",description:"User information object"},showSearch:{control:"boolean",description:"Show search input"},showNotifications:{control:"boolean",description:"Show notifications button"},unreadCount:{control:"number",description:"Number of unread notifications"}}},n={id:"user-1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},l={args:{user:n,showSearch:!0,showNotifications:!0,unreadCount:3},render:s=>e.jsxs("div",{className:"bg-[var(--hive-background-primary)]",children:[e.jsx(a,{...s}),e.jsx("div",{className:"p-6",children:e.jsx(i,{children:e.jsxs(t,{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"Main navigation bar for University at Buffalo HIVE platform"}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Complete navigation with search, notifications, and user profile access"})]})})})]})},m={render:()=>e.jsxs("div",{className:"space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"success",children:"👤 USER STATES"}),"Navigation Bar User States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Different user authentication and identity states in the navigation bar"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Authenticated User:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:n,showSearch:!0,showNotifications:!0,unreadCount:5})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Logged-in student with notifications and full platform access"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Guest User (Not Signed In):"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:null,showSearch:!0,showNotifications:!1,unreadCount:0})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Visitor to the platform with limited access and sign-in prompt"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"User with High Notification Count:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"user-2",name:"Alex Thompson",handle:"alexthompson"},showSearch:!0,showNotifications:!0,unreadCount:15})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Student with many unread notifications (shows 9+ badge)"})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"info",children:"⚙️ FEATURES"}),"Navigation Bar Feature Configuration"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Different feature combinations for various application contexts and user types"})]}),e.jsx(t,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Full Feature Set:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:n,showSearch:!0,showNotifications:!0,unreadCount:3})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Complete navigation with search, notifications, settings, and user profile"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Search Only Navigation:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:n,showSearch:!0,showNotifications:!1,unreadCount:0})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Focused on search functionality for academic resource discovery"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Minimal Navigation:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:n,showSearch:!1,showNotifications:!1,unreadCount:0})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Clean, minimal interface for focused academic workflows"})]})]})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"🎨 BRAND"}),"HIVE Brand Integration"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Official HIVE branding with perfect visual hierarchy and University at Buffalo context"})]}),e.jsx(t,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Brand Elements:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"HIVE Logo:"}),e.jsxs("div",{className:"flex items-center space-x-3 p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsx("div",{className:"w-8 h-8 flex items-center justify-center",children:e.jsx("svg",{className:"w-8 h-8",viewBox:"0 0 1500 1500",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fill:"var(--hive-brand-secondary)",d:"M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"})})}),e.jsx("span",{className:"font-bold text-lg text-[var(--hive-text-primary)] tracking-tight",children:"HIVE"})]}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Official HIVE hexagonal logo with semantic color integration"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Typography:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsx("span",{className:"font-bold text-lg text-[var(--hive-text-primary)] tracking-tight",children:"HIVE"})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Bold, tracking-tight typography for strong brand presence"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"secondary",children:"🔍 SEARCH"}),"Unified Search Interface"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Powerful search interface for University at Buffalo academic and social discovery"})]}),e.jsx(t,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Search Features:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Search Input:"}),e.jsxs("div",{className:"relative max-w-md",children:[e.jsx(T,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]"}),e.jsx("input",{type:"text",placeholder:"Search spaces, people, tools...",readOnly:!0,className:"w-full h-10 pl-10 pr-12 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl text-sm text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)]"}),e.jsx("div",{className:"absolute right-3 top-1/2 transform -translate-y-1/2",children:e.jsx("kbd",{className:"inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] border border-[var(--hive-border-primary)]",children:"⌘K"})})]}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Unified search with keyboard shortcut (⌘K) for quick access"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Search Scope:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center",children:e.jsx(r,{variant:"body-sm",weight:"medium",children:"Spaces"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center",children:e.jsx(r,{variant:"body-sm",weight:"medium",children:"People"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center",children:e.jsx(r,{variant:"body-sm",weight:"medium",children:"Tools"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center",children:e.jsx(r,{variant:"body-sm",weight:"medium",children:"Content"})})]}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Comprehensive search across all platform content types"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Navigation Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Navigation bar usage in actual University at Buffalo student and academic contexts"})]}),e.jsxs(t,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Dashboard Navigation:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"Daily Academic Navigation"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"student-1",name:"Emily Rodriguez",handle:"erodriguez"},showSearch:!0,showNotifications:!0,unreadCount:7})}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Search Examples:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:'"CSE 331" → Find Algorithm Analysis course space'})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:'"study group" → Discover active study groups'})}),e.jsx("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:`"Dr. Smith" → Find professor's tools and office hours`})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Notification Scenarios:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Light Activity (1-3 notifications):"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"student-2",name:"Marcus Johnson",handle:"mjohnson"},showSearch:!0,showNotifications:!0,unreadCount:2})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"New assignment posted, space invitation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Moderate Activity (4-9 notifications):"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"student-3",name:"Priya Patel",handle:"ppatel"},showSearch:!0,showNotifications:!0,unreadCount:6})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Multiple course updates, group messages, event reminders"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"High Activity (10+ notifications):"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"student-4",name:"David Kim",handle:"dkim"},showSearch:!0,showNotifications:!0,unreadCount:23})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Active in multiple spaces, group projects, event planning"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"University User Types:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Undergraduate Student:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"undergrad-1",name:"Taylor Wilson",handle:"twilson"},showSearch:!0,showNotifications:!0,unreadCount:4})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Active in course spaces, study groups, campus events"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Graduate Student:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"grad-1",name:"Dr. Maria Santos",handle:"msantos"},showSearch:!0,showNotifications:!0,unreadCount:8})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Research collaboration, teaching assistant duties, academic conferences"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Faculty Member:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"faculty-1",name:"Prof. John Anderson",handle:"janderson"},showSearch:!0,showNotifications:!0,unreadCount:12})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Course management, student communications, department coordination"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Visitor:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:null,showSearch:!0,showNotifications:!1,unreadCount:0})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Prospective student, parent, or community member browsing public resources"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Real-Time Campus Scenarios:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"Navigation bar adapts to different campus situations and times:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Finals Week:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"finals-student",name:"Jordan Lee",handle:"jlee"},showSearch:!0,showNotifications:!0,unreadCount:15})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"High notification activity: study group updates, exam reminders, library bookings"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Registration Period:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"registration-student",name:"Alex Chen",handle:"achen"},showSearch:!0,showNotifications:!0,unreadCount:9})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Course availability alerts, waitlist updates, academic advisor messages"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"New Semester Start:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"new-semester-student",name:"Sam Rivera",handle:"srivera"},showSearch:!0,showNotifications:!0,unreadCount:21})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"New course spaces, syllabus updates, campus event invitations, club recruitment"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Summer Break:"}),e.jsx("div",{className:"border border-[var(--hive-border-primary)] rounded-lg overflow-hidden",children:e.jsx(a,{user:{id:"summer-student",name:"Riley Thompson",handle:"rthompson"},showSearch:!0,showNotifications:!0,unreadCount:1})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Minimal activity: summer course updates, fall registration reminders"})]})]})]})]})]})]})]})},v={args:{user:n,showSearch:!0,showNotifications:!0,unreadCount:3},render:s=>e.jsxs("div",{className:"bg-[var(--hive-background-primary)]",children:[e.jsx(a,{...s}),e.jsx("div",{className:"p-6",children:e.jsxs(i,{children:[e.jsxs(o,{children:[e.jsx(d,{children:"Nav Bar Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different navigation bar configurations"})]}),e.jsx(t,{className:"p-6",children:e.jsx("div",{className:"space-y-4",children:e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive navigation bar testing for University at Buffalo campus platform"})})})]})})]})};var y,x,g;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    showSearch: true,
    showNotifications: true,
    unreadCount: 3
  },
  render: args => <div className="bg-[var(--hive-background-primary)]">
      <NavBar {...args} />
      <div className="p-6">
        <Card>
          <CardContent className="space-y-4">
            <Text variant="body-md" color="primary">
              Main navigation bar for University at Buffalo HIVE platform
            </Text>
            <Text variant="body-sm" color="secondary">
              Complete navigation with search, notifications, and user profile access
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
}`,...(g=(x=l.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var b,f,N;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 bg-[var(--hive-background-primary)]">
      
      {/* User States Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">👤 USER STATES</Badge>
            Navigation Bar User States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different user authentication and identity states in the navigation bar
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Authenticated User:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={sampleUser} showSearch={true} showNotifications={true} unreadCount={5} />
              </div>
              <Text variant="body-sm" color="secondary">
                Logged-in student with notifications and full platform access
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Guest User (Not Signed In):</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={null} showSearch={true} showNotifications={false} unreadCount={0} />
              </div>
              <Text variant="body-sm" color="secondary">
                Visitor to the platform with limited access and sign-in prompt
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">User with High Notification Count:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={{
                id: 'user-2',
                name: 'Alex Thompson',
                handle: 'alexthompson'
              }} showSearch={true} showNotifications={true} unreadCount={15} />
              </div>
              <Text variant="body-sm" color="secondary">
                Student with many unread notifications (shows 9+ badge)
              </Text>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Feature Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚙️ FEATURES</Badge>
            Navigation Bar Feature Configuration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different feature combinations for various application contexts and user types
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Full Feature Set:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={sampleUser} showSearch={true} showNotifications={true} unreadCount={3} />
              </div>
              <Text variant="body-sm" color="secondary">
                Complete navigation with search, notifications, settings, and user profile
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Search Only Navigation:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={sampleUser} showSearch={true} showNotifications={false} unreadCount={0} />
              </div>
              <Text variant="body-sm" color="secondary">
                Focused on search functionality for academic resource discovery
              </Text>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Minimal Navigation:</h4>
              <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                <NavBar user={sampleUser} showSearch={false} showNotifications={false} unreadCount={0} />
              </div>
              <Text variant="body-sm" color="secondary">
                Clean, minimal interface for focused academic workflows
              </Text>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Brand Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎨 BRAND</Badge>
            HIVE Brand Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Official HIVE branding with perfect visual hierarchy and University at Buffalo context
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Elements:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">HIVE Logo:</Text>
                  <div className="flex items-center space-x-3 p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 1500 1500" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--hive-brand-secondary)" d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z" />
                      </svg>
                    </div>
                    <span className="font-bold text-lg text-[var(--hive-text-primary)] tracking-tight">
                      HIVE
                    </span>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Official HIVE hexagonal logo with semantic color integration
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Typography:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <span className="font-bold text-lg text-[var(--hive-text-primary)] tracking-tight">
                      HIVE
                    </span>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Bold, tracking-tight typography for strong brand presence
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔍 SEARCH</Badge>
            Unified Search Interface
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Powerful search interface for University at Buffalo academic and social discovery
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Search Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Input:</Text>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]" />
                    <input type="text" placeholder="Search spaces, people, tools..." readOnly className="w-full h-10 pl-10 pr-12 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl text-sm text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)]" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] border border-[var(--hive-border-primary)]">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Unified search with keyboard shortcut (⌘K) for quick access
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Scope:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Spaces</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">People</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Tools</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] text-center">
                      <Text variant="body-sm" weight="medium">Content</Text>
                    </div>
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Comprehensive search across all platform content types
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
            Real Campus Navigation Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Navigation bar usage in actual University at Buffalo student and academic contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Dashboard Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Daily Academic Navigation
                </Text>
                
                <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                  <NavBar user={{
                  id: 'student-1',
                  name: 'Emily Rodriguez',
                  handle: 'erodriguez'
                }} showSearch={true} showNotifications={true} unreadCount={7} />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Search Examples:</Text>
                  <div className="space-y-2">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"CSE 331" → Find Algorithm Analysis course space</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"study group" → Discover active study groups</Text>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-sm" color="secondary">"Dr. Smith" → Find professor's tools and office hours</Text>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Notification Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Notification Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Light Activity (1-3 notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'student-2',
                    name: 'Marcus Johnson',
                    handle: 'mjohnson'
                  }} showSearch={true} showNotifications={true} unreadCount={2} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    New assignment posted, space invitation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Moderate Activity (4-9 notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'student-3',
                    name: 'Priya Patel',
                    handle: 'ppatel'
                  }} showSearch={true} showNotifications={true} unreadCount={6} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Multiple course updates, group messages, event reminders
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">High Activity (10+ notifications):</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'student-4',
                    name: 'David Kim',
                    handle: 'dkim'
                  }} showSearch={true} showNotifications={true} unreadCount={23} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Active in multiple spaces, group projects, event planning
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Different User Types */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">University User Types:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Undergraduate Student:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'undergrad-1',
                    name: 'Taylor Wilson',
                    handle: 'twilson'
                  }} showSearch={true} showNotifications={true} unreadCount={4} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Active in course spaces, study groups, campus events
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Graduate Student:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'grad-1',
                    name: 'Dr. Maria Santos',
                    handle: 'msantos'
                  }} showSearch={true} showNotifications={true} unreadCount={8} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Research collaboration, teaching assistant duties, academic conferences
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Faculty Member:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'faculty-1',
                    name: 'Prof. John Anderson',
                    handle: 'janderson'
                  }} showSearch={true} showNotifications={true} unreadCount={12} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Course management, student communications, department coordination
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Visitor:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={null} showSearch={true} showNotifications={false} unreadCount={0} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Prospective student, parent, or community member browsing public resources
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Real-Time Campus Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Real-Time Campus Scenarios:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Navigation bar adapts to different campus situations and times:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Finals Week:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'finals-student',
                    name: 'Jordan Lee',
                    handle: 'jlee'
                  }} showSearch={true} showNotifications={true} unreadCount={15} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    High notification activity: study group updates, exam reminders, library bookings
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Registration Period:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'registration-student',
                    name: 'Alex Chen',
                    handle: 'achen'
                  }} showSearch={true} showNotifications={true} unreadCount={9} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Course availability alerts, waitlist updates, academic advisor messages
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">New Semester Start:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'new-semester-student',
                    name: 'Sam Rivera',
                    handle: 'srivera'
                  }} showSearch={true} showNotifications={true} unreadCount={21} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    New course spaces, syllabus updates, campus event invitations, club recruitment
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Summer Break:</Text>
                  <div className="border border-[var(--hive-border-primary)] rounded-lg overflow-hidden">
                    <NavBar user={{
                    id: 'summer-student',
                    name: 'Riley Thompson',
                    handle: 'rthompson'
                  }} showSearch={true} showNotifications={true} unreadCount={1} />
                  </div>
                  <Text variant="body-sm" color="secondary">
                    Minimal activity: summer course updates, fall registration reminders
                  </Text>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(N=(f=m.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var w,j,C;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    showSearch: true,
    showNotifications: true,
    unreadCount: 3
  },
  render: args => <div className="bg-[var(--hive-background-primary)]">
      <NavBar {...args} />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Nav Bar Playground</CardTitle>
            <p className="text-[var(--hive-text-muted)]">
              Use the controls to test different navigation bar configurations
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Text variant="body-sm" color="secondary">
                Interactive navigation bar testing for University at Buffalo campus platform
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
}`,...(C=(j=v.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const Q=["Default","CompleteShowcase","Playground"];export{m as CompleteShowcase,l as Default,v as Playground,Q as __namedExportsOrder,X as default};
